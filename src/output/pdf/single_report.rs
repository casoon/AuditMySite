//! Single-report page-section renderers for `generate_pdf`.
//!
//! Each function takes ownership of the builder, appends its section's
//! components, and returns the builder for further chaining.

use renderreport::components::advanced::{
    ChecklistPanel, ChecklistRow, DevicePreview, DiagnosisPanel, DiagnosisRow, List, MetricStrip,
    MetricStripItem, PageBreak, RecommendationCard, SectionHeaderSplit,
};
use renderreport::components::charts::{Chart, ChartType};
use renderreport::components::text::Label;
use renderreport::components::{AuditTable, CardDashboard, DashboardCard, Finding, TableColumn};
use renderreport::prelude::*;

use super::design;

use super::appendix::build_cli_snapshot_table;
use super::detail_modules::{
    render_a11y_journey_findings, render_ai_transparency, render_ai_visibility,
    render_best_practices, render_budget_violations, render_content_visibility, render_dark_mode,
    render_design_quality, render_html_conform, render_journey, render_mobile, render_network_dns,
    render_performance, render_screen_reader_section, render_search_experience, render_security,
    render_seo, render_source_quality, render_tech_stack, render_ux,
};
use super::diagnosis::render_diagnosis_section;
use super::en301549::render_en301549_annex;
use super::findings::render_finding_technical;
use super::helpers::{map_severity, priority_label_i18n, role_label_i18n};
use super::wcag_coverage::render_wcag_coverage_section;
use crate::audit::AuditReport;
use crate::cli::{AnnexKind, ReportLevel};
use crate::i18n::I18n;
use crate::output::module::active_report_modules;
use crate::output::report_model::*;

/// Render a part divider — visually separates the three report parts (#246).
///
/// Each divider produces a page break, a strong level=1 section header tagged
/// with "TEIL N / 3" (or "PART N OF 3"), an audience callout, and a contents list.
pub(super) fn render_part_divider(
    mut builder: renderreport::engine::ReportBuilder,
    part_num: u8,
    title: &str,
    intro: &str,
    audience_title: &str,
    audience_body: &str,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    let eyebrow = if en {
        format!("PART {} OF 3", part_num)
    } else {
        format!("TEIL {} VON 3", part_num)
    };
    if part_num > 1 {
        builder = builder.add_component(PageBreak::new());
    }
    builder = builder
        // Large chapter number — magazine-style opener.
        .add_component(
            Label::new(format!("{:02}", part_num))
                .with_size("72pt")
                .bold()
                .with_color(design::tokens::MUTED),
        )
        .add_component(
            SectionHeaderSplit::new(title, intro)
                .with_eyebrow(eyebrow)
                .with_level(1),
        )
        .add_component(
            Label::new(format!("{}: {}", audience_title, audience_body))
                .with_size("10.5pt")
                .with_color(design::tokens::NEUTRAL),
        );
    builder
}

/// Scannable severity counter row for the executive dashboard — total findings
/// plus a critical/high/medium breakdown. Zero counts read as "all clear"
/// (green), non-zero counts carry their severity hue.
fn build_severity_counter_strip(vm: &ReportViewModel, i18n: &I18n) -> MetricStrip {
    let en = i18n.locale() == "en";
    let count_accent = |n: u32, hue: &'static str| {
        if n > 0 {
            hue
        } else {
            design::tokens::SUCCESS
        }
    };
    let items = vec![
        MetricStripItem::new(
            if en {
                "WCAG occurrences"
            } else {
                "WCAG-Vorkommen"
            },
            vm.severity.total.to_string(),
        )
        .with_accent(design::tokens::INK),
        MetricStripItem::new(
            if en { "Critical" } else { "Kritisch" },
            vm.severity.critical.to_string(),
        )
        .with_accent(count_accent(vm.severity.critical, design::tokens::DANGER)),
        MetricStripItem::new(
            if en { "High" } else { "Hoch" },
            vm.severity.high.to_string(),
        )
        .with_accent(count_accent(vm.severity.high, design::tokens::DANGER)),
        MetricStripItem::new(
            if en { "Medium" } else { "Mittel" },
            vm.severity.medium.to_string(),
        )
        .with_accent(count_accent(vm.severity.medium, design::tokens::WARN_DEEP)),
    ];
    MetricStrip::new(items).compact()
}

/// Build a dashboard card for one module, aligned with the report's grade bands
/// (good ≥ 75, watch 40–74, problem < 40). Carries the same non-normative
/// name-suffix qualifier as the cover gauges and the technical modules
/// overview for Heuristic/Optional-tier modules (#577).
fn module_dashboard_card(module: &ModuleScore, i18n: &I18n) -> DashboardCard {
    DashboardCard {
        name: super::helpers::module_name_with_taxonomy_suffix(
            &module.name,
            &module.measurement_type,
            i18n,
        ),
        score: module.score,
        interpretation: if module.interpretation.is_empty() {
            format!("{}/100", module.score)
        } else {
            module.interpretation.clone()
        },
        good_threshold: 75,
        warn_threshold: 40,
    }
}

/// "What works well" vs "Where optimization pays off" — splits the module
/// scores into two card groups so an unbriefed reader sees strengths and
/// priorities at a glance.
fn render_module_split_dashboards(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    let strong: Vec<DashboardCard> = vm
        .modules
        .dashboard
        .iter()
        .filter(|m| m.score >= 75)
        .map(|m| module_dashboard_card(m, i18n))
        .collect();
    let weak: Vec<DashboardCard> = vm
        .modules
        .dashboard
        .iter()
        .filter(|m| m.score < 75)
        .map(|m| module_dashboard_card(m, i18n))
        .collect();

    if !strong.is_empty() {
        builder = builder.add_component(CardDashboard::new(strong).with_title(if en {
            "What works particularly well"
        } else {
            "Was besonders gut funktioniert"
        }));
    }
    if !weak.is_empty() {
        builder = builder.add_component(CardDashboard::new(weak).with_title(if en {
            "Where optimization pays off"
        } else {
            "Wo sich Optimierung lohnt"
        }));
    } else if !vm.modules.dashboard.is_empty() {
        builder = builder.add_component(
            Label::new(if en {
                "All audited modules are in good shape — no module needs prioritized optimization."
            } else {
                "Alle geprüften Module sind in gutem Zustand — kein Modul erfordert vorrangige Optimierung."
            })
            .with_size("10.5pt")
            .with_color(design::tokens::SUCCESS),
        );
    }
    builder
}

/// One of the five fixed report dimensions (Usability / Legal / Business /
/// SEO / Performance), evaluated to a status ("bad"/"warn"/"good") and a
/// localized description. Pure data — no rendering, no `ReportViewModel`
/// dependency — so the bucketing logic below is directly unit-testable.
struct DimensionRow {
    label: String,
    description: String,
    status: &'static str,
}

