# ♿ AuditMySite v2.0 - Simple Accessibility Testing

> **Just works out of the box!** 🚀 Test websites for WCAG compliance with real Core Web Vitals performance metrics.

A streamlined command-line tool for **accessibility testing** with **Google's official Web Vitals** integration. Test any website by just providing a sitemap URL.

## ✨ What's New in v2.0

- 🎯 **Simplified CLI** - Just 6 essential options (instead of 74+)
- ⚡ **Core Web Vitals** - Real FCP, LCP, CLS, INP, TTFB metrics  
- 🏆 **Smart Defaults** - Works perfectly without configuration
- 🚀 **Performance Focus** - Built-in Google web-vitals library
- 📊 **Clean Reports** - Focus on actionable accessibility insights

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

### **Expert Mode**
```bash
auditmysite https://example.com/sitemap.xml --expert
```
- ✅ **Interactive prompts** for custom settings
- ✅ Choose pages, standards, output format
- ✅ Advanced configuration options

## 📋 CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--full` | Test all pages instead of just 5 | `false` |
| `--expert` | Interactive expert mode with custom settings | `false` |
| `--format <type>` | Report format: `html` or `markdown` | `html` |
| `--output-dir <dir>` | Output directory for reports | `./reports` |
| `--non-interactive` | Skip prompts for CI/CD (use defaults) | `false` |
| `--verbose` | Show detailed progress information | `false` |

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

### **Clean HTML Reports**
- 📄 **Professional formatting** with tables
- 🎨 **Easy-to-read layout** for stakeholders  
- 📊 **Performance metrics visualization**
- 💾 **Organized by domain** in reports folder

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

### **Key Features**
- 🚀 **Smart defaults** - Zero configuration needed
- ⚡ **Fast parallel processing** - Test multiple pages simultaneously  
- 🔄 **Automatic retries** - Robust error handling
- 📊 **Comprehensive reporting** - Both accessibility and performance
- 🏗️ **Modern architecture** - Built for reliability

## 📈 System Requirements

- **Node.js** 18+ 
- **2GB RAM** minimum (4GB recommended)
- **Internet connection** for testing external sites

## 🆚 v1.0 vs v2.0

| Feature | v1.0 | v2.0 |
|---------|------|------|
| CLI Options | 74+ complex options | 6 simple options |
| Configuration | Requires detailed setup | Just works out-of-the-box |
| Performance | Basic timing metrics | Google Web Vitals integration |
| Reports | Security, SEO, PDF options | Focus on Accessibility + Performance |
| User Experience | Expert-level complexity | Beginner-friendly |
| Default Behavior | Minimal functionality | Smart defaults with full coverage |

## 🚀 Migration from v1.0

**v1.0 users:** The old CLI (`bin/audit.js`) still works! v2.0 adds the new simplified CLI (`bin/audit-v2.js`) without breaking existing workflows.

```bash
# Old way (still works)
auditmysite https://site.com/sitemap.xml --max-pages 10 --detailed-report --performance-report

# New way (recommended)
auditmysite https://site.com/sitemap.xml --full
```

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

We welcome contributions! The focus for v2.0+ is **simplicity and reliability**:

- 🎯 Keep the CLI simple (max 10 options)
- ⚡ Improve Web Vitals accuracy  
- 📊 Enhance report quality
- 🐛 Fix bugs and improve stability

---

**Made with ❤️ by [CASOON](https://casoon.de)**
