import { EventEmitter } from 'events';

export interface QueuedUrl {
  url: string;
  priority: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'retrying';
  attempts: number;
  result?: any;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
}

export interface QueueEvent {
  type: 'url-added' | 'url-started' | 'url-completed' | 'url-failed' | 'url-retrying' | 'queue-empty' | 'progress-update' | 'error';
  data: any;
  timestamp: Date;
}

export interface EventDrivenQueueOptions {
  maxRetries?: number;
  maxConcurrent?: number;
  priorityPatterns?: Array<{ pattern: string; priority: number }>;
  retryDelay?: number;
  enableEvents?: boolean;
  enableShortStatus?: boolean; // Neue Option für kurze Status-Updates
  statusUpdateInterval?: number; // Interval für Status-Updates
  eventCallbacks?: {
    onUrlAdded?: (url: string, priority: number) => void;
    onUrlStarted?: (url: string) => void;
    onUrlCompleted?: (url: string, result: any, duration: number) => void;
    onUrlFailed?: (url: string, error: string, attempts: number) => void;
    onUrlRetrying?: (url: string, attempts: number) => void;
    onQueueEmpty?: () => void;
    onProgressUpdate?: (stats: QueueStats) => void;
    onError?: (error: string) => void;
    onShortStatus?: (status: string) => void; // Neuer Callback für kurze Status
  };
}

export interface QueueStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  failed: number;
  retrying: number;
  progress: number;
  averageDuration: number;
  estimatedTimeRemaining: number;
  activeWorkers: number;
  memoryUsage: number;
  cpuUsage: number;
}

export interface ProcessOptions {
  processor: (url: string) => Promise<any>; // Funktion die eine URL verarbeitet
  onResult?: (url: string, result: any) => void;
  onError?: (url: string, error: string) => void;
  onProgress?: (stats: QueueStats) => void;
  onShortStatus?: (status: string) => void;
}

export class EventDrivenQueue extends EventEmitter {
  private queue: QueuedUrl[] = [];
  private completed: QueuedUrl[] = [];
  private failed: QueuedUrl[] = [];
  private activeWorkers: Set<string> = new Set();
  private options: EventDrivenQueueOptions;
  private isProcessing = false;
  private startTime: Date | null = null;
  private lastProgressUpdate = 0;
  private progressUpdateInterval = 1000; // 1 second
  private statusInterval: NodeJS.Timeout | null = null;

  constructor(options: EventDrivenQueueOptions = {}) {
    super();
    this.options = {
      maxRetries: 3,
      maxConcurrent: 1,
      priorityPatterns: [
        { pattern: '/home', priority: 10 },
        { pattern: '/', priority: 9 },
        { pattern: '/about', priority: 8 },
        { pattern: '/contact', priority: 7 }
      ],
      retryDelay: 1000,
      enableEvents: true,
      enableShortStatus: true, // Standardmäßig aktiviert
      statusUpdateInterval: 2000, // 2 Sekunden
      ...options
    };

    // Event-Listener für interne Queue-Events
    if (this.options.enableEvents) {
      this.setupEventListeners();
    }
  }

  private setupEventListeners(): void {
    // Interne Event-Handler
    this.on('url-added', (url: string, priority: number) => {
      this.emit('queue:urlAdded', { url, priority, timestamp: new Date() });
      this.options.eventCallbacks?.onUrlAdded?.(url, priority);
    });

    this.on('url-started', (url: string) => {
      this.emit('queue:urlStarted', { url, timestamp: new Date() });
      this.options.eventCallbacks?.onUrlStarted?.(url);
    });

    this.on('url-completed', (url: string, result: any, duration: number) => {
      this.emit('queue:urlCompleted', { url, result, duration, timestamp: new Date() });
      this.options.eventCallbacks?.onUrlCompleted?.(url, result, duration);
    });

    this.on('url-failed', (url: string, error: string, attempts: number) => {
      this.emit('queue:urlFailed', { url, error, attempts, timestamp: new Date() });
      this.options.eventCallbacks?.onUrlFailed?.(url, error, attempts);
    });

    this.on('url-retrying', (url: string, attempts: number) => {
      this.emit('queue:urlRetrying', { url, attempts, timestamp: new Date() });
      this.options.eventCallbacks?.onUrlRetrying?.(url, attempts);
    });

    this.on('queue-empty', () => {
      this.emit('queue:empty', { timestamp: new Date() });
      this.options.eventCallbacks?.onQueueEmpty?.();
    });

    this.on('progress-update', (stats: QueueStats) => {
      this.emit('queue:progressUpdate', { stats, timestamp: new Date() });
      this.options.eventCallbacks?.onProgressUpdate?.(stats);
    });

    this.on('error', (error: string) => {
      this.emit('queue:error', { error, timestamp: new Date() });
      this.options.eventCallbacks?.onError?.(error);
    });
  }

