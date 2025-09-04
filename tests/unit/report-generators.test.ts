/**
 * 🧪 Report Generators Unit Tests
 * 
 * Tests report generation logic without actual file I/O.
 * Focus on content generation, validation, and formatting.
 */

import { UnifiedReportSystem } from '../../src/reports/unified/unified-report-system';
import { ModernHTMLReportGenerator } from '../../src/reports/unified/generators/html-generator';
import { ModernMarkdownReportGenerator } from '../../src/reports/unified/generators/markdown-generator';
import { JSONReportGenerator } from '../../src/reports/unified/generators/json-generator';
import { CSVReportGenerator } from '../../src/reports/unified/generators/csv-generator';
import { ReportData, ReportOptions } from '../../src/reports/unified/unified-report-system';
import { createMockAuditResult, createMockPageResult } from '../setup';

describe('UnifiedReportSystem', () => {
  let reportSystem: UnifiedReportSystem;

  beforeEach(() => {
    reportSystem = new UnifiedReportSystem();
  });

  describe('System Initialization', () => {
    it('should register all available generators', () => {
      const formats = reportSystem.getAvailableFormats();
      
      expect(formats).toContain('html');
      expect(formats).toContain('markdown');
      expect(formats).toContain('json');
      expect(formats).toContain('csv');
      expect(formats).toHaveLength(4);
    });

    it('should check format support', () => {
      expect(reportSystem.isFormatSupported('html')).toBe(true);
      expect(reportSystem.isFormatSupported('json')).toBe(true);
      expect(reportSystem.isFormatSupported('pdf')).toBe(false);
      expect(reportSystem.isFormatSupported('unknown')).toBe(false);
    });
  });

  describe('Report Generation', () => {
    const mockReportData: ReportData = {
      summary: {
        testedPages: 3,
        passedPages: 2,
        failedPages: 1,
        crashedPages: 0,
        totalErrors: 5,
        totalWarnings: 2,
        totalDuration: 60000,
        results: [
          createMockPageResult({ passed: true }),
          createMockPageResult({ passed: true, url: 'https://example.com/page2' }),
          createMockPageResult({ passed: false, errors: ['Missing alt text'], url: 'https://example.com/page3' })
        ]
      },
      issues: [],
      metadata: {
        timestamp: '2023-01-01T00:00:00Z',
        version: '1.6.1',
        duration: 60000,
        sitemapUrl: 'https://example.com/sitemap.xml',
        environment: 'test'
      }
    };

    const mockOptions: ReportOptions = {
      outputDir: './test-reports',
      includePa11yIssues: true,
      summaryOnly: false,
      prettyPrint: true,
      branding: {
        company: 'Test Company',
        footer: 'Test Footer'
      }
    };

    it('should generate HTML report', async () => {
      const report = await reportSystem.generateReport('html', mockReportData, mockOptions);
      
      expect(report.format).toBe('html');
      expect(report.path).toMatch(/\.html$/);
      expect(report.size).toBeGreaterThan(0);
      expect(report.metadata.generatedAt).toBeInstanceOf(Date);
      expect(report.metadata.duration).toBeGreaterThan(0);
    });

    it('should generate multiple reports', async () => {
      const formats = ['html', 'json', 'csv'];
      const reports = await reportSystem.generateMultipleReports(formats, mockReportData, mockOptions);
      
      expect(reports).toHaveLength(3);
      expect(reports.map(r => r.format)).toEqual(expect.arrayContaining(formats));
      expect(reports.every(r => r.size > 0)).toBe(true);
    });

    it('should handle invalid format gracefully', async () => {
      await expect(
        reportSystem.generateReport('invalid' as any, mockReportData, mockOptions)
      ).rejects.toThrow('No generator registered for format: invalid');
    });
  });
});

