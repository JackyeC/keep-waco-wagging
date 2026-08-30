import type { SourceMetadata } from "./types";

/** Inspectable sources for Dog Match V1. Popularity is informational only. */
export const dogMatchSources: SourceMetadata[] = [
  {
    id: "akc-popular-2025",
    label: "AKC Most Popular Dog Breeds of 2025",
    url: "https://www.akc.org/expert-advice/dog-breeds/most-popular-dog-breeds-2025/",
    notes:
      "Used only for the Top 100 roster and popularity rank display. Rank never enters scoring.",
  },
  {
    id: "akc-most-popular-index",
    label: "AKC Most Popular Breeds index",
    url: "https://www.akc.org/most-popular-breeds/",
    notes: "Confirms the 2025 ranking year and Top 10 context.",
  },
  {
    id: "akc-breed-pages",
    label: "AKC breed pages and characteristic ratings",
    url: "https://www.akc.org/dog-breeds/",
    notes:
      "Energy, barking, shedding, grooming, trainability, and similar published 1–5 characteristic scales are treated as DIRECT when the source actually publishes them. Other lifestyle fields (prey drive, cat compatibility, small-animal caution, alone time, apartment fit, shared-wall risk, novice-owner suitability, training patience needed) are DERIVED from breed descriptions and history — not official AKC ratings. Unknown stays unknown.",
  },
  {
    id: "akc-new-2026",
    label: "AKC newly recognized breeds for 2026",
    url: "https://www.akc.org/expert-advice/dog-breeds/new-akc-recognized-breeds/",
    notes:
      "Russian Tsvetnaya Bolonka, Basset Fauve de Bretagne, and Teddy Roosevelt Terrier are included as New for 2026 and are not assigned a popularity rank.",
  },
  {
    id: "akc-groups",
    label: "AKC breed group listings",
    url: "https://www.akc.org/public-education/resources/why-akc-has-breed-groups/",
    notes: "Group labels (Sporting, Hound, Working, Terrier, Toy, Non-Sporting, Herding).",
  },
];

export const LAST_REVIEWED = "2026-08-29";

export function sourceUrl(id: string): string | undefined {
  return dogMatchSources.find((source) => source.id === id)?.url;
}

export function akcBreedPageUrl(slug: string): string {
  return `https://www.akc.org/dog-breeds/${slug}/`;
}
