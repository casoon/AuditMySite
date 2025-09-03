# 🎨 AuditMySite - Vereinfachte UX Design

## 🎯 Core User Journey

### Was der Nutzer WIRKLICH will:
1. **URL eingeben**
2. **"Check meine Website"**
3. **Verständlichen Report bekommen**

### Aktuelles Problem:
- **74 CLI-Optionen** 🤯
- Nutzer ist überfordert
- Kein einfacher Einstieg

## 🚀 Neue Simple UX

### Option 1: Ultra-Simple (Empfehlung)
```bash
# Nur 3 Modi, smart defaults
npx @casoon/auditmysite <url>              # Quick check (5 pages)
npx @casoon/auditmysite <url> --full       # Full audit (all pages)
npx @casoon/auditmysite <url> --expert     # Interactive expert mode
```

### Option 2: Geführter Dialog (Interactive)
```bash
npx @casoon/auditmysite <url>

🚀 AuditMySite - Website Accessibility Checker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Found 47 pages in your sitemap

❓ What type of audit do you want?
  ❯ 🚀 Quick Check (5 pages, 30 seconds)
    📊 Standard Audit (20 pages, 2 minutes)  
    🔍 Full Website (all pages, 10+ minutes)
    ⚙️  Custom settings

❓ Report format?
  ❯ 📄 Web Report (HTML, shareable)
    📝 Markdown (for developers)

🎯 Running accessibility check...
[████████████████████████████████████████] 100%

✅ Audit complete! Report saved to: ./reports/example-com-2025-09-03.html
```

## 🧹 Entfernte Komplexität

### ❌ Raus (60+ Optionen!)
```bash
# Diese 60+ Optionen ENTFERNEN:
--pa11y-standard, --hide-elements, --include-notices, --pa11y-wait
--performance-metrics, --screenshots, --keyboard-tests, --color-contrast
--focus-management, --block-images, --block-css, --mobile-emulation
--viewport, --user-agent, --core-web-vitals, --touch-targets, --pwa
--max-concurrent, --concurrency, --max-workers, --max-retries
--retry-delay, --progress-interval, --max-memory, --max-cpu
--sequential, --include-copy-buttons, --lighthouse
--security-scan, --security-report, --skip-csp-localhost
# ... und 40+ weitere!
```

### ✅ Behalten (6 Optionen!)
```bash
# Nur diese ESSENTIELLEN Optionen:
auditmysite <url>                    # Smart defaults
--full                              # Full audit instead of 5 pages
--expert                           # Interactive expert mode for power users
--format <html|markdown>           # Report format
--output-dir <path>               # Where to save reports
--non-interactive                 # For CI/CD (no prompts)
```

## 🎨 Smart Defaults

### Quick Mode (Default)
```javascript
const QUICK_DEFAULTS = {
  maxPages: 5,
  standard: 'WCAG2AA',
  format: 'html',
  includePA11y: true,
  includePerformance: false,  // ❌ Removed
  includeSEO: false,          // ❌ Removed  
  includeSecurity: false,     // ❌ Removed
  timeout: 10000,
  maxConcurrent: 2           // Reduced from 3
};
```

### Full Mode (--full)
```javascript
const FULL_DEFAULTS = {
  maxPages: 1000,            // All pages
  standard: 'WCAG2AA',
  format: 'html',
  includePA11y: true,
  timeout: 15000,
  maxConcurrent: 3
};
```

### Expert Mode (--expert)
```bash
# Interactive wizard for power users
npx auditmysite https://example.com --expert

🔧 Expert Mode - Custom Configuration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ How many pages? (1-1000) [20]: 
❓ Accessibility Standard?
  ❯ WCAG 2.1 AA (Recommended)
    WCAG 2.1 AAA (Strict)
    Section 508 (US Federal)

❓ Additional checks? (Space to select)
  ❯ ◯ Basic Performance Metrics
    ◯ Mobile Viewport Testing
    ◯ Keyboard Navigation
    
❓ Report format?
  ❯ HTML Report (Interactive)
    Markdown (Developer-friendly)
```

## 🚦 Implementation Phases

### Phase 1: Cleanup (1 Week)
1. **Remove 60+ CLI options**
2. **Keep only 6 essential options**
3. **Fix current functionality**
4. **Remove PDF/Security/SEO modules**

### Phase 2: Smart Defaults (3 Days)  
1. **Implement Quick/Full modes**
2. **Better default configuration**
3. **Improved progress output**

### Phase 3: Interactive Mode (1 Week)
1. **Expert wizard**
2. **Beautiful CLI output**
3. **Better error messages**

## 📊 Success Metrics

### Before (Current)
- **74 CLI options** → User confusion
- **Complex setup** → High barrier to entry
- **Feature overload** → Analysis paralysis

### After (Target)
- **6 CLI options** → Crystal clear
- **Zero config** → Works out of box
- **Smart defaults** → 80% use cases covered

## 💡 Key Insights

### What Users Actually Want:
1. **"Is my site accessible?"** (Yes/No + specifics)
2. **"What should I fix?"** (Actionable items)
3. **"Can I share this?"** (Shareable HTML report)

### What Users DON'T Want:
1. Configuration hell (74 options!)
2. Technical jargon (pa11y-standard, CSP, etc.)
3. Multiple report formats to choose from
4. Performance/SEO/Security mixing with Accessibility

## 🎯 Recommended Action Plan

### 🔥 Immediate (This Week):
1. **Create new simple CLI** (6 options only)
2. **Remove complex features** (PDF, Security, SEO, Screenshots)
3. **Implement smart defaults**

### 📈 Next Week:
1. **Interactive expert mode**
2. **Beautiful HTML reports**
3. **Better progress/error messages**

### 🚀 Release:
1. **Test with real users**
2. **Documentation focused on simplicity**
3. **NPM package ready**

---

**Philosophy:** "Make the simple case trivial, and the complex case possible"
- **Simple case:** `npx @casoon/auditmysite https://example.com` 
- **Complex case:** `--expert` mode for power users
