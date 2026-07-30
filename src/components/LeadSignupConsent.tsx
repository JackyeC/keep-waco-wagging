import Link from "next/link";
import { signupCopy } from "@/lib/signup";

/** Consent line shown on lead / newsletter signup forms. */
export function LeadSignupConsent() {
  return (
    <p className="text-xs leading-relaxed text-bark-faint">
      By joining, you agree to receive occasional emails from Keep Waco Wagging
      about dog camp, pet care, and local events. You can ask to be removed
      anytime. {signupCopy.privacyNote} See our{" "}
      <Link
        href="/privacy"
        className="underline underline-offset-2 hover:text-wag-sage"
      >
        privacy policy
      </Link>
      .
    </p>
  );
}
