#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

// Import Enhanced Analyzers
const { EnhancedAccessibilityChecker } = require('./dist/enhanced-accessibility-checker.js');
const { WebVitalsCollector } = require('./dist/core/performance/web-vitals-collector.js');
const { SEOAnalyzer } = require('./dist/analyzers/seo-analyzer.js');
const { ContentWeightAnalyzer } = require('./dist/analyzers/content-weight-analyzer.js');

async function createTestPages() {
    console.log('📝 Creating specialized test pages for comprehensive testing...\n');
    
    // Test Page 1: Complex Accessibility Challenges
    const accessibilityTestPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Test Page</title>
    <style>
        .low-contrast { color: #999; background: #ccc; }
        .hidden { display: none; }
        .focus-trap { width: 300px; height: 200px; overflow: hidden; }
        .large-content { width: 2000px; height: 1500px; }
    </style>
</head>
<body>
    <!-- ARIA Issues -->
    <button aria-pressed="invalid">Invalid ARIA Button</button>
    <div role="button">Missing tabindex</div>
    <input type="text" aria-labelledby="nonexistent">
    
    <!-- Focus Management Issues -->
    <div class="focus-trap">
        <button>First focusable</button>
        <input type="text">
        <a href="#" tabindex="-1">Should be skipped</a>
        <button>Last focusable</button>
    </div>
    
    <!-- Color Contrast Issues -->
    <p class="low-contrast">This text has poor contrast ratio</p>
    <div style="color: #ffffff; background: #eeeeee;">Another contrast issue</div>
    
    <!-- Missing Alt Text -->
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiPjwvc3ZnPg==" />
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiPjwvc3ZnPg==" alt="">
    
    <!-- Proper Elements for Contrast -->
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiPjwvc3ZnPg==" alt="Test image">
    <button>Proper Button</button>
    <p>Good contrast text</p>
    
    <!-- Content for weight analysis -->
    <div class="large-content">
        ${'<p>Large content block. </p>'.repeat(100)}
    </div>
</body>
</html>`;

    // Test Page 2: Performance Stress Test
    const performanceTestPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Test Page</title>
    <style>
        ${'.performance-test { margin: 10px; }'.repeat(100)}
    </style>
    <script>
        // Create some artificial delays
        for(let i = 0; i < 100000; i++) {
            Math.random();
        }
    </script>
</head>
<body>
    <h1>Performance Test</h1>
    ${Array.from({length: 50}, (_, i) => `
        <div class="performance-test">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZjAwMDAiLz48L3N2Zz4=" alt="Test image ${i}">
            <p>Content block ${i} with sufficient text to trigger layout calculations.</p>
        </div>
    `).join('')}
    
    <script>
        // Simulate layout shifts
        setTimeout(() => {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = '<h2>Late loading content that causes layout shift</h2>';
            document.body.insertBefore(newDiv, document.body.firstChild);
        }, 500);
    </script>
</body>
</html>`;

    // Test Page 3: SEO Optimization Test
    const seoTestPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO Test Page - Comprehensive Testing</title>
    <meta name="description" content="This is a test page for SEO analysis with various optimization challenges and opportunities.">
    <meta name="keywords" content="seo, test, analysis, optimization">
    
    <!-- Good meta tags -->
    <meta property="og:title" content="SEO Test Page">
    <meta property="og:description" content="Testing SEO analysis capabilities">
    <meta name="robots" content="index, follow">
    
    <!-- Missing or problematic meta tags -->
    <!-- Missing canonical link -->
    <!-- Missing schema markup -->
</head>
<body>
    <h1>Main SEO Test Heading</h1>
    <h1>Duplicate H1 - Should be flagged</h1>
    <h3>Skipped H2 - Should be flagged</h3>
    
    <p>This paragraph contains <a href="https://example.com" rel="nofollow">external link</a> 
    and <a href="/internal">internal link</a>.</p>
    
    <!-- Images with various alt text scenarios -->
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+" alt="Good alt text">
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+" alt="">
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+">
    
    <!-- Content optimization -->
    <article>
        <h2>Article Section</h2>
        <p>This is article content with proper structure. ${'More content. '.repeat(50)}</p>
    </article>
    
    <!-- Lists and structure -->
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
    </ul>
</body>
</html>`;

    // Test Page 4: Content Weight Edge Cases
    const contentWeightTestPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Content Weight Test</title>
    <style>
        ${'.heavy-styles { border: 1px solid #000; margin: 5px; padding: 10px; }'.repeat(200)}
    </style>
</head>
<body>
    <!-- Heavy text content -->
    <div>
        ${'<p>This is repeated content to test content weight analysis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>'.repeat(500)}
    </div>
    
    <!-- Heavy image content (data URLs) -->
    ${Array.from({length: 20}, (_, i) => `
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZmY2NjY2Ii8+PHRleHQgeD0iMjAwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiPkltYWdlICR7aX08L3RleHQ+PC9zdmc+" alt="Heavy image ${i}">
    `).join('')}
    
    <!-- Inline styles (should increase CSS weight) -->
    ${Array.from({length: 50}, (_, i) => `
        <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff0000, #00ff00); border-radius: ${i}px; margin: 5px;">
            Styled content ${i}
        </div>
    `).join('')}
    
    <!-- JavaScript content -->
    <script>
        // Heavy JavaScript
        const heavyData = {
            ${Array.from({length: 100}, (_, i) => `property${i}: "value${i}"`).join(',\\n            ')}
        };
        
        function heavyFunction() {
            for (let i = 0; i < 10000; i++) {
                console.log("Heavy processing", i);
            }
        }
    </script>
</body>
</html>`;

    return {
        accessibility: accessibilityTestPage,
        performance: performanceTestPage,
        seo: seoTestPage,
        contentWeight: contentWeightTestPage
    };
}

async function testEnhancedAnalyzers() {
    console.log('🧪 Testing Enhanced Analyzers - Comprehensive Test Suite...\n');
    
    const browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage']
    });
    
    const testPages = await createTestPages();
    let testResults = {
        accessibility: { passed: 0, failed: 0, details: [] },
        performance: { passed: 0, failed: 0, details: [] },
        seo: { passed: 0, failed: 0, details: [] },
        contentWeight: { passed: 0, failed: 0, details: [] }
    };
    
    try {
        const context = await browser.newContext();
        
        // Test 1: Enhanced Accessibility Checker
        console.log('🔍 Test Suite 1: Enhanced Accessibility Checker');
        await testAccessibilityAnalyzer(context, testPages.accessibility, testResults);
        
        // Test 2: Web Vitals Collector (Performance)
        console.log('🔍 Test Suite 2: Web Vitals Collector (Performance)');
        await testPerformanceAnalyzer(context, testPages.performance, testResults);
        
        // Test 3: SEO Analyzer
        console.log('🔍 Test Suite 3: SEO Analyzer');
        await testSEOAnalyzer(context, testPages.seo, testResults);
        
        // Test 4: Content Weight Analyzer
        console.log('🔍 Test Suite 4: Content Weight Analyzer');
        await testContentWeightAnalyzer(context, testPages.contentWeight, testResults);
        
        // Test 5: Edge Cases and Error Handling
        console.log('🔍 Test Suite 5: Edge Cases and Error Handling');
        await testEdgeCases(context, testResults);
        
        // Test Summary
        console.log('\\n' + '='.repeat(60));
        console.log('📊 TEST SUITE SUMMARY');
        console.log('='.repeat(60));
        
        let totalPassed = 0, totalFailed = 0;
        
        Object.entries(testResults).forEach(([analyzer, results]) => {
            totalPassed += results.passed;
            totalFailed += results.failed;
            const total = results.passed + results.failed;
            const percentage = total > 0 ? Math.round((results.passed / total) * 100) : 0;
            
            console.log(`${analyzer.toUpperCase().padEnd(15)} | ✅ ${results.passed.toString().padStart(3)} | ❌ ${results.failed.toString().padStart(3)} | ${percentage}%`);
        });
        
        console.log('-'.repeat(60));
        console.log(`TOTAL TESTS        | ✅ ${totalPassed.toString().padStart(3)} | ❌ ${totalFailed.toString().padStart(3)} | ${Math.round((totalPassed / (totalPassed + totalFailed)) * 100)}%`);
        
        if (totalFailed === 0) {
            console.log('\\n🎉 All tests passed! Enhanced Analyzers are working perfectly.');
        } else {
            console.log(`\\n⚠️  ${totalFailed} tests failed. See details above for issues.`);
        }
        
    } catch (error) {
        console.error('❌ Overall test suite failed:', error);
    } finally {
        await browser.close();
    }
    
    return testResults;
}

