import type { Metadata } from "next";
import { Check, Star, Megaphone, Mail, CalendarDays, BadgeCheck, Handshake, MonitorSmartphone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GetListedForm } from "@/components/GetListedForm";

export const metadata: Metadata = {
  title: "Get Listed on Keep Waco Wagging",
  description:
    "Are you a dog-friendly, pet-related, or dog-parent-useful business in Waco? Get listed on Keep Waco Wagging with free basic listings, featured spotlights, and more.",
};

const options = [
  { icon: Check, label: "Free basic listing", desc: "Get on the map for local dog parents searching the directory." },
  { icon: Star, label: "Featured listing", desc: "Stand out at the top of your category with a highlighted card." },
  { icon: Megaphone, label: "Sponsored business spotlight", desc: "A dedicated feature telling your story to the Waco dog community." },
  { icon: MonitorSmartphone, label: "Display ad placement", desc: "Run an ad in the directory, blog, or pet showcase sidebars." },
  { icon: Mail, label: "Newsletter mention", desc: "Reach inboxes through Where to Wag This Weekend." },
  { icon: CalendarDays, label: "Event promotion", desc: "Promote your dog-friendly events to local pet parents." },
  { icon: BadgeCheck, label: "Waco Wagging Approved badge", desc: "Show dog parents you're a verified dog-friendly spot." },
  { icon: Handshake, label: "Collaboration or pop-up", desc: "Partner with us on a pop-up, giveaway, or local event." },
];

export default function GetListedPage() {
  return (
    <>
      <PageHeader
        eyebrow="For local businesses"
        title="Get Listed on Keep Waco Wagging"
        description="If your business is dog-friendly, pet-related, or useful to local dog parents, we'd love to include you. Tell us about your spot and we'll help you reach Waco's dog community."
        tone="sage"
      />

      {/* Listing options */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Listing options"
          title="Ways to get involved"
          description="Start free, or amplify your reach with a feature, badge, or newsletter mention."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((opt) => (
            <div
              key={opt.label}
              className="flex gap-3 rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                <opt.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-semibold">{opt.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-bark-soft">
                  {opt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Form */}
      <Section tone="sand">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Apply"
            title="Tell us about your business"
            description="Fill out the details below. Listings are reviewed before going live."
          />
          <div className="mt-8">
            <GetListedForm />
          </div>
        </div>
      </Section>
    </>
  );
}
