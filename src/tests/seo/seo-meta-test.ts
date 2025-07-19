import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class SeoMetaTest extends BaseAccessibilityTest {
  name = 'SEO Meta Test';
  description = 'Checks meta tags, titles, and basic SEO elements';
  category = 'seo';
  priority = 'high';
  standards = ['SEO Best Practices'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        
        // Check page title
        const title = document.title;
        if (!title || title.trim() === '') {
          issues.push('Missing page title');
        } else if (title.length < 30) {
          warnings.push(`Page title is too short (${title.length} characters, recommended 30-60)`);
        } else if (title.length > 60) {
          warnings.push(`Page title is too long (${title.length} characters, recommended 30-60)`);
        }
        
        // Check meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          issues.push('Missing meta description');
        } else {
          const description = metaDescription.getAttribute('content') || '';
          if (description.length < 120) {
            warnings.push(`Meta description is too short (${description.length} characters, recommended 120-160)`);
          } else if (description.length > 160) {
            warnings.push(`Meta description is too long (${description.length} characters, recommended 120-160)`);
          }
        }
        
        // Check meta keywords (optional but good practice)
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          warnings.push('Missing meta keywords (optional but recommended)');
        }
        
        // Check robots meta tag
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (!robotsMeta) {
          warnings.push('Missing robots meta tag (defaults to index,follow)');
        }
        
        // Check viewport meta tag
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
          issues.push('Missing viewport meta tag (required for mobile optimization)');
        }
        
        // Check charset meta tag
        const charsetMeta = document.querySelector('meta[charset]');
        if (!charsetMeta) {
          issues.push('Missing charset meta tag');
        }
        
        // Check canonical URL
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          warnings.push('Missing canonical URL (recommended for SEO)');
        }
        
        // Check Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        
        if (!ogTitle) {
          warnings.push('Missing Open Graph title (recommended for social sharing)');
        }
        if (!ogDescription) {
          warnings.push('Missing Open Graph description (recommended for social sharing)');
        }
        if (!ogImage) {
          warnings.push('Missing Open Graph image (recommended for social sharing)');
        }
        
        // Check Twitter Card tags
        const twitterCard = document.querySelector('meta[name="twitter:card"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        
        if (!twitterCard) {
          warnings.push('Missing Twitter Card type (recommended for social sharing)');
        }
        if (!twitterTitle) {
          warnings.push('Missing Twitter title (recommended for social sharing)');
        }
        if (!twitterDescription) {
          warnings.push('Missing Twitter description (recommended for social sharing)');
        }
        
        // Check for duplicate meta tags
        const metaTags = document.querySelectorAll('meta');
        const metaNames = Array.from(metaTags).map(tag => tag.getAttribute('name') || tag.getAttribute('property'));
        const duplicates = metaNames.filter((name, index) => metaNames.indexOf(name) !== index);
        
        if (duplicates.length > 0) {
          issues.push(`Duplicate meta tags found: ${duplicates.join(', ')}`);
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
      return this.createResult(false, 1, [`SEO Meta Test failed: ${error}`], []);
    }
  }
} 