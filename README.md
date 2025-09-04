# 🎯 AuditMySite - Enhanced Accessibility Testing v1.6

> **🔥 NEW v1.6**: Improved CLI Experience + --max-pages Parameter! **Just works out of the box!** 🚀
> **📊 v1.5**: Performance Budgets with Custom Thresholds + Modern HTML5 & ARIA Analysis!

A comprehensive command-line tool for **modern accessibility testing** featuring **enhanced HTML5 element analysis**, **advanced ARIA evaluation**, **Chrome 135 performance optimizations**, and **semantic quality scoring**. Test any website by just providing a sitemap URL.

## 🚀 Quick Start

```bash
# Install globally
npm install -g @casoon/auditmysite

# Test any website (simplest usage)
auditmysite https://your-site.com/sitemap.xml

# Test with all pages
auditmysite https://your-site.com/sitemap.xml --full

# Expert mode with custom settings
auditmysite https://your-site.com/sitemap.xml --expert
```

## ✨ Key Features

### 🔥 **New in v1.6**
- 🎯 **Improved CLI Experience** - Cleaner output with debug logs hidden behind --verbose flag
- 📊 **--max-pages Parameter** - Precise control over the number of pages to test (e.g. --max-pages 10)
- 🧹 **Enhanced User Interface** - Simplified progress messages and reduced visual noise
- ⚡ **Better Parameter Logic** - --max-pages overrides --full for exact control

### 🔥 **New in v1.5**
- 📊 **Performance Budgets** - Configurable Web Vitals thresholds with business-focused templates (E-commerce, Corporate, Blog)
- 🎯 **Smart Budget Templates** - Conversion-optimized thresholds for different site types
- 📈 **Budget Violation Tracking** - Real-time pass/fail status with actionable recommendations
- ⚙️ **Custom Budget Configuration** - Set individual LCP, CLS, FCP, INP, TTFB thresholds via CLI or Expert Mode

### 🔥 **Enhanced in v1.3**
- 🎯 **Enhanced HTML5 Analysis** - Modern `<details>`, `<dialog>`, `<main>` element testing with axe-core v4.10
- ⚡ **Advanced ARIA Evaluation** - Impact-based scoring (Critical, Serious, Moderate, Minor)
- 🚀 **Chrome 135 Optimizations** - Enhanced accessibility tree, improved dialog support
- 📊 **Semantic Quality Scoring** - Comprehensive modern web standards compliance analysis
- 🏆 **Compliance Levels** - Basic, Enhanced, Comprehensive accessibility ratings
- 🔮 **Future Readiness Score** - Evaluation of modern web standards adoption

### 🏆 **Core Features**
- 🎯 **Simplified CLI** - Just 7 essential options + enhanced expert mode
- ⚡ **Core Web Vitals** - Real FCP, LCP, CLS, INP, TTFB metrics with smart fallbacks
- 📊 **Performance Budgets** - Configurable thresholds with business templates (E-commerce, Corporate, Blog)
- 🏆 **Smart Defaults** - Works perfectly without configuration
- 📊 **Professional Reports** - Enhanced HTML reports with modern analysis sections
- 🚀 **Fast & Reliable** - Parallel processing with intelligent error recovery
- ♿ **WCAG Compliance** - Comprehensive accessibility testing with pa11y v9
- ⏱️ **Real-time Progress** - Live updates with time estimates
- 🔄 **Error Recovery** - Automatic fallback and helpful troubleshooting

## 📋 CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--full` | Test all pages instead of just 5 | `false` |
| `--max-pages <number>` | Maximum number of pages to test (overrides --full) | `5` |
| `--expert` | Interactive expert mode with custom settings | `false` |
| `--format <type>` | Report format: `html` or `markdown` | `html` |
| `--output-dir <dir>` | Output directory for reports | `./reports` |
| `--non-interactive` | Skip prompts for CI/CD (use defaults) | `false` |
| `--verbose` | Show detailed progress information | `false` |
| `--budget <template>` | Performance budget: `ecommerce`, `corporate`, `blog`, `default` | `default` |
| `--lcp-budget <ms>` | Custom LCP threshold in milliseconds | Template value |
| `--cls-budget <score>` | Custom CLS threshold score (e.g. 0.1) | Template value |
| `--fcp-budget <ms>` | Custom FCP threshold in milliseconds | Template value |
| `--inp-budget <ms>` | Custom INP threshold in milliseconds | Template value |
| `--ttfb-budget <ms>` | Custom TTFB threshold in milliseconds | Template value |

## 💡 Usage Examples

### **Default Test (Recommended)**
```bash
auditmysite https://example.com/sitemap.xml
```
- ✅ Tests **5 pages** automatically
- ✅ **WCAG 2.1 AA** standard  
- ✅ **Core Web Vitals** included
- ✅ **HTML report** generated

