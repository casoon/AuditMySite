//! `AuditModule` implementation for the DNS-configuration module (#545).

use std::collections::HashMap;
use std::sync::{Arc, OnceLock};

use async_trait::async_trait;
use tokio::sync::Mutex;
use tracing::warn;

use crate::audit::module::{AuditModule, ModuleContext, ModuleData};
use crate::audit::PipelineConfig;
use crate::error::Result;

use super::{build_analysis, query_dns, NetworkDnsAnalysis};

/// Per-host memoization (#545: "runs once per host, not once per page").
/// A DNS lookup set is host-scoped, not page-scoped — repeating it for every
/// page of the same batch run would just repeat identical network queries.
/// Nothing in the catalog/`ModuleContext` machinery threads shared state
/// between `AuditModule::collect` calls, so this is process-wide (not tied
/// to a single `PipelineConfig`) — the simplest mechanism that achieves
/// "one DNS check per unique host per process run", including the rare case
/// of a multi-host batch (e.g. a URL file spanning several domains), which
/// still gets one lookup per distinct host rather than one for the whole run.
static DNS_CACHE: OnceLock<Mutex<HashMap<String, Arc<NetworkDnsAnalysis>>>> = OnceLock::new();

fn dns_cache() -> &'static Mutex<HashMap<String, Arc<NetworkDnsAnalysis>>> {
    DNS_CACHE.get_or_init(|| Mutex::new(HashMap::new()))
}

pub struct NetworkDnsModule;

#[async_trait]
impl AuditModule for NetworkDnsModule {
    fn id(&self) -> &'static str {
        "network_dns"
    }

    fn label(&self) -> &'static str {
        "DNS Configuration"
    }

    fn is_enabled(&self, cfg: &PipelineConfig) -> bool {
        cfg.check_dns
    }

    async fn collect(&self, ctx: &ModuleContext<'_>) -> Result<ModuleData> {
        let Ok(parsed) = url::Url::parse(ctx.url) else {
            return Ok(ModuleData::None);
        };
        let Some(host) = parsed.host_str() else {
            return Ok(ModuleData::None);
        };
        let host = host.to_string();

        {
            let cache = dns_cache().lock().await;
            if let Some(cached) = cache.get(&host) {
                return Ok(ModuleData::NetworkDns(Box::new((**cached).clone())));
            }
        }

        let Some(result) = query_dns(&host).await else {
            warn!("DNS resolver unavailable, skipping DNS check for {host}");
            return Ok(ModuleData::None);
        };
        let analysis = build_analysis(&host, &result);

        let mut cache = dns_cache().lock().await;
        let entry = cache
            .entry(host)
            .or_insert_with(|| Arc::new(analysis))
            .clone();
        Ok(ModuleData::NetworkDns(Box::new((*entry).clone())))
    }
}
