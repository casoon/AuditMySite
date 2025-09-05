/**
 * 🎯 Unified Report Data Exporter
 * 
 * Converts legacy report data structures to the new unified format.
 * This ensures all report generators use the same standardized data.
 */

import { 
  UnifiedReportExport, 
  ReportMetadata, 
  ReportSummary, 
  PageResult, 
  ReportRecommendation,
  ReportExportValidator
} from '../types/report-export';
import { TestSummary, AccessibilityResult } from '../../types';

export class UnifiedReportExporter {
  private version: string;

  constructor(version: string = '1.8.3') {
    this.version = version;
  }

  /**
   * Convert legacy TestSummary and results to unified format
   */
  exportUnified(
    testSummary: TestSummary, 
    metadata?: any, 
    options?: any
  ): UnifiedReportExport {
    const startTime = Date.now();
    
    // Extract domain from first result
    const domain = this.extractDomain(testSummary.results);
    
    const reportMetadata: ReportMetadata = this.buildMetadata(
      domain, 
      metadata, 
      options,
      startTime
    );

    const summary: ReportSummary = this.buildSummary(testSummary);
    const pages: PageResult[] = this.buildPageResults(testSummary.results);
    const recommendations: ReportRecommendation[] = this.buildRecommendations(
      testSummary, 
      pages
    );

    const export_data: UnifiedReportExport = {
      metadata: reportMetadata,
      summary,
      pages,
      recommendations
    };

    // Validate the export
    if (!ReportExportValidator.validateExport(export_data)) {
      console.warn('⚠️  Generated export data failed validation');
    }

    return export_data;
  }

  private extractDomain(results: AccessibilityResult[]): string {
    if (results.length === 0) return 'unknown';
    
    try {
      return new URL(results[0].url).hostname;
    } catch {
      return 'unknown';
    }
  }

  private buildMetadata(
    domain: string, 
    metadata: any, 
    options: any,
    startTime: number
  ): ReportMetadata {
    return {
      timestamp: metadata?.timestamp || new Date().toISOString(),
      version: this.version,
      duration: Date.now() - startTime,
      domain,
      sourceUrl: metadata?.sitemapUrl,
      config: {
        maxPages: options?.maxPages || 50,
        timeout: options?.timeout || 10000,
        pa11yStandard: options?.pa11yStandard || 'WCAG2AA',
        collectPerformanceMetrics: Boolean(options?.collectPerformanceMetrics),
        captureScreenshots: Boolean(options?.captureScreenshots),
        testKeyboardNavigation: Boolean(options?.testKeyboardNavigation),
        testColorContrast: Boolean(options?.testColorContrast),
        testFocusManagement: Boolean(options?.testFocusManagement)
      }
    };
  }

  private buildSummary(testSummary: TestSummary): ReportSummary {
    const successRate = testSummary.testedPages > 0 
      ? Math.round((testSummary.passedPages / testSummary.testedPages) * 100)
      : 0;

    // Calculate average accessibility score
    const scoresWithValues = testSummary.results
      .map(r => r.pa11yScore)
      .filter(score => score !== undefined && score !== null && !isNaN(score as number)) as number[];
    
    const avgAccessibilityScore = scoresWithValues.length > 0
      ? Math.round(scoresWithValues.reduce((sum, score) => sum + score, 0) / scoresWithValues.length)
      : 0;

    // Calculate average performance score if available
    const performanceResults = testSummary.results.filter(r => r.performanceMetrics);
    const avgPerformanceScore = performanceResults.length > 0
      ? Math.round(performanceResults.reduce((sum, r) => {
          // Simple performance score based on load time (lower is better)
          const loadTime = r.performanceMetrics!.loadTime;
          return sum + Math.max(0, 100 - Math.round(loadTime / 100));
        }, 0) / performanceResults.length)
      : undefined;

    return {
      totalPages: testSummary.totalPages,
      testedPages: testSummary.testedPages,
      passedPages: testSummary.passedPages,
      failedPages: testSummary.failedPages,
      crashedPages: testSummary.crashedPages || 0,
      totalErrors: testSummary.totalErrors,
      totalWarnings: testSummary.totalWarnings,
      totalDuration: testSummary.totalDuration,
      successRate,
      avgAccessibilityScore,
      avgPerformanceScore
    };
  }