/// Evaluates the five fixed dimensions against their thresholds. Same
/// thresholds/wording as before #576 — only the presentation (which bucket
/// each row lands in, how 0..5 rows render) changed, not the scoring model.
#[allow(clippy::too_many_arguments)]
fn compute_dimension_rows(
    severity_critical: u32,
    severity_high: u32,
    cover_critical_issues: u32,
    summary_score: u32,
    seo_score: u32,
    perf_score: u32,
    mobile_score: u32,
    en: bool,
) -> Vec<DimensionRow> {
    let mut rows = Vec::with_capacity(5);

    // 1. Usability / Nutzbarkeit
    let user_desc = if severity_critical > 0 || severity_high > 0 {
        if en {
            "Screen reader and keyboard navigation blocked at critical points."
        } else {
            "Screenreader und Tastaturnavigation an kritischen Stellen blockiert oder beeinträchtigt."
        }
    } else {
        if en {
            "No major usability limitations detected."
        } else {
            "Keine wesentlichen Einschränkungen der Nutzbarkeit erkannt."
        }
    };
    // Status now completes the tier the description text already implies
    // ("no major limitations" is a positive result, not a warning) — the
    // numeric thresholds (critical/high counts) are unchanged (#576).
    let user_status = if severity_critical > 0 {
        "bad"
    } else if severity_high > 0 {
        "warn"
    } else {
        "good"
    };
    rows.push(DimensionRow {
        label: if en { "Usability" } else { "Nutzbarkeit" }.to_string(),
        description: user_desc.to_string(),
        status: user_status,
    });

    // 2. Compliance / Rechtliches
    let legal_desc = if cover_critical_issues > 0 {
        if en {
            "BFSG-relevant violations found (WCAG Level A/AA) — resolution recommended."
        } else {
            "BFSG-relevante Verstöße (WCAG Level A/AA) gefunden — Behebung empfohlen."
        }
    } else {
        if en {
            "Low compliance risk."
        } else {
            "Geringes Compliance-Risiko."
        }
    };
    // Two-tier text ("violations found" vs. "low risk") now maps to two
    // statuses instead of collapsing "low risk" into "warn" (#576).
    let legal_status = if cover_critical_issues > 0 {
        "bad"
    } else {
        "good"
    };
    rows.push(DimensionRow {
        label: if en {
            "Legal Conformance"
        } else {
            "Rechtliche Konformität (BFSG)"
        }
        .to_string(),
        description: legal_desc.to_string(),
        status: legal_status,
    });

    // 3. Conversion / Business-Risiko
    let business_desc = if summary_score < 60 {
        if en {
            "High risk of process abandonment and conversion loss."
        } else {
            "Hohes Risiko von Prozessabbrüchen und Conversion-Verlusten."
        }
    } else if summary_score < 80 {
        if en {
            "Usability hurdles may reduce conversion rate."
        } else {
            "Nutzungshürden können Conversion-Rate reduzieren."
        }
    } else {
        if en {
            "Low business risk, minor optimizations recommended."
        } else {
            "Geringes geschäftliches Risiko, kleine Optimierungen empfohlen."
        }
    };
    // Three-tier text (high risk / hurdles / low risk) now maps to three
    // statuses instead of collapsing "low risk, minor optimizations" into
    // "warn" (#576).
    let business_status = if summary_score < 60 {
        "bad"
    } else if summary_score < 80 {
        "warn"
    } else {
        "good"
    };
    rows.push(DimensionRow {
        label: if en {
            "Conversion & Business Risk"
        } else {
            "Conversion & Business-Risiko"
        }
        .to_string(),
        description: business_desc.to_string(),
        status: business_status,
    });

    // 4. SEO & AI Visibility
    let seo_desc = if seo_score < 70 {
        if en {
            "Missing metadata or structured schemas reduce search engine and AI crawlability."
        } else {
            "Fehlende Metadaten oder strukturierte Daten behindern Google- und KI-Crawler."
        }
    } else if seo_score < 90 {
        if en {
            "Some optimization potential for search engines and AI agents."
        } else {
            "Optimierungspotenzial für Suchmaschinen und KI-Agenten vorhanden."
        }
    } else {
        if en {
            "Excellent discoverability and schema definition."
        } else {
            "Sehr gute Auffindbarkeit und strukturierte Schema-Daten."
        }
    };
    let seo_status = if seo_score < 70 {
        "bad"
    } else if seo_score < 90 {
        "warn"
    } else {
        "good"
    };
    rows.push(DimensionRow {
        label: if en {
            "SEO & AI Visibility"
        } else {
            "SEO & KI-Sichtbarkeit"
        }
        .to_string(),
        description: seo_desc.to_string(),
        status: seo_status,
    });

    // 5. Loading & Mobile experience
    let speed_desc = if perf_score < 60 || mobile_score < 60 {
        if en {
            "High loading latency or touch target layout issues frustrate mobile visitors."
        } else {
            "Hohe Ladezeiten oder Touch-Target-Mängel frustrieren mobile Besucher."
        }
    } else if perf_score < 85 || mobile_score < 85 {
        if en {
            "Moderate performance bottlenecks on mobile networks."
        } else {
            "Mäßige Performance-Verzögerungen im Mobilfunknetz."
        }
    } else {
        if en {
            "Fast load speed and optimal responsive viewport."
        } else {
            "Schnelle Ladezeit und optimale responsive Darstellung."
        }
    };
    let speed_status = if perf_score < 60 || mobile_score < 60 {
        "bad"
    } else if perf_score < 85 || mobile_score < 85 {
        "warn"
    } else {
        "good"
    };
    rows.push(DimensionRow {
        label: if en {
            "Performance & Mobile"
        } else {
            "Ladezeit & Mobilfreundlichkeit"
        }
        .to_string(),
        description: speed_desc.to_string(),
        status: speed_status,
    });

    rows
}

/// Renders the risks block (only "bad"/"warn" dimensions, 0..5 rows,
/// zero-risk empty state when all dimensions are "good") and, directly
/// below it, a separate strengths block for the "good" dimensions (#576).
/// Replaces the previous `build_top_risks_checklist`, which unconditionally
/// rendered all 5 dimensions — including positive ones — under a fixed
/// "Die 5 wichtigsten Risiken" title.
pub(super) fn render_risks_and_strengths(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";

    let seo_score = vm
        .modules
        .dashboard
        .iter()
        .find(|m| m.name.contains("SEO"))
        .map(|m| m.score)
        .unwrap_or(100);
    let perf_score = vm
        .modules
        .dashboard
        .iter()
        .find(|m| m.name.contains("Performance") || m.name.contains("Ladezeit"))
        .map(|m| m.score)
        .unwrap_or(100);
    let mobile_score = vm
        .modules
        .dashboard
        .iter()
        .find(|m| m.name.contains("Mobile") || m.name.contains("Mobilfreundlichkeit"))
        .map(|m| m.score)
        .unwrap_or(100);

    let dimensions = compute_dimension_rows(
        vm.severity.critical,
        vm.severity.high,
        vm.cover.critical_issues,
        vm.summary.score,
        seo_score,
        perf_score,
        mobile_score,
        en,
    );

    let (mut risks, strengths): (Vec<DimensionRow>, Vec<DimensionRow>) =
        dimensions.into_iter().partition(|d| d.status != "good");
    // Within the risks block, "bad" outranks "warn" — a low-effort ordering
    // improvement by user impact without redesigning the dimension model.
    // `sort_by_key` is stable, so relative dimension order within each group
    // is preserved.
    risks.sort_by_key(|d| if d.status == "bad" { 0u8 } else { 1u8 });

    if risks.is_empty() {
        // Zero-risk empty state (#576) — reuses the same automated-scope
        // caveat mechanism/wording as the clean-run verdict callout (#572)
        // instead of inventing new phrasing.
        let (automated, total) = crate::wcag::coverage::coverage_stats();
        let empty_state = if en {
            format!(
                "No priority risks identified within the automated audit scope. This result applies to the automated audit scope only ({automated} of about {total} testable WCAG 2.1 AA criteria); criteria requiring manual review are listed in the appendix."
            )
        } else {
            format!(
                "Keine prioritären Risiken im automatisierten Prüfumfang erkannt. Diese Einschätzung bezieht sich ausschließlich auf den automatisierten Prüfumfang ({automated} von ca. {total} testbaren WCAG-2.1-AA-Kriterien); Kriterien mit manuellem Prüfbedarf sind im Anhang aufgeführt."
            )
        };
        builder = builder.add_component(Callout::success(&empty_state).with_title(if en {
            "Key Risks"
        } else {
            "Wichtigste Risiken"
        }));
    } else {
        let title = if en {
            format!("Key Risks ({} identified)", risks.len())
        } else {
            format!("Wichtigste Risiken ({} erkannt)", risks.len())
        };
        let rows: Vec<ChecklistRow> = risks
            .into_iter()
            .map(|d| ChecklistRow::new(d.label, d.description).with_status(d.status))
            .collect();
        builder = builder.add_component(ChecklistPanel::new(rows).with_title(title));
    }

    if !strengths.is_empty() {
        let rows: Vec<ChecklistRow> = strengths
            .into_iter()
            .map(|d| ChecklistRow::new(d.label, d.description).with_status("good"))
            .collect();
        builder = builder.add_component(ChecklistPanel::new(rows).with_title(if en {
            "Strengths within the audited scope"
        } else {
            "Stärken im geprüften Umfang"
        }));
    }

    builder
}

pub(super) fn build_top_measures_list(vm: &ReportViewModel, i18n: &I18n) -> List {
    let en = i18n.locale() == "en";
    let list_title = if en {
        "5 Key Measures"
    } else {
        "Die 5 wichtigsten Maßnahmen"
    };
    let mut list = List::new().with_title(list_title);

    for (idx, group) in vm.findings.top_findings.iter().take(5).enumerate() {
        let text = format!("{}. {}: {}", idx + 1, group.title, group.recommendation);
        list = list.add_item(&text);
    }

    if vm.findings.top_findings.is_empty() {
        let no_measures = if en {
            "No urgent actions required."
        } else {
            "Keine dringenden Maßnahmen erforderlich."
        };
        list = list.add_item(no_measures);
    }

    list
}

