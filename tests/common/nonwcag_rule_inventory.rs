//! Canonical inventories of the enumerable checks in three non-WCAG modules
//! (#558): security headers, `best_practices::vulnerable_libs`, and
//! `seo::schema_rules`'s `SchemaFeature` catalog.
//!
//! Unlike `rule_inventory.rs`'s WCAG scan, none of these three modules share
//! a single uniform data shape like `RuleMetadata` — each function below
//! documents the specific source-code pattern it depends on, so a future
//! refactor that breaks the assumption is visible here rather than silently
//! under-counting.

use std::collections::BTreeSet;
use std::path::PathBuf;

fn security_mod_path() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("src")
        .join("security")
        .join("mod.rs")
}

fn vulnerable_libs_path() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("src")
        .join("best_practices")
        .join("vulnerable_libs.rs")
}

fn schema_rules_path() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("src")
        .join("seo")
        .join("schema_rules.rs")
}

/// Read a source file and drop everything from its `#[cfg(test)]` module
/// onward — several of these files mix production code and test fixtures
/// (fake `SecurityIssue`/etc. literals) in one file, and the test module's
/// own literals must not be double-counted as real checks.
fn production_source(path: &PathBuf) -> String {
    let full = std::fs::read_to_string(path)
        .unwrap_or_else(|e| panic!("cannot read {}: {e}", path.display()));
    match full.find("\n#[cfg(test)]") {
        Some(idx) => full[..idx].to_string(),
        None => full,
    }
}

/// Extract the quoted string value of the first `field_name: "..."` inside
/// `block` — mirrors `rule_inventory.rs`'s helper of the same name.
fn extract_field_str(block: &str, field_name: &str) -> Option<String> {
    let marker = format!("{field_name}:");
    let start = block.find(&marker)? + marker.len();
    let rest = &block[start..];
    let quote_start = rest.find('"')?;
    let after_quote = &rest[quote_start + 1..];
    let quote_end = after_quote.find('"')?;
    Some(after_quote[..quote_end].to_string())
}

/// Byte range of the first brace-matched `{ ... }` block starting right
/// after `marker`, or `None` if `marker` doesn't occur.
fn find_next_block<'a>(
    source: &'a str,
    marker: &str,
    search_from: usize,
) -> Option<(usize, &'a str)> {
    let rel_start = source[search_from..].find(marker)?;
    let block_start = search_from + rel_start + marker.len();
    let mut depth = 1i32;
    let mut end = source.len();
    for (i, c) in source[block_start..].char_indices() {
        match c {
            '{' => depth += 1,
            '}' => {
                depth -= 1;
                if depth == 0 {
                    end = block_start + i;
                    break;
                }
            }
            _ => {}
        }
    }
    Some((end + 1, &source[block_start..end]))
}

/// Every `SecurityIssue { header: "...", issue_type: "...", ... }` struct
/// literal in `source`, as `"{header}:{issue_type}"` — skipped when either
/// field isn't a plain string literal (e.g. `csp_issue`'s own generic
/// constructor, whose `issue_type` is a variable, not a literal — that
/// helper's *callers* are covered separately by
/// `extract_csp_issue_literal_ids`).
fn extract_security_issue_literal_ids(source: &str) -> Vec<String> {
    let mut ids = Vec::new();
    let mut search_from = 0;
    while let Some((next_from, block)) = find_next_block(source, "SecurityIssue {", search_from) {
        if let (Some(header), Some(issue_type)) = (
            extract_field_str(block, "header"),
            extract_field_str(block, "issue_type"),
        ) {
            ids.push(format!("{header}:{issue_type}"));
        }
        search_from = next_from;
    }
    ids
}

/// Every `csp_issue("literal", ...)` call site, as
/// `"Content-Security-Policy:{literal}"` (the helper always hardcodes that
/// header). Calls passing a computed `&format!(...)` first argument (the
/// object-src/base-uri/frame-ancestors loop) are intentionally not matched
/// here — see `CSP_DYNAMIC_DIRECTIVE_IDS` below.
fn extract_csp_issue_literal_ids(source: &str) -> Vec<String> {
    let mut ids = Vec::new();
    let marker = "csp_issue(";
    let mut search_from = 0;
    while let Some(rel) = source[search_from..].find(marker) {
        let after = search_from + rel + marker.len();
        let rest = source[after..].trim_start();
        if let Some(stripped) = rest.strip_prefix('"') {
            if let Some(end) = stripped.find('"') {
                ids.push(format!("Content-Security-Policy:{}", &stripped[..end]));
            }
        }
        search_from = after;
    }
    ids
}

