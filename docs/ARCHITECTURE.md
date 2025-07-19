# 🏗️ AuditMySite Architecture

## 📋 Overview

AuditMySite is a comprehensive web accessibility testing framework built with TypeScript and Node.js. It integrates multiple testing tools to provide thorough accessibility, performance, SEO, and security analysis.

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AuditMySite Framework                    │
├─────────────────────────────────────────────────────────────┤
│  CLI Interface (bin/audit.js)                              │
│  └── Command parsing & validation                          │
│  └── Configuration management                              │
│  └── Report orchestration                                  │
├─────────────────────────────────────────────────────────────┤
│  Core Services (src/core/)                                 │
│  ├── AccessibilityChecker                                  │
│  ├── BrowserManager                                        │
│  ├── LighthouseIntegration                                 │
│  ├── EventDrivenQueue                                      │
│  └── ParallelTestManager                                   │
├─────────────────────────────────────────────────────────────┤
│  Testing Tools Integration                                 │
│  ├── pa11y (Accessibility)                                 │
│  ├── Lighthouse (Performance)                              │
│  ├── Playwright (Browser Automation)                       │
│  └── Custom Tests (src/tests/)                             │
├─────────────────────────────────────────────────────────────┤
│  Data Processing (src/parsers/)                            │
│  ├── SitemapParser                                         │
│  └── URL filtering & validation                            │
├─────────────────────────────────────────────────────────────┤
│  Report Generation (src/generators/)                       │
│  ├── HTML Report Generator                                 │
│  ├── JSON Generator                                        │
│  ├── CSV Generator                                         │
│  └── Markdown Generator                                    │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Core Components

### **1. CLI Interface (`bin/audit.js`)**
- **Purpose**: Main entry point for user interaction
- **Responsibilities**:
  - Command-line argument parsing
  - Configuration loading
  - Test orchestration
  - Report generation
  - Exit code management

### **2. AccessibilityChecker (`src/core/accessibility-checker.ts`)**
- **Purpose**: Main testing engine
- **Responsibilities**:
  - Page testing orchestration
  - Tool integration (pa11y, Lighthouse, Playwright)
  - Result aggregation
  - Error handling and retry logic

### **3. BrowserManager (`src/core/browser-manager.ts`)**
- **Purpose**: Browser lifecycle management
- **Responsibilities**:
  - Browser instance management
  - Page creation and cleanup
  - Resource optimization
  - Cross-browser compatibility

### **4. EventDrivenQueue (`src/core/event-driven-queue.ts`)**
- **Purpose**: Parallel test execution
- **Responsibilities**:
  - URL queue management
  - Worker pool coordination
  - Progress tracking
  - Resource monitoring

### **5. LighthouseIntegration (`src/core/lighthouse-integration.ts`)**
- **Purpose**: Performance testing integration
- **Responsibilities**:
  - Lighthouse audit execution
  - Performance metrics collection
  - Score calculation
  - Report integration

## 🧪 Testing Framework

### **Test Categories (`src/tests/`)**
```
src/tests/
├── base-test.ts              # Base test class
├── test-manager.ts           # Test orchestration
├── aria/                     # ARIA testing
├── form/                     # Form accessibility
├── keyboard/                 # Keyboard navigation
├── language/                 # Internationalization
├── media/                    # Media accessibility
├── performance/              # Performance testing
├── semantic/                 # Semantic HTML
├── seo/                      # SEO testing
└── validation/               # Form validation
```

### **Test Structure**
```typescript
export abstract class BaseAccessibilityTest {
  abstract name: string;
  abstract description: string;
  abstract category: string;
  abstract priority: string;
  abstract standards: string[];

  abstract run(context: TestContext): Promise<TestResult>;
}
```

## 📊 Report Generation

### **Report Types**
- **HTML Reports**: Interactive web-based reports
- **JSON Reports**: Machine-readable data format
- **CSV Reports**: Spreadsheet-compatible format
- **Markdown Reports**: Documentation-friendly format

