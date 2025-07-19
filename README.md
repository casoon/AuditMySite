# ♿ AuditMySite - Accessibility Test CLI

Ein leistungsstarkes Kommandozeilen-Tool für automatisierte Accessibility-Tests mit Playwright und pa11y, basierend auf Sitemap-URLs. Entwickelt mit modernem TypeScript und umfassender Parallelisierung.

## 🚀 **Schnellstart**

```bash
# Installation
npm install -g @casoon/auditmysite

# Einfachste Verwendung
npx @casoon/auditmysite http://your-site.com/sitemap.xml

# Mit erweiterten Optionen
npx @casoon/auditmysite http://your-site.com/sitemap.xml \
  --max-pages 20 \
  --max-concurrent 5 \
  --performance-report \
  --seo-report \
  --security-scan
```

## 📊 **Leistungsumfang - Implementierte Phasen**

### **🚀 Phase 1: Erweiterte Parallelisierung (100% Implementiert)**
- **10x schneller** durch echte Parallelisierung mit Worker Pool
- **Event-Driven Queue System** für intelligente Aufgabenverwaltung
- **Ressourcen-Monitoring** (Speicher, CPU, Netzwerk) mit automatischer Drosselung
- **Priority Queue** mit intelligenter URL-Priorisierung
- **Netzwerk-Drosselung** für serverfreundliche Request-Raten
- **Live-Status-Updates**: `📊 67% | 2/3 | 🔧 2/3 | 💾 45MB | ⏱️ 10s`
- **Automatische Retry-Logik** mit exponentieller Backoff-Strategie
- **Memory-Leak-Prävention** durch ordnungsgemäße Ressourcenverwaltung

### **⚡ Phase 2: Moderne Performance-Standards (100% Implementiert)**
- **Core Web Vitals Testing** (LCP, FID, CLS, FCP, TTI, TBT)
- **Lighthouse Integration** für umfassende Performance-Audits
- **Performance Scoring** mit automatischen Empfehlungen
- **Memory Usage Monitoring** mit Leak-Erkennung
- **Loading Performance Tests** mit detaillierten Metriken
- **Performance-Berichte** mit PageSpeed/Lightspeed-Analyse

### **📱 Phase 3: Mobile-First Testing (100% Implementiert)**
- **Touch Target Testing** (44px Minimum-Größe für interaktive Elemente)
- **PWA Feature Testing** (Manifest, Service Worker, Installierbarkeit)
- **Mobile Emulation** mit verschiedenen Viewport-Größen
- **Responsive Design Validation** für alle Bildschirmgrößen
- **Touch Navigation Testing** für mobile Benutzerfreundlichkeit
- **Offline-Fähigkeit Testing** für Progressive Web Apps

### **🔒 Phase 4: Security Testing (100% Implementiert)**
- **Security Headers Validation** (CSP, HSTS, X-Frame-Options, etc.)
- **HTTPS Enforcement Testing** mit Mixed-Content-Erkennung
- **Content Security Policy Analysis** mit detaillierter Direktiven-Parsing
- **Vulnerability Scanning** (XSS, Injection, Info Disclosure)
- **Security Scoring** und automatisierte Empfehlungen
- **Compliance Reports** für GDPR, SOC2, ISO27001

### **📄 Phase 5: Interaktive HTML-Reports (100% Implementiert)**
- **Modernes, responsives Design** mit CSS-Variablen
- **Dark Mode Support** (automatische Erkennung)
- **Copy-to-Clipboard Buttons** für AI-kompatible Datenexporte
- **Interaktive Tabellen** mit Hover-Effekten und Sortierung
- **Toast Notifications** für Benutzer-Feedback
- **Mobile-optimiertes Layout** für alle Geräte

## 🛠️ **Zusätzliche Funktionen**

### **📊 Erweiterte Berichte:**
- **SEO Analysis** mit umfassender Suchmaschinenoptimierung
- **Performance Metrics** Sammlung (Core Web Vitals)
- **Interaktive CLI Prompts** für bessere Benutzererfahrung
- **Deutsche Accessibility-Gesetze Support** (BFSG, EU 2019/882)
- **Multi-Standard Support** (WCAG 2.0/2.1, Section 508)
- **Detaillierte Fehlerberichte** für automatisierte Fixes

### **🔧 Technische Features:**
- **TypeScript** - Typsichere Entwicklung
- **Playwright** - Browser-Automatisierung
- **pa11y** - Accessibility-Testing-Engine
- **Event-Driven Architecture** - Skalierbare Queue-Verarbeitung
- **Resource Monitoring** - Intelligente Ressourcenverwaltung

