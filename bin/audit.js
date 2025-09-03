#!/usr/bin/env node

const { Command } = require('commander');
const { StandardPipeline } = require('../dist/core');
const inquirer = require('inquirer').default;
const path = require('path');
const ora = require('ora').default || require('ora');

const program = new Command();

// 🎯 SIMPLIFIED CLI - Only 6 essential options!
program
  .name('auditmysite')
  .description('🎯 Simple accessibility testing - just works!')
  .version('1.3.0')
  .argument('<sitemapUrl>', 'URL of the sitemap.xml to test')
  
  // ✅ Only these 6 ESSENTIAL options:
  .option('--full', 'Test all pages instead of just 5 (default: 5 pages)')
  .option('--expert', 'Interactive expert mode with custom settings')
  .option('--format <type>', 'Report format: html or markdown', 'html')
  .option('--output-dir <dir>', 'Output directory for reports', './reports')
  .option('--non-interactive', 'Skip prompts for CI/CD (use defaults)')
  .option('-v, --verbose', 'Show detailed progress information')
  
  // 🚀 Tauri Integration Options
  .option('--stream', 'Enable streaming output for desktop integration')
  .option('--session-id <id>', 'Session ID for tracking (required with --stream)')
  .option('--chunk-size <size>', 'Chunk size for large reports', '1000')
  
  .action(async (sitemapUrl, options) => {
    // 🚀 Tauri Integration: Streaming Mode
    if (options.stream) {
      if (!options.sessionId) {
        console.error('Error: --session-id is required when using --stream mode');
        process.exit(1);
      }
      await runStreamingAudit(sitemapUrl, options);
      return;
    }
    
    console.log('🚀 AuditMySite v1.3 - Enhanced Accessibility Testing');
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
          message: '🔢 How many pages to test?',
          choices: [
            { name: '⚡ 5 pages (Quick test) - ~2 minutes', value: 5 },
            { name: '🎯 20 pages (Standard test) - ~8 minutes', value: 20 },
            { name: '📊 50 pages (Comprehensive) - ~20 minutes', value: 50 },
            { name: '🚀 All pages (Maximum coverage) - varies', value: 1000 }
          ],
          default: 20
        },
        {
          type: 'list', 
          name: 'standard',
          message: '♿ Accessibility standard?',
          choices: [
            { name: '🎯 WCAG 2.1 AA (Recommended) - Industry standard', value: 'WCAG2AA' },
            { name: '⭐ WCAG 2.1 AAA (Strict) - Highest compliance', value: 'WCAG2AAA' },
            { name: '🇺🇸 Section 508 (US Federal) - Government sites', value: 'Section508' }
          ],
          default: 'WCAG2AA'
        },
        {
          type: 'list',
          name: 'format',
          message: '📄 Report format?',
          choices: [
            { name: '🌐 HTML - Professional reports for stakeholders', value: 'html' },
            { name: '📝 Markdown - Developer-friendly, version control', value: 'markdown' }
          ],
          default: 'html'
        },
        {
          type: 'confirm',
          name: 'generatePerformanceReport',
          message: '⚡ Include Core Web Vitals performance metrics?',
          default: true
        },
        {
          type: 'number',
          name: 'maxConcurrent',
          message: '🔄 Concurrent page tests (1-5)?',
          default: 2,
          validate: (value) => {
            const num = parseInt(value);
            if (num >= 1 && num <= 5) return true;
            return 'Please enter a number between 1 and 5';
          }
        },
        {
          type: 'confirm',
          name: 'verbose',
          message: '🔍 Show detailed progress information?',
          default: false
        },
        {
          type: 'confirm',
          name: 'modernHtml5',
          message: '🔥 Enable enhanced HTML5 elements testing (details, dialog, semantic)?',
          default: true
        },
        {
          type: 'confirm',
          name: 'ariaEnhanced',
          message: '⚡ Enable enhanced ARIA analysis with impact scoring?',
          default: true
        },
        {
          type: 'confirm',
          name: 'chrome135Features',
          message: '🚀 Enable Chrome 135 specific features and optimizations?',
          default: true
        },
        {
          type: 'confirm',
          name: 'semanticAnalysis',
          message: '📊 Enable semantic structure analysis and recommendations?',
          default: true
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
    
    // Declare spinner in outer scope for error handling
    let spinner;
    
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
        testFocusManagement: false,         // Fokus auf Core-Tests
        
        // 🔥 Enhanced v1.3 Features  
        modernHtml5: config.modernHtml5 !== undefined ? config.modernHtml5 : true,
        ariaEnhanced: config.ariaEnhanced !== undefined ? config.ariaEnhanced : true,
        chrome135Features: config.chrome135Features !== undefined ? config.chrome135Features : true,
        semanticAnalysis: config.semanticAnalysis !== undefined ? config.semanticAnalysis : true
      };
      
      console.log('\n🎯 Starting accessibility test...');
      
      // Create progress spinner with time estimates
      const totalPages = config.maxPages === 1000 ? 'all' : config.maxPages;
      const estimatedTime = calculateEstimatedTime(config.maxPages, config.maxConcurrent);
      
      spinner = ora({
        text: `Testing ${totalPages} pages - Estimated time: ${estimatedTime}`,
        color: 'cyan',
        spinner: 'dots12'
      }).start();
      
      const startTime = Date.now();
      let pagesProcessed = 0;
      
      // Create enhanced progress tracking
      const originalRun = pipeline.run.bind(pipeline);
      pipeline.run = async (options) => {
        // Add progress callback to options
        const enhancedOptions = {
          ...options,
          enableProgressBar: true,
          progressCallback: (current, total, currentUrl) => {
            pagesProcessed = current;
            const elapsed = Math.round((Date.now() - startTime) / 1000);
            const remaining = total > current ? Math.round(elapsed * (total - current) / current) : 0;
            const percentage = Math.round((current / total) * 100);
            
            spinner.text = `[${current}/${total}] ${percentage}% - ${formatTime(elapsed)} elapsed, ~${formatTime(remaining)} remaining\n   Current: ${truncateUrl(currentUrl)}`;
          }
        };
        
        return originalRun(enhancedOptions);
      };
      
      const { summary, outputFiles } = await pipeline.run(pipelineOptions);
      
      const totalTime = Math.round((Date.now() - startTime) / 1000);
      spinner.succeed(`✅ Completed ${summary.testedPages} pages in ${formatTime(totalTime)}`);
      
      // Restore original method
      pipeline.run = originalRun;
      
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
      spinner?.fail('❌ Test failed');
      
      // Enhanced error categorization and recovery
      const errorType = categorizeError(error);
      console.error(`\n❌ ${errorType.type}: ${errorType.message}`);
      
      if (errorType.recoverable && !options.nonInteractive) {
        console.log('\n🔄 Attempting automatic recovery...');
        
        try {
          // Try with safer options
          const recoverySpin = ora('Retrying with conservative settings...').start();
          
          const saferOptions = {
            ...pipelineOptions,
            maxConcurrent: 1,
            timeout: 20000,
            collectPerformanceMetrics: false,
            maxPages: Math.min(pipelineOptions.maxPages, 3)
          };
          
          const { summary, outputFiles } = await pipeline.run(saferOptions);
          
          recoverySpin.succeed('✅ Recovery successful with limited scope');
          console.log('⚠️  Note: Test completed with reduced scope due to initial error');
          
          // Continue with success output but warn user
          const successRate = summary.testedPages > 0 ? 
            (summary.passedPages / summary.testedPages * 100).toFixed(1) : 0;
          
          console.log(`\n📊 Partial Results:`);
          console.log(`   📄 Tested: ${summary.testedPages} pages (reduced from ${pipelineOptions.maxPages})`);
          console.log(`   ✅ Passed: ${summary.passedPages}`);
          console.log(`   ❌ Failed: ${summary.failedPages}`);
          console.log(`   ⚠️  Success Rate: ${successRate}%`);
          
          if (outputFiles.length > 0) {
            console.log(`\n📁 Generated reports:`);
            outputFiles.forEach(file => {
              console.log(`   📄 ${path.basename(file)}`);
            });
          }
          
          console.log('\n💡 Recommendation: Try running with --expert mode for more control');
          process.exit(summary.failedPages > 0 ? 1 : 0);
          
        } catch (recoveryError) {
          console.error('❌ Recovery attempt failed:', categorizeError(recoveryError).message);
        }
      }
      
      // Show helpful suggestions
      console.log('\n💡 Troubleshooting suggestions:');
      errorType.suggestions.forEach(suggestion => {
        console.log(`   • ${suggestion}`);
      });
      
      if (options.verbose) {
        console.log('\n🔍 Full error details:');
        console.error(error.stack);
      } else {
        console.log('\n🔍 Run with --verbose for detailed error information');
      }
      
      process.exit(1);
    }
  });

