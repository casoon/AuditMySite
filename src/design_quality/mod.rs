//! Design-quality analysis (#528): opt-in, evidence-based UX/readability
//! heuristics from the rendered page.
//!
//! This module is deliberately **not** a WCAG rule and stays outside the
//! accessibility/overall score, grade, and certificate. Every finding uses
//! canonical English and is tagged `measurement_type: "heuristic"` — these
//! are actionable suggestions, not conformance failures. Findings use a
//! dedicated type rather than `wcag::types::Violation` so they can never be
//! folded into WCAG violation counting or scoring by accident.

pub mod module;
pub use module::DesignQualityModule;

use chromiumoxide::Page;
use serde::{Deserialize, Serialize};
use tracing::warn;

use crate::error::{AuditError, Result};

/// Severity-like classification for a design-quality finding.
///
/// `Warning` is a functional risk (e.g. interactive content that can be
/// clipped out of view). `Advisory` is a stylistic/readability suggestion —
/// never presented as a defect.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum FindingLevel {
    Warning,
    Advisory,
}

/// Confidence that the measured condition is a real issue on this page.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Confidence {
    High,
    Medium,
    Low,
}

/// A single design-quality finding.
///
/// Deliberately independent of `wcag::types::Violation` — see module doc.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DesignQualityFinding {
    /// Stable identifier, e.g. `"design.overflow_clip"`.
    pub rule_id: String,
    pub level: FindingLevel,
    pub confidence: Confidence,
    /// Always `"heuristic"` — never a measured, conformance-grade value.
    pub measurement_type: String,
    pub selector: String,
    /// Bounded evidence excerpt (measured value + short snippet).
    pub evidence: String,
    /// Canonical English message.
    pub message: String,
}

/// Results of the design-quality analysis for one page.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct DesignQualityAnalysis {
    pub findings: Vec<DesignQualityFinding>,
    /// Rule ids that were evaluated (present even when they produced no
    /// findings), so the report can distinguish "checked, clean" from
    /// "not checked".
    pub rules_run: Vec<String>,
}

impl DesignQualityAnalysis {
    pub fn warnings(&self) -> impl Iterator<Item = &DesignQualityFinding> {
        self.findings
            .iter()
            .filter(|f| f.level == FindingLevel::Warning)
    }

    pub fn advisories(&self) -> impl Iterator<Item = &DesignQualityFinding> {
        self.findings
            .iter()
            .filter(|f| f.level == FindingLevel::Advisory)
    }
}

// ── Tunable thresholds (not specified by the issue — defaults chosen to be
// conservative; treat as constants to tune without touching rule logic) ────
const LINE_LENGTH_CHARS_THRESHOLD: f64 = 90.0;
// Kept below `normal`'s typical browser-computed ratio (~1.2) so ordinary,
// unstyled text does not trigger this heuristic — only line-heights authors
// have deliberately tightened below that baseline.
const LINE_HEIGHT_RATIO_ADVISORY: f64 = 1.15;
const LINE_HEIGHT_RATIO_WARNING: f64 = 1.0;
const ALL_CAPS_MIN_CHARS: usize = 60;

/// Layout-affecting properties considered a "layout transition" for #528's
/// rule 5 — a narrower subset than `performance::animations`'s full
/// non-composited-property list (which also flags paint-only properties
/// like `color`/`box-shadow` that don't move content).
const LAYOUT_TRANSITION_PROPERTIES: &[&str] = &[
    "width",
    "height",
    "min-width",
    "max-width",
    "min-height",
    "max-height",
    "margin",
    "margin-top",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "padding",
    "padding-top",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "top",
    "left",
    "right",
    "bottom",
];

#[derive(Debug, Deserialize)]
struct RawTextCandidate {
    #[serde(rename = "cssPath")]
    css_path: Option<String>,
    snippet: Option<String>,
    text: String,
    #[serde(rename = "textLength")]
    text_length: usize,
    #[serde(rename = "lineHeightRatio")]
    line_height_ratio: f64,
    #[serde(rename = "textTransform")]
    text_transform: String,
    #[serde(rename = "lineCount")]
    line_count: u32,
}

