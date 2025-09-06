const fs = require('fs');
const path = require('path');

// Import the enhanced accessibility checker
const { EnhancedAccessibilityChecker } = require('./dist/enhanced-accessibility-checker');

/**
 * Test the enhanced analysis functionality with the test HTML file
 */
async function testEnhancedAnalysis() {
    console.log('🚀 Starting Enhanced Analysis Test...\n');
    
    try {
        // Read the test HTML file
        const testHtmlPath = path.join(__dirname, 'test-enhanced.html');
        const testHtml = fs.readFileSync(testHtmlPath, 'utf-8');
        
        console.log(`📄 Loaded test HTML file (${testHtml.length} characters)\n`);
        
        // Initialize the enhanced checker
        const checker = new EnhancedAccessibilityChecker();
        await checker.initialize();
        
        console.log('✅ Enhanced Accessibility Checker initialized\n');
        
        // Run the enhanced analysis
        console.log('🔍 Running enhanced analysis...\n');
        const results = await checker.analyze(testHtml, 'file://' + testHtmlPath);
        
        // Display results
        console.log('📊 ANALYSIS RESULTS:');
        console.log('=' .repeat(50));
        
        // Basic accessibility results
        console.log('\n🏷️  ACCESSIBILITY RESULTS:');
        console.log(`   Issues found: ${results.violations?.length || 0}`);
        console.log(`   Passes: ${results.passes?.length || 0}`);
        console.log(`   Incomplete: ${results.incomplete?.length || 0}`);
        
        if (results.violations?.length > 0) {
            console.log('\n   Top violations:');
            results.violations.slice(0, 3).forEach((violation, index) => {
                console.log(`   ${index + 1}. ${violation.id}: ${violation.description}`);
            });
        }
        
        // Enhanced Performance Results
        if (results.enhancedPerformance) {
            console.log('\n⚡ ENHANCED PERFORMANCE RESULTS:');
            const perf = results.enhancedPerformance;
            console.log(`   Performance Score: ${perf.performanceScore || 'N/A'}`);
            console.log(`   Grade: ${perf.grade || 'N/A'}`);
            
            if (perf.coreWebVitals) {
                console.log('\n   Core Web Vitals:');
                Object.entries(perf.coreWebVitals).forEach(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        console.log(`   • ${key}: ${value.value || 'N/A'} (${value.rating || 'N/A'})`);
                    } else {
                        console.log(`   • ${key}: ${value}`);
                    }
                });
            }
            
            if (perf.metrics) {
                console.log('\n   Additional Metrics:');
                Object.entries(perf.metrics).forEach(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        console.log(`   • ${key}: ${value.value || 'N/A'} (${value.rating || 'N/A'})`);
                    } else {
                        console.log(`   • ${key}: ${value}`);
                    }
                });
            }
        }
        
        // Enhanced SEO Results
        if (results.enhancedSEO) {
            console.log('\n🔍 ENHANCED SEO RESULTS:');
            const seo = results.enhancedSEO;
            console.log(`   SEO Score: ${seo.seoScore || 'N/A'}`);
            console.log(`   Grade: ${seo.grade || 'N/A'}`);
            
            if (seo.metaData) {
                console.log('\n   Meta Data:');
                console.log(`   • Title: "${seo.metaData.title || 'N/A'}" (${seo.metaData.titleLength || 0} chars)`);
                console.log(`   • Description: "${seo.metaData.description?.substring(0, 50) || 'N/A'}..." (${seo.metaData.descriptionLength || 0} chars)`);
                console.log(`   • Keywords: ${seo.metaData.keywords || 'N/A'}`);
            }
            
            if (seo.headingStructure) {
                console.log('\n   Heading Structure:');
                Object.entries(seo.headingStructure).forEach(([level, count]) => {
                    console.log(`   • ${level}: ${count} elements`);
                });
            }
            
            if (seo.contentAnalysis) {
                console.log('\n   Content Analysis:');
                console.log(`   • Word Count: ${seo.contentAnalysis.wordCount || 0}`);
                console.log(`   • Readability Score: ${seo.contentAnalysis.readabilityScore || 'N/A'}`);
                console.log(`   • Text-to-Code Ratio: ${seo.contentAnalysis.textToCodeRatio || 'N/A'}`);
            }
            
            if (seo.socialTags) {
                console.log('\n   Social Media Tags:');
                console.log(`   • Open Graph tags: ${seo.socialTags.openGraph || 0}`);
                console.log(`   • Twitter Card tags: ${seo.socialTags.twitterCard || 0}`);
            }
            
            if (seo.technicalSEO) {
                console.log('\n   Technical SEO:');
                console.log(`   • Internal Links: ${seo.technicalSEO.internalLinks || 0}`);
                console.log(`   • External Links: ${seo.technicalSEO.externalLinks || 0}`);
                console.log(`   • Alt Text Coverage: ${seo.technicalSEO.altTextCoverage || 'N/A'}`);
            }
        }
        
        // Content Weight Results
        if (results.contentWeight) {
            console.log('\n📏 CONTENT WEIGHT RESULTS:');
            const weight = results.contentWeight;
            console.log(`   Content Score: ${weight.contentScore || 'N/A'}`);
            console.log(`   Grade: ${weight.grade || 'N/A'}`);
            
            if (weight.resourceAnalysis) {
                console.log('\n   Resource Analysis:');
                Object.entries(weight.resourceAnalysis).forEach(([type, data]) => {
                    if (typeof data === 'object' && data !== null) {
                        console.log(`   • ${type}: ${data.size || 0} bytes (${data.count || 0} resources)`);
                    } else {
                        console.log(`   • ${type}: ${data}`);
                    }
                });
            }
            
            if (weight.contentMetrics) {
                console.log('\n   Content Metrics:');
                Object.entries(weight.contentMetrics).forEach(([metric, value]) => {
                    console.log(`   • ${metric}: ${value}`);
                });
            }
        }
        
        // Overall Quality Score
        if (results.qualityScore) {
            console.log('\n🏆 OVERALL QUALITY SCORE:');
            console.log(`   Combined Score: ${results.qualityScore.score || 'N/A'}/100`);
            console.log(`   Grade: ${results.qualityScore.grade || 'N/A'}`);
            
            if (results.qualityScore.breakdown) {
                console.log('\n   Score Breakdown:');
                Object.entries(results.qualityScore.breakdown).forEach(([category, score]) => {
                    console.log(`   • ${category}: ${score}/100`);
                });
            }
        }
        
        console.log('\n' + '='.repeat(50));
        console.log('✅ Enhanced Analysis completed successfully!\n');
        
        console.log('📝 HTML report generation skipped for this test (generator still needs adaptation for enhanced results)');
        
        // Cleanup
        await checker.cleanup();
        console.log('🧹 Cleanup completed');
        
    } catch (error) {
        console.error('❌ Error during enhanced analysis test:', error);
        console.error('\nError details:', error.message);
        console.error('\nStack trace:', error.stack);
        process.exit(1);
    }
}

// Run the test
if (require.main === module) {
    testEnhancedAnalysis().then(() => {
        console.log('🎉 Test completed successfully!');
        process.exit(0);
    }).catch((error) => {
        console.error('💥 Test failed:', error);
        process.exit(1);
    });
}

module.exports = { testEnhancedAnalysis };
