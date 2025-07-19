# 🧪 AuditMySite Test Framework

## 📋 Overview

Das AuditMySite Test Framework bietet umfassende Tests für Accessibility, Performance, SEO und Security mit verschiedenen Tools wie pa11y, Lighthouse und Playwright.

## 🎯 Test-Szenarien

### **Basis-Tests**
1. **Perfect Page** (`/perfect-page`) - ✅ Erwartet: Pass
2. **Accessibility Errors** (`/accessibility-errors`) - ❌ Erwartet: Fail
3. **Performance Issues** (`/performance-issues`) - ❌ Erwartet: Fail
4. **SEO Problems** (`/seo-problems`) - ❌ Erwartet: Fail
5. **Security Issues** (`/security-issues`) - ❌ Erwartet: Fail

### **Erweiterte Tests**
6. **Advanced Contrast Test** (`/advanced-contrast-test`) - ❌ Erwartet: Fail
7. **Screen Reader Test** (`/screen-reader-test`) - ❌ Erwartet: Fail
8. **PWA Test** (`/pwa-test`) - ❌ Erwartet: Fail
9. **Mobile Touch Test** (`/mobile-touch-test`) - ❌ Erwartet: Fail
10. **Advanced Security Test** (`/advanced-security-test`) - ❌ Erwartet: Fail
11. **Core Web Vitals Test** (`/core-web-vitals-test`) - ❌ Erwartet: Fail

## 🛠️ Verwendung

### **Mock-Server starten**
```bash
cd test/mock-server
node server.js
```

### **Basis-Tests ausführen**
```bash
node test/test-suite.js
```

### **Service-Tests ausführen**
```bash
node test/service-test-suite.js
```

### **Alle Tests ausführen**
```bash
node test/run-tests.js
```

## 📁 Verzeichnisstruktur

```
test/
├── mock-server/
│   ├── server.js
│   └── templates/
│       ├── perfect-page.html
│       ├── accessibility-errors.html
│       ├── performance-issues.html
│       ├── seo-problems.html
│       ├── security-issues.html
│       ├── advanced-contrast-test.html
│       ├── screen-reader-test.html
│       ├── pwa-test.html
│       ├── mobile-touch-test.html
│       ├── advanced-security-test.html
│       └── core-web-vitals-test.html
├── test-suite.js
├── service-test-suite.js
├── run-tests.js
└── README.md
```

## 📊 Reports

Die Tests generieren automatisch Reports im `reports/` Verzeichnis:

- **Accessibility Reports** - Detaillierte Accessibility-Analysen
- **Performance Reports** - Performance-Metriken und Optimierungen
- **SEO Reports** - SEO-Analysen und Verbesserungsvorschläge
- **Security Reports** - Security-Scans und Sicherheitslücken

## 🔧 Konfiguration

Die Tests verwenden die Standard-Konfiguration des AuditMySite Frameworks. Für Anpassungen siehe die Hauptdokumentation.

## 🤝 Beitragen

### **Neue Tests hinzufügen:**
1. HTML-Template in `mock-server/templates/` erstellen
2. Route in `mock-server/server.js` hinzufügen
3. Erwartete Ergebnisse in Test-Suites definieren

### **Debugging:**
1. Mock-Server-Logs überprüfen
2. Test-Output analysieren
3. Reports im `reports/` Verzeichnis prüfen

## 📞 Support

Bei Fragen oder Problemen:
1. Mock-Server-Logs überprüfen
2. Test-Output analysieren
3. Issue auf GitHub erstellen 