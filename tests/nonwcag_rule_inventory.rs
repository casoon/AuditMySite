//! Canonical inventories of the enumerable checks in three non-WCAG modules
//! (#558): security headers, `best_practices::vulnerable_libs`, and
//! `seo::schema_rules`. See `tests/common/nonwcag_rule_inventory.rs` for the
//! scan implementation and its documented per-module caveats — this file
//! only holds the assertions.

mod common;

use common::nonwcag_rule_inventory::{
    canonical_schema_feature_ids, canonical_security_check_ids, canonical_vulnerable_library_ids,
};

#[test]
fn security_check_inventory_contains_known_ids() {
    let ids = canonical_security_check_ids();

    println!("security check inventory: {} distinct ids", ids.len());
    for id in &ids {
        println!("  {id}");
    }

    assert!(
        ids.len() >= 15,
        "security check inventory found only {} ids — scan is likely broken (expected 15+)",
        ids.len()
    );

    assert!(ids.contains("HTTPS:missing_https"));
    assert!(ids.contains("Content-Security-Policy:missing_header"));
    assert!(ids.contains("X-Frame-Options:missing_header"));
    assert!(ids.contains("Strict-Transport-Security:hsts_preload_ineligible"));
    assert!(ids.contains("Permissions-Policy:permissions_policy_permissive"));
    assert!(ids.contains("Source Map:public_source_map"));
    assert!(ids.contains("Access-Control-Allow-Origin:cors_wildcard_credentials"));
    // CSP quality sub-checks (`collect_csp_quality_issues`).
    assert!(ids.contains("Content-Security-Policy:unsafe_inline_script"));
    assert!(ids.contains("Content-Security-Policy:unsafe_eval_script"));
    assert!(ids.contains("Content-Security-Policy:wildcard_script_source"));
    assert!(ids.contains("Content-Security-Policy:missing_object-src"));
    assert!(ids.contains("Content-Security-Policy:missing_base-uri"));
    assert!(ids.contains("Content-Security-Policy:missing_frame-ancestors"));
}

#[test]
fn vulnerable_library_inventory_contains_known_libraries() {
    let ids = canonical_vulnerable_library_ids();

    println!("vulnerable library inventory: {} distinct ids", ids.len());
    for id in &ids {
        println!("  {id}");
    }

    assert!(
        ids.len() >= 6,
        "vulnerable library inventory found only {} ids — scan is likely broken (expected 6+)",
        ids.len()
    );

    for lib in [
        "jQuery",
        "Bootstrap",
        "AngularJS",
        "Handlebars",
        "Lodash",
        "Underscore",
        "Prototype",
        "MooTools",
    ] {
        assert!(ids.contains(lib), "missing known vulnerable library: {lib}");
    }
}

#[test]
fn schema_feature_inventory_contains_known_features() {
    let ids = canonical_schema_feature_ids();

    println!("schema feature inventory: {} distinct ids", ids.len());
    for id in &ids {
        println!("  {id}");
    }

    assert!(
        ids.len() >= 15,
        "schema feature inventory found only {} ids — scan is likely broken (expected 15+)",
        ids.len()
    );

    for key in [
        "product_snippet",
        "merchant_listing",
        "article",
        "breadcrumb",
        "organization",
        "local_business",
        "faq",
        "web_page",
        "web_site",
    ] {
        assert!(ids.contains(key), "missing known schema feature: {key}");
    }
}
