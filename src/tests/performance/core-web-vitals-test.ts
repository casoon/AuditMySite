import { BaseAccessibilityTest, TestResult, TestContext } from '../base-test';
import { Page } from 'playwright';

export interface CoreWebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  tti: number; // Time to Interactive
  tbt: number; // Total Blocking Time
  fmp: number; // First Meaningful Paint
  si: number; // Speed Index
}

export interface CoreWebVitalsResult {
  passed: boolean;
  count: number;
  errors: string[];
  warnings: string[];
  details?: Record<string, any>;
  metrics: CoreWebVitalsMetrics;
  score: number;
  recommendations: string[];
  budgetExceeded: boolean;
  duration?: number;
  url?: string;
  testName?: string;
  description?: string;
  error?: string;
}

export class CoreWebVitalsTest extends BaseAccessibilityTest {
  name = 'Core Web Vitals Test';
  description = 'Tests Core Web Vitals performance metrics (LCP, FID, CLS, FCP, TTI, TBT)';
  category = 'performance';
  priority = 'high';
  standards = ['WCAG2AA', 'WCAG2AAA'];

  private budget: Partial<CoreWebVitalsMetrics> = {
    lcp: 2500, // 2.5s - Good
    fid: 100,  // 100ms - Good
    cls: 0.1,  // 0.1 - Good
    fcp: 1800, // 1.8s - Good
    tti: 3800, // 3.8s - Good
    tbt: 200   // 200ms - Good
  };

  constructor(budget?: Partial<CoreWebVitalsMetrics>) {
    super();
    if (budget) {
      this.budget = { ...this.budget, ...budget };
    }
  }

  async run(context: TestContext): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // Navigate to page
      await context.page.goto(context.url, { waitUntil: 'networkidle' });
      
      // Wait for page to be fully loaded
      await context.page.waitForTimeout(2000);
      
      // Collect Core Web Vitals metrics
      const metrics = await this.collectCoreWebVitals(context.page);
      
      // Calculate score and check budget
      const score = this.calculateScore(metrics);
      const budgetExceeded = this.checkBudget(metrics);
      const recommendations = this.generateRecommendations(metrics);
      
      const duration = Date.now() - startTime;
      
