/**
 * 🔄 CI/CD Pipeline Integration Example
 * 
 * This example demonstrates how to integrate AuditMySite SDK into
 * CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins, etc.)
 */

const { AuditSDK } = require('../dist/sdk/audit-sdk');
const fs = require('fs');
const path = require('path');

// =============================================================================
// CI/CD Configuration
// =============================================================================

class CIPipelineIntegration {
  constructor(config = {}) {
    this.config = {
      outputDir: process.env.AUDIT_OUTPUT_DIR || './audit-reports',
      maxPages: parseInt(process.env.AUDIT_MAX_PAGES) || 10,
      formats: (process.env.AUDIT_FORMATS || 'json,html').split(','),
      failOnErrors: process.env.AUDIT_FAIL_ON_ERRORS === 'true',
      errorThreshold: parseInt(process.env.AUDIT_ERROR_THRESHOLD) || 5,
      successRateThreshold: parseInt(process.env.AUDIT_SUCCESS_RATE_THRESHOLD) || 80,
      ...config
    };

    this.sdk = new AuditSDK({
      verbose: process.env.CI === 'true',
      defaultOutputDir: this.config.outputDir
    });
  }

  /**
   * Main CI pipeline entry point
   */
  async runCIPipeline(sitemapUrl) {
    console.log('🔄 Starting CI/CD Accessibility Pipeline');
    console.log('━'.repeat(50));
    
    const startTime = Date.now();
    let exitCode = 0;

    try {
      // Step 1: Validate configuration
      this.validateConfig(sitemapUrl);
      
      // Step 2: Test connection
      await this.testConnection(sitemapUrl);
      
      // Step 3: Run audit
      const result = await this.runAudit(sitemapUrl);
      
      // Step 4: Process results
      exitCode = this.processResults(result);
      
      // Step 5: Generate CI artifacts
      await this.generateCIArtifacts(result);
      
      // Step 6: Send notifications (if configured)
      await this.sendNotifications(result, exitCode);
      
      const duration = Date.now() - startTime;
      console.log(`\n⏱️  Pipeline completed in ${Math.round(duration / 1000)}s`);
      
      return { result, exitCode, duration };
      
    } catch (error) {
      console.error('❌ Pipeline failed:', error.message);
      
      if (process.env.CI_DEBUG === 'true') {
        console.error('Full error:', error);
      }
      
      return { error: error.message, exitCode: 1 };
    }
  }

  validateConfig(sitemapUrl) {
    console.log('📋 Validating configuration...');
    
    if (!sitemapUrl) {
      throw new Error('Sitemap URL is required');
    }

    console.log(`   🌐 Sitemap: ${sitemapUrl}`);
    console.log(`   📄 Max pages: ${this.config.maxPages}`);
    console.log(`   📊 Formats: ${this.config.formats.join(', ')}`);
    console.log(`   🎯 Success rate threshold: ${this.config.successRateThreshold}%`);
    console.log(`   ⚠️  Error threshold: ${this.config.errorThreshold}`);
    console.log(`   💥 Fail on errors: ${this.config.failOnErrors}`);
  }

  async testConnection(sitemapUrl) {
    console.log('\n🔍 Testing connection to sitemap...');
    
    const connectionTest = await this.sdk.testConnection(sitemapUrl);
    
    if (!connectionTest.success) {
      throw new Error(`Connection test failed: ${connectionTest.error}`);
    }
    
    console.log('✅ Connection test passed');
  }

  async runAudit(sitemapUrl) {
    console.log('\n🚀 Running accessibility audit...');\n
    
    let progressInfo = { current: 0, total: 0 };
    
    const result = await this.sdk.audit()
      .sitemap(sitemapUrl)
      .maxPages(this.config.maxPages)
      .formats(this.config.formats)
      .standard('WCAG2AA')
      .includePerformance(true)
      .on('audit:progress', (event) => {\n        progressInfo = event.data;\n        const { current, total, percentage } = event.data;\n        process.stdout.write(`\\r   📊 Progress: ${current}/${total} (${percentage}%)`);\n      })
      .on('audit:page:complete', (event) => {\n        const { url, result } = event.data;\n        const status = result.passed ? '✅' : '❌';\n        if (process.env.AUDIT_VERBOSE === 'true') {\n          console.log(`\\n   ${status} ${url}`);\n        }\n      })
      .run();
    
    console.log('\\n✅ Audit completed');
    return result;
  }

