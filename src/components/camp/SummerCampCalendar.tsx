"use client";

import Image from "next/image";
import Link from "next/link";
import { CampClaytonBookingNote } from "@/components/camp/CampClaytonBookingNote";
import {
  campClayton,
  getCampClaytonSchedule,
  groupThemesByMonth,
  type DaycareTheme,
} from "@/data/summerDaycare";
import { getThemeGallery } from "@/data/summerDaycarePhotos";
import { cityConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type SummerCampCalendarProps = {
  id?: string;
  /** Slightly denser layout for homepage/daycare embeds. */
  variant?: "full" | "home";
  className?: string;
};

function RoverBookButton({
  className,
  label = "Book a Day on Rover",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={cityConfig.rover.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn-pill btn-sage px-6 py-3", className)}
    >
      {label}
    </a>
  );
}

function ThemePhotoStrip({ theme }: { theme: DaycareTheme }) {
  const photos = getThemeGallery(theme);
  if (photos.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-2",
        photos.length === 1 ? "grid-cols-1" : "grid-cols-2",
      )}
    >
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="relative aspect-[4/3] overflow-hidden rounded-[14px]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover"
            style={
              photo.objectPosition
                ? { objectPosition: photo.objectPosition }
                : undefined
            }
          />
        </div>
      ))}
    </div>
  );
}

function WeekCard({
  theme,
  variant,
  showBooking,
}: {
  theme: DaycareTheme;
  variant: "featured" | "next" | "compact" | "archive";
  showBooking: boolean;
}) {
  const featured = variant === "featured";
  const compact = variant === "compact" || variant === "archive";
  const next = variant === "next";

  return (
    <article
      id={`week-${getThemeCalendarSafeId(theme)}`}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-[20px] border bg-soft-cream",
        featured && "border-wag-sage ring-2 ring-wag-sage/20",
        next && "border-rose/40",
        !featured && !next && "border-border",
      )}
    >
      {featured && <ThemePhotoStrip theme={theme} />}
      {variant === "archive" && <ThemePhotoStrip theme={theme} />}
      <div className={cn("p-5", compact && "p-4")}>
        {(featured || next) && (
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {featured && (
              <span className="rounded-full bg-wag-sage px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-cream uppercase">
                This week
              </span>
            )}
            {next && (
              <span className="rounded-full border border-rose/40 px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-rose-deep uppercase">
                Up next
              </span>
            )}
          </div>
        )}
        <h3
          className={cn(
            "font-display font-semibold text-serif-ink",
            featured || next ? "text-[21px]" : "text-lg",
          )}
        >
          {theme.name}
        </h3>
        <p className="mt-1 text-[13px] font-medium text-label-muted">
          {theme.dateRange}
        </p>
        {(featured || next || !compact) && (
          <p className={cn("body-light mt-2", compact && "text-[13px]")}>
            {theme.blurb}
          </p>
        )}
        {featured && theme.activities.length > 0 && (
          <ul className="mt-3 space-y-1">
            {theme.activities.map((activity) => (
              <li
                key={activity}
                className="text-[12.5px] font-light text-body-muted-light before:mr-2 before:text-rose before:content-['♥']"
              >
                {activity}
              </li>
            ))}
          </ul>
        )}
        {theme.note && featured && (
          <p className="mt-3 text-[12px] font-light text-label-muted italic">
            {theme.note}
          </p>
        )}
        {showBooking && (
          <div className="mt-4">
            <RoverBookButton className={compact ? "px-5 py-2.5 text-[12px]" : undefined} />
          </div>
        )}
      </div>
    </article>
  );
}

function getThemeCalendarSafeId(theme: DaycareTheme): string {
  return `${theme.startsOn}-${theme.week}`;
}