pub(super) fn render_management_page(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    let mgt_title = if en {
        "Management Summary"
    } else {
        "Management-Sicht"
    };
    let mgt_subtitle = if en {
        "Overall status, key risks, prioritized actions, and leverage at a glance."
    } else {
        "Gesamtstatus, Hauptrisiken, wichtigste Maßnahmen und Hebel auf einen Blick."
    };

    builder = builder.add_component(
        SectionHeaderSplit::new(mgt_title, mgt_subtitle)
            .with_eyebrow(if en {
                "MANAGEMENT SUMMARY"
            } else {
                "MANAGEMENT-SUMMARY"
            })
            .with_level(1),
    );

    // Scope line (#575): this report only ever covers exactly one audited
    // URL, checked with both desktop and mobile viewports (the pipeline
    // always runs both — see `pipeline.rs`'s unconditional dual-viewport
    // pass), and never crawls the rest of the site. Stated explicitly and
    // prominently up front so findings/recommendations phrased around
    // "the audited page" further down aren't misread as domain-wide claims.
    let scope_line = if en {
        "Audited: 1 URL · Desktop and Mobile · no website crawl".to_string()
    } else {
        "Geprüft: 1 URL · Desktop und Mobile · kein Website-Crawl".to_string()
    };
    builder = builder.add_component(
        Label::new(scope_line)
            .with_size("10.5pt")
            .bold()
            .with_color(design::tokens::NEUTRAL),
    );

    // 1. Scannable severity counters — the 20-second top line
    builder = builder.add_component(build_severity_counter_strip(vm, i18n));
    // Short definition right at first use, so a reader doesn't have to reach
    // the methodology appendix to learn "Vorkommen" ≠ "distinct rule" — the
    // full breakdown (finding groups vs. occurrences, all categories) still
    // lives only in the appendix, this is just the one-line pointer (#572).
    builder = builder.add_component(
        Label::new(if en {
            "Occurrences = individual affected elements, not the number of distinct rules — see the appendix for the full breakdown."
        } else {
            "Vorkommen = einzelne betroffene Elemente, nicht die Anzahl unterschiedlicher Regeln — vollständige Aufschlüsselung im Anhang."
        })
        .with_size("8.5pt")
        .with_color(design::tokens::MUTED),
    );

    // 2. Overall verdict (the single core sentence)
    builder = builder.add_component(Callout::info(&vm.summary.verdict).with_title(if en {
        "Overall Verdict"
    } else {
        "Gesamturteil"
    }));
    // For a clean automated run (no findings), state the automated-scope
    // caveat directly alongside the headline verdict — not only in the
    // appendix — so "0 findings" doesn't read as a full WCAG conformance
    // claim (#572).
    if !vm.severity.has_issues {
        let (automated, total) = crate::wcag::coverage::coverage_stats();
        builder = builder.add_component(
            Label::new(if en {
                format!(
                    "This result applies to the automated audit scope only ({automated} of ~{total} testable WCAG 2.1 AA criteria); criteria requiring manual review are listed in the appendix."
                )
            } else {
                format!(
                    "Diese Einschätzung bezieht sich ausschließlich auf den automatisierten Prüfumfang ({automated} von ca. {total} testbaren WCAG-2.1-AA-Kriterien); Kriterien mit manuellem Prüfbedarf sind im Anhang aufgeführt."
                )
            })
            .with_size("9pt")
            .with_color(design::tokens::MUTED),
        );
    }

    // 2b. Quality profile radar — balance across all dimensions at a glance.
    let radar_data: Vec<(String, f64)> = vm
        .modules
        .dashboard
        .iter()
        .map(|m| {
            let short = m
                .name
                .split([' ', '&'])
                .next()
                .unwrap_or(m.name.as_str())
                .trim()
                .to_string();
            (short, m.score as f64)
        })
        .collect();
    if radar_data.len() >= 3 {
        builder = builder.add_component(
            Chart::new(
                if en {
                    "Quality profile"
                } else {
                    "Qualitätsprofil"
                },
                ChartType::Radar,
            )
            .add_series("scores", radar_data),
        );
    }

    // 3. Strengths vs. priorities as card groups
    builder = render_module_split_dashboards(builder, vm, i18n);

    // 4. Risks & strengths
    builder = render_risks_and_strengths(builder, vm, i18n);

    // 5. Measures
    builder = builder.add_component(build_top_measures_list(vm, i18n));

    builder
}

/// Sections 5b + 6+ — diagnosis, findings by severity tier, module metrics, appendix.
pub(super) fn render_tech_details(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    report: &AuditReport,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";

    // Technical modules overview DiagnosisPanel
    if !vm.modules.dashboard.is_empty() {
        let diag_rows: Vec<DiagnosisRow> = vm
            .modules
            .dashboard
            .iter()
            .map(|module| {
                let status = if module.score >= 80 {
                    "good"
                } else if module.score >= 50 {
                    "warn"
                } else {
                    "bad"
                };
                let display_name = super::helpers::module_name_with_taxonomy_suffix(
                    &module.name,
                    &module.measurement_type,
                    i18n,
                );
                DiagnosisRow::new(&display_name, format!("{}/100", module.score))
                    .with_status(status)
            })
            .collect();
        builder = builder.add_component(
            DiagnosisPanel::new(diag_rows).with_title(i18n.t("panel-modules-overview")),
        );
    }

    if vm.severity.has_issues {
        builder = render_diagnosis_section(builder, &vm.diagnosis, i18n);
    }
    // Element-evidence crop temp files are named `ams-evidence-{ts}-{n}.png`,
    // keyed off the report timestamp (matches `cleanup_screenshot_temps`'s
    // desktop/mobile naming) plus a per-report sequence number.
    let report_ts = report.timestamp.timestamp_nanos_opt().unwrap_or(0);
    let mut evidence_seq: usize = 0;
    let mut acronyms_expanded = false;
    builder = render_findings_section(
        builder,
        vm,
        en,
        i18n,
        report_ts,
        &mut evidence_seq,
        &mut acronyms_expanded,
    );

    // Interactive Accessibility-Journey findings (Phase 2+)
    if !report.interactive_findings.is_empty() {
        builder = render_a11y_journey_findings(
            builder,
            &report.interactive_findings,
            report.accessibility_journey.as_ref(),
            i18n,
        );
    }

    // Screen-reader reading-order audit (#411)
    if let Some(sr) = report.screen_reader_audit.as_ref() {
        builder = render_screen_reader_section(builder, sr, report.patterns.as_ref(), i18n);
    }

    builder
}

pub(super) fn render_appendix_full(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    report: &AuditReport,
    findings: &[crate::audit::normalized::NormalizedFinding],
    config: &ReportConfig,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    let (app_title, app_intro) = if en {
        (
            "Appendix & Methodology",
            "Technical scope, methodology, WCAG coverage, and the complete violations list.",
        )
    } else {
        (
            "Anhang & Methodik",
            "Prüfumfang, Methodik, WCAG-Coverage und die vollständige Fundstellenliste.",
        )
    };
    builder = builder.add_component(PageBreak::new()).add_component(
        SectionHeaderSplit::new(app_title, app_intro)
            .with_eyebrow(if en { "APPENDIX" } else { "ANHANG" })
            .with_level(1),
    );

    // WCAG Coverage (issue #37)
    if vm.meta.report_level != ReportLevel::Executive {
        builder = render_wcag_coverage_section(builder, report, i18n);

        // EN 301 549 clause annex — opt-in only (see `--annex en301549`).
        if config.annex == Some(AnnexKind::En301549) {
            builder = render_en301549_annex(
                builder,
                findings,
                &report.accessibility.wcag_results.rule_outcomes,
                i18n,
            );
        }
    }

    builder = render_assessment_and_execution_notes(builder, report, i18n);

    // Methodology / disclaimer text blocks
    let limitations_title = i18n.t("callout-limitations-title");
    let limitations_text = format!("{}: {}", limitations_title, vm.methodology.limitations);
    builder = builder.add_component(
        Label::new(&limitations_text)
            .with_size("10.5pt")
            .with_color("#475569"),
    );

    let disclaimer_title = i18n.t("callout-note-title");
    let disclaimer_text = format!("{}: {}", disclaimer_title, vm.methodology.disclaimer);
    builder = builder.add_component(
        Label::new(&disclaimer_text)
            .with_size("10.5pt")
            .with_color("#475569"),
    );

    // Complete violations list
    builder = render_appendix_section(builder, vm, i18n);

    builder
}

