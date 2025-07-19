import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class CspTest extends BaseAccessibilityTest {
  name = 'Content Security Policy Test';
  description = 'Analyzes Content Security Policy implementation and configuration for XSS protection';
  category = 'security';
  priority = 'critical';
  standards = ['OWASP Security Guidelines', 'CSP Best Practices', 'XSS Prevention'];

  async run(context: TestContext): Promise<TestResult> {
    const { page, url } = context;
    
    try {
      // Schnellere Navigation für localhost
      const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1');
      const waitOptions = isLocalhost ? { waitUntil: 'domcontentloaded' as const, timeout: 5000 } : { waitUntil: 'networkidle' as const };
      
      // Navigate to the page to capture headers
      await page.goto(url, waitOptions);
      
      // Schnellere Response-Erfassung für localhost
      let headers: Record<string, string> = {};
      if (isLocalhost) {
        // Für localhost: Schnelle Header-Prüfung ohne Warten
        try {
          const response = await page.waitForResponse(url, { timeout: 3000 });
          headers = response.headers();
        } catch (error) {
          // Fallback: Verwende leere Headers für localhost
          console.log('   ⚡ Localhost: Verwende vereinfachte CSP-Prüfung');
        }
      } else {
        // Für Produktions-URLs: Normale Header-Erfassung
        const response = await page.waitForResponse(url);
        headers = response.headers();
      }
      
      const issues: string[] = [];
      const warnings: string[] = [];
      const details: Record<string, any> = {};
      
      // Check for CSP header
      const csp = headers['content-security-policy'] || headers['x-content-security-policy'];
      if (!csp) {
        if (isLocalhost) {
          warnings.push('Missing Content Security Policy (CSP) header - normal for localhost development');
        } else {
          issues.push('Missing Content Security Policy (CSP) header - critical for XSS protection');
        }
        return this.createResult(false, 1, issues, warnings, details);
      }
      
      details.csp = csp;
      
      // Parse CSP directives
      const directives = this.parseCspDirectives(csp);
      details.directives = directives;
      
      // Check essential directives
      const essentialDirectives = ['default-src', 'script-src', 'style-src'];
      const missingDirectives: string[] = [];
      
      essentialDirectives.forEach(directive => {
        if (!directives[directive]) {
          missingDirectives.push(directive);
        }
      });
      
      if (missingDirectives.length > 0) {
        issues.push(`Missing essential CSP directives: ${missingDirectives.join(', ')}`);
      }
      
      // Check for unsafe directives
      const unsafePatterns = [
        { directive: 'script-src', pattern: "'unsafe-inline'", description: 'unsafe-inline in script-src' },
        { directive: 'script-src', pattern: "'unsafe-eval'", description: 'unsafe-eval in script-src' },
        { directive: 'style-src', pattern: "'unsafe-inline'", description: 'unsafe-inline in style-src' },
        { directive: 'default-src', pattern: "'unsafe-inline'", description: 'unsafe-inline in default-src' },
        { directive: 'default-src', pattern: "'unsafe-eval'", description: 'unsafe-eval in default-src' }
      ];
      
      const unsafeDirectives: string[] = [];
      unsafePatterns.forEach(({ directive, pattern, description }) => {
        if (directives[directive] && directives[directive].includes(pattern)) {
          unsafeDirectives.push(description);
        }
      });
      
      if (unsafeDirectives.length > 0) {
        issues.push(`Unsafe CSP directives detected: ${unsafeDirectives.join(', ')}`);
        details.unsafeDirectives = unsafeDirectives;
      }
      
      // Check for overly permissive directives
      const permissivePatterns = [
        { directive: 'script-src', pattern: '*', description: 'wildcard (*) in script-src' },
        { directive: 'style-src', pattern: '*', description: 'wildcard (*) in style-src' },
        { directive: 'img-src', pattern: '*', description: 'wildcard (*) in img-src' },
        { directive: 'connect-src', pattern: '*', description: 'wildcard (*) in connect-src' }
      ];
      
      const permissiveDirectives: string[] = [];
      permissivePatterns.forEach(({ directive, pattern, description }) => {
        if (directives[directive] && directives[directive].includes(pattern)) {
          permissiveDirectives.push(description);
        }
      });
      
      if (permissiveDirectives.length > 0) {
        warnings.push(`Overly permissive CSP directives: ${permissiveDirectives.join(', ')}`);
        details.permissiveDirectives = permissiveDirectives;
      }
      
      // Check for recommended directives
      const recommendedDirectives = [
        'base-uri',
        'form-action',
        'frame-ancestors',
        'upgrade-insecure-requests'
      ];
      
      const missingRecommended: string[] = [];
      recommendedDirectives.forEach(directive => {
        if (!directives[directive]) {
          missingRecommended.push(directive);
        }
      });
      
      if (missingRecommended.length > 0) {
        warnings.push(`Missing recommended CSP directives: ${missingRecommended.join(', ')}`);
        details.missingRecommended = missingRecommended;
      }
      
      // Check for nonce and hash usage
      const hasNonce = Object.values(directives).some(value => 
        value && (value.includes("'nonce-") || value.includes('nonce-'))
      );
      const hasHash = Object.values(directives).some(value => 
        value && (value.includes("'sha256-") || value.includes("'sha384-") || value.includes("'sha512-"))
      );
      
      if (!hasNonce && !hasHash) {
        warnings.push('CSP does not use nonces or hashes for inline scripts/styles');
      }
      
      details.hasNonce = hasNonce;
      details.hasHash = hasHash;
      
      // Check for report-uri or report-to directive
      const hasReporting = directives['report-uri'] || directives['report-to'];
      if (!hasReporting) {
        warnings.push('CSP missing reporting directive (report-uri or report-to)');
      }
      
      details.hasReporting = hasReporting;
      
      // Vereinfachte CSP-Analyse für localhost
      let cspAnalysis;
      if (isLocalhost) {
        // Schnelle Analyse für localhost
        cspAnalysis = await this.analyzeCspEffectivenessFast(page, directives);
      } else {
        // Vollständige Analyse für Produktions-URLs
        cspAnalysis = await this.analyzeCspEffectiveness(page, directives);
      }
      details.cspAnalysis = cspAnalysis;
      
      if (cspAnalysis.violations.length > 0) {
        issues.push(`CSP violations detected: ${cspAnalysis.violations.length} potential security issues`);
        details.violations = cspAnalysis.violations;
      }
      
      // Calculate CSP score
      const totalChecks = 10;
      const passedChecks = totalChecks - issues.length - warnings.length;
      const cspScore = Math.round((passedChecks / totalChecks) * 100);
      
      details.cspScore = cspScore;
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
      return this.createErrorResult(`CSP Test failed: ${error}`);
    }
  }
  
  private parseCspDirectives(csp: string): Record<string, string> {
    const directives: Record<string, string> = {};
    const parts = csp.split(';');
    
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed) {
        const [directive, ...values] = trimmed.split(' ');
        if (directive && values.length > 0) {
          directives[directive.toLowerCase()] = values.join(' ');
        }
      }
    });
    
    return directives;
  }
  
  private async analyzeCspEffectiveness(page: any, directives: Record<string, string>): Promise<any> {
    const analysis = {
      violations: [] as string[],
      inlineScripts: 0,
      inlineStyles: 0,
      externalScripts: 0,
      externalStyles: 0
    };
    
    const pageAnalysis = await page.evaluate(() => {
      const result = {
        inlineScripts: document.querySelectorAll('script:not([src])').length,
        inlineStyles: document.querySelectorAll('style').length,
        externalScripts: document.querySelectorAll('script[src]').length,
        externalStyles: document.querySelectorAll('link[rel="stylesheet"]').length,
        violations: [] as string[]
      };
      
      // Check for inline event handlers
      const elementsWithEvents = document.querySelectorAll('[onclick], [onload], [onerror], [onmouseover]');
      if (elementsWithEvents.length > 0) {
        result.violations.push(`${elementsWithEvents.length} elements with inline event handlers found`);
      }
      
      // Check for javascript: URLs
      const jsUrls = document.querySelectorAll('a[href^="javascript:"], iframe[src^="javascript:"]');
      if (jsUrls.length > 0) {
        result.violations.push(`${jsUrls.length} elements with javascript: URLs found`);
      }
      
      // Check for data: URLs in scripts
      const dataScripts = document.querySelectorAll('script[src^="data:"]');
      if (dataScripts.length > 0) {
        result.violations.push(`${dataScripts.length} scripts with data: URLs found`);
      }
      
      return result;
    });
    
    analysis.inlineScripts = pageAnalysis.inlineScripts;
    analysis.inlineStyles = pageAnalysis.inlineStyles;
    analysis.externalScripts = pageAnalysis.externalScripts;
    analysis.externalStyles = pageAnalysis.externalStyles;
    analysis.violations = pageAnalysis.violations;
    
    // Check if inline scripts/styles are allowed
    const scriptSrc = directives['script-src'] || directives['default-src'];
    const styleSrc = directives['style-src'] || directives['default-src'];
    
    if (analysis.inlineScripts > 0 && scriptSrc && !scriptSrc.includes("'unsafe-inline'") && !scriptSrc.includes("'nonce-") && !scriptSrc.includes("'sha256-")) {
      analysis.violations.push(`${analysis.inlineScripts} inline scripts without proper CSP allowance`);
    }
    
    if (analysis.inlineStyles > 0 && styleSrc && !styleSrc.includes("'unsafe-inline'") && !styleSrc.includes("'nonce-") && !styleSrc.includes("'sha256-")) {
      analysis.violations.push(`${analysis.inlineStyles} inline styles without proper CSP allowance`);
    }
    
    return analysis;
  }

  private async analyzeCspEffectivenessFast(page: any, directives: Record<string, string>): Promise<any> {
    const analysis = {
      violations: [] as string[],
      inlineScripts: 0,
      inlineStyles: 0,
      externalScripts: 0,
      externalStyles: 0
    };

         // Schnelle Prüfung für localhost: Nur wichtige Header-Checks
     const headers = await page.evaluate(() => {
       const cspMeta = document.head.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement;
       const xCspMeta = document.head.querySelector('meta[http-equiv="X-Content-Security-Policy"]') as HTMLMetaElement;
       
       return {
         csp: cspMeta?.content || xCspMeta?.content,
         scriptSrc: (cspMeta?.content || xCspMeta?.content)?.includes("script-src") || false,
         styleSrc: (cspMeta?.content || xCspMeta?.content)?.includes("style-src") || false,
         inlineScripts: document.querySelectorAll('script:not([src])').length,
         inlineStyles: document.querySelectorAll('style').length,
         externalScripts: document.querySelectorAll('script[src]').length,
         externalStyles: document.querySelectorAll('link[rel="stylesheet"]').length,
       };
     });

    analysis.inlineScripts = headers.inlineScripts;
    analysis.inlineStyles = headers.inlineStyles;
    analysis.externalScripts = headers.externalScripts;
    analysis.externalStyles = headers.externalStyles;

    // Schnelle CSP-Analyse für localhost
    const csp = headers.csp;
    if (!csp) {
      analysis.violations.push('Missing Content Security Policy (CSP) header - critical for XSS protection');
      return analysis;
    }

    const directivesFromPage = this.parseCspDirectives(csp);

    // Schnelle Prüfung auf wichtige Fehler
    const unsafePatterns = [
      { directive: 'script-src', pattern: "'unsafe-inline'", description: 'unsafe-inline in script-src' },
      { directive: 'script-src', pattern: "'unsafe-eval'", description: 'unsafe-eval in script-src' },
      { directive: 'style-src', pattern: "'unsafe-inline'", description: 'unsafe-inline in style-src' },
      { directive: 'default-src', pattern: "'unsafe-inline'", description: 'unsafe-inline in default-src' },
      { directive: 'default-src', pattern: "'unsafe-eval'", description: 'unsafe-eval in default-src' }
    ];

    const unsafeDirectives: string[] = [];
    unsafePatterns.forEach(({ directive, pattern, description }) => {
      if (directivesFromPage[directive] && directivesFromPage[directive].includes(pattern)) {
        unsafeDirectives.push(description);
      }
    });

    if (unsafeDirectives.length > 0) {
      analysis.violations.push(`Unsafe CSP directives detected: ${unsafeDirectives.join(', ')}`);
    }

    // Schnelle Prüfung auf permissive Directives
    const permissivePatterns = [
      { directive: 'script-src', pattern: '*', description: 'wildcard (*) in script-src' },
      { directive: 'style-src', pattern: '*', description: 'wildcard (*) in style-src' },
      { directive: 'img-src', pattern: '*', description: 'wildcard (*) in img-src' },
      { directive: 'connect-src', pattern: '*', description: 'wildcard (*) in connect-src' }
    ];

    const permissiveDirectives: string[] = [];
    permissivePatterns.forEach(({ directive, pattern, description }) => {
      if (directivesFromPage[directive] && directivesFromPage[directive].includes(pattern)) {
        permissiveDirectives.push(description);
      }
    });

    if (permissiveDirectives.length > 0) {
      analysis.violations.push(`Overly permissive CSP directives: ${permissiveDirectives.join(', ')}`);
    }

    // Schnelle Prüfung auf nonce/hash
    const hasNonce = Object.values(directivesFromPage).some(value => 
      value && (value.includes("'nonce-") || value.includes('nonce-'))
    );
    const hasHash = Object.values(directivesFromPage).some(value => 
      value && (value.includes("'sha256-") || value.includes("'sha384-") || value.includes("'sha512-"))
    );

    if (!hasNonce && !hasHash) {
      analysis.violations.push('CSP does not use nonces or hashes for inline scripts/styles');
    }

    // Schnelle Prüfung auf report-uri/report-to
    const hasReporting = directivesFromPage['report-uri'] || directivesFromPage['report-to'];
    if (!hasReporting) {
      analysis.violations.push('CSP missing reporting directive (report-uri or report-to)');
    }

    return analysis;
  }
} 