export interface PriorityItem<T = any> {
  id: string;
  data: T;
  priority: number;
  timestamp: Date;
  attempts: number;
  maxAttempts: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
  error?: string;
  result?: any;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
}

export interface PriorityQueueOptions {
  maxSize?: number;
  defaultPriority?: number;
  maxAttempts?: number;
  retryDelay?: number;
  enablePriorityBoost?: boolean;
  priorityBoostThreshold?: number; // Sekunden
  priorityBoostAmount?: number;
}

export interface QueueStats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  retrying: number;
  averagePriority: number;
  averageWaitTime: number;
  averageProcessingTime: number;
  oldestItem?: PriorityItem;
  newestItem?: PriorityItem;
}

export class PriorityQueue<T = any> {
  private queue: PriorityItem<T>[] = [];
  private processing: Set<string> = new Set();
  private completed: PriorityItem<T>[] = [];
  private failed: PriorityItem<T>[] = [];
  private options: PriorityQueueOptions;
  private itemIdCounter = 0;

  constructor(options: PriorityQueueOptions = {}) {
    this.options = {
      maxSize: 1000,
      defaultPriority: 5,
      maxAttempts: 3,
      retryDelay: 1000,
      enablePriorityBoost: true,
      priorityBoostThreshold: 30, // 30 Sekunden
      priorityBoostAmount: 2,
      ...options
    };
  }

  enqueue(data: T, priority?: number, id?: string): string {
    if (this.queue.length >= this.options.maxSize!) {
      throw new Error(`Queue is full (max size: ${this.options.maxSize})`);
    }

    const itemId = id || `item_${++this.itemIdCounter}`;
    const item: PriorityItem<T> = {
      id: itemId,
      data,
      priority: priority ?? this.options.defaultPriority!,
      timestamp: new Date(),
      attempts: 0,
      maxAttempts: this.options.maxAttempts!,
      status: 'pending'
    };

    this.queue.push(item);
    this.sortQueue();
    
    return itemId;
  }

  dequeue(): PriorityItem<T> | null {
    if (this.queue.length === 0) {
      return null;
    }

    // Priority Boost für alte Items
    if (this.options.enablePriorityBoost) {
      this.applyPriorityBoost();
    }

    const item = this.queue.shift()!;
    item.status = 'processing';
    item.startedAt = new Date();
    this.processing.add(item.id);

    return item;
  }

  peek(): PriorityItem<T> | null {
    if (this.queue.length === 0) {
      return null;
    }

    return this.queue[0];
  }

  complete(id: string, result?: any): boolean {
    const item = this.findItem(id);
    if (!item || item.status !== 'processing') {
      return false;
    }

    item.status = 'completed';
    item.result = result;
    item.completedAt = new Date();
    item.duration = item.completedAt.getTime() - item.startedAt!.getTime();

    this.processing.delete(id);
    this.completed.push(item);

    return true;
  }

  fail(id: string, error?: string): boolean {
    const item = this.findItem(id);
    if (!item || item.status !== 'processing') {
      return false;
    }

    item.attempts++;
    item.error = error;

    if (item.attempts >= item.maxAttempts) {
      item.status = 'failed';
      item.completedAt = new Date();
      item.duration = item.completedAt.getTime() - item.startedAt!.getTime();
      
      this.processing.delete(id);
      this.failed.push(item);
    } else {
      item.status = 'retrying';
      item.priority += this.options.priorityBoostAmount!; // Boost für Retry
      
      // Zurück in die Queue für Retry
      this.queue.push(item);
      this.sortQueue();
    }

    this.processing.delete(id);
    return true;
  }

  retry(id: string): boolean {
    const item = this.findItem(id);
    if (!item || item.status !== 'retrying') {
      return false;
    }

    item.status = 'pending';
    item.startedAt = undefined;
    item.completedAt = undefined;
    item.duration = undefined;

    this.sortQueue();
    return true;
  }

  remove(id: string): boolean {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    this.queue.splice(index, 1);
    this.processing.delete(id);
    return true;
  }

  clear(): void {
    this.queue = [];
    this.processing.clear();
    this.completed = [];
    this.failed = [];
  }

  getById(id: string): PriorityItem<T> | null {
    return this.findItem(id);
  }

  updatePriority(id: string, newPriority: number): boolean {
    const item = this.findItem(id);
    if (!item) {
      return false;
    }

    item.priority = newPriority;
    this.sortQueue();
    return true;
  }

