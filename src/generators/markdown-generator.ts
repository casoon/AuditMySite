import { groupByPage } from '@reports/report-utils';

export class MarkdownGenerator {
  generateMarkdown(data: any, options: any): string {
    const lines: string[] = [];
    lines.push(`# Accessibility Test Report`);
    lines.push('');
    lines.push(`**Generated:** ${data.metadata.timestamp}`);
    lines.push('');
    lines.push(`- **Total Pages:** ${data.metadata.totalPages}`);
    lines.push(`- **Tested Pages:** ${data.metadata.testedPages}`);
    lines.push(`- **Passed:** ${data.metadata.passedPages}`);
    lines.push(`- **Failed:** ${data.metadata.failedPages}`);
    lines.push(`- **Errors:** ${data.metadata.totalErrors}`);
    lines.push(`- **Warnings:** ${data.metadata.totalWarnings}`);
    lines.push(`- **Success Rate:** ${data.metadata.successRate}`);
    lines.push('');
    // ... (Hier kann die restliche Markdown-Logik aus output-generator.ts eingefügt werden)
    // Für Demo-Zwecke nur Metadaten
    return lines.join('\n');
  }
} 