async function testAccessibilityAnalyzer(context, testPageHTML, results) {
    const testCases = [
        'ARIA attribute validation',
        'Focus management detection',
        'Color contrast analysis',
        'Image alt text validation',
        'Semantic structure analysis'
    ];
    
    try {
        const page = await context.newPage();
        await page.setContent(testPageHTML);
        
        const checker = new EnhancedAccessibilityChecker();
        const result = await checker.runEnhancedAnalysis(page, 'test://accessibility');
        
        // Test Case 1: ARIA Issues Detection
        const ariaTest = result.ariaIssues && result.ariaIssues.length > 0;
        updateTestResult('accessibility', 'ARIA Issues Detection', ariaTest, results, 
            ariaTest ? `Found ${result.ariaIssues.length} ARIA issues` : 'No ARIA issues detected');
        
        // Test Case 2: Focus Issues Detection
        const focusTest = result.focusIssues && result.focusIssues.length > 0;
        updateTestResult('accessibility', 'Focus Issues Detection', focusTest, results,
            focusTest ? `Found ${result.focusIssues.length} focus issues` : 'No focus issues detected');
        
        // Test Case 3: Color Contrast Issues
        const contrastTest = result.colorContrastIssues && result.colorContrastIssues.length > 0;
        updateTestResult('accessibility', 'Color Contrast Detection', contrastTest, results,
            contrastTest ? `Found ${result.colorContrastIssues.length} contrast issues` : 'No contrast issues detected');
        
        // Test Case 4: Performance Score Calculation
        const scoreTest = typeof result.overallScore === 'number' && result.overallScore >= 0 && result.overallScore <= 100;
        updateTestResult('accessibility', 'Score Calculation', scoreTest, results,
            scoreTest ? `Score: ${result.overallScore}` : 'Invalid score calculation');
        
        // Test Case 5: Enhanced Features Working
        const enhancedTest = result.recommendations && result.recommendations.length > 0;
        updateTestResult('accessibility', 'Enhanced Recommendations', enhancedTest, results,
            enhancedTest ? `Generated ${result.recommendations.length} recommendations` : 'No recommendations generated');
        
        await page.close();
        
    } catch (error) {
        console.error('   ❌ Accessibility analyzer test failed:', error.message);
        results.accessibility.failed += testCases.length;
        results.accessibility.details.push(`All tests failed: ${error.message}`);
    }
}

