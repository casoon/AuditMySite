/**
 * 🔧 Configuration Manager
 * 
 * Main class for configuration management.
 * Handles loading, merging, and validation of configurations from multiple sources.
 */

import { 
  AuditConfig, 
  ResolvedConfig, 
  ConfigSource, 
  ConfigValidationResult,
  PRESET_CONFIGS,
  ConfigPreset
} from './types';
import {
  BaseConfigSource,
  CLIConfigSource,
  JSConfigSource,
  JSONConfigSource,
  AuditRCSource,
  PackageJsonConfigSource,
  EnvironmentConfigSource,
  DefaultConfigSource
} from './config-sources';

export class ConfigManager {
  private sources: BaseConfigSource[] = [];
  private basePath: string;
  private environment: string;

  constructor(basePath: string = process.cwd(), environment: string = 'development') {
    this.basePath = basePath;
    this.environment = environment;
  }

  /**
   * Resolve configuration from CLI arguments and file sources
   */
  async resolve(cliArgs: Record<string, any> = {}): Promise<ResolvedConfig> {
    // Initialize sources in priority order
    this.initializeSources(cliArgs);

    // Load configuration from all sources
    const loadedSources = await this.loadAllSources();

    // Merge configurations by priority
    const mergedConfig = this.mergeConfigurations(loadedSources);

    // Apply environment-specific configuration
    const envConfig = this.applyEnvironmentConfig(mergedConfig, this.environment);

    // Validate final configuration
    const validation = this.validateConfig(envConfig);

    // Resolve extends (presets)
    const finalConfig = await this.resolveExtends(envConfig);

    return {
      ...finalConfig,
      environment: this.environment,
      configSources: loadedSources,
      validationErrors: validation.errors,
      validationWarnings: validation.warnings
    } as ResolvedConfig;
  }

  /**
   * Initialize configuration sources in priority order
   */
  private initializeSources(cliArgs: Record<string, any>): void {
    this.sources = [
      new CLIConfigSource(cliArgs),          // Priority 100
      new JSConfigSource(),                  // Priority 90
      new JSONConfigSource(),                // Priority 85
      new AuditRCSource(),                   // Priority 80
      new PackageJsonConfigSource(),         // Priority 70
      new EnvironmentConfigSource(),         // Priority 60
      new DefaultConfigSource()              // Priority 10
    ];
  }

  /**
   * Load configuration from all available sources
   */
  private async loadAllSources(): Promise<ConfigSource[]> {
    const loadedSources: ConfigSource[] = [];

    for (const source of this.sources) {
      try {
        if (await source.isAvailable(this.basePath)) {
          const config = await source.load(this.basePath);
          if (config) {
            loadedSources.push(config);
          }
        }
      } catch (error) {
        console.warn(`Failed to load config source: ${error}`);
      }
    }

    // Sort by priority (highest first)
    loadedSources.sort((a, b) => b.priority - a.priority);

    return loadedSources;
  }

  /**
   * Merge configurations from multiple sources
   */
  private mergeConfigurations(sources: ConfigSource[]): AuditConfig {
    let merged: AuditConfig = {};

    // Merge in reverse priority order (lowest to highest)
    for (const source of sources.reverse()) {
      merged = this.deepMerge(merged, source.data);
    }

    return merged;
  }

  /**
   * Apply environment-specific configuration
   */
  private applyEnvironmentConfig(config: AuditConfig, environment: string): AuditConfig {
    if (!config.environments || !config.environments[environment]) {
      return config;
    }

    const envConfig = config.environments[environment];
    const result = { ...config };

    // Merge environment-specific settings
    if (envConfig.standards) {
      result.standards = { ...result.standards, ...envConfig.standards };
    }
    if (envConfig.performance) {
      result.performance = { ...result.performance, ...envConfig.performance };
    }
    if (envConfig.output) {
      result.output = { ...result.output, ...envConfig.output };
    }
    if (envConfig.testing) {
      result.testing = this.deepMerge(result.testing || {}, envConfig.testing);
    }
    if (envConfig.monitoring) {
      result.monitoring = { ...result.monitoring, ...envConfig.monitoring };
    }

    return result;
  }

