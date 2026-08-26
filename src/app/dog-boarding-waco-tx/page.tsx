import type { Metadata } from "next";
import { PetCareServiceLanding } from "@/components/pet-care/PetCareServiceLanding";
import { getPetCareLanding } from "@/data/petCareLandings";
import { servicePageMetadata } from "@/lib/metadata";

const config = getPetCareLanding("dog-boarding-waco-tx");

export const metadata: Metadata = servicePageMetadata(
  config.path,
  config.seo.title,
  config.seo.description,
  config.hero.image,
);

export default function DogBoardingWacoTxPage() {
  return <PetCareServiceLanding config={config} />;
}
