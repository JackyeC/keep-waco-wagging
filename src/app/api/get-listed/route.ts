import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;
    const placeName = body.placeName || body.businessName;

    if (!placeName?.trim()) {
      return NextResponse.json(
        { error: "Business or place name is required." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("directory_submission", {
      submitter_name: body.contactName?.trim() || null,
      submitter_email: body.email?.trim().toLowerCase() || null,
      place_name: placeName.trim(),
      category: body.category || null,
      address: body.address?.trim() || null,
      website: body.website?.trim() || null,
      phone: body.phone?.trim() || null,
      neighborhood: null,
      dog_policy: body.dogsAllowed || null,
      patio_details: body.dogAreas || null,
      water_bowls: body.waterBowls || null,
      shade: body.shade || null,
      best_time_to_visit: body.bestTime?.trim() || null,
      notes: body.notes?.trim() || null,
      owner_or_manager: false,
      status: "pending",
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
