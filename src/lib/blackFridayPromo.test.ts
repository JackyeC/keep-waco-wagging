import { test } from "node:test";
import assert from "node:assert/strict";
import { blackFridayPhase } from "./site";

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
