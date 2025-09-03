# 🚀 AuditMySite - Feature Development Roadmap

## 🎯 Phase 1: Foundation Fixes (v1.3.2)

### 1. ✅ **Test Suite reparieren**
- **Problem**: Tests schlagen alle fehl (0/8 passed)
- **Ursache**: Mock Server Templates erwarten andere Ergebnisse
- **Lösung**: 
  - Mock Server Templates anpassen
  - Realistische Erwartungen in test-suite.js setzen
  - Validation korrigieren
- **Zeitaufwand**: 2-3 Stunden
- **Priority**: 🔥 CRITICAL

### 2. ✅ **CLI Version Fix**
- **Problem**: CLI zeigt hardcodierte Version, nicht aus package.json
- **Lösung**: 
  ```javascript
  const packageJson = require('../package.json');
  .version(packageJson.version)
  ```
- **Zeitaufwand**: 15 Minuten
- **Priority**: 🔥 HIGH

### 3. ✅ **Performance Metrics Verbesserung**
- **Problem**: Web Vitals oft 0 bei statischen Seiten
- **Lösung**:
  - Bessere Fallback-Strategien implementieren
  - Document timing als Alternative verwenden
  - Extended wait times für LCP/CLS
- **Features**:
  ```typescript
  if (metrics.lcp === 0) {
    metrics.lcp = estimateLCPFromDocumentTiming();
  }
  if (metrics.cls === 0) {
    metrics.cls = estimateCLSFromLayoutShifts();
  }
  ```
- **Zeitaufwand**: 3-4 Stunden
- **Priority**: 🚀 HIGH

### 4. ✅ **Progress Bar Enhancement**
- **Problem**: Basic spinner, keine ETA oder Details
- **Lösung**:
  ```bash
  🚀 Testing pages... ████████████████████ 85% (17/20)
     Current: /contact.html
     ETA: 45 seconds
     Speed: 2.3 pages/min
  ```
- **Features**:
  - Percentage completion
  - Current page URL
  - ETA calculation
  - Pages per minute speed
- **Zeitaufwand**: 2-3 Stunden
- **Priority**: 🚀 MEDIUM

---

## 🔧 Phase 2: Smart Features (v1.4.0)

### 5. ✅ **Smart Sitemap Discovery**
- **Current**: Requires exact sitemap.xml URL
- **Target**: 
  ```bash
  auditmysite https://example.com          # Auto-finds /sitemap.xml
  auditmysite https://example.com/blog     # Auto-finds /blog/sitemap.xml
  ```
- **Features**:
  - Check common sitemap locations
  - Parse robots.txt for sitemap references
  - Support sitemap index files
  - Fallback to manual URL crawling (limited)
