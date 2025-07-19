import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class PerformanceMemoryTest extends BaseAccessibilityTest {
  name = 'Performance Memory Test';
  description = 'Checks memory usage and potential memory leaks';
  category = 'performance';
  priority = 'medium';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check if memory API is available (Chrome-specific)
        const memory = (performance as any).memory;
        if (!memory) {
          warnings.push('Memory API not available (Chrome-specific feature)');
          return { issues, warnings };
        }
        
        // Check memory usage
        const usedMemoryMB = memory.usedJSHeapSize / (1024 * 1024);
        const totalMemoryMB = memory.totalJSHeapSize / (1024 * 1024);
        const memoryLimitMB = memory.jsHeapSizeLimit / (1024 * 1024);
        
        // Check if memory usage is high (>80% of limit)
        const memoryUsagePercent = (usedMemoryMB / memoryLimitMB) * 100;
        if (memoryUsagePercent > 80) {
          issues.push(`High memory usage: ${usedMemoryMB.toFixed(2)}MB (${memoryUsagePercent.toFixed(1)}% of limit)`);
        } else if (memoryUsagePercent > 60) {
          warnings.push(`Moderate memory usage: ${usedMemoryMB.toFixed(2)}MB (${memoryUsagePercent.toFixed(1)}% of limit)`);
        }
        
        // Check for potential memory leaks by counting DOM nodes
        const totalNodes = document.querySelectorAll('*').length;
        if (totalNodes > 1000) {
          warnings.push(`Large DOM tree: ${totalNodes} nodes (consider optimizing)`);
        }
        
        // Check for event listeners (approximation)
        const elementsWithEvents = document.querySelectorAll('[onclick], [onmouseover], [onmouseout], [onfocus], [onblur]');
        if (elementsWithEvents.length > 50) {
          warnings.push(`Many inline event handlers: ${elementsWithEvents.length} (consider using event delegation)`);
        }
        
        // Check for iframes (potential memory consumers)
        const iframes = document.querySelectorAll('iframe');
        if (iframes.length > 3) {
          warnings.push(`Multiple iframes detected: ${iframes.length} (each iframe consumes additional memory)`);
        }
        
        // Check for large images that might consume memory
        const images = document.querySelectorAll('img');
        let largeImages = 0;
        images.forEach(img => {
          const width = img.naturalWidth || img.width;
          const height = img.naturalHeight || img.height;
          if (width > 1920 || height > 1080) {
            largeImages++;
          }
        });
        
        if (largeImages > 3) {
          warnings.push(`Found ${largeImages} large images (consider resizing for better memory usage)`);
        }
        
        // Check for canvas elements (potential memory consumers)
        const canvases = document.querySelectorAll('canvas');
        if (canvases.length > 2) {
          warnings.push(`Multiple canvas elements: ${canvases.length} (monitor for memory leaks)`);
        }
        
        // Check for video elements (high memory usage)
        const videos = document.querySelectorAll('video');
        if (videos.length > 1) {
          warnings.push(`Multiple video elements: ${videos.length} (videos consume significant memory)`);
        }
        
        // Check for WebGL contexts (high memory usage)
        const webglCanvases = document.querySelectorAll('canvas');
        let webglContexts = 0;
        webglCanvases.forEach(canvas => {
          try {
            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            if (gl) webglContexts++;
          } catch (e) {
            // Ignore errors
          }
        });
        
        if (webglContexts > 0) {
          warnings.push(`WebGL contexts detected: ${webglContexts} (monitor memory usage carefully)`);
        }
        
        // Check for localStorage/sessionStorage usage
        const localStorageKeys = Object.keys(localStorage).length;
        const sessionStorageKeys = Object.keys(sessionStorage).length;
        
        if (localStorageKeys > 20) {
          warnings.push(`Large localStorage usage: ${localStorageKeys} keys (consider cleanup)`);
        }
        
        if (sessionStorageKeys > 10) {
          warnings.push(`Large sessionStorage usage: ${sessionStorageKeys} keys (consider cleanup)`);
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
      return this.createErrorResult(`Performance memory test failed: ${error}`);
    }
  }
} 