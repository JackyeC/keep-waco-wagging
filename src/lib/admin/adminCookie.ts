export const ADMIN_COOKIE_NAME = "ds_admin";

/** Sync, Edge-safe. Missing env token fails closed. */
export function isValidAdminCookie(cookieValue: string | undefined): boolean {
  const token = process.env.DAILY_SNIFF_ADMIN_TOKEN?.trim();
  if (!token || !cookieValue) return false;
  return cookieValue === token;
}

export type NewsletterPreviewGuard = "next" | "rewrite-index" | "unauthorized";

export function newsletterPreviewGuard(
  pathname: string,
  authed: boolean,
): NewsletterPreviewGuard {
  if (!pathname.startsWith("/admin/newsletter")) return "next";
  if (authed) return "next";
  if (pathname === "/admin/newsletter" || pathname === "/admin/newsletter/") {
    return "next";
  }
  if (pathname.endsWith("/raw")) return "unauthorized";
  return "rewrite-index";
}
