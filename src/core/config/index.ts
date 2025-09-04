/**
 * 🔧 Configuration System Exports
 * 
 * Centralized exports for the configuration system.
 */

// Main config manager
export { ConfigManager } from './config-manager';

// Configuration sources
export {
  BaseConfigSource,
  CLIConfigSource,
  JSConfigSource,
  JSONConfigSource,
  AuditRCSource,
  PackageJsonConfigSource,
  EnvironmentConfigSource,
  DefaultConfigSource
} from './config-sources';

// Types and interfaces
export * from './types';

// Re-export for convenience
export type {
  AuditConfig,
  ResolvedConfig,
  ConfigSource,
  ConfigValidationResult,
  ConfigPreset,
  EnvironmentConfig,
  StandardsConfig,
  PerformanceConfig,
  TestingConfig
} from './types';

export * from './config-manager';
