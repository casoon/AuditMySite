import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class AriaLandmarksTest extends BaseAccessibilityTest {
  name = 'ARIA Landmarks';
  description = 'Check for proper ARIA landmarks and roles';
  category = 'aria';
  priority = 'high';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        let totalIssues = 0;

        // Check for main landmark
        const mainLandmarks = document.querySelectorAll('main, [role="main"]');
        if (mainLandmarks.length === 0) {
          totalIssues++;
          issues.push('No main landmark found');
        } else if (mainLandmarks.length > 1) {
          warnings.push('Multiple main landmarks found - should only have one');
        }

        // Check for navigation landmarks
        const navLandmarks = document.querySelectorAll('nav, [role="navigation"]');
        if (navLandmarks.length === 0) {
          warnings.push('No navigation landmark found');
        }

        // Check for banner landmark
        const bannerLandmarks = document.querySelectorAll('header, [role="banner"]');
        if (bannerLandmarks.length === 0) {
          warnings.push('No banner landmark found');
        }

        // Check for contentinfo landmark
        const contentinfoLandmarks = document.querySelectorAll('footer, [role="contentinfo"]');
        if (contentinfoLandmarks.length === 0) {
          warnings.push('No contentinfo landmark found');
        }

        // Check for proper ARIA labels
        const elementsWithRole = document.querySelectorAll('[role]');
        elementsWithRole.forEach((element: Element) => {
          const el = element as HTMLElement;
          const role = el.getAttribute('role');
          const hasAriaLabel = el.hasAttribute('aria-label');
          const hasAriaLabelledBy = el.hasAttribute('aria-labelledby');
          const hasVisibleText = el.textContent && el.textContent.trim().length > 0;
          
          // Elements that should have labels
          const rolesNeedingLabels = ['button', 'link', 'menuitem', 'tab', 'option', 'combobox'];
          if (rolesNeedingLabels.includes(role || '') && !hasAriaLabel && !hasAriaLabelledBy && !hasVisibleText) {
            totalIssues++;
            issues.push(`Element with role="${role}" missing aria-label or aria-labelledby: ${el.outerHTML}`);
          }
        });

        // Check for invalid ARIA attributes
        const elementsWithInvalidAria = document.querySelectorAll('[aria-invalid="true"]');
        elementsWithInvalidAria.forEach((element: Element) => {
          const el = element as HTMLElement;
          const hasAriaDescribedBy = el.hasAttribute('aria-describedby');
          if (!hasAriaDescribedBy) {
            totalIssues++;
            issues.push(`Element with aria-invalid="true" missing aria-describedby: ${el.outerHTML}`);
          }
        });

        return {
          totalIssues,
          issues,
          warnings,
          landmarks: {
            main: mainLandmarks.length,
            nav: navLandmarks.length,
            banner: bannerLandmarks.length,
            contentinfo: contentinfoLandmarks.length
          }
        };
      });

      return this.createResult(
        result.totalIssues === 0,
        result.totalIssues,
        result.issues,
        result.warnings,
        { 
          category: 'aria-landmarks',
          landmarks: result.landmarks
        }
      );

    } catch (error) {
      return this.createErrorResult(`ARIA landmarks test failed: ${error}`);
    }
  }
} 