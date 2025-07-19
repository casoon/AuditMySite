# 🔌 AuditMySite API Documentation

## 📋 Overview

This document describes the API interfaces and integration points for AuditMySite. The framework provides both programmatic access and CLI interfaces for web accessibility testing.

## 🚀 Quick Start

### **Installation**
```bash
npm install auditmysite
```

### **Basic Usage**
```typescript
import { AccessibilityChecker } from 'auditmysite';

const checker = new AccessibilityChecker();
await checker.initialize();

const result = await checker.testPage('https://example.com', {
  timeout: 10000,
  verbose: false
});

console.log('Test result:', result.passed ? 'PASSED' : 'FAILED');
await checker.cleanup();
```

## 🔧 Core API

### **AccessibilityChecker Class**

The main testing engine that orchestrates accessibility testing.

#### **Constructor**
```typescript
new AccessibilityChecker()
```

#### **Methods**

##### **initialize(): Promise<void>**
Initializes the browser manager and testing environment.

```typescript
await checker.initialize();
```

##### **testPage(url: string, options?: TestOptions): Promise<AccessibilityResult>**
Tests a single page for accessibility issues.

```typescript
const result = await checker.testPage('https://example.com', {
  timeout: 10000,
  verbose: false,
  pa11yStandard: 'WCAG2AA',
  lighthouse: true
});
```

##### **testMultiplePages(urls: string[], options?: TestOptions): Promise<AccessibilityResult[]>**
Tests multiple pages sequentially.

```typescript
const urls = ['https://example.com', 'https://example.com/about'];
const results = await checker.testMultiplePages(urls, {
  maxPages: 10,
  timeout: 15000
});
```

##### **testMultiplePagesParallel(urls: string[], options?: TestOptions): Promise<AccessibilityResult[]>**
Tests multiple pages in parallel for better performance.

```typescript
const results = await checker.testMultiplePagesParallel(urls, {
  maxConcurrent: 3,
  maxRetries: 2,
  timeout: 10000
});
```

##### **cleanup(): Promise<void>**
Cleans up resources and closes browser instances.

```typescript
await checker.cleanup();
```

### **TestOptions Interface**

Configuration options for testing.

```typescript
interface TestOptions {
  // Basic options
  timeout?: number;                    // Timeout in milliseconds
  verbose?: boolean;                   // Enable verbose output
  maxPages?: number;                   // Maximum pages to test
  
  // Parallel testing
  maxConcurrent?: number;              // Maximum concurrent tests
  maxRetries?: number;                 // Number of retry attempts
  retryDelay?: number;                 // Delay between retries
  
  // Tool-specific options
  pa11yStandard?: string;              // WCAG2AA, WCAG2AAA, Section508
  lighthouse?: boolean;                // Enable Lighthouse testing
  collectPerformanceMetrics?: boolean; // Collect performance data
  
  // Browser options
  viewportSize?: { width: number; height: number };
  userAgent?: string;
  blockImages?: boolean;
  blockCSS?: boolean;
  
  // Output options
  captureScreenshots?: boolean;
  testKeyboardNavigation?: boolean;
  testColorContrast?: boolean;
  testFocusManagement?: boolean;
}
```

### **AccessibilityResult Interface**

The result of a single page test.

```typescript
interface AccessibilityResult {
  url: string;                         // Tested URL
  title: string;                       // Page title
  passed: boolean;                     // Overall test result
  duration: number;                    // Test duration in ms
  
  // Issue counts
  imagesWithoutAlt: number;
  buttonsWithoutLabel: number;
  headingsCount: number;
  
  // Issues
  errors: string[];                    // Critical issues
  warnings: string[];                  // Non-critical issues
  
  // Tool-specific results
  pa11yIssues?: Pa11yIssue[];
  pa11yScore?: number;
  lighthouseScores?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  lighthouseMetrics?: any;
  performanceMetrics?: any;
  
  // Screenshots
  screenshots?: {
    desktop?: string;
    mobile?: string;
  };
}
```

## 🧪 Test Framework API

### **BaseAccessibilityTest Class**

Base class for creating custom accessibility tests.

```typescript
import { BaseAccessibilityTest, TestContext, TestResult } from 'auditmysite/tests';

export class CustomTest extends BaseAccessibilityTest {
  name = 'Custom Test';
  description = 'Description of the test';
  category = 'custom';
  priority = 'high';
  standards = ['WCAG2AA'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    // Test implementation
    const result = await this.evaluateOnPage(page, () => {
      // Browser-side evaluation
      const issues = [];
      // ... test logic
      return { issues, count: issues.length };
    });

    return this.createResult(
      result.issues.length === 0,
      result.count,
      result.issues
    );
  }
}
```

### **TestManager Class**

Manages test execution and orchestration.

```typescript
import { TestManager } from 'auditmysite/tests';

const manager = new TestManager();
const results = await manager.runTests(url, {
  tests: [CustomTest, FormLabelTest],
  options: { timeout: 10000 }
});
```

## 📊 Report Generation API

### **Report Generators**

Generate different report formats.

