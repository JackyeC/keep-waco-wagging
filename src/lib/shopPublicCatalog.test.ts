import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { MerchProduct } from "@/data/merchStore";
import { batch1ArtworkHoldHandles } from "@/data/batch1CuratedCollection";
import {
  findGiftCardProduct,
  visibleShopProducts,
} from "@/lib/shopPublicCatalog";

function product(slug: string, name: string, productType?: string): MerchProduct {
  return {
    id: slug,
    slug,
    name,
    description: "A real product sentence.",
    availability: "available",
    price: "$25.00",
    productType,
    image: { src: `https://cdn.shopify.com/${slug}.jpg`, alt: name },
  };
}

describe("public shop catalog", () => {
  it("hides artwork that is still on hold", () => {
    const held = [...batch1ArtworkHoldHandles][0]!;
    const visible = visibleShopProducts([
      product(held, "Held hoodie"),
      product("keep-waco-wagging-corgi-tote-bag", "Corgi Waco Skyline Tote"),
    ]);
    assert.deepEqual(
      visible.map((item) => item.slug),
      ["keep-waco-wagging-corgi-tote-bag"],
    );
  });

  it("finds a gift card only when Shopify has one", () => {
    const catalog = [
      product("corgi-tote", "Corgi Waco Skyline Tote", "Bags"),
      product("kww-gift-card", "Keep Waco Wagging Gift Card", "Gift Certificate"),
    ];
    assert.equal(findGiftCardProduct(catalog)?.slug, "kww-gift-card");
    assert.equal(findGiftCardProduct(catalog.slice(0, 1)), undefined);
  });
});
