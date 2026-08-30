import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake,
  PawPrint,
  Sun,
  Stethoscope,
  MapPin,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DogDirectoryCard } from "@/components/DogDirectoryCard";
import {
  getDirectoryListingBySlug,
  getResourceListings,
} from "@/data/directory";
import { editorialFranchises } from "@/data/editorialFranchises";
import { getPublishedWagWatch } from "@/data/wagWatch";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage, ctas } from "@/lib/site";

const description =
  "Just moved to Waco with a dog, just adopted, or building a local care network from scratch? This is the stack we wish someone had handed us — vets, emergency care, parks, heat, and people you can actually trust.";

const careLinks = [
  {
    icon: Stethoscope,
    title: "Vets & emergency care",
    copy: "Save an after-hours clinic before you need one. Regular wellness can wait a week; heatstroke cannot.",
    href: "/dog-friendly-waco",
    cta: "Browse Waco dog resources",
  },
  {
    icon: HeartHandshake,
    title: "When they need to stay somewhere safe",
    copy: "Sometimes the best life for your dog is not coming along. Boarding, daycare, and sitting are part of being a good dog parent — not a failure of one.",
    href: "/dog-care",
    cta: "See trusted dog care",
  },
  {
    icon: MapPin,
    title: "Places to go together",
    copy: "Patios, parks, coffee, and trails where dogs are reported welcome. Check Before You Go notes — shade and water are often still unverified.",
    href: "/dog-friendly-waco",
    cta: "Explore Dog-Friendly Waco",
  },
  {
    icon: Sun,
    title: "Texas heat",
    copy: "Pavement burns paws. Parked cars kill dogs. This is the first local skill, not a seasonal aside.",
    href: "/wag-watch/waco-dog-heat-safety",
    cta: "Read the heat playbook",
  },
];

const starterGuides = [
  {
    href: "/dog-match",
    title: "Dog Match: what kind of dog fits the life you actually live?",
    copy: "Home, schedule, noise, grooming, and the pets already in it — scored as lifestyle fit and friction, not a personality quiz.",
  },
  {
    href: "/blog/the-waco-puppy-socialization-checklist",
    title: "The Waco puppy socialization checklist",
    copy: "If you just got a puppy here, start with safe, local experiences — not a crowded patio on Saturday.",
  },
  {
    href: "/blog/how-to-know-if-your-dog-is-ready-for-a-patio",
    title: "Is your dog ready for a patio?",
    copy: "A self-check before you test Waco brunch with a dog who is still learning to settle.",
  },
  {
    href: "/blog/what-to-bring-when-you-take-your-dog-out-in-waco",
    title: "What to bring on a Waco outing",
    copy: "Water, waste bags, and a few other things that make the difference between a good walk and a miserable one.",
  },
  {
    href: "/blog/best-waco-parks-for-dogs",
    title: "Parks worth knowing",
    copy: "Green space first. Restaurants can wait until you know how your dog does around people.",
  },
];

export const metadata: Metadata = servicePageMetadata(
  "/new-dog-in-waco",
  "New Dog in Waco | A Starter Guide for Waco Dog Parents",
  description,
);

export default function NewDogInWacoPage() {
  const emergency = getDirectoryListingBySlug("waco-animal-emergency-clinic");
  const vet = getDirectoryListingBySlug("animal-hospital-of-waco");
  const resources = getResourceListings().slice(0, 3);
  const starterPlaces = [
    getDirectoryListingBySlug("street-dog-cafe"),
    getDirectoryListingBySlug("north-waco-park"),
    getDirectoryListingBySlug("cameron-park"),
  ].filter((listing): listing is NonNullable<typeof listing> => Boolean(listing));
  const heatWatch = getPublishedWagWatch().find(
    (item) => item.slug === "waco-dog-heat-safety",
  );
  const highlightedResources = [emergency, vet].filter(
    (listing): listing is NonNullable<typeof listing> => Boolean(listing),
  );

  return (
    <>
      <PageHeader
        eyebrow="New Dog in Waco"
        title="Everything we wish someone had handed you"
        description={`${description} ${brandLanguage.heroLine}`}
        tone="sage"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.exploreDirectory.href}>
            Browse dog-friendly Waco
          </Button>
          <Button href="/dog-match" variant="sage">
            Find a dog that fits your life
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Start here"
          title="Four jobs, in a useful order"
          description="You do not have to take your dog everywhere. You do need a vet, a heat plan, a couple of calm places, and someone you trust when they should stay home."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {careLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="card-panel group flex flex-col p-6 transition-colors hover:border-wag-sage"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-[1.4rem] font-medium text-serif-ink">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body-muted">
                  {item.copy}
                </p>
                <span className="mt-4 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase group-hover:text-wag-sage">
                  {item.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {highlightedResources.length > 0 && (
        <Section tone="sand">
          <SectionHeading
            eyebrow="Save these first"
            title="Emergency and everyday care"
            description="These are real Waco listings from the directory — not invented recommendations. Always call ahead."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {highlightedResources.map((listing) => (
              <DogDirectoryCard key={listing.id} listing={listing} />
            ))}
          </div>
          {resources.length > 0 && (
            <p className="mt-6 text-[14px] text-body-muted">
              More groomers, vets, and local services live in the{" "}
              <Link href="/dog-friendly-waco" className="text-wag-sage hover:text-rose">
                Waco dog resources
              </Link>{" "}
              section of the directory.
            </p>
          )}
        </Section>
      )}

      <Section tone="paper">
        <SectionHeading
          eyebrow="Guides already on the site"
          title="Read these before the first big outing"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {starterGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-[18px] border border-border bg-soft-cream p-5 transition-colors hover:border-wag-sage"
            >
              <h3 className="font-display text-[1.25rem] font-medium text-serif-ink">
                {guide.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-body-muted">
                {guide.copy}
              </p>
            </Link>
          ))}
        </div>
        {heatWatch && (
          <p className="mt-6 text-[14px] text-body-muted">
            Right now on Wag Watch:{" "}
            <Link href={`/wag-watch/${heatWatch.slug}`} className="text-wag-sage hover:text-rose">
              {heatWatch.headline}
            </Link>
          </p>
        )}
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Then get out"
          title="A few calm starter places"
          description="Reported dog-friendly — not Keep Waco Wagging Approved until we evaluate them. Start quieter than you think."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {starterPlaces.map((listing) => (
            <DogDirectoryCard key={listing.id} listing={listing} />
          ))}
        </div>
        <Button href={ctas.exploreDirectory.href} variant="secondary" className="mt-8">
          All dog-friendly Waco
        </Button>
      </Section>

      <Section tone="paper">
        <div className="flex items-start gap-3 rounded-[20px] bg-sage-50 p-6 ring-1 ring-sage-200 sm:p-8">
          <PawPrint className="mt-1 h-5 w-5 shrink-0 text-wag-sage" aria-hidden="true" />
          <div>
            <h2 className="font-display text-[1.5rem] font-medium text-serif-ink">
              Stay in the loop
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-bark-soft">
              Wag Club is the free list for weekend ideas, Wag Watch notes, and
              local recommendations. No paid membership. {brandLanguage.brandRelationship}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={ctas.joinClub.href}>Join the Wag Club</Button>
              <Button href="/weekend" variant="secondary">
                Waco Dog Weekend
              </Button>
            </div>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editorialFranchises.map((franchise) => (
            <li key={franchise.id}>
              <Link href={franchise.href} className="block text-[14px] text-bark-soft hover:text-rose">
                <span className="font-medium text-bark">{franchise.name}</span>
                <span className="mt-1 block text-[13px]">{franchise.question}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
