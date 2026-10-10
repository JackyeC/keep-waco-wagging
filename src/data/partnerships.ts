/**
 * Partnership proposals. These prices are not checkout products.
 * Keep Waco Wagging Approved stays editorial and cannot be purchased.
 */

export const memberBenefitProgram = {
  name: "Member Benefit Partners",
  price: "Free to start",
  summary:
    "A local business offers Wag Club members a perk — a discount, a sample, or a members-only window. The partnership is free at the start and still needs approval.",
  rules: [
    "No confirmed partner offers are listed until a business is approved.",
    "A perk has to be something the business can actually honor.",
    "Sponsored mentions are labeled.",
    "A partnership does not buy a Keep Waco Wagging Approved recommendation.",
  ],
} as const;

export const eventSponsorTiers = [
  {
    id: "community-supporter",
    name: "Community Supporter",
    price: "$50 per event",
    note: "Proposed. Not available for checkout.",
  },
  {
    id: "presenting-sponsor",
    name: "Presenting Sponsor",
    price: "$150 per event",
    note: "Proposed. Not available for checkout.",
  },
  {
    id: "season-sponsor",
    name: "Season Sponsor",
    price: "$400 for three events",
    note: "Proposed. Not available for checkout.",
  },
] as const;

/** Values stored in sponsor_inquiries.sponsor_type. Kept under 80 characters. */
export const partnershipInterestTypes = [
  "Member Benefit Partner",
  "Community Supporter — $50/event (proposed)",
  "Presenting Sponsor — $150/event (proposed)",
  "Season Sponsor — $400 for 3 events (proposed)",
  "Camp or directory placement",
  "Something else",
] as const;

export type PartnershipInterestType = (typeof partnershipInterestTypes)[number];
