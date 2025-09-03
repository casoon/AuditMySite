import { Page, Browser, BrowserContext } from 'playwright';
import { AccessibilityResult, TestOptions } from '@core/types';
import { Chrome135Optimizer, PerformanceOptimizationResults } from '../performance/chrome135-optimizer';
import { Html5ElementsChecker, Html5ElementsAnalysis } from './html5-elements-checker';
import { AriaRulesAnalyzer, AriaAnalysisResults } from './aria-rules-analyzer';
import { WebVitalsCollector } from '@core/performance';

/**
 * Enhanced Test Options for v1.3
 */
export interface EnhancedTestOptions extends TestOptions {
  // New v1.3 features
  modernHtml5?: boolean;
  ariaEnhanced?: boolean;
  chrome135Features?: boolean;
  semanticAnalysis?: boolean;
  
  // Performance optimizations
  enableChrome135Optimizations?: boolean;
  optimizeAccessibilityTree?: boolean;
  enhancedDialogSupport?: boolean;
}

/**
 * Enhanced Accessibility Results for v1.3
 */
export interface EnhancedAccessibilityResult extends AccessibilityResult {
  // New v1.3 analysis results
  html5Analysis?: Html5ElementsAnalysis;
  ariaAnalysis?: AriaAnalysisResults;
  semanticScore?: number;
  
  // Performance optimization results
  chrome135Optimizations?: PerformanceOptimizationResults;
  
  // Enhanced recommendations
  enhancedRecommendations?: string[];
  modernFeaturesDetected?: string[];
  
  // Compliance levels
  complianceLevel?: 'basic' | 'enhanced' | 'comprehensive';
  futureReadiness?: number; // 0-100 score for modern web standards
}

/**
 * Enhanced Accessibility Checker with v1.3 Features
 * Integrates HTML5, ARIA, Chrome 135 optimizations, and semantic analysis
 */
export class EnhancedAccessibilityChecker {
  private chrome135Optimizer: Chrome135Optimizer;
  private html5Checker: Html5ElementsChecker;
  private ariaAnalyzer: AriaRulesAnalyzer;
  private webVitalsCollector: WebVitalsCollector;

  constructor() {
    this.chrome135Optimizer = new Chrome135Optimizer();
    this.html5Checker = new Html5ElementsChecker();
    this.ariaAnalyzer = new AriaRulesAnalyzer();
    this.webVitalsCollector = new WebVitalsCollector();
  }

