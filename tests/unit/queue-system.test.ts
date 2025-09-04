/**
 * 🧪 Queue System Unit Tests
 * 
 * Tests the unified queue system with focus on core business logic.
 * Fast, isolated tests without I/O operations.
 * 
 * TODO: Update imports for current architecture
 */

import { UnifiedQueue, QueueType } from '../../src/core/queue/unified-queue';
import { SimpleQueueAdapter } from '../../src/core/queue/adapters/simple-queue-adapter';
import { ParallelQueueAdapter } from '../../src/core/queue/adapters/parallel-queue-adapter';
import { QueueConfig, QueueProcessor } from '../../src/core/queue/types';

describe('UnifiedQueue', () => {
  let queue: UnifiedQueue;

  beforeEach(() => {
    queue = new UnifiedQueue();
  });

  describe('Queue Initialization', () => {
    it('should initialize with default parallel queue', () => {
      expect(queue.getType()).toBe('parallel');
    });

    it('should initialize with simple queue when configured', () => {
      const config: QueueConfig = {
        maxConcurrent: 1
      };
      
      queue = new UnifiedQueue('simple', config);
      expect(queue.getType()).toBe('simple');
    });

    it('should validate queue configuration', () => {
      expect(() => {
        new UnifiedQueue('parallel', { maxConcurrent: -1 });
      }).toThrow('Invalid queue configuration');
    });
  });

  describe('Queue Elements', () => {
    it('should add elements to queue', () => {
      const data = { url: 'https://example.com' };

      const ids = queue.enqueue([data]);
      expect(ids).toHaveLength(1);
      expect(queue.size()).toBe(1);
    });

    it('should handle multiple elements with different priorities', () => {
      const elements = [
        { url: 'https://example.com/low' },
        { url: 'https://example.com/high' },
        { url: 'https://example.com/medium' }
      ];

      const ids = queue.enqueue(elements);
      expect(ids).toHaveLength(3);
      expect(queue.size()).toBe(3);
    });

    it('should clear queue', () => {
      const data = { url: 'https://example.com' };
      queue.enqueue([data]);
      
      expect(queue.size()).toBe(1);
      queue.clear();
      expect(queue.size()).toBe(0);
    });
  });

  describe('Queue Processing', () => {
    it('should process elements in simple queue', async () => {
      queue = new UnifiedQueue('simple');
      const mockProcessor: QueueProcessor<any> = jest.fn().mockResolvedValue({ success: true });
      const elements = [
        { url: 'https://example.com/1' },
        { url: 'https://example.com/2' }
      ];

      queue.enqueue(elements);
      
      const result = await queue.process(mockProcessor);
      
      expect(mockProcessor).toHaveBeenCalledTimes(2);
      expect(result.completed).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should process elements in parallel queue', async () => {
      const config: QueueConfig = {
        maxConcurrent: 2
      };
      queue = new UnifiedQueue('parallel', config);
      
      const mockProcessor: QueueProcessor<any> = jest.fn()
        .mockImplementation(() => new Promise(resolve => 
          setTimeout(() => resolve({ success: true }), 10)
        ));

      const elements = [
        { url: 'https://example.com/1' },
        { url: 'https://example.com/2' },
        { url: 'https://example.com/3' }
      ];

      queue.enqueue(elements);
      
      const startTime = Date.now();
      const result = await queue.process(mockProcessor);
      const duration = Date.now() - startTime;
      
      expect(mockProcessor).toHaveBeenCalledTimes(3);
      expect(result.completed).toHaveLength(3);
      expect(result.failed).toHaveLength(0);
      // Should be faster than sequential processing (rough estimate)
      expect(duration).toBeLessThan(100);
    });

    it('should handle processing errors gracefully', async () => {
      const mockProcessor: QueueProcessor<any> = jest.fn()
        .mockResolvedValueOnce({ success: true })
        .mockRejectedValueOnce(new Error('Processing failed'))
        .mockResolvedValueOnce({ success: true });

      const elements = [
        { url: 'https://example.com/1' },
        { url: 'https://example.com/2' },
        { url: 'https://example.com/3' }
      ];

      queue.enqueue(elements);
      
      const result = await queue.process(mockProcessor);
      
      // With retry logic, failed items might end up in completed with error
      const totalProcessed = result.completed.length + result.failed.length;
      expect(totalProcessed).toBe(3);
      
      // Check that we have some failures (either in failed or completed with error)
      const hasFailures = result.failed.length > 0 || 
        result.completed.some(item => item.error);
      expect(hasFailures).toBe(true);
    });
  });

  describe('Progress Tracking', () => {
    it('should track queue statistics during processing', async () => {
      const mockProcessor: QueueProcessor<any> = jest.fn().mockResolvedValue({ success: true });
      
      const elements = [
        { url: 'https://example.com/1' },
        { url: 'https://example.com/2' },
        { url: 'https://example.com/3' }
      ];

      queue.enqueue(elements);
      
      const initialStats = queue.getStatistics();
      expect(initialStats.total).toBe(3);
      expect(initialStats.pending).toBe(3);
      
      await queue.process(mockProcessor);
      
      const finalStats = queue.getStatistics();
      expect(finalStats.completed).toBe(3);
      expect(finalStats.failed).toBe(0);
    });
  });
});

