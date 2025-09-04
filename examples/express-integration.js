/**
 * 🌐 Express.js Integration Example
 * 
 * This example shows how to integrate AuditMySite SDK into an Express.js
 * web application with job queuing and real-time progress updates.
 */

const express = require('express');
const { AuditSDK } = require('../dist/sdk/audit-sdk');
const { v4: uuidv4 } = require('uuid');

// In-memory storage for demo (use Redis/DB in production)
const auditJobs = new Map();
const jobResults = new Map();

const app = express();
app.use(express.json());

// Initialize SDK
const auditSDK = new AuditSDK({
  verbose: false,
  defaultOutputDir: './web-audit-reports'
});

// =============================================================================
// Routes
// =============================================================================

// Home page with simple form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AuditMySite Web Demo</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .form-group { margin: 15px 0; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #005a87; }
        .status { margin-top: 20px; padding: 15px; border-radius: 4px; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .info { background: #d1ecf1; color: #0c5460; }
      </style>
    </head>
    <body>
      <h1>🎯 AuditMySite Web Demo</h1>
      <p>Test website accessibility using our SDK integration.</p>
      
      <form id="auditForm">
        <div class="form-group">
          <label for="sitemapUrl">Sitemap URL:</label>
          <input type="url" id="sitemapUrl" placeholder="https://example.com/sitemap.xml" required>
        </div>
        
        <div class="form-group">
          <label for="maxPages">Max Pages to Test:</label>
          <select id="maxPages">
            <option value="3">3 pages (Quick test)</option>
            <option value="5" selected>5 pages (Standard)</option>
            <option value="10">10 pages (Thorough)</option>
            <option value="20">20 pages (Comprehensive)</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="formats">Report Formats:</label>
          <select id="formats" multiple>
            <option value="html" selected>HTML</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>
        
        <button type="submit">🚀 Start Audit</button>
      </form>
      
      <div id="status"></div>
      
      <script>
        document.getElementById('auditForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = {
            sitemapUrl: document.getElementById('sitemapUrl').value,
            maxPages: parseInt(document.getElementById('maxPages').value),
            formats: Array.from(document.getElementById('formats').selectedOptions).map(o => o.value)
          };
          
          const statusDiv = document.getElementById('status');
          statusDiv.innerHTML = '<div class="status info">🚀 Starting audit...</div>';
          
          try {
            const response = await fetch('/api/audit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
              // Poll for results
              pollJobStatus(result.jobId);
            } else {
              statusDiv.innerHTML = \`<div class="status error">❌ Error: \${result.error}</div>\`;
            }
          } catch (error) {
            statusDiv.innerHTML = \`<div class="status error">💥 Network error: \${error.message}</div>\`;
          }
        });
        
        async function pollJobStatus(jobId) {
          const statusDiv = document.getElementById('status');
          
          const checkStatus = async () => {
            try {
              const response = await fetch(\`/api/audit/\${jobId}/status\`);
              const result = await response.json();
              
              if (result.status === 'completed') {
                const summary = result.result.summary;
                const successRate = Math.round((summary.passedPages / summary.testedPages) * 100);
                
                statusDiv.innerHTML = \`
                  <div class="status success">
                    ✅ <strong>Audit Completed!</strong><br>
                    📄 Tested: \${summary.testedPages} pages<br>
                    ✅ Passed: \${summary.passedPages}<br>
                    ❌ Failed: \${summary.failedPages}<br>
                    📊 Success Rate: \${successRate}%<br>
                    ⏱️ Duration: \${Math.round(result.result.duration / 1000)}s<br>
                    <br>
                    📁 <strong>Reports:</strong><br>
                    \${result.result.reports.map(r => 
                      \`<a href="/api/audit/\${jobId}/report/\${r.format}" target="_blank">\${r.format.toUpperCase()}</a> (\${Math.round(r.size/1024)}KB)\`
                    ).join(' | ')}
                  </div>
                \`;
              } else if (result.status === 'failed') {
                statusDiv.innerHTML = \`<div class="status error">❌ Audit failed: \${result.error || 'Unknown error'}</div>\`;
              } else if (result.status === 'running') {
                const progress = result.progress || { percentage: 0 };
                statusDiv.innerHTML = \`<div class="status info">⏳ Running audit... \${progress.percentage}% complete</div>\`;
                setTimeout(checkStatus, 2000);
              } else {
                statusDiv.innerHTML = \`<div class="status info">⏳ Audit in queue...</div>\`;
                setTimeout(checkStatus, 2000);
              }
            } catch (error) {
              statusDiv.innerHTML = \`<div class="status error">💥 Error checking status: \${error.message}</div>\`;
            }
          };
          
          checkStatus();
        }
      </script>
    </body>
    </html>
  `);
});

// Start audit job
app.post('/api/audit', async (req, res) => {
  try {
    const { sitemapUrl, maxPages = 5, formats = ['html'] } = req.body;
    
    if (!sitemapUrl) {
      return res.status(400).json({ error: 'sitemapUrl is required' });
    }

    const jobId = uuidv4();
    auditJobs.set(jobId, {
      id: jobId,
      status: 'pending',
      sitemapUrl,
      maxPages,
      formats,
      createdAt: new Date(),
      progress: null
    });

    // Start audit asynchronously
    runAuditJob(jobId, sitemapUrl, { maxPages, formats }).catch(console.error);

    res.json({ jobId, status: 'pending' });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job status
app.get('/api/audit/:jobId/status', (req, res) => {
  const { jobId } = req.params;
  const job = auditJobs.get(jobId);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const result = jobResults.get(jobId);
  res.json({ ...job, result });
});

// Download report
app.get('/api/audit/:jobId/report/:format', (req, res) => {
  const { jobId, format } = req.params;
  const job = auditJobs.get(jobId);
  const result = jobResults.get(jobId);
  
  if (!job || !result || job.status !== 'completed') {
    return res.status(404).json({ error: 'Report not found' });
  }

  const report = result.reports.find(r => r.format === format);
  if (!report) {
    return res.status(404).json({ error: 'Report format not found' });
  }

  res.download(report.path);
});

// List all jobs (for admin/debugging)
app.get('/api/jobs', (req, res) => {
  const jobs = Array.from(auditJobs.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20); // Show last 20 jobs
    
  res.json({ jobs });
});

// =============================================================================
// Job Processing
// =============================================================================

async function runAuditJob(jobId, sitemapUrl, options) {
  const job = auditJobs.get(jobId);
  if (!job) return;

  try {
    job.status = 'running';
    job.startedAt = new Date();

    // Run audit with progress tracking
    const result = await auditSDK.audit()
      .sitemap(sitemapUrl)
      .maxPages(options.maxPages)
      .formats(options.formats)
      .includePerformance()
      .on('audit:progress', (event) => {
        job.progress = event.data;
      })
      .run();

    job.status = 'completed';
    job.completedAt = new Date();
    jobResults.set(jobId, result);

    console.log(`✅ Job ${jobId} completed successfully`);

  } catch (error) {
    job.status = 'failed';
    job.error = error.message;
    job.completedAt = new Date();
    
    console.error(`❌ Job ${jobId} failed:`, error.message);
  }
}

// =============================================================================
// Server Setup
// =============================================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Express AuditMySite Demo running at http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/api/jobs`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Server shutting down gracefully...');
  process.exit(0);
});

module.exports = app;
