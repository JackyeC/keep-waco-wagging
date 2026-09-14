import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  campClayton,
  campClaytonCalendars,
  daycareThemes,
  getApprovedCalendar,
  getCampClaytonSchedule,
  getCurrentDaycareTheme,
  getDaycareWeekStatus,
  getNextDaycareTheme,
  isNextDaycareTheme,
  isThemeVisibleInArchive,
} from "@/data/summerDaycare";
import {
  campClaytonHeroPhoto,
  campClaytonLifePhotos,
} from "@/data/summerDaycarePhotos";
import { cityConfig } from "@/lib/site";
import { getServicePage } from "@/data/servicePages";

/** Midday America/Chicago (CDT, UTC-5) so date math is not timezone-flaky. */
function chicagoNoon(isoDate: string): Date {
  return new Date(`${isoDate}T17:00:00.000Z`);
}

function themeByWeek(week: number) {
  const theme = daycareThemes.find((item) => item.week === week);
  assert.ok(theme, `Expected week ${week} in the Camp Clayton calendar`);
  return theme;
}

describe("Camp Clayton week status", () => {
  it("on September 11, 2026 labels Sep 7–11 as current and Apple Orchard as up next", () => {
    const now = chicagoNoon("2026-09-11");
    const workingDogs = themeByWeek(15);
    const appleOrchard = themeByWeek(16);
    const fallSniffari = themeByWeek(17);

    assert.equal(workingDogs.dateRange, "September 7–11");
    assert.equal(appleOrchard.name, "Apple Orchard Week");
    assert.equal(getCurrentDaycareTheme(now)?.week, 15);
    assert.equal(getNextDaycareTheme(now)?.week, 16);
    assert.equal(getDaycareWeekStatus(workingDogs, now), "current");
    assert.equal(getDaycareWeekStatus(appleOrchard, now), "upcoming");
    assert.equal(isNextDaycareTheme(appleOrchard, now), true);
    assert.equal(getDaycareWeekStatus(fallSniffari, now), "upcoming");
    assert.equal(isNextDaycareTheme(fallSniffari, now), false);
    assert.equal(getDaycareWeekStatus(themeByWeek(14), now), "past");
  });

  it("on September 14, 2026 labels Apple Orchard as current and Fall Sniffari as up next", () => {
    const now = chicagoNoon("2026-09-14");
    const workingDogs = themeByWeek(15);
    const appleOrchard = themeByWeek(16);
    const fallSniffari = themeByWeek(17);
    const later = themeByWeek(18);
    const schedule = getCampClaytonSchedule(now);

    assert.equal(getCurrentDaycareTheme(now)?.week, 16);
    assert.equal(getNextDaycareTheme(now)?.week, 17);
    assert.equal(getDaycareWeekStatus(workingDogs, now), "past");
    assert.equal(getDaycareWeekStatus(appleOrchard, now), "current");
    assert.equal(getDaycareWeekStatus(fallSniffari, now), "upcoming");
    assert.equal(isNextDaycareTheme(fallSniffari, now), true);
    assert.equal(getDaycareWeekStatus(later, now), "upcoming");
    assert.equal(isNextDaycareTheme(later, now), false);

    assert.equal(schedule.current?.name, "Apple Orchard Week");
    assert.equal(schedule.current?.dateRange, "September 14–18");
    assert.equal(schedule.next?.name, "Fall Sniffari");
    assert.equal(schedule.next?.dateRange, "September 21–25");
    assert.ok(schedule.comingUp.every((theme) => theme.startsOn > "2026-09-21"));
    assert.ok(schedule.comingUp.some((theme) => theme.month === "December"));
    assert.equal(
      schedule.comingUp[schedule.comingUp.length - 1]?.name,
      "New Year's Paw-ty Week",
    );
    assert.ok(schedule.past.some((theme) => theme.name === "Working Dogs Week"));
    assert.equal(schedule.showComingNextYear, false);
  });

  it("does not treat UTC midnight on September 14 as Chicago September 14", () => {
    const utcMidnight = new Date("2026-09-14T00:00:00.000Z");
    assert.equal(getCurrentDaycareTheme(utcMidnight), undefined);
    assert.equal(getNextDaycareTheme(utcMidnight)?.name, "Apple Orchard Week");
    assert.equal(
      getDaycareWeekStatus(themeByWeek(16), utcMidnight),
      "upcoming",
    );
  });

  it("on the weekend between sessions, only the coming week is up next", () => {
    const now = chicagoNoon("2026-09-12");
    assert.equal(getCurrentDaycareTheme(now), undefined);
    assert.equal(getNextDaycareTheme(now)?.week, 16);
    assert.equal(getDaycareWeekStatus(themeByWeek(15), now), "past");
    assert.equal(getDaycareWeekStatus(themeByWeek(16), now), "upcoming");
    assert.equal(isNextDaycareTheme(themeByWeek(16), now), true);
    assert.equal(getDaycareWeekStatus(themeByWeek(17), now), "upcoming");
    assert.equal(isNextDaycareTheme(themeByWeek(17), now), false);
  });

  it("moves completed weeks into the archive after they end", () => {
    const now = chicagoNoon("2026-09-19");
    const schedule = getCampClaytonSchedule(now);
    assert.equal(schedule.current, undefined);
    assert.equal(schedule.next?.name, "Fall Sniffari");
    assert.ok(schedule.past.some((theme) => theme.name === "Apple Orchard Week"));
    assert.ok(
      !schedule.comingUp.some((theme) => theme.name === "Apple Orchard Week"),
    );
  });
});

