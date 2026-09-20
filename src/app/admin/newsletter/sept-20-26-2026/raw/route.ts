import { NextResponse } from "next/server";
import { renderWagClubEmailHtml } from "@/lib/newsletter/renderWagClubEmail";

export function GET() {
  return new NextResponse(renderWagClubEmailHtml(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
