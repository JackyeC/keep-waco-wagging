import { NextResponse } from "next/server";
import { isValidLeadEmail, saveSubmission } from "@/lib/leads";
import { signupCopy, sanitizeLeadInterests } from "@/lib/signup";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      email?: string;
      dogName?: string;
      zipCode?: string;
      neighborhood?: string;
      interests?: string[];
      sourcePage?: string;
      _hp?: string;
    };

    // Honeypot filled — pretend success without persisting.
    if (body._hp?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const rawEmail = body.email?.trim();
    if (!rawEmail) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const email = rawEmail.toLowerCase();
    if (!isValidLeadEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const interests = sanitizeLeadInterests(body.interests);

    const zipCode = body.zipCode?.trim() || body.neighborhood?.trim() || null;

    const payload = {
      first_name: body.firstName?.trim() || null,
      email,
      dog_name: body.dogName?.trim() || null,
      zip_code: zipCode,
      interests,
      source_page: body.sourcePage?.trim() || null,
      source: "keep_waco_wagging",
      consent: true,
    };

    const result = await saveSubmission("lead", payload);

    if (!result.ok) {
      return NextResponse.json({ error: signupCopy.error }, { status: 500 });
    }

    // Notification failures are logged server-side only — visitors see standard success copy.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: signupCopy.error }, { status: 400 });
  }
}
