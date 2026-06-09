import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { listings } from "@/data/listings";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/directory",
    "/weekend",
    "/training",
    "/shop",
    "/pets",
    "/platinum-scoops",
    "/spotlights",
    "/get-listed",
    "/blog",
    "/about",
    "/affiliate-disclosure",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...listings.map((l) => ({
      url: `${base}/directory/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
