import { BaseAccessibilityTest, TestResult, TestContext } from '../base-test';
import { Page } from 'playwright';

export interface PWAManifest {
  name?: string;
  short_name?: string;
  description?: string;
  start_url?: string;
  display?: string;
  background_color?: string;
  theme_color?: string;
  icons?: Array<{
    src: string;
    sizes: string;
    type: string;
  }>;
  categories?: string[];
  lang?: string;
  dir?: string;
  scope?: string;
  orientation?: string;
  prefer_related_applications?: boolean;
  related_applications?: Array<{
    platform: string;
    url: string;
    id?: string;
  }>;
}

export interface PWAResult extends TestResult {
  manifest: PWAManifest | null;
  hasServiceWorker: boolean;
  hasManifest: boolean;
  isInstallable: boolean;
  score: number;
  features: PWAFeature[];
  recommendations: string[];
  duration?: number;
  url?: string;
  testName?: string;
  description?: string;
  error?: string;
}

export interface PWAFeature {
  name: string;
  description: string;
  implemented: boolean;
  score: number;
  details?: string;
}

export class PWATest extends BaseAccessibilityTest {
  name = 'PWA Test';
  description = 'Tests Progressive Web App features including manifest, service worker, and installability';
  category = 'mobile';
  priority = 'medium';
  standards = ['PWA', 'Web App Manifest', 'Service Worker'];

  async run(context: TestContext): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // Navigate to page
      await context.page.goto(context.url, { waitUntil: 'networkidle' });
      
      // Wait for page to be fully loaded
      await context.page.waitForTimeout(2000);
      
      // Test PWA features
      const manifest = await this.checkManifest(context.page);
      const hasServiceWorker = await this.checkServiceWorker(context.page);
      const features = await this.checkPWAFeatures(context.page);
      
      // Calculate score
      const score = this.calculateScore(features, manifest, hasServiceWorker);
      const isInstallable = this.checkInstallability(features, manifest);
      const recommendations = this.generateRecommendations(features, manifest, hasServiceWorker);
      
      const duration = Date.now() - startTime;
      
