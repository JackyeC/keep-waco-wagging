import type { Metadata } from "next";
import { Heart, PawPrint } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PetCard } from "@/components/PetCard";
import { founderPack } from "@/data/founderPack";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Keep Waco Wagging",
  description:
    "Meet Jackye and Todd Clayton, the Waco family behind Platinum Scoops and Keep Waco Wagging.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built by Waco dog people, for Waco dog parents"
        description="Keep Waco Wagging was created by Jackye and Todd Clayton, the Waco family behind Platinum Scoops."
        tone="sage"
        showSponsor
        image={sitePhotos.founders}
      />

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-card bg-white p-7 ring-1 ring-inset ring-clay/70">
            <Heart className="h-8 w-8 text-sage-600" />
            <h2 className="mt-4 text-2xl">Why we started Keep Waco Wagging</h2>
            <p className="mt-4 leading-relaxed text-bark-soft">
              Keep Waco Wagging was created by Jackye and Todd Clayton, the Waco
              family behind Platinum Scoops. What started as a practical way to
              help local families keep their yards cleaner grew into something
              bigger: a local dog parent resource for pet care, dog-friendly
              places, favorite products, and everyday dog-life support around
              Waco.
            </p>
            <p className="mt-4 leading-relaxed text-bark-soft">
              We started Keep Waco Wagging because Waco dog parents deserve one
              friendly place to find local dog-friendly spots, trusted pet care,
              cleaner yard support, helpful products, and real-life advice from
              people who spend their days with dogs.
            </p>
          </article>
          <article className="rounded-card bg-sage-50 p-7 ring-1 ring-inset ring-sage-200">
            <PawPrint className="h-8 w-8 text-sage-700" />
            <h2 className="mt-4 text-2xl">Jackye and Todd Clayton</h2>
            <p className="mt-4 leading-relaxed text-bark-soft">
              Jackye and Todd are Waco-based pet care professionals, dog parents,
              and the founders of Platinum Scoops. Their work combines reliable
              yard care, home-based pet care, and practical dog-life experience
              with a simple goal: make life easier for Waco dog families.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bark-soft">
              Full-time pet care professionals; multi-dog household with three
              resident dogs and a foster; experienced with high-energy dogs,
              puppies, seniors, medication support, group dynamics, structured
              rest, enrichment, and yard sanitation.
            </p>
          </article>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Our approach"
          title="Hands-on experience, practical care"
          description="Our approach is built from hands-on pet care, multi-dog household management, Rover care experience, lifestyle manners support, and practical observation."
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.bookScoops.href}>{ctas.bookScoops.label}</Button>
          <Button href={ctas.bookPetCare.href} variant="secondary">
            {ctas.bookPetCare.label}
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Meet the Pack"
          title={`The ${cityConfig.founders.names} dog crew`}
          description="The dogs who inspired Platinum Scoops and Keep Waco Wagging."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {founderPack.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </Section>
    </>
  );
}
