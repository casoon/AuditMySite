import { TestSummary, AccessibilityResult } from '../types';
import * as fs from 'fs';
import * as path from 'path';

export interface OutputOptions {
  format: 'json' | 'csv' | 'markdown' | 'html';
  outputFile?: string;
  includeDetails?: boolean;
  includePa11yIssues?: boolean;
  summaryOnly?: boolean;
}

export class OutputGenerator {
  
  /**
   * Generiert eine KI-freundliche Output-Datei
   */
  async generateOutput(summary: TestSummary, options: OutputOptions): Promise<string> {
    const timestamp = new Date().toISOString();
    const outputData = this.prepareOutputData(summary, timestamp, options);
    
    let content: string;
    let filename: string;
    
    switch (options.format) {
      case 'json':
        content = this.generateJSON(outputData, options);
        filename = options.outputFile || `accessibility-report-${Date.now()}.json`;
        break;
      case 'csv':
        content = this.generateCSV(outputData, options);
        filename = options.outputFile || `accessibility-report-${Date.now()}.csv`;
        break;
      case 'markdown':
        content = this.generateMarkdown(outputData, options);
        filename = options.outputFile || `accessibility-report-${Date.now()}.md`;
        break;
      case 'html':
        content = this.generateHTML(outputData, options);
        filename = options.outputFile || `accessibility-report-${Date.now()}.html`;
        break;
      default:
        throw new Error(`Unsupported format: ${options.format}`);
    }
    
    // Datei schreiben
    const outputPath = path.resolve(filename);
    fs.writeFileSync(outputPath, content, 'utf8');
    
    return outputPath;
  }
  
  private prepareOutputData(summary: TestSummary, timestamp: string, options: OutputOptions) {
    return {
      metadata: {
        timestamp,
        tool: '@casoon/accessibility-test-cli',
        version: '1.0.1',
        totalPages: summary.totalPages,
        testedPages: summary.testedPages,
        passedPages: summary.passedPages,
        failedPages: summary.failedPages,
        totalErrors: summary.totalErrors,
        totalWarnings: summary.totalWarnings,
        totalDuration: summary.totalDuration,
        successRate: summary.testedPages > 0 ? (summary.passedPages / summary.testedPages * 100).toFixed(2) + '%' : '0%'
      },
      summary: {
        overall: summary.passedPages === summary.testedPages ? 'PASSED' : 'FAILED',
        score: summary.testedPages > 0 ? Math.round((summary.passedPages / summary.testedPages) * 100) : 0,
        criticalIssues: summary.totalErrors,
        warnings: summary.totalWarnings,
        averageLoadTime: summary.testedPages > 0 ? Math.round(summary.totalDuration / summary.testedPages) : 0
      },
      pages: options.summaryOnly ? [] : summary.results.map(result => ({
        url: result.url,
        title: result.title,
        status: result.passed ? 'PASSED' : 'FAILED',
        loadTime: result.duration,
        errors: result.errors.length,
        warnings: result.warnings.length,
        issues: options.includeDetails ? {
          imagesWithoutAlt: result.imagesWithoutAlt,
          buttonsWithoutLabel: result.buttonsWithoutLabel,
          headingsCount: result.headingsCount,
          pa11yIssues: options.includePa11yIssues ? result.pa11yIssues : undefined,
          pa11yScore: result.pa11yScore,
          performanceMetrics: result.performanceMetrics,
          keyboardNavigation: result.keyboardNavigation,
          colorContrastIssues: result.colorContrastIssues,
          focusManagementIssues: result.focusManagementIssues,
          screenshots: result.screenshots
        } : undefined,
        errorDetails: options.includeDetails ? result.errors : undefined,
        warningDetails: options.includeDetails ? result.warnings : undefined
      })),
      recommendations: this.generateRecommendations(summary)
    };
  }
  
  private generateJSON(data: any, options: OutputOptions): string {
    return JSON.stringify(data, null, 2);
  }
  
