# 🎯 AuditMySite - Enhanced Accessibility Testing v1.3

> **🔥 NEW v1.3**: Modern HTML5 & ARIA Analysis with Chrome 135 Optimizations! **Just works out of the box!** 🚀

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

### 🔥 **New in v1.3**
- 🎯 **Enhanced HTML5 Analysis** - Modern `<details>`, `<dialog>`, `<main>` element testing with axe-core v4.10
- ⚡ **Advanced ARIA Evaluation** - Impact-based scoring (Critical, Serious, Moderate, Minor)
- 🚀 **Chrome 135 Optimizations** - Enhanced accessibility tree, improved dialog support
- 📊 **Semantic Quality Scoring** - Comprehensive modern web standards compliance analysis
- 🏆 **Compliance Levels** - Basic, Enhanced, Comprehensive accessibility ratings
- 🔮 **Future Readiness Score** - Evaluation of modern web standards adoption

### 🏆 **Core Features**
- 🎯 **Simplified CLI** - Just 6 essential options + enhanced expert mode
- ⚡ **Core Web Vitals** - Real FCP, LCP, CLS, INP, TTFB metrics with smart fallbacks
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
| `--expert` | Interactive expert mode with custom settings | `false` |
| `--format <type>` | Report format: `html` or `markdown` | `html` |
| `--output-dir <dir>` | Output directory for reports | `./reports` |
| `--non-interactive` | Skip prompts for CI/CD (use defaults) | `false` |
| `--verbose` | Show detailed progress information | `false` |

## 💡 Usage Examples

### **Default Test (Recommended)**
```bash
auditmysite https://example.com/sitemap.xml
```
- ✅ Tests **5 pages** automatically
- ✅ **WCAG 2.1 AA** standard  
- ✅ **Core Web Vitals** included
- ✅ **HTML report** generated

### **Full Website Test**
```bash
auditmysite https://example.com/sitemap.xml --full
```
- ✅ Tests **all pages** in sitemap
- ✅ Perfect for comprehensive audits

### **Expert Mode** 🆕 **Enhanced in v1.3!**
```bash
auditmysite https://example.com/sitemap.xml --expert
```
- ✅ **Interactive prompts** for pages, standards, format, concurrency
- ✅ **Time estimates** for each configuration option
- ✅ **Advanced settings** including concurrent test controls
- ✅ **Performance options** - Enable/disable Web Vitals collection
- 🔥 **Enhanced HTML5 testing** - Modern element analysis toggle
- ⚡ **ARIA enhanced mode** - Advanced impact scoring toggle
- 🚀 **Chrome 135 features** - Performance optimizations toggle
- 📊 **Semantic analysis** - Quality scoring and recommendations toggle

### **CI/CD Integration**
```bash
auditmysite https://example.com/sitemap.xml --non-interactive --format markdown
```
- ✅ **No prompts** - perfect for automation
- ✅ **Markdown output** for easy parsing
- ✅ **Exit codes** for pipeline integration

## 📊 What You Get

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
- 📊 **Real performance metrics** using Google's official library
- 🚀 **Chrome 135 optimizations** - Enhanced measurement accuracy
- 🏆 **Performance score & grade** (A-F rating)
- 💡 **Actionable recommendations** for improvements

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
- ✅ **Performance monitoring** with real Web Vitals
- ✅ **WCAG compliance** testing for legal requirements
- ✅ **CI/CD integration** with `--non-interactive` flag
- ✅ **Client reports** with professional HTML output

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
