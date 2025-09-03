import { Page } from 'playwright';

/**
 * Enhanced ARIA Analysis Results
 */
export interface AriaAnalysisResults {
  totalAriaElements: number;
  validAriaUsage: number;
  invalidAriaUsage: number;
  ariaLabelIssues: number;
  ariaDescribedByIssues: number;
  ariaRequiredIssues: number;
  ariaMultilineIssues: number;
  roleIssues: number;
  landmarkRoles: string[];
  interactiveRoles: string[];
  impactBreakdown: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
  ariaScore: number;
  enhancedFeatures: {
    permissiveAriaHandling: boolean;
    descendantLabeling: boolean;
    modernAriaSupport: boolean;
  };
  recommendations: string[];
}

/**
 * ARIA Impact Levels (aligned with axe-core v4.10)
 */
export enum AriaImpactLevel {
  CRITICAL = 'critical',
  SERIOUS = 'serious', 
  MODERATE = 'moderate',
  MINOR = 'minor'
}

/**
 * Enhanced ARIA Rules Analyzer
 * Leverages axe-core v4.10 improved ARIA attribute support
 */
export class AriaRulesAnalyzer {

  /**
   * Analyze ARIA usage on a page with enhanced axe-core v4.10 features
   */
  async analyzeAriaUsage(page: Page): Promise<AriaAnalysisResults> {
    try {
      const analysis = await page.evaluate(() => {
        const results: AriaAnalysisResults = {
          totalAriaElements: 0,
          validAriaUsage: 0,
          invalidAriaUsage: 0,
          ariaLabelIssues: 0,
          ariaDescribedByIssues: 0,
          ariaRequiredIssues: 0,
          ariaMultilineIssues: 0,
          roleIssues: 0,
          landmarkRoles: [],
          interactiveRoles: [],
          impactBreakdown: {
            critical: 0,
            serious: 0,
            moderate: 0,
            minor: 0
          },
          ariaScore: 0,
          enhancedFeatures: {
            permissiveAriaHandling: false,
            descendantLabeling: false,
            modernAriaSupport: false
          },
          recommendations: []
        };

        // Find all elements with ARIA attributes or roles
        const allElements = document.querySelectorAll('*');
        const ariaElements: Element[] = [];

        allElements.forEach(element => {
          const hasAriaAttributes = Array.from(element.attributes).some(attr => 
            attr.name.startsWith('aria-') || attr.name === 'role'
          );
          if (hasAriaAttributes) {
            ariaElements.push(element);
          }
        });

        results.totalAriaElements = ariaElements.length;

        // Enhanced ARIA Analysis with axe-core v4.10 improvements
        ariaElements.forEach(element => {
          this.analyzeElementAria(element, results);
        });

        // Landmark and Interactive Role Analysis
        this.analyzeLandmarkRoles(results);
        this.analyzeInteractiveRoles(results);

        // Calculate ARIA Score
        results.ariaScore = this.calculateAriaScore(results);

        // Detect Enhanced Features (new in axe-core v4.10)
        results.enhancedFeatures = this.detectEnhancedAriaFeatures();

        return results;
      });

      // Generate enhanced recommendations
      analysis.recommendations = this.generateAriaRecommendations(analysis);

      return analysis;

    } catch (error) {
      console.warn('ARIA analysis failed:', error);
      return this.getDefaultAriaAnalysis();
    }
  }

