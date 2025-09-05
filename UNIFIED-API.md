# 🎯 AuditMySite Unified API - Single Source of Truth

This document describes the unified data structures and API interfaces that serve as the **single source of truth** for all AuditMySite components.

## 🌟 Core Principle

**ALL** parts of AuditMySite use the SAME data structures:

- ✅ CLI tool
- ✅ Node.js SDK
- ✅ REST API server
- ✅ Report generators (HTML, Markdown, JSON, CSV)
- ✅ External integrations

**No duplicate types!** Everything is defined once in `/src/reports/types/report-export.ts`

## 📚 Quick Start

### Node.js SDK Usage

```typescript
import { AuditMySiteSDK, AuditRequest } from '@casoon/auditmysite';

const sdk = new AuditMySiteSDK();

// Define audit request using unified types
const request: AuditRequest = {
  url: 'https://example.com/sitemap.xml',
  options: {
    maxPages: 20,
    collectPerformanceMetrics: true,
    outputFormats: ['html', 'json']
  }
};

// Execute audit with progress tracking
const response = await sdk.audit(request, (progress) => {
  console.log(`${progress.step}: ${progress.progress}% - ${progress.message}`);
});

// Response is guaranteed to follow UnifiedReportExport structure
if (response.status === 'success') {
  console.log(`Domain: ${response.report.metadata.domain}`);
  console.log(`Success Rate: ${response.report.summary.successRate}%`);
  console.log(`Generated Files:`, response.files);
}
```

### CLI Usage

```bash
# CLI internally uses the same SDK and types
npx @casoon/auditmysite https://example.com \
  --max-pages 20 \
  --performance \
  --output-format html,json
```

### API Server Usage

```typescript
// The API server uses the same types for requests/responses
import { AuditRequest, AuditResponse } from '@casoon/auditmysite';

app.post('/api/audit', async (req, res) => {
  const request: AuditRequest = req.body;
  const sdk = new AuditMySiteSDK();
  const response: AuditResponse = await sdk.audit(request);
  res.json(response);
});
```

## 📋 Data Structure Overview

### Main Export Interface

```typescript
interface UnifiedReportExport {
  metadata: ReportMetadata;     // When, how, where the audit was run
  summary: ReportSummary;       // High-level statistics
  pages: PageResult[];          // Individual page results  
  recommendations: ReportRecommendation[]; // Actionable insights
}
```

### Report Metadata

```typescript
interface ReportMetadata {
  timestamp: string;            // ISO timestamp
  version: string;              // AuditMySite version
  duration: number;             // Generation time in ms
  domain: string;               // Target domain
  sourceUrl?: string;           // Sitemap/source URL
  config: ReportConfig;         // Audit configuration used
}
```

### Summary Statistics

```typescript
interface ReportSummary {
  totalPages: number;           // Pages discovered
  testedPages: number;          // Pages actually tested
  passedPages: number;          // Pages without errors
  failedPages: number;          // Pages with accessibility issues
  crashedPages: number;         // Pages that failed to load
  totalErrors: number;          // Sum of all errors
  totalWarnings: number;        // Sum of all warnings
  totalDuration: number;        // Total test time
  successRate: number;          // Percentage (0-100)
  avgAccessibilityScore: number; // Average Pa11y score
  avgPerformanceScore?: number; // Average performance score
}
```

### Individual Page Results

```typescript
interface PageResult {
  url: string;                  // Page URL
  title?: string;               // Page title
  status: 'passed' | 'failed' | 'crashed'; // Test result
  duration: number;             // Test time for this page
  errors: string[];             // Accessibility errors
  warnings: string[];           // Accessibility warnings
  issues?: PageIssues;          // Detailed analysis
  performanceMetrics?: PerformanceMetrics; // Performance data
  screenshots?: Screenshots;    // Screenshot paths
}
```

## 🔌 Integration Examples

### Custom Report Generator

```typescript
import { UnifiedReportExport, ReportExportValidator } from '@casoon/auditmysite';

class CustomReportGenerator {
  generate(report: UnifiedReportExport): string {
    // Validate the data structure
    if (!ReportExportValidator.validateExport(report)) {
      throw new Error('Invalid report data');
    }

    // Use helper functions for consistent formatting
    const successRate = ReportExportValidator.formatPercentage(report.summary.successRate);
    const duration = ReportExportValidator.formatDuration(report.metadata.duration);

    return `
# ${report.metadata.domain} Audit Report

Generated: ${report.metadata.timestamp}
Success Rate: ${successRate}
Duration: ${duration}

## Pages Tested: ${report.summary.testedPages}
${report.pages.map(page => 
  `- ${ReportExportValidator.getPageName(page.url)}: ${page.status}`
).join('\n')}

## Recommendations: ${report.recommendations.length}
${report.recommendations.map(rec => 
  `- [${rec.priority.toUpperCase()}] ${rec.title}`
).join('\n')}
    `;
  }
}
```