fn render_assessment_and_execution_notes(
    mut builder: renderreport::engine::ReportBuilder,
    report: &AuditReport,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    let wcag = &report.accessibility.wcag_results;
    if !wcag.warnings.is_empty() || !wcag.not_testables.is_empty() {
        let mut rows = Vec::new();
        for finding in wcag.not_testables.iter().take(20) {
            let recommendation = crate::output::explanations::get_explanation(
                finding.rule_id.as_deref().unwrap_or(&finding.rule),
            )
            .map(|explanation| explanation.recommendation_for(i18n.locale()).to_string())
            .or_else(|| finding.fix_suggestion.clone())
            .unwrap_or_else(|| {
                if en {
                    "Verify this criterion manually on the rendered page.".to_string()
                } else {
                    "Dieses Kriterium manuell an der gerenderten Seite prüfen.".to_string()
                }
            });
            rows.push(
                ChecklistRow::new(
                    format!(
                        "{} · {}",
                        finding.rule,
                        if en {
                            "Manual review"
                        } else {
                            "Manuelle Prüfung"
                        }
                    ),
                    recommendation,
                )
                .with_status("warn"),
            );
        }
        for finding in wcag
            .warnings
            .iter()
            .take(20usize.saturating_sub(rows.len()))
        {
            let text = finding.fix_suggestion.clone().unwrap_or_else(|| {
                if en {
                    "Confirm this heuristic signal manually.".to_string()
                } else {
                    "Dieses heuristische Signal manuell bestätigen.".to_string()
                }
            });
            rows.push(
                ChecklistRow::new(
                    format!(
                        "{} · {}",
                        finding.rule,
                        if en { "Warning" } else { "Hinweis" }
                    ),
                    text,
                )
                .with_status("warn"),
            );
        }
        builder = builder.add_component(ChecklistPanel::new(rows).with_title(if en {
            "Manual review and heuristic signals"
        } else {
            "Manuelle Prüfpunkte und heuristische Hinweise"
        }));
    }

    if let Some(journey) = report.accessibility_journey.as_ref() {
        let execution = &journey.execution;
        let text = if en {
            format!(
                "Interactive coverage: {} of {} attempted journeys completed; {} failed, {} skipped{}.",
                execution.completed,
                execution.attempted,
                execution.failed,
                execution.skipped,
                if execution.budget_exhausted { "; budget exhausted" } else { "" }
            )
        } else {
            format!(
                "Interaktive Abdeckung: {} von {} versuchten Journeys abgeschlossen; {} fehlgeschlagen, {} übersprungen{}.",
                execution.completed,
                execution.attempted,
                execution.failed,
                execution.skipped,
                if execution.budget_exhausted { "; Budget ausgeschöpft" } else { "" }
            )
        };
        builder = builder.add_component(Label::new(text).with_size("10.5pt").with_color("#475569"));
    }

    builder
}

fn render_findings_section(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    en: bool,
    i18n: &I18n,
    report_ts: i64,
    evidence_seq: &mut usize,
    acronyms_expanded: &mut bool,
) -> renderreport::engine::ReportBuilder {
    if vm.severity.has_issues {
        let (findings_title, findings_intro) = if en {
            (
                "Classification of Findings",
                "All technical findings, categorized by systemic template relevance and individual page occurrences.",
            )
        } else {
            (
                "Klassifizierung der Befunde",
                "Alle technischen Befunde, getrennt nach systemischen Komponentenfehlern und Einzelfällen.",
            )
        };
        builder = builder.add_component(PageBreak::new()).add_component(
            SectionHeaderSplit::new(findings_title, findings_intro)
                .with_eyebrow(if en { "FINDINGS" } else { "BEFUNDE" })
                .with_level(2),
        );

        let all_findings = &vm.findings.all_findings;

        let systemic_mandatory: Vec<&FindingGroup> = all_findings
            .iter()
            .filter(|f| f.is_component_issue && f.criticality_tier == CriticalityTier::Mandatory)
            .collect();

        let systemic_optimization: Vec<&FindingGroup> = all_findings
            .iter()
            .filter(|f| f.is_component_issue && f.criticality_tier == CriticalityTier::Optimization)
            .collect();

        let local_mandatory: Vec<&FindingGroup> = all_findings
            .iter()
            .filter(|f| !f.is_component_issue && f.criticality_tier == CriticalityTier::Mandatory)
            .collect();

        let local_optimization: Vec<&FindingGroup> = all_findings
            .iter()
            .filter(|f| {
                !f.is_component_issue && f.criticality_tier == CriticalityTier::Optimization
            })
            .collect();

        // Overview row so the classification header carries substance instead of
        // sitting alone on an otherwise blank page. One tile per rendered
        // category below (rather than two combined totals) so each number
        // maps 1:1 to the heading it belongs to — a combined "Einzelfälle"
        // total previously hid the fact that its optimization share is
        // rendered chapters later under a differently-named heading (#local
        // vs. #systemic classification page).
        builder = builder.add_component(
            MetricStrip::new(vec![
                MetricStripItem::new(
                    if en {
                        "Systemic (mandatory)"
                    } else {
                        "Systemisch (Pflicht)"
                    },
                    systemic_mandatory.len().to_string(),
                )
                .with_accent(if !systemic_mandatory.is_empty() {
                    design::tokens::INFO
                } else {
                    design::tokens::SUCCESS
                }),
                MetricStripItem::new(
                    if en {
                        "Systemic (optimization)"
                    } else {
                        "Systemisch (Optimierung)"
                    },
                    systemic_optimization.len().to_string(),
                )
                .with_accent(design::tokens::NEUTRAL),
                MetricStripItem::new(
                    if en {
                        "Local (mandatory)"
                    } else {
                        "Lokal (Pflicht)"
                    },
                    local_mandatory.len().to_string(),
                )
                .with_accent(if !local_mandatory.is_empty() {
                    design::tokens::INFO
                } else {
                    design::tokens::SUCCESS
                }),
                MetricStripItem::new(
                    if en {
                        "Local (optimization)"
                    } else {
                        "Lokal (Optimierung)"
                    },
                    local_optimization.len().to_string(),
                )
                .with_accent(design::tokens::NEUTRAL),
            ])
            .compact(),
        );

        // Findings matrix (#570): a single compact table listing every finding
        // group across all four buckets, sorted worst-first, so a reader can
        // prioritize and locate a specific finding without paging through the
        // full set of detail cards that follow below. Purely additive — does
        // not replace or alter the per-category cards rendered afterward.
        const FINDINGS_MATRIX_MAX_ROWS: usize = 30;

        let mut matrix_findings: Vec<&FindingGroup> = all_findings.iter().collect();
        matrix_findings.sort_by(|a, b| {
            b.priority
                .cmp(&a.priority)
                .then_with(|| b.occurrence_count.cmp(&a.occurrence_count))
        });

        if !matrix_findings.is_empty() {
            let (matrix_title, matrix_intro) = if en {
                (
                    "Findings Matrix",
                    "One row per finding group, sorted by priority — an overview to prioritize by before the detail cards below expand on each row.",
                )
            } else {
                (
                    "Befundmatrix",
                    "Eine Zeile je Befundgruppe, sortiert nach Priorität – als Überblick zur Priorisierung, bevor die Detailkarten unten jede Zeile vertiefen.",
                )
            };
            builder = builder.add_component(Label::new(matrix_intro).with_size("10.5pt"));

            let mut table = AuditTable::new(vec![
                TableColumn::new(if en { "Priority" } else { "Priorität" }).with_width("10%"),
                TableColumn::new("WCAG").with_width("10%"),
                TableColumn::new(if en { "Finding" } else { "Befund" }).with_width("28%"),
                TableColumn::new(if en { "Scope" } else { "Umfang" }).with_width("14%"),
                TableColumn::new(if en { "Responsible" } else { "Zuständig" }).with_width("14%"),
                TableColumn::new(if en { "Action" } else { "Maßnahme" }).with_width("24%"),
            ])
            .with_title(matrix_title);

            for group in matrix_findings.iter().take(FINDINGS_MATRIX_MAX_ROWS) {
                let wcag = if group.wcag_criterion.is_empty() {
                    "n/a".to_string()
                } else if group.wcag_level.is_empty() {
                    group.wcag_criterion.clone()
                } else {
                    format!("{} ({})", group.wcag_criterion, group.wcag_level)
                };
                let scope = if group.is_component_issue {
                    if en {
                        format!("Systemic · {}", group.occurrence_count)
                    } else {
                        format!("Systemisch · {}", group.occurrence_count)
                    }
                } else if en {
                    format!("Local · {}", group.occurrence_count)
                } else {
                    format!("Lokal · {}", group.occurrence_count)
                };
                table = table.add_row(vec![
                    priority_label_i18n(group.priority, i18n),
                    wcag,
                    truncate_title(&group.title, 48),
                    scope,
                    role_label_i18n(group.responsible_role, i18n),
                    truncate_title(&group.recommendation, 72),
                ]);
            }
            builder = builder.add_component(table);

            let remaining = matrix_findings
                .len()
                .saturating_sub(FINDINGS_MATRIX_MAX_ROWS);
            if remaining > 0 {
                let note = if en {
                    format!("{remaining} further findings are listed in the detail cards below.")
                } else {
                    format!(
                        "{remaining} weitere Befunde sind in den Detailkarten unten aufgeführt."
                    )
                };
                builder = builder.add_component(
                    Label::new(note)
                        .with_size("9pt")
                        .with_color(design::tokens::NEUTRAL),
                );
            }
        }

        // The first rendered category flows directly under the classification
        // header; only later categories start on a fresh page.
        let mut rendered_categories = 0usize;

        // 1. Systemic Mandatory
        if !systemic_mandatory.is_empty() {
            let title = if en {
                "Systemic Template & Component Issues (WCAG A/AA)"
            } else {
                "Systemische Template- & Komponentenfehler (WCAG A/AA)"
            };
            let desc = if en {
                "This pattern suggests a reused component or template — confirming that requires evidence from additional pages. A central fix would likely also resolve the cause on other pages sharing the same pattern."
            } else {
                "Dieses Muster deutet auf eine wiederverwendete Komponente oder Vorlage hin — bestätigt ist das erst mit Belegen von weiteren Seiten. Eine zentrale Behebung würde die Ursache voraussichtlich auch auf anderen Seiten mit demselben Muster beheben."
            };
            if rendered_categories > 0 {
                builder = builder.add_component(PageBreak::new());
            }
            rendered_categories += 1;
            builder = builder.add_component(
                SectionHeaderSplit::new(title, desc)
                    .with_eyebrow(if en {
                        "SYSTEMIC COMPLIANCE"
                    } else {
                        "SYSTEMISCHE PFLICHT"
                    })
                    .with_level(2),
            );
            for group in systemic_mandatory {
                builder = render_finding_technical(
                    builder,
                    group,
                    i18n,
                    report_ts,
                    evidence_seq,
                    acronyms_expanded,
                );
            }
        }

        // 2. Systemic Optimization
        if !systemic_optimization.is_empty() {
            let title = if en {
                "Systemic Quality & SEO Optimizations"
            } else {
                "Systemische Qualitäts- & SEO-Optimierungen"
            };
            let desc = if en {
                "These recommendations recur within this single page, which suggests a shared template — confirming that would require checking additional pages."
            } else {
                "Diese Empfehlungen wiederholen sich innerhalb dieser einen Seite, was auf eine gemeinsame Vorlage hindeutet — bestätigt ist das erst nach Prüfung weiterer Seiten."
            };
            if rendered_categories > 0 {
                builder = builder.add_component(PageBreak::new());
            }
            rendered_categories += 1;
            builder = builder.add_component(
                SectionHeaderSplit::new(title, desc)
                    .with_eyebrow(if en {
                        "SYSTEMIC OPTIMIZATION"
                    } else {
                        "SYSTEMISCHE OPTIMIERUNG"
                    })
                    .with_level(2),
            );
            for group in systemic_optimization {
                builder = render_finding_technical(
                    builder,
                    group,
                    i18n,
                    report_ts,
                    evidence_seq,
                    acronyms_expanded,
                );
            }
        }

        // 3. Local Mandatory
        if !local_mandatory.is_empty() {
            let title = if en {
                "Local & Editorial Findings (WCAG A/AA)"
            } else {
                "Einzelfälle & Redaktionelle Befunde (WCAG A/AA)"
            };
            let desc = if en {
                "Single instances of accessibility barriers affecting specific pages, images, or editorial content, usually requiring individual resolution."
            } else {
                "Punktuelle Barrieren, die nur einzelne Seiten, spezifische Bilder oder redaktionelle Texte betreffen und meist individuell behoben werden müssen."
            };
            if rendered_categories > 0 {
                builder = builder.add_component(PageBreak::new());
            }
            rendered_categories += 1;
            builder = builder.add_component(
                SectionHeaderSplit::new(title, desc)
                    .with_eyebrow(if en {
                        "LOCAL COMPLIANCE"
                    } else {
                        "LOKALE PFLICHT"
                    })
                    .with_level(2),
            );
            for group in local_mandatory {
                builder = render_finding_technical(
                    builder,
                    group,
                    i18n,
                    report_ts,
                    evidence_seq,
                    acronyms_expanded,
                );
            }
        }

        // 4. Local Optimization
        if !local_optimization.is_empty() {
            let title = if en {
                "Additional Quality & SEO Recommendations"
            } else {
                "Ergänzende Qualitäts- & SEO-Empfehlungen"
            };
            let desc = if en {
                "Usability, performance, or SEO recommendations for specific pages."
            } else {
                "Ergänzende Empfehlungen zur Verbesserung der Ladezeiten, Suchmaschinenoptimierung und Benutzerfreundlichkeit auf bestimmten Seiten."
            };
            if rendered_categories > 0 {
                builder = builder.add_component(PageBreak::new());
            }
            rendered_categories += 1;
            builder = builder.add_component(
                SectionHeaderSplit::new(title, desc)
                    .with_eyebrow(if en {
                        "LOCAL OPTIMIZATION"
                    } else {
                        "LOKALE OPTIMIERUNG"
                    })
                    .with_level(2),
            );
            for group in local_optimization {
                builder = render_finding_technical(
                    builder,
                    group,
                    i18n,
                    report_ts,
                    evidence_seq,
                    acronyms_expanded,
                );
            }
        }
        let _ = rendered_categories; // last write is intentional; silence dead-store lint
    }
    builder
}

