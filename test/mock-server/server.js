const express = require('express');
const path = require('path');
const fs = require('fs');

// Template loader function
function loadTemplate(templateName) {
  const templatePath = path.join(__dirname, 'templates', `${templateName}.html`);
  try {
    return fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error(`Error loading template ${templateName}:`, error);
    return `<!DOCTYPE html><html><body><h1>Template ${templateName} not found</h1></body></html>`;
  }
}

const app = express();
const PORT = 3001;

// Middleware für CORS und Body-Parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock-Sitemap mit verschiedenen Test-Szenarien
app.get('/sitemap.xml', (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:${PORT}/perfect-page</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/accessibility-errors</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/performance-issues</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/seo-problems</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/security-issues</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/advanced-contrast-test</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/screen-reader-test</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/pwa-test</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/mobile-touch-test</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.1</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/advanced-security-test</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.0</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/core-web-vitals-test</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.0</priority>
  </url>
</urlset>`;
  
  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap);
});

// 1. Perfect Page - Alle Tests sollten passen
app.get('/perfect-page', (req, res) => {
  const html = loadTemplate('perfect-page');
  res.send(html);
});

// 2. Accessibility Errors Page - Sollte spezifische Fehler haben
app.get('/accessibility-errors', (req, res) => {
  const html = loadTemplate('accessibility-errors');
  res.send(html);
});

// 3. Performance Issues Page - Sollte Performance-Probleme haben
app.get('/performance-issues', (req, res) => {
  const html = loadTemplate('performance-issues');
  res.send(html);
});

// 4. SEO Problems Page - Sollte SEO-Probleme haben
app.get('/seo-problems', (req, res) => {
  const html = loadTemplate('seo-problems');
  res.send(html);
});

// 5. Security Issues Page - Sollte Security-Probleme haben
app.get('/security-issues', (req, res) => {
  const html = loadTemplate('security-issues');
  res.send(html);
});

// 6. Advanced Contrast Test - Sollte detaillierte Kontrast-Probleme haben
app.get('/advanced-contrast-test', (req, res) => {
  const html = loadTemplate('advanced-contrast-test');
  res.send(html);
});

// 7. Screen Reader Test - Sollte Screen Reader Probleme haben
app.get('/screen-reader-test', (req, res) => {
  const html = loadTemplate('screen-reader-test');
  res.send(html);
});

// 8. PWA Test - Sollte PWA Probleme haben
app.get('/pwa-test', (req, res) => {
  const html = loadTemplate('pwa-test');
  res.send(html);
});

// 9. Mobile Touch Test - Sollte Touch Target Probleme haben
app.get('/mobile-touch-test', (req, res) => {
  const html = loadTemplate('mobile-touch-test');
  res.send(html);
});

// 10. Advanced Security Test - Sollte erweiterte Security Probleme haben
app.get('/advanced-security-test', (req, res) => {
  const html = loadTemplate('advanced-security-test');
  res.send(html);
});

// 11. Core Web Vitals Test - Sollte Performance Probleme haben
app.get('/core-web-vitals-test', (req, res) => {
  const html = loadTemplate('core-web-vitals-test');
  res.send(html);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📄 Sitemap: http://localhost:${PORT}/sitemap.xml`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 