/** Shopify's CDN already resizes; skip Next's optimizer (it can send attachment). */
export function shopifySizedSrc(src: string, width: number): string {
  try {
    const url = new URL(src);
    if (url.hostname.endsWith("shopify.com")) {
      url.searchParams.set("width", String(width));
    }
    return url.toString();
  } catch {
    return src;
  }
}
