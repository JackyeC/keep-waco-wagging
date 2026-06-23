import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { directoryListings } from "@/data/directory";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes: { route: string; priority: number }[] = [
    { route: "", priority: 1 },
    { route: "/book", priority: 0.95 },
    { route: "/platinum-scoops", priority: 0.9 },
    { route: "/pet-care", priority: 0.9 },
    { route: "/training", priority: 0.85 },
    { route: "/pet-care/weddings-events", priority: 0.85 },
    { route: "/summer-daycare", priority: 0.85 },
    { route: "/dog-friendly-waco", priority: 0.75 },
    { route: "/contact", priority: 0.75 },
    { route: "/about", priority: 0.7 },
    { route: "/weekend", priority: 0.6 },
    { route: "/yappy-hours", priority: 0.6 },
    { route: "/blog", priority: 0.55 },
    { route: "/gear-guide", priority: 0.55 },
    { route: "/shop", priority: 0.45 },
    { route: "/pets", priority: 0.4 },
    { route: "/sponsors", priority: 0.4 },
    { route: "/submit-a-place", priority: 0.4 },
    { route: "/affiliate-disclosure", priority: 0.3 },
  ];

  const now = new Date();

  return [
    ...staticRoutes.map(({ route, priority }) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...directoryListings.map((l) => ({
      url: `${base}/dog-friendly-waco/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
