/**
 * 🧪 Jest Configuration
 * 
 * Optimized Jest configuration for TypeScript with path mappings.
 * Handles path aliases and proper TypeScript compilation for tests.
 */

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('jest').Config} */
module.exports = {
  // Use ts-jest preset for TypeScript
  preset: 'ts-jest',
  
  // Node.js environment for our CLI and API tests
  testEnvironment: 'node',
  
  // Setup files to run after environment setup
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ],
  
  // Test file patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],
  
  // Transform TypeScript files with modern syntax
  transform: {
    '^.+\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useESM: false
    }]
  },
  
  // Module name mapping for path aliases
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { 
      prefix: '<rootDir>/src/' 
    }),
    // Handle non-TypeScript imports
    '\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // Module resolution
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node'
  ],
  
  // Root directories for module resolution
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.config.ts',
    '!src/index.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.ts'
  ],
  
  coverageDirectory: 'coverage',
  
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'json-summary'
  ],
  
  // Test timeout
  testTimeout: 15000,
  
  // Output configuration
  verbose: false,
  silent: false,
  
  // Handle unhandled promise rejections
  detectOpenHandles: true,
  forceExit: true,
  
  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,
  
  // Speed up tests by running in parallel
  maxWorkers: '50%',
  
  // Transform ignore patterns (include ES modules that need transformation)
  transformIgnorePatterns: [
    'node_modules/(?!(chalk|ora|inquirer)/)',
  ]
};
