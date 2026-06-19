import Image from "next/image";
import Link from "next/link";
import { communityPartners } from "@/data/communityPartners";
import { cn } from "@/lib/utils";
import { ctas } from "@/lib/site";

type CommunityPartnersProps = {
  className?: string;
  /** Show a compact single-column layout */
  compact?: boolean;
  /** Show link to sponsor inquiry */
  showInquiryLink?: boolean;
};

/**
 * Community Partners sponsor grid — designed to grow as new sponsors join.
 */
export function CommunityPartners({
  className,
  compact = false,
  showInquiryLink = true,
}: CommunityPartnersProps) {
  return (
    <section className={className}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="heading text-2xl">Community Partners</h2>
          <p className="dek mt-2 max-w-xl text-base">
            Local businesses and organizations supporting Waco dog parents
            through Keep Waco Wagging.
          </p>
        </div>
        {showInquiryLink && (
          <Link
            href={ctas.becomeSponsor.href}
            className="smallcaps shrink-0 text-gold-500 hover:text-gold-600"
          >
            Become a partner →
          </Link>
        )}
      </div>

      <ul
        className={cn(
          "mt-10 grid gap-5",
          compact ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {communityPartners.map((partner) => (
          <li key={partner.id}>
            <PartnerCard partner={partner} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function PartnerCard({
  partner,
}: {
  partner: (typeof communityPartners)[number];
}) {
  const inner = (
    <>
      <p className="smallcaps text-gold-500">{partner.sponsorTier}</p>
      <div className="mt-3">
        {partner.sponsorLogo ? (
          <Image
            src={partner.sponsorLogo}
            alt={partner.sponsorName}
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
        ) : (
          <p className="font-display text-lg text-bark">{partner.sponsorName}</p>
        )}
      </div>
      <p className="dek mt-3 text-sm">{partner.sponsorDescription}</p>
    </>
  );

  const cardClass =
    "block h-full rounded-card bg-cream p-5 ring-1 ring-inset ring-clay transition-colors hover:ring-gold-300";

  if (partner.sponsorUrl) {
    return (
      <a
        href={partner.sponsorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {inner}
      </a>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}
