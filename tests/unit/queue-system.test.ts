/**
 * 🧪 Queue System Unit Tests
 * 
 * Tests the unified queue system with focus on core business logic.
 * Fast, isolated tests without I/O operations.
 */

import { UnifiedQueue, QueueType } from '../../src/queues/unified/unified-queue';
import { SimpleQueueAdapter } from '../../src/queues/unified/adapters/simple-queue-adapter';
import { ParallelQueueAdapter } from '../../src/queues/unified/adapters/parallel-queue-adapter';
import { QueueElementType, QueueConfig } from '../../src/queues/unified/types';

describe('UnifiedQueue', () => {
  let queue: UnifiedQueue;

  beforeEach(() => {
    queue = new UnifiedQueue();
  });

  describe('Queue Initialization', () => {
    it('should initialize with default simple queue', () => {
      expect(queue.getQueueType()).toBe(QueueType.SIMPLE);
    });

    it('should initialize with parallel queue when configured', () => {
      const config: QueueConfig = {
        type: QueueType.PARALLEL,
        concurrency: 3
      };
      
      queue = new UnifiedQueue(config);
      expect(queue.getQueueType()).toBe(QueueType.PARALLEL);
    });

    it('should validate concurrency limits for parallel queue', () => {
      expect(() => {
        new UnifiedQueue({ type: QueueType.PARALLEL, concurrency: 0 });
      }).toThrow('Concurrency must be between 1 and 10');

      expect(() => {
        new UnifiedQueue({ type: QueueType.PARALLEL, concurrency: 15 });
      }).toThrow('Concurrency must be between 1 and 10');
    });
  });

  describe('Queue Elements', () => {
    it('should add elements to queue', () => {
      const element = {
        id: 'test-1',
        type: QueueElementType.URL,
        data: { url: 'https://example.com' },
        priority: 1
      };

      queue.add(element);
      expect(queue.size()).toBe(1);
    });

    it('should handle multiple elements with different priorities', () => {
      const elements = [
        { id: '1', type: QueueElementType.URL, data: { url: 'https://example.com/low' }, priority: 3 },
        { id: '2', type: QueueElementType.URL, data: { url: 'https://example.com/high' }, priority: 1 },
        { id: '3', type: QueueElementType.URL, data: { url: 'https://example.com/medium' }, priority: 2 }
      ];

      elements.forEach(el => queue.add(el));
      expect(queue.size()).toBe(3);
    });

    it('should clear queue', () => {
      queue.add({
        id: 'test',
        type: QueueElementType.URL,
        data: { url: 'https://example.com' },
        priority: 1
      });
      
      expect(queue.size()).toBe(1);
      queue.clear();
      expect(queue.size()).toBe(0);
    });
  });

  describe('Queue Processing', () => {
    it('should process elements in simple queue', async () => {
      const mockProcessor = jest.fn().mockResolvedValue({ success: true });
      const elements = [
        { id: '1', type: QueueElementType.URL, data: { url: 'https://example.com/1' }, priority: 1 },
        { id: '2', type: QueueElementType.URL, data: { url: 'https://example.com/2' }, priority: 1 }
      ];

      elements.forEach(el => queue.add(el));
      
      const results = await queue.processAll(mockProcessor);
      
      expect(mockProcessor).toHaveBeenCalledTimes(2);
      expect(results).toHaveLength(2);
      expect(results.every(r => r.success)).toBe(true);
    });

    it('should process elements in parallel queue', async () => {
      const config: QueueConfig = {
        type: QueueType.PARALLEL,
        concurrency: 2
      };
      queue = new UnifiedQueue(config);
      
      const mockProcessor = jest.fn()
        .mockImplementation(() => new Promise(resolve => 
          setTimeout(() => resolve({ success: true }), 10)
        ));

      const elements = [
        { id: '1', type: QueueElementType.URL, data: { url: 'https://example.com/1' }, priority: 1 },
        { id: '2', type: QueueElementType.URL, data: { url: 'https://example.com/2' }, priority: 1 },
        { id: '3', type: QueueElementType.URL, data: { url: 'https://example.com/3' }, priority: 1 }
      ];

      elements.forEach(el => queue.add(el));
      
      const startTime = Date.now();
      const results = await queue.processAll(mockProcessor);
      const duration = Date.now() - startTime;
      
      expect(mockProcessor).toHaveBeenCalledTimes(3);
      expect(results).toHaveLength(3);
      // Should be faster than sequential processing (rough estimate)
      expect(duration).toBeLessThan(50);
    });

    it('should handle processing errors gracefully', async () => {
      const mockProcessor = jest.fn()
        .mockResolvedValueOnce({ success: true })
        .mockRejectedValueOnce(new Error('Processing failed'))
        .mockResolvedValueOnce({ success: true });

      const elements = [
        { id: '1', type: QueueElementType.URL, data: { url: 'https://example.com/1' }, priority: 1 },
        { id: '2', type: QueueElementType.URL, data: { url: 'https://example.com/2' }, priority: 1 },
        { id: '3', type: QueueElementType.URL, data: { url: 'https://example.com/3' }, priority: 1 }
      ];

      elements.forEach(el => queue.add(el));
      
      const results = await queue.processAll(mockProcessor);
      
      expect(results).toHaveLength(3);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
      expect(results[1].error).toBe('Processing failed');
      expect(results[2].success).toBe(true);
    });
  });

  describe('Progress Tracking', () => {
    it('should call progress callback during processing', async () => {
      const mockProcessor = jest.fn().mockResolvedValue({ success: true });
      const progressCallback = jest.fn();
      
      const elements = [
        { id: '1', type: QueueElementType.URL, data: { url: 'https://example.com/1' }, priority: 1 },
        { id: '2', type: QueueElementType.URL, data: { url: 'https://example.com/2' }, priority: 1 },
        { id: '3', type: QueueElementType.URL, data: { url: 'https://example.com/3' }, priority: 1 }
      ];

      elements.forEach(el => queue.add(el));
      
      await queue.processAll(mockProcessor, progressCallback);
      
      // Progress should be called for each completed item
      expect(progressCallback).toHaveBeenCalledTimes(3);
      
      // Check progress values
      expect(progressCallback).toHaveBeenNthCalledWith(1, 1, 3);
      expect(progressCallback).toHaveBeenNthCalledWith(2, 2, 3);
      expect(progressCallback).toHaveBeenNthCalledWith(3, 3, 3);
    });
  });
});

