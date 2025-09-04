import { DetailedIssue } from '@core/types';

export function groupByPage(issues: DetailedIssue[]): Record<string, DetailedIssue[]> {
  // console.log('groupByPage input', issues); // Hidden - use --verbose for debug logs
  return issues.reduce((groups, issue) => {
    const page = issue.pageUrl;
    if (!groups[page]) {
      groups[page] = [];
    }
    groups[page].push(issue);
    return groups;
  }, {} as Record<string, DetailedIssue[]>);
}

export function sortBySeverity(issues: DetailedIssue[]): DetailedIssue[] {
  const severityOrder = { error: 0, warning: 1, info: 2 };
  return issues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

export function sortByType(issues: DetailedIssue[]): DetailedIssue[] {
  return issues.sort((a, b) => a.type.localeCompare(b.type));
} 