describe('SimpleQueueAdapter', () => {
  let adapter: SimpleQueueAdapter;

  beforeEach(() => {
    adapter = new SimpleQueueAdapter({ maxConcurrent: 1 });
  });

  it('should process elements sequentially', async () => {
    const mockProcessor: QueueProcessor<any> = jest.fn().mockResolvedValue({ success: true });
    const elements = [
      { url: 'https://example.com/1' },
      { url: 'https://example.com/2' }
    ];

    adapter.enqueue(elements);
    const result = await adapter.process(mockProcessor);
    
    expect(mockProcessor).toHaveBeenCalledTimes(2);
    expect(result.completed).toHaveLength(2);
  });

  it('should respect priority order', async () => {
    const processingOrder: string[] = [];
    const mockProcessor: QueueProcessor<any> = jest.fn().mockImplementation((data) => {
      processingOrder.push(data.url);
      return Promise.resolve({ success: true });
    });

    const elements = [
      { url: 'https://example.com/low' },
      { url: 'https://example.com/high' },
      { url: 'https://example.com/medium' }
    ];

    // Add with different priorities
    adapter.enqueue([elements[0]], { priority: 1 }); // low priority
    adapter.enqueue([elements[1]], { priority: 3 }); // high priority  
    adapter.enqueue([elements[2]], { priority: 2 }); // medium priority
    
    await adapter.process(mockProcessor);
    
    expect(processingOrder).toEqual([
      'https://example.com/high',
      'https://example.com/medium', 
      'https://example.com/low'
    ]);
  });
});

describe('ParallelQueueAdapter', () => {
  let adapter: ParallelQueueAdapter;

  beforeEach(() => {
    adapter = new ParallelQueueAdapter({ maxConcurrent: 2 });
  });

  it('should limit concurrent processing', async () => {
    let activeProcesses = 0;
    let maxConcurrent = 0;

    const mockProcessor: QueueProcessor<any> = jest.fn().mockImplementation(() => {
      activeProcesses++;
      maxConcurrent = Math.max(maxConcurrent, activeProcesses);
      
      return new Promise(resolve => {
        setTimeout(() => {
          activeProcesses--;
          resolve({ success: true });
        }, 10);
      });
    });

    const elements = Array.from({ length: 5 }, (_, i) => ({
      url: `https://example.com/${i}`
    }));

    adapter.enqueue(elements);
    await adapter.process(mockProcessor);
    
    expect(maxConcurrent).toBe(2); // Should not exceed concurrency limit
    expect(mockProcessor).toHaveBeenCalledTimes(5);
  });

  it('should handle mixed success and failure in parallel processing', async () => {
    const mockProcessor: QueueProcessor<any> = jest.fn()
      .mockResolvedValueOnce({ success: true })
      .mockRejectedValueOnce(new Error('Parallel failure'))
      .mockResolvedValueOnce({ success: true });

    const elements = [
      { url: 'https://example.com/1' },
      { url: 'https://example.com/2' },
      { url: 'https://example.com/3' }
    ];

    adapter.enqueue(elements);
    const result = await adapter.process(mockProcessor);
    
    // With retry logic, check total items processed
    const totalProcessed = result.completed.length + result.failed.length;
    expect(totalProcessed).toBe(3);
    
    // Check that we have failures (either in failed or completed with error)
    const hasFailures = result.failed.length > 0 || 
      result.completed.some(item => item.error);
    expect(hasFailures).toBe(true);
  });
});
