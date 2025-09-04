/**
 * 🧪 Config Manager Unit Tests
 * 
 * Tests configuration loading, validation, and merging logic.
 * Simplified tests for the current architecture.
 */

import { ConfigManager, ValidationResult } from '../../src/core/config/config-manager';
import { AuditConfig } from '../../src/core/config/types';

describe('ConfigManager', () => {
  let configManager: ConfigManager;

  beforeEach(() => {
    configManager = new ConfigManager();
  });

  describe('Configuration Loading', () => {
    it('should load default configuration', () => {
      const config = configManager.getDefaults();
      
      expect(config.maxPages).toBe(5);
      expect(config.standards.wcag).toBe('WCAG2AA');
      expect(config.output.format).toBe('html');
      expect(config.output.outputDir).toBe('./reports');
    });

    it('should load configuration from CLI arguments', () => {
      const cliArgs = {
        maxPages: 20,
        format: ['json', 'html'],
        outputDir: './custom-reports'
      };

      const config = configManager.loadFromCLI(cliArgs);
      
      expect(config.maxPages).toBe(20);
      expect(config.output?.format).toBe('json'); // First format
      expect(config.output?.outputDir).toBe('./custom-reports');
    });

    it('should load environment variables', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        AUDIT_MAX_PAGES: '25'
      };

      const config = configManager.loadFromEnvironment();
      
      expect(config.maxPages).toBe(25);

      process.env = originalEnv;
    });
  });

  describe('Configuration Merging', () => {
    it('should merge multiple configurations correctly', () => {
      const baseConfig = configManager.getDefaults();
      const overrideConfig = {
        maxPages: 100,
        output: { format: 'json' }
      };

      const merged = configManager.mergeConfigs([baseConfig, overrideConfig]);
      
      expect(merged.maxPages).toBe(100);
      expect(merged.output.format).toBe('json');
      // Should preserve other defaults
      expect(merged.standards.wcag).toBe('WCAG2AA');
    });

    it('should handle multiple config objects with precedence', () => {
      const config1 = { maxPages: 10 };
      const config2 = { maxPages: 20 };
      const config3 = { maxPages: 30, output: { format: 'html' as const } };

      const merged = configManager.mergeConfigs([config1, config2, config3]);
      
      expect(merged.maxPages).toBe(30); // Last one wins
      expect(merged.output.format).toBe('html'); // From third
      // Should preserve defaults
      expect(merged.standards.wcag).toBe('WCAG2AA');
    });
  });

  describe('Preset management', () => {
    it('should load available presets', () => {
      const presets = configManager.getAvailablePresets();
      expect(Array.isArray(presets)).toBe(true);
      expect(presets.length).toBeGreaterThan(0);
      expect(presets.some(p => p.name === 'react')).toBe(true);
      expect(presets.some(p => p.name === 'vue')).toBe(true);
    });

    it('should load specific preset', () => {
      const preset = configManager.loadPreset('react');
      expect(preset).toBeDefined();
      expect(preset.maxPages).toBe(10);
      expect(preset.standards).toBeDefined();
      expect(preset.standards!.wcag).toBe('WCAG2AA');
    });

    it('should return empty object for unknown preset', () => {
      const preset = configManager.loadPreset('non-existent-preset');
      expect(preset).toEqual({});
    });

    it('should merge preset with custom configuration', () => {
      const preset = configManager.loadPreset('react');
      const custom = { maxPages: 50 };
      
      const merged = configManager.mergeConfigs([preset, custom]);
      expect(merged.maxPages).toBe(50);
      expect(merged.standards.wcag).toBe('WCAG2AA'); // From preset
    });
  });

  describe('Configuration validation', () => {
    it('should validate correct configuration', () => {
      const validConfig = {
        maxPages: 10,
        standards: {
          wcag: 'WCAG2AA'
        },
        output: {
          format: 'html',
          outputDir: './reports'
        }
      };

      const result = configManager.validate(validConfig);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid maxPages', () => {
      const invalidConfig = {
        maxPages: 0, // Invalid: should be > 0
        output: { format: 'html' }
      };

      const result = configManager.validate(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(error => error.includes('maxPages'))).toBe(true);
    });

    it('should detect invalid output format', () => {
      const invalidConfig = {
        maxPages: 5,
        output: {
          format: 'invalid-format' as any // Invalid format
        }
      };

      const result = configManager.validate(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('format'))).toBe(true);
    });
  });
});
