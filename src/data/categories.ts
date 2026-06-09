import type { CategoryItem, DirectoryCategory } from "@/lib/types";

/**
 * Quick-category cards used on the homepage and as a content map.
 * Icon keys map to lucide-react icons in components/ui/Icon.tsx.
 */
export const quickCategories: CategoryItem[] = [
  {
    label: "Patios",
    description: "Dog-friendly bites & brews where your pup is welcome.",
    href: "/directory?category=Dog-Friendly%20Patios",
    icon: "patio",
  },
  {
    label: "Parks + Trails",
    description: "Green space, shade, and room to sniff around Waco.",
    href: "/directory?category=Parks",
    icon: "park",
  },
  {
    label: "Events",
    description: "Local happenings where dogs are part of the fun.",
    href: "/directory?category=Events",
    icon: "calendar",
  },
  {
    label: "Training",
    description: "Real-life skills for calmer walks, patios, and guests.",
    href: "/training",
    icon: "training",
  },
  {
    label: "Local Pet Businesses",
    description: "Vets, groomers, stores, and pet services you can trust.",
    href: "/directory?category=Pet%20Services",
    icon: "store",
  },
  {
    label: "Weekend Guides",
    description: "Fresh ideas for where to wag every weekend.",
    href: "/weekend",
    icon: "weekend",
  },
  {
    label: "Yard + Home",
    description: "Cleaner yards & guest-ready spaces, courtesy of Platinum Scoops.",
    href: "/blog?category=Yard%20%2B%20Home",
    icon: "yard",
  },
];

/** All directory categories, with the icon used on cards & filters. */
export const directoryCategories: { name: DirectoryCategory; icon: string }[] = [
  { name: "Dog-Friendly Patios", icon: "patio" },
  { name: "Coffee Shops", icon: "coffee" },
  { name: "Parks", icon: "park" },
  { name: "Trails", icon: "trail" },
  { name: "Pet Stores", icon: "store" },
  { name: "Groomers", icon: "groomer" },
  { name: "Vets", icon: "vet" },
  { name: "Boarding + Daycare", icon: "boarding" },
  { name: "Dog-Friendly Shopping", icon: "shopping" },
  { name: "Apartments", icon: "home" },
  { name: "Events", icon: "calendar" },
  { name: "Pet Services", icon: "service" },
  { name: "Yard Care", icon: "yard" },
  { name: "Training", icon: "training" },
];
