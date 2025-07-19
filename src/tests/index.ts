// Base classes and interfaces
export { BaseAccessibilityTest, TestResult, TestContext } from './base-test';
export { TestManager, TestSuiteResult } from './test-manager';

// Form tests
export { FormLabelTest } from './form/form-label-test';

// Keyboard tests
export { KeyboardNavigationTest } from './keyboard/keyboard-navigation-test';

// ARIA tests
export { AriaLandmarksTest } from './aria/aria-landmarks-test';

// Semantic HTML tests
export { SemanticHtmlTest } from './semantic/semantic-html-test';

// Media tests
export { MediaAccessibilityTest } from './media/media-accessibility-test';

// Performance tests
export { PerformanceLoadingTest } from './performance/performance-loading-test';
export { PerformanceMemoryTest } from './performance/performance-memory-test';
export { CoreWebVitalsTest } from './performance/core-web-vitals-test';
export { LighthouseTest } from './performance/lighthouse-test';

// Validation tests
export { ValidationErrorHandlingTest } from './validation/validation-error-handling-test';
export { ValidationFormValidationTest } from './validation/validation-form-validation-test';

// Language tests
export { LanguageI18nTest } from './language/language-i18n-test';
export { LanguageTextDirectionTest } from './language/language-text-direction-test';
export { SeoMetaTest } from './seo/seo-meta-test';
export { SeoContentTest } from './seo/seo-content-test';
export { SeoTechnicalTest } from './seo/seo-technical-test';

// Security tests
export { SecurityHeadersTest } from './security/security-headers-test';
export { HttpsTest } from './security/https-test';
export { CspTest } from './security/csp-test';
export { VulnerabilityTest } from './security/vulnerability-test';

// Mobile tests
export { TouchTargetTest } from './mobile/touch-target-test';
export { PWATest } from './mobile/pwa-test';

// Test categories
export const TEST_CATEGORIES = {
  FORM: 'form',
  KEYBOARD: 'keyboard',
  ARIA: 'aria',
  SEMANTIC: 'semantic',
  MEDIA: 'media',
  LANGUAGE: 'language',
  PERFORMANCE: 'performance',
  VALIDATION: 'validation',
  SECURITY: 'security',
  MOBILE: 'mobile'
} as const;

// Test priorities
export const TEST_PRIORITIES = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const; 