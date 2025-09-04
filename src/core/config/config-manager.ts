/**
 * 🔧 Configuration Manager
 * 
 * Simplified configuration management for AuditMySite
 * Handles loading, merging, and validation of configurations
 */

import { 
  AuditConfig, 
  ServerConfig,
  StandardsConfig,
  PerformanceConfig,
  OutputConfig
} from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface PresetConfig {
  name: string;
  description: string;
  config: Partial<AuditConfig>;
}

export class ConfigManager {
  private presets: Map<string, PresetConfig> = new Map();

  constructor() {
    this.initializePresets();
  }

  /**
   * Get default configuration
   */
  getDefaults(): AuditConfig {
    return {
      server: {
        maxPages: 5,
        timeout: 30000,
        verbose: false,
        maxConcurrent: 3
      },
      standards: {
        wcag: 'WCAG2AA',
        includeWarnings: true
      },
      performance: {
        collectWebVitals: true,
        budgets: {
          lcp: 2500,
          fcp: 1800,
          cls: 0.1,
          inp: 200,
          ttfb: 600
        }
      },
      output: {
        formats: ['html'],
        directory: './reports'
      }
    };
  }

  /**
   * Load configuration from CLI arguments
   */
  loadFromCLI(args: any): Partial<AuditConfig> {
    const config: Partial<AuditConfig> = {};

    if (args.maxPages !== undefined) {
      config.server = { ...config.server, maxPages: args.maxPages };
    }

    if (args.format) {
      const formats = Array.isArray(args.format) ? args.format : [args.format];
      config.output = { ...config.output, formats };
    }

    if (args.verbose !== undefined) {
      config.server = { ...config.server, verbose: args.verbose };
    }

    if (args.outputDir) {
      config.output = { ...config.output, directory: args.outputDir };
    }

    return config;
  }

  /**
   * Load configuration from environment variables
   */
  loadFromEnvironment(): Partial<AuditConfig> {
    const config: Partial<AuditConfig> = {};

    if (process.env.AUDIT_MAX_PAGES) {
      const maxPages = parseInt(process.env.AUDIT_MAX_PAGES);
      if (!isNaN(maxPages)) {
        config.server = { ...config.server, maxPages };
      }
    }

    if (process.env.AUDIT_VERBOSE === 'true') {
      config.server = { ...config.server, verbose: true };
    }

    return config;
  }

  /**
   * Merge multiple configurations
   */
  mergeConfigs(configs: Array<Partial<AuditConfig>>): AuditConfig {
    const defaults = this.getDefaults();
    let result = { ...defaults };

    for (const config of configs) {
      if (config.server) {
        result.server = { ...result.server, ...config.server };
      }
      if (config.standards) {
        result.standards = { ...result.standards, ...config.standards };
      }
      if (config.performance) {
        result.performance = { ...result.performance, ...config.performance };
        if (config.performance.budgets) {
          result.performance.budgets = { ...result.performance.budgets, ...config.performance.budgets };
        }
      }
      if (config.output) {
        result.output = { ...result.output, ...config.output };
      }
    }

    return result;
  }

  /**
   * Validate configuration
   */
  validate(config: Partial<AuditConfig>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Validate server config
    if (config.server) {
      if (config.server.maxPages !== undefined && (config.server.maxPages < 1 || config.server.maxPages > 1000)) {
        errors.push('maxPages must be between 1 and 1000');
      }
      if (config.server.timeout !== undefined && (config.server.timeout < 5000 || config.server.timeout > 120000)) {
        errors.push('timeout must be between 5000 and 120000 milliseconds');
      }
      if (config.server.maxConcurrent !== undefined && (config.server.maxConcurrent < 1 || config.server.maxConcurrent > 10)) {
        errors.push('maxConcurrent must be between 1 and 10');
      }
    }

    // Validate output config
    if (config.output) {
      if (config.output.formats && config.output.formats.length === 0) {
        errors.push('At least one output format must be specified');
      }
    }

    // Generate warnings
    if (config.server?.maxPages && config.server.maxPages > 50) {
      warnings.push('Testing more than 50 pages may result in high resource usage and long processing times');
    }

    // Generate suggestions
    if (config.server?.maxConcurrent && config.server.maxConcurrent > 5) {
      suggestions.push('Consider reducing concurrency for better system stability');
    }

    if (config.output?.formats && config.output.formats.length > 2) {
      suggestions.push('Multiple output formats may increase processing time');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }

  /**
   * Load preset configuration
   */
  loadPreset(presetName: string): Partial<AuditConfig> {
    switch (presetName) {
      case 'react':
        return {
          server: { maxPages: 10, maxConcurrent: 2 },
          standards: { wcag: 'WCAG2AA' },
          performance: { collectWebVitals: true },
          frameworks: { detection: { react: true } }
        };

      case 'vue':
        return {
          server: { maxPages: 8, maxConcurrent: 2 },
          standards: { wcag: 'WCAG2AA' },
          frameworks: { detection: { vue: true } }
        };

      case 'angular':
        return {
          server: { maxPages: 10, maxConcurrent: 3 },
          standards: { wcag: 'WCAG2AA' },
          frameworks: { detection: { angular: true } }
        };

      case 'ecommerce':
        return {
          server: { maxPages: 25, maxConcurrent: 2 },
          performance: {
            budgets: { lcp: 2000, fcp: 1500, cls: 0.05 }
          }
        };

      case 'corporate':
        return {
          server: { maxPages: 15, maxConcurrent: 3 },
          performance: {
            budgets: { lcp: 2200, fcp: 1600 }
          }
        };

      case 'blog':
        return {
          server: { maxPages: 20, maxConcurrent: 2 },
          performance: {
            budgets: { lcp: 2400, fcp: 1700 }
          }
        };

      default:
        return {};
    }
  }

  /**
   * Initialize built-in presets
   */
  private initializePresets(): void {
    const presets: PresetConfig[] = [
      {
        name: 'react',
        description: 'Optimized for React applications',
        config: this.loadPreset('react')
      },
      {
        name: 'vue',
        description: 'Optimized for Vue.js applications', 
        config: this.loadPreset('vue')
      },
      {
        name: 'angular',
        description: 'Optimized for Angular applications',
        config: this.loadPreset('angular')
      },
      {
        name: 'ecommerce',
        description: 'Strict performance budgets for e-commerce',
        config: this.loadPreset('ecommerce')
      },
      {
        name: 'corporate',
        description: 'Professional standards for corporate sites',
        config: this.loadPreset('corporate')
      },
      {
        name: 'blog',
        description: 'Balanced settings for blogs and content sites',
        config: this.loadPreset('blog')
      }
    ];

    for (const preset of presets) {
      this.presets.set(preset.name, preset);
    }
  }

  /**
   * Get available presets
   */
  getAvailablePresets(): PresetConfig[] {
    return Array.from(this.presets.values());
  }
}
