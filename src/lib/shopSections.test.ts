import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { MerchProduct } from "@/data/merchStore";
import { groupShopProducts } from "@/lib/shopSections";
import {
  isMissingStorefrontProductResponse,
  isPublishedStorefrontProduct,
} from "@/lib/shopCatalogRules";

function product(
  slug: string,
  name: string,
  category: MerchProduct["category"] = "apparel",
): MerchProduct {
  return {
    id: slug,
    slug,
    name,
    description: "",
    availability: "available",
    category,
  };
}

describe("shop catalog rules", () => {
  it("keeps published products and drops unpublished ones", () => {
    assert.equal(isPublishedStorefrontProduct({ published_at: "2026-11-24T00:00:00Z" }), true);
    assert.equal(isPublishedStorefrontProduct({ published_at: "  " }), false);
    assert.equal(isPublishedStorefrontProduct({ published_at: null }), false);
    assert.equal(isPublishedStorefrontProduct({}), false);
  });

  it("treats only a 404 as a missing product", () => {
    assert.equal(isMissingStorefrontProductResponse(404), true);
    assert.equal(isMissingStorefrontProductResponse(429), false);
    assert.equal(isMissingStorefrontProductResponse(500), false);
    assert.equal(isMissingStorefrontProductResponse(200), false);
  });

  it("places every product in exactly one shop section", () => {
    const catalog = [
      product("golden-hoodie", "Golden Retriever Hoodie"),
      product("pittie-crewneck", "Pittie Crewneck"),
      product("things-we-do-tee", "Things We Do Tee"),
      product("wag-club-tee", "The Wag Club Tee"),
      product("clip-on-bandana", "Clip-On Bandana", "pet_accessories"),
      product("weekender", "Wag Club Weekender", "bags"),
      product("skyline-mug", "Skyline Mug", "drinkware"),
      product("script-sticker", "Script Sticker", "stickers"),
      product("gift-certificate", "Keep Waco Wagging Gift Certificate", "other"),
    ];

    const groups = groupShopProducts(catalog);
    const seen = groups.flatMap((group) => group.products.map((item) => item.slug));
    assert.deepEqual(seen.sort(), catalog.map((item) => item.slug).sort());
    assert.equal(new Set(seen).size, catalog.length);

    const byId = Object.fromEntries(groups.map((group) => [group.id, group.products.map((item) => item.slug)]));
    assert.deepEqual(byId.hoodies, ["golden-hoodie"]);
    assert.deepEqual(byId.crewnecks, ["pittie-crewneck"]);
    assert.deepEqual(byId.tees, ["things-we-do-tee", "wag-club-tee"]);
    assert.deepEqual(byId.accessories, [
      "clip-on-bandana",
      "weekender",
      "skyline-mug",
      "script-sticker",
    ]);
    assert.deepEqual(byId.more, ["gift-certificate"]);
  });
});
