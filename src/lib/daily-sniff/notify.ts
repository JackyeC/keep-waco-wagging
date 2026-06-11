import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import type { DraftSummary } from "./draftBriefs";

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Absolute URL to the admin review queue. */
export function adminReviewUrl(): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url).replace(/\/$/, "");
  return `${base}/admin/daily-sniff`;
}

export async function notifyDraftsReady(
  summary: DraftSummary,
): Promise<{ ok: boolean; error?: string }> {
  if (summary.drafted === 0) {
    return { ok: true };
  }

  const resend = getResend();
  const to =
    process.env.DAILY_SNIFF_NOTIFICATION_EMAIL ?? process.env.LEAD_NOTIFICATION_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ?? `hello@${new URL(siteConfig.url).hostname}`;
  const reviewUrl = adminReviewUrl();

  const subject = `KWW Daily Sniff: ${summary.drafted} new draft${
    summary.drafted === 1 ? "" : "s"
  } to review`;
  const lines = [
    `${summary.drafted} new draft${summary.drafted === 1 ? "" : "s"} are ready for review.`,
    summary.needsVerification > 0
      ? `${summary.needsVerification} flagged as sensitive and need verification before publishing.`
      : null,
    "",
    `Review and approve here: ${reviewUrl}`,
    "",
    "Nothing publishes automatically \u2014 every brief stays a draft until you approve it.",
  ].filter(Boolean);

  if (!resend || !to) {
    console.info("[daily-sniff notification skipped]", subject, reviewUrl);
    return { ok: false, error: "Email not configured" };
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text: lines.join("\n"),
  });

  if (error) {
    console.error("[daily-sniff resend error]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
