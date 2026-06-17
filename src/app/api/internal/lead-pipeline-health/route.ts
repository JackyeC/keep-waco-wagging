import { NextResponse } from "next/server";
import {
  authorizeLeadPipelineHealth,
  getLeadPipelineHealth,
} from "@/lib/leadPipelineHealth";

export async function GET(request: Request) {
  if (!process.env.LEAD_PIPELINE_HEALTH_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "LEAD_PIPELINE_HEALTH_TOKEN is not configured." },
      { status: 500 },
    );
  }

  if (!authorizeLeadPipelineHealth(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const health = await getLeadPipelineHealth();

  return NextResponse.json({ ok: true, ...health });
}