#[derive(Debug, Deserialize)]
struct RawClipCandidate {
    #[serde(rename = "cssPath")]
    css_path: Option<String>,
    snippet: Option<String>,
    #[serde(rename = "clippingAncestor")]
    clipping_ancestor: String,
}

#[derive(Debug, Default, Deserialize)]
struct RawCandidates {
    #[serde(default, rename = "textCandidates")]
    text_candidates: Vec<RawTextCandidate>,
    #[serde(default, rename = "clipCandidates")]
    clip_candidates: Vec<RawClipCandidate>,
}

const EXTRACT_JS: &str = include_str!("extract.js");

/// Run the design-quality analysis on the already-loaded page.
///
/// Reuses the live CDP session (`page`) — no new navigation, browser, or
/// Node runtime. A single `page.evaluate()` pass collects both the
/// text-based candidates (line length, line height, all-caps) and the
/// positioned/interactive candidates (overflow-clip) in one round trip.
pub async fn analyze_design_quality(page: &Page) -> Result<DesignQualityAnalysis> {
    let js_code = [
        "(() => {",
        crate::accessibility::js_helpers::CSS_SELECTOR_JS,
        crate::accessibility::js_helpers::IS_VISUALLY_HIDDEN_JS,
        crate::accessibility::js_helpers::IS_ARIA_HIDDEN_JS,
        EXTRACT_JS,
        "})();",
    ]
    .concat();

    let eval_result = page
        .evaluate(js_code.as_str())
        .await
        .map_err(|e| AuditError::CdpError(format!("Design quality extraction JS failed: {e}")))?;

    let raw: RawCandidates = match eval_result.value() {
        Some(value) => serde_json::from_value(value.clone()).unwrap_or_else(|e| {
            warn!("Failed to parse design-quality candidates JSON: {}", e);
            RawCandidates::default()
        }),
        None => {
            warn!("No value returned from design-quality extraction JS");
            RawCandidates::default()
        }
    };

    let mut findings = Vec::new();
    findings.extend(check_overflow_clip(&raw.clip_candidates));
    findings.extend(check_line_length(&raw.text_candidates));
    findings.extend(check_line_height(&raw.text_candidates));
    findings.extend(check_all_caps(&raw.text_candidates));

    Ok(DesignQualityAnalysis {
        findings,
        rules_run: vec![
            "design.overflow_clip".to_string(),
            "design.line_length".to_string(),
            "design.line_height".to_string(),
            "design.all_caps".to_string(),
            // "design.layout_transition" is evaluated in `derive()` against
            // `report.performance.animations`, not here — see module.rs.
        ],
    })
}

fn selector_or_unknown(sel: &Option<String>) -> String {
    sel.clone()
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| "unknown".to_string())
}

/// Bounded evidence suffix appending the (already client-side-truncated)
/// HTML snippet, when present.
fn with_snippet(evidence: String, snippet: &Option<String>) -> String {
    match snippet.as_deref().filter(|s| !s.is_empty()) {
        Some(s) => format!("{evidence} Element: {s}"),
        None => evidence,
    }
}

