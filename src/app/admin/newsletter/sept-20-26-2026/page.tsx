import type { Metadata } from "next";
import {
  WagClubPreviewBanner,
  WagClubPreviewNav,
  WagClubWebPreview,
} from "@/components/newsletter/WagClubWebPreview";
import { wagClubSept20Issue } from "@/data/newsletters/wagClubSept20";
import { noindexRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Preview: ${wagClubSept20Issue.subject}`,
  description: wagClubSept20Issue.previewText,
  robots: noindexRobots,
};

export default function WagClubSept20WebPreviewPage() {
  return (
    <>
      <WagClubPreviewBanner />
      <WagClubPreviewNav current="web" />
      <WagClubWebPreview />
    </>
  );
}
