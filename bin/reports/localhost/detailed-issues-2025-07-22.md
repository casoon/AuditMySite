# Detailed Accessibility Error Report
Generated: 2025-07-22T14:49:26.162Z
Total Issues: 905

## Page: http://localhost:4321/datenschutz
**Title:** Datenschutz

### Issue 1
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 2
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 3
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the title element describes the document.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2
- **Selector:** `html > head > title`
- **Context:** `<title>Datenschutz</title>`
- **Line:** 667
- **HTML Snippet:**
```html
<title>Datenschutz</title>
```

### Issue 4
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 5
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 6
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 7
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 8
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 9
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 10
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > button`
- **Context:** `<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" height="32" vie...</button>`
- **Line:** 743
- **HTML Snippet:**
```html
<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" heigh
```

### Issue 11
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 12
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 13
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 14
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > button`
- **Context:** `<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>`
- **Line:** 226
- **HTML Snippet:**
```html
<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>
```

### Issue 15
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 16
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(1)`
- **Context:** `<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>`
- **Line:** 279
- **HTML Snippet:**
```html
<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>
```

### Issue 17
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(2)`
- **Context:** `<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>`
- **Line:** 483
- **HTML Snippet:**
```html
<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>
```

### Issue 18
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(1)`
- **Context:** `<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>`
- **Line:** 311
- **HTML Snippet:**
```html
<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>
```

### Issue 19
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(2)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>`
- **Line:** 467
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>
```

### Issue 20
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(3)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>`
- **Line:** 847
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>
```

### Issue 21
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(4)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>`
- **Line:** 416
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>
```

### Issue 22
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_2.G57

### Issue 23
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_3.G96

### Issue 24
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_4.

### Issue 25
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that any information conveyed using colour alone is also available in text, or through other visual cues.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182

### Issue 26
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_4.G142

### Issue 27
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel

### Issue 28
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206

### Issue 29
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78

### Issue 30
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35

### Issue 31
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_13.F95

### Issue 32
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     
- **Code:** WCAG2AA.Principle2.Guideline2_1.2_1_4.

### Issue 33
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.
- **Code:** WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191

### Issue 34
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.
- **Code:** WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176

### Issue 35
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69

### Issue 36
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185

### Issue 37
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that headings and labels describe topic or purpose.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131

### Issue 38
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31

### Issue 39
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_1.

### Issue 40
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_2.

### Issue 41
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96

### Issue 42
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_4.

### Issue 43
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.
- **Code:** WCAG2AA.Principle3.Guideline3_1.3_1_2.H58

### Issue 44
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_3.G61

### Issue 45
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_4.G197

### Issue 46
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_3.

### Issue 47
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 48
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.

### Issue 49
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** 6 buttons without aria-label

### Issue 50
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-main-is-top-level: Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)

### Issue 51
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-no-duplicate-main: Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)

### Issue 52
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-unique: Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)

### Issue 53
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** region: All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)

### Issue 54
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2: Check that the title element describes the document.

### Issue 55
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.

### Issue 56
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 57
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 58
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 59
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 60
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 61
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 62
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 63
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 64
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 65
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 66
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 67
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 68
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 69
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 70
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 71
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder: Anchor element found with link content, but no href, ID or name attribute has been supplied.

### Issue 72
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 73
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 74
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 75
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 76
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 77
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 78
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 79
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 80
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_2.G57: Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.

### Issue 81
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_3.G96: Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.

### Issue 82
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_4.: Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

### Issue 83
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182: Check that any information conveyed using colour alone is also available in text, or through other visual cues.

### Issue 84
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_4.G142: Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.

### Issue 85
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel: If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.

### Issue 86
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.

### Issue 87
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78: Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

### Issue 88
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35: Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.

### Issue 89
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_13.F95: Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

### Issue 90
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_1.2_1_4.: Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     

### Issue 91
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191: If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.

### Issue 92
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176: Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.

### Issue 93
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69: Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.

### Issue 94
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185: If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.

### Issue 95
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131: Check that headings and labels describe topic or purpose.

### Issue 96
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31: Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.

### Issue 97
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_1.: Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.

### Issue 98
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_2.: Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.

### Issue 99
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 100
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_4.: Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     

### Issue 101
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_1.3_1_2.H58: Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.

### Issue 102
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_3.G61: Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.

### Issue 103
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_4.G197: Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.

### Issue 104
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle4.Guideline4_1.4_1_3.: Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

### Issue 105
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)
- **Code:** landmark-main-is-top-level
- **Selector:** `#site-content > main > main`
- **Context:** `<main>  <section class="section-paddi...</main>`
- **Line:** 566
- **HTML Snippet:**
```html
<main>  <section class="section-paddi...</main>
```

### Issue 106
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)
- **Code:** landmark-no-duplicate-main
- **Selector:** `#site-content > main`
- **Context:** `<main>   <main>  <section class="sect...</main>`
- **Line:** 662
- **HTML Snippet:**
```html
<main>   <main>  <section class="sect...</main>
```

### Issue 107
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)
- **Code:** landmark-unique
- **Selector:** `#site-content > main`
- **Context:** `<main>   <main>  <section class="sect...</main>`
- **Line:** 662
- **HTML Snippet:**
```html
<main>   <main>  <section class="sect...</main>
```

### Issue 108
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)
- **Code:** region

### Issue 109
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206
- **Selector:** `html > body > astro-island > nav`
- **Context:** `<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>`
- **Line:** 914
- **HTML Snippet:**
```html
<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>
```

### Issue 110
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2)`
- **Context:** `<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-events-none"><!----><a class="px-4 py-2 text...</div>`
- **Line:** 628
- **HTML Snippet:**
```html
<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-ev
```

### Issue 111
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 112
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 113
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 114
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Anchor element found with link content, but no href, ID or name attribute has been supplied.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 115
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

## Page: http://localhost:4321/headline-demo
**Title:** Headline Component Demo

### Issue 1
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 2
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(1) > div > div:nth-child(1) > div > div:nth-child(1) > p`
- **Context:** `<p class="sub-headline" data-astro-cid-72b57o7r="">Hero is about more than cutting...</p>`
- **Line:** 969
- **HTML Snippet:**
```html
<p class="sub-headline" data-astro-cid-72b57o7r="">Hero is about more than cutting...</p>
```

### Issue 3
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(1) > div > div:nth-child(1) > div > div:nth-child(2) > h1`
- **Context:** `<h1 class="main-headline" data-astro-cid-72b57o7r="">Your shortcut to innovation sta...</h1>`
- **Line:** 678
- **HTML Snippet:**
```html
<h1 class="main-headline" data-astro-cid-72b57o7r="">Your shortcut to innovation sta...</h1>
```

### Issue 4
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(1) > p`
- **Context:** `<p class="sub-headline" data-astro-cid-72b57o7r="">Wir entwickeln digitale Lösunge...</p>`
- **Line:** 247
- **HTML Snippet:**
```html
<p class="sub-headline" data-astro-cid-72b57o7r="">Wir entwickeln digitale Lösunge...</p>
```

### Issue 5
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > h1`
- **Context:** `<h1 class="main-headline" data-astro-cid-72b57o7r="">Einfach. Digital. Erfolgreich.</h1>`
- **Line:** 123
- **HTML Snippet:**
```html
<h1 class="main-headline" data-astro-cid-72b57o7r="">Einfach. Digital. Erfolgreich.</h1>
```

### Issue 6
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(3) > div > div:nth-child(1) > div > div:nth-child(1) > p`
- **Context:** `<p class="sub-headline" data-astro-cid-72b57o7r="">Von der Idee bis zur Umsetzung ...</p>`
- **Line:** 714
- **HTML Snippet:**
```html
<p class="sub-headline" data-astro-cid-72b57o7r="">Von der Idee bis zur Umsetzung ...</p>
```

### Issue 7
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(3) > div > div:nth-child(1) > div > div:nth-child(2) > h1`
- **Context:** `<h1 class="main-headline" data-astro-cid-72b57o7r="">Digitale Zukunft gestalten</h1>`
- **Line:** 534
- **HTML Snippet:**
```html
<h1 class="main-headline" data-astro-cid-72b57o7r="">Digitale Zukunft gestalten</h1>
```

### Issue 8
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(4) > div > div:nth-child(1) > div > div:nth-child(2) > h1`
- **Context:** `<h1 class="main-headline" data-astro-cid-72b57o7r="">Innovation trifft Design</h1>`
- **Line:** 463
- **HTML Snippet:**
```html
<h1 class="main-headline" data-astro-cid-72b57o7r="">Innovation trifft Design</h1>
```

### Issue 9
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.25:1. Recommendation:  change background to #fff.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(1) > p`
- **Context:** `<p class="sub-headline" data-astro-cid-72b57o7r="">Wir entwickeln digitale Lösunge...</p>`
- **Line:** 247
- **HTML Snippet:**
```html
<p class="sub-headline" data-astro-cid-72b57o7r="">Wir entwickeln digitale Lösunge...</p>
```

### Issue 10
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.74:1. Recommendation:  change background to #00a3b7.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail
- **Selector:** `#site-content > main > main > section:nth-child(4) > div > div:nth-child(1) > div > div:nth-child(2) > h1`
- **Context:** `<h1 class="main-headline" data-astro-cid-72b57o7r="">Innovation trifft Design</h1>`
- **Line:** 463
- **HTML Snippet:**
```html
<h1 class="main-headline" data-astro-cid-72b57o7r="">Innovation trifft Design</h1>
```

### Issue 11
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 12
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the title element describes the document.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2
- **Selector:** `html > head > title`
- **Context:** `<title>Headline Component Demo</title>`
- **Line:** 632
- **HTML Snippet:**
```html
<title>Headline Component Demo</title>
```

### Issue 13
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 14
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 15
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 16
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 17
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 18
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 19
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > button`
- **Context:** `<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" height="32" vie...</button>`
- **Line:** 743
- **HTML Snippet:**
```html
<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" heigh
```

### Issue 20
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 21
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 22
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 23
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > button`
- **Context:** `<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>`
- **Line:** 226
- **HTML Snippet:**
```html
<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>
```

### Issue 24
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > main > main > section:nth-child(5) > a`
- **Context:** `<a href="/" class="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
Zurück zur Startseite
</a>`
- **Line:** 952
- **HTML Snippet:**
```html
<a href="/" class="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
Zurück zur Startseite
</a>
```

### Issue 25
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 26
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(1)`
- **Context:** `<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>`
- **Line:** 279
- **HTML Snippet:**
```html
<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>
```

### Issue 27
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(2)`
- **Context:** `<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>`
- **Line:** 483
- **HTML Snippet:**
```html
<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>
```

