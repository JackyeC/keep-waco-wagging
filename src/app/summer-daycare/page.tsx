import type { Metadata } from "next";
import { SummerCampCalendar } from "@/components/camp/SummerCampCalendar";
import { ServicePageView } from "@/components/service/ServicePageView";
import { getServicePage } from "@/data/servicePages";
import { servicePageMetadata } from "@/lib/metadata";

const config = getServicePage("summer-daycare");

export const metadata: Metadata = servicePageMetadata(
  "/summer-daycare",
  config.seo.title,
  config.seo.description,
  config.hero.image,
);

export default function SummerDaycarePage() {
  return (
    <ServicePageView config={config}>
      <section className="mx-auto max-w-[1200px] px-6">
        <SummerCampCalendar id="calendar" variant="full" className="mt-14" />
      </section>
    </ServicePageView>
  );
}
