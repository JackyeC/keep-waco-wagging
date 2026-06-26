import assert from "node:assert/strict";
import { describe, it } from "node:test";

/** Mirrors shopifyCatalog description cleanup — keep in sync with src/lib/shopifyCatalog.ts */
function cleanListingDescription(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/DRAFT\s*[—-]\s*pending review\.?\s*/gi, "")
    .replace(/Not yet published\.?\s*/gi, "")
    .trim();
}

describe("shopifyCatalog listing cleanup", () => {
  it("strips draft boilerplate but keeps product copy", () => {
    const cleaned = cleanListingDescription(
      "<p>DRAFT — pending review. Not yet published. Cozy mug with Waco skyline.</p>",
    );
    assert.equal(cleaned, "Cozy mug with Waco skyline.");
  });
});
