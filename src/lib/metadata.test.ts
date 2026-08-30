import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "@/app/robots";
import {
  canonicalUrl,
  indexFollowRobots,
  noindexRobots,
  servicePageMetadata,
} from "@/lib/metadata";
import { boardingLanding, daycareLanding } from "@/data/petCareLandings";
import { servicePages } from "@/data/servicePages";
import { cityConfig, siteConfig } from "@/lib/site";

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

describe("page titles and Rover proof", () => {
  it("keeps distinct search jobs for homepage vs boarding vs daycare vs care hub", () => {
    const home = servicePageMetadata(
      "/",
      "Keep Waco Wagging | Give Your Dog Their Best Waco Life",
      "Keep Waco Wagging helps Waco dog parents give their dogs a better local life — dog-friendly places, trusted care, Wag Watch updates, weekend ideas, and community resources.",
    );
    assert.equal(
      home.title && typeof home.title === "object" && "absolute" in home.title
        ? home.title.absolute
        : home.title,
      "Keep Waco Wagging | Give Your Dog Their Best Waco Life",
    );
    assert.equal(home.description?.includes("Shop"), false);
    assert.equal(home.description?.toLowerCase().includes("boarding waco"), false);

    assert.equal(
      boardingLanding.seo.title.toLowerCase().includes("dog boarding waco"),
      true,
    );
    assert.equal(
      daycareLanding.seo.title.toLowerCase().includes("dog daycare waco"),
      true,
    );
    assert.notEqual(boardingLanding.seo.title, daycareLanding.seo.title);
    assert.notEqual(boardingLanding.seo.description, daycareLanding.seo.description);
  });

  it("uses the shared Rover review count instead of a stale hardcoded figure", () => {
    assert.equal(
      servicePages["pet-care"].hero.metaLine?.includes(String(cityConfig.rover.reviewCount)),
      true,
    );
    assert.equal(servicePages["pet-care"].hero.metaLine?.includes("119"), false);
  });
});
