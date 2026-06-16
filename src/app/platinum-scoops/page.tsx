import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EditorialServiceCard } from "@/components/EditorialServiceCard";
import { EditorialPhotoSpread } from "@/components/EditorialPhotoSpread";
import { SitePhoto } from "@/components/SitePhoto";
import { platinumScoops } from "@/data/platinumScoops";
import { editorialSpreads, sitePhotos } from "@/data/sitePhotos";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Poop Scooping Waco | Platinum Scoops Dog Waste Removal",
  description:
    "Book local dog waste removal in Waco with Platinum Scoops. Weekly scooping starts at $25/week with the first cleanup included.",
};

export default function PlatinumScoopsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Yard Notes"
        title="Dog waste removal for cleaner Waco yards"
        description={platinumScoops.description}
        tone="sand"
        image={{
          ...sitePhotos.scooping,
          caption: sitePhotos.scooping.alt,
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
            Book a Scoop
          </Button>
          <Button href={platinumScoops.phoneHref} variant="secondary" size="lg">
            Call {platinumScoops.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Why families choose us"
          title="Reliable scooping, same technician every visit"
          description={platinumScoops.pricing}
        />
        <div className="mt-10 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {platinumScoops.trustSignals.map((signal) => (
            <EditorialServiceCard key={signal} title={signal} />
          ))}
        </div>
        <div className="mt-12">
          <EditorialPhotoSpread
            photos={editorialSpreads.yardLife}
            layout="strip"
            eyebrow="Yard Notes"
            title="Yards we care for across Waco"
          />
        </div>
        {/* TODO: Confirm Platinum Scoops review count and licensing details for public marketing copy. */}
      </Section>

      <Section tone="sand" id="yard-services">
        <SectionHeading
          eyebrow="Yard services"
          title="What we scoop and how often"
          description="Residential and commercial pet waste cleanup across greater Waco."
        />
        <ul className="mt-10 divide-y divide-clay border-y border-clay">
          {platinumScoops.yardServices.map((service) => (
            <li key={service} className="py-4">
              <p className="font-medium text-bark">{service}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <SitePhoto
                src={sitePhotos.blog.yardHome.src}
                alt={sitePhotos.blog.yardHome.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="caption mt-2 border-l-2 border-clay pl-3">
              {sitePhotos.blog.yardHome.alt}
            </figcaption>
          </figure>
          <div>
            <SectionHeading
              eyebrow="Service area"
              title="Greater Waco and nearby communities"
              description={`We serve ${platinumScoops.serviceAreas.join(", ")}.`}
              size="compact"
            />
            <p className="mt-4 text-sm leading-relaxed text-bark-soft">
              Platinum Fresh enzyme treatment is included to support cleaner,
              fresher outdoor spaces for your dogs and your family.
            </p>
            <Button href={ctas.bookScoops.href} variant="sponsor" className="mt-6">
              Book a Scoop
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="editorial-panel mx-auto max-w-2xl p-8 text-center sm:p-10">
          <p className="eyebrow eyebrow-brass">Classified</p>
          <h2 className="headline-secondary mt-3">Book your first cleanup</h2>
          <p className="dek mx-auto mt-3">
            First cleanup included. No long-term commitment. Cancel anytime.
            Book online for current availability or call with questions about
            your yard.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={ctas.bookScoops.href} variant="sponsor">
              Book a Scoop
            </Button>
            <Button href={platinumScoops.phoneHref} variant="secondary">
              {platinumScoops.phoneNumeric}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
