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
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFICATION_EMAIL);
}

export async function sendLeadNotification(
  subject: string,
  body: string,
): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const bcc = process.env.LEAD_NOTIFICATION_BCC;
  const from =
    process.env.RESEND_FROM_EMAIL ?? `hello@${new URL(cityConfig.url).hostname}`;

  if (!resend || !to) {
    console.info("[lead notification skipped]", subject, body);
    return { ok: false, error: "Email not configured" };
  }

  const { error } = await resend.emails.send({
    from,
    to,
    bcc: bcc ? [bcc] : undefined,
    subject,
    text: body,
  });

  if (error) {
    console.error("[resend error]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
