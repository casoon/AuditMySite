import { TestSummary, AccessibilityResult } from '../types';

export interface CsvExportOptions {
  includeDetails?: boolean;
  includeHeaders?: boolean;
  delimiter?: string;
}

export class CsvGenerator {
  /**
   * Generiert CSV-Export für Test-Ergebnisse
   */
  generateCsv(summary: TestSummary, options: CsvExportOptions = {}): string {
    const delimiter = options.delimiter || ',';
    const includeHeaders = options.includeHeaders !== false;
    
    let csv = '';
    
    // Headers
    if (includeHeaders) {
      const headers = [
        'URL',
        'Title',
        'Status',
        'Duration (ms)',
        'Error Count',
        'Warning Count',
        'Images Without Alt',
        'Buttons Without Label',
        'Headings Count'
      ];
      
      if (options.includeDetails) {
        headers.push('Pa11y Score', 'Performance Score', 'Accessibility Score');
      }
      
      csv += headers.join(delimiter) + '\n';
    }
    
    // Data rows
    summary.results.forEach(result => {
      const row = [
        this.escapeCsvValue(result.url),
        this.escapeCsvValue(result.title),
        result.passed ? 'PASS' : 'FAIL',
        result.duration.toString(),
        result.errors.length.toString(),
        result.warnings.length.toString(),
        result.imagesWithoutAlt.toString(),
        result.buttonsWithoutLabel.toString(),
        result.headingsCount.toString()
      ];
      
      if (options.includeDetails) {
        row.push(
          (result.pa11yScore || 0).toString(),
          (result.lighthouseScores?.performance || 0).toString(),
          (result.lighthouseScores?.accessibility || 0).toString()
        );
      }
      
      csv += row.join(delimiter) + '\n';
    });
    
    return csv;
  }

  /**
   * Generiert detaillierten CSV-Export mit Fehlern
   */
  generateDetailedCsv(summary: TestSummary, options: CsvExportOptions = {}): string {
    const delimiter = options.delimiter || ',';
    const includeHeaders = options.includeHeaders !== false;
    
    let csv = '';
    
    // Headers für detaillierten Export
    if (includeHeaders) {
      const headers = [
        'URL',
        'Error Type',
        'Error Message',
        'Impact',
        'Code',
        'Selector'
      ];
      csv += headers.join(delimiter) + '\n';
    }
    
    // Data rows für jeden Fehler
    summary.results.forEach(result => {
      result.errors.forEach(error => {
        const row = [
          this.escapeCsvValue(result.url),
          this.extractErrorType(error),
          this.escapeCsvValue(error),
          'error',
          '',
          ''
        ];
        csv += row.join(delimiter) + '\n';
      });
      
      result.warnings.forEach(warning => {
        const row = [
          this.escapeCsvValue(result.url),
          this.extractErrorType(warning),
          this.escapeCsvValue(warning),
          'warning',
          '',
          ''
        ];
        csv += row.join(delimiter) + '\n';
      });
    });
    
    return csv;
  }

  /**
   * Generiert CSV-Export für Pa11y Issues
   */
  generatePa11yCsv(summary: TestSummary, options: CsvExportOptions = {}): string {
    const delimiter = options.delimiter || ',';
    const includeHeaders = options.includeHeaders !== false;
    
    let csv = '';
    
    // Headers für Pa11y Export
    if (includeHeaders) {
      const headers = [
        'URL',
        'Code',
        'Message',
        'Type',
        'Selector',
        'Context',
        'Impact',
        'Help'
      ];
      csv += headers.join(delimiter) + '\n';
    }
    
    // Data rows für Pa11y Issues
    summary.results.forEach(result => {
      if (result.pa11yIssues) {
        result.pa11yIssues.forEach(issue => {
          const row = [
            this.escapeCsvValue(result.url),
            this.escapeCsvValue(issue.code),
            this.escapeCsvValue(issue.message),
            issue.type,
            this.escapeCsvValue(issue.selector || ''),
            this.escapeCsvValue(issue.context || ''),
            this.escapeCsvValue(issue.impact || ''),
            this.escapeCsvValue(issue.help || '')
          ];
          csv += row.join(delimiter) + '\n';
        });
      }
    });
    
    return csv;
  }

  /**
   * Generiert CSV-Export für Performance-Metriken
   */
  generatePerformanceCsv(summary: TestSummary, options: CsvExportOptions = {}): string {
    const delimiter = options.delimiter || ',';
    const includeHeaders = options.includeHeaders !== false;
    
    let csv = '';
    
    // Headers für Performance Export
    if (includeHeaders) {
      const headers = [
        'URL',
        'Load Time (ms)',
        'DOM Content Loaded (ms)',
        'First Paint (ms)',
        'First Contentful Paint (ms)',
        'Largest Contentful Paint (ms)',
        'Performance Score',
        'Accessibility Score',
        'Best Practices Score',
        'SEO Score'
      ];
      csv += headers.join(delimiter) + '\n';
    }
    
    // Data rows für Performance-Metriken
    summary.results.forEach(result => {
      const row = [
        this.escapeCsvValue(result.url),
        (result.performanceMetrics?.loadTime || 0).toString(),
        (result.performanceMetrics?.domContentLoaded || 0).toString(),
        (result.performanceMetrics?.firstPaint || 0).toString(),
        (result.performanceMetrics?.firstContentfulPaint || 0).toString(),
        (result.performanceMetrics?.largestContentfulPaint || 0).toString(),
        (result.lighthouseScores?.performance || 0).toString(),
        (result.lighthouseScores?.accessibility || 0).toString(),
        (result.lighthouseScores?.bestPractices || 0).toString(),
        (result.lighthouseScores?.seo || 0).toString()
      ];
      csv += row.join(delimiter) + '\n';
    });
    
    return csv;
  }