// Helper functions for progress tracking
function calculateEstimatedTime(pages, concurrent = 2) {
  if (pages === 1000) return '10-60 min';
  const avgTimePerPage = 12; // seconds
  const totalTime = Math.round((pages * avgTimePerPage) / concurrent);
  return formatTime(totalTime);
}

function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function truncateUrl(url) {
  if (!url) return 'Processing...';
  return url.length > 50 ? url.substring(0, 47) + '...' : url;
}

function categorizeError(error) {
  const message = error.message || String(error);
  const stack = error.stack || '';
  
  // Network/Connection errors
  if (message.includes('ENOTFOUND') || message.includes('ECONNREFUSED') || 
      message.includes('net::ERR_') || message.includes('timeout')) {
    return {
      type: 'Network Error',
      message: 'Cannot connect to the website or sitemap',
      recoverable: true,
      suggestions: [
        'Check if the website URL is correct and accessible',
        'Verify your internet connection',
        'Try running the test later if the site is temporarily down',
        'Use --expert mode to increase timeout settings'
      ]
    };
  }
  
  // Sitemap parsing errors  
  if (message.includes('sitemap') || message.includes('XML') || message.includes('parsing')) {
    return {
      type: 'Sitemap Error',
      message: 'Cannot parse or access the sitemap.xml',
      recoverable: false,
      suggestions: [
        'Verify the sitemap URL is correct (should end with /sitemap.xml)',
        'Check if the sitemap is properly formatted XML',
        'Ensure the sitemap is publicly accessible',
        'Try testing a single page instead of the full sitemap'
      ]
    };
  }
  
  // Browser/Playwright errors
  if (message.includes('browser') || message.includes('playwright') || 
      message.includes('chromium') || stack.includes('playwright')) {
    return {
      type: 'Browser Error',
      message: 'Browser automation failed',
      recoverable: true,
      suggestions: [
        'Try reducing concurrent tests with --expert mode',
        'Restart your terminal and try again',
        'Check available system memory (close other applications)',
        'Run with --verbose for more detailed browser logs'
      ]
    };
  }
  
  // Memory/Resource errors
  if (message.includes('memory') || message.includes('ENOMEM') || 
      message.includes('heap') || message.includes('allocation')) {
    return {
      type: 'Resource Error',
      message: 'Insufficient system resources',
      recoverable: true,
      suggestions: [
        'Reduce the number of pages tested (use --expert mode)',
        'Close other applications to free memory',
        'Test pages in smaller batches',
        'Reduce concurrent tests to 1'
      ]
    };
  }
  
  // Permission errors
  if (message.includes('EACCES') || message.includes('permission') || message.includes('EPERM')) {
    return {
      type: 'Permission Error',
      message: 'Insufficient permissions',
      recoverable: false,
      suggestions: [
        'Run the command with appropriate permissions',
        'Check if the output directory is writable',
        'Ensure Node.js has permission to create browser profiles'
      ]
    };
  }
  
  // Generic/Unknown errors
  return {
    type: 'Unknown Error',
    message: message.length > 100 ? message.substring(0, 97) + '...' : message,
    recoverable: true,
    suggestions: [
      'Try running with --verbose for more details',
      'Use --expert mode for custom settings',
      'Test with fewer pages first',
      'Check the GitHub issues page for similar problems'
    ]
  };
}

