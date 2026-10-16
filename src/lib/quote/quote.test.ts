import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import robots from "@/app/robots";
import { canonicalUrl } from "@/lib/metadata";
import {
  bookingStatusCard,
  buildQuoteScript,
  calculateQuote,
  classifyPickup,
  DEFAULT_QUOTE_RATES,
  DEFAULT_TRANSPORTATION_CENTS,
  firstDogNightlyCents,
  sharedAdditionalNightlyCents,
  type QuoteInput,
} from "@/lib/quote/calculateQuote";
import {
  formatCents,
  parseDollarsToCents,
  parseSignedDollarsToCents,
  percentOfCents,
} from "@/lib/quote/money";
import { buildSitemapEntries, sitemapExcludedPaths } from "@/lib/sitemapEntries";
import { mainNav, secondaryNav, servicesNav } from "@/lib/site";

function quote(overrides: Partial<QuoteInput> = {}): QuoteInput {
  return {
    ...DEFAULT_QUOTE_RATES,
    boardingCategory: "standard",
    firstDogCount: 1,
    sharedAdditionalCount: 2,
    separateCareCount: 0,
    dropoffDate: "2026-09-18",
    dropoffTime: "15:00",
    pickupDate: "2026-09-21",
    pickupTime: "15:00",
    transportationCents: 0,
    bathCount: 0,
    adjustmentCents: 0,
    adjustmentReason: "",
    internalNotes: "",
    clientRelationship: "new",
    fitCheckStatus: "required-before-booking",
    ...overrides,
  };
}

describe("quote money", () => {
  it("formats integer cents to two decimal places", () => {
    assert.equal(formatCents(7050), "$70.50");
    assert.equal(formatCents(1175), "$11.75");
    assert.equal(formatCents(32900), "$329.00");
    assert.equal(formatCents(105000), "$1,050.00");
    assert.equal(formatCents(-2500), "-$25.00");
    assert.equal(formatCents(0), "$0.00");
  });

  it("parses dollar strings without float leftovers", () => {
    assert.equal(parseDollarsToCents("50"), 5000);
    assert.equal(parseDollarsToCents("$23.50"), 2350);
    assert.equal(parseDollarsToCents("0"), 0);
    assert.equal(parseDollarsToCents(""), 0);
    assert.equal(parseSignedDollarsToCents("-25"), -2500);
    assert.equal(parseSignedDollarsToCents("+10.50"), 1050);
    assert.equal(percentOfCents(5000, 50), 2500);
    assert.equal(percentOfCents(2301, 50), 1151);
  });
});

