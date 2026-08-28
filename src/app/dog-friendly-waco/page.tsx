import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DogDirectoryBrowser } from "@/components/DogDirectoryBrowser";
import { ServiceFaqSection } from "@/components/service/ServiceFaqSection";
import {
  DirectoryIndexJsonLd,
  FaqJsonLd,
} from "@/components/seo/StructuredData";
import {
  categoriesInListings,
  directoryListings,
  getExploreListings,
  getResourceListings,
  neighborhoodsInListings,
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
      "Keep Waco Wagging keeps a free local directory of dog-friendly places in Waco — dog-friendly patios, coffee shops, breweries, parks and trails, shops, and dog-friendly hotels — plus a separate list of Waco dog resources like groomers and vets. Local favorites include Street Dog Cafe on Elm Avenue, Milo and Hecho en Waco downtown, and Southern Roots Brewing Co. Browse and filter the full, regularly updated list at keepwacowagging.com/dog-friendly-waco.",
  },
  {
    question: "Can I bring my dog to patios and restaurants in Waco?",
    answer:
      "Yes. Many Waco restaurants, coffee shops, and breweries welcome leashed, well-behaved dogs on their outdoor patios, including Milo, Street Dog Cafe, and Southern Roots Brewing Co. Dog policies change, so every listing in the Keep Waco Wagging directory includes the dog policy and a reminder to verify directly before you visit.",
  },
  {
    question: "What are good dog-friendly parks and outdoor spots in Waco?",
    answer:
      "Waco has several leash-friendly, open-air spots for dogs, including North Waco Park and the grounds around the Waco Mammoth National Monument. The Keep Waco Wagging directory lists parks and trails with notes on shade, water, and the best time to visit.",
  },
  {
    question: "Is the Keep Waco Wagging dog-friendly Waco directory free?",
    answer:
      "Yes, it is completely free. The Keep Waco Wagging directory is a local guide for Waco dog parents — you can search by category or by neighborhood (Downtown Waco, North Waco, East Waco, and more) and suggest a dog-friendly place we are missing.",
  },
  {
    question: "Who is Keep Waco Wagging?",
    answer:
      "Keep Waco Wagging helps people who love their dogs like family give them the best life possible in Waco. The free directory, Wag Watch, weekend ideas, and Keep Waco Wagging Approved evaluations are for every local dog parent. Jackye and Todd Clayton, the dog people behind Platinum Scoops, created it — and still offer boarding, daycare, training, and scooping for families who want that care.",
  },
];

export const metadata: Metadata = servicePageMetadata(
  "/dog-friendly-waco",
  "Dog-Friendly Waco Directory | Pet-Friendly Patios, Parks & Local Spots",
  directoryDescription,
);

export default function DogFriendlyWacoPage() {
  const exploreListings = getExploreListings();
  const resourceListings = getResourceListings();

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
        description="Search local places, filter by category or neighborhood, and read Before You Go notes. Dogs allowed is only the start — we mark what we have not verified yet."
        tone="sage"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.submitPlace.href}>{ctas.submitPlace.label}</Button>
          <Button href={ctas.becomeSponsor.href} variant="secondary">
            {ctas.becomeSponsor.label}
          </Button>
        </div>
      </PageHeader>

      {/* These are discovery leads, not Keep Waco Wagging Approved ratings. */}
      <div className="border-b border-clay bg-sage-50">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[13.5px] text-bark-soft">
            <PawPrint className="h-4 w-4 shrink-0 text-wag-sage" aria-hidden="true" />
            <span>
              These are places where <strong className="font-semibold text-bark">dogs are reported welcome</strong> — discovery leads we haven&rsquo;t formally evaluated yet.
            </span>
          </p>
          <Link
            href="/approved"
            className="shrink-0 text-[12px] font-medium tracking-[0.12em] text-rose-deep uppercase underline-offset-2 hover:text-wag-sage"
          >
            What does Keep Waco Wagging Approved mean? →
          </Link>
        </div>
      </div>

      {/* Explore Waco With Your Dog */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Explore Waco with your dog"
          title="Places to go with your dog"
          description="Restaurants, patios, coffee, breweries, parks, trails, shops, hotels, markets, and events where dogs are reported welcome."
        />
        <div className="mt-8">
          <DogDirectoryBrowser
            listings={exploreListings}
            categories={categoriesInListings(exploreListings)}
            neighborhoods={neighborhoodsInListings(exploreListings)}
          />
        </div>
      </Section>

      {/* Waco Dog Resources */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Waco dog resources"
          title="Groomers, vets & dog services"
          description="Service providers for your dog — kept separate from the places you visit together for fun."
        />
        <div className="mt-8">
          <DogDirectoryBrowser
            listings={resourceListings}
            categories={categoriesInListings(resourceListings)}
            neighborhoods={neighborhoodsInListings(resourceListings)}
          />
        </div>
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
