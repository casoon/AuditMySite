# ♿ AuditMySite - Simple Accessibility Testing

> **Just works out of the box!** 🚀 Test websites for WCAG compliance with real Core Web Vitals performance metrics.

A streamlined command-line tool for **accessibility testing** with **Google's official Web Vitals** integration. Test any website by just providing a sitemap URL.

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

- 🎯 **Simplified CLI** - Just 6 essential options + enhanced expert mode
- ⚡ **Core Web Vitals** - Real FCP, LCP, CLS, INP, TTFB metrics with smart fallbacks
- 🏆 **Smart Defaults** - Works perfectly without configuration
- 📊 **Professional Reports** - Clean HTML/Markdown output
- 🚀 **Fast & Reliable** - Parallel processing with intelligent error recovery
- ♿ **WCAG Compliance** - Comprehensive accessibility testing
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

### **Expert Mode** 🆕
```bash
auditmysite https://example.com/sitemap.xml --expert
```
- ✅ **Interactive prompts** for pages, standards, format, concurrency
- ✅ **Time estimates** for each configuration option
- ✅ **Advanced settings** including concurrent test controls
- ✅ **Performance options** - Enable/disable Web Vitals collection

### **CI/CD Integration**
```bash
auditmysite https://example.com/sitemap.xml --non-interactive --format markdown
```
- ✅ **No prompts** - perfect for automation
- ✅ **Markdown output** for easy parsing
- ✅ **Exit codes** for pipeline integration

## 📊 What You Get

### **Accessibility Report**
- 🎯 **WCAG 2.1 AA compliance** testing
- 🔍 **Detailed error analysis** with fix suggestions
- 📝 **Pa11y integration** for comprehensive coverage
- ⭐ **Accessibility score** for each page

### **Performance Report** 
- ⚡ **Core Web Vitals** (LCP, FCP, CLS, INP, TTFB)
- 📊 **Real performance metrics** using Google's official library
- 🏆 **Performance score & grade** (A-F rating)
- 💡 **Actionable recommendations** for improvements

### **Professional Reports**
- 📄 **HTML format** - Professional tables and formatting
- 📝 **Markdown format** - Developer-friendly output
- 💾 **Organized structure** - Reports saved by domain
- 📈 **Performance visualization** - Easy to understand metrics

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
- 🎭 **Playwright** - Modern browser automation
- ♿ **Pa11y** - Industry-standard accessibility testing
- ⚡ **Google Web Vitals** - Official performance metrics
- 📝 **TypeScript** - Type-safe and reliable

### **System Requirements**
- **Node.js** 18+ 
- **2GB RAM** minimum (4GB recommended)
- **Internet connection** for testing external sites

### **Key Features**
- 🚀 **Smart defaults** - Zero configuration needed
- ⚡ **Fast parallel processing** - Test multiple pages simultaneously  
- 🔄 **Automatic retries** - Robust error handling
- 📊 **Comprehensive reporting** - Both accessibility and performance
- 🏗️ **Modern architecture** - Built for reliability

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and feel free to submit issues and pull requests.

---

**Made with ❤️ by [CASOON](https://casoon.de)**
