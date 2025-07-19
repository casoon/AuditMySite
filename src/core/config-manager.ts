import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface AuditConfig {
  sitemap?: string;
  maxPages?: number;
  timeout?: number;
  outputDir?: string;
  standards?: string[];
  performance?: {
    enabled?: boolean;
    lighthouse?: boolean;
    coreWebVitals?: boolean;
  };
  security?: {
    enabled?: boolean;
    scanHeaders?: boolean;
    httpsCheck?: boolean;
    cspCheck?: boolean;
  };
  accessibility?: {
    enabled?: boolean;
    pa11y?: boolean;
    wcag?: string;
  };
  seo?: {
    enabled?: boolean;
    metaCheck?: boolean;
    structuredData?: boolean;
  };
  mobile?: {
    enabled?: boolean;
    touchTargets?: boolean;
    pwa?: boolean;
  };
  parallel?: {
    maxConcurrent?: number;
    maxRetries?: number;
    retryDelay?: number;
  };
  output?: {
    format?: 'markdown' | 'html' | 'json' | 'csv';
    includeCopyButtons?: boolean;
    includeDetails?: boolean;
  };
  logging?: {
    level?: 'debug' | 'info' | 'warn' | 'error';
    file?: string;
    verbose?: boolean;
  };
}

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
   * Lädt Konfiguration aus Datei
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
   * Speichert Konfiguration in Datei
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
   * Lädt Konfiguration aus Environment Variables
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
   * Wendet Preset-Konfiguration an
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
   * Zeigt verfügbare Presets
   */
  listPresets(): void {
    console.log('📋 Available presets:');
    for (const [name, preset] of this.presets) {
      console.log(`  ${name}: ${preset.description}`);
    }
  }

  /**
   * Erstellt Standard-Konfigurationsdatei
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
        includeCopyButtons: true,
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
   * Validiert Konfiguration
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
   * Gibt aktuelle Konfiguration zurück
   */
  getConfig(): AuditConfig {
    return this.config;
  }

  /**
   * Setzt Konfigurationswert
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