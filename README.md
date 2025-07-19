# ♿ AuditMySite - Accessibility Test CLI

A powerful command-line tool for automated accessibility testing using Playwright and pa11y, based on sitemap URLs. Built with modern TypeScript and comprehensive parallelization.

## 🚀 **Quick Start**

```bash
# Installation
npm install -g @casoon/auditmysite

# Simplest usage
npx @casoon/auditmysite http://your-site.com/sitemap.xml

# With extended options
npx @casoon/auditmysite http://your-site.com/sitemap.xml \
  --max-pages 20 \
  --max-concurrent 5 \
  --performance-report \
  --seo-report \
  --security-scan
```

## 📊 **Feature Scope - Implemented Phases**

### **🚀 Phase 1: Advanced Parallelization (100% Implemented)**
- **10x faster** through true parallelization with Worker Pool
- **Event-Driven Queue System** for intelligent task management
- **Resource Monitoring** (Memory, CPU, Network) with automatic throttling
- **Priority Queue** with intelligent URL prioritization
- **Network Throttling** for server-friendly request rates
- **Live Status Updates**: `📊 67% | 2/3 | 🔧 2/3 | 💾 45MB | ⏱️ 10s`
- **Automatic Retry Logic** with exponential backoff strategy
- **Memory-Leak Prevention** through proper resource management

### **⚡ Phase 2: Modern Performance Standards (100% Implemented)**
- **Core Web Vitals Testing** (LCP, FID, CLS, FCP, TTI, TBT)
- **Lighthouse Integration** for comprehensive performance audits
- **Performance Scoring** with automatic recommendations
- **Memory Usage Monitoring** with leak detection
- **Loading Performance Tests** with detailed metrics
- **Performance Reports** with PageSpeed/Lightspeed analysis

### **📱 Phase 3: Mobile-First Testing (100% Implemented)**
- **Touch Target Testing** (44px minimum size for interactive elements)
- **PWA Feature Testing** (Manifest, Service Worker, Installability)
- **Mobile Emulation** with various viewport sizes
- **Responsive Design Validation** for all screen sizes
- **Touch Navigation Testing** for mobile user experience
- **Offline Capability Testing** for Progressive Web Apps

### **🔒 Phase 4: Security Testing (100% Implemented)**
- **Security Headers Validation** (CSP, HSTS, X-Frame-Options, etc.)
- **HTTPS Enforcement Testing** with mixed content detection
- **Content Security Policy Analysis** with detailed directive parsing
- **Vulnerability Scanning** (XSS, Injection, Info Disclosure)
- **Security Scoring** and automated recommendations
- **Compliance Reports** for GDPR, SOC2, ISO27001

### **📄 Phase 5: Interactive HTML Reports (100% Implemented)**
- **Modern, responsive design** with CSS variables
- **Dark Mode Support** (automatic detection)
- **Copy-to-Clipboard Buttons** for AI-compatible data exports
- **Interactive Tables** with hover effects and sorting
- **Toast Notifications** for user feedback
- **Mobile-optimized layout** for all devices

## 🛠️ **Additional Features**

### **📊 Extended Reports:**
- **SEO Analysis** with comprehensive search engine optimization
- **Performance Metrics** collection (Core Web Vitals)
- **Interactive CLI Prompts** for better user experience
- **German Accessibility Laws Support** (BFSG, EU 2019/882)
- **Multi-Standard Support** (WCAG 2.0/2.1, Section 508)
- **Detailed Error Reports** for automated fixes

### **🔧 Technical Features:**
- **TypeScript** - Type-safe development
- **Playwright** - Browser automation
- **pa11y** - Accessibility testing engine
- **Event-Driven Architecture** - Scalable queue processing
- **Resource Monitoring** - Intelligent resource management

## 📋 **CLI Options**

### **Core Options:**
```bash
--max-pages <number>        # Maximum pages to test (default: 20)
--timeout <number>          # Timeout in milliseconds (default: 10000)
--standard <standard>       # Accessibility standard (WCAG2A|WCAG2AA|WCAG2AAA|Section508)
--output-dir <dir>          # Output directory for reports (default: "./reports")
```

### **🚀 Parallelization Options:**
```bash
--max-concurrent <number>   # Number of parallel workers (default: 3)
--concurrency <number>      # Alias for --max-concurrent
--max-workers <number>      # Alias for --max-concurrent
--max-retries <number>      # Max retry attempts (default: 3)
--retry-delay <ms>          # Retry delay in ms (default: 2000)
--no-progress-bar           # Disable live progress bar
--progress-interval <ms>    # Progress update interval (default: 1000)
--no-resource-monitoring    # Disable resource monitoring
--max-memory <mb>          # Max memory usage in MB (default: 512)
--max-cpu <percent>        # Max CPU usage percentage (default: 80)
--sequential               # Use sequential testing (legacy mode, slower)
```

### **📄 Report Options:**
```bash
--detailed-report           # Generate detailed error report for automated fixes
--performance-report        # Generate performance report with PageSpeed analysis
--seo-report               # Generate SEO report with search engine optimization
--security-scan            # Run comprehensive security scan
--security-report          # Generate detailed security report
--html                     # Generate HTML report instead of Markdown
--no-copy-buttons          # Disable copy-to-clipboard buttons in HTML report
```

