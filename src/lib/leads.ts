import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/email";

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
  const supabase = getSupabaseAdmin();
  let stored = false;

  if (supabase) {
    const { error } = await supabase.from(config.table).insert(payload);
    if (error) {
      console.error(`[supabase insert ${config.table}]`, error);
    } else {
      stored = true;
    }
  }

  const notification = await sendLeadNotification(
    config.subject,
    formatPayload(payload),
  );

  const hasBackend =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    Boolean(process.env.RESEND_API_KEY);

  if (!stored && !notification.ok && hasBackend) {
    return {
      ok: false,
      error:
        "Unable to save your submission. Please try again or email us directly.",
    };
  }

  return { ok: true, stored, notified: notification.ok };
}
