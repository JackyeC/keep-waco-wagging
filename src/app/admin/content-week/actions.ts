"use server";

import { redirect } from "next/navigation";
import {
  clearAdminCookie,
  setAdminCookie,
} from "@/lib/daily-sniff/admin-auth";

export async function loginContentWeek(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const ok = await setAdminCookie(token);
  if (!ok) {
    redirect("/admin/content-week?error=1");
  }
  redirect("/admin/content-week");
}

export async function logoutContentWeek() {
  await clearAdminCookie();
  redirect("/admin/content-week");
}
