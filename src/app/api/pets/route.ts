import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;
    if (!body.email?.trim() || !body.petName?.trim()) {
      return NextResponse.json(
        { error: "Pet name and email are required." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("contact_message", {
      name: body.ownerName?.trim() || null,
      email: body.email.trim().toLowerCase(),
      interest: "Pet submission",
      message: [
        `Pet: ${body.petName}`,
        `Breed: ${body.breed ?? ""}`,
        `Age/stage: ${body.ageOrStage ?? ""}`,
        `Neighborhood: ${body.neighborhood ?? ""}`,
        `Bio: ${body.bio ?? ""}`,
      ].join("\n"),
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
