import { NextResponse } from "next/server";
import { clampText, guardPublicFormPost } from "@/lib/formGuard";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | boolean>;

    const blocked = guardPublicFormPost(request, body, "directory");
    if (blocked) return blocked;

    const placeName = clampText(body.placeName, 200);
    if (!placeName) {
      return NextResponse.json(
        { error: "Business or place name is required." },
        { status: 400 },
      );
    }

    const submitterEmail = clampText(body.submitterEmail, 254).toLowerCase();
    if (submitterEmail && !isValidLeadEmail(submitterEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("directory_submission", {
      submitter_name: clampText(body.submitterName, 120) || null,
      submitter_email: submitterEmail || null,
      place_name: placeName,
      category: clampText(body.category, 80) || null,
      address: clampText(body.address, 240) || null,
      website: clampText(body.website, 300) || null,
      phone: clampText(body.phone, 40) || null,
      neighborhood: clampText(body.neighborhood, 120) || null,
      dog_policy: clampText(body.dogPolicy, 1500) || null,
      patio_details: clampText(body.patioDetails, 500) || null,
      water_bowls: clampText(body.waterBowls, 40) || null,
      shade: clampText(body.shade, 40) || null,
      best_time_to_visit: clampText(body.bestTimeToVisit, 200) || null,
      notes: clampText(body.notes, 1500) || null,
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