  /**
   * Resolve extends (presets) configuration
   */
  private async resolveExtends(config: AuditConfig): Promise<AuditConfig> {
    if (!config.extends || config.extends.length === 0) {
      return config;
    }

    let result = { ...config };

    for (const presetName of config.extends) {
      const preset = await this.loadPreset(presetName);
      if (preset) {
        // Merge preset config (preset has lower priority than main config)
        result = this.deepMerge(preset.config, result);
      }
    }

    // Remove extends to avoid infinite recursion
    delete result.extends;

    return result;
  }

  /**
   * Load preset configuration
   */
  private async loadPreset(presetName: string): Promise<ConfigPreset | null> {
    // Check built-in presets first
    if (PRESET_CONFIGS[presetName]) {
      return PRESET_CONFIGS[presetName];
    }

    // Try to load external preset (npm package)
    try {
      const presetModule = require(`@auditmysite/config-${presetName}`);
      return presetModule.default || presetModule;
    } catch (error) {
      console.warn(`Failed to load preset '${presetName}': ${error}`);
      return null;
    }
  }

  /**
   * Validate configuration
   */
  private validateConfig(config: AuditConfig): ConfigValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Validate basic settings
    if (config.maxPages && (config.maxPages < 1 || config.maxPages > 1000)) {
      errors.push('maxPages must be between 1 and 1000');
    }

    // Validate performance budgets
    if (config.performance?.customBudgets) {
      const budgets = config.performance.customBudgets;
      if (budgets.lcp && (budgets.lcp.good <= 0 || budgets.lcp.good > 10000)) {
        errors.push('LCP budget must be between 0 and 10000ms');
      }
      if (budgets.cls && (budgets.cls.good < 0 || budgets.cls.good > 1)) {
        errors.push('CLS budget must be between 0 and 1');
      }
    }

    // Validate testing configuration
    if (config.testing?.parallel?.maxConcurrent) {
      const concurrent = config.testing.parallel.maxConcurrent;
      if (concurrent < 1 || concurrent > 10) {
        errors.push('maxConcurrent must be between 1 and 10');
      }
    }

    // Warnings and suggestions
    if (!config.sitemapUrl && !config.routes?.length) {
      warnings.push('No sitemap URL or routes specified - only CLI arguments will be used');
      suggestions.push('Consider adding a sitemapUrl or routes array to your configuration');
    }

    if (config.performance?.budgets === 'custom' && !config.performance?.customBudgets) {
      warnings.push('Custom budget selected but no custom values provided');
      suggestions.push('Add customBudgets configuration or use a predefined budget template');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }

