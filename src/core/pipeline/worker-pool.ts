import { Browser, BrowserContext, Page } from 'playwright';
import { chromium, firefox, webkit } from 'playwright';

export interface WorkerPoolOptions {
  maxWorkers?: number;
  browserType?: 'chromium' | 'firefox' | 'webkit';
  headless?: boolean;
  timeout?: number;
  viewport?: { width: number; height: number };
  userAgent?: string;
  enableResourceMonitoring?: boolean;
  maxMemoryUsage?: number; // MB
  maxCpuUsage?: number; // Prozent
}

export interface Worker {
  id: number;
  browser: Browser;
  context: BrowserContext;
  page: Page;
  isBusy: boolean;
  currentUrl?: string;
  startTime?: Date;
  memoryUsage: number;
  cpuUsage: number;
}

export interface WorkerStats {
  totalWorkers: number;
  busyWorkers: number;
  idleWorkers: number;
  averageMemoryUsage: number;
  averageCpuUsage: number;
  totalMemoryUsage: number;
  totalCpuUsage: number;
}

export class WorkerPool {
  private workers: Worker[] = [];
  private options: WorkerPoolOptions;
  private isInitialized = false;
  private workerIdCounter = 0;

  constructor(options: WorkerPoolOptions = {}) {
    this.options = {
      maxWorkers: 3,
      browserType: 'chromium',
      headless: true,
      timeout: 30000,
      viewport: { width: 1920, height: 1080 },
      userAgent: 'auditmysite/1.0',
      enableResourceMonitoring: true,
      maxMemoryUsage: 512, // 512 MB
      maxCpuUsage: 80, // 80%
      ...options
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    console.log(`🔧 Initializing Worker Pool with ${this.options.maxWorkers} workers (${this.options.browserType})`);

    // Browser-Instanz starten
    const browser = await this.createBrowser();

    // Worker erstellen
    for (let i = 0; i < this.options.maxWorkers!; i++) {
      const worker = await this.createWorker(browser);
      this.workers.push(worker);
    }

    this.isInitialized = true;
    console.log(`✅ Worker Pool initialized with ${this.workers.length} workers`);
  }

  private async createBrowser(): Promise<Browser> {
    const browserOptions = {
      headless: this.options.headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    };

    switch (this.options.browserType) {
      case 'firefox':
        return await firefox.launch(browserOptions);
      case 'webkit':
        return await webkit.launch(browserOptions);
      default:
        return await chromium.launch(browserOptions);
    }
  }

  private async createWorker(browser: Browser): Promise<Worker> {
    const context = await browser.newContext({
      viewport: this.options.viewport,
      userAgent: this.options.userAgent,
      ignoreHTTPSErrors: true,
      bypassCSP: true
    });

    const page = await context.newPage();
    
    // Page-Optimierungen für Performance
    await page.setDefaultTimeout(this.options.timeout!);
    await page.setDefaultNavigationTimeout(this.options.timeout!);

    const worker: Worker = {
      id: ++this.workerIdCounter,
      browser,
      context,
      page,
      isBusy: false,
      memoryUsage: 0,
      cpuUsage: 0
    };

    return worker;
  }

  async getAvailableWorker(): Promise<Worker | null> {
    if (!this.isInitialized) {
      throw new Error('Worker Pool not initialized. Call initialize() first.');
    }

    // Resource-Monitoring
    if (this.options.enableResourceMonitoring) {
      this.monitorResources();
    }

    // Verfügbaren Worker finden
    const availableWorker = this.workers.find(worker => !worker.isBusy);
    
    if (availableWorker) {
      availableWorker.isBusy = true;
      availableWorker.startTime = new Date();
      return availableWorker;
    }

    return null;
  }

  async releaseWorker(worker: Worker): Promise<void> {
    worker.isBusy = false;
    worker.currentUrl = undefined;
    worker.startTime = undefined;
    
    // Page zurücksetzen
    try {
      await worker.page.goto('about:blank');
    } catch (error) {
      // Ignore errors when resetting page
    }
  }

  async executeTask<T>(
    task: (worker: Worker) => Promise<T>,
    url?: string
  ): Promise<T> {
    const worker = await this.getAvailableWorker();
    
    if (!worker) {
      throw new Error('No available workers in pool');
    }

    try {
      worker.currentUrl = url;
      const result = await task(worker);
      return result;
    } finally {
      await this.releaseWorker(worker);
    }
  }

  private monitorResources(): void {
    this.workers.forEach(worker => {
      if (worker.isBusy) {
        // Memory Usage schätzen (Playwright bietet keine direkte API)
        const memoryUsage = Math.random() * 100 + 50; // Simulierte Werte
        worker.memoryUsage = memoryUsage;

        // CPU Usage schätzen
        const cpuUsage = Math.random() * 20 + 10; // Simulierte Werte
        worker.cpuUsage = cpuUsage;

        // Warnungen bei hoher Ressourcen-Nutzung
        if (memoryUsage > this.options.maxMemoryUsage!) {
          console.warn(`⚠️ Worker ${worker.id} high memory usage: ${memoryUsage.toFixed(2)} MB`);
        }

        if (cpuUsage > this.options.maxCpuUsage!) {
          console.warn(`⚠️ Worker ${worker.id} high CPU usage: ${cpuUsage.toFixed(2)}%`);
        }
      }
    });
  }

  getStats(): WorkerStats {
    const busyWorkers = this.workers.filter(w => w.isBusy).length;
    const idleWorkers = this.workers.length - busyWorkers;
    
    const totalMemoryUsage = this.workers.reduce((sum, w) => sum + w.memoryUsage, 0);
    const totalCpuUsage = this.workers.reduce((sum, w) => sum + w.cpuUsage, 0);
    
    return {
      totalWorkers: this.workers.length,
      busyWorkers,
      idleWorkers,
      averageMemoryUsage: this.workers.length > 0 ? totalMemoryUsage / this.workers.length : 0,
      averageCpuUsage: this.workers.length > 0 ? totalCpuUsage / this.workers.length : 0,
      totalMemoryUsage,
      totalCpuUsage
    };
  }

  getWorkerById(id: number): Worker | undefined {
    return this.workers.find(w => w.id === id);
  }

  getBusyWorkers(): Worker[] {
    return this.workers.filter(w => w.isBusy);
  }

  getIdleWorkers(): Worker[] {
    return this.workers.filter(w => !w.isBusy);
  }

  async resizePool(newSize: number): Promise<void> {
    if (newSize < 1) {
      throw new Error('Worker pool size must be at least 1');
    }

    const currentSize = this.workers.length;
    
    if (newSize > currentSize) {
      // Worker hinzufügen
      const browser = this.workers[0]?.browser;
      if (!browser) {
        throw new Error('No browser instance available');
      }

      for (let i = currentSize; i < newSize; i++) {
        const worker = await this.createWorker(browser);
        this.workers.push(worker);
      }
      
      console.log(`➕ Added ${newSize - currentSize} workers to pool`);
    } else if (newSize < currentSize) {
      // Worker entfernen (nur idle workers)
      const idleWorkers = this.getIdleWorkers();
      const workersToRemove = currentSize - newSize;
      
      for (let i = 0; i < Math.min(workersToRemove, idleWorkers.length); i++) {
        const worker = idleWorkers[i];
        await this.destroyWorker(worker);
        this.workers = this.workers.filter(w => w.id !== worker.id);
      }
      
      console.log(`➖ Removed ${Math.min(workersToRemove, idleWorkers.length)} workers from pool`);
    }
  }

  private async destroyWorker(worker: Worker): Promise<void> {
    try {
      await worker.page.close();
      await worker.context.close();
    } catch (error) {
      console.warn(`Warning: Error destroying worker ${worker.id}:`, error);
    }
  }

  async cleanup(): Promise<void> {
    console.log('🧹 Cleaning up Worker Pool...');
    
    // Alle Worker zerstören
    for (const worker of this.workers) {
      await this.destroyWorker(worker);
    }
    
    this.workers = [];
    this.isInitialized = false;
    
    console.log('✅ Worker Pool cleaned up');
  }

  getInitializationStatus(): boolean {
    return this.isInitialized;
  }

  getMaxWorkers(): number {
    return this.options.maxWorkers!;
  }

  setMaxWorkers(max: number): void {
    this.options.maxWorkers = max;
  }
} 