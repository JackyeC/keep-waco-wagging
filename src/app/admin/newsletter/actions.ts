"use server";

import { redirect } from "next/navigation";
import {
  clearAdminCookie,
  setAdminCookie,
} from "@/lib/daily-sniff/admin-auth";
import { safeNewsletterReturnPath } from "@/lib/admin/safeReturnPath";

export async function unlockNewsletterPreview(formData: FormData) {
  const next = safeNewsletterReturnPath(formData.get("next"));
  const token = String(formData.get("token") ?? "");
  const ok = await setAdminCookie(token);
  if (!ok) {
    redirect(`${next}?error=1`);
  }
  redirect(next);
}

export async function lockNewsletterPreview() {
  await clearAdminCookie();
  redirect("/admin/newsletter");
}
