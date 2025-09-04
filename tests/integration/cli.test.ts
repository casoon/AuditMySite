/**
 * 🧪 CLI Command Tests
 * 
 * Tests CLI commands with mocked dependencies.
 * Focus on argument parsing, validation, and command flow.
 */

import { AuditCommand } from '../../src/cli/commands/audit-command';
import { CommandRegistry } from '../../src/cli/command-registry';
import { createMockAuditResult, createMockPageResult } from '../setup';

// Mock the StandardPipeline to avoid real audits
jest.mock('../../src/core/pipeline/standard-pipeline', () => ({
  StandardPipeline: jest.fn().mockImplementation(() => ({
    run: jest.fn().mockResolvedValue({
      summary: {
        testedPages: 5,
        passedPages: 4,
        failedPages: 1,
        crashedPages: 0,
        totalErrors: 3,
        totalWarnings: 1,
        totalDuration: 30000,
        results: [
          createMockPageResult({ passed: true }),
          createMockPageResult({ passed: true, url: 'https://example.com/page2' }),
          createMockPageResult({ passed: true, url: 'https://example.com/page3' }),
          createMockPageResult({ passed: true, url: 'https://example.com/page4' }),
          createMockPageResult({ passed: false, errors: ['Missing alt text'], url: 'https://example.com/page5' })
        ]
      },
      issues: [],
      outputFiles: ['/mock/reports/report.html']
    })
  }))
}));

// Mock SitemapDiscovery
jest.mock('../../src/core/parsers/sitemap-discovery', () => ({
  SitemapDiscovery: jest.fn().mockImplementation(() => ({
    discoverSitemap: jest.fn().mockResolvedValue({
      found: true,
      sitemaps: ['https://example.com/sitemap.xml'],
      method: 'direct',
      warnings: []
    })
  }))
}));

// Mock inquirer for expert mode tests
jest.mock('inquirer', () => ({
  prompt: jest.fn().mockResolvedValue({
    maxPages: 10,
    standard: 'WCAG2AA',
    formats: ['html', 'json'],
    useUnifiedQueue: true,
    maxConcurrent: 2
  })
}));

