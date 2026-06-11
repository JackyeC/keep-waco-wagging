"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  checkAdmin,
  clearAdminCookie,
  setAdminCookie,
} from "@/lib/daily-sniff/admin-auth";
import type { BriefStatus } from "@/lib/daily-sniff/types";

async function requireAdmin() {
  const gate = await checkAdmin();
  if (gate.state !== "ok") {
    throw new Error("Not authorized.");
  }
}

export async function loginAdmin(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const ok = await setAdminCookie(token);
  if (!ok) {
    redirect("/admin/daily-sniff?error=1");
  }
  redirect("/admin/daily-sniff");
}

export async function logoutAdmin() {
  await clearAdminCookie();
  redirect("/admin/daily-sniff");
}

async function setBriefStatus(
  briefId: string,
  status: BriefStatus,
  extra: Record<string, unknown> = {},
) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase not configured.");

  const { error } = await supabase
    .from("daily_sniff_briefs")
    .update({
      status,
      updated_at: new Date().toISOString(),
      reviewed_at: new Date().toISOString(),
      ...extra,
    })
    .eq("id", briefId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/daily-sniff");
  revalidatePath(`/admin/daily-sniff/${briefId}`);
}

export async function approveBrief(briefId: string) {
  await setBriefStatus(briefId, "approved", { needs_verification: false });
}

export async function rejectBrief(briefId: string) {
  await setBriefStatus(briefId, "rejected");
}

export async function markNeedsVerification(briefId: string, notes?: string) {
  await setBriefStatus(briefId, "needs_verification", {
    needs_verification: true,
    verification_notes: notes ?? null,
  });
}

export async function archiveBrief(briefId: string) {
  await setBriefStatus(briefId, "archived");
}

export async function updateContentBlock(blockId: string, content: string) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase not configured.");

  const { data: block, error: fetchError } = await supabase
    .from("daily_sniff_content_blocks")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", blockId)
    .select("brief_id")
    .single();

  if (fetchError) throw new Error(fetchError.message);

  if (block?.brief_id) {
    revalidatePath(`/admin/daily-sniff/${block.brief_id}`);
  }
}

// Form-action wrappers (bound briefId/blockId via .bind in the components).
export async function approveBriefAction(briefId: string) {
  await approveBrief(briefId);
}
export async function rejectBriefAction(briefId: string) {
  await rejectBrief(briefId);
}
export async function archiveBriefAction(briefId: string) {
  await archiveBrief(briefId);
}
export async function markNeedsVerificationAction(briefId: string, formData: FormData) {
  await markNeedsVerification(briefId, String(formData.get("notes") ?? "") || undefined);
}
export async function updateContentBlockAction(blockId: string, formData: FormData) {
  await updateContentBlock(blockId, String(formData.get("content") ?? ""));
}
