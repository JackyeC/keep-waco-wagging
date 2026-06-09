import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/email";

export type LeadType = "newsletter" | "get_listed" | "pet_submission";

export type LeadResult =
  | { ok: true; stored: boolean; notified: boolean }
  | { ok: false; error: string };

function formatPayload(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .map(([key, value]) => `${key}: ${String(value ?? "")}`)
    .join("\n");
}

/** Persist a lead to Supabase (if configured) and notify via email. */
export async function saveLead(
  type: LeadType,
  payload: Record<string, unknown>,
): Promise<LeadResult> {
  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : null;

  if (type === "newsletter" && !email) {
    return { ok: false, error: "Email is required." };
  }

  let stored = false;
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const table =
      type === "newsletter"
        ? "newsletter_signups"
        : type === "get_listed"
          ? "business_listings"
          : "pet_submissions";

    const { error } = await supabase.from(table).insert({
      ...payload,
      source: "website",
    });

    if (error) {
      console.error(`[supabase insert ${table}]`, error);
      // Continue — email notification may still succeed.
    } else {
      stored = true;
    }
  }

  const subject =
    type === "newsletter"
      ? "New newsletter signup"
      : type === "get_listed"
        ? "New Get Listed submission"
        : "New pet submission";

  const notify = await sendLeadNotification(subject, formatPayload(payload));

  // Succeed if stored OR notified OR neither backend is configured (dev mode).
  const hasBackend =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    Boolean(process.env.RESEND_API_KEY);

  if (!stored && !notify.ok && hasBackend) {
    return {
      ok: false,
      error: "Unable to save your submission. Please try again or email us directly.",
    };
  }

  return { ok: true, stored, notified: notify.ok };
}
