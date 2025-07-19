import { AccessibilityChecker } from '../core/accessibility-checker';
import { SitemapParser } from '../parsers/sitemap-parser';
import { TestOptions, AccessibilityResult, TestSummary } from '../types';

export interface ServiceOptions {
  maxPages?: number;
  timeout?: number;
  standard?: string;
  detailedReport?: boolean;
  performanceReport?: boolean;
  seoReport?: boolean;
  securityReport?: boolean;
  verbose?: boolean;
}

export interface ServiceResult {
  success: boolean;
  results: AccessibilityResult[];
  summary: {
    totalPages: number;
    passedPages: number;
    failedPages: number;
    totalErrors: number;
    totalWarnings: number;
    successRate: number;
  };
  reports?: {
    detailed?: string;
    performance?: string;
    seo?: string;
    security?: string;
  };
  error?: string;
}

export class AccessibilityService {
  private checker: AccessibilityChecker;
  private parser: SitemapParser;

  constructor() {
    this.checker = new AccessibilityChecker();
    this.parser = new SitemapParser();
  }

  async initialize(): Promise<void> {
    await this.checker.initialize();
  }

  async cleanup(): Promise<void> {
    await this.checker.cleanup();
  }

  async testSitemap(sitemapUrl: string, options: ServiceOptions = {}): Promise<ServiceResult> {
    try {
      // Parse sitemap
      const urls = await this.parser.parseSitemap(sitemapUrl);
      
      // Apply filters and limits
      const filterPatterns = ['[...slug]', '[category]', '/demo/'];
      const filteredUrls = this.parser.filterUrls(urls, { filterPatterns });
      const limitedUrls = filteredUrls.slice(0, options.maxPages || 20);

      // Convert to TestOptions
      const testOptions: TestOptions = {
        timeout: options.timeout || 10000,
        waitUntil: 'domcontentloaded',
        pa11yStandard: options.standard as any || 'WCAG2AA',
        verbose: options.verbose || false,
        collectPerformanceMetrics: options.performanceReport,
        lighthouse: options.performanceReport,
        // Add other options as needed
      };

      // Run tests
      const results = await this.checker.testMultiplePagesParallel(
        limitedUrls.map(url => url.loc),
        testOptions
      );

      // Generate summary
      const summary = this.generateSummary(results);

      // Generate reports if requested
      const reports: any = {};
      
      if (options.detailedReport) {
        reports.detailed = await this.generateDetailedReport(results);
      }
      
      if (options.performanceReport) {
        reports.performance = await this.generatePerformanceReport(results);
      }
      
      if (options.seoReport) {
        reports.seo = await this.generateSeoReport(results);
      }
      
      if (options.securityReport) {
        reports.security = await this.generateSecurityReport(results);
      }

      return {
        success: summary.successRate === 100,
        results,
        summary,
        reports: Object.keys(reports).length > 0 ? reports : undefined
      };

    } catch (error) {
      return {
        success: false,
        results: [],
        summary: {
          totalPages: 0,
          passedPages: 0,
          failedPages: 0,
          totalErrors: 0,
          totalWarnings: 0,
          successRate: 0
        },
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private generateSummary(results: AccessibilityResult[]) {
    const totalPages = results.length;
    const passedPages = results.filter(r => r.passed).length;
    const failedPages = totalPages - passedPages;
    
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
    
    const successRate = totalPages > 0 ? (passedPages / totalPages) * 100 : 0;

    return {
      totalPages,
      passedPages,
      failedPages,
      totalErrors,
      totalWarnings,
      successRate
    };
  }

  private async generateDetailedReport(results: AccessibilityResult[]): Promise<string> {
    // Import here to avoid circular dependencies
    const { DetailedReportGenerator } = await import('../reports/detailed-report');
    const generator = new DetailedReportGenerator();
    
    const summary: TestSummary = {
      totalPages: results.length,
      testedPages: results.length,
      passedPages: results.filter(r => r.passed).length,
      failedPages: results.filter(r => !r.passed).length,
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
      results
    };

    return await generator.generateDetailedReport(summary);
  }

  private async generatePerformanceReport(results: AccessibilityResult[]): Promise<string> {
    // Import here to avoid circular dependencies
    const { PerformanceReportGenerator } = await import('../reports/performance-report');
    const generator = new PerformanceReportGenerator();
    
    const summary: TestSummary = {
      totalPages: results.length,
      testedPages: results.length,
      passedPages: results.filter(r => r.passed).length,
      failedPages: results.filter(r => !r.passed).length,
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
      results
    };

    return await generator.generatePerformanceReport(summary);
  }

  private async generateSeoReport(results: AccessibilityResult[]): Promise<string> {
    // Import here to avoid circular dependencies
    const { SeoReportGenerator } = await import('../reports/seo-report');
    const generator = new SeoReportGenerator();
    
    const summary: TestSummary = {
      totalPages: results.length,
      testedPages: results.length,
      passedPages: results.filter(r => r.passed).length,
      failedPages: results.filter(r => !r.passed).length,
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
      results
    };

    return await generator.generateSeoReport(summary);
  }

  private async generateSecurityReport(results: AccessibilityResult[]): Promise<string> {
    // Placeholder for security report
    return `# Security Report\n\nSecurity scanning not yet implemented.`;
  }
} 