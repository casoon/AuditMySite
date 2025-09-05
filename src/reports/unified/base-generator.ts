/**
 * 🔧 Base Report Generator
 * 
 * Abstract base class for all report generators.
 * Provides common functionality and template pattern.
 */

import { TestSummary, AuditIssue } from '../../core/types';

export interface ReportData {
  summary: TestSummary;
  issues: AuditIssue[];
  metadata: {
    timestamp: string;
    version: string;
    duration: number;
    sitemapUrl?: string;
    environment?: string;
  };
  config?: any;
}

export interface ReportOptions {
  outputDir: string;
  filename?: string;
  template?: string;
  includeDetails?: boolean;
  includePa11yIssues?: boolean;
  summaryOnly?: boolean;
  prettyPrint?: boolean; // For JSON formatting
  branding?: {
    logo?: string;
    company?: string;
    footer?: string;
    colors?: {
      primary?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
  };
}

export interface GeneratedReport {
  path: string;
  format: ReportFormat;
  size: number;
  metadata: {
    generatedAt: Date;
    duration: number;
  };
}

export type ReportFormat = 'html' | 'markdown' | 'json' | 'pdf' | 'csv';

export abstract class ReportGenerator {
  protected format: ReportFormat;

  constructor(format: ReportFormat) {
    this.format = format;
  }

  /**
   * Generate report
   */
  abstract generate(data: ReportData, options: ReportOptions): Promise<GeneratedReport>;

  /**
   * Get file extension for this format
   */
  abstract getExtension(): string;

  /**
   * Get MIME type for this format
   */
  abstract getMimeType(): string;

  /**
   * Validate report data
   */
  protected validateData(data: ReportData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.summary) {
      errors.push('Summary is required');
    }

    if (!data.metadata) {
      errors.push('Metadata is required');
    }

    if (!Array.isArray(data.issues)) {
      errors.push('Issues must be an array');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate filename
   */
  protected generateFilename(options: ReportOptions, suffix: string = ''): string {
    if (options.filename) {
      return options.filename;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const formatSuffix = suffix ? `-${suffix}` : '';
    return `audit-report${formatSuffix}-${timestamp}.${this.getExtension()}`;
  }

  /**
   * Calculate file size
   */
  protected calculateFileSize(content: string): number {
    return Buffer.byteLength(content, 'utf8');
  }

  /**
   * Format duration
   */
  protected formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  /**
   * Calculate success rate
   */
  protected calculateSuccessRate(summary: TestSummary): number {
    if (summary.testedPages === 0) return 0;
    return Math.round((summary.passedPages / summary.testedPages) * 100);
  }
}
