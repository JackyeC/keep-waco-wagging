import type { Metadata } from "next";
import Image from "next/image";
import { WagClubLink } from "@/components/wagclub/WagClubLink";
import { FoundingInterestForm } from "@/components/wagclub/FoundingInterestForm";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { RoverReferralCta } from "@/components/RoverReferralCta";
import { wagClubMembership } from "@/data/wagClubMembership";
import { servicePageMetadata } from "@/lib/metadata";
import { cityConfig, ctas } from "@/lib/site";

const seoTitle = "The Wag Club | Keep Waco Wagging";
const seoDescription =
  "The Wag Club is a local membership for Waco dog parents. Founding membership is proposed at $99 per household for the first year and is not open for payment. Free Waco dog updates stay separate.";

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

const alsoOnSite = [
  { label: "Dog-Friendly Waco", href: "/dog-friendly-waco" },
  { label: "Events", href: "/events" },
  { label: "Waco Dog Weekend", href: "/weekend" },
  { label: "Wag Watch", href: "/wag-watch" },
  { label: "Shop", href: "/shop" },
  { label: "Dog Care", href: "/dog-care" },
  { label: "Camp Clayton", href: "/camp-waco" },
  { label: "Platinum Scoops", href: "/platinum-scoops" },
] as const;

export default function WagClubPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-[1100px] px-6 pt-10 pb-14 text-center sm:pt-14 sm:pb-16">
          <Image
            src="/wagclub/wag-club-emblem.webp"
            alt="The Wag Club — Keep Waco Wagging emblem with a paw print, laurels and hearts"
            width={1200}
            height={800}
            priority
            sizes="(max-width: 640px) 300px, 440px"
            className="mx-auto h-auto w-[220px] sm:w-[320px] lg:w-[380px]"
          />
          <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.25rem)]">
            {wagClubMembership.name}
          </h1>
          <p className="mt-3 font-display text-[clamp(1.35rem,3vw,2rem)] font-medium text-serif-ink">
            {wagClubMembership.tagline}
          </p>
          <p className="dek mx-auto mt-5 max-w-2xl">{wagClubMembership.description}</p>
          <p className="mt-5 font-script text-[clamp(1.5rem,4vw,2.25rem)] font-normal text-rose">
            {wagClubMembership.supportingLine}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href="#founding" className="btn-pill btn-sage w-full px-8 py-4 sm:w-auto">
              Founding membership interest
            </a>
            <a
              href="#free-updates"
              className="btn-pill btn-rose-outline w-full px-8 py-[0.9rem] sm:w-auto"
            >
              Free Waco dog updates
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-[24px] bg-garment-tray">
            <Image
              src="/wagclub/wag-club-shirt.webp"
              alt="The Wag Club oatmeal t-shirt, front left-chest logo and full back emblem reading Keep Waco Wagging"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-contain"
            />
          </div>
          <div>
            <p className="eyebrow tracking-[0.24em]">The shirt</p>
            <h2 className="heading mt-2">{wagClubMembership.supportingLine}</h2>
            <p className="dek mt-4">
              The paw-and-laurels mark is how Waco dog people spot each other.
              The shirt is also in the shop on its own. Buying a shirt is not a
              membership.
            </p>
            <ol className="mt-8 space-y-5">
              <li>
                <h3 className="font-display text-[1.3rem] font-medium text-serif-ink">
                  Wear it.
                </h3>
                <p className="body-light mt-1">
                  Wear your Keep Waco Wagging / Wag Club shirt around Waco.
                </p>
              </li>
              <li>
                <h3 className="font-display text-[1.3rem] font-medium text-serif-ink">
                  Spot another member.
                </h3>
                <p className="body-light mt-1">
                  See the Wag Club logo? You found another one of your people.
                </p>
              </li>
              <li>
                <h3 className="font-display text-[1.3rem] font-medium text-serif-ink">
                  Say hi.
                </h3>
                <p className="body-light mt-1">
                  The Wag Club is a local dog-parent community, not just merchandise.
                </p>
              </li>
            </ol>
            <div className="mt-8">
              <WagClubLink
                href="/shop"
                event="wagclub_shop_click"
                className="btn-pill btn-rose-outline px-7 py-3"
              >
                Shop the shirt
              </WagClubLink>
            </div>
          </div>
        </div>
      </section>

      <section id="founding" className="scroll-mt-36 bg-soft-cream">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="eyebrow tracking-[0.24em]">Founding membership</p>
            <h2 className="heading mt-2">A household membership, when it opens</h2>
            <p className="mt-4 font-display text-[clamp(1.8rem,3vw,2.4rem)] text-serif-ink">
              {wagClubMembership.priceLabel}
              <span className="mt-1 block font-sans text-base font-normal text-body-muted">
                {wagClubMembership.priceTerm}
              </span>
            </p>
            <p className="dek mt-4">{wagClubMembership.paymentStatus}</p>

            <h3 className="mt-10 font-display text-[1.45rem] font-medium text-serif-ink">
              Confirmed today
            </h3>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-body-muted">
              {wagClubMembership.confirmedToday.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-[1.45rem] font-medium text-serif-ink">
              Planned founding benefits
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body-muted">
              These are the benefits we intend to offer. They are not active
              until pricing, policies, product costs, and fulfillment are approved.
            </p>
            <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-bark">
              {wagClubMembership.plannedBenefits.map((item) => (
                <li key={item} className="border-b border-border py-2">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-body-muted">
              {wagClubMembership.sprayNote}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-body-muted">
              {wagClubMembership.scoopsNote}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-bark">{wagClubMembership.notIncluded}</p>
          </div>

          <div className="card-panel h-fit p-6 sm:p-8">
            <h3 className="font-display text-[1.6rem] font-medium text-serif-ink">
              Founding interest list
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body-muted">
              Tell us you want the first-year household membership. We will not
              charge you from this form.
            </p>
            <div className="mt-6">
              <FoundingInterestForm />
            </div>
          </div>
        </div>
      </section>

      <section id="free-updates" className="scroll-mt-36 border-t border-border bg-cream">
        <div className="mx-auto max-w-[800px] px-6 py-16">
          <p className="eyebrow tracking-[0.24em]">Free — not a membership</p>
          <h2 className="heading mt-2">Wag Watch, guides, and public events</h2>
          <p className="dek mt-4">
            This list is for people who want local dog updates without joining
            The Wag Club. We do not move free subscribers onto the membership
            list.
          </p>
          <WagClubSignup id="free-updates-form" sourcePage="/wagclub" variant="hero" />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="text-center">
          <p className="eyebrow tracking-[0.24em]">Still here for the practical stuff</p>
          <h2 className="heading mt-2 text-[clamp(1.6rem,3vw,2.25rem)]">
            Dog care and local guides
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 md:grid-cols-4">
          {alsoOnSite.map((item) => (
            <WagClubLink
              key={item.href}
              href={item.href}
              event="wagclub_secondary_service_click"
              eventLabel={item.label}
              className="flex items-center justify-between rounded-full border border-border bg-cream px-5 py-3 text-[13px] font-medium text-bark hover:border-wag-sage hover:text-sage-ink"
            >
              <span>{item.label}</span>
              <span aria-hidden="true">→</span>
            </WagClubLink>
          ))}
        </div>
        <div className="mt-10">
          <RoverReferralCta />
        </div>
      </section>

      <section className="bg-cream py-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-lg text-serif-ink sm:text-xl">
            {wagClubMembership.name} — {wagClubMembership.tagline}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-bark-faint">
            {cityConfig.sponsor.line}.{" "}
            <a href={ctas.freeUpdates.href} className="underline underline-offset-2">
              Free updates
            </a>
            {" · "}
            <a href="/waco-wag-club" className="underline underline-offset-2">
              Community welcome
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
