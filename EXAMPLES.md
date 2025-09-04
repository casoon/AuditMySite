# 🎯 AuditMySite v1.8.0 - Usage Examples & Features

Complete guide to using AuditMySite v1.8.0 features including CLI auditing, REST API server, SDK integration, modern HTML5 analysis, advanced ARIA evaluation, comprehensive testing suite, and professional reporting.

## 🚀 Quick Start Examples

### 1. CLI Usage (Recommended for Quick Testing)
```bash
# Basic audit with automatic sitemap discovery
auditmysite https://example.com

# Full sitemap audit
auditmysite https://example.com/sitemap.xml

# What happens:
# ✅ Tests up to 5 pages automatically
# ✅ Modern HTML5 element analysis
# ✅ Comprehensive ARIA evaluation
# ✅ Performance metrics collection
# ✅ Security headers validation
# ✅ Professional HTML report generation
```

### 2. REST API Server (New in v1.7.1, Enhanced in v1.8.0)
```bash
# Start the API server
npx @casoon/auditmysite --api --port 3000 --api-key your-secret-key

# Or with environment variables
export AUDITMYSITE_API_KEY=your-secret-key
npx @casoon/auditmysite --api --port 3000
```

#### API Endpoints:
```bash
# Start an audit
curl -X POST http://localhost:3000/api/audits \
  -H "X-API-Key: your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "options": {
      "pages": 10,
      "format": "json",
      "includePerformance": true
    }
  }'

# Check audit status
curl http://localhost:3000/api/audits/{jobId} \
  -H "X-API-Key: your-secret-key"

# Get audit results
curl http://localhost:3000/api/audits/{jobId}/results \
  -H "X-API-Key: your-secret-key"
```

### 3. SDK Integration (Programmatic Usage)
```javascript
const { AuditSDK } = require('@casoon/auditmysite');

const sdk = new AuditSDK();

// Simple audit
const results = await sdk.auditUrl('https://example.com', {
  pages: 5,
  format: 'json',
  includePerformance: true
});

console.log('Audit results:', results);

// Stream audit with progress updates
sdk.streamAudit('https://example.com', {
  onProgress: (progress) => {
    console.log(`Progress: ${progress.percentage}%`);
  },
  onComplete: (results) => {
    console.log('Audit completed!', results);
  }
});
```

### Expert Mode Configuration
```bash
auditmysite https://example.com/sitemap.xml --expert

# Interactive prompts include:
# 🔢 How many pages to test?
# ♿ Accessibility standard (WCAG 2.1 AA, etc.)?
# 📄 Report format (HTML, JSON, Markdown)?
# ⚡ Include Core Web Vitals?
# 🔄 Concurrent page tests?
# 🔍 Detailed progress information?
```

## 🔥 Core Features in Detail

### 1. REST API Server (New in v1.7.1, Enhanced in v1.8.0)

#### Features:
- **Authentication** - API key-based security
- **Job Queue** - Asynchronous audit processing
- **Real-time Status** - Track audit progress
- **Multiple Formats** - JSON, HTML, Markdown outputs
- **Rate Limiting** - Built-in request throttling
- **Health Checks** - Server status monitoring

#### API Response Example:
```json
{
  "jobId": "audit_1234567890",
  "status": "completed",
  "url": "https://example.com",
  "results": {
    "summary": {
      "totalPages": 5,
      "overallScore": 85,
      "issuesFound": 12
    },
    "pages": [...]
  }
}
```

### 2. Enhanced HTML5 Element Analysis

#### What it detects:
- **`<details>` and `<summary>` elements** - Proper accessibility implementation
- **`<dialog>` elements** - Modal accessibility and ARIA attributes
- **`<main>` landmarks** - Semantic document structure
- **Modern semantic elements** - `<article>`, `<aside>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- **Interactive elements** - `<figure>`, `<figcaption>`, `<time>`, `<mark>`, `<progress>`, `<meter>`
- **Form structure** - `<fieldset>`, `<legend>`, `<datalist>`, `<output>`

#### Example Output:
```
🔥 Modern HTML5 Elements Analysis
Element Usage:
  Total Modern Elements: 23
  Details/Summary Issues: 1
  Dialog Accessibility Issues: 0

Semantic Structure: 85%
Modern HTML5 usage: 78% of pages

