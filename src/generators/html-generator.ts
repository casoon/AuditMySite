export class HtmlGenerator {
  generateAccessibilitySection(data: any): string {
    return `<div class="table-container">
      <div class="table-header">
        <div>
          <!-- Description removed to avoid duplication with template -->
        </div>
      </div>
      <div class="table-wrapper">
        <table class="data-table">
        <thead><tr><th>Page</th><th>Errors</th><th>Warnings</th><th>Pa11y Score</th></tr></thead>
        <tbody>
          ${data.pages.map((page: any) => {
            // Debug: Check multiple possible locations for pa11yScore
            const pa11yScore = page.issues?.pa11yScore ?? page.pa11yScore ?? 'N/A';
            const formattedScore = pa11yScore !== 'N/A' && typeof pa11yScore === 'number' ? 
              `${Math.round(pa11yScore)}/100` : pa11yScore;
            
            // Debug logging (can be removed in production)
            if (pa11yScore === 'N/A') {
              console.debug(`Pa11y score not found for ${page.url}. Available data:`, {
                hasIssues: !!page.issues,
                issuesKeys: page.issues ? Object.keys(page.issues) : [],
                pageKeys: Object.keys(page)
              });
            }
            
            return `<tr>
              <td>${page.url}</td>
              <td>${page.errors}</td>
              <td>${page.warnings}</td>
              <td>${formattedScore}</td>
            </tr>`;
          }).join('')}
        </tbody>
        </table>
      </div>
    </div>`;
  }

  generatePerformanceSection(data: any): string {
    // Helper function to format numbers properly
    const formatMetric = (value: any): string => {
      if (value === null || value === undefined || value === 'N/A') return 'N/A';
      const numValue = parseFloat(value);
      return isNaN(numValue) ? 'N/A' : `${Math.round(numValue)}ms`;
    };

    return `<div class="table-container">
      <div class="table-header">
        <div>
          <!-- Description removed to avoid duplication with template -->
        </div>
      </div>
      <div class="table-wrapper">
        <table class="data-table">
        <thead><tr><th>Page</th><th>Load Time</th><th>FCP</th><th>LCP</th><th>DOM Loaded</th><th>First Paint</th></tr></thead>
        <tbody>
          ${data.pages.map((page: any) => {
            const perf = page.issues?.performanceMetrics || {};
            return `<tr>
              <td>${page.url}</td>
              <td>${formatMetric(perf.loadTime)}</td>
              <td>${formatMetric(perf.firstContentfulPaint)}</td>
              <td>${formatMetric(perf.largestContentfulPaint)}</td>
              <td>${formatMetric(perf.domContentLoaded)}</td>
              <td>${formatMetric(perf.firstPaint)}</td>
            </tr>`;
          }).join('')}
        </tbody>
        </table>
      </div>
    </div>`;
  }

  generateSeoSection(data: any): string {
    return `<div class="table-container">
      <div class="table-header">
        <div>
          <!-- Description removed to avoid duplication with template -->
        </div>
      </div>
      <div class="table-wrapper">
        <table class="data-table">
        <thead><tr><th>Page & Title</th><th>Headings</th><th>Images w/o Alt</th><th>Buttons w/o Label</th></tr></thead>
        <tbody>
          ${data.pages.map((page: any) => {
            const pageTitle = page.title || 'No title';
            const pageName = this.getPageName(page.url);
            return `<tr>
              <td>
                <div class="page-info">
                  <strong>${pageName}</strong><br>
                  <small class="page-title">${pageTitle}</small><br>
                  <small class="page-url">${page.url}</small>
                </div>
              </td>
              <td>${page.issues?.headingsCount ?? 'N/A'}</td>
              <td>${page.issues?.imagesWithoutAlt ?? 'N/A'}</td>
              <td>${page.issues?.buttonsWithoutLabel ?? 'N/A'}</td>
            </tr>`;
          }).join('')}
        </tbody>
        </table>
      </div>
    </div>`;
  }

  private getPageName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname === '/' ? 'Home' : (pathname.split('/').pop() || pathname);
    } catch {
      return url;
    }
  }

  generateDetailedIssuesSection(data: any): string {
    if (!data.pages || data.pages.length === 0) {
      return `<div class="no-data">
        <h3>No Detailed Issues Available</h3>
        <p>No detailed issues were found or collected during the audit.</p>
      </div>`;
    }

    // Collect all issues from all pages
    const allIssues: any[] = [];
    
    data.pages.forEach((page: any) => {
      // Add pa11y issues
      if (page.issues?.pa11yIssues && Array.isArray(page.issues.pa11yIssues)) {
        page.issues.pa11yIssues.forEach((issue: any) => {
          allIssues.push({
            ...issue,
            pageUrl: page.url,
            pageTitle: page.title,
            source: 'pa11y',
            category: this.getIssueCategory(issue.code || issue.type)
          });
        });
      }
      
      // Add error details as issues
      if (page.errorDetails && Array.isArray(page.errorDetails)) {
        page.errorDetails.forEach((error: string) => {
          allIssues.push({
            type: 'error',
            severity: 'error',
            message: error,
            pageUrl: page.url,
            pageTitle: page.title,
            source: 'playwright',
            category: 'General Accessibility'
          });
        });
      }
      
      // Add warning details as issues
      if (page.warningDetails && Array.isArray(page.warningDetails)) {
        page.warningDetails.forEach((warning: string) => {
          allIssues.push({
            type: 'warning',
            severity: 'warning', 
            message: warning,
            pageUrl: page.url,
            pageTitle: page.title,
            source: 'playwright',
            category: this.getWarningCategory(warning)
          });
        });
      }
    });

    if (allIssues.length === 0) {
      return `<div class="no-issues">
        <h3>🎉 Great! No Issues Found</h3>
        <p>Your website appears to be free of accessibility issues.</p>
      </div>`;
    }

    // Group issues by category
    const groupedIssues = this.groupIssuesByCategory(allIssues);
    
    let html = '<div class="detailed-issues-container">';
    
    // Summary stats
    html += this.generateIssuesSummary(allIssues);
    
    // Generate sections for each category
    Object.entries(groupedIssues).forEach(([category, issues]) => {
      html += this.generateCategorySection(category, issues as any[]);
    });
    
    html += '</div>';
    
    return html;
  }
  
  private generateIssuesSummary(issues: any[]): string {
    const errorCount = issues.filter(i => i.severity === 'error').length;
    const warningCount = issues.filter(i => i.severity === 'warning').length;
    const noticeCount = issues.filter(i => i.severity === 'notice' || i.type === 'notice').length;
    
    return `<div class="issues-summary">
      <h3>Issues Overview</h3>
      <div class="summary-grid">
        <div class="summary-card error">
          <div class="summary-number">${errorCount}</div>
          <div class="summary-label">Errors</div>
        </div>
        <div class="summary-card warning">
          <div class="summary-number">${warningCount}</div>
          <div class="summary-label">Warnings</div>
        </div>
        <div class="summary-card notice">
          <div class="summary-number">${noticeCount}</div>
          <div class="summary-label">Notices</div>
        </div>
        <div class="summary-card total">
          <div class="summary-number">${issues.length}</div>
          <div class="summary-label">Total Issues</div>
        </div>
      </div>
    </div>`;
  }
  
  private generateCategorySection(category: string, issues: any[]): string {
    const sectionId = category.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    let html = `<div class="category-section" id="category-${sectionId}">`;
    html += `<div class="category-header">`;
    html += `<h3 class="category-title">${category} <span class="issue-count">(${issues.length})</span></h3>`;
    html += `<button class="copy-category-btn" onclick="copyCategoryIssues('${sectionId}')">📋 Copy All Issues</button>`;
    html += `</div>`;
    
    // Group by page within category
    const pageGroups = this.groupIssuesByPage(issues);
    
    Object.entries(pageGroups).forEach(([pageUrl, pageIssues]) => {
      const pageTitle = (pageIssues as any[])[0]?.pageTitle || 'Unknown Page';
      html += this.generatePageIssuesSection(pageUrl, pageTitle, pageIssues as any[]);
    });
    
    html += '</div>';
    
    return html;
  }
  
  private generatePageIssuesSection(pageUrl: string, pageTitle: string, issues: any[]): string {
    let html = `<div class="page-issues-section">`;
    html += `<div class="page-header">`;
    html += `<h4 class="page-title">${this.getPageName(pageUrl)}</h4>`;
    html += `<div class="page-meta">`;
    html += `<span class="page-url">${pageUrl}</span>`;
    html += `<span class="page-issue-count">${issues.length} issues</span>`;
    html += `</div>`;
    html += `</div>`;
    
    html += `<div class="issues-list">`;
    
    issues.forEach((issue, index) => {
      html += this.generateIssueItem(issue, index);
    });
    
    html += `</div></div>`;
    
    return html;
  }
  
  private generateIssueItem(issue: any, index: number): string {
    const severityClass = issue.severity || 'info';
    const issueId = `issue-${Date.now()}-${index}`;
    
    let html = `<div class="issue-item ${severityClass}" id="${issueId}">`;
    html += `<div class="issue-header">`;
    html += `<div class="issue-type-badge ${severityClass}">${issue.severity?.toUpperCase() || 'INFO'}</div>`;
    html += `<div class="issue-source">${issue.source || 'unknown'}</div>`;
    html += `<button class="copy-issue-btn" onclick="copyIssue('${issueId}')">📋</button>`;
    html += `</div>`;
    
    html += `<div class="issue-content">`;
    html += `<div class="issue-message">${issue.message}</div>`;
    
    if (issue.code) {
      html += `<div class="issue-code"><strong>Code:</strong> ${issue.code}</div>`;
    }
    
    if (issue.selector) {
      html += `<div class="issue-selector"><strong>Element:</strong> <code>${issue.selector}</code></div>`;
    }
    
    if (issue.context) {
      html += `<div class="issue-context"><strong>Context:</strong> <code>${this.escapeHtml(issue.context)}</code></div>`;
    }
    
    if (issue.help) {
      html += `<div class="issue-help"><strong>Help:</strong> ${issue.help}</div>`;
    }
    
    if (issue.helpUrl) {
      html += `<div class="issue-help-url"><strong>More Info:</strong> <a href="${issue.helpUrl}" target="_blank">${issue.helpUrl}</a></div>`;
    }
    
    // AI-friendly format for copying
    html += `<div class="issue-ai-format" style="display: none;">`;
    html += `Issue: ${issue.message}\n`;
    if (issue.selector) html += `Element: ${issue.selector}\n`;
    if (issue.context) html += `HTML Context: ${issue.context}\n`;
    if (issue.code) html += `Rule: ${issue.code}\n`;
    html += `Page: ${issue.pageUrl}\n`;
    html += `Severity: ${issue.severity}\n`;
    if (issue.help) html += `Fix: ${issue.help}\n`;
    html += `---\n`;
    html += `</div>`;
    
    html += `</div></div>`;
    
    return html;
  }
  
  private groupIssuesByCategory(issues: any[]): Record<string, any[]> {
    const groups: Record<string, any[]> = {};
    
    issues.forEach(issue => {
      const category = issue.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(issue);
    });
    
    return groups;
  }
  
  private groupIssuesByPage(issues: any[]): Record<string, any[]> {
    const groups: Record<string, any[]> = {};
    
    issues.forEach(issue => {
      const pageUrl = issue.pageUrl || 'unknown';
      if (!groups[pageUrl]) {
        groups[pageUrl] = [];
      }
      groups[pageUrl].push(issue);
    });
    
    return groups;
  }
  
  private getIssueCategory(codeOrType?: string): string {
    if (!codeOrType) return 'General';
    
    const code = codeOrType.toLowerCase();
    
    if (code.includes('color') || code.includes('contrast')) return 'Color & Contrast';
    if (code.includes('aria') || code.includes('role')) return 'ARIA & Semantics';
    if (code.includes('form') || code.includes('label')) return 'Forms & Labels';
    if (code.includes('image') || code.includes('alt')) return 'Images & Media';
    if (code.includes('heading') || code.includes('structure')) return 'Document Structure';
    if (code.includes('keyboard') || code.includes('focus')) return 'Keyboard & Focus';
    if (code.includes('link') || code.includes('anchor')) return 'Links & Navigation';
    if (code.includes('table')) return 'Tables';
    if (code.includes('landmark')) return 'Page Landmarks';
    
    return 'General Accessibility';
  }
  
  private getWarningCategory(warning: string): string {
    const w = warning.toLowerCase();
    
    if (w.includes('image') && w.includes('alt')) return 'Images & Media';
    if (w.includes('button') && w.includes('label')) return 'Forms & Labels';
    if (w.includes('performance') || w.includes('load')) return 'Performance';
    if (w.includes('contrast')) return 'Color & Contrast';
    if (w.includes('keyboard')) return 'Keyboard & Focus';
    if (w.includes('focus')) return 'Keyboard & Focus';
    
    return 'General';
  }
  
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  generateSecuritySection(data: any): string {
    return `<section id="security">
      <h2>Security Report</h2>
      <p>Security-Daten sind aktuell nicht integriert.</p>
    </section>`;
  }
} 