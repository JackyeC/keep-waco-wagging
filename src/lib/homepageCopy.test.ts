import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  testimonialExcerpt,
  testimonials,
} from "@/data/testimonials";
import {
  weekendCampClayton,
  weekendEdition,
  weekendParkPick,
  weekendSafetyNote,
  weekendSaturdayStops,
} from "@/data/weekend";
import { shopifySizedSrc } from "@/lib/shopifyImage";

describe("weekend edition", () => {
  it("stays evergreen and does not pin September 12–13 dates", () => {
    const blob = JSON.stringify({
      weekendEdition,
      weekendSaturdayStops,
      weekendParkPick,
      weekendSafetyNote,
      weekendCampClayton,
    });
    assert.equal(weekendEdition.dates, null);
    assert.equal(weekendCampClayton.dates, null);
    assert.doesNotMatch(blob, /September\s*12/i);
    assert.doesNotMatch(blob, /Sept\.?\s*12/i);
    assert.doesNotMatch(blob, /Apple Orchard/i);
  });
});

describe("testimonial excerpts", () => {
  it("featured cards use complete sentences, not mid-word ellipsis", () => {
    const featured = testimonials.filter((item) => item.featured);
    assert.ok(featured.length >= 2);
    for (const item of featured) {
      const excerpt = testimonialExcerpt(item);
      assert.ok(excerpt.length > 0, `${item.id} excerpt is empty`);
      assert.ok(!excerpt.includes("..."), `${item.id} still uses ASCII ellipsis`);
      assert.ok(!excerpt.includes("…"), `${item.id} still uses unicode ellipsis`);
      assert.match(
        excerpt,
        /[.!?]$/,
        `${item.id} excerpt does not end on a complete sentence: ${excerpt}`,
      );
    }
  });
});

describe("shopifySizedSrc", () => {
  it("asks Shopify CDN for a display width and leaves other hosts alone", () => {
    assert.equal(
      shopifySizedSrc("https://cdn.shopify.com/s/files/1/foo.jpg", 800),
      "https://cdn.shopify.com/s/files/1/foo.jpg?width=800",
    );
    assert.equal(
      shopifySizedSrc("https://example.com/a.jpg", 800),
      "https://example.com/a.jpg",
    );
  });
});
