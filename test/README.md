# AuditMySite Test Framework

Dieses Testframework ermöglicht es, AuditMySite systematisch zu testen und sicherzustellen, dass alle Funktionen korrekt arbeiten.

## 🏗️ Architektur

### Mock-Server (`test/mock-server/server.js`)
- Simuliert verschiedene Webseiten mit bekannten Accessibility-Problemen
- Bietet kontrollierte Test-Szenarien
- Läuft auf Port 3001

### Test-Suite (`test/test-suite.js`)
- Führt AuditMySite gegen verschiedene Test-Szenarien aus
- Validiert erwartete Ergebnisse
- Generiert detaillierte Test-Reports

### Test-Runner (`test/run-tests.js`)
- Startet den Mock-Server automatisch
- Führt alle Tests aus
- Generiert finale Berichte

## 🧪 Test-Szenarien

### 1. Perfect Page (`/perfect-page`)
- **Ziel:** Alle Tests sollten passen
- **Erwartung:** 100% Erfolgsrate, 0 Fehler, 0 Warnungen
- **Tests:** Accessibility, Performance, SEO, Security

### 2. Accessibility Errors (`/accessibility-errors`)
- **Ziel:** Spezifische Accessibility-Fehler
- **Erwartung:** Sollte fehlschlagen mit bekannten Fehlern
- **Probleme:**
  - Fehlende alt-Attribute
  - Buttons ohne aria-label
  - Niedriger Farbkontrast
  - Formulare ohne Labels
  - Fehlende Heading-Struktur
  - Leere Links
  - Fehlende Landmarks

### 3. Performance Issues (`/performance-issues`)
- **Ziel:** Performance-Probleme
- **Erwartung:** Performance-Tests sollten Probleme erkennen
- **Probleme:**
  - Große, unoptimierte Bilder
  - Inline-Styles
  - Ineffiziente Scripts

### 4. SEO Problems (`/seo-problems`)
- **Ziel:** SEO-Probleme
- **Erwartung:** SEO-Tests sollten Probleme erkennen
- **Probleme:**
  - Fehlender Titel
  - Fehlende Meta-Beschreibung
  - Fehlende H1
  - Fehlende alt-Attribute
  - Keine strukturierten Daten

### 5. Security Issues (`/security-issues`)
- **Ziel:** Security-Probleme
- **Erwartung:** Security-Tests sollten Probleme erkennen
- **Probleme:**
  - Unsichere Formulare
  - Inline-Scripts
  - Externe Ressourcen ohne Integrity
  - Fehlende CSP

## 🚀 Verwendung

### Alle Tests ausführen (mit Mock-Server)
```bash
npm test
```

### Service-basierte Tests (empfohlen)
```bash
# 1. Mock-Server starten
npm run test:mock-server

# 2. Service-Tests ausführen
node test/service-test-suite.js
```

### Nur Mock-Server starten
```bash
npm run test:mock-server
```

### Nur Test-Suite ausführen (Server muss laufen)
```bash
npm run test:suite
```

### Manueller Test
```bash
# 1. Mock-Server starten
node test/mock-server/server.js

# 2. In anderem Terminal AuditMySite testen
node bin/audit.js http://localhost:3001/sitemap.xml --max-pages 1 --non-interactive
```

## 📊 Test-Ergebnisse

Das Framework generiert detaillierte Berichte:

### Test-Report
- Anzahl bestandener/fehlgeschlagener Tests
- Exit-Codes
- Generierte Berichte
- Empfehlungen

### Validierung
- Überprüfung erwarteter vs. tatsächlicher Ergebnisse
- Erfolgsraten-Validierung
- Fehleranzahl-Validierung

### Gesamtbewertung
- **EXCELLENT:** Alle Tests bestanden und Ergebnisse valid
- **GOOD:** Meiste Tests bestanden mit kleinen Problemen
- **FAIR:** Einige Tests fehlgeschlagen, Aufmerksamkeit nötig
- **POOR:** Viele Tests fehlgeschlagen, signifikante Probleme

## 🔧 Anpassung

### Neue Test-Szenarien hinzufügen
1. Neue Route in `test/mock-server/server.js` hinzufügen
2. Erwartete Ergebnisse in `test/test-suite.js` definieren
3. Test in `runAllTests()` hinzufügen

### Erwartete Ergebnisse anpassen
```javascript
// In test/test-suite.js
this.expectedResults = {
  'new-test-page': {
    shouldPass: false,
    expectedErrors: 5,
    expectedWarnings: 3,
    expectedIssues: ['Specific issue 1', 'Specific issue 2']
  }
};
```

## 🎯 Ziele

1. **Kontinuierliche Validierung:** Sicherstellen, dass alle Tests funktionieren
2. **Regression-Tests:** Erkennen von Änderungen, die Tests brechen
3. **Qualitätssicherung:** Validierung der Berichtsqualität
4. **Dokumentation:** Klare Erwartungen für jedes Test-Szenario

## 🔍 Troubleshooting

### Mock-Server startet nicht
- Port 3001 bereits belegt? → Anderen Port verwenden
- Express nicht installiert? → `npm install express`

### Tests schlagen fehl
- Mock-Server läuft? → `npm run test:mock-server` prüfen
- AuditMySite kompiliert? → `npm run build` ausführen
- Erwartete Ergebnisse aktuell? → Test-Szenarien prüfen

### Unerwartete Ergebnisse
- Test-Szenarien überprüfen
- Erwartete Ergebnisse anpassen
- AuditMySite-Logik prüfen 