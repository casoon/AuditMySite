/**
 * Smart Sitemap Discovery
 * Automatically discovers sitemap locations from domain or URL
 */

export interface SitemapDiscoveryResult {
  found: boolean;
  sitemaps: string[];
  method: 'direct' | 'robots' | 'common_paths' | 'crawl';
  warnings: string[];
}

export class SitemapDiscovery {
  private commonSitemapPaths = [
    '/sitemap.xml',
    '/sitemap_index.xml',
    '/sitemaps.xml',
    '/sitemap1.xml',
    '/wp-sitemap.xml',
    '/sitemap/sitemap.xml',
    '/sitemaps/sitemap.xml'
  ];

  /**
   * Discover sitemap from a base URL or domain
   */
  async discoverSitemap(input: string): Promise<SitemapDiscoveryResult> {
    const baseUrl = this.normalizeUrl(input);
    const result: SitemapDiscoveryResult = {
      found: false,
      sitemaps: [],
      method: 'direct',
      warnings: []
    };

    // If input is already a sitemap URL, return it directly
    if (this.isSitemapUrl(input)) {
      const isValid = await this.validateSitemapUrl(input);
      if (isValid) {
        result.found = true;
        result.sitemaps = [input];
        result.method = 'direct';
        return result;
      } else {
        result.warnings.push('Provided sitemap URL is not accessible');
      }
    }

    // 1. Try robots.txt first (most reliable)
    try {
      const robotsSitemaps = await this.checkRobotsTxt(baseUrl);
      if (robotsSitemaps.length > 0) {
        result.found = true;
        result.sitemaps = robotsSitemaps;
        result.method = 'robots';
        return result;
      }
    } catch (error) {
      result.warnings.push('Could not access robots.txt');
    }

    // 2. Try common sitemap paths
    try {
      const commonSitemaps = await this.checkCommonPaths(baseUrl);
      if (commonSitemaps.length > 0) {
        result.found = true;
        result.sitemaps = commonSitemaps;
        result.method = 'common_paths';
        return result;
      }
    } catch (error) {
      result.warnings.push('Could not check common sitemap paths');
    }

    // 3. Last resort: Try to crawl for sitemap links (limited)
    try {
      const crawledSitemaps = await this.crawlForSitemaps(baseUrl);
      if (crawledSitemaps.length > 0) {
        result.found = true;
        result.sitemaps = crawledSitemaps;
        result.method = 'crawl';
        return result;
      }
    } catch (error) {
      result.warnings.push('Could not crawl for sitemap links');
    }

    result.warnings.push('No sitemaps found using any discovery method');
    return result;
  }

  /**
   * Normalize URL to base domain format
   */
  private normalizeUrl(input: string): string {
    try {
      // If it doesn't start with http, add https
      if (!input.startsWith('http://') && !input.startsWith('https://')) {
        input = `https://${input}`;
      }

      const url = new URL(input);
      return `${url.protocol}//${url.hostname}`;
    } catch (error) {
      throw new Error(`Invalid URL format: ${input}`);
    }
  }

  /**
   * Check if input looks like a sitemap URL
   */
  private isSitemapUrl(input: string): boolean {
    return input.includes('sitemap') && 
           (input.endsWith('.xml') || input.includes('sitemap.xml'));
  }