describe('SimpleQueueAdapter', () => {
  let adapter: SimpleQueueAdapter;

  beforeEach(() => {
    adapter = new SimpleQueueAdapter();
  });

  it('should process elements sequentially', async () => {
    const mockProcessor = jest.fn().mockResolvedValue({ success: true });
    const elements = [
      { id: '1', type: QueueElementType.URL, data: { url: 'https://example.com/1' }, priority: 1 },
      { id: '2', type: QueueElementType.URL, data: { url: 'https://example.com/2' }, priority: 1 }
    ];

    const results = await adapter.processAll(elements, mockProcessor);
    
    expect(mockProcessor).toHaveBeenCalledTimes(2);
    expect(results).toHaveLength(2);
  });

  it('should respect priority order', async () => {
    const processingOrder: string[] = [];
    const mockProcessor = jest.fn().mockImplementation((element) => {
      processingOrder.push(element.id);
      return Promise.resolve({ success: true });
    });

    const elements = [
      { id: 'low', type: QueueElementType.URL, data: { url: 'https://example.com/low' }, priority: 3 },
      { id: 'high', type: QueueElementType.URL, data: { url: 'https://example.com/high' }, priority: 1 },
      { id: 'medium', type: QueueElementType.URL, data: { url: 'https://example.com/medium' }, priority: 2 }
    ];

    await adapter.processAll(elements, mockProcessor);
    
    expect(processingOrder).toEqual(['high', 'medium', 'low']);
  });
});

describe('ParallelQueueAdapter', () => {
  let adapter: ParallelQueueAdapter;

  beforeEach(() => {
    adapter = new ParallelQueueAdapter({ concurrency: 2 });
  });

  it('should limit concurrent processing', async () => {
    let activeProcesses = 0;
    let maxConcurrent = 0;

    const mockProcessor = jest.fn().mockImplementation(() => {
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
      id: `test-${i}`,
      type: QueueElementType.URL,
      data: { url: `https://example.com/${i}` },
      priority: 1
    }));

    await adapter.processAll(elements, mockProcessor);
    
    expect(maxConcurrent).toBe(2); // Should not exceed concurrency limit
    expect(mockProcessor).toHaveBeenCalledTimes(5);
  });

  it('should handle mixed success and failure in parallel processing', async () => {
    const mockProcessor = jest.fn()
      .mockResolvedValueOnce({ success: true })
      .mockRejectedValueOnce(new Error('Parallel failure'))
      .mockResolvedValueOnce({ success: true });

    const elements = [
      { id: '1', type: QueueElementType.URL, data: { url: 'https://example.com/1' }, priority: 1 },
      { id: '2', type: QueueElementType.URL, data: { url: 'https://example.com/2' }, priority: 1 },
      { id: '3', type: QueueElementType.URL, data: { url: 'https://example.com/3' }, priority: 1 }
    ];

    const results = await adapter.processAll(elements, mockProcessor);
    
    expect(results).toHaveLength(3);
    expect(results.filter(r => r.success)).toHaveLength(2);
    expect(results.filter(r => !r.success)).toHaveLength(1);
  });
});
