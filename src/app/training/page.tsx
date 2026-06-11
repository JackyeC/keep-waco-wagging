import { redirect } from "next/navigation";

/**
 * Legacy lifestyle-training route — the site now offers pet care via Rover.
 * Consolidated into /pet-care. (Original content preserved in git history.)
 */
export default function LegacyTrainingRedirect() {
  redirect("/pet-care");
}
