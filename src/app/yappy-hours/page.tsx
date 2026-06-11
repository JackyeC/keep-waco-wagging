import type { Metadata } from "next";
import { CalendarDays, Clock, Home, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { YappyHourRSVP } from "@/components/YappyHourRSVP";
import { yappyHours, yappyHourEvents, type YappyHourEvent } from "@/data/yappyHours";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: `Yappy Hours in ${cityConfig.city} | Dog Meetups & Socials`,
  description:
    `Yappy Hours are casual dog meetups in ${cityConfig.city} — public socials at dog-friendly patios and parks, plus members-only backyard get-togethers for Platinum Scoops and Rover clients. RSVP free.`,
};

export default function YappyHoursPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Yappy Hours"
        description={yappyHours.intro}
        tone="sky"
        showSponsor
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#rsvp" size="lg">
            RSVP for a Yappy Hour
          </Button>
          <Button href={ctas.bookPetCare.href} variant="secondary" size="lg">
            Become a client
          </Button>
        </div>
      </PageHeader>

      {/* Two tracks */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Two ways to wag"
          title="Open socials and members-only backyard hangs"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card bg-white p-7 ring-1 ring-inset ring-clay/70">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <Users className="h-5 w-5" />
            </span>
            <div className="mt-4 flex items-center gap-2">
              <h3 className="text-xl font-semibold">Public Yappy Hours</h3>
              <Badge tone="sky">Open to all</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-bark-soft">
              {yappyHours.publicBlurb}
            </p>
          </div>
          <div className="rounded-card bg-white p-7 ring-1 ring-inset ring-clay/70">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
              <Home className="h-5 w-5" />
            </span>
            <div className="mt-4 flex items-center gap-2">
              <h3 className="text-xl font-semibold">Backyard Yappy Hours</h3>
              <Badge tone="gold">Members only</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-bark-soft">
              {yappyHours.membersBlurb}
            </p>
          </div>
        </div>
      </Section>

      {/* Upcoming events */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Upcoming"
          title="Save the date"
          description={yappyHours.hostNote}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {yappyHourEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Section>

      {/* RSVP */}
      <Section tone="paper" id="rsvp">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="RSVP"
            title="Tell us you're coming"
            description="Free to RSVP. We'll email details before each event."
            align="center"
          />
          <div className="mt-8">
            <YappyHourRSVP />
          </div>
        </div>
      </Section>

      {/* Sponsor / host CTA */}
      <Section tone="sage">
        <div className="rounded-card bg-white p-8 ring-1 ring-inset ring-clay/70 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <Badge tone="gold">For local businesses</Badge>
            <h2 className="mt-3 text-3xl">Host or sponsor a Yappy Hour</h2>
            <p className="mt-3 text-bark-soft">{yappyHours.sponsorPitch}</p>
          </div>
          <div className="mt-6 shrink-0 lg:mt-0">
            <Button href={ctas.becomeSponsor.href} size="lg">
              {ctas.becomeSponsor.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function EventCard({ event }: { event: YappyHourEvent }) {
  const isMembers = event.type === "members";
  return (
    <article className="flex flex-col rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
      <div className="flex items-center justify-between gap-2">
        <Badge tone={isMembers ? "gold" : "sky"}>
          {isMembers ? "Members only" : "Open to all"}
        </Badge>
        <span className="text-sm font-medium text-bark-faint">{event.cost}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold">{event.title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-bark-soft">
        <li className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-sage-600" />
          {event.date}
        </li>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-sage-600" />
          {event.time}
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-sage-600" />
          {event.location}
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-bark-soft">{event.description}</p>
      <div className="mt-5 pt-1">
        <Button href="#rsvp" variant="secondary" size="sm">
          RSVP{isMembers ? " (clients)" : ""}
        </Button>
      </div>
    </article>
  );
}
