import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";
import { AdminTokenForm } from "@/components/admin/AdminTokenForm";
import { unlockNewsletterPreview } from "@/app/admin/newsletter/actions";
import {
  canViewAdminPreview,
  checkAdmin,
} from "@/lib/daily-sniff/admin-auth";
import { noindexRobots } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wag Club newsletter drafts",
  robots: noindexRobots,
};

function UnconfiguredScreen() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="rounded-3xl bg-amber-50 p-8 ring-1 ring-amber-200">
        <h1 className="font-display text-2xl text-bark">Preview locked</h1>
        <p className="mt-3 text-sm text-stone-700">
          Set{" "}
          <code className="rounded bg-white px-1.5 py-0.5">
            DAILY_SNIFF_ADMIN_TOKEN
          </code>{" "}
          to unlock internal newsletter drafts. noindex is not access control.
        </p>
      </div>
    </div>
  );
}

export default async function NewsletterAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const gate = await checkAdmin();

  if (!canViewAdminPreview(gate)) {
    if (gate.state === "unconfigured") {
      return <UnconfiguredScreen />;
    }

    return (
      <div className="px-6 py-20">
        <Suspense
          fallback={
            <div className="mx-auto max-w-sm rounded-3xl bg-white p-8 text-sm text-stone-600 shadow-sm ring-1 ring-stone-200">
              Loading…
            </div>
          }
        >
          <AdminTokenForm
            title="Newsletter preview"
            description="Enter the admin token to view unpublished Wag Club drafts. This is not a public page."
            action={unlockNewsletterPreview}
          />
        </Suspense>
      </div>
    );
  }

  return children;
}
