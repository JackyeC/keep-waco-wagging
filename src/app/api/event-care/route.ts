import { NextResponse } from "next/server";
import { clampText, guardPublicFormPost } from "@/lib/formGuard";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    const blocked = guardPublicFormPost(request, body, "event-care");
    if (blocked) return blocked;

    const name = clampText(body.name, 120);
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
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
      name,
      email,
      interest: "Dog of Honor Wedding Pet Care",
      message: [
        `Phone: ${clampText(body.phone, 40)}`,
        `Event date: ${clampText(body.eventDate, 80)}`,
        `Event type: ${clampText(body.eventType, 120)}`,
        `Venue/location: ${clampText(body.venue, 200)}`,
        `Setting: ${clampText(body.setting, 120)}`,
        `Time needed: ${clampText(body.timeNeeded, 120)}`,
        `Dog name: ${clampText(body.dogName, 80)}`,
        `Dog breed/size: ${clampText(body.dogBreed, 120)}`,
        `Dog age: ${clampText(body.dogAge, 80)}`,
        `Number of dogs: ${clampText(body.dogCount, 40)}`,
        `Dog's role: ${clampText(body.dogRole, 200)}`,
        `Comfortable around crowds: ${clampText(body.crowdComfort, 80)}`,
        `Comfortable on leash: ${clampText(body.leashComfort, 80)}`,
        `Bite history / reactivity: ${clampText(body.biteOrReactivity, 500)}`,
        `Medication / special handling: ${clampText(body.specialHandling, 500)}`,
        `Planner/photographer contact: ${clampText(body.vendorContact, 200)}`,
        `Notes: ${clampText(body.notes, 2000)}`,
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
