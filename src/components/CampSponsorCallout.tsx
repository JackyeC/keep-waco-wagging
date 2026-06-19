import Link from "next/link";
import { PresentingSponsor } from "@/components/PresentingSponsor";
import { brandLanguage, ctas } from "@/lib/site";
import { cn } from "@/lib/utils";

type CampSponsorCalloutProps = {
  className?: string;
  tone?: "cream" | "sand";
};

/** Sponsor-ready block for dog camp and booking pages. */
export function CampSponsorCallout({
  className,
  tone = "sand",
}: CampSponsorCalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-card p-6 ring-1 ring-inset ring-clay sm:p-8",
        tone === "sand" ? "bg-sand" : "bg-cream",
        className,
      )}
    >
      <p className="eyebrow eyebrow-brass">Summer camp</p>
      <h2 className="headline-secondary mt-3">{brandLanguage.dogCampName}</h2>
      <div className="mt-4">
        <PresentingSponsor size="sm" />
      </div>
      <p className="dek mt-5 text-sm">{brandLanguage.communityPartnersWelcome}</p>
      <p className="mt-4 text-sm text-bark-soft">
        {brandLanguage.sponsorCampInquiry}{" "}
        <Link
          href={ctas.becomeSponsor.href}
          className="font-medium text-bark underline decoration-clay underline-offset-2 hover:decoration-bark"
        >
          Contact us
        </Link>
        .
      </p>
    </aside>
  );
}
