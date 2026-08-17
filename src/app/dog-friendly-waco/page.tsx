import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DogDirectoryBrowser } from "@/components/DogDirectoryBrowser";
import { ServiceFaqSection } from "@/components/service/ServiceFaqSection";
import {
  DirectoryIndexJsonLd,
  FaqJsonLd,
} from "@/components/seo/StructuredData";
import {
  directoryCategories,
  directoryListings,
  getDirectoryNeighborhoods,
} from "@/data/directory";
import { servicePageMetadata } from "@/lib/metadata";
import { ctas } from "@/lib/site";

const directoryDescription =
  "The local guide to dog-friendly and pet-friendly places in Waco, Texas — patios, parks, trails, coffee shops, breweries, hotels, and local dog resources, from Keep Waco Wagging.";

/**
 * Answer-first FAQ grounded in the real directory data. Written so search
 * engines and AI answer engines can lift a single Q&A and cite Keep Waco
 * Wagging. Keep answers factual, self-contained, and entity/location-rich.
 */
const directoryFaqs = [
  {
    question: "Where are the dog-friendly places in Waco?",
    answer:
      "Keep Waco Wagging keeps a free local directory of dog-friendly places in Waco — dog-friendly patios, coffee shops, breweries, parks and trails, dog parks, groomers, vets, pet boutiques, and dog-friendly hotels. Local favorites include Street Dog Cafe on Elm Avenue, Milo and Hecho en Waco downtown, and Southern Roots Brewing Co. Browse and filter the full, regularly updated list at keepwacowagging.com/dog-friendly-waco.",
  },
  {
    question: "Can I bring my dog to patios and restaurants in Waco?",
    answer:
      "Yes. Many Waco restaurants, coffee shops, and breweries welcome leashed, well-behaved dogs on their outdoor patios, including Milo, Street Dog Cafe, and Southern Roots Brewing Co. Dog policies change, so every listing in the Keep Waco Wagging directory includes the dog policy and a reminder to verify directly before you visit.",
  },
  {
    question: "What are good dog-friendly parks and outdoor spots in Waco?",
    answer:
      "Waco has several leash-friendly, open-air spots for dogs, including North Waco Park and the grounds around the Waco Mammoth National Monument. The Keep Waco Wagging directory lists parks, trails, and dog parks with notes on shade, water, and the best time to visit.",
  },
  {
    question: "Is the Keep Waco Wagging dog-friendly Waco directory free?",
    answer:
      "Yes, it is completely free. The Keep Waco Wagging directory is a local guide for Waco dog parents — you can search by category or by neighborhood (Downtown Waco, North Waco, East Waco, and more) and suggest a dog-friendly place we are missing.",
  },
  {
    question: "Who is Keep Waco Wagging?",
    answer:
      "Keep Waco Wagging is a Waco, Texas dog-parent community and lifestyle brand, and the community home of Platinum Scoops. Alongside the free dog-friendly directory, Keep Waco Wagging offers home-based dog daycare and boarding, dog training, a summer dog camp, and poop scooping across the Waco area.",
  },
];

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
      <FaqJsonLd items={directoryFaqs} />
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
      <Section tone="paper">
        <ServiceFaqSection
          eyebrow="Dog-friendly Waco FAQ"
          title="Where are the dog-friendly places in Waco?"
          items={directoryFaqs}
        />
      </Section>
    </>
  );
}
