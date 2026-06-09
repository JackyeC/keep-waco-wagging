import { Resend } from "resend";
import { cityConfig } from "@/lib/site";

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
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL);
}

/** Send a plain-text notification email for new leads/signups. */
export async function sendLeadNotification(
  subject: string,
  body: string,
): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  const to = process.env.NOTIFY_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    `${cityConfig.name} <onboarding@resend.dev>`;

  if (!resend || !to) {
    console.info("[lead notification skipped]", subject, body);
    return { ok: false, error: "Email not configured" };
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `[${cityConfig.name}] ${subject}`,
    text: body,
  });

  if (error) {
    console.error("[resend error]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
