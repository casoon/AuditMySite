import { EventEmitter } from 'events';

export interface ThrottleConfig {
  requestsPerSecond?: number;
  requestsPerMinute?: number;
  concurrentRequests?: number;
  delayBetweenRequests?: number; // ms
  burstLimit?: number;
  burstWindow?: number; // ms
  enableBackoff?: boolean;
  backoffMultiplier?: number;
  maxBackoffDelay?: number; // ms
}

export interface ThrottleStats {
  totalRequests: number;
  successfulRequests: number;
  throttledRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  currentConcurrentRequests: number;
  requestsInLastSecond: number;
  requestsInLastMinute: number;
  lastRequestTime?: Date;
  isThrottling: boolean;
}

export interface ThrottleRequest {
  id: string;
  url: string;
  method: string;
  timestamp: Date;
  priority: number;
  retryCount: number;
  maxRetries: number;
}

export class NetworkThrottler extends EventEmitter {
  private config: ThrottleConfig;
  private requestQueue: ThrottleRequest[] = [];
  private activeRequests: Map<string, ThrottleRequest> = new Map();
  private requestHistory: Array<{ timestamp: Date; success: boolean; responseTime: number }> = [];
  private stats: ThrottleStats;
  private isThrottling = false;
  private lastRequestTime = 0;
  private burstCount = 0;
  private burstStartTime = Date.now();
  private backoffDelay = 0;

  constructor(config: ThrottleConfig = {}) {
    super();
    this.config = {
      requestsPerSecond: 10,
      requestsPerMinute: 600,
      concurrentRequests: 5,
      delayBetweenRequests: 100,
      burstLimit: 20,
      burstWindow: 1000,
      enableBackoff: true,
      backoffMultiplier: 2,
      maxBackoffDelay: 5000,
      ...config
    };

    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      throttledRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      currentConcurrentRequests: 0,
      requestsInLastSecond: 0,
      requestsInLastMinute: 0,
      isThrottling: false
    };

