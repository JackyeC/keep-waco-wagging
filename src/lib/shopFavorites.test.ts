import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { MerchProduct } from "@/data/merchStore";
import {
  resolveShopFavorites,
  resolveShopHero,
  shopFavoritePicks,
  shopHeroPick,
} from "@/lib/shopFavorites";
import {
  isPlaceholderDogImage,
  placeholderDogImageIds,
} from "@/lib/shopImagePolicy";

function product(partial: Partial<MerchProduct> & { slug: string; name: string }): MerchProduct {
  return {
    id: partial.slug,
    description: "A real product sentence.",
    availability: "available",
    price: "$25.00",
    image: { src: `https://cdn.shopify.com/${partial.slug}.jpg`, alt: partial.name },
    ...partial,
  };
}

describe("shop favorites", () => {
  it("uses real product photos and skips mugs and mockup dogs", () => {
    const bandana = shopFavoritePicks[0];
    const products = [
      product({
        slug: "keep-waco-wagging-ceramic-mug",
        name: "Golden Retriever Waco Skyline Mug",
        productType: "Mug",
      }),
      product({
        slug: bandana.handle,
        name: shopFavoritePicks[0].alt,
        gallery: [
          {
            src: `https://cdn.shopify.com/${placeholderDogImageIds[0]}_2048.jpg`,
            alt: "mockup dog",
          },
          {
            src: `https://cdn.shopify.com/${bandana.imageMatch}_2048.jpg`,
            alt: "bandana",
          },
        ],
      }),
    ];
    const favorites = resolveShopFavorites(products);
    assert.equal(favorites.length, 1);
    assert.equal(favorites[0]?.product.slug, bandana.handle);
    assert.match(favorites[0]?.src ?? "", new RegExp(bandana.imageMatch));
    assert.equal(favorites.some((item) => /mug/i.test(item.product.name)), false);
    assert.equal(favorites.some((item) => isPlaceholderDogImage(item.src)), false);
  });

  it("keeps the hero photo off the favorites row", () => {
    const hero = product({
      slug: shopHeroPick.handle,
      name: "The Wag Club Tee",
      gallery: [
        {
          src: `https://cdn.shopify.com/${shopHeroPick.imageMatch}_2048.jpg`,
          alt: "hoodie",
        },
      ],
    });
    const favorites = shopFavoritePicks.map((pick) =>
      product({
        slug: pick.handle,
        name: pick.alt,
        image: {
          src: `https://cdn.shopify.com/${pick.imageMatch}_2048.jpg`,
          alt: pick.alt,
        },
      }),
    );
    const resolvedHero = resolveShopHero([hero, ...favorites]);
    const resolvedFavorites = resolveShopFavorites([hero, ...favorites]);
    assert.equal(resolvedHero?.product.slug, shopHeroPick.handle);
    assert.equal(
      resolvedFavorites.some((item) => item.product.slug === shopHeroPick.handle),
      false,
    );
    assert.equal(resolvedFavorites.length, shopFavoritePicks.length);
    const featured = [shopHeroPick.handle, ...shopFavoritePicks.map((pick) => pick.handle)];
    assert.equal(featured.some((handle) => handle.includes("things-we-do")), false);
    assert.equal(new Set(featured).size, featured.length);
  });

  it("flags the print-on-demand dog mockups", () => {
    assert.equal(
      isPlaceholderDogImage("https://cdn.shopify.com/1395157564009763970_2048.jpg"),
      true,
    );
    assert.equal(isPlaceholderDogImage("https://cdn.shopify.com/bandana.jpg"), false);
  });
});