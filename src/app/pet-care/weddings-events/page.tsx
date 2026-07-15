import type { Metadata } from "next";
import { ServicePageView } from "@/components/service/ServicePageView";
import { WeddingChaperoneIntro } from "@/components/service/WeddingChaperoneIntro";
import { WeddingEventCareExtras } from "@/components/service/WeddingEventCareExtras";
import { getServicePage } from "@/data/servicePages";
import { servicePageMetadata } from "@/lib/metadata";

const config = getServicePage("weddings-events");

export const metadata: Metadata = servicePageMetadata(
  "/pet-care/weddings-events",
  config.seo.title,
  config.seo.description,
  config.hero.image,
);

export default function WeddingsEventsPage() {
  return (
    <ServicePageView
      config={config}
      beforeIncluded={<WeddingChaperoneIntro />}
    >
      <WeddingEventCareExtras />
    </ServicePageView>
  );
}
