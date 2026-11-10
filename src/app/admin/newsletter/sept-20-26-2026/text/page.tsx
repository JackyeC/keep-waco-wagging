import type { Metadata } from "next";
import {
  WagClubPreviewBanner,
  WagClubPreviewNav,
} from "@/components/newsletter/WagClubWebPreview";
import { wagClubSept20Issue } from "@/data/newsletters/wagClubSept20";
import { renderWagClubEmailText } from "@/lib/newsletter/renderWagClubEmail";
import { noindexRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Plain text: ${wagClubSept20Issue.subject}`,
  robots: noindexRobots,
};

export default function WagClubSept20TextPage() {
  const text = renderWagClubEmailText();

  return (
    <>
      <WagClubPreviewBanner />
      <WagClubPreviewNav current="text" />
      <div className="mx-auto max-w-[720px] px-6 py-8">
        <p className="text-sm text-body-muted">
          Subject: {wagClubSept20Issue.subject}
        </p>
        <p className="mt-1 text-sm text-body-muted">
          Preview: {wagClubSept20Issue.previewText}
        </p>
        <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-[20px] border border-border bg-soft-cream p-5 font-mono text-[13px] leading-relaxed text-bark">
          {text}
        </pre>
      </div>
    </>
  );
}
