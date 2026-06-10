import type { Ad, AdPlacement } from "@/lib/types";
import { ctas } from "@/lib/site";

/**
 * Ad / sponsor placements.
 *
 * - Platinum Scoops is the always-on presenting sponsor.
 * - Add paid sponsor units with `active: true`, copy, link, and placements.
 * - Empty placements show a house ad inviting businesses to advertise.
 */
export const ads: Ad[] = [
  {
    id: "ad-platinum-scoops",
    sponsor: "Platinum Scoops",
    title: "Cleaner yards, calmer routines",
    body: "Platinum Scoops handles pet waste removal and yard care across greater Waco — the presenting sponsor of Keep Waco Wagging.",
    href: "/platinum-scoops",
    label: "Presenting Sponsor",
    placements: ["home", "directory-sidebar", "blog-sidebar", "weekend", "pets", "shop"],
    active: true,
    priority: 100,
  },
  {
    id: "ad-rover",
    sponsor: "Rover",
    title: "Trusted Waco dog sitting & walking",
    body: "Book Jacky on Rover for sitting, walking, and drop-in visits across the Waco area.",
    href: ctas.bookRover.href,
    label: "Sponsored",
    placements: ["home", "shop", "weekend"],
    active: true,
    priority: 50,
  },
  {
    id: "ad-example-local-vet",
    sponsor: "Your Waco Business",
    title: "Reach local dog parents here",
    body: "This premium slot is available for a Waco-area pet business. Get in front of engaged local dog owners.",
    href: "/sponsors",
    label: "Sponsored",
    placements: ["directory-sidebar"],
    active: false,
    priority: 10,
  },
];

/** Returns the highest-priority active ad for a placement, if any. */
export function getAdForPlacement(placement: AdPlacement): Ad | undefined {
  return ads
    .filter((a) => a.active && a.placements.includes(placement))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
}
