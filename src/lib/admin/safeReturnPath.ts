const DEFAULT_NEWSLETTER_ADMIN_PATH = "/admin/newsletter";

/** Only allow in-app newsletter preview paths. Reject open redirects. */
export function safeNewsletterReturnPath(raw: unknown): string {
  if (typeof raw !== "string") return DEFAULT_NEWSLETTER_ADMIN_PATH;

  const path = raw.trim();
  if (!path.startsWith(DEFAULT_NEWSLETTER_ADMIN_PATH)) {
    return DEFAULT_NEWSLETTER_ADMIN_PATH;
  }
  if (path.includes("://") || path.includes("\\") || path.includes("..")) {
    return DEFAULT_NEWSLETTER_ADMIN_PATH;
  }
  if (path.includes("//", 1) || /[?#]/.test(path)) {
    return DEFAULT_NEWSLETTER_ADMIN_PATH;
  }
  return path;
}
