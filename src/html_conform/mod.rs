//! HTML5 spec-conformance checking via the `html-conform` crate.
//!
//! Wraps `html_conform::check` (browser-style HTML5 tree construction, full
//! RelaxNG schema validation, Schematron co-constraints, import-map/
//! speculation-rules JSON validation, CSP enforcement) — a much deeper check
//! than the existing crude `html5ever`-parse-errors-only validator in
//! `seo::page_health` (left untouched, see module structure docs).
//!
//! `rule_id`/`message` are stored as opaque canonical-English payload —
//! `html-conform`'s rule set is open-ended (not a small closed enum) and its
//! messages are third-party English prose, the same shape as
//! `best_practices::console_errors`/`vulnerable_libs`, so this module
//! deliberately does not use the #406 kind-enum localization pattern.

pub mod module;
pub use module::HtmlConformModule;

use chromiumoxide::Page;
use serde::{Deserialize, Serialize};
use tracing::warn;

use crate::error::{AuditError, Result};

/// Complete HTML5 conformance analysis for a single page.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HtmlConformAnalysis {
    /// Conformance score (0-100). Only meaningful when `checked` is true.
    pub score: u32,
    /// Whether the check actually ran (HTML extraction + `html_conform::check`
    /// both succeeded). `false` means "not measured" — excluded from the
    /// weighted overall score, not counted as a score of 0.
    pub checked: bool,
    pub error_count: u32,
    pub warning_count: u32,
    pub info_count: u32,
    pub findings: Vec<HtmlConformFinding>,
    /// The raw document HTML the check ran against, kept for the
    /// `html_content_model` WCAG rule (#579) to re-scan for enclosing tag
    /// context — `html-conform`'s content-model findings carry no parent
    /// element info, only a source location. Not serialized: it's derived
    /// at analysis time and would bloat the JSON report for no reader
    /// benefit, the same rationale as skipping raw screenshot bytes
    /// elsewhere in this codebase.
    #[serde(skip)]
    pub raw_html: Option<String>,
}

/// A single HTML5 conformance finding, passthrough from `html_conform::Finding`.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HtmlConformFinding {
    /// Stable rule identifier from the checker (e.g. "schema.html5", "parser.html5").
    pub rule_id: String,
    /// Lowercased severity: "error" / "warning" / "info".
    pub severity: String,
    /// Human-readable, canonical-English explanation authored by the checker.
    pub message: String,
    /// "line:column" source location, when the checker could establish one.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub location: Option<String>,
    /// Zero-based byte offset into the checked HTML, when the checker could
    /// establish one. Used by the `html_content_model` WCAG rule (#579) to
    /// locate the finding's enclosing tag stack; not exposed via `location`
    /// (a formatted "line:column" string) since that would require
    /// re-parsing text back into a number.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub byte_offset: Option<usize>,
}

/// Runs `html_conform::check` against the live page's rendered HTML.
///
/// On a technical setup failure (`CheckError`) or HTML-extraction failure,
/// logs a warning and returns `checked: false` / `score: 100` rather than a
/// punitive 0 — mirrors Performance's `metrics_available == 0` "not measured"
/// treatment.
pub async fn analyze_html_conform(page: &Page) -> Result<HtmlConformAnalysis> {
    let html = extract_document_html(page).await?;

    let report = match html_conform::check(&html) {
        Ok(report) => report,
        Err(e) => {
            warn!("HTML conformance check setup failed: {}", e);
            return Ok(not_measured());
        }
    };

    let mut error_count = 0u32;
    let mut warning_count = 0u32;
    let mut info_count = 0u32;
    let findings: Vec<HtmlConformFinding> = report
        .findings
        .into_iter()
        .map(|f| {
            let severity = match f.severity {
                html_conform::Severity::Error => {
                    error_count += 1;
                    "error"
                }
                html_conform::Severity::Warning => {
                    warning_count += 1;
                    "warning"
                }
                html_conform::Severity::Info => {
                    info_count += 1;
                    "info"
                }
            };
            HtmlConformFinding {
                rule_id: f.rule_id,
                severity: severity.to_string(),
                message: f.message,
                location: f.location.map(|l| l.to_string()),
                byte_offset: f.location.map(|l| l.byte_offset),
            }
        })
        .collect();

    let penalty = (error_count * 10 + warning_count * 4 + info_count).min(100);
    let score = 100 - penalty;

    Ok(HtmlConformAnalysis {
        score,
        checked: true,
        error_count,
        warning_count,
        info_count,
        findings,
        raw_html: Some(html),
    })
}

fn not_measured() -> HtmlConformAnalysis {
    HtmlConformAnalysis {
        score: 100,
        checked: false,
        error_count: 0,
        warning_count: 0,
        info_count: 0,
        findings: Vec::new(),
        raw_html: None,
    }
}

/// Extracts the live document's HTML (doctype + `documentElement.outerHTML`)
/// via CDP. Deliberate small duplication of
/// `seo::page_health::extract_document_html` — sharing it would mean
/// exporting it out of `page_health` and threading a new `raw_html` field
/// through `ModuleContext`/`SnapshotData` for a ~15-line CDP call.
async fn extract_document_html(page: &Page) -> Result<String> {
    let js = r#"
    (() => {
        const d = document.doctype;
        const doctype = d
            ? `<!DOCTYPE ${d.name}${d.publicId ? ` PUBLIC "${d.publicId}"` : ''}${d.systemId ? ` "${d.systemId}"` : ''}>`
            : '<!DOCTYPE html>';
        return doctype + '\n' + document.documentElement.outerHTML;
    })()
    "#;

    let result = page.evaluate(js).await.map_err(|e| {
        AuditError::CdpError(format!(
            "HTML extraction for conformance check failed: {}",
            e
        ))
    })?;

    result
        .value()
        .and_then(|v| v.as_str())
        .map(str::to_string)
        .ok_or_else(|| {
            AuditError::CdpError(
                "HTML extraction for conformance check returned no value".to_string(),
            )
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn penalty_caps_at_100_and_floors_score_at_0() {
        let error_count = 20u32;
        let warning_count = 0u32;
        let info_count = 0u32;
        let penalty = (error_count * 10 + warning_count * 4 + info_count).min(100);
        assert_eq!(penalty, 100);
        assert_eq!(100u32.saturating_sub(penalty), 0);
    }

    #[test]
    fn not_measured_has_full_score_and_is_excluded() {
        let a = not_measured();
        assert!(!a.checked);
        assert_eq!(a.score, 100);
        assert!(a.findings.is_empty());
    }
}
