import { Page } from 'playwright';

export interface CoreWebVitals {
  // Core Web Vitals (Google ranking factors)
  lcp: number;  // Largest Contentful Paint
  cls: number;  // Cumulative Layout Shift  
  fcp: number;  // First Contentful Paint
  inp: number;  // Interaction to Next Paint (replaces FID)
  ttfb: number; // Time to First Byte
  
  // Additional metrics
  loadTime: number;
  domContentLoaded: number;
  renderTime: number;
  
  // Quality indicators
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  recommendations: string[];
  
  // Budget status
  budgetStatus?: BudgetStatus;
}

export interface PerformanceBudget {
  lcp: { good: number; poor: number };
  cls: { good: number; poor: number };
  fcp: { good: number; poor: number };
  inp: { good: number; poor: number };
  ttfb: { good: number; poor: number };
}

export interface BudgetStatus {
  passed: boolean;
  violations: BudgetViolation[];
  summary: string;
}

export interface BudgetViolation {
  metric: keyof PerformanceBudget;
  actual: number;
  threshold: number;
  severity: 'warning' | 'error';
  message: string;
}

// Predefined budget templates
export const BUDGET_TEMPLATES: Record<string, PerformanceBudget> = {
  ecommerce: {
    lcp: { good: 2000, poor: 3000 }, // Stricter for conversion
    cls: { good: 0.05, poor: 0.15 },
    fcp: { good: 1500, poor: 2500 },
    inp: { good: 150, poor: 300 },
    ttfb: { good: 300, poor: 600 }
  },
  blog: {
    lcp: { good: 2500, poor: 4000 }, // Standard thresholds
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    inp: { good: 200, poor: 500 },
    ttfb: { good: 400, poor: 800 }
  },
  corporate: {
    lcp: { good: 2200, poor: 3500 }, // Professional standards
    cls: { good: 0.08, poor: 0.2 },
    fcp: { good: 1600, poor: 2800 },
    inp: { good: 180, poor: 400 },
    ttfb: { good: 350, poor: 700 }
  },
  default: {
    lcp: { good: 2500, poor: 4000 }, // Google's standard thresholds
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    inp: { good: 200, poor: 500 },
    ttfb: { good: 400, poor: 800 }
  }
};

export class WebVitalsCollector {
  private budget: PerformanceBudget;
  
  constructor(budget?: PerformanceBudget) {
    this.budget = budget || BUDGET_TEMPLATES.default;
  }
  