// 🚀 Streaming Audit Function for Tauri Integration
async function runStreamingAudit(sitemapUrl, options) {
  const { StreamingReporter } = require('../dist/core/reporting/streaming-reporter');
  const { StandardPipeline } = require('../dist/core');
  
  const streamingReporter = StreamingReporter.create(
    options.sessionId,
    process.stdout,
    {
      enabled: true,
      chunkSize: parseInt(options.chunkSize) || 10,
      bufferTimeout: 1000,
      includeDetailedResults: true,
      compressResults: false
    }
  );
  
  try {
    // Initialize streaming session
    streamingReporter.init(options.full ? 1000 : 5, {});
    
    // Report initial progress
    streamingReporter.reportProgress({
      current: 0,
      total: options.full ? 1000 : 5,
      currentUrl: sitemapUrl,
      stage: 'parsing_sitemap'
    });
    
    // Configure pipeline options
    const config = {
      maxPages: options.full ? 1000 : 5,
      standard: 'WCAG2AA',
      format: options.format || 'html',
      outputDir: options.outputDir || './reports',
      timeout: 30000,
      generateDetailedReport: true,
      generatePerformanceReport: true,
      generateSeoReport: false,
      generateSecurityReport: false,
      outputFormat: options.format || 'html',
      maxConcurrent: 2,
      verbose: options.verbose || false,
      timestamp: new Date().toISOString(),
      collectPerformanceMetrics: true,
      
      // 🔥 Enhanced v1.3 Features (all enabled by default for streaming)
      modernHtml5: true,
      ariaEnhanced: true,
      chrome135Features: true,
      semanticAnalysis: true
    };
    
    const pipeline = new StandardPipeline();
    
    // Override pipeline progress reporting for streaming
    const originalProgressCallback = config.progressCallback;
    config.progressCallback = (current, total, currentUrl) => {
      streamingReporter.reportProgress({
        current,
        total,
        currentUrl: currentUrl || 'Processing...',
        stage: 'testing_pages'
      });
      
      if (originalProgressCallback) {
        originalProgressCallback(current, total, currentUrl);
      }
    };
    
    const { summary, outputFiles } = await pipeline.run({
      sitemapUrl,
      ...config
    });
    
    // Report completion
    streamingReporter.complete(summary, summary.testedPages, summary.passedPages);
    
    // Clean exit for streaming mode
    process.exit(summary.failedPages > 0 ? 1 : 0);
    
  } catch (error) {
    streamingReporter.reportError(
      error.message || String(error),
      sitemapUrl,
      'streaming_audit',
      false
    );
    
    process.exit(1);
  } finally {
    streamingReporter.cleanup();
  }
}

program.parse();
