#!/usr/bin/env node

const { AuditAPIServer } = require('./dist/api/server.js');

async function testEnhancedAPIFeatures() {
    console.log('🧪 Testing Enhanced API Features...\n');
    
    // Create API server instance
    const server = new AuditAPIServer({
        port: 3001,
        host: 'localhost',
        apiKeyRequired: false, // Disable auth for testing
        maxConcurrentJobs: 3
    });
    
    try {
        // Start server
        await server.start();
        
        const baseUrl = 'http://localhost:3001';
        
        // Test 1: API Info endpoint with enhanced features
        console.log('🔍 Test 1: API Info endpoint with enhanced features');
        try {
            const infoResponse = await fetch(`${baseUrl}/api/v1/info`);
            const infoData = await infoResponse.json();
            
            console.log('✅ API Info Response:');
            console.log(`- Version: ${infoData.data.version}`);
            console.log(`- Features: ${infoData.data.features.length} enhanced features`);
            console.log(`- Endpoints: ${infoData.data.endpoints.length} available`);
            console.log(`- Enhanced Options: ${Object.keys(infoData.data.options).length} configuration options`);
            console.log('');
        } catch (error) {
            console.error('❌ API Info test failed:', error.message);
        }
        
        // Test 2: Performance-focused audit
        console.log('🔍 Test 2: Performance-focused audit');
        try {
            const perfResponse = await fetch(`${baseUrl}/api/v1/audit/performance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sitemapUrl: `file://${process.cwd()}/test-performance.html`,
                    options: {
                        maxPages: 1,
                        performanceBudget: {
                            lcp: { good: 2500, poor: 4000 },
                            fcp: { good: 1800, poor: 3000 }
                        }
                    }
                })
            });
            
            const perfData = await perfResponse.json();
            
            console.log('✅ Performance Audit Response:');
            console.log(`- Success: ${perfData.success}`);
            console.log(`- Analysis Type: ${perfData.data.analysisType}`);
            console.log(`- Focus: ${perfData.data.focus}`);
            console.log(`- Pages Tested: ${perfData.data.summary?.testedPages || 'N/A'}`);
            console.log('');
        } catch (error) {
            console.error('❌ Performance audit test failed:', error.message);
        }
        
        // Test 3: SEO-focused audit
        console.log('🔍 Test 3: SEO-focused audit');
        try {
            const seoResponse = await fetch(`${baseUrl}/api/v1/audit/seo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sitemapUrl: `file://${process.cwd()}/test-performance.html`,
                    options: {
                        maxPages: 1,
                        includeRecommendations: true
                    }
                })
            });
            
            const seoData = await seoResponse.json();
            
            console.log('✅ SEO Audit Response:');
            console.log(`- Success: ${seoData.success}`);
            console.log(`- Analysis Type: ${seoData.data.analysisType}`);
            console.log(`- Focus: ${seoData.data.focus}`);
            console.log(`- Pages Tested: ${seoData.data.summary?.testedPages || 'N/A'}`);
            console.log('');
        } catch (error) {
            console.error('❌ SEO audit test failed:', error.message);
        }
        
        // Test 4: Quick audit with enhanced defaults
        console.log('🔍 Test 4: Quick audit with enhanced defaults');
        try {
            const quickResponse = await fetch(`${baseUrl}/api/v1/audit/quick`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sitemapUrl: `file://${process.cwd()}/test-performance.html`,
                    options: {
                        maxPages: 1
                        // All enhanced features should be enabled by default
                    }
                })
            });
            
            const quickData = await quickResponse.json();
            
            console.log('✅ Quick Audit with Enhanced Defaults:');
            console.log(`- Success: ${quickData.success}`);
            console.log(`- Pages Tested: ${quickData.data.summary?.testedPages || 'N/A'}`);
            console.log(`- Total Errors: ${quickData.data.summary?.totalErrors || 'N/A'}`);
            console.log(`- Total Warnings: ${quickData.data.summary?.totalWarnings || 'N/A'}`);
            console.log(`- Duration: ${quickData.data.duration || 'N/A'}ms`);
            console.log('');
        } catch (error) {
            console.error('❌ Quick audit test failed:', error.message);
        }
        
        // Test 5: Content Weight audit
        console.log('🔍 Test 5: Content Weight audit');
        try {
            const contentResponse = await fetch(`${baseUrl}/api/v1/audit/content-weight`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sitemapUrl: `file://${process.cwd()}/test-performance.html`,
                    options: {
                        maxPages: 1
                    }
                })
            });
            
            const contentData = await contentResponse.json();
            
            console.log('✅ Content Weight Audit Response:');
            console.log(`- Success: ${contentData.success}`);
            console.log(`- Analysis Type: ${contentData.data.analysisType}`);
            console.log(`- Focus: ${contentData.data.focus}`);
            console.log(`- Pages Tested: ${contentData.data.summary?.testedPages || 'N/A'}`);
            console.log('');
        } catch (error) {
            console.error('❌ Content Weight audit test failed:', error.message);
        }
        
        // Test 6: Accessibility-focused audit
        console.log('🔍 Test 6: Accessibility-focused audit');
        try {
            const a11yResponse = await fetch(`${baseUrl}/api/v1/audit/accessibility`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sitemapUrl: `file://${process.cwd()}/test-performance.html`,
                    options: {
                        maxPages: 1,
                        standard: 'WCAG2AAA',
                        includeRecommendations: true
                    }
                })
            });
            
            const a11yData = await a11yResponse.json();
            
            console.log('✅ Accessibility Audit Response:');
            console.log(`- Success: ${a11yData.success}`);
            console.log(`- Analysis Type: ${a11yData.data.analysisType}`);
            console.log(`- Focus: ${a11yData.data.focus}`);
            console.log(`- Pages Tested: ${a11yData.data.summary?.testedPages || 'N/A'}`);
            console.log('');
        } catch (error) {
            console.error('❌ Accessibility audit test failed:', error.message);
        }
        
        console.log('🎉 Enhanced API features test completed!');
        
    } catch (error) {
        console.error('❌ Overall API test failed:', error);
    } finally {
        // Gracefully close the server
        setTimeout(() => {
            process.exit(0);
        }, 1000);
    }
}

if (require.main === module) {
    testEnhancedAPIFeatures()
        .then(() => {
            console.log('\\n✅ All API tests completed');
        })
        .catch(error => {
            console.error('\\n❌ API test suite failed:', error);
            process.exit(1);
        });
}

module.exports = { testEnhancedAPIFeatures };
