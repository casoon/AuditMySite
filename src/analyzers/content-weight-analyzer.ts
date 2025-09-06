/**
 * 📊 Content Weight Analyzer
 * 
 * Analyzes the weight and composition of webpage content including:
 * - Resource sizes (HTML, CSS, JS, images, fonts)
 * - Content quality metrics
 * - Text-to-code ratios
 * - Performance impact analysis
 */

import { Page, Response } from 'playwright';
import { 
  ContentWeight, 
  ContentAnalysis, 
  ResourceTiming, 
  QualityAnalysisOptions 
} from '../types/enhanced-metrics';

export class ContentWeightAnalyzer {
  private resourceTimings: ResourceTiming[] = [];
  private responses: Response[] = [];

  constructor(private options: QualityAnalysisOptions = {}) {}

  /**
   * Analyze content weight and composition of a webpage
   */
  async analyzeContentWeight(page: Page, url: string): Promise<{
    contentWeight: ContentWeight;
    contentAnalysis: ContentAnalysis;
    resourceTimings: ResourceTiming[];
  }> {
    console.log(`🔍 Analyzing content weight for: ${url}`);

    // Set up response tracking
    this.setupResponseTracking(page);

    // Navigate and wait for page to fully load
    const startTime = Date.now();
    
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: this.options.analysisTimeout || 30000 
      });

      // Wait a bit more for any lazy-loaded content
      await page.waitForTimeout(2000);

      // Collect resource data
      const contentWeight = await this.calculateContentWeight(page);
      const contentAnalysis = await this.analyzeContentComposition(page);
      const resourceTimings = await this.extractResourceTimings(page);

      console.log(`✅ Content weight analysis completed in ${Date.now() - startTime}ms`);
      console.log(`📏 Total page weight: ${this.formatBytes(contentWeight.total)}`);
      console.log(`📊 Text-to-code ratio: ${(contentAnalysis.textToCodeRatio * 100).toFixed(1)}%`);

      return {
        contentWeight,
        contentAnalysis,
        resourceTimings
      };

    } catch (error) {
      console.error('❌ Content weight analysis failed:', error);
      throw new Error(`Content weight analysis failed: ${error}`);
    }
  }

  /**
   * Set up response tracking to capture all network requests
   */
  private setupResponseTracking(page: Page) {
    this.responses = [];
    this.resourceTimings = [];

    page.on('response', (response) => {
      this.responses.push(response);
    });
  }

  /**
   * Calculate the weight of different content types
   */
  private async calculateContentWeight(page: Page): Promise<ContentWeight> {
    const weights: ContentWeight = {
      html: 0,
      css: 0,
      javascript: 0,
      images: 0,
      fonts: 0,
      other: 0,
      total: 0,
      gzipTotal: 0,
      compressionRatio: 0
    };

    let totalTransferSize = 0;

    // Analyze all captured responses
    for (const response of this.responses) {
      try {
        const url = response.url();
        const headers = await response.headers();
        const size = await this.getResponseSize(response);
        const transferSize = this.getTransferSize(headers, size);
        
        totalTransferSize += transferSize;

        // Categorize by content type
        const contentType = headers['content-type'] || '';
        const category = this.categorizeResource(url, contentType);
        
        weights[category] += size;
        weights.total += size;

      } catch (error) {
        console.warn(`Failed to analyze response ${response.url()}:`, error);
      }
    }

    // Calculate compression metrics
    weights.gzipTotal = totalTransferSize;
    weights.compressionRatio = weights.total > 0 ? totalTransferSize / weights.total : 0;

    return weights;
  }

  /**
   * Analyze content composition and quality metrics
   */
  private async analyzeContentComposition(page: Page): Promise<ContentAnalysis> {
    const analysis = await page.evaluate(() => {
      // Count text content
      const bodyText = document.body.innerText || '';
      const textContent = bodyText.length;
      const wordCount = bodyText.trim().split(/\s+/).filter(word => word.length > 0).length;
      
      // Count various elements
      const imageCount = document.querySelectorAll('img').length;
      const linkCount = document.querySelectorAll('a').length;
      const domElements = document.querySelectorAll('*').length;

      // Get HTML size for ratio calculation
      const htmlSize = new TextEncoder().encode(document.documentElement.outerHTML).length;
      
      return {
        textContent,
        wordCount,
        imageCount,
        linkCount,
        domElements,
        htmlSize
      };
    });

    // Calculate text-to-code ratio
    const textToCodeRatio = analysis.htmlSize > 0 
      ? analysis.textContent / analysis.htmlSize 
      : 0;

    // Calculate content quality score
    const contentQualityScore = this.calculateContentQualityScore({
      ...analysis,
      textToCodeRatio
    });

    return {
      textContent: analysis.textContent,
      imageCount: analysis.imageCount,
      linkCount: analysis.linkCount,
      domElements: analysis.domElements,
      textToCodeRatio,
      contentQualityScore,
      wordCount: analysis.wordCount
    };
  }

  /**
   * Extract detailed resource timing information
   */
  private async extractResourceTimings(page: Page): Promise<ResourceTiming[]> {
    if (!this.options.includeResourceAnalysis) {
      return [];
    }

    const resourceTimings: ResourceTiming[] = [];

    // Get performance entries from the page
    const performanceEntries = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource');
      return entries.map(entry => ({
        name: entry.name,
        startTime: entry.startTime,
        duration: entry.duration,
        transferSize: (entry as any).transferSize || 0,
        encodedBodySize: (entry as any).encodedBodySize || 0,
        decodedBodySize: (entry as any).decodedBodySize || 0
      }));
    });

    // Combine with response data
    for (const entry of performanceEntries) {
      const matchingResponse = this.responses.find(r => r.url() === entry.name);
      
      resourceTimings.push({
        url: entry.name,
        type: this.getResourceType(entry.name),
        size: entry.decodedBodySize || entry.encodedBodySize,
        duration: entry.duration,
        transferSize: entry.transferSize,
        cached: entry.transferSize === 0 && entry.duration < 10
      });
    }

    return resourceTimings.sort((a, b) => b.size - a.size);
  }

  /**
   * Get the size of a response
   */
  private async getResponseSize(response: Response): Promise<number> {
    try {
      const buffer = await response.body();
      return buffer.length;
    } catch {
      // Fallback to content-length header
      const headers = await response.headers();
      return parseInt(headers['content-length'] || '0', 10);
    }
  }

  /**
   * Get transfer size from headers
   */
  private getTransferSize(headers: { [key: string]: string }, bodySize: number): number {
    // If gzipped, estimate compression
    const isCompressed = headers['content-encoding']?.includes('gzip') || 
                        headers['content-encoding']?.includes('br') ||
                        headers['content-encoding']?.includes('deflate');
    
    if (isCompressed && bodySize > 0) {
      // Typical compression ratios: text ~70%, images ~5%
      const contentType = headers['content-type'] || '';
      if (contentType.includes('text') || contentType.includes('javascript') || contentType.includes('css')) {
        return Math.round(bodySize * 0.3); // ~70% compression
      }
      return Math.round(bodySize * 0.95); // ~5% compression for images
    }
    
    return bodySize;
  }

  /**
   * Categorize resource by URL and content type
   */
  private categorizeResource(url: string, contentType: string): keyof ContentWeight {
    // Remove the computed properties from the type check
    if (contentType.includes('text/html')) return 'html';
    if (contentType.includes('text/css') || url.includes('.css')) return 'css';
    if (contentType.includes('javascript') || url.includes('.js') || url.includes('.mjs')) return 'javascript';
    if (contentType.includes('image/') || /\.(jpg|jpeg|png|gif|webp|svg|ico)(\?|$)/i.test(url)) return 'images';
    if (contentType.includes('font/') || /\.(woff|woff2|ttf|otf|eot)(\?|$)/i.test(url)) return 'fonts';
    return 'other';
  }

  /**
   * Get resource type for timing analysis
   */
  private getResourceType(url: string): string {
    if (/\.(css)(\?|$)/i.test(url)) return 'stylesheet';
    if (/\.(js|mjs)(\?|$)/i.test(url)) return 'script';
    if (/\.(jpg|jpeg|png|gif|webp|svg|ico)(\?|$)/i.test(url)) return 'image';
    if (/\.(woff|woff2|ttf|otf|eot)(\?|$)/i.test(url)) return 'font';
    if (/\.(mp4|mov|avi|webm)(\?|$)/i.test(url)) return 'video';
    if (/\.(mp3|wav|ogg)(\?|$)/i.test(url)) return 'audio';
    return 'other';
  }

  /**
   * Calculate content quality score based on various factors
   */
  private calculateContentQualityScore(analysis: {
    textContent: number;
    wordCount: number;
    imageCount: number;
    linkCount: number;
    domElements: number;
    textToCodeRatio: number;
  }): number {
    let score = 100;

    // Text content scoring (40% of total)
    if (analysis.wordCount < 200) score -= 20;
    else if (analysis.wordCount < 300) score -= 10;
    else if (analysis.wordCount > 2000) score += 10;

    // Text-to-code ratio scoring (30% of total)
    if (analysis.textToCodeRatio < 0.1) score -= 20;
    else if (analysis.textToCodeRatio < 0.2) score -= 10;
    else if (analysis.textToCodeRatio > 0.4) score += 15;

    // DOM complexity scoring (20% of total)
    if (analysis.domElements > 2000) score -= 15;
    else if (analysis.domElements > 1500) score -= 10;
    else if (analysis.domElements < 500) score += 5;

    // Media balance scoring (10% of total)
    const imageToTextRatio = analysis.wordCount > 0 ? analysis.imageCount / analysis.wordCount : 0;
    if (imageToTextRatio > 0.1) score -= 10; // Too many images relative to text
    else if (imageToTextRatio > 0.05) score -= 5;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Format bytes to human readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Get performance recommendations based on content weight analysis
   */
  static generateContentRecommendations(
    contentWeight: ContentWeight,
    contentAnalysis: ContentAnalysis
  ): string[] {
    const recommendations: string[] = [];
    const totalMB = contentWeight.total / (1024 * 1024);

    // Size-based recommendations
    if (totalMB > 3) {
      recommendations.push(`📏 Page size is ${totalMB.toFixed(1)}MB - consider optimizing large resources`);
    }

    if (contentWeight.images > contentWeight.total * 0.6) {
      recommendations.push(`🖼️ Images comprise ${((contentWeight.images / contentWeight.total) * 100).toFixed(0)}% of page weight - optimize image sizes`);
    }

    if (contentWeight.javascript > 1024 * 1024) {
      recommendations.push(`📜 JavaScript bundle is ${(contentWeight.javascript / (1024 * 1024)).toFixed(1)}MB - consider code splitting`);
    }

    if (contentWeight.compressionRatio && contentWeight.compressionRatio > 0.8) {
      recommendations.push(`🗜️ Enable better compression - current ratio: ${(contentWeight.compressionRatio * 100).toFixed(0)}%`);
    }

    // Content quality recommendations
    if (contentAnalysis.textToCodeRatio < 0.15) {
      recommendations.push(`📝 Low text-to-code ratio (${(contentAnalysis.textToCodeRatio * 100).toFixed(0)}%) - add more meaningful content`);
    }

    if (contentAnalysis.domElements > 1500) {
      recommendations.push(`🏗️ High DOM complexity (${contentAnalysis.domElements} elements) - simplify page structure`);
    }

    if (contentAnalysis.wordCount < 300) {
      recommendations.push(`💬 Low word count (${contentAnalysis.wordCount} words) - add more content for better SEO`);
    }

    return recommendations;
  }
}
