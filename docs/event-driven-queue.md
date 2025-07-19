# Event-Driven Queue System

## 📋 Übersicht

Das Event-Driven Queue System ermöglicht **parallele Accessibility-Tests** mit **Echtzeit-Status-Reporting** über Events. Es bietet eine moderne, skalierbare Architektur für das Testen großer Websites mit mehreren hundert Seiten.

## 🎯 Hauptfunktionen

### **🔄 Parallele Verarbeitung**
- **Konfigurierbare Worker-Anzahl** (1-10+ parallele Tests)
- **Intelligente Queue-Verwaltung** mit Prioritäten
- **Automatische Retry-Logik** für fehlgeschlagene Tests

### **📊 Echtzeit-Status-Reporting**
- **Event-basierte Kommunikation** für Live-Updates
- **Progress-Tracking** mit ETA-Berechnung
- **Resource-Monitoring** (Memory, CPU)
- **Detaillierte Statistiken** und Metriken

### **⚡ Performance-Optimierung**
- **10x Geschwindigkeitsverbesserung** bei Parallelisierung
- **Resource-Management** mit Limits
- **Intelligente Throttling** für Server-Schonung

## 🏗️ Architektur

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Event-Driven  │    │   Parallel Test  │    │  Accessibility  │
│      Queue      │◄──►│     Manager      │◄──►│    Checker      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Event System  │    │   Worker Pool    │    │   Browser Pool  │
│   (Node.js)     │    │   (Concurrent)   │    │   (Playwright)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Verwendung

### **Grundlegende Verwendung**

```typescript
import { ParallelTestManager } from '../src/core/parallel-test-manager';

// Konfiguration
const options = {
  maxConcurrent: 3,        // 3 parallele Worker
  maxRetries: 2,           // 2 Retry-Versuche
  retryDelay: 2000,        // 2 Sekunden zwischen Retries
  enableProgressBar: true, // Live Progress-Bar
  enableResourceMonitoring: true
};

// Manager initialisieren
const testManager = new ParallelTestManager(options);
await testManager.initialize();

// Tests ausführen
const urls = ['http://example.com/', 'http://example.com/about'];
const result = await testManager.runTests(urls);

// Ergebnisse verarbeiten
console.log(`Completed: ${result.results.length}`);
console.log(`Duration: ${result.duration}ms`);
```

### **Event-Listener für Custom-Logging**

```typescript
const testManager = new ParallelTestManager({
  maxConcurrent: 3,
  eventCallbacks: {
    onTestStart: (url: string) => {
      console.log(`🚀 Starting: ${url}`);
    },
    
    onTestComplete: (url: string, result: any) => {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${url} - ${result.errors.length} errors`);
    },
    
    onProgressUpdate: (stats: QueueStats) => {
      console.log(`📊 Progress: ${stats.progress.toFixed(1)}% | Memory: ${stats.memoryUsage}MB`);
    }
  }
});
```

### **Erweiterte Event-Listener**

```typescript
// Direkte Event-Listener auf der Queue
testManager['queue'].onUrlAdded((event) => {
  console.log(`📋 Added: ${event.data.url} (priority: ${event.data.priority})`);
});

testManager['queue'].onUrlStarted((event) => {
  console.log(`🚀 Started: ${event.data.url}`);
});

testManager['queue'].onUrlCompleted((event) => {
  console.log(`✅ Completed: ${event.data.url} (${event.data.duration}ms)`);
});

testManager['queue'].onUrlFailed((event) => {
  console.log(`💥 Failed: ${event.data.url} (attempt ${event.data.attempts})`);
});

testManager['queue'].onProgressUpdate((event) => {
  const stats = event.data.stats;
  console.log(`📊 Progress: ${stats.progress.toFixed(1)}% | Workers: ${stats.activeWorkers}`);
});

