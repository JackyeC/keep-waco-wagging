/**
 * Founding Wag Club membership copy.
 *
 * Payments are intentionally closed. Interest-list rows use the existing
 * `leads` table with source `wag_club_founding_interest` and do not update
 * older free-list rows.
 *
 * Shirt size is stored in `interests` as `Shirt size: …` because that column
 * already exists. Purchase status, welcome-kit fulfillment, and fulfillment
 * date need new columns before anyone is marked paid. Do not add those
 * columns or charge a card until pricing, policies, product costs, and
 * fulfillment are approved.
 */

export const wagClubMembership = {
  name: "The Wag Club",
  tagline: "Your people. Your dog. Your Waco.",
  supportingLine: "Wear your shirt. Find your people.",
  description:
    "A local club for Waco dog parents who want to make friends, discover new experiences, and enjoy a little something extra with their favorite four-legged companions.",
  priceLabel: "$99 per household",
  priceTerm: "Proposed price for the first year.",
  paymentStatus:
    "Not open for payment. The interest list does not charge you and does not create a paid membership.",
  confirmedToday: [
    "The interest list is open. Submitting it does not charge a card.",
    "Free Wag Watch, local guide, and public event emails stay on a separate list.",
    "A free signup is not converted into a founding membership.",
  ],
  plannedBenefits: [
    "One official Wag Club paw-logo T-shirt per founding household",
    "Welcome kit with Hold On waste bags and a suitable pet-safe spray sample",
    "Private member community",
    "Early event registration",
    "Preferred pricing on eligible events",
    "Member-only social opportunities",
    "Exclusive offers from confirmed local business partners",
    "Birthday recognition",
    "One annual members-only celebration",
    "Eligible introductory benefits from Platinum Scoops",
  ],
  sprayNote:
    "The spray sample is planned only. It will be included after the product is confirmed suitable and labeled for that use. Platinum Fresh yard treatment is not offered here as a consumer spray.",
  scoopsNote:
    "Any Platinum Scoops introductory benefit is still being defined. It is not a change to service pricing, and it is not included until that offer is approved.",
  notIncluded:
    "Meals are not included. An event is not free unless that specific listing says so.",
} as const;
