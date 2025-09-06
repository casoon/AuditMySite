# Detailed Accessibility Error Report
Generated: 2025-09-06T08:50:31.863Z
Total Issues: 61

## Page: https://casoon.de/assets/js/plugins/photoswipe/include/photoswipe/

### Issue 1
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Documents must have <title> element to aid in navigation (https://dequeuniversity.com/rules/axe/4.10/document-title?application=axeAPI)
- **Code:** document-title
- **Selector:** `html`
- **Context:** `<html><head></head><body><div class="...</html>`
- **Line:** 423
- **HTML Snippet:**
```html
<html><head></head><body><div class="...</html>
```

### Issue 2
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** <html> element must have a lang attribute (https://dequeuniversity.com/rules/axe/4.10/html-has-lang?application=axeAPI)
- **Code:** html-has-lang
- **Selector:** `html`
- **Context:** `<html><head></head><body><div class="...</html>`
- **Line:** 423
- **HTML Snippet:**
```html
<html><head></head><body><div class="...</html>
```

### Issue 3
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** ARIA hidden element must not be focusable or contain focusable elements (https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus?application=axeAPI)
- **Code:** aria-hidden-focus
- **Selector:** `html > body > div`
- **Context:** `<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><di...</div>`
- **Line:** 849
- **HTML Snippet:**
```html
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><di...</div>
```

### Issue 4
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** A title should be provided for the document, using a non-empty title element in the head section.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl
- **Selector:** `html > head`
- **Context:** `<head></head>`
- **Line:** 386
- **HTML Snippet:**
```html
<head></head>
```

### Issue 5
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** The html element should have a lang or xml:lang attribute which describes the language of the document.
- **Code:** WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2
- **Selector:** `html`
- **Context:** `<html><head></head><body><div class="...</html>`
- **Line:** 423
- **HTML Snippet:**
```html
<html><head></head><body><div class="...</html>
```

### Issue 6
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_2.G57

### Issue 7
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_3.G96

### Issue 8
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_4.

### Issue 9
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that any information conveyed using colour alone is also available in text, or through other visual cues.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182

### Issue 10
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_4.G142

### Issue 11
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206

### Issue 12
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78

### Issue 13
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35

### Issue 14
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_13.F95

### Issue 15
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     
- **Code:** WCAG2AA.Principle2.Guideline2_1.2_1_4.

### Issue 16
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.
- **Code:** WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191

### Issue 17
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.
- **Code:** WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176

### Issue 18
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69

### Issue 19
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If tabindex is used, check that the tab order specified by the tabindex attributes follows relationships in the content.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_3.H4.2

### Issue 20
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185

### Issue 21
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that headings and labels describe topic or purpose.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131

### Issue 22
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31

### Issue 23
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_1.

### Issue 24
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_2.

### Issue 25
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96

### Issue 26
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_4.

### Issue 27
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.
- **Code:** WCAG2AA.Principle3.Guideline3_1.3_1_2.H58

### Issue 28
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_3.G61

### Issue 29
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_4.G197

### Issue 30
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_3.

### Issue 31
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** document-title: Documents must have <title> element to aid in navigation (https://dequeuniversity.com/rules/axe/4.10/document-title?application=axeAPI)
- **Line:** 971
- **HTML Snippet:**
```html
<title>
```

### Issue 32
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** html-has-lang: <html> element must have a lang attribute (https://dequeuniversity.com/rules/axe/4.10/html-has-lang?application=axeAPI)
- **Line:** 160
- **HTML Snippet:**
```html
<html>
```

### Issue 33
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements (https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus?application=axeAPI)

### Issue 34
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl: A title should be provided for the document, using a non-empty title element in the head section.

### Issue 35
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2: The html element should have a lang or xml:lang attribute which describes the language of the document.

### Issue 36
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** 6 buttons without aria-label

### Issue 37
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_2.G57: Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.

### Issue 38
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_3.G96: Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.

### Issue 39
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_4.: Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

### Issue 40
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182: Check that any information conveyed using colour alone is also available in text, or through other visual cues.

### Issue 41
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_4.G142: Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.

### Issue 42
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.

### Issue 43
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78: Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

### Issue 44
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35: Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.

### Issue 45
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_13.F95: Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

### Issue 46
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_1.2_1_4.: Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     

### Issue 47
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191: If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.

### Issue 48
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176: Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.

### Issue 49
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69: Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.

### Issue 50
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_3.H4.2: If tabindex is used, check that the tab order specified by the tabindex attributes follows relationships in the content.

### Issue 51
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185: If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.

### Issue 52
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131: Check that headings and labels describe topic or purpose.

### Issue 53
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31: Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.

### Issue 54
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_1.: Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.

### Issue 55
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_2.: Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.

### Issue 56
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 57
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_4.: Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     

### Issue 58
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_1.3_1_2.H58: Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.

### Issue 59
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_3.G61: Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.

### Issue 60
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_4.G197: Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.

### Issue 61
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle4.Guideline4_1.4_1_3.: Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
