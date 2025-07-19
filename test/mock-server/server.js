const express = require('express');
const path = require('path');
const fs = require('fs');

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
</urlset>`;
  
  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap);
});

// 1. Perfect Page - Alle Tests sollten passen
app.get('/perfect-page', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfect Accessibility Page</title>
  <meta name="description" content="A perfectly accessible page for testing">
  <meta name="keywords" content="accessibility, testing, perfect">
  <link rel="canonical" href="http://localhost:${PORT}/perfect-page">
  <style>
    body { font-family: Arial, sans-serif; color: #000; background: #fff; }
    .high-contrast { color: #000; background: #fff; }
    .button { padding: 10px 20px; background: #007bff; color: #fff; border: none; }
    .focusable:focus { outline: 2px solid #007bff; }
  </style>
</head>
<body>
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="/perfect-page" class="focusable">Home</a></li>
        <li><a href="/about" class="focusable">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main role="main">
    <h1>Perfect Accessibility Page</h1>
    <p class="high-contrast">This page has perfect accessibility with high contrast text.</p>
    
    <section>
      <h2>Form Example</h2>
      <form>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" class="focusable" required>
        
        <label for="submit">Submit:</label>
        <button type="submit" id="submit" class="button focusable" aria-label="Submit form">
          Submit
        </button>
      </form>
    </section>
    
    <section>
      <h2>Images</h2>
      <img src="/test-image.jpg" alt="Test image with proper alt text" width="200" height="150">
    </section>
  </main>
  
  <footer role="contentinfo">
    <p>&copy; 2025 Test Site</p>
  </footer>
</body>
</html>`;
  
  res.send(html);
});

// 2. Accessibility Errors Page - Sollte spezifische Fehler haben
app.get('/accessibility-errors', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Errors Page</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .low-contrast { color: #666; background: #eee; } /* Low contrast */
    .button { padding: 10px 20px; background: #007bff; color: #fff; border: none; }
  </style>
</head>
<body>
  <h1>Accessibility Errors Page</h1>
  
  <!-- Missing alt attribute -->
  <img src="/test-image.jpg" width="200" height="150">
  
  <!-- Button without aria-label -->
  <button class="button"></button>
  
  <!-- Low contrast text -->
  <p class="low-contrast">This text has low contrast and should fail accessibility tests.</p>
  
  <!-- Form without labels -->
  <form>
    <input type="email" name="email" required>
    <button type="submit">Submit</button>
  </form>
  
  <!-- Missing heading structure -->
  <h3>This heading skips h2</h3>
  
  <!-- Empty link -->
  <a href="#"></a>
  
  <!-- Missing main landmark -->
  <div>Content without proper landmarks</div>
</body>
</html>`;
  
  res.send(html);
});

// 3. Performance Issues Page - Sollte Performance-Probleme haben
app.get('/performance-issues', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Performance Issues Page</title>
  <style>
    body { font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <h1>Performance Issues Page</h1>
  
  <!-- Large unoptimized images -->
  <img src="/large-image.jpg" alt="Large unoptimized image" width="800" height="600">
  <img src="/another-large-image.jpg" alt="Another large image" width="800" height="600">
  
  <!-- Inline styles (performance impact) -->
  <div style="background: red; color: white; padding: 20px; margin: 10px; border: 1px solid black;">
    Inline styles everywhere
  </div>
  
  <!-- Large amount of content -->
  ${Array(50).fill().map((_, i) => `<p>Performance test paragraph ${i + 1}</p>`).join('')}
  
  <!-- Unoptimized scripts -->
  <script>
    // Inefficient code
    for(let i = 0; i < 10000; i++) {
      console.log('Performance test ' + i);
    }
  </script>
</body>
</html>`;
  
  res.send(html);
});

// 4. SEO Problems Page - Sollte SEO-Probleme haben
app.get('/seo-problems', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Missing title -->
  <!-- Missing meta description -->
  <!-- Missing keywords -->
  <!-- Missing canonical -->
  <style>
    body { font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <!-- Missing h1 -->
  <h2>SEO Problems Page</h2>
  
  <!-- No semantic structure -->
  <div>Content without proper headings</div>
  
  <!-- Missing alt attributes -->
  <img src="/seo-image.jpg" width="200" height="150">
  
  <!-- No structured data -->
  <div>Product information without schema markup</div>
  
  <!-- Missing internal links -->
  <p>Content without internal linking strategy</p>
</body>
</html>`;
  
  res.send(html);
});

// 5. Security Issues Page - Sollte Security-Probleme haben
app.get('/security-issues', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Issues Page</title>
  <!-- Missing security headers -->
  <style>
    body { font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <h1>Security Issues Page</h1>
  
  <!-- Insecure form -->
  <form action="http://insecure-site.com/submit" method="post">
    <input type="text" name="sensitive-data">
    <button type="submit">Submit</button>
  </form>
  
  <!-- Inline scripts (security risk) -->
  <script>
    eval('console.log("Insecure eval usage")');
  </script>
  
  <!-- External resources without integrity -->
  <script src="http://insecure-cdn.com/script.js"></script>
  
  <!-- Missing CSP -->
  <div>Content without Content Security Policy</div>
</body>
</html>`;
  
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