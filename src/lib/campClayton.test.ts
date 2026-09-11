import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  daycareThemes,
  getCurrentDaycareTheme,
  getDaycareWeekStatus,
  getNextDaycareTheme,
} from "@/data/summerDaycare";

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
  it("on September 11, 2026 labels Sep 7–11 as This week and Apple Orchard as Up next", () => {
    const now = chicagoNoon("2026-09-11");
    const workingDogs = themeByWeek(15);
    const appleOrchard = themeByWeek(16);
    const fallSniffari = themeByWeek(17);

    assert.equal(workingDogs.dateRange, "September 7–11");
    assert.equal(appleOrchard.name, "Apple Orchard Week");
    assert.equal(getCurrentDaycareTheme(now)?.week, 15);
    assert.equal(getNextDaycareTheme(now)?.week, 16);
    assert.equal(getDaycareWeekStatus(workingDogs, now), "current");
    assert.equal(getDaycareWeekStatus(appleOrchard, now), "next");
    assert.equal(getDaycareWeekStatus(fallSniffari, now), undefined);
    assert.equal(getDaycareWeekStatus(themeByWeek(14), now), "past");
  });

  it("beginning September 14, 2026 labels Apple Orchard as This week and Fall Sniffari as Up next", () => {
    const now = chicagoNoon("2026-09-14");
    const workingDogs = themeByWeek(15);
    const appleOrchard = themeByWeek(16);
    const fallSniffari = themeByWeek(17);
    const later = themeByWeek(18);

    assert.equal(getCurrentDaycareTheme(now)?.week, 16);
    assert.equal(getNextDaycareTheme(now)?.week, 17);
    assert.equal(getDaycareWeekStatus(workingDogs, now), "past");
    assert.equal(getDaycareWeekStatus(appleOrchard, now), "current");
    assert.equal(getDaycareWeekStatus(fallSniffari, now), "next");
    assert.equal(getDaycareWeekStatus(later, now), undefined);
  });

  it("on the weekend between sessions, only the coming week is Up next", () => {
    const now = chicagoNoon("2026-09-12");
    assert.equal(getCurrentDaycareTheme(now), undefined);
    assert.equal(getNextDaycareTheme(now)?.week, 16);
    assert.equal(getDaycareWeekStatus(themeByWeek(15), now), "past");
    assert.equal(getDaycareWeekStatus(themeByWeek(16), now), "next");
    assert.equal(getDaycareWeekStatus(themeByWeek(17), now), undefined);
  });
});