  addUrls(urls: string[]): void {
    const newUrls = urls.filter(url => !this.queue.some(q => q.url === url));
    
    newUrls.forEach(url => {
      const priority = this.calculatePriority(url);
      const queuedUrl: QueuedUrl = {
        url,
        priority,
        status: 'pending',
        attempts: 0
      };
      
      this.queue.push(queuedUrl);
      this.emit('url-added', url, priority);
    });

    // Sortiere nach Priorität (höchste zuerst)
    this.queue.sort((a, b) => b.priority - a.priority);
    
    this.updateProgress();
  }

  getNextUrl(): QueuedUrl | null {
    const pendingUrl = this.queue.find(q => q.status === 'pending');
    
    if (pendingUrl && this.activeWorkers.size < this.options.maxConcurrent!) {
      pendingUrl.status = 'in-progress';
      pendingUrl.startedAt = new Date();
      pendingUrl.attempts++;
      
      this.activeWorkers.add(pendingUrl.url);
      this.emit('url-started', pendingUrl.url);
      this.updateProgress();
      
      return pendingUrl;
    }
    
    return null;
  }

  markCompleted(url: string, result: any): void {
    const queuedUrl = this.queue.find(q => q.url === url);
    if (queuedUrl) {
      queuedUrl.status = 'completed';
      queuedUrl.result = result;
      queuedUrl.completedAt = new Date();
      queuedUrl.duration = queuedUrl.completedAt.getTime() - queuedUrl.startedAt!.getTime();
      
      this.completed.push(queuedUrl);
      this.queue = this.queue.filter(q => q.url !== url);
      this.activeWorkers.delete(url);
      
      this.emit('url-completed', url, result, queuedUrl.duration);
      this.updateProgress();
      
      this.checkQueueEmpty();
    }
  }

  markFailed(url: string, error: string): void {
    const queuedUrl = this.queue.find(q => q.url === url);
    if (queuedUrl) {
      if (queuedUrl.attempts < this.options.maxRetries!) {
        // Retry logic
        queuedUrl.status = 'retrying';
        this.emit('url-retrying', url, queuedUrl.attempts);
        
        // Schedule retry
        setTimeout(() => {
          queuedUrl.status = 'pending';
          this.updateProgress();
        }, this.options.retryDelay);
      } else {
        // Max retries reached
        queuedUrl.status = 'failed';
        queuedUrl.error = error;
        queuedUrl.completedAt = new Date();
        queuedUrl.duration = queuedUrl.completedAt.getTime() - queuedUrl.startedAt!.getTime();
        
        this.failed.push(queuedUrl);
        this.queue = this.queue.filter(q => q.url !== url);
        this.activeWorkers.delete(url);
        
        this.emit('url-failed', url, error, queuedUrl.attempts);
        this.updateProgress();
        
        this.checkQueueEmpty();
      }
    }
  }

  private checkQueueEmpty(): void {
    if (this.queue.length === 0 && this.activeWorkers.size === 0) {
      this.emit('queue-empty');
    }
  }

  private updateProgress(): void {
    const now = Date.now();
    if (now - this.lastProgressUpdate < this.progressUpdateInterval) {
      return;
    }
    
    this.lastProgressUpdate = now;
    const stats = this.getStats();
    this.emit('progress-update', stats);
  }

  getStats(): QueueStats {
    const total = this.queue.length + this.completed.length + this.failed.length;
    const pending = this.queue.filter(q => q.status === 'pending').length;
    const inProgress = this.queue.filter(q => q.status === 'in-progress').length;
    const completed = this.completed.length;
    const failed = this.failed.length;
    const retrying = this.queue.filter(q => q.status === 'retrying').length;
    const progress = total > 0 ? ((completed + failed) / total) * 100 : 0;
    
    // Berechne durchschnittliche Dauer
    const completedWithDuration = this.completed.filter(q => q.duration);
    const averageDuration = completedWithDuration.length > 0 
      ? completedWithDuration.reduce((sum, q) => sum + q.duration!, 0) / completedWithDuration.length 
      : 0;
    
    // Schätze verbleibende Zeit
    const remainingItems = pending + inProgress + retrying;
    const estimatedTimeRemaining = remainingItems > 0 && averageDuration > 0
      ? (remainingItems * averageDuration) / this.options.maxConcurrent!
      : 0;
    
    // System-Metriken (vereinfacht)
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB
    const cpuUsage = process.cpuUsage().user / 1000000; // Sekunden
    
    return {
      total,
      pending,
      inProgress,
      completed,
      failed,
      retrying,
      progress: Math.round(progress * 100) / 100,
      averageDuration: Math.round(averageDuration),
      estimatedTimeRemaining: Math.round(estimatedTimeRemaining),
      activeWorkers: this.activeWorkers.size,
      memoryUsage: Math.round(memoryUsage * 100) / 100,
      cpuUsage: Math.round(cpuUsage * 100) / 100
    };
  }

  private calculatePriority(url: string): number {
    const pattern = this.options.priorityPatterns!.find(p => url.includes(p.pattern));
    return pattern ? pattern.priority : 1;
  }