### Issue 28
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(1)`
- **Context:** `<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>`
- **Line:** 311
- **HTML Snippet:**
```html
<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>
```

### Issue 29
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(2)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>`
- **Line:** 467
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>
```

### Issue 30
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(3)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>`
- **Line:** 847
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>
```

### Issue 31
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(4)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>`
- **Line:** 416
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>
```

### Issue 32
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_2.G57

### Issue 33
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_3.G96

### Issue 34
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_4.

### Issue 35
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that any information conveyed using colour alone is also available in text, or through other visual cues.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182

### Issue 36
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_4.G142

### Issue 37
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel

### Issue 38
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206

### Issue 39
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78

### Issue 40
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35

### Issue 41
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_13.F95

### Issue 42
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     
- **Code:** WCAG2AA.Principle2.Guideline2_1.2_1_4.

### Issue 43
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.
- **Code:** WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191

### Issue 44
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.
- **Code:** WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176

### Issue 45
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69

### Issue 46
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185

### Issue 47
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that headings and labels describe topic or purpose.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131

### Issue 48
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31

### Issue 49
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_1.

### Issue 50
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_2.

### Issue 51
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96

### Issue 52
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_4.

### Issue 53
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.
- **Code:** WCAG2AA.Principle3.Guideline3_1.3_1_2.H58

### Issue 54
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_3.G61

### Issue 55
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_4.G197

### Issue 56
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_3.

### Issue 57
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 58
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 59
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 60
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 61
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 62
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 63
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 64
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 65
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.25:1. Recommendation:  change background to #fff.

### Issue 66
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.74:1. Recommendation:  change background to #00a3b7.

### Issue 67
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.

### Issue 68
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** 6 buttons without aria-label

### Issue 69
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** heading-order: Heading levels should only increase by one (https://dequeuniversity.com/rules/axe/4.2/heading-order?application=axeAPI)

### Issue 70
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** heading-order: Heading levels should only increase by one (https://dequeuniversity.com/rules/axe/4.2/heading-order?application=axeAPI)

### Issue 71
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-main-is-top-level: Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)

### Issue 72
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-no-duplicate-main: Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)

### Issue 73
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-unique: Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)

### Issue 74
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** region: All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)

### Issue 75
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2: Check that the title element describes the document.

### Issue 76
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.

### Issue 77
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 78
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 79
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 80
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 81
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 82
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 83
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 84
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 85
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 86
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 87
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 88
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 89
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 90
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 91
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 92
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141: The heading structure is not logically nested. This h3 element should be an h2 to be properly nested.

### Issue 93
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141: The heading structure is not logically nested. This h3 element should be an h2 to be properly nested.

### Issue 94
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 95
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder: Anchor element found with link content, but no href, ID or name attribute has been supplied.

### Issue 96
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 97
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 98
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 99
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 100
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 101
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 102
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 103
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 104
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_2.G57: Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.

### Issue 105
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_3.G96: Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.

### Issue 106
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_4.: Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

### Issue 107
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182: Check that any information conveyed using colour alone is also available in text, or through other visual cues.

### Issue 108
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_4.G142: Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.

### Issue 109
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel: If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.

### Issue 110
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.

### Issue 111
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78: Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

### Issue 112
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35: Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.

### Issue 113
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_13.F95: Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

### Issue 114
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_1.2_1_4.: Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     

### Issue 115
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191: If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.

### Issue 116
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176: Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.

### Issue 117
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69: Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.

### Issue 118
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185: If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.

### Issue 119
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131: Check that headings and labels describe topic or purpose.

### Issue 120
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31: Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.

### Issue 121
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_1.: Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.

### Issue 122
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_2.: Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.

### Issue 123
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 124
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_4.: Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     

### Issue 125
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_1.3_1_2.H58: Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.

### Issue 126
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_3.G61: Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.

### Issue 127
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_4.G197: Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.

### Issue 128
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle4.Guideline4_1.4_1_3.: Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

### Issue 129
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Heading levels should only increase by one (https://dequeuniversity.com/rules/axe/4.2/heading-order?application=axeAPI)
- **Code:** heading-order
- **Selector:** `#site-content > main > main > section:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > h3`
- **Context:** `<h3 class="column-title" data-astro-cid-p5rl6mxl="">AI, at your service</h3>`
- **Line:** 98
- **HTML Snippet:**
```html
<h3 class="column-title" data-astro-cid-p5rl6mxl="">AI, at your service</h3>
```

### Issue 130
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Heading levels should only increase by one (https://dequeuniversity.com/rules/axe/4.2/heading-order?application=axeAPI)
- **Code:** heading-order
- **Selector:** `#site-content > main > main > section:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(1) > h3`
- **Context:** `<h3 class="column-title" data-astro-cid-p5rl6mxl="">Digitale Transformation</h3>`
- **Line:** 429
- **HTML Snippet:**
```html
<h3 class="column-title" data-astro-cid-p5rl6mxl="">Digitale Transformation</h3>
```

### Issue 131
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)
- **Code:** landmark-main-is-top-level
- **Selector:** `#site-content > main > main`
- **Context:** `<main> <!-- Beispiel 1: Mit 3-Spalten...</main>`
- **Line:** 122
- **HTML Snippet:**
```html
<main> <!-- Beispiel 1: Mit 3-Spalten...</main>
```

### Issue 132
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)
- **Code:** landmark-no-duplicate-main
- **Selector:** `#site-content > main`
- **Context:** `<main>  <main> <!-- Beispiel 1: Mit 3...</main>`
- **Line:** 883
- **HTML Snippet:**
```html
<main>  <main> <!-- Beispiel 1: Mit 3...</main>
```

### Issue 133
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)
- **Code:** landmark-unique
- **Selector:** `#site-content > main`
- **Context:** `<main>  <main> <!-- Beispiel 1: Mit 3...</main>`
- **Line:** 883
- **HTML Snippet:**
```html
<main>  <main> <!-- Beispiel 1: Mit 3...</main>
```

### Issue 134
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)
- **Code:** region

### Issue 135
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206
- **Selector:** `html > body > astro-island > nav`
- **Context:** `<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>`
- **Line:** 914
- **HTML Snippet:**
```html
<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>
```

### Issue 136
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2)`
- **Context:** `<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-events-none"><!----><a class="px-4 py-2 text...</div>`
- **Line:** 628
- **HTML Snippet:**
```html
<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-ev
```

### Issue 137
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 138
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 139
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 140
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** The heading structure is not logically nested. This h3 element should be an h2 to be properly nested.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141
- **Selector:** `#site-content > main > main > section:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > h3`
- **Context:** `<h3 class="column-title" data-astro-cid-p5rl6mxl="">AI, at your service</h3>`
- **Line:** 98
- **HTML Snippet:**
```html
<h3 class="column-title" data-astro-cid-p5rl6mxl="">AI, at your service</h3>
```

### Issue 141
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** The heading structure is not logically nested. This h3 element should be an h2 to be properly nested.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141
- **Selector:** `#site-content > main > main > section:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(1) > h3`
- **Context:** `<h3 class="column-title" data-astro-cid-p5rl6mxl="">Digitale Transformation</h3>`
- **Line:** 429
- **HTML Snippet:**
```html
<h3 class="column-title" data-astro-cid-p5rl6mxl="">Digitale Transformation</h3>
```

### Issue 142
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Anchor element found with link content, but no href, ID or name attribute has been supplied.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 143
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

## Page: http://localhost:4321/angebote/webseite
**Title:** Website Angebote - CASOON

### Issue 1
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(1) > span`
- **Context:** `<span class="font-semibold text-secondary-700">SavvyCal</span>`
- **Line:** 579
- **HTML Snippet:**
```html
<span class="font-semibold text-secondary-700">SavvyCal</span>
```

### Issue 2
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > span`
- **Context:** `<span class="font-semibold text-secondary-700">Laravel</span>`
- **Line:** 845
- **HTML Snippet:**
```html
<span class="font-semibold text-secondary-700">Laravel</span>
```

### Issue 3
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(3) > span`
- **Context:** `<span class="font-semibold text-secondary-700">TUPLE</span>`
- **Line:** 540
- **HTML Snippet:**
```html
<span class="font-semibold text-secondary-700">TUPLE</span>
```

### Issue 4
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(4) > span`
- **Context:** `<span class="font-semibold text-secondary-700">Transistor</span>`
- **Line:** 617
- **HTML Snippet:**
```html
<span class="font-semibold text-secondary-700">Transistor</span>
```

### Issue 5
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(5) > span`
- **Context:** `<span class="font-semibold text-secondary-700">statamic</span>`
- **Line:** 566
- **HTML Snippet:**
```html
<span class="font-semibold text-secondary-700">statamic</span>
```

### Issue 6
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 7
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > div > span`
- **Context:** `<span class="text-white font-bold text-sm">L</span>`
- **Line:** 331
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm">L</span>
```

### Issue 8
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.61:1. Recommendation:  change text colour to #767676.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(4) > span:nth-child(1)`
- **Context:** `<span class="w-5 h-5 text-secondary-300 mr-3 mt-0.5">+</span>`
- **Line:** 67
- **HTML Snippet:**
```html
<span class="w-5 h-5 text-secondary-300 mr-3 mt-0.5">+</span>
```

### Issue 9
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.61:1. Recommendation:  change text colour to #767676.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(5) > span:nth-child(1)`
- **Context:** `<span class="w-5 h-5 text-secondary-300 mr-3 mt-0.5">+</span>`
- **Line:** 67
- **HTML Snippet:**
```html
<span class="w-5 h-5 text-secondary-300 mr-3 mt-0.5">+</span>
```

### Issue 10
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 3.53:1. Recommendation:  change background to #484848.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(4) > div > span`
- **Context:** `<span class="text-white font-bold text-sm">+</span>`
- **Line:** 878
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm">+</span>
```

### Issue 11
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 12
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the title element describes the document.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2
- **Selector:** `html > head > title`
- **Context:** `<title>Website Angebote - CASOON</title>`
- **Line:** 20
- **HTML Snippet:**
```html
<title>Website Angebote - CASOON</title>
```

### Issue 13
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 14
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 15
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 16
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 17
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 18
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 19
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > button`
- **Context:** `<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" height="32" vie...</button>`
- **Line:** 743
- **HTML Snippet:**
```html
<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" heigh
```

### Issue 20
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 21
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 22
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 23
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > button`
- **Context:** `<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>`
- **Line:** 226
- **HTML Snippet:**
```html
<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>
```

### Issue 24
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > main > main > section:nth-child(4) > div > div > div > a:nth-child(1)`
- **Context:** `<a href="/kontakt" class="btn-primary">
Kostenlose Beratung vereinbare...</a>`
- **Line:** 119
- **HTML Snippet:**
```html
<a href="/kontakt" class="btn-primary">
Kostenlose Beratung vereinbare...</a>
```

### Issue 25
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > main > main > section:nth-child(4) > div > div > div > a:nth-child(2)`
- **Context:** `<a href="/" class="btn-secondary">
Zurück zur Startseite
</a>`
- **Line:** 131
- **HTML Snippet:**
```html
<a href="/" class="btn-secondary">
Zurück zur Startseite
</a>
```

### Issue 26
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 27
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(1)`
- **Context:** `<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>`
- **Line:** 279
- **HTML Snippet:**
```html
<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>
```

### Issue 28
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(2)`
- **Context:** `<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>`
- **Line:** 483
- **HTML Snippet:**
```html
<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>
```

### Issue 29
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(1)`
- **Context:** `<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>`
- **Line:** 311
- **HTML Snippet:**
```html
<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>
```

### Issue 30
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(2)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>`
- **Line:** 467
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>
```

### Issue 31
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(3)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>`
- **Line:** 847
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>
```

