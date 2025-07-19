export interface QueuedUrl {
  url: string;
  priority: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  attempts: number;
  result?: any;
  error?: string;
}

export interface SimpleQueueOptions {
  maxRetries?: number;
  maxConcurrent?: number;
  priorityPatterns?: Array<{
    pattern: string;
    priority: number;
  }>;
}

export class SimpleQueue {
  private queue: QueuedUrl[] = [];
  private completed: QueuedUrl[] = [];
  private failed: QueuedUrl[] = [];
  private options: SimpleQueueOptions;

  constructor(options: SimpleQueueOptions = {}) {
    this.options = {
      maxRetries: 3,
      maxConcurrent: 1,
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
   * Queue-Status abrufen
   */
  getStatus(): {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    failed: number;
    progress: number;
  } {
    const total = this.queue.length + this.completed.length + this.failed.length;
    const pending = this.queue.filter(item => item.status === 'pending').length;
    const inProgress = this.queue.filter(item => item.status === 'in-progress').length;
    const completed = this.completed.length;
    const failed = this.failed.length;
    const progress = total > 0 ? ((completed + failed) / total) * 100 : 0;

    return {
      total,
      pending,
      inProgress,
      completed,
      failed,
      progress: Math.round(progress)
    };
  }

  /**
   * Alle abgeschlossenen Ergebnisse abrufen
   */
  getCompletedResults(): any[] {
    return this.completed.map(item => item.result);
  }

  /**
   * Alle fehlgeschlagenen Ergebnisse abrufen
   */
  getFailedResults(): any[] {
    return this.failed.map(item => ({
      url: item.url,
      title: "",
      imagesWithoutAlt: 0,
      buttonsWithoutLabel: 0,
      headingsCount: 0,
      errors: [`Test failed: ${item.error}`],
      warnings: [],
      passed: false,
      duration: 0,
    }));
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
    console.log(`   📈 Progress: ${status.progress}%`);
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
} 