fn render_appendix_section(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    // Appendix — full violations list, conclusion of Part 2 (#246). Only render
    // the section header when there are violations to list; otherwise it
    // promises a list that never appears (#364).
    if vm.appendix.has_violations {
        let (appendix_title, appendix_intro) = if en {
            (
                "Complete Findings List",
                "Raw audit data and the full list of detected violations.",
            )
        } else {
            (
                "Vollständige Fundstellen",
                "Rohdaten des Audits und die vollständige Liste aller erkannten Verstöße.",
            )
        };
        builder = builder.add_component(PageBreak::new()).add_component(
            SectionHeaderSplit::new(appendix_title, appendix_intro)
                .with_eyebrow(if en { "APPENDIX" } else { "ANHANG" })
                .with_level(2),
        );

        builder = builder.add_component(build_cli_snapshot_table(vm, i18n));

        // JSON hint in appendix (#219)
        let json_note = if en {
            "The accompanying JSON report contains the complete machine-readable issue list with selectors, occurrences, and all detail data for automated processing."
        } else {
            "Der begleitende JSON-Report enthält die vollständige maschinenlesbare Fehlerliste mit Selektoren, Vorkommen und allen Detaildaten für automatisierte Weiterverarbeitung."
        };
        builder = builder.add_component(Callout::info(json_note).with_title(if en {
            "Raw data & processing"
        } else {
            "Rohdaten & Weiterverarbeitung"
        }));

        if vm.meta.report_level == ReportLevel::Technical {
            for v in &vm.appendix.violations {
                let mut desc = v.message.clone();
                if let Some(ref fix) = v.fix_suggestion {
                    desc.push_str(&format!("\n\nFix: {}", fix));
                }
                desc.push_str(&format!(
                    "\n\n{} Elemente betroffen",
                    v.affected_elements.len()
                ));
                let useful_selectors: Vec<&str> = v
                    .affected_elements
                    .iter()
                    .map(|e| e.selector.as_str())
                    .filter(|s| {
                        s.contains('.')
                            || s.contains('#')
                            || s.contains('[')
                            || s.contains('>')
                            || s.contains(' ')
                    })
                    .collect();
                if !useful_selectors.is_empty() {
                    desc.push_str(&format!("\nSelektoren: {}", useful_selectors.join(", ")));
                }
                builder = builder.add_component(Finding::new(
                    format!("{} — {}", v.rule, v.rule_name),
                    map_severity(&v.severity),
                    &desc,
                ));
            }
        } else {
            let rows: Vec<ChecklistRow> = vm
                .appendix
                .violations
                .iter()
                .map(|v| {
                    let status = match v.severity {
                        crate::wcag::Severity::Critical => "bad",
                        crate::wcag::Severity::High => "warn",
                        _ => "neutral",
                    };
                    ChecklistRow::new(format!("{} — {}", v.rule, v.rule_name), v.message.clone())
                        .with_status(status)
                })
                .collect();
            builder = builder.add_component(
                ChecklistPanel::new(rows).with_title(i18n.t("section-all-violations")),
            );
        }
    }
    builder
}

fn render_positive_signals_section(
    mut builder: renderreport::engine::ReportBuilder,
    signals: &[PositiveSignal],
    is_first: bool,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    if signals.is_empty() {
        return builder;
    }

    if !is_first {
        builder = builder.add_component(PageBreak::new());
    }

    let en = i18n.locale() == "en";
    let mut rows = Vec::new();
    for signal in signals {
        let status = if signal.strong {
            if en {
                "Strong"
            } else {
                "Stark"
            }
        } else if en {
            "Present"
        } else {
            "Vorhanden"
        };
        rows.push(
            ChecklistRow::new(&signal.title, format!("{}: {}", status, signal.description))
                .with_status(if signal.strong { "good" } else { "info" }),
        );
    }

    builder.add_component(ChecklistPanel::new(rows).with_title(if en {
        "Recognized structural patterns"
    } else {
        "Erkannte Strukturmuster"
    }))
}

