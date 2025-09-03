import { AccessibilityResult, DetailedIssue, Pa11yIssue } from '@core/types';

function extractHtmlSnippet(contextOrMessage?: string): string | undefined {
  if (!contextOrMessage) return undefined;
  if (contextOrMessage.trim().startsWith('<')) {
    return contextOrMessage.trim().substring(0, 200);
  }
  const match = contextOrMessage.match(/<[^>]+>/);
  if (match) return match[0];
  return undefined;
}

function pseudoLineNumber(str?: string): number | undefined {
  if (!str) return undefined;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 1000 + 1;
}

function extractSource(result: AccessibilityResult, fallback: string): string {
  // Versuche Kategorie aus details zu lesen (casoon/aria, casoon/form, ...)
  if ((result as any).details && (result as any).details.category) {
    return `casoon/${(result as any).details.category}`;
  }
  return fallback;
}

export class DetailedIssueCollector {
  static collectAll(results: AccessibilityResult[]): DetailedIssue[] {
    const issues: DetailedIssue[] = [];

    results.forEach(result => {
      // Playwright-Fehler
      result.errors.forEach(error => {
        const htmlSnippet = extractHtmlSnippet(error);
        issues.push({
          reportType: 'accessibility',
          pageUrl: result.url,
          pageTitle: result.title,
          type: 'playwright',
          severity: 'error',
          message: error,
          htmlSnippet,
          lineNumber: pseudoLineNumber(htmlSnippet),
          source: extractSource(result, 'playwright')
        });
      });

      // Playwright-Warnungen
      result.warnings.forEach(warning => {
        const htmlSnippet = extractHtmlSnippet(warning);
        issues.push({
          reportType: 'accessibility',
          pageUrl: result.url,
          pageTitle: result.title,
          type: 'playwright',
          severity: 'warning',
          message: warning,
          htmlSnippet,
          lineNumber: pseudoLineNumber(htmlSnippet),
          source: extractSource(result, 'playwright')
        });
      });

      // Pa11y-Issues (Fehler und Warnungen)
      if (result.pa11yIssues) {
        result.pa11yIssues.forEach((issue: Pa11yIssue) => {
          const htmlSnippet = extractHtmlSnippet(issue.context) || extractHtmlSnippet(issue.message);
          issues.push({
            reportType: 'accessibility',
            pageUrl: result.url,
            pageTitle: result.title,
            type: issue.type,
            severity: issue.type as 'error' | 'warning',
            message: issue.message,
            code: issue.code,
            selector: issue.selector,
            context: issue.context,
            htmlSnippet,
            lineNumber: pseudoLineNumber(htmlSnippet),
            source: 'pa11y'
          });
        });
      }
    });

    return issues;
  }
} 