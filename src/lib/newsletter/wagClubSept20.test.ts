import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getNewsletterSendBlockers,
  isNewsletterSendReady,
  NEWSLETTER_PLACEHOLDER,
  wagClubSept20Issue,
} from "@/data/newsletters/wagClubSept20";
import {
  renderWagClubChecklist,
  renderWagClubEmailHtml,
  renderWagClubEmailText,
} from "@/lib/newsletter/renderWagClubEmail";
import { sitemapExcludedPaths } from "@/lib/sitemapEntries";

describe("Wag Club Sept. 20–26 newsletter", () => {
  const html = renderWagClubEmailHtml();
  const text = renderWagClubEmailText();
  const checklist = renderWagClubChecklist();

  it("keeps the requested subject and preview text", () => {
    assert.equal(
      wagClubSept20Issue.subject,
      "Your dog's week in Waco: Sept. 20–26",
    );
    assert.match(wagClubSept20Issue.previewText, /dog-park question/i);
    assert.match(html, /display:none/);
    assert.match(html, /Where to go, when to leave them home/);
  });

  it("blocks production send while placeholders remain", () => {
    assert.equal(isNewsletterSendReady(), false);
    const blockers = getNewsletterSendBlockers();
    assert.ok(blockers.some((item) => /mailing address/i.test(item)));
    assert.ok(blockers.some((item) => /unsubscribe/i.test(item)));
    assert.ok(blockers.some((item) => /article url/i.test(item)));
    assert.match(html, /PHYSICAL MAILING ADDRESS/);
    assert.match(html, /replace-unsubscribe-before-send/);
    assert.match(html, /article not published yet/i);
  });

  it("does not invent a Wag Watch article URL", () => {
    assert.equal(
      wagClubSept20Issue.featuredArticle.href,
      NEWSLETTER_PLACEHOLDER.featuredArticleUrl,
    );
    assert.equal(html.includes("/wag-watch/does-waco-need"), false);
    assert.equal(text.includes("https://keepwacowagging.com/wag-watch/does-waco"), false);
  });

  it("uses a working reply-to and avoids unconfirmed domain inboxes", () => {
    assert.equal(wagClubSept20Issue.replyTo, "jackyeclayton@gmail.com");
    assert.equal(html.toLowerCase().includes("mailto:hello@keepwacowagging.com"), false);
    assert.equal(html.toLowerCase().includes("mailto:info@keepwacowagging.com"), false);
    assert.equal(text.toLowerCase().includes("hello@keepwacowagging.com"), false);
    assert.equal(text.toLowerCase().includes("info@keepwacowagging.com"), false);
  });

  it("labels the Fi notice as an FDA recall with lots and UPCs", () => {
    assert.match(html, /FDA recall/);
    assert.match(html, /26118/);
    assert.match(html, /26159/);
    assert.match(html, /8 50064 80011 1/);
    assert.match(html, /8 50055 11168 4/);
    assert.match(
      html,
      /fi-recalls-supplements-dogs-because-possible-salmonella-contamination/,
    );
    assert.match(html, /recalls-withdrawals/);
    assert.match(text, /\[FDA recall\]/);
  });

  it("does not call Barron's Branch dog-friendly or an approved dog park", () => {
    assert.match(html, /Public project \/ discussion/);
    assert.match(html, /not a dog-friendly event listing/i);
    assert.match(html, /do not confirm a dog park/i);
    assert.equal(/barron[\s\S]{0,80}dog-friendly/i.test(html), false);
    assert.match(html, /newly proposed dog ordinance/);
    assert.match(html, /wacodowntownredevelopment.com\/About/);
  });

  it("keeps Wednesday Night Market unverified and Brotherwell confirmed", () => {
    const wednesday = wagClubSept20Issue.events.items[0];
    const trivia = wagClubSept20Issue.events.items[1];
    assert.equal(wednesday.status, "verify_policy");
    assert.equal(trivia.status, "confirmed_dog_friendly");
    assert.match(html, /Verify before you go/);
    assert.match(html, /Confirmed dog-friendly/);
    assert.equal(html.includes("https://www.brotherwell.com/taproom"), true);
  });

  it("renders email-safe HTML and a Camp Clayton CTA to the live camp URL", () => {
    assert.match(html, /<!DOCTYPE html>/i);
    assert.match(html, /role="presentation"/);
    assert.match(html, /max-width:600px/);
    assert.equal(html.includes("display:flex"), false);
    assert.equal(html.includes("display:grid"), false);
    assert.match(html, /Fall is on the calendar/);
    assert.equal(
      wagClubSept20Issue.campClayton.href,
      "https://keepwacowagging.com/camp-waco",
    );
    assert.match(html, /https:\/\/keepwacowagging.com\/camp-waco/);
    assert.match(text, /Learn about Camp Clayton/);
  });

  it("keeps the checklist and preview off public discovery paths", () => {
    assert.match(checklist, /Production send allowed: NO/);
    assert.match(checklist, /Do not send from the website app/);
    assert.match(checklist, /DAILY_SNIFF_ADMIN_TOKEN/);
    assert.equal(
      sitemapExcludedPaths().some((path) => path === "/admin"),
      true,
    );
  });
});