  /**
   * Analyze individual element ARIA usage (runs in browser context)
   */
  private analyzeElementAria(element: Element, results: AriaAnalysisResults): void {
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    const ariaDescribedBy = element.getAttribute('aria-describedby');
    const ariaRequired = element.getAttribute('aria-required');
    const ariaMultiline = element.getAttribute('aria-multiline');

    let hasValidAria = true;
    let impactLevel: string = 'minor';

    // 1. Role validation
    if (role) {
      const validRoles = [
        'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
        'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
        'contentinfo', 'definition', 'dialog', 'directory', 'document',
        'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading',
        'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
        'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
        'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
        'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
        'rowheader', 'scrollbar', 'search', 'searchbox', 'separator',
        'slider', 'spinbutton', 'status', 'switch', 'tab', 'table',
        'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar',
        'tooltip', 'tree', 'treegrid', 'treeitem'
      ];

      if (!validRoles.includes(role)) {
        results.roleIssues++;
        hasValidAria = false;
        impactLevel = 'serious';
      }
    }

    // 2. ARIA Label validation (enhanced in axe-core v4.10)
    if (ariaLabelledBy) {
      // Check if referenced elements exist
      const ids = ariaLabelledBy.split(/\s+/);
      const missingIds = ids.filter(id => !document.getElementById(id));
      if (missingIds.length > 0) {
        results.ariaLabelIssues++;
        hasValidAria = false;
        impactLevel = 'serious';
      }
    }

    // 3. ARIA DescribedBy validation
    if (ariaDescribedBy) {
      const ids = ariaDescribedBy.split(/\s+/);
      const missingIds = ids.filter(id => !document.getElementById(id));
      if (missingIds.length > 0) {
        results.ariaDescribedByIssues++;
        hasValidAria = false;
        impactLevel = 'moderate';
      }
    }

    // 4. ARIA Required validation (improved permissive handling in v4.10)
    if (ariaRequired) {
      const validValues = ['true', 'false'];
      if (!validValues.includes(ariaRequired.toLowerCase())) {
        // axe-core v4.10 is more permissive, but still flag obvious errors
        if (!['yes', 'no', '1', '0'].includes(ariaRequired.toLowerCase())) {
          results.ariaRequiredIssues++;
          hasValidAria = false;
          impactLevel = 'moderate';
        }
      }
    }

    // 5. ARIA Multiline validation (improved in axe-core v4.10)
    if (ariaMultiline) {
      const validValues = ['true', 'false'];
      if (!validValues.includes(ariaMultiline.toLowerCase())) {
        // More permissive handling
        if (!['yes', 'no', '1', '0'].includes(ariaMultiline.toLowerCase())) {
          results.ariaMultilineIssues++;
          hasValidAria = false;
          impactLevel = 'minor';
        }
      }
    }

    // 6. Check for descendant labeling (new feature detection)
    if (ariaLabel || ariaLabelledBy) {
      const hasDescendantLabels = element.querySelector('[aria-label], [aria-labelledby]');
      if (hasDescendantLabels) {
        // This is now better supported in axe-core v4.10
        results.enhancedFeatures.descendantLabeling = true;
      }
    }

    // Update counters
    if (hasValidAria) {
      results.validAriaUsage++;
    } else {
      results.invalidAriaUsage++;
      
      // Update impact breakdown
      switch (impactLevel) {
        case 'critical':
          results.impactBreakdown.critical++;
          break;
        case 'serious':
          results.impactBreakdown.serious++;
          break;
        case 'moderate':
          results.impactBreakdown.moderate++;
          break;
        case 'minor':
          results.impactBreakdown.minor++;
          break;
      }
    }
  }

  /**
   * Analyze landmark roles usage
   */
  private analyzeLandmarkRoles(results: AriaAnalysisResults): void {
    const landmarkElements = document.querySelectorAll('[role="banner"], [role="main"], [role="complementary"], [role="contentinfo"], [role="navigation"], [role="search"], [role="form"], [role="region"]');
    
    const landmarks = new Set<string>();
    landmarkElements.forEach(element => {
      const role = element.getAttribute('role');
      if (role) landmarks.add(role);
    });

    results.landmarkRoles = Array.from(landmarks);
  }

  /**
   * Analyze interactive roles usage
   */
  private analyzeInteractiveRoles(results: AriaAnalysisResults): void {
    const interactiveElements = document.querySelectorAll('[role="button"], [role="link"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"], [role="textbox"], [role="combobox"], [role="listbox"], [role="slider"], [role="spinbutton"], [role="switch"], [role="tab"]');
    
    const interactive = new Set<string>();
    interactiveElements.forEach(element => {
      const role = element.getAttribute('role');
      if (role) interactive.add(role);
    });

    results.interactiveRoles = Array.from(interactive);
  }

  /**
   * Detect enhanced ARIA features support (axe-core v4.10)
   */
  private detectEnhancedAriaFeatures(): AriaAnalysisResults['enhancedFeatures'] {
    // Check for permissive ARIA handling
    const permissiveElements = document.querySelectorAll('[aria-required="yes"], [aria-required="1"], [aria-multiline="yes"], [aria-multiline="1"]');
    const permissiveAriaHandling = permissiveElements.length > 0;

    // Check for descendant labeling
    const descendantLabeling = document.querySelectorAll('*[aria-label] [aria-label], *[aria-labelledby] [aria-labelledby]').length > 0;

    // Check for modern ARIA support (ARIA 1.2+ features)
    const modernElements = document.querySelectorAll('[aria-current], [aria-details], [aria-keyshortcuts], [aria-roledescription]');
    const modernAriaSupport = modernElements.length > 0;

    return {
      permissiveAriaHandling,
      descendantLabeling,
      modernAriaSupport
    };
  }

