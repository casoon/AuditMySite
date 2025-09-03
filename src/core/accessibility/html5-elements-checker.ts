import { Page } from 'playwright';

/**
 * HTML5 Elements Analysis Results
 */
export interface Html5ElementsAnalysis {
  detailsElements: number;
  summaryElements: number;
  summaryWithoutName: number;
  dialogElements: number;
  dialogAccessibilityIssues: string[];
  mainElements: number;
  semanticStructureScore: number;
  modernHtml5Usage: boolean;
  recommendations: string[];
  elementBreakdown: {
    sectioning: number;
    interactive: number;
    semantic: number;
    form: number;
  };
}

/**
 * Enhanced HTML5 Elements Checker
 * Utilizes new axe-core v4.10 rules for modern HTML5 element testing
 */
export class Html5ElementsChecker {

  /**
   * Analyze modern HTML5 elements on a page
   * Uses Chrome 135 + axe-core v4.10 enhanced detection
   */
  async analyzeHtml5Elements(page: Page): Promise<Html5ElementsAnalysis> {
    try {
      const analysis = await page.evaluate(() => {
        const results: Html5ElementsAnalysis = {
          detailsElements: 0,
          summaryElements: 0,
          summaryWithoutName: 0,
          dialogElements: 0,
          dialogAccessibilityIssues: [],
          mainElements: 0,
          semanticStructureScore: 0,
          modernHtml5Usage: false,
          recommendations: [],
          elementBreakdown: {
            sectioning: 0,
            interactive: 0,
            semantic: 0,
            form: 0
          }
        };

        // Enhanced HTML5 Elements Detection
        
        // 1. Details/Summary Elements (new axe-core v4.10 rule target)
        const detailsElements = document.querySelectorAll('details');
        const summaryElements = document.querySelectorAll('summary');
        results.detailsElements = detailsElements.length;
        results.summaryElements = summaryElements.length;

        // Check for summary elements without accessible names (new axe-core rule)
        summaryElements.forEach(summary => {
          const hasAccessibleName = summary.textContent?.trim() || 
                                   summary.getAttribute('aria-label') || 
                                   summary.getAttribute('aria-labelledby') ||
                                   summary.querySelector('img[alt]');
          if (!hasAccessibleName) {
            results.summaryWithoutName++;
          }
        });

        // 2. Dialog Elements (Chrome 135 enhanced support)
        const dialogElements = document.querySelectorAll('dialog');
        results.dialogElements = dialogElements.length;
        
        dialogElements.forEach((dialog, index) => {
          // Check for proper dialog accessibility
          const hasRole = dialog.getAttribute('role');
          const hasAriaLabel = dialog.getAttribute('aria-label') || dialog.getAttribute('aria-labelledby');
          const hasAriaModal = dialog.getAttribute('aria-modal');
          
          if (!hasAriaLabel) {
            results.dialogAccessibilityIssues.push(`Dialog ${index + 1}: Missing accessible name`);
          }
          if (!hasAriaModal && dialog.hasAttribute('open')) {
            results.dialogAccessibilityIssues.push(`Dialog ${index + 1}: Missing aria-modal attribute`);
          }
        });

        // 3. Main Elements (landmark analysis)
        results.mainElements = document.querySelectorAll('main').length;
        
        // 4. Semantic Structure Analysis
        const sectioningElements = document.querySelectorAll('article, aside, nav, section, header, footer');
        const interactiveElements = document.querySelectorAll('details, dialog, button, input, select, textarea');
        const semanticElements = document.querySelectorAll('main, figure, figcaption, time, mark, progress, meter');
        const formElements = document.querySelectorAll('fieldset, legend, datalist, output, optgroup');

        results.elementBreakdown.sectioning = sectioningElements.length;
        results.elementBreakdown.interactive = interactiveElements.length;
        results.elementBreakdown.semantic = semanticElements.length;
        results.elementBreakdown.form = formElements.length;

        // 5. Modern HTML5 Usage Detection
        const totalModernElements = results.detailsElements + results.dialogElements + 
                                   results.elementBreakdown.semantic + results.elementBreakdown.form;
        results.modernHtml5Usage = totalModernElements > 0;

        // 6. Semantic Structure Score (0-100)
        let score = 0;
        
        // Main element bonus (foundational)
        if (results.mainElements === 1) score += 20;
        else if (results.mainElements > 1) score += 10; // Multiple mains can be problematic
        
        // Sectioning elements bonus
        if (results.elementBreakdown.sectioning > 0) score += 20;
        
        // Interactive elements bonus
        if (results.elementBreakdown.interactive > 0) score += 15;
        
        // Modern semantic elements bonus
        if (results.elementBreakdown.semantic > 0) score += 15;
        
        // Form structure bonus
        if (results.elementBreakdown.form > 0) score += 10;
        
        // Details/Summary proper usage bonus
        if (results.detailsElements > 0 && results.summaryWithoutName === 0) score += 15;
        
        // Dialog proper usage bonus
        if (results.dialogElements > 0 && results.dialogAccessibilityIssues.length === 0) score += 5;

        results.semanticStructureScore = Math.min(100, score);

        return results;
      });

      // Generate recommendations based on analysis
      analysis.recommendations = this.generateHtml5Recommendations(analysis);

      return analysis;

    } catch (error) {
      console.warn('HTML5 elements analysis failed:', error);
      return this.getDefaultAnalysis();
    }
  }