  processResults(result) {
    console.log('\n📊 Processing results...');
    
    const { summary } = result;
    const successRate = Math.round((summary.passedPages / summary.testedPages) * 100);
    
    console.log(`   📄 Pages tested: ${summary.testedPages}`);
    console.log(`   ✅ Passed: ${summary.passedPages}`);
    console.log(`   ❌ Failed: ${summary.failedPages}`);
    console.log(`   💥 Crashed: ${summary.crashedPages || 0}`);
    console.log(`   🐛 Total errors: ${summary.totalErrors}`);
    console.log(`   ⚠️  Total warnings: ${summary.totalWarnings}`);
    console.log(`   🎯 Success rate: ${successRate}%`);
    
    // Determine exit code based on thresholds
    let exitCode = 0;
    const reasons = [];
    
    if (this.config.failOnErrors && summary.totalErrors > this.config.errorThreshold) {
      exitCode = 1;
      reasons.push(`Too many errors (${summary.totalErrors} > ${this.config.errorThreshold})`);
    }
    
    if (successRate < this.config.successRateThreshold) {
      exitCode = 1;
      reasons.push(`Success rate too low (${successRate}% < ${this.config.successRateThreshold}%)`);
    }
    
    if (exitCode === 0) {
      console.log('\\n✅ All quality gates passed');
    } else {
      console.log('\\n❌ Quality gates failed:');
      reasons.forEach(reason => console.log(`   • ${reason}`));
    }
    
    return exitCode;
  }

  async generateCIArtifacts(result) {
    console.log('\\n📁 Generating CI artifacts...');
    
    // Generate JUnit-style test report for CI systems
    await this.generateJUnitReport(result);
    
    // Generate summary for pull requests
    await this.generatePRSummary(result);
    
    // Generate badge data
    await this.generateBadgeData(result);
    
    // Generate metrics for monitoring
    await this.generateMetrics(result);
    
    console.log('✅ CI artifacts generated');
  }

