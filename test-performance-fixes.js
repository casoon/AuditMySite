#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

// Import the Web Vitals Collector
const { WebVitalsCollector } = require('./dist/core/performance/web-vitals-collector.js');
const { CoreWebVitalsTest } = require('./dist/tests/performance/core-web-vitals-test.js');

async function testPerformanceImprovements() {
    console.log('🧪 Testing Performance Timing Fixes...\n');
    
    const browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage']
    });
    
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // Test local HTML file
        const testFile = `file://${path.resolve(__dirname, 'test-performance.html')}`;
        console.log(`📄 Testing URL: ${testFile}\n`);
        
        await page.goto(testFile, { waitUntil: 'networkidle' });
        
        // Test 1: WebVitalsCollector with enhanced stability (isolated contexts)
        console.log('🔍 Test 1: WebVitalsCollector with isolated context stability');
        try {
            const collector = new WebVitalsCollector(undefined, { maxRetries: 2, retryDelay: 500 });
            const startTime = Date.now();
            
            const metrics = await collector.collectMetrics(page);
            const duration = Date.now() - startTime;
            
            // Get quality report
            const qualityReport = collector.getMetricsQualityReport(metrics);
            console.log('📊 Quality Assessment:');
            console.log(qualityReport);
            
            console.log(`✅ Collection completed in ${duration}ms`);
            console.log(`📊 Metrics:`, {
                LCP: `${metrics.lcp}ms`,
                FCP: `${metrics.fcp}ms`, 
                CLS: metrics.cls,
                TTFB: `${metrics.ttfb}ms`,
                Score: `${metrics.score}/100 (Grade: ${metrics.grade})`
            });
            console.log(`🎯 Recommendations: ${metrics.recommendations.length} items`);
            console.log('');
        } catch (error) {
            console.error('❌ WebVitalsCollector test failed:', error.message);
        }
        
        // Test 2: CoreWebVitalsTest with new stable sync
        console.log('🔍 Test 2: CoreWebVitalsTest with stable synchronization');
        try {
            const cwvTest = new CoreWebVitalsTest();
            const startTime = Date.now();
            
            const result = await cwvTest.run({
                page: page,
                url: testFile
            });
            const duration = Date.now() - startTime;
            
            console.log(`✅ Test completed in ${duration}ms`);
            console.log(`📊 Result:`, {
                Passed: result.passed,
                Score: result.details?.score || 'N/A',
                Errors: result.errors.length,
                Warnings: result.warnings.length,
                MetricsQuality: result.details?.metricsQuality || 'N/A'
            });
            
            if (result.details?.metrics) {
                console.log(`📈 Core Web Vitals:`, {
                    LCP: `${result.details.metrics.lcp}ms`,
                    FCP: `${result.details.metrics.fcp}ms`,
                    CLS: result.details.metrics.cls,
                    FID: `${result.details.metrics.fid}ms`
                });
            }
            console.log('');
        } catch (error) {
            console.error('❌ CoreWebVitalsTest test failed:', error.message);
        }
        
        // Test 3: Multiple rapid collections (stress test)
        console.log('🔍 Test 3: Stress test - Multiple rapid collections');
        try {
            const collector = new WebVitalsCollector();
            const results = [];
            const promises = [];
            
            // Create 3 concurrent collection attempts
            for (let i = 0; i < 3; i++) {
                promises.push(
                    collector.collectMetrics(page)
                        .then(metrics => ({ success: true, score: metrics.score, attempt: i + 1 }))
                        .catch(error => ({ success: false, error: error.message, attempt: i + 1 }))
                );
            }
            
            const startTime = Date.now();
            const allResults = await Promise.all(promises);
            const duration = Date.now() - startTime;
            
            const successful = allResults.filter(r => r.success).length;
            console.log(`✅ Stress test completed in ${duration}ms`);
            console.log(`📊 Results: ${successful}/3 collections successful`);
            
            allResults.forEach(result => {
                if (result.success) {
                    console.log(`   ✓ Attempt ${result.attempt}: Score ${result.score}`);
                } else {
                    console.log(`   ✗ Attempt ${result.attempt}: ${result.error}`);
                }
            });
            console.log('');
        } catch (error) {
            console.error('❌ Stress test failed:', error.message);
        }
        
        console.log('🎉 Performance timing fixes test completed!');
        
    } catch (error) {
        console.error('❌ Overall test failed:', error);
    } finally {
        await browser.close();
    }
}

if (require.main === module) {
    testPerformanceImprovements()
        .then(() => {
            console.log('\\n✅ All tests completed');
            process.exit(0);
        })
        .catch(error => {
            console.error('\\n❌ Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = { testPerformanceImprovements };
