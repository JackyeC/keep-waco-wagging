import type { Metadata } from "next";
import { CalendarDays, Check, Sun, PawPrint } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  summerDaycare,
  daycareThemes,
  daycareMonthOrder,
  type DaycareTheme,
} from "@/data/summerDaycare";
import { cityConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Summer Dog Daycare Camp in ${cityConfig.city} | Weekly Themes`,
  description:
    `A themed weekly summer daycare calendar for ${cityConfig.city} dogs — splash days, sniff safaris, manners camp, and more. Home-based, full-time care. Reserve your dog's spot on Rover.`,
};

export default function SummerDaycarePage() {
  return (
    <>
      <PageHeader
        eyebrow={summerDaycare.seasonLabel}
        title={`${summerDaycare.title} in ${cityConfig.city}`}
        description={summerDaycare.intro}
        tone="gold"
        showSponsor
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href={summerDaycare.bookingUrl} size="lg">
            Reserve your dog&apos;s spot on Rover
          </Button>
          <Badge tone="gold">{summerDaycare.dailyRate} daycare</Badge>
        </div>
      </PageHeader>

      {/* How it works */}
      <Section tone="paper">
        <div className="grid gap-4 rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70 sm:grid-cols-3">
          <HowItem
            icon={<CalendarDays className="h-5 w-5" />}
            title="A new theme each week"
            body="Drop in for a day or join the whole themed week of play and enrichment."
          />
          <HowItem
            icon={<Sun className="h-5 w-5" />}
            title="Heat-smart by design"
            body={summerDaycare.heatNote}
          />
          <HowItem
            icon={<PawPrint className="h-5 w-5" />}
            title="Book on Rover"
            body="When your dog wants in, request the dates on our Rover profile — that's where availability lives."
          />
        </div>
      </Section>

      {/* The themed calendar, grouped by month */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="The calendar"
          title="13 weeks of summer themes"
          description="Each week runs Monday through Friday. Reserve any week your dog wants to join."
        />
        <div className="mt-10 space-y-12">
          {daycareMonthOrder.map((month) => {
            const weeks = daycareThemes.filter((t) => t.month === month);
            if (weeks.length === 0) return null;
            return (
              <div key={month}>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold sm:text-3xl">{month}</h3>
                  <span className="h-px flex-1 bg-clay" />
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {weeks.map((theme) => (
                    <ThemeCard key={theme.week} theme={theme} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Booking note + closures */}
      <Section tone="paper">
        <div className="mx-auto max-w-2xl rounded-card bg-sage-50 p-6 text-center ring-1 ring-inset ring-sage-200">
          <h3 className="text-xl font-semibold">Good to know</h3>
          <p className="mt-3 text-sm leading-relaxed text-bark-soft">
            {summerDaycare.closures}
          </p>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="sky">
        <div className="rounded-card bg-white p-8 text-center ring-1 ring-inset ring-clay/70">
          <h2 className="text-3xl">Want your dog to join the fun?</h2>
          <p className="mx-auto mt-3 max-w-xl text-bark-soft">
            Pick the weeks your dog wants to come and request the dates on Rover.
            That&apos;s where you&apos;ll see current openings and confirm a spot.
          </p>
          <Button href={summerDaycare.bookingUrl} size="lg" className="mt-6">
            Reserve on Rover
          </Button>
        </div>
      </Section>
    </>
  );
}

function ThemeCard({ theme }: { theme: DaycareTheme }) {
  return (
    <article className="flex flex-col rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
      <div className="flex items-center justify-between gap-2">
        <Badge tone="sky">Week {theme.week}</Badge>
        <span className="text-sm font-medium text-bark-faint">{theme.dateRange}</span>
      </div>
      <h4 className="mt-3 text-xl font-semibold">{theme.name}</h4>
      <p className="mt-2 text-sm leading-relaxed text-bark-soft">{theme.blurb}</p>
      <ul className="mt-4 space-y-2">
        {theme.activities.map((activity) => (
          <li key={activity} className="flex gap-2 text-sm text-bark-soft">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
            {activity}
          </li>
        ))}
      </ul>
      {theme.note && (
        <p className="mt-4 rounded-2xl bg-gold-100 px-3 py-2 text-xs leading-relaxed text-gold-600">
          {theme.note}
        </p>
      )}
      <div className="mt-5 pt-2">
        <Button href={summerDaycare.bookingUrl} variant="secondary" size="sm">
          Reserve this week on Rover
        </Button>
      </div>
    </article>
  );
}

function HowItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
        {icon}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-bark-soft">{body}</p>
      </div>
    </div>
  );
}
