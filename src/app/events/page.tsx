import type { Metadata } from "next";
import Link from "next/link";
import {
  confirmedEvents,
  dinnerClub,
  eventListingFields,
  linkedExperiences,
  planned2027Experiences,
  planned2027Year,
  upcomingYappyHourCount,
} from "@/data/events";
import { servicePageMetadata } from "@/lib/metadata";
import { ctas } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/events",
  "Events | Keep Waco Wagging",
  "Keep Waco Wagging events for Waco dog people. Confirmed gatherings are listed with date, venue, dog policy, price, and registration. The 2027 calendar is planned and not yet confirmed.",
);

export default function EventsPage() {
  const yappyUpcoming = upcomingYappyHourCount();

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-[900px] px-6 pt-14 pb-10">
          <p className="eyebrow tracking-[0.24em]">Keep Waco Wagging</p>
          <h1 className="display mt-3">Events</h1>
          <p className="dek mt-4 max-w-2xl">
            Hosted gatherings, dinners, and local adventures for Waco dog people.
            A listing appears here when the date, place, and how to register are
            confirmed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <h2 className="heading text-[clamp(1.7rem,3vw,2.3rem)]">Upcoming</h2>
        {confirmedEvents.length === 0 ? (
          <div className="card-panel mt-6 p-6 sm:p-8">
            <p className="text-[15px] leading-relaxed text-body-muted">
              No confirmed public events are on this calendar yet.
              {yappyUpcoming === 0
                ? " Yappy Hours does not have an open upcoming date either."
                : ` Yappy Hours has ${yappyUpcoming} upcoming date${yappyUpcoming === 1 ? "" : "s"} on its own page.`}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-label-muted">
              When an event is confirmed, its card will include:{" "}
              {eventListingFields.join(" · ")}.
            </p>
            <Link href={ctas.freeUpdates.href} className="btn-pill btn-sage mt-6 px-6 py-3">
              {ctas.freeUpdates.label}
            </Link>
          </div>
        ) : null}
      </section>

      <section className="bg-soft-cream">
        <div className="mx-auto max-w-[1100px] px-6 py-14">
          <p className="eyebrow tracking-[0.24em]">Already on the site</p>
          <h2 className="heading mt-2 text-[clamp(1.7rem,3vw,2.3rem)]">
            Related experiences
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {linkedExperiences.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="card-panel flex flex-col p-6 hover:border-wag-sage"
              >
                <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
                  {item.kind}
                </p>
                <h3 className="mt-2 font-display text-[1.45rem] font-medium text-serif-ink">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body-muted">
                  {item.copy}
                </p>
                <span className="mt-4 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase">
                  Open →
                </span>
              </Link>
            ))}
          </div>

          <article className="card-panel mt-5 p-6 sm:p-8">
            <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
              Dinner club · hosted on {dinnerClub.host}
            </p>
            <h3 className="mt-2 font-display text-[1.6rem] font-medium text-serif-ink">
              {dinnerClub.name}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body-muted">
              {dinnerClub.copy}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bark">
              {dinnerClub.pending}
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-16">
        <p className="eyebrow tracking-[0.24em]">Planned {planned2027Year} Experiences</p>
        <h2 className="heading mt-2 text-[clamp(1.7rem,3vw,2.4rem)]">
          A year of gatherings, still being planned
        </h2>
        <p className="dek mt-4 max-w-2xl">
          These months are a planning board. Themes, dates, venues, sponsors, and
          prices are not confirmed. Nothing in this grid is a ticket.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {planned2027Experiences.map((month) => (
            <li key={month.id} className="card-panel p-5">
              <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
                {month.status}
              </p>
              <h3 className="mt-2 font-display text-[1.45rem] font-medium text-serif-ink">
                {month.label}
              </h3>
              <p className="mt-2 text-sm text-body-muted">
                {month.theme ?? "Theme to be confirmed"}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-cream">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-[1.6rem] font-medium text-serif-ink">
              Want to host or support an event?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-body-muted">
              Partnership prices on the next page are proposals. They are not
              checkout products, and they do not buy editorial approval.
            </p>
          </div>
          <Link href="/sponsors" className="btn-pill btn-sage shrink-0 px-6 py-3">
            Partnerships
          </Link>
        </div>
      </section>
    </>
  );
}
