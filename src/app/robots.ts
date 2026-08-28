import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/brand$` is the internal brand-book page only — do not use `/brand`,
      // which would also block public logo files under `/brand/*.webp`.
      disallow: ["/admin", "/api/", "/brand$", "/approved/sample-"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
