import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import robots from "@/app/robots";
import { canonicalUrl } from "@/lib/metadata";
import {
  buildQuoteScript,
  calculateQuote,
  classifyPickup,
  DEFAULT_ADDITIONAL_DOG_PERCENT,
  DEFAULT_FIRST_DOG_NIGHTLY_CENTS,
  nightlyRateCents,
  type QuoteInput,
} from "@/lib/quote/calculateQuote";
import { formatCents, parseDollarsToCents, percentOfCents } from "@/lib/quote/money";
import { buildSitemapEntries, sitemapExcludedPaths } from "@/lib/sitemapEntries";
import { mainNav, secondaryNav, servicesNav } from "@/lib/site";

const DEFAULT_RATES = {
  firstDogNightlyCents: DEFAULT_FIRST_DOG_NIGHTLY_CENTS,
  additionalDogPercent: DEFAULT_ADDITIONAL_DOG_PERCENT,
} as const;

function quote(overrides: Partial<QuoteInput> = {}): QuoteInput {
  return {
    dogCount: 3,
    dropoffDate: "2026-09-18",
    dropoffTime: "15:00",
    pickupDate: "2026-09-21",
    pickupTime: "15:00",
    transportationCents: 0,
    ...DEFAULT_RATES,
    ...overrides,
  };
}

describe("quote money", () => {
  it("formats integer cents to two decimal places", () => {
    assert.equal(formatCents(7050), "$70.50");
    assert.equal(formatCents(1175), "$11.75");
    assert.equal(formatCents(32900), "$329.00");
    assert.equal(formatCents(0), "$0.00");
  });

  it("parses dollar strings without float leftovers", () => {
    assert.equal(parseDollarsToCents("47"), 4700);
    assert.equal(parseDollarsToCents("$23.50"), 2350);
    assert.equal(parseDollarsToCents("0"), 0);
    assert.equal(parseDollarsToCents(""), 0);
    assert.equal(percentOfCents(4700, 50), 2350);
    assert.equal(percentOfCents(2350, 50), 1175);
  });
});

