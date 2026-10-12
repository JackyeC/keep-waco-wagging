import { NextResponse } from "next/server";
import {
  canViewAdminPreview,
  checkAdmin,
} from "@/lib/daily-sniff/admin-auth";
import { renderWagClubEmailHtml } from "@/lib/newsletter/renderWagClubEmail";

export const dynamic = "force-dynamic";

export async function GET() {
  const gate = await checkAdmin();
  if (!canViewAdminPreview(gate)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      {
        status: 401,
        headers: { "X-Robots-Tag": "noindex, nofollow" },
      },
    );
  }

  return new NextResponse(renderWagClubEmailHtml(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
