import type { Metadata } from "next";
import { SummerCampCalendar } from "@/components/camp/SummerCampCalendar";
import { PetCareServiceLanding } from "@/components/pet-care/PetCareServiceLanding";
import { getPetCareLanding } from "@/data/petCareLandings";
import { servicePageMetadata } from "@/lib/metadata";

const config = getPetCareLanding("dog-daycare-waco-tx");

export const metadata: Metadata = servicePageMetadata(
  config.path,
  config.seo.title,
  config.seo.description,
  config.hero.image,
);

export default function DogDaycareWacoTxPage() {
  return (
    <>
      <PetCareServiceLanding config={config} />
      <div className="mx-auto max-w-[1200px] px-6 pb-8">
        <SummerCampCalendar id="camp-waco" variant="home" className="mt-16" />
      </div>
    </>
  );
}