### **Custom Page Limit** 🆕 **New in v1.6!**
```bash
# Test exactly 10 pages
auditmysite https://example.com/sitemap.xml --max-pages 10

# Test exactly 25 pages (overrides --full)
auditmysite https://example.com/sitemap.xml --max-pages 25
```
- ✅ **Precise Control** - Test exactly the number of pages you need
- ✅ **Overrides --full** - --max-pages takes priority over --full
- ✅ **Perfect for Testing** - Great for development and staging

### **Full Website Test**
```bash
auditmysite https://example.com/sitemap.xml --full
```
- ✅ Tests **all pages** in sitemap
- ✅ Perfect for comprehensive audits

### **Performance Budgets** 🆆 **New in v1.5!**
```bash
# E-commerce optimized (strict for conversion)
auditmysite https://shop.example.com/sitemap.xml --budget ecommerce

# Corporate standards (professional thresholds)
auditmysite https://company.example.com/sitemap.xml --budget corporate

# Custom budgets
auditmysite https://example.com/sitemap.xml --lcp-budget 2000 --cls-budget 0.05
```
- ✅ **Business Templates** - E-commerce, Corporate, Blog, Default
- ✅ **Custom Thresholds** - Set individual Web Vitals budgets
- ✅ **Budget Violations** - Real-time pass/fail status with recommendations
- ✅ **Expert Mode Integration** - Interactive budget configuration

### **Expert Mode** 🆆 **Enhanced in v1.3!**
```bash
auditmysite https://example.com/sitemap.xml --expert
```
- ✅ **Interactive prompts** for pages, standards, format, concurrency
- ✅ **Performance Budget Templates** - Choose E-commerce, Corporate, Blog, or Custom
- ✅ **Time estimates** for each configuration option
- ✅ **Advanced settings** including concurrent test controls
- ✅ **Performance options** - Enable/disable Web Vitals collection
- 🔥 **Enhanced HTML5 testing** - Modern element analysis toggle
- ⚡ **ARIA enhanced mode** - Advanced impact scoring toggle
- 🚀 **Chrome 135 features** - Performance optimizations toggle
- 📊 **Semantic analysis** - Quality scoring and recommendations toggle
- 📸 **Screenshot capture** - Desktop and mobile screenshots toggle
- ⌨️  **Keyboard navigation testing** - Focusable elements analysis
- 🎨 **Color contrast testing** - Basic contrast ratio analysis
- 🎯 **Focus management testing** - Focus indicator validation

### **CI/CD Integration**
```bash
# Run in CI with markdown output
auditmysite https://example.com/sitemap.xml --non-interactive --format markdown

# Test specific number of pages in CI
auditmysite https://example.com/sitemap.xml --non-interactive --max-pages 20

# Enforce strict performance budgets (example)
auditmysite https://shop.example.com/sitemap.xml --non-interactive --budget ecommerce \
  --lcp-budget 2000 --cls-budget 0.1 --fcp-budget 1200 --inp-budget 200 --ttfb-budget 200

# Parse report in a follow-up CI step (pseudo-code)
# grep -q "Severity: high" reports/example.com/performance-issues-*.md || echo "No high severity perf issues"
```
- ✅ **No prompts** - perfect for automation
- ✅ **Markdown output** for easy parsing
- ✅ **Exit codes** for pipeline integration (see section below)
- ✅ Combine with a simple grep/assert step to enforce budgets in your pipeline

## 📊 What You Get

Below is an overview of what is tested, what the output looks like, and how to interpret the results.

### **Enhanced Accessibility Report** 🔥
- 🎯 **WCAG 2.1 AA compliance** testing with pa11y v9
- 🔍 **Detailed error analysis** with fix suggestions
- 📝 **HTML5 semantic analysis** - Modern elements evaluation
- ⚡ **ARIA impact scoring** - Critical, Serious, Moderate, Minor categorization
- 🏆 **Compliance levels** - Basic, Enhanced, Comprehensive ratings
- ⭐ **Multi-dimensional scoring** - Accessibility, HTML5, ARIA, Semantic quality
- 🔮 **Future readiness** - Modern web standards adoption score

### **Performance Report** ⚡
- ⚡ **Core Web Vitals** (LCP, FCP, CLS, INP, TTFB)
- 📊 **Real performance metrics** using Google's official web-vitals library (injected during tests)
- 📈 **Budget Status Tracking** - Pass/fail against custom thresholds with violation details
- 🎯 **Smart Budget Templates** - Business-focused thresholds (E-commerce: LCP 2000ms, Corporate: 2200ms)
- 🚀 **Chrome 135 optimizations** - Enhanced measurement accuracy
- 🏆 **Performance score & grade** (A–F rating)
- 💡 **Actionable recommendations** - Budget-aware suggestions with severity levels

### **Professional Reports** 📊
- 📄 **Enhanced HTML format** - Modern analysis sections with feature badges
- 📝 **Markdown format** - Developer-friendly output
- 💾 **Organized structure** - Reports saved by domain with timestamps
- 📈 **Visual scorecards** - HTML5, ARIA, Semantic quality circles
- 🔥 **Modern design** - Interactive sections and smooth scrolling
- 💡 **Priority recommendations** - Categorized by HTML5, ARIA, Performance

