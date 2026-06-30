import type { Metadata } from "next";
import { ServicePageView } from "@/components/service/ServicePageView";
import { getServicePage } from "@/data/servicePages";
import { servicePageMetadata } from "@/lib/metadata";

const config = getServicePage("platinum-scoops");

export const metadata: Metadata = servicePageMetadata(
  "/platinum-scoops",
  config.seo.title,
  config.seo.description,
);

export default function PlatinumScoopsPage() {
  return <ServicePageView config={config} />;
}
