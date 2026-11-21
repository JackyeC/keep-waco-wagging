import { cityConfig } from "@/lib/site";
import { getWacoTodayISO } from "@/data/summerDaycare";

/**
 * Pawsgiving Week 2026. Owner-confirmed hours, rate, and dates.
 * Set `enabled` to false to remove the note from every page at once.
 * It also hides on its own after November 27, 2026 (America/Chicago).
 */
export const pawsgivingWeek = {
  enabled: true,
  /** Inclusive last day the note may show, in America/Chicago. */
  visibleThrough: "2026-11-27",
  bookingHref: cityConfig.rover.profileUrl,
  ctaLabel: "Book a Day on Rover",
  eyebrow: "Pawsgiving Week",
  title: "Camp Waco is open all week",
  summary:
    "We're open Monday, November 23 through Friday, November 27, including Thanksgiving Day. Hours are 8 AM to 6 PM. The holiday rate is $45 per dog per day.",
  thanksgivingLine:
    "Thanksgiving Day, Thursday, November 26, is open.",
  bookingLine:
    "New dogs need a meet and greet first. Existing clients can book Camp Waco directly. New families book on Rover.",
} as const;

export function isPawsgivingNoteVisible(now = new Date()): boolean {
  if (!pawsgivingWeek.enabled) return false;
  return getWacoTodayISO(now) <= pawsgivingWeek.visibleThrough;
}

/** UTC instant when the note should disappear: midnight after the last visible Chicago day. */
export function pawsgivingNoteHidesAtUtc(): number {
  const [year, month, day] = pawsgivingWeek.visibleThrough.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  const iso = next.toISOString().slice(0, 10);
  let lo = Date.parse(`${iso}T00:00:00.000Z`) - 18 * 60 * 60 * 1000;
  let hi = Date.parse(`${iso}T00:00:00.000Z`) + 18 * 60 * 60 * 1000;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (getWacoTodayISO(new Date(mid)) < iso) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
