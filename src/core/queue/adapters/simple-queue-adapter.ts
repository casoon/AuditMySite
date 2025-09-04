/**
 * 🔧 Simple Queue Adapter
 * 
 * Adapter for basic sequential queue processing.
 * Wraps the existing SimpleQueue implementation.
 */

import { QueueAdapter } from '../queue-adapter';
import { QueueItem, QueueConfig, QueueStatistics, QueueProcessor, QueueResult, QueueEventCallbacks } from '../types';

export class SimpleQueueAdapter<T = any> extends QueueAdapter<T> {
  private processingQueue: QueueItem<T>[] = [];
  private isPaused = false;

  constructor(config: QueueConfig, callbacks?: QueueEventCallbacks<T>) {
    super(config, callbacks);
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
      while (this.processingQueue.length > 0 && !this.isPaused) {
        const item = this.processingQueue.shift()!;
        
        // Update item status to processing
        this.updateItemStatus(item.id, 'processing');

        let attempts = 0;
        let success = false;

        while (attempts < item.maxAttempts && !success && !this.isPaused) {
          attempts++;
          item.attempts = attempts;

          try {
            // Process the item
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

        // Report progress
        if (this.config.enableProgressReporting) {
          this.callbacks?.onProgressUpdate?.(this.getStatistics());
        }
      }

      // Queue empty or paused
      if (this.processingQueue.length === 0) {
        this.callbacks?.onQueueEmpty?.();
      }

    } catch (error) {
      this.callbacks?.onError?.(error instanceof Error ? error.message : String(error));
    } finally {
      this.isProcessing = false;
      this.endTime = new Date();
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
    
    // Add simple queue specific stats
    return {
      ...baseStats,
      pending: this.processingQueue.filter(item => item.status === 'pending').length,
      processing: this.processingQueue.filter(item => item.status === 'processing').length
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
  }

  /**
   * Get pending items count
   */
  getPendingCount(): number {
    return this.processingQueue.filter(item => item.status === 'pending').length;
  }

  /**
   * Get queue size
   */
  size(): number {
    return this.processingQueue.length;
  }

  /**
   * Check if queue is empty
   */
  isEmpty(): boolean {
    return this.processingQueue.length === 0;
  }

  /**
   * Create timeout promise for processor timeout
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
}
