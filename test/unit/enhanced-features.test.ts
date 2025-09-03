import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { Html5ElementsChecker } from '../../src/core/accessibility/html5-elements-checker';
import { AriaRulesAnalyzer } from '../../src/core/accessibility/aria-rules-analyzer';
import { Chrome135Optimizer } from '../../src/core/performance/chrome135-optimizer';
import { EnhancedAccessibilityChecker } from '../../src/core/accessibility/enhanced-accessibility-checker';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

describe('Enhanced v1.3 Features', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let server: http.Server;
  let serverPort: number;

  beforeAll(async () => {
    // Start mock server
    serverPort = 8081;
    server = http.createServer((req, res) => {
      let filePath = '';
      
      if (req.url === '/html5-test') {
        filePath = path.join(__dirname, '../templates/html5-modern-test.html');
      } else if (req.url === '/aria-test') {
        filePath = path.join(__dirname, '../templates/aria-enhanced-test.html');
      } else {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      try {
        const content = fs.readFileSync(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      } catch (error) {
        res.writeHead(500);
        res.end('Server error');
      }
    });

    server.listen(serverPort);

    // Launch browser
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async () => {
    await page?.close();
    await context?.close();
    await browser?.close();
    server?.close();
  });

  describe('Html5ElementsChecker', () => {
    test('should analyze modern HTML5 elements', async () => {
      const checker = new Html5ElementsChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      await page.waitForLoadState('networkidle');

      const analysis = await checker.analyzeHtml5Elements(page);

      expect(analysis).toBeDefined();
      expect(analysis.detailsElements).toBeGreaterThan(0);
      expect(analysis.summaryElements).toBeGreaterThan(0);
      expect(analysis.mainElements).toBeGreaterThan(0);
      expect(analysis.modernHtml5Usage).toBe(true);
      expect(analysis.semanticStructureScore).toBeGreaterThan(0);
      expect(analysis.recommendations).toBeInstanceOf(Array);
      expect(analysis.elementBreakdown.sectioning).toBeGreaterThan(0);
    });

    test('should detect summary elements without accessible names', async () => {
      const checker = new Html5ElementsChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      await page.waitForLoadState('networkidle');

      const analysis = await checker.analyzeHtml5Elements(page);

      // Our test template has one problematic summary element
      expect(analysis.summaryWithoutName).toBeGreaterThan(0);
    });

    test('should detect dialog elements', async () => {
      const checker = new Html5ElementsChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      await page.waitForLoadState('networkidle');

      const analysis = await checker.analyzeHtml5Elements(page);

      expect(analysis.dialogElements).toBeGreaterThan(0);
      expect(analysis.dialogAccessibilityIssues.length).toBeGreaterThan(0); // Test has problem dialog
    });

    test('should calculate semantic complexity level', async () => {
      const checker = new Html5ElementsChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      await page.waitForLoadState('networkidle');

      const analysis = await checker.analyzeHtml5Elements(page);
      const complexity = checker.getSemanticComplexityLevel(analysis);

      expect(['basic', 'intermediate', 'advanced']).toContain(complexity);
    });
  });

  describe('AriaRulesAnalyzer', () => {
    test('should analyze ARIA usage with impact scoring', async () => {
      const analyzer = new AriaRulesAnalyzer();
      
      await page.goto(`http://localhost:${serverPort}/aria-test`);
      await page.waitForLoadState('networkidle');

      const analysis = await analyzer.analyzeAriaUsage(page);

      expect(analysis).toBeDefined();
      expect(analysis.totalAriaElements).toBeGreaterThan(0);
      expect(analysis.ariaScore).toBeGreaterThanOrEqual(0);
      expect(analysis.ariaScore).toBeLessThanOrEqual(100);
      expect(analysis.landmarkRoles).toBeInstanceOf(Array);
      expect(analysis.interactiveRoles).toBeInstanceOf(Array);
      expect(analysis.recommendations).toBeInstanceOf(Array);
    });

    test('should detect impact breakdown correctly', async () => {
      const analyzer = new AriaRulesAnalyzer();
      
      await page.goto(`http://localhost:${serverPort}/aria-test`);
      await page.waitForLoadState('networkidle');

      const analysis = await analyzer.analyzeAriaUsage(page);

      expect(analysis.impactBreakdown).toBeDefined();
      expect(analysis.impactBreakdown.critical).toBeGreaterThanOrEqual(0);
      expect(analysis.impactBreakdown.serious).toBeGreaterThanOrEqual(0);
      expect(analysis.impactBreakdown.moderate).toBeGreaterThanOrEqual(0);
      expect(analysis.impactBreakdown.minor).toBeGreaterThanOrEqual(0);
    });

    test('should detect enhanced ARIA features', async () => {
      const analyzer = new AriaRulesAnalyzer();
      
      await page.goto(`http://localhost:${serverPort}/aria-test`);
      await page.waitForLoadState('networkidle');

      const analysis = await analyzer.analyzeAriaUsage(page);

      expect(analysis.enhancedFeatures).toBeDefined();
      expect(typeof analysis.enhancedFeatures.permissiveAriaHandling).toBe('boolean');
      expect(typeof analysis.enhancedFeatures.descendantLabeling).toBe('boolean');
      expect(typeof analysis.enhancedFeatures.modernAriaSupport).toBe('boolean');
    });

    test('should provide impact level descriptions', async () => {
      const analyzer = new AriaRulesAnalyzer();
      
      const criticalDesc = analyzer.getImpactDescription('critical');
      const seriousDesc = analyzer.getImpactDescription('serious');
      const moderateDesc = analyzer.getImpactDescription('moderate');
      const minorDesc = analyzer.getImpactDescription('minor');

      expect(criticalDesc).toContain('Blocks access');
      expect(seriousDesc).toContain('Significantly affects');
      expect(moderateDesc).toContain('Some impact');
      expect(minorDesc).toContain('Minor');
    });
  });

  describe('Chrome135Optimizer', () => {
    test('should detect Chrome version', async () => {
      const optimizer = new Chrome135Optimizer();
      
      const isCompatible = await optimizer.isChrome135Compatible(browser);
      
      expect(typeof isCompatible).toBe('boolean');
    });

    test('should optimize page without errors', async () => {
      const optimizer = new Chrome135Optimizer();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      expect(async () => {
        await optimizer.optimizePage(page);
      }).not.toThrow();
      
      const optimizations = optimizer.getOptimizationsSummary();
      expect(optimizations).toBeInstanceOf(Array);
    });

    test('should generate optimization report', async () => {
      const optimizer = new Chrome135Optimizer();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      await optimizer.optimizePage(page);
      
      const report = await optimizer.generateOptimizationReport(page);
      
      expect(report).toBeDefined();
      expect(report.optimizationsApplied).toBeInstanceOf(Array);
      expect(report.performanceGains).toBeDefined();
      expect(report.chrome135Features).toBeDefined();
      expect(report.recommendations).toBeInstanceOf(Array);
    });

    test('should detect Chrome 135 features', async () => {
      const optimizer = new Chrome135Optimizer();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const features = await optimizer.detectChrome135Features(page);
      
      expect(features).toBeDefined();
      expect(typeof features.enhancedAccessibilityTree).toBe('boolean');
      expect(typeof features.improvedDialogSupport).toBe('boolean');
      expect(typeof features.modernDevToolsProtocol).toBe('boolean');
      expect(typeof features.optimizedResourceLoading).toBe('boolean');
      expect(typeof features.enhancedPerformanceMetrics).toBe('boolean');
      expect(typeof features.betterMemoryManagement).toBe('boolean');
    });
  });

  describe('EnhancedAccessibilityChecker', () => {
    test('should perform enhanced accessibility testing', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        chrome135Features: true,
        semanticAnalysis: true,
        enableChrome135Optimizations: true
      });

      expect(result).toBeDefined();
      expect(result.url).toBe(`http://localhost:${serverPort}/html5-test`);
      expect(typeof result.passed).toBe('boolean');
      expect(result.html5Analysis).toBeDefined();
      expect(result.ariaAnalysis).toBeDefined();
      expect(typeof result.semanticScore).toBe('number');
      expect(result.complianceLevel).toBeDefined();
      expect(['basic', 'enhanced', 'comprehensive']).toContain(result.complianceLevel);
      expect(typeof result.futureReadiness).toBe('number');
      expect(result.enhancedRecommendations).toBeInstanceOf(Array);
      expect(result.modernFeaturesDetected).toBeInstanceOf(Array);
    });

    test('should calculate semantic score correctly', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        semanticAnalysis: true
      });

      expect(result.semanticScore).toBeGreaterThanOrEqual(0);
      expect(result.semanticScore).toBeLessThanOrEqual(100);
    });

    test('should determine compliance levels', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        semanticAnalysis: true
      });

      expect(result.complianceLevel).toBeDefined();
      expect(['basic', 'enhanced', 'comprehensive']).toContain(result.complianceLevel!);
    });

    test('should calculate future readiness', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        chrome135Features: true,
        semanticAnalysis: true
      });

      expect(result.futureReadiness).toBeGreaterThanOrEqual(0);
      expect(result.futureReadiness).toBeLessThanOrEqual(100);
    });

    test('should generate comprehensive report', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        semanticAnalysis: true
      });

      const report = checker.generateComprehensiveReport(result);
      
      expect(typeof report).toBe('string');
      expect(report).toContain('Enhanced Accessibility Report');
      expect(report).toContain(result.url);
      expect(report).toContain(result.passed ? 'PASSED' : 'FAILED');
    });

    test('should detect modern features', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true
      });

      expect(result.modernFeaturesDetected).toBeInstanceOf(Array);
      expect(result.modernFeaturesDetected?.length).toBeGreaterThan(0);
      expect(result.modernFeaturesDetected).toContain('Modern HTML5 Elements');
    });

    test('should generate enhanced recommendations', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        semanticAnalysis: true
      });

      expect(result.enhancedRecommendations).toBeInstanceOf(Array);
      expect(result.enhancedRecommendations?.length).toBeGreaterThan(0);
      expect(result.enhancedRecommendations?.length).toBeLessThanOrEqual(10); // Limited to 10
    });

    test('should handle ARIA test page correctly', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      await page.goto(`http://localhost:${serverPort}/aria-test`);
      
      const result = await checker.testPageEnhanced(page, `http://localhost:${serverPort}/aria-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        semanticAnalysis: true
      });

      expect(result).toBeDefined();
      expect(result.ariaAnalysis).toBeDefined();
      expect(result.ariaAnalysis?.totalAriaElements).toBeGreaterThan(0);
      
      // ARIA test page has intentional problems
      expect(result.ariaAnalysis?.impactBreakdown.critical + result.ariaAnalysis?.impactBreakdown.serious).toBeGreaterThan(0);
    });
  });

  describe('Integration Tests', () => {
    test('should work with browser context optimizations', async () => {
      const checker = new EnhancedAccessibilityChecker();
      const newContext = await browser.newContext();
      
      await checker.optimizeBrowserContext(newContext, {
        chrome135Features: true,
        enableChrome135Optimizations: true
      });
      
      const newPage = await newContext.newPage();
      await newPage.goto(`http://localhost:${serverPort}/html5-test`);
      
      const result = await checker.testPageEnhanced(newPage, `http://localhost:${serverPort}/html5-test`, {
        modernHtml5: true,
        ariaEnhanced: true,
        chrome135Features: true
      });

      expect(result).toBeDefined();
      expect(result.passed).toBeDefined();
      
      await newPage.close();
      await newContext.close();
    });

    test('should reset optimizer state', async () => {
      const checker = new EnhancedAccessibilityChecker();
      
      // Generate some optimizations
      await page.goto(`http://localhost:${serverPort}/html5-test`);
      await checker.testPageEnhanced(page, `http://localhost:${serverPort}/html5-test`, {
        chrome135Features: true,
        enableChrome135Optimizations: true
      });
      
      const summaryBefore = checker.getOptimizationsSummary();
      expect(summaryBefore.length).toBeGreaterThan(0);
      
      // Reset
      checker.reset();
      
      const summaryAfter = checker.getOptimizationsSummary();
      expect(summaryAfter.length).toBe(0);
    });
  });
});