/// Localized presentation text for a design-quality finding, keyed by its
/// canonical `rule_id` (#406 message-baked-struct pattern: the analysis layer
/// bakes `DesignQualityFinding.message` by calling this with `en=true` — JSON
/// stays canonical English — and the PDF builder calls it again with the run
/// locale). Per-instance specifics (selector, ancestor, measured values) live
/// in `evidence`, not in this generic prose.
pub fn finding_message_text(rule_id: &str, level: FindingLevel, en: bool) -> String {
    match rule_id {
        "design.overflow_clip" => if en {
            "This positioned/interactive element can be clipped by an overflow-hidden ancestor, making part of it inaccessible."
        } else {
            "Dieses positionierte/interaktive Element kann von einem Vorfahren mit overflow:hidden abgeschnitten werden, wodurch ein Teil davon unzugänglich wird."
        }
        .to_string(),
        "design.line_length" => if en {
            "This body text wraps at a line length that may reduce readability."
        } else {
            "Dieser Fließtext bricht bei einer Zeilenlänge um, die die Lesbarkeit beeinträchtigen kann."
        }
        .to_string(),
        "design.line_height" => {
            if level == FindingLevel::Warning {
                if en {
                    "This multi-line text has a line height tight enough that lines may visually overlap."
                } else {
                    "Dieser mehrzeilige Text hat einen Zeilenabstand, der so knapp ist, dass sich Zeilen optisch überlappen können."
                }
            } else if en {
                "This multi-line body text has a line height that may reduce readability."
            } else {
                "Dieser mehrzeilige Fließtext hat einen Zeilenabstand, der die Lesbarkeit beeinträchtigen kann."
            }
            .to_string()
        }
        "design.all_caps" => if en {
            "Long all-caps body text can be harder to read than mixed case."
        } else {
            "Langer Fließtext in Großbuchstaben kann schwerer lesbar sein als gemischte Groß-/Kleinschreibung."
        }
        .to_string(),
        "design.layout_transition" => if en {
            "Animating a layout-affecting CSS property can cause jank; consider transform/opacity instead."
        } else {
            "Das Animieren einer layoutwirksamen CSS-Eigenschaft kann Ruckeln verursachen; transform/opacity sind die bessere Wahl."
        }
        .to_string(),
        _ => String::new(),
    }
}

fn check_overflow_clip(candidates: &[RawClipCandidate]) -> Vec<DesignQualityFinding> {
    candidates
        .iter()
        .map(|c| DesignQualityFinding {
            rule_id: "design.overflow_clip".to_string(),
            level: FindingLevel::Warning,
            confidence: Confidence::High,
            measurement_type: "heuristic".to_string(),
            selector: selector_or_unknown(&c.css_path),
            evidence: with_snippet(
                format!(
                    "Positioned element extends outside ancestor '{}', which clips overflow.",
                    c.clipping_ancestor
                ),
                &c.snippet,
            ),
            message: finding_message_text("design.overflow_clip", FindingLevel::Warning, true),
        })
        .collect()
}

fn check_line_length(candidates: &[RawTextCandidate]) -> Vec<DesignQualityFinding> {
    candidates
        .iter()
        .filter(|c| c.line_count >= 2)
        .filter_map(|c| {
            let chars_per_line = c.text_length as f64 / c.line_count as f64;
            if chars_per_line <= LINE_LENGTH_CHARS_THRESHOLD {
                return None;
            }
            Some(DesignQualityFinding {
                rule_id: "design.line_length".to_string(),
                level: FindingLevel::Advisory,
                confidence: Confidence::Medium,
                measurement_type: "heuristic".to_string(),
                selector: selector_or_unknown(&c.css_path),
                evidence: with_snippet(
                    format!(
                        "~{:.0} characters per line across {} lines (threshold {:.0}).",
                        chars_per_line, c.line_count, LINE_LENGTH_CHARS_THRESHOLD
                    ),
                    &c.snippet,
                ),
                message: finding_message_text("design.line_length", FindingLevel::Advisory, true),
            })
        })
        .collect()
}

fn check_line_height(candidates: &[RawTextCandidate]) -> Vec<DesignQualityFinding> {
    candidates
        .iter()
        .filter(|c| c.line_count >= 2)
        .filter_map(|c| {
            if c.line_height_ratio >= LINE_HEIGHT_RATIO_ADVISORY {
                return None;
            }
            let level = if c.line_height_ratio < LINE_HEIGHT_RATIO_WARNING {
                FindingLevel::Warning
            } else {
                FindingLevel::Advisory
            };
            let confidence = if level == FindingLevel::Warning {
                Confidence::High
            } else {
                Confidence::Medium
            };
            Some(DesignQualityFinding {
                rule_id: "design.line_height".to_string(),
                level,
                confidence,
                measurement_type: "heuristic".to_string(),
                selector: selector_or_unknown(&c.css_path),
                evidence: with_snippet(
                    format!(
                        "line-height/font-size ratio {:.2} across {} lines.",
                        c.line_height_ratio, c.line_count
                    ),
                    &c.snippet,
                ),
                message: finding_message_text("design.line_height", level, true),
            })
        })
        .collect()
}

