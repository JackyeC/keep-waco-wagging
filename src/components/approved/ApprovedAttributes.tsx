import {
  Droplet,
  Fence,
  Footprints,
  HeartHandshake,
  Home,
  PawPrint,
  ShieldCheck,
  Sprout,
  Sun,
  TreePine,
  Users,
  Volume2,
} from "lucide-react";
import type { ApprovedListing, Availability } from "@/data/approvedListings";

function avail(value?: Availability): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Unknown";
}

type Item = { icon: React.ElementType; label: string; value: string };

function AttrChip({ icon: Icon, label, value }: Item) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-bark-soft">
      <Icon className="h-4 w-4 shrink-0 text-wag-sage" aria-hidden="true" />
      <span className="font-medium text-bark">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

/** Six quick attributes for an evaluated listing card. Unknown where not researched. */
export function ApprovedQuickAttributes({ listing }: { listing: ApprovedListing }) {
  const items: Item[] = [
    { icon: TreePine, label: "Shade", value: listing.shade ?? "Unknown" },
    { icon: Droplet, label: "Water", value: avail(listing.water) },
    { icon: Sprout, label: "Potty", value: avail(listing.pottyAccess) },
    { icon: PawPrint, label: "Dog traffic", value: listing.dogTraffic ?? "Unknown" },
    { icon: Volume2, label: "Noise", value: listing.noise ?? "Unknown" },
    { icon: Users, label: "Crowds", value: listing.crowds ?? "Unknown" },
  ];
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {items.map((item) => (
        <AttrChip key={item.label} {...item} />
      ))}
    </div>
  );
}

/** Full "At a Glance" grid for an evaluated listing page. */
export function ApprovedAtAGlance({ listing }: { listing: ApprovedListing }) {
  const items: Item[] = [
    { icon: HeartHandshake, label: "Welcome", value: listing.welcomeScore ?? "Unknown" },
    { icon: ShieldCheck, label: "Safety", value: listing.safetyScore ?? "Unknown" },
    { icon: TreePine, label: "Shade", value: listing.shade ?? "Unknown" },
    { icon: Droplet, label: "Water", value: avail(listing.water) },
    { icon: Sprout, label: "Potty access", value: avail(listing.pottyAccess) },
    { icon: Footprints, label: "Ground", value: listing.groundSurface ?? "Unknown" },
    { icon: Volume2, label: "Noise", value: listing.noise ?? "Unknown" },
    { icon: Users, label: "Crowds", value: listing.crowds ?? "Unknown" },
    { icon: PawPrint, label: "Dog traffic", value: listing.dogTraffic ?? "Unknown" },
    { icon: Home, label: "Indoor dogs", value: avail(listing.indoorDogs) },
    { icon: Sun, label: "Outdoor dogs", value: avail(listing.outdoorDogs) },
    { icon: Fence, label: "Fencing", value: avail(listing.fencing) },
  ];
  return (
    <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <AttrChip key={item.label} {...item} />
      ))}
    </div>
  );
}
