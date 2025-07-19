import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class SemanticHtmlTest extends BaseAccessibilityTest {
  name = 'Semantic HTML';
  description = 'Check for proper semantic HTML structure';
  category = 'semantic';
  priority = 'medium';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        let totalIssues = 0;

        // Check heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headingLevels: number[] = [];
        
        headings.forEach((heading: Element) => {
          const level = parseInt(heading.tagName.charAt(1));
          headingLevels.push(level);
        });

        // Check for proper heading hierarchy
        for (let i = 1; i < headingLevels.length; i++) {
          if (headingLevels[i] - headingLevels[i - 1] > 1) {
            totalIssues++;
            issues.push(`Heading hierarchy skipped: h${headingLevels[i - 1]} followed by h${headingLevels[i]}`);
          }
        }

        // Check for multiple h1 elements
        const h1Elements = document.querySelectorAll('h1');
        if (h1Elements.length > 1) {
          warnings.push(`Multiple h1 elements found (${h1Elements.length})`);
        }

        // Check for semantic elements
        const semanticElements = document.querySelectorAll('main, nav, header, footer, section, article, aside');
        const divElements = document.querySelectorAll('div');
        const semanticRatio = semanticElements.length / (semanticElements.length + divElements.length);

        if (semanticRatio < 0.1) {
          warnings.push(`Low semantic HTML usage: ${(semanticRatio * 100).toFixed(1)}% semantic elements`);
        }

        // Check for lists
        const lists = document.querySelectorAll('ul, ol');
        const listItems = document.querySelectorAll('li');
        const orphanedListItems = document.querySelectorAll('li:not(ul li):not(ol li)');

        if (orphanedListItems.length > 0) {
          totalIssues++;
          issues.push(`${orphanedListItems.length} list items outside of list containers`);
        }

        // Check for tables
        const tables = document.querySelectorAll('table');
        tables.forEach((table: Element) => {
          const tableElement = table as HTMLTableElement;
          const hasCaption = tableElement.querySelector('caption');
          const hasThead = tableElement.querySelector('thead');
          const hasTbody = tableElement.querySelector('tbody');
          
          if (!hasCaption) {
            warnings.push(`Table missing caption: ${tableElement.outerHTML}`);
          }
          
          if (!hasThead && !hasTbody) {
            warnings.push(`Table missing thead or tbody: ${tableElement.outerHTML}`);
          }
        });

        // Check for proper list structure
        const definitionLists = document.querySelectorAll('dl');
        definitionLists.forEach((dl: Element) => {
          const hasDt = dl.querySelector('dt');
          const hasDd = dl.querySelector('dd');
          
          if (!hasDt || !hasDd) {
            totalIssues++;
            issues.push(`Definition list missing dt or dd: ${dl.outerHTML}`);
          }
        });

        return {
          totalIssues,
          issues,
          warnings,
          stats: {
            headings: headings.length,
            semanticElements: semanticElements.length,
            divElements: divElements.length,
            semanticRatio,
            lists: lists.length,
            listItems: listItems.length,
            tables: tables.length
          }
        };
      });

      return this.createResult(
        result.totalIssues === 0,
        result.totalIssues,
        result.issues,
        result.warnings,
        { 
          category: 'semantic-html',
          stats: result.stats
        }
      );

    } catch (error) {
      return this.createErrorResult(`Semantic HTML test failed: ${error}`);
    }
  }
} 