  /**
   * Generiert Zusammenfassungs-CSV
   */
  generateSummaryCsv(summary: TestSummary, options: CsvExportOptions = {}): string {
    const delimiter = options.delimiter || ',';
    const includeHeaders = options.includeHeaders !== false;
    
    let csv = '';
    
    // Headers für Zusammenfassung
    if (includeHeaders) {
      const headers = [
        'Metric',
        'Value',
        'Percentage'
      ];
      csv += headers.join(delimiter) + '\n';
    }
    
    // Data rows für Zusammenfassung
    const successRate = summary.testedPages > 0 ? (summary.passedPages / summary.testedPages * 100) : 0;
    
    const summaryData = [
      ['Total Pages', summary.totalPages.toString(), '100%'],
      ['Tested Pages', summary.testedPages.toString(), `${((summary.testedPages / summary.totalPages) * 100).toFixed(1)}%`],
      ['Passed Pages', summary.passedPages.toString(), `${((summary.passedPages / summary.totalPages) * 100).toFixed(1)}%`],
      ['Failed Pages', summary.failedPages.toString(), `${((summary.failedPages / summary.totalPages) * 100).toFixed(1)}%`],
      ['Total Errors', summary.totalErrors.toString(), ''],
      ['Total Warnings', summary.totalWarnings.toString(), ''],
      ['Success Rate', `${successRate.toFixed(1)}%`, ''],
      ['Average Duration', `${(summary.totalDuration / summary.testedPages).toFixed(0)}ms`, '']
    ];
    
    summaryData.forEach(row => {
      csv += row.join(delimiter) + '\n';
    });
    
    return csv;
  }

  /**
   * Escaped CSV-Werte
   */
  private escapeCsvValue(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  /**
   * Extrahiert Fehler-Typ aus Error-Message
   */
  private extractErrorType(errorMessage: string): string {
    const lowerMessage = errorMessage.toLowerCase();
    
    if (lowerMessage.includes('alt') || lowerMessage.includes('image')) {
      return 'missing-alt-text';
    }
    if (lowerMessage.includes('contrast') || lowerMessage.includes('color')) {
      return 'color-contrast';
    }
    if (lowerMessage.includes('label') || lowerMessage.includes('form')) {
      return 'missing-labels';
    }
    if (lowerMessage.includes('heading') || lowerMessage.includes('h1') || lowerMessage.includes('h2')) {
      return 'heading-structure';
    }
    if (lowerMessage.includes('aria') || lowerMessage.includes('role')) {
      return 'aria-labels';
    }
    if (lowerMessage.includes('button') || lowerMessage.includes('link')) {
      return 'interactive-elements';
    }
    if (lowerMessage.includes('table') || lowerMessage.includes('list')) {
      return 'structure';
    }
    
    return 'other';
  }

  /**
   * Speichert CSV-Export in Datei
   */
  async saveToFile(summary: TestSummary, filePath: string, options: CsvExportOptions = {}): Promise<void> {
    const fs = require('fs').promises;
    const csvContent = this.generateCsv(summary, options);
    await fs.writeFile(filePath, csvContent, 'utf8');
  }

  /**
   * Speichert detaillierten CSV-Export in Datei
   */
  async saveDetailedToFile(summary: TestSummary, filePath: string, options: CsvExportOptions = {}): Promise<void> {
    const fs = require('fs').promises;
    const csvContent = this.generateDetailedCsv(summary, options);
    await fs.writeFile(filePath, csvContent, 'utf8');
  }

  /**
   * Speichert Pa11y CSV-Export in Datei
   */
  async savePa11yToFile(summary: TestSummary, filePath: string, options: CsvExportOptions = {}): Promise<void> {
    const fs = require('fs').promises;
    const csvContent = this.generatePa11yCsv(summary, options);
    await fs.writeFile(filePath, csvContent, 'utf8');
  }

  /**
   * Speichert Performance CSV-Export in Datei
   */
  async savePerformanceToFile(summary: TestSummary, filePath: string, options: CsvExportOptions = {}): Promise<void> {
    const fs = require('fs').promises;
    const csvContent = this.generatePerformanceCsv(summary, options);
    await fs.writeFile(filePath, csvContent, 'utf8');
  }

  /**
   * Speichert Zusammenfassungs-CSV in Datei
   */
  async saveSummaryToFile(summary: TestSummary, filePath: string, options: CsvExportOptions = {}): Promise<void> {
    const fs = require('fs').promises;
    const csvContent = this.generateSummaryCsv(summary, options);
    await fs.writeFile(filePath, csvContent, 'utf8');
  }
} 