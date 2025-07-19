#!/usr/bin/env node

const { Command } = require('commander');
const { StandardPipeline } = require('../dist/core/standard-pipeline');
const inquirer = require('inquirer').default;
const path = require('path');

const program = new Command();

program
  .name('auditmysite')
  .description('A powerful command-line tool for automated accessibility testing using Playwright and pa11y, based on sitemap URLs')
  .version('1.0.0')
  .argument('<sitemapUrl>', 'URL of the sitemap.xml to test')
  .option('-m, --max-pages <number>', 'Maximum number of pages to test')
  .option('-t, --timeout <number>', 'Timeout in milliseconds', '10000')
  .option('-w, --wait-until <string>', 'Wait until (domcontentloaded|load|networkidle)', 'domcontentloaded')
  .option('-f, --filter <patterns>', 'Exclude URL patterns (comma-separated)')
  .option('-i, --include <patterns>', 'Include URL patterns (comma-separated)')
  .option('-v, --verbose', 'Verbose output')
  .option('--standard <standard>', 'Accessibility standard (WCAG2A|WCAG2AA|WCAG2AAA|Section508)', 'WCAG2AA')
  .option('--output-dir <dir>', 'Output directory for reports', './reports')
  .option('--include-details', 'Include detailed information in output')
  .option('--include-pa11y', 'Include pa11y issues in output')
  .option('--pa11y-standard <standard>', 'Pa11y standard (WCAG2A|WCAG2AA|WCAG2AAA|Section508)', 'WCAG2AA')
  .option('--hide-elements <selectors>', 'CSS selectors to hide from pa11y tests')
  .option('--include-notices', 'Include pa11y notices in output')
  .option('--include-warnings', 'Include pa11y warnings in output', true)
  .option('--pa11y-wait <ms>', 'Wait time after page load for pa11y tests', '1000')
  .option('--performance-metrics', 'Collect performance metrics')
  .option('--screenshots', 'Capture desktop and mobile screenshots')
  .option('--keyboard-tests', 'Test keyboard navigation')
  .option('--color-contrast', 'Test color contrast (simplified)')
  .option('--focus-management', 'Test focus management')
  .option('--block-images', 'Block images for faster testing')
  .option('--block-css', 'Block CSS for faster testing')
  .option('--mobile-emulation', 'Enable mobile emulation')
  .option('--viewport <size>', 'Set viewport size (e.g., 1920x1080)', '1920x1080')
  .option('--user-agent <agent>', 'Set custom user agent (default: auditmysite/1.0)')
  .option('--detailed-report', 'Generate detailed error report for automated fixes')
  .option('--performance-report', 'Generate performance report with PageSpeed/Lightspeed analysis')
  .option('--no-performance-report', 'Disable performance report generation')
  .option('--seo-report', 'Generate SEO report with search engine optimization analysis')
  .option('--no-seo-report', 'Disable SEO report generation')
  .option('--security-scan', 'Run comprehensive security scan (headers, HTTPS, CSP, vulnerabilities)')
  .option('--no-security-scan', 'Disable security scan')
  .option('--security-report', 'Generate detailed security report')
  .option('--no-security-report', 'Disable security report generation')
  .option('--skip-csp-localhost', 'Skip CSP test for localhost (faster development testing)')
  // 🆕 pa11y-Optionen
  .option('--use-pa11y', 'Use pa11y for detailed accessibility testing (slower, more memory)')
  .option('--no-pa11y', 'Disable pa11y, use only Playwright tests (faster, less memory)')
  // 🆕 Lighthouse-Optionen
  .option('--lighthouse', 'Run Lighthouse tests for performance, accessibility, best practices, and SEO')
  .option('--core-web-vitals', 'Test Core Web Vitals performance metrics (LCP, FID, CLS, FCP, TTI, TBT)')
  .option('--touch-targets', 'Test touch target sizes for mobile accessibility (44px minimum)')
  .option('--pwa', 'Test Progressive Web App features (manifest, service worker, installability)')
  // 🚀 Parallele Test-Optionen (Queue ist jetzt Standard)
  .option('--max-concurrent <number>', 'Number of parallel workers (default: 3)', '3')
  .option('--concurrency <number>', 'Alias for --max-concurrent')
  .option('--max-workers <number>', 'Alias for --max-concurrent')
  .option('--max-retries <number>', 'Maximum retry attempts for failed tests (default: 3)', '3')
  .option('--retry-delay <ms>', 'Delay between retry attempts in milliseconds (default: 2000)', '2000')
  .option('--no-progress-bar', 'Disable live progress bar')
  .option('--progress-interval <ms>', 'Progress update interval in milliseconds (default: 1000)', '1000')
  .option('--no-resource-monitoring', 'Disable resource monitoring (memory/CPU)')
  .option('--max-memory <mb>', 'Maximum memory usage in MB (default: 512)', '512')
  .option('--max-cpu <percent>', 'Maximum CPU usage percentage (default: 80)', '80')
  // 🆕 Legacy-Option für sequenzielle Tests
  .option('--sequential', 'Use sequential testing (legacy mode, slower)')
  // 🆕 Output-Format-Optionen
  .option('--html', 'Generate HTML report instead of Markdown')
  .option('--no-copy-buttons', 'Disable copy-to-clipboard buttons in HTML report')
  // 🆕 Non-Interactive Modus für automatisierte Tests
  .option('--non-interactive', 'Skip all interactive prompts and use defaults (for CI/CD)')
  .action(async (sitemapUrl, options) => {
    console.log('🚀 Starte Accessibility-Test...');
    console.log(`📄 Sitemap: ${sitemapUrl}`);
    
    // Handle alias options for parallel workers
    let maxConcurrent = options.maxConcurrent;
    if (options.concurrency) maxConcurrent = options.concurrency;
    if (options.maxWorkers) maxConcurrent = options.maxWorkers;
    
    // Interactive prompts for all options if not specified
    let maxPages = options.maxPages;
    let standard = options.standard || 'WCAG2AA'; // Default standard
    let generateDetailedReport = options.detailedReport;
    let generatePerformanceReport = options.performanceReport;
    let generateSeoReport = options.seoReport;
    let generateSecurityReport = options.securityReport;
    
    // Handle negative flags (--no-* options)
    if (options.noDetailedReport) generateDetailedReport = false;
    if (options.noPerformanceReport) generatePerformanceReport = false;
    if (options.noSeoReport) generateSeoReport = false;
    if (options.noSecurityReport) generateSecurityReport = false;
    
    // Set sensible defaults for all parameters if not provided
    if (generateDetailedReport === undefined) generateDetailedReport = true;
    if (generatePerformanceReport === undefined) generatePerformanceReport = true;
    if (generateSeoReport === undefined) generateSeoReport = true;
    if (generateSecurityReport === undefined) generateSecurityReport = true;
    
        // Show prompts for parameters that are not set via CLI
    // Only skip prompts for parameters that are explicitly provided
    const maxPagesChoices = [
      { name: '5 pages (Quick test)', value: 5 },
      { name: '10 pages (Standard test)', value: 10 },
      { name: '20 pages (Comprehensive test)', value: 20 },
      { name: '50 pages (Full audit)', value: 50 },
      { name: '100 pages (Complete analysis)', value: 100 },
      { name: 'All pages (Maximum coverage)', value: 1000 }
    ];
    
    const standardChoices = [
      { name: 'WCAG 2.0 Level A (Basic)', value: 'WCAG2A' },
      { name: 'WCAG 2.0 Level AA (Recommended)', value: 'WCAG2AA' },
      { name: 'WCAG 2.0 Level AAA (Strict)', value: 'WCAG2AAA' },
      { name: 'Section 508 (US Federal)', value: 'Section508' }
    ];
    
    const prompts = [];
    
    // Only ask for maxPages if not provided via CLI
    if (!options.maxPages) {
      prompts.push({
        type: 'list',
        name: 'maxPages',
        message: 'How many pages would you like to test?',
        choices: maxPagesChoices,
        default: 20
      });
    }
    
    // Only ask for standard if not provided via CLI
    if (!options.standard) {
      prompts.push({
        type: 'list',
        name: 'standard',
        message: 'Which accessibility standard would you like to test against?',
        choices: standardChoices,
        default: standard
      });
    }
    
    // Only ask for detailed report if not provided via CLI
    if (options.detailedReport === undefined && !options.noDetailedReport) {
      prompts.push({
        type: 'confirm',
        name: 'generateDetailedReport',
        message: 'Would you like to generate a detailed error report for automated fixes?',
        default: true
      });
    }
    
    // Only ask for performance report if not provided via CLI
    if (options.performanceReport === undefined && !options.noPerformanceReport) {
      prompts.push({
        type: 'confirm',
        name: 'generatePerformanceReport',
        message: 'Would you like to generate a performance report with PageSpeed/Lightspeed analysis?',
        default: true
      });
    }
    
    // Only ask for SEO report if not provided via CLI
    if (options.seoReport === undefined && !options.noSeoReport) {
      prompts.push({
        type: 'confirm',
        name: 'generateSeoReport',
        message: 'Would you like to generate an SEO report with search engine optimization analysis?',
        default: true
      });
    }
    
    // Only ask for security report if not provided via CLI
    if (options.securityReport === undefined && !options.noSecurityReport) {
      prompts.push({
        type: 'confirm',
        name: 'generateSecurityReport',
        message: 'Would you like to run a comprehensive security scan (headers, HTTPS, CSP, vulnerabilities)?',
        default: true
      });
    }
    
    // Nur Prompts anzeigen, wenn welche vorhanden sind und nicht im non-interactive Modus
    if (prompts.length > 0 && !options.nonInteractive) {
      const answers = await inquirer.prompt(prompts);
      
      // Werte aus Prompts aktualisieren (nur für Parameter, die abgefragt wurden)
      if (!options.maxPages) maxPages = answers.maxPages;
      if (!options.standard) standard = answers.standard;
      if (options.detailedReport === undefined && !options.noDetailedReport) generateDetailedReport = answers.generateDetailedReport;
      if (options.performanceReport === undefined && !options.noPerformanceReport) generatePerformanceReport = answers.generatePerformanceReport;
      if (options.seoReport === undefined && !options.noSeoReport) generateSeoReport = answers.generateSeoReport;
      if (options.securityReport === undefined && !options.noSecurityReport) generateSecurityReport = answers.generateSecurityReport;
    } else if (options.nonInteractive && prompts.length > 0) {
      // Im non-interactive Modus Standardwerte für alle Prompts verwenden
      console.log('🤖 Non-interactive Modus: Verwende Standardwerte für alle Prompts');
      if (!options.maxPages) maxPages = 20; // Standard: umfassender Test
      if (!options.standard) standard = 'WCAG2AA'; // Standard-Standard
      // Andere Standardwerte sind bereits oben gesetzt
    }
    
    // Set default for maxPages if not provided via CLI or prompts
    if (!maxPages) maxPages = 20;
    
    // Setze Standardwerte für Output-Format
    let outputFormat = options.html ? 'html' : 'markdown';
    let includeCopyButtons = !options.noCopyButtons;

    // Prompt für Output-Format (falls nicht gesetzt und nicht non-interactive)
    if (!options.html && !options.noCopyButtons && !options.nonInteractive) {
      const formatAnswer = await inquirer.prompt([{
        type: 'list',
        name: 'outputFormat',
        message: 'Welches Ausgabeformat möchten Sie verwenden?',
        choices: [
          { name: 'Markdown (Standard)', value: 'markdown' },
          { name: 'HTML (Interaktiv mit Copy-Buttons)', value: 'html' }
        ],
        default: 'markdown'
      }]);
      
      outputFormat = formatAnswer.outputFormat;
      
      if (outputFormat === 'html') {
        const copyButtonsAnswer = await inquirer.prompt([{
          type: 'confirm',
          name: 'includeCopyButtons',
          message: 'Copy-to-Clipboard Buttons für AI-kompatible Daten aktivieren?',
          default: true
        }]);
        includeCopyButtons = copyButtonsAnswer.includeCopyButtons;
      }
    } else if (options.nonInteractive && !options.html && !options.noCopyButtons) {
      // Im non-interactive Modus Markdown als Standard verwenden
      console.log('🤖 Non-interactive Modus: Verwende Markdown-Ausgabeformat');
      outputFormat = 'markdown';
      includeCopyButtons = false; // Nicht anwendbar für Markdown
    }
    
    // Ensure maxPages is a number
    maxPages = parseInt(maxPages);
    
    console.log(`🧪 Max Pages: ${maxPages}`);
    console.log(`⏱️  Timeout: ${options.timeout}ms`);
    console.log(`📋 Standard: ${standard}`);
    console.log(`📋 Detailed Report: ${generateDetailedReport ? 'Yes' : 'No'}`);
    console.log(`📋 Performance Report: ${generatePerformanceReport ? 'Yes' : 'No'}`);
    console.log(`📋 SEO Report: ${generateSeoReport ? 'Yes' : 'No'}`);
    console.log(`🔒 Security Report: ${generateSecurityReport ? 'Yes' : 'No'}`);
    console.log(`🚀 Queue Processing: ${options.sequential ? 'No (sequential)' : 'Yes (standard)'}`);
    console.log(`📄 Output Format: ${outputFormat.toUpperCase()}`);
    if (outputFormat === 'html') {
      console.log(`📋 Copy Buttons: ${includeCopyButtons ? 'Yes' : 'No'}`);
    }
    if (!options.sequential) {
      console.log(`🔧 Parallel Workers: ${maxConcurrent}`);
      console.log(`🔄 Max Retries: ${options.maxRetries}`);
      console.log(`⏱️  Retry Delay: ${options.retryDelay}ms`);
    }
    
    try {
      // Extract domain and create subdirectory
      const url = new URL(sitemapUrl);
      const domain = url.hostname.replace(/\./g, '-');
      
      // Verwende lokale Zeitzone statt UTC
      const now = new Date();
      const currentTimestamp = now.toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/(\d{2})\.(\d{2})\.(\d{4}), (\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:$6+02:00');
      
      const dateOnly = now.toLocaleDateString('de-DE', {
        timeZone: 'Europe/Berlin',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).split('.').reverse().join('-'); // DD.MM.YYYY -> YYYY-MM-DD
      
      // Create subdirectory based on domain
      const fs = require('fs');
      const subDir = path.join(options.outputDir, domain);
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
      
      // Use simple filenames without domain
      const filename = `accessibility-report-${dateOnly}.md`;
      const outputPath = path.join(subDir, filename);
      
      // Run standard pipeline
      const pipeline = new StandardPipeline();
      // Parse viewport size if provided
      let viewportSize;
      if (options.viewport) {
        const [width, height] = options.viewport.split('x').map(Number);
        if (width && height) {
          viewportSize = { width, height };
        }
      }

      const pipelineOptions = {
        sitemapUrl,
        maxPages: maxPages,
        timeout: parseInt(options.timeout),
        pa11yStandard: standard,
        outputDir: subDir, // Use subdirectory instead of main output directory
        includeDetails: options.includeDetails,
        includePa11yIssues: options.includePa11y,
        generateDetailedReport: generateDetailedReport,
        generatePerformanceReport: generatePerformanceReport,
        generateSeoReport: generateSeoReport,
        generateSecurityReport: generateSecurityReport,
        skipCspForLocalhost: options.skipCspLocalhost,
        hideElements: options.hideElements,
        includeNotices: options.includeNotices,
        includeWarnings: options.includeWarnings,
        wait: parseInt(options.pa11yWait),
        // 🆕 Neue Playwright-Optionen
        collectPerformanceMetrics: options.performanceMetrics || generatePerformanceReport,
        captureScreenshots: options.screenshots,
        testKeyboardNavigation: options.keyboardTests,
        testColorContrast: options.colorContrast,
        testFocusManagement: options.focusManagement,
        blockImages: options.blockImages,
        blockCSS: options.blockCSS,
        mobileEmulation: options.mobileEmulation,
        viewportSize,
        userAgent: options.userAgent,
        // 🚀 Parallele Test-Optionen
        useSequentialTesting: options.sequential,
        maxConcurrent: parseInt(maxConcurrent),
        maxRetries: parseInt(options.maxRetries),
        retryDelay: parseInt(options.retryDelay),
        enableProgressBar: !options.noProgressBar,
        progressUpdateInterval: parseInt(options.progressInterval),
        enableResourceMonitoring: !options.noResourceMonitoring,
        maxMemoryUsage: parseInt(options.maxMemory),
        maxCpuUsage: parseInt(options.maxCpu),
        // 🆕 Output-Format-Optionen
        outputFormat: outputFormat,
        includeCopyButtons: includeCopyButtons,
        // 🕐 Timestamp für Report-Generierung
        timestamp: currentTimestamp
      };
      
      console.log('🧪 Führe Accessibility-Tests aus...');
      const { summary, outputFiles } = await pipeline.run(pipelineOptions);
      
      // Rename the output file to use domain-based naming
      if (outputFiles.length > 0 && options.markdown !== false) {
        const originalFile = outputFiles[0];
        
        // Stelle sicher, dass die Datei mit aktuellem Timestamp neu generiert wird
        if (fs.existsSync(originalFile)) {
          const content = fs.readFileSync(originalFile, 'utf8');
          const updatedContent = content.replace(
            /Generated: .*/,
            `Generated: ${currentTimestamp}`
          );
          fs.writeFileSync(originalFile, updatedContent, 'utf8');
        }
        
        fs.renameSync(originalFile, outputPath);
        
        console.log('');
        console.log('✅ Test erfolgreich abgeschlossen!');
        console.log(`📊 Ergebnisse:`);
        console.log(`   - Getestete Seiten: ${summary.testedPages}`);
        console.log(`   - Bestanden: ${summary.passedPages}`);
        console.log(`   - Fehlgeschlagen: ${summary.failedPages}`);
        console.log(`   - Fehler: ${summary.totalErrors}`);
        console.log(`   - Warnungen: ${summary.totalWarnings}`);
        console.log(`   - Erfolgsrate: ${summary.testedPages > 0 ? (summary.passedPages / summary.testedPages * 100).toFixed(1) : 0}%`);
        console.log(`📄 Markdown-Bericht: ${outputPath}`);
        
        // Zeige alle generierten Dateien an
        if (outputFiles.length > 0) {
          console.log(`📁 Generierte Dateien:`);
          outputFiles.forEach(file => {
            const filename = path.basename(file);
            if (filename.includes('detailed-errors')) {
              console.log(`   📋 Detaillierter Fehlerbericht: ${file}`);
            } else if (filename.includes('performance-report')) {
              console.log(`   📊 Performance-Bericht: ${file}`);
            } else if (filename.includes('seo-report')) {
              console.log(`   🔍 SEO-Bericht: ${file}`);
            } else if (filename.includes('security-report')) {
              console.log(`   🔒 Security-Bericht: ${file}`);
            } else {
              console.log(`   📄 Markdown-Bericht: ${file}`);
            }
          });
        }
        
        if (summary.failedPages > 0) {
          console.log(`⚠️  ${summary.failedPages} Seiten haben die Accessibility-Tests nicht bestanden`);
          process.exit(1);
        }
      } else {
        console.log('');
        console.log('✅ Test erfolgreich abgeschlossen!');
        console.log(`📊 Ergebnisse:`);
        console.log(`   - Getestete Seiten: ${summary.testedPages}`);
        console.log(`   - Bestanden: ${summary.passedPages}`);
        console.log(`   - Fehlgeschlagen: ${summary.failedPages}`);
        console.log(`   - Fehler: ${summary.totalErrors}`);
        console.log(`   - Warnungen: ${summary.totalWarnings}`);
        
        // Zeige alle generierten Dateien an (auch ohne Markdown)
        if (outputFiles.length > 0) {
          console.log(`📁 Generierte Dateien:`);
          outputFiles.forEach(file => {
            const filename = path.basename(file);
            if (filename.includes('detailed-errors')) {
              console.log(`   📋 Detaillierter Fehlerbericht: ${file}`);
            } else if (filename.includes('performance-report')) {
              console.log(`   📊 Performance-Bericht: ${file}`);
            }
          });
        }
      }
      
    } catch (error) {
      console.error('❌ Fehler während des Tests:', error.message);
      process.exit(1);
    }
  });

program.parse(); 