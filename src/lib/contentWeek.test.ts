import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "@/app/robots";
import {
  contentWeek,
  howloweenCostumeCallout,
  isContentWeekLive,
  isHowloweenCalloutLive,
} from "@/data/contentWeek";
import { getCurrentDaycareTheme } from "@/data/summerDaycare";
import { sitemapExcludedPaths } from "@/lib/sitemapEntries";

function chicagoNoon(isoDate: string): Date {
  return new Date(`${isoDate}T17:00:00.000Z`);
}

describe("Oct 12 content week", () => {
  it("covers Mon Oct 12 through Sun Oct 18 with seven posting days", () => {
    assert.equal(contentWeek.startsOn, "2026-10-12");
    assert.equal(contentWeek.endsOn, "2026-10-18");
    assert.equal(contentWeek.posts.length, 7);
    assert.deepEqual(
      contentWeek.posts.map((post) => post.day),
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    );
  });

  it("is live during the week and hidden afterward", () => {
    assert.equal(isContentWeekLive(chicagoNoon("2026-10-11")), false);
    assert.equal(isContentWeekLive(chicagoNoon("2026-10-12")), true);
    assert.equal(isContentWeekLive(chicagoNoon("2026-10-18")), true);
    assert.equal(isContentWeekLive(chicagoNoon("2026-10-19")), false);
  });

  it("shows the costume teaser from Oct 9 through Oct 18", () => {
    assert.equal(isHowloweenCalloutLive(chicagoNoon("2026-10-08")), false);
    assert.equal(isHowloweenCalloutLive(chicagoNoon("2026-10-09")), true);
    assert.equal(isHowloweenCalloutLive(chicagoNoon("2026-10-18")), true);
    assert.equal(isHowloweenCalloutLive(chicagoNoon("2026-10-19")), false);
  });

  it("keeps Camp Clayton aligned with Campfire Canines, not Howl-o-Ween Week", () => {
    const camp = getCurrentDaycareTheme(chicagoNoon("2026-10-14"));
    assert.equal(camp?.name, "Campfire Canines Week");
    assert.equal(contentWeek.campClaytonWeek, "Campfire Canines Week");
    assert.equal(
      howloweenCostumeCallout.href,
      "https://www.instagram.com/keepwacowagging/",
    );
  });

  it("keeps the posting plan off the public sitemap", () => {
    assert.equal(sitemapExcludedPaths().includes("/admin"), true);
    const manifest = robots();
    const disallow = Array.isArray(manifest.rules)
      ? manifest.rules[0]?.disallow
      : manifest.rules.disallow;
    const blocked = Array.isArray(disallow) ? disallow : [disallow];
    assert.equal(blocked.includes("/admin"), true);
  });
});
