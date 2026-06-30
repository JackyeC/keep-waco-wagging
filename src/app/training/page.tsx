import type { Metadata } from "next";
import { ServicePageView } from "@/components/service/ServicePageView";
import { getServicePage } from "@/data/servicePages";
import { servicePageMetadata } from "@/lib/metadata";

const config = getServicePage("training");

export const metadata: Metadata = servicePageMetadata(
  "/training",
  config.seo.title,
  config.seo.description,
  config.hero.image,
);

export default function TrainingPage() {
  return <ServicePageView config={config} />;
}
