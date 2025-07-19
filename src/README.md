# Accessibility Test CLI - Source Structure

This documentation describes the new structured folder organization of the Accessibility Test CLI.

## 📁 Ordnerstruktur

```
src/
├── index.ts                  # Haupt-Einstiegspunkt
├── types.ts                  # TypeScript Typen und Interfaces
├── README.md                 # Diese Dokumentation
├── core/                     # Kern-Funktionalität
│   ├── index.ts             # Core-Module Export
│   ├── accessibility-checker.ts
│   └── standard-pipeline.ts
├── parsers/                  # Parser für verschiedene Datenquellen
│   ├── index.ts             # Parser-Module Export
│   └── sitemap-parser.ts
├── generators/               # Output-Generatoren
│   ├── index.ts             # Generator-Module Export
│   └── output-generator.ts
├── reports/                  # Report-Generatoren
│   ├── index.ts             # Report-Module Export
│   └── detailed-report.ts
└── tests/                    # Accessibility-Test-Suite
    ├── index.ts             # Test-Module Export
    ├── base-test.ts         # Basis-Test-Klasse
    ├── test-manager.ts      # Test-Manager
    ├── README.md            # Test-Dokumentation
    ├── form/                # Formular-Tests
    ├── keyboard/            # Keyboard Navigation Tests
    ├── aria/                # ARIA Tests
    ├── semantic/            # Semantic HTML Tests
    ├── media/               # Media Accessibility Tests
    ├── language/            # Language & i18n Tests (geplant)
    ├── performance/         # Performance Tests (geplant)
    └── validation/          # Validation Tests (geplant)
```

## 🏗️ Module Organization

### **Core Module** (`src/core/`)
Core functionality for accessibility testing:
- **AccessibilityChecker**: Main test engine with Playwright and pa11y
- **StandardPipeline**: Standardized test pipeline for automated execution

### **Parsers** (`src/parsers/`)
Parsers for different data sources:
- **SitemapParser**: XML sitemap parser with URL filtering and conversion

### **Generators** (`src/generators/`)
Output generators for different formats:
- **OutputGenerator**: Markdown, JSON, CSV, HTML output generation

### **Reports** (`src/reports/`)
Specialized report generators:
- **DetailedReportGenerator**: AI-optimized detailed error reports

### **Tests** (`src/tests/`)
Modular accessibility test suite:
- **BaseAccessibilityTest**: Base class for all tests
- **TestManager**: Coordination and execution of tests
- Categorized tests (form, keyboard, aria, semantic, media)

## 🔄 Import Structure

### **Index Files**
Each folder has an `index.ts` file that exports all modules:

```typescript
// src/core/index.ts
export { AccessibilityChecker } from './accessibility-checker';
export { StandardPipeline } from './standard-pipeline';

// src/parsers/index.ts
export { SitemapParser } from './sitemap-parser';

// src/generators/index.ts
export { OutputGenerator } from './output-generator';

// src/reports/index.ts
export { DetailedReportGenerator } from './detailed-report';
```

### **Import Examples**
```typescript
// From core
import { AccessibilityChecker, StandardPipeline } from './core';

// From parsers
import { SitemapParser } from './parsers';

// From generators
import { OutputGenerator } from './generators';

// From reports
import { DetailedReportGenerator } from './reports';

// From tests
import { TestManager, FormLabelTest } from './tests';
```

## 🎯 Benefits of the New Structure

### **Organization**
- ✅ **Logical Grouping**: Similar functionality is grouped together
- ✅ **Clear Responsibilities**: Each folder has a specific purpose
- ✅ **Easy Navigation**: Intuitive folder structure

### **Maintainability**
- ✅ **Modular Architecture**: Individual modules can be changed independently
- ✅ **Index Files**: Central export points for easy imports
- ✅ **Clear Dependencies**: Import paths show relationships

### **Extensibility**
- ✅ **New Parsers**: Easy to add in `parsers/`
- ✅ **New Generators**: Easy to add in `generators/`
- ✅ **New Tests**: Easy to add in `tests/`
- ✅ **New Reports**: Easy to add in `reports/`

### **Testability**
- ✅ **Isolated Modules**: Each module can be tested independently
- ✅ **Clear Interfaces**: Index files define public APIs
- ✅ **Structured Tests**: Test suite is self-organized

## 🚀 Migration

The migration to the new structure was seamless:
1. **Files moved** to appropriate folders
2. **Index files created** for easy imports
3. **Import paths updated** in all files
4. **CLI paths adjusted** for the new structure

## 📈 Next Steps

The new structure enables easy extensions:

1. **New Parsers**: RSS, JSON, CSV parsers in `parsers/`
2. **New Generators**: PDF, Excel generators in `generators/`
3. **New Reports**: Compliance reports in `reports/`
4. **New Tests**: Color contrast, language tests in `tests/`

## 🔧 Development

### **Adding a New Module**
1. Create file in the appropriate folder
2. Export in `index.ts`
3. Import in other modules

### **Adding a New Test**
1. Create test class in appropriate `tests/` subfolder
2. Inherit from `BaseAccessibilityTest`
3. Register in `TestManager`
4. Export in `tests/index.ts` 