Key HTML5 Recommendations:
• Fix 1 <summary> elements lacking accessible names
• Add proper <main> landmarks
• Use semantic sectioning elements
```

### 3. Advanced ARIA Impact Scoring

#### Impact Categories:
- **Critical** 🔴 - Blocks access for users with disabilities
- **Serious** 🟠 - Significantly affects accessibility
- **Moderate** 🟡 - Some impact on accessibility  
- **Minor** 🟢 - Minor accessibility concern

#### Example Output:
```
⚡ Enhanced ARIA Analysis
ARIA Usage:
  Total ARIA Elements: 45
  Landmark Roles: 5 (main, navigation, banner, contentinfo, search)
  Modern ARIA Features: Detected

Impact Analysis:
  Critical: 0    Serious: 2
  Moderate: 3    Minor: 5

ARIA Quality Score: 78%
Good ARIA usage with minor issues
```

### 4. SDK Integration

#### Features:
- **Promise-based API** - Modern async/await support
- **Event Streaming** - Real-time progress updates
- **Flexible Configuration** - Comprehensive options
- **Error Handling** - Graceful failure management
- **TypeScript Support** - Full type definitions

#### SDK Example:
```javascript
import { AuditSDK } from '@casoon/auditmysite';

const sdk = new AuditSDK({
  concurrent: 2,
  timeout: 30000,
  retries: 3
});

// Audit with custom configuration
const results = await sdk.auditSitemap('https://example.com/sitemap.xml', {
  pages: 10,
  standard: 'WCAG2AA',
  includePerformance: true,
  formats: ['json', 'html']
});

console.log(`Audited ${results.summary.totalPages} pages`);
console.log(`Overall score: ${results.summary.overallScore}%`);
```

### 5. Performance Optimizations

#### Optimizations Applied:
- **Enhanced Accessibility Tree** - Faster pa11y integration
- **Modern Browser Support** - Latest Puppeteer integration
- **Concurrent Processing** - Parallel page analysis
- **Optimized Resource Loading** - Improved test execution speed
- **Better Memory Management** - Reduced resource usage

#### Example Output:
```
🚀 Performance Metrics:
✅ Enhanced Accessibility Tree
✅ Concurrent Page Processing
✅ Modern Browser Protocol
✅ Enhanced Performance Metrics
✅ Optimized Memory Usage

Performance Gains:
  Page Load Time: 1,234ms
  Memory Usage: 45.2MB
  Test Execution: 25% faster
```

### 6. Semantic Quality Scoring

#### What it evaluates:
- **Document structure** - Heading hierarchy and landmarks
- **HTML5 semantic usage** - Modern element adoption
- **ARIA implementation** - Proper accessibility attributes
- **Modern features** - Future-ready standards compliance
- **Performance quality** - Core Web Vitals contribution

#### Compliance Levels:
- **Basic** - Standard accessibility compliance
- **Enhanced** - Good semantic structure with some modern features
- **Comprehensive** - Excellent modern web standards implementation

#### Example Output:
```
📊 Semantic Quality Analysis
Overall Quality: 82% (Enhanced Level)

Structure Analysis:
  Complexity Level: INTERMEDIATE
  Best Practices Followed: 8
  Recommendations: 3

Future Readiness: 75%
Good adoption of modern web standards
```

## 📊 Enhanced Report Features

### Professional HTML Reports
The v1.8.0 HTML reports include comprehensive sections:

```html
🎯 AuditMySite v1.8.0 Professional Report
Feature Badges: [API Ready] [SDK Integrated] [HTML5 Enhanced] [ARIA Advanced] [Performance Optimized]

📊 Executive Summary
- Comprehensive analysis of pages with full feature set
- Overall accessibility score: 85%
- Performance score: 78%
- Security headers: 9/10 validated
- 0 critical issues, 2 serious issues, 12 actionable recommendations

🔥 Modern HTML5 Elements Analysis
🔍 Enhanced analysis of modern HTML5 elements with semantic validation

⚡ Advanced ARIA Analysis  
🔍 Comprehensive ARIA analysis with impact scoring and modern patterns

🚀 Performance Metrics
🔍 Core Web Vitals, loading performance, and optimization recommendations

🔒 Security Analysis
🔍 Security headers, HTTPS configuration, and vulnerability assessment

📊 Semantic Quality Analysis
🔍 Overall semantic structure and modern web standards compliance

💡 Priority Recommendations
🔥 HTML5 & Semantic | ⚡ ARIA Enhancement | 🚀 Performance | 🔒 Security
```

### JSON API Response Format
```json
{
  "summary": {
    "url": "https://example.com",
    "totalPages": 10,
    "overallScore": 85,
    "completedAt": "2024-01-15T10:30:00Z",
    "duration": "2m 45s"
  },
  "scores": {
    "accessibility": 88,
    "performance": 78,
    "security": 92,
    "seo": 85
  },
  "issues": {
    "critical": 0,
    "serious": 2,
    "moderate": 8,
    "minor": 15
  },
  "pages": [...],
  "recommendations": [...]
}
```

### Example Report Sections:

#### HTML5 Analysis Card:
```
Element Usage:
✅ Total Modern Elements: 18
❌ Details/Summary Issues: 1  
✅ Dialog Accessibility Issues: 0

