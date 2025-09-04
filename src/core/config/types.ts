/**
 * 🔧 Configuration System Types
 * 
 * Type definitions for the unified configuration system.
 * Based on CONFIG-SYSTEM-CONCEPT.md
 */

export interface ServerConfig {
  type: 'dev-server' | 'static' | 'custom';
  port?: number;
  host?: string;
  startCommand?: string;
  buildCommand?: string;
  serveCommand?: string;
  healthCheck?: string;
  timeout?: number;
}

export interface StandardsConfig {
  wcag: 'WCAG2A' | 'WCAG2AA' | 'WCAG2AAA' | 'Section508';
  strictMode?: boolean;
  failOnWarnings?: boolean;
  ignoreRules?: string[];
}

export interface PerformanceConfig {
  budgets: 'development' | 'production' | 'ecommerce' | 'corporate' | 'blog' | 'default' | 'custom';
  collectMetrics?: ('LCP' | 'CLS' | 'FCP' | 'INP' | 'TTFB')[];
  ignoreThresholds?: boolean;
  enforceThresholds?: boolean;
  customBudgets?: {
    lcp?: { good: number; poor: number };
    cls?: { good: number; poor: number };
    fcp?: { good: number; poor: number };
    inp?: { good: number; poor: number };
    ttfb?: { good: number; poor: number };
  };
}

export interface OutputConfig {
  format: 'html' | 'markdown' | 'json' | 'junit' | 'terminal';
  outputDir?: string;
  interactive?: boolean;
  detailedFixes?: boolean;
  realTimeUpdates?: boolean;
  exitOnFail?: boolean;
  reporters?: ('console' | 'github-actions' | 'slack' | 'email')[];
}

export interface TestingConfig {
  parallel?: {
    enabled?: boolean;
    maxConcurrent?: number;
    retries?: number;
  };
  screenshots?: {
    enabled?: boolean;
    onErrors?: boolean;
    responsive?: ('desktop' | 'mobile' | 'tablet')[];
  };
  coverage?: {
    accessibility?: boolean;
    performance?: boolean;
    seo?: boolean;
    security?: boolean;
    custom?: string[];
  };
  queueType?: 'simple' | 'parallel' | 'priority' | 'persistent';
}

export interface FrameworkConfig {
  type?: 'react' | 'vue' | 'angular' | 'nextjs' | 'static' | 'wordpress' | 'custom';
  router?: 'react-router' | 'vue-router' | 'nextjs' | 'custom';
  buildTool?: 'vite' | 'webpack' | 'nextjs' | 'custom';
  routes?: {
    patterns?: string[];
    exclude?: string[];
    include?: (string | RouteWithAuth)[];
  };
}

export interface RouteWithAuth {
  path: string;
  auth?: {
    type: 'session' | 'token' | 'basic';
    loginUrl?: string;
    testUser?: {
      email?: string;
      username?: string;
      password: string;
    };
  };
}

export interface ReportingConfig {
  outputDir?: string;
  formats?: ('html' | 'markdown' | 'json' | 'pdf')[];
  templates?: {
    html?: string;
    email?: string;
  };
  branding?: {
    logo?: string;
    colors?: {
      primary?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
    company?: string;
    footer?: string;
  };
}

export interface IntegrationsConfig {
  git?: {
    enabled?: boolean;
    compareWith?: string;
    commitReports?: boolean;
    prComments?: boolean;
  };
  slack?: {
    webhook?: string;
    channel?: string;
    onlyOnFail?: boolean;
  };
  jira?: {
    host?: string;
    project?: string;
    issueType?: string;
    autoCreate?: boolean;
  };
}

export interface MonitoringConfig {
  enabled?: boolean;
  schedule?: 'hourly' | 'daily' | 'weekly' | 'monthly';
  alerts?: ('slack' | 'email' | 'webhook')[];
  thresholds?: {
    errorRate?: number;
    performanceScore?: number;
    accessibilityScore?: number;
  };
}

export interface AdvancedConfig {
  browser?: {
    viewport?: { width: number; height: number };
    userAgent?: string;
    cookies?: Array<{
      name: string;
      value: string;
      domain?: string;
    }>;
  };
  network?: {
    throttle?: '3g' | '4g' | 'wifi' | 'none';
    offline?: boolean;
  };
  waitConditions?: (
    | 'networkidle0' 
    | 'networkidle2' 
    | 'domcontentloaded' 
    | 'load'
    | { selector: string; hidden?: boolean }
    | { function: string }
  )[];
}

export interface EnvironmentConfig {
  server?: ServerConfig;
  standards?: StandardsConfig;
  performance?: PerformanceConfig;
  output?: OutputConfig;
  testing?: TestingConfig;
  monitoring?: MonitoringConfig;
}

export interface AuditConfig {
  // Multi-environment support
  environments?: {
    development?: EnvironmentConfig;
    ci?: EnvironmentConfig;
    production?: EnvironmentConfig;
    [key: string]: EnvironmentConfig | undefined;
  };

