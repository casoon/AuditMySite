import { TestSummary, AccessibilityResult } from '../types';

export interface JsonExportOptions {
  includeDetails?: boolean;
  includeRawData?: boolean;
  pretty?: boolean;
}

export class JsonGenerator {
  /**
   * Generiert JSON-Export für Test-Ergebnisse
   */
  generateJson(summary: TestSummary, options: JsonExportOptions = {}): string {
    const exportData = {
      metadata: {
        generatedAt: new Date().toISOString(),
        tool: 'auditmysite',
        version: '1.0.1',
        summary: {
          totalPages: summary.totalPages,
          testedPages: summary.testedPages,
          passedPages: summary.passedPages,
          failedPages: summary.failedPages,
          totalErrors: summary.totalErrors,
          totalWarnings: summary.totalWarnings,
          totalDuration: summary.totalDuration,
          successRate: summary.testedPages > 0 ? (summary.passedPages / summary.testedPages * 100) : 0
        }
      },
      results: this.processResults(summary.results, options),
      statistics: this.generateStatistics(summary.results),
      recommendations: this.generateRecommendations(summary.results)
    };

    return options.pretty !== false 
      ? JSON.stringify(exportData, null, 2)
      : JSON.stringify(exportData);
  }

  /**
   * Verarbeitet Test-Ergebnisse für JSON-Export
   */
  private processResults(results: AccessibilityResult[], options: JsonExportOptions): any[] {
    return results.map(result => {
      const processedResult: any = {
        url: result.url,
        title: result.title,
        passed: result.passed,
        duration: result.duration,
        errorCount: result.errors.length,
        warningCount: result.warnings.length,
        imagesWithoutAlt: result.imagesWithoutAlt,
        buttonsWithoutLabel: result.buttonsWithoutLabel,
        headingsCount: result.headingsCount
      };

      if (options.includeDetails) {
        processedResult.errors = result.errors;
        processedResult.warnings = result.warnings;
        
        if (result.pa11yIssues) {
          processedResult.pa11yIssues = result.pa11yIssues;
        }
        
        if (result.pa11yScore) {
          processedResult.pa11yScore = result.pa11yScore;
        }
        
        if (result.performanceMetrics) {
          processedResult.performanceMetrics = result.performanceMetrics;
        }
        
        if (result.lighthouseScores) {
          processedResult.lighthouseScores = result.lighthouseScores;
        }
        
        if (result.lighthouseMetrics) {
          processedResult.lighthouseMetrics = result.lighthouseMetrics;
        }
      }

      return processedResult;
    });
  }

  /**
   * Generiert Statistiken für JSON-Export
   */
  private generateStatistics(results: AccessibilityResult[]): any {
    const errorTypes = new Map<string, number>();
    const warningTypes = new Map<string, number>();
    const urlsByStatus = {
      passed: 0,
      failed: 0
    };

    results.forEach(result => {
      // Count URLs by status
      if (result.passed) {
        urlsByStatus.passed++;
      } else {
        urlsByStatus.failed++;
      }

          // Count error types
    result.errors.forEach(error => {
      const key = this.extractErrorType(error);
      errorTypes.set(key, (errorTypes.get(key) || 0) + 1);
    });

    // Count warning types
    result.warnings.forEach(warning => {
      const key = this.extractErrorType(warning);
      warningTypes.set(key, (warningTypes.get(key) || 0) + 1);
    });
    });

    return {
      urlsByStatus,
      errorTypes: Object.fromEntries(errorTypes),
      warningTypes: Object.fromEntries(warningTypes),
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
      averageDuration: results.length > 0 
        ? results.reduce((sum, r) => sum + r.duration, 0) / results.length 
        : 0
    };
  }

