/**
 * 🔧 Modern HTML Report Generator
 * 
 * Generates comprehensive HTML reports with modern design.
 * Replaces the legacy HTML report generation.
 */

import { 
  ReportGenerator, 
  ReportData, 
  ReportOptions, 
  GeneratedReport, 
  ReportFormat 
} from '../base-generator';
import * as fs from 'fs';
import * as path from 'path';

export class ModernHTMLReportGenerator extends ReportGenerator {
  constructor() {
    super('html');
  }

  getExtension(): string {
    return 'html';
  }

  getMimeType(): string {
    return 'text/html';
  }

  async generate(data: ReportData, options: ReportOptions): Promise<GeneratedReport> {
    const startTime = Date.now();

    // Validate data
    const validation = this.validateData(data);
    if (!validation.valid) {
      throw new Error(`Invalid report data: ${validation.errors.join(', ')}`);
    }

    // Generate HTML content
    const htmlContent = this.generateHTML(data, options);

    // Create output directory
    if (!fs.existsSync(options.outputDir)) {
      fs.mkdirSync(options.outputDir, { recursive: true });
    }

    // Write file
    const filename = this.generateFilename(options, 'accessibility');
    const filePath = path.join(options.outputDir, filename);
    fs.writeFileSync(filePath, htmlContent, 'utf8');

    const duration = Date.now() - startTime;

    return {
      path: filePath,
      format: this.format,
      size: this.calculateFileSize(htmlContent),
      metadata: {
        generatedAt: new Date(),
        duration
      }
    };
  }

