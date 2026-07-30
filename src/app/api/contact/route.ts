import { NextResponse } from "next/server";
import { clampText, guardPublicFormPost } from "@/lib/formGuard";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    const blocked = guardPublicFormPost(request, body, "contact");
    if (blocked) return blocked;

    const email = body.email?.trim().toLowerCase() ?? "";
    const message = clampText(body.message, 4000);

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 },
      );
    }

    if (!isValidLeadEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("contact_message", {
      name: clampText(body.name, 120) || null,
      email,
      interest: clampText(body.interest, 80) || null,
      message,
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
