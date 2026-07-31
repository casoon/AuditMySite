// #528: single evaluate() pass collecting candidates for all design-quality
// rules. Prepended with the shared __amsCssSelector / __amsIsVisuallyHidden /
// __amsIsAriaHidden helpers (see accessibility::js_helpers), matching the
// convention used by styles.rs's contrast extraction.

const MAX_CANDIDATES = 200;

function truncate(s, max) {
    if (!s) return '';
    return s.length > max ? s.slice(0, max) + '…' : s;
}

// ── Text-based candidates (line length, line height, all-caps) ─────────────
const textCandidates = [];
const seenText = new Set();
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
let textNode;
while ((textNode = walker.nextNode()) !== null) {
    if (textCandidates.length >= MAX_CANDIDATES) break;
    const text = textNode.textContent.trim();
    if (!text) continue;
    const el = textNode.parentElement;
    if (!el || seenText.has(el)) continue;
    seenText.add(el);

    if (__amsIsVisuallyHidden(el)) continue;
    if (__amsIsAriaHidden(el)) continue;

    const styles = window.getComputedStyle(el);
    if (styles.display === 'none' || styles.visibility === 'hidden') continue;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const fontSize = parseFloat(styles.fontSize) || 16;
    let lineHeight = parseFloat(styles.lineHeight);
    if (Number.isNaN(lineHeight)) {
        // 'normal' resolves to roughly 1.2x font-size across engines.
        lineHeight = fontSize * 1.2;
    }
    const lineCount = Math.max(1, Math.round(rect.height / lineHeight));

    textCandidates.push({
        cssPath: __amsCssSelector(el),
        snippet: truncate(el.outerHTML, 200),
        text: truncate(text, 200),
        textLength: text.length,
        fontSize: fontSize,
        lineHeightRatio: lineHeight / fontSize,
        textTransform: styles.textTransform,
        lineCount: lineCount
    });
}

// ── Positioned/interactive candidates clippable by an overflow ancestor ────
const clipCandidates = [];
const interactiveEls = document.querySelectorAll(
    'a[href], button, [role="button"], [role="link"], [tabindex]'
);
let clipChecked = 0;
for (const el of interactiveEls) {
    if (clipCandidates.length >= MAX_CANDIDATES || clipChecked >= 500) break;
    clipChecked++;
    if (__amsIsVisuallyHidden(el)) continue;
    if (__amsIsAriaHidden(el)) continue;

    const styles = window.getComputedStyle(el);
    if (styles.display === 'none' || styles.visibility === 'hidden') continue;
    if (styles.position !== 'absolute' && styles.position !== 'fixed' && styles.position !== 'sticky') {
        continue;
    }

    const elRect = el.getBoundingClientRect();
    if (elRect.width === 0 || elRect.height === 0) continue;

    let ancestor = el.parentElement;
    let clippingAncestorSelector = null;
    while (ancestor && ancestor !== document.body) {
        const aStyles = window.getComputedStyle(ancestor);
        const clips =
            aStyles.overflow === 'hidden' || aStyles.overflow === 'clip' ||
            aStyles.overflowX === 'hidden' || aStyles.overflowX === 'clip' ||
            aStyles.overflowY === 'hidden' || aStyles.overflowY === 'clip';
        if (clips) {
            const aRect = ancestor.getBoundingClientRect();
            const escapes =
                elRect.left < aRect.left || elRect.right > aRect.right ||
                elRect.top < aRect.top || elRect.bottom > aRect.bottom;
            if (escapes) {
                clippingAncestorSelector = __amsCssSelector(ancestor);
                break;
            }
        }
        ancestor = ancestor.parentElement;
    }

    if (clippingAncestorSelector) {
        clipCandidates.push({
            cssPath: __amsCssSelector(el),
            snippet: truncate(el.outerHTML, 200),
            clippingAncestor: clippingAncestorSelector
        });
    }
}

return { textCandidates: textCandidates, clipCandidates: clipCandidates };
