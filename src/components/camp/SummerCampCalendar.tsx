import Image from "next/image";
import Link from "next/link";
import {
  daycareMonthOrder,
  daycareThemes,
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
  /** Slightly denser layout for homepage embed */
  variant?: "full" | "home";
  className?: string;
};

function themesByMonth(): Record<DaycareMonth, DaycareTheme[]> {
  return daycareMonthOrder.reduce(
    (acc, month) => {
      acc[month] = daycareThemes.filter((theme) => theme.month === month);
      return acc;
    },
    {} as Record<DaycareMonth, DaycareTheme[]>,
  );
}

function WeekCard({
  theme,
  compact,
}: {
  theme: DaycareTheme;
  compact?: boolean;
}) {
  const photo = daycareThemePhotos[theme.week];

  return (
    <article
      id={`week-${theme.week}`}
      className="scroll-mt-28 overflow-hidden rounded-[20px] border border-border bg-soft-cream"
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
          <p className="text-[10.5px] font-medium tracking-[0.16em] text-rose-deep uppercase">
            Week {String(theme.week).padStart(2, "0")}
          </p>
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
            {theme.activities.slice(0, 3).map((activity) => (
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
  const grouped = themesByMonth();

  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <div className={compact ? "text-center" : undefined}>
        <p className="eyebrow tracking-[0.22em]">
          {summerDaycare.seasonLabel} · Camp calendar
        </p>
        <h2
          className={cn(
            "heading mt-1.5",
            compact ? "text-[36px]" : "text-[40px]",
          )}
        >
          Thirteen themed weeks of{" "}
          <span className="font-script font-normal text-rose">camp</span>
        </h2>
        <p className="dek mx-auto mt-3 max-w-2xl text-[15px]">
          {summerDaycare.intro} Drop in for a day or join the full week — request
          your dates on Rover.
        </p>
      </div>

      <div className={cn("mt-10 space-y-12", compact && "mt-8 space-y-10")}>
        {daycareMonthOrder.map((month) => {
          const monthPhoto = daycareMonthPhotos[month];
          const weeks = grouped[month];

          return (
            <div key={month}>
              <div className="relative mb-5 overflow-hidden rounded-[22px] border border-border">
                <div className="relative h-32 sm:h-36">
                  <Image
                    src={monthPhoto.src}
                    alt={monthPhoto.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-bark/55 to-bark/10" />
                  <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                    <div>
                      <p className="text-xs font-medium tracking-[0.18em] text-blush uppercase">
                        {month} {summerDaycare.seasonLabel.split(" ")[1]}
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
                {weeks.map((theme) => (
                  <WeekCard key={theme.week} theme={theme} compact={compact} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

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
              href="/summer-daycare#calendar"
              className="btn-pill btn-rose-outline px-6 py-3"
            >
              Full camp page →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
