# Detailed Accessibility Error Report
Generated: 2025-07-19T19:54:35.633Z
Total Errors: 5
Total Warnings: 2
Failed Pages: 1

## Executive Summary

This report contains structured accessibility errors that can be automatically fixed by AI tools.
- **Critical Issues**: 5 errors requiring immediate attention
- **Warnings**: 2 issues for improvement
- **Pages with Issues**: 1 out of 1 tested
- **Success Rate**: 0.0%

## Errors Grouped by Type

### Missing Alt Attributes (1 occurrences)

#### Error 1: Test Page
- **URL**: http://localhost:4321/test-page
- **Error**: Missing alt attribute on image
- **Element**: Bild-Element ohne alt-Attribut
- **Context**: `Images without alt attributes or with empty alt text`

### Missing ARIA Labels (1 occurrences)

#### Error 1: Test Page
- **URL**: http://localhost:4321/test-page
- **Error**: Button without aria-label
- **Element**: Button-Element ohne aria-label
- **Context**: `Buttons without aria-label or aria-labelledby attributes`

### WCAG Compliance Issue (3 occurrences)

#### Error 1: Test Page
- **URL**: http://localhost:4321/test-page
- **Error**: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.25:1. Recommendation: change background to #fff.
- **Element**: <p> (Zeile ~446): "Dies ist ein Beispieltext mit ..."
- **Context**: `<p style="color: #666; background-color: #f0f0f0;">Dies ist ein Beispieltext mit unzureichendem Kontrast</p>`

#### Error 2: Test Page
- **URL**: http://localhost:4321/test-page
- **Error**: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.74:1. Recommendation: change background to #00a3b7.
- **Element**: <span> (Zeile ~906): "Weiterer Text mit Kontrastprob..."
- **Context**: `<span style="color: #333; background-color: #e0e0e0;">Weiterer Text mit Kontrastproblem</span>`

#### Error 3: Test Page
- **URL**: http://localhost:4321/test-page
- **Error**: <video> elements must have captions
- **Element**: <video> (Zeile ~51)
- **Context**: `<video src="demo.mp4" controls></video>`

## Detailed Error List

### Error 1
- **Page**: http://localhost:4321/test-page
- **Title**: Test Page
- **Type**: Missing Alt Attributes
- **Code**: PLAYWRIGHT_ERROR
- **Message**: Missing alt attribute on image
- **Element**: Bild-Element ohne alt-Attribut
- **Context**: `Images without alt attributes or with empty alt text`
- **Code Example**:
```html
<img src="image.jpg" alt="Descriptive text about the image">
```
- **Recommendation**: Add descriptive alt text to all images that convey information

### Error 2
- **Page**: http://localhost:4321/test-page
- **Title**: Test Page
- **Type**: Missing ARIA Labels
- **Code**: PLAYWRIGHT_ERROR
- **Message**: Button without aria-label
- **Element**: Button-Element ohne aria-label
- **Context**: `Buttons without aria-label or aria-labelledby attributes`
- **Code Example**:
```html
<button aria-label="Submit form">Submit</button>
```
- **Recommendation**: Add aria-label or aria-labelledby attributes to interactive elements without visible text

### Error 3
- **Page**: http://localhost:4321/test-page
- **Title**: Test Page
- **Type**: WCAG Compliance Issue
- **Code**: WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Message**: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.25:1. Recommendation: change background to #fff.
- **Element**: <p> (Zeile ~446): "Dies ist ein Beispieltext mit ..."
- **Context**: `<p style="color: #666; background-color: #f0f0f0;">Dies ist ein Beispieltext mit unzureichendem Kontrast</p>`
- **Recommendation**: Review WCAG guidelines for this specific error type

### Error 4
- **Page**: http://localhost:4321/test-page
- **Title**: Test Page
- **Type**: WCAG Compliance Issue
- **Code**: WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail
- **Message**: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.74:1. Recommendation: change background to #00a3b7.
- **Element**: <span> (Zeile ~906): "Weiterer Text mit Kontrastprob..."
- **Context**: `<span style="color: #333; background-color: #e0e0e0;">Weiterer Text mit Kontrastproblem</span>`
- **Recommendation**: Review WCAG guidelines for this specific error type

### Error 5
- **Page**: http://localhost:4321/test-page
- **Title**: Test Page
- **Type**: WCAG Compliance Issue
- **Code**: video-caption
- **Message**: <video> elements must have captions
- **Element**: <video> (Zeile ~51)
- **Context**: `<video src="demo.mp4" controls></video>`
- **Recommendation**: Review WCAG guidelines for this specific error type

## Processing Instructions

This report is structured for automated tools to fix accessibility issues:

1. **Parse each error** using the structured format above
2. **Identify the element** using the provided selector
3. **Apply the recommended fix** based on the error type
4. **Test the fix** to ensure it resolves the issue
5. **Update the code** with the corrected version

### Common Fix Patterns:
- **Missing alt attributes**: Add descriptive alt text to images
- **Missing aria-labels**: Add aria-label or aria-labelledby to interactive elements
- **Color contrast**: Adjust text/background colors for better contrast
- **Heading structure**: Ensure proper heading hierarchy (h1, h2, h3, etc.)
- **Form labels**: Associate form controls with their labels
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible

## Priority List

Process errors in this order for maximum impact:

1. **Missing Alt Attributes** - Missing alt attribute on image (http://localhost:4321/test-page)
2. **Missing ARIA Labels** - Button without aria-label (http://localhost:4321/test-page)
3. **WCAG Compliance Issue** - This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.25:1. Recommendation: change background to #fff. (http://localhost:4321/test-page)
4. **WCAG Compliance Issue** - This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.74:1. Recommendation: change background to #00a3b7. (http://localhost:4321/test-page)
5. **WCAG Compliance Issue** - <video> elements must have captions (http://localhost:4321/test-page)