/// `generate_security_issues`'s `for (directive, severity) in [("object-src", ..), ...]`
/// loop builds its issue_type via `format!("missing_{directive}")` — not a
/// string literal, so the text scan above can't see it. Hand-enumerated
/// from that loop's own literal array (`src/security/mod.rs`,
/// `generate_security_issues`); re-verify this list if that array changes.
const CSP_DYNAMIC_DIRECTIVE_IDS: &[&str] = &[
    "Content-Security-Policy:missing_object-src",
    "Content-Security-Policy:missing_base-uri",
    "Content-Security-Policy:missing_frame-ancestors",
];

/// The canonical, deduplicated list of every `"{header}:{issue_type}"` id
/// `src/security/mod.rs` can currently produce.
pub fn canonical_security_check_ids() -> BTreeSet<String> {
    let source = production_source(&security_mod_path());
    let mut ids = BTreeSet::new();
    ids.extend(extract_security_issue_literal_ids(&source));
    ids.extend(extract_csp_issue_literal_ids(&source));
    ids.extend(CSP_DYNAMIC_DIRECTIVE_IDS.iter().map(|s| s.to_string()));
    ids
}

/// Every library name matched as a pattern (not a value) inside
/// `check_vulnerability`'s `match name { "jQuery" if .. => .., .. }` block —
/// identified by scanning that function body line-by-line for lines whose
/// *trimmed* text starts with a quote (arm patterns in this file are always
/// written on their own line, e.g. `"jQuery"` or `"Prototype" | "MooTools"`).
///
/// Value-position string literals (rustfmt-wrapped `description:`/severity
/// strings that also end up alone on their own line, e.g. a bare `"high"`
/// inside a nested `if`/`else`) would otherwise false-positive on the same
/// "starts with a quote" heuristic — they're distinguished by indentation:
/// every real arm pattern sits at the *same*, shallower column (one level
/// under `match name {`), while value literals are nested several levels
/// deeper inside `return Some(VulnerableLibrary { .. })`. The first matching
/// line's indentation is taken as that reference column.
fn extract_vulnerable_library_names(source: &str) -> Vec<String> {
    let mut names = Vec::new();
    let Some((_, body)) = find_next_block(
        source,
        "fn check_vulnerability(name: &str, version: &str) -> Option<VulnerableLibrary> {",
        0,
    ) else {
        return names;
    };
    let mut arm_indent: Option<usize> = None;
    for line in body.lines() {
        let trimmed = line.trim_start();
        if !trimmed.starts_with('"') {
            continue;
        }
        let indent = line.len() - trimmed.len();
        match arm_indent {
            None => arm_indent = Some(indent),
            Some(expected) if expected != indent => continue,
            Some(_) => {}
        }
        for part in trimmed.trim_end().split('|') {
            let part = part.trim();
            if let Some(rest) = part.strip_prefix('"') {
                if let Some(end) = rest.find('"') {
                    names.push(rest[..end].to_string());
                }
            }
        }
    }
    names
}

/// The canonical, deduplicated list of every library name
/// `best_practices::vulnerable_libs::check_vulnerability` recognizes.
pub fn canonical_vulnerable_library_ids() -> BTreeSet<String> {
    let source = production_source(&vulnerable_libs_path());
    extract_vulnerable_library_names(&source)
        .into_iter()
        .collect()
}

/// `CamelCase` -> `snake_case`, matching `#[serde(rename_all = "snake_case")]`'s
/// behavior for the plain-word enum variants used here (no acronyms/digits
/// to special-case in `SchemaFeature`).
fn to_snake_case(camel: &str) -> String {
    let mut out = String::new();
    for (i, c) in camel.char_indices() {
        if c.is_uppercase() && i > 0 {
            out.push('_');
        }
        out.extend(c.to_lowercase());
    }
    out
}

/// Every variant of `pub enum SchemaFeature { ... }`, converted to the
/// snake_case form `#[serde(rename_all = "snake_case")]` produces (the same
/// strings `SchemaFeature::key()` hand-maintains in parallel — both must
/// agree, which is exactly what this inventory can catch drifting).
fn extract_schema_feature_variants(source: &str) -> Vec<String> {
    let marker = "pub enum SchemaFeature {";
    let Some(start) = source.find(marker) else {
        return Vec::new();
    };
    let body_start = start + marker.len();
    let end = source[body_start..]
        .find('}')
        .map(|i| body_start + i)
        .unwrap_or(source.len());
    source[body_start..end]
        .lines()
        .map(|l| l.trim().trim_end_matches(','))
        .filter(|l| !l.is_empty() && !l.starts_with("//"))
        .map(to_snake_case)
        .collect()
}

/// The canonical, deduplicated list of every `SchemaFeature` key
/// `seo::schema_rules` can currently produce.
pub fn canonical_schema_feature_ids() -> BTreeSet<String> {
    let source = production_source(&schema_rules_path());
    extract_schema_feature_variants(&source)
        .into_iter()
        .collect()
}
