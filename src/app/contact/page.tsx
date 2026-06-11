import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import { platinumScoops } from "@/data/platinumScoops";

export const metadata: Metadata = {
  title: "Contact Keep Waco Wagging",
  description:
    "Contact Keep Waco Wagging about Platinum Scoops, pet care, dog-friendly directory listings, sponsorships, press, or community questions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach out to Keep Waco Wagging"
        description="Questions about Platinum Scoops, pet care, the directory, sponsorships, or local dog community ideas? Send a note."
        tone="sky"
      />
      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />
          <aside className="rounded-card bg-cream p-6 ring-1 ring-inset ring-clay/70">
            <h2 className="text-xl font-semibold">Direct contact</h2>
            <p className="mt-3 text-sm text-bark-soft">
              Platinum Scoops and Keep Waco Wagging are family-run in Waco.
            </p>
            <p className="mt-4 text-sm">
              <a className="font-semibold text-sage-700" href={`mailto:${platinumScoops.email}`}>
                {platinumScoops.email}
              </a>
            </p>
            <p className="mt-2 text-sm">
              <a className="font-semibold text-sage-700" href={platinumScoops.phoneHref}>
                {platinumScoops.phoneDisplay} ({platinumScoops.phoneNumeric})
              </a>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
