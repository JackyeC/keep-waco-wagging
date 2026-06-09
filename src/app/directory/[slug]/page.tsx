import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/ListingDetail";
import {
  listings,
  getListingBySlug,
  getNearbyListings,
} from "@/data/listings";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };
  return {
    title: `${listing.name} — Dog-Friendly ${listing.area}`,
    description: listing.dogFriendlyNotes,
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const nearby = getNearbyListings(listing);

  return <ListingDetail listing={listing} nearby={nearby} />;
}
