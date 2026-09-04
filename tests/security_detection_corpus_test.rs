//! Diff-based accuracy test: security-header detection corpus against a real
//! `analyze_security` run (#558, mirrors #555's WCAG-corpus accuracy test).
//!
//! Unlike the WCAG corpus, this doesn't need Chrome/CDP at all —
//! `analyze_security(url)` is a standalone async fn that does its own HTTP
//! fetch (`reqwest`), so this test runs as a normal `cargo test` (no
//! `#[ignore]` gate, no browser dependency). It serves each case's
//! `response_headers` from a local plain-HTTP listener and diffs the real
//! `SecurityAnalysis.issues` output against `<case>.expected.json`.

mod common;

use std::collections::BTreeMap;
use std::io::{Read, Write};
use std::net::TcpListener;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;

use auditmysite::analyze_security;
use common::detection_corpus::{
    load_corpus_dir, load_structurally_deferred, nonwcag_detection_corpus_dir, Verdict,
};

/// Serves a fixed HTML body with the given extra response headers on a
/// random localhost port, for every request regardless of method/path —
/// same simplistic single-response shape as `tests/integration_test.rs`'s
/// `serve_fixture`, extended with a header map. Always plain HTTP: this
/// corpus deliberately defers the one HSTS check gated behind an actual
/// HTTPS scheme (see `structurally_deferred.json`).
fn serve_with_headers(headers: BTreeMap<String, String>) -> (String, Arc<AtomicBool>) {
    let listener = TcpListener::bind("127.0.0.1:0").expect("failed to bind");
    let port = listener.local_addr().unwrap().port();
    let url = format!("http://127.0.0.1:{port}");

    let shutdown = Arc::new(AtomicBool::new(false));
    let shutdown_clone = shutdown.clone();

    thread::spawn(move || {
        listener
            .set_nonblocking(true)
            .expect("cannot set non-blocking");
        let body = "<html><body>security corpus fixture</body></html>";
        let mut header_lines = String::new();
        for (k, v) in &headers {
            header_lines.push_str(&format!("{k}: {v}\r\n"));
        }
        loop {
            if shutdown_clone.load(Ordering::Relaxed) {
                break;
            }
            match listener.accept() {
                Ok((mut stream, _)) => {
                    let mut buf = [0u8; 1024];
                    let _ = stream.read(&mut buf);
                    let response = format!(
                        "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\n{}\r\n{}",
                        body.len(),
                        header_lines,
                        body
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
async fn security_detection_corpus_matches_real_analyze_security_run() {
    let corpus_dir = nonwcag_detection_corpus_dir("security");
    let cases = load_corpus_dir(&corpus_dir);
    let deferred = load_structurally_deferred(&corpus_dir);
    let deferred_ids: std::collections::BTreeSet<String> =
        deferred.iter().map(|d| d.rule_id.clone()).collect();
    assert!(
        !cases.is_empty(),
        "security detection corpus is empty — nothing to verify (expected at least the seed cases)"
    );

    let mut diffs: Vec<CaseDiff> = Vec::new();

    for case in &cases {
        let (url, shutdown) = serve_with_headers(case.response_headers.clone());

        let analysis = analyze_security(&url)
            .await
            .unwrap_or_else(|e| panic!("analyze_security failed for case '{}': {e}", case.case));

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
            let found = analysis
                .issues
                .iter()
                .any(|issue| format!("{}:{}", issue.header, issue.issue_type) == exp.rule_id);

            match exp.verdict {
                Verdict::Violation => {
                    if !found {
                        false_negatives
                            .push(format!("{}: expected violation, found none", exp.rule_id));
                    }
                }
                Verdict::Pass => {
                    if found {
                        false_positives
                            .push(format!("{}: expected pass, found violation", exp.rule_id));
                    }
                }
                Verdict::NeedsReview => {
                    // Security-header issues are always a clean violation/pass
                    // binary in this module today (no manual-review bucket
                    // equivalent to WCAG's NotTestable) — not expected to be
                    // used by this corpus, but handled the same as
                    // "should be present" rather than silently ignored.
                    if !found {
                        false_negatives.push(format!(
                            "{}: expected needs_review, found nothing",
                            exp.rule_id
                        ));
                    }
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
        let mut msg = String::from("Security detection corpus accuracy mismatches:\n");
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
