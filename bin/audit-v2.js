#!/usr/bin/env node

const { Command } = require('commander');
const { StandardPipeline } = require('../dist/core');
const inquirer = require('inquirer').default;
const path = require('path');

const program = new Command();

// 🎯 SIMPLIFIED CLI - Only 6 essential options!
program
  .name('auditmysite')
  .description('🎯 Simple accessibility testing - just works!')
  .version('1.1.0')
  .argument('<sitemapUrl>', 'URL of the sitemap.xml to test')
  
  // ✅ Only these 6 ESSENTIAL options:
  .option('--full', 'Test all pages instead of just 5 (default: 5 pages)')
  .option('--expert', 'Interactive expert mode with custom settings')
  .option('--format <type>', 'Report format: html or markdown', 'html')
  .option('--output-dir <dir>', 'Output directory for reports', './reports')
  .option('--non-interactive', 'Skip prompts for CI/CD (use defaults)')
  .option('-v, --verbose', 'Show detailed progress information')
  
  .action(async (sitemapUrl, options) => {
    console.log('🚀 AuditMySite v1.1 - Simple Accessibility Testing');
    console.log(`📄 Sitemap: ${sitemapUrl}`);
    
    // 🎯 SMART DEFAULTS
    const QUICK_DEFAULTS = {
      maxPages: options.full ? 1000 : 5,
      standard: 'WCAG2AA',
      format: options.format || 'html',
      outputDir: options.outputDir || './reports',
      timeout: 10000,
      maxConcurrent: 2,
      generateDetailedReport: true,
      generatePerformanceReport: true,
      generateSeoReport: false,        // ❌ Removed 
      generateSecurityReport: false,   // ❌ Removed
      usePa11y: true,
      lighthouse: false,               // ❌ Removed Lighthouse
      captureScreenshots: false,      // ❌ Removed
      verbose: options.verbose || false
    };
    
    let config = { ...QUICK_DEFAULTS };
    
    // 🔧 EXPERT MODE - Interactive wizard
    if (options.expert && !options.nonInteractive) {
      console.log('\n🔧 Expert Mode - Custom Configuration');
      console.log('━'.repeat(50));
      
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'maxPages',
          message: 'How many pages to test?',
          choices: [
            { name: '5 pages (Quick test)', value: 5 },
            { name: '20 pages (Standard test)', value: 20 },
            { name: '50 pages (Comprehensive)', value: 50 },
            { name: 'All pages (Maximum coverage)', value: 1000 }
          ],
          default: 20
        },
        {
          type: 'list', 
          name: 'standard',
          message: 'Accessibility standard?',
          choices: [
            { name: 'WCAG 2.1 AA (Recommended)', value: 'WCAG2AA' },
            { name: 'WCAG 2.1 AAA (Strict)', value: 'WCAG2AAA' },
            { name: 'Section 508 (US Federal)', value: 'Section508' }
          ],
          default: 'WCAG2AA'
        },
        {
          type: 'confirm',
          name: 'generatePerformanceReport',
          message: 'Include basic performance metrics (Core Web Vitals)?',
          default: true
        },
        {
          type: 'confirm',
          name: 'verbose',
          message: 'Show detailed progress information?',
          default: false
        }
      ]);
      
      config = { ...config, ...answers };
    }
    
    // 📊 Show configuration
    console.log(`\n📋 Configuration:`);
    console.log(`   📄 Pages: ${config.maxPages === 1000 ? 'All' : config.maxPages}`);
    console.log(`   📋 Standard: ${config.standard}`);
    console.log(`   📊 Performance: ${config.generatePerformanceReport ? 'Yes' : 'No'}`);
    console.log(`   📄 Format: ${config.format.toUpperCase()}`);
    console.log(`   📁 Output: ${config.outputDir}`);
    
    try {
      // Extract domain for report organization
      const url = new URL(sitemapUrl);
      const domain = url.hostname.replace(/\\./g, '-');
      const dateOnly = new Date().toLocaleDateString('en-CA');
      
      // Create domain subdirectory
      const fs = require('fs');
      const subDir = path.join(config.outputDir, domain);
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
      
      // 🚀 Run the pipeline with simplified options
      const pipeline = new StandardPipeline();
      
      const pipelineOptions = {
        sitemapUrl,
        maxPages: config.maxPages,
        timeout: config.timeout,
        pa11yStandard: config.standard,
        outputDir: subDir,
        generateDetailedReport: config.generateDetailedReport,
        generatePerformanceReport: config.generatePerformanceReport,
        generateSeoReport: false,           // ❌ Always false now
        generateSecurityReport: false,      // ❌ Always false now
        outputFormat: config.format,
        maxConcurrent: config.maxConcurrent,
        verbose: config.verbose,
        timestamp: new Date().toISOString(),
        // 🆕 Performance-Metriken aktivieren
        collectPerformanceMetrics: true,    // ✅ Web Vitals immer aktiviert
        captureScreenshots: false,          // Optional für Tests
        testKeyboardNavigation: false,      // Fokus auf Core-Tests
        testColorContrast: false,          // Fokus auf Core-Tests
        testFocusManagement: false         // Fokus auf Core-Tests
      };
      
      console.log('\n🎯 Running accessibility test...');
      const { summary, outputFiles } = await pipeline.run(pipelineOptions);
      
      // 🎉 Success output
      console.log('\n✅ Test completed successfully!');
      console.log(`📊 Results:`);
      console.log(`   📄 Tested: ${summary.testedPages} pages`);
      console.log(`   ✅ Passed: ${summary.passedPages}`);
      console.log(`   ❌ Failed: ${summary.failedPages}`);
      console.log(`   ⚠️  Errors: ${summary.totalErrors}`);
      console.log(`   ⚠️  Warnings: ${summary.totalWarnings}`);
      
      const successRate = summary.testedPages > 0 ? 
        (summary.passedPages / summary.testedPages * 100).toFixed(1) : 0;
      console.log(`   🎯 Success Rate: ${successRate}%`);
      
      // Show generated files
      if (outputFiles.length > 0) {
        console.log(`\\n📁 Generated reports:`);
        outputFiles.forEach(file => {
          console.log(`   📄 ${path.basename(file)}`);
        });
      }
      
      if (summary.failedPages > 0) {
        console.log(`\\n⚠️  ${summary.failedPages} pages failed accessibility tests`);
        process.exit(1);
      }
      
    } catch (error) {
      console.error('❌ Error during test:', error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();
