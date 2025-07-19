import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class SeoContentTest extends BaseAccessibilityTest {
  name = 'SEO Content Test';
  description = 'Checks content quality, headings, and text optimization';
  category = 'seo';
  priority = 'medium';
  standards = ['SEO Best Practices'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check for main content
        const mainContent = document.querySelector('main') || document.querySelector('article') || document.querySelector('.content') || document.querySelector('#content');
        if (!mainContent) {
          warnings.push('No main content area identified (consider using <main> or <article> tags)');
        }
        
        // Check heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const h1Elements = document.querySelectorAll('h1');
        const h2Elements = document.querySelectorAll('h2');
        const h3Elements = document.querySelectorAll('h3');
        
        // Check for H1
        if (h1Elements.length === 0) {
          issues.push('Missing H1 heading (required for SEO)');
        } else if (h1Elements.length > 1) {
          warnings.push(`Multiple H1 headings found (${h1Elements.length}), should be only one per page`);
        }
        
        // Check heading hierarchy
        if (h1Elements.length > 0 && h2Elements.length === 0 && h3Elements.length > 0) {
          warnings.push('Heading hierarchy skipped: H1 followed by H3 (should be H1 → H2 → H3)');
        }
        
        // Check content length
        const bodyText = document.body.innerText || '';
        const wordCount = bodyText.trim().split(/\s+/).length;
        
        if (wordCount < 300) {
          warnings.push(`Content is too short (${wordCount} words, recommended minimum 300 words)`);
        } else if (wordCount > 2000) {
          warnings.push(`Content is very long (${wordCount} words, consider breaking into multiple pages)`);
        }
        
        // Check for images with alt text (SEO aspect)
        const images = document.querySelectorAll('img');
        const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt'));
        
        if (imagesWithoutAlt.length > 0) {
          warnings.push(`${imagesWithoutAlt.length} images missing alt text (important for SEO and accessibility)`);
        }
        
        // Check for internal links
        const internalLinks = Array.from(document.querySelectorAll('a[href]')).filter(link => {
          const href = link.getAttribute('href') || '';
          return href.startsWith('/') || href.startsWith(window.location.origin);
        });
        
        if (internalLinks.length === 0) {
          warnings.push('No internal links found (recommended for SEO and user experience)');
        }
        
        // Check for external links
        const externalLinks = Array.from(document.querySelectorAll('a[href]')).filter(link => {
          const href = link.getAttribute('href') || '';
          return href.startsWith('http') && !href.startsWith(window.location.origin);
        });
        
        // Check if external links have rel="noopener"
        const externalLinksWithoutNoopener = externalLinks.filter(link => !link.hasAttribute('rel') || !link.getAttribute('rel')?.includes('noopener'));
        
        if (externalLinksWithoutNoopener.length > 0) {
          warnings.push(`${externalLinksWithoutNoopener.length} external links missing rel="noopener" (security best practice)`);
        }
        
        // Check for structured data (JSON-LD)
        const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
        if (jsonLdScripts.length === 0) {
          warnings.push('No structured data (JSON-LD) found (recommended for rich snippets)');
        }
        
        // Check for schema markup
        const schemaElements = document.querySelectorAll('[itemtype]');
        if (schemaElements.length === 0) {
          warnings.push('No schema markup found (recommended for better search engine understanding)');
        }
        
        // Check for breadcrumbs
        const breadcrumbs = document.querySelector('[class*="breadcrumb"], [id*="breadcrumb"], nav[aria-label*="breadcrumb"]');
        if (!breadcrumbs) {
          warnings.push('No breadcrumb navigation found (recommended for SEO and user experience)');
        }
        
        // Check for pagination
        const pagination = document.querySelector('[class*="pagination"], [class*="pager"], nav[aria-label*="pagination"]');
        if (!pagination && wordCount > 1500) {
          warnings.push('Long content without pagination (consider pagination for better user experience)');
        }
        
        // Check for language attribute
        const htmlLang = document.documentElement.getAttribute('lang');
        if (!htmlLang) {
          issues.push('Missing language attribute on <html> tag (required for SEO and accessibility)');
        }
        
        // Check for reading time estimation
        const readingTimeMinutes = Math.ceil(wordCount / 200); // Average reading speed
        if (readingTimeMinutes > 10) {
          warnings.push(`Estimated reading time: ${readingTimeMinutes} minutes (consider breaking into shorter sections)`);
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
      return this.createResult(false, 1, [`SEO Content Test failed: ${error}`], []);
    }
  }
} 