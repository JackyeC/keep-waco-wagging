import { cookies } from "next/headers";

// Temporary server-side gate for the Daily Sniff admin queue until the app has
// a real auth system. Access requires a cookie matching DAILY_SNIFF_ADMIN_TOKEN.
const COOKIE_NAME = "ds_admin";

export type AdminGate =
  | { state: "ok" }
  | { state: "unconfigured" }
  | { state: "locked" };

export async function checkAdmin(): Promise<AdminGate> {
  const token = process.env.DAILY_SNIFF_ADMIN_TOKEN;
  if (!token) return { state: "unconfigured" };

  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (value && value === token) return { state: "ok" };
  return { state: "locked" };
}

export async function setAdminCookie(token: string): Promise<boolean> {
  const expected = process.env.DAILY_SNIFF_ADMIN_TOKEN;
  if (!expected || token !== expected) return false;

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
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
  store.delete(COOKIE_NAME);
}