fn check_all_caps(candidates: &[RawTextCandidate]) -> Vec<DesignQualityFinding> {
    candidates
        .iter()
        .filter(|c| c.text_length > ALL_CAPS_MIN_CHARS)
        .filter(|c| {
            c.text_transform == "uppercase"
                || (c.text.to_uppercase() == c.text && c.text.to_lowercase() != c.text)
        })
        .map(|c| DesignQualityFinding {
            rule_id: "design.all_caps".to_string(),
            level: FindingLevel::Advisory,
            confidence: Confidence::Medium,
            measurement_type: "heuristic".to_string(),
            selector: selector_or_unknown(&c.css_path),
            evidence: with_snippet(
                format!("{} characters of all-caps body text.", c.text_length),
                &c.snippet,
            ),
            message: finding_message_text("design.all_caps", FindingLevel::Advisory, true),
        })
        .collect()
}

/// Re-project `performance::animations` findings restricted to layout-affecting
/// properties as design-quality advisories (#528 rule 5). Deliberately does
/// not re-detect transitions independently — see `module.rs`'s `derive()`.
fn layout_transition_advisories(
    animations: &crate::performance::AnimationAnalysis,
) -> Vec<DesignQualityFinding> {
    animations
        .findings
        .iter()
        .filter(|f| f.kind == "transition")
        .filter(|f| {
            LAYOUT_TRANSITION_PROPERTIES
                .iter()
                .any(|p| *p == f.property)
        })
        .map(|f| DesignQualityFinding {
            rule_id: "design.layout_transition".to_string(),
            level: FindingLevel::Advisory,
            confidence: Confidence::Medium,
            measurement_type: "heuristic".to_string(),
            selector: f.name.clone(),
            evidence: format!("CSS transition animates layout property '{}'.", f.property),
            message: finding_message_text("design.layout_transition", FindingLevel::Advisory, true),
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn text_candidate(
        text_length: usize,
        line_count: u32,
        _font_size: f64,
        line_height_ratio: f64,
        text_transform: &str,
        text: &str,
    ) -> RawTextCandidate {
        RawTextCandidate {
            css_path: Some("p.test".to_string()),
            snippet: None,
            text: text.to_string(),
            text_length,
            line_height_ratio,
            text_transform: text_transform.to_string(),
            line_count,
        }
    }

    #[test]
    fn line_length_fires_when_multiline_and_over_threshold() {
        let c = text_candidate(400, 3, 16.0, 1.4, "none", "lorem ipsum");
        let findings = check_line_length(&[c]);
        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].rule_id, "design.line_length");
        assert_eq!(findings[0].level, FindingLevel::Advisory);
    }

    #[test]
    fn line_length_ignores_single_line() {
        let c = text_candidate(400, 1, 16.0, 1.4, "none", "lorem ipsum");
        assert!(check_line_length(&[c]).is_empty());
    }

    #[test]
    fn line_length_ignores_short_lines() {
        let c = text_candidate(120, 3, 16.0, 1.4, "none", "lorem ipsum");
        assert!(check_line_length(&[c]).is_empty());
    }

    #[test]
    fn line_height_warning_below_one() {
        let c = text_candidate(120, 3, 16.0, 0.9, "none", "lorem ipsum");
        let findings = check_line_height(&[c]);
        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].level, FindingLevel::Warning);
    }

    #[test]
    fn line_height_advisory_between_one_and_threshold() {
        let c = text_candidate(120, 3, 16.0, 1.1, "none", "lorem ipsum");
        let findings = check_line_height(&[c]);
        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].level, FindingLevel::Advisory);
    }

    #[test]
    fn line_height_passes_above_threshold() {
        let c = text_candidate(120, 3, 16.0, 1.5, "none", "lorem ipsum");
        assert!(check_line_height(&[c]).is_empty());
    }

    #[test]
    fn all_caps_fires_on_css_transform() {
        let c = text_candidate(80, 1, 16.0, 1.4, "uppercase", "lorem ipsum dolor sit amet");
        let findings = check_all_caps(&[c]);
        assert_eq!(findings.len(), 1);
    }

    #[test]
    fn all_caps_fires_on_literal_caps_text() {
        let long_caps = "A".repeat(70);
        let c = text_candidate(70, 1, 16.0, 1.4, "none", &long_caps);
        let findings = check_all_caps(&[c]);
        assert_eq!(findings.len(), 1);
    }

    #[test]
    fn all_caps_ignores_short_text() {
        let c = text_candidate(10, 1, 16.0, 1.4, "uppercase", "SHORT");
        assert!(check_all_caps(&[c]).is_empty());
    }

    #[test]
    fn all_caps_ignores_mixed_case() {
        let c = text_candidate(
            80,
            1,
            16.0,
            1.4,
            "none",
            "lorem ipsum dolor sit amet consectetur",
        );
        assert!(check_all_caps(&[c]).is_empty());
    }

    #[test]
    fn overflow_clip_produces_warning() {
        let c = RawClipCandidate {
            css_path: Some("button.cta".to_string()),
            snippet: None,
            clipping_ancestor: "div.hero".to_string(),
        };
        let findings = check_overflow_clip(&[c]);
        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].level, FindingLevel::Warning);
        assert_eq!(findings[0].confidence, Confidence::High);
    }

    #[test]
    fn layout_transition_keeps_only_layout_properties() {
        let animations = crate::performance::AnimationAnalysis {
            findings: vec![
                crate::performance::NonCompositedAnimation {
                    kind: "transition".to_string(),
                    name: "div.card".to_string(),
                    property: "width".to_string(),
                    source: "inline".to_string(),
                },
                crate::performance::NonCompositedAnimation {
                    kind: "transition".to_string(),
                    name: "div.card".to_string(),
                    property: "color".to_string(),
                    source: "inline".to_string(),
                },
                crate::performance::NonCompositedAnimation {
                    kind: "keyframe".to_string(),
                    name: "spin".to_string(),
                    property: "margin".to_string(),
                    source: "inline".to_string(),
                },
            ],
            total_count: 3,
            affected_properties: vec![
                "color".to_string(),
                "margin".to_string(),
                "width".to_string(),
            ],
        };
        let findings = layout_transition_advisories(&animations);
        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].selector, "div.card");
    }

    #[test]
    fn no_measurement_type_ever_deviates_from_heuristic() {
        let c = text_candidate(80, 1, 16.0, 1.4, "uppercase", "lorem ipsum dolor sit amet");
        for f in check_all_caps(&[c]) {
            assert_eq!(f.measurement_type, "heuristic");
        }
    }

    #[test]
    fn english_message_text_has_no_known_german_leaks() {
        // #406 guard: canonical (en=true) message text must be real English,
        // never a German sentence with the umlaut/ß left in.
        let has_umlaut = |s: &str| s.chars().any(|c| "äöüÄÖÜß".contains(c));
        for rule_id in [
            "design.overflow_clip",
            "design.line_length",
            "design.all_caps",
            "design.layout_transition",
        ] {
            let msg = finding_message_text(rule_id, FindingLevel::Advisory, true);
            assert!(!msg.is_empty(), "{rule_id} must produce a message");
            assert!(
                !has_umlaut(&msg),
                "{rule_id} EN message leaks German: {msg}"
            );
        }
        for level in [FindingLevel::Warning, FindingLevel::Advisory] {
            let msg = finding_message_text("design.line_height", level, true);
            assert!(
                !has_umlaut(&msg),
                "design.line_height EN message leaks German: {msg}"
            );
        }
    }

    #[test]
    fn german_message_text_differs_from_english() {
        for rule_id in [
            "design.overflow_clip",
            "design.line_length",
            "design.all_caps",
            "design.layout_transition",
        ] {
            let en = finding_message_text(rule_id, FindingLevel::Advisory, true);
            let de = finding_message_text(rule_id, FindingLevel::Advisory, false);
            assert_ne!(en, de, "{rule_id} must have a distinct German translation");
        }
    }
}