  /**
   * Validate that a sitemap URL is accessible and contains XML
   */
  private async validateSitemapUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        timeout: 10000 
      } as any);
      
      if (!response.ok) return false;
      
      const contentType = response.headers.get('content-type');
      return contentType ? 
             (contentType.includes('xml') || contentType.includes('text')) : 
             true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Parse robots.txt for sitemap entries
   */
  private async checkRobotsTxt(baseUrl: string): Promise<string[]> {
    const robotsUrl = `${baseUrl}/robots.txt`;
    const sitemaps: string[] = [];

    try {
      const response = await fetch(robotsUrl, { timeout: 10000 } as any);
      if (!response.ok) return [];

      const robotsTxt = await response.text();
      const lines = robotsTxt.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.toLowerCase().startsWith('sitemap:')) {
          const sitemapUrl = trimmed.substring(8).trim();
          if (await this.validateSitemapUrl(sitemapUrl)) {
            sitemaps.push(sitemapUrl);
          }
        }
      }

      return sitemaps;
    } catch (error) {
      return [];
    }
  }

  /**
   * Check common sitemap paths
   */
  private async checkCommonPaths(baseUrl: string): Promise<string[]> {
    const sitemaps: string[] = [];

    for (const path of this.commonSitemapPaths) {
      const sitemapUrl = `${baseUrl}${path}`;
      
      if (await this.validateSitemapUrl(sitemapUrl)) {
        sitemaps.push(sitemapUrl);
        
        // If we find one, check if it's a sitemap index
        const isSitemapIndex = await this.checkIfSitemapIndex(sitemapUrl);
        if (isSitemapIndex) {
          // If it's an index, parse it for more sitemaps
          const indexSitemaps = await this.parseSitemapIndex(sitemapUrl);
          sitemaps.push(...indexSitemaps);
        }
        
        break; // Stop after finding the first working sitemap
      }
    }

    return sitemaps;
  }

  /**
   * Check if a sitemap is actually a sitemap index
   */
  private async checkIfSitemapIndex(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { timeout: 10000 } as any);
      if (!response.ok) return false;
      
      const content = await response.text();
      return content.includes('<sitemapindex') || 
             content.includes('</sitemapindex>');
    } catch (error) {
      return false;
    }
  }

  /**
   * Parse sitemap index to extract individual sitemaps
   */
  private async parseSitemapIndex(indexUrl: string): Promise<string[]> {
    try {
      const response = await fetch(indexUrl, { timeout: 15000 } as any);
      if (!response.ok) return [];

      const content = await response.text();
      const sitemaps: string[] = [];

      // Simple regex to extract <loc> tags from sitemapindex
      const locMatches = content.match(/<loc>(.*?)<\/loc>/gi);
      if (locMatches) {
        for (const match of locMatches) {
          const url = match.replace(/<\/?loc>/gi, '').trim();
          if (url && url !== indexUrl) { // Avoid infinite loops
            sitemaps.push(url);
          }
        }
      }

      return sitemaps.slice(0, 10); // Limit to first 10 sitemaps
    } catch (error) {
      return [];
    }
  }

  /**
   * Crawl homepage for sitemap links (limited crawling)
   */
  private async crawlForSitemaps(baseUrl: string): Promise<string[]> {
    try {
      const response = await fetch(baseUrl, { timeout: 10000 } as any);
      if (!response.ok) return [];

      const html = await response.text();
      const sitemaps: string[] = [];

      // Look for sitemap links in HTML
      const sitemapLinkRegex = /<link[^>]+rel=["']sitemap["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
      let match;

      while ((match = sitemapLinkRegex.exec(html)) !== null) {
        let sitemapUrl = match[1];
        
        // Convert relative URLs to absolute
        if (sitemapUrl.startsWith('/')) {
          sitemapUrl = baseUrl + sitemapUrl;
        } else if (!sitemapUrl.startsWith('http')) {
          sitemapUrl = baseUrl + '/' + sitemapUrl;
        }

        if (await this.validateSitemapUrl(sitemapUrl)) {
          sitemaps.push(sitemapUrl);
        }
      }

      // Also look for explicit sitemap mentions in text/links
      const textSitemapRegex = /href=["']([^"']*sitemap[^"']*)["']/gi;
      while ((match = textSitemapRegex.exec(html)) !== null) {
        let sitemapUrl = match[1];
        
        if (sitemapUrl.startsWith('/')) {
          sitemapUrl = baseUrl + sitemapUrl;
        } else if (!sitemapUrl.startsWith('http')) {
          continue; // Skip relative URLs that don't start with /
        }

        if (sitemapUrl.endsWith('.xml') && await this.validateSitemapUrl(sitemapUrl)) {
          if (!sitemaps.includes(sitemapUrl)) {
            sitemaps.push(sitemapUrl);
          }
        }
      }

      return sitemaps.slice(0, 5); // Limit to first 5 found sitemaps
    } catch (error) {
      return [];
    }
  }

  /**
   * Get user-friendly suggestions based on discovery results
   */
  getSuggestions(result: SitemapDiscoveryResult, originalInput: string): string[] {
    const suggestions: string[] = [];

    if (result.found) {
      suggestions.push(`✅ Found ${result.sitemaps.length} sitemap(s) using ${result.method} method`);
      
      if (result.sitemaps.length > 1) {
        suggestions.push(`📊 Using primary sitemap: ${result.sitemaps[0]}`);
        suggestions.push(`🔄 Additional sitemaps available: ${result.sitemaps.length - 1}`);
      }
    } else {
      suggestions.push(`❌ No sitemaps found for: ${originalInput}`);
      suggestions.push('💡 Try providing a direct sitemap URL: https://example.com/sitemap.xml');
      suggestions.push('🔍 Or check if your site has a sitemap in robots.txt');
    }

    // Add warnings as suggestions
    result.warnings.forEach(warning => {
      suggestions.push(`⚠️  ${warning}`);
    });

    return suggestions;
  }
}