fn render_dual_viewport_summary_section(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    report: &AuditReport,
    is_first: bool,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let has_scores = vm.cover.desktop_score.is_some() && vm.cover.mobile_score.is_some();
    let has_screenshot_status = report.page_screenshots.is_some()
        || matches!(
            report.screenshot_status,
            crate::audit::ScreenshotStatus::Failed(_)
        );
    if !has_scores && !has_screenshot_status {
        return builder;
    }

    if !is_first {
        builder = builder.add_component(PageBreak::new());
    }

    let en = i18n.locale() == "en";
    if report.page_screenshots.is_some() {
        builder = builder.add_component(
            DevicePreview::new(
                super::PAGE_DESKTOP_SCREENSHOT_ASSET,
                super::PAGE_MOBILE_SCREENSHOT_ASSET,
            )
            .with_height(210.0),
        );
    }

    // A bordered panel here reads as its own boxed widget that then trails
    // into the blank rest of the (short) divider page — a compact strip
    // reads as part of the divider's own content instead, and names the
    // metric ("Accessibility-Score", not a bare "93/100") so it doesn't need
    // a caller to already know what dual-viewport scoring means.
    builder = builder.add_component(
        Label::new(if en {
            "Dual viewport summary"
        } else {
            "Dual-Viewport-Zusammenfassung"
        })
        .bold()
        .with_size("10.5pt"),
    );

    let mut items = Vec::new();
    if let (Some(desktop), Some(mobile)) = (vm.cover.desktop_score, vm.cover.mobile_score) {
        items.push(
            MetricStripItem::new(
                if en {
                    "Accessibility - Desktop"
                } else {
                    "Barrierefreiheit - Desktop"
                },
                format!("{desktop} / 100"),
            )
            .with_unit(score_range_label(desktop, en))
            .with_accent(design::score_color(desktop as u8)),
        );
        items.push(
            MetricStripItem::new(
                if en {
                    "Accessibility - Mobile"
                } else {
                    "Barrierefreiheit - Mobile"
                },
                format!("{mobile} / 100"),
            )
            .with_unit(score_range_label(mobile, en))
            .with_accent(design::score_color(mobile as u8)),
        );
        items.push(
            MetricStripItem::new(
                if en {
                    "Accessibility - overall"
                } else {
                    "Barrierefreiheit - Gesamt"
                },
                format!("{} / 100", vm.summary.score),
            )
            .with_unit(if en {
                "70/30 weighted"
            } else {
                "70/30 gewichtet"
            })
            .with_accent(design::score_color(vm.summary.score as u8)),
        );
    }
    if !has_scores
        && matches!(
            report.screenshot_status,
            crate::audit::ScreenshotStatus::Captured
        )
    {
        items.push(
            MetricStripItem::new(
                if en { "Preview" } else { "Vorschau" },
                if en { "Captured" } else { "Erfasst" },
            )
            .with_accent(design::tokens::SUCCESS),
        );
    }
    if !items.is_empty() {
        builder = builder.add_component(MetricStrip::new(items).compact());
    }

    if let crate::audit::ScreenshotStatus::Failed(reason) = &report.screenshot_status {
        builder = builder.add_component(Callout::warning(if en {
            format!("Screenshot capture failed: {reason}")
        } else {
            format!("Screenshot-Erfassung fehlgeschlagen: {reason}")
        }));
    }

    let occurrence_context = report
        .dual_viewport
        .as_ref()
        .map(|dual| {
            let desktop = dual.desktop.wcag_results.violations.len();
            let mobile = dual.mobile.wcag_results.violations.len();
            let combined = vm.severity.total;
            if en {
                format!("WCAG occurrences before cross-viewport consolidation: {desktop} on desktop and {mobile} on mobile. The normalized combined finding list contains {combined} occurrences; this count is used for evidence and remediation, not as a third score. ")
            } else {
                format!("WCAG-Vorkommen vor der ansichtsübergreifenden Zusammenführung: {desktop} auf Desktop und {mobile} auf Mobile. Die normalisierte gemeinsame Befundliste enthält {combined} Vorkommen; diese Anzahl dient Evidenz und Maßnahmenplanung, nicht als dritter Score. ")
            }
        })
        .unwrap_or_default();
    let explanation = if en {
        format!(
            "Each viewport accessibility score reflects the severity and variety of automatically detected WCAG findings; 100 means no issue was detected within the automated scope. Lower values mean more remediation pressure. {occurrence_context}The displayed accessibility overall score is calculated from mobile at 70% and desktop at 30%."
        )
    } else {
        format!(
            "Jeder Barrierefreiheits-Score bewertet Schwere und Vielfalt der automatisiert erkannten WCAG-Befunde seiner Ansicht; 100 bedeutet, dass im automatisierten Prüfumfang kein Problem erkannt wurde. Niedrigere Werte bedeuten höheren Handlungsdruck. {occurrence_context}Der ausgewiesene Barrierefreiheits-Gesamtwert wird mit 70 % Mobile und 30 % Desktop berechnet."
        )
    };

    builder.add_component(
        Label::new(explanation)
            .with_size("9pt")
            .with_color(design::tokens::MUTED),
    )
}

fn score_range_label(score: u32, en: bool) -> &'static str {
    crate::registry::SCORE_RANGE.label(score as f32, en)
}

pub(super) fn render_module_sections(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    report: &AuditReport,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let mut is_first = true;
    let has_dual_viewport_scores =
        vm.cover.desktop_score.is_some() && vm.cover.mobile_score.is_some();
    let has_screenshot_status = report.page_screenshots.is_some()
        || matches!(
            report.screenshot_status,
            crate::audit::ScreenshotStatus::Failed(_)
        );
    if has_dual_viewport_scores || has_screenshot_status {
        builder = render_dual_viewport_summary_section(builder, vm, report, is_first, i18n);
        is_first = false;
    }
    if let Some(ref sx) = vm.module_details.search_experience {
        builder = render_search_experience(builder, sx, is_first, i18n);
        is_first = false;
    }

    // #14: Source Quality, AI Visibility and Content Visibility are merged into
    // one "KI & Vertrauen" / "AI & Trust" chapter so the three trust- and
    // discoverability-indicator modules read as one section instead of three
    // fragmented ones. They render as level-3 sub-sections under one opener.
    let en = i18n.locale() == "en";
    let mut ki_opened = false;
    let mut in_ki_chapter = false;
    for module in active_report_modules(report) {
        let key = module.module_key();
        let is_trust = matches!(
            key,
            "source_quality" | "ai_visibility" | "content_visibility"
        );
        if is_trust && !ki_opened {
            builder = builder.add_component(PageBreak::new()).add_component(
                SectionHeaderSplit::new(
                    if en { "AI & Trust" } else { "KI & Vertrauen" },
                    if en {
                        "Source quality, AI readability and content visibility — trust and discoverability indicators."
                    } else {
                        "Quellenqualität, KI-Lesbarkeit und Content-Sichtbarkeit — Vertrauens- und Auffindbarkeits-Indikatoren."
                    },
                )
                .with_eyebrow(if en { "TRUST" } else { "VERTRAUEN" })
                .with_level(2),
            );
            ki_opened = true;
            in_ki_chapter = true;
            is_first = true; // the trio's first sub-section flows under the opener
        } else if !is_trust && in_ki_chapter {
            // Close the trust chapter before the next, unrelated module.
            builder = builder.add_component(PageBreak::new());
            in_ki_chapter = false;
            is_first = true;
        }
        let (next_builder, rendered) =
            render_active_module_section(builder, key, vm, report, is_first, i18n);
        builder = next_builder;
        if rendered {
            is_first = false;
        }
    }

    builder
}

