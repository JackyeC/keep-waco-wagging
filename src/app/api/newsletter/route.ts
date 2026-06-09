import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };

    if (!body.email?.trim()) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const result = await saveLead("newsletter", {
      email: body.email.trim().toLowerCase(),
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
