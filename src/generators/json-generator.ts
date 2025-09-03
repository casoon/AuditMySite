import { DetailedIssue } from '@core/types';
import { groupByPage } from '@reports/report-utils';

export class JsonGenerator {
  generateJson(issues: DetailedIssue[]): string {
    const groupedIssues = groupByPage(issues);
    return JSON.stringify(groupedIssues, null, 2);
  }
} 