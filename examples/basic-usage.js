/**
 * 🚀 Basic AuditMySite SDK Usage Example
 * 
 * This example demonstrates the simplest way to use the AuditMySite SDK
 * for accessibility testing in a Node.js application.
 */

const { AuditSDK } = require('../dist/sdk/audit-sdk');

async function basicExample() {
  console.log('🎯 Basic AuditMySite SDK Example\n');

  // Initialize the SDK
  const audit = new AuditSDK({
    verbose: true,
    defaultOutputDir: './audit-reports'
  });

  try {
    // Example 1: Quick audit with minimal configuration
    console.log('📋 Running quick audit...');
    const result = await audit.quickAudit('https://example.com/sitemap.xml', {
      maxPages: 5,
      formats: ['html', 'json']
    });

    console.log('✅ Audit completed!');
    console.log(`   📄 Tested: ${result.summary.testedPages} pages`);
    console.log(`   ✅ Passed: ${result.summary.passedPages}`);
    console.log(`   ❌ Failed: ${result.summary.failedPages}`);
    console.log(`   📊 Success Rate: ${Math.round((result.summary.passedPages / result.summary.testedPages) * 100)}%`);
    console.log(`   ⏱️  Duration: ${Math.round(result.duration / 1000)}s`);

    // Show generated reports
    if (result.reports.length > 0) {
      console.log('\n📁 Generated Reports:');
      result.reports.forEach(report => {
        console.log(`   ${report.format.toUpperCase()}: ${report.path} (${Math.round(report.size / 1024)}KB)`);
      });
    }

  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

// Example 2: Using fluent API with event listeners
async function fluentAPIExample() {
  console.log('\n🔗 Fluent API Example with Event Listeners\n');

  const audit = new AuditSDK();

  try {
    const result = await audit.audit()
      .sitemap('https://example.com/sitemap.xml')
      .maxPages(3)
      .standard('WCAG2AA')
      .formats(['html', 'markdown'])
      .includePerformance()
      .viewport(1920, 1080)
      .on('audit:start', (event) => {
        console.log('🚀 Audit started!');
      })
      .on('audit:progress', (event) => {
        const { current, total, percentage, currentUrl } = event.data;
        console.log(`📊 Progress: ${current}/${total} (${percentage}%) - ${currentUrl || 'Processing...'}`);
      })
      .on('audit:page:complete', (event) => {
        const { url, result } = event.data;
        const status = result.passed ? '✅' : '❌';
        console.log(`${status} ${url} - ${result.errors.length} errors`);
      })
      .on('report:complete', (event) => {
        const { format, size } = event.data;
        console.log(`📄 ${format.toUpperCase()} report generated (${Math.round(size / 1024)}KB)`);
      })
      .run();

    console.log('\n🎉 Fluent API audit completed successfully!');
    
  } catch (error) {
    console.error('❌ Fluent API audit failed:', error.message);
  }
}

// Example 3: Error handling and connection testing
async function errorHandlingExample() {
  console.log('\n🛡️ Error Handling & Connection Testing Example\n');

  const audit = new AuditSDK();

  // Test connection first
  const sitemapUrl = 'https://nonexistent-site.com/sitemap.xml';
  console.log(`🔍 Testing connection to: ${sitemapUrl}`);
  
  const connectionTest = await audit.testConnection(sitemapUrl);
  
  if (!connectionTest.success) {
    console.log(`❌ Connection test failed: ${connectionTest.error}`);
    console.log('💡 Tip: Make sure the sitemap URL is accessible and valid');
    return;
  }

  console.log('✅ Connection test passed!');

  // Run audit with proper error handling
  try {
    await audit.quickAudit(sitemapUrl, {
      maxPages: 5,
      formats: ['json']
    });
    
  } catch (error) {
    if (error.code === 'INVALID_SITEMAP') {
      console.error('🚫 Invalid sitemap:', error.message);
      console.log('💡 Please check the sitemap URL and ensure it\'s accessible');
    } else if (error.code === 'TIMEOUT') {
      console.error('⏰ Audit timed out:', error.message);
      console.log('💡 Try reducing maxPages or increasing timeout');
    } else {
      console.error('💥 Unexpected error:', error.message);
    }
  }
}

// Run all examples
async function runAllExamples() {
  await basicExample();
  await fluentAPIExample();
  await errorHandlingExample();
}

// Only run if this file is executed directly
if (require.main === module) {
  runAllExamples().catch(console.error);
}

module.exports = {
  basicExample,
  fluentAPIExample,
  errorHandlingExample
};
