import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { MerchProduct } from "@/data/merchStore";
import {
  breedFromCatalog,
  buildMerchMerchandising,
  productForBreedOnLine,
} from "@/lib/merchLines";

function product(partial: {
  slug: string;
  name: string;
  price?: string;
  tags?: string[];
  productType?: string;
}): MerchProduct {
  return {
    id: partial.slug,
    slug: partial.slug,
    name: partial.name,
    description: "A real product sentence.",
    availability: "available",
    price: partial.price ?? "$25.00",
    tags: partial.tags ?? [],
    productType: partial.productType,
    image: {
      src: `https://cdn.shopify.com/${partial.slug}.jpg`,
      alt: partial.name,
    },
  };
}

describe("breed lines from catalog tags", () => {
  const catalog = [
    product({
      slug: "corgi-tote",
      name: "Corgi Waco Skyline Tote",
      tags: ["Breed: Corgi", "Product Type: Tote"],
      productType: "Bags",
    }),
    product({
      slug: "aussie-tote",
      name: "Australian Shepherd Waco Skyline Tote",
      price: "$28.00",
      tags: ["Breed: Australian Shepherd", "Product Type: Tote"],
      productType: "Bags",
    }),
    product({
      slug: "corgi-hoodie",
      name: "Corgi Waco Skyline Hoodie",
      price: "$58.00",
      tags: ["Breed: Corgi", "Product Type: Hoodie"],
      productType: "Hoodie",
    }),
    product({
      slug: "aussie-hoodie",
      name: "Australian Shepherd Waco Skyline Hoodie",
      price: "$58.00",
      tags: ["Breed: Australian Shepherd", "Product Type: Hoodie"],
      productType: "Hoodie",
    }),
    product({
      slug: "good-dog",
      name: "Good Dog. Good Town. Tee",
      price: "$34.99",
      tags: ["Product Type: T-Shirt"],
      productType: "T-Shirt",
    }),
    product({
      slug: "golden-mug",
      name: "Golden Retriever Waco Skyline Mug",
      price: "$18.00",
      tags: ["Breed: Golden Retriever", "Product Type: Mug"],
      productType: "Mug",
    }),
    product({
      slug: "weekender",
      name: "The Wag Club Weekender",
      price: "$51.68",
      tags: ["Breed: Corgi"],
      productType: "Bags",
    }),
  ];

  const merch = buildMerchMerchandising(catalog);

  it("collapses matching breed products into one card per line", () => {
    assert.deepEqual(
      merch.lines.map((line) => line.id),
      ["waco-skyline-hoodie", "waco-skyline-tote"],
    );
    assert.equal(merch.lines[1]!.label, "Waco Skyline Tote");
    assert.equal(merch.lines[1]!.products.length, 2);
    assert.equal(merch.lines[1]!.breeds.length, 2);
  });

  it("does not fold a different design into the skyline line", () => {
    const withOddTee = buildMerchMerchandising([
      ...catalog,
      product({
        slug: "walks",
        name: "Walks, Treats and Waco Streets Tee",
        price: "$19.23",
        tags: ["Breed: Rescue Mutt", "Product Type: T-Shirt"],
        productType: "T-Shirt",
      }),
      product({
        slug: "corgi-tee",
        name: "Corgi Waco Skyline Tee",
        price: "$25.00",
        tags: ["Breed: Corgi", "Product Type: T-Shirt"],
        productType: "T-Shirt",
      }),
      product({
        slug: "aussie-tee",
        name: "Australian Shepherd Waco Skyline Tee",
        price: "$25.00",
        tags: ["Breed: Australian Shepherd", "Product Type: T-Shirt"],
        productType: "T-Shirt",
      }),
    ]);
    assert.equal(
      withOddTee.lines.some((line) => line.products.some((item) => item.slug === "walks")),
      false,
    );
    assert.equal(
      withOddTee.singles.some((item) => item.slug === "walks"),
      true,
    );
    assert.equal(
      withOddTee.lines.find((line) => line.id === "waco-skyline-tee")?.priceLabel,
      "$25.00",
    );
  });

  it("keeps unique designs, lone breed items, and weekenders as singles", () => {
    assert.deepEqual(
      merch.singles.map((item) => item.slug).sort(),
      ["golden-mug", "good-dog", "weekender"],
    );
  });

  it("lists only breeds that have a Breed tag", () => {
    assert.deepEqual(
      merch.breeds.map((breed) => breed.id),
      ["australian-shepherd", "corgi", "golden-retriever"],
    );
    assert.equal(breedFromCatalog(catalog[5]!)?.label, "Golden Retriever");
    assert.equal(
      merch.breeds.some((breed) => breed.id === "labrador"),
      false,
    );
  });

  it("prices a line from the real variant prices", () => {
    const tote = merch.lines.find((line) => line.id === "waco-skyline-tote");
    assert.equal(tote?.priceLabel, "From $25.00");
    assert.equal(
      merch.lines.find((line) => line.id === "waco-skyline-hoodie")?.priceLabel,
      "$58.00",
    );
  });

  it("picks one product when a breed is chosen on a line", () => {
    const tote = merch.lines.find((line) => line.id === "waco-skyline-tote")!;
    assert.equal(productForBreedOnLine(tote, "corgi")?.slug, "corgi-tote");
    assert.equal(productForBreedOnLine(tote, "labrador"), undefined);
  });
});
