import { ReportGenerator } from './report-generator';
import { Html5ElementsAnalysis } from '../accessibility/html5-elements-checker';
import { AriaAnalysisResults } from '../accessibility/aria-rules-analyzer';

/**
 * Enhanced Report Summary with v1.3 Features
 */
export interface EnhancedReportSummary {
  // Existing fields
  testedPages: number;
  passedPages: number;
  failedPages: number;
  totalErrors: number;
  totalWarnings: number;
  avgAccessibilityScore: number;
  avgPerformanceScore: number;
  
  // New v1.3 Enhanced Fields
  html5Analysis: {
    totalModernElements: number;
    semanticStructureScore: number;
    detailsSummaryIssues: number;
    dialogAccessibilityIssues: number;
    modernUsagePercentage: number;
  };
  
  ariaAnalysis: {
    totalAriaElements: number;
    ariaScore: number;
    criticalIssues: number;
    seriousIssues: number;
    moderateIssues: number;
    minorIssues: number;
    landmarkUsage: string[];
    modernAriaFeatures: boolean;
  };
  
  chrome135Features: {
    performanceOptimizations: boolean;
    enhancedDialogSupport: boolean;
    improvedAccessibilityTree: boolean;
  };
  
  semanticQuality: {
    overallSemanticScore: number;
    structuralComplexity: 'basic' | 'intermediate' | 'advanced';
    recommendationsCount: number;
    bestPracticesFollowed: number;
  };
}

/**
 * Enhanced Report Data for v1.3
 */
export interface EnhancedReportData {
  summary: EnhancedReportSummary;
  pages: Array<{
    url: string;
    accessibilityResults: any;
    performanceResults: any;
    html5Analysis?: Html5ElementsAnalysis;
    ariaAnalysis?: AriaAnalysisResults;
    semanticScore?: number;
    recommendations?: string[];
  }>;
  timestamp: string;
  auditMySiteVersion: string;
  enhancedFeaturesEnabled: {
    modernHtml5: boolean;
    ariaEnhanced: boolean;
    chrome135Features: boolean;
    semanticAnalysis: boolean;
  };
}

/**
 * Enhanced Report Generator with HTML5 and ARIA Analysis
 */
export class EnhancedReportGenerator extends ReportGenerator {