### Issue 32
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(4)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>`
- **Line:** 416
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>
```

### Issue 33
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_2.G57

### Issue 34
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_3.G96

### Issue 35
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_4.

### Issue 36
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that any information conveyed using colour alone is also available in text, or through other visual cues.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182

### Issue 37
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_4.G142

### Issue 38
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel

### Issue 39
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206

### Issue 40
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78

### Issue 41
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35

### Issue 42
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_13.F95

### Issue 43
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     
- **Code:** WCAG2AA.Principle2.Guideline2_1.2_1_4.

### Issue 44
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.
- **Code:** WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191

### Issue 45
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.
- **Code:** WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176

### Issue 46
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69

### Issue 47
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185

### Issue 48
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that headings and labels describe topic or purpose.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131

### Issue 49
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31

### Issue 50
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_1.

### Issue 51
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_2.

### Issue 52
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96

### Issue 53
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_4.

### Issue 54
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.
- **Code:** WCAG2AA.Principle3.Guideline3_1.3_1_2.H58

### Issue 55
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_3.G61

### Issue 56
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_4.G197

### Issue 57
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_3.

### Issue 58
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 59
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 60
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 61
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 62
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 63
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 64
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 65
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.61:1. Recommendation:  change text colour to #767676.

### Issue 66
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.61:1. Recommendation:  change text colour to #767676.

### Issue 67
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 3.53:1. Recommendation:  change background to #484848.

### Issue 68
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.

### Issue 69
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** 6 buttons without aria-label

### Issue 70
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** heading-order: Heading levels should only increase by one (https://dequeuniversity.com/rules/axe/4.2/heading-order?application=axeAPI)

### Issue 71
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-main-is-top-level: Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)

### Issue 72
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-no-duplicate-main: Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)

### Issue 73
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-unique: Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)

### Issue 74
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** region: All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)

### Issue 75
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2: Check that the title element describes the document.

### Issue 76
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.

### Issue 77
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 78
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 79
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 80
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 81
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 82
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 83
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 84
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 85
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 86
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 87
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 88
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 89
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 90
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 91
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 92
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141: The heading structure is not logically nested. This h3 element should be an h2 to be properly nested.

### Issue 93
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 94
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 95
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 96
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder: Anchor element found with link content, but no href, ID or name attribute has been supplied.

### Issue 97
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 98
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 99
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 100
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 101
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 102
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 103
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 104
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 105
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_2.G57: Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.

### Issue 106
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_3.G96: Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.

### Issue 107
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_4.: Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

### Issue 108
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182: Check that any information conveyed using colour alone is also available in text, or through other visual cues.

### Issue 109
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_4.G142: Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.

### Issue 110
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel: If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.

### Issue 111
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.

### Issue 112
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78: Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

### Issue 113
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35: Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.

### Issue 114
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_13.F95: Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

### Issue 115
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_1.2_1_4.: Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     

### Issue 116
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191: If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.

### Issue 117
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176: Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.

### Issue 118
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69: Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.

### Issue 119
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185: If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.

### Issue 120
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131: Check that headings and labels describe topic or purpose.

### Issue 121
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31: Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.

### Issue 122
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_1.: Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.

### Issue 123
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_2.: Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.

### Issue 124
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 125
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_4.: Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     

### Issue 126
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_1.3_1_2.H58: Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.

### Issue 127
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_3.G61: Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.

### Issue 128
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_4.G197: Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.

### Issue 129
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle4.Guideline4_1.4_1_3.: Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

### Issue 130
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Heading levels should only increase by one (https://dequeuniversity.com/rules/axe/4.2/heading-order?application=axeAPI)
- **Code:** heading-order
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3`
- **Context:** `<h3 class="text-sm font-semibold text-secondary-500 uppercase tracking-wider mb-4">STARTER</h3>`
- **Line:** 370
- **HTML Snippet:**
```html
<h3 class="text-sm font-semibold text-secondary-500 uppercase tracking-wider mb-4">STARTER</h3>
```

### Issue 131
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)
- **Code:** landmark-main-is-top-level
- **Selector:** `#site-content > main > main`
- **Context:** `<main>   <section class="py-20 md:py-...</main>`
- **Line:** 41
- **HTML Snippet:**
```html
<main>   <section class="py-20 md:py-...</main>
```

### Issue 132
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)
- **Code:** landmark-no-duplicate-main
- **Selector:** `#site-content > main`
- **Context:** `<main>   <main>   <section class="py-...</main>`
- **Line:** 431
- **HTML Snippet:**
```html
<main>   <main>   <section class="py-...</main>
```

### Issue 133
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)
- **Code:** landmark-unique
- **Selector:** `#site-content > main`
- **Context:** `<main>   <main>   <section class="py-...</main>`
- **Line:** 431
- **HTML Snippet:**
```html
<main>   <main>   <section class="py-...</main>
```

### Issue 134
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)
- **Code:** region

### Issue 135
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206
- **Selector:** `html > body > astro-island > nav`
- **Context:** `<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>`
- **Line:** 914
- **HTML Snippet:**
```html
<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>
```

### Issue 136
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2)`
- **Context:** `<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-events-none"><!----><a class="px-4 py-2 text...</div>`
- **Line:** 628
- **HTML Snippet:**
```html
<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-ev
```

### Issue 137
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 138
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 139
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 140
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** The heading structure is not logically nested. This h3 element should be an h2 to be properly nested.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141
- **Selector:** `#site-content > main > main > section:nth-child(2) > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3`
- **Context:** `<h3 class="text-sm font-semibold text-secondary-500 uppercase tracking-wider mb-4">STARTER</h3>`
- **Line:** 370
- **HTML Snippet:**
```html
<h3 class="text-sm font-semibold text-secondary-500 uppercase tracking-wider mb-4">STARTER</h3>
```

### Issue 141
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#site-content > main > main > section:nth-child(4) > div > div > div`
- **Context:** `<div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/kontakt" class="btn-...</div>`
- **Line:** 989
- **HTML Snippet:**
```html
<div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/kontakt" class="btn-...</div>
```

### Issue 142
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Anchor element found with link content, but no href, ID or name attribute has been supplied.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 143
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

## Page: http://localhost:4321/impressum
**Title:** Impressum

### Issue 1
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 2
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 3
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the title element describes the document.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2
- **Selector:** `html > head > title`
- **Context:** `<title>Impressum</title>`
- **Line:** 223
- **HTML Snippet:**
```html
<title>Impressum</title>
```

### Issue 4
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 5
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 6
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 7
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 8
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 9
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 10
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > button`
- **Context:** `<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" height="32" vie...</button>`
- **Line:** 743
- **HTML Snippet:**
```html
<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" heigh
```

### Issue 11
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 12
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 13
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 14
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > button`
- **Context:** `<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>`
- **Line:** 226
- **HTML Snippet:**
```html
<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>
```

### Issue 15
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 16
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(1)`
- **Context:** `<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>`
- **Line:** 279
- **HTML Snippet:**
```html
<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>
```

### Issue 17
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(2)`
- **Context:** `<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>`
- **Line:** 483
- **HTML Snippet:**
```html
<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>
```

### Issue 18
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(1)`
- **Context:** `<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>`
- **Line:** 311
- **HTML Snippet:**
```html
<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>
```

### Issue 19
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(2)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>`
- **Line:** 467
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>
```

### Issue 20
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(3)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>`
- **Line:** 847
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>
```

### Issue 21
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(4)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>`
- **Line:** 416
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>
```

### Issue 22
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_2.G57

### Issue 23
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_3.G96

### Issue 24
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_4.

### Issue 25
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that any information conveyed using colour alone is also available in text, or through other visual cues.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182

### Issue 26
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_4.G142

### Issue 27
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel

### Issue 28
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206

### Issue 29
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78

### Issue 30
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35

### Issue 31
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_13.F95

### Issue 32
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     
- **Code:** WCAG2AA.Principle2.Guideline2_1.2_1_4.

### Issue 33
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.
- **Code:** WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191

### Issue 34
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.
- **Code:** WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176

### Issue 35
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69

### Issue 36
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185

### Issue 37
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that headings and labels describe topic or purpose.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131

### Issue 38
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31

### Issue 39
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_1.

### Issue 40
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_2.

### Issue 41
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96

### Issue 42
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_4.

### Issue 43
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.
- **Code:** WCAG2AA.Principle3.Guideline3_1.3_1_2.H58

### Issue 44
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_3.G61

### Issue 45
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_4.G197

### Issue 46
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_3.

### Issue 47
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 48
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.

### Issue 49
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** 6 buttons without aria-label

### Issue 50
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-main-is-top-level: Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)

### Issue 51
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-no-duplicate-main: Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)

### Issue 52
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** landmark-unique: Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)

### Issue 53
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** region: All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)

### Issue 54
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2: Check that the title element describes the document.

### Issue 55
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.

### Issue 56
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 57
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 58
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 59
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 60
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 61
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 62
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 63
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 64
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 65
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 66
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 67
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 68
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 69
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 70
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 71
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder: Anchor element found with link content, but no href, ID or name attribute has been supplied.

### Issue 72
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 73
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 74
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 75
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 76
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 77
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 78
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 79
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 80
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_2.G57: Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.

### Issue 81
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_3.G96: Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.

### Issue 82
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_4.: Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

### Issue 83
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182: Check that any information conveyed using colour alone is also available in text, or through other visual cues.

### Issue 84
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_4.G142: Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.

### Issue 85
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel: If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.

### Issue 86
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.

### Issue 87
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78: Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

### Issue 88
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35: Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.

### Issue 89
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_13.F95: Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

### Issue 90
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_1.2_1_4.: Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     

### Issue 91
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191: If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.

### Issue 92
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176: Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.

### Issue 93
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69: Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.

### Issue 94
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185: If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.

### Issue 95
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131: Check that headings and labels describe topic or purpose.

### Issue 96
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31: Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.

### Issue 97
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_1.: Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.

### Issue 98
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_2.: Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.

### Issue 99
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 100
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_4.: Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     

### Issue 101
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_1.3_1_2.H58: Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.

### Issue 102
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_3.G61: Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.

### Issue 103
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_4.G197: Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.

### Issue 104
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle4.Guideline4_1.4_1_3.: Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

### Issue 105
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Main landmark should not be contained in another landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-main-is-top-level?application=axeAPI)
- **Code:** landmark-main-is-top-level
- **Selector:** `#site-content > main > main`
- **Context:** `<main>  <section class="section-paddi...</main>`
- **Line:** 566
- **HTML Snippet:**
```html
<main>  <section class="section-paddi...</main>
```

