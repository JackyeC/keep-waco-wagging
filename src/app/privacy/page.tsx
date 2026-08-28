import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { servicePageMetadata } from "@/lib/metadata";
import { cityConfig } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/privacy",
  "Privacy Policy",
  `How ${cityConfig.name} collects, uses, and protects information from visitors and customers.`,
);

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy policy"
        description="How Keep Waco Wagging handles the information you share with us — forms, newsletter signups, and website analytics."
        tone="sage"
      />
      <Section tone="paper">
        <div className="mx-auto max-w-3xl space-y-8 rounded-card bg-white p-7 text-sm leading-relaxed text-bark-soft ring-1 ring-inset ring-clay/70">
          <p>
            Keep Waco Wagging (&ldquo;we,&rdquo; &ldquo;us&rdquo;) is a local
            Waco dog-care and community site presented by Platinum Scoops. This
            policy explains what we collect when you use{" "}
            <a href={cityConfig.url} className="text-wag-sage underline-offset-2 hover:underline">
              {cityConfig.url.replace(/^https?:\/\//, "")}
            </a>
            , and how we use it.
          </p>

          <div>
            <h2 className="text-lg font-semibold text-bark">Information we collect</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-medium text-bark">Contact details</strong>{" "}
                you submit — name, email, phone, neighborhood or zip, dog name,
                and message content from contact, RSVP, directory, sponsor, and
                pet-submission forms.
              </li>
              <li>
                <strong className="font-medium text-bark">Newsletter preferences</strong>{" "}
                such as interest topics and the page where you signed up.
              </li>
              <li>
                <strong className="font-medium text-bark">Technical data</strong>{" "}
                such as approximate location inferred from IP for abuse
                prevention, and standard analytics events from Vercel Analytics.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">How we use it</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Respond to booking questions, RSVPs, and service inquiries</li>
              <li>Send Keep Waco Wagging updates you requested (you can opt out anytime)</li>
              <li>Review directory and community submissions</li>
              <li>Improve the website and protect forms from spam or abuse</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">Shopping & checkout</h2>
            <p className="mt-2">
              Merchandise checkout happens on our Shopify store. Payment cards
              and shipping addresses entered at checkout are processed by Shopify
              and its payment partners — not stored on keepwacowagging.com. See
              Shopify&apos;s privacy policy for that flow.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">Sharing</h2>
            <p className="mt-2">
              We use trusted processors to run the site: Supabase (form storage),
              Resend (email notifications), Vercel (hosting and analytics), and
              Shopify/Printify (merch). We do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">Retention & choices</h2>
            <p className="mt-2">
              We keep form and signup records as long as needed to respond and
              operate the business, then delete or anonymize them when no longer
              needed. Email{" "}
              <a
                href={`mailto:${cityConfig.publicEmail}`}
                className="text-wag-sage underline-offset-2 hover:underline"
              >
                {cityConfig.publicEmail}
              </a>{" "}
              to update your info, ask to be removed from the list, or request
              deletion of a submission.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">Children</h2>
            <p className="mt-2">
              This site is intended for adults arranging pet care and community
              resources. We do not knowingly collect personal information from
              children under 13.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">Updates</h2>
            <p className="mt-2">
              We may update this policy as the site grows. The date below
              reflects the latest revision. Related disclosures:{" "}
              <Link
                href="/affiliate-disclosure"
                className="text-wag-sage underline-offset-2 hover:underline"
              >
                Affiliate & sponsorship disclosure
              </Link>
              .
            </p>
            <p className="mt-3 text-xs text-label-muted">Last updated: July 29, 2026</p>
          </div>
        </div>
      </Section>
    </>
  );
}
