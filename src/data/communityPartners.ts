import type { CommunityPartner, SponsorTier } from "@/lib/types";
import { cityConfig } from "@/lib/site";

/** All sponsor tier labels — used in forms and partner cards. */
export const sponsorTiers: SponsorTier[] = [
  "Presenting Sponsor",
  "Weekly Camp Sponsor",
  "Photo Booth Sponsor",
  "Treat Sponsor",
  "Community Partner",
];

/**
 * Verified community partners shown on /book, camp pages, and /sponsors.
 * Add new entries here as sponsorships are confirmed.
 */
export const communityPartners: CommunityPartner[] = [
  {
    id: "platinum-scoops",
    sponsorName: cityConfig.sponsor.name,
    sponsorLogo: cityConfig.sponsor.logo,
    sponsorTier: "Presenting Sponsor",
    sponsorUrl: cityConfig.sponsor.website,
    sponsorDescription:
      "Waco pet waste removal and pet care services helping keep yards clean and dogs happy.",
  },
];