describe("quote calculator", () => {
  it("Test 1: standard 3 dogs, 3 nights, on-time = $330", () => {
    const result = calculateQuote(quote());
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 3);
    assert.equal(result.dogCount, 3);
    assert.equal(result.pickupStatus, "on-time");
    assert.equal(result.boardingCategory, "standard");
    assert.equal(result.firstDogNightlyCents, 5000);
    assert.equal(result.sharedAdditionalNightlyCents, 3000);
    assert.equal(result.boardingCents, 33000);
    assert.equal(result.extendedCareCents, 0);
    assert.equal(result.totalCents, 33000);
    assert.equal(formatCents(result.totalCents), "$330.00");
  });

  it("Test 2: same 3-dog stay, pickup 3 hours later = $385", () => {
    const result = calculateQuote(quote({ pickupTime: "18:00" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.pickupStatus, "late");
    assert.equal(result.boardingCents, 33000);
    assert.equal(result.extendedCareCents, 5500);
    assert.equal(result.totalCents, 38500);
    assert.equal(
      buildQuoteScript(result),
      "For 3 dogs from Friday at 3:00 PM through Monday at 6:00 PM, including the late pickup, the estimated total would be $385.00.",
    );
  });

  it("Test 3: same 3-dog stay, pickup more than 8 hours later = $440", () => {
    const result = calculateQuote(quote({ pickupTime: "23:30" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.pickupStatus, "very-late");
    assert.equal(result.boardingCents, 33000);
    assert.equal(result.extendedCareCents, 11000);
    assert.equal(result.totalCents, 44000);
  });

  it("Test 4: two dogs, 2 nights, shared-household = $160", () => {
    const result = calculateQuote(
      quote({
        sharedAdditionalCount: 1,
        pickupDate: "2026-09-20",
      }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 2);
    assert.equal(result.boardingCents, 16000);
    assert.equal(result.totalCents, 16000);
  });

  it("Test 5: two dogs, 2 nights, separate-care additional = $180", () => {
    const result = calculateQuote(
      quote({
        sharedAdditionalCount: 0,
        separateCareCount: 1,
        pickupDate: "2026-09-20",
      }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 2);
    assert.equal(result.boardingCents, 18000);
    assert.equal(result.totalCents, 18000);
  });

  it("Test 6: one standard adult, 14 nights, Extended Stay = $658", () => {
    const result = calculateQuote(
      quote({
        boardingCategory: "extended-stay",
        sharedAdditionalCount: 0,
        pickupDate: "2026-10-02",
      }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 14);
    assert.equal(result.extendedStayEligible, true);
    assert.equal(result.firstDogNightlyCents, 4700);
    assert.equal(result.totalCents, 65800);
  });

  it("Test 7: two dogs, 14 nights, Extended Stay + shared additional = $1,050", () => {
    const result = calculateQuote(
      quote({
        boardingCategory: "extended-stay",
        sharedAdditionalCount: 1,
        pickupDate: "2026-10-02",
      }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 14);
    assert.equal(result.firstDogNightlyCents, 4700);
    assert.equal(result.sharedAdditionalNightlyCents, 2800);
    assert.equal(result.totalCents, 105000);
    assert.equal(formatCents(result.totalCents), "$1,050.00");
  });

  it("Test 8: $40 transportation is added; $0 is omitted from the total only as zero", () => {
    const withTransport = calculateQuote(
      quote({ transportationCents: DEFAULT_TRANSPORTATION_CENTS }),
    );
    assert.equal(withTransport.ok, true);
    if (!withTransport.ok) return;
    assert.equal(withTransport.transportationCents, 4000);
    assert.equal(withTransport.totalCents, 37000);

    const withoutTransport = calculateQuote(quote({ transportationCents: 0 }));
    assert.equal(withoutTransport.ok, true);
    if (!withoutTransport.ok) return;
    assert.equal(withoutTransport.transportationCents, 0);
    assert.equal(withoutTransport.totalCents, 33000);
  });

  it("Test 9: two baths add $50", () => {
    const result = calculateQuote(quote({ bathCount: 2 }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.bathCents, 5000);
    assert.equal(result.totalCents, 38000);
  });

  it("Test 10: client adjustment requires a reason and cannot go negative", () => {
    const reduced = calculateQuote(
      quote({
        adjustmentCents: -2500,
        adjustmentReason: "Friends & Family",
      }),
    );
    assert.equal(reduced.ok, true);
    if (!reduced.ok) return;
    assert.equal(reduced.totalCents, 30500);

    const increased = calculateQuote(
      quote({
        adjustmentCents: 1000,
        adjustmentReason: "Holiday add-on",
      }),
    );
    assert.equal(increased.ok, true);
    if (!increased.ok) return;
    assert.equal(increased.totalCents, 34000);

    const missingReason = calculateQuote(quote({ adjustmentCents: -2500 }));
    assert.equal(missingReason.ok, false);
    if (!missingReason.ok) {
      assert.equal(missingReason.error, "missing-adjustment-reason");
    }

    const tooNegative = calculateQuote(
      quote({
        adjustmentCents: -40000,
        adjustmentReason: "Too much",
      }),
    );
    assert.equal(tooNegative.ok, false);
    if (!tooNegative.ok) {
      assert.equal(tooNegative.error, "negative-total");
    }
  });

  it("Test 11: Fit Check and client relationship status cards", () => {
    const required = bookingStatusCard("new", "required-before-booking");
    assert.equal(required.title, "Booking status: Estimate only");
    assert.match(required.detail, /Meet & Greet \/ Fit Check is required/);

    const scheduled = bookingStatusCard("new", "scheduled");
    assert.equal(scheduled.title, "Booking status: Estimate only");
    assert.match(scheduled.detail, /Fit Check is scheduled/);

    const approved = bookingStatusCard("new", "completed-approved");
    assert.equal(approved.title, "Booking status: Fit Check complete");
    assert.match(approved.detail, /subject to date availability/);

    const returning = bookingStatusCard("returning", "returning-approved");
    assert.equal(returning.title, "Booking status: Returning-client estimate");

    const legacy = bookingStatusCard(
      "legacy-friends-family",
      "returning-approved",
    );
    assert.equal(legacy.title, "Booking status: Returning-client estimate");

    const roverClient = bookingStatusCard("rover", "required-before-booking");
    assert.equal(roverClient.title, "Booking status: Rover estimate");

    const roverFit = bookingStatusCard("new", "rover");
    assert.equal(roverFit.title, "Booking status: Rover estimate");
  });

  it("does not block calculation when Fit Check is still required", () => {
    const result = calculateQuote(quote());
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.bookingStatus.title, "Booking status: Estimate only");
    assert.equal(result.totalCents, 33000);
  });

  it("treats pickup exactly 2 hours later as on-time and just over as late", () => {
    assert.equal(classifyPickup("15:00", "17:00"), "on-time");
    assert.equal(classifyPickup("15:00", "17:01"), "late");
    const onTime = calculateQuote(quote({ pickupTime: "17:00" }));
    assert.equal(onTime.ok, true);
    if (onTime.ok) assert.equal(onTime.extendedCareCents, 0);
    const late = calculateQuote(quote({ pickupTime: "17:01" }));
    assert.equal(late.ok, true);
    if (late.ok) assert.equal(late.extendedCareCents, 5500);
  });

  it("treats pickup exactly 8 hours later as late, and just over as very late", () => {
    assert.equal(classifyPickup("15:00", "23:00"), "late");
    assert.equal(classifyPickup("15:00", "23:01"), "very-late");
    const late = calculateQuote(quote({ pickupTime: "23:00" }));
    assert.equal(late.ok, true);
    if (late.ok) assert.equal(late.extendedCareCents, 5500);
    const veryLate = calculateQuote(quote({ pickupTime: "23:01" }));
    assert.equal(veryLate.ok, true);
    if (veryLate.ok) assert.equal(veryLate.extendedCareCents, 11000);
  });

  it("rejects pickup before drop-off, same-day stays, and no dogs", () => {
    const before = calculateQuote(quote({ pickupDate: "2026-09-17" }));
    assert.equal(before.ok, false);
    if (!before.ok) assert.equal(before.error, "pickup-before-dropoff");

    const sameDay = calculateQuote(
      quote({ pickupDate: "2026-09-18", pickupTime: "18:00" }),
    );
    assert.equal(sameDay.ok, false);
    if (!sameDay.ok) assert.equal(sameDay.error, "same-day");

    const noDogs = calculateQuote(
      quote({ firstDogCount: 0, sharedAdditionalCount: 0, separateCareCount: 0 }),
    );
    assert.equal(noDogs.ok, false);
    if (!noDogs.ok) assert.equal(noDogs.error, "invalid-dogs");
  });

  it("asks for missing dates and times", () => {
    const missingDropoff = calculateQuote(quote({ dropoffDate: "" }));
    assert.equal(missingDropoff.ok, false);
    if (!missingDropoff.ok) assert.equal(missingDropoff.error, "missing-dropoff");
    const missingPickup = calculateQuote(quote({ pickupTime: "" }));
    assert.equal(missingPickup.ok, false);
    if (!missingPickup.ok) assert.equal(missingPickup.error, "missing-pickup");
  });

  it("does not auto-apply extended stay until that category is selected", () => {
    const longStandard = calculateQuote(
      quote({
        sharedAdditionalCount: 0,
        pickupDate: "2026-10-02",
      }),
    );
    assert.equal(longStandard.ok, true);
    if (!longStandard.ok) return;
    assert.equal(longStandard.extendedStayEligible, true);
    assert.equal(longStandard.boardingCategory, "standard");
    assert.equal(longStandard.firstDogNightlyCents, 5000);
    assert.equal(longStandard.totalCents, 70000);

    const tooShort = calculateQuote(
      quote({
        boardingCategory: "extended-stay",
        pickupDate: "2026-09-21",
      }),
    );
    assert.equal(tooShort.ok, false);
    if (!tooShort.ok) assert.equal(tooShort.error, "extended-stay-ineligible");
  });

  it("keeps puppy and holiday as exclusive first-dog rates", () => {
    assert.equal(firstDogNightlyCents("puppy", DEFAULT_QUOTE_RATES), 5500);
    assert.equal(firstDogNightlyCents("holiday", DEFAULT_QUOTE_RATES), 6000);
    assert.equal(
      sharedAdditionalNightlyCents("holiday", DEFAULT_QUOTE_RATES),
      3000,
    );
    const puppy = calculateQuote(
      quote({ boardingCategory: "puppy", sharedAdditionalCount: 0 }),
    );
    assert.equal(puppy.ok, true);
    if (puppy.ok) assert.equal(puppy.totalCents, 16500);
  });

  it("calculates Extended Care per dog rate, not from the boarding subtotal percent", () => {
    const result = calculateQuote(quote({ pickupTime: "18:00" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    const perDog =
      percentOfCents(5000, 50) +
      percentOfCents(3000, 50) +
      percentOfCents(3000, 50);
    assert.equal(result.extendedCareCents, perDog);
    assert.notEqual(percentOfCents(result.boardingCents, 50), perDog);
  });
});

describe("quote route stays unpublished", () => {
  it("is omitted from the generated sitemap", () => {
    assert.equal(sitemapExcludedPaths().includes("/quote"), true);
    const urls = buildSitemapEntries().map((entry) => entry.url);
    assert.equal(urls.includes(canonicalUrl("/quote")), false);
  });

  it("is disallowed in robots.txt", () => {
    const manifest = robots();
    const disallow = Array.isArray(manifest.rules)
      ? manifest.rules[0]?.disallow
      : manifest.rules.disallow;
    const blocked = Array.isArray(disallow) ? disallow : [disallow];
    assert.equal(blocked.includes("/quote"), true);
  });

  it("is not linked from public navigation configs or chrome", () => {
    for (const link of [...mainNav, ...secondaryNav, ...servicesNav]) {
      assert.notEqual(link.href, "/quote");
    }
    for (const file of [
      "src/components/layout/Header.tsx",
      "src/components/layout/Footer.tsx",
      "src/app/page.tsx",
      "src/lib/site.ts",
      "public/llms.txt",
    ]) {
      const text = readFileSync(file, "utf8");
      assert.equal(text.includes("/quote"), false, file);
    }
  });
});
