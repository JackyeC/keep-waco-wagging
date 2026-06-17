import { NextResponse } from "next/server";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      email?: string;
      dogName?: string;
      neighborhood?: string;
      interests?: string[];
    };

    const rawEmail = body.email?.trim();
    if (!rawEmail) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const email = rawEmail.toLowerCase();
    if (!isValidLeadEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("lead", {
      first_name: body.firstName?.trim() ?? null,
      email,
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