testManager['queue'].onQueueEmpty(() => {
  console.log('🎉 All tests completed!');
});
```

## 📊 Event-Typen

### **Queue Events**

| Event | Beschreibung | Daten |
|-------|-------------|-------|
| `url-added` | URL zur Queue hinzugefügt | `{ url, priority, timestamp }` |
| `url-started` | Test gestartet | `{ url, timestamp }` |
| `url-completed` | Test abgeschlossen | `{ url, result, duration, timestamp }` |
| `url-failed` | Test fehlgeschlagen | `{ url, error, attempts, timestamp }` |
| `url-retrying` | Test wird wiederholt | `{ url, attempts, timestamp }` |
| `queue-empty` | Queue ist leer | `{ timestamp }` |
| `progress-update` | Progress-Update | `{ stats, timestamp }` |
| `error` | Queue-Fehler | `{ error, timestamp }` |

### **Queue Statistics**

```typescript
interface QueueStats {
  total: number;              // Gesamtanzahl URLs
  pending: number;            // Wartende URLs
  inProgress: number;         // Aktive Tests
  completed: number;          // Abgeschlossene Tests
  failed: number;             // Fehlgeschlagene Tests
  retrying: number;           // Wiederholungsversuche
  progress: number;           // Fortschritt in %
  averageDuration: number;    // Durchschnittliche Dauer
  estimatedTimeRemaining: number; // Geschätzte Restzeit
  activeWorkers: number;      // Aktive Worker
  memoryUsage: number;        // Memory-Verbrauch (MB)
  cpuUsage: number;           // CPU-Verbrauch (s)
}
```

## ⚙️ Konfiguration

### **EventDrivenQueueOptions**

```typescript
interface EventDrivenQueueOptions {
  maxRetries?: number;        // Max. Retry-Versuche (Default: 3)
  maxConcurrent?: number;     // Parallele Worker (Default: 1)
  priorityPatterns?: Array<{  // URL-Prioritäten
    pattern: string;
    priority: number;
  }>;
  retryDelay?: number;        // Retry-Delay in ms (Default: 1000)
  enableEvents?: boolean;     // Events aktivieren (Default: true)
  eventCallbacks?: {          // Event-Callbacks
    onUrlAdded?: (url: string, priority: number) => void;
    onUrlStarted?: (url: string) => void;
    onUrlCompleted?: (url: string, result: any, duration: number) => void;
    onUrlFailed?: (url: string, error: string, attempts: number) => void;
    onUrlRetrying?: (url: string, attempts: number) => void;
    onQueueEmpty?: () => void;
    onProgressUpdate?: (stats: QueueStats) => void;
    onError?: (error: string) => void;
  };
}
```

### **ParallelTestManagerOptions**

```typescript
interface ParallelTestManagerOptions extends EventDrivenQueueOptions {
  testOptions?: TestOptions;           // Accessibility-Test-Optionen
  enableProgressBar?: boolean;         // Progress-Bar (Default: true)
  progressUpdateInterval?: number;     // Update-Interval (Default: 1000ms)
  enableResourceMonitoring?: boolean;  // Resource-Monitoring (Default: true)
  maxMemoryUsage?: number;             // Max. Memory (Default: 512MB)
  maxCpuUsage?: number;                // Max. CPU (Default: 80%)
}
```

## 🎯 Prioritäts-System

### **URL-Prioritäten**

```typescript
const priorityPatterns = [
  { pattern: '/home', priority: 10 },    // Höchste Priorität
  { pattern: '/', priority: 9 },
  { pattern: '/about', priority: 8 },
  { pattern: '/contact', priority: 7 },
  { pattern: '/blog', priority: 6 },
  { pattern: '/privacy', priority: 5 }   // Niedrigste Priorität
];
```

### **Automatische Priorisierung**

- **Homepage** wird zuerst getestet
- **Wichtige Seiten** (About, Contact) folgen
- **Blog/Content-Seiten** haben niedrigere Priorität
- **Rechtliche Seiten** werden zuletzt getestet

## 🔄 Retry-Logik

### **Automatische Wiederholung**

```typescript
// Konfiguration
const options = {
  maxRetries: 3,        // Max. 3 Versuche
  retryDelay: 2000      // 2 Sekunden warten
};

// Retry-Verhalten
// 1. Test fehlschlägt → Status: 'retrying'
// 2. 2 Sekunden warten → Status: 'pending'
// 3. Test wird wiederholt
// 4. Nach 3 Versuchen → Status: 'failed'
```

### **Retry-Events**

```typescript
testManager['queue'].onUrlRetrying((event) => {
  console.log(`🔄 Retrying ${event.data.url} (attempt ${event.data.attempts})`);
});

testManager['queue'].onUrlFailed((event) => {
  console.log(`💥 Failed ${event.data.url} after ${event.data.attempts} attempts`);
});
```

## 💾 Resource-Management

### **Memory-Monitoring**

```typescript
const options = {
  enableResourceMonitoring: true,
  maxMemoryUsage: 512,  // 512 MB Limit
  onProgressUpdate: (stats) => {
    if (stats.memoryUsage > 400) {
      console.warn(`⚠️  High memory usage: ${stats.memoryUsage}MB`);
    }
  }
};
```

### **CPU-Monitoring**

```typescript
const options = {
  enableResourceMonitoring: true,
  maxCpuUsage: 80,      // 80% CPU Limit
  onProgressUpdate: (stats) => {
    if (stats.cpuUsage > 60) {
      console.warn(`⚠️  High CPU usage: ${stats.cpuUsage}s`);
    }
  }
};
```

## 📈 Performance-Metriken

### **Geschwindigkeitsverbesserung**

```typescript
// Sequenziell: 100 URLs × 5 Sekunden = 500 Sekunden
// Parallel (3 Worker): 100 URLs × 5 Sekunden ÷ 3 = 167 Sekunden
// Geschwindigkeitsverbesserung: 3x

