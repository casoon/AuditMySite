# 🧪 AuditMySite Test Framework

## 📋 Overview

The AuditMySite test framework provides comprehensive testing for accessibility, performance, SEO, and security using various tools like pa11y, Lighthouse, and Playwright.

## 🎯 Test Scenarios

### **Basic Tests**
1. **Perfect Page** (`/perfect-page`) - ✅ Expected: Pass
2. **Accessibility Errors** (`/accessibility-errors`) - ❌ Expected: Fail
3. **Performance Issues** (`/performance-issues`) - ❌ Expected: Fail
4. **SEO Problems** (`/seo-problems`) - ❌ Expected: Fail
5. **Security Issues** (`/security-issues`) - ❌ Expected: Fail

### **Advanced Tests**
6. **Advanced Contrast Test** (`/advanced-contrast-test`) - ❌ Expected: Fail
7. **Screen Reader Test** (`/screen-reader-test`) - ❌ Expected: Fail
8. **PWA Test** (`/pwa-test`) - ❌ Expected: Fail
9. **Mobile Touch Test** (`/mobile-touch-test`) - ❌ Expected: Fail
10. **Advanced Security Test** (`/advanced-security-test`) - ❌ Expected: Fail
11. **Core Web Vitals Test** (`/core-web-vitals-test`) - ❌ Expected: Fail

## 🛠️ Usage

### **Start Mock Server**
```bash
cd test/mock-server
node server.js
```

### **Run Basic Tests**
```bash
node test/test-suite.js
```

### **Run Service Tests**
```bash
node test/service-test-suite.js
```

### **Run All Tests**
```bash
node test/run-tests.js
```

## 📁 Directory Structure

```
test/
├── mock-server/
│   ├── server.js
│   └── templates/
│       ├── perfect-page.html
│       ├── accessibility-errors.html
│       ├── performance-issues.html
│       ├── seo-problems.html
│       ├── security-issues.html
│       ├── advanced-contrast-test.html
│       ├── screen-reader-test.html
│       ├── pwa-test.html
│       ├── mobile-touch-test.html
│       ├── advanced-security-test.html
│       └── core-web-vitals-test.html
├── test-suite.js
├── service-test-suite.js
├── run-tests.js
└── README.md
```

## 📊 Reports

Tests automatically generate reports in the `reports/` directory:

- **Accessibility Reports** - Detailed accessibility analyses
- **Performance Reports** - Performance metrics and optimizations
- **SEO Reports** - SEO analyses and improvement suggestions
- **Security Reports** - Security scans and vulnerabilities

## 🔧 Configuration

Tests use the standard configuration of the AuditMySite framework. For customizations, see the main documentation.

## 🤝 Contributing

### **Adding New Tests:**
1. Create HTML template in `mock-server/templates/`
2. Add route in `mock-server/server.js`
3. Define expected results in test suites

### **Debugging:**
1. Check mock server logs
2. Analyze test output
3. Review reports in `reports/` directory

## 📞 Support

For questions or issues:
1. Check mock server logs
2. Analyze test output
3. Create issue on GitHub 