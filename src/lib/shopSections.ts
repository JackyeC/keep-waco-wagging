import type { MerchProduct } from "@/data/merchStore";

export type ShopSectionId = "hoodies" | "crewnecks" | "tees" | "accessories" | "more";

const SECTION_ORDER: ShopSectionId[] = [
  "hoodies",
  "crewnecks",
  "tees",
  "accessories",
  "more",
];

export const shopSectionMeta: Record<ShopSectionId, { label: string }> = {
  hoodies: { label: "Hoodies" },
  crewnecks: { label: "Crewnecks" },
  tees: { label: "Tees" },
  accessories: { label: "Accessories" },
  more: { label: "More" },
};

export function sectionForProduct(product: MerchProduct): ShopSectionId {
  const text = `${product.slug} ${product.name}`.toLowerCase();
  if (text.includes("hoodie")) return "hoodies";
  if (text.includes("crewneck") || text.includes("sweatshirt")) return "crewnecks";
  if (
    /tee|t-shirt|shirt/.test(text) &&
    !/hoodie|sweatshirt|mug|tote|hat|bandana/.test(product.slug)
  ) {
    return "tees";
  }
  if (
    product.category === "bags" ||
    product.category === "drinkware" ||
    product.category === "stickers" ||
    product.category === "pet_accessories"
  ) {
    return "accessories";
  }
  return "more";
}

/** Every product lands in exactly one section. Nothing is capped or dropped. */
export function groupShopProducts(products: MerchProduct[]): {
  id: ShopSectionId;
  label: string;
  products: MerchProduct[];
}[] {
  const buckets: Record<ShopSectionId, MerchProduct[]> = {
    hoodies: [],
    crewnecks: [],
    tees: [],
    accessories: [],
    more: [],
  };

  for (const product of products) {
    buckets[sectionForProduct(product)].push(product);
  }

  return SECTION_ORDER.filter((id) => buckets[id].length > 0).map((id) => ({
    id,
    label: shopSectionMeta[id].label,
    products: buckets[id],
  }));
}
