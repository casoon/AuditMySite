const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

class AuditMySiteTestSuite {
  constructor() {
    this.mockServerUrl = 'http://localhost:3001';
    this.testResults = [];
    this.expectedResults = {
      'perfect-page': {
        shouldPass: true,
        expectedErrors: 0,
        expectedWarnings: 0,
        expectedIssues: ['No accessibility issues expected']
      },
      'accessibility-errors': {
        shouldPass: false,
        expectedErrors: 8, // Specific accessibility errors
        expectedWarnings: 5,
        expectedIssues: [
          'Missing alt attribute',
          'Button without aria-label',
          'Low contrast text',
          'Form without labels',
          'Missing heading structure',
          'Empty link',
          'Missing main landmark'
        ]
      },
      'performance-issues': {
        shouldPass: false,
        expectedErrors: 3,
        expectedWarnings: 10,
        expectedIssues: [
          'Large unoptimized images',
          'Inline styles',
          'Unoptimized scripts'
        ]
      },
      'seo-problems': {
        shouldPass: false,
        expectedErrors: 6,
        expectedWarnings: 8,
        expectedIssues: [
          'Missing title',
          'Missing meta description',
          'Missing h1',
          'Missing alt attributes',
          'No structured data'
        ]
      },
      'security-issues': {
        shouldPass: false,
        expectedErrors: 4,
        expectedWarnings: 6,
        expectedIssues: [
          'Insecure form',
          'Inline scripts',
          'External resources without integrity',
          'Missing CSP'
        ]
      },
      'advanced-contrast-test': {
        shouldPass: false,
        expectedErrors: 3,
        expectedWarnings: 5,
        expectedIssues: [
          'Very low contrast text',
          'Low contrast buttons',
          'Low contrast links',
          'Background image with text overlay'
        ]
      },
      'screen-reader-test': {
        shouldPass: false,
        expectedErrors: 6,
        expectedWarnings: 8,
        expectedIssues: [
          'Missing aria-live regions',
          'Incorrect ARIA usage',
          'Missing skip links',
          'Incorrect heading structure',
          'Missing table headers',
          'Missing list semantics'
        ]
      },
      'pwa-test': {
        shouldPass: false,
        expectedErrors: 5,
        expectedWarnings: 7,
        expectedIssues: [
          'Missing manifest',
          'Missing service worker',
          'Missing HTTPS',
          'Missing app icons',
          'Missing offline functionality'
        ]
      },
      'mobile-touch-test': {
        shouldPass: false,
        expectedErrors: 4,
        expectedWarnings: 6,
        expectedIssues: [
          'Too small touch targets',
          'Small navigation links',
          'Small form inputs',
          'Insufficient touch target size'
        ]
      },
      'advanced-security-test': {
        shouldPass: false,
        expectedErrors: 7,
        expectedWarnings: 9,
        expectedIssues: [
          'XSS vulnerabilities',
          'CSRF vulnerabilities',
          'Information disclosure',
          'Insecure external resources',
          'Missing input validation',
          'Insecure cookies',
          'Missing security headers'
        ]
      },
      'core-web-vitals-test': {
        shouldPass: false,
        expectedErrors: 5,
        expectedWarnings: 8,
        expectedIssues: [
          'Large images without dimensions',
          'Layout shifts',
          'Render-blocking resources',
          'Unoptimized fonts',
          'Heavy JavaScript'
        ]
      }
    };
  }

