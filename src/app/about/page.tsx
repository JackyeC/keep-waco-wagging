import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        title="The local guide for Waco dog parents"
        description={`${siteConfig.name} is presented by ${cityConfig.sponsor.name} — the Waco service business run by ${cityConfig.founders.names}. The guide covers dog-friendly places, practical care, community events, and gear we actually use.`}
        tone="sand"
        showSponsor
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
            {ctas.bookScoops.label}
          </Button>
          <Button href={ctas.exploreDirectory.href} variant="secondary" size="lg">
            Explore dog-friendly Waco
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <p className="lede">
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
              <span className="font-semibold text-bark">{cityConfig.sponsor.name}</span>{" "}
              is the service business: poop scooping, boarding, daycare, and
              event dog care.{" "}
              <span className="font-semibold text-bark">{siteConfig.name}</span>{" "}
              is the community layer — dog-friendly Waco, Yappy Hours, summer
              camp, and practical recommendations for local dog parents.
            </p>
          </div>
        </div>
      </Section>

      <section className="relative h-[50vh] min-h-[20rem] w-full">
        <SitePhoto
          src={sitePhotos.founders.src}
          alt={sitePhotos.founders.alt}
          sizes="100vw"
        />
      </section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="What we believe"
          title="How we think about dog care in Waco"
        />
        <div className="mt-10 space-y-8">
          {values.map((value) => (
            <article
              key={value.title}
              className="grid gap-4 border-t border-clay pt-8 md:grid-cols-12"
            >
              <h3 className="font-display text-2xl md:col-span-4">{value.title}</h3>
              <p className="leading-relaxed text-bark-soft md:col-span-8">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <p className="display-quote">
            {cityConfig.rover.rating} stars across {cityConfig.rover.reviewCount}{" "}
            Rover reviews. {cityConfig.rover.headline}.
          </p>
          <Button href={ctas.bookPetCare.href} size="lg" className="mt-8">
            {ctas.bookPetCare.label}
          </Button>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="The pack"
          title="The dogs behind the brand"
          description={`The ${cityConfig.founders.names} crew — the dogs who inspired ${cityConfig.sponsor.name} and ${siteConfig.name}.`}
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {founderPack.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="rounded-card bg-sand p-8 ring-1 ring-inset ring-clay sm:p-10">
          <p className="eyebrow">Explore the guide</p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">
            More from {siteConfig.name}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Dog-Friendly Waco", href: "/dog-friendly-waco" },
              { label: "Yappy Hours", href: "/yappy-hours" },
              { label: "Summer Camp", href: "/summer-daycare" },
              { label: "Shop our gear picks", href: "/shop" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:underline"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