// Bei 5 Workern: 100 Sekunden (5x schneller)
// Bei 10 Workern: 50 Sekunden (10x schneller)
```

### **Throughput-Berechnung**

```typescript
const result = await testManager.runTests(urls);
const throughput = urls.length / (result.duration / 1000);
console.log(`Throughput: ${throughput.toFixed(1)} URLs/second`);
```

## 🎨 Progress-Bar

### **Live Progress-Anzeige**

```
🧪 Progress: [████████████████████░░░░░░░░░░] 60% | 6/10 | Workers: 3/3 | Memory: 245MB | ETA: 45s
```

### **Custom Progress-Handling**

```typescript
const options = {
  enableProgressBar: false,  // Standard Progress-Bar deaktivieren
  onProgressUpdate: (stats) => {
    // Custom Progress-Logging
    const bar = '█'.repeat(Math.floor(stats.progress / 3.33)) + '░'.repeat(30 - Math.floor(stats.progress / 3.33));
    console.log(`[${bar}] ${stats.progress.toFixed(1)}% | ${stats.completed}/${stats.total}`);
  }
};
```

## 🔧 API-Referenz

### **EventDrivenQueue**

```typescript
class EventDrivenQueue extends EventEmitter {
  // Konstruktor
  constructor(options?: EventDrivenQueueOptions);
  
  // Queue-Management
  addUrls(urls: string[]): void;
  getNextUrl(): QueuedUrl | null;
  markCompleted(url: string, result: any): void;
  markFailed(url: string, error: string): void;
  
  // Statistiken
  getStats(): QueueStats;
  getCompletedResults(): any[];
  getFailedResults(): any[];
  
  // Kontrolle
  clear(): void;
  pause(): void;
  resume(): void;
  isPaused(): boolean;
  
  // Event-Listener
  onUrlAdded(callback: (event: QueueEvent) => void): this;
  onUrlStarted(callback: (event: QueueEvent) => void): this;
  onUrlCompleted(callback: (event: QueueEvent) => void): this;
  onUrlFailed(callback: (event: QueueEvent) => void): this;
  onUrlRetrying(callback: (event: QueueEvent) => void): this;
  onQueueEmpty(callback: (event: QueueEvent) => void): this;
  onProgressUpdate(callback: (event: QueueEvent) => void): this;
  onError(callback: (event: QueueEvent) => void): this;
}
```

### **ParallelTestManager**

```typescript
class ParallelTestManager {
  // Konstruktor
  constructor(options?: ParallelTestManagerOptions);
  
  // Lifecycle
  initialize(): Promise<void>;
  runTests(urls: string[]): Promise<ParallelTestResult>;
  cleanup(): Promise<void>;
  
  // Kontrolle
  pause(): void;
  resume(): void;
  stop(): void;
  
  // Status
  getStats(): QueueStats;
  getActiveTests(): number;
  getQueueSize(): number;
  getMemoryUsage(): number;
  getCpuUsage(): number;
  
  // Konfiguration
  setMaxConcurrent(max: number): void;
}
```

## 🚀 Best Practices

### **1. Worker-Anzahl optimieren**

```typescript
// Für kleine Websites (1-50 Seiten)
const options = { maxConcurrent: 2 };

// Für mittlere Websites (50-200 Seiten)
const options = { maxConcurrent: 3 };

// Für große Websites (200+ Seiten)
const options = { maxConcurrent: 5 };
```

### **2. Resource-Limits setzen**

```typescript
const options = {
  enableResourceMonitoring: true,
  maxMemoryUsage: 512,  // 512 MB
  maxCpuUsage: 80,      // 80%
  onProgressUpdate: (stats) => {
    if (stats.memoryUsage > 400) {
      console.warn('High memory usage detected');
    }
  }
};
```

### **3. Retry-Strategie**

```typescript
const options = {
  maxRetries: 2,        // Nicht zu viele Retries
  retryDelay: 2000,     // Ausreichend Wartezeit
  onUrlRetrying: (url, attempts) => {
    console.log(`Retrying ${url} (attempt ${attempts})`);
  }
};
```

### **4. Event-Handling**

```typescript
// Wichtige Events abfangen
testManager['queue'].onError((event) => {
  console.error('Queue error:', event.data.error);
  // Optional: Tests stoppen oder neu starten
});

testManager['queue'].onQueueEmpty(() => {
  console.log('All tests completed successfully');
  // Optional: Cleanup oder nächste Aktion
});
```

## 🎯 Vorteile

### **Performance**
- **10x Geschwindigkeitsverbesserung** bei Parallelisierung
- **Skalierbare Architektur** für große Websites
- **Intelligente Resource-Nutzung**

### **Zuverlässigkeit**
- **Automatische Retry-Logik** für robuste Tests
- **Event-basierte Fehlerbehandlung**
- **Resource-Monitoring** für Stabilität

### **Flexibilität**
- **Konfigurierbare Worker-Anzahl**
- **Custom Event-Handling**
- **Prioritäts-basierte Verarbeitung**

### **Monitoring**
- **Echtzeit-Status-Updates**
- **Detaillierte Statistiken**
- **Progress-Tracking mit ETA**

---

*Das Event-Driven Queue System macht parallele Accessibility-Tests einfach, schnell und zuverlässig! 🚀* 