- **Implementation**:
  ```typescript
  async discoverSitemap(baseUrl: string): Promise<string[]> {
    const candidates = [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap_index.xml`,
      `${baseUrl}/sitemaps.xml`,
      // robots.txt parsing
    ];
  }
  ```
- **Zeitaufwand**: 4-5 Stunden
- **Priority**: 🌟 HIGH

### 7. ✅ **Multi-Language Support**
- **Current**: English only
- **Target**: German + English support
- **Features**:
  ```bash
  auditmysite site.com --lang de    # Deutsche Ausgabe
  auditmysite site.com --lang en    # English output
  ```
- **Implementation**:
  - i18n message system
  - CLI messages in DE/EN
  - Error messages localized
  - Report text localization
- **Zeitaufwand**: 6-8 Stunden
- **Priority**: 🌟 MEDIUM

---

## 🚀 Phase 3: Advanced Features (v1.5.0)

### 9. ✅ **API Server Mode**
- **Target**: REST API für externe Integration
- **Features**:
  ```bash
  auditmysite --server --port 3000    # Starts API server
  ```
- **API Endpoints**:
  ```
  POST /api/audit         # Start audit
  GET /api/audit/:id      # Get audit status
  GET /api/results/:id    # Get results
  DELETE /api/audit/:id   # Cancel audit
  ```
- **Implementation**:
  - Express.js server
  - Job queue system
  - WebSocket für real-time updates
  - API authentication
- **Zeitaufwand**: 12-15 Stunden
- **Priority**: 🎯 MEDIUM

### 11. ✅ **Batch Processing**
- **Target**: Multiple sites in one command
- **Features**:
  ```yaml
  # batch.yaml
  sites:
    - url: https://site1.com/sitemap.xml
      config: { pages: 10, standard: 'WCAG2AA' }
    - url: https://site2.com/sitemap.xml  
      config: { pages: 5, standard: 'WCAG2AAA' }
  output:
    format: html
    directory: ./batch-results
  ```
- **CLI Usage**:
  ```bash
  auditmysite --batch batch.yaml
  auditmysite --batch-json sites.json
  ```
- **Implementation**:
  - YAML/JSON config parser
  - Sequential or parallel batch processing
  - Consolidated reporting
  - Progress across multiple sites
- **Zeitaufwand**: 8-10 Stunden
- **Priority**: 🎯 MEDIUM

---

## 🧠 Phase 4: AI Features (v2.0.0)

### 12. ✅ **AI-Powered Recommendations**
- **Target**: Smart, contextual accessibility fixes
- **Features**:
  ```javascript
  recommendations: [
    {
      issue: "Missing alt text on hero image",
      priority: "high",
      impact: "Blocks screen readers from understanding main visual",
      estimatedTime: "5 minutes",
      difficulty: "easy",
      suggestedFix: 'Add alt="Company logo with blue background"',
      codeExample: '<img src="hero.jpg" alt="Company logo with blue background">',
      resources: ["https://webaim.org/articles/alt/"]
    }
  ]
  ```
- **AI Features**:
  - Context-aware alt text suggestions
  - Priority scoring based on impact
  - Code examples with fixes
  - Learning from common patterns
- **Implementation**:
  - OpenAI API integration (optional)
  - Local ML models for privacy
  - Template-based suggestions
  - Smart pattern recognition
- **Zeitaufwand**: 20-25 Stunden
- **Priority**: 🔮 HIGH

### 14. ✅ **Performance Budgets**
- **Target**: Fail tests if performance/accessibility thresholds not met
- **Features**:
  ```yaml
  # auditmysite.config.yaml
  budgets:
    performance:
      lcp: 2500        # Fail if LCP > 2.5s
      fcp: 1800        # Fail if FCP > 1.8s  
      cls: 0.1         # Fail if CLS > 0.1
      inp: 200         # Fail if INP > 200ms
    accessibility:
      score: 90        # Fail if accessibility score < 90%
      errors: 0        # Fail if any accessibility errors
      wcag_aa: true    # Must pass WCAG 2.1 AA
    exit_codes:
      budget_failed: 2
      tests_failed: 1
  ```
- **CLI Integration**:
  ```bash
  auditmysite site.com --budget
  echo $?  # 0=success, 1=test failed, 2=budget failed
  ```
- **Implementation**:
  - Budget validation logic
  - Custom exit codes for CI/CD
  - Detailed budget failure reports
  - Warning vs. error thresholds
- **Zeitaufwand**: 4-6 Stunden
- **Priority**: 🔮 HIGH

---

## 📊 Development Timeline

### **Week 1-2: Foundation (v1.3.2)**
- Day 1-2: Test Suite reparieren
- Day 3: CLI Version Fix + Performance Metrics
- Day 4-5: Progress Bar Enhancement

### **Week 3-5: Smart Features (v1.4.0)**  
- Week 3: Smart Sitemap Discovery
- Week 4-5: Multi-Language Support

### **Week 6-8: Advanced Features (v1.5.0)**
- Week 6-7: API Server Mode
- Week 8: Batch Processing

### **Month 3: AI Features (v2.0.0)**
- Week 9-11: AI-Powered Recommendations
- Week 12: Performance Budgets + Polish

---

## 🎯 Success Criteria

### **v1.3.2 (Foundation)**
- ✅ All tests pass (8/8)
- ✅ CLI shows correct version
- ✅ Web Vitals never show 0 inappropriately
- ✅ Progress shows ETA and current page

### **v1.4.0 (Smart Features)**
- ✅ `auditmysite domain.com` works without sitemap.xml
- ✅ German language support complete
- ✅ Auto-discovery finds 95% of common sitemaps

### **v1.5.0 (Advanced)**
- ✅ API server handles concurrent audits
- ✅ Batch processing works with 10+ sites
- ✅ WebSocket real-time updates functional

### **v2.0.0 (AI)**
- ✅ AI recommendations are contextually relevant
- ✅ Performance budgets integrate with CI/CD
- ✅ Exit codes work correctly in automation

---

## 🔧 Implementation Notes

### **Technical Decisions:**
- **Language Support**: Use i18next for internationalization
- **API Server**: Express.js with job queue (Bull/Agenda)
- **Batch Processing**: YAML parsing with js-yaml
- **AI Integration**: Optional OpenAI, fallback to templates
- **Performance Budgets**: Schema validation with Joi

### **Breaking Changes:**
- v2.0.0: May change CLI argument structure
- v1.5.0: API server introduces new dependencies
- v1.4.0: Sitemap discovery may change error handling

**Total Estimated Development Time: 60-80 hours across 3 months**
