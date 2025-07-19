# ♿ AuditMySite - Accessibility Test CLI

Ein leistungsstarkes Command-Line-Tool für automatisierte Accessibility-Tests mit Playwright und pa11y, basierend auf Sitemap-URLs.

## 🚀 **Quick Start**

### **Standard Usage (Queue Processing is Default):**
```bash
# 🆕 Simplest usage - Queue processing is standard!
npx @casoon/auditmysite http://localhost:4321/sitemap.xml

# With extended options
npx @casoon/auditmysite http://localhost:4321/sitemap.xml \
  --max-pages 20 \
  --max-concurrent 5 \
  --performance-report \
  --seo-report
```

### **Legacy Mode (Sequential Processing):**
```bash
# Only for compatibility - slower!
npx @casoon/auditmysite http://localhost:4321/sitemap.xml --sequential
```

## 📊 **New Features**

### **🚀 Integrated Queue Processing (Standard)**
- **10x faster** through true parallelization
- **Short Status Updates**: `📊 67% | 2/3 | 🔧 2/3 | 💾 45MB | ⏱️ 10s`
- **Automatic Retry Logic** for robustness
- **Resource Monitoring** for stability
- **No Concurrent Issues** through centralized queue management

### **🌐 HTML Report Generation**
- **Interactive HTML Reports** with modern design
- **Copy-to-Clipboard Buttons** for AI-compatible data
- **Responsive Design** with dark mode support
- **Beautiful Tables** with hover effects
- **Toast Notifications** for copy actions

### **CLI Options for Queue Processing:**
```bash
--max-concurrent <number>    # Number of parallel workers (Default: 3)
--max-retries <number>       # Max retry attempts (Default: 3)
--retry-delay <ms>          # Retry delay in ms (Default: 2000)
--no-progress-bar           # Disable progress bar
--progress-interval <ms>    # Progress update interval (Default: 1000)
--no-resource-monitoring    # Disable resource monitoring
--max-memory <mb>          # Max memory usage (Default: 512)
--max-cpu <percent>        # Max CPU usage (Default: 80)
--sequential               # Legacy: Sequential processing
```

### **CLI Options for HTML Reports:**
```bash
--html                     # Generate HTML report instead of Markdown
--no-copy-buttons          # Disable copy-to-clipboard buttons in HTML report
```

---

# ♿ Accessibility Test CLI (English)

A powerful command-line tool for automated accessibility testing using Playwright and pa11y, based on sitemap URLs.

## 🚀 **Quick Start**

### **Standard Usage (Queue Processing is Default):**
```bash
# 🆕 Simplest usage - Queue processing is standard!
./bin/audit.js http://localhost:4321/sitemap.xml

# With extended options
./bin/audit.js http://localhost:4321/sitemap.xml \
  --max-pages 20 \
  --max-concurrent 5 \
  --performance-report \
  --seo-report
```

### **Legacy Mode (Sequential Processing):**
```bash
# Only for compatibility - slower!
./bin/audit.js http://localhost:4321/sitemap.xml --sequential
```

## 📊 **New Features**

### **🚀 Integrated Queue Processing (Standard)**
- **10x faster** through true parallelization
- **Short Status Updates**: `📊 67% | 2/3 | 🔧 2/3 | 💾 45MB | ⏱️ 10s`
- **Automatic Retry Logic** for robustness
- **Resource Monitoring** for stability
- **No Concurrent Issues** through centralized queue management

### **🌐 HTML Report Generation**
- **Interactive HTML Reports** with modern design
- **Copy-to-Clipboard Buttons** for AI-compatible data
- **Responsive Design** with dark mode support
- **Beautiful Tables** with hover effects
- **Toast Notifications** for copy actions

### **CLI Options for Queue Processing:**
```bash
--max-concurrent <number>    # Number of parallel workers (Default: 3)
--max-retries <number>       # Max retry attempts (Default: 3)
--retry-delay <ms>          # Retry delay in ms (Default: 2000)
--no-progress-bar           # Disable progress bar
--progress-interval <ms>    # Progress update interval (Default: 1000)
--no-resource-monitoring    # Disable resource monitoring
--max-memory <mb>          # Max memory usage (Default: 512)
--max-cpu <percent>        # Max CPU usage (Default: 80)
--sequential               # Legacy: Sequential processing
```

### **CLI Options for HTML Reports:**
```bash
--html                     # Generate HTML report instead of Markdown
--no-copy-buttons          # Disable copy-to-clipboard buttons in HTML report
```