```typescript
import { 
  HTMLReportGenerator, 
  JSONReportGenerator, 
  CSVReportGenerator 
} from 'auditmysite/generators';

// HTML Report
const htmlGenerator = new HTMLReportGenerator();
await htmlGenerator.generate(results, './reports/report.html');

// JSON Report
const jsonGenerator = new JSONReportGenerator();
await jsonGenerator.generate(results, './reports/report.json');

// CSV Report
const csvGenerator = new CSVReportGenerator();
await csvGenerator.generate(results, './reports/report.csv');
```

### **Custom Report Generation**

Create custom report formats.

```typescript
import { BaseReportGenerator } from 'auditmysite/generators';

export class CustomReportGenerator extends BaseReportGenerator {
  async generate(results: AccessibilityResult[], outputPath: string): Promise<void> {
    const content = this.formatResults(results);
    await fs.writeFile(outputPath, content);
  }

  private formatResults(results: AccessibilityResult[]): string {
    // Custom formatting logic
    return results.map(r => `${r.url}: ${r.passed ? 'PASS' : 'FAIL'}`).join('\n');
  }
}
```

## 🔄 Service Layer API

### **AccessibilityService Class**

High-level service for complete testing workflows.

```typescript
import { AccessibilityService } from 'auditmysite/services';

const service = new AccessibilityService();

// Test sitemap
const result = await service.testSitemap('https://example.com/sitemap.xml', {
  maxPages: 50,
  detailedReport: true,
  performanceReport: true,
  seoReport: true,
  securityReport: true
});

console.log('Success:', result.success);
console.log('Pages tested:', result.results.length);
```

### **ServiceResult Interface**

Result of a service-level operation.

```typescript
interface ServiceResult {
  success: boolean;
  results: AccessibilityResult[];
  summary: {
    totalPages: number;
    testedPages: number;
    passedPages: number;
    failedPages: number;
    successRate: number;
  };
  reports?: {
    detailed?: string;
    performance?: string;
    seo?: string;
    security?: string;
  };
}
```

## 🛠️ Configuration API

### **Configuration Management**

Load and manage configuration files.

```typescript
import { ConfigManager } from 'auditmysite/core';

const config = new ConfigManager();
await config.load('auditmysite.config.yml');

const options = config.getTestOptions();
const result = await checker.testPage(url, options);
```

### **Configuration File Format**

YAML configuration example:

```yaml
# auditmysite.config.yml
sitemap: https://example.com/sitemap.xml
maxPages: 50
timeout: 15000
outputDir: ./reports

standards:
  - WCAG2AA
  - Section508

performance:
  enabled: true
  lighthouse: true

security:
  enabled: true
  scanHeaders: true

reports:
  html: true
  json: true
  csv: true
  markdown: true
```

## 🔌 CLI Integration

### **Programmatic CLI Usage**

Execute CLI commands programmatically.

```typescript
import { spawn } from 'child_process';

const child = spawn('node', ['bin/audit.js', 'https://example.com/sitemap.xml'], {
  stdio: 'pipe'
});

child.stdout.on('data', (data) => {
  console.log('Output:', data.toString());
});

child.stderr.on('data', (data) => {
  console.error('Error:', data.toString());
});

child.on('close', (code) => {
  console.log('Exit code:', code);
});
```

### **Exit Codes**

```typescript
enum ExitCodes {
  SUCCESS = 0,           // All tests passed
  ERRORS_FOUND = 1,      // Issues found but not critical
  CRITICAL_ERRORS = 2,   // Critical issues found
  SYSTEM_ERROR = 3       // System/tool errors
}
```

## 🧪 Testing API

### **Mock Server Integration**

Use the built-in mock server for testing.

```typescript
import { MockServer } from 'auditmysite/test';

const server = new MockServer({ port: 3001 });
await server.start();

// Test against mock server
const result = await checker.testPage('http://localhost:3001/perfect-page');

await server.stop();
```

### **Test Utilities**

Utility functions for testing.

```typescript
import { 
  createTestContext, 
  mockPage, 
  generateTestResults 
} from 'auditmysite/test';

const context = createTestContext();
const page = mockPage();
const results = generateTestResults();
```

## 📈 Error Handling

### **Error Types**

```typescript
class AuditMySiteError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = 'AuditMySiteError';
  }
}

class NavigationError extends AuditMySiteError {
  constructor(url: string, reason: string) {
    super(`Failed to navigate to ${url}: ${reason}`, 'NAVIGATION_ERROR');
  }
}

class ToolError extends AuditMySiteError {
  constructor(tool: string, error: string) {
    super(`${tool} test failed: ${error}`, 'TOOL_ERROR');
  }
}
```

### **Error Handling Example**

```typescript
try {
  const result = await checker.testPage(url, options);
  console.log('Test completed successfully');
} catch (error) {
  if (error instanceof NavigationError) {
    console.error('Navigation failed:', error.message);
  } else if (error instanceof ToolError) {
    console.error('Tool error:', error.message);
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## 🔒 Security Considerations

### **Input Validation**

```typescript
import { validateUrl, sanitizeInput } from 'auditmysite/utils';

const url = validateUrl(inputUrl);
const sanitizedOptions = sanitizeInput(options);
```

### **Resource Limits**

```typescript
const options = {
  maxPages: 100,           // Limit pages tested
  timeout: 30000,          // Limit test duration
  maxConcurrent: 5,        // Limit concurrent tests
  maxMemoryUsage: 512      // Limit memory usage (MB)
};
```

---

*For more examples and advanced usage, see the [examples directory](../examples/).* 