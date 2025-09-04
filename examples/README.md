# 🚀 AuditMySite SDK Examples

This directory contains comprehensive examples showing how to integrate the AuditMySite SDK into various environments and use cases.

## 📁 Examples Overview

### [`basic-usage.js`](./basic-usage.js) - Getting Started
Simple examples for beginners:
- Quick audit setup
- Fluent API usage
- Event listeners
- Error handling

### [`express-integration.js`](./express-integration.js) - Web Applications
Complete Express.js web application with:
- Web interface for audit submission
- Job queue management
- Real-time progress tracking
- Report download endpoints

### [`ci-cd-integration.js`](./ci-cd-integration.js) - CI/CD Pipelines
Production-ready CI/CD integration:
- Quality gates and thresholds
- JUnit test reports
- PR summary generation
- Slack/Teams notifications
- Badge generation

## 🔧 Quick Start

### 1. Basic SDK Usage

```javascript
const { AuditSDK } = require('auditmysite');

// Simple audit
const audit = new AuditSDK();
const result = await audit.quickAudit('https://example.com/sitemap.xml', {
  maxPages: 5,
  formats: ['html', 'json']
});

console.log(`Success Rate: ${result.summary.passedPages / result.summary.testedPages * 100}%`);
```

### 2. Fluent API with Events

```javascript
const audit = new AuditSDK();

const result = await audit.audit()
  .sitemap('https://example.com/sitemap.xml')
  .maxPages(10)
  .formats(['html', 'markdown', 'csv'])
  .includePerformance()
  .on('audit:progress', (event) => {
    console.log(`Progress: ${event.data.percentage}%`);
  })
  .on('audit:page:complete', (event) => {
    const status = event.data.result.passed ? '✅' : '❌';
    console.log(`${status} ${event.data.url}`);
  })
  .run();
```

### 3. REST API Server

```javascript
const { AuditAPIServer } = require('auditmysite');

const server = new AuditAPIServer({
  port: 3000,
  maxConcurrentJobs: 5
});

await server.start();
console.log('API Server running at http://localhost:3000');
// Visit http://localhost:3000/api-docs for Swagger documentation
```

## 🌐 Integration Guides

### Node.js Application

```javascript
const { AuditSDK } = require('auditmysite');

class AccessibilityService {
  constructor() {
    this.audit = new AuditSDK({
      defaultOutputDir: './reports',
      verbose: true
    });
  }

  async auditWebsite(sitemapUrl, options = {}) {
    try {
      const result = await this.audit.quickAudit(sitemapUrl, {
        maxPages: options.maxPages || 5,
        formats: options.formats || ['json'],
        includePerformance: true
      });

      return {
        success: true,
        summary: result.summary,
        reports: result.reports
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = AccessibilityService;
```

### Next.js API Route

```javascript
// pages/api/audit.js
import { AuditSDK } from 'auditmysite';

const audit = new AuditSDK({
  defaultOutputDir: './public/reports'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sitemapUrl, maxPages = 5 } = req.body;

  try {
    const result = await audit.quickAudit(sitemapUrl, {
      maxPages,
      formats: ['html', 'json']
    });

    res.json({
      success: true,
      summary: result.summary,
      reports: result.reports.map(r => ({
        ...r,
        url: `/reports/${path.basename(r.path)}`
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
```

### GitHub Actions Workflow

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Testing

on: [push, pull_request]

jobs:
  accessibility-audit:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install auditmysite
        
      - name: Run accessibility audit
        run: node examples/ci-cd-integration.js https://your-site.com/sitemap.xml
        env:
          AUDIT_MAX_PAGES: 20
          AUDIT_FORMATS: json,html
          AUDIT_FAIL_ON_ERRORS: true
          AUDIT_SUCCESS_RATE_THRESHOLD: 85
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          
      - name: Upload reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: accessibility-reports
          path: audit-reports/
          
      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const summary = fs.readFileSync('audit-reports/pr-summary.md', 'utf8');
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: summary
            });
```

### Docker Container

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install AuditMySite
RUN npm install auditmysite

# Copy your script
COPY audit-script.js .

# Run audit
CMD ["node", "audit-script.js"]
```