  /**
   * Enhanced page testing with v1.3 features
   */
  async testPageEnhanced(
    page: Page,
    url: string,
    options: EnhancedTestOptions = {}
  ): Promise<EnhancedAccessibilityResult> {
    const startTime = Date.now();
    const result: EnhancedAccessibilityResult = {
      url,
      title: "",
      imagesWithoutAlt: 0,
      buttonsWithoutLabel: 0,
      headingsCount: 0,
      errors: [],
      warnings: [],
      passed: true,
      duration: 0,
      enhancedRecommendations: [],
      modernFeaturesDetected: [],
      complianceLevel: 'basic',
      futureReadiness: 0
    };

    try {
      // Apply Chrome 135 optimizations if enabled
      if (options.chrome135Features && options.enableChrome135Optimizations) {
        await this.chrome135Optimizer.optimizePage(page);
        result.chrome135Optimizations = await this.chrome135Optimizer.generateOptimizationReport(page);
      }

      // Navigate to page
      await page.goto(url, {
        waitUntil: options.waitUntil || 'domcontentloaded',
        timeout: options.timeout || 30000,
      });

      // Wait for dynamic content
      if (options.wait) {
        await page.waitForTimeout(options.wait);
      }

      // Basic accessibility checks
      result.title = await page.title();
      result.imagesWithoutAlt = await page.locator('img:not([alt])').count();
      result.buttonsWithoutLabel = await page.locator('button:not([aria-label])').filter({ hasText: '' }).count();
      result.headingsCount = await page.locator('h1, h2, h3, h4, h5, h6').count();

      // Enhanced HTML5 Analysis
      if (options.modernHtml5) {
        try {
          result.html5Analysis = await this.html5Checker.analyzeHtml5Elements(page);
          
          if (result.html5Analysis.modernHtml5Usage) {
            result.modernFeaturesDetected?.push('Modern HTML5 Elements');
          }
          
          // Add HTML5 specific errors/warnings
          if (result.html5Analysis.summaryWithoutName > 0) {
            result.errors.push(`${result.html5Analysis.summaryWithoutName} <summary> elements lack accessible names`);
          }
          
          result.html5Analysis.dialogAccessibilityIssues.forEach(issue => {
            result.warnings.push(issue);
          });
          
        } catch (error) {
          result.warnings.push('HTML5 analysis failed: ' + String(error));
        }
      }

      // Enhanced ARIA Analysis
      if (options.ariaEnhanced) {
        try {
          result.ariaAnalysis = await this.ariaAnalyzer.analyzeAriaUsage(page);
          
          // Add ARIA-specific errors/warnings based on impact
          if (result.ariaAnalysis.impactBreakdown.critical > 0) {
            result.errors.push(`${result.ariaAnalysis.impactBreakdown.critical} critical ARIA issues found`);
          }
          
          if (result.ariaAnalysis.impactBreakdown.serious > 0) {
            result.errors.push(`${result.ariaAnalysis.impactBreakdown.serious} serious ARIA issues found`);
          }
          
          if (result.ariaAnalysis.impactBreakdown.moderate > 0) {
            result.warnings.push(`${result.ariaAnalysis.impactBreakdown.moderate} moderate ARIA issues found`);
          }
          
          if (result.ariaAnalysis.enhancedFeatures.modernAriaSupport) {
            result.modernFeaturesDetected?.push('Modern ARIA Features');
          }
          
        } catch (error) {
          result.warnings.push('ARIA analysis failed: ' + String(error));
        }
      }

      // Semantic Analysis and Scoring
      if (options.semanticAnalysis) {
        result.semanticScore = await this.calculateSemanticScore(result);
        result.complianceLevel = this.determineComplianceLevel(result);
        result.futureReadiness = this.calculateFutureReadiness(result);
      }

      // Performance Metrics Collection
      if (options.collectPerformanceMetrics) {
        try {
          const performanceResults = await this.webVitalsCollector.collectMetrics(page);
          result.performanceResults = performanceResults;
          
          if (performanceResults.score >= 75) {
            result.modernFeaturesDetected?.push('Good Performance Metrics');
          }
        } catch (error) {
          result.warnings.push('Performance metrics collection failed: ' + String(error));
        }
      }

      // Generate Enhanced Recommendations
      result.enhancedRecommendations = this.generateEnhancedRecommendations(result, options);

      // Basic error checks for overall pass/fail
      if (result.errors.length > 0) {
        result.passed = false;
      }

      if (result.headingsCount === 0) {
        result.errors.push('No headings found - page lacks proper structure');
        result.passed = false;
      }

    } catch (error) {
      result.errors.push(`Enhanced accessibility test failed: ${String(error)}`);
      result.passed = false;
    } finally {
      result.duration = Date.now() - startTime;
    }

    return result;
  }

  /**
   * Calculate semantic score based on all analysis results
   */
  private async calculateSemanticScore(result: EnhancedAccessibilityResult): Promise<number> {
    let score = 0;
    let maxScore = 0;

    // Base semantic score from structure
    maxScore += 25;
    if (result.headingsCount > 0) score += 15;
    if (result.headingsCount >= 3) score += 10; // Good heading hierarchy

    // HTML5 semantic contribution
    if (result.html5Analysis) {
      maxScore += 25;
      score += (result.html5Analysis.semanticStructureScore / 100) * 25;
    }

    // ARIA contribution
    if (result.ariaAnalysis) {
      maxScore += 25;
      score += (result.ariaAnalysis.ariaScore / 100) * 25;
    }

    // Modern features bonus
    if (result.modernFeaturesDetected && result.modernFeaturesDetected.length > 0) {
      maxScore += 15;
      score += Math.min(result.modernFeaturesDetected.length * 5, 15);
    }

    // Performance contribution
    if (result.performanceResults) {
      maxScore += 10;
      score += (result.performanceResults.score / 100) * 10;
    }

    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  }

  /**
   * Determine compliance level based on analysis
   */
  private determineComplianceLevel(result: EnhancedAccessibilityResult): 'basic' | 'enhanced' | 'comprehensive' {
    const hasModernFeatures = (result.modernFeaturesDetected?.length || 0) > 0;
    const hasGoodSemantics = (result.semanticScore || 0) >= 70;
    const hasLowErrorCount = result.errors.length <= 2;
    const hasAriaOptimization = result.ariaAnalysis && result.ariaAnalysis.ariaScore >= 80;
    const hasHtml5Optimization = result.html5Analysis && result.html5Analysis.semanticStructureScore >= 70;

    if (hasModernFeatures && hasGoodSemantics && hasLowErrorCount && hasAriaOptimization && hasHtml5Optimization) {
      return 'comprehensive';
    } else if (hasGoodSemantics && hasLowErrorCount && (hasAriaOptimization || hasHtml5Optimization)) {
      return 'enhanced';
    } else {
      return 'basic';
    }
  }

