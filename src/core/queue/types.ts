/**
 * 🔧 Unified Queue Types
 * 
 * Common interfaces and types for the unified queue system.
 * This consolidates all queue functionality into a consistent API.
 */

export interface QueueItem<T = any> {
  id: string;
  data: T;
  priority: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
  attempts: number;
  maxAttempts: number;
  timestamp: Date;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
  error?: string;
  result?: any;
}

export interface QueueConfig {
  maxConcurrent?: number;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  priorityPatterns?: PriorityPattern[];
  enablePersistence?: boolean;
  enableEvents?: boolean;
  enableProgressReporting?: boolean;
  progressUpdateInterval?: number;
}

export interface PriorityPattern {
  pattern: string;
  priority: number;
}

export interface QueueStatistics {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  retrying: number;
  progress: number;
  averageDuration: number;
  estimatedTimeRemaining: number;
  activeWorkers: number;
  memoryUsage: number;
  cpuUsage: number;
  throughput: number; // items/second
  startTime?: Date;
  endTime?: Date;
}

export interface QueueProcessor<T, R = any> {
  (item: T): Promise<R>;
}

export interface QueueResult<T> {
  completed: QueueItem<T>[];
  failed: QueueItem<T>[];
  statistics: QueueStatistics;
  duration: number;
}

export interface QueueEventCallbacks<T = any> {
  onItemAdded?: (item: QueueItem<T>) => void;
  onItemStarted?: (item: QueueItem<T>) => void;
  onItemCompleted?: (item: QueueItem<T>, result: any) => void;
  onItemFailed?: (item: QueueItem<T>, error: string) => void;
  onItemRetrying?: (item: QueueItem<T>) => void;
  onProgressUpdate?: (statistics: QueueStatistics) => void;
  onQueueEmpty?: () => void;
  onError?: (error: string) => void;
}

export type QueueType = 'simple' | 'priority' | 'persistent' | 'parallel';

export interface QueueAdapterOptions {
  config: QueueConfig;
  callbacks?: QueueEventCallbacks;
}
