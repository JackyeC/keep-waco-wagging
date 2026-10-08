import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { confirmedEvents, dinnerClub, planned2027Experiences } from "@/data/events";
import { eventSponsorTiers } from "@/data/partnerships";
import { wagClubMembership } from "@/data/wagClubMembership";
import { formatPartnershipNotes, isPartnershipInterest } from "@/lib/partnershipInquiry";
import { mainNav, secondaryNav } from "@/lib/site";
import {
  FOUNDING_MEMBERSHIP_INTEREST,
  LEAD_SOURCE_FOUNDING,
  LEAD_SOURCE_FREE,
  formatLeadSignupEmail,
  resolveLeadSource,
  sanitizeLeadInterests,
  shirtSizeInterest,
} from "@/lib/signup";

describe("navigation keeps community visible without dropping pages", () => {
  it("uses the preferred primary labels", () => {
    assert.deepEqual(
      mainNav.map((item) => item.label),
      ["Dog Care", "Explore Waco", "Events", "The Wag Club", "Wag Watch", "Shop"],
    );
    assert.equal(mainNav.find((item) => item.label === "The Wag Club")?.href, "/wagclub");
    assert.equal(mainNav.find((item) => item.label === "Events")?.href, "/events");
  });

  it("keeps dog match, weekend, yappy hours, camp, and approved reachable", () => {
    const hrefs = new Set<string>();
    for (const item of [...mainNav, ...secondaryNav]) {
      hrefs.add(item.href);
      for (const child of item.children ?? []) hrefs.add(child.href);
    }
    for (const path of [
      "/dog-match",
      "/weekend",
      "/yappy-hours",
      "/camp-waco",
      "/approved",
      "/shop",
      "/wag-watch",
      "/dog-care",
      "/sponsors",
      "/waco-wag-club",
    ]) {
      assert.equal(hrefs.has(path), true, path);
    }
  });
});

describe("founding interest stays distinct from the free list", () => {
  it("accepts only the founding source", () => {
    assert.equal(resolveLeadSource(LEAD_SOURCE_FOUNDING), LEAD_SOURCE_FOUNDING);
    assert.equal(resolveLeadSource("keep_waco_wagging"), LEAD_SOURCE_FREE);
    assert.equal(resolveLeadSource("paid_member"), LEAD_SOURCE_FREE);
    assert.equal(resolveLeadSource(undefined), LEAD_SOURCE_FREE);
  });

  it("stores shirt size and founding interest, and drops unknown sizes", () => {
    assert.deepEqual(
      sanitizeLeadInterests([
        FOUNDING_MEMBERSHIP_INTEREST,
        "Shirt size: M",
        "Shirt size: gigantic",
        "Paid member",
      ]),
      [FOUNDING_MEMBERSHIP_INTEREST, "Shirt size: M"],
    );
    assert.equal(shirtSizeInterest("Not sure yet"), "Shirt size: Not sure yet");
    assert.equal(shirtSizeInterest("XXXXL"), null);
  });

  it("labels founding emails so they are not free-list signups", () => {
    const body = formatLeadSignupEmail({
      email: "ada@example.com",
      source: LEAD_SOURCE_FOUNDING,
      interests: [FOUNDING_MEMBERSHIP_INTEREST, "Shirt size: L"],
    });
    assert.match(body, /founding membership interest/i);
    assert.match(body, /not a paid membership/i);
    assert.match(body, new RegExp(LEAD_SOURCE_FOUNDING));
  });
});

describe("events and partnerships do not invent confirmations", () => {
  it("has no confirmed events and no dinner registration URL", () => {
    assert.equal(confirmedEvents.length, 0);
    assert.equal(dinnerClub.registrationUrl, null);
    assert.equal(planned2027Experiences.length, 12);
    assert.ok(planned2027Experiences.every((month) => month.theme === null));
    assert.ok(planned2027Experiences.every((month) => month.status === "Planned"));
  });

  it("keeps sponsorship prices labeled as proposals", () => {
    assert.ok(eventSponsorTiers.every((tier) => /proposed/i.test(tier.note)));
    assert.equal(isPartnershipInterest("Presenting Sponsor — $150/event (proposed)"), true);
    assert.equal(isPartnershipInterest("Approved seal"), false);
    const notes = formatPartnershipNotes("10% off a bath", "Weekday mornings");
    assert.match(notes, /Source: \/sponsors/);
    assert.match(notes, /10% off a bath/);
    assert.match(notes, /Weekday mornings/);
  });

  it("does not describe Platinum Fresh as the welcome-kit spray", () => {
    const blob = [
      ...wagClubMembership.plannedBenefits,
      wagClubMembership.sprayNote,
    ].join(" ");
    assert.match(blob, /pet-safe spray sample/);
    assert.match(blob, /not offered here as a consumer spray/);
    assert.doesNotMatch(wagClubMembership.plannedBenefits.join(" "), /Platinum Fresh/);
  });
});
