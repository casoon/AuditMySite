import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class KeyboardNavigationTest extends BaseAccessibilityTest {
  name = 'Keyboard Navigation';
  description = 'Check if all interactive elements are keyboard accessible';
  category = 'keyboard';
  priority = 'critical';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        let totalIssues = 0;

        // Check focusable elements
        const focusableSelectors = [
          'button:not([disabled])',
          'input:not([disabled]):not([type="hidden"])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          'a[href]',
          '[tabindex]:not([tabindex="-1"])',
          '[role="button"]:not([disabled])',
          '[role="link"]',
          '[role="menuitem"]',
          '[role="tab"]',
          '[role="option"]'
        ];

        const focusableElements = document.querySelectorAll(focusableSelectors.join(', '));
        
        // Check for elements that should be focusable but aren't
        const interactiveElements = document.querySelectorAll('button, input, select, textarea, a');
        interactiveElements.forEach((element: Element) => {
          const interactiveElement = element as HTMLElement;
          const isDisabled = interactiveElement.hasAttribute('disabled');
          const isHidden = interactiveElement.style.display === 'none' || 
                          interactiveElement.style.visibility === 'hidden' ||
                          interactiveElement.hidden;
          
          if (!isDisabled && !isHidden) {
            const tabIndex = interactiveElement.tabIndex;
            if (tabIndex === -1) {
              totalIssues++;
              issues.push(`Interactive element with tabindex="-1": ${interactiveElement.outerHTML}`);
            }
          }
        });

        // Check for skip links
        const skipLinks = document.querySelectorAll('a[href^="#"]');
        if (skipLinks.length === 0) {
          warnings.push('No skip links found for keyboard navigation');
        }

        // Check for focus indicators
        const focusableWithoutIndicator = Array.from(focusableElements).filter((element: Element) => {
          const el = element as HTMLElement;
          const style = window.getComputedStyle(el);
          return style.outline === 'none' && 
                 style.border === 'none' && 
                 !el.classList.contains('focus') &&
                 !el.classList.contains('focus-visible');
        });

        if (focusableWithoutIndicator.length > 0) {
          totalIssues++;
          warnings.push(`${focusableWithoutIndicator.length} focusable elements without visible focus indicators`);
        }

        return {
          totalIssues,
          issues,
          warnings,
          focusableCount: focusableElements.length,
          skipLinksCount: skipLinks.length
        };
      });

      return this.createResult(
        result.totalIssues === 0,
        result.totalIssues,
        result.issues,
        result.warnings,
        { 
          category: 'keyboard-navigation',
          focusableCount: result.focusableCount,
          skipLinksCount: result.skipLinksCount
        }
      );

    } catch (error) {
      return this.createErrorResult(`Keyboard navigation test failed: ${error}`);
    }
  }
} 