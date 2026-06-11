import { buildAmazonAffiliateUrl } from "@/lib/site";
import type { ShopProduct } from "@/lib/types";

/**
 * Curated dog gear with Amazon affiliate links.
 * Swap ASINs and copy for products you actually use and recommend.
 */
export const shopProducts: ShopProduct[] = [
  {
    id: "shop-001",
    name: "Ruffwear Front Range Harness",
    summary: "Our go-to everyday harness for Waco walks and patio outings.",
    asin: "B00HQAHSFA",
    category: "Walk",
    whyWeLoveIt:
      "Comfortable, easy to adjust, and holds up to Texas heat. Great for loose-leash training sessions around Cameron Park.",
    featured: true,
  },
  {
    id: "shop-002",
    name: "Kurgo Dog Seat Belt",
    summary: "Keeps your pup secure on drives to trails and vet visits.",
    asin: "B003H9Q4BC",
    category: "Travel",
    whyWeLoveIt:
      "Simple clip-in for car trips across greater Waco — less sliding, more calm arrivals.",
    featured: true,
  },
  {
    id: "shop-003",
    name: "Outward Hound Slow Feeder",
    summary: "Slows fast eaters and adds a little mental enrichment at home.",
    asin: "B00FQTU9H0",
    category: "Home",
    whyWeLoveIt:
      "A small daily win for busy dog parents — especially helpful before training sessions.",
  },
  {
    id: "shop-004",
    name: "Chuckit! Ultra Ball",
    summary: "Durable fetch ball for bark parks and backyard play.",
    asin: "B000F4AVPA",
    category: "Fun",
    whyWeLoveIt:
      "Holds up to enthusiastic retrievers and makes park trips more fun for everyone.",
  },
  {
    id: "shop-005",
    name: "PetSafe Gentle Leader",
    summary: "Head collar option for dogs who pull on neighborhood walks.",
    asin: "B00074H4H6",
    category: "Training",
    whyWeLoveIt:
      "A practical tool we reach for when building loose-leash skills before busy patio season.",
    featured: true,
  },
  {
    id: "shop-006",
    name: "Portable Collapsible Water Bowl",
    summary: "Clip-on bowl for trails, patios, and summer outings.",
    asin: "B07CZPKLJ5",
    category: "Travel",
    whyWeLoveIt:
      "Essential for Waco heat — easy to stash in a bag for weekend wag plans.",
  },
];

export function getShopProducts(): ShopProduct[] {
  return shopProducts;
}

export function getFeaturedShopProducts(): ShopProduct[] {
  return shopProducts.filter((p) => p.featured);
}

export function getShopProductUrl(product: ShopProduct): string {
  return product.href ?? buildAmazonAffiliateUrl(product.asin) ?? "#";
}

export const shopCategories = [
  "All",
  "Walk",
  "Home",
  "Travel",
  "Training",
  "Health",
  "Fun",
] as const;
