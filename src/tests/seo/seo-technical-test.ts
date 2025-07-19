import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class SeoTechnicalTest extends BaseAccessibilityTest {
  name = 'SEO Technical Test';
  description = 'Checks technical SEO aspects like HTTPS, mobile optimization, and technical issues';
  category = 'seo';
  priority = 'high';
  standards = ['SEO Best Practices'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check HTTPS
        if (window.location.protocol !== 'https:') {
          issues.push('Website is not using HTTPS (required for SEO and security)');
        }
        
        // Check for mixed content
        const mixedContentElements = document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]');
        if (mixedContentElements.length > 0 && window.location.protocol === 'https:') {
          issues.push(`${mixedContentElements.length} elements using HTTP instead of HTTPS (mixed content)`);
        }
        
        // Check viewport meta tag for mobile optimization
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
          issues.push('Missing viewport meta tag (required for mobile optimization)');
        } else {
          const viewportContent = viewportMeta.getAttribute('content') || '';
          if (!viewportContent.includes('width=device-width')) {
            warnings.push('Viewport meta tag missing width=device-width (recommended for mobile optimization)');
          }
        }
        
        // Check for mobile-friendly design indicators
        const touchTargets = document.querySelectorAll('a, button, input, select, textarea');
        const smallTouchTargets = Array.from(touchTargets).filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        });
        
        if (smallTouchTargets.length > 0) {
          warnings.push(`${smallTouchTargets.length} interactive elements may be too small for mobile touch (recommended minimum 44x44px)`);
        }
        
        // Check for font size issues
        const allTextElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        const smallTextElements = Array.from(allTextElements).filter(element => {
          const computedStyle = window.getComputedStyle(element);
          const fontSize = parseFloat(computedStyle.fontSize);
          return fontSize < 12; // Less than 12px
        });
        
        if (smallTextElements.length > 0) {
          warnings.push(`${smallTextElements.length} text elements may be too small for mobile reading (recommended minimum 12px)`);
        }
        
        // Check for Flash content (obsolete)
        const flashElements = document.querySelectorAll('object[type="application/x-shockwave-flash"], embed[type="application/x-shockwave-flash"]');
        if (flashElements.length > 0) {
          issues.push(`${flashElements.length} Flash elements found (Flash is obsolete and not supported by modern browsers)`);
        }
        
        // Check for iframe usage
        const iframes = document.querySelectorAll('iframe');
        if (iframes.length > 0) {
          warnings.push(`${iframes.length} iframes found (may impact page load speed and SEO)`);
          
          // Check if iframes have titles
          const iframesWithoutTitle = Array.from(iframes).filter(iframe => !iframe.hasAttribute('title'));
          if (iframesWithoutTitle.length > 0) {
            warnings.push(`${iframesWithoutTitle.length} iframes missing title attribute (required for accessibility and SEO)`);
          }
        }
        
        // Check for JavaScript errors (basic check)
        const scripts = document.querySelectorAll('script');
        const inlineScripts = Array.from(scripts).filter(script => !script.hasAttribute('src'));
        
        if (inlineScripts.length > 5) {
          warnings.push(`${inlineScripts.length} inline scripts found (consider externalizing for better caching)`);
        }
        
        // Check for CSS optimization
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        const inlineStyles = document.querySelectorAll('style');
        
        if (inlineStyles.length > 3) {
          warnings.push(`${inlineStyles.length} inline style blocks found (consider externalizing for better caching)`);
        }
        
        // Check for favicon
        const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        if (!favicon) {
          warnings.push('No favicon found (recommended for branding and user experience)');
        }
        
        // Check for Apple touch icon
        const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (!appleTouchIcon) {
          warnings.push('No Apple touch icon found (recommended for iOS devices)');
        }
        
        // Check for manifest file
        const manifest = document.querySelector('link[rel="manifest"]');
        if (!manifest) {
          warnings.push('No web app manifest found (recommended for PWA capabilities)');
        }
        
        // Check for theme color
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (!themeColor) {
          warnings.push('No theme color meta tag found (recommended for mobile browsers)');
        }
        
        // Check for DNS prefetch
        const dnsPrefetch = document.querySelector('link[rel="dns-prefetch"]');
        if (!dnsPrefetch) {
          warnings.push('No DNS prefetch found (recommended for external resources)');
        }
        
        // Check for preconnect
        const preconnect = document.querySelector('link[rel="preconnect"]');
        if (!preconnect) {
          warnings.push('No preconnect found (recommended for external resources)');
        }
        
        // Check for resource hints
        const resourceHints = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[rel="prerender"]');
        if (resourceHints.length === 0) {
          warnings.push('No resource hints found (preload, prefetch, prerender - recommended for performance)');
        }
        
        // Check for service worker
        if ('serviceWorker' in navigator) {
          // Service Worker API is available, but we can't check if one is registered from this context
          // This would need to be checked via Playwright's evaluateOnNewDocument
        }
        
        // Check for AMP version
        const ampHtml = document.querySelector('link[rel="amphtml"]');
        if (!ampHtml) {
          warnings.push('No AMP version link found (optional, but recommended for mobile performance)');
        }
        
        // Check for hreflang tags (for internationalization)
        const hreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
        if (hreflangTags.length === 0) {
          warnings.push('No hreflang tags found (recommended for multilingual sites)');
        }
        
        return { issues, warnings };
      });

      return this.createResult(
        result.issues.length === 0,
        result.issues.length + result.warnings.length,
        result.issues,
        result.warnings
      );
    } catch (error) {
      return this.createResult(false, 1, [`SEO Technical Test failed: ${error}`], []);
    }
  }
} 