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
      expect(command.name).toBe('audit');
      expect(command.description).toBe('Run accessibility audit on sitemap URLs');
    });
  });

  describe('Argument Validation', () => {
    it('should validate sitemap URL', () => {
      const invalidArgs = {
        sitemapUrl: 'not-a-url'
      };

      const result = (command as any).validate(invalidArgs);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Invalid sitemap URL')
        ])
      );
    });

    it('should validate maxPages range', () => {
      const invalidArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        maxPages: -1
      };

      const result = (command as any).validate(invalidArgs);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(
        expect.arrayContaining([
          expect.stringContaining('maxPages must be between 1 and 1000')
        ])
      );
    });

    it('should validate report format', () => {
      const invalidArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        format: ['invalid-format'] as any
      };

      const result = (command as any).validate(invalidArgs);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Invalid formats: invalid-format')
        ])
      );
    });

    it('should validate performance budget template', () => {
      const invalidArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        budget: 'unknown-template'
      };

      const result = (command as any).validate(invalidArgs);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(
        expect.arrayContaining([
          expect.stringContaining('budget must be one of')
        ])
      );
    });

    it('should pass validation with valid arguments', () => {
      const validArgs = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        maxPages: 10,
        format: ['html', 'json'],
        budget: 'ecommerce'
      };

      const result = (command as any).validate(validArgs);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
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

      const mockPipeline = require('../../src/core/pipeline/standard-pipeline').StandardPipeline.mock.instances[0];

      const result = await command.execute(args);
      
      expect(result.success).toBe(true);
      expect(mockPipeline.run).toHaveBeenCalledWith(
        expect.objectContaining({
          sitemapUrl: 'https://example.com/sitemap.xml',
          maxPages: 20,
          useUnifiedQueue: true,
          verbose: true
        })
      );
    });

    it('should handle execution errors gracefully', async () => {
      const mockPipeline = require('../../src/core/pipeline/standard-pipeline').StandardPipeline.mock.instances[0];
      mockPipeline.run.mockRejectedValueOnce(new Error('Pipeline failed'));

      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml'
      };

      const result = await command.execute(args);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Pipeline failed');
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

      const result = await command.execute(args);
      
      expect(inquirer.prompt).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it('should skip expert mode in non-interactive mode', async () => {
      const inquirer = require('inquirer');
      
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        expert: true,
        nonInteractive: true
      };

      const result = await command.execute(args);
      
      expect(inquirer.prompt).not.toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('Performance Budget', () => {
    it('should use budget template', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        budget: 'ecommerce'
      };

      const mockPipeline = require('../../src/core/pipeline/standard-pipeline').StandardPipeline.mock.instances[0];

      await command.execute(args);
      
      expect(mockPipeline.run).toHaveBeenCalledWith(
        expect.objectContaining({
          performanceBudget: expect.any(Object)
        })
      );
    });

    it('should use custom budget values', async () => {
      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        lcpBudget: 2000,
        clsBudget: 0.05
      };

      const mockPipeline = require('../../src/core/pipeline/standard-pipeline').StandardPipeline.mock.instances[0];

      await command.execute(args);
      
      const calledArgs = mockPipeline.run.mock.calls[0][0];
      expect(calledArgs.performanceBudget.lcp.good).toBe(2000);
      expect(calledArgs.performanceBudget.cls.good).toBe(0.05);
    });
  });

  describe('Sitemap Discovery', () => {
    it('should discover sitemap when not directly provided', async () => {
      const mockDiscovery = require('../../src/core/parsers/sitemap-discovery').SitemapDiscovery.mock.instances[0];
      
      const args = {
        sitemapUrl: 'https://example.com' // No sitemap.xml in URL
      };

      await command.execute(args);
      
      expect(mockDiscovery.discoverSitemap).toHaveBeenCalledWith('https://example.com');
    });

    it('should handle sitemap discovery failure', async () => {
      const mockDiscovery = require('../../src/core/parsers/sitemap-discovery').SitemapDiscovery.mock.instances[0];
      mockDiscovery.discoverSitemap.mockResolvedValueOnce({
        found: false,
        warnings: ['No sitemap found']
      });
      
      const args = {
        sitemapUrl: 'https://example.com'
      };

      const result = await command.execute(args);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('No sitemap found');
    });
  });

  describe('Output Directory Setup', () => {
    it('should create output directory based on domain', () => {
      const outputInfo = (command as any).setupOutputDirectory(
        'https://example.com/sitemap.xml',
        './test-reports'
      );
      
      expect(outputInfo.dir).toBe('./test-reports/example.com');
      expect(outputInfo.domain).toBe('example.com');
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
      const commands = registry.getAvailableCommands();
      
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
      
      expect(result.success).toBe(true);
      expect(result.exitCode).toBe(0);
    });

    it('should return error for unknown command', async () => {
      const result = await registry.executeCommand('unknown', {});
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unknown command: unknown');
      expect(result.exitCode).toBe(1);
    });

    it('should handle command execution errors', async () => {
      // Force the audit command to fail
      const mockPipeline = require('../../src/core/pipeline/standard-pipeline').StandardPipeline.mock.instances[0];
      mockPipeline.run.mockRejectedValueOnce(new Error('Command failed'));

      const args = {
        sitemapUrl: 'https://example.com/sitemap.xml'
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
      expect(result.message).toContain('sitemapUrl');
    });
  });
});
