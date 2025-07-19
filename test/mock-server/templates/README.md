# HTML Templates für Mock Server

Diese Templates enthalten HTML-Code für verschiedene Test-Szenarien des AuditMySite Testframeworks.

## 📁 Template-Übersicht

### **Grundlegende Tests**

#### `perfect-page.html`
- **Zweck:** Perfekte Accessibility-Seite
- **Erwartung:** Alle Tests sollten passen
- **Features:**
  - Korrekte ARIA-Landmarks
  - Hoher Kontrast
  - Semantische Struktur
  - Proper Form-Labels

#### `accessibility-errors.html`
- **Zweck:** Accessibility-Fehler testen
- **Erwartung:** Spezifische Fehler sollten erkannt werden
- **Probleme:**
  - Fehlende alt-Attribute
  - Niedriger Kontrast
  - Fehlende Labels
  - Inkorrekte Heading-Struktur

#### `performance-issues.html`
- **Zweck:** Performance-Probleme testen
- **Erwartung:** Performance-Tests sollten Probleme erkennen
- **Probleme:**
  - Große, unoptimierte Bilder
  - Inline-Styles
  - Ineffiziente Scripts
  - Viel Content

#### `seo-problems.html`
- **Zweck:** SEO-Probleme testen
- **Erwartung:** SEO-Tests sollten Probleme erkennen
- **Probleme:**
  - Fehlender Title
  - Fehlende Meta-Description
  - Fehlende H1
  - Fehlende alt-Attribute

#### `security-issues.html`
- **Zweck:** Security-Probleme testen
- **Erwartung:** Security-Tests sollten Probleme erkennen
- **Probleme:**
  - Insecure Forms
  - Inline-Scripts
  - Externe Ressourcen ohne Integrity

### **Erweiterte Tests**

#### `advanced-contrast-test.html`
- **Zweck:** Detaillierte Kontrast-Analyse
- **Erwartung:** Verschiedene Kontrast-Verhältnisse testen
- **Features:**
  - Sehr niedriger Kontrast (1.2:1)
  - Niedriger Kontrast (2.1:1)
  - Mittlerer Kontrast (4.5:1)
  - Hoher Kontrast (21:1)

#### `screen-reader-test.html`
- **Zweck:** Screen Reader Kompatibilität
- **Erwartung:** Screen Reader Probleme erkennen
- **Probleme:**
  - Fehlende aria-live regions
  - Inkorrekte ARIA-Nutzung
  - Fehlende Skip-Links
  - Inkorrekte Heading-Struktur

#### `pwa-test.html`
- **Zweck:** Progressive Web App Features
- **Erwartung:** PWA-Tests sollten Probleme erkennen
- **Probleme:**
  - Fehlendes Manifest
  - Fehlender Service Worker
  - Fehlendes HTTPS
  - Fehlende Offline-Funktionalität

#### `mobile-touch-test.html`
- **Zweck:** Mobile Touch Target Validierung
- **Erwartung:** Mobile-Tests sollten Probleme erkennen
- **Probleme:**
  - Zu kleine Touch-Targets (< 44px)
  - Kleine Navigation-Links
  - Kleine Form-Inputs

#### `advanced-security-test.html`
- **Zweck:** Umfassende Security-Scans
- **Erwartung:** Erweiterte Security-Tests sollten Probleme erkennen
- **Probleme:**
  - XSS-Vulnerabilities
  - CSRF-Vulnerabilities
  - Information Disclosure
  - Insecure External Resources

#### `core-web-vitals-test.html`
- **Zweck:** Performance-Optimierung
- **Erwartung:** Performance-Tests sollten Probleme erkennen
- **Probleme:**
  - Große Bilder ohne Dimensionen
  - Layout-Shifts
  - Render-Blocking Resources
  - Unoptimierte Fonts

## 🛠️ Verwendung

### **Template laden**
```javascript
const html = loadTemplate('perfect-page');
```

### **Neues Template erstellen**
1. HTML-Datei in `templates/` erstellen
2. Route in `server.js` hinzufügen
3. Sitemap aktualisieren
4. Test-Suite erweitern

### **Template bearbeiten**
- Direkt die HTML-Datei bearbeiten
- Server automatisch neu laden
- Tests ausführen

## 📋 Template-Struktur

Alle Templates folgen dieser Grundstruktur:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template Name</title>
  <style>
    /* CSS für spezifische Test-Szenarien */
  </style>
</head>
<body>
  <h1>Template Name</h1>
  
  <!-- Spezifische Test-Elemente -->
  
  <script>
    // JavaScript für spezifische Test-Szenarien
  </script>
</body>
</html>
```

## 🔧 Wartung

### **Template aktualisieren**
- HTML-Datei direkt bearbeiten
- Keine Server-Neustarts nötig
- Sofortige Verfügbarkeit

### **Neue Test-Szenarien**
- Template erstellen
- Server-Route hinzufügen
- Sitemap erweitern
- Tests konfigurieren

### **Debugging**
- Browser-Entwicklertools verwenden
- Template-Pfad prüfen
- Server-Logs überwachen 