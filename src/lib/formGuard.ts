import { NextResponse } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

/** Best-effort in-memory rate limit — soft protection across warm serverless instances. */
export function checkRateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000,
): boolean {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export function clientKeyFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function isHoneypotTriggered(body: { _hp?: unknown }): boolean {
  return typeof body._hp === "string" && body._hp.trim().length > 0;
}

export function rejectIfTooLarge(
  request: Request,
  maxBytes = 50_000,
): NextResponse | null {
  const raw = request.headers.get("content-length");
  if (!raw) return null;
  const length = Number(raw);
  if (!Number.isFinite(length) || length <= maxBytes) return null;
  return NextResponse.json(
    { error: "Request is too large. Please shorten your message and try again." },
    { status: 413 },
  );
}

export function rateLimitResponse(): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Please wait a minute and try again." },
    { status: 429 },
  );
}

/** Shared guard for public lead/contact form POST handlers. */
export function guardPublicFormPost(
  request: Request,
  body: { _hp?: unknown },
  routeKey: string,
): NextResponse | null {
  const sizeError = rejectIfTooLarge(request);
  if (sizeError) return sizeError;

  if (isHoneypotTriggered(body)) {
    return NextResponse.json({ ok: true });
  }

  const key = `${routeKey}:${clientKeyFromRequest(request)}`;
  if (!checkRateLimit(key)) {
    return rateLimitResponse();
  }

  return null;
}

export function clampText(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}
