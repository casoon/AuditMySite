import { chromium, Browser, BrowserContext } from 'playwright';
import { TestOptions } from '../types';

export interface BrowserConfig {
  headless?: boolean;
  slowMo?: number;
  devtools?: boolean;
  args?: string[];
  port?: number;
}

export class BrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private wsEndpoint: string | null = null;
  private port: number;

  constructor(private config: BrowserConfig = {}) {
    this.port = config.port || 9222;
  }

  async initialize(): Promise<void> {
    console.log('🚀 Initialisiere geteilten Browser...');
    
    // Browser mit Remote Debugging starten
    this.browser = await chromium.launch({
      headless: this.config.headless !== false,
      slowMo: this.config.slowMo || 0,
      devtools: this.config.devtools || false,
      args: [
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--remote-debugging-port=' + this.port,
        '--remote-debugging-address=127.0.0.1',
        ...(this.config.args || [])
      ]
    });

    // Browser Context erstellen
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'auditmysite/1.0 (+https://github.com/casoon/AuditMySite)'
    });

    // WebSocket Endpoint für pa11y/Lighthouse
    this.wsEndpoint = `ws://127.0.0.1:${this.port}`;
    
    console.log(`✅ Geteilter Browser bereit auf Port ${this.port}`);
    console.log(`🔗 WebSocket: ${this.wsEndpoint}`);
  }

  async getPage() {
    if (!this.context) {
      throw new Error('Browser not initialized');
    }
    return await this.context.newPage();
  }

  getWsEndpoint(): string {
    if (!this.wsEndpoint) {
      throw new Error('Browser not initialized');
    }
    return this.wsEndpoint;
  }

  getPort(): number {
    return this.port;
  }

  async cleanup(): Promise<void> {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
    console.log('🧹 Shared browser cleaned up');
  }

  isInitialized(): boolean {
    return this.browser !== null && this.context !== null;
  }
} 