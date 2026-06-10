import type { ScoopsService } from "@/lib/types";

/**
 * Platinum Scoops service previews shown on the sponsor page.
 * TODO: confirm exact service names, scope, and booking links with Platinum Scoops.
 */
export const scoopsServices: ScoopsService[] = [
  {
    id: "ps-001",
    name: "Weekly Pet Waste Removal",
    summary:
      "Reliable, on-schedule scooping that keeps your yard consistently clean all week.",
    icon: "calendarCheck",
  },
  {
    id: "ps-002",
    name: "Every-Other-Week Scooping",
    summary:
      "A budget-friendly cadence for smaller yards or lighter cleanup needs.",
    icon: "calendar",
  },
  {
    id: "ps-003",
    name: "Pre-Party Yard Prep",
    summary:
      "Get your yard guest-ready before a cookout, birthday, or weekend gathering.",
    icon: "party",
  },
  {
    id: "ps-004",
    name: "OSO Fresh Yard Refresh",
    summary:
      "Odor support and a deep refresh to keep your dog's space smelling clean.",
    icon: "sparkles",
  },
  {
    id: "ps-005",
    name: "Lifestyle Dog Training Assessment",
    summary:
      "Pair a cleaner yard with calmer routines — start with a training assessment.",
    icon: "training",
    href: "/pet-care",
  },
];