async function testPerformanceAnalyzer(context, testPageHTML, results) {
    try {
        const page = await context.newPage();
        await page.setContent(testPageHTML);
        
        const collector = new WebVitalsCollector();
        const metrics = await collector.collectMetrics(page);
        
        // Test Case 1: Metrics Collection
        const metricsTest = metrics && typeof metrics.score === 'number';
        updateTestResult('performance', 'Metrics Collection', metricsTest, results,
            metricsTest ? `Score: ${metrics.score}, Grade: ${metrics.grade}` : 'Metrics collection failed');
        
        // Test Case 2: Core Web Vitals
        const vitalsTest = metrics.lcp !== undefined && metrics.fcp !== undefined && metrics.cls !== undefined;
        updateTestResult('performance', 'Core Web Vitals', vitalsTest, results,
            vitalsTest ? `LCP: ${metrics.lcp}ms, FCP: ${metrics.fcp}ms, CLS: ${metrics.cls}` : 'Core Web Vitals missing');
        
        // Test Case 3: Performance Recommendations
        const recsTest = metrics.recommendations && metrics.recommendations.length > 0;
        updateTestResult('performance', 'Recommendations', recsTest, results,
            recsTest ? `Generated ${metrics.recommendations.length} recommendations` : 'No recommendations generated');
        
        // Test Case 4: Budget Status
        const budgetTest = metrics.budgetStatus && typeof metrics.budgetStatus.passed === 'boolean';
        updateTestResult('performance', 'Budget Analysis', budgetTest, results,
            budgetTest ? `Budget ${metrics.budgetStatus.passed ? 'passed' : 'failed'}` : 'Budget analysis missing');
        
        // Test Case 5: Quality Assessment
        const qualityReport = collector.getMetricsQualityReport(metrics);
        const qualityTest = qualityReport && qualityReport.includes('Performance Metrics Quality');
        updateTestResult('performance', 'Quality Assessment', qualityTest, results,
            qualityTest ? 'Quality assessment available' : 'Quality assessment failed');
        
        await page.close();
        
    } catch (error) {
        console.error('   ❌ Performance analyzer test failed:', error.message);
        results.performance.failed += 5;
        results.performance.details.push(`All tests failed: ${error.message}`);
    }
}

