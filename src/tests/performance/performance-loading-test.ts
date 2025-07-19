import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class PerformanceLoadingTest extends BaseAccessibilityTest {
  name = 'Performance Loading Test';
  description = 'Checks page loading performance and metrics';
  category = 'performance';
  priority = 'medium';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check if performance API is available
        if (!window.performance || !window.performance.timing) {
          warnings.push('Performance API not available');
          return { issues, warnings };
        }

        const timing = window.performance.timing;
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        // Calculate key metrics
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        const firstPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');
        const firstContentfulPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');
        
        // Check load time (should be under 3 seconds for good UX)
        if (loadTime > 3000) {
          issues.push(`Page load time is ${loadTime}ms (should be under 3000ms)`);
        } else if (loadTime > 2000) {
          warnings.push(`Page load time is ${loadTime}ms (consider optimizing for better UX)`);
        }
        
        // Check DOM content loaded time
        if (domContentLoaded > 2000) {
          warnings.push(`DOM content loaded in ${domContentLoaded}ms (consider optimizing)`);
        }
        
        // Check for large images
        const images = document.querySelectorAll('img');
        let largeImages = 0;
        images.forEach(img => {
          const src = img.getAttribute('src');
          if (src && !src.includes('data:') && !img.complete) {
            largeImages++;
          }
        });
        
        if (largeImages > 5) {
          warnings.push(`Found ${largeImages} potentially large images (consider lazy loading)`);
        }
        
        // Check for external resources
        const externalResources = performance.getEntriesByType('resource').filter(entry => {
          const url = entry.name;
          return !url.includes(window.location.hostname) && !url.includes('localhost');
        });
        
        if (externalResources.length > 10) {
          warnings.push(`Found ${externalResources.length} external resources (consider reducing for better performance)`);
        }
        
        // Check for render-blocking resources
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        const scripts = document.querySelectorAll('script[src]');
        
        let renderBlocking = 0;
        stylesheets.forEach(link => {
          if (!link.hasAttribute('media') || link.getAttribute('media') === 'all') {
            renderBlocking++;
          }
        });
        
        if (renderBlocking > 3) {
          warnings.push(`Found ${renderBlocking} potentially render-blocking stylesheets`);
        }
        
        // Check for inline scripts in head
        const headScripts = document.head.querySelectorAll('script:not([src])');
        if (headScripts.length > 2) {
          warnings.push(`Found ${headScripts.length} inline scripts in head (consider moving to body or external files)`);
        }
        
        return { issues, warnings };
      });

      return this.createResult(
        result.issues.length === 0,
        result.issues.length + result.warnings.length,
        result.issues,
        result.warnings
      );
    } catch (error) {
      return this.createErrorResult(`Performance loading test failed: ${error}`);
    }
  }
} 