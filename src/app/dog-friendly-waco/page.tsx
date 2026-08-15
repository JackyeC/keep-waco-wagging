import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DogDirectoryBrowser } from "@/components/DogDirectoryBrowser";
import { DirectoryIndexJsonLd } from "@/components/seo/StructuredData";
import {
  directoryCategories,
  directoryListings,
  getDirectoryNeighborhoods,
} from "@/data/directory";
import { servicePageMetadata } from "@/lib/metadata";
import { ctas } from "@/lib/site";

const directoryDescription =
  "The local guide to dog-friendly and pet-friendly places in Waco, Texas — patios, parks, trails, coffee shops, breweries, hotels, and local dog resources, from Keep Waco Wagging.";

export const metadata: Metadata = servicePageMetadata(
  "/dog-friendly-waco",
  "Dog-Friendly Waco Directory | Pet-Friendly Patios, Parks & Local Spots",
  directoryDescription,
);

export default function DogFriendlyWacoPage() {
  return (
    <>
      <DirectoryIndexJsonLd
        listings={directoryListings}
        description={directoryDescription}
      />
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