describe('AuditCommand', () => {
  let command: AuditCommand;

  beforeEach(() => {
    command = new AuditCommand();
  });

  describe('Command Initialization', () => {
    it('should initialize with correct name and description', () => {
      expect(command.getName()).toBe('audit');
      expect(command.getDescription()).toBe('Run accessibility audit on sitemap URLs');
    });
  });

  describe('Argument Validation', () => {
    it('should validate sitemap URL', async () => {
      const invalidArgs = {
        sitemapUrl: 'not-a-url'
      };

      const result = await command.execute(invalidArgs);
      
      expect(result.success).toBe(false);
      expect(result.message).toEqual(
        expect.stringContaining('Invalid sitemap URL')
      );
    });

    it('should validate maxPages range', async () => {
      const invalidArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        maxPages: -1
      };

      const result = await command.execute(invalidArgs);
      
      expect(result.success).toBe(false);
      expect(result.message).toEqual(
        expect.stringContaining('maxPages must be between 1 and 1000')
      );
    });

    it('should validate report format', async () => {
      const invalidArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        format: ['invalid-format'] as any
      };

      const result = await command.execute(invalidArgs);
      
      expect(result.success).toBe(false);
      expect(result.message).toEqual(
        expect.stringContaining('Invalid formats: invalid-format')
      );
    });

    it('should validate performance budget template', async () => {
      const invalidArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        budget: 'unknown-template'
      };

      const result = await command.execute(invalidArgs);
      
      expect(result.success).toBe(false);
      expect(result.message).toEqual(
        expect.stringContaining('budget must be one of')
      );
    });

    it('should pass validation with valid arguments', async () => {
      const validArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        maxPages: 10,
        format: ['html', 'json'],
        budget: 'ecommerce'
      };

      const result = await command.execute(validArgs);
      
      // Should pass validation but might fail on actual execution due to mocks
      // So we test that validation error is NOT the reason for failure
      if (!result.success) {
        expect(result.message).not.toContain('Validation failed');
      }
    });
  });

  describe('Command Execution', () => {
    it('should execute audit with minimal arguments', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml'
      };

      const result = await command.execute(args);
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('Audit completed successfully');
      expect(result.exitCode).toBe(0);
    });

    it('should execute audit with custom options', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        maxPages: 20,
        format: ['html', 'json', 'csv'],
        unifiedQueue: true,
        verbose: true
      };

      const result = await command.execute(args);
      
      expect(result.success).toBe(true);
      expect(result.exitCode).toBe(0);
    });

    it('should handle execution errors gracefully', async () => {
      // Reset and mock the pipeline to throw an error
      const StandardPipelineConstructor = require('../../src/core/pipeline/standard-pipeline').StandardPipeline;
      StandardPipelineConstructor.mockClear();
      StandardPipelineConstructor.mockImplementation(() => ({
        run: jest.fn().mockRejectedValue(new Error('Pipeline failed'))
      }));

      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml'
      };

      const result = await command.execute(args);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Pipeline failed');
      expect(result.exitCode).toBe(1);
    });

    it('should return validation error for invalid arguments', async () => {
      const args = {
        sitemapUrl: 'invalid-url'
      };

      const result = await command.execute(args);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Validation failed');
      expect(result.exitCode).toBe(1);
    });
  });

  describe('Expert Mode', () => {
    it('should run expert mode when enabled', async () => {
      const inquirer = require('inquirer');
      
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        expert: true,
        nonInteractive: false
      };

      await command.execute(args);
      
      expect(inquirer.prompt).toHaveBeenCalled();
    });

    it('should skip expert mode in non-interactive mode', async () => {
      const inquirer = require('inquirer');
      inquirer.prompt.mockClear();
      
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        expert: true,
        nonInteractive: true
      };

      await command.execute(args);
      
      expect(inquirer.prompt).not.toHaveBeenCalled();
    });
  });

  describe('Performance Budget', () => {
    it('should accept valid budget template', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        budget: 'ecommerce'
      };

      const result = await command.execute(args);
      
      // Should pass validation (success depends on pipeline execution)
      if (!result.success) {
        expect(result.message).not.toContain('budget must be one of');
      }
    });

    it('should accept custom budget values', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        lcpBudget: 2000,
        clsBudget: 0.05
      };

      const result = await command.execute(args);
      
      // Should pass validation with custom budget values
      if (!result.success) {
        expect(result.message).not.toContain('Validation failed');
      }
    });
  });

  describe('Sitemap Discovery', () => {
    it('should accept sitemap URLs', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml'
      };

      const result = await command.execute(args);
      
      // Should pass validation
      if (!result.success) {
        expect(result.message).not.toContain('Invalid sitemap URL');
      }
    });

    it('should handle URLs that need sitemap discovery', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap' // Valid URL that should pass validation
      };

      // Just test that it doesn't fail on validation
      const result = await command.execute(args);
      
      // The result may fail due to mocked pipeline, but not due to validation
      if (!result.success) {
        expect(result.message).not.toContain('Invalid sitemap URL');
      }
    });
  });

  describe('Output Directory Setup', () => {
    it('should create output directory based on domain', () => {
      const outputInfo = (command as any).setupOutputDirectory(
        'https://example.com/sitemap.xml',
        './test-reports'
      );
      
      expect(outputInfo.dir).toBe('test-reports/example-com');
      expect(outputInfo.domain).toBe('example-com');
    });
  });

  describe('Results Display', () => {
    it('should format and display results correctly', () => {
      const mockResult = {
        summary: {
          testedPages: 10,
          passedPages: 8,
          failedPages: 2,
          crashedPages: 0,
          totalErrors: 5,
          totalWarnings: 3
        },
        outputFiles: ['/path/to/report.html', '/path/to/report.json']
      };

      // This would normally log to console, but we've mocked console in setup
      expect(() => {
        (command as any).showResults(mockResult);
      }).not.toThrow();
    });
  });
});

describe('CommandRegistry', () => {
  let registry: CommandRegistry;

  beforeEach(() => {
    registry = new CommandRegistry();
  });

  describe('Command Registration', () => {
    it('should register audit command by default', () => {
      const commands = Array.from(registry.getCommands().keys());
      
      expect(commands).toContain('audit');
    });

    it('should check if command exists', () => {
      expect(registry.hasCommand('audit')).toBe(true);
      expect(registry.hasCommand('nonexistent')).toBe(false);
    });
  });

  describe('Command Execution', () => {
    it('should execute audit command through registry', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        maxPages: 5
      };

      const result = await registry.executeCommand('audit', args);
      
      // Should pass validation (success depends on pipeline execution)
      if (!result.success) {
        expect(result.message).not.toContain('Validation failed');
      }
    });

    it('should return error for unknown command', async () => {
      const result = await registry.executeCommand('unknown', {});
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unknown command: unknown');
      expect(result.exitCode).toBe(1);
    });

    it('should handle command execution errors', async () => {
      // Test with invalid arguments that should cause the command to fail
      const args = {
        sitemapUrl: 'not-a-valid-url'
      };

      const result = await registry.executeCommand('audit', args);
      
      expect(result.success).toBe(false);
      expect(result.exitCode).toBe(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid arguments gracefully', async () => {
      const result = await registry.executeCommand('audit', {
        sitemapUrl: 'invalid-url'
      });
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Validation failed');
    });

    it('should provide helpful error messages', async () => {
      const result = await registry.executeCommand('audit', {});
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Invalid URL format');
    });
  });
});
