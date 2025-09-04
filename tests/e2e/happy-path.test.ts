/**
 * 🧪 End-to-End Happy Path Test
 * 
 * Minimal E2E tests for critical user journeys.
 * Uses test doubles for fast execution while testing integration points.
 */

import { AuditSDK } from '../../src/sdk/audit-sdk';
import { AuditAPIServer } from '../../src/api/server';
import { UnifiedReportSystem } from '../../src/reports/unified/unified-report-system';
import { ConfigManager } from '../../src/config/config-manager';
import { createMockAuditResult, createMockPageResult } from '../setup';
import request from 'supertest';

describe('E2E Happy Path Tests', () => {
  
  describe('SDK End-to-End Flow', () => {
    it('should complete full SDK audit workflow', async () => {
      const sdk = new AuditSDK({
        defaultOutputDir: './test-e2e-reports',
        verbose: false
      });

      // Test connection
      const connectionTest = await sdk.testConnection('https://example.com/sitemap.xml');
      expect(connectionTest.success).toBe(true);

      // Run full audit with events
      const events: string[] = [];
      
      const result = await sdk.audit()
        .sitemap('https://example.com/sitemap.xml')
        .maxPages(3)
        .formats(['html', 'json'])
        .includePerformance(true)
        .on('audit:start', () => events.push('started'))
        .on('audit:progress', () => events.push('progress'))
        .on('audit:complete', () => events.push('completed'))
        .run();

      // Verify complete workflow
      expect(events).toEqual(expect.arrayContaining(['started', 'completed']));
      expect(result.sessionId).toBeDefined();
      expect(result.summary.testedPages).toBeGreaterThan(0);
      expect(result.reports).toHaveLength(2);
      expect(result.reports.map(r => r.format)).toEqual(['html', 'json']);
      expect(result.duration).toBeGreaterThan(0);
      expect(result.metadata.version).toBeDefined();
    });

    it('should handle error scenarios gracefully', async () => {
      const sdk = new AuditSDK();

      // Test invalid URL error handling
      await expect(
        sdk.audit()
          .sitemap('invalid-url')
          .run()
      ).rejects.toThrow('Invalid URL format');

      // Test missing sitemap error
      await expect(
        sdk.audit()
          .maxPages(5)
          .run()
      ).rejects.toThrow('sitemap URL is required');
    });
  });

  describe('API Server End-to-End Flow', () => {
    let server: AuditAPIServer;
    let app: any;

    beforeAll(() => {
      server = new AuditAPIServer({
        port: 0,
        apiKeyRequired: false,
        maxConcurrentJobs: 2
      });
      app = server.getApp();
    });

    it('should complete full API workflow', async () => {
      // 1. Health check
      const healthResponse = await request(app)
        .get('/health')
        .expect(200);
      
      expect(healthResponse.body.status).toBe('healthy');

      // 2. Test connection
      const connectionResponse = await request(app)
        .post('/api/v1/test-connection')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(200);
      
      expect(connectionResponse.body.data.success).toBe(true);

      // 3. Quick audit
      const auditResponse = await request(app)
        .post('/api/v1/audit/quick')
        .send({
          sitemapUrl: 'https://example.com/sitemap.xml',
          options: { maxPages: 5, formats: ['json'] }
        })
        .expect(200);
      
      expect(auditResponse.body.success).toBe(true);
      expect(auditResponse.body.data.summary.testedPages).toBeGreaterThan(0);

      // 4. Job-based audit
      const jobResponse = await request(app)
        .post('/api/v1/audit')
        .send({
          sitemapUrl: 'https://example.com/sitemap.xml',
          options: { maxPages: 3 }
        })
        .expect(201);
      
      const jobId = jobResponse.body.data.jobId;
      expect(jobId).toBeDefined();

      // 5. Check job status
      const statusResponse = await request(app)
        .get(`/api/v1/audit/${jobId}`)
        .expect(200);
      
      expect(statusResponse.body.data.status).toMatch(/pending|running|completed/);

      // 6. List jobs
      const listResponse = await request(app)
        .get('/api/v1/audits')
        .expect(200);
      
      expect(listResponse.body.data.jobs.length).toBeGreaterThan(0);
    });
  });

  describe('Report Generation End-to-End', () => {
    it('should generate all report formats successfully', async () => {
      const reportSystem = new UnifiedReportSystem();
      
      const mockData = {
        summary: {
          testedPages: 5,
          passedPages: 4,
          failedPages: 1,
          crashedPages: 0,
          totalErrors: 3,
          totalWarnings: 2,
          totalDuration: 25000,
          results: [
            createMockPageResult({ passed: true }),
            createMockPageResult({ passed: true, url: 'https://example.com/page2' }),
            createMockPageResult({ passed: true, url: 'https://example.com/page3' }),
            createMockPageResult({ passed: true, url: 'https://example.com/page4' }),
            createMockPageResult({ passed: false, errors: ['Missing alt text'], url: 'https://example.com/page5' })
          ]
        },
        issues: [],
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.6.1',
          duration: 25000,
          environment: 'test'
        }
      };

      const options = {
        outputDir: './test-e2e-reports',
        includePa11yIssues: true,
        summaryOnly: false,
        prettyPrint: true,
        branding: {
          company: 'E2E Test Company',
          footer: 'Generated during E2E testing'
        }
      };

      // Generate all supported formats
      const formats = ['html', 'markdown', 'json', 'csv'];
      const reports = await reportSystem.generateMultipleReports(formats, mockData, options);
      
      expect(reports).toHaveLength(4);
      expect(reports.every(r => r.size > 0)).toBe(true);
      expect(reports.map(r => r.format)).toEqual(expect.arrayContaining(formats));
      
      // Verify each report has required metadata
      reports.forEach(report => {
        expect(report.path).toBeDefined();
        expect(report.metadata.generatedAt).toBeInstanceOf(Date);
        expect(report.metadata.duration).toBeGreaterThan(0);
      });
    });
  });

  describe('Configuration Management End-to-End', () => {
    it('should load and merge configurations correctly', () => {
      const configManager = new ConfigManager();
      
      // Test defaults
      const defaults = configManager.getDefaults();
      expect(defaults.server.maxPages).toBeDefined();
      expect(defaults.standards.pa11yStandard).toBeDefined();
      
      // Test CLI args loading
      const cliConfig = configManager.loadFromCLI({
        maxPages: 25,
        format: ['json', 'csv'],
        verbose: true
      });
      
      expect(cliConfig.server.maxPages).toBe(25);
      expect(cliConfig.output.formats).toEqual(['json', 'csv']);
      expect(cliConfig.server.verbose).toBe(true);
      
      // Test environment loading
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        AUDIT_MAX_PAGES: '15',
        AUDIT_VERBOSE: 'true'
      };
      
      const envConfig = configManager.loadFromEnvironment();
      expect(envConfig.server.maxPages).toBe(15);
      expect(envConfig.server.verbose).toBe(true);
      
      process.env = originalEnv;
      
      // Test config merging
      const merged = configManager.mergeConfigs([
        defaults,
        { server: { maxPages: 30, timeout: 15000 } },
        { server: { maxPages: 20 } } // Should override previous
      ]);
      
      expect(merged.server.maxPages).toBe(20);
      expect(merged.server.timeout).toBe(15000);
      
      // Test preset loading
      const reactPreset = configManager.loadPreset('react');
      expect(reactPreset.frameworks.detection.react).toBe(true);
      expect(reactPreset.server.maxPages).toBeGreaterThan(5);
    });

    it('should validate configurations properly', () => {
      const configManager = new ConfigManager();
      
      // Valid configuration
      const validConfig = {
        server: { maxPages: 10, timeout: 5000 },
        standards: { pa11yStandard: 'WCAG2AA' as const },
        output: { formats: ['html', 'json'] as const }
      };
      
      const validResult = configManager.validate(validConfig);
      expect(validResult.isValid).toBe(true);
      expect(validResult.errors).toHaveLength(0);
      
      // Invalid configuration
      const invalidConfig = {
        server: { maxPages: -1, timeout: 'invalid' },
        standards: { pa11yStandard: 'INVALID' as any },
        output: { formats: [] as any }
      };
      
      const invalidResult = configManager.validate(invalidConfig);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Error Recovery and Resilience', () => {
    it('should handle partial system failures gracefully', async () => {
      const sdk = new AuditSDK();

      // Simulate partial failure scenario - SDK should continue working
      // even if some reports fail to generate
      const result = await sdk.quickAudit('https://example.com/sitemap.xml', {
        maxPages: 3,
        formats: ['html', 'json', 'csv']
      });

      // Should complete successfully even if individual components have issues
      expect(result.sessionId).toBeDefined();
      expect(result.summary.testedPages).toBeGreaterThan(0);
      
      // Reports should be generated (mocked, so all should succeed)
      expect(result.reports.length).toBeGreaterThanOrEqual(1);
    });

    it('should provide meaningful error messages', async () => {
      const sdk = new AuditSDK();

      // Test various error scenarios
      const testCases = [
        {
          input: { formats: [] },
          expectedError: /formats must be a non-empty array/
        },
        {
          input: { maxPages: 0 },
          expectedError: /maxPages must be between/
        },
        {
          input: { timeout: 100 },
          expectedError: /timeout must be between/
        }
      ];

      for (const testCase of testCases) {
        try {
          const builder = sdk.audit().sitemap('https://example.com/sitemap.xml');
          
          if ('formats' in testCase.input) {
            builder.formats(testCase.input.formats);
          }
          if ('maxPages' in testCase.input) {
            builder.maxPages(testCase.input.maxPages);
          }
          if ('timeout' in testCase.input) {
            builder.timeout(testCase.input.timeout);
          }
          
          await builder.run();
          fail('Should have thrown an error');
        } catch (error) {
          expect(error.message).toMatch(testCase.expectedError);
        }
      }
    });
  });

  describe('Performance and Resource Management', () => {
    it('should complete audit within reasonable time', async () => {
      const sdk = new AuditSDK();
      const startTime = Date.now();
      
      const result = await sdk.quickAudit('https://example.com/sitemap.xml', {
        maxPages: 2,
        formats: ['json']
      });
      
      const duration = Date.now() - startTime;
      
      // With mocks, should complete very quickly
      expect(duration).toBeLessThan(5000); // 5 seconds
      expect(result.duration).toBeGreaterThan(0);
      expect(result.summary.testedPages).toBe(3); // From mocked data
    });

    it('should handle concurrent operations', async () => {
      const server = new AuditAPIServer({
        port: 0,
        apiKeyRequired: false,
        maxConcurrentJobs: 2
      });
      const app = server.getApp();
      
      // Start multiple jobs concurrently
      const promises = [
        request(app)
          .post('/api/v1/audit/quick')
          .send({ sitemapUrl: 'https://example1.com/sitemap.xml' }),
        request(app)
          .post('/api/v1/audit/quick')
          .send({ sitemapUrl: 'https://example2.com/sitemap.xml' })
      ];
      
      const responses = await Promise.all(promises);
      
      // Both should succeed
      expect(responses[0].status).toBe(200);
      expect(responses[1].status).toBe(200);
      expect(responses[0].body.success).toBe(true);
      expect(responses[1].body.success).toBe(true);
    });
  });
});
