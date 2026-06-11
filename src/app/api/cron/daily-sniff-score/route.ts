import { NextResponse } from "next/server";
import { authorizeCron } from "@/lib/daily-sniff/cron";
import { scoreItems } from "@/lib/daily-sniff/scoreItems";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function handle(request: Request) {
  const denied = authorizeCron(request);
  if (denied) return denied;

  const summary = await scoreItems();
  return NextResponse.json({ ok: true, step: "score", summary });
}

export const GET = handle;
export const POST = handle;
