import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class ValidationErrorHandlingTest extends BaseAccessibilityTest {
  name = 'Validation Error Handling Test';
  description = 'Checks error handling, accessibility, and user experience (error messages, screen readers, error recovery)';
  category = 'validation';
  priority = 'high';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check for error messages and their accessibility
        const errorMessages = document.querySelectorAll('.error, .error-message, .alert-error, [role="alert"], [aria-invalid="true"]');
        
        if (errorMessages.length === 0) {
          // Check for other common error patterns
          const errorPatterns = document.querySelectorAll('[class*="error"], [class*="invalid"], [class*="alert"]');
          if (errorPatterns.length === 0) {
            warnings.push('No error handling patterns detected (consider adding error states)');
          }
        } else {
          // Check if error messages are properly associated with form controls
          errorMessages.forEach(error => {
            const formControl = error.closest('form')?.querySelector('input, select, textarea');
            if (formControl && !formControl.hasAttribute('aria-describedby')) {
              issues.push('Error message not properly associated with form control (missing aria-describedby)');
            }
          });
        }
        
        // Check for required field indicators in error handling context
        const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
        requiredFields.forEach(field => {
          const label = document.querySelector(`label[for="${field.id}"]`);
          if (label && !label.textContent?.includes('*') && !label.textContent?.includes('required')) {
            warnings.push(`Required field "${field.id}" not clearly indicated in label text`);
          }
        });
        
        // Check for validation feedback patterns in error handling context
        const formInputs = document.querySelectorAll('input, select, textarea');
        let hasValidation = false;
        
        formInputs.forEach(input => {
          if (input.hasAttribute('pattern') || input.hasAttribute('minlength') || input.hasAttribute('maxlength')) {
            hasValidation = true;
          }
        });
        
        if (!hasValidation && formInputs.length > 0) {
          warnings.push('No client-side validation patterns detected for error handling');
        }
        
        // Check for error recovery mechanisms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
          const resetButton = form.querySelector('button[type="reset"], input[type="reset"]');
          if (!resetButton) {
            warnings.push('Form lacks reset/clear functionality for error recovery');
          }
        });
        
        // Check for error message visibility
        const hiddenErrors = document.querySelectorAll('.error[style*="display: none"], .error[hidden], .error[aria-hidden="true"]');
        if (hiddenErrors.length > 0) {
          issues.push('Error messages are hidden from screen readers');
        }
        
        // Check for error message clarity
        const errorTexts = Array.from(errorMessages).map(el => el.textContent?.trim()).filter(Boolean);
        errorTexts.forEach(text => {
          if (text && text.length < 10) {
            warnings.push('Error message may be too brief: "' + text + '"');
          }
        });
        
        // Check for error message positioning
        errorMessages.forEach(error => {
          const rect = error.getBoundingClientRect();
          if (rect.top < 0 || rect.left < 0) {
            warnings.push('Error message positioned outside viewport');
          }
        });
        
        // Check for error message color contrast (basic check)
        const computedStyle = window.getComputedStyle(errorMessages[0] || document.body);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        if (color && backgroundColor && (color.includes('red') || backgroundColor.includes('red'))) {
          // This is a basic check - in a real implementation, you'd use a color contrast library
          warnings.push('Error messages should ensure sufficient color contrast');
        }
        
        // Check for error message timing
        const autoHideErrors = document.querySelectorAll('.error[data-auto-hide], .error[data-timeout]');
        if (autoHideErrors.length > 0) {
          warnings.push('Auto-hiding error messages may not be accessible to all users');
        }
        
        // Check for error message persistence
        const persistentErrors = document.querySelectorAll('.error[data-persistent="true"]');
        if (persistentErrors.length === 0 && errorMessages.length > 0) {
          warnings.push('Consider making error messages persistent until user action');
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
      return this.createErrorResult(`Validation error handling test failed: ${error}`);
    }
  }
} 