import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/brand$` is the internal brand-book page only — do not use `/brand`,
      // which would also block public logo files under `/brand/*.webp`.
      // `/quote` is the internal boarding calculator (direct URL only).
      disallow: ["/admin", "/api/", "/brand$", "/approved/sample-", "/quote"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
