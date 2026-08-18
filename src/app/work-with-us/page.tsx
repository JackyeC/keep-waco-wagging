import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SponsorInquiryForm } from "@/components/SponsorInquiryForm";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/work-with-us",
  "Reach Waco Dog Parents | Work With Keep Waco Wagging",
  "Local businesses that want to reach Waco dog parents can partner with Keep Waco Wagging. Sponsorship never determines our editorial Keep Waco Wagging Approved ratings.",
);

const opportunities = [
  { title: "Wag Watch sponsor", copy: "Support timely local dog-parent updates." },
  { title: "Wag Club newsletter sponsor", copy: "Reach our email audience of Waco dog people." },
  { title: "Event sponsor", copy: "Back dog-friendly community events." },
  { title: "Promoted offer", copy: "Share a clearly-labeled local offer." },
  { title: "Featured local business", copy: "Introduce your business to local dog parents." },
  { title: "Guide sponsorship", copy: "Sponsor a Keep Waco Wagging guide or resource." },
  { title: "Directory advertising", copy: "Advertise alongside dog-friendly listings." },
  { title: "Community partnership", copy: "Team up on local dog-community initiatives." },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work with us"
        title="Reach Waco dog parents"
        description="Keep Waco Wagging is becoming Waco's home for dog people. If you're a local business that wants to reach engaged Waco and McLennan County dog parents, we'd love to talk about ways to work together."
        tone="sage"
      />

      {/* Editorial independence — stated up front and unmissable. */}
      <div className="border-b border-clay bg-sage-50">
        <div className="mx-auto flex max-w-[1200px] items-start gap-3 px-6 py-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-wag-sage" aria-hidden="true" />
          <p className="text-[14.5px] leading-relaxed text-bark-soft">
            <span className="font-semibold text-bark">
              Sponsorship never determines a Keep Waco Wagging Approved rating.
            </span>{" "}
            Our recommendations remain editorial and independent, and sponsored
            content is always clearly identified.
          </p>
        </div>
      </div>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Ways to partner"
          title="Opportunities for local businesses"
          description="These are the kinds of partnerships we're building. Tell us what you have in mind and we'll follow up with details."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((o) => (
            <div key={o.title} className="rounded-[18px] border border-border bg-soft-cream p-5">
              <h3 className="font-display text-[1.15rem] font-medium text-serif-ink">
                {o.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-body-muted">
                {o.copy}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Tell us about your business"
            title="Start the conversation"
            description="Share a few details and we'll reach out about partnership options. This is an interest form — no commitment."
          />
          <div className="mt-8">
            <SponsorInquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
