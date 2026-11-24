import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildShopifyCartUrl,
  shopProductPath,
} from "@/lib/shopifyProductDetails";

describe("shop links", () => {
  it("browses on this site and checks out on Shopify", () => {
    assert.equal(
      shopProductPath("the-wag-club-tee"),
      "/shop/the-wag-club-tee",
    );
    assert.equal(shopProductPath("the-wag-club-tee").includes("myshopify"), false);

    const checkout = buildShopifyCartUrl(
      [{ variantId: 42, qty: 1 }],
      "WAGFRIDAY",
    );
    assert.match(checkout, /\/cart\/42:1/);
    assert.match(checkout, /discount=WAGFRIDAY/);
    assert.equal(buildShopifyCartUrl([]).includes("/cart/"), false);
  });
});