      return {
        passed: score >= 70,
        count: features.length,
        errors: features.filter(f => !f.implemented && f.score === 0).map(f => `${f.name}: ${f.description}`),
        warnings: features.filter(f => !f.implemented && f.score > 0).map(f => `${f.name}: ${f.description}`),
        details: {
          manifest,
          hasServiceWorker,
          hasManifest: !!manifest,
          isInstallable,
          score,
          features,
          recommendations,
          duration,
          url: context.url,
          testName: this.name,
          description: this.description
        }
      };
      
    } catch (error) {
      return {
        passed: false,
        count: 0,
        errors: [`Error occurred during PWA analysis: ${error}`],
        warnings: [],
        details: {
          manifest: null,
          hasServiceWorker: false,
          hasManifest: false,
          isInstallable: false,
          score: 0,
          features: [],
          duration: Date.now() - startTime,
          url: context.url,
          testName: this.name,
          description: this.description
        }
      };
    }
  }

  private async checkManifest(page: Page): Promise<PWAManifest | null> {
    try {
      const manifest = await page.evaluate(() => {
        const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
        if (!manifestLink) return null;
        
        // Try to fetch manifest
        return fetch(manifestLink.href)
          .then(response => response.json())
          .catch(() => null);
      });
      
      return manifest;
    } catch {
      return null;
    }
  }

  private async checkServiceWorker(page: Page): Promise<boolean> {
    try {
      return await page.evaluate(() => {
        return 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null;
      });
    } catch {
      return false;
    }
  }

  private async checkPWAFeatures(page: Page): Promise<PWAFeature[]> {
    const features: PWAFeature[] = [];
    
    // Check manifest
    const manifest = await this.checkManifest(page);
    features.push({
      name: 'Web App Manifest',
      description: 'Web app manifest file is present and valid',
      implemented: !!manifest,
      score: manifest ? 100 : 0,
      details: manifest ? 'Manifest found and loaded successfully' : 'No manifest found'
    });
    
    // Check service worker
    const hasServiceWorker = await this.checkServiceWorker(page);
    features.push({
      name: 'Service Worker',
      description: 'Service worker is registered and active',
      implemented: hasServiceWorker,
      score: hasServiceWorker ? 100 : 0,
      details: hasServiceWorker ? 'Service worker is active' : 'No service worker found'
    });
    
    // Check HTTPS
    const isHTTPS = await page.evaluate(() => location.protocol === 'https:');
    features.push({
      name: 'HTTPS',
      description: 'Site is served over HTTPS',
      implemented: isHTTPS,
      score: isHTTPS ? 100 : 0,
      details: isHTTPS ? 'Site is served over HTTPS' : 'Site is not served over HTTPS'
    });
    
         // Check responsive design
     const isResponsive = await page.evaluate(() => {
       const viewport = document.querySelector('meta[name="viewport"]');
       return !!(viewport && viewport.getAttribute('content')?.includes('width=device-width'));
     });
    features.push({
      name: 'Responsive Design',
      description: 'Viewport meta tag is properly configured',
      implemented: isResponsive,
      score: isResponsive ? 100 : 0,
      details: isResponsive ? 'Viewport meta tag found' : 'No viewport meta tag found'
    });
    
    // Check offline capability
    const hasOfflineCapability = await page.evaluate(() => {
      return 'caches' in window || 'indexedDB' in window;
    });
    features.push({
      name: 'Offline Capability',
      description: 'Site has offline functionality',
      implemented: hasOfflineCapability,
      score: hasOfflineCapability ? 100 : 50,
      details: hasOfflineCapability ? 'Offline capabilities detected' : 'No offline capabilities detected'
    });
    
    // Check app-like experience
    const hasAppLikeExperience = await page.evaluate(() => {
      const displayMode = window.matchMedia('(display-mode: standalone)').matches;
      return displayMode;
    });
    features.push({
      name: 'App-like Experience',
      description: 'Site provides app-like experience',
      implemented: hasAppLikeExperience,
      score: hasAppLikeExperience ? 100 : 50,
      details: hasAppLikeExperience ? 'App-like experience detected' : 'Standard web experience'
    });
    
    // Check manifest properties
    if (manifest) {
      // Check name
      features.push({
        name: 'App Name',
        description: 'App has a name defined in manifest',
        implemented: !!(manifest.name || manifest.short_name),
        score: (manifest.name || manifest.short_name) ? 100 : 0,
        details: manifest.name || manifest.short_name ? `App name: ${manifest.name || manifest.short_name}` : 'No app name defined'
      });
      
      // Check icons
      features.push({
        name: 'App Icons',
        description: 'App has icons defined in manifest',
        implemented: !!(manifest.icons && manifest.icons.length > 0),
        score: (manifest.icons && manifest.icons.length > 0) ? 100 : 0,
        details: manifest.icons && manifest.icons.length > 0 ? `${manifest.icons.length} icons defined` : 'No icons defined'
      });
      
      // Check display mode
      features.push({
        name: 'Display Mode',
        description: 'App has display mode defined',
        implemented: !!manifest.display,
        score: manifest.display ? 100 : 50,
        details: manifest.display ? `Display mode: ${manifest.display}` : 'No display mode defined'
      });
      
      // Check theme color
      features.push({
        name: 'Theme Color',
        description: 'App has theme color defined',
        implemented: !!manifest.theme_color,
        score: manifest.theme_color ? 100 : 50,
        details: manifest.theme_color ? `Theme color: ${manifest.theme_color}` : 'No theme color defined'
      });
    }
    
    return features;
  }

  private calculateScore(features: PWAFeature[], manifest: PWAManifest | null, hasServiceWorker: boolean): number {
    if (features.length === 0) return 0;
    
    const totalScore = features.reduce((sum, feature) => sum + feature.score, 0);
    return Math.round(totalScore / features.length);
  }

  private checkInstallability(features: PWAFeature[], manifest: PWAManifest | null): boolean {
    const requiredFeatures = features.filter(f => 
      f.name === 'Web App Manifest' || 
      f.name === 'HTTPS' || 
      f.name === 'App Name' || 
      f.name === 'App Icons'
    );
    
    return requiredFeatures.every(f => f.implemented);
  }

  private generateRecommendations(features: PWAFeature[], manifest: PWAManifest | null, hasServiceWorker: boolean): string[] {
    const recommendations: string[] = [];
    
    if (!manifest) {
      recommendations.push('Create a web app manifest file (manifest.json)');
      recommendations.push('Add manifest link to HTML: <link rel="manifest" href="/manifest.json">');
    }
    
    if (!hasServiceWorker) {
      recommendations.push('Register a service worker for offline functionality');
      recommendations.push('Implement caching strategies for better performance');
    }
    
    if (!manifest?.name && !manifest?.short_name) {
      recommendations.push('Add app name to manifest (name and short_name properties)');
    }
    
    if (!manifest?.icons || manifest.icons.length === 0) {
      recommendations.push('Add app icons to manifest (multiple sizes recommended)');
      recommendations.push('Include at least 192x192 and 512x512 pixel icons');
    }
    
    if (!manifest?.display) {
      recommendations.push('Add display mode to manifest (standalone, fullscreen, or minimal-ui)');
    }
    
    if (!manifest?.theme_color) {
      recommendations.push('Add theme color to manifest for consistent branding');
    }
    
    if (!manifest?.background_color) {
      recommendations.push('Add background color to manifest for splash screen');
    }
    
    const httpsFeature = features.find(f => f.name === 'HTTPS');
    if (httpsFeature && !httpsFeature.implemented) {
      recommendations.push('Serve the site over HTTPS (required for PWA features)');
    }
    
    const responsiveFeature = features.find(f => f.name === 'Responsive Design');
    if (responsiveFeature && !responsiveFeature.implemented) {
      recommendations.push('Add viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('All PWA features are properly implemented');
    }
    
    return recommendations;
  }
} 