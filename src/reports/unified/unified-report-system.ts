/**
 * 🔧 Unified Report System
 * 
 * Central system for generating reports in multiple formats.
 * Uses Template Pattern for consistent report structure.
 */

// Re-export from base generator
export * from './base-generator';

import { 
  ReportGenerator, 
  ReportData, 
  ReportOptions, 
  GeneratedReport, 
  ReportFormat 
} from './base-generator';

import { 
  ModernHTMLReportGenerator, 
  ModernMarkdownReportGenerator, 
  JSONReportGenerator, 
  CSVReportGenerator 
} from './generators';

export class UnifiedReportSystem {
  private generators = new Map<ReportFormat, ReportGenerator>();

  constructor() {
    this.registerDefaultGenerators();
  }

  /**
   * Register default generators
   */
  private registerDefaultGenerators(): void {
    // Register all available generators
    this.registerGenerator('html', new ModernHTMLReportGenerator());
    this.registerGenerator('markdown', new ModernMarkdownReportGenerator());
    this.registerGenerator('json', new JSONReportGenerator());
    this.registerGenerator('csv', new CSVReportGenerator());
    // PDF generator will be added in future sprint
    // this.registerGenerator('pdf', new PDFReportGenerator());
  }

  /**
   * Register a report generator
   */
  registerGenerator(format: ReportFormat, generator: ReportGenerator): void {
    this.generators.set(format, generator);
  }

  /**
   * Generate report in specified format
   */
  async generateReport(
    format: ReportFormat,
    data: ReportData,
    options: ReportOptions
  ): Promise<GeneratedReport> {
    const generator = this.generators.get(format);
    if (!generator) {
      throw new Error(`No generator registered for format: ${format}`);
    }

    return await generator.generate(data, options);
  }

  /**
   * Generate reports in multiple formats
   */
  async generateMultipleReports(
    formats: ReportFormat[],
    data: ReportData,
    options: ReportOptions
  ): Promise<GeneratedReport[]> {
    const reports: GeneratedReport[] = [];

    for (const format of formats) {
      try {
        const report = await this.generateReport(format, data, options);
        reports.push(report);
      } catch (error) {
        console.warn(`Failed to generate ${format} report: ${error}`);
      }
    }

    return reports;
  }

  /**
   * Get available formats
   */
  getAvailableFormats(): ReportFormat[] {
    return Array.from(this.generators.keys());
  }

  /**
   * Check if format is supported
   */
  isFormatSupported(format: ReportFormat): boolean {
    return this.generators.has(format);
  }

  /**
   * Get generator for format
   */
  getGenerator(format: ReportFormat): ReportGenerator | undefined {
    return this.generators.get(format);
  }

  /**
   * Unregister generator
   */
  unregisterGenerator(format: ReportFormat): boolean {
    return this.generators.delete(format);
  }

  /**
   * Clear all generators
   */
  clearGenerators(): void {
    this.generators.clear();
  }
}
