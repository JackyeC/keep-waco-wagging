/**
 * Keep Waco Wagging merchandise — Shopify storefront configuration.
 *
 * Checkout, payment, and fulfillment happen on Shopify. This file is the
 * single source of truth for storefront URL, shop status, and live products.
 *
 * Owner setup:
 * 1. Set `storefrontUrl` when the Shopify store is live (e.g. shop.keepwacowagging.com).
 * 2. Set `enabled: true` after the storefront URL is verified.
 * 3. Add products to `liveMerchProducts` with Shopify images, prices, and product URLs.
 */

export type MerchAvailability = "available" | "coming_soon";

export type MerchProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Shopify product image or owner-approved creative — required when available. */
  image?: { src: string; alt: string };
  /** Customer-facing price from the Shopify listing, e.g. "$24.99". */
  price?: string;
  sizesOrColorsNote?: string;
  /** Individual Shopify product page URL — required when available. */
  shopifyProductUrl?: string;
  availability: MerchAvailability;
  featured?: boolean;
};

/** Internal planning concepts — never rendered on the public site. */
export const proposedMerchConcepts = [
  { id: "concept-keep-waco-wagging", name: "Keep Waco Wagging" },
  { id: "concept-waco-dog-mom", name: "Waco Dog Mom" },
  { id: "concept-waco-dog-dad", name: "Waco Dog Dad" },
  { id: "concept-my-dog-goes-to-camp", name: "My Dog Goes to Camp" },
  { id: "concept-scoop-happens", name: "Scoop Happens" },
] as const;

export const shopifyStoreConfig = {
  /**
   * Set to true only after `storefrontUrl` is live and at least one product is ready.
   * While false, the shop stays in preview with a “Merch coming soon” state.
   */
  enabled: false,
  /** Preferred custom domain — confirm matches your live Shopify domain. */
  preferredDomain: "shop.keepwacowagging.com",
  /**
   * Full Shopify storefront URL. Example when live:
   * `https://shop.keepwacowagging.com`
   */
  storefrontUrl: null as string | null,
  fulfillmentNote:
    "Products are made to order and fulfilled through our merchandise partner. Shipping details are shown at checkout.",
  externalCheckoutNote:
    "Checkout happens on our Shopify store — you will leave keepwacowagging.com to complete your order.",
} as const;

/** Live Shopify products — add rows here when images, prices, and URLs are ready. */
export const liveMerchProducts: readonly MerchProduct[] = [];

function isPurchasable(product: MerchProduct): boolean {
  return (
    product.availability === "available" &&
    Boolean(product.shopifyProductUrl?.trim()) &&
    Boolean(product.image?.src) &&
    Boolean(product.price?.trim())
  );
}

export function getShopifyStorefrontUrl(): string | null {
  const url = shopifyStoreConfig.storefrontUrl?.trim();
  return url || null;
}

export function isMerchStoreLive(): boolean {
  if (!shopifyStoreConfig.enabled) return false;
  return liveMerchProducts.some(isPurchasable);
}

export function getPurchasableMerchProducts(): MerchProduct[] {
  return liveMerchProducts.filter(isPurchasable);
}

export function getFeaturedMerchProducts(limit = 5): MerchProduct[] {
  const purchasable = getPurchasableMerchProducts();
  const featured = purchasable.filter((p) => p.featured);
  const source = featured.length > 0 ? featured : purchasable;
  return source.slice(0, limit);
}

export function hasMerchStorefrontUrl(): boolean {
  return Boolean(getShopifyStorefrontUrl());
}
