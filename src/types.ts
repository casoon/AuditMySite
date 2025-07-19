export interface Pa11yIssue {
  code: string;
  message: string;
  type: 'error' | 'warning' | 'notice';
  selector?: string;
  context?: string;
  impact?: string;
  help?: string;
  helpUrl?: string;
}

export interface AccessibilityResult {
  url: string;
  title: string;
  imagesWithoutAlt: number;
  buttonsWithoutLabel: number;
  headingsCount: number;
  errors: string[];
  warnings: string[];
  passed: boolean;
  duration: number;
  pa11yIssues?: Pa11yIssue[];
  pa11yScore?: number;
  performanceMetrics?: {
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  };
  keyboardNavigation?: string[];
  colorContrastIssues?: string[];
  focusManagementIssues?: string[];
  screenshots?: {
    desktop?: string;
    mobile?: string;
  };
  consoleErrors?: string[];
  networkErrors?: string[];
  // 🆕 Lighthouse-Ergebnisse
  lighthouseScores?: LighthouseScores;
  lighthouseMetrics?: LighthouseMetrics;
}

export interface TestOptions {
  maxPages?: number;
  timeout?: number;
  waitUntil?: "domcontentloaded" | "load" | "networkidle";
  filterPatterns?: string[];
  includePatterns?: string[];
  verbose?: boolean;
  output?: "console" | "json" | "html";
  outputFile?: string;
  pa11yStandard?: 'WCAG2A' | 'WCAG2AA' | 'WCAG2AAA' | 'Section508';
  hideElements?: string;
  includeNotices?: boolean;
  includeWarnings?: boolean;
  includePasses?: boolean;
  runners?: string[];
  wait?: number;
  chromeLaunchConfig?: any;
  captureScreenshots?: boolean;
  testKeyboardNavigation?: boolean;
  testColorContrast?: boolean;
  testFocusManagement?: boolean;
  collectPerformanceMetrics?: boolean;
  blockImages?: boolean;
  blockCSS?: boolean;
  mobileEmulation?: boolean;
  viewportSize?: { width: number; height: number };
  userAgent?: string;

  // 🚀 Parallele Test-Optionen
  maxConcurrent?: number;              // Anzahl paralleler Worker (Default: 3)
  maxRetries?: number;                 // Max. Retry-Versuche (Default: 3)
  retryDelay?: number;                 // Retry-Delay in ms (Default: 2000)
  enableProgressBar?: boolean;         // Progress-Bar aktivieren (Default: true)
  progressUpdateInterval?: number;     // Progress-Update-Interval in ms (Default: 1000)
  enableResourceMonitoring?: boolean;  // Resource-Monitoring aktivieren (Default: true)
  maxMemoryUsage?: number;             // Max. Memory-Verbrauch in MB (Default: 512)
  maxCpuUsage?: number;                // Max. CPU-Verbrauch in % (Default: 80)
  useParallelTesting?: boolean;        // Parallele Tests aktivieren (Default: false)
  // 🆕 Legacy-Option für sequenzielle Tests (nur für Kompatibilität)
  useSequentialTesting?: boolean;
  // 🆕 Output-Format-Option
  outputFormat?: 'markdown' | 'html';
  includeCopyButtons?: boolean;
  // 🆕 pa11y-Optionen
  usePa11y?: boolean;
  // 🆕 Lighthouse-Optionen
  lighthouse?: boolean;
}

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface LighthouseMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
  speedIndex: number;
}

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export interface TestSummary {
  totalPages: number;
  testedPages: number;
  passedPages: number;
  failedPages: number;
  totalErrors: number;
  totalWarnings: number;
  totalDuration: number;
  results: AccessibilityResult[];
}