  private generateCSV(data: any, options: OutputOptions): string {
    const lines: string[] = [];
    
    // Header
    lines.push('URL,Title,Status,LoadTime,Errors,Warnings,ImagesWithoutAlt,ButtonsWithoutLabel,HeadingsCount,Pa11yScore,PerformanceScore,KeyboardNavigation,ColorContrastIssues,FocusIssues');
    
    // Data rows
    data.pages.forEach((page: any) => {
      const issues = page.issues || {};
      const performanceScore = issues.performanceMetrics?.loadTime ? 
        Math.max(0, 100 - Math.round(issues.performanceMetrics.loadTime / 100)) : 'N/A';
      
      lines.push([
        page.url,
        `"${page.title}"`,
        page.status,
        page.loadTime,
        page.errors,
        page.warnings,
        issues.imagesWithoutAlt || 0,
        issues.buttonsWithoutLabel || 0,
        issues.headingsCount || 0,
        issues.pa11yScore || 'N/A',
        performanceScore,
        issues.keyboardNavigation?.length || 0,
        issues.colorContrastIssues?.length || 0,
        issues.focusManagementIssues?.length || 0
      ].join(','));
    });
    
    return lines.join('\n');
  }
  
  private generateMarkdown(data: any, options: OutputOptions): string {
    const lines: string[] = [];
    
    // Header
    lines.push('# Accessibility Test Report');
    lines.push(`Generated: ${data.metadata.timestamp}`);
    lines.push('');
    
    // Summary
    lines.push('## Summary');
    lines.push(`- **Overall Status**: ${data.summary.overall}`);
    lines.push(`- **Success Rate**: ${data.metadata.successRate}`);
    lines.push(`- **Score**: ${data.summary.score}/100`);
    lines.push(`- **Critical Issues**: ${data.summary.criticalIssues}`);
    lines.push(`- **Warnings**: ${data.summary.warnings}`);
    lines.push(`- **Average Load Time**: ${data.summary.averageLoadTime}ms`);
    
    // Pa11y Score if available
    const pagesWithPa11yScore = data.pages.filter((page: any) => page.issues?.pa11yScore && page.issues.pa11yScore !== 'N/A');
    if (pagesWithPa11yScore.length > 0) {
      const avgPa11yScore = pagesWithPa11yScore.reduce((sum: number, page: any) => sum + page.issues.pa11yScore, 0) / pagesWithPa11yScore.length;
      lines.push(`- **Average Pa11y Score**: ${Math.round(avgPa11yScore)}/100`);
    }

    // Performance Metrics if available
    const pagesWithPerformance = data.pages.filter((page: any) => page.issues?.performanceMetrics);
    if (pagesWithPerformance.length > 0) {
      const avgLoadTime = pagesWithPerformance.reduce((sum: number, page: any) => sum + page.issues.performanceMetrics.loadTime, 0) / pagesWithPerformance.length;
      lines.push(`- **Average Load Time**: ${Math.round(avgLoadTime)}ms`);
    }

    // Keyboard Navigation if available
    const pagesWithKeyboard = data.pages.filter((page: any) => page.issues?.keyboardNavigation?.length > 0);
    if (pagesWithKeyboard.length > 0) {
      lines.push(`- **Pages with Keyboard Navigation**: ${pagesWithKeyboard.length}`);
    }

    // Color Contrast Issues if available
    const totalColorIssues = data.pages.reduce((sum: number, page: any) => sum + (page.issues?.colorContrastIssues?.length || 0), 0);
    if (totalColorIssues > 0) {
      lines.push(`- **Total Color Contrast Issues**: ${totalColorIssues}`);
    }

    // Focus Management Issues if available
    const totalFocusIssues = data.pages.reduce((sum: number, page: any) => sum + (page.issues?.focusManagementIssues?.length || 0), 0);
    if (totalFocusIssues > 0) {
      lines.push(`- **Total Focus Management Issues**: ${totalFocusIssues}`);
    }
    lines.push('');
    
    // Pages
    if (data.pages.length > 0) {
      lines.push('## Page Results');
      lines.push('');
      lines.push('| URL | Title | Status | Load Time | Errors | Warnings | Pa11y Score | Performance | Keyboard | Contrast | Focus |');
      lines.push('|-----|-------|--------|-----------|--------|----------|-------------|-------------|----------|----------|-------|');
      
      data.pages.forEach((page: any) => {
        const pa11yScore = page.issues?.pa11yScore || 'N/A';
        const performanceScore = page.issues?.performanceMetrics?.loadTime ? 
          Math.max(0, 100 - Math.round(page.issues.performanceMetrics.loadTime / 100)) : 'N/A';
        const keyboardCount = page.issues?.keyboardNavigation?.length || 0;
        const contrastCount = page.issues?.colorContrastIssues?.length || 0;
        const focusCount = page.issues?.focusManagementIssues?.length || 0;
        
        lines.push(`| ${page.url} | ${page.title} | ${page.status} | ${page.loadTime}ms | ${page.errors} | ${page.warnings} | ${pa11yScore} | ${performanceScore} | ${keyboardCount} | ${contrastCount} | ${focusCount} |`);
      });
      lines.push('');
    }
    
    // Detailed Pa11y Issues
    const pagesWithPa11yIssues = data.pages.filter((page: any) => page.issues?.pa11yIssues && page.issues.pa11yIssues.length > 0);
    if (pagesWithPa11yIssues.length > 0) {
      lines.push('## Detailed Pa11y Issues');
      lines.push('');
      
      pagesWithPa11yIssues.forEach((page: any) => {
        lines.push(`### ${page.title} (${page.url})`);
        lines.push('');
        
        page.issues.pa11yIssues.forEach((issue: any) => {
          lines.push(`#### ${issue.code}`);
          lines.push(`- **Type**: ${issue.type}`);
          lines.push(`- **Impact**: ${issue.impact || 'Unknown'}`);
          lines.push(`- **Message**: ${issue.message}`);
          if (issue.selector) {
            lines.push(`- **Element**: \`${issue.selector}\``);
          }
          if (issue.context) {
            lines.push(`- **Context**: \`${issue.context}\``);
          }
          if (issue.help) {
            lines.push(`- **Help**: ${issue.help}`);
          }
          if (issue.helpUrl) {
            lines.push(`- **More Info**: ${issue.helpUrl}`);
          }
          lines.push('');
        });
      });
    }

    // 🆕 Detailed Playwright Test Results
    const pagesWithPlaywrightTests = data.pages.filter((page: any) => 
      page.issues?.keyboardNavigation?.length > 0 || 
      page.issues?.colorContrastIssues?.length > 0 || 
      page.issues?.focusManagementIssues?.length > 0 ||
      page.issues?.performanceMetrics ||
      page.issues?.screenshots
    );

    if (pagesWithPlaywrightTests.length > 0) {
      lines.push('## Detailed Playwright Test Results');
      lines.push('');
      
      pagesWithPlaywrightTests.forEach((page: any) => {
        lines.push(`### ${page.title} (${page.url})`);
        lines.push('');
        
        // Performance Metrics
        if (page.issues?.performanceMetrics) {
          lines.push('#### Performance Metrics');
          const metrics = page.issues.performanceMetrics;
          lines.push(`- **Load Time**: ${Math.round(metrics.loadTime)}ms`);
          lines.push(`- **DOM Content Loaded**: ${Math.round(metrics.domContentLoaded)}ms`);
          lines.push(`- **First Paint**: ${Math.round(metrics.firstPaint)}ms`);
          lines.push(`- **First Contentful Paint**: ${Math.round(metrics.firstContentfulPaint)}ms`);
          lines.push(`- **Largest Contentful Paint**: ${Math.round(metrics.largestContentfulPaint)}ms`);
          lines.push('');
        }

        // Keyboard Navigation
        if (page.issues?.keyboardNavigation?.length > 0) {
          lines.push('#### Keyboard Navigation Elements');
          page.issues.keyboardNavigation.forEach((element: string, index: number) => {
            lines.push(`${index + 1}. ${element}`);
          });
          lines.push('');
        }

        // Color Contrast Issues
        if (page.issues?.colorContrastIssues?.length > 0) {
          lines.push('#### Color Contrast Issues');
          page.issues.colorContrastIssues.forEach((issue: string, index: number) => {
            lines.push(`${index + 1}. ${issue}`);
          });
          lines.push('');
        }

        // Focus Management Issues
        if (page.issues?.focusManagementIssues?.length > 0) {
          lines.push('#### Focus Management Issues');
          page.issues.focusManagementIssues.forEach((issue: string, index: number) => {
            lines.push(`${index + 1}. ${issue}`);
          });
          lines.push('');
        }

        // Screenshots
        if (page.issues?.screenshots) {
          lines.push('#### Screenshots');
          if (page.issues.screenshots.desktop) {
            lines.push(`- **Desktop**: ${page.issues.screenshots.desktop}`);
          }
          if (page.issues.screenshots.mobile) {
            lines.push(`- **Mobile**: ${page.issues.screenshots.mobile}`);
          }
          lines.push('');
        }
      });
    }
    
    // Recommendations
    if (data.recommendations.length > 0) {
      lines.push('## Recommendations');
      lines.push('');
      data.recommendations.forEach((rec: string) => {
        lines.push(`- ${rec}`);
      });
      lines.push('');
    }
    
    return lines.join('\n');
  }
  