Semantic Structure: [85% Circle Graph]
Modern HTML5 usage: 67% of pages
```

#### ARIA Impact Breakdown:
```
Impact Analysis:
[Critical: 0] [Serious: 2] [Moderate: 4] [Minor: 1]

ARIA Quality Score: [78% Circle Graph]  
Good ARIA usage with minor issues
```

## 🛠️ Advanced Configuration Examples

### CLI Expert Mode
```bash
auditmysite https://example.com/sitemap.xml --expert

# Example interactive session:
? 🔢 How many pages to test?
  → 🎯 20 pages (Standard test) - ~8 minutes

? ♿ Accessibility standard?
  → 🎯 WCAG 2.1 AA (Recommended) - Industry standard

? 📄 Report format?
  → 🌐 HTML - Professional reports for stakeholders

? ⚡ Include Core Web Vitals performance metrics?
  → Yes

? 🔄 Concurrent page tests (1-5)?
  → 2

? 🔍 Show detailed progress information?
  → No
```

### API Server Configuration
```bash
# Basic server startup
auditmysite --api --port 3000

# Advanced server configuration
auditmysite --api \
  --port 8080 \
  --api-key $(cat ~/.auditmysite-key) \
  --max-concurrent 5 \
  --timeout 60000

# Docker deployment
docker run -d \
  -p 3000:3000 \
  -e AUDITMYSITE_API_KEY=your-secret-key \
  -e MAX_CONCURRENT_AUDITS=3 \
  -e AUDIT_TIMEOUT=45000 \
  your-registry/auditmysite:v1.8.0
```

### SDK Advanced Configuration
```javascript
import { AuditSDK } from '@casoon/auditmysite';

const sdk = new AuditSDK({
  // Concurrency settings
  concurrent: 3,
  timeout: 45000,
  retries: 2,
  
  // Output settings
  outputDir: './audit-results',
  formats: ['json', 'html'],
  
  // Feature toggles
  includePerformance: true,
  includeSecurity: true,
  detailedReporting: true,
  
  // Browser settings
  browserConfig: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    userAgent: 'AuditMySite/1.8.0'
  }
});

// Custom audit configuration
const customConfig = {
  pages: 25,
  standard: 'WCAG2AAA',
  includeScreenshots: true,
  excludePatterns: ['/admin/*', '/api/*'],
  onProgress: (data) => {
    console.log(`Processing: ${data.currentUrl} (${data.progress}%)`);
  },
  onError: (error, url) => {
    console.error(`Failed to audit ${url}:`, error.message);
  }
};

const results = await sdk.auditSitemap(
  'https://example.com/sitemap.xml',
  customConfig
);
```

### CI/CD Integration
```bash
# Non-interactive mode with all v1.3 features
auditmysite https://example.com/sitemap.xml \
  --non-interactive \
  --format markdown \
  --output-dir ./reports \
  --verbose

# Exit codes:
# 0 = All tests passed
# 1 = Some tests failed (accessibility issues found)
```

## 📈 Understanding the Enhanced Scoring

### Multi-Dimensional Scoring System

#### 1. Traditional Accessibility Score (0-100)
- Based on WCAG compliance and pa11y results
- Includes error/warning penalty system
- Focuses on traditional accessibility barriers

#### 2. HTML5 Semantic Score (0-100)  
- Modern element usage evaluation
- Semantic structure quality
- Details/Summary/Dialog accessibility
- Document outline and landmarks

#### 3. ARIA Quality Score (0-100)
- Impact-weighted scoring system
- Critical issues have highest penalty
- Landmark and role usage bonus
- Modern ARIA features bonus

#### 4. Semantic Quality Score (0-100)
- Combined score from all analysis
- Modern features adoption
- Performance contribution
- Future readiness weighting

#### 5. Future Readiness Score (0-100)
- Modern HTML5 adoption: 25 points
- ARIA modern features: 20 points  
- Chrome 135 compatibility: 25 points
- Performance readiness: 30 points

### Example Scoring Breakdown:
```
Page: https://example.com/about

