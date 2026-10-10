import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  isValidAdminCookie,
  newsletterPreviewGuard,
} from "@/lib/admin/adminCookie";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = isValidAdminCookie(
    request.cookies.get(ADMIN_COOKIE_NAME)?.value,
  );
  const action = newsletterPreviewGuard(pathname, authed);

  if (action === "unauthorized") {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      {
        status: 401,
        headers: { "X-Robots-Tag": "noindex, nofollow" },
      },
    );
  }

  if (action === "rewrite-index") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/newsletter";
    url.search = "";
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/newsletter/:path*"],
};