  /**
   * Generate actionable recommendations for HTML5 elements
   */
  private generateHtml5Recommendations(analysis: Html5ElementsAnalysis): string[] {
    const recommendations: string[] = [];

    // Main element recommendations
    if (analysis.mainElements === 0) {
      recommendations.push('Add a <main> landmark to identify the primary content area');
    } else if (analysis.mainElements > 1) {
      recommendations.push('Use only one <main> element per page for better screen reader navigation');
    }

    // Details/Summary recommendations (new axe-core v4.10 focus)
    if (analysis.summaryWithoutName > 0) {
      recommendations.push(`Fix ${analysis.summaryWithoutName} <summary> elements lacking accessible names`);
    }
    if (analysis.detailsElements > 0 && analysis.summaryElements === 0) {
      recommendations.push('Each <details> element should contain a <summary> for better accessibility');
    }

    // Dialog recommendations
    if (analysis.dialogAccessibilityIssues.length > 0) {
      recommendations.push('Fix dialog accessibility: ensure aria-label/labelledby and aria-modal attributes');
    }

    // Semantic structure recommendations
    if (analysis.semanticStructureScore < 50) {
      recommendations.push('Improve semantic HTML structure with sectioning elements (article, aside, nav, section)');
    }
    if (analysis.elementBreakdown.sectioning === 0) {
      recommendations.push('Use HTML5 sectioning elements for better document outline and screen reader navigation');
    }

    // Modern HTML5 usage encouragement
    if (!analysis.modernHtml5Usage) {
      recommendations.push('Consider using modern HTML5 elements like <details>, <dialog>, <figure> for enhanced semantics');
    }

    // Form structure recommendations
    if (analysis.elementBreakdown.form === 0 && 
        (document.querySelector('form') || document.querySelector('input'))) {
      recommendations.push('Use <fieldset> and <legend> elements to group related form fields');
    }

    return recommendations;
  }

  /**
   * Get default analysis in case of errors
   */
  private getDefaultAnalysis(): Html5ElementsAnalysis {
    return {
      detailsElements: 0,
      summaryElements: 0,
      summaryWithoutName: 0,
      dialogElements: 0,
      dialogAccessibilityIssues: [],
      mainElements: 0,
      semanticStructureScore: 0,
      modernHtml5Usage: false,
      recommendations: ['HTML5 elements analysis unavailable - ensure page loads completely'],
      elementBreakdown: {
        sectioning: 0,
        interactive: 0,
        semantic: 0,
        form: 0
      }
    };
  }

  /**
   * Check if a page uses modern HTML5 patterns effectively
   */
  async hasModernHtml5Patterns(page: Page): Promise<boolean> {
    try {
      return await page.evaluate(() => {
        // Check for modern HTML5 usage patterns
        const modernElements = [
          'details', 'summary', 'dialog', 'main', 'article', 'section', 
          'aside', 'nav', 'header', 'footer', 'figure', 'figcaption',
          'time', 'mark', 'progress', 'meter', 'datalist', 'output'
        ];

        return modernElements.some(tag => document.querySelector(tag));
      });
    } catch (error) {
      return false;
    }
  }

  /**
   * Get HTML5 semantic complexity score for a page
   */
  getSemanticComplexityLevel(analysis: Html5ElementsAnalysis): 'basic' | 'intermediate' | 'advanced' {
    const totalElements = Object.values(analysis.elementBreakdown).reduce((sum, count) => sum + count, 0);
    
    if (totalElements === 0) return 'basic';
    if (totalElements < 5) return 'basic';
    if (totalElements < 15) return 'intermediate';
    return 'advanced';
  }
}
