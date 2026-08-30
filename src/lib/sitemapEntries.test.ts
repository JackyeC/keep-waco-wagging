import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getIndexableApprovedListings } from "@/data/approvedListings";
import { getIndexablePosts } from "@/data/blog";
import { directoryListings } from "@/data/directory";
import { getPublishedWagWatch } from "@/data/wagWatch";
import { canonicalUrl } from "@/lib/metadata";
import {
  buildSitemapEntries,
  sitemapExcludedPaths,
} from "@/lib/sitemapEntries";
import { siteConfig } from "@/lib/site";

describe("sitemap entries", () => {
  const entries = buildSitemapEntries();
  const urls = entries.map((entry) => entry.url);

  it("uses stable canonical URLs on the production origin", () => {
    assert.equal(urls[0], siteConfig.url);
    for (const url of urls) {
      assert.equal(url.startsWith(siteConfig.url), true);
      assert.equal(url.includes("undefined"), false);
    }
    assert.equal(new Set(urls).size, urls.length);
  });

  it("keeps high-value landing, directory, guide, and watch URLs", () => {
    for (const path of [
      "/",
      "/dog-care",
      "/dog-friendly-waco",
      "/blog",
      "/wag-watch",
      "/approved",
      "/new-dog-in-waco",
      "/dog-match",
    ]) {
      assert.equal(urls.includes(canonicalUrl(path)), true, path);
    }

    assert.equal(urls.includes(canonicalUrl("/dog-friendly-waco/street-dog-cafe")), true);
    assert.equal(
      urls.filter((url) => url.includes("/dog-friendly-waco/")).length,
      directoryListings.length,
    );
    assert.equal(
      urls.filter((url) => url.includes("/blog/")).length,
      getIndexablePosts().length,
    );
    assert.equal(
      urls.filter((url) => url.includes("/wag-watch/")).length,
      getPublishedWagWatch().length,
    );
    assert.equal(
      urls.filter((url) => url.includes("/approved/")).length,
      getIndexableApprovedListings().length,
    );
  });

  it("omits utility, legal, sample, and internal paths", () => {
    for (const path of sitemapExcludedPaths()) {
      assert.equal(
        urls.some((url) => url === canonicalUrl(path) || url.includes(path)),
        false,
        path,
      );
    }
    assert.equal(urls.some((url) => url.includes("/approved/sample-")), false);
    assert.equal(getIndexableApprovedListings().every((listing) => !listing.isSample), true);
  });

  it("uses content dates instead of build time for lastmod", () => {
    const now = Date.now();
    const dated = entries.filter((entry) => entry.lastModified);
    assert.ok(dated.length >= directoryListings.length);

    for (const entry of dated) {
      const lastModified =
        entry.lastModified instanceof Date
          ? entry.lastModified
          : new Date(entry.lastModified as string);
      assert.equal(Number.isNaN(lastModified.getTime()), false);
      assert.ok(
        now - lastModified.getTime() > 60_000,
        `${entry.url} lastmod should not be "now"`,
      );
    }

    const staticHome = entries.find((entry) => entry.url === siteConfig.url);
    assert.equal(staticHome?.lastModified, undefined);
  });
});