describe("Camp Clayton multi-year calendar", () => {
  it("does not generate a 2027 calendar automatically", () => {
    assert.equal(getApprovedCalendar(2027), undefined);
    assert.equal(
      campClaytonCalendars.some((calendar) => calendar.year === 2027),
      false,
    );
  });

  it("keeps remaining 2026 weeks after October 1 and waits for an approved next-year calendar", () => {
    const now = chicagoNoon("2026-10-01");
    const schedule = getCampClaytonSchedule(now);
    assert.equal(schedule.primaryYear, 2026);
    assert.equal(schedule.showComingNextYear, false);
    assert.equal(schedule.comingNextYear.length, 0);
    assert.ok(schedule.comingUp.some((theme) => theme.month === "December"));
  });

  it("makes 2027 the primary year on January 1 while a spanning 2026 week can still be current", () => {
    const now = chicagoNoon("2027-01-01");
    const schedule = getCampClaytonSchedule(now);
    assert.equal(schedule.primaryYear, 2027);
    assert.equal(schedule.current?.name, "New Year's Paw-ty Week");
    assert.ok(schedule.past.every((theme) => theme.endsOn < "2027-01-01"));
    assert.equal(schedule.comingUp.length, 0);
  });
});

describe("Camp Clayton calendar integrity", () => {
  it("has no overlapping or duplicate 2026 weeks", () => {
    const sorted = daycareThemes.slice().sort((a, b) =>
      a.startsOn.localeCompare(b.startsOn),
    );
    for (let index = 1; index < sorted.length; index += 1) {
      const previous = sorted[index - 1];
      const current = sorted[index];
      assert.ok(
        previous.endsOn < current.startsOn,
        `Overlap or duplicate: ${previous.name} (${previous.startsOn}–${previous.endsOn}) vs ${current.name} (${current.startsOn}–${current.endsOn})`,
      );
    }
  });

  it("includes every approved 2026 week from Apple Orchard through December", () => {
    const now = chicagoNoon("2026-09-14");
    const schedule = getCampClaytonSchedule(now);
    const active = [
      schedule.current,
      schedule.next,
      ...schedule.comingUp,
    ].filter((theme): theme is NonNullable<typeof theme> => Boolean(theme));

    assert.equal(active[0]?.name, "Apple Orchard Week");
    const last = active[active.length - 1];
    assert.ok(last);
    assert.ok(last.startsOn.startsWith("2026-12") || last.endsOn >= "2026-12-28");
    assert.equal(active.length, 16);
  });

  it("hides archive weeks until verified theme photos exist", () => {
    const now = chicagoNoon("2026-09-14");
    const schedule = getCampClaytonSchedule(now);
    const visibleNames = schedule.pastVisible.map((theme) => theme.name);

    assert.deepEqual(visibleNames, [
      "Back-to-School Manners Camp",
      "Luau Week",
      "Tailgate Week",
    ]);
    assert.ok(
      schedule.past.some((theme) => theme.name === "Working Dogs Week"),
    );
    assert.equal(
      schedule.pastVisible.some((theme) => theme.name === "Working Dogs Week"),
      false,
    );

    for (const theme of daycareThemes) {
      const hasPhotos = (theme.photos?.length ?? 0) > 0;
      assert.equal(isThemeVisibleInArchive(theme), hasPhotos);
    }
  });
});

describe("Camp Clayton booking and photos", () => {
  it("keeps Rover as the only Camp Clayton booking destination", () => {
    const page = getServicePage("summer-daycare");
    assert.equal(campClayton.bookingUrl, cityConfig.rover.profileUrl);
    assert.equal(page.hero.primary.href, cityConfig.rover.profileUrl);
    assert.equal(page.cta.primary.href, cityConfig.rover.profileUrl);
  });

  it("does not use Yappy Hour photos for Camp Clayton life or hero images", () => {
    const srcs = [
      campClaytonHeroPhoto.src,
      ...campClaytonLifePhotos.map((photo) => photo.src),
    ];
    for (const src of srcs) {
      assert.equal(src.includes("yappy"), false);
    }
  });

  it("attaches verified theme photos only to matching weeks", () => {
    const school = themeByWeek(12);
    const luau = themeByWeek(13);
    const tailgate = themeByWeek(14);
    const workingDogs = themeByWeek(15);

    assert.equal(school.photos?.length, 4);
    assert.equal(luau.photos?.length, 7);
    assert.equal(tailgate.photos?.length, 1);
    assert.equal(workingDogs.photos?.length ?? 0, 0);

    const themeSrcs = [
      ...(school.photos ?? []),
      ...(luau.photos ?? []),
      ...(tailgate.photos ?? []),
    ].map((photo) => photo.src);

    assert.ok(themeSrcs.every((src) => src.startsWith("/pictures/camp-clayton/")));
    assert.ok(themeSrcs.every((src) => !src.includes("yappy")));
    assert.ok(themeSrcs.every((src) => !src.includes("life-walk")));
    assert.ok(
      campClaytonLifePhotos.some((photo) =>
        photo.src.endsWith("life-couch-jackye.webp"),
      ),
    );
    assert.ok(
      campClaytonLifePhotos.some((photo) =>
        photo.src.endsWith("life-group-rest.webp"),
      ),
    );
  });

  it("uses Camp Clayton as the brand name on the camp page", () => {
    const page = getServicePage("summer-daycare");
    assert.equal(page.hero.title, "Camp Clayton");
    assert.equal(page.hero.description.includes("China Spring"), true);
    assert.equal(page.seo.title.startsWith("Camp Clayton"), true);
    assert.equal(page.seo.title.includes("Camp Waco"), false);
    assert.equal(page.seo.description.includes("China Spring"), true);
  });
});
