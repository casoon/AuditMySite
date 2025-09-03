export class HtmlGenerator {
  generateAccessibilitySection(data: any): string {
    return `<section id="accessibility">
      <h2>Accessibility Report</h2>
      <table>
        <thead><tr><th>Page</th><th>Errors</th><th>Warnings</th><th>Pa11y Score</th></tr></thead>
        <tbody>
          ${data.pages.map((page: any) =>
            `<tr>
              <td>${page.url}</td>
              <td>${page.errors}</td>
              <td>${page.warnings}</td>
              <td>${page.issues?.pa11yScore ?? 'N/A'}</td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
    </section>`;
  }

  generatePerformanceSection(data: any): string {
    return `<section id="performance">
      <h2>Performance Report</h2>
      <table>
        <thead><tr><th>Page</th><th>Load Time (ms)</th><th>FCP</th><th>LCP</th><th>DOM Loaded</th><th>First Paint</th><th>Largest Paint</th></tr></thead>
        <tbody>
          ${data.pages.map((page: any) => {
            const perf = page.issues?.performanceMetrics || {};
            return `<tr>
              <td>${page.url}</td>
              <td>${perf.loadTime ?? 'N/A'}</td>
              <td>${perf.firstContentfulPaint ?? 'N/A'}</td>
              <td>${perf.largestContentfulPaint ?? 'N/A'}</td>
              <td>${perf.domContentLoaded ?? 'N/A'}</td>
              <td>${perf.firstPaint ?? 'N/A'}</td>
              <td>${perf.largestContentfulPaint ?? 'N/A'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </section>`;
  }

  generateSeoSection(data: any): string {
    return `<section id="seo">
      <h2>SEO Report</h2>
      <table>
        <thead><tr><th>Page</th><th>Title</th><th>Headings</th><th>Images w/o Alt</th><th>Buttons w/o Label</th></tr></thead>
        <tbody>
          ${data.pages.map((page: any) =>
            `<tr>
              <td>${page.url}</td>
              <td>${page.title || 'N/A'}</td>
              <td>${page.issues?.headingsCount ?? 'N/A'}</td>
              <td>${page.issues?.imagesWithoutAlt ?? 'N/A'}</td>
              <td>${page.issues?.buttonsWithoutLabel ?? 'N/A'}</td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
    </section>`;
  }

  generateSecuritySection(data: any): string {
    return `<section id="security">
      <h2>Security Report</h2>
      <p>Security-Daten sind aktuell nicht integriert.</p>
    </section>`;
  }
} 