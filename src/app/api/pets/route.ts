import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    if (!body.petName?.trim() || !body.ownerName?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Pet name, your name, and email are required." },
        { status: 400 },
      );
    }

    const result = await saveLead("pet_submission", {
      pet_name: body.petName.trim(),
      breed: body.breed?.trim() ?? null,
      age_or_stage: body.ageOrStage?.trim() ?? null,
      neighborhood: body.neighborhood?.trim() ?? null,
      bio: body.bio?.trim() ?? null,
      owner_name: body.ownerName.trim(),
      email: body.email.trim().toLowerCase(),
      photo_filename: body.photoFilename ?? null,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
