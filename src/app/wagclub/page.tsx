import type { Metadata } from "next";
import Image from "next/image";
import {
  Calendar,
  PawPrint,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { WagClubLink } from "@/components/wagclub/WagClubLink";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { servicePageMetadata } from "@/lib/metadata";
import { cityConfig, getLiveSocialLinks } from "@/lib/site";

/**
 * Single source of truth for every destination this landing page links to.
 * All of these map to real, existing routes/integrations in this repo. If a
 * link ever needs to change or a destination is missing, edit it here.
 */
const links = {
  // Primary conversion targets
  bookDaycare: "/book", // Real booking hub (daycare / boarding / camp / training)
  seeDaycare: "/pet-care", // Home-based daycare & boarding info page
  dayCamp: "/summer-daycare", // Keep Waco Wagging Dog Camp (closest real "day camp" route)
  shop: "/shop", // Wag Club merch / Shopify-backed shop
  join: "#join", // On-page email capture (real /api/leads signup)
  weekend: "/weekend", // "Where to Wag This Weekend" guide
  // Secondary ecosystem
  training: "/training",
  dogFriendlyWaco: "/dog-friendly-waco",
  platinumScoops: "/platinum-scoops",
} as const;

const seoTitle = "The Wag Club | Keep Waco Wagging";
const seoDescription =
  "Join Waco's dog-parent community. Find dog-friendly things to do, book doggie daycare and Day Camp, shop Wag Club gear, and Keep Waco Wagging.";

export const metadata: Metadata = servicePageMetadata(
  "/wagclub",
  seoTitle,
  seoDescription,
  {
    src: "/wagclub/wagclub-og.webp",
    alt: "The Wag Club — Keep Waco Wagging",
    width: 1200,
    height: 630,
  },
);

const primaryCards = [
  {
    icon: PawPrint,
    kicker: "Doggie Daycare + Day Camp",
    heading: "Your dog should have plans too.",
    copy: "Small-group play, supervised fun, enrichment, rest breaks and themed Day Camp experiences with people who actually know your dog.",
    bullets: [
      "Small-group play",
      "Supervised care",
      "Enrichment",
      "Themed Day Camp",
      "Local Waco care",
    ],
    cta: { label: "Book Daycare", href: links.bookDaycare, event: "wagclub_book_daycare_click" as const },
  },
  {
    icon: ShoppingBag,
    kicker: "Shop the Wag Club",
    heading: "Wear the club. Find the club.",
    copy: "The shirt isn't just merch. It's how Waco dog people find each other.",
    bullets: [],
    cta: { label: "Shop the Wag Club", href: links.shop, event: "wagclub_shop_click" as const },
    image: true,
  },
  {
    icon: Users,
    kicker: "Join the Wag Club",
    heading: "Get on the Waco dog-parent list.",
    copy: "Get Wagging Weekend picks, dog-friendly events, Day Camp updates, local finds and Wag Club drops.",
    bullets: [],
    cta: { label: "Join the Club", href: links.join, event: "wagclub_join_click" as const },
  },
] as const;

const daycareFeatures = [
  {
    icon: Users,
    title: "Small-group play",
    copy: "Carefully matched playgroups for safer, happier pups.",
  },
  {
    icon: PawPrint,
    title: "Supervised fun",
    copy: "Structured play, rest, attention and people who actually know the dogs in their care.",
  },
  {
    icon: Sparkles,
    title: "Themed camp days",
    copy: "Enrichment, games and photo-worthy camp experiences your dog will love.",
  },
] as const;

const shirtSteps = [
  {
    step: "1",
    title: "Wear it.",
    copy: "Wear your Keep Waco Wagging / Wag Club shirt around Waco.",
  },
  {
    step: "2",
    title: "Spot another member.",
    copy: "See the Wag Club logo? You found another one of your people.",
  },
  {
    step: "3",
    title: "Say hi.",
    copy: "The Wag Club is a local dog-parent community, not just merchandise.",
  },
] as const;

const secondaryServices = [
  { label: "Doggie Daycare & Boarding", href: links.seeDaycare },
  { label: "Day Camp", href: links.dayCamp },
  { label: "Dog Training", href: links.training },
  { label: "The Wag Club Shop", href: links.shop },
  { label: "Wagging Weekend", href: links.weekend },
  { label: "Dog-Friendly Waco", href: links.dogFriendlyWaco },
  { label: "Platinum Scoops", href: links.platinumScoops },
] as const;

const socialIds = ["instagram", "tiktok", "facebook", "youtube"];
const socialLinks = getLiveSocialLinks().filter((l) => socialIds.includes(l.id));

export default function WagClubPage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1100px] px-6 pt-10 pb-14 text-center sm:pt-14 sm:pb-16">
          <Image
            src="/wagclub/wag-club-emblem.webp"
            alt="The Wag Club — Keep Waco Wagging emblem with a paw print, laurels and hearts"
            width={1200}
            height={800}
            priority
            sizes="(max-width: 640px) 300px, 440px"
            className="mx-auto h-auto w-[240px] sm:w-[360px] lg:w-[420px]"
          />
          <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.25rem)]">
            The Wag Club
          </h1>
          <p className="mt-3 font-display text-[clamp(1.25rem,3vw,1.9rem)] font-medium text-serif-ink">
            Dogs. Waco. People who get it.
          </p>
          <p className="dek mx-auto mt-5 max-w-2xl">
            Keep Waco Wagging is where Waco dog people find things to do, trusted
            care for their dogs, local dog-parent community, and gear that helps
            us recognize each other out in the wild.
          </p>
          <p className="mt-5 font-script text-[clamp(1.5rem,4vw,2.25rem)] font-normal text-rose">
            Wear your shirt. Find your people.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <WagClubLink
              href={links.bookDaycare}
              event="wagclub_book_daycare_click"
              className="btn-pill btn-sage w-full px-8 py-4 sm:w-auto"
            >
              Book Doggie Daycare
            </WagClubLink>
            <WagClubLink
              href={links.shop}
              event="wagclub_shop_click"
              className="btn-pill btn-rose-outline w-full px-8 py-[0.9rem] sm:w-auto"
            >
              Shop the Wag Club
            </WagClubLink>
          </div>
          <div className="mt-5">
            <WagClubLink
              href={links.join}
              event="wagclub_join_click"
              className="inline-flex items-center gap-1.5 border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.14em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
            >
              Join the Club →
            </WagClubLink>
          </div>
        </div>
      </section>

      {/* Section 2 — Three ways into the club */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="text-center">
          <p className="eyebrow tracking-[0.24em]">Three ways in</p>
          <h2 className="heading mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)]">
            Find your place in the pack
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {primaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.kicker}
                className="card-panel flex flex-col p-7"
              >
                {"image" in card && card.image ? (
                  <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-garment-tray">
                    <Image
                      src="/wagclub/wag-club-shirt.webp"
                      alt="The Wag Club oatmeal t-shirt, front left-chest logo and full back emblem reading Keep Waco Wagging"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
                <p className="mt-5 text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
                  {card.kicker}
                </p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-snug font-medium text-serif-ink">
                  {card.heading}
                </h3>
                <p className="body-light mt-3 text-[15px]">{card.copy}</p>
                {card.bullets.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-border bg-cream px-3 py-1 text-[11px] font-medium tracking-[0.1em] text-body-muted uppercase"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <WagClubLink
                    href={card.cta.href}
                    event={card.cta.event}
                    className="btn-pill btn-sage px-7 py-3"
                  >
                    {card.cta.label}
                  </WagClubLink>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3 — Doggie Daycare + Day Camp */}
      <section className="bg-wag-sage text-cream">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.24em] text-blush uppercase">
              Keep Waco Wagging
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3rem)] leading-[1.05] font-medium text-cream">
              Doggie Daycare + Day Camp at Keep Waco Wagging
            </h2>
            <p className="mt-4 max-w-xl text-[15.5px] font-light text-cream/85">
              The Wag Club is powered by real, hands-on dog care — small-group
              play and themed camp days run by people who know your dog by name.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {daycareFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-[20px] bg-cream/10 p-6 ring-1 ring-cream/15"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.4rem] font-medium text-cream">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] font-light text-cream/85">
                    {f.copy}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WagClubLink
              href={links.seeDaycare}
              event="wagclub_book_daycare_click"
              className="btn-pill bg-cream px-8 py-4 text-wag-sage hover:bg-blush hover:text-bark"
            >
              See Daycare + Book
            </WagClubLink>
            <WagClubLink
              href={links.dayCamp}
              event="wagclub_secondary_service_click"
              eventLabel="day-camp"
              className="btn-pill border-[1.4px] border-cream/60 px-8 py-[0.9rem] text-cream hover:bg-cream/10"
            >
              See Day Camp
            </WagClubLink>
          </div>
        </div>
      </section>

      {/* Section 4 — Wear your shirt */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden rounded-[24px] bg-sage-50">
              <Image
                src="/wagclub/wag-club-mark.webp"
                alt="The Wag Club stacked emblem — a paw print with a heart, framed by laurels"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-contain p-8"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow tracking-[0.24em]">The community</p>
            <h2 className="heading mt-2 text-[clamp(1.9rem,4vw,2.75rem)]">
              Wear your shirt. Find your people.
            </h2>
            <ol className="mt-8 space-y-6">
              {shirtSteps.map((s) => (
                <li key={s.step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wag-sage font-display text-lg font-medium text-cream">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.3rem] font-medium text-serif-ink">
                      {s.title}
                    </h3>
                    <p className="body-light mt-1 text-[15px]">{s.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <WagClubLink
                href={links.shop}
                event="wagclub_shop_click"
                className="btn-pill btn-sage px-8 py-4"
              >
                Get the Shirt
              </WagClubLink>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Wagging Weekend */}
      <section className="bg-soft-cream">
        <div className="mx-auto max-w-[1000px] px-6 py-16 text-center sm:py-20">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
            <Calendar className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="heading mx-auto mt-5 max-w-2xl text-[clamp(1.9rem,4vw,2.75rem)]">
            What are Waco dog people doing this weekend?
          </h2>
          <p className="dek mx-auto mt-4 max-w-xl">
            Keep Waco Wagging rounds up dog-friendly events, markets, patios,
            activities and local happenings worth knowing about.
          </p>
          <div className="mt-8">
            <WagClubLink
              href={links.weekend}
              event="wagclub_weekend_click"
              className="btn-pill btn-rose-outline px-8 py-4"
            >
              See Wagging Weekend
            </WagClubLink>
          </div>
        </div>
      </section>

      {/* Section 6 — More from Keep Waco Wagging (secondary) */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="text-center">
          <p className="eyebrow tracking-[0.24em]">Explore</p>
          <h2 className="heading mt-2 text-[clamp(1.6rem,3vw,2.25rem)]">
            More from Keep Waco Wagging
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 md:grid-cols-3">
          {secondaryServices.map((s) => (
            <WagClubLink
              key={s.label}
              href={s.href}
              event="wagclub_secondary_service_click"
              eventLabel={s.label}
              className="flex items-center justify-between rounded-full border border-border bg-cream px-5 py-3 text-[13px] font-medium tracking-[0.04em] text-bark transition-colors hover:border-wag-sage hover:text-wag-sage"
            >
              <span>{s.label}</span>
              <span aria-hidden="true">→</span>
            </WagClubLink>
          ))}
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
              Follow along
            </span>
            {socialLinks.map((s) => (
              <WagClubLink
                key={s.id}
                href={s.href as string}
                event="wagclub_secondary_service_click"
                eventLabel={s.id}
                className="nav-link"
              >
                {s.label}
              </WagClubLink>
            ))}
          </div>
        )}
      </section>

      {/* Section 7 — Email / club signup (real /api/leads implementation) */}
      <section id="join" className="scroll-mt-24 bg-wag-sage">
        <div className="mx-auto max-w-[900px] px-6 py-16 text-center sm:py-20">
          <p className="text-xs font-medium tracking-[0.24em] text-blush uppercase">
            The Wag Club
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-medium text-cream">
            Waco dog people — you&rsquo;re invited.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] font-light text-cream/90">
            Join the list for dog-friendly Waco finds, Day Camp updates, local
            events and Wag Club drops.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="text-left [&_a]:text-cream [&_a]:underline [&_p]:text-cream/85">
              <WagClubSignup id="join-form" sourcePage="/wagclub" variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand attribution line */}
      <section className="bg-cream py-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-lg text-serif-ink sm:text-xl">
            Keep Waco Wagging — Dogs. Waco. People who get it.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-bark-faint">
            {cityConfig.sponsor.line}.
          </p>
        </div>
      </section>
    </>
  );
}
