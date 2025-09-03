# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AuditMySite (`@casoon/auditmysite`) is a TypeScript-based CLI tool for automated accessibility, security, performance, and SEO testing. It uses Playwright and pa11y to audit websites based on their sitemaps, with support for parallel processing, comprehensive reporting, and multiple accessibility standards.

## Common Development Commands

### Build and Development
```bash
# Build the project (TypeScript compilation + alias resolution)
npm run build

# Development mode with watch
npm run dev

# Format code
npm run format

# Lint code
npm run lint
```

### Testing
```bash
# Run full test suite with mock server
npm test

# Run individual test suite only
npm run test:suite

# Start mock server for development
npm run test:mock-server
```

### CLI Usage
```bash
# Local development testing
node bin/audit.js http://localhost:4321/sitemap.xml --max-pages 5

# Production usage
npx @casoon/auditmysite https://example.com/sitemap.xml --max-pages 20 --performance-report --seo-report
```

## Architecture Overview

### Core Components

**Pipeline Architecture**: The system uses a pipeline pattern with the `StandardPipeline` class orchestrating all testing phases:
- Sitemap parsing and URL filtering
- Browser automation setup
- Parallel test execution with queuing
- Report generation across multiple domains

**Event-Driven Queue System**: Default testing mode uses parallel processing with:
- `EventDrivenQueue` for URL processing
- `WorkerPool` for browser instance management
- `ResourceMonitor` for memory/CPU monitoring
- Configurable retry logic and concurrency limits

### Directory Structure
```
src/
├── core/                    # Main business logic
│   ├── accessibility/       # Accessibility testing (pa11y integration)
│   ├── browser/             # Browser automation (Playwright)
│   ├── config/              # Configuration management
│   ├── parsers/             # Sitemap and URL parsing
│   ├── performance/         # Performance metrics collection
│   ├── pipeline/            # Test orchestration and queuing
│   ├── security/            # Security scanning (headers, HTTPS, CSP)
│   ├── seo/                 # SEO analysis
│   ├── tests/               # Test execution logic
│   └── types/               # TypeScript type definitions
├── generators/              # Report generation (HTML, PDF)
└── reports/                 # Report formatting and output
```

### Key Classes

- **StandardPipeline**: Main orchestrator for all testing phases
- **AccessibilityChecker**: Coordinates accessibility tests using Playwright and pa11y
- **BrowserManager**: Manages Playwright browser instances and lifecycle
- **SecurityScanner**: Performs security audits (headers, HTTPS, CSP)
- **EventDrivenQueue**: Handles parallel URL processing with progress tracking
- **ResourceMonitor**: Monitors system resources during testing

### TypeScript Path Aliases
The project uses path aliases for clean imports:
- `@core/*` → `src/core/*`
- `@generators/*` → `src/generators/*`
- `@reports/*` → `src/reports/*`
- `@parsers/*` → `src/parsers/*`
- `@tests/*` → `src/tests/*`

## Testing Strategy

### Test Architecture
- **Mock Server**: Express server providing test pages with various accessibility issues
- **Test Suite**: Comprehensive validation of CLI functionality against expected results
- **Test Runner**: Orchestrates mock server startup/shutdown and test execution

### Running Tests
```bash
# Full test cycle (recommended)
npm test

# Individual components
node test/run-tests.js        # Full integration test
node test/test-suite.js       # Test suite only
```

## CLI Features and Options

### Core Testing Options
- `--max-pages <number>`: Limit pages to test (default: 20)
- `--standard <standard>`: Accessibility standard (WCAG2A/AA/AAA, Section508)
- `--timeout <number>`: Page load timeout in milliseconds

### Report Generation
- `--detailed-report`: Generate AI-friendly error reports
- `--performance-report`: Include performance metrics and Core Web Vitals
- `--seo-report`: Generate SEO analysis
- `--security-scan`: Comprehensive security audit

### Output Formats
- `--format <format>`: Choose between markdown, html, or pdf output
- `--output-dir <dir>`: Specify report output directory

### Parallel Processing (Default)
- `--max-concurrent <number>`: Parallel workers (default: 3)
- `--max-retries <number>`: Retry attempts for failed tests
- `--sequential`: Use legacy sequential processing

## Development Notes

### Browser Automation
The system primarily uses Playwright with optional pa11y integration:
- Playwright handles page navigation, screenshots, performance metrics
- pa11y provides detailed accessibility rule validation
- Lighthouse integration available for comprehensive audits

### Queue Processing
Queue-based parallel processing is the default mode:
- Significantly faster than sequential processing
- Built-in resource monitoring and throttling
- Configurable concurrency and retry logic
- Progress tracking with live updates

### Report Generation
Multi-format report generation with domain-based organization:
- Reports organized by domain in subdirectories
- Timestamped filenames for version tracking
- Support for Markdown, HTML (with copy buttons), and PDF formats
- AI-friendly detailed error reports for automated fixes

### Configuration
The system supports extensive configuration through CLI options and supports:
- German accessibility laws (BFSG, EU 2019/882)
- Multiple WCAG compliance levels
- Mobile emulation and viewport customization
- Performance and security testing toggles

## Important Dependencies

### Core Testing
- `playwright`: Browser automation and page testing
- `pa11y`: Accessibility rule validation
- `lighthouse`: Performance and comprehensive audits

### CLI and UX
- `commander`: CLI argument parsing
- `inquirer`: Interactive prompts for missing options
- `ora`: Progress spinners and status updates
- `chalk`: Colored console output

### Development
- `typescript`: Type safety and compilation
- `tsc-alias`: Path alias resolution for compiled output
- `eslint`: Code linting with TypeScript support
- `prettier`: Code formatting

The codebase follows modern TypeScript practices with strict type checking, comprehensive error handling, and modular architecture designed for scalability and maintainability.
