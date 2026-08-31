"use client";

import Image from "next/image";
import Link from "next/link";
import {
  daycareMonthOrder,
  daycareThemes,
  getCurrentDaycareTheme,
  getHomeDaycareThemes,
  getNextDaycareTheme,
  getUpcomingDaycareThemes,
  summerDaycare,
  type DaycareMonth,
  type DaycareTheme,
} from "@/data/summerDaycare";
import {
  daycareMonthPhotos,
  daycareThemePhotos,
} from "@/data/summerDaycarePhotos";
import { ctas } from "@/lib/site";
import { cn } from "@/lib/utils";

type SummerCampCalendarProps = {
  id?: string;
  /** Slightly denser layout for homepage/daycare embeds. */
  variant?: "full" | "home";
  className?: string;
};

function themesByMonth(themes: DaycareTheme[]): Partial<
  Record<DaycareMonth, DaycareTheme[]>
> {
  return themes.reduce(
    (acc, theme) => {
      (acc[theme.month] ??= []).push(theme);
      return acc;
    },
    {} as Partial<Record<DaycareMonth, DaycareTheme[]>>,
  );
}

function WeekCard({
  theme,
  compact,
  status,
}: {
  theme: DaycareTheme;
  compact?: boolean;
  status?: "current" | "next" | "past";
}) {
  const photo = daycareThemePhotos[theme.week];

  return (
    <article
      id={`week-${theme.week}`}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-[20px] border bg-soft-cream transition",
        status === "current"
          ? "border-wag-sage ring-2 ring-wag-sage/20"
          : "border-border",
        status === "past" && !compact && "opacity-65",
      )}
    >
      {photo && !compact && (
        <div className="relative h-36 w-full">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        </div>
      )}
      <div className={cn("p-5", compact && "p-4")}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10.5px] font-medium tracking-[0.16em] text-rose-deep uppercase">
              Week {String(theme.week).padStart(2, "0")}
            </p>
            {status === "current" && (
              <span className="rounded-full bg-wag-sage px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-cream uppercase">
                This week
              </span>
            )}
            {status === "next" && (
              <span className="rounded-full border border-rose/40 px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-rose-deep uppercase">
                Up next
              </span>
            )}
          </div>
          <p className="text-right text-[11px] font-light text-label-muted">
            {theme.dateRange}
          </p>
        </div>
        <h3
          className={cn(
            "mt-1 font-display font-semibold text-serif-ink",
            compact ? "text-lg" : "text-[21px]",
          )}
        >
          {theme.name}
        </h3>
        <p className={cn("body-light mt-2", compact && "text-[13px]")}>
          {theme.blurb}
        </p>
        {!compact && theme.activities.length > 0 && (
          <ul className="mt-3 space-y-1">
            {theme.activities.slice(0, 4).map((activity) => (
              <li
                key={activity}
                className="text-[12.5px] font-light text-body-muted-light before:mr-2 before:text-rose before:content-['♥']"
              >
                {activity}
              </li>
            ))}
          </ul>
        )}
        {theme.note && (
          <p className="mt-3 text-[12px] font-light text-label-muted italic">
            {theme.note}
          </p>
        )}
      </div>
    </article>
  );
}

export function SummerCampCalendar({
  id = "calendar",
  variant = "full",
  className,
}: SummerCampCalendarProps) {
  const compact = variant === "home";
  const upcomingThemes = getUpcomingDaycareThemes();
  const themes = compact ? getHomeDaycareThemes(4) : daycareThemes;
  const currentTheme = getCurrentDaycareTheme();
  const nextTheme = getNextDaycareTheme();
  const grouped = themesByMonth(themes);
  const months = daycareMonthOrder.filter(
    (month) => (grouped[month]?.length ?? 0) > 0,
  );
  const seasonComplete = upcomingThemes.length === 0;

  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <div className={compact ? "text-center" : undefined}>
        <p className="eyebrow tracking-[0.22em]">
          {summerDaycare.seasonLabel} · Daycare calendar
        </p>
        <h2
          className={cn(
            "heading mt-1.5",
            compact ? "text-[36px]" : "text-[40px]",
          )}
        >
          {seasonComplete ? (
            <>
              Camp Waco 2026 is{" "}
              <span className="font-script font-normal text-rose">wrapped</span>
            </>
          ) : compact ? (
            <>
              What&apos;s coming up at{" "}
              <span className="font-script font-normal text-rose">Camp Waco</span>
            </>
          ) : (
            <>
              The full year of{" "}
              <span className="font-script font-normal text-rose">Camp Waco</span>
            </>
          )}
        </h2>
        <p className="dek mx-auto mt-3 max-w-2xl text-[15px]">
          {seasonComplete
            ? "Thanks for a great year. Watch Keep Waco Wagging for the next Camp Waco calendar."
            : compact
              ? "A new daycare theme every week. Pick one day, three days, five days, or whatever fits your pup's routine — no full-week requirement."
              : `${summerDaycare.intro} Pick the days that fit your schedule — there is no full-week requirement.`}
        </p>
      </div>

      {(!seasonComplete || !compact) && (
        <div className={cn("mt-10 space-y-12", compact && "mt-8 space-y-10")}>
          {months.map((month) => {
            const monthPhoto = daycareMonthPhotos[month];
            const weeks = grouped[month] ?? [];

            return (
              <div key={month}>
                <div
                  className={cn(
                    "relative mb-5 overflow-hidden rounded-[22px] border border-border",
                    !monthPhoto && "bg-wag-sage",
                  )}
                >
                  <div className="relative h-32 sm:h-36">
                    {monthPhoto ? (
                      <>
                        <Image
                          src={monthPhoto.src}
                          alt={monthPhoto.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 1200px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-bark/55 to-bark/10" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-wag-sage to-wag-sage/75" />
                    )}
                    <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                      <div>
                        <p className="text-xs font-medium tracking-[0.18em] text-blush uppercase">
                          {month} {summerDaycare.yearLabel}
                        </p>
                        <p className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                          {weeks.length} themed {weeks.length === 1 ? "week" : "weeks"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "grid gap-4",
                    compact
                      ? "sm:grid-cols-2 lg:grid-cols-3"
                      : "md:grid-cols-2 xl:grid-cols-3",
                  )}
                >
                  {weeks.map((theme) => {
                    const status =
                      currentTheme?.week === theme.week
                        ? "current"
                        : nextTheme?.week === theme.week
                          ? "next"
                          : theme.endsOn <
                              new Intl.DateTimeFormat("en-CA", {
                                timeZone: "America/Chicago",
                              }).format(new Date())
                            ? "past"
                            : undefined;

                    return (
                      <WeekCard
                        key={theme.week}
                        theme={theme}
                        compact={compact}
                        status={status}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className={cn(
          "mt-10 flex flex-wrap items-center justify-center gap-3 rounded-[22px] border border-border bg-soft-cream px-6 py-6 text-center sm:justify-between sm:text-left",
          compact && "mt-8",
        )}
      >
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
            Booking
          </p>
          <p className="mt-1 font-display text-xl font-semibold text-serif-ink">
            {summerDaycare.dailyRate} · {summerDaycare.hours}
          </p>
          <p className="body-light mt-1 max-w-md">{summerDaycare.bookingNote}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={ctas.bookPetCare.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-sage px-6 py-3"
          >
            Reserve on Rover
          </a>
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
              Full Camp Waco calendar →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