Traditional Accessibility: 88% ✅
├─ WCAG Compliance: 85%
├─ Error/Warning Penalty: -12%  
└─ Basic Structure Bonus: +15%

HTML5 Semantic: 75% 🟡
├─ Modern Elements: +45%
├─ Semantic Structure: +30%
└─ Dialog Issues Penalty: -0%

ARIA Quality: 82% ✅  
├─ Base Score: 100%
├─ Critical Issues: -0%
├─ Serious Issues: -18%
└─ Landmarks Bonus: +0%

Overall Semantic Quality: 81% ✅
Future Readiness: 68% 🟡
Compliance Level: Enhanced
```

## 🎯 Best Practices for v1.3

### Optimal Testing Strategy
1. **Start with default settings** - All v1.3 features enabled
2. **Use expert mode for fine-tuning** - Adjust based on your needs  
3. **Focus on compliance levels** - Aim for Enhanced or Comprehensive
4. **Monitor future readiness** - Plan for modern standards adoption
5. **Regular testing** - Track improvements over time

### Interpreting Results
- **Compliance Level: Basic** → Focus on WCAG fundamentals
- **Compliance Level: Enhanced** → Add modern HTML5/ARIA features
- **Compliance Level: Comprehensive** → Excellent modern implementation

### Recommendations Priority
1. **Critical ARIA Issues** → Fix immediately
2. **HTML5 Semantic Structure** → Improve document outline
3. **Missing Landmarks** → Add proper page structure
4. **Performance Issues** → Optimize Core Web Vitals
5. **Future Readiness** → Adopt modern standards gradually

## 🚀 What's New in v1.8.0

### Major New Features:
- **Comprehensive Jest Test Suite** - 103+ passing tests for maximum reliability
- **Optimized Test Architecture** - Unit, integration, API, and CLI tests
- **Re-enabled CLI Tests** - Complete command validation and execution testing
- **Fixed Rate Limiting** - Optimized API rate limiting tests
- **Production-Ready Quality** - Rock-solid test coverage
- **Enhanced Debugging** - Clear test structure matching current architecture

### Backward Compatibility:
- **CLI unchanged** - All existing commands work identically
- **Report formats** - HTML/JSON/Markdown all supported
- **Output structure** - Maintained for existing integrations
- **Exit codes** - Same success/failure indicators

### Getting Started with New Features:
```bash
# Same CLI usage as always
auditmysite https://example.com/sitemap.xml

# New API server mode
auditmysite --api --port 3000 --api-key your-key

# Enhanced features included:
# ✅ REST API endpoints
# ✅ SDK integration ready
# ✅ Advanced performance metrics
# ✅ Security headers validation
# ✅ Professional report generation
```

### API Integration Examples:
```bash
# Install latest version
npm install @casoon/auditmysite@latest

# Start API server
node -e "
  const { startApiServer } = require('@casoon/auditmysite');
  startApiServer({ port: 3000, apiKey: 'your-secret-key' });
"

# Use in your application
npm install @casoon/auditmysite
```

## 📞 Support & Troubleshooting

### Common Issues:

**Q: API server not starting?**
A: Ensure the port is available and API key is properly set. Check `--api-key` parameter or `AUDITMYSITE_API_KEY` environment variable.

**Q: SDK integration failing?**
A: Verify you're using the latest version (`npm install @casoon/auditmysite@latest`) and check TypeScript compatibility.

**Q: HTML5 analysis showing low scores?**
A: Focus on adding semantic elements like `<main>`, `<article>`, `<section>`, proper `<summary>` text.

**Q: ARIA critical issues found?**
A: Check for missing `aria-labelledby` references and invalid ARIA attribute values.

**Q: Performance metrics missing?**
A: Enable performance analysis with `--include-performance` or set `includePerformance: true` in SDK options.

### Performance Tips:
- **API Server**: Use multiple API instances behind a load balancer for high traffic
- **SDK Integration**: Configure appropriate `concurrent` setting based on your server capacity
- **CLI Usage**: Increase concurrent tests with `--concurrent 3` for faster execution
- **Large Sites**: Use `--pages 10` initially, then scale up as needed
- **CI/CD**: Use `--non-interactive` and `--format json` for automated processing

---

🎯 **Ready to test your site with v1.8.0 features?**

```bash
# Install latest version
npm install -g @casoon/auditmysite@latest

# CLI usage
auditmysite https://your-site.com/sitemap.xml

# API server
auditmysite --api --port 3000 --api-key your-secret-key

# SDK integration
npm install @casoon/auditmysite@latest
```

**Made with ❤️ and modern web standards by [CASOON](https://casoon.de)**
