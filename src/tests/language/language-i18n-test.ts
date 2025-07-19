import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class LanguageI18nTest extends BaseAccessibilityTest {
  name = 'Language i18n Test';
  description = 'Checks internationalization and language attributes';
  category = 'language';
  priority = 'medium';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check for lang attribute on html element
        const htmlLang = document.documentElement.getAttribute('lang');
        if (!htmlLang) {
          issues.push('Missing lang attribute on html element');
        } else if (htmlLang.length !== 2 && htmlLang.length !== 5) {
          warnings.push(`Invalid lang attribute format: "${htmlLang}" (should be 2 or 5 characters)`);
        }
        
        // Check for multiple languages on the page
        const allLangAttributes = document.querySelectorAll('[lang]');
        const languages = new Set();
        allLangAttributes.forEach(el => {
          const lang = el.getAttribute('lang');
          if (lang) languages.add(lang);
        });
        
        if (languages.size > 1) {
          warnings.push(`Multiple languages detected: ${Array.from(languages).join(', ')}`);
        }
        
        // Check for language changes in content
        const langChanges = document.querySelectorAll('[lang]');
        langChanges.forEach(el => {
          const lang = el.getAttribute('lang');
          const parentLang = el.closest('[lang]')?.getAttribute('lang');
          
          if (parentLang && lang === parentLang) {
            warnings.push(`Redundant lang attribute: "${lang}" on nested element`);
          }
        });
        
        // Check for proper language codes
        const validLanguageCodes = [
          'en', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'he', 'hi', 'th', 'vi'
        ];
        
        allLangAttributes.forEach(el => {
          const lang = el.getAttribute('lang');
          if (lang && !validLanguageCodes.includes(lang.split('-')[0])) {
            warnings.push(`Potentially invalid language code: "${lang}"`);
          }
        });
        
        // Check for dir attribute (text direction)
        const dirAttributes = document.querySelectorAll('[dir]');
        dirAttributes.forEach(el => {
          const dir = el.getAttribute('dir');
          if (dir && !['ltr', 'rtl', 'auto'].includes(dir)) {
            issues.push(`Invalid dir attribute: "${dir}" (should be ltr, rtl, or auto)`);
          }
        });
        
        // Check for RTL languages without dir attribute
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        allLangAttributes.forEach(el => {
          const lang = el.getAttribute('lang');
          if (lang && rtlLanguages.includes(lang.split('-')[0])) {
            const dir = el.getAttribute('dir');
            if (!dir) {
              warnings.push(`RTL language "${lang}" detected without dir attribute`);
            }
          }
        });
        
        // Check for language-specific content
        const languageSpecificContent = document.querySelectorAll('[data-lang], [data-language], .lang-specific');
        if (languageSpecificContent.length > 0) {
          warnings.push(`Language-specific content detected: ${languageSpecificContent.length} elements`);
        }
        
        // Check for translation placeholders
        const translationPlaceholders = document.querySelectorAll('[data-i18n], [data-translate], .translation-key');
        if (translationPlaceholders.length > 0) {
          warnings.push(`Translation placeholders detected: ${translationPlaceholders.length} elements`);
        }
        
        // Check for language switcher
        const languageSwitcher = document.querySelectorAll('.language-switcher, .lang-switcher, [data-language-switcher]');
        if (languageSwitcher.length === 0 && languages.size > 1) {
          warnings.push('Multiple languages detected but no language switcher found');
        }
        
        // Check for proper language labels
        languageSwitcher.forEach(switcher => {
          const languageOptions = switcher.querySelectorAll('a, button, option');
          languageOptions.forEach(option => {
            const lang = option.getAttribute('lang') || option.getAttribute('data-lang');
            if (!lang) {
              warnings.push('Language option missing lang attribute');
            }
          });
        });
        
        // Check for date/time formatting
        const dateElements = document.querySelectorAll('time, [datetime]');
        dateElements.forEach(el => {
          const datetime = el.getAttribute('datetime');
          if (datetime && !datetime.match(/^\d{4}-\d{2}-\d{2}/)) {
            warnings.push(`Potentially invalid datetime format: "${datetime}"`);
          }
        });
        
        // Check for number formatting
        const numberElements = document.querySelectorAll('[data-number], .number-format');
        if (numberElements.length > 0) {
          warnings.push(`Number formatting elements detected: ${numberElements.length} elements`);
        }
        
        // Check for currency formatting
        const currencyElements = document.querySelectorAll('[data-currency], .currency-format');
        if (currencyElements.length > 0) {
          warnings.push(`Currency formatting elements detected: ${currencyElements.length} elements`);
        }
        
        // Check for address formatting
        const addressElements = document.querySelectorAll('address, .address-format');
        if (addressElements.length > 0) {
          warnings.push(`Address formatting elements detected: ${addressElements.length} elements`);
        }
        
        // Check for phone number formatting
        const phoneElements = document.querySelectorAll('a[href^="tel:"], .phone-format');
        if (phoneElements.length > 0) {
          warnings.push(`Phone number formatting elements detected: ${phoneElements.length} elements`);
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
      return this.createErrorResult(`Language i18n test failed: ${error}`);
    }
  }
} 