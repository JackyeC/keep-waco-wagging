import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { isEmailConfigured, sendLeadNotification } from "@/lib/email";
import { isLeadNotificationRecipientConfigured } from "@/lib/leadNotificationConfig";
import { logLeadPipelineOutcome } from "@/lib/leadPipelineLog";
import { formatLeadSignupEmail } from "@/lib/signup";

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
    subject: "New Keep Waco Wagging signup",
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

function formatPayload(
  type: SubmissionType,
  payload: Record<string, unknown>,
): string {
  if (type === "lead") {
    return formatLeadSignupEmail({
      first_name: payload.first_name as string | null | undefined,
      email: String(payload.email ?? ""),
      dog_name: payload.dog_name as string | null | undefined,
      zip_code: payload.zip_code as string | null | undefined,
      interests: payload.interests as string[] | undefined,
      source_page: payload.source_page as string | null | undefined,
      created_at: new Date().toISOString(),
    });
  }

  return Object.entries(payload)
    .map(([key, value]) => {
      const formatted = Array.isArray(value) ? value.join(", ") : String(value ?? "");
      return `${key}: ${formatted}`;
    })
    .join("\n");
}

/** Customer email for Resend replyTo — not used as the From address. */
export function extractCustomerReplyTo(
  payload: Record<string, unknown>,
): string | undefined {
  const raw = payload.email ?? payload.submitter_email;
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim().toLowerCase();
  return isValidLeadEmail(trimmed) ? trimmed : undefined;
}

export async function saveSubmission(
  type: SubmissionType,
  payload: Record<string, unknown>,
): Promise<SubmissionResult> {
  const config = configs[type];
  const supabaseReady = isSupabaseConfigured();
  const emailReady = isEmailConfigured();

  if (isProductionEnvironment() && !isLeadNotificationRecipientConfigured()) {
    console.error(
      `[lead submission] Production misconfiguration: LEAD_NOTIFICATION_EMAIL is not set (${config.table}).`,
    );
    return { ok: false, error: PRODUCTION_MISCONFIG_ERROR };
  }

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
  let notificationError: string | undefined;
  let resendMessageId: string | undefined;

  if (emailReady) {
    const notification = await sendLeadNotification(
      config.subject,
      formatPayload(type, payload),
      { replyTo: extractCustomerReplyTo(payload) },
    );
    notified = notification.ok;
    notificationError = notification.error;
    resendMessageId = notification.messageId;
    if (!notification.ok) {
      console.error(`[lead notification ${config.table}]`, notification.error);
    }
  }

  const supabaseSucceeded = supabaseReady && stored;
  const emailSucceeded = emailReady && notified;

  if (supabaseSucceeded || emailSucceeded) {
    if (supabaseSucceeded && emailReady && !notified) {
      logLeadPipelineOutcome({
        event: "partial_success_notification_failed",
        table: config.table,
        stored: true,
        notified: false,
        subject: config.subject,
        error: notificationError ??
          "Lead saved to Supabase but Resend notification failed. Check RESEND_API_KEY, RESEND_FROM_EMAIL, and Resend domain verification.",
      });
    } else if (supabaseSucceeded && !emailReady && isProductionEnvironment()) {
      logLeadPipelineOutcome({
        event: "partial_success_email_not_configured",
        table: config.table,
        stored: true,
        notified: false,
        subject: config.subject,
        error:
          "Lead saved but email notifications are not fully configured (RESEND_API_KEY and LEAD_NOTIFICATION_EMAIL).",
      });
    } else if (emailSucceeded && !stored && supabaseReady) {
      logLeadPipelineOutcome({
        event: "partial_success_supabase_insert_failed",
        table: config.table,
        stored: false,
        notified: true,
        subject: config.subject,
      });
    } else {
      logLeadPipelineOutcome({
        event: "submission_complete",
        table: config.table,
        stored: supabaseSucceeded,
        notified: emailSucceeded,
        subject: config.subject,
        resendMessageId,
      });
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
    formatPayload(type, payload),
  );
  return { ok: false, error: USER_SAFE_ERROR };
}
