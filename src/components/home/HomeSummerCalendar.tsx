import { SummerCampCalendar } from "@/components/camp/SummerCampCalendar";

export function HomeSummerCalendar() {
  return (
    <section className="mx-auto mt-[72px] max-w-[1200px] px-6">
      <SummerCampCalendar id="summer-calendar" variant="home" />
    </section>
  );
}
