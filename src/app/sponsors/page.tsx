import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { CommunityPartners } from "@/components/CommunityPartners";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SponsorInquiryForm } from "@/components/SponsorInquiryForm";
import { sponsorTiers } from "@/data/communityPartners";
import {
  eventSponsorTiers,
  memberBenefitProgram,
} from "@/data/partnerships";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/sponsors",
  "Partnerships | Keep Waco Wagging",
  "Member benefit partners and event sponsors for Keep Waco Wagging. Proposed sponsorship prices are not checkout products. Editorial approval cannot be purchased.",
);

export default function SponsorsPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-[900px] px-6 pt-14 pb-8">
          <p className="eyebrow tracking-[0.24em]">Partnerships</p>
          <h1 className="display mt-3">Work with Keep Waco Wagging</h1>
          <p className="dek mt-4">
            Two ways for a local business to take part. {brandLanguage.primaryName}{" "}
            stays an independent guide. A partnership is labeled when it appears
            on the site.
          </p>
        </div>
      </section>

      <div className="border-y border-border bg-sage-50">
        <div className="mx-auto flex max-w-[1100px] items-start gap-3 px-6 py-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-wag-sage" aria-hidden />
          <p className="text-[15px] leading-relaxed text-bark">
            <span className="font-medium">
              Businesses cannot purchase Keep Waco Wagging Approved.
            </span>{" "}
            Recommendations stay editorial. Sponsored features are labeled as
            sponsored.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-[1100px] px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card-panel p-6 sm:p-8">
            <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
              Program
            </p>
            <h2 className="mt-2 font-display text-[1.8rem] font-medium text-serif-ink">
              {memberBenefitProgram.name}
            </h2>
            <p className="mt-3 font-display text-2xl text-serif-ink">
              {memberBenefitProgram.price}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-body-muted">
              {memberBenefitProgram.summary}
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-bark">
              {memberBenefitProgram.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </article>

          <article className="card-panel p-6 sm:p-8">
            <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
              Program
            </p>
            <h2 className="mt-2 font-display text-[1.8rem] font-medium text-serif-ink">
              Event Sponsors
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-body-muted">
              Support a specific gathering. These prices are a proposal for
              review. They are not products you can buy today.
            </p>
            <ul className="mt-5 space-y-4">
              {eventSponsorTiers.map((tier) => (
                <li key={tier.id} className="border-b border-border pb-4">
                  <p className="font-medium text-bark">{tier.name}</p>
                  <p className="font-display text-xl text-serif-ink">{tier.price}</p>
                  <p className="text-xs tracking-wide text-label-muted uppercase">
                    {tier.note}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-soft-cream">
        <div className="mx-auto max-w-[1100px] px-6 py-14">
          <h2 className="heading text-[clamp(1.6rem,3vw,2.2rem)]">Listed today</h2>
          <p className="dek mt-3 max-w-2xl">
            Platinum Scoops is the parent services business behind Keep Waco
            Wagging. The “Presenting Sponsor” label on that card is the existing
            camp-partner name, not the proposed $150 event tier. It is not a
            purchased editorial approval, and no member perk from another
            business is confirmed yet.
          </p>
          <div className="mt-8">
            <CommunityPartners showInquiryLink={false} />
          </div>
          <div className="mt-10">
            <h3 className="font-display text-[1.35rem] font-medium text-serif-ink">
              Camp conversations already in use
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-body-muted">
              These labels are how we have talked about camp and photo support.
              They are not the proposed event prices above, and they are not a
              checkout.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {sponsorTiers.map((tier) => (
                <li
                  key={tier}
                  className="rounded-full border border-border bg-cream px-4 py-2 text-sm text-bark"
                >
                  {tier}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="sponsor-inquiry" className="scroll-mt-36">
        <div className="mx-auto max-w-[760px] px-6 py-16">
          <p className="eyebrow tracking-[0.24em]">Inquiry</p>
          <h2 className="heading mt-2">Tell us what you have in mind</h2>
          <p className="dek mt-3">
            We save the inquiry with the existing sponsor list and send a
            notification through the same email path as other Keep Waco Wagging
            forms. A saved inquiry is the confirmation that it was received.
          </p>
          <div className="mt-8">
            <SponsorInquiryForm />
          </div>
        </div>
      </section>

      <NewsletterSignup sourcePage="/sponsors" variant="section" />
    </>
  );
}
