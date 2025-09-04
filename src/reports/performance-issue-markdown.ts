import { AuditIssue } from '../types';
import { groupByPage, sortBySeverity, sortByType } from './report-utils';

export class PerformanceIssueMarkdownReport {
  static generate(issues: AuditIssue[]): string {
    if (!Array.isArray(issues)) issues = [];
    // console.log('DEBUG performance-issue-markdown: issues', issues); // Hidden - use --verbose for debug logs
    const lines: string[] = [];
    lines.push('# 📊 Performance Issue Report');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push(`Total Issues: ${issues.length}`);
    lines.push('');

    // Filter nur auf Performance-Issues
    const performanceIssues = issues.filter(issue => issue.reportType === 'performance');
    if (performanceIssues.length === 0) {
      lines.push('✅ No performance issues found!');
      return lines.join('\n');
    }

    // Gruppiere nach Seite
    const issuesByPage = groupByPage(performanceIssues) || {};
    // console.log('DEBUG performance-issue-markdown: issuesByPage', issuesByPage); // Hidden - use --verbose for debug logs
    for (const [pageUrl, pageIssues] of Object.entries(issuesByPage)) {
      lines.push(`## Page: ${pageUrl}`);
      if (pageIssues[0]?.pageTitle) {
        lines.push(`**Title:** ${pageIssues[0].pageTitle}`);
      }
      lines.push('');
      const sorted = sortByType(sortBySeverity(pageIssues));
      sorted.forEach((issue, idx) => {
        lines.push(`### Issue ${idx + 1}`);
        lines.push(`- **Type:** ${issue.type}`);
        lines.push(`- **Severity:** ${issue.severity}`);
        if (issue.metric) lines.push(`- **Metric:** ${issue.metric}`);
        if (issue.score !== undefined) lines.push(`- **Score:** ${issue.score}`);
        if (issue.source) lines.push(`- **Source:** ${issue.source}`);
        lines.push(`- **Message:** ${issue.message}`);
        if (issue.code) lines.push(`- **Code:** ${issue.code}`);
        if (issue.selector) lines.push(`- **Selector:** \`${issue.selector}\``);
        if (issue.context) lines.push(`- **Context:** \`${issue.context}\``);
        if (issue.htmlSnippet) {
          lines.push('- **HTML Snippet:**');
          lines.push('```html');
          lines.push(issue.htmlSnippet);
          lines.push('```');
        }
        if (issue.lineNumber) lines.push(`- **Line:** ${issue.lineNumber}`);
        if (issue.recommendation) lines.push(`- **Recommendation:** ${issue.recommendation}`);
        if (issue.resource) lines.push(`- **Resource:** ${issue.resource}`);
        lines.push('');
      });
    }

    return lines.join('\n');
  }
} 