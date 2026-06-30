import { Heart, PawPrint } from "lucide-react";
import { merchAnchorLine, merchPurposeLine } from "@/data/merchCuration";

export function MerchPurposePanel() {
  return (
    <div className="rounded-[26px] border border-border bg-soft-cream p-8 sm:p-10">
      <div className="flex items-center gap-3 text-wag-sage">
        <PawPrint className="h-5 w-5 shrink-0" aria-hidden="true" />
        <Heart className="h-5 w-5 shrink-0 text-rose" aria-hidden="true" />
        <span className="text-xs font-medium tracking-[0.18em] text-label-muted uppercase">
          Purpose-driven merch
        </span>
      </div>
      <h2 className="heading mt-4 text-[32px] sm:text-[36px]">
        Wear your love. Help Waco dogs.
      </h2>
      <p className="dek mt-4 max-w-2xl text-[15px]">{merchPurposeLine}</p>
      <p className="mt-6 border-t border-border pt-5 font-display text-xl text-serif-ink sm:text-2xl">
        {merchAnchorLine}
      </p>
    </div>
  );
}
