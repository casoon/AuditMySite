import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class LanguageTextDirectionTest extends BaseAccessibilityTest {
  name = 'Language Text Direction Test';
  description = 'Checks text direction and RTL support';
  category = 'language';
  priority = 'medium';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check for dir attribute on html element
        const htmlDir = document.documentElement.getAttribute('dir');
        const htmlLang = document.documentElement.getAttribute('lang');
        
        // Check for RTL languages
        const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ps', 'sd'];
        const isRTLPage = htmlLang && rtlLanguages.includes(htmlLang.split('-')[0]);
        
        if (isRTLPage && !htmlDir) {
          issues.push('RTL language detected but missing dir="rtl" on html element');
        } else if (htmlDir === 'rtl' && !isRTLPage) {
          warnings.push('dir="rtl" set but language is not RTL');
        }
        
        // Check for mixed text direction
        const dirAttributes = document.querySelectorAll('[dir]');
        const ltrElements = document.querySelectorAll('[dir="ltr"]');
        const rtlElements = document.querySelectorAll('[dir="rtl"]');
        
        if (ltrElements.length > 0 && rtlElements.length > 0) {
          warnings.push(`Mixed text direction detected: ${ltrElements.length} LTR, ${rtlElements.length} RTL elements`);
        }
        
        // Check for bidirectional text
        const bidirectionalText = document.querySelectorAll('[dir="auto"]');
        if (bidirectionalText.length > 0) {
          warnings.push(`Bidirectional text detected: ${bidirectionalText.length} elements with dir="auto"`);
        }
        
        // Check for RTL content without proper direction
        const rtlContent = document.querySelectorAll('[lang*="ar"], [lang*="he"], [lang*="fa"], [lang*="ur"]');
        rtlContent.forEach(el => {
          const dir = el.getAttribute('dir');
          if (!dir) {
            warnings.push(`RTL content detected without dir attribute: ${el.getAttribute('lang')}`);
          }
        });
        
        // Check for form elements in RTL context
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
          const formDir = form.getAttribute('dir') || form.closest('[dir]')?.getAttribute('dir');
          if (formDir === 'rtl') {
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
              const inputDir = input.getAttribute('dir');
              if (!inputDir) {
                warnings.push('RTL form input missing dir attribute');
              }
            });
          }
        });
        
        // Check for table direction
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
          const tableDir = table.getAttribute('dir') || table.closest('[dir]')?.getAttribute('dir');
          if (tableDir === 'rtl') {
            const headers = table.querySelectorAll('th');
            headers.forEach(header => {
              const headerDir = header.getAttribute('dir');
              if (!headerDir) {
                warnings.push('RTL table header missing dir attribute');
              }
            });
          }
        });
        
        // Check for list direction
        const lists = document.querySelectorAll('ul, ol');
        lists.forEach(list => {
          const listDir = list.getAttribute('dir') || list.closest('[dir]')?.getAttribute('dir');
          if (listDir === 'rtl') {
            const items = list.querySelectorAll('li');
            items.forEach(item => {
              const itemDir = item.getAttribute('dir');
              if (!itemDir) {
                warnings.push('RTL list item missing dir attribute');
              }
            });
          }
        });
        
        // Check for navigation direction
        const navigation = document.querySelectorAll('nav');
        navigation.forEach(nav => {
          const navDir = nav.getAttribute('dir') || nav.closest('[dir]')?.getAttribute('dir');
          if (navDir === 'rtl') {
            const links = nav.querySelectorAll('a');
            links.forEach(link => {
              const linkDir = link.getAttribute('dir');
              if (!linkDir) {
                warnings.push('RTL navigation link missing dir attribute');
              }
            });
          }
        });
        
        // Check for button direction
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
          const buttonDir = button.getAttribute('dir') || button.closest('[dir]')?.getAttribute('dir');
          if (buttonDir === 'rtl') {
            const buttonText = button.textContent?.trim();
            if (buttonText && buttonText.length > 0) {
              const textDir = button.getAttribute('dir');
              if (!textDir) {
                warnings.push('RTL button text missing dir attribute');
              }
            }
          }
        });
        
        // Check for input placeholder direction
        const inputs = document.querySelectorAll('input[placeholder]');
        inputs.forEach(input => {
          const inputDir = input.getAttribute('dir') || input.closest('[dir]')?.getAttribute('dir');
          if (inputDir === 'rtl') {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder && placeholder.length > 0) {
              const placeholderDir = input.getAttribute('dir');
              if (!placeholderDir) {
                warnings.push('RTL input placeholder missing dir attribute');
              }
            }
          }
        });
        
        // Check for textarea direction
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
          const textareaDir = textarea.getAttribute('dir') || textarea.closest('[dir]')?.getAttribute('dir');
          if (textareaDir === 'rtl') {
            const textareaText = textarea.textContent?.trim();
            if (textareaText && textareaText.length > 0) {
              const textDir = textarea.getAttribute('dir');
              if (!textDir) {
                warnings.push('RTL textarea content missing dir attribute');
              }
            }
          }
        });
        
        // Check for CSS direction properties
        const styleSheets = Array.from(document.styleSheets);
        let hasDirectionCSS = false;
        
        styleSheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules);
            rules.forEach(rule => {
              if (rule instanceof CSSStyleRule) {
                if (rule.style.direction || rule.style.textAlign) {
                  hasDirectionCSS = true;
                }
              }
            });
          } catch (e) {
            // Cross-origin stylesheets may throw errors
          }
        });
        
        if (hasDirectionCSS) {
          warnings.push('CSS direction properties detected (consider using HTML dir attributes for better accessibility)');
        }
        
        // Check for logical properties usage
        const logicalProperties = document.querySelectorAll('[style*="margin-inline"], [style*="padding-inline"], [style*="border-inline"]');
        if (logicalProperties.length > 0) {
          warnings.push(`CSS logical properties detected: ${logicalProperties.length} elements (ensure browser support)`);
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
      return this.createErrorResult(`Language text direction test failed: ${error}`);
    }
  }
} 