  /**
   * Generiert Empfehlungen basierend auf Ergebnissen
   */
  private generateRecommendations(results: AccessibilityResult[]): any[] {
    const recommendations: any[] = [];
    const errorTypes = new Map<string, number>();

    // Sammle alle Fehler-Typen (basierend auf Error-Messages)
    results.forEach(result => {
      result.errors.forEach(error => {
        // Extrahiere Fehler-Typ aus Error-Message
        const key = this.extractErrorType(error);
        errorTypes.set(key, (errorTypes.get(key) || 0) + 1);
      });
    });

    // Generiere Empfehlungen basierend auf häufigen Fehlern
    if (errorTypes.get('missing-alt-text') || errorTypes.get('alt-text')) {
      recommendations.push({
        priority: 'high',
        category: 'images',
        title: 'Add Alt Text to Images',
        description: 'Images without alt text are not accessible to screen readers',
        count: (errorTypes.get('missing-alt-text') || 0) + (errorTypes.get('alt-text') || 0),
        impact: 'critical',
        effort: 'low',
        examples: ['Add alt="description" to <img> elements']
      });
    }

    if (errorTypes.get('color-contrast') || errorTypes.get('contrast')) {
      recommendations.push({
        priority: 'high',
        category: 'visual',
        title: 'Improve Color Contrast',
        description: 'Text with insufficient color contrast is difficult to read',
        count: (errorTypes.get('color-contrast') || 0) + (errorTypes.get('contrast') || 0),
        impact: 'high',
        effort: 'medium',
        examples: ['Increase contrast ratio to at least 4.5:1 for normal text']
      });
    }

    if (errorTypes.get('missing-labels') || errorTypes.get('form-labels')) {
      recommendations.push({
        priority: 'high',
        category: 'forms',
        title: 'Add Labels to Form Elements',
        description: 'Form elements without labels are not accessible',
        count: (errorTypes.get('missing-labels') || 0) + (errorTypes.get('form-labels') || 0),
        impact: 'critical',
        effort: 'low',
        examples: ['Add <label> elements for all form inputs']
      });
    }

    if (errorTypes.get('heading-structure') || errorTypes.get('headings')) {
      recommendations.push({
        priority: 'medium',
        category: 'structure',
        title: 'Fix Heading Structure',
        description: 'Improper heading hierarchy makes navigation difficult',
        count: (errorTypes.get('heading-structure') || 0) + (errorTypes.get('headings') || 0),
        impact: 'medium',
        effort: 'medium',
        examples: ['Use proper heading hierarchy (h1, h2, h3, etc.)']
      });
    }

    if (errorTypes.get('aria-labels') || errorTypes.get('aria')) {
      recommendations.push({
        priority: 'medium',
        category: 'aria',
        title: 'Add ARIA Labels',
        description: 'Interactive elements need proper ARIA labels',
        count: (errorTypes.get('aria-labels') || 0) + (errorTypes.get('aria') || 0),
        impact: 'medium',
        effort: 'low',
        examples: ['Add aria-label or aria-labelledby to interactive elements']
      });
    }

    return recommendations;
  }

  /**
   * Extrahiert Fehler-Typ aus Error-Message
   */
  private extractErrorType(errorMessage: string): string {
    const lowerMessage = errorMessage.toLowerCase();
    
    if (lowerMessage.includes('alt') || lowerMessage.includes('image')) {
      return 'missing-alt-text';
    }
    if (lowerMessage.includes('contrast') || lowerMessage.includes('color')) {
      return 'color-contrast';
    }
    if (lowerMessage.includes('label') || lowerMessage.includes('form')) {
      return 'missing-labels';
    }
    if (lowerMessage.includes('heading') || lowerMessage.includes('h1') || lowerMessage.includes('h2')) {
      return 'heading-structure';
    }
    if (lowerMessage.includes('aria') || lowerMessage.includes('role')) {
      return 'aria-labels';
    }
    if (lowerMessage.includes('button') || lowerMessage.includes('link')) {
      return 'interactive-elements';
    }
    if (lowerMessage.includes('table') || lowerMessage.includes('list')) {
      return 'structure';
    }
    
    return 'other';
  }

  /**
   * Speichert JSON-Export in Datei
   */
  async saveToFile(summary: TestSummary, filePath: string, options: JsonExportOptions = {}): Promise<void> {
    const fs = require('fs').promises;
    const jsonContent = this.generateJson(summary, options);
    await fs.writeFile(filePath, jsonContent, 'utf8');
  }
} 