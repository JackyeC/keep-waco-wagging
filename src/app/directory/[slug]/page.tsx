import { redirect } from "next/navigation";

/** Legacy directory detail route — consolidated into /dog-friendly-waco. */
export default function LegacyListingRedirect() {
  redirect("/dog-friendly-waco");
}
