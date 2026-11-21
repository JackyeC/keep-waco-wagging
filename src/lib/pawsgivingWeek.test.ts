import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getWacoTodayISO } from "@/data/summerDaycare";
import {
  isPawsgivingNoteVisible,
  pawsgivingNoteHidesAtUtc,
  pawsgivingWeek,
} from "@/data/pawsgivingWeek";

describe("Pawsgiving Week note", () => {
  it("shows through the evening of November 27 in Chicago and hides on November 28", () => {
    const lastEvening = new Date("2026-11-28T05:59:00.000Z");
    const nextMorning = new Date("2026-11-28T06:00:00.000Z");

    assert.equal(getWacoTodayISO(lastEvening), "2026-11-27");
    assert.equal(isPawsgivingNoteVisible(lastEvening), true);
    assert.equal(getWacoTodayISO(nextMorning), "2026-11-28");
    assert.equal(isPawsgivingNoteVisible(nextMorning), false);
    assert.equal(pawsgivingNoteHidesAtUtc(), Date.parse("2026-11-28T06:00:00.000Z"));
  });

  it("is visible before the week starts", () => {
    assert.equal(
      isPawsgivingNoteVisible(new Date("2026-11-21T18:00:00.000Z")),
      true,
    );
  });

  it("keeps the public copy free of dashes and states the confirmed facts", () => {
    const copy = [
      pawsgivingWeek.title,
      pawsgivingWeek.summary,
      pawsgivingWeek.thanksgivingLine,
      pawsgivingWeek.bookingLine,
      pawsgivingWeek.ctaLabel,
    ].join(" ");

    assert.equal(copy.includes("—"), false);
    assert.equal(copy.includes("–"), false);
    assert.equal(copy.includes("-"), false);
    assert.equal(copy.includes("Thanksgiving Day"), true);
    assert.equal(copy.includes("$45 per dog per day"), true);
    assert.equal(copy.includes("8 AM to 6 PM"), true);
    assert.equal(copy.includes("meet and greet"), true);
    assert.equal(pawsgivingWeek.bookingHref.includes("rover.com"), true);
  });
});
