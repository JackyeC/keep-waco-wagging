import { ctas } from "@/lib/site";

/** Cross-links from the shop page to care, camp, and community content. */
export const shopExploreLinks = [
  {
    label: "Summer daycare camp",
    href: "/summer-daycare",
    description: "Themed weeks use lick mats, puzzles, and enrichment we recommend here.",
  },
  {
    label: "Boarding & daycare",
    href: "/pet-care",
    description: "Crates, washable bedding, and calm routines for home-based care.",
  },
  {
    label: "Yappy Hours",
    href: "/yappy-hours",
    description: "Walking gear and travel basics for patio meetups around Waco.",
  },
  {
    label: "Wagging Wall",
    href: "/pets",
    description: "Meet the dogs who test our favorite gear in real Waco yards.",
  },
  {
    label: "Platinum Scoops yard cleanup",
    href: "/platinum-scoops",
    description: "Enzyme cleaners and poop bags pair well with a cleaner yard routine.",
  },
  {
    label: "Reserve pet care on Rover",
    href: ctas.bookPetCare.href,
    description: "Book boarding, daycare, or drop-ins with Jackye and Todd.",
    external: ctas.bookPetCare.href.startsWith("http"),
  },
] as const;
