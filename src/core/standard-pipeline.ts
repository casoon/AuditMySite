import { SitemapParser } from '../parsers';
import { AccessibilityChecker } from './accessibility-checker';
import { OutputGenerator } from '../generators';
import { DetailedReportGenerator, PerformanceReportGenerator, SeoReportGenerator, SecurityReportGenerator } from '../reports';
import { HtmlReportGenerator } from '../reports/html-report-generator';
import { PdfGenerator } from '../generators/pdf-generator';
import { SecurityScanner } from './security-scanner';
import { TestOptions, TestSummary, AccessibilityResult } from '../types';
import * as path from 'path';

export interface StandardPipelineOptions {
  sitemapUrl: string;
  maxPages?: number;
  timeout?: number;
  pa11yStandard?: 'WCAG2A' | 'WCAG2AA' | 'WCAG2AAA' | 'Section508';
  outputDir?: string;
  includeDetails?: boolean;
  includePa11yIssues?: boolean;
  generateDetailedReport?: boolean;
  generatePerformanceReport?: boolean;
  generateSeoReport?: boolean;
  generateSecurityReport?: boolean;
  generatePdfReport?: boolean;
  skipCspForLocalhost?: boolean;
  hideElements?: string;
  includeNotices?: boolean;
  includeWarnings?: boolean;
  wait?: number;
  // 🆕 Neue Playwright-Optionen
  collectPerformanceMetrics?: boolean;
  captureScreenshots?: boolean;
  testKeyboardNavigation?: boolean;
  testColorContrast?: boolean;
  testFocusManagement?: boolean;
  blockImages?: boolean;
  blockCSS?: boolean;
  mobileEmulation?: boolean;
  viewportSize?: { width: number; height: number };
  userAgent?: string;
  // 🚀 Parallele Test-Optionen (Queue ist jetzt Standard)
  maxConcurrent?: number;
  maxRetries?: number;
  retryDelay?: number;
  enableProgressBar?: boolean;
  progressUpdateInterval?: number;
  enableResourceMonitoring?: boolean;
  maxMemoryUsage?: number;
  maxCpuUsage?: number;
  // 🆕 Legacy-Option für sequenzielle Tests (nur für Kompatibilität)
  useSequentialTesting?: boolean;
  // 🆕 Output-Format-Option
  outputFormat?: 'markdown' | 'html' | 'pdf';
  includeCopyButtons?: boolean;
}

export class StandardPipeline {
  