      return {
        passed: score >= 80,
        count: 1,
        errors: budgetExceeded ? ['Performance budget exceeded'] : [],
        warnings: score < 90 ? ['Performance score below excellent threshold'] : [],
        details: {
          score,
          metrics,
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
        errors: [`Error occurred during Core Web Vitals measurement: ${error}`],
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

  private async collectCoreWebVitals(page: Page): Promise<CoreWebVitalsMetrics> {
    // Use Performance API to collect metrics
    const metrics = await page.evaluate(() => {
      return new Promise<CoreWebVitalsMetrics>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          const lcpEntry = entries.find(entry => entry.entryType === 'largest-contentful-paint') as PerformanceEntry;
          const fidEntry = entries.find(entry => entry.entryType === 'first-input') as PerformanceEntry;
          
          // Get navigation timing
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          // Calculate metrics
          const lcp = lcpEntry ? lcpEntry.startTime : 0;
          const fid = fidEntry ? (fidEntry as any).processingStart - fidEntry.startTime : 0;
          const fcp = navigation ? (navigation as any).firstContentfulPaint : 0;
          const tti = navigation ? navigation.domInteractive : 0;
          
          // Calculate CLS (simplified)
          let cls = 0;
          const layoutShiftEntries = performance.getEntriesByType('layout-shift');
          if (layoutShiftEntries.length > 0) {
            cls = layoutShiftEntries.reduce((sum, entry: any) => sum + entry.value, 0);
          }
          
          // Calculate TBT (simplified)
          const longTasks = performance.getEntriesByType('longtask');
          const tbt = longTasks.reduce((sum, task: any) => sum + task.duration, 0);
          
          // Calculate FMP and SI (simplified)
          const fmp = fcp; // Simplified
          const si = fcp * 1.2; // Simplified calculation
          
          resolve({
            lcp,
            fid,
            cls,
            fcp,
            tti,
            tbt,
            fmp,
            si
          });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'longtask'] });
        
        // Fallback if no metrics are collected
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          resolve({
            lcp: navigation?.loadEventEnd || 0,
            fid: 0,
            cls: 0,
            fcp: (navigation as any)?.firstContentfulPaint || 0,
            tti: navigation?.domInteractive || 0,
            tbt: 0,
            fmp: (navigation as any)?.firstContentfulPaint || 0,
            si: ((navigation as any)?.firstContentfulPaint || 0) * 1.2
          });
        }, 5000);
      });
    });

    return metrics;
  }

  private calculateScore(metrics: CoreWebVitalsMetrics): number {
    let score = 100;
    
    // LCP scoring (0-25 points)
    if (metrics.lcp <= 2500) score -= 0;
    else if (metrics.lcp <= 4000) score -= 10;
    else score -= 25;
    
    // FID scoring (0-25 points)
    if (metrics.fid <= 100) score -= 0;
    else if (metrics.fid <= 300) score -= 10;
    else score -= 25;
    
    // CLS scoring (0-25 points)
    if (metrics.cls <= 0.1) score -= 0;
    else if (metrics.cls <= 0.25) score -= 10;
    else score -= 25;
    
    // FCP scoring (0-15 points)
    if (metrics.fcp <= 1800) score -= 0;
    else if (metrics.fcp <= 3000) score -= 5;
    else score -= 15;
    
    // TTI scoring (0-10 points)
    if (metrics.tti <= 3800) score -= 0;
    else if (metrics.tti <= 7300) score -= 5;
    else score -= 10;
    
    return Math.max(0, score);
  }

  private checkBudget(metrics: CoreWebVitalsMetrics): boolean {
    return !!(
      (this.budget.lcp && metrics.lcp > this.budget.lcp) ||
      (this.budget.fid && metrics.fid > this.budget.fid) ||
      (this.budget.cls && metrics.cls > this.budget.cls) ||
      (this.budget.fcp && metrics.fcp > this.budget.fcp) ||
      (this.budget.tti && metrics.tti > this.budget.tti) ||
      (this.budget.tbt && metrics.tbt > this.budget.tbt)
    );
  }

  private generateRecommendations(metrics: CoreWebVitalsMetrics): string[] {
    const recommendations: string[] = [];
    
    if (metrics.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint: Optimize images, use CDN, implement lazy loading');
    }
    
    if (metrics.fid > 100) {
      recommendations.push('Reduce First Input Delay: Minimize JavaScript execution time, split code bundles');
    }
    
    if (metrics.cls > 0.1) {
      recommendations.push('Improve Cumulative Layout Shift: Set explicit dimensions for images and ads');
    }
    
    if (metrics.fcp > 1800) {
      recommendations.push('Optimize First Contentful Paint: Minimize critical resources, optimize CSS delivery');
    }
    
    if (metrics.tti > 3800) {
      recommendations.push('Improve Time to Interactive: Reduce JavaScript execution time, optimize resource loading');
    }
    
    if (metrics.tbt > 200) {
      recommendations.push('Reduce Total Blocking Time: Split long tasks, optimize JavaScript execution');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('All Core Web Vitals are within good thresholds');
    }
    
    return recommendations;
  }

  private generateDetails(metrics: CoreWebVitalsMetrics, score: number, budgetExceeded: boolean): string {
    return `
Core Web Vitals Analysis:
- Largest Contentful Paint (LCP): ${metrics.lcp.toFixed(0)}ms ${this.getStatus(metrics.lcp, 2500)}
- First Input Delay (FID): ${metrics.fid.toFixed(0)}ms ${this.getStatus(metrics.fid, 100)}
- Cumulative Layout Shift (CLS): ${metrics.cls.toFixed(3)} ${this.getStatus(metrics.cls, 0.1)}
- First Contentful Paint (FCP): ${metrics.fcp.toFixed(0)}ms ${this.getStatus(metrics.fcp, 1800)}
- Time to Interactive (TTI): ${metrics.tti.toFixed(0)}ms ${this.getStatus(metrics.tti, 3800)}
- Total Blocking Time (TBT): ${metrics.tbt.toFixed(0)}ms ${this.getStatus(metrics.tbt, 200)}

Performance Score: ${score}/100
Budget Exceeded: ${budgetExceeded ? 'Yes' : 'No'}
    `.trim();
  }

  private getStatus(value: number, threshold: number): string {
    if (value <= threshold) return '✅ Good';
    if (value <= threshold * 1.6) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }

  private getDefaultMetrics(): CoreWebVitalsMetrics {
    return {
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      tti: 0,
      tbt: 0,
      fmp: 0,
      si: 0
    };
  }

  setBudget(budget: Partial<CoreWebVitalsMetrics>): void {
    this.budget = { ...this.budget, ...budget };
  }

  getBudget(): Partial<CoreWebVitalsMetrics> {
    return { ...this.budget };
  }
} 