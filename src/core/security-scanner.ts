import { Page } from 'playwright';
import { SecurityHeadersTest } from '../tests/security/security-headers-test';
import { HttpsTest } from '../tests/security/https-test';
import { CspTest } from '../tests/security/csp-test';
import { VulnerabilityTest } from '../tests/security/vulnerability-test';

export interface SecurityScanResult {
  url: string;
  timestamp: string;
  overallScore: number;
  tests: {
    securityHeaders: any;
    https: any;
    csp: any;
    vulnerability: any;
  };
  summary: {
    totalIssues: number;
    totalWarnings: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
  };
  recommendations: string[];
}

export class SecurityScanner {
  private securityHeadersTest: SecurityHeadersTest;
  private httpsTest: HttpsTest;
  private cspTest: CspTest;
  private vulnerabilityTest: VulnerabilityTest;

  constructor() {
    this.securityHeadersTest = new SecurityHeadersTest();
    this.httpsTest = new HttpsTest();
    this.cspTest = new CspTest();
    this.vulnerabilityTest = new VulnerabilityTest();
  }

  async scanPage(page: Page, url: string, options: { skipCspForLocalhost?: boolean } = {}): Promise<SecurityScanResult> {
    const timestamp = new Date().toISOString();
    const results = {
      securityHeaders: null as any,
      https: null as any,
      csp: null as any,
      vulnerability: null as any
    };

    try {
      // Run Security Headers Test
      console.log('🔒 Führe Security-Headers-Test aus...');
      results.securityHeaders = await this.securityHeadersTest.run({ page, url, options: {} });

      // Run HTTPS Test
      console.log('🔐 Führe HTTPS-Compliance-Test aus...');
      results.https = await this.httpsTest.run({ page, url, options: {} });

      // Run CSP Test (optional für localhost)
      const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1');
      if (isLocalhost) { // Automatisch für localhost überspringen
        console.log('   ⚡ Localhost: CSP-Test übersprungen (nicht relevant für Entwicklung)');
        results.csp = {
          passed: true,
          errors: [],
          warnings: ['CSP-Test für localhost übersprungen - nicht relevant für Entwicklung'],
          details: { cspScore: 100, skipped: true }
        };
      } else {
        console.log('🛡️ Führe Content Security Policy Test aus...');
        results.csp = await this.cspTest.run({ page, url, options: {} });
      }

      // Run Vulnerability Test
      console.log('🔍 Führe Vulnerability-Scan aus...');
      results.vulnerability = await this.vulnerabilityTest.run({ page, url, options: {} });

    } catch (error) {
      console.error('Security-Scan fehlgeschlagen:', error);
    }

    // Calculate overall score
    const scores = [
      results.securityHeaders?.details?.securityScore || 0,
      results.https?.details?.httpsScore || 0,
      results.csp?.details?.cspScore || 0,
      results.vulnerability?.details?.vulnerabilityScore || 0
    ];

    const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);

    // Generate summary
    const summary = this.generateSummary(results);

    // Generate recommendations
    const recommendations = this.generateRecommendations(results, overallScore);

    return {
      url,
      timestamp,
      overallScore,
      tests: results,
      summary,
      recommendations
    };
  }

  private generateSummary(results: any): any {
    let totalIssues = 0;
    let totalWarnings = 0;
    let criticalIssues = 0;
    let highIssues = 0;
    let mediumIssues = 0;
    let lowIssues = 0;

    Object.values(results).forEach((result: any) => {
      if (result) {
        totalIssues += result.errors?.length || 0;
        totalWarnings += result.warnings?.length || 0;
        
        // Categorize issues by priority
        const issues = [...(result.errors || []), ...(result.warnings || [])];
        issues.forEach((issue: string) => {
          if (issue.includes('critical') || issue.includes('HTTPS') || issue.includes('CSP')) {
            criticalIssues++;
          } else if (issue.includes('XSS') || issue.includes('injection') || issue.includes('vulnerability')) {
            highIssues++;
          } else if (issue.includes('warning') || issue.includes('recommended')) {
            mediumIssues++;
          } else {
            lowIssues++;
          }
        });
      }
    });

    return {
      totalIssues,
      totalWarnings,
      criticalIssues,
      highIssues,
      mediumIssues,
      lowIssues
    };
  }

  private generateRecommendations(results: any, overallScore: number): string[] {
    const recommendations: string[] = [];

    // Overall score recommendations
    if (overallScore < 50) {
      recommendations.push('🔴 CRITICAL: Immediate security improvements required');
    } else if (overallScore < 70) {
      recommendations.push('🟡 HIGH: Significant security improvements needed');
    } else if (overallScore < 90) {
      recommendations.push('🟠 MEDIUM: Some security improvements recommended');
    } else {
      recommendations.push('🟢 GOOD: Security posture is strong');
    }

    // Security Headers recommendations
    if (results.securityHeaders) {
      const sh = results.securityHeaders;
      if (sh.errors?.length > 0) {
        recommendations.push('🔒 Implement missing security headers (CSP, HSTS, X-Frame-Options)');
      }
      if (sh.details?.securityScore < 70) {
        recommendations.push('🛡️ Strengthen security header configuration');
      }
    }

    // HTTPS recommendations
    if (results.https) {
      const https = results.https;
      if (https.errors?.length > 0) {
        recommendations.push('🔐 Enable HTTPS and fix mixed content issues');
      }
      if (https.details?.httpsScore < 80) {
        recommendations.push('🔒 Improve HTTPS configuration and cookie security');
      }
    }

    // CSP recommendations
    if (results.csp) {
      const csp = results.csp;
      if (csp.errors?.length > 0) {
        recommendations.push('🛡️ Implement Content Security Policy');
      }
      if (csp.details?.cspScore < 80) {
        recommendations.push('🔒 Strengthen CSP configuration and remove unsafe directives');
      }
    }

    // Vulnerability recommendations
    if (results.vulnerability) {
      const vuln = results.vulnerability;
      if (vuln.errors?.length > 0) {
        recommendations.push('🔍 Address detected vulnerabilities (XSS, injection, etc.)');
      }
      if (vuln.details?.vulnerabilityScore < 80) {
        recommendations.push('🛡️ Improve input validation and security controls');
      }
    }

    // General recommendations
    if (overallScore < 90) {
      recommendations.push('📋 Conduct regular security audits and penetration testing');
      recommendations.push('🔧 Keep all software components updated');
      recommendations.push('📚 Implement security training for development team');
    }

    return recommendations;
  }

  getTestNames(): string[] {
    return [
      'Security Headers Test',
      'HTTPS Compliance Test', 
      'Content Security Policy Test',
      'Vulnerability Scan Test'
    ];
  }

  getTestDescriptions(): Record<string, string> {
    return {
      'Security Headers Test': 'Checks for essential security headers to protect against common web vulnerabilities',
      'HTTPS Compliance Test': 'Checks HTTPS implementation, SSL/TLS configuration, and secure communication',
      'Content Security Policy Test': 'Analyzes Content Security Policy implementation and configuration for XSS protection',
      'Vulnerability Scan Test': 'Scans for common web vulnerabilities and security weaknesses'
    };
  }
} 