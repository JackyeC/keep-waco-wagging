import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canViewAdminPreview } from "@/lib/daily-sniff/admin-auth";
import { newsletterPreviewGuard } from "@/lib/admin/adminCookie";
import { safeNewsletterReturnPath } from "@/lib/admin/safeReturnPath";

describe("newsletter preview access", () => {
  it("fails closed unless the admin gate is ok", () => {
    assert.equal(canViewAdminPreview({ state: "ok" }), true);
    assert.equal(canViewAdminPreview({ state: "locked" }), false);
    assert.equal(canViewAdminPreview({ state: "unconfigured" }), false);
  });

  it("only returns newsletter admin paths", () => {
    assert.equal(
      safeNewsletterReturnPath("/admin/newsletter/sept-20-26-2026"),
      "/admin/newsletter/sept-20-26-2026",
    );
    assert.equal(safeNewsletterReturnPath("/admin/daily-sniff"), "/admin/newsletter");
    assert.equal(
      safeNewsletterReturnPath("https://evil.example/admin/newsletter"),
      "/admin/newsletter",
    );
    assert.equal(
      safeNewsletterReturnPath("/admin/newsletter/../daily-sniff"),
      "/admin/newsletter",
    );
    assert.equal(
      safeNewsletterReturnPath("/admin/newsletter?next=https://evil.example"),
      "/admin/newsletter",
    );
  });

  it("rewrites nested previews instead of rendering them when unauthenticated", () => {
    assert.equal(newsletterPreviewGuard("/admin/newsletter", false), "next");
    assert.equal(
      newsletterPreviewGuard("/admin/newsletter/sept-20-26-2026", false),
      "rewrite-index",
    );
    assert.equal(
      newsletterPreviewGuard("/admin/newsletter/sept-20-26-2026/raw", false),
      "unauthorized",
    );
    assert.equal(
      newsletterPreviewGuard("/admin/newsletter/sept-20-26-2026", true),
      "next",
    );
  });
});