### Issue 106
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Document should not have more than one main landmark (https://dequeuniversity.com/rules/axe/4.2/landmark-no-duplicate-main?application=axeAPI)
- **Code:** landmark-no-duplicate-main
- **Selector:** `#site-content > main`
- **Context:** `<main>   <main>  <section class="sect...</main>`
- **Line:** 662
- **HTML Snippet:**
```html
<main>   <main>  <section class="sect...</main>
```

### Issue 107
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Ensures landmarks are unique (https://dequeuniversity.com/rules/axe/4.2/landmark-unique?application=axeAPI)
- **Code:** landmark-unique
- **Selector:** `#site-content > main`
- **Context:** `<main>   <main>  <section class="sect...</main>`
- **Line:** 662
- **HTML Snippet:**
```html
<main>   <main>  <section class="sect...</main>
```

### Issue 108
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)
- **Code:** region

### Issue 109
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206
- **Selector:** `html > body > astro-island > nav`
- **Context:** `<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>`
- **Line:** 914
- **HTML Snippet:**
```html
<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>
```

### Issue 110
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2)`
- **Context:** `<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-events-none"><!----><a class="px-4 py-2 text...</div>`
- **Line:** 628
- **HTML Snippet:**
```html
<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-ev
```

### Issue 111
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 112
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 113
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 114
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Anchor element found with link content, but no href, ID or name attribute has been supplied.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 115
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

## Page: http://localhost:4321/
**Title:** Dein Kompass im digitalen Raum.

### Issue 1
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#social > div:nth-child(2) > div:nth-child(1) > div > div > span`
- **Context:** `<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">in</span>`
- **Line:** 333
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">in</span>
```

### Issue 2
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#social > div:nth-child(2) > div:nth-child(1) > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">linkedin.com</p>`
- **Line:** 188
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">linkedin.com</p>
```

### Issue 3
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#social > div:nth-child(2) > div:nth-child(2) > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>`
- **Line:** 687
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>
```

### Issue 4
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > div > div > span`
- **Context:** `<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">𝕏</span>`
- **Line:** 256
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">𝕏</span>
```

### Issue 5
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > div > button`
- **Context:** `<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>`
- **Line:** 331
- **HTML Snippet:**
```html
<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>
```

### Issue 6
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > h3`
- **Context:** `<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">Twitter</h3>`
- **Line:** 527
- **HTML Snippet:**
```html
<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">Twitter</h3>
```

### Issue 7
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#portfolio > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div`
- **Context:** `<div class="text-sm font-medium" data-astro-cid-j7pv25f6="">App Design</div>`
- **Line:** 276
- **HTML Snippet:**
```html
<div class="text-sm font-medium" data-astro-cid-j7pv25f6="">App Design</div>
```

### Issue 8
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#formation > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>`
- **Line:** 687
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>
```

### Issue 9
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#formation > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">learnn.com</p>`
- **Line:** 194
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">learnn.com</p>
```

### Issue 10
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 11
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(3) > p`
- **Context:** `<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Professionelle Website für über...</p>`
- **Line:** 972
- **HTML Snippet:**
```html
<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Professionelle Website für über...</p>
```

### Issue 12
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(4) > div > div:nth-child(2) > h3`
- **Context:** `<h3 class="font-bold text-base mb-2">E-Commerce Komplettpaket</h3>`
- **Line:** 903
- **HTML Snippet:**
```html
<h3 class="font-bold text-base mb-2">E-Commerce Komplettpaket</h3>
```

### Issue 13
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(4) > div > div:nth-child(2) > p`
- **Context:** `<p class="text-sm opacity-90 leading-relaxed">Ihr Shop, startklar für Umsatz:...</p>`
- **Line:** 349
- **HTML Snippet:**
```html
<p class="text-sm opacity-90 leading-relaxed">Ihr Shop, startklar für Umsatz:...</p>
```

### Issue 14
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(5) > p`
- **Context:** `<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Maßgeschneiderte Web-App für ef...</p>`
- **Line:** 522
- **HTML Snippet:**
```html
<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Maßgeschneiderte Web-App für ef...</p>
```

### Issue 15
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(6) > p`
- **Context:** `<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Weniger manuell, mehr smart: Pr...</p>`
- **Line:** 138
- **HTML Snippet:**
```html
<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Weniger manuell, mehr smart: Pr...</p>
```

### Issue 16
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(8) > p`
- **Context:** `<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Starke Markenbasis mit Logo, Fa...</p>`
- **Line:** 322
- **HTML Snippet:**
```html
<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Starke Markenbasis mit Logo, Fa...</p>
```

### Issue 17
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(9) > div > div:nth-child(2) > h3`
- **Context:** `<h3 class="font-bold text-base mb-2">Content &amp; Sichtbarkeit Boos...</h3>`
- **Line:** 493
- **HTML Snippet:**
```html
<h3 class="font-bold text-base mb-2">Content &amp; Sichtbarkeit Boos...</h3>
```

### Issue 18
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(9) > div > div:nth-child(2) > p`
- **Context:** `<p class="text-sm opacity-90 leading-relaxed">SEO-starker Content, der gefund...</p>`
- **Line:** 719
- **HTML Snippet:**
```html
<p class="text-sm opacity-90 leading-relaxed">SEO-starker Content, der gefund...</p>
```

### Issue 19
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(11) > p`
- **Context:** `<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Datengestützte Entscheidungen t...</p>`
- **Line:** 818
- **HTML Snippet:**
```html
<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Datengestützte Entscheidungen t...</p>
```

### Issue 20
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#services > div:nth-child(2) > a:nth-child(13) > p`
- **Context:** `<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Zukunftsfähige Technik für reib...</p>`
- **Line:** 113
- **HTML Snippet:**
```html
<p class="text-secondary-600 text-sm leading-relaxed mt-auto pb-2">Zukunftsfähige Technik für reib...</p>
```

### Issue 21
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#portfolio > div:nth-child(2) > div:nth-child(1) > div > span`
- **Context:** `<span class="text-white font-bold" data-astro-cid-j7pv25f6="">●</span>`
- **Line:** 405
- **HTML Snippet:**
```html
<span class="text-white font-bold" data-astro-cid-j7pv25f6="">●</span>
```

### Issue 22
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#location > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2)`
- **Context:** `<div class="absolute bottom-2 left-2 text-xs text-green-800 font-medium" data-astro-cid-j7pv25f6="">Rome, RM, Italia</div>`
- **Line:** 103
- **HTML Snippet:**
```html
<div class="absolute bottom-2 left-2 text-xs text-green-800 font-medium" data-astro-cid-j7pv25f6="">Rome, RM, Italia</div>
```

### Issue 23
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(1) > div > div > h3`
- **Context:** `<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">15 secondi del mio ultimo viagg...</h3>`
- **Line:** 99
- **HTML Snippet:**
```html
<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">15 secondi del mio ultimo viagg...</h3>
```

### Issue 24
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(1) > div > div > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>`
- **Line:** 766
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>
```

### Issue 25
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(2) > div > div > h3`
- **Context:** `<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">OFFF 2023</h3>`
- **Line:** 604
- **HTML Snippet:**
```html
<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">OFFF 2023</h3>
```

### Issue 26
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
- **Code:** color-contrast
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(2) > div > div > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>`
- **Line:** 766
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>
```