  /**
   * 🚀 Integrierte Parallel-Verarbeitung der Queue
   * Verarbeitet alle URLs parallel mit automatischer Status-Berichterstattung
   */
  async processUrls(urls: string[], options: ProcessOptions): Promise<any[]> {
    console.log(`🚀 Starte Queue-Verarbeitung für ${urls.length} URLs mit ${this.options.maxConcurrent} Workern`);
    
    this.addUrls(urls);
    this.startTime = new Date();
    
    // Starte Status-Updates
    if (this.options.enableShortStatus) {
      this.startStatusUpdates(options.onShortStatus);
    }

    const results: any[] = [];
    const promises: Promise<void>[] = [];

    // Erstelle Worker-Promises
    for (let i = 0; i < this.options.maxConcurrent!; i++) {
      promises.push(this.worker(i, options));
    }

    // Warte auf alle Worker
    await Promise.all(promises);

    // Stoppe Status-Updates
    this.stopStatusUpdates();

    // Sammle alle Ergebnisse
    results.push(...this.completed.map(q => q.result));
    
    const duration = Date.now() - this.startTime!.getTime();
    console.log(`✅ Queue-Verarbeitung abgeschlossen: ${this.completed.length}/${urls.length} URLs in ${duration}ms`);
    
    return results;
  }

  /**
   * 🔧 Worker-Funktion für parallele Verarbeitung
   */
  private async worker(workerId: number, options: ProcessOptions): Promise<void> {
    while (this.queue.length > 0 || this.activeWorkers.size > 0) {
      const queuedUrl = this.getNextUrl();
      
      if (!queuedUrl) {
        // Warte kurz wenn keine URLs verfügbar
        await new Promise(resolve => setTimeout(resolve, 100));
        continue;
      }

      try {
        const result = await options.processor(queuedUrl.url);
        this.markCompleted(queuedUrl.url, result);
        options.onResult?.(queuedUrl.url, result);
      } catch (error) {
        this.markFailed(queuedUrl.url, String(error));
        options.onError?.(queuedUrl.url, String(error));
      }
    }
  }

  /**
   * 📊 Startet kurze Status-Updates
   */
  private startStatusUpdates(onShortStatus?: (status: string) => void): void {
    this.statusInterval = setInterval(() => {
      const stats = this.getStats();
      const status = this.generateShortStatus(stats);
      
      this.emit('short-status', status);
      onShortStatus?.(status);
      this.options.eventCallbacks?.onShortStatus?.(status);
    }, this.options.statusUpdateInterval);
  }

  /**
   * ⏹️ Stoppt Status-Updates
   */
  private stopStatusUpdates(): void {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
      this.statusInterval = null;
    }
  }

  /**
   * 📝 Generiert kurze Status-Nachricht
   */
  private generateShortStatus(stats: QueueStats): string {
    const progress = Math.round(stats.progress);
    const workers = `${stats.activeWorkers}/${this.options.maxConcurrent}`;
    const memory = Math.round(stats.memoryUsage);
    const eta = stats.estimatedTimeRemaining > 0 ? `${Math.round(stats.estimatedTimeRemaining / 1000)}s` : '?';
    
    return `📊 ${progress}% | ${stats.completed}/${stats.total} | 🔧 ${workers} | 💾 ${memory}MB | ⏱️ ${eta}`;
  }

  // Public API für Event-Listener
  onUrlAdded(callback: (event: QueueEvent) => void): this {
    this.on('queue:urlAdded', callback);
    return this;
  }

  onUrlStarted(callback: (event: QueueEvent) => void): this {
    this.on('queue:urlStarted', callback);
    return this;
  }

  onUrlCompleted(callback: (event: QueueEvent) => void): this {
    this.on('queue:urlCompleted', callback);
    return this;
  }

  onUrlFailed(callback: (event: QueueEvent) => void): this {
    this.on('queue:urlFailed', callback);
    return this;
  }

  onUrlRetrying(callback: (event: QueueEvent) => void): this {
    this.on('queue:urlRetrying', callback);
    return this;
  }

  onQueueEmpty(callback: (event: QueueEvent) => void): this {
    this.on('queue:empty', callback);
    return this;
  }

  onProgressUpdate(callback: (event: QueueEvent) => void): this {
    this.on('queue:progressUpdate', callback);
    return this;
  }

  onError(callback: (event: QueueEvent) => void): this {
    this.on('queue:error', callback);
    return this;
  }

  // Utility-Methoden
  getCompletedResults(): any[] {
    return this.completed.map(q => q.result);
  }

  getFailedResults(): any[] {
    return this.failed.map(q => ({ url: q.url, error: q.error, attempts: q.attempts }));
  }

  clear(): void {
    this.queue = [];
    this.completed = [];
    this.failed = [];
    this.activeWorkers.clear();
    this.isProcessing = false;
    this.startTime = null;
  }

  pause(): void {
    this.isProcessing = false;
  }

  resume(): void {
    this.isProcessing = true;
  }

  isPaused(): boolean {
    return !this.isProcessing;
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  getActiveWorkers(): number {
    return this.activeWorkers.size;
  }

  getMaxConcurrent(): number {
    return this.options.maxConcurrent!;
  }

  setMaxConcurrent(max: number): void {
    this.options.maxConcurrent = max;
  }
} 