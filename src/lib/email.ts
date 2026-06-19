import { Resend } from "resend";
import {
  getConfiguredFromEmail,
  recordNotificationAttempt,
} from "@/lib/leadPipelineHealth";

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFICATION_EMAIL);
}

/** Classify Resend API errors for server logs — never expose to visitors. */
export function categorizeResendError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("api key") || lower.includes("unauthorized") || lower.includes("invalid key")) {
    return "invalid_api_key";
  }
  if (lower.includes("not verified") || lower.includes("verify your domain") || lower.includes("domain is not")) {
    return "unverified_sender_or_domain";
  }
  if (lower.includes("from") && (lower.includes("invalid") || lower.includes("must be"))) {
    return "invalid_from_address";
  }
  if (lower.includes("recipient") || lower.includes("invalid `to`") || lower.includes("invalid to")) {
    return "invalid_recipient";
  }
  if (lower.includes("rate limit") || lower.includes("too many")) {
    return "rate_limited";
  }
  return "other_resend_error";
}

export async function sendLeadNotification(
  subject: string,
  body: string,
): Promise<{ ok: boolean; error?: string; messageId?: string }> {
  const resend = getResend();
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const bcc = process.env.LEAD_NOTIFICATION_BCC;
  const from = getConfiguredFromEmail();

  if (!resend || !to) {
    console.info("[lead notification skipped]", subject, body);
    recordNotificationAttempt({ ok: false, error: "Email not configured" });
    return { ok: false, error: "Email not configured" };
  }

  const { data, error } = await resend.emails.send({
    from,
    to,
    bcc: bcc ? [bcc] : undefined,
    subject,
    text: body,
  });

  if (error) {
    const category = categorizeResendError(error.message);
    console.error(
      `[KWW_LEAD_PIPELINE] resend_send_failed ${JSON.stringify({
        category,
        subject,
        fromDomain: from.includes("@") ? from.split("@").pop()?.replace(/[>].*$/, "") : undefined,
        error: error.message,
      })}`,
    );
    recordNotificationAttempt({ ok: false, error: `${category}: ${error.message}` });
    return { ok: false, error: error.message };
  }

  recordNotificationAttempt({ ok: true });
  return { ok: true, messageId: data?.id };
}
