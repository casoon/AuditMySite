# 🚧 Development Mode Konzept

## Überblick

Ein spezieller **Development Mode** für AuditMySite, der es ermöglicht, Webprojekte während der Entwicklung zu testen - egal ob auf localhost, dev-servern oder statischen dist-Verzeichnissen.

## 🎯 Zielgruppe & Use Cases

### Entwickler-Workflows
- **Frontend-Entwickler:** Accessibility während der Entwicklung prüfen
- **CI/CD Integration:** Automated Accessibility Gates vor Deployment
- **QA Teams:** Lokale Tests vor Staging-Deployment
- **Freelancer/Agenturen:** Client-Projekte vor Live-Gang prüfen

### Typische Szenarien
```bash
# React/Vue/Angular Dev Server
npm run audit:dev

# Static Build Testing
npm run audit:build

# Pre-commit Hook
npm run audit:ci
```

## 🏗️ Technische Implementierung

### 1. Neue CLI-Optionen

```bash
# Development Mode aktivieren
auditmysite --dev [options]

# Spezifische Modi
auditmysite --dev --localhost 3000
auditmysite --dev --static ./dist
auditmysite --dev --server http://localhost:8080
```

### 2. Config-Datei Integration

#### `audit.config.js` / `audit.config.json`
```javascript
module.exports = {
  // Development-spezifische Einstellungen
  development: {
    // Server-Konfiguration
    server: {
      type: 'dev-server',        // 'dev-server' | 'static' | 'custom'
      port: 3000,
      host: 'localhost',
      protocol: 'http',
      customUrl: null,
      staticDir: './dist',
      
      // Auto-Discovery für beliebte Frameworks
      autoDetect: true,          // Erkennt Vite, Webpack Dev Server, etc.
      
      // Server-Startup (optional)
      startCommand: 'npm run dev',
      startTimeout: 30000,       // Warten bis Server ready
      healthCheck: '/',          // Endpoint zum Testen ob Server läuft
    },
    
    // Welche Seiten sollen getestet werden
    routes: [
      '/',                       // Homepage
      '/about',                  // Statische Routen
      '/products/*',             // Wildcard Routen
      {
        path: '/user/profile',
        auth: {                  // Authentifizierte Routen
          type: 'session',
          login: '/login',
          credentials: { username: 'test', password: 'test' }
        }
      }
    ],
    
    // Development-optimierte Standards
    standards: {
      wcag: 'WCAG2AA',
      strictMode: false,         // Weniger streng während Entwicklung
      ignoreWarnings: ['color-contrast'], // Oft noch nicht final
    },
    
    // Performance für Dev-Umgebung anpassen
    performance: {
      enabled: true,
      budgets: 'development',    // Laxere Budgets für unoptimierte Builds
      collectMetrics: ['LCP', 'CLS'], // Nur wichtigste Metriken
    },
    
    // Output für Development
    output: {
      format: 'terminal',        // 'terminal' | 'html' | 'json'
      detailed: true,
      fixSuggestions: true,      // Konkrete Fix-Vorschläge
      interactive: true,         // Interaktive Nachfragen
    },
    
    // Git Integration
    git: {
      compareWithMain: true,     // Nur geänderte Routen testen
      autoCommitReport: false,
      prComments: true,          // GitHub/GitLab PR Comments
    }
  },
  
  // CI/CD spezifische Einstellungen
  ci: {
    server: {
      startCommand: 'npm run build && npm run preview',
      port: 4173,
    },
    output: {
      format: 'junit',           // JUnit XML für CI-Integration
      failOnError: true,
      threshold: {               // Fail-Kriterien
        errors: 0,
        warnings: 5,
        performance: 'B+'
      }
    },
    reporters: ['console', 'github-actions', 'slack']
  }
}
```

### 3. Framework-Integration

#### package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    
    // Accessibility Scripts
    "audit:dev": "auditmysite --dev",
    "audit:build": "npm run build && auditmysite --dev --static ./dist",
    "audit:ci": "auditmysite --dev --ci",
    
    // Git Hooks Integration
    "precommit": "auditmysite --dev --changed-only",
    "prepush": "auditmysite --dev --ci"
  }
}
```

#### Husky Integration
```bash
# .husky/pre-commit
#!/usr/bin/env sh
npm run audit:dev --changed-only --fail-fast
```

## 🎨 User Experience

### 1. Interactive Terminal UI

```
🚧 AuditMySite Development Mode
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Auto-detecting development setup...
✅ Vite dev server detected on localhost:3000
✅ Found 5 routes in src/router/index.js

📋 Test Configuration:
   🌐 Server: http://localhost:3000
   📄 Routes: 5 discovered + 2 configured
   📋 Standard: WCAG2AA (Development Mode)
   📊 Performance: Development budgets

🎯 Starting tests...

