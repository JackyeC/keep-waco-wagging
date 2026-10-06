import type { Metadata } from "next";
import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MoveOnePurchase } from "@/components/weekend/MoveOnePurchase";
import { ctas, cityConfig } from "@/lib/site";
import { servicePageMetadata } from "@/lib/metadata";
import {
  weekendEdition,
  weekendSafetyNote,
  weekendSaturdayStops,
} from "@/data/weekend";
import {
  campClayton,
  getCurrentDaycareTheme,
  getNextDaycareTheme,
} from "@/data/summerDaycare";

export const metadata: Metadata = servicePageMetadata(
  "/weekend",
  "Waco Dog Weekend | What to do with your dog in Waco",
  "Standing Saturday ideas for Waco dog people: the downtown farmers market, Street Dog Cafe, and Brotherwell — plus when to leave your dog home.",
);

function PlaceCard({
  title,
  when,
  address,
  copy,
  dogNote,
  href,
  directoryHref,
}: {
  title: string;
  when: string;
  address: string;
  copy: string;
  dogNote: string;
  href: string;
  directoryHref?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-border bg-soft-cream p-6">
      <p className="text-[11px] font-medium tracking-[0.14em] text-wag-sage uppercase">
        {when}
      </p>
      <h3 className="mt-2 font-display text-[1.45rem] font-medium text-serif-ink">
        {title}
      </h3>
      <p className="mt-2 flex items-start gap-2 text-[13px] text-label-muted">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        {address}
      </p>
      <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-body-muted">
        {copy}
      </p>
      <p className="mt-4 rounded-xl bg-cream p-3 text-[13.5px] leading-relaxed text-bark-soft">
        <span className="font-medium text-bark">Dog note: </span>
        {dogNote}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button href={href} variant="sage" size="sm">
          Official details <ExternalLink className="h-3.5 w-3.5" />
        </Button>
        {directoryHref && (
          <Button href={directoryHref} variant="secondary" size="sm">
            Directory listing
          </Button>
        )}
      </div>
    </article>
  );
}

export default function WeekendPage() {
  const currentCamp = getCurrentDaycareTheme();
  const campWeek = currentCamp ?? getNextDaycareTheme();
  const campEyebrow = currentCamp
    ? "This week at Camp Clayton"
    : "Up next at Camp Clayton";

  return (
    <>
      <section className="border-b border-border bg-sage-50">
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-label-muted uppercase">
            {weekendEdition.eyebrow}
          </p>
          <h1 className="heading mt-3 text-[clamp(2rem,5vw,3.4rem)]">
            {weekendEdition.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-bark-soft">
            {weekendEdition.intro}{" "}
            <strong className="font-medium text-bark">
              Move one purchase you were already going to make to a local
              business.
            </strong>
          </p>
          <p className="mt-3 max-w-2xl text-[15px] text-body-muted">
            {weekendEdition.challenge} {weekendEdition.supporting}
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <MoveOnePurchase variant="callout" />
            <div className="flex flex-col justify-center gap-3">
              <Button href="/dog-friendly-waco" variant="sage">
                Dog-friendly Waco directory
              </Button>
              <Button href="/camp-waco" variant="secondary">
                See the Camp Clayton calendar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <p className="eyebrow tracking-[0.22em]">Saturday</p>
        <h2 className="heading mt-2 text-[clamp(1.8rem,3.4vw,2.4rem)]">
          Easy local stops
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {weekendSaturdayStops.map((stop) => (
            <PlaceCard key={stop.id} {...stop} />
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <aside className="max-w-3xl rounded-[20px] border border-border bg-cream p-6">
          <h2 className="font-display text-[1.4rem] font-medium text-serif-ink">
            {weekendSafetyNote.heading}
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-body-muted">
            {weekendSafetyNote.copy}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/book" variant="sage" size="sm">
              Book dog care
            </Button>
            <Button href={cityConfig.rover.profileUrl} variant="secondary" size="sm">
              Reserve Daycare on Rover
            </Button>
          </div>
        </aside>
      </Section>

      {campWeek ? (
      <Section tone="paper">
        <p className="eyebrow tracking-[0.22em]">{campEyebrow}</p>
        <h2 className="heading mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">
          {campWeek.name}
        </h2>
        <p className="mt-2 text-[13px] font-medium tracking-[0.12em] text-wag-sage uppercase">
          {campWeek.dateRange} · {campClayton.descriptor}
        </p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-body-muted">
          {campWeek.blurb}
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {campWeek.activities.map((activity) => (
            <li
              key={activity}
              className="text-[14.5px] text-bark-soft before:mr-2 before:text-rose before:content-['♥']"
            >
              {activity}
            </li>
          ))}
        </ul>
        {campWeek.note ? (
          <p className="mt-5 max-w-3xl text-[14.5px] leading-relaxed text-body-muted">
            {campWeek.note}
          </p>
        ) : null}
        <p className="mt-3 max-w-3xl text-[15px] text-bark">
          {campClayton.bookingNote}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={ctas.bookCampClayton.href} variant="sage" size="lg">
            Book a Day at Camp Clayton on Rover
          </Button>
          <Button href="/camp-waco" variant="secondary" size="lg">
            See the Camp Clayton Calendar
          </Button>
        </div>
      </Section>
      ) : null}

      <Section tone="sand" id="newsletter">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup variant="card" sourcePage="/weekend" />
        </div>
      </Section>
    </>
  );
}
