import { Page } from 'playwright';

export interface TestResult {
  passed: boolean;
  count: number;
  errors: string[];
  warnings: string[];
  details?: Record<string, any>;
}

export interface TestContext {
  page: Page;
  url: string;
  options: any;
}

export abstract class BaseAccessibilityTest {
  abstract name: string;
  abstract description: string;
  abstract category: string;
  abstract priority: string;
  abstract standards: string[]; // WCAG 2.1, WCAG 2.2, Section 508, etc.

  abstract run(context: TestContext): Promise<TestResult>;

  protected async evaluateOnPage<T>(
    page: Page, 
    evaluationFn: () => T
  ): Promise<T> {
    return await page.evaluate(evaluationFn);
  }

  protected createResult(
    passed: boolean,
    count: number = 0,
    errors: string[] = [],
    warnings: string[] = [],
    details?: Record<string, any>
  ): TestResult {
    return {
      passed,
      count,
      errors,
      warnings,
      details
    };
  }

  protected createErrorResult(error: string): TestResult {
    return this.createResult(false, 0, [error]);
  }

  protected createSuccessResult(count: number = 0): TestResult {
    return this.createResult(true, count);
  }
} 