  getStats(): QueueStats {
    const now = new Date();
    const total = this.queue.length + this.processing.size + this.completed.length + this.failed.length;
    
    const pending = this.queue.filter(item => item.status === 'pending').length;
    const processing = this.processing.size;
    const completed = this.completed.length;
    const failed = this.failed.length;
    const retrying = this.queue.filter(item => item.status === 'retrying').length;

    const allItems = [...this.queue, ...this.completed, ...this.failed];
    const averagePriority = allItems.length > 0 
      ? allItems.reduce((sum, item) => sum + item.priority, 0) / allItems.length 
      : 0;

    const averageWaitTime = this.completed.length > 0
      ? this.completed.reduce((sum, item) => sum + (item.startedAt!.getTime() - item.timestamp.getTime()), 0) / this.completed.length
      : 0;

    const averageProcessingTime = this.completed.length > 0
      ? this.completed.reduce((sum, item) => sum + (item.duration || 0), 0) / this.completed.length
      : 0;

    const oldestItem = this.queue.length > 0 ? this.queue[this.queue.length - 1] : undefined;
    const newestItem = this.queue.length > 0 ? this.queue[0] : undefined;

    return {
      total,
      pending,
      processing,
      completed,
      failed,
      retrying,
      averagePriority: Math.round(averagePriority * 100) / 100,
      averageWaitTime: Math.round(averageWaitTime),
      averageProcessingTime: Math.round(averageProcessingTime),
      oldestItem,
      newestItem
    };
  }

  getPendingItems(): PriorityItem<T>[] {
    return this.queue.filter(item => item.status === 'pending');
  }

  getProcessingItems(): PriorityItem<T>[] {
    return Array.from(this.processing).map(id => this.findItem(id)).filter(Boolean) as PriorityItem<T>[];
  }

  getCompletedItems(): PriorityItem<T>[] {
    return [...this.completed];
  }

  getFailedItems(): PriorityItem<T>[] {
    return [...this.failed];
  }

  getRetryingItems(): PriorityItem<T>[] {
    return this.queue.filter(item => item.status === 'retrying');
  }

  isEmpty(): boolean {
    return this.queue.length === 0 && this.processing.size === 0;
  }

  isFull(): boolean {
    return this.queue.length >= this.options.maxSize!;
  }

  size(): number {
    return this.queue.length;
  }

  processingSize(): number {
    return this.processing.size;
  }

  // Private Methods
  private findItem(id: string): PriorityItem<T> | null {
    // In Queue suchen
    const queueItem = this.queue.find(item => item.id === id);
    if (queueItem) return queueItem;

    // In Processing suchen
    if (this.processing.has(id)) {
      // Item ist in Processing, aber nicht mehr in Queue
      // Das sollte nicht passieren, aber zur Sicherheit
      return null;
    }

    // In Completed suchen
    const completedItem = this.completed.find(item => item.id === id);
    if (completedItem) return completedItem;

    // In Failed suchen
    const failedItem = this.failed.find(item => item.id === id);
    if (failedItem) return failedItem;

    return null;
  }

  private sortQueue(): void {
    this.queue.sort((a, b) => {
      // Höchste Priorität zuerst
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      
      // Bei gleicher Priorität: Ältestes zuerst (FIFO)
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
  }

  private applyPriorityBoost(): void {
    const now = new Date();
    const threshold = this.options.priorityBoostThreshold! * 1000; // zu Millisekunden

    this.queue.forEach(item => {
      const waitTime = now.getTime() - item.timestamp.getTime();
      if (waitTime > threshold && item.status === 'pending') {
        item.priority += this.options.priorityBoostAmount!;
      }
    });

    // Neu sortieren nach Boost
    this.sortQueue();
  }

  // Utility Methods
  getMaxSize(): number {
    return this.options.maxSize!;
  }

  setMaxSize(maxSize: number): void {
    this.options.maxSize = maxSize;
  }

  getDefaultPriority(): number {
    return this.options.defaultPriority!;
  }

  setDefaultPriority(priority: number): void {
    this.options.defaultPriority = priority;
  }

  getMaxAttempts(): number {
    return this.options.maxAttempts!;
  }

  setMaxAttempts(maxAttempts: number): void {
    this.options.maxAttempts = maxAttempts;
  }

  // Batch Operations
  enqueueBatch(items: Array<{ data: T; priority?: number; id?: string }>): string[] {
    const ids: string[] = [];
    
    for (const item of items) {
      try {
        const id = this.enqueue(item.data, item.priority, item.id);
        ids.push(id);
      } catch (error) {
        console.warn(`Failed to enqueue item: ${error}`);
      }
    }
    
    return ids;
  }

  dequeueBatch(count: number): PriorityItem<T>[] {
    const items: PriorityItem<T>[] = [];
    
    for (let i = 0; i < count && this.queue.length > 0; i++) {
      const item = this.dequeue();
      if (item) {
        items.push(item);
      }
    }
    
    return items;
  }
} 