  private generateHTML(data: ReportData, options: ReportOptions): string {
    const { summary, issues, metadata, config } = data;
    const successRate = this.calculateSuccessRate(summary);
    
    const branding = options.branding || {};
    const colors = branding.colors || {
      primary: '#007acc',
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545'
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Audit Report</title>
    <style>
        ${this.generateCSS(colors)}
    </style>
</head>
<body>
    <div class="container">
        ${this.generateHeader(metadata, branding)}
        ${this.generateSummarySection(summary, successRate)}
        ${this.generateMetricsSection(summary)}
        ${!options.summaryOnly ? this.generateDetailsSection(summary, issues, options) : ''}
        ${this.generateFooter(metadata, branding)}
    </div>
    
    <script>
        ${this.generateJavaScript()}
    </script>
</body>
</html>`;
  }

  private generateCSS(colors: any): string {
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, ${colors.primary}, #0056b3);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }

        .header .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .metric-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-left: 4px solid ${colors.primary};
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .metric-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .metric-label {
            color: #666;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .success-rate {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .success-rate-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            color: white;
        }

        .details-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .section-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: ${colors.primary};
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 0.5rem;
        }

        .page-result {
            margin-bottom: 2rem;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid;
        }

        .page-result.passed {
            background-color: #f8fff9;
            border-color: ${colors.success};
        }

        .page-result.failed {
            background-color: #fff8f8;
            border-color: ${colors.error};
        }

        .page-result.crashed {
            background-color: #fff9e6;
            border-color: ${colors.warning};
        }

        .page-title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-passed {
            background-color: ${colors.success};
            color: white;
        }

        .status-failed {
            background-color: ${colors.error};
            color: white;
        }

        .status-crashed {
            background-color: ${colors.warning};
            color: #333;
        }

        .issue-list {
            margin-top: 1rem;
        }

        .issue-item {
            margin-bottom: 0.75rem;
            padding: 0.75rem;
            background-color: rgba(0, 0, 0, 0.02);
            border-radius: 6px;
        }

        .issue-type-error {
            border-left: 3px solid ${colors.error};
        }

        .issue-type-warning {
            border-left: 3px solid ${colors.warning};
        }

        .footer {
            text-align: center;
            padding: 2rem;
            color: #666;
            border-top: 1px solid #e9ecef;
        }

        .expandable {
            cursor: pointer;
        }

        .expandable:hover {
            background-color: rgba(0, 0, 0, 0.02);
        }

        .collapsed {
            display: none;
        }

        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .summary-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
  }

  private generateHeader(metadata: any, branding: any): string {
    const company = branding.company || 'AuditMySite';
    
    return `
        <header class="header">
            <h1>🎯 Accessibility Audit Report</h1>
            <div class="subtitle">
                Generated on ${new Date(metadata.timestamp).toLocaleDateString()} 
                ${metadata.sitemapUrl ? `• ${metadata.sitemapUrl}` : ''}
                ${company !== 'AuditMySite' ? `• ${company}` : ''}
            </div>
        </header>
    `;
  }

  private generateSummarySection(summary: any, successRate: number): string {
    return `
        <div class="success-rate">
            <div class="success-rate-circle" style="background: ${this.getSuccessRateColor(successRate)}">
                ${successRate}%
            </div>
            <h2>Overall Success Rate</h2>
            <p>${summary.passedPages} of ${summary.testedPages} pages passed accessibility tests</p>
        </div>
    `;
  }

  private generateMetricsSection(summary: any): string {
    return `
        <div class="summary-grid">
            <div class="metric-card">
                <div class="metric-value">${summary.testedPages}</div>
                <div class="metric-label">Pages Tested</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" style="color: #28a745">${summary.passedPages}</div>
                <div class="metric-label">Passed</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" style="color: #dc3545">${summary.failedPages}</div>
                <div class="metric-label">Failed</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" style="color: #ffc107">${summary.crashedPages || 0}</div>
                <div class="metric-label">Crashed</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${summary.totalErrors}</div>
                <div class="metric-label">Total Errors</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${summary.totalWarnings}</div>
                <div class="metric-label">Warnings</div>
            </div>
        </div>
    `;
  }

  private generateDetailsSection(summary: any, issues: any[], options: ReportOptions): string {
    if (options.summaryOnly) return '';

    let detailsHtml = `
        <div class="details-section">
            <h2 class="section-title">Detailed Results</h2>
    `;

    summary.results.forEach((result: any, index: number) => {
      const statusClass = result.passed ? 'passed' : (result.crashed ? 'crashed' : 'failed');
      const statusBadge = result.passed ? 'passed' : (result.crashed ? 'crashed' : 'failed');
      const statusText = result.passed ? 'PASSED' : (result.crashed ? 'CRASHED' : 'FAILED');

      detailsHtml += `
            <div class="page-result ${statusClass}">
                <div class="page-title expandable" onclick="toggleSection('result-${index}')">
                    <span>${result.title || result.url}</span>
                    <span class="status-badge status-${statusBadge}">${statusText}</span>
                </div>
                <div class="page-url">${result.url}</div>
                
                <div id="result-${index}" class="collapsed">
                    ${result.errors.length > 0 ? this.generateIssueList(result.errors, 'error') : ''}
                    ${result.warnings.length > 0 ? this.generateIssueList(result.warnings, 'warning') : ''}
                    
                    <div style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                        Duration: ${result.duration}ms
                        ${result.performanceMetrics ? `• LCP: ${result.performanceMetrics.largestContentfulPaint}ms` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    detailsHtml += '</div>';
    return detailsHtml;
  }

  private generateIssueList(issues: string[], type: 'error' | 'warning'): string {
    return `
        <div class="issue-list">
            <h4>${type === 'error' ? 'Errors' : 'Warnings'} (${issues.length})</h4>
            ${issues.map(issue => `
                <div class="issue-item issue-type-${type}">
                    ${issue}
                </div>
            `).join('')}
        </div>
    `;
  }

  private generateFooter(metadata: any, branding: any): string {
    const company = branding.company || 'AuditMySite';
    const footerText = branding.footer || `Generated by ${company} v${metadata.version}`;
    
    return `
        <footer class="footer">
            <p>${footerText}</p>
            <p>Report generated in ${this.formatDuration(metadata.duration)}</p>
        </footer>
    `;
  }

  private generateJavaScript(): string {
    return `
        function toggleSection(id) {
            const element = document.getElementById(id);
            if (element) {
                element.classList.toggle('collapsed');
            }
        }

        // Auto-expand failed results
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.page-result.failed [id^="result-"]').forEach(el => {
                el.classList.remove('collapsed');
            });
        });
    `;
  }

  private getSuccessRateColor(rate: number): string {
    if (rate >= 90) return '#28a745'; // Green
    if (rate >= 70) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  }
}