  private buildPageResults(results: AccessibilityResult[]): PageResult[] {
    return results.map(result => {
      const status: 'passed' | 'failed' | 'crashed' = 
        result.crashed ? 'crashed' : (result.passed ? 'passed' : 'failed');

      return {
        url: result.url,
        title: result.title,
        status,
        passed: result.passed,
        crashed: result.crashed,
        duration: result.duration,
        errors: result.errors,
        warnings: result.warnings,
        issues: {
          pa11yScore: result.pa11yScore,
          pa11yIssues: result.pa11yIssues?.map((issue: any) => ({
            code: issue.code,
            type: issue.type as 'error' | 'warning' | 'notice',
            impact: issue.impact as 'minor' | 'moderate' | 'serious' | 'critical' | undefined,
            message: issue.message,
            selector: issue.selector,
            context: issue.context,
            help: issue.help,
            helpUrl: issue.helpUrl
          })),
          headingsCount: result.headingsCount,
          imagesWithoutAlt: result.imagesWithoutAlt,
          buttonsWithoutLabel: result.buttonsWithoutLabel,
          keyboardNavigation: result.keyboardNavigation,
          colorContrastIssues: result.colorContrastIssues,
          focusManagementIssues: result.focusManagementIssues
        },
        performanceMetrics: result.performanceMetrics ? {
          loadTime: result.performanceMetrics.loadTime,
          domContentLoaded: result.performanceMetrics.domContentLoaded,
          firstPaint: result.performanceMetrics.firstPaint,
          firstContentfulPaint: result.performanceMetrics.firstContentfulPaint,
          largestContentfulPaint: result.performanceMetrics.largestContentfulPaint,
          timeToInteractive: result.performanceMetrics.interactionToNextPaint,
          cumulativeLayoutShift: result.performanceMetrics.cumulativeLayoutShift,
          memoryUsage: undefined // Not available in current performance metrics
        } : undefined,
        screenshots: result.screenshots
      };
    });
  }

  private buildRecommendations(
    testSummary: TestSummary, 
    pages: PageResult[]
  ): ReportRecommendation[] {
    const recommendations: ReportRecommendation[] = [];

    // Accessibility recommendations
    if (testSummary.totalErrors > 0) {
      recommendations.push({
        category: 'accessibility',
        priority: testSummary.totalErrors > 50 ? 'critical' : 'high',
        title: 'Fix Accessibility Errors',
        description: `Found ${testSummary.totalErrors} accessibility errors across ${testSummary.failedPages} pages that need immediate attention.`,
        affectedPages: testSummary.failedPages,
        impact: 'Improves user experience for people with disabilities and ensures legal compliance.',
        actionSteps: [
          'Review and fix critical accessibility errors first',
          'Ensure proper heading structure and alt text for images',
          'Test with screen readers and keyboard navigation',
          'Validate color contrast ratios meet WCAG standards'
        ]
      });
    }

    // Performance recommendations
    const slowPages = pages.filter(p => 
      p.performanceMetrics && p.performanceMetrics.loadTime > 3000
    );
    
    if (slowPages.length > 0) {
      recommendations.push({
        category: 'performance',
        priority: slowPages.length > testSummary.testedPages / 2 ? 'high' : 'medium',
        title: 'Optimize Page Performance',
        description: `${slowPages.length} pages have load times exceeding 3 seconds, which negatively impacts user experience.`,
        affectedPages: slowPages.length,
        impact: 'Faster loading pages improve user satisfaction and search engine rankings.',
        actionSteps: [
          'Optimize images and use modern formats (WebP, AVIF)',
          'Minimize and compress CSS and JavaScript files',
          'Implement lazy loading for images and content',
          'Use a Content Delivery Network (CDN)',
          'Optimize server response times'
        ]
      });
    }

    // SEO recommendations
    const pagesWithoutTitles = pages.filter(p => !p.title || p.title.trim() === '');
    if (pagesWithoutTitles.length > 0) {
      recommendations.push({
        category: 'seo',
        priority: 'medium',
        title: 'Add Missing Page Titles',
        description: `${pagesWithoutTitles.length} pages are missing titles, which hurts search engine optimization.`,
        affectedPages: pagesWithoutTitles.length,
        impact: 'Proper page titles improve search engine visibility and click-through rates.',
        actionSteps: [
          'Add unique, descriptive titles to each page',
          'Keep titles under 60 characters',
          'Include relevant keywords naturally',
          'Make titles compelling for users'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Export as JSON string with optional formatting
   */
  exportAsJson(
    testSummary: TestSummary, 
    metadata?: any, 
    options?: any,
    pretty: boolean = true
  ): string {
    const data = this.exportUnified(testSummary, metadata, options);
    return JSON.stringify(data, null, pretty ? 2 : 0);
  }

  /**
   * Save JSON export to file
   */
  async saveJsonExport(
    testSummary: TestSummary,
    outputPath: string,
    metadata?: any,
    options?: any
  ): Promise<string> {
    const fs = await import('fs/promises');
    const jsonData = this.exportAsJson(testSummary, metadata, options);
    
    await fs.writeFile(outputPath, jsonData, 'utf8');
    console.log(`📄 JSON export saved: ${outputPath}`);
    
    return outputPath;
  }
}
