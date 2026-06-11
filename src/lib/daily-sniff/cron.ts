import { NextResponse } from "next/server";

/**
 * Authorize a Daily Sniff cron request. Accepts the shared secret via:
 *   - Authorization: Bearer <secret>   (Vercel Cron sends this automatically)
 *   - x-cron-secret: <secret>
 *   - ?secret=<secret>                 (handy for local manual runs)
 */
export function authorizeCron(request: Request): NextResponse | null {
  const secret = process.env.DAILY_SNIFF_CRON_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "DAILY_SNIFF_CRON_SECRET is not configured." },
      { status: 500 },
    );
  }

  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : null;
  const headerSecret = request.headers.get("x-cron-secret");
  const querySecret = new URL(request.url).searchParams.get("secret");

  const provided = bearer ?? headerSecret ?? querySecret;

  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