  /**
   * Führt die Standard-Pipeline aus und erstellt KI-freundliche Output-Dateien
   */
  async run(options: StandardPipelineOptions): Promise<{
    summary: TestSummary;
    outputFiles: string[];
  }> {
    const outputDir = options.outputDir || './reports';
    const dateOnly = new Date().toISOString().split('T')[0]; // Nur Datum, kein Timestamp
    
    // Parser initialisieren
    const parser = new SitemapParser();
    
    // Sitemap parsen
    const urls = await parser.parseSitemap(options.sitemapUrl);
    console.log(`📄 Sitemap geladen: ${urls.length} URLs gefunden`);
    
    // URLs filtern
    const filterPatterns = ['[...slug]', '[category]', '/demo/'];
    const filteredUrls = parser.filterUrls(urls, { filterPatterns });
    console.log(`🔍 URLs gefiltert: ${filteredUrls.length} URLs zum Testen`);
    
    // URLs zu lokalen URLs konvertieren
    const baseUrl = new URL(options.sitemapUrl).origin;
    const localUrls = parser.convertToLocalUrls(filteredUrls, baseUrl);
    
    // 🆕 WICHTIG: URLs auf maxPages begrenzen
    const maxPages = options.maxPages || 20;
    const limitedUrls = localUrls.slice(0, maxPages);
    console.log(`📋 URLs auf ${maxPages} begrenzt: ${limitedUrls.length} URLs werden getestet`);
    
    // Accessibility-Checker initialisieren
    const checker = new AccessibilityChecker();
    await checker.initialize();
    
    console.log('🧪 Führe Accessibility-Tests aus...');
    console.log(`   📊 Performance-Metriken sammeln: ${options.collectPerformanceMetrics ? 'Ja' : 'Nein'}`);
    console.log(`   📸 Screenshots aufnehmen: ${options.captureScreenshots ? 'Ja' : 'Nein'}`);
    console.log(`   ⌨️  Tastaturnavigation testen: ${options.testKeyboardNavigation ? 'Ja' : 'Nein'}`);
    console.log(`   🎨 Farbkontrast testen: ${options.testColorContrast ? 'Ja' : 'Nein'}`);
    console.log(`   🎯 Fokus-Management testen: ${options.testFocusManagement ? 'Ja' : 'Nein'}`);
    console.log(`   🚀 Parallele Tests: ${options.useSequentialTesting ? 'Nein' : 'Ja'}`);
    if (options.useSequentialTesting) {
      console.log(`   📋 Verwende sequenzielle Tests (Legacy-Modus)...`);
    } else {
      console.log(`   🔧 Parallele Worker: ${options.maxConcurrent || 3}`);
      console.log(`   🔄 Max. Wiederholungen: ${options.maxRetries || 3}`);
      console.log(`   ⏱️  Wiederholungsverzögerung: ${options.retryDelay || 2000}ms`);
    }
    
    // Tests ausführen
    const testOptions: TestOptions = {
      maxPages: maxPages,
      timeout: options.timeout || 10000,
      waitUntil: 'domcontentloaded',
      pa11yStandard: options.pa11yStandard || 'WCAG2AA',
      hideElements: options.hideElements,
      includeNotices: options.includeNotices,
      includeWarnings: options.includeWarnings,
      wait: options.wait,
      // 🆕 Neue Playwright-Optionen
      collectPerformanceMetrics: options.collectPerformanceMetrics,
      captureScreenshots: options.captureScreenshots,
      testKeyboardNavigation: options.testKeyboardNavigation,
      testColorContrast: options.testColorContrast,
      testFocusManagement: options.testFocusManagement,
      blockImages: options.blockImages,
      blockCSS: options.blockCSS,
      mobileEmulation: options.mobileEmulation,
      viewportSize: options.viewportSize,
      userAgent: options.userAgent,
      // 🚀 Parallele Test-Optionen
      useParallelTesting: !options.useSequentialTesting, // Keep this for compatibility, but it's now the default
      maxConcurrent: options.maxConcurrent,
      maxRetries: options.maxRetries,
      retryDelay: options.retryDelay,
      enableProgressBar: options.enableProgressBar,
      progressUpdateInterval: options.progressUpdateInterval,
      enableResourceMonitoring: options.enableResourceMonitoring,
      maxMemoryUsage: options.maxMemoryUsage,
      maxCpuUsage: options.maxCpuUsage
    };
    
    // Wähle zwischen Queue (Standard) und sequenzieller Verarbeitung
    let results: AccessibilityResult[];
    if (options.useSequentialTesting) {
      console.log('📋 Verwende sequenzielle Tests (Legacy-Modus)...');
      results = await checker.testMultiplePages(
        limitedUrls.map(url => url.loc),
        testOptions
      );
    } else {
      console.log('🚀 Verwende integrierte Queue-Verarbeitung mit kurzen Status-Updates (Standard)...');
      results = await checker.testMultiplePagesWithQueue(
        limitedUrls.map(url => url.loc),
        testOptions
      );
    }
    
    console.log('\n📋 Erstelle Test-Zusammenfassung...');
    
    // Zusammenfassung erstellen
    const summary: TestSummary = {
      totalPages: limitedUrls.length, // 🆕 Verwende limitedUrls statt localUrls
      testedPages: results.length,
      passedPages: results.filter(r => r.passed).length,
      failedPages: results.filter(r => !r.passed).length,
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
      results
    };
    
    await checker.cleanup();
    
    console.log('📄 Generiere Ausgabedateien...');
    
    // Output-Dateien generieren
    const outputGenerator = new OutputGenerator();
    const outputFiles: string[] = [];
    
    // Wähle zwischen Markdown, HTML und PDF Output
    if (options.outputFormat === 'html') {
      console.log('   🌐 Generiere HTML-Bericht...');
      const htmlReportGenerator = new HtmlReportGenerator();
      const htmlReportPath = await htmlReportGenerator.generateHtmlReport(summary, {
        outputDir: options.outputDir,
        includeCopyButtons: options.includeCopyButtons !== false
      });
      outputFiles.push(htmlReportPath);
    } else if (options.outputFormat === 'pdf') {
      console.log('   📄 Generiere PDF-Bericht...');
      const pdfGenerator = new PdfGenerator();
      
      // Browser-Instanz für PDF-Generierung erstellen
      const { chromium } = require('playwright');
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      
      try {
        const pdfReportPath = await pdfGenerator.generatePdfReport(summary, page, {
          outputDir: options.outputDir,
          format: 'A4',
          printBackground: true,
          includeCharts: true
        });
        outputFiles.push(pdfReportPath);
        console.log(`   ✅ PDF-Bericht erstellt: ${pdfReportPath}`);
      } catch (error) {
        console.error('   ❌ PDF-Generierung fehlgeschlagen:', error);
      } finally {
        await browser.close();
      }
    } else {
      // Markdown für Menschen (Standard) - ohne Domain im Dateinamen
      const mdOutputPath = path.join(outputDir, `accessibility-report-${dateOnly}.md`);
      await outputGenerator.generateOutput(summary, {
        format: 'markdown',
        outputFile: mdOutputPath,
        includeDetails: options.includeDetails || true,
        includePa11yIssues: options.includePa11yIssues || false,
        summaryOnly: false
      });
      outputFiles.push(mdOutputPath);
    }
    
    // Detailed-Report generieren (falls gewünscht)
    if (options.generateDetailedReport !== false && (summary.totalErrors > 0 || summary.totalWarnings > 0)) {
      console.log('   📋 Generiere detaillierten Fehlerbericht...');
      const detailedReportGenerator = new DetailedReportGenerator();
      const detailedReportPath = await detailedReportGenerator.generateDetailedReport(summary, {
        outputDir: options.outputDir,
        includeContext: true,
        includeRecommendations: true,
        groupByType: true,
        includeCodeExamples: true
      });
      outputFiles.push(detailedReportPath);
    }
    
    // Performance-Report generieren (falls gewünscht)
    if (options.generatePerformanceReport !== false && options.collectPerformanceMetrics) {
      console.log('   📊 Generiere Performance-Bericht...');
      const performanceReportGenerator = new PerformanceReportGenerator();
      const performanceReportPath = await performanceReportGenerator.generatePerformanceReport(summary, {
        outputDir: options.outputDir,
        includeRecommendations: true,
        includePageDetails: true,
        includeCoreWebVitals: true,
        includeResourceAnalysis: true
      });
      outputFiles.push(performanceReportPath);
    }
    
    // SEO-Report generieren (falls gewünscht)
    if (options.generateSeoReport !== false) {
      console.log('   🔍 Generiere SEO-Bericht...');
      const seoReportGenerator = new SeoReportGenerator();
      const seoReportPath = await seoReportGenerator.generateSeoReport(summary, {
        outputDir: options.outputDir,
        includeRecommendations: true,
        includePageDetails: true,
        includeTechnicalAnalysis: true,
        includeContentAnalysis: true
      });
      outputFiles.push(seoReportPath);
    }
    
    // Security-Report generieren (falls gewünscht)
    if (options.generateSecurityReport !== false) {
      console.log('   🔒 Führe Security-Scan durch und generiere Security-Bericht...');
      
      // Security Scanner initialisieren
      const securityScanner = new SecurityScanner();
      
      // Security-Scan für die erste URL durchführen (als Beispiel)
      if (limitedUrls.length > 0) {
        const firstUrl = limitedUrls[0].loc;
        console.log(`   🔍 Scanne ${firstUrl} auf Sicherheitslücken...`);
        
        // Browser-Instanz für Security-Scan erstellen
        const { chromium } = require('playwright');
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        
        try {
          const securityScanResult = await securityScanner.scanPage(page, firstUrl, {
            skipCspForLocalhost: options.skipCspForLocalhost || false
          });
          
          // Security-Report generieren - ohne Domain im Dateinamen
          const securityReportGenerator = new SecurityReportGenerator();
          
          if (options.outputFormat === 'html') {
            const securityHtmlPath = path.join(outputDir, `security-report-${dateOnly}.html`);
            await securityReportGenerator.generateHtmlReport(securityScanResult, securityHtmlPath);
            outputFiles.push(securityHtmlPath);
          } else {
            const securityMdPath = path.join(outputDir, `security-report-${dateOnly}.md`);
            await securityReportGenerator.generateMarkdownReport(securityScanResult, securityMdPath);
            outputFiles.push(securityMdPath);
          }
          
          console.log(`   ✅ Security-Scan abgeschlossen mit Score: ${securityScanResult.overallScore}/100`);
        } catch (error) {
          console.error('   ❌ Security-Scan fehlgeschlagen:', error);
        } finally {
          await browser.close();
        }
      }
    }
    
    return { summary, outputFiles };
  }
  
