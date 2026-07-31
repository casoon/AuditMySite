// Collects distinct, already-resolved-absolute <img> source URLs from the
// rendered page. `currentSrc` (falling back to `src`) is a browser-resolved
// absolute URL — no `<base href>` handling needed here, unlike raw attribute
// values elsewhere in this codebase's crawler.
//
// Bounded client-side (MAX_URLS) purely to keep the evaluate() payload small;
// the real per-page fetch cap (MAX_IMAGES_CHECKED) is enforced in Rust.

const MAX_URLS = 200;

const urls = [];
const seen = new Set();
for (const img of document.images) {
    if (urls.length >= MAX_URLS) break;
    const src = img.currentSrc || img.src;
    if (!src) continue;
    if (seen.has(src)) continue;
    seen.add(src);
    urls.push(src);
}

return { imageUrls: urls };