┌─────────────────────────────────────────────┐
│ 🏠 / (Homepage)                             │
├─────────────────────────────────────────────┤
│ ✅ Accessibility: Passed                    │
│ ⚠️  Performance: LCP 3.2s (dev server)      │
│ 💡 1 suggestion available                   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ ❌ /products (Product Page)                 │
├─────────────────────────────────────────────┤
│ 🚨 Missing alt attribute on product images  │
│ 💡 Fix: Add alt="Product name" to <img>     │
│ 📁 File: src/components/ProductCard.vue:23  │
│                                             │
│ 🔧 Quick fix available:                     │
│   [F] Apply fix automatically               │
│   [S] Skip this error                       │
│   [I] Show more info                        │
└─────────────────────────────────────────────┘

🎯 Summary: 4/5 pages passed • 1 fixable error found
💡 Run 'auditmysite --dev --fix' to apply automatic fixes
```

### 2. Smart Route Discovery

```javascript
// Automatische Erkennung beliebter Router
const routeDiscovery = {
  // React Router
  'src/App.jsx': /Route.*path=["']([^"']+)["']/g,
  
  // Vue Router
  'src/router/index.js': /path:\s*["']([^"']+)["']/g,
  
  // Next.js Pages
  'pages/**/*.{js,jsx,ts,tsx}': 'file-based',
  
  // Angular Routes
  'src/app/app-routing.module.ts': /path:\s*["']([^"']+)["']/g,
  
  // Nuxt.js
  'pages/**/*.vue': 'file-based',
}
```

### 3. Intelligent Fix Suggestions

```typescript
interface FixSuggestion {
  id: string;
  severity: 'error' | 'warning';
  rule: string;
  message: string;
  element: string;
  file?: string;           // Source-Code Datei
  line?: number;           // Zeile im Source-Code
  
  // Automatische Fixes
  autoFixable: boolean;
  fix?: {
    type: 'replace' | 'insert' | 'remove';
    content: string;
    position: { line: number; column: number };
  };
  
  // Kontext für besseres Verständnis
  context: {
    screenshot?: string;    // Element-Screenshot
    codeSnippet?: string;   // Umgebender Code
    documentation?: string; // Link zu Docs/Best Practices
  };
}
```

## 🔧 Implementierung Roadmap

### Phase 1: Foundation (4-6 Wochen)
- [ ] Config-System (`audit.config.js`)
- [ ] `--dev` CLI-Flag Implementation
- [ ] Basis Server-Detection (localhost + static)
- [ ] Route Discovery für beliebte Frameworks
- [ ] Terminal UI Grundlagen

### Phase 2: Framework Integration (3-4 Wochen)  
- [ ] Auto-Detection für Vite, Webpack Dev Server, Next.js
- [ ] Source-Map Integration für File/Line-Referenzen
- [ ] Git Integration (changed-only testing)
- [ ] Basic Auto-Fix System

### Phase 3: Advanced Features (4-5 Wochen)
- [ ] Authentication Support (Login-Forms, Session)
- [ ] Performance Budgets für Development
- [ ] Interactive Fix-Workflow
- [ ] CI/CD Reporter (JUnit, GitHub Actions)

### Phase 4: Polish & Documentation (2-3 Wochen)
- [ ] Framework-spezifische Guides
- [ ] IDE Extensions (VS Code)
- [ ] Video Tutorials
- [ ] Community Templates

## 📊 Erfolgsmessung

### KPIs
- **Adoption Rate:** % der Projekte die Dev-Mode nutzen
- **Fix Rate:** % der Errors die automatisch gefixt werden
- **Time to Fix:** Durchschnittliche Zeit vom Error bis Fix
- **Framework Coverage:** Anzahl unterstützter Frameworks

### Benutzer-Feedback Metriken
- Setup-Zeit (Ziel: < 2 Minuten)
- Fehlererkennungsrate (Ziel: > 95%)
- False-Positive Rate (Ziel: < 5%)
- Developer Satisfaction Score

## 🎯 Unique Selling Points

1. **Zero-Config für beliebte Frameworks** - Funktioniert out-of-the-box
2. **Source-Code Integration** - Direkte File/Line Referenzen
3. **Intelligent Fixes** - Konkrete, automatisierbare Lösungen
4. **Git-Aware Testing** - Nur geänderte Routen testen
5. **Development-Optimized** - Laxere Standards während Entwicklung
6. **CI/CD Ready** - Nahtlose Integration in Build-Pipelines

## 💡 Zusätzliche Ideen

### IDE-Integration
- VS Code Extension mit Inline-Fehlern
- WebStorm Plugin
- Real-time Accessibility Linting

### Advanced Features
- Visual Regression Testing
- A/B Test Accessibility Comparison
- Accessibility Component Library Scanning
- Automated PR Comments mit Fix-Vorschlägen

### Community Features
- Shared Config Templates für beliebte Stacks
- Team-Dashboards für große Projekte
- Accessibility Score Tracking über Zeit

---

**Dieser Development Mode würde AuditMySite von einem "Post-Launch Testing Tool" zu einem "Development-Integrated Accessibility Partner" entwickeln und die Developer Experience erheblich verbessern.**
