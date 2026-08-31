import type { DaycareMonth } from "@/data/summerDaycare";
import { sitePhotos } from "@/data/sitePhotos";
import { ctas } from "@/lib/site";

export type DaycarePhoto = {
  src: string;
  alt: string;
};

/** Month banner images where we have strong real-photo coverage. */
export const daycareMonthPhotos: Partial<Record<DaycareMonth, DaycarePhoto>> = {
  June: sitePhotos.summerMonths.june,
  July: sitePhotos.summerMonths.july,
  August: sitePhotos.summerMonths.august,
};

/**
 * Per-week photos pulled from the site library — matches themes where possible.
 * Weeks without a strong real-photo match intentionally render as text-first cards.
 */
export const daycareThemePhotos: Record<number, DaycarePhoto> = {
  1: sitePhotos.summerCamp,
  2: {
    src: "/pictures/library/boarding-backyard-img-5285.webp",
    alt: "Dogs lounging in a shaded backyard during a sniff-and-snack camp week",
  },
  3: sitePhotos.training,
  4: {
    src: "/pictures/library/freddie-img-4786.webp",
    alt: "Dog paddling in a shallow splash pool during Beach Bums week",
  },
  5: sitePhotos.boardingDogs,
  6: {
    src: "/pictures/library/img-4814.webp",
    alt: "Dog enjoying a festive treat during Christmas in July camp week",
  },
  7: sitePhotos.yappyHoursCard,
  8: {
    src: "/pictures/library/training-stella-puzzlw.webp",
    alt: "Dog working a sniff-and-seek enrichment puzzle indoors",
  },
  9: sitePhotos.boardingHome,
  10: {
    src: "/pictures/library/freddie-img-4910.webp",
    alt: "Happy dog ready for a mini photo session during Hollywoof week",
  },
  11: sitePhotos.hero,
  12: {
    src: "/pictures/library/hero-stella-diesel-walkies.webp",
    alt: "Dogs practicing leash manners on a summer walk in Waco",
  },
  13: sitePhotos.yappyHours,
};

/** Quick links for families who want more photos, care details, or booking. */
export const summerPhotoExploreLinks = [
  {
    label: "Meet the dogs on the Wagging Wall",
    href: "/pets",
    description: "More real Waco pups from our scooping and daycare families.",
  },
  {
    label: "Boarding & daycare details",
    href: "/pet-care",
    description: "Home routines, services, and what a typical day looks like.",
  },
  {
    label: "Yappy Hours & meetups",
    href: "/yappy-hours",
    description: "Backyard socials and dog-friendly patio hangs around Waco.",
  },
  {
    label: "Reserve Camp Waco days on Rover",
    href: ctas.bookPetCare.href,
    description: "Check open dates and request your dog's spot.",
    external: ctas.bookPetCare.href.startsWith("http"),
  },
] as const;