  /**
   * Führt eine schnelle Pipeline nur mit Markdown-Output aus
   */
  async runQuick(options: StandardPipelineOptions): Promise<{
    summary: TestSummary;
    markdownFile: string;
  }> {
    const outputDir = options.outputDir || './reports';
    const dateOnly = new Date().toISOString().split('T')[0]; // Nur Datum, kein Timestamp
    
    // Parser initialisieren
    const parser = new SitemapParser();
    
    // Sitemap parsen
    const urls = await parser.parseSitemap(options.sitemapUrl);
    
    // URLs filtern
    const filterPatterns = ['[...slug]', '[category]', '/demo/'];
    const filteredUrls = parser.filterUrls(urls, { filterPatterns });
    
    // URLs zu lokalen URLs konvertieren
    const baseUrl = new URL(options.sitemapUrl).origin;
    const localUrls = parser.convertToLocalUrls(filteredUrls, baseUrl);
    
    // 🆕 WICHTIG: URLs auf maxPages begrenzen
    const maxPages = options.maxPages || 20;
    const limitedUrls = localUrls.slice(0, maxPages);
    
    // Accessibility-Checker initialisieren
    const checker = new AccessibilityChecker();
    await checker.initialize();
    
    // Tests ausführen
    const testOptions: TestOptions = {
      maxPages: maxPages,
      timeout: options.timeout || 10000,
      waitUntil: 'domcontentloaded',
      pa11yStandard: options.pa11yStandard || 'WCAG2AA',
      hideElements: options.hideElements,
      includeNotices: options.includeNotices,
      includeWarnings: options.includeWarnings,
      wait: options.wait
    };
    
    const results = await checker.testMultiplePages(
      limitedUrls.map(url => url.loc),
      testOptions
    );
    
    // Zusammenfassung erstellen
    const summary: TestSummary = {
      totalPages: limitedUrls.length,
      testedPages: results.length,
      passedPages: results.filter(r => r.passed).length,
      failedPages: results.filter(r => !r.passed).length,
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
      results
    };
    
    await checker.cleanup();
    
    // Markdown-Output generieren - ohne Domain im Dateinamen
    const outputGenerator = new OutputGenerator();
    const markdownFile = path.join(outputDir, `accessibility-report-${dateOnly}.md`);
    
    await outputGenerator.generateOutput(summary, {
      format: 'markdown',
      outputFile: markdownFile,
      includeDetails: options.includeDetails || true,
      includePa11yIssues: options.includePa11yIssues || false,
      summaryOnly: false
    });
    
    return { summary, markdownFile };
  }
} 