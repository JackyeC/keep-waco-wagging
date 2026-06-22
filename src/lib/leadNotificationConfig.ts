/**
 * Lead notification recipient configuration.
 * Production must set LEAD_NOTIFICATION_EMAIL — no silent runtime fallback for delivery.
 */
export const DOCUMENTED_LEAD_NOTIFICATION_FALLBACK = "info@keepwacowagging.com";

export function getLeadNotificationEmail(): string | null {
  const trimmed = process.env.LEAD_NOTIFICATION_EMAIL?.trim();
  return trimmed || null;
}

export function isLeadNotificationRecipientConfigured(): boolean {
  return Boolean(getLeadNotificationEmail());
}
