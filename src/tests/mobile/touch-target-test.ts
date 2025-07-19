import { BaseAccessibilityTest, TestResult, TestContext } from '../base-test';
import { Page } from 'playwright';

export interface TouchTargetResult extends TestResult {
  touchTargets: TouchTargetInfo[];
  violations: TouchTargetViolation[];
  score: number;
  recommendations: string[];
  duration?: number;
  url?: string;
  testName?: string;
  description?: string;
  error?: string;
}

export interface TouchTargetInfo {
  selector: string;
  tagName: string;
  text: string;
  width: number;
  height: number;
  minSize: number;
  isCompliant: boolean;
  position: { x: number; y: number };
  type: 'button' | 'link' | 'input' | 'select' | 'textarea' | 'other';
}

export interface TouchTargetViolation {
  selector: string;
  tagName: string;
  text: string;
  width: number;
  height: number;
  minSize: number;
  issue: string;
  recommendation: string;
}

export class TouchTargetTest extends BaseAccessibilityTest {
  name = 'Touch Target Test';
  description = 'Tests if interactive elements meet minimum touch target size requirements (44px)';
  category = 'mobile';
  priority = 'high';
  standards = ['WCAG2AA', 'WCAG2AAA', 'Mobile Accessibility'];

  private minTouchTargetSize = 44; // Minimum size in pixels
  private includeNonInteractive = false; // Test non-interactive elements too

  constructor(minSize?: number, includeNonInteractive?: boolean) {
    super();
    if (minSize) this.minTouchTargetSize = minSize;
    if (includeNonInteractive !== undefined) this.includeNonInteractive = includeNonInteractive;
  }

  async run(context: TestContext): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // Navigate to page
      await context.page.goto(context.url, { waitUntil: 'networkidle' });
      
      // Wait for page to be fully loaded
      await context.page.waitForTimeout(2000);
      
      // Collect touch target information
      const touchTargets = await this.collectTouchTargets(context.page);
      
      // Analyze compliance
      const violations = this.analyzeCompliance(touchTargets);
      const score = this.calculateScore(touchTargets, violations);
      const recommendations = this.generateRecommendations(violations);
      
      const duration = Date.now() - startTime;
      
