import type { MetadataRoute } from "next";
import { getIndexableApprovedListings } from "@/data/approvedListings";
import { getIndexablePosts } from "@/data/blog";
import { directoryListings } from "@/data/directory";
import { getPublishedWagWatch } from "@/data/wagWatch";
import { canonicalUrl } from "@/lib/metadata";

type SitemapRow = MetadataRoute.Sitemap[number];

/**
 * Public pages worth asking Google to crawl. Utility forms and legal pages
 * stay reachable (and can keep canonicals) but are omitted so they do not
 * compete with service, directory, and guide URLs for crawl attention.
 */
const INDEXABLE_STATIC_ROUTES: {
  route: string;
  priority: number;
  changeFrequency: NonNullable<SitemapRow["changeFrequency"]>;
}[] = [
  { route: "/", priority: 1, changeFrequency: "weekly" },
  { route: "/wagclub", priority: 0.95, changeFrequency: "weekly" },
  { route: "/dog-care", priority: 0.95, changeFrequency: "weekly" },
  { route: "/book", priority: 0.95, changeFrequency: "weekly" },
  { route: "/approved", priority: 0.9, changeFrequency: "weekly" },
  { route: "/wag-watch", priority: 0.75, changeFrequency: "weekly" },
  { route: "/work-with-us", priority: 0.4, changeFrequency: "monthly" },
  { route: "/platinum-scoops", priority: 0.9, changeFrequency: "weekly" },
  { route: "/pet-care", priority: 0.9, changeFrequency: "weekly" },
  { route: "/dog-boarding-waco-tx", priority: 0.92, changeFrequency: "weekly" },
  { route: "/dog-daycare-waco-tx", priority: 0.92, changeFrequency: "weekly" },
  { route: "/training", priority: 0.85, changeFrequency: "weekly" },
  { route: "/pet-care/weddings-events", priority: 0.85, changeFrequency: "weekly" },
  { route: "/camp-waco", priority: 0.85, changeFrequency: "weekly" },
  { route: "/dog-friendly-waco", priority: 0.75, changeFrequency: "weekly" },
  { route: "/new-dog-in-waco", priority: 0.8, changeFrequency: "monthly" },
  { route: "/dog-match", priority: 0.82, changeFrequency: "monthly" },
  { route: "/dog-match/how-we-match", priority: 0.5, changeFrequency: "monthly" },
  { route: "/contact", priority: 0.75, changeFrequency: "monthly" },
  { route: "/about", priority: 0.7, changeFrequency: "monthly" },
  { route: "/weekend", priority: 0.7, changeFrequency: "weekly" },
  { route: "/yappy-hours", priority: 0.6, changeFrequency: "weekly" },
  { route: "/blog", priority: 0.55, changeFrequency: "weekly" },
  { route: "/gear-guide", priority: 0.55, changeFrequency: "monthly" },
  { route: "/shop", priority: 0.45, changeFrequency: "weekly" },
  { route: "/waco-wag-club", priority: 0.45, changeFrequency: "monthly" },
  { route: "/sponsors", priority: 0.4, changeFrequency: "monthly" },
];

const SITEMAP_EXCLUDED_PATHS = [
  "/privacy",
  "/affiliate-disclosure",
  "/submit-a-place",
  "/pets",
  "/brand",
  "/admin",
] as const;

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function entry(
  path: string,
  extras: Omit<SitemapRow, "url">,
): SitemapRow {
  const row: SitemapRow = {
    url: canonicalUrl(path),
    ...extras,
  };
  return row;
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const staticEntries = INDEXABLE_STATIC_ROUTES.map(
    ({ route, priority, changeFrequency }) =>
      entry(route, { changeFrequency, priority }),
  );

  const directoryEntries = directoryListings.map((listing) => {
    const lastModified = parseDate(listing.lastVerified);
    return entry(`/dog-friendly-waco/${listing.slug}`, {
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  const blogEntries = getIndexablePosts().map((post) => {
    const lastModified = parseDate(post.updated ?? post.date);
    return entry(`/blog/${post.slug}`, {
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  });

  const wagWatchEntries = getPublishedWagWatch().map((item) => {
    const lastModified = parseDate(item.updatedDate ?? item.publishedDate);
    return entry(`/wag-watch/${item.slug}`, {
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  const approvedEntries = getIndexableApprovedListings().map((listing) => {
    const lastModified = parseDate(
      listing.verifiedDate ?? listing.researchedDate,
    );
    return entry(`/approved/${listing.slug}`, {
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return [
    ...staticEntries,
    ...directoryEntries,
    ...blogEntries,
    ...wagWatchEntries,
    ...approvedEntries,
  ];
}

export function sitemapExcludedPaths(): readonly string[] {
  return SITEMAP_EXCLUDED_PATHS;
}
