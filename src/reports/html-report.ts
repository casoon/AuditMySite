import { htmlReportTemplate } from './html-template';
import { HtmlGenerator } from '../generators/html-generator';

export function generateHtmlReport(data: any): string {
  const generator = new HtmlGenerator();
  const accessibilitySection = generator.generateAccessibilitySection(data);
  const performanceSection = generator.generatePerformanceSection(data);
  const seoSection = generator.generateSeoSection(data);
  const securitySection = generator.generateSecuritySection(data);

  // Extract domain from first page URL if available
  const domain = data.pages && data.pages.length > 0 
    ? new URL(data.pages[0].url).hostname 
    : 'unknown';

  // Calculate metrics
  const successRate = data.summary && data.summary.testedPages > 0 
    ? Math.round((data.summary.passedPages / data.summary.testedPages) * 100) 
    : 0;
  
  const totalPages = data.summary?.totalPages || data.pages?.length || 0;
  const testedPages = data.summary?.testedPages || data.pages?.length || 0;
  const totalErrors = data.summary?.totalErrors || 0;
  const totalWarnings = data.summary?.totalWarnings || 0;
  const totalDuration = data.summary?.totalDuration || 0;

  // Format duration
  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    return `${Math.round(ms / 60000)}min`;
  };

  let html = htmlReportTemplate
    // Replace sections
    .replace('{{accessibility}}', accessibilitySection)
    .replace('{{performance}}', performanceSection)
    .replace('{{seo}}', seoSection)
    .replace('{{security}}', securitySection)
    .replace('{{accessibility}}', accessibilitySection)
    .replace('{{issues}}', accessibilitySection)
    // Replace dashboard variables
    .replace(/{{domain}}/g, domain)
    .replace(/{{timestamp}}/g, data.metadata?.timestamp || new Date().toLocaleString())
    .replace(/{{successRate}}/g, successRate.toString())
    .replace(/{{totalPages}}/g, totalPages.toString())
    .replace(/{{testedPages}}/g, testedPages.toString())
    .replace(/{{totalErrors}}/g, totalErrors.toString())
    .replace(/{{totalWarnings}}/g, totalWarnings.toString())
    .replace(/{{totalDuration}}/g, formatDuration(totalDuration));
  
  return html;
}
