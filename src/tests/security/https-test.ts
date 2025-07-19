import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class HttpsTest extends BaseAccessibilityTest {
  name = 'HTTPS Compliance Test';
  description = 'Checks HTTPS implementation, SSL/TLS configuration, and secure communication';
  category = 'security';
  priority = 'critical';
  standards = ['OWASP Security Guidelines', 'HTTPS Best Practices', 'SSL/TLS Standards'];

  async run(context: TestContext): Promise<TestResult> {
    const { page, url } = context;
    
    try {
      const issues: string[] = [];
      const warnings: string[] = [];
      const details: Record<string, any> = {};
      
      // Check if URL uses HTTPS
      if (!url.startsWith('https://')) {
        issues.push('Site is not using HTTPS - critical security requirement');
        return this.createResult(false, 1, issues, warnings, details);
      }
      
      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Get security info from the page
      const securityInfo = await this.evaluateOnPage(page, () => {
        const info: Record<string, any> = {};
        
        // Check if page is served over HTTPS
        info.isHttps = window.location.protocol === 'https:';
        
        // Check for mixed content
        const mixedContentIssues: string[] = [];
        const images = document.querySelectorAll('img[src^="http:"]');
        const scripts = document.querySelectorAll('script[src^="http:"]');
        const links = document.querySelectorAll('link[href^="http:"]');
        const iframes = document.querySelectorAll('iframe[src^="http:"]');
        
        if (images.length > 0) {
          mixedContentIssues.push(`${images.length} HTTP images found`);
        }
        if (scripts.length > 0) {
          mixedContentIssues.push(`${scripts.length} HTTP scripts found`);
        }
        if (links.length > 0) {
          mixedContentIssues.push(`${links.length} HTTP stylesheets found`);
        }
        if (iframes.length > 0) {
          mixedContentIssues.push(`${iframes.length} HTTP iframes found`);
        }
        
        info.mixedContentIssues = mixedContentIssues;
        info.mixedContentCount = images.length + scripts.length + links.length + iframes.length;
        
        // Check for insecure forms
        const forms = document.querySelectorAll('form');
        const insecureForms: string[] = [];
        forms.forEach((form, index) => {
          const action = form.getAttribute('action');
          if (action && action.startsWith('http:')) {
            insecureForms.push(`Form ${index + 1} submits to HTTP: ${action}`);
          }
        });
        
        info.insecureForms = insecureForms;
        info.formCount = forms.length;
        
        // Check for insecure redirects
        const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
        if (metaRefresh) {
          const content = metaRefresh.getAttribute('content');
          if (content && content.includes('http://')) {
            info.insecureRedirect = content;
          }
        }
        
        // Check for insecure WebSocket connections
        const wsConnections: string[] = [];
        const scriptElements = document.querySelectorAll('script');
        scriptElements.forEach(script => {
          const content = script.textContent || '';
          if (content.includes('ws://')) {
            wsConnections.push('WebSocket connection over insecure protocol (ws://)');
          }
        });
        
        info.wsConnections = wsConnections;
        
        return info;
      });
      
      details.securityInfo = securityInfo;
      
      // Check for mixed content
      if (securityInfo.mixedContentCount > 0) {
        issues.push(`Mixed content detected: ${securityInfo.mixedContentCount} insecure resources loaded over HTTP`);
        details.mixedContentIssues = securityInfo.mixedContentIssues;
      }
      
      // Check for insecure forms
      if (securityInfo.insecureForms.length > 0) {
        issues.push(`Insecure forms detected: ${securityInfo.insecureForms.length} forms submit to HTTP`);
        details.insecureForms = securityInfo.insecureForms;
      }
      
      // Check for insecure redirects
      if (securityInfo.insecureRedirect) {
        issues.push(`Insecure redirect detected: ${securityInfo.insecureRedirect}`);
        details.insecureRedirect = securityInfo.insecureRedirect;
      }
      
      // Check for insecure WebSocket connections
      if (securityInfo.wsConnections.length > 0) {
        issues.push(`Insecure WebSocket connections detected: ${securityInfo.wsConnections.length} connections use ws://`);
        details.wsConnections = securityInfo.wsConnections;
      }
      
      // Check response headers for security indicators
      const response = await page.waitForResponse(url);
      const headers = response.headers();
      
      // Check for HSTS header
      const hsts = headers['strict-transport-security'];
      if (!hsts) {
        warnings.push('Missing HTTP Strict Transport Security (HSTS) header');
      } else {
        details.hsts = hsts;
        if (!hsts.includes('max-age=')) {
          warnings.push('HSTS missing max-age directive');
        }
        if (!hsts.includes('includeSubDomains')) {
          warnings.push('HSTS should include includeSubDomains directive');
        }
      }
      
      // Check for secure cookies
      const setCookieHeaders = headers['set-cookie'];
      if (setCookieHeaders) {
        const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
        const insecureCookies: string[] = [];
        
        cookies.forEach((cookie, index) => {
          if (!cookie.includes('Secure') && !cookie.includes('HttpOnly')) {
            insecureCookies.push(`Cookie ${index + 1}: Missing Secure and HttpOnly flags`);
          } else if (!cookie.includes('Secure')) {
            insecureCookies.push(`Cookie ${index + 1}: Missing Secure flag`);
          } else if (!cookie.includes('HttpOnly')) {
            insecureCookies.push(`Cookie ${index + 1}: Missing HttpOnly flag`);
          }
        });
        
        if (insecureCookies.length > 0) {
          warnings.push(`Insecure cookies detected: ${insecureCookies.length} cookies missing security flags`);
          details.insecureCookies = insecureCookies;
        }
      }
      
      // Check for secure content type
      const contentType = headers['content-type'];
      if (contentType && contentType.includes('text/html')) {
        // Check for secure HTML content
        const htmlContent = await page.content();
        if (htmlContent.includes('http://')) {
          warnings.push('HTML content contains HTTP URLs');
        }
      }
      
      // Calculate HTTPS compliance score
      const totalChecks = 8;
      const passedChecks = totalChecks - issues.length - warnings.length;
      const httpsScore = Math.round((passedChecks / totalChecks) * 100);
      
      details.httpsScore = httpsScore;
      details.totalChecks = totalChecks;
      details.passedChecks = passedChecks;
      details.isHttps = true;
      
      return this.createResult(
        issues.length === 0,
        issues.length + warnings.length,
        issues,
        warnings,
        details
      );
    } catch (error) {
      return this.createErrorResult(`HTTPS Test failed: ${error}`);
    }
  }
} 