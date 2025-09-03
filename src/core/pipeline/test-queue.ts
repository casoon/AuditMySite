import * as fs from 'fs';
import * as path from 'path';

export interface QueuedUrl {
  url: string;
  priority: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';
  attempts: number;
  lastAttempt?: Date;
  error?: string;
  result?: any;
}

export interface TestQueueOptions {
  maxRetries?: number;
  maxConcurrent?: number;
  saveInterval?: number; // ms
  dataFile?: string;
  priorityPatterns?: Array<{
    pattern: string;
    priority: number;
  }>;
  // 🆕 Parameter für Queue-Validierung
  testParameters?: {
    sitemapUrl: string;
    maxPages: number;
    pa11yStandard: string;
    timeout: number;
    collectPerformanceMetrics?: boolean;
    generateDetailedReport?: boolean;
    generatePerformanceReport?: boolean;
    generateSeoReport?: boolean;
  };
}

export class TestQueue {
  private queue: QueuedUrl[] = [];
  private completed: QueuedUrl[] = [];
  private failed: QueuedUrl[] = [];
  private options: TestQueueOptions;
  private dataFile: string;
  private saveTimer?: NodeJS.Timeout;

  constructor(options: TestQueueOptions = {}) {
    this.options = {
      maxRetries: 3,
      maxConcurrent: 1,
      saveInterval: 5000, // 5 Sekunden
      dataFile: './test-queue-data.json',
      priorityPatterns: [
        { pattern: '/home', priority: 1 },
        { pattern: '/', priority: 2 },
        { pattern: '/about', priority: 3 },
        { pattern: '/contact', priority: 3 },
        { pattern: '/blog', priority: 4 },
        { pattern: '/products', priority: 4 }
      ],
      ...options
    };
    
    this.dataFile = this.options.dataFile!;
    this.loadQueue();
    this.startAutoSave();
  }

  /**
   * URLs zur Queue hinzufügen
   */
  addUrls(urls: string[]): void {
    const newUrls = urls.map(url => ({
      url,
      priority: this.calculatePriority(url),
      status: 'pending' as const,
      attempts: 0
    }));

    // Duplikate entfernen
    const existingUrls = new Set(this.queue.map(item => item.url));
    const uniqueNewUrls = newUrls.filter(item => !existingUrls.has(item.url));
    
    this.queue.push(...uniqueNewUrls);
    
    // Nach Priorität sortieren
    this.queue.sort((a, b) => a.priority - b.priority);
    
    console.log(`📋 Added ${uniqueNewUrls.length} URLs to queue (${this.queue.length} total)`);
  }

  /**
   * Nächste URL aus der Queue holen
   */
  getNextUrl(): QueuedUrl | null {
    const pendingUrl = this.queue.find(item => item.status === 'pending');
    if (!pendingUrl) return null;

    pendingUrl.status = 'in-progress';
    pendingUrl.attempts++;
    pendingUrl.lastAttempt = new Date();
    
    return pendingUrl;
  }

  /**
   * URL als abgeschlossen markieren
   */
  markCompleted(url: string, result: any): void {
    const item = this.queue.find(item => item.url === url);
    if (item) {
      item.status = 'completed';
      item.result = result;
      this.completed.push(item);
      this.queue = this.queue.filter(item => item.url !== url);
    }
  }

  /**
   * URL als fehlgeschlagen markieren
   */
  markFailed(url: string, error: string): void {
    const item = this.queue.find(item => item.url === url);
    if (item) {
      if (item.attempts >= this.options.maxRetries!) {
        item.status = 'failed';
        item.error = error;
        this.failed.push(item);
        this.queue = this.queue.filter(item => item.url !== url);
        console.log(`❌ URL failed permanently: ${url} (${error})`);
      } else {
        item.status = 'pending';
        item.error = error;
        console.log(`🔄 URL will be retried: ${url} (attempt ${item.attempts}/${this.options.maxRetries})`);
      }
    }
  }

  /**
   * URL überspringen
   */
  markSkipped(url: string, reason?: string): void {
    const item = this.queue.find(item => item.url === url);
    if (item) {
      item.status = 'skipped';
      item.error = reason || 'Skipped by user';
      this.queue = this.queue.filter(item => item.url !== url);
    }
  }

  /**
   * Queue-Status abrufen
   */
  getStatus(): {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    failed: number;
    skipped: number;
    progress: number;
  } {
    const total = this.queue.length + this.completed.length + this.failed.length;
    const pending = this.queue.filter(item => item.status === 'pending').length;
    const inProgress = this.queue.filter(item => item.status === 'in-progress').length;
    const completed = this.completed.length;
    const failed = this.failed.length;
    const skipped = this.queue.filter(item => item.status === 'skipped').length;
    const progress = total > 0 ? ((completed + failed) / total) * 100 : 0;

    return {
      total,
      pending,
      inProgress,
      completed,
      failed,
      skipped,
      progress: Math.round(progress)
    };
  }

