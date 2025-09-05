/**
 * 🎯 Unified Report Export Types - Single Source of Truth
 * 
 * This is the ONLY data structure definition for ALL parts of AuditMySite:
 * - CLI tool
 * - Node.js SDK  
 * - REST API
 * - Report generators (HTML, Markdown, JSON, etc.)
 * - External integrations
 * 
 * ⚠️  DO NOT create duplicate types elsewhere!
 * ⚠️  All changes here must be backwards compatible!
 */

export interface ReportMetadata {
  /** Report generation timestamp */
  timestamp: string;
  /** AuditMySite version */
  version: string;
  /** Total report generation duration in milliseconds */
  duration: number;
  /** Target domain/website */
  domain: string;
  /** Source URL (e.g., sitemap) */
  sourceUrl?: string;
  /** Report generation configuration */
  config: ReportConfig;
}

export interface ReportConfig {
  /** Maximum pages tested */
  maxPages: number;
  /** Test timeout in milliseconds */
  timeout: number;
  /** Pa11y standard used */
  pa11yStandard: string;
  /** Whether performance metrics were collected */
  collectPerformanceMetrics: boolean;
  /** Whether screenshots were captured */
  captureScreenshots: boolean;
  /** Whether keyboard navigation was tested */
  testKeyboardNavigation: boolean;
  /** Whether color contrast was tested */
  testColorContrast: boolean;
  /** Whether focus management was tested */
  testFocusManagement: boolean;
}

export interface ReportSummary {
  /** Total pages discovered */
  totalPages: number;
  /** Pages actually tested */
  testedPages: number;
  /** Pages that passed all tests */
  passedPages: number;
  /** Pages that failed accessibility tests */
  failedPages: number;
  /** Pages that crashed during testing */
  crashedPages: number;
  /** Total errors across all pages */
  totalErrors: number;
  /** Total warnings across all pages */
  totalWarnings: number;
  /** Total test duration in milliseconds */
  totalDuration: number;
  /** Overall success rate percentage (0-100) */
  successRate: number;
  /** Average accessibility score */
  avgAccessibilityScore: number;
  /** Average performance score (if collected) */
  avgPerformanceScore?: number;
}

export interface PageResult {
  /** Page URL */
  url: string;
  /** Page title */
  title?: string;
  /** Test status */
  status: 'passed' | 'failed' | 'crashed';
  /** Whether page passed all tests */
  passed: boolean;
  /** Whether page crashed during testing */
  crashed?: boolean;
  /** Test duration in milliseconds */
  duration: number;
  /** Accessibility errors */
  errors: string[];
  /** Accessibility warnings */
  warnings: string[];
  /** Detailed issues */
  issues?: PageIssues;
  /** Performance metrics (if collected) */
  performanceMetrics?: PerformanceMetrics;
  /** Screenshots (if captured) */
  screenshots?: Screenshots;
}

export interface PageIssues {
  /** Pa11y accessibility score (0-100) */
  pa11yScore?: number;
  /** Detailed Pa11y issues */
  pa11yIssues?: Pa11yIssue[];
  /** SEO-related data */
  headingsCount?: number;
  imagesWithoutAlt?: number;
  buttonsWithoutLabel?: number;
  /** Keyboard navigation elements */
  keyboardNavigation?: string[];
  /** Color contrast issues */
  colorContrastIssues?: string[];
  /** Focus management issues */
  focusManagementIssues?: string[];
}

export interface Pa11yIssue {
  /** Issue code/rule */
  code: string;
  /** Issue type (error, warning, notice) */
  type: 'error' | 'warning' | 'notice';
  /** Impact level */
  impact?: 'minor' | 'moderate' | 'serious' | 'critical';
  /** Issue message */
  message: string;
  /** CSS selector */
  selector?: string;
  /** Element context */
  context?: string;
  /** Help text */
  help?: string;
  /** Help URL */
  helpUrl?: string;
}

