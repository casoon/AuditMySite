const { AccessibilityService } = require('../dist/services/accessibility-service');

class ServiceTestSuite {
  constructor() {
    this.mockServerUrl = 'http://localhost:3001';
    this.service = new AccessibilityService();
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
      }
    };
  }

  async runTest(testName, options = {}) {
    console.log(`\n🧪 Running test: ${testName}`);
    
    const testOptions = {
      maxPages: 1,
      detailedReport: true,
      performanceReport: true,
      seoReport: true,
      securityReport: true,
      verbose: false,
      ...options
    };

    try {
      // Initialize service
      await this.service.initialize();
      
      // Run test
      const result = await this.service.testSitemap(
        `${this.mockServerUrl}/sitemap.xml`,
        testOptions
      );

      // Cleanup
      await this.service.cleanup();

      const testResult = {
        testName,
        success: result.success,
        serviceResult: result,
        timestamp: new Date().toISOString()
      };

      this.testResults.push(testResult);
      return testResult;

    } catch (error) {
      await this.service.cleanup();
      
      const testResult = {
        testName,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };

      this.testResults.push(testResult);
      return testResult;
    }
  }

  async runAllTests() {
    console.log('🚀 Starting Service Test Suite');
    console.log('================================');

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
    console.log('\n📊 Service Test Results Summary');
    console.log('================================');

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
        hasServiceResult: !!result.serviceResult,
        hasError: !!result.error,
        errors: result.serviceResult?.summary?.totalErrors || 0,
        warnings: result.serviceResult?.summary?.totalWarnings || 0,
        successRate: result.serviceResult?.summary?.successRate || 0
      };

      if (result.success) {
        report.passedTests++;
      } else {
        report.failedTests++;
      }

      report.testDetails.push(testDetail);

      // Add recommendations based on test results
      if (!result.success) {
        if (result.error) {
          report.recommendations.push(`Test "${result.testName}" failed with error: ${result.error}`);
        } else {
          report.recommendations.push(`Test "${result.testName}" failed (service returned success: false)`);
        }
      }

      if (!result.serviceResult) {
        report.recommendations.push(`Test "${result.testName}" did not return service result`);
      }
    }

    // Print detailed results
    for (const detail of report.testDetails) {
      const status = detail.success ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${detail.name}`);
      console.log(`   Service Result: ${detail.hasServiceResult ? 'Yes' : 'No'}`);
      if (detail.hasError) {
        console.log(`   Error: ${detail.error}`);
      }
      if (detail.hasServiceResult) {
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
      if (!result.serviceResult) continue;

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
      const actual = result.serviceResult.summary;

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
module.exports = ServiceTestSuite;

// Run tests if this file is executed directly
if (require.main === module) {
  const testSuite = new ServiceTestSuite();
  
  testSuite.runAllTests()
    .then(() => testSuite.validateExpectedResults())
    .then(() => {
      console.log('\n🎉 Service test suite completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Service test suite failed:', error);
      process.exit(1);
    });
} 