### **Report Structure**
```typescript
interface TestReport {
  metadata: {
    generatedAt: string;
    tool: string;
    version: string;
    summary: TestSummary;
  };
  results: TestResult[];
  statistics: TestStatistics;
  recommendations: Recommendation[];
}
```

## 🔄 Data Flow

### **1. Input Processing**
```
Sitemap URL → SitemapParser → URL List → Filtering → Test Queue
```

### **2. Test Execution**
```
Test Queue → EventDrivenQueue → AccessibilityChecker → Tool Integration → Results
```

### **3. Report Generation**
```
Results → Report Generators → Multiple Formats → Output Directory
```

## 🛠️ Tool Integration

### **pa11y Integration**
- **Purpose**: WCAG compliance testing
- **Integration**: Direct API calls
- **Output**: Accessibility issues and violations

### **Lighthouse Integration**
- **Purpose**: Performance and best practices
- **Integration**: Chrome DevTools Protocol
- **Output**: Performance scores and metrics

### **Playwright Integration**
- **Purpose**: Browser automation and testing
- **Integration**: Page object model
- **Output**: DOM analysis and interaction testing

## 📁 File Structure

```
AuditMySite/
├── bin/
│   └── audit.js                 # CLI entry point
├── src/
│   ├── core/                    # Core functionality
│   ├── generators/              # Report generation
│   ├── parsers/                 # Data parsing
│   ├── reports/                 # Report templates
│   ├── tests/                   # Test implementations
│   ├── types.ts                 # TypeScript definitions
│   └── index.ts                 # Main exports
├── test/
│   ├── mock-server/             # Test server
│   ├── test-suite.js            # Main test suite
│   ├── service-test-suite.js    # Service tests
│   └── run-tests.js             # Test runner
├── reports/                     # Generated reports
├── docs/                        # Documentation
└── package.json                 # Dependencies
```

## 🔧 Configuration

### **Configuration Sources**
1. **Command-line arguments** (highest priority)
2. **Configuration files** (YAML/JSON)
3. **Environment variables**
4. **Default values** (lowest priority)

### **Configuration Structure**
```typescript
interface TestOptions {
  maxPages?: number;
  timeout?: number;
  waitUntil?: string;
  verbose?: boolean;
  pa11yStandard?: string;
  lighthouse?: boolean;
  collectPerformanceMetrics?: boolean;
  // ... additional options
}
```

## 🚀 Performance Considerations

### **Parallelization**
- **Worker Pool**: Configurable number of concurrent tests
- **Resource Management**: Memory and CPU monitoring
- **Queue Management**: Intelligent URL prioritization

### **Caching**
- **Browser Reuse**: Shared browser instances
- **Result Caching**: Avoid re-testing unchanged pages
- **Resource Optimization**: Minimal network requests

### **Error Handling**
- **Graceful Failures**: Continue testing despite individual failures
- **Retry Logic**: Exponential backoff for transient errors
- **Recovery Options**: Multiple fallback strategies

## 🔒 Security Considerations

### **Input Validation**
- **URL Sanitization**: Prevent injection attacks
- **Configuration Validation**: Secure default settings
- **Resource Limits**: Prevent DoS attacks

### **Output Sanitization**
- **Report Sanitization**: Remove sensitive data
- **Error Masking**: Hide internal details
- **Access Control**: Secure report access

## 📈 Scalability

### **Horizontal Scaling**
- **Distributed Testing**: Multiple machines
- **Load Balancing**: Intelligent work distribution
- **Resource Pooling**: Shared browser instances

### **Vertical Scaling**
- **Memory Optimization**: Efficient resource usage
- **CPU Optimization**: Parallel processing
- **I/O Optimization**: Async operations

## 🔄 Maintenance

### **Code Quality**
- **TypeScript**: Type safety and better tooling
- **ESLint**: Code style and quality enforcement
- **Prettier**: Consistent code formatting
- **Jest**: Unit and integration testing

### **Documentation**
- **JSDoc**: Inline code documentation
- **README**: User and developer guides
- **API Documentation**: Integration guides
- **Architecture Docs**: System understanding

---

*Last updated: January 2025* 