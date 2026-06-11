import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const result = await saveSubmission("contact_message", {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      interest: "Platinum Pup Event Care",
      message: [
        `Phone: ${body.phone ?? ""}`,
        `Event date: ${body.eventDate ?? ""}`,
        `Event type: ${body.eventType ?? ""}`,
        `Venue/location: ${body.venue ?? ""}`,
        `Setting: ${body.setting ?? ""}`,
        `Time needed: ${body.timeNeeded ?? ""}`,
        `Dog name: ${body.dogName ?? ""}`,
        `Dog breed/size: ${body.dogBreed ?? ""}`,
        `Dog age: ${body.dogAge ?? ""}`,
        `Number of dogs: ${body.dogCount ?? ""}`,
        `Dog's role: ${body.dogRole ?? ""}`,
        `Comfortable around crowds: ${body.crowdComfort ?? ""}`,
        `Comfortable on leash: ${body.leashComfort ?? ""}`,
        `Bite history / reactivity: ${body.biteOrReactivity ?? ""}`,
        `Medication / special handling: ${body.specialHandling ?? ""}`,
        `Planner/photographer contact: ${body.vendorContact ?? ""}`,
        `Notes: ${body.notes ?? ""}`,
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
