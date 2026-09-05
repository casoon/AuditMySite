//! Build-time git short-SHA capture.
//!
//! Emits `AUDITMYSITE_BUILD_SHA` for compile-time embedding via `env!(...)`.
//! Falls back to `"unknown"` when `git`/`.git` isn't available (e.g. a
//! `cargo install` from a crates.io tarball, which has no `.git` directory).

use std::fs;
use std::process::Command;

fn main() {
    let sha = Command::new("git")
        .args(["rev-parse", "--short", "HEAD"])
        .output()
        .ok()
        .filter(|output| output.status.success())
        .and_then(|output| String::from_utf8(output.stdout).ok())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| "unknown".to_string());

    println!("cargo:rustc-env=AUDITMYSITE_BUILD_SHA={sha}");

    // Re-run when HEAD moves (commit or branch switch) or the branch's own
    // ref file moves (commit on the currently checked-out branch).
    println!("cargo:rerun-if-changed=.git/HEAD");
    if let Ok(head) = fs::read_to_string(".git/HEAD") {
        if let Some(ref_path) = head.trim().strip_prefix("ref: ") {
            println!("cargo:rerun-if-changed=.git/{ref_path}");
        }
    }
}
