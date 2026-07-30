import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getHomeDaycareThemes,
  getUpcomingDaycareThemes,
} from "@/data/summerDaycare";
import {
  getOpenYappyHourEvents,
  getUpcomingYappyHourEvents,
} from "@/data/yappyHours";

describe("upcoming content filters", () => {
  it("hides past Yappy Hours and keeps August open", () => {
    const now = new Date("2026-07-29T12:00:00");
    const upcoming = getUpcomingYappyHourEvents(now);
    const open = getOpenYappyHourEvents(now);

    assert.equal(upcoming.length, 1);
    assert.equal(upcoming[0].id, "pupsicle-members-august");
    assert.equal(open.length, 1);
    assert.equal(open[0].rsvpOpen, true);
  });

  it("limits homepage camp weeks to upcoming only", () => {
    const now = new Date("2026-07-29T12:00:00");
    const upcoming = getUpcomingDaycareThemes(now);
    const home = getHomeDaycareThemes(4, now);

    assert.ok(upcoming.every((theme) => theme.endsOn >= "2026-07-29"));
    assert.equal(home.length, 4);
    assert.equal(home[0].week, 9);
    assert.equal(home[3].week, 12);
  });
});
