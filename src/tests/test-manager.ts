import { Page } from 'playwright';
import { BaseAccessibilityTest, TestContext, TestResult } from './base-test';
import { FormLabelTest } from './form/form-label-test';
import { KeyboardNavigationTest } from './keyboard/keyboard-navigation-test';
import { AriaLandmarksTest } from './aria/aria-landmarks-test';
import { SemanticHtmlTest } from './semantic/semantic-html-test';
import { MediaAccessibilityTest } from './media/media-accessibility-test';
import { PerformanceLoadingTest } from './performance/performance-loading-test';
import { PerformanceMemoryTest } from './performance/performance-memory-test';
import { ValidationErrorHandlingTest } from './validation/validation-error-handling-test';
import { ValidationFormValidationTest } from './validation/validation-form-validation-test';
import { LanguageI18nTest } from './language/language-i18n-test';
import { LanguageTextDirectionTest } from './language/language-text-direction-test';
import { SeoMetaTest } from './seo/seo-meta-test';
import { SeoContentTest } from './seo/seo-content-test';
import { SeoTechnicalTest } from './seo/seo-technical-test';

export interface TestSuiteResult {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  totalIssues: number;
  totalWarnings: number;
  results: TestResult[];
  summary: Record<string, any>;
}

export class TestManager {
  private tests: BaseAccessibilityTest[] = [];

  constructor() {
    this.registerDefaultTests();
  }

  private registerDefaultTests(): void {
    this.tests = [
      new FormLabelTest(),
      new KeyboardNavigationTest(),
      new AriaLandmarksTest(),
      new SemanticHtmlTest(),
      new MediaAccessibilityTest(),
      new PerformanceLoadingTest(),
      new PerformanceMemoryTest(),
      new ValidationErrorHandlingTest(),
      new ValidationFormValidationTest(),
      new LanguageI18nTest(),
      new LanguageTextDirectionTest(),
      new SeoMetaTest(),
      new SeoContentTest(),
      new SeoTechnicalTest()
    ];
  }

  async runAllTests(context: TestContext): Promise<TestSuiteResult> {
    const results: TestResult[] = [];
    let totalIssues = 0;
    let totalWarnings = 0;
    let passedTests = 0;
    let failedTests = 0;

    console.log(`🧪 Running ${this.tests.length} accessibility tests...`);

    for (let i = 0; i < this.tests.length; i++) {
      const test = this.tests[i];
      const startTime = Date.now();
      
      console.log(`   🔍 [${i + 1}/${this.tests.length}] ${test.name} (${test.category})...`);
      
      try {
        const result = await test.run(context);
        const duration = Date.now() - startTime;
        results.push(result);
        
        if (result.passed) {
          passedTests++;
          console.log(`   ✅ ${test.name} passed in ${duration}ms (${result.errors.length} errors, ${result.warnings.length} warnings)`);
        } else {
          failedTests++;
          console.log(`   ❌ ${test.name} failed in ${duration}ms (${result.errors.length} errors, ${result.warnings.length} warnings)`);
        }
        
        totalIssues += result.errors.length;
        totalWarnings += result.warnings.length;
      } catch (error) {
        const duration = Date.now() - startTime;
        const errorResult: TestResult = {
          passed: false,
          count: 0,
          errors: [`Test ${test.name} failed: ${error}`],
          warnings: []
        };
        results.push(errorResult);
        failedTests++;
        totalIssues++;
        console.log(`   💥 ${test.name} crashed after ${duration}ms: ${error}`);
      }
    }

    const summary = this.generateSummary(results);

    return {
      totalTests: this.tests.length,
      passedTests,
      failedTests,
      totalIssues,
      totalWarnings,
      results,
      summary
    };
  }

  async runTestsByCategory(context: TestContext, categories: string[]): Promise<TestSuiteResult> {
    const filteredTests = this.tests.filter(test => categories.includes(test.category));
    const results: TestResult[] = [];
    let totalIssues = 0;
    let totalWarnings = 0;
    let passedTests = 0;
    let failedTests = 0;

    for (const test of filteredTests) {
      try {
        const result = await test.run(context);
        results.push(result);
        
        if (result.passed) {
          passedTests++;
        } else {
          failedTests++;
        }
        
        totalIssues += result.errors.length;
        totalWarnings += result.warnings.length;
      } catch (error) {
        const errorResult: TestResult = {
          passed: false,
          count: 0,
          errors: [`Test ${test.name} failed: ${error}`],
          warnings: []
        };
        results.push(errorResult);
        failedTests++;
        totalIssues++;
      }
    }

    const summary = this.generateSummary(results);

    return {
      totalTests: filteredTests.length,
      passedTests,
      failedTests,
      totalIssues,
      totalWarnings,
      results,
      summary
    };
  }

