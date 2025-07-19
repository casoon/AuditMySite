import { EventEmitter } from 'events';

export interface ResourceMetrics {
  memory: {
    used: number; // MB
    total: number; // MB
    percentage: number;
    heapUsed: number; // MB
    heapTotal: number; // MB
    external: number; // MB
  };
  cpu: {
    usage: number; // Prozent
    loadAverage: number[];
    uptime: number; // Sekunden
  };
  network: {
    activeConnections: number;
    bytesReceived: number;
    bytesSent: number;
    requestsPerSecond: number;
  };
  system: {
    uptime: number; // Sekunden
    platform: string;
    arch: string;
    nodeVersion: string;
  };
}

export interface ResourceLimits {
  maxMemoryUsage?: number; // MB
  maxCpuUsage?: number; // Prozent
  maxNetworkConnections?: number;
  maxRequestsPerSecond?: number;
}

export interface ResourceAlert {
  type: 'memory' | 'cpu' | 'network' | 'system';
  level: 'warning' | 'critical';
  message: string;
  value: number;
  limit: number;
  timestamp: Date;
}

export interface ResourceMonitorOptions {
  enabled?: boolean;
  interval?: number; // ms
  limits?: ResourceLimits;
  enableAlerts?: boolean;
  enableLogging?: boolean;
  enableThrottling?: boolean;
}

export class ResourceMonitor extends EventEmitter {
  private options: ResourceMonitorOptions;
  private isMonitoring = false;
  private intervalId: NodeJS.Timeout | null = null;
  private startTime: Date | null = null;
  private metrics: ResourceMetrics | null = null;
  private alerts: ResourceAlert[] = [];
  private networkStats = {
    activeConnections: 0,
    bytesReceived: 0,
    bytesSent: 0,
    requestsPerSecond: 0,
    lastRequestCount: 0,
    lastRequestTime: Date.now()
  };

  constructor(options: ResourceMonitorOptions = {}) {
    super();
    this.options = {
      enabled: true,
      interval: 1000, // 1 Sekunde
      limits: {
        maxMemoryUsage: 512, // 512 MB
        maxCpuUsage: 80, // 80%
        maxNetworkConnections: 100,
        maxRequestsPerSecond: 50
      },
      enableAlerts: true,
      enableLogging: true,
      enableThrottling: true,
      ...options
    };
  }

  async start(): Promise<void> {
    if (this.isMonitoring) {
      return;
    }

    this.isMonitoring = true;
    this.startTime = new Date();
    this.alerts = [];

    console.log('📊 Starting Resource Monitor...');

    this.intervalId = setInterval(() => {
      this.collectMetrics();
    }, this.options.interval);

    this.emit('monitor:started', { timestamp: new Date() });
  }

  stop(): void {
    if (!this.isMonitoring) {
      return;
    }

    this.isMonitoring = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    console.log('📊 Resource Monitor stopped');
    this.emit('monitor:stopped', { timestamp: new Date() });
  }

  private collectMetrics(): void {
    try {
      this.metrics = {
        memory: this.getMemoryMetrics(),
        cpu: this.getCpuMetrics(),
        network: this.getNetworkMetrics(),
        system: this.getSystemMetrics()
      };

      // Alerts prüfen
      if (this.options.enableAlerts) {
        this.checkAlerts();
      }

      // Event emittieren
      this.emit('metrics:collected', {
        metrics: this.metrics,
        timestamp: new Date()
      });

      // Logging
      if (this.options.enableLogging) {
        this.logMetrics();
      }

    } catch (error) {
      console.error('Error collecting metrics:', error);
      this.emit('monitor:error', { error: String(error), timestamp: new Date() });
    }
  }

