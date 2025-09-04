/**
 * 🔧 Parallel Queue Adapter
 * 
 * Adapter for parallel queue processing with worker management.
 * Supports concurrent processing with configurable worker limits.
 */

import { QueueAdapter } from '../queue-adapter';
import { QueueItem, QueueConfig, QueueStatistics, QueueProcessor, QueueResult, QueueEventCallbacks } from '../types';

interface Worker<T> {
  id: string;
  isActive: boolean;
  currentItem?: QueueItem<T>;
  startTime?: Date;
}

export class ParallelQueueAdapter<T = any> extends QueueAdapter<T> {
  private processingQueue: QueueItem<T>[] = [];
  private workers: Map<string, Worker<T>> = new Map();
  private isPaused = false;
  private processingPromise?: Promise<QueueResult<T>>;

  constructor(config: QueueConfig, callbacks?: QueueEventCallbacks<T>) {
    super(config, callbacks);
    this.initializeWorkers();
  }

  enqueue(data: T[], options?: { priority?: number }): string[] {
    const ids: string[] = [];

    for (const item of data) {
      const queueItem = this.createQueueItem(item, options?.priority);
      this.processingQueue.push(queueItem);
      ids.push(queueItem.id);
    }

    // Sort by priority (highest first) and timestamp (oldest first)
    this.processingQueue.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.timestamp.getTime() - b.timestamp.getTime();
    });

    return ids;
  }

  async process(processor: QueueProcessor<T>): Promise<QueueResult<T>> {
    if (this.isProcessing) {
      throw new Error('Queue is already processing');
    }

    this.isProcessing = true;
    this.startTime = new Date();

    const completed: QueueItem<T>[] = [];
    const failed: QueueItem<T>[] = [];

    try {
      // Start worker processes
      const workerPromises: Promise<void>[] = [];
      
      for (const [workerId, worker] of this.workers) {
        workerPromises.push(this.runWorker(workerId, processor, completed, failed));
      }

      // Wait for all workers to complete
      await Promise.all(workerPromises);

      // Queue empty
      this.callbacks?.onQueueEmpty?.();

    } catch (error) {
      this.callbacks?.onError?.(error instanceof Error ? error.message : String(error));
    } finally {
      this.isProcessing = false;
      this.endTime = new Date();
      this.resetWorkers();
    }

    const statistics = this.getStatistics();
    const duration = this.endTime && this.startTime 
      ? this.endTime.getTime() - this.startTime.getTime() 
      : 0;

    return {
      completed,
      failed,
      statistics,
      duration
    };
  }

  getStatistics(): QueueStatistics {
    const baseStats = this.getBaseStatistics();
    
    // Add parallel queue specific stats
    const activeWorkers = Array.from(this.workers.values()).filter(w => w.isActive).length;
    
    return {
      ...baseStats,
      pending: this.processingQueue.filter(item => item.status === 'pending').length,
      processing: this.processingQueue.filter(item => item.status === 'processing').length,
      activeWorkers
    };
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  clear(): void {
    this.processingQueue = [];
    this.items.clear();
    this.isPaused = false;
    this.isProcessing = false;
    this.startTime = undefined;
    this.endTime = undefined;
    this.resetWorkers();
  }

  configure(config: Partial<QueueConfig>): void {
    super.configure(config);
    
    // Reinitialize workers if maxConcurrent changed
    if (config.maxConcurrent && config.maxConcurrent !== this.workers.size) {
      this.initializeWorkers();
    }
  }

  /**
   * Initialize worker pool
   */
  private initializeWorkers(): void {
    this.workers.clear();
    const workerCount = this.config.maxConcurrent || 3;

    for (let i = 0; i < workerCount; i++) {
      const workerId = `worker_${i}`;
      this.workers.set(workerId, {
        id: workerId,
        isActive: false
      });
    }
  }

  /**
   * Reset all workers
   */
  private resetWorkers(): void {
    for (const worker of this.workers.values()) {
      worker.isActive = false;
      worker.currentItem = undefined;
      worker.startTime = undefined;
    }
  }

  /**
   * Get next pending item from queue
   */
  private getNextItem(): QueueItem<T> | null {
    const index = this.processingQueue.findIndex(item => item.status === 'pending');
    if (index === -1) return null;

    const item = this.processingQueue[index];
    return item;
  }

  /**
   * Run individual worker
   */
  private async runWorker(
    workerId: string, 
    processor: QueueProcessor<T>, 
    completed: QueueItem<T>[], 
    failed: QueueItem<T>[]
  ): Promise<void> {
    const worker = this.workers.get(workerId)!;

    while (!this.isPaused && (this.processingQueue.some(item => item.status === 'pending') || 
           this.processingQueue.some(item => item.status === 'retrying'))) {
      
      const item = this.getNextItem();
      if (!item) {
        // No items available, wait a bit
        await this.delay(100);
        continue;
      }

      // Assign item to worker
      worker.isActive = true;
      worker.currentItem = item;
      worker.startTime = new Date();

      // Update item status to processing
      this.updateItemStatus(item.id, 'processing');

      let attempts = 0;
      let success = false;

      while (attempts < item.maxAttempts && !success && !this.isPaused) {
        attempts++;
        item.attempts = attempts;

        try {
          // Process the item with timeout
          const result = await Promise.race([
            processor(item.data),
            this.createTimeoutPromise()
          ]);

          // Success
          this.updateItemStatus(item.id, 'completed', { result });
          completed.push(item);
          success = true;

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          
          if (attempts < item.maxAttempts) {
            // Retry after delay
            this.updateItemStatus(item.id, 'retrying', { error: errorMessage });
            await this.delay(this.config.retryDelay || 1000);
          } else {
            // Max attempts reached
            this.updateItemStatus(item.id, 'failed', { error: errorMessage });
            failed.push(item);
          }
        }
      }

      // Worker finished with item
      worker.isActive = false;
      worker.currentItem = undefined;
      worker.startTime = undefined;

      // Report progress
      if (this.config.enableProgressReporting) {
        this.callbacks?.onProgressUpdate?.(this.getStatistics());
      }
    }
  }

  /**
   * Create timeout promise
   */
  private createTimeoutPromise(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Processing timeout after ${this.config.timeout}ms`));
      }, this.config.timeout || 10000);
    });
  }

  /**
   * Simple delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get worker information
   */
  getWorkerInfo(): Array<{ id: string; isActive: boolean; currentItem?: string }> {
    return Array.from(this.workers.values()).map(worker => ({
      id: worker.id,
      isActive: worker.isActive,
      currentItem: worker.currentItem?.id
    }));
  }

  /**
   * Get active worker count
   */
  getActiveWorkerCount(): number {
    return Array.from(this.workers.values()).filter(w => w.isActive).length;
  }
}
