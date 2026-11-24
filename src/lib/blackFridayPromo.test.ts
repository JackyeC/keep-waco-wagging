import { test } from "node:test";
import assert from "node:assert/strict";
import { blackFridayPhase, blackFridayPromo } from "./site";

const at = (iso: string) => blackFridayPhase(new Date(iso));

test("off before teaser window", () => {
  assert.equal(at("2026-11-19T12:00:00Z"), "off");
});

test("teaser the week before (Nov 20 CT)", () => {
  assert.equal(at("2026-11-20T06:00:00Z"), "teaser");
  assert.equal(at("2026-11-26T23:00:00Z"), "teaser");
});

test("live from Black Friday midnight CT through Cyber Monday 11:59pm CT", () => {
  assert.equal(at("2026-11-27T06:00:00Z"), "live");
  assert.equal(at("2026-12-01T05:59:00Z"), "live");
});

test("off after Cyber Monday", () => {
  assert.equal(at("2026-12-01T06:00:00Z"), "off");
});

test("banner stays on this site through 11:59pm CT Nov 30", () => {
  assert.equal(
    blackFridayPromo.bannerMessage,
    "WAGFRIDAY: 25% off Nov 27 to Nov 30. Use code WAGFRIDAY.",
  );
  assert.equal(blackFridayPromo.href, "/shop?promo=wagfriday");
  assert.equal(blackFridayPromo.href.includes("myshopify.com"), false);
  assert.notEqual(at("2026-11-24T18:00:00Z"), "off");
  assert.equal(at("2026-12-01T05:59:59.999Z"), "live");
});
