import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MoveOnePurchase } from "@/components/weekend/MoveOnePurchase";
import { ctas } from "@/lib/site";
import { servicePageMetadata } from "@/lib/metadata";
import {
  weekendCampClayton,
  weekendCommunityNote,
  weekendEdition,
  weekendSafetyNote,
  weekendSaturdayStops,
  weekendSundayFeature,
} from "@/data/weekend";

export const metadata: Metadata = servicePageMetadata(
  "/weekend",
  "Waco Dog Weekend | September 12–13, 2026",
  "What can I do with my dog in Waco this weekend? Farmers market, Street Dog Cafe, Doggie Day at The Will, and one small challenge: move one purchase to a local business.",
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
  copy: ReactNode;
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
        <p className="eyebrow tracking-[0.22em]">Sunday feature</p>
        <div className="mt-3 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <PlaceCard
            title={weekendSundayFeature.title}
            when={weekendSundayFeature.when}
            address={weekendSundayFeature.address}
            copy={
              <>
                {weekendSundayFeature.copy}{" "}
                <a
                  href={weekendSundayFeature.homeGrown.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-wag-sage underline decoration-wag-sage/40 underline-offset-2 hover:text-rose hover:decoration-rose"
                >
                  {weekendSundayFeature.homeGrown.label}
                </a>
                {weekendSundayFeature.homeGrown.rest}
              </>
            }
            dogNote={weekendSundayFeature.dogNote}
            href={weekendSundayFeature.href}
          />
          <aside className="rounded-[20px] border border-border bg-cream p-6">
            <h2 className="font-display text-[1.4rem] font-medium text-serif-ink">
              {weekendSafetyNote.heading}
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-body-muted">
              {weekendSafetyNote.copy}
            </p>
          </aside>
        </div>
      </Section>

      <Section tone="paper">
        <article className="rounded-[20px] border border-border bg-soft-cream p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
            Dog-parent need-to-know
          </p>
          <h2 className="mt-2 font-display text-[1.7rem] font-medium text-serif-ink">
            {weekendCommunityNote.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-body-muted">
            {weekendCommunityNote.copy}
          </p>
          <p className="mt-3 max-w-3xl text-[14.5px] font-medium text-bark">
            {weekendCommunityNote.verify}
          </p>
          <Button href={weekendCommunityNote.href} variant="secondary" className="mt-5">
            City of Waco event listing <ExternalLink className="h-4 w-4" />
          </Button>
        </article>
      </Section>

      <Section tone="sand">
        <MoveOnePurchase />
      </Section>

      <Section tone="paper">
        <p className="eyebrow tracking-[0.22em]">{weekendCampClayton.eyebrow}</p>
        <h2 className="heading mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">
          {weekendCampClayton.heading}
        </h2>
        <p className="mt-2 text-[13px] font-medium tracking-[0.12em] text-wag-sage uppercase">
          {weekendCampClayton.dates} · {weekendCampClayton.descriptor}
        </p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-body-muted">
          {weekendCampClayton.copy}
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {weekendCampClayton.activities.map((activity) => (
            <li
              key={activity}
              className="text-[14.5px] text-bark-soft before:mr-2 before:text-rose before:content-['♥']"
            >
              {activity}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-[14.5px] leading-relaxed text-body-muted">
          {weekendCampClayton.note}
        </p>
        <p className="mt-3 max-w-3xl text-[15px] text-bark">
          {weekendCampClayton.dropIn}
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

      <Section tone="sand" id="newsletter">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup variant="card" sourcePage="/weekend" />
        </div>
      </Section>
    </>
  );
}
