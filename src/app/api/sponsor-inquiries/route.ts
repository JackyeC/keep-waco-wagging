import { NextResponse } from "next/server";
import { clampText, guardPublicFormPost } from "@/lib/formGuard";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    const blocked = guardPublicFormPost(request, body, "sponsor");
    if (blocked) return blocked;

    const businessName = clampText(body.businessName, 200);
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!businessName || !email) {
      return NextResponse.json(
        { error: "Business name and email are required." },
        { status: 400 },
      );
    }

    if (!isValidLeadEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("sponsor_inquiry", {
      business_name: businessName,
      contact_name: clampText(body.contactName, 120) || null,
      email,
      phone: clampText(body.phone, 40) || null,
      website: clampText(body.website, 300) || null,
      sponsor_type: clampText(body.sponsorType, 80) || null,
      notes: clampText(body.notes, 2000) || null,
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
