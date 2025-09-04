export function generateMarkdownReport(data: any): string {
  const lines: string[] = [];
  lines.push(`# Accessibility & Quality Report`);
  lines.push(``);
  lines.push(`**Generated:** ${data.metadata.timestamp}`);
  lines.push(``);

  // Accessibility Section
  lines.push(`## Accessibility`);
  lines.push('');
  lines.push(`| Page | Errors | Warnings | Pa11y Score |`);
  lines.push(`|------|--------|----------|-------------|`);
  data.pages.forEach((page: any) => {
    lines.push(`| ${page.url} | ${page.errors} | ${page.warnings} | ${page.issues?.pa11yScore ?? 'N/A'} |`);
  });
  lines.push('');

  // Performance Section
  lines.push(`## Performance`);
  lines.push('');
  lines.push(`| Page | Load Time (ms) | FCP | LCP | DOM Loaded | First Paint | Largest Paint |`);
  lines.push(`|------|---------------|-----|-----|------------|-------------|--------------|`);
  data.pages.forEach((page: any) => {
    const perf = page.issues?.performanceMetrics || {};
    lines.push(`| ${page.url} | ${perf.loadTime ?? 'N/A'} | ${perf.firstContentfulPaint ?? 'N/A'} | ${perf.largestContentfulPaint ?? 'N/A'} | ${perf.domContentLoaded ?? 'N/A'} | ${perf.firstPaint ?? 'N/A'} | ${perf.largestContentfulPaint ?? 'N/A'} |`);
  });
  lines.push('');

  // SEO and Security sections removed - focus on Accessibility & Performance only

  return lines.join('\n');
} 