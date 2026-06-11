import { NextResponse } from "next/server";
import { authorizeCron } from "@/lib/daily-sniff/cron";
import { draftBriefs } from "@/lib/daily-sniff/draftBriefs";
import { notifyDraftsReady } from "@/lib/daily-sniff/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function handle(request: Request) {
  const denied = authorizeCron(request);
  if (denied) return denied;

  const summary = await draftBriefs();
  const notification = await notifyDraftsReady(summary);
  return NextResponse.json({
    ok: true,
    step: "draft",
    summary,
    notified: notification.ok,
  });
}

export const GET = handle;
export const POST = handle;