function SectionHeading({
  eyebrow,
  title,
  script,
}: {
  eyebrow: string;
  title: string;
  script?: string;
}) {
  return (
    <div>
      <p className="eyebrow tracking-[0.22em]">{eyebrow}</p>
      <h2 className="heading mt-1.5 text-[clamp(1.75rem,3vw,2.35rem)]">
        {title}
        {script ? (
          <>
            {" "}
            <span className="font-script font-normal text-rose">{script}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

export function SummerCampCalendar({
  id = "calendar",
  variant = "full",
  className,
}: SummerCampCalendarProps) {
  const compact = variant === "home";
  const schedule = getCampClaytonSchedule();
  const comingUpPreview = compact ? schedule.comingUp.slice(0, 4) : schedule.comingUp;
  const pastGroups = groupThemesByMonth(schedule.pastVisible);
  const seasonComplete =
    !schedule.current && !schedule.next && schedule.comingUp.length === 0;

  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <div className={compact ? "text-center" : undefined}>
        <p className="eyebrow tracking-[0.22em]">
          {campClayton.seasonLabel} · Daycare calendar
        </p>
        <h2
          className={cn(
            "heading mt-1.5",
            compact ? "text-[36px]" : "text-[40px]",
          )}
        >
          {seasonComplete ? (
            <>
              Camp Clayton {schedule.primaryYear} is{" "}
              <span className="font-script font-normal text-rose">wrapped</span>
            </>
          ) : compact ? (
            <>
              What&apos;s coming up at{" "}
              <span className="font-script font-normal text-rose">Camp Clayton</span>
            </>
          ) : (
            <>
              This season at{" "}
              <span className="font-script font-normal text-rose">Camp Clayton</span>
            </>
          )}
        </h2>
        <p className="dek mx-auto mt-3 max-w-2xl text-[15px]">
          {seasonComplete
            ? "Thanks for a great year. Watch Keep Waco Wagging for the next Camp Clayton calendar."
            : compact
              ? "A new daycare theme every week. Pick one day, several days, or a regular weekday schedule — no full-week commitment."
              : `${campClayton.intro} ${campClayton.bookingNote}`}
        </p>
      </div>

      {schedule.current && (
        <div className="mt-10">
          <SectionHeading
            eyebrow="Right now"
            title="This week at"
            script="Camp Clayton"
          />
          <div className="mt-5 max-w-2xl">
            <WeekCard theme={schedule.current} variant="featured" showBooking />
          </div>
        </div>
      )}

      {schedule.next && (
        <div className="mt-12">
          <SectionHeading eyebrow="Next on the calendar" title="Up next" />
          <div className="mt-5 max-w-2xl">
            <WeekCard theme={schedule.next} variant="next" showBooking />
          </div>
        </div>
      )}

      {comingUpPreview.length > 0 && (
        <div className="mt-12">
          <SectionHeading
            eyebrow="Bookable dates"
            title="Coming up"
          />
          <p className="dek mt-2 max-w-2xl text-[14.5px]">
            Remaining Camp Clayton weeks through December {schedule.primaryYear}.
            Theme names and dates are on every card.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {comingUpPreview.map((theme) => (
              <WeekCard
                key={getThemeCalendarSafeId(theme)}
                theme={theme}
                variant="compact"
                showBooking
              />
            ))}
          </div>
        </div>
      )}

      {schedule.showComingNextYear && schedule.comingNextYear.length > 0 && (
        <div className="mt-12">
          <SectionHeading
            eyebrow={`${schedule.primaryYear + 1} calendar`}
            title="Coming next year"
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {schedule.comingNextYear.map((theme) => (
              <WeekCard
                key={getThemeCalendarSafeId(theme)}
                theme={theme}
                variant="compact"
                showBooking
              />
            ))}
          </div>
        </div>
      )}

      {!compact && schedule.past.length > 0 && (
        <details className="group mt-14 rounded-[22px] border border-border bg-soft-cream px-5 py-4 md:px-8 md:py-6">
          <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow tracking-[0.22em]">Archive</p>
                <h2 className="heading mt-1.5 text-[clamp(1.6rem,3vw,2.1rem)]">
                  Past Camp Adventures
                </h2>
              </div>
              <span className="text-[12px] font-medium tracking-[0.12em] text-wag-sage uppercase">
                <span className="group-open:hidden">Show archive</span>
                <span className="hidden group-open:inline">Hide archive</span>
              </span>
            </div>
          </summary>
          <p className="body-light mt-3 max-w-2xl text-[14.5px]">
            Completed Camp Clayton weeks move here automatically. Weeks stay
            hidden until we have real photos from that theme.
          </p>
          {pastGroups.length === 0 ? (
            <p className="mt-5 text-[14.5px] text-label-muted">
              Photos from past Camp Clayton weeks will appear here as we add
              them.
            </p>
          ) : (
            <div className="mt-6 space-y-8">
              {pastGroups.map((group) => (
                <div key={`${group.year}-${group.month}`}>
                  <p className="text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
                    {group.month} {group.year}
                  </p>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {group.themes.map((theme) => (
                      <WeekCard
                        key={getThemeCalendarSafeId(theme)}
                        theme={theme}
                        variant="archive"
                        showBooking={false}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </details>
      )}

      <div
        className={cn(
          "mt-10 rounded-[22px] border border-border bg-soft-cream px-6 py-6",
          compact && "mt-8",
        )}
      >
        <CampClaytonBookingNote className="border-0 bg-transparent p-0" />
        <div className="mt-4 flex flex-wrap gap-3">
          <RoverBookButton />
          {!compact && (
            <Link href="/book" className="btn-pill btn-rose-outline px-6 py-3">
              All booking options
            </Link>
          )}
          {compact && (
            <Link
              href="/camp-waco#calendar"
              className="btn-pill btn-rose-outline px-6 py-3"
            >
              Full Camp Clayton calendar
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
