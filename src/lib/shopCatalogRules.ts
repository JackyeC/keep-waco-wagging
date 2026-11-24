/**
 * Pure catalog rules. Kept out of the Shopify fetch module so tests do not
 * load Next.js cache APIs.
 */

/** Public `/products.json` omits drafts. A missing publish time is not for sale. */
export function isPublishedStorefrontProduct(product: {
  published_at?: string | null;
}): boolean {
  return typeof product.published_at === "string" && product.published_at.trim().length > 0;
}

/** On-site browse URL for the Black Friday collection. Checkout stays on Shopify. */
export const WAG_FRIDAY_SHOP_PATH = "/shop?promo=wagfriday";