  /**
   * Calculate future readiness score
   */
  private calculateFutureReadiness(result: EnhancedAccessibilityResult): number {
    let score = 0;

    // Modern HTML5 usage
    if (result.html5Analysis?.modernHtml5Usage) score += 25;
    if (result.html5Analysis && result.html5Analysis.semanticStructureScore >= 80) score += 15;

    // ARIA modern features
    if (result.ariaAnalysis?.enhancedFeatures.modernAriaSupport) score += 20;
    if (result.ariaAnalysis?.enhancedFeatures.descendantLabeling) score += 10;

    // Chrome 135 compatibility
    if (result.chrome135Optimizations?.chrome135Features.enhancedAccessibilityTree) score += 15;
    if (result.chrome135Optimizations?.chrome135Features.improvedDialogSupport) score += 10;

    // Performance readiness
    if (result.performanceResults && result.performanceResults.score >= 75) score += 5;

    return Math.min(score, 100);
  }

  /**
   * Generate enhanced recommendations based on all analysis
   */
  private generateEnhancedRecommendations(
    result: EnhancedAccessibilityResult,
    options: EnhancedTestOptions
  ): string[] {
    const recommendations: string[] = [];

    // Basic accessibility recommendations
    if (result.imagesWithoutAlt > 0) {
      recommendations.push(`Add alt attributes to ${result.imagesWithoutAlt} images`);
    }

    if (result.buttonsWithoutLabel > 0) {
      recommendations.push(`Add aria-label to ${result.buttonsWithoutLabel} buttons without text`);
    }

    if (result.headingsCount === 0) {
      recommendations.push('Add heading structure (h1-h6) for better document outline');
    }

    // HTML5 recommendations
    if (result.html5Analysis) {
      recommendations.push(...result.html5Analysis.recommendations);
    }

    // ARIA recommendations
    if (result.ariaAnalysis) {
      recommendations.push(...result.ariaAnalysis.recommendations);
    }

    // Chrome 135 optimization recommendations
    if (result.chrome135Optimizations) {
      recommendations.push(...result.chrome135Optimizations.recommendations);
    }

    // Future readiness recommendations
    if ((result.futureReadiness || 0) < 70) {
      recommendations.push('Consider upgrading to modern HTML5 and ARIA patterns for better future compatibility');
    }

    // Performance recommendations
    if (result.performanceResults && result.performanceResults.score < 75) {
      recommendations.push('Improve Core Web Vitals for better user experience and accessibility');
    }

    // Compliance level recommendations
    if (result.complianceLevel === 'basic') {
      recommendations.push('Implement enhanced accessibility features to reach higher compliance levels');
    }

    return recommendations.slice(0, 10); // Limit to top 10 recommendations
  }

  /**
   * Apply browser context optimizations
   */
  async optimizeBrowserContext(context: BrowserContext, options: EnhancedTestOptions): Promise<void> {
    if (options.chrome135Features && options.enableChrome135Optimizations) {
      await this.chrome135Optimizer.optimizeBrowserContext(context);
    }
  }

  /**
   * Check Chrome 135 compatibility
   */
  async isChrome135Compatible(browser: Browser): Promise<boolean> {
    return this.chrome135Optimizer.isChrome135Compatible(browser);
  }

  /**
   * Get optimization summary
   */
  getOptimizationsSummary(): string[] {
    return this.chrome135Optimizer.getOptimizationsSummary();
  }

  /**
   * Generate comprehensive accessibility report
   */
  generateComprehensiveReport(result: EnhancedAccessibilityResult): string {
    const sections = [];
    
    sections.push(`🎯 Enhanced Accessibility Report for ${result.url}`);
    sections.push(`📊 Overall Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
    sections.push(`⭐ Compliance Level: ${result.complianceLevel?.toUpperCase()}`);
    sections.push(`🚀 Future Readiness: ${result.futureReadiness || 0}%`);
    
    if (result.semanticScore !== undefined) {
      sections.push(`📋 Semantic Score: ${result.semanticScore}%`);
    }
    
    if (result.modernFeaturesDetected?.length) {
      sections.push(`🔥 Modern Features: ${result.modernFeaturesDetected.join(', ')}`);
    }
    
    if (result.errors.length > 0) {
      sections.push(`\n❌ Errors (${result.errors.length}):`);
      result.errors.forEach(error => sections.push(`  • ${error}`));
    }
    
    if (result.warnings.length > 0) {
      sections.push(`\n⚠️  Warnings (${result.warnings.length}):`);
      result.warnings.slice(0, 5).forEach(warning => sections.push(`  • ${warning}`));
      if (result.warnings.length > 5) {
        sections.push(`  • ... and ${result.warnings.length - 5} more warnings`);
      }
    }
    
    if (result.enhancedRecommendations?.length) {
      sections.push(`\n💡 Priority Recommendations:`);
      result.enhancedRecommendations.slice(0, 5).forEach(rec => sections.push(`  • ${rec}`));
    }
    
    return sections.join('\n');
  }

  /**
   * Reset optimizer state
   */
  reset(): void {
    this.chrome135Optimizer.reset();
  }
}
