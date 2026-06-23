import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getFeaturedMerchProducts,
  getPurchasableMerchProducts,
  isMerchStoreLive,
  liveMerchProducts,
  shopifyStoreConfig,
  proposedMerchConcepts,
} from "@/data/merchStore";

describe("merchStore", () => {
  it("keeps proposed concepts out of public product getters", () => {
    const publicProducts = getPurchasableMerchProducts();
    const conceptNames = proposedMerchConcepts.map((c) => c.name);
    for (const product of publicProducts) {
      assert.equal(
        conceptNames.includes(product.name as (typeof conceptNames)[number]),
        false,
        `Proposed concept "${product.name}" must not appear as a live product`,
      );
    }
  });

  it("does not report live store while disabled or empty", () => {
    assert.equal(shopifyStoreConfig.enabled, false);
    assert.equal(liveMerchProducts.length, 0);
    assert.equal(isMerchStoreLive(), false);
    assert.equal(getFeaturedMerchProducts(3).length, 0);
  });
});
