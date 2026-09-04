//! Completeness check: coverage gap between the canonical non-WCAG check
//! inventories (#558, `tests/common/nonwcag_rule_inventory.rs`) and their
//! detection corpora, one per domain
//! (`tests/fixtures/detection_corpus_nonwcag/<domain>/`).
//!
//! Same shape and same intent as `tests/detection_corpus_completeness.rs`
//! for the WCAG corpus: browser-free, doesn't fail on low coverage (each
//! domain's corpus starts empty and is populated incrementally), but does
//! fail hard on a real authoring bug — a corpus case or
//! `structurally_deferred.json` entry referencing an id that isn't in that
//! domain's canonical inventory at all.

mod common;

use common::detection_corpus::{
    load_corpus_dir, load_structurally_deferred, nonwcag_detection_corpus_dir,
};
use std::collections::BTreeSet;

/// Runs the shared gap-report/authoring-bug-guard logic for one domain.
fn check_domain(domain: &str, canonical: BTreeSet<String>) {
    let corpus_dir = nonwcag_detection_corpus_dir(domain);
    let cases = load_corpus_dir(&corpus_dir);
    let deferred = load_structurally_deferred(&corpus_dir);

    let covered: BTreeSet<String> = cases
        .iter()
        .flat_map(|c| c.expectations.iter().map(|e| e.rule_id.clone()))
        .collect();
    let deferred_ids: BTreeSet<String> = deferred.iter().map(|d| d.rule_id.clone()).collect();

    let unknown_in_corpus: Vec<&String> = covered.difference(&canonical).collect();
    assert!(
        unknown_in_corpus.is_empty(),
        "[{domain}] detection corpus references id(s) not in the canonical inventory \
         (typo, or a check that was renamed/removed?): {unknown_in_corpus:?}"
    );
    let unknown_in_deferred: Vec<&String> = deferred_ids.difference(&canonical).collect();
    assert!(
        unknown_in_deferred.is_empty(),
        "[{domain}] structurally_deferred.json references id(s) not in the canonical inventory: \
         {unknown_in_deferred:?}"
    );

    let both: Vec<&String> = covered.intersection(&deferred_ids).collect();
    assert!(
        both.is_empty(),
        "[{domain}] id(s) are both covered by a corpus case AND marked structurally_deferred \
         — pick one: {both:?}"
    );

    let gap: BTreeSet<&String> = canonical
        .iter()
        .filter(|id| !covered.contains(*id) && !deferred_ids.contains(*id))
        .collect();

    println!(
        "[{domain}] detection corpus completeness: {} covered / {} structurally_deferred / {} gap (of {} total ids)",
        covered.len(),
        deferred_ids.len(),
        gap.len(),
        canonical.len()
    );
    if !gap.is_empty() {
        println!("[{domain}] uncovered ids:");
        for id in &gap {
            println!("  {id}");
        }
    }
}

#[test]
fn security_detection_corpus_completeness_gap_report() {
    check_domain(
        "security",
        common::nonwcag_rule_inventory::canonical_security_check_ids(),
    );
}

#[test]
fn vulnerable_libs_detection_corpus_completeness_gap_report() {
    check_domain(
        "vulnerable_libs",
        common::nonwcag_rule_inventory::canonical_vulnerable_library_ids(),
    );
}

#[test]
fn schema_rules_detection_corpus_completeness_gap_report() {
    check_domain(
        "schema_rules",
        common::nonwcag_rule_inventory::canonical_schema_feature_ids(),
    );
}
