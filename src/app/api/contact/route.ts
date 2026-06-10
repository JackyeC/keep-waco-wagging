import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    if (!body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("contact_message", {
      name: body.name?.trim() || null,
      email: body.email.trim().toLowerCase(),
      interest: body.interest || null,
      message: body.message.trim(),
      status: "new",
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
