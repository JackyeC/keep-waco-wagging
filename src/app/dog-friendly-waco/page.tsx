import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DogDirectoryBrowser } from "@/components/DogDirectoryBrowser";
import {
  directoryCategories,
  directoryListings,
  getDirectoryNeighborhoods,
} from "@/data/directory";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dog-Friendly Waco Directory | Patios, Parks, Trails & Local Dog Spots",
  description:
    "Find dog-friendly places in Waco, including patios, parks, trails, coffee shops, breweries, and local dog resources.",
};

export default function DogFriendlyWacoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dog-Friendly Waco"
        title="Dog-friendly patios, parks, trails, and local spots"
        description="Search local places, filter by category or neighborhood, and check policy notes before you head out. We mark unverified details so this stays useful and trustworthy."
        tone="sage"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.submitPlace.href}>{ctas.submitPlace.label}</Button>
          <Button href={ctas.becomeSponsor.href} variant="secondary">
            {ctas.becomeSponsor.label}
          </Button>
        </div>
      </PageHeader>
      <Section tone="paper">
        <DogDirectoryBrowser
          listings={directoryListings}
          categories={directoryCategories}
          neighborhoods={getDirectoryNeighborhoods()}
        />
      </Section>
    </>
  );
}
