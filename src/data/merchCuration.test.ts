import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { MerchProduct } from "@/data/merchStore";
import {
  curateCatalog,
  getCharmDisplayPrice,
  pickFeaturedProducts,
} from "@/data/merchCuration";

function product(slug: string, name: string): MerchProduct {
  return {
    id: slug,
    slug,
    name,
    description: "",
    availability: "available",
    shopifyProductUrl: `https://example.com/products/${slug}`,
    price: "$23.75",
  };
}

describe("merchCuration", () => {
  it("rounds display prices to charm tiers", () => {
    assert.equal(
      getCharmDisplayPrice(product("x", "Keep Waco Wagging — Rescue Mutt Hoodie")),
      "$57.99",
    );
    assert.equal(
      getCharmDisplayPrice(product("waco-dog-mom-tee", "Waco Dog Mom Tee")),
      "$27.99",
    );
    assert.equal(
      getCharmDisplayPrice(product("keep-waco-wagging-ceramic-mug", "Ceramic Mug")),
      "$17.99",
    );
  });

  it("filters excluded duplicate handles", () => {
    const catalog = curateCatalog([
      product("waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt", "Waco Dog Mom Tee"),
      product("waco-dog-mom-t-shirt", "Waco Dog Mom T-Shirt duplicate"),
    ]);
    assert.equal(catalog.length, 1);
    assert.equal(catalog[0]!.slug, "waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt");
  });

  it("orders featured products by curated handle list", () => {
    const catalog = curateCatalog([
      product("keep-waco-wagging-ceramic-mug", "Mug"),
      product("waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt", "Dog Mom"),
    ]);
    const featured = pickFeaturedProducts(catalog, 2);
    assert.equal(featured[0]!.slug, "waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt");
    assert.equal(featured[1]!.slug, "keep-waco-wagging-ceramic-mug");
  });
});