export interface PerformanceMetrics {
  /** Total page load time in milliseconds */
  loadTime: number;
  /** DOM content loaded time in milliseconds */
  domContentLoaded: number;
  /** First paint time in milliseconds */
  firstPaint: number;
  /** First contentful paint time in milliseconds */
  firstContentfulPaint: number;
  /** Largest contentful paint time in milliseconds */
  largestContentfulPaint: number;
  /** Time to interactive in milliseconds */
  timeToInteractive?: number;
  /** Cumulative layout shift score */
  cumulativeLayoutShift?: number;
  /** Memory usage in bytes */
  memoryUsage?: number;
}

export interface Screenshots {
  /** Desktop screenshot path */
  desktop?: string;
  /** Mobile screenshot path */
  mobile?: string;
}

/**
 * Main Report Export Interface
 * 
 * This is the complete structure that all report generators must support.
 */
export interface UnifiedReportExport {
  /** Report metadata */
  metadata: ReportMetadata;
  /** Summary statistics */
  summary: ReportSummary;
  /** Individual page results */
  pages: PageResult[];
  /** Aggregated recommendations */
  recommendations: ReportRecommendation[];
}

export interface ReportRecommendation {
  /** Recommendation category */
  category: 'accessibility' | 'performance' | 'seo' | 'security';
  /** Priority level */
  priority: 'low' | 'medium' | 'high' | 'critical';
  /** Recommendation title */
  title: string;
  /** Detailed description */
  description: string;
  /** Number of pages affected */
  affectedPages: number;
  /** Potential impact of fixing */
  impact?: string;
  /** Steps to fix */
  actionSteps?: string[];
}

/**
 * Report Export Options
 */
export interface ReportExportOptions {
  /** Include detailed page results */
  includeDetails: boolean;
  /** Summary only mode */
  summaryOnly: boolean;
  /** Include screenshots in export */
  includeScreenshots: boolean;
  /** Include performance data */
  includePerformanceData: boolean;
  /** Maximum number of pages to include */
  maxPages?: number;
  /** Filter by status */
  statusFilter?: ('passed' | 'failed' | 'crashed')[];
}

/**
 * SDK/API specific interfaces
 */

/** 
 * Audit Request Configuration (for SDK/API)
 */
export interface AuditRequest {
  /** Target URL or sitemap URL */
  url: string;
  /** Audit configuration options */
  options?: AuditOptions;
  /** Metadata for tracking */
  metadata?: RequestMetadata;
}

/**
 * Audit Options (for SDK/API)
 */
export interface AuditOptions {
  /** Maximum pages to test */
  maxPages?: number;
  /** Test timeout in milliseconds */
  timeout?: number;
  /** Pa11y standard to use */
  pa11yStandard?: 'WCAG2A' | 'WCAG2AA' | 'WCAG2AAA';
  /** Enable performance metrics collection */
  collectPerformanceMetrics?: boolean;
  /** Enable screenshot capture */
  captureScreenshots?: boolean;
  /** Enable keyboard navigation testing */
  testKeyboardNavigation?: boolean;
  /** Enable color contrast testing */
  testColorContrast?: boolean;
  /** Enable focus management testing */
  testFocusManagement?: boolean;
  /** Output directory for files */
  outputDir?: string;
  /** Output formats to generate */
  outputFormats?: ('html' | 'json' | 'markdown' | 'csv')[];
}

/**
 * Request Metadata (for SDK/API)
 */
export interface RequestMetadata {
  /** Client identifier */
  clientId?: string;
  /** Request ID for tracking */
  requestId?: string;
  /** User agent override */
  userAgent?: string;
  /** Additional tags */
  tags?: string[];
}

/**
 * Audit Response (for SDK/API)
 */
export interface AuditResponse {
  /** Request status */
  status: 'success' | 'error' | 'partial';
  /** Complete report data */
  report: UnifiedReportExport;
  /** Generated file paths (if requested) */
  files?: GeneratedFiles;
  /** Error details (if status is error) */
  error?: AuditError;
}

/**
 * Generated Files (for SDK/API)
 */
export interface GeneratedFiles {
  /** HTML report path */
  html?: string;
  /** JSON report path */
  json?: string;
  /** Markdown report path */
  markdown?: string;
  /** CSV report path */
  csv?: string;
  /** Screenshots directory */
  screenshots?: string;
}

/**
 * Audit Error (for SDK/API)
 */