  async generateJUnitReport(result) {
    const { summary } = result;
    
    const junitXml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Accessibility Tests" tests="${summary.testedPages}" failures="${summary.failedPages}" time="${Math.round(result.duration / 1000)}">
  <testsuite name="WCAG2AA Tests" tests="${summary.testedPages}" failures="${summary.failedPages}">
    ${summary.results ? summary.results.map(pageResult => `
    <testcase name="${pageResult.url}" time="${Math.round(pageResult.duration / 1000)}">
      ${!pageResult.passed ? `<failure message="Accessibility errors found">${pageResult.errors.join(', ')}</failure>` : ''}
    </testcase>`).join('') : ''}
  </testsuite>
</testsuites>`;

    const junitPath = path.join(this.config.outputDir, 'junit-accessibility.xml');
    fs.writeFileSync(junitPath, junitXml);
    console.log(`   📄 JUnit report: ${junitPath}`);
  }

  async generatePRSummary(result) {
    const { summary } = result;
    const successRate = Math.round((summary.passedPages / summary.testedPages) * 100);
    const status = successRate >= this.config.successRateThreshold ? '✅' : '❌';
    
    const prSummary = `## ${status} Accessibility Test Results

| Metric | Value |
|--------|-------|
| 📄 Pages Tested | ${summary.testedPages} |
| ✅ Passed | ${summary.passedPages} |
| ❌ Failed | ${summary.failedPages} |
| 🎯 Success Rate | ${successRate}% |
| 🐛 Total Errors | ${summary.totalErrors} |
| ⚠️ Total Warnings | ${summary.totalWarnings} |

${successRate >= this.config.successRateThreshold 
  ? '🎉 All accessibility tests passed!' 
  : '⚠️ Some accessibility issues were found. Please review the detailed reports.'}

📁 **Reports Generated:**
${result.reports.map(r => `- [${r.format.toUpperCase()}](${path.basename(r.path)}) (${Math.round(r.size/1024)}KB)`).join('\n')}

---
*Generated by AuditMySite SDK v${result.metadata.version}*`;

    const summaryPath = path.join(this.config.outputDir, 'pr-summary.md');
    fs.writeFileSync(summaryPath, prSummary);
    console.log(`   📄 PR summary: ${summaryPath}`);
    
    // Set GitHub Actions output if running in GitHub
    if (process.env.GITHUB_ACTIONS === 'true') {
      console.log(`::set-output name=accessibility-summary::${prSummary.replace(/\n/g, '%0A')}`);
      console.log(`::set-output name=success-rate::${successRate}`);
      console.log(`::set-output name=total-errors::${summary.totalErrors}`);
    }
  }

  async generateBadgeData(result) {
    const { summary } = result;
    const successRate = Math.round((summary.passedPages / summary.testedPages) * 100);
    const color = successRate >= 90 ? 'brightgreen' : successRate >= 70 ? 'yellow' : 'red';
    
    const badgeData = {
      schemaVersion: 1,
      label: 'accessibility',
      message: `${successRate}%`,
      color: color
    };
    
    const badgePath = path.join(this.config.outputDir, 'accessibility-badge.json');
    fs.writeFileSync(badgePath, JSON.stringify(badgeData, null, 2));
    console.log(`   📄 Badge data: ${badgePath}`);
  }

  async generateMetrics(result) {
    const { summary } = result;
    const metrics = {
      timestamp: new Date().toISOString(),
      testedPages: summary.testedPages,
      passedPages: summary.passedPages,
      failedPages: summary.failedPages,
      totalErrors: summary.totalErrors,
      totalWarnings: summary.totalWarnings,
      successRate: Math.round((summary.passedPages / summary.testedPages) * 100),
      duration: result.duration,
      commit: process.env.GITHUB_SHA || process.env.CI_COMMIT_SHA || 'unknown',
      branch: process.env.GITHUB_REF || process.env.CI_COMMIT_BRANCH || 'unknown'
    };
    
    const metricsPath = path.join(this.config.outputDir, 'metrics.json');
    fs.writeFileSync(metricsPath, JSON.stringify(metrics, null, 2));
    console.log(`   📄 Metrics: ${metricsPath}`);
  }

  async sendNotifications(result, exitCode) {
    // Slack notification example
    if (process.env.SLACK_WEBHOOK_URL) {
      await this.sendSlackNotification(result, exitCode);
    }
    
    // Teams notification example
    if (process.env.TEAMS_WEBHOOK_URL) {
      await this.sendTeamsNotification(result, exitCode);
    }
  }

  async sendSlackNotification(result, exitCode) {
    const { summary } = result;
    const successRate = Math.round((summary.passedPages / summary.testedPages) * 100);
    const status = exitCode === 0 ? '✅ PASSED' : '❌ FAILED';
    const color = exitCode === 0 ? 'good' : 'danger';
    
    const payload = {
      attachments: [{
        color,
        title: `Accessibility Test ${status}`,
        fields: [
          { title: 'Success Rate', value: `${successRate}%`, short: true },
          { title: 'Pages Tested', value: summary.testedPages, short: true },
          { title: 'Total Errors', value: summary.totalErrors, short: true },
          { title: 'Duration', value: `${Math.round(result.duration / 1000)}s`, short: true }
        ],
        footer: 'AuditMySite SDK',
        ts: Math.floor(Date.now() / 1000)
      }]
    };

    try {
      const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log('   📱 Slack notification sent');
      }
    } catch (error) {
      console.warn('   ⚠️  Failed to send Slack notification:', error.message);
    }
  }
}

// =============================================================================
// CLI Interface
// =============================================================================

async function main() {
  const sitemapUrl = process.argv[2];
  
  if (!sitemapUrl) {
    console.error('Usage: node ci-cd-integration.js <sitemap-url>');
    console.error('');
    console.error('Environment variables:');
    console.error('  AUDIT_MAX_PAGES=10');
    console.error('  AUDIT_FORMATS=json,html');
    console.error('  AUDIT_FAIL_ON_ERRORS=true');
    console.error('  AUDIT_ERROR_THRESHOLD=5');
    console.error('  AUDIT_SUCCESS_RATE_THRESHOLD=80');
    console.error('  SLACK_WEBHOOK_URL=https://hooks.slack.com/...');
    process.exit(1);
  }

  const pipeline = new CIPipelineIntegration();
  const { exitCode } = await pipeline.runCIPipeline(sitemapUrl);
  
  process.exit(exitCode);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Pipeline crashed:', error.message);
    process.exit(1);
  });
}

module.exports = { CIPipelineIntegration };
