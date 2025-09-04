/**
 * 🧪 Config Manager Unit Tests
 * 
 * Tests configuration loading, validation, and merging logic.
 * Fast tests with mocked file system operations.
 */

import { ConfigManager } from '../../src/config/config-manager';
import { AuditConfig, ServerConfig, ValidationResult } from '../../src/config/types';

// Mock fs operations
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn()
}));

const mockFs = require('fs');

describe('ConfigManager', () => {
  let configManager: ConfigManager;

  beforeEach(() => {
    configManager = new ConfigManager();
    jest.clearAllMocks();
  });

  describe('Configuration Loading', () => {
    it('should load default configuration', () => {
      const config = configManager.getDefaults();
      
      expect(config.server.maxPages).toBe(10);
      expect(config.server.timeout).toBe(10000);
      expect(config.standards.pa11yStandard).toBe('WCAG2AA');
      expect(config.output.formats).toContain('html');
    });

    it('should merge CLI arguments with defaults', () => {
      const cliArgs = {
        maxPages: 20,
        format: ['json', 'csv'],
        verbose: true
      };

      const config = configManager.loadFromCLI(cliArgs);
      
      expect(config.server.maxPages).toBe(20);
      expect(config.output.formats).toEqual(['json', 'csv']);
      expect(config.server.verbose).toBe(true);
      // Should keep defaults for unspecified options
      expect(config.server.timeout).toBe(10000);
    });

    it('should load configuration from JS config file', () => {
      const mockConfig = {
        server: { maxPages: 50 },
        standards: { pa11yStandard: 'WCAG2AAA' },
        output: { formats: ['html', 'json'] }
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(`module.exports = ${JSON.stringify(mockConfig)};`);

      const config = configManager.loadFromFile('./test-config.js');
      
      expect(config.server.maxPages).toBe(50);
      expect(config.standards.pa11yStandard).toBe('WCAG2AAA');
      expect(config.output.formats).toEqual(['html', 'json']);
    });

    it('should load configuration from JSON config file', () => {
      const mockConfig = {
        server: { maxPages: 30 },
        performance: { 
          budgets: {
            lcp: { good: 2000, poor: 4000 }
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      const config = configManager.loadFromFile('./test-config.json');
      
      expect(config.server.maxPages).toBe(30);
      expect(config.performance.budgets.lcp.good).toBe(2000);
    });

    it('should handle missing config file gracefully', () => {
      mockFs.existsSync.mockReturnValue(false);
      
      expect(() => {
        configManager.loadFromFile('./nonexistent.json');
      }).toThrow('Configuration file not found');
    });

    it('should load environment variables', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        AUDIT_MAX_PAGES: '25',
        AUDIT_VERBOSE: 'true',
        AUDIT_OUTPUT_DIR: './custom-reports'
      };

      const config = configManager.loadFromEnvironment();
      
      expect(config.server.maxPages).toBe(25);
      expect(config.server.verbose).toBe(true);
      expect(config.output.outputDir).toBe('./custom-reports');

      process.env = originalEnv;
    });
  });

  describe('Configuration Merging', () => {
    it('should merge configurations with correct priority', () => {
      const baseConfig = configManager.getDefaults();
      const cliConfig = { server: { maxPages: 15, verbose: true } };
      const fileConfig = { server: { maxPages: 30, timeout: 15000 } };

      const merged = configManager.mergeConfigs([baseConfig, fileConfig, cliConfig]);
      
      // CLI should have highest priority
      expect(merged.server.maxPages).toBe(15);
      expect(merged.server.verbose).toBe(true);
      // File config should override defaults but not CLI
      expect(merged.server.timeout).toBe(15000);
    });

    it('should handle nested object merging', () => {
      const config1 = {
        performance: {
          budgets: {
            lcp: { good: 2500, poor: 4000 },
            cls: { good: 0.1, poor: 0.25 }
          }
        }
      };

      const config2 = {
        performance: {
          budgets: {
            lcp: { good: 2000 }, // Should update only 'good', keep 'poor'
            fid: { good: 100, poor: 300 } // Should add new budget
          }
        }
      };

      const merged = configManager.mergeConfigs([config1, config2]);
      
      expect(merged.performance.budgets.lcp.good).toBe(2000);
      expect(merged.performance.budgets.lcp.poor).toBe(4000);
      expect(merged.performance.budgets.cls.good).toBe(0.1);
      expect(merged.performance.budgets.fid.good).toBe(100);
    });
  });

  describe('Preset Loading', () => {
    it('should load React preset configuration', () => {
      const preset = configManager.loadPreset('react');
      
      expect(preset.frameworks.detection.react).toBe(true);
      expect(preset.server.maxPages).toBeGreaterThan(5); // React apps typically need more pages
      expect(preset.testing.customTests).toEqual(expect.arrayContaining(['react-specific']));
    });

    it('should load Next.js preset configuration', () => {
      const preset = configManager.loadPreset('nextjs');
      
      expect(preset.frameworks.detection.nextjs).toBe(true);
      expect(preset.performance.budgets.lcp.good).toBeLessThanOrEqual(2500); // Next.js optimizes for performance
      expect(preset.server.generateSeoReport).toBe(true); // Next.js cares about SEO
    });

    it('should throw error for unknown preset', () => {
      expect(() => {
        configManager.loadPreset('unknown-framework');
      }).toThrow('Unknown preset: unknown-framework');
    });

    it('should list available presets', () => {
      const presets = configManager.getAvailablePresets();
      
      expect(presets).toEqual(expect.arrayContaining([
        'react', 'nextjs', 'vue', 'angular', 'svelte', 'ecommerce', 'blog', 'corporate'
      ]));
      expect(presets.length).toBeGreaterThan(5);
    });
  });

  describe('Configuration Validation', () => {
    it('should validate correct configuration', () => {
      const validConfig: Partial<AuditConfig> = {
        server: {
          maxPages: 10,
          timeout: 5000,
          maxConcurrent: 3
        },
        standards: {
          pa11yStandard: 'WCAG2AA'
        },
        output: {
          formats: ['html', 'json']
        }
      };

      const result = configManager.validate(validConfig);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it('should detect validation errors', () => {
      const invalidConfig: any = {
        server: {
          maxPages: -1, // Invalid: negative
          timeout: 'invalid', // Invalid: not a number
          maxConcurrent: 15 // Invalid: too high
        },
        standards: {
          pa11yStandard: 'INVALID_STANDARD'
        },
        output: {
          formats: [] // Invalid: empty array
        }
      };

      const result = configManager.validate(invalidConfig);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(e => e.includes('maxPages'))).toBe(true);
      expect(result.errors.some(e => e.includes('timeout'))).toBe(true);
      expect(result.errors.some(e => e.includes('maxConcurrent'))).toBe(true);
    });

    it('should provide warnings for suboptimal configuration', () => {
      const suboptimalConfig: Partial<AuditConfig> = {
        server: {
          maxPages: 1000, // Warning: very high
          maxConcurrent: 1 // Warning: very low concurrency
        },
        performance: {
          budgets: {
            lcp: { good: 10000, poor: 20000 } // Warning: very lenient budgets
          }
        }
      };

      const result = configManager.validate(suboptimalConfig);
      
      expect(result.isValid).toBe(true); // Valid but not optimal
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.includes('high number of pages'))).toBe(true);
    });

    it('should provide suggestions for improvements', () => {
      const improvableConfig: Partial<AuditConfig> = {
        server: {
          maxPages: 5,
          maxConcurrent: 1
        },
        output: {
          formats: ['html']
        },
        performance: {
          budgets: {}
        }
      };

      const result = configManager.validate(improvableConfig);
      
      expect(result.suggestions.length).toBeGreaterThan(0);
      expect(result.suggestions.some(s => s.includes('concurrency'))).toBe(true);
      expect(result.suggestions.some(s => s.includes('format'))).toBe(true);
    });
  });

  describe('Environment-specific Configuration', () => {
    it('should apply development environment overrides', () => {
      const baseConfig = configManager.getDefaults();
      const devConfig = configManager.applyEnvironmentOverrides(baseConfig, 'development');
      
      expect(devConfig.server.verbose).toBe(true);
      expect(devConfig.output.outputDir).toBe('./dev-reports');
      expect(devConfig.server.maxConcurrent).toBeLessThanOrEqual(2); // Conservative for dev
    });

    it('should apply production environment overrides', () => {
      const baseConfig = configManager.getDefaults();
      const prodConfig = configManager.applyEnvironmentOverrides(baseConfig, 'production');
      
      expect(prodConfig.server.verbose).toBe(false);
      expect(prodConfig.server.maxConcurrent).toBeGreaterThanOrEqual(3); // More aggressive for prod
      expect(prodConfig.reporting.includeDetailedResults).toBe(false); // Cleaner reports
    });

    it('should apply CI environment overrides', () => {
      const baseConfig = configManager.getDefaults();
      const ciConfig = configManager.applyEnvironmentOverrides(baseConfig, 'ci');
      
      expect(ciConfig.server.verbose).toBe(true); // Detailed logging for CI
      expect(ciConfig.output.formats).toContain('json'); // Machine-readable format for CI
      expect(ciConfig.server.timeout).toBeGreaterThan(baseConfig.server.timeout); // More patience in CI
    });
  });

  describe('Configuration Generation', () => {
    it('should generate config file from preset', () => {
      const outputPath = './generated-config.js';
      
      configManager.generateConfigFile('react', outputPath, 'js');
      
      expect(mockFs.writeFileSync).toHaveBeenCalled();
      const [path, content] = mockFs.writeFileSync.mock.calls[0];
      expect(path).toBe(outputPath);
      expect(content).toContain('module.exports');
      expect(content).toContain('react');
    });

    it('should generate JSON config file', () => {
      const outputPath = './generated-config.json';
      
      configManager.generateConfigFile('nextjs', outputPath, 'json');
      
      expect(mockFs.writeFileSync).toHaveBeenCalled();
      const [path, content] = mockFs.writeFileSync.mock.calls[0];
      expect(path).toBe(outputPath);
      expect(() => JSON.parse(content)).not.toThrow();
    });
  });
});
