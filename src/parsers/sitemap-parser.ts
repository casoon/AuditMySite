import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";
import { SitemapUrl } from "../types";

export class SitemapParser {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
  }

  async parseSitemap(sitemapUrl: string): Promise<SitemapUrl[]> {
    let xml: string;

    // Lade XML von URL oder Datei
    if (sitemapUrl.startsWith("http")) {
      const response = await fetch(sitemapUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
      }
      xml = await response.text();
    } else {
      xml = fs.readFileSync(path.resolve(sitemapUrl), "utf-8");
    }

    const parsed = this.parser.parse(xml);
    const urls: SitemapUrl[] = [];

    // Fall 1: Standard sitemap.xml Struktur
    if (parsed.urlset && parsed.urlset.url) {
      if (Array.isArray(parsed.urlset.url)) {
        urls.push(
          ...parsed.urlset.url.map((u: any) => ({
            loc: u.loc,
            lastmod: u.lastmod,
            changefreq: u.changefreq,
            priority: u.priority,
          })),
        );
      } else {
        urls.push({
          loc: parsed.urlset.url.loc,
          lastmod: parsed.urlset.url.lastmod,
          changefreq: parsed.urlset.url.changefreq,
          priority: parsed.urlset.url.priority,
        });
      }
    }

    // Fall 2: Falls die URLs im #text Feld sind (wie bei Astro)
    if (urls.length === 0 && parsed.urlset && parsed.urlset["#text"]) {
      const textContent = parsed.urlset["#text"];
      const urlMatches = textContent.match(/<loc>(.*?)<\/loc>/g);
      if (urlMatches) {
        urls.push(
          ...urlMatches.map((match: string) => ({
            loc: match.replace(/<\/?loc>/g, ""),
          })),
        );
      }
    }

    return urls;
  }

  filterUrls(
    urls: SitemapUrl[],
    options: {
      filterPatterns?: string[];
      includePatterns?: string[];
    },
  ): SitemapUrl[] {
    let filtered = urls;

    // Filtere nach Ausschluss-Mustern
    if (options.filterPatterns) {
      filtered = filtered.filter(
        (url) =>
          !options.filterPatterns!.some((pattern) => url.loc.includes(pattern)),
      );
    }

    // Filtere nach Einschluss-Mustern
    if (options.includePatterns) {
      filtered = filtered.filter((url) =>
        options.includePatterns!.some((pattern) => url.loc.includes(pattern)),
      );
    }

    return filtered;
  }

  convertToLocalUrls(urls: SitemapUrl[], baseUrl: string): SitemapUrl[] {
    return urls.map((url) => ({
      ...url,
      loc: this.convertUrlToLocal(url.loc, baseUrl),
    }));
  }

  private convertUrlToLocal(url: string, baseUrl: string): string {
    // Extrahiere Domain aus der URL
    const urlObj = new URL(url);
    const domain = urlObj.origin;

    // Ersetze Domain durch baseUrl
    return url.replace(domain, baseUrl);
  }
}
