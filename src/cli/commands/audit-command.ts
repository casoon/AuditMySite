/**
 * 🔧 Audit Command
 * 
 * Main command for running accessibility audits.
 * Replaces the monolithic CLI logic with clean command structure.
 */

import { BaseCommand, CommandArgs, CommandResult } from './base-command';
import { StandardPipeline, StandardPipelineOptions } from '../../core/pipeline/standard-pipeline';
import { SitemapDiscovery } from '../../core/parsers/sitemap-discovery';
import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';

export interface AuditCommandArgs extends CommandArgs {
  sitemapUrl: string;
  full?: boolean;
  maxPages?: number;
  expert?: boolean;
  format?: 'html' | 'markdown';
  outputDir?: string;
  nonInteractive?: boolean;
  verbose?: boolean;
  budget?: string;
  lcpBudget?: number;
  clsBudget?: number;
  fcpBudget?: number;
  inpBudget?: number;
  ttfbBudget?: number;
  unifiedQueue?: boolean;
}

export class AuditCommand extends BaseCommand {
  constructor() {
    super('audit', 'Run accessibility audit on sitemap URLs');
  }

  protected validate(args: AuditCommandArgs): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate sitemap URL
    const urlValidation = this.validateSitemapUrl(args.sitemapUrl);
    if (!urlValidation.valid) {
      errors.push(`Invalid sitemap URL: ${urlValidation.error}`);
    }

    // Validate maxPages if provided
    if (args.maxPages !== undefined) {
      if (args.maxPages < 1 || args.maxPages > 1000) {
        errors.push('maxPages must be between 1 and 1000');
      }
    }

    // Validate format
    if (args.format && !['html', 'markdown'].includes(args.format)) {
      errors.push('format must be either "html" or "markdown"');
    }

