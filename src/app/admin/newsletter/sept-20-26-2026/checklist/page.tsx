import type { Metadata } from "next";
import {
  WagClubPreviewBanner,
  WagClubPreviewNav,
} from "@/components/newsletter/WagClubWebPreview";
import { wagClubSept20Issue } from "@/data/newsletters/wagClubSept20";
import { renderWagClubChecklist } from "@/lib/newsletter/renderWagClubEmail";
import { noindexRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Checklist: ${wagClubSept20Issue.subject}`,
  robots: noindexRobots,
};

export default function WagClubSept20ChecklistPage() {
  return (
    <>
      <WagClubPreviewBanner />
      <WagClubPreviewNav current="checklist" />
      <div className="mx-auto max-w-[720px] px-6 py-8">
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-[20px] border border-border bg-soft-cream p-5 font-mono text-[13px] leading-relaxed text-bark">
          {renderWagClubChecklist()}
        </pre>
      </div>
    </>
  );
}
