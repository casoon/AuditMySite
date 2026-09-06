//! Diff-based accuracy test: vulnerable-library detection corpus against a
//! real `analyze_vulnerable_libraries` run (plan/11, rest-scope of #558).
//!
//! Needs real Chrome/CDP — `analyze_vulnerable_libraries(page: &Page)` reads
//! `window.jQuery`/`window.angular`/etc. via `page.evaluate()` from a
//! rendered page, unlike `analyze_security`'s plain HTTP fetch. `#[ignore]`-
//! gated like `tests/detection_corpus_test.rs`; run with `cargo test --
//! --ignored`.

mod common;

use std::io::{Read, Write};
use std::net::TcpListener;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;

use auditmysite::best_practices::analyze_vulnerable_libraries;
use auditmysite::{BrowserManager, BrowserOptions};
use common::detection_corpus::{
    load_corpus_dir, load_structurally_deferred, nonwcag_detection_corpus_dir, Verdict,
};

/// Same CI-sandbox handling as `tests/detection_corpus_test.rs`'s `ci_browser`.
async fn ci_browser() -> BrowserManager {
    let opts = BrowserOptions {
        no_sandbox: std::env::var("CI").is_ok(),
        ..Default::default()
    };
    BrowserManager::with_options(opts)
        .await
        .expect("browser launch failed")
}

/// Serve a fixture HTML file's contents locally, mirroring
/// `tests/detection_corpus_test.rs`'s `serve_html` (duplicated rather than
/// shared — same rationale as that file gives for not sharing with
/// `tests/integration_test.rs`).
fn serve_html(html: String) -> (String, Arc<AtomicBool>) {
    let listener = TcpListener::bind("127.0.0.1:0").expect("failed to bind");
    let port = listener.local_addr().unwrap().port();
    let url = format!("http://127.0.0.1:{port}");

    let shutdown = Arc::new(AtomicBool::new(false));
    let shutdown_clone = shutdown.clone();

    thread::spawn(move || {
        listener
            .set_nonblocking(true)
            .expect("cannot set non-blocking");
        loop {
            if shutdown_clone.load(Ordering::Relaxed) {
                break;
            }
            match listener.accept() {
                Ok((mut stream, _)) => {
                    let mut buf = [0u8; 1024];
                    let _ = stream.read(&mut buf);
                    let response = format!(
                        "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\n\r\n{}",
                        html.len(),
                        html
                    );
                    let _ = stream.write_all(response.as_bytes());
                    let _ = stream.flush();
                }
                Err(ref e) if e.kind() == std::io::ErrorKind::WouldBlock => {
                    thread::sleep(std::time::Duration::from_millis(10));
                }
                Err(_) => break,
            }
        }
    });

    (url, shutdown)
}

struct CaseDiff {
    case: String,
    false_negatives: Vec<String>,
    false_positives: Vec<String>,
}

#[tokio::test]
#[ignore = "needs real Chrome; run manually with `cargo test -- --ignored`"]
async fn vulnerable_libs_detection_corpus_matches_real_analyzer_run() {
    let corpus_dir = nonwcag_detection_corpus_dir("vulnerable_libs");
    let cases = load_corpus_dir(&corpus_dir);
    let deferred = load_structurally_deferred(&corpus_dir);
    let deferred_ids: std::collections::BTreeSet<String> =
        deferred.iter().map(|d| d.rule_id.clone()).collect();
    assert!(
        !cases.is_empty(),
        "vulnerable_libs detection corpus is empty — nothing to verify"
    );

    let manager = ci_browser().await;
    let mut diffs: Vec<CaseDiff> = Vec::new();

    for case in &cases {
        let html_path = corpus_dir.join(format!("{}.html", case.case));
        let html = std::fs::read_to_string(&html_path).unwrap_or_else(|e| {
            panic!(
                "cannot read fixture HTML {} for case '{}': {e}",
                html_path.display(),
                case.case
            )
        });

        let (url, shutdown) = serve_html(html);
        let page = manager.new_page().await.expect("new page failed");
        manager
            .navigate(&page, &url)
            .await
            .expect("navigation failed");

        let analysis = analyze_vulnerable_libraries(&page)
            .await
            .unwrap_or_else(|e| {
                panic!(
                    "analyze_vulnerable_libraries failed for case '{}': {e}",
                    case.case
                )
            });

        shutdown.store(true, Ordering::Relaxed);

        let mut false_negatives = Vec::new();
        let mut false_positives = Vec::new();

        for exp in &case.expectations {
            assert!(
                !deferred_ids.contains(&exp.rule_id),
                "case '{}' asserts on '{}', which is also marked structurally_deferred — pick one",
                case.case,
                exp.rule_id
            );
            let detected = analysis.detected.iter().any(|lib| lib.name == exp.rule_id);
            let flagged_vulnerable = analysis
                .vulnerable
                .iter()
                .any(|lib| lib.name == exp.rule_id);

            match exp.verdict {
                Verdict::Violation => {
                    if !flagged_vulnerable {
                        false_negatives
                            .push(format!("{}: expected violation, found none", exp.rule_id));
                    }
                }
                Verdict::Pass => {
                    if flagged_vulnerable {
                        false_positives
                            .push(format!("{}: expected pass, found violation", exp.rule_id));
                    } else if !detected {
                        // A "pass" case only means something if the library
                        // was actually detected in the first place — an
                        // undetected library trivially "passes" but proves
                        // nothing about the version-check logic.
                        false_negatives.push(format!(
                            "{}: expected pass (library detected, not vulnerable), but the \
                             library wasn't detected at all",
                            exp.rule_id
                        ));
                    }
                }
                Verdict::NeedsReview => {
                    false_negatives.push(format!(
                        "{}: needs_review is not a verdict this module produces",
                        exp.rule_id
                    ));
                }
            }
        }

        if !false_negatives.is_empty() || !false_positives.is_empty() {
            diffs.push(CaseDiff {
                case: case.case.clone(),
                false_negatives,
                false_positives,
            });
        }
    }

    if !diffs.is_empty() {
        let mut msg = String::from("Vulnerable-libs detection corpus accuracy mismatches:\n");
        for diff in &diffs {
            msg.push_str(&format!("  case '{}':\n", diff.case));
            for fneg in &diff.false_negatives {
                msg.push_str(&format!("    FALSE NEGATIVE: {fneg}\n"));
            }
            for fpos in &diff.false_positives {
                msg.push_str(&format!("    FALSE POSITIVE: {fpos}\n"));
            }
        }
        panic!("{msg}");
    }
}