async function testSEOAnalyzer(context, testPageHTML, results) {
    try {
        const page = await context.newPage();
        await page.setContent(testPageHTML);
        
        const analyzer = new SEOAnalyzer();
        const seoResult = await analyzer.analyze(page);
        
        // Test Case 1: Basic SEO Analysis
        const basicTest = seoResult && typeof seoResult.score === 'number';
        updateTestResult('seo', 'Basic Analysis', basicTest, results,
            basicTest ? `SEO Score: ${seoResult.score}` : 'Basic analysis failed');
        
        // Test Case 2: Meta Tags Analysis
        const metaTest = seoResult.metaTags !== undefined;
        updateTestResult('seo', 'Meta Tags Analysis', metaTest, results,
            metaTest ? 'Meta tags analyzed' : 'Meta tags analysis failed');
        
        // Test Case 3: Heading Structure
        const headingTest = seoResult.headingStructure && Array.isArray(seoResult.headingStructure);
        updateTestResult('seo', 'Heading Structure', headingTest, results,
            headingTest ? `Found ${seoResult.headingStructure.length} headings` : 'Heading analysis failed');
        
        // Test Case 4: Link Analysis
        const linkTest = seoResult.links && (seoResult.links.internal !== undefined || seoResult.links.external !== undefined);
        updateTestResult('seo', 'Link Analysis', linkTest, results,
            linkTest ? 'Link analysis completed' : 'Link analysis failed');
        
        // Test Case 5: Recommendations
        const seoRecsTest = seoResult.recommendations && seoResult.recommendations.length > 0;
        updateTestResult('seo', 'SEO Recommendations', seoRecsTest, results,
            seoRecsTest ? `Generated ${seoResult.recommendations.length} SEO recommendations` : 'No SEO recommendations');
        
        await page.close();
        
    } catch (error) {
        console.error('   ❌ SEO analyzer test failed:', error.message);
        results.seo.failed += 5;
        results.seo.details.push(`All tests failed: ${error.message}`);
    }
}