  // Global settings
  extends?: string[];
  framework?: FrameworkConfig;
  testing?: TestingConfig;
  reporting?: ReportingConfig;
  integrations?: IntegrationsConfig;
  advanced?: AdvancedConfig;

  // Basic settings (for simple configs)
  sitemapUrl?: string;
  maxPages?: number;
  routes?: string[];
  standards?: StandardsConfig;
  performance?: PerformanceConfig;
  output?: OutputConfig;
}

export interface ResolvedConfig extends Required<AuditConfig> {
  // Resolved configuration after merging all sources
  environment: string;
  configSources: ConfigSource[];
  validationErrors: string[];
  validationWarnings: string[];
}

export interface ConfigSource {
  type: 'file' | 'package.json' | 'cli' | 'environment' | 'default';
  path?: string;
  priority: number;
  data: Partial<AuditConfig>;
}

export interface ConfigValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface ConfigPreset {
  name: string;
  description: string;
  extends?: string[];
  config: Partial<AuditConfig>;
}

// Preset configurations
export const PRESET_CONFIGS: Record<string, ConfigPreset> = {
  'react': {
    name: 'React SPA',
    description: 'Configuration optimized for React single-page applications',
    config: {
      framework: {
        type: 'react',
        router: 'react-router',
        buildTool: 'vite'
      },
      testing: {
        parallel: { enabled: true, maxConcurrent: 2 },
        coverage: { accessibility: true, performance: true }
      },
      environments: {
        development: {
          server: { type: 'dev-server', port: 3000 },
          standards: { wcag: 'WCAG2AA', strictMode: false },
          performance: { budgets: 'development', ignoreThresholds: true }
        }
      }
    }
  },
  'nextjs': {
    name: 'Next.js Application',
    description: 'Configuration for Next.js applications with SSR support',
    config: {
      framework: {
        type: 'nextjs',
        router: 'nextjs',
        buildTool: 'nextjs'
      },
      environments: {
        development: {
          server: { type: 'dev-server', port: 3000 },
          performance: { budgets: 'development' }
        },
        production: {
          performance: { budgets: 'production', enforceThresholds: true }
        }
      }
    }
  },
  'ecommerce': {
    name: 'E-commerce Site',
    description: 'Strict performance and accessibility for conversion optimization',
    config: {
      standards: { wcag: 'WCAG2AA', strictMode: true },
      performance: { budgets: 'ecommerce', enforceThresholds: true },
      testing: {
        parallel: { enabled: true, maxConcurrent: 1 },
        coverage: { accessibility: true, performance: true }
      }
    }
  },
  'corporate': {
    name: 'Corporate Website',
    description: 'Professional standards with compliance focus',
    config: {
      standards: { wcag: 'WCAG2AAA', strictMode: true },
      performance: { budgets: 'corporate' },
      reporting: {
        formats: ['html', 'pdf'],
        branding: { company: 'Corporate' }
      }
    }
  },
  'blog': {
    name: 'Blog/Content Site',
    description: 'Content-focused with good performance',
    config: {
      performance: { budgets: 'blog' },
      testing: {
        parallel: { enabled: true, maxConcurrent: 3 }
      }
    }
  }
};
