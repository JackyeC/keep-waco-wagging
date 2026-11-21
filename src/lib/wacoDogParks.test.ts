import assert from "node:assert/strict";
import test from "node:test";
import { cityConfig } from "@/lib/site";
import { platinumScoops } from "@/data/platinumScoops";
import { servicePages } from "@/data/servicePages";
import {
  dogParkLastCheckedLabel,
  dogRunNoteBlocks,
  dogRunNoteTitle,
  wacoDogParkGuideSections,
} from "@/lib/wacoDogParks";

const dash = /[—–-]/;

test("Platinum Scoops pricing names the initial cleanup", () => {
  const page = servicePages["platinum-scoops"];
  assert.ok(page);
  const faq = page.faq ?? [];
  const steps = page.steps ?? [];
  const copy = [
    cityConfig.sponsor.pricingNote,
    platinumScoops.pricing,
    page.seo.description,
    page.hero.metaLine ?? "",
    faq.map((item) => item.answer).join(" "),
    steps.map((step) => step.detail).join(" "),
    page.cta.subtitle,
    page.cta.title,
  ].join(" ");

  assert.match(copy, /\$25 a visit/);
  assert.match(copy, /1 to 2 dogs/);
  assert.match(copy, /initial cleanup starts at \$100/i);
  assert.doesNotMatch(copy, /first cleanup included/i);
  assert.doesNotMatch(copy, /on us/i);
  assert.equal(cityConfig.sponsor.pricingNote, platinumScoops.pricing);
  assert.equal(faq[1]?.answer, cityConfig.sponsor.pricingNote);
  for (const sentence of [
    cityConfig.sponsor.pricingNote,
    page.hero.metaLine ?? "",
    page.cta.subtitle,
  ]) {
    assert.equal(dash.test(sentence), false, sentence);
  }
});

test("dog park note only states sourced status", () => {
  const copy = [
    dogRunNoteTitle,
    dogParkLastCheckedLabel,
    ...dogRunNoteBlocks.map((block) => block.text),
    ...wacoDogParkGuideSections.flatMap((section) => [
      section.heading ?? "",
      ...section.paragraphs,
    ]),
  ];

  for (const sentence of copy) {
    assert.equal(dash.test(sentence), false, sentence);
  }

  const joined = copy.join(" ");
  assert.match(joined, /HOT Dog Park/);
  assert.match(joined, /closed for good in September 2024/);
  assert.match(joined, /check before you go/i);
  assert.match(joined, /Holly Dog Park/);
  assert.match(joined, /Bellmead/);
  assert.match(joined, /Freight/);
  assert.match(joined, /Woof Way/);
  assert.match(joined, /Cameron Park/);
  assert.match(joined, /Last checked November 2026/);
  assert.equal(
    dogRunNoteBlocks.some((block) =>
      block.links?.some((link) => link.href.includes("kwtx.com/2026/10/06")),
    ),
    true,
  );
});
