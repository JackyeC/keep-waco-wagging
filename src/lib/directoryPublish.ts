import {
  directoryListings,
  getDirectoryListingBySlug,
} from "@/data/directory";
import type { DogDirectoryListing } from "@/lib/types";

const UNPUBLISHABLE = new Set([
  "todo",
  "tbd",
  "n/a",
  "unknown",
  "unconfirmed",
]);

/** True when a directory field is real visitor-facing copy, not a placeholder. */
export function isPublishableDirectoryValue(value?: string): value is string {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;
  if (UNPUBLISHABLE.has(normalized)) return false;
  if (normalized.startsWith("todo ") || normalized.includes("todo verify")) {
    return false;
  }
  return true;
}

/**
 * Related listings for internal linking. Prefer the same category, then the
 * same neighborhood, so detail pages do not all point at the first three
 * rows in the data file.
 */
export function getRelatedDirectoryListings(
  slug: string,
  limit = 3,
): DogDirectoryListing[] {
  const listing = getDirectoryListingBySlug(slug);
  if (!listing) return [];

  const rest = directoryListings.filter((item) => item.slug !== slug);
  const sameCategory = rest.filter((item) => item.category === listing.category);
  const sameNeighborhood = rest.filter(
    (item) =>
      item.category !== listing.category &&
      Boolean(item.neighborhood) &&
      item.neighborhood === listing.neighborhood,
  );
  const others = rest.filter(
    (item) =>
      item.category !== listing.category &&
      item.neighborhood !== listing.neighborhood,
  );

  return [...sameCategory, ...sameNeighborhood, ...others].slice(0, limit);
}