### External API Integration

```typescript
import { auditSDK, AuditRequest } from '@casoon/auditmysite';

// Third-party service integration
class AccessibilityService {
  async auditWebsite(url: string) {
    const request: AuditRequest = {
      url,
      options: {
        maxPages: 50,
        collectPerformanceMetrics: true,
        captureScreenshots: true
      }
    };

    const response = await auditSDK.audit(request);
    
    // Store result in your database using the standardized structure
    await this.database.storeAuditResult({
      domain: response.report.metadata.domain,
      timestamp: response.report.metadata.timestamp,
      summary: response.report.summary,
      pages: response.report.pages,
      recommendations: response.report.recommendations
    });

    return response;
  }
}
```

## 🚀 Advanced Features

### Progress Tracking

```typescript
const response = await sdk.audit(request, (progress) => {
  switch (progress.step) {
    case 'discovering':
      console.log('🔍 Finding pages...');
      break;
    case 'testing':
      console.log(`⚡ Testing ${progress.currentPage}...`);
      break;
    case 'generating':
      console.log('📄 Creating reports...');
      break;
    case 'completed':
      console.log('✅ Audit complete!');
      break;
  }
});
```

### Streaming Results

```typescript
// For real-time updates in web interfaces
const eventStream = sdk.auditStream(request);

eventStream.on('progress', (progress: AuditProgress) => {
  websocket.send(JSON.stringify({ type: 'progress', data: progress }));
});

eventStream.on('complete', (report: UnifiedReportExport) => {
  websocket.send(JSON.stringify({ type: 'complete', data: report }));
});
```

### Error Handling

```typescript
const response = await sdk.audit(request);

if (response.status === 'error') {
  const error = response.error!;
  console.error(`Audit failed [${error.code}]: ${error.message}`);
  
  // Error reports still follow the unified structure
  console.log('Error report pages:', response.report.pages.length);
  console.log('Error recommendations:', response.report.recommendations);
}
```

## 📊 Report Format Examples

### JSON Export

```json
{
  "metadata": {
    "timestamp": "2025-01-05T11:00:00Z",
    "version": "1.8.3",
    "domain": "example.com",
    "duration": 45000,
    "config": {
      "maxPages": 20,
      "pa11yStandard": "WCAG2AA",
      "collectPerformanceMetrics": true
    }
  },
  "summary": {
    "totalPages": 20,
    "testedPages": 18,
    "passedPages": 15,
    "failedPages": 3,
    "successRate": 83,
    "avgAccessibilityScore": 87
  },
  "pages": [...],
  "recommendations": [...]
}
```

### Minimal Export

```json
{
  "domain": "example.com",
  "timestamp": "2025-01-05T11:00:00Z",
  "summary": {
    "successRate": 83,
    "totalPages": 20,
    "totalErrors": 12,
    "avgScore": 87
  },
  "recommendations": 5
}
```

## 🛠️ Development Guidelines

### Adding New Features

1. **Update Types First**: Add new fields to `/src/reports/types/report-export.ts`
2. **Update Exporter**: Modify `/src/reports/exporters/unified-export.ts`
3. **Update Validators**: Add validation in `ReportExportValidator`
4. **Update SDK**: Add new functionality to `/src/sdk/unified-audit-sdk.ts`
5. **Update Generators**: Modify HTML/Markdown generators to use new data

### Backwards Compatibility

- All changes MUST be backwards compatible
- Use optional fields (`field?: type`) for new properties
- Never remove existing fields without major version bump
- Deprecated fields should be marked with `@deprecated` comments

### Testing

```typescript
import { ReportExportValidator } from '@casoon/auditmysite';

// Test data structure compliance
const isValid = ReportExportValidator.validateExport(reportData);
assert(isValid, 'Report must follow unified structure');

// Test request validation
const requestValid = ReportExportValidator.validateAuditRequest(request);
assert(requestValid, 'Request must follow AuditRequest interface');
```

## 📈 Benefits

✅ **Consistency**: All components use identical data structures  
✅ **Type Safety**: Full TypeScript support throughout the system  
✅ **Validation**: Built-in data validation and error handling  
✅ **Extensibility**: Easy to add new features without breaking changes  
✅ **Documentation**: Self-documenting through TypeScript interfaces  
✅ **Testing**: Single set of test cases covers all components  
✅ **Maintenance**: Changes in one place propagate everywhere  

## 🔄 Migration from Legacy

If you're using older AuditMySite versions:

```typescript
// OLD (deprecated)
import { generateHtmlReport } from '@casoon/auditmysite';

// NEW (recommended)
import { auditSDK, AuditRequest } from '@casoon/auditmysite';

const request: AuditRequest = { url: 'https://example.com' };
const response = await auditSDK.audit(request);
// response.report is guaranteed to follow UnifiedReportExport
```

---

**This unified system ensures that whether you're using the CLI, SDK, API, or building custom integrations, you're always working with the same well-defined, validated data structures.**