describe('ModernHTMLReportGenerator', () => {
  let generator: ModernHTMLReportGenerator;

  beforeEach(() => {
    generator = new ModernHTMLReportGenerator();
  });

  it('should have correct file extension and MIME type', () => {
    expect(generator.getExtension()).toBe('html');
    expect(generator.getMimeType()).toBe('text/html');
  });

  it('should validate report data before generation', () => {
    const invalidData: any = {
      // Missing required fields
    };

    const options: ReportOptions = {
      outputDir: './test'
    };

    expect(async () => {
      await generator.generate(invalidData, options);
    }).rejects.toThrow();
  });

  it('should generate filename with timestamp', () => {
    const options: ReportOptions = {
      outputDir: './test'
    };

    // Access protected method for testing
    const filename = (generator as any).generateFilename(options, 'accessibility');
    
    expect(filename).toMatch(/^audit-report-accessibility-\d{4}-\d{2}-\d{2}\.html$/);
  });

  it('should calculate success rate correctly', () => {
    const mockSummary = {
      testedPages: 10,
      passedPages: 8,
      failedPages: 2,
      crashedPages: 0,
      totalErrors: 15,
      totalWarnings: 5,
      totalDuration: 30000
    };

    // Access protected method for testing
    const successRate = (generator as any).calculateSuccessRate(mockSummary);
    
    expect(successRate).toBe(80); // 8/10 * 100
  });

  it('should format duration correctly', () => {
    // Access protected method for testing
    const formatDuration = (generator as any).formatDuration.bind(generator);
    
    expect(formatDuration(500)).toBe('500ms');
    expect(formatDuration(5000)).toBe('5s');
    expect(formatDuration(65000)).toBe('1m 5s');
    expect(formatDuration(3665000)).toBe('61m 5s');
  });
});

describe('JSONReportGenerator', () => {
  let generator: JSONReportGenerator;

  beforeEach(() => {
    generator = new JSONReportGenerator();
  });

  it('should have correct file extension and MIME type', () => {
    expect(generator.getExtension()).toBe('json');
    expect(generator.getMimeType()).toBe('application/json');
  });

  it('should generate valid JSON structure', async () => {
    const mockData: ReportData = {
      summary: {
        testedPages: 2,
        passedPages: 1,
        failedPages: 1,
        crashedPages: 0,
        totalErrors: 3,
        totalWarnings: 1,
        totalDuration: 10000,
        results: [
          createMockPageResult({ passed: true }),
          createMockPageResult({ passed: false, errors: ['Error 1', 'Error 2'] })
        ]
      },
      issues: [],
      metadata: {
        timestamp: '2023-01-01T00:00:00Z',
        version: '1.6.1',
        duration: 10000,
        environment: 'test'
      }
    };

    const options: ReportOptions = {
      outputDir: './test',
      prettyPrint: true
    };

    const report = await generator.generate(mockData, options);
    
    expect(report.format).toBe('json');
    expect(report.size).toBeGreaterThan(0);
  });

  it('should calculate error distribution correctly', () => {
    const mockResults = [
      createMockPageResult({ errors: [] }), // 0 errors
      createMockPageResult({ errors: ['e1', 'e2'] }), // 2 errors (1-5 range)
      createMockPageResult({ errors: Array(8).fill('error') }), // 8 errors (6-10 range)
      createMockPageResult({ errors: Array(25).fill('error') }) // 25 errors (20+ range)
    ];

    // Access private method for testing
    const distribution = (generator as any).calculateErrorDistribution(mockResults);
    
    expect(distribution.byRange['0']).toBe(1);
    expect(distribution.byRange['1-5']).toBe(1);
    expect(distribution.byRange['6-10']).toBe(1);
    expect(distribution.byRange['20+']).toBe(1);
    expect(distribution.totalErrors).toBe(35);
    expect(distribution.averageErrorsPerPage).toBe(9); // 35/4 rounded
  });

  it('should determine page types correctly', () => {
    // Access private method for testing
    const determinePageType = (generator as any).determinePageType.bind(generator);
    
    expect(determinePageType('https://example.com/')).toBe('home');
    expect(determinePageType('https://example.com/blog/post-1')).toBe('blog');
    expect(determinePageType('https://example.com/product/item-1')).toBe('product');
    expect(determinePageType('https://example.com/about/company')).toBe('about');
    expect(determinePageType('https://example.com/contact/support')).toBe('contact');
    expect(determinePageType('https://example.com/some/random/path')).toBe('other');
  });
});