  private getMemoryMetrics() {
    const memUsage = process.memoryUsage();
    const totalMem = require('os').totalmem() / 1024 / 1024; // MB
    const usedMem = totalMem - (require('os').freemem() / 1024 / 1024); // MB

    return {
      used: Math.round(usedMem),
      total: Math.round(totalMem),
      percentage: Math.round((usedMem / totalMem) * 100),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024)
    };
  }

  private getCpuMetrics() {
    const os = require('os');
    const cpus = os.cpus();
    
    // CPU Usage berechnen (vereinfacht)
    const totalIdle = cpus.reduce((sum: number, cpu: any) => sum + cpu.times.idle, 0);
    const totalTick = cpus.reduce((sum: number, cpu: any) => {
      return sum + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq;
    }, 0);
    
    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    const usage = Math.round(((total - idle) / total) * 100);

    return {
      usage,
      loadAverage: os.loadavg(),
      uptime: os.uptime()
    };
  }

  private getNetworkMetrics() {
    return {
      activeConnections: this.networkStats.activeConnections,
      bytesReceived: this.networkStats.bytesReceived,
      bytesSent: this.networkStats.bytesSent,
      requestsPerSecond: this.networkStats.requestsPerSecond
    };
  }

  private getSystemMetrics() {
    const os = require('os');
    
    return {
      uptime: os.uptime(),
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version
    };
  }

  private checkAlerts(): void {
    if (!this.metrics) return;

    const alerts: ResourceAlert[] = [];

    // Memory Alerts
    if (this.metrics.memory.percentage > this.options.limits!.maxMemoryUsage!) {
      alerts.push({
        type: 'memory',
        level: this.metrics.memory.percentage > 90 ? 'critical' : 'warning',
        message: `High memory usage: ${this.metrics.memory.percentage}%`,
        value: this.metrics.memory.percentage,
        limit: this.options.limits!.maxMemoryUsage!,
        timestamp: new Date()
      });
    }

    // CPU Alerts
    if (this.metrics.cpu.usage > this.options.limits!.maxCpuUsage!) {
      alerts.push({
        type: 'cpu',
        level: this.metrics.cpu.usage > 90 ? 'critical' : 'warning',
        message: `High CPU usage: ${this.metrics.cpu.usage}%`,
        value: this.metrics.cpu.usage,
        limit: this.options.limits!.maxCpuUsage!,
        timestamp: new Date()
      });
    }

    // Network Alerts
    if (this.metrics.network.activeConnections > this.options.limits!.maxNetworkConnections!) {
      alerts.push({
        type: 'network',
        level: 'warning',
        message: `High network connections: ${this.metrics.network.activeConnections}`,
        value: this.metrics.network.activeConnections,
        limit: this.options.limits!.maxNetworkConnections!,
        timestamp: new Date()
      });
    }

    if (this.metrics.network.requestsPerSecond > this.options.limits!.maxRequestsPerSecond!) {
      alerts.push({
        type: 'network',
        level: 'warning',
        message: `High request rate: ${this.metrics.network.requestsPerSecond} req/s`,
        value: this.metrics.network.requestsPerSecond,
        limit: this.options.limits!.maxRequestsPerSecond!,
        timestamp: new Date()
      });
    }

    // Neue Alerts hinzufügen
    this.alerts.push(...alerts);

    // Alerts emittieren
    alerts.forEach(alert => {
      this.emit('alert:triggered', alert);
      
      if (alert.level === 'critical') {
        console.error(`🚨 CRITICAL: ${alert.message}`);
      } else {
        console.warn(`⚠️ WARNING: ${alert.message}`);
      }
    });
  }

  private logMetrics(): void {
    if (!this.metrics) return;

    const { memory, cpu, network } = this.metrics;
    
    console.log(`📊 Resources: 💾 ${memory.percentage}% | 🔥 ${cpu.usage}% | 🌐 ${network.activeConnections} conn | 📡 ${network.requestsPerSecond.toFixed(1)} req/s`);
  }

  // Network Stats aktualisieren
  recordRequest(): void {
    this.networkStats.activeConnections++;
    this.networkStats.lastRequestCount++;
    
    const now = Date.now();
    const timeDiff = (now - this.networkStats.lastRequestTime) / 1000; // Sekunden
    
    if (timeDiff >= 1) {
      this.networkStats.requestsPerSecond = this.networkStats.lastRequestCount / timeDiff;
      this.networkStats.lastRequestCount = 0;
      this.networkStats.lastRequestTime = now;
    }
  }

  recordRequestComplete(): void {
    this.networkStats.activeConnections = Math.max(0, this.networkStats.activeConnections - 1);
  }

  recordNetworkTraffic(bytesReceived: number, bytesSent: number): void {
    this.networkStats.bytesReceived += bytesReceived;
    this.networkStats.bytesSent += bytesSent;
  }

  // Throttling basierend auf Ressourcen
  shouldThrottle(): boolean {
    if (!this.options.enableThrottling || !this.metrics) {
      return false;
    }

    return (
      this.metrics.memory.percentage > this.options.limits!.maxMemoryUsage! ||
      this.metrics.cpu.usage > this.options.limits!.maxCpuUsage! ||
      this.metrics.network.activeConnections > this.options.limits!.maxNetworkConnections!
    );
  }

  // Getter-Methoden
  getMetrics(): ResourceMetrics | null {
    return this.metrics;
  }

  getAlerts(): ResourceAlert[] {
    return this.alerts;
  }

  getCriticalAlerts(): ResourceAlert[] {
    return this.alerts.filter(alert => alert.level === 'critical');
  }

  getWarningAlerts(): ResourceAlert[] {
    return this.alerts.filter(alert => alert.level === 'warning');
  }

  getUptime(): number {
    if (!this.startTime) return 0;
    return Date.now() - this.startTime.getTime();
  }

  getMonitoringStatus(): boolean {
    return this.isMonitoring;
  }

  // Konfiguration ändern
  updateLimits(limits: Partial<ResourceLimits>): void {
    this.options.limits = { ...this.options.limits, ...limits };
  }

  updateInterval(interval: number): void {
    this.options.interval = interval;
    
    if (this.isMonitoring && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.collectMetrics();
      }, interval);
    }
  }

  // Cleanup
  async cleanup(): Promise<void> {
    this.stop();
    this.alerts = [];
    this.metrics = null;
    this.startTime = null;
  }
} 