      return {
        passed: violations.length === 0,
        count: touchTargets.length,
        errors: violations.map(v => `${v.selector}: ${v.issue}`),
        warnings: score < 90 ? ['Some touch targets are below optimal size'] : [],
        details: {
          touchTargets,
          violations,
          score,
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
        errors: [`Error occurred during touch target analysis: ${error}`],
        warnings: [],
        details: {
          touchTargets: [],
          violations: [],
          score: 0,
          duration: Date.now() - startTime,
          url: context.url,
          testName: this.name,
          description: this.description
        }
      };
    }
  }

  private async collectTouchTargets(page: Page): Promise<TouchTargetInfo[]> {
    return await page.evaluate((minSize) => {
      const touchTargets: TouchTargetInfo[] = [];
      
      // Selectors for interactive elements
      const selectors = [
        'button',
        'input[type="button"]',
        'input[type="submit"]',
        'input[type="reset"]',
        'input[type="image"]',
        'a[href]',
        'select',
        'textarea',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="password"]',
        'input[type="search"]',
        'input[type="tel"]',
        'input[type="url"]',
        'input[type="number"]',
        'input[type="date"]',
        'input[type="time"]',
        'input[type="datetime-local"]',
        'input[type="month"]',
        'input[type="week"]',
        'input[type="file"]',
        'input[type="range"]',
        'input[type="color"]',
        '[role="button"]',
        '[role="link"]',
        '[role="menuitem"]',
        '[role="tab"]',
        '[role="option"]',
        '[role="checkbox"]',
        '[role="radio"]',
        '[role="switch"]',
        '[role="slider"]',
        '[role="spinbutton"]',
        '[tabindex]:not([tabindex="-1"])'
      ];
      
      // Collect all interactive elements
      const elements = document.querySelectorAll(selectors.join(','));
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        
        // Get element dimensions
        const width = rect.width;
        const height = rect.height;
        
        // Check if element is visible
        if (width === 0 || height === 0 || computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
          return;
        }
        
        // Determine element type
        let type: TouchTargetInfo['type'] = 'other';
        if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
          type = 'button';
        } else if (element.tagName === 'A') {
          type = 'link';
        } else if (element.tagName === 'INPUT') {
          type = 'input';
        } else if (element.tagName === 'SELECT') {
          type = 'select';
        } else if (element.tagName === 'TEXTAREA') {
          type = 'textarea';
        }
        
        // Get element text
        let text = '';
        if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'submit') {
          text = (element as HTMLInputElement).value || 'Submit';
        } else if (element.tagName === 'BUTTON') {
          text = element.textContent?.trim() || '';
        } else if (element.tagName === 'A') {
          text = element.textContent?.trim() || (element as HTMLAnchorElement).href;
        } else {
          text = element.textContent?.trim() || '';
        }
        
                 // Check compliance
         const minSize = Math.min(width, height);
         const isCompliant = minSize >= 44;
        
        touchTargets.push({
          selector: this.generateSelector(element),
          tagName: element.tagName.toLowerCase(),
          text: text.substring(0, 50), // Limit text length
          width: Math.round(width),
          height: Math.round(height),
          minSize: Math.round(minSize),
          isCompliant,
          position: { x: Math.round(rect.left), y: Math.round(rect.top) },
          type
        });
      });
      
      return touchTargets;
    }, this.minTouchTargetSize);
  }

  private generateSelector(element: Element): string {
    // Generate a unique selector for the element
    if (element.id) {
      return `#${element.id}`;
    }
    
    if (element.className) {
      const classes = element.className.split(' ').filter(c => c.trim());
      if (classes.length > 0) {
        return `${element.tagName.toLowerCase()}.${classes.join('.')}`;
      }
    }
    
    // Fallback to tag name with position
    const siblings = Array.from(element.parentElement?.children || []);
    const index = siblings.indexOf(element) + 1;
    return `${element.tagName.toLowerCase()}:nth-child(${index})`;
  }

  private analyzeCompliance(touchTargets: TouchTargetInfo[]): TouchTargetViolation[] {
    const violations: TouchTargetViolation[] = [];
    
    touchTargets.forEach(target => {
      if (!target.isCompliant) {
        const issue = `Touch target size (${target.minSize}px) is below minimum requirement (${this.minTouchTargetSize}px)`;
        const recommendation = this.getRecommendation(target);
        
        violations.push({
          selector: target.selector,
          tagName: target.tagName,
          text: target.text,
          width: target.width,
          height: target.height,
          minSize: target.minSize,
          issue,
          recommendation
        });
      }
    });
    
    return violations;
  }

  private calculateScore(touchTargets: TouchTargetInfo[], violations: TouchTargetViolation[]): number {
    if (touchTargets.length === 0) return 100;
    
    const compliantCount = touchTargets.length - violations.length;
    return Math.round((compliantCount / touchTargets.length) * 100);
  }

  private generateRecommendations(violations: TouchTargetViolation[]): string[] {
    const recommendations: string[] = [];
    
    if (violations.length === 0) {
      recommendations.push('All touch targets meet minimum size requirements');
      return recommendations;
    }
    
    // Group violations by type
    const buttonViolations = violations.filter(v => v.tagName === 'button' || v.tagName === 'input');
    const linkViolations = violations.filter(v => v.tagName === 'a');
    const inputViolations = violations.filter(v => ['input', 'select', 'textarea'].includes(v.tagName));
    
    if (buttonViolations.length > 0) {
      recommendations.push(`Increase button sizes: ${buttonViolations.length} buttons are too small`);
    }
    
    if (linkViolations.length > 0) {
      recommendations.push(`Increase link sizes: ${linkViolations.length} links are too small`);
    }
    
    if (inputViolations.length > 0) {
      recommendations.push(`Increase input field sizes: ${inputViolations.length} input fields are too small`);
    }
    
    recommendations.push('Ensure all interactive elements have a minimum touch target size of 44px');
    recommendations.push('Consider using padding to increase touch target size without changing visual appearance');
    recommendations.push('Test on actual mobile devices to verify touch target usability');
    
    return recommendations;
  }

  private getRecommendation(target: TouchTargetInfo): string {
    switch (target.type) {
      case 'button':
        return `Increase button size to at least ${this.minTouchTargetSize}x${this.minTouchTargetSize}px or add padding`;
      case 'link':
        return `Increase link size to at least ${this.minTouchTargetSize}x${this.minTouchTargetSize}px or add padding`;
      case 'input':
        return `Increase input field height to at least ${this.minTouchTargetSize}px`;
      case 'select':
        return `Increase select dropdown size to at least ${this.minTouchTargetSize}x${this.minTouchTargetSize}px`;
      case 'textarea':
        return `Increase textarea size to at least ${this.minTouchTargetSize}px height`;
      default:
        return `Increase element size to at least ${this.minTouchTargetSize}x${this.minTouchTargetSize}px`;
    }
  }

  setMinTouchTargetSize(size: number): void {
    this.minTouchTargetSize = size;
  }

  getMinTouchTargetSize(): number {
    return this.minTouchTargetSize;
  }
} 