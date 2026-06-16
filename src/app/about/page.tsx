import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PetCard } from "@/components/PetCard";
import { SitePhoto } from "@/components/SitePhoto";
import { founderPack } from "@/data/founderPack";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Keep Waco Wagging",
  description:
    "Meet Jackye and Todd Clayton, the Waco family behind Platinum Scoops and Keep Waco Wagging.",
};

const values = [
  {
    title: "Care that looks like home",
    body:
      "Dogs stay in our house, on our floors, in our backyard — not in a kennel run. They learn the rhythm of a calm home: meals on time, structured rest, real attention, and the kind of quiet that lets an anxious dog settle.",
  },
  {
    title: "The same hands, every visit",
    body:
      "Whether it is a yard cleanup or a two-week boarding stay, you deal with the same two people who own the business. No rotating contractors, no anonymous app. Consistency is what makes dogs comfortable, and it is what we are built on.",
  },
  {
    title: "Honest about the hard parts",
    body:
      "Texas summers are dangerous for dogs. Some dogs do not belong in a group. Pavement burns paws. We would rather tell you the truth and adjust the plan than pretend every day is a postcard.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Caring for dogs in Central Texas since 1996"
        description="Keep Waco Wagging is the work of one family — Jackye and Todd Clayton — who have spent three decades looking after other people's dogs as if they were their own."
        tone="sand"
      />

      {/* Long-form one-column passage */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="lede">
            We did not set out to build a business. We set out to take good care
            of dogs, and the rest followed.
          </p>
          <div className="mt-8 space-y-6 leading-relaxed text-bark-soft">
            <p>
              Jackye and Todd Clayton are Waco-based pet care professionals,
              lifelong dog people, and the founders of Platinum Scoops. For
              years, friends and neighbors trusted us with their dogs when they
              traveled — and asked us to help keep their yards clean while they
              were busy with everything else.
            </p>
            <p>
              That word-of-mouth turned into something steadier. Today we run a
              full-time, home-based pet care practice: boarding and daycare on
              Rover, recurring yard care through Platinum Scoops, and a themed
              summer camp that gives Waco dogs somewhere to belong when school
              is out and the heat is on.
            </p>
            <p>
              Our own pack — three resident dogs and a rotating foster — keeps
              us honest. We know what high energy looks like, what a senior dog
              needs, how to give medication without a fight, and how to read the
              moment a play session should become a nap. Thirty years of dogs
              will teach you that.
            </p>
          </div>
        </div>
      </section>

      {/* Full-bleed founders photo break */}
      <section className="relative h-[60vh] min-h-[24rem] w-full">
        <SitePhoto
          src={sitePhotos.founders.src}
          alt={sitePhotos.founders.alt}
          sizes="100vw"
        />
      </section>

      {/* Values — editorial paragraph blocks */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">What we believe</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">
              How we think about dog care
            </h2>
          </div>
          <hr className="rule mt-12" />
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
            {values.map((value) => (
              <article key={value.title} className="md:col-span-10 md:col-start-3">
                <div className="grid grid-cols-1 gap-6 border-t border-clay pt-8 md:grid-cols-12">
                  <h3 className="font-display text-2xl md:col-span-4">
                    {value.title}
                  </h3>
                  <p className="leading-relaxed text-bark-soft md:col-span-8">
                    {value.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip — stats as prose */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="display-quote">
            {cityConfig.rover.rating} stars across {cityConfig.rover.reviewCount}{" "}
            Rover reviews. A recognized Star Sitter with families who book us
            again and again. Three decades of dogs in Central Texas.
          </p>
          <Link
            href={ctas.bookPetCare.href}
            className="mt-10 inline-flex items-center gap-2 bg-bark px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-bark-soft"
          >
            Book pet care on Rover
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* The pack */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Meet the pack</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">
              The dogs who started it all
            </h2>
            <p className="mt-4 leading-relaxed text-bark-soft">
              The {cityConfig.founders.names} crew — the dogs who inspired
              Platinum Scoops and Keep Waco Wagging.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {founderPack.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
