import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cleanListingDescription } from "@/lib/merchCopy";

describe("shopifyCatalog listing cleanup", () => {
  it("strips draft boilerplate but keeps product copy", () => {
    const cleaned = cleanListingDescription(
      "<p>DRAFT — pending review. Not yet published. Cozy mug with Waco skyline.</p>",
    );
    assert.equal(cleaned, "Cozy mug with Waco skyline.");
  });
});
