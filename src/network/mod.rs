//! Network-level, host-scoped checks that do not require a browser/CDP page
//! (#545). Currently just DNS configuration; kept as its own top-level module
//! (mirroring `design_quality`/`ai_transparency`) rather than folded into an
//! existing module, since it is the first check in this codebase that talks
//! to the network directly instead of through the audited page.

pub mod dns;
pub use dns::NetworkDnsModule;