    // Validate budget template
    if (args.budget && !['default', 'ecommerce', 'corporate', 'blog'].includes(args.budget)) {
      errors.push('budget must be one of: default, ecommerce, corporate, blog');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  async execute(args: AuditCommandArgs): Promise<CommandResult> {
    try {
      // Validate arguments
      const validation = this.validate(args);
      if (!validation.valid) {
        return this.error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Show header
      const packageJson = require('../../../package.json');
      this.logProgress(`AuditMySite v${packageJson.version} - Enhanced Accessibility Testing`);
      this.logProgress(`Sitemap: ${args.sitemapUrl}`);

      // Determine configuration
      const config = await this.buildConfiguration(args);
      
      // Show configuration summary
      this.showConfigurationSummary(config, args);

      // Discover sitemap if needed
      const finalSitemapUrl = await this.discoverSitemap(args.sitemapUrl);

      // Create output directory
      const outputInfo = this.setupOutputDirectory(finalSitemapUrl, args.outputDir);

      // Run the audit
      const result = await this.runAudit(finalSitemapUrl, config, outputInfo);

      // Show results
      this.showResults(result);

      return this.success('Audit completed successfully', result);

    } catch (error) {
      const errorMessage = this.formatError(error);
      this.logError(`Audit failed: ${errorMessage}`);
      
      if (args.verbose) {
        console.error('Full error details:', error);
      } else {
        this.logProgress('Run with --verbose for detailed error information');
      }

      return this.error(errorMessage);
    }
  }

  private async buildConfiguration(args: AuditCommandArgs): Promise<StandardPipelineOptions> {
    // Smart defaults
    const baseConfig: StandardPipelineOptions = {
      maxPages: args.maxPages || (args.full ? 1000 : 5),
      timeout: 10000,
      pa11yStandard: 'WCAG2AA',
      outputDir: args.outputDir || './reports',
      outputFormat: args.format || 'html',
      maxConcurrent: 2,
      generateDetailedReport: true,
      generatePerformanceReport: true,
      generateSeoReport: false,
      generateSecurityReport: false,
      usePa11y: true,
      collectPerformanceMetrics: true,
      useUnifiedQueue: args.unifiedQueue || false, // NEW: Use unified queue system
      verbose: args.verbose || false
    };

    // Expert mode - interactive configuration
    if (args.expert && !args.nonInteractive) {
      return await this.runExpertMode(baseConfig);
    }

    // Build performance budget
    baseConfig.performanceBudget = this.buildPerformanceBudget(args);

    return baseConfig;
  }

  private async runExpertMode(baseConfig: StandardPipelineOptions): Promise<StandardPipelineOptions> {
    this.logProgress('Expert Mode - Custom Configuration');
    console.log('━'.repeat(50));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'maxPages',
        message: '🔢 How many pages to test?',
        choices: [
          { name: '⚡ 5 pages (Quick test) - ~2 minutes', value: 5 },
          { name: '🎯 20 pages (Standard test) - ~8 minutes', value: 20 },
          { name: '📊 50 pages (Comprehensive) - ~20 minutes', value: 50 },
          { name: '🚀 All pages (Maximum coverage) - varies', value: 1000 }
        ],
        default: baseConfig.maxPages
      },
      {
        type: 'list',
        name: 'standard',
        message: '♿ Accessibility standard?',
        choices: [
          { name: '🎯 WCAG 2.1 AA (Recommended) - Industry standard', value: 'WCAG2AA' },
          { name: '⭐ WCAG 2.1 AAA (Strict) - Highest compliance', value: 'WCAG2AAA' },
          { name: '🇺🇸 Section 508 (US Federal) - Government sites', value: 'Section508' }
        ],
        default: baseConfig.pa11yStandard
      },
      {
        type: 'list',
        name: 'format',
        message: '📄 Report format?',
        choices: [
          { name: '🌐 HTML - Professional reports for stakeholders', value: 'html' },
          { name: '📝 Markdown - Developer-friendly, version control', value: 'markdown' }
        ],
        default: baseConfig.outputFormat
      },
      {
        type: 'confirm',
        name: 'useUnifiedQueue',
        message: '🔧 Use the NEW Unified Queue System? (Recommended)',
        default: true
      },
      {
        type: 'number',
        name: 'maxConcurrent',
        message: '🔄 Concurrent page tests (1-5)?',
        default: baseConfig.maxConcurrent,
        validate: (value) => {
          const num = parseInt(value);
          if (num >= 1 && num <= 5) return true;
          return 'Please enter a number between 1 and 5';
        }
      }
    ]);