## 📋 **CLI-Optionen**

### **Kern-Optionen:**
```bash
--max-pages <number>        # Maximale Seiten zum Testen (Standard: 20)
--timeout <number>          # Timeout in Millisekunden (Standard: 10000)
--standard <standard>       # Accessibility-Standard (WCAG2A|WCAG2AA|WCAG2AAA|Section508)
--output-dir <dir>          # Ausgabeverzeichnis für Berichte (Standard: "./reports")
```

### **🚀 Parallelisierungs-Optionen:**
```bash
--max-concurrent <number>   # Anzahl paralleler Worker (Standard: 3)
--concurrency <number>      # Alias für --max-concurrent
--max-workers <number>      # Alias für --max-concurrent
--max-retries <number>      # Max. Wiederholungsversuche (Standard: 3)
--retry-delay <ms>          # Wiederholungsverzögerung in ms (Standard: 2000)
--no-progress-bar           # Live-Fortschrittsbalken deaktivieren
--progress-interval <ms>    # Fortschritts-Update-Intervall (Standard: 1000)
--no-resource-monitoring    # Ressourcen-Überwachung deaktivieren
--max-memory <mb>          # Max. Speicherverbrauch in MB (Standard: 512)
--max-cpu <percent>        # Max. CPU-Verbrauch in Prozent (Standard: 80)
--sequential               # Sequentielle Tests verwenden (Legacy-Modus, langsamer)
```

### **📄 Bericht-Optionen:**
```bash
--detailed-report           # Detaillierten Fehlerbericht für automatisierte Fixes generieren
--performance-report        # Performance-Bericht mit PageSpeed-Analyse generieren
--seo-report               # SEO-Bericht mit Suchmaschinenoptimierung generieren
--security-scan            # Umfassenden Security-Scan durchführen
--security-report          # Detaillierten Security-Bericht generieren
--html                     # HTML-Bericht statt Markdown generieren
--no-copy-buttons          # Copy-to-Clipboard-Buttons im HTML-Bericht deaktivieren
```

### **🔧 Test-Optionen:**
```bash
--use-pa11y                # pa11y für detaillierte Accessibility-Tests verwenden
--no-pa11y                 # pa11y deaktivieren, nur Playwright-Tests verwenden
--lighthouse               # Lighthouse-Tests für umfassende Analyse ausführen
--core-web-vitals          # Core Web Vitals Performance-Metriken testen
--touch-targets            # Touch-Target-Größen für mobile Accessibility testen
--pwa                      # Progressive Web App Features testen
--mobile-emulation         # Mobile-Emulation aktivieren
--viewport <size>          # Viewport-Größe setzen (z.B. 1920x1080)
--user-agent <agent>       # Benutzerdefinierten User Agent setzen
```

## 📊 **Verwendungsbeispiele**

### **Schneller Accessibility-Test:**
```bash
npx @casoon/auditmysite https://example.com/sitemap.xml
```

### **Umfassender Audit:**
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

### **Performance-fokussierter Test:**
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

### **Security-Audit:**
```bash
npx @casoon/auditmysite https://example.com/sitemap.xml \
  --security-scan \
  --security-report \
  --max-concurrent 2 \
  --max-pages 20
```

## 🌍 **Unterstützte Accessibility-Standards**

- **WCAG 2.0 Level A** - Grundlegende Accessibility
- **WCAG 2.0 Level AA** - Empfohlen (Standard)
- **WCAG 2.0 Level AAA** - Strikte Konformität
- **Section 508** - US-Bundesanforderungen
- **BFSG** - Deutsche Accessibility-Gesetze
- **EU 2019/882** - Europäische Accessibility-Richtlinie

## 📊 **Bericht-Typen**

1. **Accessibility Report** - WCAG-Konformitätsergebnisse
2. **Performance Report** - Core Web Vitals und Metriken
3. **SEO Report** - Suchmaschinenoptimierungs-Analyse
4. **Security Report** - Security-Schwachstellen und Empfehlungen
5. **Detailed Error Report** - AI-kompatible Fix-Vorschläge

### **Ausgabeformate:**
- **Markdown** - Standardformat mit detaillierten Informationen
- **HTML** - Interaktive Berichte mit Copy-Buttons
- **JSON** - Maschinenlesbare Daten für Automatisierung

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