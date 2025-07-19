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

// 6. Advanced Contrast Test - Sollte detaillierte Kontrast-Probleme haben
app.get('/advanced-contrast-test', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Contrast Test</title>
  <style>
    .very-low-contrast { color: #999; background: #eee; } /* 1.2:1 ratio */
    .low-contrast { color: #666; background: #fff; } /* 2.1:1 ratio */
    .medium-contrast { color: #444; background: #fff; } /* 4.5:1 ratio */
    .high-contrast { color: #000; background: #fff; } /* 21:1 ratio */
    .button-low-contrast { background: #ccc; color: #eee; } /* Low contrast button */
    .link-low-contrast { color: #999; } /* Low contrast link */
  </style>
</head>
<body>
  <h1>Advanced Contrast Test</h1>
  
  <p class="very-low-contrast">Very low contrast text (should fail AAA)</p>
  <p class="low-contrast">Low contrast text (should fail AA)</p>
  <p class="medium-contrast">Medium contrast text (should pass AA)</p>
  <p class="high-contrast">High contrast text (should pass AAA)</p>
  
  <button class="button-low-contrast">Low contrast button</button>
  <a href="#" class="link-low-contrast">Low contrast link</a>
  
  <!-- Background images with text overlay -->
  <div style="background: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('/bg.jpg'); color: white;">
    Text on semi-transparent background
  </div>
</body>
</html>`;
  
  res.send(html);
});

// 7. Screen Reader Test - Sollte Screen Reader Probleme haben
app.get('/screen-reader-test', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Screen Reader Test</title>
</head>
<body>
  <h1>Screen Reader Test</h1>
  
  <!-- Missing aria-live regions -->
  <div id="status">Status updates here</div>
  
  <!-- Incorrect ARIA usage -->
  <button aria-label="Close" role="button" aria-pressed="true">X</button>
  
  <!-- Missing skip links -->
  <a href="#main">Skip to main content</a>
  
  <!-- Incorrect heading structure -->
  <h1>Main heading</h1>
  <h3>Skipped h2</h3>
  
  <!-- Missing form descriptions -->
  <input type="text" aria-describedby="help-text">
  <div id="help-text">Help text here</div>
  
  <!-- Decorative images without proper alt -->
  <img src="/decorative.jpg" alt="Decorative image">
  
  <!-- Missing table headers -->
  <table>
    <tr><td>Data 1</td><td>Data 2</td></tr>
    <tr><td>Data 3</td><td>Data 4</td></tr>
  </table>
  
  <!-- Missing list semantics -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</body>
</html>`;
  
  res.send(html);
});

// 8. PWA Test - Sollte PWA Probleme haben
app.get('/pwa-test', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PWA Test</title>
  <!-- Missing manifest -->
  <!-- Missing service worker -->
  <!-- Missing viewport meta -->
</head>
<body>
  <h1>PWA Test Page</h1>
  
  <!-- Missing installable criteria -->
  <div>No install prompt criteria</div>
  
  <!-- Missing offline functionality -->
  <div>No offline support</div>
  
  <!-- Missing HTTPS -->
  <script src="http://insecure-script.com/script.js"></script>
  
  <!-- Missing app icons -->
  <!-- Missing theme color -->
  <!-- Missing display mode -->
  
  <!-- No service worker registration -->
  <script>
    // No service worker registration
    console.log('No PWA features');
  </script>
</body>
</html>`;
  
  res.send(html);
});

// 9. Mobile Touch Test - Sollte Touch Target Probleme haben
app.get('/mobile-touch-test', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile Touch Test</title>
  <style>
    .small-button { width: 30px; height: 30px; } /* Too small */
    .medium-button { width: 44px; height: 44px; } /* Minimum size */
    .large-button { width: 60px; height: 60px; } /* Good size */
    .close-button { width: 20px; height: 20px; } /* Very small */
    .nav-link { padding: 5px; } /* Small padding */
  </style>
</head>
<body>
  <h1>Mobile Touch Test</h1>
  
  <!-- Too small touch targets -->
  <button class="small-button">X</button>
  <a href="#" class="small-button">Link</a>
  <button class="close-button">×</button>
  
  <!-- Proper touch targets -->
  <button class="medium-button">OK</button>
  <a href="#" class="large-button">Large Link</a>
  
  <!-- Navigation with small targets -->
  <nav>
    <a href="#" class="nav-link">Home</a>
    <a href="#" class="nav-link">About</a>
    <a href="#" class="nav-link">Contact</a>
  </nav>
  
  <!-- Form with small inputs -->
  <form>
    <input type="text" style="height: 30px;">
    <button type="submit" style="height: 30px;">Submit</button>
  </form>
</body>
</html>`;
  
  res.send(html);
});

// 10. Advanced Security Test - Sollte erweiterte Security Probleme haben
app.get('/advanced-security-test', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Security Test</title>
  <!-- Missing security headers -->
  <!-- Missing CSP -->
  <!-- Missing HSTS -->
</head>
<body>
  <h1>Advanced Security Test</h1>
  
  <!-- XSS vulnerabilities -->
  <script>
    eval(location.hash.substring(1));
    document.write(location.search);
  </script>
  
  <!-- CSRF vulnerabilities -->
  <form action="http://external-site.com/submit" method="post">
    <input type="hidden" name="token" value="secret">
    <input type="submit" value="Submit">
  </form>
  
  <!-- Information disclosure -->
  <div>Error: Database connection failed at /var/log/db.log</div>
  <div>Debug: User ID 12345, Session: abc123</div>
  
  <!-- Insecure external resources -->
  <script src="http://cdn.example.com/script.js"></script>
  <img src="http://tracker.example.com/pixel.gif">
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto">
  
  <!-- Missing input validation -->
  <input type="text" id="user-input" onchange="processInput(this.value)">
  
  <!-- Insecure cookies -->
  <script>
    document.cookie = "session=abc123; path=/";
  </script>
</body>
</html>`;
  
  res.send(html);
});

// 11. Core Web Vitals Test - Sollte Performance Probleme haben
app.get('/core-web-vitals-test', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Core Web Vitals Test</title>
  <style>
    /* Large layout shifts */
    .shifting-element { 
      width: 100px; 
      height: 100px; 
      background: red; 
    }
    .large-image {
      width: 100%;
      height: 500px;
      background: #ccc;
    }
  </style>
</head>
<body>
  <h1>Core Web Vitals Test</h1>
  
  <!-- Large images without dimensions -->
  <img src="/large-image.jpg" alt="Large image" class="large-image">
  <img src="/another-large-image.jpg" alt="Another large image" class="large-image">
  
  <!-- Inline styles causing layout shifts -->
  <div class="shifting-element"></div>
  
  <!-- Render-blocking resources -->
  <link rel="stylesheet" href="/large-stylesheet.css">
  <script src="/blocking-script.js"></script>
  
  <!-- Unoptimized fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  
  <!-- Heavy JavaScript -->
  <script>
    // Blocking JavaScript
    for(let i = 0; i < 1000000; i++) {
      console.log('Heavy computation ' + i);
    }
    
    // Layout shift simulation
    setTimeout(() => {
      document.querySelector('.shifting-element').style.width = '200px';
    }, 1000);
  </script>
  
  <!-- Large amount of content -->
  ${Array(100).fill().map((_, i) => `<p>Performance test paragraph ${i + 1}</p>`).join('')}
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