# HTML Templates for Mock Server

This directory contains example HTML templates used by the mock server for testing various accessibility, performance, SEO, and security scenarios. Each file simulates a specific test case or web page state. You can use these templates to run automated tests or to manually verify the behavior of the AuditMySite tool.

**Usage:**
- Place new HTML files here to add more test scenarios.
- Refer to the file names to understand which aspect is being tested (e.g., accessibility-errors.html, performance-issues.html).
- The mock server will serve these files at corresponding routes for local testing.

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
```