```bash
# Build and run
docker build -t my-accessibility-audit .
docker run -e SITEMAP_URL=https://example.com/sitemap.xml my-accessibility-audit
```

## 🔧 Configuration Options

### SDK Configuration

```javascript
const audit = new AuditSDK({
  timeout: 30000,              // Request timeout
  maxConcurrency: 3,           // Concurrent page tests
  defaultOutputDir: './reports', // Report output directory
  verbose: true,               // Enable verbose logging
  userAgent: 'MyBot/1.0',      // Custom user agent
  proxy: {                     // Proxy configuration
    host: 'proxy.example.com',
    port: 8080,
    auth: {
      username: 'user',
      password: 'pass'
    }
  }
});
```

### Audit Options

```javascript
const options = {
  maxPages: 20,                    // Maximum pages to test
  standard: 'WCAG2AA',             // Accessibility standard
  formats: ['html', 'json', 'csv'], // Report formats
  includePerformance: true,        // Include performance metrics
  includeSeo: false,               // Include SEO analysis
  includeSecurity: false,          // Include security checks
  viewport: {                      // Custom viewport
    width: 1920,
    height: 1080,
    isMobile: false
  },
  performanceBudget: {             // Performance thresholds
    lcp: { good: 2500, poor: 4000 },
    cls: { good: 0.1, poor: 0.25 }
  }
};
```

## 📊 Event System

The SDK provides comprehensive event tracking for real-time monitoring:

```javascript
audit.audit()
  .sitemap(url)
  .on('audit:start', (event) => {
    console.log('🚀 Audit started');
  })
  .on('audit:progress', (event) => {
    const { current, total, percentage, currentUrl } = event.data;
    console.log(`📊 ${percentage}% (${current}/${total}) - ${currentUrl}`);
  })
  .on('audit:page:start', (event) => {
    console.log(`🔍 Testing: ${event.data.url}`);
  })
  .on('audit:page:complete', (event) => {
    const { url, result, duration } = event.data;
    console.log(`✅ ${url} - ${result.errors.length} errors (${duration}ms)`);
  })
  .on('audit:page:error', (event) => {
    console.log(`❌ ${event.data.url} - ${event.data.error.message}`);
  })
  .on('report:start', (event) => {
    console.log(`📄 Generating ${event.data.format} report...`);
  })
  .on('report:complete', (event) => {
    console.log(`✅ Report generated: ${event.data.path}`);
  })
  .on('audit:complete', (event) => {
    console.log('🎉 Audit completed!');
  })
  .on('audit:error', (event) => {
    console.error('💥 Audit failed:', event.data.message);
  })
  .run();
```

## 🛡️ Error Handling

```javascript
try {
  const result = await audit.quickAudit(sitemapUrl, options);
} catch (error) {
  if (error.code === 'INVALID_SITEMAP') {
    console.error('Invalid sitemap URL provided');
  } else if (error.code === 'TIMEOUT') {
    console.error('Audit timed out - try reducing maxPages');
  } else if (error.code === 'NETWORK_ERROR') {
    console.error('Network connection failed');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## 📈 Performance Tips

1. **Optimize Concurrency**: Adjust `maxConcurrency` based on target server capacity
2. **Use Appropriate Limits**: Set realistic `maxPages` for your needs
3. **Choose Formats Wisely**: Only generate reports you actually need
4. **Implement Caching**: Cache sitemap parsing results for repeated audits
5. **Monitor Resources**: Track memory usage for large audits

## 🔗 Additional Resources

- [SDK API Documentation](../docs/sdk-api.md)
- [REST API Documentation](../docs/rest-api.md)
- [Configuration Reference](../docs/configuration.md)
- [Performance Guide](../docs/performance.md)
- [Troubleshooting](../docs/troubleshooting.md)

## 🤝 Contributing

Found an issue or want to contribute an example?

1. Fork the repository
2. Create a feature branch
3. Add your example with documentation
4. Submit a pull request

## 📝 License

MIT License - see [LICENSE](../LICENSE) for details.
