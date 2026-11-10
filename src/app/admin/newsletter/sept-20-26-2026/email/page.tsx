import type { Metadata } from "next";
import {
  WagClubPreviewBanner,
  WagClubPreviewNav,
} from "@/components/newsletter/WagClubWebPreview";
import { wagClubSept20Issue } from "@/data/newsletters/wagClubSept20";
import { renderWagClubEmailHtml } from "@/lib/newsletter/renderWagClubEmail";
import { noindexRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Email HTML: ${wagClubSept20Issue.subject}`,
  robots: noindexRobots,
};

export default function WagClubSept20EmailPage() {
  const html = renderWagClubEmailHtml();

  return (
    <>
      <WagClubPreviewBanner />
      <WagClubPreviewNav current="email" />
      <div className="mx-auto max-w-[760px] px-6 py-8">
        <p className="text-sm text-body-muted">
          Resend-compatible HTML.{" "}
          <a
            href="/admin/newsletter/sept-20-26-2026/raw"
            className="text-wag-sage underline underline-offset-2"
          >
            Open raw email render
          </a>
        </p>
        <iframe
          title="Email HTML preview"
          className="mt-4 h-[900px] w-full rounded-[20px] border border-border bg-white"
          srcDoc={html}
        />
        <label className="mt-6 block text-[11px] font-medium tracking-[0.14em] text-label-muted uppercase">
          HTML source
          <textarea
            readOnly
            value={html}
            className="mt-2 h-64 w-full rounded-xl border border-border bg-soft-cream p-3 font-mono text-[11px] text-bark"
          />
        </label>
      </div>
    </>
  );
}