### Issue 27
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** <video> elements must have captions (https://dequeuniversity.com/rules/axe/4.2/video-caption?application=axeAPI)
- **Code:** video-caption
- **Selector:** `#services > div:nth-child(2) > a:nth-child(7) > div:nth-child(2) > video`
- **Context:** `<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>`
- **Line:** 250
- **HTML Snippet:**
```html
<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>
```

### Issue 28
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** Heading tag found with no content. Text that is not intended as a heading should not be marked up with heading tags.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2
- **Selector:** `#left-panel > div > div:nth-child(1) > div > div > div:nth-child(2) > h1`
- **Context:** `<h1 class="text-5xl font-bold text-secondary-900 mb-4"></h1>`
- **Line:** 397
- **HTML Snippet:**
```html
<h1 class="text-5xl font-bold text-secondary-900 mb-4"></h1>
```

### Issue 29
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.4:1. Recommendation:  change text colour to #707070.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(1) > span:nth-child(2)`
- **Context:** `<span class="text-secondary-300">•</span>`
- **Line:** 201
- **HTML Snippet:**
```html
<span class="text-secondary-300">•</span>
```

### Issue 30
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.4:1. Recommendation:  change text colour to #707070.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(1) > span:nth-child(4)`
- **Context:** `<span class="text-secondary-300">•</span>`
- **Line:** 201
- **HTML Snippet:**
```html
<span class="text-secondary-300">•</span>
```

### Issue 31
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.12:1. Recommendation:  change background to #fff.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#social > div:nth-child(2) > div:nth-child(2) > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>`
- **Line:** 687
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>
```

### Issue 32
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.54:1. Recommendation:  change text colour to #3277cc.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > div > button`
- **Context:** `<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>`
- **Line:** 331
- **HTML Snippet:**
```html
<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>
```

### Issue 33
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.54:1. Recommendation:  change background to #5297ec.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > h3`
- **Context:** `<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">Twitter</h3>`
- **Line:** 527
- **HTML Snippet:**
```html
<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">Twitter</h3>
```

### Issue 34
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 3.96:1. Recommendation:  change background to #9d4aec.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#portfolio > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div`
- **Context:** `<div class="text-sm font-medium" data-astro-cid-j7pv25f6="">App Design</div>`
- **Line:** 276
- **HTML Snippet:**
```html
<div class="text-sm font-medium" data-astro-cid-j7pv25f6="">App Design</div>
```

### Issue 35
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.74:1. Recommendation:  change background to #008932.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#location > div:nth-child(2) > div:nth-child(2) > div > div > span`
- **Context:** `<span class="text-white text-xl" data-astro-cid-j7pv25f6="">🌿</span>`
- **Line:** 500
- **HTML Snippet:**
```html
<span class="text-white text-xl" data-astro-cid-j7pv25f6="">🌿</span>
```

### Issue 36
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```

### Issue 37
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.12:1. Recommendation:  change background to #fff.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#formation > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>`
- **Line:** 687
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">medium.com</p>
```

### Issue 38
- **Category:** error
- **Severity:** error
- **Source:** pa11y
- **Message:** This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.28:1. Recommendation:  change background to #fff.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail
- **Selector:** `#formation > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">learnn.com</p>`
- **Line:** 194
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">learnn.com</p>
```

### Issue 39
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Headings should not be empty (https://dequeuniversity.com/rules/axe/4.2/empty-heading?application=axeAPI)
- **Code:** empty-heading
- **Selector:** `#left-panel > div > div:nth-child(1) > div > div > div:nth-child(2) > h1`
- **Context:** `<h1 class="text-5xl font-bold text-secondary-900 mb-4"></h1>`
- **Line:** 397
- **HTML Snippet:**
```html
<h1 class="text-5xl font-bold text-secondary-900 mb-4"></h1>
```

### Issue 40
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the title element describes the document.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2
- **Selector:** `html > head > title`
- **Context:** `<title>Dein Kompass im digitalen Raum.</title>`
- **Line:** 886
- **HTML Snippet:**
```html
<title>Dein Kompass im digitalen Raum.</title>
```

### Issue 41
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 42
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 43
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(1) > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">`
- **Line:** 685
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-24 h-24" src="/logo_menu.svg">
```

### Issue 44
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 45
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 46
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 47
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > button`
- **Context:** `<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" height="32" vie...</button>`
- **Line:** 743
- **HTML Snippet:**
```html
<button class="ml-auto mr-8 flex items-center justify-center w-12 h-12 bg-transparent transition-colors focus:outline-none relative" style="z-index: 20;" aria-label="Menü öffnen"><svg width="32" heigh
```

### Issue 48
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a`
- **Context:** `<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>`
- **Line:** 950
- **HTML Snippet:**
```html
<a href="/" class="hover:opacity-80 transition-opacity"><img alt="CASOON Logo" class="w...</a>
```

### Issue 49
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 50
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > div > a > img`
- **Context:** `<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">`
- **Line:** 459
- **HTML Snippet:**
```html
<img alt="CASOON Logo" class="w-32 h-32" src="/logo.svg">
```

### Issue 51
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `html > body > astro-island > nav > div:nth-child(2) > button`
- **Context:** `<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>`
- **Line:** 226
- **HTML Snippet:**
```html
<button class="px-4 py-2 text-sm font-medium text-secondary-700 bg-white/30 rounded-full border border-secondary-300 hover:bg-white/60 transition-all" aria-label="Mobilmenü öffnen">Menü</button>
```

### Issue 52
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#left-panel > div > div:nth-child(1) > div > div > div:nth-child(1) > img`
- **Context:** `<img src="/logo.svg" alt="" class="h-full w-auto object-contain">`
- **Line:** 529
- **HTML Snippet:**
```html
<img src="/logo.svg" alt="" class="h-full w-auto object-contain">
```

### Issue 53
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#left-panel > div > div:nth-child(2) > button:nth-child(2)`
- **Context:** `<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Eine moderne Website" data-astro-cid-j7pv25f6="">Eine moderne ...`
- **Line:** 963
- **HTML Snippet:**
```html
<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Eine moderne
```

### Issue 54
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#left-panel > div > div:nth-child(2) > button:nth-child(3)`
- **Context:** `<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Ein Online-Shop, der verkauft" data-astro-cid-j7pv25f6="">Ein ...`
- **Line:** 425
- **HTML Snippet:**
```html
<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Ein Online-S
```

### Issue 55
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#left-panel > div > div:nth-child(2) > button:nth-child(4)`
- **Context:** `<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Mehr Sichtbarkeit durch nachhal..." data-astro-cid-j7pv25f6=""...`
- **Line:** 686
- **HTML Snippet:**
```html
<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Mehr Sichtba
```

### Issue 56
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#left-panel > div > div:nth-child(2) > button:nth-child(5)`
- **Context:** `<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Gezieltes Marketing" data-astro-cid-j7pv25f6="">Gezieltes Mark...`
- **Line:** 410
- **HTML Snippet:**
```html
<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Gezieltes Ma
```

### Issue 57
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#left-panel > div > div:nth-child(2) > button:nth-child(6)`
- **Context:** `<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Individuelle Schnittstellen und..." data-astro-cid-j7pv25f6=""...`
- **Line:** 520
- **HTML Snippet:**
```html
<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Individuelle
```

### Issue 58
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#left-panel > div > div:nth-child(2) > button:nth-child(7)`
- **Context:** `<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Daten, die Klarheit schaffen" data-astro-cid-j7pv25f6="">Daten...`
- **Line:** 33
- **HTML Snippet:**
```html
<button class="rounded-full bg-white border border-secondary-200 px-3 py-1.5 text-left shadow-sm hover:bg-primary-50 transition-colors w-fit mb-1 text-base" aria-label="Service auswählen: Daten, die K
```

### Issue 59
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(1) > a:nth-child(1)`
- **Context:** `<a href="/kontakt" class="bg-primary-600 text-white py-2 px-4 rounded-lg text-base font-medium hover:bg-primary-700 transition-colors">
Kontakt
</a>`
- **Line:** 90
- **HTML Snippet:**
```html
<a href="/kontakt" class="bg-primary-600 text-white py-2 px-4 rounded-lg text-base font-medium hover:bg-primary-700 transition-colors">
Kontakt
</a>
```

### Issue 60
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(1) > a:nth-child(3)`
- **Context:** `<a href="/impressum" class="text-secondary-500 hover:text-secondary-700 transition-colors text-base">Impressum</a>`
- **Line:** 967
- **HTML Snippet:**
```html
<a href="/impressum" class="text-secondary-500 hover:text-secondary-700 transition-colors text-base">Impressum</a>
```

### Issue 61
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(1) > a:nth-child(5)`
- **Context:** `<a href="/datenschutz" class="text-secondary-500 hover:text-secondary-700 transition-colors text-base">Datenschutz</a>`
- **Line:** 159
- **HTML Snippet:**
```html
<a href="/datenschutz" class="text-secondary-500 hover:text-secondary-700 transition-colors text-base">Datenschutz</a>
```

### Issue 62
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(2) > a`
- **Context:** `<a href="/kontakt" class="bg-primary-600 text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors">
Kontakt
</a>`
- **Line:** 702
- **HTML Snippet:**
```html
<a href="/kontakt" class="bg-primary-600 text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors">
Kontakt
</a>
```

### Issue 63
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(2) > div > a:nth-child(1)`
- **Context:** `<a href="/impressum" class="text-secondary-500 hover:text-secondary-700 transition-colors text-lg">Impressum</a>`
- **Line:** 557
- **HTML Snippet:**
```html
<a href="/impressum" class="text-secondary-500 hover:text-secondary-700 transition-colors text-lg">Impressum</a>
```

### Issue 64
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(2) > div > a:nth-child(2)`
- **Context:** `<a href="/datenschutz" class="text-secondary-500 hover:text-secondary-700 transition-colors text-lg">Datenschutz</a>`
- **Line:** 405
- **HTML Snippet:**
```html
<a href="/datenschutz" class="text-secondary-500 hover:text-secondary-700 transition-colors text-lg">Datenschutz</a>
```

### Issue 65
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a href="/leistungen/digitale-visitenkarte" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="mb-4"><div class="f...</a>`
- **Line:** 49
- **HTML Snippet:**
```html
<a href="/leistungen/digitale-visitenkarte" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><
```

### Issue 66
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(1) > div:nth-child(2) > img`
- **Context:** `<img src="/img/lg-visitenkarte.webp" alt="Digitale Visitenkarte &amp; Online-Reputation" class="w-full h-full object-cover">`
- **Line:** 146
- **HTML Snippet:**
```html
<img src="/img/lg-visitenkarte.webp" alt="Digitale Visitenkarte &amp; Online-Reputation" class="w-full h-full object-cover">
```

### Issue 67
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(1) > div:nth-child(2) > img`
- **Context:** `<img src="/img/lg-visitenkarte.webp" alt="Digitale Visitenkarte &amp; Online-Reputation" class="w-full h-full object-cover">`
- **Line:** 146
- **HTML Snippet:**
```html
<img src="/img/lg-visitenkarte.webp" alt="Digitale Visitenkarte &amp; Online-Reputation" class="w-full h-full object-cover">
```

### Issue 68
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a href="/leistungen/firmenwebseite" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 164
- **HTML Snippet:**
```html
<a href="/leistungen/firmenwebseite" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div cla
```

### Issue 69
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(3) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="Professionelle Firmenwebseite" class="w-full h-full object-cover">`
- **Line:** 134
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="Professionelle Firmenwebseite" class="w-full h-full object-cover">
```

### Issue 70
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(3) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="Professionelle Firmenwebseite" class="w-full h-full object-cover">`
- **Line:** 134
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="Professionelle Firmenwebseite" class="w-full h-full object-cover">
```

### Issue 71
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(4)`
- **Context:** `<a href="/leistungen/ecommerce" class="bg-white border border-secondary-200 rounded-2xl overflow-hidden hover:bg-secondary-50 transition-all duration-300 cursor-pointer block group relative"><div class="relative aspect-vid...</a>`
- **Line:** 540
- **HTML Snippet:**
```html
<a href="/leistungen/ecommerce" class="bg-white border border-secondary-200 rounded-2xl overflow-hidden hover:bg-secondary-50 transition-all duration-300 cursor-pointer block group relative"><div clas
```

### Issue 72
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(4) > div > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="E-Commerce Komplettpaket" class="absolute inset-0 w-full h-full object-cover">`
- **Line:** 576
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="E-Commerce Komplettpaket" class="absolute inset-0 w-full h-full object-cover">
```

### Issue 73
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(4) > div > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="E-Commerce Komplettpaket" class="absolute inset-0 w-full h-full object-cover">`
- **Line:** 576
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="E-Commerce Komplettpaket" class="absolute inset-0 w-full h-full object-cover">
```

### Issue 74
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(5)`
- **Context:** `<a href="/leistungen/geschaeftsprozesse" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 757
- **HTML Snippet:**
```html
<a href="/leistungen/geschaeftsprozesse" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div
```

### Issue 75
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(5) > div:nth-child(2) > img`
- **Context:** `<img src="/img/strategie.webp" alt="Digitale Geschäftsprozesse mit Datenbanklösung" class="w-full h-full object-cover">`
- **Line:** 347
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Digitale Geschäftsprozesse mit Datenbanklösung" class="w-full h-full object-cover">
```

### Issue 76
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(5) > div:nth-child(2) > img`
- **Context:** `<img src="/img/strategie.webp" alt="Digitale Geschäftsprozesse mit Datenbanklösung" class="w-full h-full object-cover">`
- **Line:** 347
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Digitale Geschäftsprozesse mit Datenbanklösung" class="w-full h-full object-cover">
```

### Issue 77
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(6)`
- **Context:** `<a href="/leistungen/automatisierung" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 259
- **HTML Snippet:**
```html
<a href="/leistungen/automatisierung" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div cl
```

### Issue 78
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(6) > div:nth-child(2) > img`
- **Context:** `<img src="/img/strategie.webp" alt="Automatisierung &amp; Cloud-Services" class="w-full h-full object-cover">`
- **Line:** 283
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Automatisierung &amp; Cloud-Services" class="w-full h-full object-cover">
```

### Issue 79
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(6) > div:nth-child(2) > img`
- **Context:** `<img src="/img/strategie.webp" alt="Automatisierung &amp; Cloud-Services" class="w-full h-full object-cover">`
- **Line:** 283
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Automatisierung &amp; Cloud-Services" class="w-full h-full object-cover">
```

### Issue 80
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(7)`
- **Context:** `<a href="/strategische-beratung" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="mb-4"><div class="f...</a>`
- **Line:** 36
- **HTML Snippet:**
```html
<a href="/strategische-beratung" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="
```

### Issue 81
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this embedded object contains pre-recorded video only, and is not provided as an alternative for text content, check that an alternative text version is available, or an audio track is provided that presents equivalent information.
- **Code:** WCAG2AA.Principle1.Guideline1_2.1_2_1.G159,G166
- **Selector:** `#services > div:nth-child(2) > a:nth-child(7) > div:nth-child(2) > video`
- **Context:** `<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>`
- **Line:** 250
- **HTML Snippet:**
```html
<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>
```

### Issue 82
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that captions are provided for audio content.
- **Code:** WCAG2AA.Principle1.Guideline1_2.1_2_2.G87,G93
- **Selector:** `#services > div:nth-child(2) > a:nth-child(7) > div:nth-child(2) > video`
- **Context:** `<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>`
- **Line:** 250
- **HTML Snippet:**
```html
<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>
```

### Issue 83
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this embedded object contains synchronised media, check that captions are provided for live audio content.
- **Code:** WCAG2AA.Principle1.Guideline1_2.1_2_4.G9,G87,G93
- **Selector:** `#services > div:nth-child(2) > a:nth-child(7) > div:nth-child(2) > video`
- **Context:** `<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>`
- **Line:** 250
- **HTML Snippet:**
```html
<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>
```

### Issue 84
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this embedded object contains pre-recorded synchronised media, check that an audio description is provided for its video content.
- **Code:** WCAG2AA.Principle1.Guideline1_2.1_2_5.G78,G173,G8
- **Selector:** `#services > div:nth-child(2) > a:nth-child(7) > div:nth-child(2) > video`
- **Context:** `<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>`
- **Line:** 250
- **HTML Snippet:**
```html
<video src="/videos/strategie.mp4" class="w-full h-full object-cover service-video" muted="" playsinline="" data-video-src="/videos/strategie.mp4"></video>
```

### Issue 85
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this element contains audio that plays automatically for longer than 3 seconds, check that there is the ability to pause, stop or mute the audio.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_2.F23

### Issue 86
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(8)`
- **Context:** `<a href="/leistungen/brand-identity" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 853
- **HTML Snippet:**
```html
<a href="/leistungen/brand-identity" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div cla
```

### Issue 87
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(8) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdesign.webp" alt="Brand &amp; Identity Starterkit" class="w-full h-full object-cover">`
- **Line:** 815
- **HTML Snippet:**
```html
<img src="/img/uxdesign.webp" alt="Brand &amp; Identity Starterkit" class="w-full h-full object-cover">
```

### Issue 88
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(8) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdesign.webp" alt="Brand &amp; Identity Starterkit" class="w-full h-full object-cover">`
- **Line:** 815
- **HTML Snippet:**
```html
<img src="/img/uxdesign.webp" alt="Brand &amp; Identity Starterkit" class="w-full h-full object-cover">
```

### Issue 89
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(9)`
- **Context:** `<a href="/leistungen/content-sichtbarkeit" class="bg-white border border-secondary-200 rounded-2xl overflow-hidden hover:bg-secondary-50 transition-all duration-300 cursor-pointer block group relative"><div class="relative aspect-vid...</a>`
- **Line:** 681
- **HTML Snippet:**
```html
<a href="/leistungen/content-sichtbarkeit" class="bg-white border border-secondary-200 rounded-2xl overflow-hidden hover:bg-secondary-50 transition-all duration-300 cursor-pointer block group relative
```

### Issue 90
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(9) > div > img`
- **Context:** `<img src="/img/strategie.webp" alt="Content &amp; Sichtbarkeit Booster" class="absolute inset-0 w-full h-full object-cover">`
- **Line:** 291
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Content &amp; Sichtbarkeit Booster" class="absolute inset-0 w-full h-full object-cover">
```

### Issue 91
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(9) > div > img`
- **Context:** `<img src="/img/strategie.webp" alt="Content &amp; Sichtbarkeit Booster" class="absolute inset-0 w-full h-full object-cover">`
- **Line:** 291
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Content &amp; Sichtbarkeit Booster" class="absolute inset-0 w-full h-full object-cover">
```

### Issue 92
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(10)`
- **Context:** `<a href="/leistungen/kundenportal" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 894
- **HTML Snippet:**
```html
<a href="/leistungen/kundenportal" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class
```

### Issue 93
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(10) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="Mitarbeiter- oder Kundenportal" class="w-full h-full object-cover">`
- **Line:** 325
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="Mitarbeiter- oder Kundenportal" class="w-full h-full object-cover">
```

### Issue 94
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(10) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="Mitarbeiter- oder Kundenportal" class="w-full h-full object-cover">`
- **Line:** 325
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="Mitarbeiter- oder Kundenportal" class="w-full h-full object-cover">
```

### Issue 95
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(11)`
- **Context:** `<a href="/leistungen/analytics-tracking" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 135
- **HTML Snippet:**
```html
<a href="/leistungen/analytics-tracking" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div
```

### Issue 96
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(11) > div:nth-child(2) > img`
- **Context:** `<img src="/img/strategie.webp" alt="Analytics &amp; Conversion Tracking Setup" class="w-full h-full object-cover">`
- **Line:** 682
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Analytics &amp; Conversion Tracking Setup" class="w-full h-full object-cover">
```

### Issue 97
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(11) > div:nth-child(2) > img`
- **Context:** `<img src="/img/strategie.webp" alt="Analytics &amp; Conversion Tracking Setup" class="w-full h-full object-cover">`
- **Line:** 682
- **HTML Snippet:**
```html
<img src="/img/strategie.webp" alt="Analytics &amp; Conversion Tracking Setup" class="w-full h-full object-cover">
```

### Issue 98
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(12)`
- **Context:** `<a href="/leistungen/launch-check" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 183
- **HTML Snippet:**
```html
<a href="/leistungen/launch-check" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class
```

### Issue 99
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(12) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="Digitaler Launch-Check" class="w-full h-full object-cover">`
- **Line:** 104
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="Digitaler Launch-Check" class="w-full h-full object-cover">
```

### Issue 100
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(12) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="Digitaler Launch-Check" class="w-full h-full object-cover">`
- **Line:** 104
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="Digitaler Launch-Check" class="w-full h-full object-cover">
```

### Issue 101
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#services > div:nth-child(2) > a:nth-child(13)`
- **Context:** `<a href="/leistungen/it-infrastruktur" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div class="flex justify-betwee...</a>`
- **Line:** 998
- **HTML Snippet:**
```html
<a href="/leistungen/it-infrastruktur" class="bg-white border border-secondary-200 rounded-2xl p-4 hover:bg-secondary-50 transition-all duration-300 cursor-pointer flex flex-col group relative"><div c
```

### Issue 102
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image
- **Selector:** `#services > div:nth-child(2) > a:nth-child(13) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="IT-Basis &amp; Digitale Infrastruktur" class="w-full h-full object-cover">`
- **Line:** 421
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="IT-Basis &amp; Digitale Infrastruktur" class="w-full h-full object-cover">
```

### Issue 103
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74
- **Selector:** `#services > div:nth-child(2) > a:nth-child(13) > div:nth-child(2) > img`
- **Context:** `<img src="/img/uxdevices.webp" alt="IT-Basis &amp; Digitale Infrastruktur" class="w-full h-full object-cover">`
- **Line:** 421
- **HTML Snippet:**
```html
<img src="/img/uxdevices.webp" alt="IT-Basis &amp; Digitale Infrastruktur" class="w-full h-full object-cover">
```

### Issue 104
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a href="/angebote/webseite" class="block "> <div class="bg-white border bo...</a>`
- **Line:** 399
- **HTML Snippet:**
```html
<a href="/angebote/webseite" class="block "> <div class="bg-white border bo...</a>
```

### Issue 105
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>`
- **Line:** 417
- **HTML Snippet:**
```html
<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>
```

### Issue 106
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>`
- **Line:** 417
- **HTML Snippet:**
```html
<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>
```

### Issue 107
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(4)`
- **Context:** `<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>`
- **Line:** 417
- **HTML Snippet:**
```html
<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>
```

### Issue 108
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(5)`
- **Context:** `<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>`
- **Line:** 417
- **HTML Snippet:**
```html
<a href="#" class="block pointer-events-none"> <div class="bg-white border bo...</a>
```

### Issue 109
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a href="/insights/marketing" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group block"> <div class="w-12 h-12 rounded-...</a>`
- **Line:** 293
- **HTML Snippet:**
```html
<a href="/insights/marketing" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer gr
```

### Issue 110
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a href="/insights/seo" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group block"> <div class="w-12 h-12 rounded-...</a>`
- **Line:** 926
- **HTML Snippet:**
```html
<a href="/insights/seo" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group bl
```

### Issue 111
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a href="/insights/ki" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group block"> <div class="w-12 h-12 rounded-...</a>`
- **Line:** 830
- **HTML Snippet:**
```html
<a href="/insights/ki" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group blo
```

### Issue 112
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(4)`
- **Context:** `<a href="/insights/sicherheit" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group block"> <div class="w-12 h-12 rounded-...</a>`
- **Line:** 237
- **HTML Snippet:**
```html
<a href="/insights/sicherheit" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer g
```

### Issue 113
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(5)`
- **Context:** `<a href="/insights/unternehmen" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group block"> <div class="w-12 h-12 rounded-...</a>`
- **Line:** 401
- **HTML Snippet:**
```html
<a href="/insights/unternehmen" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer 
```

### Issue 114
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(6)`
- **Context:** `<a href="/insights/dev" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group block"> <div class="w-12 h-12 rounded-...</a>`
- **Line:** 230
- **HTML Snippet:**
```html
<a href="/insights/dev" class="bg-white border border-secondary-200 rounded-2xl p-6 hover:bg-secondary-50 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 cursor-pointer group bl
```

### Issue 115
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > div > button`
- **Context:** `<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>`
- **Line:** 331
- **HTML Snippet:**
```html
<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>
```

### Issue 116
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#portfolio > div:nth-child(2) > div:nth-child(1) > button`
- **Context:** `<button class="text-xs bg-white border border-primary-200 px-3 py-1 rounded-full text-secondary-600 hover:bg-primary-50 transition-colors" aria-label="Dribbble-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>`
- **Line:** 530
- **HTML Snippet:**
```html
<button class="text-xs bg-white border border-primary-200 px-3 py-1 rounded-full text-secondary-600 hover:bg-primary-50 transition-colors" aria-label="Dribbble-Account folgen" data-astro-cid-j7pv25f6=
```

### Issue 117
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that a change of context does not occur when this input field receives focus.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_1.G107
- **Selector:** `#portfolio > div:nth-child(2) > div:nth-child(3) > button`
- **Context:** `<button class="text-xs bg-white border border-blue-200 px-3 py-1 rounded-full text-blue-600 hover:bg-blue-50 transition-colors" aria-label="Behance-Account folgen (2.9K Follower)" data-astro-cid-j7pv25f6="">Follow 2.9K</button>`
- **Line:** 683
- **HTML Snippet:**
```html
<button class="text-xs bg-white border border-blue-200 px-3 py-1 rounded-full text-blue-600 hover:bg-blue-50 transition-colors" aria-label="Behance-Account folgen (2.9K Follower)" data-astro-cid-j7pv2
```

### Issue 118
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 119
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(1)`
- **Context:** `<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>`
- **Line:** 279
- **HTML Snippet:**
```html
<a href="/impressum" class="text-gray-600 ml-1">
Impressum
</a>
```

### Issue 120
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > p > a:nth-child(2)`
- **Context:** `<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>`
- **Line:** 483
- **HTML Snippet:**
```html
<a href="/datenschutz" class="text-gray-600 ml-1">
Datenschutz
</a>
```

### Issue 121
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(1)`
- **Context:** `<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>`
- **Line:** 311
- **HTML Snippet:**
```html
<a class="text-gray-500" href="#" aria-label="Facebook"> <svg fill="currentColor" strok...</a>
```

### Issue 122
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(2)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>`
- **Line:** 467
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Twitter"> <svg fill="currentColor" strok...</a>
```

### Issue 123
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(3)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>`
- **Line:** 847
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="Instagram"> <svg fill="none" stroke="curre...</a>
```

### Issue 124
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the link text combined with programmatically determined link context identifies the purpose of the link.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
- **Selector:** `#site-content > footer > div > span > a:nth-child(4)`
- **Context:** `<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>`
- **Line:** 416
- **HTML Snippet:**
```html
<a class="ml-3 text-gray-500" href="#" aria-label="LinkedIn"> <svg fill="currentColor" strok...</a>
```

### Issue 125
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_2.G57

### Issue 126
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_3.G96

### Issue 127
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_4.

### Issue 128
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that any information conveyed using colour alone is also available in text, or through other visual cues.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182

### Issue 129
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_4.G142

### Issue 130
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel

### Issue 131
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206

### Issue 132
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78

### Issue 133
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35

### Issue 134
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_13.F95

### Issue 135
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     
- **Code:** WCAG2AA.Principle2.Guideline2_1.2_1_4.

### Issue 136
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.
- **Code:** WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191

### Issue 137
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.
- **Code:** WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176

### Issue 138
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69

### Issue 139
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185

### Issue 140
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that headings and labels describe topic or purpose.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131

### Issue 141
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.
- **Code:** WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31

### Issue 142
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_1.

### Issue 143
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_2.

### Issue 144
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96

### Issue 145
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_4.

### Issue 146
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.
- **Code:** WCAG2AA.Principle3.Guideline3_1.3_1_2.H58

### Issue 147
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_3.G61

### Issue 148
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.
- **Code:** WCAG2AA.Principle3.Guideline3_2.3_2_4.G197

### Issue 149
- **Category:** notice
- **Severity:** notice
- **Source:** pa11y
- **Message:** Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_3.

### Issue 150
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 151
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 152
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 153
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 154
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 155
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 156
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 157
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 158
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 159
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 160
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 161
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 162
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 163
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 164
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 165
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 166
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 167
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 168
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 169
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 170
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 171
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 172
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 173
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 174
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 175
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** color-contrast: Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)

