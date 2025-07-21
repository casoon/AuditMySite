import { Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { TestSummary, AccessibilityResult } from '../types';

export interface PdfReportOptions {
  outputDir?: string;
  format?: 'A4' | 'Letter' | 'Legal';
  printBackground?: boolean;
  margin?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  displayHeaderFooter?: boolean;
  headerTemplate?: string;
  footerTemplate?: string;
  includeCharts?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

export class PdfGenerator {
  
  /**
   * Generiert PDF-Report aus Test-Ergebnissen
   */
  async generatePdfReport(
    summary: TestSummary, 
    page: Page, 
    options: PdfReportOptions = {}
  ): Promise<string> {
    const outputDir = options.outputDir || './reports';
    const dateOnly = new Date().toISOString().split('T')[0];
    
    // Erstelle Output-Verzeichnis falls nicht vorhanden
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Extrahiere Domain aus der ersten URL
    const domain = summary.results.length > 0 
      ? new URL(summary.results[0].url).hostname 
      : 'unknown';

    // HTML-Content für PDF generieren
    const htmlContent = this.generatePdfHtmlContent(summary, domain, dateOnly, options);
    
    // HTML in Page laden
    await page.setContent(htmlContent, { waitUntil: 'networkidle' });
    
    // PDF-Optionen konfigurieren
    const pdfOptions = {
      path: path.join(outputDir, `${domain}-accessibility-report-${dateOnly}.pdf`),
      format: options.format || 'A4',
      printBackground: options.printBackground !== false,
      margin: options.margin || { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
      displayHeaderFooter: options.displayHeaderFooter !== false,
      headerTemplate: options.headerTemplate || this.getDefaultHeaderTemplate(),
      footerTemplate: options.footerTemplate || this.getDefaultFooterTemplate()
    };

    // PDF generieren
    await page.pdf(pdfOptions);
    
    return pdfOptions.path;
  }

  /**
   * Generiert HTML-Content für PDF-Report
   */
  private generatePdfHtmlContent(
    summary: TestSummary, 
    domain: string, 
    date: string, 
    options: PdfReportOptions
  ): string {
    const successRate = summary.testedPages > 0 ? (summary.passedPages / summary.testedPages * 100).toFixed(1) : '0';
    const errorRate = summary.testedPages > 0 ? (summary.failedPages / summary.testedPages * 100).toFixed(1) : '0';

    return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Test Report - ${domain}</title>
    <style>
        @page {
            size: ${options.format || 'A4'};
            margin: ${options.margin?.top || '1cm'} ${options.margin?.right || '1cm'} ${options.margin?.bottom || '1cm'} ${options.margin?.left || '1cm'};
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #007acc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #007acc;
            margin: 0;
            font-size: 28px;
        }
        
        .header .subtitle {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .summary-card {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        
        .summary-card h3 {
            margin: 0 0 10px 0;
            color: #495057;
            font-size: 16px;
        }
        
        .summary-card .value {
            font-size: 32px;
            font-weight: bold;
            color: #007acc;
        }
        
        .summary-card.success .value {
            color: #28a745;
        }
        
        .summary-card.warning .value {
            color: #ffc107;
        }
        
        .summary-card.danger .value {
            color: #dc3545;
        }
        
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .section h2 {
            color: #007acc;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 12px;
        }
        
        th, td {
            border: 1px solid #dee2e6;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #495057;
        }
        
        .status-passed {
            color: #28a745;
            font-weight: bold;
        }
        
        .status-failed {
            color: #dc3545;
            font-weight: bold;
        }
        
        .status-warning {
            color: #ffc107;
            font-weight: bold;
        }
        
        .recommendations {
            background: #e7f3ff;
            border: 1px solid #b3d9ff;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
        }
        
        .recommendations h3 {
            color: #007acc;
            margin-top: 0;
        }
        
        .recommendations ul {
            margin: 0;
            padding-left: 20px;
        }
        
        .recommendations li {
            margin-bottom: 8px;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        @media print {
            .page-break {
                page-break-before: always;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 Accessibility Test Report</h1>
        <div class="subtitle">
            Domain: ${domain} | Generated: ${new Date().toLocaleString('de-DE')}
        </div>
    </div>

    <div class="summary-grid">
        <div class="summary-card ${summary.passedPages === summary.testedPages ? 'success' : 'warning'}">
            <h3>Success Rate</h3>
            <div class="value">${successRate}%</div>
        </div>
        
        <div class="summary-card">
            <h3>Pages Tested</h3>
            <div class="value">${summary.testedPages}</div>
        </div>
        
        <div class="summary-card success">
            <h3>Passed</h3>
            <div class="value">${summary.passedPages}</div>
        </div>
        
        <div class="summary-card ${summary.failedPages > 0 ? 'danger' : 'success'}">
            <h3>Failed</h3>
            <div class="value">${summary.failedPages}</div>
        </div>
        
        <div class="summary-card ${summary.totalErrors > 0 ? 'danger' : 'success'}">
            <h3>Errors</h3>
            <div class="value">${summary.totalErrors}</div>
        </div>
        
        <div class="summary-card ${summary.totalWarnings > 0 ? 'warning' : 'success'}">
            <h3>Warnings</h3>
            <div class="value">${summary.totalWarnings}</div>
        </div>
    </div>

    <div class="section">
        <h2>📊 Page Results</h2>
        <table>
            <thead>
                <tr>
                    <th>Page</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Load Time</th>
                    <th>Errors</th>
                    <th>Warnings</th>
                    <th>Pa11y Score</th>
                </tr>
            </thead>
            <tbody>
                ${summary.results.map(result => `
                    <tr>
                        <td>${this.escapeHtml(this.getPageName(result.url))}</td>
                        <td>${this.escapeHtml(result.title)}</td>
                        <td class="status-${result.passed ? 'passed' : 'failed'}">
                            ${result.passed ? '✅ PASSED' : '❌ FAILED'}
                        </td>
                        <td>${result.duration}ms</td>
                        <td>${result.errors.length}</td>
                        <td>${result.warnings.length}</td>
                        <td>${result.pa11yScore || 'N/A'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    ${this.generateIssuesSection(summary.results)}

    ${this.generatePerformanceSection(summary.results)}

    <div class="section">
        <h2>🔧 Recommendations</h2>
        <div class="recommendations">
            ${this.generateRecommendations(summary)}
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Generiert Issues-Sektion für PDF
   */
  private generateIssuesSection(results: AccessibilityResult[]): string {
    const allIssues = results.flatMap(result => 
      result.errors.map(error => ({
        type: 'error',
        message: error,
        page: result.url,
        pageName: this.getPageName(result.url)
      })).concat(
        result.warnings.map(warning => ({
          type: 'warning',
          message: warning,
          page: result.url,
          pageName: this.getPageName(result.url)
        }))
      )
    );

    if (allIssues.length === 0) {
      return `
        <div class="section">
          <h2>🎉 Issues</h2>
          <p>No accessibility issues found! All tested pages meet the standards.</p>
        </div>
      `;
    }

    return `
      <div class="section">
        <h2>🔍 Issues (${allIssues.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Message</th>
              <th>Page</th>
            </tr>
          </thead>
          <tbody>
            ${allIssues.map(issue => `
              <tr>
                <td class="status-${issue.type}">
                  ${issue.type === 'error' ? '❌ ERROR' : '⚠️ WARNING'}
                </td>
                <td>${this.escapeHtml(issue.message)}</td>
                <td>${this.escapeHtml(issue.pageName)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Generiert Performance-Sektion für PDF
   */
  private generatePerformanceSection(results: AccessibilityResult[]): string {
    const performanceResults = results.filter(r => r.performanceMetrics);
    
    if (performanceResults.length === 0) {
      return '';
    }

    return `
      <div class="section">
        <h2>⚡ Performance Metrics</h2>
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Load Time</th>
              <th>DOM Ready</th>
              <th>First Paint</th>
              <th>LCP</th>
            </tr>
          </thead>
          <tbody>
            ${performanceResults.map(result => {
              const metrics = result.performanceMetrics!;
              return `
                <tr>
                  <td>${this.escapeHtml(this.getPageName(result.url))}</td>
                  <td>${metrics.loadTime}ms</td>
                  <td>${metrics.domContentLoaded}ms</td>
                  <td>${metrics.firstPaint}ms</td>
                  <td>${metrics.largestContentfulPaint}ms</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Generiert Empfehlungen basierend auf Testergebnissen
   */
  private generateRecommendations(summary: TestSummary): string {
    const recommendations: string[] = [];

    if (summary.failedPages > 0) {
      recommendations.push(`Fix ${summary.failedPages} failed pages to improve accessibility compliance`);
    }

    if (summary.totalErrors > 0) {
      recommendations.push(`Address ${summary.totalErrors} critical accessibility errors`);
    }

    if (summary.totalWarnings > 0) {
      recommendations.push(`Review ${summary.totalWarnings} accessibility warnings for potential improvements`);
    }

    const avgLoadTime = summary.testedPages > 0 ? summary.totalDuration / summary.testedPages : 0;
    if (avgLoadTime > 3000) {
      recommendations.push(`Optimize page load times (current average: ${Math.round(avgLoadTime)}ms)`);
    }

    if (recommendations.length === 0) {
      recommendations.push('Excellent! All pages meet accessibility standards');
    }

    return `
      <ul>
        ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
      </ul>
    `;
  }

  /**
   * Standard Header Template für PDF
   */
  private getDefaultHeaderTemplate(): string {
    return `
      <div style="font-size: 10px; text-align: center; width: 100%; color: #666;">
        AuditMySite Accessibility Report
      </div>
    `;
  }

  /**
   * Standard Footer Template für PDF
   */
  private getDefaultFooterTemplate(): string {
    return `
      <div style="font-size: 10px; text-align: center; width: 100%; color: #666;">
        Generated on <span class="date"></span> | Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `;
  }

  /**
   * Hilfsfunktionen
   */
  private getPageName(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname || '/';
    } catch {
      return url;
    }
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
} 