### **🔧 Test Options:**
```bash
--use-pa11y                # Use pa11y for detailed accessibility testing
--no-pa11y                 # Disable pa11y, use only Playwright tests
--lighthouse               # Run Lighthouse tests for comprehensive analysis
--core-web-vitals          # Test Core Web Vitals performance metrics
--touch-targets            # Test touch target sizes for mobile accessibility
--pwa                      # Test Progressive Web App features
--mobile-emulation         # Enable mobile emulation
--viewport <size>          # Set viewport size (e.g., 1920x1080)
--user-agent <agent>       # Set custom user agent
```

## 📊 **Usage Examples**

### **Quick Accessibility Test:**
```bash
npx @casoon/auditmysite https://example.com/sitemap.xml
```

### **Comprehensive Audit:**
```bash
npx @casoon/auditmysite https://example.com/sitemap.xml \
  --max-pages 50 \
  --max-concurrent 5 \
  --standard WCAG2AAA \
  --detailed-report \
  --performance-report \
  --seo-report \
  --security-scan \
  --html
```

### **Performance-Focused Test:**
```bash
npx @casoon/auditmysite https://example.com/sitemap.xml \
  --max-pages 10 \
  --performance-report \
  --lighthouse \
  --core-web-vitals \
  --mobile-emulation
```

### **Mobile-First Test:**
```bash
npx @casoon/auditmysite https://example.com/sitemap.xml \
  --max-pages 20 \
  --touch-targets \
  --pwa \
  --mobile-emulation \
  --viewport 375x667
```

### **Security Audit:**
```bash
npx @casoon/auditmysite https://example.com/sitemap.xml \
  --security-scan \
  --security-report \
  --max-concurrent 2 \
  --max-pages 20
```

## 🌍 **Supported Accessibility Standards**

- **WCAG 2.0 Level A** - Basic accessibility
- **WCAG 2.0 Level AA** - Recommended (default)
- **WCAG 2.0 Level AAA** - Strict compliance
- **Section 508** - US Federal requirements
- **BFSG** - German accessibility laws
- **EU 2019/882** - European accessibility directive

## 📊 **Report Types**

1. **Accessibility Report** - WCAG compliance results
2. **Performance Report** - Core Web Vitals and metrics
3. **SEO Report** - Search engine optimization analysis
4. **Security Report** - Security vulnerabilities and recommendations
5. **Detailed Error Report** - AI-compatible fix suggestions

### **Output Formats:**
- **Markdown** - Standard format with detailed information
- **HTML** - Interactive reports with copy buttons
- **JSON** - Machine-readable data for automation

---

## 🇩🇪 **Deutsche Dokumentation**

### **Schnellstart:**
```bash
# Einfachste Verwendung - Queue-Verarbeitung ist Standard!
npx @casoon/auditmysite http://localhost:4321/sitemap.xml

# Mit erweiterten Optionen
npx @casoon/auditmysite http://localhost:4321/sitemap.xml \
  --max-pages 20 \
  --max-concurrent 5 \
  --performance-report \
  --seo-report
```

### **Deutsche Accessibility-Gesetze:**
- **BFSG (Barrierefreie-Informationstechnik-Verordnung)** Support
- **EU 2019/882** Europäische Accessibility-Richtlinie
- **WCAG 2.1** Konformität für deutsche Standards

### **Deutsche CLI-Optionen:**
```bash
--max-concurrent <number>   # Anzahl paralleler Worker (Standard: 3)
--concurrency <number>      # Alias für --max-concurrent
--max-workers <number>      # Alias für --max-concurrent
--max-retries <number>      # Maximale Wiederholungsversuche (Standard: 3)
--retry-delay <ms>          # Verzögerung zwischen Wiederholungen (Standard: 2000)
--no-progress-bar           # Live-Fortschrittsbalken deaktivieren
--progress-interval <ms>    # Fortschritts-Update-Intervall (Standard: 1000)
--no-resource-monitoring    # Ressourcen-Überwachung deaktivieren
--max-memory <mb>          # Maximaler Speicherverbrauch in MB (Standard: 512)
--max-cpu <percent>        # Maximaler CPU-Verbrauch in Prozent (Standard: 80)
--sequential               # Sequentielle Tests verwenden (Legacy-Modus, langsamer)
```

### **Deutsche Report-Optionen:**
```bash
--detailed-report           # Detaillierten Fehlerbericht für automatisierte Fixes generieren
--performance-report        # Performance-Bericht mit PageSpeed-Analyse generieren
--seo-report               # SEO-Bericht mit Suchmaschinenoptimierung generieren
--security-scan            # Umfassenden Security-Scan durchführen
--security-report          # Detaillierten Security-Bericht generieren
--html                     # HTML-Bericht statt Markdown generieren
--no-copy-buttons          # Copy-to-Clipboard-Buttons im HTML-Bericht deaktivieren
```