import { NextResponse } from "next/server";
import { clampText, guardPublicFormPost } from "@/lib/formGuard";
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

    const blocked = guardPublicFormPost(request, body, "leads");
    if (blocked) return blocked;

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

    const zipCode =
      clampText(body.zipCode, 20) || clampText(body.neighborhood, 120) || null;

    const payload = {
      first_name: clampText(body.firstName, 80) || null,
      email,
      dog_name: clampText(body.dogName, 80) || null,
      zip_code: zipCode,
      interests,
      source_page: clampText(body.sourcePage, 200) || null,
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