export interface AuditError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Detailed error information */
  details?: any;
  /** Stack trace (in development) */
  stack?: string;
}

/**
 * Progress Update (for SDK/API streaming)
 */
export interface AuditProgress {
  /** Current step */
  step: 'discovering' | 'testing' | 'generating' | 'completed';
  /** Progress percentage (0-100) */
  progress: number;
  /** Current status message */
  message: string;
  /** Pages completed */
  pagesCompleted: number;
  /** Total pages */
  totalPages: number;
  /** Current page URL being processed */
  currentPage?: string;
}

/**
 * Version Information (for SDK/API)
 */
export interface VersionInfo {
  /** AuditMySite version */
  version: string;
  /** Node.js version */
  nodeVersion: string;
  /** Supported features */
  features: string[];
  /** API compatibility version */
  apiVersion: string;
}

/**
 * Health Check Response (for API)
 */
export interface HealthCheck {
  /** Service status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Version information */
  version: VersionInfo;
  /** Service uptime in seconds */
  uptime: number;
  /** Memory usage information */
  memory?: {
    used: number;
    total: number;
    percentage: number;
  };
  /** Dependencies status */
  dependencies?: {
    [key: string]: 'healthy' | 'unhealthy';
  };
}

/**
 * Helper functions for type validation and formatting
 */
export class ReportExportValidator {
  static validateExport(data: any): data is UnifiedReportExport {
    return (
      data &&
      typeof data === 'object' &&
      data.metadata &&
      data.summary &&
      Array.isArray(data.pages) &&
      Array.isArray(data.recommendations)
    );
  }

  static validateAuditRequest(data: any): data is AuditRequest {
    return (
      data &&
      typeof data === 'object' &&
      typeof data.url === 'string' &&
      data.url.length > 0
    );
  }

  static validateAuditOptions(data: any): data is AuditOptions {
    if (!data || typeof data !== 'object') return true; // Optional
    
    // Validate individual options if present
    if (data.maxPages !== undefined && (typeof data.maxPages !== 'number' || data.maxPages < 1)) {
      return false;
    }
    if (data.timeout !== undefined && (typeof data.timeout !== 'number' || data.timeout < 1000)) {
      return false;
    }
    if (data.pa11yStandard !== undefined && !['WCAG2A', 'WCAG2AA', 'WCAG2AAA'].includes(data.pa11yStandard)) {
      return false;
    }
    
    return true;
  }

  static formatMetric(value: any): string {
    if (value === null || value === undefined || value === 'N/A') return 'N/A';
    const numValue = parseFloat(value);
    return isNaN(numValue) ? 'N/A' : Math.round(numValue).toString();
  }

  static formatDuration(ms: number): string {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    return `${Math.round(ms / 60000)}min`;
  }

  static formatPercentage(value: number): string {
    return `${Math.round(value)}%`;
  }

  static getPageName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname === '/' ? 'Home' : (pathname.split('/').pop() || pathname);
    } catch {
      return url;
    }
  }

  /**
   * Create a minimal valid report for error cases
   */
  static createErrorReport(error: AuditError, url: string): UnifiedReportExport {
    return {
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.8.3',
        duration: 0,
        domain: 'error',
        config: {
          maxPages: 0,
          timeout: 0,
          pa11yStandard: 'WCAG2AA',
          collectPerformanceMetrics: false,
          captureScreenshots: false,
          testKeyboardNavigation: false,
          testColorContrast: false,
          testFocusManagement: false
        }
      },
      summary: {
        totalPages: 0,
        testedPages: 0,
        passedPages: 0,
        failedPages: 0,
        crashedPages: 1,
        totalErrors: 1,
        totalWarnings: 0,
        totalDuration: 0,
        successRate: 0,
        avgAccessibilityScore: 0
      },
      pages: [{
        url,
        status: 'crashed',
        passed: false,
        crashed: true,
        duration: 0,
        errors: [error.message],
        warnings: []
      }],
      recommendations: [{
        category: 'accessibility',
        priority: 'critical',
        title: 'Fix Critical Error',
        description: `Audit failed: ${error.message}`,
        affectedPages: 1
      }]
    };
  }
}