describe('CSVReportGenerator', () => {
  let generator: CSVReportGenerator;

  beforeEach(() => {
    generator = new CSVReportGenerator();
  });

  it('should have correct file extension and MIME type', () => {
    expect(generator.getExtension()).toBe('csv');
    expect(generator.getMimeType()).toBe('text/csv');
  });

  it('should escape CSV values correctly', () => {
    // Access private method for testing
    const escapeCsvValue = (generator as any).escapeCsvValue.bind(generator);
    
    expect(escapeCsvValue('simple')).toBe('simple');
    expect(escapeCsvValue('value, with comma')).toBe('"value, with comma"');
    expect(escapeCsvValue('value "with quotes"')).toBe('"value ""with quotes"""');
    expect(escapeCsvValue('value\nwith newline')).toBe('"value\nwith newline"');
    expect(escapeCsvValue(null)).toBe('');
    expect(escapeCsvValue(undefined)).toBe('');
  });

  it('should generate summary CSV for summary-only option', async () => {
    const mockData: ReportData = {
      summary: {
        testedPages: 5,
        passedPages: 4,
        failedPages: 1,
        crashedPages: 0,
        totalErrors: 2,
        totalWarnings: 1,
        totalDuration: 25000
      },
      issues: [],
      metadata: {
        timestamp: '2023-01-01T12:00:00Z',
        version: '1.6.1',
        duration: 25000
      }
    };

    const options: ReportOptions = {
      outputDir: './test',
      summaryOnly: true
    };

    const report = await generator.generate(mockData, options);
    
    expect(report.format).toBe('csv');
    expect(report.size).toBeGreaterThan(0);
  });

  it('should generate detailed CSV with all columns', async () => {
    const mockData: ReportData = {
      summary: {
        testedPages: 2,
        passedPages: 1,
        failedPages: 1,
        crashedPages: 0,
        totalErrors: 3,
        totalWarnings: 1,
        totalDuration: 15000,
        results: [
          createMockPageResult({ 
            passed: true,
            performanceMetrics: {
              largestContentfulPaint: 2000,
              cumulativeLayoutShift: 0.05
            }
          }),
          createMockPageResult({ 
            passed: false, 
            errors: ['Error 1', 'Error 2'],
            warnings: ['Warning 1'],
            url: 'https://example.com/failing-page'
          })
        ]
      },
      issues: [],
      metadata: {
        timestamp: '2023-01-01T12:00:00Z',
        version: '1.6.1',
        duration: 15000
      }
    };

    const options: ReportOptions = {
      outputDir: './test',
      summaryOnly: false,
      includePa11yIssues: true
    };

    const report = await generator.generate(mockData, options);
    
    expect(report.format).toBe('csv');
    expect(report.size).toBeGreaterThan(0);
  });
});

describe('ModernMarkdownReportGenerator', () => {
  let generator: ModernMarkdownReportGenerator;

  beforeEach(() => {
    generator = new ModernMarkdownReportGenerator();
  });

  it('should have correct file extension and MIME type', () => {
    expect(generator.getExtension()).toBe('md');
    expect(generator.getMimeType()).toBe('text/markdown');
  });

  it('should generate markdown with proper emoji status indicators', async () => {
    const mockData: ReportData = {
      summary: {
        testedPages: 3,
        passedPages: 3,
        failedPages: 0,
        crashedPages: 0,
        totalErrors: 0,
        totalWarnings: 0,
        totalDuration: 15000
      },
      issues: [],
      metadata: {
        timestamp: '2023-01-01T12:00:00Z',
        version: '1.6.1',
        duration: 15000,
        environment: 'test'
      }
    };

    const options: ReportOptions = {
      outputDir: './test',
      branding: {
        company: 'Test Company',
        footer: 'Custom footer'
      }
    };

    const report = await generator.generate(mockData, options);
    
    expect(report.format).toBe('markdown');
    expect(report.size).toBeGreaterThan(0);
  });
});

describe('Report Generator Base Class', () => {
  let generator: ModernHTMLReportGenerator;

  beforeEach(() => {
    generator = new ModernHTMLReportGenerator();
  });

  it('should validate report data structure', () => {
    const validData: ReportData = {
      summary: { testedPages: 1, passedPages: 1, failedPages: 0, crashedPages: 0, totalErrors: 0, totalWarnings: 0, totalDuration: 1000 },
      issues: [],
      metadata: { timestamp: '2023-01-01', version: '1.0', duration: 1000 }
    };

    const invalidData1: any = { summary: null, issues: [], metadata: {} };
    const invalidData2: any = { summary: {}, issues: 'not-array', metadata: {} };
    const invalidData3: any = { summary: {}, issues: [] }; // missing metadata

    // Access protected method for testing
    const validateData = (generator as any).validateData.bind(generator);

    expect(validateData(validData).valid).toBe(true);
    expect(validateData(invalidData1).valid).toBe(false);
    expect(validateData(invalidData2).valid).toBe(false);
    expect(validateData(invalidData3).valid).toBe(false);

    expect(validateData(invalidData1).errors).toContain('Summary is required');
    expect(validateData(invalidData2).errors).toContain('Issues must be an array');
    expect(validateData(invalidData3).errors).toContain('Metadata is required');
  });

  it('should calculate file size correctly', () => {
    // Access protected method for testing
    const calculateFileSize = (generator as any).calculateFileSize.bind(generator);

    expect(calculateFileSize('hello')).toBe(5);
    expect(calculateFileSize('hello world')).toBe(11);
    expect(calculateFileSize('äöü')).toBe(6); // UTF-8 bytes
    expect(calculateFileSize('')).toBe(0);
  });
});
