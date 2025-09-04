import { htmlReportTemplate } from './html-template';
import { HtmlGenerator } from '../generators/html-generator';

export function generateHtmlReport(data: any): string {
  const generator = new HtmlGenerator();
  const accessibilitySection = generator.generateAccessibilitySection(data);
  const performanceSection = generator.generatePerformanceSection(data);
  const seoSection = generator.generateSeoSection(data);
  const securitySection = generator.generateSecuritySection(data);

  let html = htmlReportTemplate
    .replace('{{accessibility}}', accessibilitySection)
    .replace('{{performance}}', performanceSection)
    .replace('{{seo}}', seoSection)
    .replace('{{security}}', securitySection)
    .replace('{{timestamp}}', data.metadata.timestamp);
  // Weitere Platzhalter nach Bedarf
  return html;
} 