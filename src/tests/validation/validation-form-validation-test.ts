import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class ValidationFormValidationTest extends BaseAccessibilityTest {
  name = 'Validation Form Validation Test';
  description = 'Checks form validation patterns, rules, and structure (patterns, constraints, validation messages)';
  category = 'validation';
  priority = 'high';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check all form inputs for proper validation
        const formInputs = document.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input => {
          const inputElement = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          
          // Check for proper input types (only for HTMLInputElement)
          if (inputElement instanceof HTMLInputElement) {
            if (inputElement.type === 'email' && !inputElement.pattern) {
              warnings.push(`Email input "${inputElement.id || inputElement.name}" lacks pattern validation`);
            }
            
            if (inputElement.type === 'tel' && !inputElement.pattern) {
              warnings.push(`Phone input "${inputElement.id || inputElement.name}" lacks pattern validation`);
            }
            
            if (inputElement.type === 'url' && !inputElement.pattern) {
              warnings.push(`URL input "${inputElement.id || inputElement.name}" lacks pattern validation`);
            }
            
            // Check for number inputs
            if (inputElement.type === 'number') {
              if (inputElement.min && inputElement.max) {
                if (parseFloat(inputElement.min) >= parseFloat(inputElement.max)) {
                  issues.push(`Invalid number range for "${inputElement.id || inputElement.name}"`);
                }
              }
            }
            
            // Check for date inputs
            if (inputElement.type === 'date') {
              if (inputElement.min && inputElement.max) {
                const minDate = new Date(inputElement.min);
                const maxDate = new Date(inputElement.max);
                if (minDate >= maxDate) {
                  issues.push(`Invalid date range for "${inputElement.id || inputElement.name}"`);
                }
              }
            }
          }
          
          // Check for required field validation patterns (not label associations - that's handled by FormLabelTest)
          if (inputElement.required) {
            // Only check validation-specific aspects, not label associations
            if (inputElement instanceof HTMLInputElement) {
              const type = inputElement.type;
              if (type === 'email' && !inputElement.pattern) {
                warnings.push(`Required email field "${inputElement.id || inputElement.name}" lacks email validation pattern`);
              }
              if (type === 'tel' && !inputElement.pattern) {
                warnings.push(`Required phone field "${inputElement.id || inputElement.name}" lacks phone validation pattern`);
              }
            }
          }
          
          // Check for min/max length (only for input and textarea)
          if ((inputElement instanceof HTMLInputElement || inputElement instanceof HTMLTextAreaElement)) {
            if (inputElement.minLength && inputElement.maxLength) {
              if (inputElement.minLength >= inputElement.maxLength) {
                issues.push(`Invalid length constraints for "${inputElement.id || inputElement.name}"`);
              }
            }
          }
        });
        
        // Check for form validation patterns and structure
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
          const formElement = form as HTMLFormElement;
          
          // Check if form has validation patterns
          const hasClientValidation = formElement.querySelector('[pattern], [required], [minlength], [maxlength], [min], [max]');
          if (!hasClientValidation) {
            warnings.push('Form lacks client-side validation attributes');
          }
          
          // Check for form submission handling
          const submitButtons = formElement.querySelectorAll('button[type="submit"], input[type="submit"]');
          if (submitButtons.length === 0) {
            issues.push('Form lacks submit button');
          }
          
          // Note: Reset functionality is checked in ValidationErrorHandlingTest for error recovery context
        });
        
        // Check for validation message structure and patterns (not accessibility - that's handled by ValidationErrorHandlingTest)
        const validationMessages = document.querySelectorAll('[data-validation], [data-error], .validation-message');
        validationMessages.forEach(message => {
          const targetId = message.getAttribute('data-for') || message.getAttribute('data-target');
          if (targetId) {
            const target = document.getElementById(targetId);
            if (!target) {
              issues.push(`Validation message references non-existent element: ${targetId}`);
            }
            // Note: aria-describedby association is checked in ValidationErrorHandlingTest
          }
        });
        
        // Check for real-time validation
        const realTimeValidation = document.querySelectorAll('[data-validate-on-input], [data-validate-on-blur]');
        if (realTimeValidation.length === 0) {
          warnings.push('No real-time validation detected (consider adding for better UX)');
        }
        
        // Check for validation feedback timing
        const instantValidation = document.querySelectorAll('[data-validate-instantly]');
        if (instantValidation.length > 0) {
          warnings.push('Instant validation may be disruptive to users (consider delayed validation)');
        }
        
        // Check for validation error recovery
        const errorRecovery = document.querySelectorAll('[data-error-recovery], .error-recovery');
        if (errorRecovery.length === 0 && validationMessages.length > 0) {
          warnings.push('No error recovery mechanisms detected');
        }
        
        // Check for validation success feedback
        const successMessages = document.querySelectorAll('.success, .valid, [data-success]');
        if (successMessages.length === 0 && formInputs.length > 0) {
          warnings.push('No success feedback patterns detected');
        }
        
        // Check for validation error structure (accessibility aspects handled by ValidationErrorHandlingTest)
        const validationErrors = document.querySelectorAll('.error, .invalid, [aria-invalid="true"]');
        validationErrors.forEach(error => {
          const errorText = error.textContent?.trim();
          if (!errorText || errorText.length < 5) {
            issues.push('Validation error message too brief or empty');
          }
          // Note: Screen reader visibility is checked in ValidationErrorHandlingTest
        });
        
        // Check for validation consistency
        const emailInputs = document.querySelectorAll('input[type="email"]');
        const emailPatterns = new Set();
        emailInputs.forEach(input => {
          const pattern = input.getAttribute('pattern');
          if (pattern) emailPatterns.add(pattern);
        });
        
        if (emailPatterns.size > 1) {
          warnings.push('Inconsistent email validation patterns detected');
        }
        
        // Check for validation performance
        const complexPatterns = document.querySelectorAll('[pattern*=".*"], [pattern*=".+"]');
        if (complexPatterns.length > 5) {
          warnings.push('Many complex validation patterns may impact performance');
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
      return this.createErrorResult(`Validation form validation test failed: ${error}`);
    }
  }
} 