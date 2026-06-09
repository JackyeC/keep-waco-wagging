import Link from "next/link";
import { monetization } from "@/lib/site";

/** Short inline disclosure for shop pages and product grids. */
export function AffiliateDisclosure({ className }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-bark-faint ${className ?? ""}`}>
      {monetization.affiliateDisclosure}{" "}
      <Link
        href="/affiliate-disclosure"
        className="font-medium text-sage-700 underline-offset-2 hover:underline"
      >
        Read full disclosure
      </Link>
    </p>
  );
}
