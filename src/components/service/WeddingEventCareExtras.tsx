import { EventCareInquiryForm } from "@/components/EventCareInquiryForm";
import {
  eventCareAddOn,
  eventCareFit,
  eventCarePackages,
} from "@/data/eventCare";

export function WeddingEventCareExtras() {
  return (
    <>
      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="text-center">
          <p className="eyebrow tracking-[0.22em]">Packages</p>
          <h2 className="heading mt-1.5 text-[38px]">Choose the right level of support</h2>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {eventCarePackages.map((pkg) => (
            <article
              key={pkg.name}
              className={`rounded-[18px] border bg-soft-cream p-6 sm:p-7 ${
                pkg.featured ? "border-rose ring-1 ring-rose/30" : "border-border"
              }`}
            >
              {pkg.featured && (
                <p className="text-xs font-medium tracking-[0.16em] text-rose uppercase">
                  Most popular
                </p>
              )}
              <h3 className="mt-1 font-display text-[22px] font-semibold text-serif-ink">
                {pkg.name}
              </h3>
              <p className="body-light mt-2">{pkg.bestFor}</p>
              <p className="mt-3 text-sm font-medium text-rose">{pkg.startingAt}</p>
              <ul className="body-light mt-4 space-y-2 text-sm">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-rose" aria-hidden>
                      ♥
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <article className="mt-4 rounded-[18px] border border-border bg-soft-cream p-6 sm:p-7">
          <h3 className="font-display text-[22px] font-semibold text-serif-ink">
            {eventCareAddOn.name}
          </h3>
          <p className="body-light mt-2">{eventCareAddOn.description}</p>
          <p className="mt-3 text-sm font-medium text-rose">{eventCareAddOn.startingAt}</p>
        </article>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="grid gap-6 rounded-[24px] border border-border bg-soft-cream p-8 md:grid-cols-2 md:p-10">
          <div>
            <p className="eyebrow tracking-[0.22em]">Good fit</p>
            <p className="body-light mt-3">{eventCareFit.goodFit}</p>
          </div>
          <div>
            <p className="eyebrow tracking-[0.22em]">When to adjust the plan</p>
            <p className="body-light mt-3">{eventCareFit.notFit}</p>
          </div>
        </div>
      </section>

      <section id="inquiry" className="mx-auto mt-14 max-w-[1200px] scroll-mt-24 px-6">
        <div className="mb-7 text-center">
          <p className="eyebrow tracking-[0.22em]">Tell us about your day</p>
          <h2 className="heading mt-1.5 text-[38px]">Ask about wedding pet care</h2>
          <p className="body-light mx-auto mt-3 max-w-xl">
            Share your date, venue, and what role your dog will play. We&apos;ll follow up
            to plan the right chaperone support.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <EventCareInquiryForm />
        </div>
      </section>
    </>
  );
}