async function testContentWeightAnalyzer(context, testPageHTML, results) {
    try {
        const page = await context.newPage();
        await page.setContent(testPageHTML);
        
        const analyzer = new ContentWeightAnalyzer();
        const weightResult = await analyzer.analyze(page);
        
        // Test Case 1: Content Weight Calculation
        const weightTest = weightResult && typeof weightResult.totalWeight === 'number';
        updateTestResult('contentWeight', 'Weight Calculation', weightTest, results,
            weightTest ? `Total weight: ${(weightResult.totalWeight / 1024).toFixed(1)}KB` : 'Weight calculation failed');
        
        // Test Case 2: Breakdown Analysis
        const breakdownTest = weightResult.breakdown && typeof weightResult.breakdown === 'object';
        updateTestResult('contentWeight', 'Breakdown Analysis', breakdownTest, results,
            breakdownTest ? 'Content breakdown analyzed' : 'Breakdown analysis failed');
        
        // Test Case 3: Optimization Suggestions
        const optTest = weightResult.optimizations && Array.isArray(weightResult.optimizations);
        updateTestResult('contentWeight', 'Optimization Suggestions', optTest, results,
            optTest ? `Generated ${weightResult.optimizations.length} optimizations` : 'No optimization suggestions');
        
        // Test Case 4: Performance Impact
        const impactTest = weightResult.performanceImpact !== undefined;
        updateTestResult('contentWeight', 'Performance Impact', impactTest, results,
            impactTest ? 'Performance impact assessed' : 'Performance impact missing');
        
        // Test Case 5: Resource Analysis
        const resourceTest = weightResult.resources && typeof weightResult.resources === 'object';
        updateTestResult('contentWeight', 'Resource Analysis', resourceTest, results,
            resourceTest ? 'Resources analyzed' : 'Resource analysis failed');
        
        await page.close();
        
    } catch (error) {
        console.error('   ❌ Content Weight analyzer test failed:', error.message);
        results.contentWeight.failed += 5;
        results.contentWeight.details.push(`All tests failed: ${error.message}`);
    }
}

async function testEdgeCases(context, results) {
    // Edge Case 1: Empty page
    try {
        const page = await context.newPage();
        await page.setContent('<html><body></body></html>');
        
        const checker = new EnhancedAccessibilityChecker();
        const result = await checker.runEnhancedAnalysis(page, 'test://empty');
        
        const emptyTest = result !== null && typeof result.overallScore === 'number';
        updateTestResult('accessibility', 'Empty Page Handling', emptyTest, results,
            emptyTest ? 'Empty page handled gracefully' : 'Empty page handling failed');
        
        await page.close();
    } catch (error) {
        updateTestResult('accessibility', 'Empty Page Handling', false, results, `Error: ${error.message}`);
    }
    
    // Edge Case 2: Invalid URL handling
    try {
        const page = await context.newPage();
        const collector = new WebVitalsCollector();
        
        // This should not throw but handle gracefully
        await page.goto('about:blank');
        const metrics = await collector.collectMetrics(page);
        
        const invalidTest = metrics !== null;
        updateTestResult('performance', 'Invalid URL Handling', invalidTest, results,
            invalidTest ? 'Invalid URL handled' : 'Invalid URL handling failed');
        
        await page.close();
    } catch (error) {
        updateTestResult('performance', 'Invalid URL Handling', false, results, `Error: ${error.message}`);
    }
    
    // Edge Case 3: Large content handling
    try {
        const page = await context.newPage();
        const largeContent = '<html><body>' + '<p>Large content</p>'.repeat(10000) + '</body></html>';
        await page.setContent(largeContent);
        
        const analyzer = new ContentWeightAnalyzer();
        const result = await analyzer.analyze(page);
        
        const largeTest = result && result.totalWeight > 100000; // Should detect large content
        updateTestResult('contentWeight', 'Large Content Handling', largeTest, results,
            largeTest ? 'Large content detected and analyzed' : 'Large content handling failed');
        
        await page.close();
    } catch (error) {
        updateTestResult('contentWeight', 'Large Content Handling', false, results, `Error: ${error.message}`);
    }
}

function updateTestResult(analyzer, testName, passed, results, details) {
    if (passed) {
        results[analyzer].passed++;
        console.log(`   ✅ ${testName}: ${details}`);
    } else {
        results[analyzer].failed++;
        console.log(`   ❌ ${testName}: ${details}`);
    }
    results[analyzer].details.push(`${testName}: ${passed ? 'PASS' : 'FAIL'} - ${details}`);
}

if (require.main === module) {
    testEnhancedAnalyzers()
        .then(() => {
            console.log('\\n✅ Enhanced Analyzers test suite completed');
            process.exit(0);
        })
        .catch(error => {
            console.error('\\n❌ Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = { testEnhancedAnalyzers };
