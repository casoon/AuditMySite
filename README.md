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

## 💡 **Usage Tip**

Start with 5 pages to identify general layout issues. Once the basic structure is validated, proceed to audit the main content pages in detail for accessibility and compliance.

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

## 📄 **License**

This project is licensed under the MIT License. For third-party dependencies and their licenses, see [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).

---

## 🇩🇪 **Deutsche Dokumentation**

### **Barrierefreiheitsgesetz (BFSG) & EU-Richtlinie 2019/882**

Dieses Tool unterstützt die Überprüfung auf Konformität mit dem deutschen Barrierefreiheitsgesetz (BFSG) und der EU-Richtlinie 2019/882. Die Berichte helfen, gesetzliche Anforderungen für öffentliche Stellen und Unternehmen zu erfüllen.

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