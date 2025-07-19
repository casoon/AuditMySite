import { BrowserManager } from './browser-manager';

// Lighthouse import
import lighthouse from 'lighthouse';

export interface LighthouseResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    totalBlockingTime: number;
    speedIndex: number;
  };
  opportunities: any[];
  diagnostics: any[];
}

export class LighthouseIntegration {
  constructor(private browserManager: BrowserManager) {}

  async runLighthouse(url: string, options: any = {}): Promise<LighthouseResult> {
    
    console.log(`📊 Running Lighthouse for ${url}...`);
    
    const lighthouseOptions = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: this.browserManager.getPort(),
      ...options
    };

    try {
      const runnerResult = await lighthouse(url, lighthouseOptions, undefined);
      const lhr = runnerResult?.lhr;

      if (!lhr) {
        throw new Error('Lighthouse result is undefined');
      }

      return {
        performance: Math.round((lhr.categories.performance.score || 0) * 100),
        accessibility: Math.round((lhr.categories.accessibility.score || 0) * 100),
        bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((lhr.categories.seo.score || 0) * 100),
        metrics: {
          firstContentfulPaint: lhr.audits['first-contentful-paint']?.numericValue || 0,
          largestContentfulPaint: lhr.audits['largest-contentful-paint']?.numericValue || 0,
          firstInputDelay: lhr.audits['max-potential-fid']?.numericValue || 0,
          cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
          totalBlockingTime: lhr.audits['total-blocking-time']?.numericValue || 0,
          speedIndex: lhr.audits['speed-index']?.numericValue || 0
        },
        opportunities: lhr.audits['opportunities'] ? [lhr.audits['opportunities']] : [],
        diagnostics: lhr.audits['diagnostics'] ? [lhr.audits['diagnostics']] : []
      };
    } catch (error) {
      console.error(`❌ Lighthouse failed for ${url}:`, error);
      throw error;
    }
  }
} 