describe("quote calculator", () => {
  it("Test 1: 3 dogs, 3 nights, no late pickup = $282", () => {
    const result = calculateQuote(quote());
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 3);
    assert.equal(result.pickupStatus, "on-time");
    assert.deepEqual(
      result.dogs.map((dog) => dog.boardingCents),
      [14100, 7050, 7050],
    );
    assert.equal(result.boardingCents, 28200);
    assert.equal(result.extendedCareCents, 0);
    assert.equal(result.totalCents, 28200);
    assert.equal(formatCents(result.dogs[1]!.boardingCents), "$70.50");
  });

  it("Test 2: 3 dogs, 3 nights, pickup 3 hours later = $329", () => {
    const result = calculateQuote(quote({ pickupTime: "18:00" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 3);
    assert.equal(result.pickupStatus, "late");
    assert.equal(result.boardingCents, 28200);
    assert.deepEqual(
      result.dogs.map((dog) => dog.extendedCareCents),
      [2350, 1175, 1175],
    );
    assert.equal(result.extendedCareCents, 4700);
    assert.equal(result.totalCents, 32900);
    assert.equal(
      buildQuoteScript(result),
      "For 3 dogs from Friday at 3:00 PM through Monday at 6:00 PM, including the late pickup, your total would be $329.00.",
    );
  });

  it("Test 3: 3 dogs, 3 nights, pickup more than 8 hours later = $376", () => {
    const result = calculateQuote(quote({ pickupTime: "23:30" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.pickupStatus, "very-late");
    assert.equal(result.boardingCents, 28200);
    assert.deepEqual(
      result.dogs.map((dog) => dog.extendedCareCents),
      [4700, 2350, 2350],
    );
    assert.equal(result.extendedCareCents, 9400);
    assert.equal(result.totalCents, 37600);
  });

  it("Test 4: 2 dogs, 2 nights, no Extended Care = $141", () => {
    const result = calculateQuote(
      quote({
        dogCount: 2,
        pickupDate: "2026-09-20",
        pickupTime: "15:00",
      }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.nights, 2);
    assert.equal(result.pickupStatus, "on-time");
    assert.deepEqual(
      result.dogs.map((dog) => dog.boardingCents),
      [9400, 4700],
    );
    assert.equal(result.totalCents, 14100);
    assert.equal(
      buildQuoteScript(result),
      "For 2 dogs from Friday at 3:00 PM through Sunday at 3:00 PM, your total would be $141.00.",
    );
  });

  it("lists each additional dog separately", () => {
    const result = calculateQuote(quote({ dogCount: 5 }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.dogs.length, 5);
    assert.equal(result.dogs[0]!.nightlyCents, 4700);
    for (const dog of result.dogs.slice(1)) {
      assert.equal(dog.nightlyCents, 2350);
    }
  });

  it("treats pickup exactly 2 hours later as on-time", () => {
    assert.equal(classifyPickup("15:00", "17:00"), "on-time");
    const result = calculateQuote(quote({ pickupTime: "17:00" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.pickupStatus, "on-time");
    assert.equal(result.extendedCareCents, 0);
  });

  it("treats pickup just over 2 hours later as late", () => {
    assert.equal(classifyPickup("15:00", "17:01"), "late");
    const result = calculateQuote(quote({ pickupTime: "17:01" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.pickupStatus, "late");
    assert.equal(result.extendedCareCents, 4700);
  });

  it("treats pickup exactly 8 hours later as late, not very late", () => {
    assert.equal(classifyPickup("15:00", "23:00"), "late");
    const result = calculateQuote(quote({ pickupTime: "23:00" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.pickupStatus, "late");
    assert.equal(result.extendedCareCents, 4700);
  });

  it("treats pickup just over 8 hours later as very late", () => {
    assert.equal(classifyPickup("15:00", "23:01"), "very-late");
    const result = calculateQuote(quote({ pickupTime: "23:01" }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.pickupStatus, "very-late");
    assert.equal(result.extendedCareCents, 9400);
  });

  it("rejects pickup before drop-off", () => {
    const result = calculateQuote(
      quote({ pickupDate: "2026-09-17", pickupTime: "18:00" }),
    );
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.error, "pickup-before-dropoff");
  });

  it("rejects same-day pickup even when later that afternoon", () => {
    const result = calculateQuote(
      quote({ pickupDate: "2026-09-18", pickupTime: "18:00" }),
    );
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.error, "same-day");
  });

  it("asks for missing dates and times", () => {
    const missingDropoff = calculateQuote(quote({ dropoffDate: "" }));
    assert.equal(missingDropoff.ok, false);
    if (!missingDropoff.ok) {
      assert.equal(missingDropoff.error, "missing-dropoff");
    }
    const missingPickup = calculateQuote(quote({ pickupTime: "" }));
    assert.equal(missingPickup.ok, false);
    if (!missingPickup.ok) {
      assert.equal(missingPickup.error, "missing-pickup");
    }
  });

  it("adds transportation only when it is more than zero", () => {
    const withTransport = calculateQuote(quote({ transportationCents: 2500 }));
    assert.equal(withTransport.ok, true);
    if (!withTransport.ok) return;
    assert.equal(withTransport.totalCents, 30700);
    assert.equal(
      buildQuoteScript(withTransport),
      "For 3 dogs from Friday at 3:00 PM through Monday at 3:00 PM, including pickup and drop-off, your total would be $307.00.",
    );
  });

  it("keeps additional dogs at 50% of the first dog rate", () => {
    assert.equal(
      nightlyRateCents(1, DEFAULT_RATES),
      DEFAULT_FIRST_DOG_NIGHTLY_CENTS,
    );
    assert.equal(nightlyRateCents(2, DEFAULT_RATES), 2350);
    assert.equal(nightlyRateCents(4, DEFAULT_RATES), 2350);
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
