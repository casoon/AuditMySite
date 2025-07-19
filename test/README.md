# AuditMySite Test Framework

This test framework enables systematic testing of AuditMySite to ensure all functions work correctly.

## 🏗️ Architecture

### Mock Server (`test/mock-server/server.js`)
- Simulates various websites with known accessibility problems
- Provides controlled test scenarios
- Runs on port 3001

### Test Suite (`test/test-suite.js`)
- Runs AuditMySite against various test scenarios
- Validates expected results
- Generates detailed test reports

### Test Runner (`test/run-tests.js`)
- Automatically starts the mock server
- Runs all tests
- Generates final reports

## 🧪 Test Scenarios

### 1. Perfect Page (`/perfect-page`)
- **Goal:** All tests should pass
- **Expectation:** 100% success rate, 0 errors, 0 warnings
- **Tests:** Accessibility, Performance, SEO, Security

### 2. Accessibility Errors (`/accessibility-errors`)
- **Goal:** Specific accessibility errors
- **Expectation:** Should fail with known errors
- **Problems:**
  - Missing alt attributes
  - Buttons without aria-label
  - Low color contrast
  - Forms without labels
  - Missing heading structure
  - Empty links
  - Missing landmarks

### 3. Performance Issues (`/performance-issues`)
- **Goal:** Performance problems
- **Expectation:** Performance tests should detect issues
- **Problems:**
  - Large, unoptimized images
  - Inline styles
  - Inefficient scripts

### 4. SEO Problems (`/seo-problems`)
- **Goal:** SEO problems
- **Expectation:** SEO tests should detect issues
- **Problems:**
  - Missing title
  - Missing meta description
  - Missing H1
  - Missing alt attributes
  - No structured data

### 5. Security Issues (`/security-issues`)
- **Goal:** Security problems
- **Expectation:** Security tests should detect issues
- **Problems:**
  - Insecure forms
  - Inline scripts
  - External resources without integrity
  - Missing CSP

### 6. Advanced Contrast Test (`/advanced-contrast-test`)
- **Goal:** Detailed color contrast analysis
- **Expectation:** Advanced contrast tests should detect issues
- **Problems:**
  - Very low contrast text (1.2:1 ratio)
  - Low contrast buttons and links
  - Background images with text overlay
  - Different contrast levels for AA/AAA standards

### 7. Screen Reader Test (`/screen-reader-test`)
- **Goal:** Screen reader compatibility
- **Expectation:** Screen reader tests should detect issues
- **Problems:**
  - Missing aria-live regions
  - Incorrect ARIA usage
  - Missing skip links
  - Incorrect heading structure
  - Missing table headers
  - Missing list semantics

### 8. PWA Test (`/pwa-test`)
- **Goal:** Progressive Web App features
- **Expectation:** PWA tests should detect issues
- **Problems:**
  - Missing manifest
  - Missing service worker
  - Missing HTTPS
  - Missing app icons
  - Missing offline functionality

### 9. Mobile Touch Test (`/mobile-touch-test`)
- **Goal:** Mobile touch target validation
- **Expectation:** Mobile tests should detect issues
- **Problems:**
  - Too small touch targets (< 44px)
  - Small navigation links
  - Small form inputs
  - Insufficient touch target size

### 10. Advanced Security Test (`/advanced-security-test`)
- **Goal:** Comprehensive security scanning
- **Expectation:** Advanced security tests should detect issues
- **Problems:**
  - XSS vulnerabilities
  - CSRF vulnerabilities
  - Information disclosure
  - Insecure external resources
  - Missing input validation
  - Insecure cookies
  - Missing security headers

### 11. Core Web Vitals Test (`/core-web-vitals-test`)
- **Goal:** Performance optimization
- **Expectation:** Performance tests should detect issues
- **Problems:**
  - Large images without dimensions
  - Layout shifts
  - Render-blocking resources
  - Unoptimized fonts
  - Heavy JavaScript

## 🚀 Usage

### Run all tests (with mock server)
```bash
npm test
```

### Service-based tests (recommended)
```bash
# 1. Start mock server
npm run test:mock-server

# 2. Run service tests
node test/service-test-suite.js
```

### Start mock server only
```bash
npm run test:mock-server
```

### Run test suite only (server must be running)
```bash
npm run test:suite
```

### Manual test
```bash
# 1. Start mock server
node test/mock-server/server.js

# 2. Test AuditMySite in another terminal
node bin/audit.js http://localhost:3001/sitemap.xml --max-pages 1 --non-interactive
```

## 📊 Test Results

The framework generates detailed reports:

### Test Report
- Number of passed/failed tests
- Exit codes
- Generated reports
- Recommendations

### Validation
- Comparison of expected vs. actual results
- Success rate validation
- Error count validation

### Overall Assessment
- **EXCELLENT:** All tests passed and results are valid
- **GOOD:** Most tests passed with minor issues
- **FAIR:** Some tests failed, attention needed
- **POOR:** Many tests failed, significant issues detected

## 🔧 Customization

### Add new test scenarios
1. Add new route in `test/mock-server/server.js`
2. Define expected results in `test/test-suite.js`
3. Add test in `runAllTests()`

### Adjust expected results
```javascript
// In test/test-suite.js
this.expectedResults = {
  'new-test-page': {
    shouldPass: false,
    expectedErrors: 5,
    expectedWarnings: 3,
    expectedIssues: ['Specific issue 1', 'Specific issue 2']
  }
};
```

## 🎯 Goals

1. **Continuous Validation:** Ensure all tests work correctly
2. **Regression Tests:** Detect changes that break tests
3. **Quality Assurance:** Validate report quality
4. **Documentation:** Clear expectations for each test scenario

## 🔍 Troubleshooting

### Mock server won't start
- Port 3001 already in use? → Use different port
- Express not installed? → `npm install express`

### Tests are failing
- Mock server running? → Check `npm run test:mock-server`
- AuditMySite compiled? → Run `npm run build`
- Expected results current? → Check test scenarios

### Unexpected results
- Review test scenarios
- Adjust expected results
- Check AuditMySite logic 