    return {
      ...baseConfig,
      maxPages: answers.maxPages,
      pa11yStandard: answers.standard,
      outputFormat: answers.format,
      useUnifiedQueue: answers.useUnifiedQueue,
      maxConcurrent: answers.maxConcurrent
    };
  }

  private buildPerformanceBudget(args: AuditCommandArgs): any {
    const { BUDGET_TEMPLATES } = require('../../core/performance/web-vitals-collector');

    // Custom budget from CLI options
    if (args.lcpBudget || args.clsBudget || args.fcpBudget || args.inpBudget || args.ttfbBudget) {
      const defaultBudget = BUDGET_TEMPLATES[args.budget || 'default'];
      return {
        lcp: { 
          good: args.lcpBudget || defaultBudget.lcp.good, 
          poor: (args.lcpBudget || defaultBudget.lcp.good) * 1.6 
        },
        cls: { 
          good: args.clsBudget || defaultBudget.cls.good, 
          poor: (args.clsBudget || defaultBudget.cls.good) * 2.5 
        },
        fcp: { 
          good: args.fcpBudget || defaultBudget.fcp.good, 
          poor: (args.fcpBudget || defaultBudget.fcp.good) * 1.7 
        },
        inp: { 
          good: args.inpBudget || defaultBudget.inp.good, 
          poor: (args.inpBudget || defaultBudget.inp.good) * 2.5 
        },
        ttfb: { 
          good: args.ttfbBudget || defaultBudget.ttfb.good, 
          poor: (args.ttfbBudget || defaultBudget.ttfb.good) * 2 
        }
      };
    }

    // Template budget
    const template = args.budget || 'default';
    return BUDGET_TEMPLATES[template] || BUDGET_TEMPLATES.default;
  }

  private showConfigurationSummary(config: StandardPipelineOptions, args: AuditCommandArgs): void {
    console.log('\\n📋 Configuration:');
    console.log(`   📄 Pages: ${config.maxPages === 1000 ? 'All' : config.maxPages}`);
    console.log(`   📋 Standard: ${config.pa11yStandard}`);
    console.log(`   📊 Performance: ${config.generatePerformanceReport ? 'Yes' : 'No'}`);
    console.log(`   🔧 Queue System: ${config.useUnifiedQueue ? 'Unified (NEW)' : 'Legacy'}`);
    console.log(`   📄 Format: ${config.outputFormat?.toUpperCase()}`);
    console.log(`   📁 Output: ${config.outputDir}`);
  }

  private async discoverSitemap(sitemapUrl: string): Promise<string> {
    if (sitemapUrl.includes('sitemap.xml') || sitemapUrl.includes('sitemap')) {
      return sitemapUrl;
    }

    this.logProgress('Discovering sitemap...');
    const discovery = new SitemapDiscovery();
    const result = await discovery.discoverSitemap(sitemapUrl);

    if (result.found) {
      const finalUrl = result.sitemaps[0];
      this.logSuccess(`Found sitemap: ${finalUrl} (method: ${result.method})`);
      if (result.sitemaps.length > 1) {
        this.logProgress(`Additional sitemaps found: ${result.sitemaps.length - 1}`);
      }
      return finalUrl;
    } else {
      result.warnings.forEach(warning => this.logWarning(warning));
      throw new Error('No sitemap found');
    }
  }

  private setupOutputDirectory(sitemapUrl: string, outputDir: string = './reports'): { dir: string; domain: string } {
    const domain = this.extractDomain(sitemapUrl);
    const subDir = path.join(outputDir, domain);
    
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }

    return { dir: subDir, domain };
  }

  private async runAudit(sitemapUrl: string, config: StandardPipelineOptions, outputInfo: any): Promise<any> {
    this.logProgress('Starting accessibility test...');

    const pipeline = new StandardPipeline();
    const startTime = Date.now();

    const result = await pipeline.run({
      sitemapUrl,
      ...config,
      outputDir: outputInfo.dir,
      timestamp: new Date().toISOString()
    });

    const totalTime = Date.now() - startTime;
    const avgSpeed = result.summary.testedPages / (totalTime / 60000); // pages per minute

    this.logSuccess(`Completed ${result.summary.testedPages} pages in ${this.formatDuration(totalTime)}`);
    this.logProgress(`Average speed: ${avgSpeed.toFixed(1)} pages/minute`);

    return result;
  }

  private showResults(result: any): void {
    const { summary, outputFiles } = result;

    console.log('\\n📊 Results:');
    console.log(`   📄 Tested: ${summary.testedPages} pages`);
    console.log(`   ✅ Passed: ${summary.passedPages}`);
    console.log(`   ❌ Failed: ${summary.failedPages}`);
    console.log(`   ⚠️  Errors: ${summary.totalErrors}`);
    console.log(`   ⚠️  Warnings: ${summary.totalWarnings}`);

    const successRate = summary.testedPages > 0 ? 
      (summary.passedPages / summary.testedPages * 100).toFixed(1) : 0;
    console.log(`   🎯 Success Rate: ${successRate}%`);

    if (outputFiles.length > 0) {
      console.log('\\n📁 Generated reports:');
      outputFiles.forEach((file: string) => {
        console.log(`   📄 ${path.basename(file)}`);
      });
    }

    // Status summary
    if (summary.crashedPages > 0) {
      this.logError(`${summary.crashedPages} pages crashed due to technical errors`);
    } else if (summary.failedPages > 0) {
      this.logWarning(`${summary.failedPages} pages failed accessibility tests (this is normal for real websites)`);
      this.logProgress('Check the detailed report for specific issues to fix');
    }
  }
}
