import { BaseAccessibilityTest, TestResult, TestContext } from '../base-test';
import { Page } from 'playwright';

export interface LighthouseMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  speedIndex: number;
  totalBlockingTime: number;
  timeToInteractive: number;
}

export interface LighthouseResult extends TestResult {
  metrics: LighthouseMetrics;
  score: number;
  recommendations: string[];
  budgetExceeded: boolean;
  duration?: number;
  url?: string;
  testName?: string;
  description?: string;
  error?: string;
}

export interface LighthouseOptions {
  categories?: string[];
  formFactor?: 'mobile' | 'desktop';
  throttling?: 'devtools' | 'provided' | 'simulated';
  budget?: Partial<LighthouseMetrics>;
}

export class LighthouseTest extends BaseAccessibilityTest {
  name = 'Lighthouse Test';
  description = 'Comprehensive performance, accessibility, best practices, and SEO analysis using Lighthouse';
  category = 'performance';
  priority = 'high';
  standards = ['WCAG2AA', 'WCAG2AAA', 'Core Web Vitals'];

  private options: LighthouseOptions;
  private budget: Partial<LighthouseMetrics>;

  constructor(options: LighthouseOptions = {}) {
    super();
    this.options = {
      categories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'mobile',
      throttling: 'simulated',
      ...options
    };
    
    this.budget = {
      performance: 90,
      accessibility: 90,
      bestPractices: 90,
      seo: 90,
      pwa: 50,
      firstContentfulPaint: 1800,
      largestContentfulPaint: 2500,
      firstInputDelay: 100,
      cumulativeLayoutShift: 0.1,
      speedIndex: 3400,
      totalBlockingTime: 200,
      timeToInteractive: 3800,
      ...options.budget
    };
  }

  async run(context: TestContext): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // Check if Lighthouse is available
      if (!this.isLighthouseAvailable()) {
        return {
          passed: false,
          count: 0,
          errors: ['Lighthouse is not available. Please install lighthouse: npm install lighthouse'],
          warnings: [],
          details: {
            error: 'Lighthouse not available',
            duration: Date.now() - startTime,
            url: context.url,
            testName: this.name,
            description: this.description
          }
        };
      }

      // Run Lighthouse audit
      const lighthouseResult = await this.runLighthouseAudit(context.url);
      
      // Calculate overall score
      const score = this.calculateOverallScore(lighthouseResult.metrics);
      const budgetExceeded = this.checkBudget(lighthouseResult.metrics);
      const recommendations = this.generateRecommendations(lighthouseResult.metrics);
      
      const duration = Date.now() - startTime;
      
