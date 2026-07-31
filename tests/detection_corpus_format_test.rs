//! Tests for the detection-corpus `expected.json` format and loader (#553).
//! Browser-free, no real corpus fixtures required — the corpus itself
//! starts empty and is populated incrementally by #556.

mod common;

use common::detection_corpus::{load_corpus_dir, load_structurally_deferred, parse_case, Verdict};

const EXAMPLE_CASE_JSON: &str = r#"
{
  "case": "hero_opacity_overlay",
  "expectations": [
    { "rule_id": "color-contrast", "selector": ".hero h1", "verdict": "violation" },
    { "rule_id": "color-contrast", "selector": ".hero .cta", "verdict": "pass" },
    { "rule_id": "non-text-contrast-css", "selector": ".hero .badge", "verdict": "needs_review" }
  ]
}
"#;

#[test]
fn parses_a_well_formed_case() {
    let case = parse_case(EXAMPLE_CASE_JSON).expect("valid expected.json should parse");

    assert_eq!(case.case, "hero_opacity_overlay");
    assert_eq!(case.expectations.len(), 3);

    assert_eq!(case.expectations[0].rule_id, "color-contrast");
    assert_eq!(case.expectations[0].selector.as_deref(), Some(".hero h1"));
    assert_eq!(case.expectations[0].verdict, Verdict::Violation);

    assert_eq!(case.expectations[1].verdict, Verdict::Pass);
    assert_eq!(case.expectations[2].verdict, Verdict::NeedsReview);
}

#[test]
fn rejects_an_unknown_verdict() {
    let bad = r#"{ "case": "x", "expectations": [{ "rule_id": "color-contrast", "verdict": "definitely_broken" }] }"#;
    assert!(
        parse_case(bad).is_err(),
        "an unrecognized verdict must fail to parse, not silently default"
    );
}

#[test]
fn selector_is_optional() {
    let json =
        r#"{ "case": "x", "expectations": [{ "rule_id": "color-contrast", "verdict": "pass" }] }"#;
    let case = parse_case(json).expect("selector should be optional");
    assert_eq!(case.expectations[0].selector, None);
}

#[test]
fn load_corpus_dir_returns_empty_for_a_missing_directory() {
    let missing = std::path::Path::new("/nonexistent/detection_corpus_dir_for_test");
    assert!(load_corpus_dir(missing).is_empty());
}

#[test]
fn load_corpus_dir_reads_every_expected_json_file() {
    let dir = tempfile::tempdir().expect("tempdir");

    std::fs::write(dir.path().join("case_a.expected.json"), EXAMPLE_CASE_JSON).unwrap();
    std::fs::write(
        dir.path().join("case_b.expected.json"),
        r#"{ "case": "b", "expectations": [] }"#,
    )
    .unwrap();
    // Non-matching files must be ignored, not misread as a case.
    std::fs::write(dir.path().join("case_a.html"), "<html></html>").unwrap();
    std::fs::write(dir.path().join("README.md"), "not a case").unwrap();

    let mut cases = load_corpus_dir(dir.path());
    cases.sort_by(|a, b| a.case.cmp(&b.case));

    assert_eq!(cases.len(), 2);
    assert_eq!(cases[0].case, "b");
    assert_eq!(cases[1].case, "hero_opacity_overlay");
    assert!(cases[1].source_file.is_some());
}

#[test]
fn load_structurally_deferred_returns_empty_when_file_is_absent() {
    let dir = tempfile::tempdir().expect("tempdir");
    assert!(load_structurally_deferred(dir.path()).is_empty());
}

#[test]
fn load_structurally_deferred_reads_rule_id_and_reason() {
    let dir = tempfile::tempdir().expect("tempdir");
    std::fs::write(
        dir.path().join("structurally_deferred.json"),
        r#"[{ "rule_id": "timeouts", "reason": "needs a real session timeout, not reproducible in a static page" }]"#,
    )
    .unwrap();

    let deferred = load_structurally_deferred(dir.path());
    assert_eq!(deferred.len(), 1);
    assert_eq!(deferred[0].rule_id, "timeouts");
    assert!(deferred[0].reason.contains("session timeout"));
}
