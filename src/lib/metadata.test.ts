import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "@/app/robots";
import {
  canonicalUrl,
  indexFollowRobots,
  noindexRobots,
  servicePageMetadata,
} from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

describe("canonical URLs and robots", () => {
  it("keeps homepage canonical identical to the sitemap origin", () => {
    assert.equal(canonicalUrl("/"), siteConfig.url);
    assert.equal(canonicalUrl(""), siteConfig.url);
    assert.equal(canonicalUrl("/blog"), `${siteConfig.url}/blog`);
    assert.equal(
      servicePageMetadata("/", "Home", "Description").alternates?.canonical,
      siteConfig.url,
    );
  });

  it("asks Google to index public pages and to skip internal ones", () => {
    assert.equal(indexFollowRobots && typeof indexFollowRobots === "object", true);
    if (indexFollowRobots && typeof indexFollowRobots === "object") {
      assert.equal(indexFollowRobots.index, true);
      assert.equal(indexFollowRobots.follow, true);
    }
    if (noindexRobots && typeof noindexRobots === "object") {
      assert.equal(noindexRobots.index, false);
      assert.equal(noindexRobots.follow, false);
    }
  });

  it("blocks admin, APIs, the brand book, and sample Approved URLs", () => {
    const manifest = robots();
    const disallow = Array.isArray(manifest.rules)
      ? manifest.rules[0]?.disallow
      : manifest.rules.disallow;
    const blocked = Array.isArray(disallow) ? disallow : [disallow];
    assert.deepEqual(blocked, [
      "/admin",
      "/api/",
      "/brand$",
      "/approved/sample-",
    ]);
    assert.equal(manifest.sitemap, `${siteConfig.url}/sitemap.xml`);
  });
});