  async runTestsByPriority(context: TestContext, priorities: string[]): Promise<TestSuiteResult> {
    const filteredTests = this.tests.filter(test => priorities.includes(test.priority));
    const results: TestResult[] = [];
    let totalIssues = 0;
    let totalWarnings = 0;
    let passedTests = 0;
    let failedTests = 0;

    for (const test of filteredTests) {
      try {
        const result = await test.run(context);
        results.push(result);
        
        if (result.passed) {
          passedTests++;
        } else {
          failedTests++;
        }
        
        totalIssues += result.errors.length;
        totalWarnings += result.warnings.length;
      } catch (error) {
        const errorResult: TestResult = {
          passed: false,
          count: 0,
          errors: [`Test ${test.name} failed: ${error}`],
          warnings: []
        };
        results.push(errorResult);
        failedTests++;
        totalIssues++;
      }
    }

    const summary = this.generateSummary(results);

    return {
      totalTests: filteredTests.length,
      passedTests,
      failedTests,
      totalIssues,
      totalWarnings,
      results,
      summary
    };
  }

  private generateSummary(results: TestResult[]): Record<string, any> {
    const summary: Record<string, any> = {};
    
    // Group by category
    const categoryStats: Record<string, any> = {};
    results.forEach(result => {
      const category = result.details?.category || 'unknown';
      if (!categoryStats[category]) {
        categoryStats[category] = {
          tests: 0,
          passed: 0,
          failed: 0,
          issues: 0,
          warnings: 0
        };
      }
      
      categoryStats[category].tests++;
      if (result.passed) {
        categoryStats[category].passed++;
      } else {
        categoryStats[category].failed++;
      }
      categoryStats[category].issues += result.errors.length;
      categoryStats[category].warnings += result.warnings.length;
    });
    
    summary.categories = categoryStats;
    
    // Overall stats
    summary.totalIssues = results.reduce((sum, result) => sum + result.errors.length, 0);
    summary.totalWarnings = results.reduce((sum, result) => sum + result.warnings.length, 0);
    summary.passedTests = results.filter(result => result.passed).length;
    summary.failedTests = results.filter(result => !result.passed).length;
    
    return summary;
  }

  getAvailableTests(): Array<{ name: string; description: string; category: string; priority: string; standards: string[] }> {
    return this.tests.map(test => ({
      name: test.name,
      description: test.description,
      category: test.category,
      priority: test.priority,
      standards: test.standards
    }));
  }

  getAvailableCategories(): string[] {
    return [...new Set(this.tests.map(test => test.category))];
  }

  getAvailablePriorities(): string[] {
    return [...new Set(this.tests.map(test => test.priority))];
  }

  getAvailableStandards(): string[] {
    const allStandards = this.tests.flatMap(test => test.standards);
    return [...new Set(allStandards)];
  }

  async runTestsByStandard(context: TestContext, standards: string[]): Promise<TestSuiteResult> {
    const filteredTests = this.tests.filter(test => 
      test.standards.some(standard => standards.includes(standard))
    );
    const results: TestResult[] = [];
    let totalIssues = 0;
    let totalWarnings = 0;
    let passedTests = 0;
    let failedTests = 0;

    for (const test of filteredTests) {
      try {
        const result = await test.run(context);
        results.push(result);
        
        if (result.passed) {
          passedTests++;
        } else {
          failedTests++;
        }
        
        totalIssues += result.errors.length;
        totalWarnings += result.warnings.length;
      } catch (error) {
        const errorResult: TestResult = {
          passed: false,
          count: 0,
          errors: [`Test ${test.name} failed: ${error}`],
          warnings: []
        };
        results.push(errorResult);
        failedTests++;
        totalIssues++;
      }
    }

    const summary = this.generateSummary(results);

    return {
      totalTests: filteredTests.length,
      passedTests,
      failedTests,
      totalIssues,
      totalWarnings,
      results,
      summary
    };
  }
} 