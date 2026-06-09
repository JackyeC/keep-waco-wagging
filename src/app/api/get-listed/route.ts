import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    if (!body.businessName?.trim() || !body.contactName?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Business name, contact name, and email are required." },
        { status: 400 },
      );
    }

    const result = await saveLead("get_listed", {
      business_name: body.businessName.trim(),
      contact_name: body.contactName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() ?? null,
      website: body.website?.trim() ?? null,
      social: body.social?.trim() ?? null,
      category: body.category ?? null,
      address: body.address?.trim() ?? null,
      dogs_allowed: body.dogsAllowed ?? null,
      dog_areas: body.dogAreas ?? null,
      dog_rules: body.dogRules?.trim() ?? null,
      water_bowls: body.waterBowls ?? null,
      shade: body.shade ?? null,
      best_time: body.bestTime?.trim() ?? null,
      sponsor: body.sponsor ?? null,
      notes: body.notes?.trim() ?? null,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