  /**
   * Queue speichern
   */
  saveQueue(): void {
    try {
      const data = {
        queue: this.queue,
        completed: this.completed,
        failed: this.failed,
        timestamp: new Date().toISOString(),
        // 🆕 Parameter mit speichern
        testParameters: this.options.testParameters
      };
      
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
      console.log(`💾 Queue saved to ${this.dataFile}`);
    } catch (error) {
      console.error(`💥 Failed to save queue: ${error}`);
    }
  }

  /**
   * Queue laden
   */
  loadQueue(): void {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
        
        // 🆕 Parameter-Validierung
        if (this.options.testParameters && data.testParameters) {
          const isValid = this.validateParameters(data.testParameters);
          if (!isValid) {
            console.log(`⚠️  Queue parameters changed, creating new queue...`);
            this.clearQueueFile();
            return;
          }
        }
        
        this.queue = data.queue || [];
        this.completed = data.completed || [];
        this.failed = data.failed || [];
        
        // In-Progress URLs zurücksetzen
        this.queue.forEach(item => {
          if (item.status === 'in-progress') {
            item.status = 'pending';
          }
        });
        
        console.log(`📋 Loaded queue: ${this.queue.length} pending, ${this.completed.length} completed, ${this.failed.length} failed`);
      }
    } catch (error) {
      console.error(`💥 Failed to load queue: ${error}`);
    }
  }

  /**
   * Parameter validieren
   */
  private validateParameters(savedParameters: any): boolean {
    if (!this.options.testParameters) return false;
    
    const current = this.options.testParameters;
    const saved = savedParameters;
    
    // Kritische Parameter vergleichen
    return (
      current.sitemapUrl === saved.sitemapUrl &&
      current.maxPages === saved.maxPages &&
      current.pa11yStandard === saved.pa11yStandard &&
      current.timeout === saved.timeout &&
      current.collectPerformanceMetrics === saved.collectPerformanceMetrics &&
      current.generateDetailedReport === saved.generateDetailedReport &&
      current.generatePerformanceReport === saved.generatePerformanceReport &&
      current.generateSeoReport === saved.generateSeoReport
    );
  }

  /**
   * Queue-Datei löschen
   */
  private clearQueueFile(): void {
    try {
      if (fs.existsSync(this.dataFile)) {
        fs.unlinkSync(this.dataFile);
        console.log(`🗑️  Deleted invalid queue file: ${this.dataFile}`);
      }
    } catch (error) {
      console.error(`💥 Failed to delete queue file: ${error}`);
    }
  }

  /**
   * Auto-Save starten
   */
  private startAutoSave(): void {
    this.saveTimer = setInterval(() => {
      this.saveQueue();
    }, this.options.saveInterval);
  }

  /**
   * Auto-Save stoppen
   */
  stopAutoSave(): void {
    if (this.saveTimer) {
      clearInterval(this.saveTimer);
      this.saveTimer = undefined;
    }
  }

  /**
   * Priorität für URL berechnen
   */
  private calculatePriority(url: string): number {
    const pattern = this.options.priorityPatterns!.find(p => 
      url.includes(p.pattern)
    );
    return pattern ? pattern.priority : 10; // Standard-Priorität
  }

  /**
   * Queue leeren
   */
  clear(): void {
    this.queue = [];
    this.completed = [];
    this.failed = [];
    this.saveQueue();
  }

  /**
   * Queue-Datei nach erfolgreichem Abschluss löschen
   */
  cleanup(): void {
    try {
      if (fs.existsSync(this.dataFile)) {
        fs.unlinkSync(this.dataFile);
        console.log(`🧹 Cleaned up queue file: ${this.dataFile}`);
      }
    } catch (error) {
      console.error(`💥 Failed to cleanup queue file: ${error}`);
    }
  }

  /**
   * Fehlgeschlagene URLs erneut versuchen
   */
  retryFailed(): void {
    const failedUrls = this.failed.map(item => item.url);
    this.failed = [];
    this.addUrls(failedUrls);
    console.log(`🔄 Added ${failedUrls.length} failed URLs back to queue`);
  }

  /**
   * Queue-Statistiken anzeigen
   */
  showStats(): void {
    const status = this.getStatus();
    console.log(`\n📊 Queue Statistics:`);
    console.log(`   📋 Total URLs: ${status.total}`);
    console.log(`   ⏳ Pending: ${status.pending}`);
    console.log(`   🔄 In Progress: ${status.inProgress}`);
    console.log(`   ✅ Completed: ${status.completed}`);
    console.log(`   ❌ Failed: ${status.failed}`);
    console.log(`   ⏭️  Skipped: ${status.skipped}`);
    console.log(`   📈 Progress: ${status.progress}%`);
  }
} 