import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { isEmailConfigured, sendLeadNotification } from "@/lib/email";

export type SubmissionType =
  | "lead"
  | "directory_submission"
  | "sponsor_inquiry"
  | "contact_message";

type SubmissionConfig = {
  table: string;
  subject: string;
};

const configs: Record<SubmissionType, SubmissionConfig> = {
  lead: {
    table: "leads",
    subject: "New Keep Waco Wagging email signup",
  },
  directory_submission: {
    table: "directory_submissions",
    subject: "New dog-friendly place submitted",
  },
  sponsor_inquiry: {
    table: "sponsor_inquiries",
    subject: "New Keep Waco Wagging sponsor inquiry",
  },
  contact_message: {
    table: "contact_messages",
    subject: "New Keep Waco Wagging contact message",
  },
};

export type SubmissionResult =
  | { ok: true; stored: boolean; notified: boolean }
  | { ok: false; error: string };

const USER_SAFE_ERROR =
  "Unable to save your submission. Please try again or email us directly.";

const PRODUCTION_MISCONFIG_ERROR =
  "Signups are temporarily unavailable. Please try again later or email us directly.";

/** Practical server-side check — not exhaustive RFC validation. */
export function isValidLeadEmail(email: string): boolean {
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production";
}

function formatPayload(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .map(([key, value]) => {
      const formatted = Array.isArray(value) ? value.join(", ") : String(value ?? "");
      return `${key}: ${formatted}`;
    })
    .join("\n");
}

export async function saveSubmission(
  type: SubmissionType,
  payload: Record<string, unknown>,
): Promise<SubmissionResult> {
  const config = configs[type];
  const supabaseReady = isSupabaseConfigured();
  const emailReady = isEmailConfigured();

  if (isProductionEnvironment() && !supabaseReady && !emailReady) {
    console.error(
      `[lead submission] Production misconfiguration: neither Supabase nor email notifications are fully configured (${config.table}).`,
    );
    return { ok: false, error: PRODUCTION_MISCONFIG_ERROR };
  }

  let stored = false;

  if (supabaseReady) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from(config.table).insert(payload);
      if (error) {
        console.error(`[supabase insert ${config.table}]`, error);
      } else {
        stored = true;
      }
    }
  }

  let notified = false;

  if (emailReady) {
    const notification = await sendLeadNotification(
      config.subject,
      formatPayload(payload),
    );
    notified = notification.ok;
    if (!notification.ok) {
      console.error(`[lead notification ${config.table}]`, notification.error);
    }
  }

  const supabaseSucceeded = supabaseReady && stored;
  const emailSucceeded = emailReady && notified;

  if (supabaseSucceeded || emailSucceeded) {
    if (supabaseSucceeded && emailReady && !notified) {
      console.error(
        `[lead submission] PARTIAL_SUCCESS notified=false table=${config.table} subject="${config.subject}" — lead saved to Supabase but Resend notification failed. Check RESEND_API_KEY, RESEND_FROM_EMAIL, and Resend domain verification.`,
      );
    } else if (supabaseSucceeded && !emailReady && isProductionEnvironment()) {
      console.warn(
        `[lead submission] PARTIAL_SUCCESS notified=false table=${config.table} — lead saved but email notifications are not fully configured (RESEND_API_KEY and/or LEAD_NOTIFICATION_EMAIL).`,
      );
    } else if (emailSucceeded && !stored && supabaseReady) {
      console.warn(
        `[lead submission] PARTIAL_SUCCESS stored=false table=${config.table} — notification sent but Supabase insert failed.`,
      );
    }

    return { ok: true, stored, notified };
  }

  if (supabaseReady || emailReady) {
    console.error(
      `[lead submission] All configured backends failed for ${config.table}.`,
    );
    return { ok: false, error: USER_SAFE_ERROR };
  }

  console.warn(
    `[lead submission] No backend configured — submission not persisted (${config.table}).`,
    formatPayload(payload),
  );
  return { ok: false, error: USER_SAFE_ERROR };
}
