import { DetailedIssue } from '@core/types';
import { groupByPage } from '@reports/report-utils';

export class CsvGenerator {
  generateCsv(issues: DetailedIssue[]): string {
    const headers = ['Page', 'Type', 'Severity', 'Message', 'Selector', 'Line Number', 'Source'];
    const rows = issues.map(issue => [
      issue.pageUrl,
      issue.type,
      issue.severity,
      issue.message,
      issue.selector || '',
      issue.lineNumber || '',
      issue.source || ''
    ]);
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }
} 