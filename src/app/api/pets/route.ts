import { NextResponse } from "next/server";
import { clampText, guardPublicFormPost } from "@/lib/formGuard";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    const blocked = guardPublicFormPost(request, body, "pets");
    if (blocked) return blocked;

    const email = body.email?.trim().toLowerCase() ?? "";
    const petName = clampText(body.petName, 80);

    if (!email || !petName) {
      return NextResponse.json(
        { error: "Pet name and email are required." },
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
      name: clampText(body.ownerName, 120) || null,
      email,
      interest: "Pet submission",
      message: [
        `Pet: ${petName}`,
        `Breed: ${clampText(body.breed, 80)}`,
        `Age/stage: ${clampText(body.ageOrStage, 80)}`,
        `Neighborhood: ${clampText(body.neighborhood, 120)}`,
        `Bio: ${clampText(body.bio, 1500)}`,
        body.photoFilename
          ? `Photo filename: ${clampText(body.photoFilename, 200)}`
          : null,
      ]
        .filter(Boolean)
        .join("\n"),
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
