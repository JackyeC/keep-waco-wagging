import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GearGuideServiceCta } from "@/lib/types";

export function GearGuideServiceCta({ cta }: { cta: GearGuideServiceCta }) {
  return (
    <aside className="mt-10 border border-sage-200 bg-sage-50/80 p-6 sm:p-8">
      <p className="eyebrow text-sage-700">Platinum Scoops</p>
      <h3 className="headline-tertiary mt-2 text-bark">{cta.headline}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-bark-soft">{cta.copy}</p>
      <Link
        href={cta.href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
      >
        {cta.buttonLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}
