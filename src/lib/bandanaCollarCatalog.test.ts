import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  bandanaCollarListings,
  bandanaCollarPrintify,
} from "@/data/bandanaCollarCatalog";
import { kwwBreeds } from "@/data/kwwBreeds";

describe("bandanaCollarCatalog", () => {
  it("has one listing per KWW breed edition", () => {
    assert.equal(bandanaCollarListings.length, kwwBreeds.length);
    assert.equal(bandanaCollarListings.length, 16);
  });

  it("uses unique Shopify handles aligned with hoodie slugs", () => {
    const handles = new Set(bandanaCollarListings.map((l) => l.handle));
    assert.equal(handles.size, bandanaCollarListings.length);
    for (const listing of bandanaCollarListings) {
      assert.equal(
        listing.handle,
        `keep-waco-wagging-${listing.breed.id}-bandana-collar`,
      );
      assert.equal(
        listing.hoodieHandle,
        `keep-waco-wagging-${listing.breed.id}-hoodie`,
      );
      assert.match(listing.title, /^Keep Waco Wagging — .+ Bandana Collar$/);
    }
  });

  it("points to Printify pet bandana collar blueprint", () => {
    assert.equal(bandanaCollarPrintify.productId, 563);
    assert.match(bandanaCollarPrintify.url, /pet-bandana-collar/);
  });
});
