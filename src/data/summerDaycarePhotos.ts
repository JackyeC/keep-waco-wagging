import type { CampClaytonPhoto, DaycareTheme } from "@/data/summerDaycare";

/**
 * Camp Clayton photo library.
 *
 * Theme galleries live on each calendar entry (`theme.photos`).
 * Do not attach a photo to a week unless it is a verified photo from that theme.
 * Do not use Yappy Hour, event, or unrelated stock photos as Camp Clayton proof.
 */

const camp = "/pictures/camp-clayton";

export const campClaytonHeroPhoto: CampClaytonPhoto = {
  src: "/pictures/summer-camp-hero.webp",
  alt: "A dog cooling off in the backyard splash pool at Camp Clayton in China Spring, serving dog families across the Waco area",
  objectPosition: "center 28%",
};

/** Four-photo Life at Camp Clayton collage — home daycare, not events. */
export const campClaytonLifePhotos: [
  CampClaytonPhoto & { label: string },
  CampClaytonPhoto & { label: string },
  CampClaytonPhoto & { label: string },
  CampClaytonPhoto & { label: string },
] = [
  {
    label: "Supervised play",
    src: "/pictures/pool-pack.webp",
    alt: "Dogs playing together around the backyard splash pool at Camp Clayton",
    objectPosition: "18% 58%",
  },
  {
    label: "One-on-one affection",
    src: `${camp}/life-couch-jackye.webp`,
    alt: "Jackye on the couch with three dogs during rest and cuddle time at Camp Clayton",
    objectPosition: "center 42%",
  },
  {
    label: "Puzzles and Kongs",
    src: "/pictures/training-enrichment.webp",
    alt: "A dog working a puzzle feeder during enrichment time at Camp Clayton",
    objectPosition: "right center",
  },
  {
    label: "Calm rest",
    src: `${camp}/life-group-rest.webp`,
    alt: "Dogs resting together on the tile and turf during a quiet break at Camp Clayton",
    objectPosition: "center 60%",
  },
];

export const campClaytonThemePhotos = {
  "Back-to-School Manners Camp": [
    {
      src: `${camp}/school-crayon-bandanas-couch.webp`,
      alt: "Two dogs on the couch wearing crayon-striped bandanas at Camp Clayton",
      objectPosition: "center 32%",
    },
    {
      src: `${camp}/school-crayon-bandana-close.webp`,
      alt: "A dog wearing a yellow crayon-striped bandana at Camp Clayton",
      objectPosition: "center 28%",
    },
    {
      src: `${camp}/school-crayon-bandana-yard.webp`,
      alt: "A dog in a yellow crayon-striped bandana resting in the yard with a tennis ball",
      objectPosition: "center 40%",
    },
    {
      src: `${camp}/school-first-day-chalkboard.webp`,
      // Board is dated 8/14/26 (Wag-a-thon week) but the crayon bandana and
      // first-day school board match Back-to-School; keep it here until confirmed.
      alt: "A dog in a red crayon-striped bandana beside a First Day of Wagging Class chalkboard",
      objectPosition: "center 40%",
    },
  ],
  "Luau Week": [
    {
      src: `${camp}/luau-two-dogs-beach.webp`,
      alt: "Two dogs in tropical leis and luau headbands at Camp Clayton",
      objectPosition: "center 42%",
    },
    {
      src: `${camp}/luau-black-lab-lei.webp`,
      alt: "A black dog wearing a lei, flowers, and a flamingo headband for Luau Week",
      objectPosition: "center 28%",
    },
    {
      src: `${camp}/luau-tan-dog-palms.webp`,
      alt: "A tan and white dog wearing a lei and palm-tree headband for Luau Week",
      objectPosition: "center 30%",
    },
    {
      src: `${camp}/luau-doodle-flamingo.webp`,
      alt: "A black doodle in a lei and flamingo headband against a beach backdrop",
      objectPosition: "center 55%",
    },
    {
      src: `${camp}/luau-pineapple-glasses.webp`,
      alt: "A small dog in a tropical bandana and pineapple headband for Luau Week",
      objectPosition: "center 32%",
    },
    {
      src: `${camp}/luau-polka-lei.webp`,
      alt: "A tan and white dog wearing a lei and red polka-dot luau outfit",
      objectPosition: "center 28%",
    },
    {
      src: `${camp}/luau-hawaiian-shirt.webp`,
      alt: "A dog being dressed in a Hawaiian shirt during Luau Week at Camp Clayton",
      objectPosition: "center 62%",
    },
  ],
  "Tailgate Week": [
    {
      src: `${camp}/tailgate-football-booth.webp`,
      alt: "Two dogs in front of a football stadium photo backdrop during Tailgate Week at Camp Clayton",
      objectPosition: "center 38%",
    },
  ],
} as const satisfies Record<string, CampClaytonPhoto[]>;

export function getThemeGallery(theme: DaycareTheme): CampClaytonPhoto[] {
  if (theme.photos && theme.photos.length > 0) return theme.photos;
  const named =
    campClaytonThemePhotos[
      theme.name as keyof typeof campClaytonThemePhotos
    ];
  return named ? [...named] : [];
}