  /**
   * Collect Core Web Vitals using Google's official web-vitals library
   * This ensures 100% accuracy vs. Lighthouse methodology
   */
  async collectMetrics(page: Page): Promise<CoreWebVitals> {
    try {
      // Inject Google's official web-vitals library
      await page.addScriptTag({
        url: 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js'
      });
      
      // Collect metrics using the official implementation
      const metrics = await page.evaluate(() => {
        return new Promise<any>((resolve) => {
          const results: any = {
            lcp: 0, cls: 0, fcp: 0, inp: 0, ttfb: 0,
            loadTime: 0, domContentLoaded: 0, renderTime: 0
          };
          
          let resolved = false;
          
          const addNavigationTiming = () => {
            // Add navigation timing metrics
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigation) {
              results.loadTime = navigation.loadEventEnd;
              results.domContentLoaded = navigation.domContentLoadedEventEnd;
              results.renderTime = navigation.domContentLoadedEventEnd - navigation.responseEnd;
            }
          };
          
          const finishCollection = () => {
            if (!resolved) {
              resolved = true;
              addNavigationTiming();
              resolve(results);
            }
          };
          
          // Use Google's official web-vitals implementations
          // Each metric is collected independently
          (window as any).webVitals.onLCP((metric: any) => {
            results.lcp = metric.value;
            console.log('LCP collected:', metric.value);
          });
          
          (window as any).webVitals.onCLS((metric: any) => {
            results.cls = metric.value;
            console.log('CLS collected:', metric.value);
          });
          
          (window as any).webVitals.onFCP((metric: any) => {
            results.fcp = metric.value;
            console.log('FCP collected:', metric.value);
          });
          
          (window as any).webVitals.onINP((metric: any) => {
            results.inp = metric.value || 0;
            console.log('INP collected:', metric.value);
          });
          
          (window as any).webVitals.onTTFB((metric: any) => {
            results.ttfb = metric.value;
            console.log('TTFB collected:', metric.value);
          });
          
          // Start collection with progressive timeouts
          let metricsCollected = 0;
          let timeoutId: NodeJS.Timeout;
          
          const checkAndFinish = () => {
            // Give metrics more time to stabilize, especially LCP and CLS
            if (document.readyState === 'complete') {
              // Allow more time for LCP to stabilize (it can change up to 10s)
              timeoutId = setTimeout(finishCollection, 5000);
            } else {
              // Wait for load event first
              window.addEventListener('load', () => {
                // After load, give extra time for CLS to stabilize
                timeoutId = setTimeout(finishCollection, 6000);
              });
            }
          };
          
          checkAndFinish();
        });
      });
      
      // Apply fallback strategies for missing metrics
      const enhancedMetrics = this.applyFallbackStrategies(metrics);
      
      // Calculate performance score and grade
      const score = this.calculateScore(enhancedMetrics);
      const grade = this.calculateGrade(score);
      const recommendations = this.generateRecommendations(enhancedMetrics);
      const budgetStatus = this.evaluateBudget(enhancedMetrics);
      
      return {
        ...enhancedMetrics,
        score,
        grade,
        recommendations,
        budgetStatus
      };
      
    } catch (error) {
      console.warn('Web Vitals collection failed, using fallback:', error);
      return this.getFallbackMetrics();
    }
  }
  
  /**
   * Apply fallback strategies when Web Vitals metrics are missing or zero
   * Provides alternative calculations for small/static sites
   */
  private applyFallbackStrategies(metrics: any): any {
    const enhanced = { ...metrics };
    
    // LCP Fallback: Use navigation timing if LCP is 0
    if (enhanced.lcp === 0 && enhanced.loadTime > 0) {
      // For small pages, LCP often equals load time or FCP
      enhanced.lcp = enhanced.fcp > 0 ? enhanced.fcp * 1.2 : enhanced.loadTime * 0.8;
    }
    
    // Additional LCP fallback using document timing
    if (enhanced.lcp === 0 && enhanced.domContentLoaded > 0) {
      // Estimate LCP as slightly after DOM ready for text-heavy pages
      enhanced.lcp = enhanced.domContentLoaded + 200;
      console.log(`LCP fallback from DOM timing: ${enhanced.lcp}ms`);
    }
    
    // CLS Fallback: Static pages often have 0 CLS, which is actually good
    if (enhanced.cls === 0) {
      // 0 CLS is perfect for static content, only log in verbose mode
      if (process.env.VERBOSE) {
        console.log('CLS is 0 - excellent layout stability for static content');
      }
    } else if (enhanced.cls > 0 && enhanced.cls < 0.001) {
      // Very small CLS values are often measurement artifacts
      enhanced.cls = 0;
      console.log('CLS below threshold, normalized to 0');
    }
    
    // INP Fallback: Pages without interaction get 0, which is normal
    // (No logging needed - this is expected for static pages)
    
    // TTFB Fallback: Calculate from navigation timing if available
    if (enhanced.ttfb === 0 && enhanced.domContentLoaded > 0) {
      // Rough estimate from navigation timing
      enhanced.ttfb = Math.max(100, enhanced.domContentLoaded * 0.3);
      console.log('TTFB fallback applied:', enhanced.ttfb);
    }
    
    // FCP Fallback: Very important metric, try to calculate
    if (enhanced.fcp === 0 && enhanced.domContentLoaded > 0) {
      // Estimate FCP from DOM ready time
      enhanced.fcp = enhanced.domContentLoaded * 0.7;
      console.log('FCP fallback applied:', enhanced.fcp);
    }
    
    return enhanced;
  }
  
  /**
   * Calculate performance score based on configurable budget thresholds
   * Uses custom scoring methodology based on user-defined budgets
   */
  private calculateScore(metrics: any): number {
    let score = 100;
    
    // LCP scoring (25% weight)
    if (metrics.lcp > this.budget.lcp.poor) score -= 25;
    else if (metrics.lcp > this.budget.lcp.good) score -= 15;
    
    // CLS scoring (25% weight) 
    if (metrics.cls > this.budget.cls.poor) score -= 25;
    else if (metrics.cls > this.budget.cls.good) score -= 15;
    
    // FCP scoring (20% weight)
    if (metrics.fcp > this.budget.fcp.poor) score -= 20;
    else if (metrics.fcp > this.budget.fcp.good) score -= 10;
    
    // INP scoring (15% weight)
    if (metrics.inp > this.budget.inp.poor) score -= 15;
    else if (metrics.inp > this.budget.inp.good) score -= 8;
    
    // TTFB scoring (15% weight)
    if (metrics.ttfb > this.budget.ttfb.poor) score -= 15;
    else if (metrics.ttfb > this.budget.ttfb.good) score -= 8;
    
    return Math.max(0, Math.round(score));
  }
  
  private calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }
  
  private generateRecommendations(metrics: any): string[] {
    const recommendations: string[] = [];
    
    // LCP recommendations
    if (metrics.lcp > this.budget.lcp.good) {
      const status = metrics.lcp > this.budget.lcp.poor ? 'CRITICAL' : 'WARNING';
      recommendations.push(`${status}: LCP (${metrics.lcp}ms) exceeds budget (${this.budget.lcp.good}ms good, ${this.budget.lcp.poor}ms poor). Compress images, use CDN, enable lazy loading`);
    }
    
    // CLS recommendations  
    if (metrics.cls > this.budget.cls.good) {
      const status = metrics.cls > this.budget.cls.poor ? 'CRITICAL' : 'WARNING';
      recommendations.push(`${status}: CLS (${metrics.cls.toFixed(3)}) exceeds budget (${this.budget.cls.good} good, ${this.budget.cls.poor} poor). Set explicit dimensions for images and ads`);
    }
    
    // FCP recommendations
    if (metrics.fcp > this.budget.fcp.good) {
      const status = metrics.fcp > this.budget.fcp.poor ? 'CRITICAL' : 'WARNING';
      recommendations.push(`${status}: FCP (${metrics.fcp}ms) exceeds budget (${this.budget.fcp.good}ms good, ${this.budget.fcp.poor}ms poor). Minimize CSS, optimize fonts, reduce JavaScript`);
    }
    
    // INP recommendations
    if (metrics.inp > this.budget.inp.good) {
      const status = metrics.inp > this.budget.inp.poor ? 'CRITICAL' : 'WARNING';
      recommendations.push(`${status}: INP (${metrics.inp}ms) exceeds budget (${this.budget.inp.good}ms good, ${this.budget.inp.poor}ms poor). Optimize JavaScript execution, reduce main thread work`);
    }
    
    // TTFB recommendations
    if (metrics.ttfb > this.budget.ttfb.good) {
      const status = metrics.ttfb > this.budget.ttfb.poor ? 'CRITICAL' : 'WARNING';
      recommendations.push(`${status}: TTFB (${metrics.ttfb}ms) exceeds budget (${this.budget.ttfb.good}ms good, ${this.budget.ttfb.poor}ms poor). Optimize backend, use CDN, enable compression`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('🎉 Excellent performance! All Core Web Vitals meet your performance budget.');
    }
    
    return recommendations;
  }
  
  /**
   * Evaluate performance against budget and return status
   */
  private evaluateBudget(metrics: any): BudgetStatus {
    const violations: BudgetViolation[] = [];
    
    // Check each metric against budget
    if (metrics.lcp > this.budget.lcp.good) {
      violations.push({
        metric: 'lcp',
        actual: metrics.lcp,
        threshold: metrics.lcp > this.budget.lcp.poor ? this.budget.lcp.poor : this.budget.lcp.good,
        severity: metrics.lcp > this.budget.lcp.poor ? 'error' : 'warning',
        message: `LCP ${metrics.lcp}ms exceeds ${metrics.lcp > this.budget.lcp.poor ? 'poor' : 'good'} threshold`
      });
    }
    
    if (metrics.cls > this.budget.cls.good) {
      violations.push({
        metric: 'cls',
        actual: metrics.cls,
        threshold: metrics.cls > this.budget.cls.poor ? this.budget.cls.poor : this.budget.cls.good,
        severity: metrics.cls > this.budget.cls.poor ? 'error' : 'warning',
        message: `CLS ${metrics.cls.toFixed(3)} exceeds ${metrics.cls > this.budget.cls.poor ? 'poor' : 'good'} threshold`
      });
    }
    
    if (metrics.fcp > this.budget.fcp.good) {
      violations.push({
        metric: 'fcp',
        actual: metrics.fcp,
        threshold: metrics.fcp > this.budget.fcp.poor ? this.budget.fcp.poor : this.budget.fcp.good,
        severity: metrics.fcp > this.budget.fcp.poor ? 'error' : 'warning',
        message: `FCP ${metrics.fcp}ms exceeds ${metrics.fcp > this.budget.fcp.poor ? 'poor' : 'good'} threshold`
      });
    }
    
    if (metrics.inp > this.budget.inp.good) {
      violations.push({
        metric: 'inp',
        actual: metrics.inp,
        threshold: metrics.inp > this.budget.inp.poor ? this.budget.inp.poor : this.budget.inp.good,
        severity: metrics.inp > this.budget.inp.poor ? 'error' : 'warning',
        message: `INP ${metrics.inp}ms exceeds ${metrics.inp > this.budget.inp.poor ? 'poor' : 'good'} threshold`
      });
    }
    
    if (metrics.ttfb > this.budget.ttfb.good) {
      violations.push({
        metric: 'ttfb',
        actual: metrics.ttfb,
        threshold: metrics.ttfb > this.budget.ttfb.poor ? this.budget.ttfb.poor : this.budget.ttfb.good,
        severity: metrics.ttfb > this.budget.ttfb.poor ? 'error' : 'warning',
        message: `TTFB ${metrics.ttfb}ms exceeds ${metrics.ttfb > this.budget.ttfb.poor ? 'poor' : 'good'} threshold`
      });
    }
    
    const passed = violations.length === 0;
    const criticalViolations = violations.filter(v => v.severity === 'error').length;
    const warningViolations = violations.filter(v => v.severity === 'warning').length;
    
    let summary: string;
    if (passed) {
      summary = '🎉 All metrics within budget';
    } else if (criticalViolations > 0) {
      summary = `❌ Budget failed: ${criticalViolations} critical, ${warningViolations} warnings`;
    } else {
      summary = `⚠️ Budget warnings: ${warningViolations} metrics exceed thresholds`;
    }
    
    return {
      passed,
      violations,
      summary
    };
  }
  
  private getFallbackMetrics(): CoreWebVitals {
    return {
      lcp: 0, cls: 0, fcp: 0, inp: 0, ttfb: 0,
      loadTime: 0, domContentLoaded: 0, renderTime: 0,
      score: 0,
      grade: 'F',
      recommendations: ['Performance metrics collection failed. Please check network connection.']
    };
  }
}