### Issue 176
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** video-caption: <video> elements must have captions (https://dequeuniversity.com/rules/axe/4.2/video-caption?application=axeAPI)
- **Line:** 200
- **HTML Snippet:**
```html
<video>
```

### Issue 177
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2: Heading tag found with no content. Text that is not intended as a heading should not be marked up with heading tags.

### Issue 178
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.4:1. Recommendation:  change text colour to #707070.

### Issue 179
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.4:1. Recommendation:  change text colour to #707070.

### Issue 180
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.12:1. Recommendation:  change background to #fff.

### Issue 181
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.54:1. Recommendation:  change text colour to #3277cc.

### Issue 182
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 3:1, but text in this element has a contrast ratio of 2.54:1. Recommendation:  change background to #5297ec.

### Issue 183
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 3.96:1. Recommendation:  change background to #9d4aec.

### Issue 184
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.12:1. Recommendation:  change background to #fff.

### Issue 185
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.28:1. Recommendation:  change background to #fff.

### Issue 186
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 1.74:1. Recommendation:  change background to #008932.

### Issue 187
- **Category:** playwright
- **Severity:** error
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail: This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 4.43:1. Recommendation:  change background to #f7f7f7.

### Issue 188
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** 4 buttons without aria-label

### Issue 189
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: empty-heading: Headings should not be empty (https://dequeuniversity.com/rules/axe/4.2/empty-heading?application=axeAPI)

### Issue 190
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** region: All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)

### Issue 191
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2: Check that the title element describes the document.

### Issue 192
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.

### Issue 193
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 194
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 195
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 196
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 197
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 198
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 199
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 200
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 201
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs: This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.

### Issue 202
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 203
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 204
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 205
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 206
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 207
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 208
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_1.1_1_1.H67.2: Img element is marked so that it is ignored by Assistive Technology.

### Issue 209
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 210
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 211
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 212
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 213
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 214
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 215
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 216
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 217
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 218
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 219
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 220
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 221
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 222
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 223
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 224
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 225
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 226
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 227
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 228
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 229
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 230
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 231
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 232
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 233
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 234
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 235
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 236
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 237
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 238
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 239
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 240
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 241
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 242
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 243
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 244
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 245
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_2.1_2_1.G159,G166: If this embedded object contains pre-recorded video only, and is not provided as an alternative for text content, check that an alternative text version is available, or an audio track is provided that presents equivalent information.

### Issue 246
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_2.1_2_2.G87,G93: If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that captions are provided for audio content.

### Issue 247
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_2.1_2_4.G9,G87,G93: If this embedded object contains synchronised media, check that captions are provided for live audio content.

### Issue 248
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_2.1_2_5.G78,G173,G8: If this embedded object contains pre-recorded synchronised media, check that an audio description is provided for its video content.

### Issue 249
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_2.F23: If this element contains audio that plays automatically for longer than 3 seconds, check that there is the ability to pause, stop or mute the audio.

### Issue 250
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 251
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 252
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 253
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 254
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 255
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 256
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 257
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 258
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 259
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 260
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 261
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 262
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 263
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 264
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 265
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 266
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 267
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 268
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image: Ensure that the img element's alt text serves the same purpose and presents the same information as the image.

### Issue 269
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74: If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

### Issue 270
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 271
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 272
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.

### Issue 273
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 274
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.

### Issue 275
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 276
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.

### Issue 277
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 278
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.

### Issue 279
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 280
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.

### Issue 281
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 282
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 283
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 284
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 285
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 286
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 287
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 288
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 289
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 290
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 291
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 292
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 293
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 294
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 295
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 296
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 297
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Accessible name for this element does not contain the visible label text. Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 298
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 299
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Accessible name for this element does not contain the visible label text. Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 300
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 301
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Accessible name for this element does not contain the visible label text. Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 302
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_1.G107: Check that a change of context does not occur when this input field receives focus.

### Issue 303
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.

### Issue 304
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 305
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 3:1.

### Issue 306
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.

### Issue 307
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 308
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Alpha: This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 3:1.

### Issue 309
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.

### Issue 310
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage: This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.

### Issue 311
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder: Anchor element found with link content, but no href, ID or name attribute has been supplied.

### Issue 312
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 313
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48: If this element contains a navigation section, it is recommended that it be marked up as a list.

### Issue 314
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 315
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 316
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 317
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 318
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 319
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81: Check that the link text combined with programmatically determined link context identifies the purpose of the link.

### Issue 320
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_2.G57: Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.

### Issue 321
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_3.G96: Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.

### Issue 322
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_3.1_3_4.: Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

### Issue 323
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182: Check that any information conveyed using colour alone is also available in text, or through other visual cues.

### Issue 324
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_4.G142: Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.

### Issue 325
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel: If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.

### Issue 326
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206: Check that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:     Vertical scrolling content at a width equivalent to 320 CSS pixels;     Horizontal scrolling content at a height equivalent to 256 CSS pixels;     Except for parts of the content which require two-dimensional layout for usage or meaning.

### Issue 327
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_11.G195,G207,G18,G145,G174,F78: Check that the visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):     User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;     Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

