export class HtmlGenerator {
  generateAccessibilitySection(data: any): string {
    return `<div class="table-container">
      <div class="table-header">
        <div>
          <p class="section-description">Web accessibility compliance and WCAG violations analysis</p>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="data-table">
        <thead><tr><th>Page</th><th>Errors</th><th>Warnings</th><th>Pa11y Score</th></tr></thead>
        <tbody>
          ${data.pages.map((page: any) => {
            // Fix: Get Pa11y score from correct location in data structure
            const pa11yScore = page.issues?.pa11yScore || page.pa11yScore || 'N/A';
            const formattedScore = pa11yScore !== 'N/A' && typeof pa11yScore === 'number' ? 
              `${Math.round(pa11yScore)}/100` : pa11yScore;
            
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
          <p class="section-description">Web page performance metrics and loading times</p>
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
          <p class="section-description">Search engine optimization analysis and content structure</p>
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

  generateSecuritySection(data: any): string {
    return `<section id="security">
      <h2>Security Report</h2>
      <p>Security-Daten sind aktuell nicht integriert.</p>
    </section>`;
  }
} 