  private generateHTML(data: any, options: OutputOptions): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .passed { color: green; }
        .failed { color: red; }
        .warning { color: orange; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Accessibility Test Report</h1>
    <p>Generated: ${data.metadata.timestamp}</p>
    
    <div class="summary">
        <h2>Summary</h2>
        <p><strong>Overall Status:</strong> <span class="${data.summary.overall === 'PASSED' ? 'passed' : 'failed'}">${data.summary.overall}</span></p>
        <p><strong>Success Rate:</strong> ${data.metadata.successRate}</p>
        <p><strong>Score:</strong> ${data.summary.score}/100</p>
        <p><strong>Critical Issues:</strong> ${data.summary.criticalIssues}</p>
        <p><strong>Warnings:</strong> ${data.summary.warnings}</p>
    </div>
    
    ${data.pages.length > 0 ? `
    <h2>Page Results</h2>
    <table>
        <tr>
            <th>URL</th>
            <th>Title</th>
            <th>Status</th>
            <th>Load Time</th>
            <th>Errors</th>
            <th>Warnings</th>
        </tr>
        ${data.pages.map((page: any) => `
        <tr>
            <td>${page.url}</td>
            <td>${page.title}</td>
            <td class="${page.status === 'PASSED' ? 'passed' : 'failed'}">${page.status}</td>
            <td>${page.loadTime}ms</td>
            <td>${page.errors}</td>
            <td>${page.warnings}</td>
        </tr>
        `).join('')}
    </table>
    ` : ''}
    
    ${data.recommendations.length > 0 ? `
    <h2>Recommendations</h2>
    <ul>
        ${data.recommendations.map((rec: string) => `<li>${rec}</li>`).join('')}
    </ul>
    ` : ''}
</body>
</html>`;
  }
  
  private generateRecommendations(summary: TestSummary): string[] {
    const recommendations: string[] = [];
    
    if (summary.totalErrors > 0) {
      recommendations.push(`Fix ${summary.totalErrors} critical accessibility errors to meet WCAG standards.`);
    }
    
    if (summary.totalWarnings > 0) {
      recommendations.push(`Address ${summary.totalWarnings} accessibility warnings to improve user experience.`);
    }
    
    if (summary.failedPages > 0) {
      recommendations.push(`Review and fix issues on ${summary.failedPages} pages that failed accessibility tests.`);
    }
    
    const successRate = summary.testedPages > 0 ? (summary.passedPages / summary.testedPages) * 100 : 0;
    if (successRate < 80) {
      recommendations.push(`Improve overall accessibility score (currently ${successRate.toFixed(1)}%) to reach at least 80%.`);
    }
    
    if (summary.totalDuration > 30000) {
      recommendations.push(`Optimize page load times - average load time is ${Math.round(summary.totalDuration / summary.testedPages)}ms.`);
    }
    
    return recommendations;
  }
} 