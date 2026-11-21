import { shopifyStoreConfig } from "@/data/merchStore";

export type ShopifyPage = {
  title: string;
  handle: string;
  bodyHtml: string;
};

export async function fetchShopifyPage(
  handle: string,
): Promise<ShopifyPage | null> {
  const base = shopifyStoreConfig.storefrontUrl;
  if (!base) return null;

  try {
    const res = await fetch(`${base}/pages/${handle}.json`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      page?: { title?: string; handle?: string; body_html?: string };
    };
    const page = data.page;
    if (!page?.title || !page.body_html) return null;
    return {
      title: page.title,
      handle: page.handle || handle,
      bodyHtml: page.body_html,
    };
  } catch {
    return null;
  }
}

/** Shopify page HTML is their copy. Strip active content before rendering it. */
export function sanitizeShopifyHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/<h1(\s|>)/gi, "<h2$1")
    .replace(/<\/h1>/gi, "</h2>");
}