    // Cleanup alte Request-Historie
    setInterval(() => this.cleanupHistory(), 60000); // Jede Minute
  }

  async throttleRequest<T>(
    requestFn: () => Promise<T>,
    url: string,
    method: string = 'GET',
    priority: number = 5,
    maxRetries: number = 3
  ): Promise<T> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const request: ThrottleRequest = {
      id: requestId,
      url,
      method,
      timestamp: new Date(),
      priority,
      retryCount: 0,
      maxRetries
    };

    // Request zur Queue hinzufügen
    this.addToQueue(request);

    // Warten bis Request ausgeführt werden kann
    await this.waitForSlot(request);

    try {
      // Request ausführen
      const startTime = Date.now();
      const result = await this.executeRequest(request, requestFn);
      const responseTime = Date.now() - startTime;

      // Statistiken aktualisieren
      this.updateStats(true, responseTime);
      this.recordRequestSuccess(responseTime);

      this.emit('request:success', { request, responseTime, timestamp: new Date() });
      return result;

    } catch (error) {
      // Retry-Logic
      if (request.retryCount < request.maxRetries) {
        request.retryCount++;
        console.warn(`🔄 Retrying request ${request.id} (attempt ${request.retryCount}/${request.maxRetries})`);
        
        // Backoff-Delay
        if (this.config.enableBackoff) {
          this.backoffDelay = Math.min(
            this.backoffDelay * this.config.backoffMultiplier!,
            this.config.maxBackoffDelay!
          );
          await this.delay(this.backoffDelay);
        }

        // Request erneut zur Queue hinzufügen
        this.addToQueue(request);
        return this.throttleRequest(requestFn, url, method, priority, maxRetries);
      }

      // Max Retries erreicht
      this.updateStats(false, 0);
      this.recordRequestFailure();

      this.emit('request:failed', { request, error: String(error), timestamp: new Date() });
      throw error;

    } finally {
      // Request aus aktiven Requests entfernen
      this.activeRequests.delete(requestId);
      this.stats.currentConcurrentRequests = this.activeRequests.size;
    }
  }

  private addToQueue(request: ThrottleRequest): void {
    this.requestQueue.push(request);
    
    // Nach Priorität sortieren (höchste zuerst)
    this.requestQueue.sort((a, b) => b.priority - a.priority);
    
    this.emit('request:queued', { request, timestamp: new Date() });
  }

  private async waitForSlot(request: ThrottleRequest): Promise<void> {
    return new Promise((resolve) => {
      const checkSlot = () => {
        if (this.canExecuteRequest()) {
          resolve();
        } else {
          // Kurz warten und erneut prüfen
          setTimeout(checkSlot, 50);
        }
      };
      checkSlot();
    });
  }

  private canExecuteRequest(): boolean {
    // Concurrent Requests Limit
    if (this.activeRequests.size >= this.config.concurrentRequests!) {
      return false;
    }

    // Rate Limiting
    const now = Date.now();
    
    // Requests pro Sekunde
    const requestsInLastSecond = this.requestHistory.filter(
      req => now - req.timestamp.getTime() < 1000
    ).length;
    
    if (requestsInLastSecond >= this.config.requestsPerSecond!) {
      return false;
    }

    // Requests pro Minute
    const requestsInLastMinute = this.requestHistory.filter(
      req => now - req.timestamp.getTime() < 60000
    ).length;
    
    if (requestsInLastMinute >= this.config.requestsPerMinute!) {
      return false;
    }

    // Burst Limiting
    if (this.burstCount >= this.config.burstLimit!) {
      const burstAge = now - this.burstStartTime;
      if (burstAge < this.config.burstWindow!) {
        return false;
      } else {
        // Burst Window reset
        this.burstCount = 0;
        this.burstStartTime = now;
      }
    }

    // Delay zwischen Requests
    if (now - this.lastRequestTime < this.config.delayBetweenRequests!) {
      return false;
    }

    return true;
  }

  private async executeRequest<T>(
    request: ThrottleRequest,
    requestFn: () => Promise<T>
  ): Promise<T> {
    // Request als aktiv markieren
    this.activeRequests.set(request.id, request);
    this.stats.currentConcurrentRequests = this.activeRequests.size;

    // Burst Counter erhöhen
    this.burstCount++;
    this.lastRequestTime = Date.now();

    // Request ausführen
    const result = await requestFn();

    // Backoff zurücksetzen bei Erfolg
    if (this.config.enableBackoff) {
      this.backoffDelay = 0;
    }

    return result;
  }

  private updateStats(success: boolean, responseTime: number): void {
    this.stats.totalRequests++;
    
    if (success) {
      this.stats.successfulRequests++;
    } else {
      this.stats.failedRequests++;
    }

    // Durchschnittliche Response-Zeit aktualisieren
    if (responseTime > 0) {
      const totalResponseTime = this.stats.averageResponseTime * (this.stats.successfulRequests - 1) + responseTime;
      this.stats.averageResponseTime = totalResponseTime / this.stats.successfulRequests;
    }

    // Aktuelle Request-Raten aktualisieren
    this.updateCurrentRates();
  }

  private updateCurrentRates(): void {
    const now = Date.now();
    
    this.stats.requestsInLastSecond = this.requestHistory.filter(
      req => now - req.timestamp.getTime() < 1000
    ).length;
    
    this.stats.requestsInLastMinute = this.requestHistory.filter(
      req => now - req.timestamp.getTime() < 60000
    ).length;
  }

  private recordRequestSuccess(responseTime: number): void {
    this.requestHistory.push({
      timestamp: new Date(),
      success: true,
      responseTime
    });
  }

  private recordRequestFailure(): void {
    this.requestHistory.push({
      timestamp: new Date(),
      success: false,
      responseTime: 0
    });
  }

  private cleanupHistory(): void {
    const cutoffTime = Date.now() - 60000; // Nur letzte Minute behalten
    this.requestHistory = this.requestHistory.filter(
      req => req.timestamp.getTime() > cutoffTime
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Public Methods
  getStats(): ThrottleStats {
    return { ...this.stats };
  }

  getQueueSize(): number {
    return this.requestQueue.length;
  }

  getActiveRequests(): number {
    return this.activeRequests.size;
  }

  getThrottlingStatus(): boolean {
    return this.isThrottling;
  }

  // Konfiguration ändern
  updateConfig(newConfig: Partial<ThrottleConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.emit('config:updated', { config: this.config, timestamp: new Date() });
  }

  // Queue Management
  clearQueue(): void {
    this.requestQueue = [];
    this.emit('queue:cleared', { timestamp: new Date() });
  }

  pauseThrottling(): void {
    this.isThrottling = true;
    this.stats.isThrottling = true;
    this.emit('throttling:paused', { timestamp: new Date() });
  }

  resumeThrottling(): void {
    this.isThrottling = false;
    this.stats.isThrottling = false;
    this.emit('throttling:resumed', { timestamp: new Date() });
  }

  // Utility Methods
  getConfig(): ThrottleConfig {
    return { ...this.config };
  }

  resetStats(): void {
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      throttledRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      currentConcurrentRequests: 0,
      requestsInLastSecond: 0,
      requestsInLastMinute: 0,
      isThrottling: false
    };
    this.requestHistory = [];
    this.emit('stats:reset', { timestamp: new Date() });
  }

  // Cleanup
  async cleanup(): Promise<void> {
    this.clearQueue();
    this.activeRequests.clear();
    this.requestHistory = [];
    this.resetStats();
    this.emit('throttler:cleanup', { timestamp: new Date() });
  }
} 