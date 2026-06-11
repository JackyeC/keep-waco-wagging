import { redirect } from "next/navigation";

/**
 * Legacy business-spotlights route — consolidated into the dog-friendly Waco
 * directory. (Original content preserved in git history.)
 */
export default function LegacySpotlightsRedirect() {
  redirect("/dog-friendly-waco");
}
