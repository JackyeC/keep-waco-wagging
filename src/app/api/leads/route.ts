import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      email?: string;
      dogName?: string;
      neighborhood?: string;
      interests?: string[];
    };

    if (!body.email?.trim()) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const result = await saveSubmission("lead", {
      first_name: body.firstName?.trim() ?? null,
      email: body.email.trim().toLowerCase(),
      dog_name: body.dogName?.trim() ?? null,
      neighborhood: body.neighborhood?.trim() ?? null,
      interests: body.interests ?? [],
      source: "keep_waco_wagging",
      consent: true,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
