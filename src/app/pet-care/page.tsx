import type { Metadata } from "next";
import { ServicePageView } from "@/components/service/ServicePageView";
import { getServicePage } from "@/data/servicePages";
import { servicePageMetadata } from "@/lib/metadata";

const config = getServicePage("pet-care");

export const metadata: Metadata = servicePageMetadata(
  "/pet-care",
  config.seo.title,
  config.seo.description,
  config.hero.image,
);

export default function PetCarePage() {
  return <ServicePageView config={config} />;
}