  /**
   * Calculate overall ARIA score (0-100)
   */
  private calculateAriaScore(results: AriaAnalysisResults): number {
    if (results.totalAriaElements === 0) return 100; // No ARIA = no issues

    let score = 100;
    
    // Deduct points based on impact
    score -= results.impactBreakdown.critical * 15;
    score -= results.impactBreakdown.serious * 10;
    score -= results.impactBreakdown.moderate * 5;
    score -= results.impactBreakdown.minor * 2;

    // Bonus for good practices
    if (results.landmarkRoles.length > 0) score += 5;
    if (results.enhancedFeatures.modernAriaSupport) score += 5;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate enhanced ARIA recommendations
   */
  private generateAriaRecommendations(analysis: AriaAnalysisResults): string[] {
    const recommendations: string[] = [];

    // Critical issues
    if (analysis.impactBreakdown.critical > 0) {
      recommendations.push(`Fix ${analysis.impactBreakdown.critical} critical ARIA issues immediately`);
    }

    // Serious issues
    if (analysis.impactBreakdown.serious > 0) {
      recommendations.push(`Address ${analysis.impactBreakdown.serious} serious ARIA issues affecting accessibility`);
    }

    // Specific issue recommendations
    if (analysis.roleIssues > 0) {
      recommendations.push(`Fix ${analysis.roleIssues} invalid ARIA role(s) - use valid ARIA 1.2 roles`);
    }

    if (analysis.ariaLabelIssues > 0) {
      recommendations.push(`Resolve ${analysis.ariaLabelIssues} aria-labelledby reference(s) to non-existent elements`);
    }

    if (analysis.ariaDescribedByIssues > 0) {
      recommendations.push(`Fix ${analysis.ariaDescribedByIssues} aria-describedby reference(s) to missing elements`);
    }

    if (analysis.ariaRequiredIssues > 0) {
      recommendations.push(`Correct ${analysis.ariaRequiredIssues} aria-required attribute(s) - use "true" or "false"`);
    }

    // Landmark recommendations
    if (analysis.landmarkRoles.length === 0) {
      recommendations.push('Add ARIA landmarks (main, navigation, banner, contentinfo) for better structure');
    }

    // Enhancement suggestions
    if (!analysis.enhancedFeatures.modernAriaSupport && analysis.totalAriaElements > 5) {
      recommendations.push('Consider using modern ARIA 1.2 features like aria-current and aria-details');
    }

    // Score-based recommendations
    if (analysis.ariaScore < 70) {
      recommendations.push('ARIA implementation needs significant improvement - review all ARIA usage');
    } else if (analysis.ariaScore < 90) {
      recommendations.push('Good ARIA usage overall - address remaining minor issues for best practices');
    }

    return recommendations;
  }

  /**
   * Get default ARIA analysis in case of errors
   */
  private getDefaultAriaAnalysis(): AriaAnalysisResults {
    return {
      totalAriaElements: 0,
      validAriaUsage: 0,
      invalidAriaUsage: 0,
      ariaLabelIssues: 0,
      ariaDescribedByIssues: 0,
      ariaRequiredIssues: 0,
      ariaMultilineIssues: 0,
      roleIssues: 0,
      landmarkRoles: [],
      interactiveRoles: [],
      impactBreakdown: {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0
      },
      ariaScore: 0,
      enhancedFeatures: {
        permissiveAriaHandling: false,
        descendantLabeling: false,
        modernAriaSupport: false
      },
      recommendations: ['ARIA analysis unavailable - ensure page loads completely']
    };
  }

  /**
   * Get human-readable impact level description
   */
  getImpactDescription(level: AriaImpactLevel): string {
    const descriptions = {
      [AriaImpactLevel.CRITICAL]: 'Blocks access for users with disabilities',
      [AriaImpactLevel.SERIOUS]: 'Significantly affects accessibility',
      [AriaImpactLevel.MODERATE]: 'Some impact on accessibility',
      [AriaImpactLevel.MINOR]: 'Minor accessibility concern'
    };
    return descriptions[level];
  }

  /**
   * Check if page has comprehensive ARIA implementation
   */
  hasComprehensiveAria(analysis: AriaAnalysisResults): boolean {
    return analysis.ariaScore >= 90 && 
           analysis.landmarkRoles.length >= 3 &&
           analysis.impactBreakdown.critical === 0 &&
           analysis.impactBreakdown.serious === 0;
  }
}
