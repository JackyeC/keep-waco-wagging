import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Sun, PawPrint } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SitePhoto } from "@/components/SitePhoto";
import {
  summerDaycare,
  daycareThemes,
  daycareMonthOrder,
  type DaycareMonth,
  type DaycareTheme,
} from "@/data/summerDaycare";
import {
  daycareMonthPhotos,
  daycareThemePhotos,
  summerPhotoExploreLinks,
  type DaycarePhoto,
} from "@/data/summerDaycarePhotos";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: `Summer Dog Daycare Camp in ${cityConfig.city} | Weekly Themes`,
  description:
    `A themed weekly summer daycare calendar for ${cityConfig.city} dogs — splash days, sniff safaris, manners camp, and more. Home-based, full-time care. Reserve your dog's spot on Rover.`,
};

export default function SummerDaycarePage() {
  return (
    <>
      <PageHeader
        showSiteName
        showSponsor
        eyebrow={summerDaycare.seasonLabel}
        title={`${summerDaycare.title} in ${cityConfig.city}`}
        description={summerDaycare.intro}
        tone="gold"
        image={sitePhotos.summerCamp}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href={ctas.bookPetCare.href} size="lg">
            Reserve your dog&apos;s spot on Rover
          </Button>
          <Badge tone="gold">{summerDaycare.dailyRate} daycare</Badge>
        </div>
      </PageHeader>

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
                <MonthBanner month={month} />
                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {weeks.map((theme) => (
                    <ThemeCard key={theme.week} theme={theme} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70 sm:p-8">
          <SectionHeading
            eyebrow="More to explore"
            title="See more Waco dog life"
            description="Photos, everyday care details, community meetups, and booking — all part of Keep Waco Wagging."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {summerPhotoExploreLinks.map((link) => (
              <li key={link.href}>
                <ExploreLink {...link} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-2xl rounded-card bg-sage-50 p-6 text-center ring-1 ring-inset ring-sage-200">
          <h3 className="text-xl font-semibold">Good to know</h3>
          <p className="mt-3 text-sm leading-relaxed text-bark-soft">
            {summerDaycare.closures}
          </p>
        </div>
      </Section>

      <Section tone="sky">
        <div className="rounded-card bg-white p-8 text-center ring-1 ring-inset ring-clay/70">
          <h2 className="text-3xl">Want your dog to join the fun?</h2>
          <p className="mx-auto mt-3 max-w-xl text-bark-soft">
            Pick the weeks your dog wants to come and request the dates on Rover.
            That&apos;s where you&apos;ll see current openings and confirm a spot.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={ctas.bookPetCare.href} size="lg">
              Reserve on Rover
            </Button>
            <Button href="/pets" variant="secondary" size="lg">
              See more dog photos
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function MonthBanner({ month }: { month: DaycareMonth }) {
  const photo = daycareMonthPhotos[month];

  return (
    <div className="overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70">
      <div className="relative aspect-[21/9] sm:aspect-[3/1]">
        <SitePhoto
          src={photo.src}
          alt={photo.alt}
          sizes="(max-width: 1024px) 100vw, 960px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bark/55 via-bark/25 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 sm:p-6">
          <h3 className="text-2xl font-semibold text-cream sm:text-3xl">{month}</h3>
          <p className="mt-1 text-sm text-cream/90">Summer camp weeks</p>
        </div>
      </div>
    </div>
  );
}

function ThemeCard({ theme }: { theme: DaycareTheme }) {
  const photo = daycareThemePhotos[theme.week];

  return (
    <article className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70">
      {photo && (
        <div className="relative aspect-[16/10]">
          <ThemePhoto photo={photo} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
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
          <Button href={ctas.bookPetCare.href} variant="secondary" size="sm">
            Reserve this week on Rover
          </Button>
        </div>
      </div>
    </article>
  );
}

function ThemePhoto({ photo }: { photo: DaycarePhoto }) {
  return (
    <SitePhoto
      src={photo.src}
      alt={photo.alt}
      sizes="(max-width: 1024px) 100vw, 33vw"
    />
  );
}

function ExploreLink({
  href,
  label,
  description,
  external = false,
}: {
  href: string;
  label: string;
  description: string;
  external?: boolean;
}) {
  const className =
    "group flex items-start gap-3 rounded-2xl bg-sand/60 p-4 ring-1 ring-inset ring-clay/50 transition-colors hover:bg-sage-50 hover:ring-sage-200";

  const content = (
    <>
      <span className="flex-1">
        <span className="font-semibold text-bark group-hover:text-sage-700">{label}</span>
        <span className="mt-1 block text-sm text-bark-soft">{description}</span>
      </span>
      <ArrowRight
        className="mt-0.5 h-4 w-4 shrink-0 text-bark-faint transition-transform group-hover:translate-x-0.5 group-hover:text-sage-600"
        aria-hidden="true"
      />
    </>
  );

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function HowItem({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
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