  /**
   * Generate enhanced HTML report with new v1.3 sections
   */
  async generateEnhancedHtmlReport(data: EnhancedReportData, outputPath: string): Promise<string> {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuditMySite Enhanced Report - ${new Date().toLocaleDateString()}</title>
    <style>
        ${this.getEnhancedReportStyles()}
    </style>
</head>
<body>
    <div class="container">
        ${this.generateEnhancedHeader(data)}
        ${this.generateExecutiveSummary(data)}
        ${this.generateHtml5AnalysisSection(data)}
        ${this.generateAriaAnalysisSection(data)}
        ${this.generateSemanticQualitySection(data)}
        ${this.generatePerformanceSection(data)}
        ${this.generateDetailedResults(data)}
        ${this.generateRecommendationsSection(data)}
        ${this.generateFooter(data)}
    </div>
    
    <script>
        ${this.getEnhancedReportScripts()}
    </script>
</body>
</html>`;

    await this.writeReportFile(outputPath, html);
    return outputPath;
  }

  /**
   * Generate enhanced header with feature badges
   */
  private generateEnhancedHeader(data: EnhancedReportData): string {
    const featuresEnabled = data.enhancedFeaturesEnabled;
    const badges = [];
    
    if (featuresEnabled.modernHtml5) badges.push('<span class="feature-badge html5">HTML5 Enhanced</span>');
    if (featuresEnabled.ariaEnhanced) badges.push('<span class="feature-badge aria">ARIA Enhanced</span>');
    if (featuresEnabled.chrome135Features) badges.push('<span class="feature-badge chrome">Chrome 135</span>');
    if (featuresEnabled.semanticAnalysis) badges.push('<span class="feature-badge semantic">Semantic Analysis</span>');

    return `
    <header class="report-header">
        <div class="header-content">
            <h1>🎯 AuditMySite Enhanced Report</h1>
            <div class="report-meta">
                <span class="version">v${data.auditMySiteVersion}</span>
                <span class="timestamp">${new Date(data.timestamp).toLocaleString()}</span>
            </div>
            <div class="feature-badges">
                ${badges.join('')}
            </div>
        </div>
        
        <div class="summary-cards">
            <div class="summary-card ${this.getScoreClass(data.summary.avgAccessibilityScore)}">
                <h3>Accessibility Score</h3>
                <div class="score">${Math.round(data.summary.avgAccessibilityScore)}%</div>
                <div class="subtitle">${data.summary.passedPages}/${data.summary.testedPages} pages passed</div>
            </div>
            
            <div class="summary-card ${this.getScoreClass(data.summary.html5Analysis.semanticStructureScore)}">
                <h3>HTML5 Semantic</h3>
                <div class="score">${Math.round(data.summary.html5Analysis.semanticStructureScore)}%</div>
                <div class="subtitle">${data.summary.html5Analysis.modernUsagePercentage}% modern usage</div>
            </div>
            
            <div class="summary-card ${this.getScoreClass(data.summary.ariaAnalysis.ariaScore)}">
                <h3>ARIA Quality</h3>
                <div class="score">${Math.round(data.summary.ariaAnalysis.ariaScore)}%</div>
                <div class="subtitle">${data.summary.ariaAnalysis.criticalIssues + data.summary.ariaAnalysis.seriousIssues} high impact issues</div>
            </div>
            
            <div class="summary-card ${this.getScoreClass(data.summary.semanticQuality.overallSemanticScore)}">
                <h3>Semantic Quality</h3>
                <div class="score">${Math.round(data.summary.semanticQuality.overallSemanticScore)}%</div>
                <div class="subtitle">${data.summary.semanticQuality.structuralComplexity} complexity</div>
            </div>
        </div>
    </header>`;
  }

  /**
   * Generate HTML5 analysis section
   */
  private generateHtml5AnalysisSection(data: EnhancedReportData): string {
    const html5 = data.summary.html5Analysis;
    
    return `
    <section class="analysis-section html5-section">
        <h2>🔥 Modern HTML5 Elements Analysis</h2>
        <p class="section-description">Enhanced analysis of modern HTML5 elements using axe-core v4.10 rules</p>
        
        <div class="analysis-grid">
            <div class="analysis-card">
                <h3>Element Usage</h3>
                <div class="metric-row">
                    <span>Total Modern Elements:</span>
                    <strong>${html5.totalModernElements}</strong>
                </div>
                <div class="metric-row">
                    <span>Details/Summary Issues:</span>
                    <strong class="${html5.detailsSummaryIssues > 0 ? 'error' : 'success'}">${html5.detailsSummaryIssues}</strong>
                </div>
                <div class="metric-row">
                    <span>Dialog Accessibility Issues:</span>
                    <strong class="${html5.dialogAccessibilityIssues > 0 ? 'error' : 'success'}">${html5.dialogAccessibilityIssues}</strong>
                </div>
            </div>
            
            <div class="analysis-card">
                <h3>Semantic Structure</h3>
                <div class="score-circle">
                    <div class="score-value">${Math.round(html5.semanticStructureScore)}%</div>
                </div>
                <p>Modern HTML5 usage: <strong>${html5.modernUsagePercentage}%</strong> of pages</p>
            </div>
        </div>
        
        <div class="recommendations-preview">
            <h3>Key HTML5 Recommendations</h3>
            ${this.generateHtml5Recommendations(data)}
        </div>
    </section>`;
  }

  /**
   * Generate ARIA analysis section
   */
  private generateAriaAnalysisSection(data: EnhancedReportData): string {
    const aria = data.summary.ariaAnalysis;
    
    return `
    <section class="analysis-section aria-section">
        <h2>⚡ Enhanced ARIA Analysis</h2>
        <p class="section-description">Comprehensive ARIA analysis with impact scoring and modern features</p>
        
        <div class="analysis-grid">
            <div class="analysis-card">
                <h3>ARIA Usage</h3>
                <div class="metric-row">
                    <span>Total ARIA Elements:</span>
                    <strong>${aria.totalAriaElements}</strong>
                </div>
                <div class="metric-row">
                    <span>Landmark Roles:</span>
                    <strong>${aria.landmarkUsage.length}</strong>
                    <span class="detail">(${aria.landmarkUsage.join(', ')})</span>
                </div>
                <div class="metric-row">
                    <span>Modern ARIA Features:</span>
                    <strong class="${aria.modernAriaFeatures ? 'success' : 'warning'}">
                        ${aria.modernAriaFeatures ? 'Detected' : 'Not Used'}
                    </strong>
                </div>
            </div>
            
            <div class="analysis-card">
                <h3>Impact Analysis</h3>
                <div class="impact-breakdown">
                    <div class="impact-item critical">
                        <span>Critical</span>
                        <strong>${aria.criticalIssues}</strong>
                    </div>
                    <div class="impact-item serious">
                        <span>Serious</span>
                        <strong>${aria.seriousIssues}</strong>
                    </div>
                    <div class="impact-item moderate">
                        <span>Moderate</span>
                        <strong>${aria.moderateIssues}</strong>
                    </div>
                    <div class="impact-item minor">
                        <span>Minor</span>
                        <strong>${aria.minorIssues}</strong>
                    </div>
                </div>
            </div>
            
            <div class="analysis-card">
                <h3>ARIA Quality Score</h3>
                <div class="score-circle">
                    <div class="score-value">${Math.round(aria.ariaScore)}%</div>
                </div>
                <p>${this.getAriaQualityDescription(aria.ariaScore)}</p>
            </div>
        </div>
    </section>`;
  }

  /**
   * Generate semantic quality section
   */
  private generateSemanticQualitySection(data: EnhancedReportData): string {
    const semantic = data.summary.semanticQuality;
    
    return `
    <section class="analysis-section semantic-section">
        <h2>📊 Semantic Quality Analysis</h2>
        <p class="section-description">Overall semantic structure and modern web standards compliance</p>
        
        <div class="analysis-grid">
            <div class="analysis-card">
                <h3>Overall Quality</h3>
                <div class="score-circle large">
                    <div class="score-value">${Math.round(semantic.overallSemanticScore)}%</div>
                    <div class="score-label">Semantic Score</div>
                </div>
            </div>
            
            <div class="analysis-card">
                <h3>Structure Analysis</h3>
                <div class="metric-row">
                    <span>Complexity Level:</span>
                    <strong class="complexity-${semantic.structuralComplexity}">${semantic.structuralComplexity.toUpperCase()}</strong>
                </div>
                <div class="metric-row">
                    <span>Best Practices Followed:</span>
                    <strong>${semantic.bestPracticesFollowed}</strong>
                </div>
                <div class="metric-row">
                    <span>Recommendations:</span>
                    <strong>${semantic.recommendationsCount}</strong>
                </div>
            </div>
        </div>
    </section>`;
  }

  /**
   * Generate detailed results with enhanced features
   */
  private generateDetailedResults(data: EnhancedReportData): string {
    let resultsHtml = '<section class="detailed-results"><h2>📋 Detailed Page Results</h2>';
    
    data.pages.forEach((page, index) => {
      resultsHtml += `
      <div class="page-result" id="page-${index}">
        <div class="page-header">
          <h3>${page.url}</h3>
          <div class="page-scores">
            <span class="score accessibility ${this.getScoreClass(page.accessibilityResults?.score || 0)}">
              A11Y: ${Math.round(page.accessibilityResults?.score || 0)}%
            </span>
            ${page.performanceResults ? `
            <span class="score performance ${this.getScoreClass(page.performanceResults.score)}">
              Perf: ${Math.round(page.performanceResults.score)}%
            </span>` : ''}
            ${page.semanticScore ? `
            <span class="score semantic ${this.getScoreClass(page.semanticScore)}">
              Semantic: ${Math.round(page.semanticScore)}%
            </span>` : ''}
          </div>
        </div>
        
        ${this.generatePageEnhancedAnalysis(page)}
      </div>`;
    });
    
    resultsHtml += '</section>';
    return resultsHtml;
  }

  /**
   * Generate enhanced analysis for individual page
   */
  private generatePageEnhancedAnalysis(page: any): string {
    let analysisHtml = '<div class="page-analysis">';
    
    // HTML5 Analysis
    if (page.html5Analysis) {
      analysisHtml += `
      <div class="analysis-subsection">
        <h4>🔥 HTML5 Elements</h4>
        <div class="metrics-grid">
          <div class="metric">
            <span>Modern Elements:</span>
            <strong>${Object.values(page.html5Analysis.elementBreakdown).reduce((a: number, b: number) => a + b, 0)}</strong>
          </div>
          <div class="metric">
            <span>Semantic Score:</span>
            <strong class="${this.getScoreClass(page.html5Analysis.semanticStructureScore)}">${page.html5Analysis.semanticStructureScore}%</strong>
          </div>
          <div class="metric">
            <span>Details/Summary Issues:</span>
            <strong class="${page.html5Analysis.summaryWithoutName > 0 ? 'error' : 'success'}">${page.html5Analysis.summaryWithoutName}</strong>
          </div>
        </div>
      </div>`;
    }
    
    // ARIA Analysis
    if (page.ariaAnalysis) {
      analysisHtml += `
      <div class="analysis-subsection">
        <h4>⚡ ARIA Analysis</h4>
        <div class="metrics-grid">
          <div class="metric">
            <span>ARIA Elements:</span>
            <strong>${page.ariaAnalysis.totalAriaElements}</strong>
          </div>
          <div class="metric">
            <span>ARIA Score:</span>
            <strong class="${this.getScoreClass(page.ariaAnalysis.ariaScore)}">${page.ariaAnalysis.ariaScore}%</strong>
          </div>
          <div class="metric">
            <span>Critical Issues:</span>
            <strong class="${page.ariaAnalysis.impactBreakdown.critical > 0 ? 'error' : 'success'}">${page.ariaAnalysis.impactBreakdown.critical}</strong>
          </div>
        </div>
        
        <div class="impact-summary">
          <span class="impact critical">Critical: ${page.ariaAnalysis.impactBreakdown.critical}</span>
          <span class="impact serious">Serious: ${page.ariaAnalysis.impactBreakdown.serious}</span>
          <span class="impact moderate">Moderate: ${page.ariaAnalysis.impactBreakdown.moderate}</span>
          <span class="impact minor">Minor: ${page.ariaAnalysis.impactBreakdown.minor}</span>
        </div>
      </div>`;
    }
    
    // Recommendations
    if (page.recommendations && page.recommendations.length > 0) {
      analysisHtml += `
      <div class="analysis-subsection">
        <h4>💡 Recommendations</h4>
        <ul class="recommendations-list">
          ${page.recommendations.slice(0, 5).map(rec => `<li>${rec}</li>`).join('')}
          ${page.recommendations.length > 5 ? `<li class="more-recommendations">... and ${page.recommendations.length - 5} more</li>` : ''}
        </ul>
      </div>`;
    }
    
    analysisHtml += '</div>';
    return analysisHtml;
  }

  /**
   * Generate enhanced CSS styles
   */
  private getEnhancedReportStyles(): string {
    return `
    :root {
      --color-primary: #007cba;
      --color-success: #28a745;
      --color-warning: #ffc107;
      --color-danger: #dc3545;
      --color-info: #17a2b8;
      --color-html5: #e34f26;
      --color-aria: #6f42c1;
      --color-chrome: #4285f4;
      --color-semantic: #20c997;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .report-header {
      background: linear-gradient(135deg, var(--color-primary), #005a87);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .header-content h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .report-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      opacity: 0.9;
    }
    
    .feature-badges {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .feature-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .feature-badge.html5 { background: var(--color-html5); }
    .feature-badge.aria { background: var(--color-aria); }
    .feature-badge.chrome { background: var(--color-chrome); }
    .feature-badge.semantic { background: var(--color-semantic); }
    
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .summary-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-left: 4px solid var(--color-primary);
    }
    
    .summary-card h3 {
      color: #666;
      font-size: 1rem;
      margin-bottom: 10px;
    }
    
    .summary-card .score {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .summary-card .subtitle {
      color: #888;
      font-size: 0.9rem;
    }
    
    .analysis-section {
      background: white;
      margin-bottom: 30px;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .analysis-section h2 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      color: #333;
    }
    
    .section-description {
      color: #666;
      margin-bottom: 25px;
      font-size: 1.1rem;
    }
    
    .analysis-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 25px;
    }
    
    .analysis-card {
      padding: 20px;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      background: #fafafa;
    }
    
    .analysis-card h3 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.2rem;
    }
    
    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .metric-row:last-child {
      border-bottom: none;
    }
    
    .score-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: conic-gradient(var(--color-primary) 0deg 252deg, #e9ecef 252deg 360deg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      position: relative;
    }
    
    .score-circle.large {
      width: 120px;
      height: 120px;
    }
    
    .score-circle .score-value {
      background: white;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      color: var(--color-primary);
      flex-direction: column;
    }
    
    .score-circle.large .score-value {
      width: 90px;
      height: 90px;
      font-size: 1.5rem;
    }
    
    .score-label {
      font-size: 0.7rem;
      margin-top: 2px;
    }
    
    .impact-breakdown {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .impact-item {
      padding: 12px;
      border-radius: 6px;
      text-align: center;
      font-weight: 600;
    }
    
    .impact-item.critical { background: #f8d7da; color: #721c24; }
    .impact-item.serious { background: #fff3cd; color: #856404; }
    .impact-item.moderate { background: #d1ecf1; color: #0c5460; }
    .impact-item.minor { background: #d4edda; color: #155724; }
    
    .page-result {
      background: white;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .page-header {
      background: #f8f9fa;
      padding: 20px;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .page-header h3 {
      color: #333;
      font-size: 1.1rem;
      word-break: break-all;
    }
    
    .page-scores {
      display: flex;
      gap: 10px;
    }
    
    .score {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      color: white;
    }
    
    .excellent { background: var(--color-success); }
    .good { background: #28a745; }
    .fair { background: var(--color-warning); }
    .poor { background: var(--color-danger); }
    
    .success { color: var(--color-success); }
    .warning { color: var(--color-warning); }
    .error { color: var(--color-danger); }
    
    .page-analysis {
      padding: 20px;
    }
    
    .analysis-subsection {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .analysis-subsection:last-child {
      border-bottom: none;
    }
    
    .analysis-subsection h4 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .metric {
      text-align: center;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 6px;
    }
    
    .impact-summary {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .impact {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .recommendations-list {
      list-style: none;
    }
    
    .recommendations-list li {
      padding: 8px 12px;
      margin-bottom: 8px;
      background: #e3f2fd;
      border-left: 4px solid var(--color-info);
      border-radius: 4px;
    }
    
    .more-recommendations {
      font-style: italic;
      color: #666;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 15px;
      }
      
      .header-content h1 {
        font-size: 2rem;
      }
      
      .summary-cards {
        grid-template-columns: 1fr;
      }
      
      .analysis-grid {
        grid-template-columns: 1fr;
      }
      
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
    }`;
  }

  /**
   * Generate enhanced JavaScript for interactive features
   */
  private getEnhancedReportScripts(): string {
    return `
    // Enhanced interactivity
    document.addEventListener('DOMContentLoaded', function() {
      // Add click handlers for expandable sections
      document.querySelectorAll('.analysis-card').forEach(card => {
        card.addEventListener('click', function() {
          this.classList.toggle('expanded');
        });
      });
      
      // Add smooth scrolling for internal links
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    });`;
  }

  /**
   * Helper methods
   */
  private getScoreClass(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 50) return 'fair';
    return 'poor';
  }

  private getAriaQualityDescription(score: number): string {
    if (score >= 90) return 'Excellent ARIA implementation';
    if (score >= 75) return 'Good ARIA usage with minor issues';
    if (score >= 50) return 'Fair ARIA implementation needs improvement';
    return 'Poor ARIA implementation requires attention';
  }

  private generateHtml5Recommendations(data: EnhancedReportData): string {
    const recommendations = [
      'Use semantic HTML5 elements like <main>, <article>, <section> for better structure',
      'Ensure all <summary> elements have accessible names',
      'Add proper ARIA attributes to <dialog> elements',
      'Consider using <details>/<summary> for collapsible content'
    ];
    
    return `<ul class="recommendations-preview-list">
      ${recommendations.slice(0, 3).map(rec => `<li>${rec}</li>`).join('')}
    </ul>`;
  }

  private generateExecutiveSummary(data: EnhancedReportData): string {
    return `
    <section class="executive-summary">
      <h2>📊 Executive Summary</h2>
      <div class="summary-text">
        <p>This comprehensive accessibility audit analyzed <strong>${data.summary.testedPages}</strong> pages 
        with enhanced HTML5 and ARIA analysis capabilities. The overall accessibility score is 
        <strong class="${this.getScoreClass(data.summary.avgAccessibilityScore)}">${Math.round(data.summary.avgAccessibilityScore)}%</strong>
        with modern web standards compliance at <strong>${Math.round(data.summary.semanticQuality.overallSemanticScore)}%</strong>.</p>
        
        <p><strong>Key Findings:</strong> ${data.summary.ariaAnalysis.criticalIssues} critical ARIA issues, 
        ${data.summary.html5Analysis.detailsSummaryIssues} HTML5 semantic issues, and 
        ${data.summary.semanticQuality.recommendationsCount} actionable recommendations identified.</p>
      </div>
    </section>`;
  }

  private generateRecommendationsSection(data: EnhancedReportData): string {
    return `
    <section class="recommendations-section">
      <h2>💡 Priority Recommendations</h2>
      <div class="recommendations-grid">
        <div class="recommendation-category">
          <h3>🔥 HTML5 & Semantic</h3>
          <ul>
            <li>Implement proper <code>&lt;main&gt;</code> landmarks</li>
            <li>Fix <code>&lt;summary&gt;</code> accessibility names</li>
            <li>Use semantic sectioning elements</li>
          </ul>
        </div>
        
        <div class="recommendation-category">
          <h3>⚡ ARIA Enhancement</h3>
          <ul>
            <li>Address ${data.summary.ariaAnalysis.criticalIssues} critical ARIA issues</li>
            <li>Improve landmark role coverage</li>
            <li>Fix invalid ARIA attribute values</li>
          </ul>
        </div>
      </div>
    </section>`;
  }

  private generateFooter(data: EnhancedReportData): string {
    return `
    <footer class="report-footer">
      <p>Generated by AuditMySite v${data.auditMySiteVersion} with enhanced HTML5 and ARIA analysis</p>
      <p>Report generated on ${new Date(data.timestamp).toLocaleString()}</p>
    </footer>`;
  }

  private async writeReportFile(outputPath: string, content: string): Promise<void> {
    const fs = await import('fs/promises');
    await fs.writeFile(outputPath, content, 'utf8');
  }
}
