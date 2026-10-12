import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/adminCookie";

export { ADMIN_COOKIE_NAME };

// Temporary server-side gate for Daily Sniff and newsletter previews until the
// app has a real auth system. Access requires a cookie matching
// DAILY_SNIFF_ADMIN_TOKEN.

export type AdminGate =
  | { state: "ok" }
  | { state: "unconfigured" }
  | { state: "locked" };

/** Fail closed: missing token and bad cookie both hide admin content. */
export function canViewAdminPreview(gate: AdminGate): boolean {
  return gate.state === "ok";
}

export async function checkAdmin(): Promise<AdminGate> {
  const token = process.env.DAILY_SNIFF_ADMIN_TOKEN;
  if (!token) return { state: "unconfigured" };

  const store = await cookies();
  const value = store.get(ADMIN_COOKIE_NAME)?.value;
  if (value && value === token) return { state: "ok" };
  return { state: "locked" };
}

export async function setAdminCookie(token: string): Promise<boolean> {
  const expected = process.env.DAILY_SNIFF_ADMIN_TOKEN;
  if (!expected || token !== expected) return false;

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
}
