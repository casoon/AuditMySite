import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class SecurityHeadersTest extends BaseAccessibilityTest {
  name = 'Security Headers Test';
  description = 'Checks for essential security headers to protect against common web vulnerabilities';
  category = 'security';
  priority = 'critical';
  standards = ['OWASP Security Guidelines', 'Security Best Practices'];

  async run(context: TestContext): Promise<TestResult> {
    const { page, url } = context;
    
    try {
      // Navigate to the page to capture headers
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Get response headers
      const response = await page.waitForResponse(url);
      const headers = response.headers();
      
      const issues: string[] = [];
      const warnings: string[] = [];
      const details: Record<string, any> = {};
      
      // Check Content Security Policy (CSP)
      const csp = headers['content-security-policy'] || headers['x-content-security-policy'];
      if (!csp) {
        issues.push('Missing Content Security Policy (CSP) header - critical for XSS protection');
      } else {
        details.csp = csp;
        if (!csp.includes('default-src')) {
          warnings.push('CSP missing default-src directive');
        }
        if (!csp.includes('script-src')) {
          warnings.push('CSP missing script-src directive');
        }
      }
      
      // Check HTTP Strict Transport Security (HSTS)
      const hsts = headers['strict-transport-security'];
      if (!hsts) {
        issues.push('Missing HTTP Strict Transport Security (HSTS) header - critical for HTTPS enforcement');
      } else {
        details.hsts = hsts;
        if (!hsts.includes('max-age=')) {
          warnings.push('HSTS missing max-age directive');
        }
        if (!hsts.includes('includeSubDomains')) {
          warnings.push('HSTS should include includeSubDomains directive');
        }
      }
      
      // Check X-Frame-Options
      const xFrameOptions = headers['x-frame-options'];
      if (!xFrameOptions) {
        issues.push('Missing X-Frame-Options header - protection against clickjacking');
      } else {
        details.xFrameOptions = xFrameOptions;
        if (!['DENY', 'SAMEORIGIN'].includes(xFrameOptions.toUpperCase())) {
          warnings.push('X-Frame-Options should be DENY or SAMEORIGIN');
        }
      }
      
      // Check X-Content-Type-Options
      const xContentTypeOptions = headers['x-content-type-options'];
      if (!xContentTypeOptions) {
        warnings.push('Missing X-Content-Type-Options header - prevents MIME type sniffing');
      } else {
        details.xContentTypeOptions = xContentTypeOptions;
        if (xContentTypeOptions !== 'nosniff') {
          warnings.push('X-Content-Type-Options should be "nosniff"');
        }
      }
      
      // Check X-XSS-Protection
      const xXSSProtection = headers['x-xss-protection'];
      if (!xXSSProtection) {
        warnings.push('Missing X-XSS-Protection header - additional XSS protection');
      } else {
        details.xXSSProtection = xXSSProtection;
        if (!xXSSProtection.includes('1; mode=block')) {
          warnings.push('X-XSS-Protection should be "1; mode=block"');
        }
      }
      
      // Check Referrer Policy
      const referrerPolicy = headers['referrer-policy'];
      if (!referrerPolicy) {
        warnings.push('Missing Referrer Policy header - controls referrer information');
      } else {
        details.referrerPolicy = referrerPolicy;
        const validPolicies = ['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'];
        if (!validPolicies.includes(referrerPolicy)) {
          warnings.push(`Invalid Referrer Policy: ${referrerPolicy}`);
        }
      }
      
      // Check Permissions Policy (formerly Feature Policy)
      const permissionsPolicy = headers['permissions-policy'];
      if (!permissionsPolicy) {
        warnings.push('Missing Permissions Policy header - controls browser features');
      } else {
        details.permissionsPolicy = permissionsPolicy;
      }
      
      // Check Cross-Origin Resource Policy
      const corp = headers['cross-origin-resource-policy'];
      if (!corp) {
        warnings.push('Missing Cross-Origin Resource Policy header - prevents cross-origin resource access');
      } else {
        details.corp = corp;
        if (!['same-site', 'same-origin', 'cross-origin'].includes(corp)) {
          warnings.push(`Invalid Cross-Origin Resource Policy: ${corp}`);
        }
      }
      
      // Check Cross-Origin Embedder Policy
      const coep = headers['cross-origin-embedder-policy'];
      if (!coep) {
        warnings.push('Missing Cross-Origin Embedder Policy header - enables cross-origin isolation');
      } else {
        details.coep = coep;
        if (!['require-corp', 'credentialless'].includes(coep)) {
          warnings.push(`Invalid Cross-Origin Embedder Policy: ${coep}`);
        }
      }
      
      // Check Cross-Origin Opener Policy
      const coop = headers['cross-origin-opener-policy'];
      if (!coop) {
        warnings.push('Missing Cross-Origin Opener Policy header - prevents cross-origin window access');
      } else {
        details.coop = coop;
        if (!['same-origin', 'same-origin-allow-popups', 'unsafe-none'].includes(coop)) {
          warnings.push(`Invalid Cross-Origin Opener Policy: ${coop}`);
        }
      }
      
      // Check for HTTPS
      if (!url.startsWith('https://')) {
        issues.push('Site is not using HTTPS - critical security requirement');
      }
      
      // Calculate security score
      const totalChecks = 10;
      const passedChecks = totalChecks - issues.length - warnings.length;
      const securityScore = Math.round((passedChecks / totalChecks) * 100);
      
      details.securityScore = securityScore;
      details.totalChecks = totalChecks;
      details.passedChecks = passedChecks;
      
      return this.createResult(
        issues.length === 0,
        issues.length + warnings.length,
        issues,
        warnings,
        details
      );
    } catch (error) {
      return this.createErrorResult(`Security Headers Test failed: ${error}`);
    }
  }
} 