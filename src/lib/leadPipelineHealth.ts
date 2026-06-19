import { cityConfig } from "@/lib/site";
import { isEmailConfigured } from "@/lib/email";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export type NotificationResult = "success" | "failure";

type NotificationTelemetry = {
  attemptedAt: string;
  result: NotificationResult;
  error?: string;
};

const runtimeTelemetry: {
  lastNotification: NotificationTelemetry | null;
} = {
  lastNotification: null,
};

export function isResendApiKeyConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function resendApiKeyLooksValid(): boolean {
  const key = process.env.RESEND_API_KEY?.trim() ?? "";
  return key.startsWith("re_") && key.length > 20;
}

export function isNotificationRecipientConfigured(): boolean {
  return Boolean(process.env.LEAD_NOTIFICATION_EMAIL?.trim());
}

export function isFromEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_FROM_EMAIL?.trim());
}

export function getConfiguredFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ??
    `hello@${new URL(cityConfig.url).hostname}`
  );
}

/** Records the latest Resend notification attempt for this runtime instance. */
export function recordNotificationAttempt(result: {
  ok: boolean;
  error?: string;
}): void {
  runtimeTelemetry.lastNotification = {
    attemptedAt: new Date().toISOString(),
    result: result.ok ? "success" : "failure",
    error: result.ok ? undefined : result.error,
  };
}

async function getLastLeadSavedAtFromDb(): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("leads")
    .select("created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[lead pipeline health] leads lookup failed", error);
    return null;
  }

  return data?.created_at ?? null;
}

export type LeadPipelineHealth = {
  supabaseConfigured: boolean;
  resendConfigured: boolean;
  resendApiKeyLooksValid: boolean;
  notificationRecipientConfigured: boolean;
  fromEmailConfigured: boolean;
  emailSendPathConfigured: boolean;
  lastLeadSavedAt: string | null;
  lastNotificationAttemptedAt: string | null;
  lastNotificationResult: NotificationResult | null;
  lastNotificationError: string | null;
  /** In-memory telemetry is per serverless instance; DB timestamp is global. */
  notificationTelemetryScope: "runtime-instance";
};

export async function getLeadPipelineHealth(): Promise<LeadPipelineHealth> {
  const lastNotification = runtimeTelemetry.lastNotification;

  return {
    supabaseConfigured: isSupabaseConfigured(),
    resendConfigured: isResendApiKeyConfigured(),
    resendApiKeyLooksValid: resendApiKeyLooksValid(),
    notificationRecipientConfigured: isNotificationRecipientConfigured(),
    fromEmailConfigured: isFromEmailConfigured(),
    emailSendPathConfigured: isEmailConfigured(),
    lastLeadSavedAt: await getLastLeadSavedAtFromDb(),
    lastNotificationAttemptedAt: lastNotification?.attemptedAt ?? null,
    lastNotificationResult: lastNotification?.result ?? null,
    lastNotificationError: lastNotification?.error ?? null,
    notificationTelemetryScope: "runtime-instance",
  };
}

export function authorizeLeadPipelineHealth(request: Request): boolean {
  const secret = process.env.LEAD_PIPELINE_HEALTH_TOKEN;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : null;
  const headerToken = request.headers.get("x-lead-pipeline-health-token");
  const queryToken = new URL(request.url).searchParams.get("token");

  const provided = bearer ?? headerToken ?? queryToken;
  return provided === secret;
}
