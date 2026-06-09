import Link from "next/link";
import { PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Logo({
  className,
  showSponsor = false,
}: {
  className?: string;
  showSponsor?: boolean;
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-600 text-white shadow-sm transition-transform group-hover:-rotate-6">
        <PawPrint className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-bark">
          {siteConfig.name}
        </span>
        {showSponsor && (
          <span className="mt-0.5 text-[11px] font-medium text-gold-600">
            {siteConfig.sponsorLine}
          </span>
        )}
      </span>
    </Link>
  );
}
