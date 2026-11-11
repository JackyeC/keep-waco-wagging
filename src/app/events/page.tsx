import type { Metadata } from "next";
import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getUpcomingEvents } from "@/data/events";
import { servicePageMetadata } from "@/lib/metadata";

export const revalidate = 600;

export const metadata: Metadata = servicePageMetadata(
  "/events",
  "Dog-Friendly Waco Events Calendar | Keep Waco Wagging",
  "Upcoming dog-friendly events, adoption and rescue events, pet-health events, and Waco-area outings where dogs are explicitly welcome.",
);

export default function EventsPage() {
  const events = getUpcomingEvents();

  return (
    <>
      <section className="border-b border-border bg-sage-50">
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:py-16">
          <p className="eyebrow tracking-[0.22em]">Dog-Friendly Waco Calendar</p>
          <h1 className="heading mt-3 text-[clamp(2rem,5vw,3.4rem)]">
            What can we do with the dog?
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-bark-soft">
            A curated calendar of Waco-area events where dogs are explicitly
            welcome or the event is specifically for dogs. We verify the dog
            policy before we add it.
          </p>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-body-muted">
            Event details change. Always check the organizer&apos;s current
            listing before you leave home, and remember that dog-friendly
            doesn&apos;t mean every outing is right for every dog.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/weekend" variant="sage">
              Weekend for Pups
            </Button>
            <Button href="/dog-friendly-waco" variant="secondary">
              Dog-Friendly Waco directory
            </Button>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Coming up"
          title="Upcoming dog-friendly events"
          description="Dog-specific events, rescue and adoption opportunities, pet-friendly community events, and local outings where the dog policy is actually confirmed."
        />

        {events.length ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <article
                key={event.id}
                className="flex h-full flex-col rounded-[20px] border border-border bg-soft-cream p-6"
              >
                <p className="text-[11px] font-medium tracking-[0.14em] text-wag-sage uppercase">
                  {event.category}
                </p>
                <h2 className="mt-2 font-display text-[1.5rem] font-medium text-serif-ink">
                  {event.title}
                </h2>
                <p className="mt-2 text-[14px] font-medium text-bark">
                  {event.dateLabel} · {event.timeLabel}
                </p>
                <p className="mt-2 flex items-start gap-2 text-[13px] text-label-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {event.venue} · {event.address}
                </p>

                <p className="mt-4 text-[14.5px] leading-relaxed text-body-muted">
                  {event.whyShare}
                </p>

                <div className="mt-4 space-y-2 rounded-xl bg-cream p-4 text-[13.5px] leading-relaxed text-bark-soft">
                  <p>
                    <span className="font-semibold text-bark">Dog policy: </span>
                    {event.dogPolicy}
                  </p>
                  <p>
                    <span className="font-semibold text-bark">Cost: </span>
                    {event.cost}
                  </p>
                  {event.requirements ? (
                    <p>
                      <span className="font-semibold text-bark">Before you go: </span>
                      {event.requirements}
                    </p>
                  ) : null}
                </div>

                {event.warning ? (
                  <p className="mt-4 rounded-xl border border-clay bg-sand p-3 text-[13.5px] leading-relaxed text-bark">
                    <span className="font-semibold">Heads up: </span>
                    {event.warning}
                  </p>
                ) : null}

                <div className="mt-5">
                  <Button href={event.sourceUrl} variant="sage" size="sm">
                    Official details <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <p className="mt-4 text-[11px] text-label-muted">
                  Last verified {event.lastVerified} · Source: {event.sourceLabel}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-[20px] border border-border bg-soft-cream p-6 text-body-muted">
            No upcoming events currently meet our verification standard. Check
            back soon — we update this list as strong local events are confirmed.
          </p>
        )}
      </Section>
    </>
  );
}
