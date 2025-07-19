#!/usr/bin/env node

const { DetailedReportGenerator } = require('./dist/reports/detailed-report');

// Test-Daten mit verschiedenen Fehlertypen
const testResults = {
  totalPages: 1,
  testedPages: 1,
  passedPages: 0,
  failedPages: 1,
  totalErrors: 5,
  totalWarnings: 2,
  totalDuration: 5000,
  results: [
    {
      url: 'http://localhost:4321/test-page',
      title: 'Test Page',
      imagesWithoutAlt: 0,
      buttonsWithoutLabel: 0,
      headingsCount: 3,
      errors: [
        'Missing alt attribute on image',
        'Button without aria-label'
      ],
      warnings: ['Low color contrast'],
      passed: false,
      duration: 5000,
      pa11yIssues: [
        {
          code: 'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
          message: 'This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.25:1. Recommendation: change background to #fff.',
          type: 'error',
          selector: 'p',
          context: '<p style="color: #666; background-color: #f0f0f0;">Dies ist ein Beispieltext mit unzureichendem Kontrast</p>',
          impact: 'serious',
          help: 'Elements must meet minimum color contrast ratio thresholds',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/color-contrast'
        },
        {
          code: 'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail',
          message: 'This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.74:1. Recommendation: change background to #00a3b7.',
          type: 'error',
          selector: 'span',
          context: '<span style="color: #333; background-color: #e0e0e0;">Weiterer Text mit Kontrastproblem</span>',
          impact: 'moderate',
          help: 'Elements must meet minimum color contrast ratio thresholds',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/color-contrast'
        },
        {
          code: 'video-caption',
          message: '<video> elements must have captions',
          type: 'error',
          selector: 'video',
          context: '<video src="demo.mp4" controls></video>',
          impact: 'serious',
          help: 'Video elements must have captions',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/video-caption'
        }
      ],
      pa11yScore: 45
    }
  ]
};

async function testDetailedElementInfo() {
  console.log('🧪 Teste detaillierte Element-Info-Funktionalität...\n');
  
  const generator = new DetailedReportGenerator();
  
  try {
    const reportPath = await generator.generateDetailedReport(testResults, {
      outputDir: './test-output',
      includeContext: true,
      includeRecommendations: true,
      groupByType: true
    });
    
    console.log('✅ Detaillierter Bericht generiert:', reportPath);
    console.log('\n📋 Beispiel der verbesserten Element-Beschreibungen:');
    console.log('==================================================');
    
    // Zeige Beispiele der neuen Element-Info
    const generatorInstance = new DetailedReportGenerator();
    
    testResults.results[0].pa11yIssues.forEach((issue, index) => {
      const detailedInfo = generatorInstance.extractDetailedElementInfo(issue, testResults.results[0]);
      console.log(`\n🔍 Fehler ${index + 1}:`);
      console.log(`   Typ: ${issue.code}`);
      console.log(`   Nachricht: ${issue.message.substring(0, 80)}...`);
      console.log(`   🔧 Element: ${detailedInfo}`);
    });
    
    console.log('\n🎯 Verbesserungen:');
    console.log('   ✅ Spezifische Element-Informationen statt generischer Selectors');
    console.log('   ✅ Zeilennummern (simuliert) für bessere Lokalisierung');
    console.log('   ✅ Text-Preview (erste 30 Zeichen) für Kontext');
    console.log('   ✅ Kontrast-Verhältnisse und Empfehlungen extrahiert');
    console.log('   ✅ Unterscheidbare Fehler durch spezifische Details');
    
  } catch (error) {
    console.error('❌ Fehler beim Testen:', error);
  }
}

testDetailedElementInfo(); 