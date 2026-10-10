import { NextResponse } from "next/server";
import { clampText, guardPublicFormPost } from "@/lib/formGuard";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";
import {
  formatPartnershipNotes,
  isPartnershipInterest,
} from "@/lib/partnershipInquiry";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    const blocked = guardPublicFormPost(request, body, "sponsor");
    if (blocked) return blocked;

    const businessName = clampText(body.businessName, 200);
    const contactName = clampText(body.contactName, 120);
    const email = body.email?.trim().toLowerCase() ?? "";
    const sponsorType = clampText(body.sponsorType, 80);
    const perk = clampText(body.proposedPerk, 500);

    if (!businessName || !contactName || !email || !sponsorType || !perk) {
      return NextResponse.json(
        {
          error:
            "Contact name, business name, email, type of interest, and a proposed perk or sponsorship interest are required.",
        },
        { status: 400 },
      );
    }

    if (!isPartnershipInterest(sponsorType)) {
      return NextResponse.json(
        { error: "Please choose a type of interest." },
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
      contact_name: contactName,
      email,
      phone: clampText(body.phone, 40) || null,
      website: clampText(body.website, 300) || null,
      sponsor_type: sponsorType,
      notes: formatPartnershipNotes(perk, clampText(body.notes, 1200)),
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
