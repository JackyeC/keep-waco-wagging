import { partnershipInterestTypes } from "@/data/partnerships";

const INTERESTS = new Set<string>(partnershipInterestTypes);

export function isPartnershipInterest(value: string): boolean {
  return INTERESTS.has(value);
}

/**
 * Notes column on the existing sponsor_inquiries table.
 * Source is written here because that table has no source column.
 */
export function formatPartnershipNotes(perk: string, details: string): string {
  return [
    "Source: /sponsors",
    "Program: partnership inquiry",
    `Proposed member perk or sponsorship interest: ${perk || "—"}`,
    `Additional details: ${details || "—"}`,
  ].join("\n");
}
