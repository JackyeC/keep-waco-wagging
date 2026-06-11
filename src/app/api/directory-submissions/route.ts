import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | boolean>;

    if (!String(body.placeName ?? "").trim()) {
      return NextResponse.json(
        { error: "Business or place name is required." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("directory_submission", {
      submitter_name: String(body.submitterName ?? "").trim() || null,
      submitter_email:
        String(body.submitterEmail ?? "").trim().toLowerCase() || null,
      place_name: String(body.placeName).trim(),
      category: String(body.category ?? "").trim() || null,
      address: String(body.address ?? "").trim() || null,
      website: String(body.website ?? "").trim() || null,
      phone: String(body.phone ?? "").trim() || null,
      neighborhood: String(body.neighborhood ?? "").trim() || null,
      dog_policy: String(body.dogPolicy ?? "").trim() || null,
      patio_details: String(body.patioDetails ?? "").trim() || null,
      water_bowls: String(body.waterBowls ?? "").trim() || null,
      shade: String(body.shade ?? "").trim() || null,
      best_time_to_visit: String(body.bestTimeToVisit ?? "").trim() || null,
      notes: String(body.notes ?? "").trim() || null,
      owner_or_manager: Boolean(body.ownerOrManager),
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