### Issue 328
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_12.C36,C35: Check that no loss of content or functionality occurs by setting all of the following and by changing no other style property:              Line height (line spacing) to at least 1.5 times the font size;         Spacing following paragraphs to at least 2 times the font size;         Letter spacing (tracking) to at least 0.12 times the font size;         Word spacing to at least 0.16 times the font size.

### Issue 329
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle1.Guideline1_4.1_4_13.F95: Check that where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:              Dismissable: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content;         Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;         Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

### Issue 330
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_1.2_1_4.: Check that if a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:              Turn off: A mechanism is available to turn the shortcut off;         Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters (e.g. Ctrl, Alt, etc);         Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus.     

### Issue 331
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191: If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.

### Issue 332
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176: Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.

### Issue 333
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69: Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.

### Issue 334
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185: If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.

### Issue 335
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131: Check that headings and labels describe topic or purpose.

### Issue 336
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31: Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.

### Issue 337
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_1.: Check that all functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.

### Issue 338
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_2.: Check that for functionality that can be operated using a single pointer, at least one of the following is true:         No Down-Event: The down-event of the pointer is not used to execute any part of the function;         Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;         Up Reversal: The up-event reverses any outcome of the preceding down-event;         Essential: Completing the function on the down-event is essential.

### Issue 339
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_3.F96: Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.

### Issue 340
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle2.Guideline2_5.2_5_4.: Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:              Supported Interface: The motion is used to operate functionality through an accessibility supported interface;         Essential: The motion is essential for the function and doing so would invalidate the activity.     

### Issue 341
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_1.3_1_2.H58: Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.

### Issue 342
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_3.G61: Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.

### Issue 343
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle3.Guideline3_2.3_2_4.G197: Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.

### Issue 344
- **Category:** playwright
- **Severity:** warning
- **Source:** playwright
- **Message:** Notice: WCAG2AA.Principle4.Guideline4_1.4_1_3.: Check that status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

### Issue 345
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** All page content should be contained by landmarks (https://dequeuniversity.com/rules/axe/4.2/region?application=axeAPI)
- **Code:** region

### Issue 346
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206
- **Selector:** `html > body > astro-island > nav`
- **Context:** `<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>`
- **Line:** 914
- **HTML Snippet:**
```html
<nav style="z-index: 100;" class=" fixed top-0 left-0 right-0 z-[100] mt-0 lg:mt-8"><div class="hidden lg:flex just...</nav>
```

### Issue 347
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2)`
- **Context:** `<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-events-none"><!----><a class="px-4 py-2 text...</div>`
- **Line:** 628
- **HTML Snippet:**
```html
<div style="will-change: opacity, transform; z-index: 10;" class="flex items-center space-x-3 absolute right-56 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 translate-x-20 pointer-ev
```

### Issue 348
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>`
- **Line:** 222
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/ueber-uns">Über uns</a>
```

### Issue 349
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>`
- **Line:** 547
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/leistungen">Leistungen</a>
```

### Issue 350
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs
- **Selector:** `html > body > astro-island > nav > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)`
- **Context:** `<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>`
- **Line:** 709
- **HTML Snippet:**
```html
<a class="px-4 py-2 text-lg font-medium text-secondary-700 rounded-full border border-transparent hover:underline" href="/insights">Insights</a>
```

### Issue 351
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Img element is marked so that it is ignored by Assistive Technology.
- **Code:** WCAG2AA.Principle1.Guideline1_1.1_1_1.H67.2
- **Selector:** `#left-panel > div > div:nth-child(1) > div > div > div:nth-child(1) > img`
- **Context:** `<img src="/logo.svg" alt="" class="h-full w-auto object-contain">`
- **Line:** 529
- **HTML Snippet:**
```html
<img src="/logo.svg" alt="" class="h-full w-auto object-contain">
```

### Issue 352
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#left-panel > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1)`
- **Context:** `<div class="font-semibold text-secondary-900 text-base" data-astro-cid-j7pv25f6="">Womit möchten Sie starten?</div>`
- **Line:** 372
- **HTML Snippet:**
```html
<div class="font-semibold text-secondary-900 text-base" data-astro-cid-j7pv25f6="">Womit möchten Sie starten?</div>
```

