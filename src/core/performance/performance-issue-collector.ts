import { TestSummary, AuditIssue } from '@core/types';

export class PerformanceIssueCollector {
  static collectAll(summary: TestSummary): AuditIssue[] {
    const issues: AuditIssue[] = [];
    
    for (const result of summary.results) {
      // Ladezeit prüfen
      if (result.performanceMetrics && result.performanceMetrics.loadTime > 3000) {
        issues.push({
          reportType: 'performance',
          pageUrl: result.url,
          pageTitle: result.title,
          type: 'loadTime',
          severity: 'warning',
          message: `Slow page load: ${result.performanceMetrics.loadTime}ms`,
          code: undefined,
          selector: undefined,
          context: undefined,
          htmlSnippet: undefined,
          lineNumber: undefined,
          source: 'performance',
          metric: 'loadTime',
          score: result.performanceMetrics.loadTime < 5000 ? 70 : 50,
          recommendation: 'Optimize page load performance by reducing server response time, optimizing images, and minimizing render-blocking resources.'
        });
      }

      // First Contentful Paint (FCP) prüfen
      if (result.performanceMetrics && result.performanceMetrics.firstContentfulPaint > 2000) {
        issues.push({
          reportType: 'performance',
          pageUrl: result.url,
          pageTitle: result.title,
          type: 'fcp',
          severity: 'warning',
          message: `Slow First Contentful Paint: ${result.performanceMetrics.firstContentfulPaint}ms`,
          code: undefined,
          selector: undefined,
          context: undefined,
          htmlSnippet: undefined,
          lineNumber: undefined,
          source: 'performance',
          metric: 'fcp',
          score: result.performanceMetrics.firstContentfulPaint < 3000 ? 70 : 50,
          recommendation: 'Optimize FCP by reducing server response time and eliminating render-blocking resources.'
        });
      }

      // Largest Contentful Paint (LCP) prüfen
      if (result.performanceMetrics && result.performanceMetrics.largestContentfulPaint > 2500) {
        issues.push({
          reportType: 'performance',
          pageUrl: result.url,
          pageTitle: result.title,
          type: 'lcp',
          severity: 'error',
          message: `Slow Largest Contentful Paint: ${result.performanceMetrics.largestContentfulPaint}ms`,
          code: undefined,
          selector: undefined,
          context: undefined,
          htmlSnippet: undefined,
          lineNumber: undefined,
          source: 'performance',
          metric: 'lcp',
          score: result.performanceMetrics.largestContentfulPaint < 4000 ? 60 : 30,
          recommendation: 'Optimize LCP by optimizing images, using efficient image formats, and implementing lazy loading.'
        });
      }

      // DOM Content Loaded prüfen
      if (result.performanceMetrics && result.performanceMetrics.domContentLoaded > 2000) {
        issues.push({
          reportType: 'performance',
          pageUrl: result.url,
          pageTitle: result.title,
          type: 'domContentLoaded',
          severity: 'warning',
          message: `Slow DOM Content Loaded: ${result.performanceMetrics.domContentLoaded}ms`,
          code: undefined,
          selector: undefined,
          context: undefined,
          htmlSnippet: undefined,
          lineNumber: undefined,
          source: 'performance',
          metric: 'domContentLoaded',
          score: result.performanceMetrics.domContentLoaded < 3000 ? 70 : 50,
          recommendation: 'Optimize DOM Content Loaded by reducing HTML size and eliminating render-blocking resources.'
        });
      }

      // First Paint prüfen
      if (result.performanceMetrics && result.performanceMetrics.firstPaint > 1500) {
        issues.push({
          reportType: 'performance',
          pageUrl: result.url,
          pageTitle: result.title,
          type: 'firstPaint',
          severity: 'info',
          message: `Slow First Paint: ${result.performanceMetrics.firstPaint}ms`,
          code: undefined,
          selector: undefined,
          context: undefined,
          htmlSnippet: undefined,
          lineNumber: undefined,
          source: 'performance',
          metric: 'firstPaint',
          score: result.performanceMetrics.firstPaint < 2500 ? 80 : 60,
          recommendation: 'Optimize First Paint by reducing server response time and critical rendering path.'
        });
      }
    }
    
    return issues;
  }
} 