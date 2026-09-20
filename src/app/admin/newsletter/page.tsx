import type { Metadata } from "next";
import Link from "next/link";
import { noindexRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Wag Club newsletter drafts",
  robots: noindexRobots,
};

export default function NewsletterDraftIndexPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p className="eyebrow">Internal</p>
      <h1 className="heading mt-3 text-[2rem]">Wag Club newsletter drafts</h1>
      <p className="mt-3 text-sm text-body-muted">
        These pages are noindex, off the sitemap, and not a send path.
      </p>
      <Link
        href="/admin/newsletter/sept-20-26-2026"
        className="mt-8 block rounded-[20px] border border-border bg-soft-cream p-5 hover:border-wag-sage"
      >
        <p className="text-[11px] font-medium tracking-[0.14em] text-wag-sage uppercase">
          Sept. 20–26, 2026
        </p>
        <p className="mt-2 font-display text-xl text-serif-ink">
          Your dog&apos;s week in Waco
        </p>
        <p className="mt-1 text-sm text-label-muted">Draft — not sent</p>
      </Link>
    </div>
  );
}