### Issue 353
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#left-panel > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2)`
- **Context:** `<div class="text-base text-secondary-700 mt-0.5" data-astro-cid-j7pv25f6="">Wählen Sie, was Ihnen gerade wi...</div>`
- **Line:** 764
- **HTML Snippet:**
```html
<div class="text-base text-secondary-700 mt-0.5" data-astro-cid-j7pv25f6="">Wählen Sie, was Ihnen gerade wi...</div>
```

### Issue 354
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(1)`
- **Context:** `<div class="hidden md:flex items-center gap-4"> <a href="/kontakt" class="bg-p...</div>`
- **Line:** 727
- **HTML Snippet:**
```html
<div class="hidden md:flex items-center gap-4"> <a href="/kontakt" class="bg-p...</div>
```

### Issue 355
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#left-panel > div > div:nth-child(3) > div > div:nth-child(2) > div`
- **Context:** `<div class="flex flex-col gap-3 text-center"> <a href="/impressum" class="te...</div>`
- **Line:** 600
- **HTML Snippet:**
```html
<div class="flex flex-col gap-3 text-center"> <a href="/impressum" class="te...</div>
```

### Issue 356
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#services > div:nth-child(2)`
- **Context:** `<div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <a href="/leistungen/digitale-...</div>`
- **Line:** 51
- **HTML Snippet:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <a href="/leistungen/digitale-...</div>
```

### Issue 357
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#services > div:nth-child(2) > a:nth-child(4) > div > div:nth-child(2) > h3`
- **Context:** `<h3 class="font-bold text-base mb-2">E-Commerce Komplettpaket</h3>`
- **Line:** 903
- **HTML Snippet:**
```html
<h3 class="font-bold text-base mb-2">E-Commerce Komplettpaket</h3>
```

### Issue 358
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#services > div:nth-child(2) > a:nth-child(4) > div > div:nth-child(2) > p`
- **Context:** `<p class="text-sm opacity-90 leading-relaxed">Ihr Shop, startklar für Umsatz:...</p>`
- **Line:** 349
- **HTML Snippet:**
```html
<p class="text-sm opacity-90 leading-relaxed">Ihr Shop, startklar für Umsatz:...</p>
```

### Issue 359
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#services > div:nth-child(2) > a:nth-child(9) > div > div:nth-child(2) > h3`
- **Context:** `<h3 class="font-bold text-base mb-2">Content &amp; Sichtbarkeit Boos...</h3>`
- **Line:** 493
- **HTML Snippet:**
```html
<h3 class="font-bold text-base mb-2">Content &amp; Sichtbarkeit Boos...</h3>
```

### Issue 360
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#services > div:nth-child(2) > a:nth-child(9) > div > div:nth-child(2) > p`
- **Context:** `<p class="text-sm opacity-90 leading-relaxed">SEO-starker Content, der gefund...</p>`
- **Line:** 719
- **HTML Snippet:**
```html
<p class="text-sm opacity-90 leading-relaxed">SEO-starker Content, der gefund...</p>
```

### Issue 361
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#offers > div:nth-child(2)`
- **Context:** `<div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <a href="/angebote/webseite" c...</div>`
- **Line:** 449
- **HTML Snippet:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <a href="/angebote/webseite" c...</div>
```

### Issue 362
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(1) > div > div > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-2xl">🌐</span>`
- **Line:** 64
- **HTML Snippet:**
```html
<span class="text-white text-2xl">🌐</span>
```

### Issue 363
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(2) > div > div > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-2xl">🛒</span>`
- **Line:** 771
- **HTML Snippet:**
```html
<span class="text-white text-2xl">🛒</span>
```

### Issue 364
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(3) > div > div > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-2xl">⚙️</span>`
- **Line:** 756
- **HTML Snippet:**
```html
<span class="text-white text-2xl">⚙️</span>
```

### Issue 365
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(4) > div > div > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-2xl">🤝</span>`
- **Line:** 61
- **HTML Snippet:**
```html
<span class="text-white text-2xl">🤝</span>
```

### Issue 366
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage
- **Selector:** `#offers > div:nth-child(2) > a:nth-child(5) > div > div > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-2xl">📊</span>`
- **Line:** 515
- **HTML Snippet:**
```html
<span class="text-white text-2xl">📊</span>
```

### Issue 367
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#insights > div:nth-child(2)`
- **Context:** `<div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <a href="/insights/marketing" ...</div>`
- **Line:** 167
- **HTML Snippet:**
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <a href="/insights/marketing" ...</div>
```

### Issue 368
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(1) > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-xl">📈</span>`
- **Line:** 499
- **HTML Snippet:**
```html
<span class="text-white text-xl">📈</span>
```

### Issue 369
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(2) > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-xl">🔍</span>`
- **Line:** 326
- **HTML Snippet:**
```html
<span class="text-white text-xl">🔍</span>
```

### Issue 370
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(3) > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-xl">🤖</span>`
- **Line:** 990
- **HTML Snippet:**
```html
<span class="text-white text-xl">🤖</span>
```

### Issue 371
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(4) > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-xl">🔒</span>`
- **Line:** 409
- **HTML Snippet:**
```html
<span class="text-white text-xl">🔒</span>
```

### Issue 372
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(5) > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-xl">🏢</span>`
- **Line:** 658
- **HTML Snippet:**
```html
<span class="text-white text-xl">🏢</span>
```

### Issue 373
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#insights > div:nth-child(2) > a:nth-child(6) > div:nth-child(1) > span`
- **Context:** `<span class="text-white text-xl">💻</span>`
- **Line:** 378
- **HTML Snippet:**
```html
<span class="text-white text-xl">💻</span>
```

### Issue 374
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#social > div:nth-child(2) > div:nth-child(1) > div > div > span`
- **Context:** `<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">in</span>`
- **Line:** 333
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">in</span>
```

### Issue 375
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > div > div > span`
- **Context:** `<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">𝕏</span>`
- **Line:** 256
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">𝕏</span>
```

### Issue 376
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Accessible name for this element does not contain the visible label text. Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96
- **Selector:** `#social > div:nth-child(2) > div:nth-child(3) > div > button`
- **Context:** `<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>`
- **Line:** 331
- **HTML Snippet:**
```html
<button class="text-xs bg-white text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors" aria-label="Twitter-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>
```

### Issue 377
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Accessible name for this element does not contain the visible label text. Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96
- **Selector:** `#portfolio > div:nth-child(2) > div:nth-child(1) > button`
- **Context:** `<button class="text-xs bg-white border border-primary-200 px-3 py-1 rounded-full text-secondary-600 hover:bg-primary-50 transition-colors" aria-label="Dribbble-Account folgen" data-astro-cid-j7pv25f6="">Follow</button>`
- **Line:** 530
- **HTML Snippet:**
```html
<button class="text-xs bg-white border border-primary-200 px-3 py-1 rounded-full text-secondary-600 hover:bg-primary-50 transition-colors" aria-label="Dribbble-Account folgen" data-astro-cid-j7pv25f6=
```

### Issue 378
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#social > div:nth-child(2) > div:nth-child(2) > div > div > span`
- **Context:** `<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">M</span>`
- **Line:** 221
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">M</span>
```

### Issue 379
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Accessible name for this element does not contain the visible label text. Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- **Code:** WCAG2AA.Principle2.Guideline2_5.2_5_3.F96
- **Selector:** `#portfolio > div:nth-child(2) > div:nth-child(3) > button`
- **Context:** `<button class="text-xs bg-white border border-blue-200 px-3 py-1 rounded-full text-blue-600 hover:bg-blue-50 transition-colors" aria-label="Behance-Account folgen (2.9K Follower)" data-astro-cid-j7pv25f6="">Follow 2.9K</button>`
- **Line:** 683
- **HTML Snippet:**
```html
<button class="text-xs bg-white border border-blue-200 px-3 py-1 rounded-full text-blue-600 hover:bg-blue-50 transition-colors" aria-label="Behance-Account folgen (2.9K Follower)" data-astro-cid-j7pv2
```

### Issue 380
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Alpha
- **Selector:** `#formation > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > span`
- **Context:** `<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">M</span>`
- **Line:** 221
- **HTML Snippet:**
```html
<span class="text-white font-bold text-sm" data-astro-cid-j7pv25f6="">M</span>
```

### Issue 381
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#location > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2)`
- **Context:** `<div class="absolute bottom-2 left-2 text-xs text-green-800 font-medium" data-astro-cid-j7pv25f6="">Rome, RM, Italia</div>`
- **Line:** 103
- **HTML Snippet:**
```html
<div class="absolute bottom-2 left-2 text-xs text-green-800 font-medium" data-astro-cid-j7pv25f6="">Rome, RM, Italia</div>
```

### Issue 382
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Alpha
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(1) > div > div > div > span`
- **Context:** `<span class="text-white font-bold text-xl" data-astro-cid-j7pv25f6="">📷</span>`
- **Line:** 400
- **HTML Snippet:**
```html
<span class="text-white font-bold text-xl" data-astro-cid-j7pv25f6="">📷</span>
```

### Issue 383
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(1) > div > div > h3`
- **Context:** `<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">15 secondi del mio ultimo viagg...</h3>`
- **Line:** 99
- **HTML Snippet:**
```html
<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">15 secondi del mio ultimo viagg...</h3>
```

### Issue 384
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(1) > div > div > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>`
- **Line:** 766
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>
```

### Issue 385
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text or background contains transparency. Ensure the contrast ratio between the text and background are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Alpha
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(2) > div > div > div > span`
- **Context:** `<span class="text-white font-bold text-xl" data-astro-cid-j7pv25f6="">📷</span>`
- **Line:** 400
- **HTML Snippet:**
```html
<span class="text-white font-bold text-xl" data-astro-cid-j7pv25f6="">📷</span>
```

### Issue 386
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(2) > div > div > h3`
- **Context:** `<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">OFFF 2023</h3>`
- **Line:** 604
- **HTML Snippet:**
```html
<h3 class="font-semibold mb-1" data-astro-cid-j7pv25f6="">OFFF 2023</h3>
```

### Issue 387
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
- **Code:** WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage
- **Selector:** `#freetime > div:nth-child(2) > div:nth-child(2) > div > div > p`
- **Context:** `<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>`
- **Line:** 766
- **HTML Snippet:**
```html
<p class="text-xs opacity-80" data-astro-cid-j7pv25f6="">instagram.com</p>
```

### Issue 388
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** Anchor element found with link content, but no href, ID or name attribute has been supplied.
- **Code:** WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder
- **Selector:** `#site-content > footer > div > a`
- **Context:** `<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>`
- **Line:** 543
- **HTML Snippet:**
```html
<a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"> <span class="ml-3 text-xl">CAS...</a>
```

### Issue 389
- **Category:** warning
- **Severity:** warning
- **Source:** pa11y
- **Message:** If this element contains a navigation section, it is recommended that it be marked up as a list.
- **Code:** WCAG2AA.Principle1.Guideline1_3.1_3_1.H48
- **Selector:** `#site-content > footer > div > p`
- **Context:** `<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>`
- **Line:** 20
- **HTML Snippet:**
```html
<p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 —
<a href="/impressum" c...</p>
```