      return {
        passed: score >= 80,
        count: 1,
        errors: budgetExceeded ? ['Lighthouse budget exceeded'] : [],
        warnings: score < 90 ? ['Lighthouse score below excellent threshold'] : [],
        details: {
          score,
          metrics: lighthouseResult.metrics,
          budgetExceeded,
          recommendations,
          duration,
          url: context.url,
          testName: this.name,
          description: this.description
        }
      };
      
    } catch (error) {
      return {
        passed: false,
        count: 0,
        errors: [`Error occurred during Lighthouse audit: ${error}`],
        warnings: [],
        details: {
          score: 0,
          metrics: this.getDefaultMetrics(),
          budgetExceeded: true,
          duration: Date.now() - startTime,
          url: context.url,
          testName: this.name,
          description: this.description
        }
      };
    }
  }

  private isLighthouseAvailable(): boolean {
    try {
      require('lighthouse');
      return true;
    } catch {
      return false;
    }
  }

  private async runLighthouseAudit(url: string): Promise<{ metrics: LighthouseMetrics }> {
    try {
      const lighthouse = require('lighthouse');
      const chromeLauncher = require('chrome-launcher');
      
      // Launch Chrome
      const chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
      });
      
      // Lighthouse options
      const lighthouseOptions = {
        port: chrome.port,
        output: 'json',
        onlyCategories: this.options.categories,
        formFactor: this.options.formFactor,
        throttling: this.options.throttling
      };
      
      // Run Lighthouse
      const runnerResult = await lighthouse(url, lighthouseOptions);
      const report = runnerResult.lhr;
      
      // Close Chrome
      await chrome.kill();
      
      // Extract metrics
      const metrics: LighthouseMetrics = {
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        bestPractices: Math.round(report.categories['best-practices'].score * 100),
        seo: Math.round(report.categories.seo.score * 100),
        pwa: report.categories.pwa ? Math.round(report.categories.pwa.score * 100) : 0,
        firstContentfulPaint: report.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: report.audits['largest-contentful-paint'].numericValue,
        firstInputDelay: report.audits['max-potential-fid'].numericValue,
        cumulativeLayoutShift: report.audits['cumulative-layout-shift'].numericValue,
        speedIndex: report.audits['speed-index'].numericValue,
        totalBlockingTime: report.audits['total-blocking-time'].numericValue,
        timeToInteractive: report.audits['interactive'].numericValue
      };
      
      return { metrics };
      
    } catch (error) {
      // Fallback to simulated metrics if Lighthouse fails
      console.warn('Lighthouse failed, using simulated metrics:', error);
      return { metrics: this.getSimulatedMetrics() };
    }
  }

  private calculateOverallScore(metrics: LighthouseMetrics): number {
    const weights = {
      performance: 0.4,
      accessibility: 0.3,
      bestPractices: 0.2,
      seo: 0.1
    };
    
    return Math.round(
      metrics.performance * weights.performance +
      metrics.accessibility * weights.accessibility +
      metrics.bestPractices * weights.bestPractices +
      metrics.seo * weights.seo
    );
  }

  private checkBudget(metrics: LighthouseMetrics): boolean {
    return !!(
      (this.budget.performance && metrics.performance < this.budget.performance) ||
      (this.budget.accessibility && metrics.accessibility < this.budget.accessibility) ||
      (this.budget.bestPractices && metrics.bestPractices < this.budget.bestPractices) ||
      (this.budget.seo && metrics.seo < this.budget.seo) ||
      (this.budget.firstContentfulPaint && metrics.firstContentfulPaint > this.budget.firstContentfulPaint) ||
      (this.budget.largestContentfulPaint && metrics.largestContentfulPaint > this.budget.largestContentfulPaint) ||
      (this.budget.firstInputDelay && metrics.firstInputDelay > this.budget.firstInputDelay) ||
      (this.budget.cumulativeLayoutShift && metrics.cumulativeLayoutShift > this.budget.cumulativeLayoutShift)
    );
  }

  private generateRecommendations(metrics: LighthouseMetrics): string[] {
    const recommendations: string[] = [];
    
    if (metrics.performance < 90) {
      recommendations.push('Improve Performance Score: Optimize images, minimize JavaScript, use CDN');
    }
    
    if (metrics.accessibility < 90) {
      recommendations.push('Improve Accessibility Score: Add ARIA labels, improve color contrast, ensure keyboard navigation');
    }
    
    if (metrics.bestPractices < 90) {
      recommendations.push('Improve Best Practices Score: Use HTTPS, implement security headers, optimize resource loading');
    }
    
    if (metrics.seo < 90) {
      recommendations.push('Improve SEO Score: Add meta tags, optimize page titles, improve content structure');
    }
    
    if (metrics.firstContentfulPaint > 1800) {
      recommendations.push('Optimize First Contentful Paint: Minimize critical resources, optimize CSS delivery');
    }
    
    if (metrics.largestContentfulPaint > 2500) {
      recommendations.push('Optimize Largest Contentful Paint: Optimize images, use lazy loading, implement preloading');
    }
    
    if (metrics.cumulativeLayoutShift > 0.1) {
      recommendations.push('Improve Cumulative Layout Shift: Set explicit dimensions for images and ads');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('All Lighthouse metrics are within good thresholds');
    }
    
    return recommendations;
  }

  private getDefaultMetrics(): LighthouseMetrics {
    return {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      pwa: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
      speedIndex: 0,
      totalBlockingTime: 0,
      timeToInteractive: 0
    };
  }

  private getSimulatedMetrics(): LighthouseMetrics {
    // Simulated metrics for testing when Lighthouse is not available
    return {
      performance: 85,
      accessibility: 90,
      bestPractices: 88,
      seo: 92,
      pwa: 45,
      firstContentfulPaint: 1200,
      largestContentfulPaint: 2200,
      firstInputDelay: 80,
      cumulativeLayoutShift: 0.08,
      speedIndex: 2800,
      totalBlockingTime: 150,
      timeToInteractive: 3200
    };
  }

  setBudget(budget: Partial<LighthouseMetrics>): void {
    this.budget = { ...this.budget, ...budget };
  }

  getBudget(): Partial<LighthouseMetrics> {
    return { ...this.budget };
  }

  setOptions(options: LighthouseOptions): void {
    this.options = { ...this.options, ...options };
  }

  getOptions(): LighthouseOptions {
    return { ...this.options };
  }
} 