## 🌍 Accessibility Standards

- **WCAG 2.1 Level A** - Basic accessibility
- **WCAG 2.1 Level AA** - Recommended (default)
- **WCAG 2.1 Level AAA** - Strict compliance
- **Section 508** - US Federal requirements

## 🎯 Perfect For

- ✅ **Quick accessibility checks** before deployment
- ✅ **Performance monitoring** with real Web Vitals and custom budgets
- ✅ **E-commerce optimization** - Conversion-focused performance thresholds
- ✅ **Corporate compliance** - Professional performance standards
- ✅ **WCAG compliance** testing for legal requirements
- ✅ **CI/CD integration** with `--non-interactive` flag and budget validation
- ✅ **Client reports** with professional HTML output and budget status

## 📦 Output Files and Structure

- Reports are saved under `./reports/<domain>/` with date-based filenames.
- Examples (HTML default):
  - `reports/example.com/accessibility-report-YYYY-MM-DD.html`
  - `reports/example.com/detailed-issues-YYYY-MM-DD.md`
  - `reports/example.com/performance-issues-YYYY-MM-DD.md`

### Sample CLI run output
```text
🚀 AuditMySite v1.6.0 - Enhanced Accessibility Testing
📄 Sitemap: https://example.com/sitemap.xml
📋 Configuration:
   📄 Pages: 5
   📋 Standard: WCAG2AA
   📊 Performance: Yes (budget: default)
   📄 Format: HTML
   📁 Output: ./reports
...
✅ Queue processing completed: 5/5 URLs in 58s
```

### Sample performance issues excerpt
```markdown
# 📊 Performance Issue Report
Generated: 2025-09-04T05:55:00.000Z
Total Issues: 3

## Page: https://example.com/product/123
- Type: web-vitals
- Severity: high
- Metric: LCP
- Score: 3200ms (budget 2500ms)
- Recommendation: Optimize hero image and defer below-the-fold resources.
```

### Exit codes and how to interpret them
- `0` — The tool ran successfully. There may still be accessibility/performance issues in the reports; check them, but CI should treat this as success unless you enforce budgets separately.
- `1` — One or more pages experienced a technical failure or crash during testing (e.g., navigation timeout, browser error). Investigate logs and rerun.

Note: Accessibility failures alone do NOT cause a non-zero exit code. Use performance budgets or your CI logic to fail the pipeline based on report contents if desired.

## 🧭 What Is Tested (Scope) and Current Status

- Accessibility (WCAG 2.1 AA via pa11y/axe-core):
  - Labels, alt text, landmarks, headings, color contrast, link names, form labeling, and many more rules.
  - HTML5 and ARIA enhancements: `<dialog>`, `<details>`, `<main>`, ARIA roles/states evaluated with modern rule sets.
- Performance (Core Web Vitals):
  - LCP, FCP, CLS, INP, TTFB collected using Google's web-vitals in the test browser, plus basic navigation timings.
  - Budget evaluation using templates or custom thresholds, with recommendations per violation.
- Not included (by design for v1.5):
  - SEO audits, security scans, PDF export, Lighthouse integration (removed to keep core fast and focused).

### Maturity / Accuracy
- Accessibility: Mature and robust through pa11y + axe-core v4.10 with additional semantic checks.
- Performance: Lightweight and practical. Metrics come from web-vitals in-browser collection. A formal comparison suite against Lighthouse is planned/ongoing to validate parity for typical cases.

## 🛠️ Technical Details

### **Built With**
- 🎭 **Playwright** - Modern browser automation with Chrome 135 support
- ♿ **Pa11y v9** - Latest accessibility testing with axe-core v4.10
- ⚡ **Google Web Vitals** - Official performance metrics with enhanced collection
- 📝 **TypeScript** - Type-safe and reliable architecture
- 🔥 **Enhanced Analysis** - Custom HTML5 and ARIA evaluation engines

### **System Requirements**
- **Node.js** 20+ (required for pa11y v9)
- **3GB RAM** minimum (4GB recommended for enhanced analysis)
- **Chrome/Chromium** 120+ (Chrome 135+ recommended for full optimization)
- **Internet connection** for testing external sites

### **Key Features**
- 🚀 **Smart defaults** - Zero configuration needed, enhanced features enabled by default
- ⚡ **Fast parallel processing** - Test multiple pages with Chrome 135 optimizations
- 🔄 **Automatic retries** - Robust error handling with intelligent recovery
- 📊 **Comprehensive reporting** - Accessibility, HTML5, ARIA, Performance, and Semantic analysis
- 🏗️ **Modern architecture** - Built for reliability with future-ready standards
- 🔥 **Enhanced analysis** - Modern HTML5 elements and advanced ARIA evaluation
- 🏆 **Multi-level compliance** - Basic, Enhanced, Comprehensive accessibility levels

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and feel free to submit issues and pull requests.

---

**Made with ❤️ by [CASOON](https://casoon.de)**
