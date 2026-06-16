import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PetCard } from "@/components/PetCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SitePhoto } from "@/components/SitePhoto";
import { founderPack } from "@/data/founderPack";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Keep Waco Wagging | Waco Dog-Parent Guide",
  description:
    "Keep Waco Wagging is the local Waco dog-parent guide presented by Platinum Scoops. Meet Jackye and Todd Clayton.",
};

const values = [
  {
    title: "Care that looks like home",
    body:
      "Dogs in our care stay in our house, on our floors, in our backyard — not in a kennel run. Meals on time, structured rest, and the kind of quiet that lets an anxious dog settle.",
  },
  {
    title: "The same hands, every visit",
    body:
      "Whether it is a yard cleanup or a boarding stay, you work with the same two people who own the business. Consistency is what makes dogs comfortable.",
  },
  {
    title: "Honest about the hard parts",
    body:
      "Texas summers are dangerous for dogs. Some dogs do not belong in a group. Pavement burns paws. We would rather tell you the truth and adjust the plan than pretend every day is easy.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={siteConfig.name}
        title="A publisher's note"
        description={`${siteConfig.name} is our local dog-parent guide, created by the family behind ${cityConfig.sponsor.name}. The guide covers dog-friendly places, practical care, community events, and gear we actually use.`}
        tone="sand"
        showPublisher
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
            Book a Scoop
          </Button>
          <Button href={ctas.exploreDirectory.href} variant="secondary" size="lg">
            Explore dog-friendly Waco
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <div className="mx-auto max-w-2xl">
          <p className="kicker">From Jackye and Todd</p>
          <p className="lede mt-4">
            We did not set out to build a media brand. We set out to take good
            care of dogs — and the local guide grew from that work.
          </p>
          <div className="mt-8 space-y-6 leading-relaxed text-bark-soft">
            <p>
              {cityConfig.founders.names} are Waco-based pet care professionals
              and the founders of {cityConfig.sponsor.name}. Friends and
              neighbors trusted them with their dogs and their yards; that
              word-of-mouth became a full-time home-based practice.
            </p>
            <p>
              <span className="font-medium text-bark">{cityConfig.sponsor.name}</span>{" "}
              is the service business: poop scooping, boarding, daycare, and
              event dog care.{" "}
              <span className="font-medium text-bark">{siteConfig.name}</span>{" "}
              is the community layer — dog-friendly Waco, Yappy Hours, summer
              camp, and practical recommendations for local dog parents.
            </p>
          </div>
        </div>
      </Section>

      <figure className="relative min-h-[20rem] w-full border-y border-clay sm:min-h-[24rem]">
        <SitePhoto
          src={sitePhotos.founders.src}
          alt={sitePhotos.founders.alt}
          sizes="100vw"
        />
        <figcaption className="caption absolute bottom-0 left-0 right-0 bg-bark/70 px-4 py-2 text-cream/75 sm:px-6">
          {sitePhotos.founders.alt}
        </figcaption>
      </figure>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Editorial stance"
          title="How we think about dog care in Waco"
        />
        <div className="mt-10 space-y-0 divide-y divide-clay border-y border-clay">
          {values.map((value) => (
            <article
              key={value.title}
              className="grid gap-3 py-8 md:grid-cols-12 md:gap-8"
            >
              <h3 className="headline-tertiary md:col-span-4">{value.title}</h3>
              <p className="leading-relaxed text-bark-soft md:col-span-8">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-2xl border-l-2 border-gold-400 pl-6">
          <p className="display-quote">
            {cityConfig.rover.rating} stars across {cityConfig.rover.reviewCount}{" "}
            Rover reviews. {cityConfig.rover.headline}.
          </p>
          <Button href={ctas.bookPetCare.href} size="lg" className="mt-8">
            Check Daycare Availability
          </Button>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="The pack"
          title="The dogs behind the brand"
          description={`The ${cityConfig.founders.names} crew — the dogs who inspired ${cityConfig.sponsor.name} and ${siteConfig.name}.`}
          size="compact"
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {founderPack.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="border-t border-clay pt-8">
          <p className="eyebrow">Continue reading</p>
          <h2 className="headline-tertiary mt-2">
            More from {siteConfig.name}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Dog-Friendly Waco", href: "/dog-friendly-waco" },
              { label: "Yappy Hours", href: "/yappy-hours" },
              { label: "Summer Camp", href: "/summer-daycare" },
              { label: "The Edit — shop picks", href: "/shop" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="editorial-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