  /**
   * Deep merge two objects
   */
  private deepMerge<T extends Record<string, any>>(target: T, source: T): T {
    const result = { ...target };

    for (const key in source) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * Get available presets
   */
  static getAvailablePresets(): ConfigPreset[] {
    return Object.values(PRESET_CONFIGS);
  }

  /**
   * Generate configuration file
   */
  async generateConfigFile(
    preset: string = 'react',
    outputPath: string = 'audit.config.js',
    format: 'js' | 'json' = 'js'
  ): Promise<void> {
    const presetConfig = PRESET_CONFIGS[preset];
    if (!presetConfig) {
      throw new Error(`Unknown preset: ${preset}`);
    }

    const config = {
      extends: [preset],
      ...presetConfig.config
    };

    const fs = require('fs');
    const path = require('path');

    const fullPath = path.resolve(this.basePath, outputPath);

    if (format === 'js') {
      const content = `module.exports = ${JSON.stringify(config, null, 2)};`;
      fs.writeFileSync(fullPath, content, 'utf8');
    } else {
      const content = JSON.stringify(config, null, 2);
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }

  /**
   * Set environment
   */
  setEnvironment(environment: string): void {
    this.environment = environment;
  }

  /**
   * Get current environment
   */
  getEnvironment(): string {
    return this.environment;
  }

  /**
   * Set base path
   */
  setBasePath(basePath: string): void {
    this.basePath = basePath;
  }

  /**
   * Get current base path
   */
  getBasePath(): string {
    return this.basePath;
  }
}

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { AuditConfig } from '@core/types';

export interface PresetConfig {
  name: string;
  description: string;
  config: Partial<AuditConfig>;
}

export class ConfigManager {
  private config: AuditConfig = {};
  private configPath: string | null = null;
  private presets: Map<string, PresetConfig> = new Map();

  constructor() {
    this.initializePresets();
  }

  /**
   * Loads configuration from file
   */
  loadConfig(configPath?: string): AuditConfig {
    const paths = configPath ? [configPath] : this.getDefaultConfigPaths();
    
    for (const path of paths) {
      if (fs.existsSync(path)) {
        try {
          const content = fs.readFileSync(path, 'utf8');
          const extension = path.split('.').pop()?.toLowerCase();
          
          if (extension === 'yaml' || extension === 'yml') {
            this.config = yaml.load(content) as AuditConfig;
          } else if (extension === 'json') {
            this.config = JSON.parse(content);
          }
          
          this.configPath = path;
          console.log(`📋 Config loaded from: ${path}`);
          break;
        } catch (error) {
          console.warn(`⚠️ Failed to load config from ${path}:`, error);
        }
      }
    }

    return this.config;
  }

  /**
   * Saves configuration to file
   */
  saveConfig(config: AuditConfig, configPath?: string): void {
    const path = configPath || this.configPath || 'auditmysite.config.yml';
    const extension = path.split('.').pop()?.toLowerCase();
    
    try {
      let content: string;
      
      if (extension === 'yaml' || extension === 'yml') {
        content = yaml.dump(config, { indent: 2 });
      } else if (extension === 'json') {
        content = JSON.stringify(config, null, 2);
      } else {
        throw new Error(`Unsupported config format: ${extension}`);
      }
      
      fs.writeFileSync(path, content, 'utf8');
      console.log(`💾 Config saved to: ${path}`);
    } catch (error) {
      console.error(`❌ Failed to save config to ${path}:`, error);
    }
  }

  /**
   * Loads configuration from environment variables
   */
  loadFromEnvironment(): void {
    const envConfig: Partial<AuditConfig> = {};
    
    if (process.env.AUDITMYSITE_SITEMAP) {
      envConfig.sitemap = process.env.AUDITMYSITE_SITEMAP;
    }
    
    if (process.env.AUDITMYSITE_MAX_PAGES) {
      envConfig.maxPages = parseInt(process.env.AUDITMYSITE_MAX_PAGES);
    }
    
    if (process.env.AUDITMYSITE_TIMEOUT) {
      envConfig.timeout = parseInt(process.env.AUDITMYSITE_TIMEOUT);
    }
    
    if (process.env.AUDITMYSITE_OUTPUT_DIR) {
      envConfig.outputDir = process.env.AUDITMYSITE_OUTPUT_DIR;
    }
    
    if (process.env.AUDITMYSITE_STANDARDS) {
      envConfig.standards = process.env.AUDITMYSITE_STANDARDS.split(',');
    }
    
    if (process.env.AUDITMYSITE_MAX_CONCURRENT) {
      envConfig.parallel = {
        ...envConfig.parallel,
        maxConcurrent: parseInt(process.env.AUDITMYSITE_MAX_CONCURRENT)
      };
    }
    
    if (process.env.AUDITMYSITE_LOG_LEVEL) {
      envConfig.logging = {
        ...envConfig.logging,
        level: process.env.AUDITMYSITE_LOG_LEVEL as any
      };
    }
    
    // Merge mit bestehender Konfiguration
    this.config = { ...this.config, ...envConfig };
  }

  /**
   * Applies preset configuration
   */
  applyPreset(presetName: string): AuditConfig {
    const preset = this.presets.get(presetName);
    if (!preset) {
      throw new Error(`Preset '${presetName}' not found. Available presets: ${Array.from(this.presets.keys()).join(', ')}`);
    }
    
    this.config = { ...this.config, ...preset.config };
    console.log(`🎯 Applied preset: ${preset.name} - ${preset.description}`);
    
    return this.config;
  }

  /**
   * Shows available presets
   */
  listPresets(): void {
    console.log('📋 Available presets:');
    for (const [name, preset] of this.presets) {
      console.log(`  ${name}: ${preset.description}`);
    }
  }

  /**
   * Creates default configuration file
   */
  createDefaultConfig(configPath: string = 'auditmysite.config.yml'): void {
    const defaultConfig: AuditConfig = {
      sitemap: 'https://example.com/sitemap.xml',
      maxPages: 50,
      timeout: 15000,
      outputDir: './reports',
      standards: ['WCAG2AA', 'Section508'],
      performance: {
        enabled: true,
        lighthouse: true,
        coreWebVitals: true
      },
      security: {
        enabled: true,
        scanHeaders: true,
        httpsCheck: true,
        cspCheck: true
      },
      accessibility: {
        enabled: true,
        pa11y: true,
        wcag: 'WCAG2AA'
      },
      seo: {
        enabled: true,
        metaCheck: true,
        structuredData: true
      },
      mobile: {
        enabled: true,
        touchTargets: true,
        pwa: true
      },
      parallel: {
        maxConcurrent: 3,
        maxRetries: 3,
        retryDelay: 2000
      },
      output: {
        format: 'markdown',
        includeDetails: true
      },
      logging: {
        level: 'info',
        verbose: false
      }
    };
    
    this.saveConfig(defaultConfig, configPath);
  }

  /**
   * Validates configuration
   */
  validateConfig(config: AuditConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (config.maxPages && (config.maxPages < 1 || config.maxPages > 1000)) {
      errors.push('maxPages must be between 1 and 1000');
    }
    
    if (config.timeout && (config.timeout < 1000 || config.timeout > 60000)) {
      errors.push('timeout must be between 1000 and 60000ms');
    }
    
    if (config.parallel?.maxConcurrent && (config.parallel.maxConcurrent < 1 || config.parallel.maxConcurrent > 20)) {
      errors.push('maxConcurrent must be between 1 and 20');
    }
    
    if (config.standards) {
      const validStandards = ['WCAG2A', 'WCAG2AA', 'WCAG2AAA', 'Section508'];
      for (const standard of config.standards) {
        if (!validStandards.includes(standard)) {
          errors.push(`Invalid standard: ${standard}. Valid standards: ${validStandards.join(', ')}`);
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Returns current configuration
   */
  getConfig(): AuditConfig {
    return this.config;
  }

  /**
   * Sets configuration value
   */
  setConfig(key: string, value: any): void {
    const keys = key.split('.');
    let current: any = this.config;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  private getDefaultConfigPaths(): string[] {
    return [
      'auditmysite.config.yml',
      'auditmysite.config.yaml',
      'auditmysite.config.json',
      '.auditmysite.yml',
      '.auditmysite.yaml',
      '.auditmysite.json'
    ];
  }

  private initializePresets(): void {
    this.presets.set('quick', {
      name: 'Quick Test',
      description: 'Fast test with basic checks (10 URLs)',
      config: {
        maxPages: 10,
        timeout: 10000,
        performance: { enabled: false },
        security: { enabled: false },
        seo: { enabled: false },
        mobile: { enabled: false },
        parallel: { maxConcurrent: 2 }
      }
    });

    this.presets.set('standard', {
      name: 'Standard Test',
      description: 'Comprehensive test with all features (50 URLs)',
      config: {
        maxPages: 50,
        timeout: 15000,
        performance: { enabled: true },
        security: { enabled: true },
        seo: { enabled: true },
        mobile: { enabled: true },
        parallel: { maxConcurrent: 3 }
      }
    });

    this.presets.set('thorough', {
      name: 'Thorough Test',
      description: 'Complete analysis with all tests (100 URLs)',
      config: {
        maxPages: 100,
        timeout: 20000,
        performance: { enabled: true, lighthouse: true },
        security: { enabled: true, scanHeaders: true },
        seo: { enabled: true, structuredData: true },
        mobile: { enabled: true, pwa: true },
        parallel: { maxConcurrent: 5 },
        output: { includeDetails: true }
      }
    });

    this.presets.set('ci', {
      name: 'CI/CD Test',
      description: 'Optimized for continuous integration',
      config: {
        maxPages: 20,
        timeout: 10000,
        performance: { enabled: true },
        security: { enabled: true },
        accessibility: { enabled: true },
        parallel: { maxConcurrent: 3 },
        output: { format: 'json' },
        logging: { level: 'warn' }
      }
    });
  }
} 