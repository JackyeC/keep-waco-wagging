import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    if (!body.businessName?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Business name and email are required." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("sponsor_inquiry", {
      business_name: body.businessName.trim(),
      contact_name: body.contactName?.trim() || null,
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      website: body.website?.trim() || null,
      sponsor_type: body.sponsorType || null,
      notes: body.notes?.trim() || null,
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
