import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { directoryListings } from "@/data/directory";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/dog-friendly-waco",
    "/weekend",
    "/pet-care",
    "/summer-daycare",
    "/yappy-hours",
    "/shop",
    "/pets",
    "/platinum-scoops",
    "/sponsors",
    "/submit-a-place",
    "/contact",
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
    ...directoryListings.map((l) => ({
      url: `${base}/dog-friendly-waco/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((l) => ({
      url: `${base}/blog/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
