import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/sitemapEntries";
import { canonicalUrl } from "@/lib/metadata";
import { getShopCatalogView } from "@/lib/shopCatalogView";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = buildSitemapEntries();
  try {
    const { allProducts, merch } = await getShopCatalogView();
    const productEntries = allProducts.map((product) => ({
      url: canonicalUrl(`/shop/product/${product.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
    const breedEntries = merch.breeds.map((breed) => ({
      url: canonicalUrl(`/shop/breed/${breed.id}`),
      changeFrequency: "weekly" as const,
      priority: 0.45,
    }));
    const lineEntries = merch.lines.map((line) => ({
      url: canonicalUrl(`/shop/line/${line.id}`),
      changeFrequency: "weekly" as const,
      priority: 0.45,
    }));
    return [...entries, ...lineEntries, ...breedEntries, ...productEntries];
  } catch {
    return entries;
  }
}
