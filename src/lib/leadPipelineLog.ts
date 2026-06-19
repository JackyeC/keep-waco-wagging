type LeadPipelineLogPayload = {
  event: string;
  table: string;
  stored: boolean;
  notified: boolean;
  subject?: string;
  error?: string;
  resendMessageId?: string;
};

/** Structured logs for Vercel — grep `[KWW_LEAD_PIPELINE]`. */
export function logLeadPipelineOutcome(payload: LeadPipelineLogPayload): void {
  const line = JSON.stringify({
    service: "keep-waco-wagging",
    ...payload,
  });

  if (payload.stored && !payload.notified) {
    console.error(`[KWW_LEAD_PIPELINE] notified=false ALERT ${line}`);
    return;
  }

  console.info(`[KWW_LEAD_PIPELINE] ${line}`);
}