  async runTest(testName, options = {}) {
    console.log(`\n🧪 Running test: ${testName}`);
    
    const testOptions = {
      maxPages: 1,
      nonInteractive: true,
      detailedReport: true,
      performanceReport: true,
      seoReport: true,
      securityReport: true,
      ...options
    };

    const args = [
      'bin/audit.js',
      `${this.mockServerUrl}/sitemap.xml`,
      '--max-pages', testOptions.maxPages.toString(),
      '--non-interactive'
    ];

    if (testOptions.detailedReport) args.push('--detailed-report');
    if (testOptions.performanceReport) args.push('--performance-report');
    if (testOptions.seoReport) args.push('--seo-report');
    if (testOptions.securityReport) args.push('--security-report');

    return new Promise((resolve, reject) => {
      const child = spawn('node', args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: process.cwd()
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', async (code) => {
        const result = {
          testName,
          exitCode: code,
          stdout,
          stderr,
          success: code === 0,
          timestamp: new Date().toISOString()
        };

        // Parse results from generated reports
        try {
          const reportPath = path.join('reports', 'localhost', 'accessibility-report-*.md');
          const files = await fs.readdir(path.join('reports', 'localhost'));
          const reportFile = files.find(f => f.startsWith('accessibility-report-'));
          
          if (reportFile) {
            const reportContent = await fs.readFile(path.join('reports', 'localhost', reportFile), 'utf8');
            result.parsedReport = this.parseReport(reportContent);
          }
        } catch (error) {
          console.warn(`⚠️  Could not parse report for ${testName}:`, error.message);
        }

        this.testResults.push(result);
        resolve(result);
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  parseReport(content) {
    const lines = content.split('\n');
    const result = {
      totalPages: 0,
      passedPages: 0,
      failedPages: 0,
      totalErrors: 0,
      totalWarnings: 0,
      successRate: 0,
      issues: []
    };

    for (const line of lines) {
      if (line.includes('Getestete Seiten:')) {
        result.totalPages = parseInt(line.match(/\d+/)[0]);
      } else if (line.includes('Bestanden:')) {
        result.passedPages = parseInt(line.match(/\d+/)[0]);
      } else if (line.includes('Fehlgeschlagen:')) {
        result.failedPages = parseInt(line.match(/\d+/)[0]);
      } else if (line.includes('Fehler:')) {
        result.totalErrors = parseInt(line.match(/\d+/)[0]);
      } else if (line.includes('Warnungen:')) {
        result.totalWarnings = parseInt(line.match(/\d+/)[0]);
      } else if (line.includes('Erfolgsrate:')) {
        result.successRate = parseFloat(line.match(/[\d.]+/)[0]);
      }
    }

    return result;
  }

  async runAllTests() {
    console.log('🚀 Starting AuditMySite Test Suite');
    console.log('=====================================');

    const tests = [
      {
        name: 'Perfect Page Test',
        options: { maxPages: 1 },
        expectedPage: 'perfect-page'
      },
      {
        name: 'Accessibility Errors Test',
        options: { maxPages: 1 },
        expectedPage: 'accessibility-errors'
      },
      {
        name: 'Performance Issues Test',
        options: { maxPages: 1 },
        expectedPage: 'performance-issues'
      },
      {
        name: 'SEO Problems Test',
        options: { maxPages: 1 },
        expectedPage: 'seo-problems'
      },
      {
        name: 'Security Issues Test',
        options: { maxPages: 1 },
        expectedPage: 'security-issues'
      },
      {
        name: 'Full Sitemap Test',
        options: { maxPages: 5 },
        expectedPage: 'all'
      },
      {
        name: 'Advanced Contrast Test',
        options: { maxPages: 1 },
        expectedPage: 'advanced-contrast-test'
      },
      {
        name: 'Screen Reader Test',
        options: { maxPages: 1 },
        expectedPage: 'screen-reader-test'
      },
      {
        name: 'PWA Test',
        options: { maxPages: 1 },
        expectedPage: 'pwa-test'
      },
      {
        name: 'Mobile Touch Test',
        options: { maxPages: 1 },
        expectedPage: 'mobile-touch-test'
      },
      {
        name: 'Advanced Security Test',
        options: { maxPages: 1 },
        expectedPage: 'advanced-security-test'
      },
      {
        name: 'Core Web Vitals Test',
        options: { maxPages: 1 },
        expectedPage: 'core-web-vitals-test'
      }
    ];

    for (const test of tests) {
      await this.runTest(test.name, test.options);
      // Wait between tests to avoid overwhelming the mock server
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return this.generateTestReport();
  }

  generateTestReport() {
    console.log('\n📊 Test Results Summary');
    console.log('========================');

    const report = {
      totalTests: this.testResults.length,
      passedTests: 0,
      failedTests: 0,
      testDetails: [],
      recommendations: []
    };

    for (const result of this.testResults) {
      const testDetail = {
        name: result.testName,
        success: result.success,
        exitCode: result.exitCode,
        hasReport: !!result.parsedReport,
        errors: result.parsedReport?.totalErrors || 0,
        warnings: result.parsedReport?.totalWarnings || 0,
        successRate: result.parsedReport?.successRate || 0
      };

      if (result.success) {
        report.passedTests++;
      } else {
        report.failedTests++;
      }

      report.testDetails.push(testDetail);

      // Add recommendations based on test results
      if (!result.success) {
        report.recommendations.push(`Test "${result.testName}" failed with exit code ${result.exitCode}`);
      }

      if (!result.parsedReport) {
        report.recommendations.push(`Test "${result.testName}" did not generate a report`);
      }
    }

    // Print detailed results
    for (const detail of report.testDetails) {
      const status = detail.success ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${detail.name}`);
      console.log(`   Exit Code: ${detail.exitCode}`);
      console.log(`   Report Generated: ${detail.hasReport ? 'Yes' : 'No'}`);
      if (detail.hasReport) {
        console.log(`   Errors: ${detail.errors}, Warnings: ${detail.warnings}`);
        console.log(`   Success Rate: ${detail.successRate}%`);
      }
      console.log('');
    }

    console.log(`\n📈 Summary: ${report.passedTests}/${report.totalTests} tests passed`);

    if (report.recommendations.length > 0) {
      console.log('\n🔧 Recommendations:');
      report.recommendations.forEach(rec => console.log(`   - ${rec}`));
    }

    return report;
  }

  async validateExpectedResults() {
    console.log('\n🔍 Validating Expected Results');
    console.log('==============================');

    const validationResults = [];

    for (const result of this.testResults) {
      if (!result.parsedReport) continue;

      // Find the expected page based on test name
      let expectedPage = 'unknown';
      for (const [page, expected] of Object.entries(this.expectedResults)) {
        if (result.testName.toLowerCase().includes(page.replace('-', ' '))) {
          expectedPage = page;
          break;
        }
      }

      if (expectedPage === 'unknown') continue;

      const expected = this.expectedResults[expectedPage];
      const actual = result.parsedReport;

      const validation = {
        testName: result.testName,
        expectedPage,
        passed: true,
        issues: []
      };

      // Validate success rate
      if (expected.shouldPass && actual.successRate < 100) {
        validation.passed = false;
        validation.issues.push(`Expected 100% success rate, got ${actual.successRate}%`);
      }

      if (!expected.shouldPass && actual.successRate === 100) {
        validation.passed = false;
        validation.issues.push(`Expected failures but got 100% success rate`);
      }

      // Validate error count (approximate)
      if (expected.expectedErrors > 0 && actual.totalErrors === 0) {
        validation.passed = false;
        validation.issues.push(`Expected ${expected.expectedErrors} errors but found 0`);
      }

      validationResults.push(validation);

      const status = validation.passed ? '✅ VALID' : '❌ INVALID';
      console.log(`${status} ${result.testName} (${expectedPage})`);
      if (validation.issues.length > 0) {
        validation.issues.forEach(issue => console.log(`   - ${issue}`));
      }
    }

    return validationResults;
  }
}

// Export for use in other files
module.exports = AuditMySiteTestSuite;

// Run tests if this file is executed directly
if (require.main === module) {
  const testSuite = new AuditMySiteTestSuite();
  
  testSuite.runAllTests()
    .then(() => testSuite.validateExpectedResults())
    .then(() => {
      console.log('\n🎉 Test suite completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Test suite failed:', error);
      process.exit(1);
    });
} 