fn render_active_module_section(
    mut builder: renderreport::engine::ReportBuilder,
    module_key: &str,
    vm: &ReportViewModel,
    report: &AuditReport,
    is_first: bool,
    i18n: &I18n,
) -> (renderreport::engine::ReportBuilder, bool) {
    match module_key {
        "performance" => {
            if let Some(ref perf) = vm.module_details.performance {
                builder = render_performance(builder, perf, is_first, i18n);
                if !report.experience.budget_violations.is_empty() {
                    builder = render_budget_violations(
                        builder,
                        &report.experience.budget_violations,
                        i18n,
                    );
                }
                return (builder, true);
            }
        }
        "seo" => {
            if let Some(ref seo) = vm.module_details.seo {
                return (render_seo(builder, seo, is_first, i18n), true);
            }
        }
        "security" => {
            if let Some(ref sec) = vm.module_details.security {
                return (render_security(builder, sec, is_first, i18n), true);
            }
        }
        "html_conform" => {
            if let Some(ref hc) = vm.module_details.html_conform {
                return (render_html_conform(builder, hc, is_first, i18n), true);
            }
        }
        "mobile" => {
            if let Some(ref mobile) = vm.module_details.mobile {
                return (render_mobile(builder, mobile, is_first, i18n), true);
            }
        }
        "ux" => {
            if let Some(ref ux) = vm.module_details.ux {
                return (render_ux(builder, ux, is_first, i18n), true);
            }
        }
        "journey" => {
            if let Some(ref journey) = vm.module_details.journey {
                return (render_journey(builder, journey, is_first, i18n), true);
            }
        }
        "dark_mode" => {
            if let Some(ref dm) = vm.module_details.dark_mode {
                return (render_dark_mode(builder, dm, is_first, i18n), true);
            }
        }
        "design_quality" => {
            if let Some(ref dq) = vm.module_details.design_quality {
                return (render_design_quality(builder, dq, is_first, i18n), true);
            }
        }
        "ai_transparency" => {
            if let Some(ref at) = vm.module_details.ai_transparency {
                return (render_ai_transparency(builder, at, is_first, i18n), true);
            }
        }
        "network_dns" => {
            if let Some(ref dns) = vm.module_details.network_dns {
                return (render_network_dns(builder, dns, is_first, i18n), true);
            }
        }
        "source_quality" => {
            if let Some(ref sq) = vm.module_details.source_quality {
                return (render_source_quality(builder, sq, is_first, i18n), true);
            }
        }
        "ai_visibility" => {
            if let Some(ref av) = vm.module_details.ai_visibility {
                return (render_ai_visibility(builder, av, is_first, i18n), true);
            }
        }
        "content_visibility" => {
            if let Some(ref cv) = vm.module_details.content_visibility {
                return (render_content_visibility(builder, cv, is_first, i18n), true);
            }
        }
        "best_practices" => {
            if let Some(ref bp) = vm.module_details.best_practices {
                return (render_best_practices(builder, bp, is_first, i18n), true);
            }
        }
        "tech_stack" => {
            if let Some(ref ts) = vm.module_details.tech_stack {
                return (render_tech_stack(builder, ts, is_first, i18n), true);
            }
        }
        "patterns" if !vm.positive_signals.is_empty() => {
            return (
                render_positive_signals_section(builder, &vm.positive_signals, is_first, i18n),
                true,
            );
        }
        _ => {}
    }

    (builder, false)
}

/// Max number of root causes assigned a letter (A, B, C…) in the root-cause
/// analysis section. Shared with `render_timeframe_roadmap` so both sections
/// agree on which letter identifies which cause.
const ROOT_CAUSE_SHOWN: usize = 6;

/// WCAG-Mandatory-tier findings sorted by occurrence count (descending) — the
/// exact pool `render_root_cause_analysis` assigns letters A, B, C… from.
fn mandatory_root_causes(vm: &ReportViewModel) -> Vec<&FindingGroup> {
    let mut findings: Vec<&FindingGroup> = vm
        .findings
        .all_findings
        .iter()
        .filter(|f| f.occurrence_count > 0 && f.criticality_tier == CriticalityTier::Mandatory)
        .collect();
    findings.sort_by_key(|f| std::cmp::Reverse(f.occurrence_count));
    findings
}

/// Shorten a finding title for inline display next to a letter code (chart
/// labels, table cells) — same char-based ellipsis truncation pattern used
/// elsewhere in the PDF layer.
fn truncate_title(value: &str, max_chars: usize) -> String {
    let count = value.chars().count();
    if count <= max_chars {
        return value.to_string();
    }
    value
        .chars()
        .take(max_chars.saturating_sub(1))
        .collect::<String>()
        + "…"
}

/// `rule_id -> (letter, occurrence_count, share_pct)` for the top
/// `ROOT_CAUSE_SHOWN` mandatory root causes. Used by `render_timeframe_roadmap`
/// to tag systemic actions with the root cause they resolve, so the two
/// sections never disagree on which letter is which.
fn root_cause_lookup(
    findings: &[&FindingGroup],
) -> std::collections::HashMap<String, (char, usize, i64)> {
    let total_occurrences: usize = findings.iter().map(|f| f.occurrence_count).sum();
    findings
        .iter()
        .enumerate()
        .take(ROOT_CAUSE_SHOWN)
        .map(|(idx, f)| {
            let letter = (b'A' + idx as u8) as char;
            let share_pct = if total_occurrences > 0 {
                (f.occurrence_count as f64 * 100.0 / total_occurrences as f64).round() as i64
            } else {
                0
            };
            (f.rule_id.clone(), (letter, f.occurrence_count, share_pct))
        })
        .collect()
}

pub(super) fn render_root_cause_analysis(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    let title = if en {
        "Root Cause Analysis"
    } else {
        "Ursachenanalyse"
    };
    let subtitle = if en {
        "Many individual findings trace back to a few recurring causes — fixing those has a compounding effect."
    } else {
        "Viele Einzelbefunde gehen auf wenige wiederkehrende Ursachen zurück – deren Behebung wirkt gebündelt."
    };

    // No leading PageBreak: the preceding part divider ("Befunde nach Ursache")
    // already opened the page — an extra break left that divider page 3/4 empty.
    builder = builder.add_component(
        SectionHeaderSplit::new(title, subtitle)
            .with_eyebrow(if en { "ROOT CAUSE" } else { "URSACHEN" })
            .with_level(2),
    );

    // Only WCAG/Mandatory findings — scope matches the header "N Accessibility-Befunde" count.
    // SEO findings (Optimization tier) appear in their own section below.
    let findings = mandatory_root_causes(vm);

    if findings.is_empty() {
        let msg = if en {
            "No accessibility findings were detected, so no root cause analysis is necessary."
        } else {
            "Es wurden keine Barrierefreiheits-Befunde erkannt, daher ist keine Ursachenanalyse erforderlich."
        };
        builder = builder.add_component(Callout::success(msg));
        return builder;
    }

    // Plain lead-in (Rule A): spell out what "root cause" means in practice
    // before the technical list of causes/components follows below.
    let lead_in = if en {
        "In practice: fixing the right root cause — a shared component or template — often resolves several findings at once, instead of fixing each one individually."
    } else {
        "Das bedeutet konkret: Ein Fix an der richtigen Stelle – etwa einer wiederverwendeten Komponente oder einem Template – behebt oft mehrere Befunde gleichzeitig, statt jeden einzeln reparieren zu müssen."
    };
    builder = builder.add_component(Label::new(lead_in).with_size("10.5pt"));

    // Render root causes (assigning letters A, B, C, etc.)
    let mut list = List::new().with_title(if en {
        "Systemic Root Causes"
    } else {
        "Erkannte Kernursachen"
    });
    let mut table_rows = Vec::new();
    let mut chart_data: Vec<(String, f64)> = Vec::new();
    let total_occurrences: usize = findings.iter().map(|f| f.occurrence_count).sum();

    // Rounded (not truncating) share so a small-but-real cause reads as "1 %"
    // rather than a self-contradictory "0 %" next to its own listed row.
    let share_pct = |occurrences: usize| -> i64 {
        if total_occurrences > 0 {
            (occurrences as f64 * 100.0 / total_occurrences as f64).round() as i64
        } else {
            0
        }
    };

    let mut shown_occurrences = 0usize;

    for (idx, finding) in findings.iter().enumerate().take(ROOT_CAUSE_SHOWN) {
        let letter = (b'A' + idx as u8) as char;
        let item_title = format!(
            "{} {}: {} {} — {}",
            if en { "Root Cause" } else { "Ursache" },
            letter,
            finding.occurrence_count,
            if en { "occurrences" } else { "Vorkommen" },
            finding.title
        );
        list = list.add_item(&item_title);
        shown_occurrences += finding.occurrence_count;

        // Repeat the clear-text title next to the letter — otherwise the chart
        // and table only carry "Ursache A", forcing readers to flip back to
        // the list above to remember what it refers to.
        let short_title = truncate_title(&finding.title, 45);
        table_rows.push(vec![
            format!("{letter} — {short_title}"),
            finding.occurrence_count.to_string(),
            format!("{} %", share_pct(finding.occurrence_count)),
        ]);
        chart_data.push((
            format!("{letter} — {short_title}"),
            finding.occurrence_count as f64,
        ));
    }

    // Findings beyond the top ROOT_CAUSE_SHOWN would otherwise inflate
    // `total_occurrences` (the true, honest denominator) with no visible row
    // to account for them — the displayed shares silently failed to sum to
    // 100 %. Disclose the remainder explicitly instead (#QA-039 report review).
    if findings.len() > ROOT_CAUSE_SHOWN {
        let remaining_causes = findings.len() - ROOT_CAUSE_SHOWN;
        let remaining_occurrences = total_occurrences - shown_occurrences;
        let label = if en {
            format!("Other ({remaining_causes} further causes)")
        } else {
            format!("Sonstige ({remaining_causes} weitere Ursachen)")
        };
        table_rows.push(vec![
            label.clone(),
            remaining_occurrences.to_string(),
            format!("{} %", share_pct(remaining_occurrences)),
        ]);
        chart_data.push((label, remaining_occurrences as f64));
    }

    builder = builder.add_component(list);

    // Occurrence distribution as a bar chart — shows at a glance where the
    // findings concentrate (#7 distribution bars).
    if chart_data.len() >= 2 {
        builder = builder.add_component(
            Chart::bar(if en {
                "Occurrence distribution by cause"
            } else {
                "Verteilung der Vorkommen nach Ursache"
            })
            .add_series("occurrences", chart_data)
            .horizontal(),
        );
    }

    // Render the table: Ursache | Vorkommen | Anteil
    let mut table = AuditTable::new(vec![
        TableColumn::new(if en { "Root Cause" } else { "Ursache" }).with_width("40%"),
        TableColumn::new(if en { "Occurrences" } else { "Vorkommen" }).with_width("30%"),
        TableColumn::new(if en { "Share" } else { "Anteil" }).with_width("30%"),
    ])
    .with_title(if en {
        "Distribution of Issues by Root Cause"
    } else {
        "Verteilung der Mängel nach Ursache"
    });

    for row in table_rows {
        table = table.add_row(row);
    }
    builder = builder.add_component(table);

    builder
}

