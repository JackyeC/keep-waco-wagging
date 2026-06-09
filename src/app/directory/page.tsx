import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/CTASection";
import { DirectoryBrowser } from "@/components/DirectoryBrowser";
import { AdSlot } from "@/components/AdSlot";
import { listings } from "@/data/listings";
import { directoryCategories } from "@/data/categories";
import { ctas } from "@/lib/site";
import type { DirectoryCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dog-Friendly Waco Directory",
  description:
    "Search dog-friendly patios, parks, trails, coffee shops, pet stores, groomers, vets, and pet services across Waco, Woodway, Hewitt, Robinson, and nearby areas.",
};

const categories = directoryCategories.map(
  (c) => c.name,
) as DirectoryCategory[];

export default function DirectoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The directory"
        title="Dog-Friendly Waco Directory"
        description="Patios, parks, trails, pet services, and more — filtered for what matters when you bring your dog. Search by area, or narrow by puppy- and reactive-dog-friendly spots."
        tone="sage"
      />

      <Container className="py-12">
        <Suspense
          fallback={
            <div className="py-20 text-center text-bark-soft">
              Loading places…
            </div>
          }
        >
          <DirectoryBrowser
            listings={listings}
            categories={categories}
            sidebarSlot={<AdSlot placement="directory-sidebar" />}
          />
        </Suspense>
      </Container>

      <CTASection
        eyebrow="Real-life readiness"
        title="Want calmer outings wherever you go?"
        description="If patios, parks, or busy places feel stressful right now, start with a Lifestyle Training Assessment and build the skills together."
        primary={ctas.bookTraining}
        secondary={ctas.learnScoops}
      />
    </>
  );
}