pub(super) fn render_timeframe_roadmap(
    mut builder: renderreport::engine::ReportBuilder,
    vm: &ReportViewModel,
    i18n: &I18n,
) -> renderreport::engine::ReportBuilder {
    let en = i18n.locale() == "en";
    let title = if en { "Action Plan" } else { "Maßnahmenplan" };
    // Disclose the scope mismatch with the root-cause section above: this plan
    // also includes SEO/Optimization-tier actions, which are not part of the
    // WCAG-only root-cause count (#5 fix).
    let subtitle = if en {
        "Recommended actions grouped by where the problem lives — including supplementary SEO and quality recommendations without legal relevance."
    } else {
        "Empfohlene Maßnahmen, gruppiert nach Ebene des Problems — inklusive ergänzender SEO- und Qualitätsempfehlungen ohne Rechtsbezug."
    };

    builder = builder.add_component(PageBreak::new()).add_component(
        SectionHeaderSplit::new(title, subtitle)
            .with_eyebrow(if en { "ROADMAP" } else { "MASSNAHMEN" })
            .with_level(2),
    );

    let columns = &vm.actions.roadmap_columns;
    if columns.is_empty() {
        let empty_msg = if en {
            "No prioritized actions — no findings require remediation."
        } else {
            "Keine priorisierten Maßnahmen — keine Befunde mit Handlungsbedarf."
        };
        builder = builder.add_component(Label::new(empty_msg).with_color(design::tokens::NEUTRAL));
        return builder;
    }

    // Same letter assignment as `render_root_cause_analysis`, so an action
    // tied to root cause "A" always points at the same finding the reader saw
    // lettered "A" above (#2 fix).
    let root_causes = mandatory_root_causes(vm);
    let root_cause_by_rule = root_cause_lookup(&root_causes);

    // One level group per column (systemic vs. local), each action as a clean
    // recommendation card — no time/effort badges, just what to do and why.
    for col in columns {
        builder = builder.add_component(
            SectionHeaderSplit::new(col.title.clone(), col.description.clone()).with_level(3),
        );
        for item in &col.items {
            let mut why = if !item.benefit.is_empty() {
                item.benefit.clone()
            } else {
                item.risk_effect.clone()
            };
            if let Some((letter, occurrence_count, share_pct)) =
                root_cause_by_rule.get(&item.rule_id)
            {
                let tag = if en {
                    format!("→ Root Cause {letter}, {occurrence_count} occurrences ({share_pct}%)")
                } else {
                    format!("→ Ursache {letter}, {occurrence_count} Vorkommen ({share_pct} %)")
                };
                why = format!("{why}\n\n{tag}");
            }
            builder = builder.add_component(RecommendationCard::new(item.action.clone(), why));
        }
    }

    builder
}

#[cfg(test)]
mod risk_and_strength_tests {
    use super::*;

    /// #576 acceptance scenario 1: a "critical, mixed" report — some
    /// dimensions bad/critical, some genuinely good (SEO here mirrors the
    /// exact cited bug: "Sehr gute Auffindbarkeit..." must never land in the
    /// risks bucket). Usability/Legal/Business are bad (critical findings,
    /// BFSG violations, low score); SEO and Performance/Mobile are good.
    #[test]
    fn mixed_report_buckets_bad_dimensions_as_risks_and_good_ones_as_strengths() {
        let dimensions = compute_dimension_rows(
            /* severity_critical */ 2, /* severity_high */ 1,
            /* cover_critical_issues */ 2, /* summary_score */ 45,
            /* seo_score */ 95, /* perf_score */ 95, /* mobile_score */ 95,
            /* en */ false,
        );
        assert_eq!(dimensions.len(), 5);

        let risks: Vec<&DimensionRow> = dimensions.iter().filter(|d| d.status != "good").collect();
        let strengths: Vec<&DimensionRow> =
            dimensions.iter().filter(|d| d.status == "good").collect();

        assert_eq!(
            risks.len(),
            3,
            "usability, legal and business should be risks"
        );
        assert!(risks.iter().all(|d| d.status == "bad"));
        assert!(
            risks.iter().all(|d| d.label != "SEO & KI-Sichtbarkeit"),
            "SEO must never appear in the risks bucket when its status is good"
        );

        assert_eq!(
            strengths.len(),
            2,
            "SEO and performance/mobile should be strengths"
        );
        let seo_strength = strengths
            .iter()
            .find(|d| d.label == "SEO & KI-Sichtbarkeit")
            .expect("SEO dimension should be a strength");
        assert!(
            seo_strength
                .description
                .contains("Sehr gute Auffindbarkeit"),
            "the exact bug cited in #576: positive SEO text must land in strengths, not risks"
        );
    }

    /// #576 acceptance scenario 2: a report where genuinely nothing is a
    /// risk — all 5 dimensions clear their "good" threshold. This must be
    /// achievable (i.e. every dimension's status derivation must have a
    /// reachable "good" branch), otherwise the zero-risk empty state could
    /// never render in practice.
    #[test]
    fn clean_report_puts_all_five_dimensions_in_strengths() {
        let dimensions = compute_dimension_rows(
            /* severity_critical */ 0, /* severity_high */ 0,
            /* cover_critical_issues */ 0, /* summary_score */ 95,
            /* seo_score */ 95, /* perf_score */ 95, /* mobile_score */ 95,
            /* en */ false,
        );
        assert_eq!(dimensions.len(), 5);
        assert!(
            dimensions.iter().all(|d| d.status == "good"),
            "all dimensions should be good, got: {:?}",
            dimensions
                .iter()
                .map(|d| (&d.label, d.status))
                .collect::<Vec<_>>()
        );
    }

    /// Ordering: within the risks bucket, "bad" entries sort before "warn"
    /// entries, but relative order within each status is preserved (stable
    /// sort) rather than reshuffled.
    #[test]
    fn risks_partition_sorts_bad_before_warn_stably() {
        let dimensions = compute_dimension_rows(
            /* severity_critical */ 0, /* severity_high */ 1, // usability -> warn
            /* cover_critical_issues */ 1, // legal -> bad
            /* summary_score */ 70, // business -> warn
            /* seo_score */ 50, // seo -> bad
            /* perf_score */ 95, /* mobile_score */ 95, /* en */ true,
        );
        let (mut risks, _strengths): (Vec<DimensionRow>, Vec<DimensionRow>) =
            dimensions.into_iter().partition(|d| d.status != "good");
        risks.sort_by_key(|d| if d.status == "bad" { 0u8 } else { 1u8 });

        let statuses: Vec<&str> = risks.iter().map(|d| d.status).collect();
        assert_eq!(statuses, vec!["bad", "bad", "warn", "warn"]);
        // Stable within the "bad" group: Legal Conformance came before SEO
        // in the fixed dimension order, so it stays first among bads.
        assert_eq!(risks[0].label, "Legal Conformance");
        assert_eq!(risks[1].label, "SEO & AI Visibility");
    }
}
