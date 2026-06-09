import { ExternalLink, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { BusinessSpotlight } from "@/lib/types";

export function BusinessSpotlightCard({
  spotlight,
  compact = false,
}: {
  spotlight: BusinessSpotlight;
  compact?: boolean;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70 transition-all hover:shadow-md hover:ring-sage-200">
      <div className="grid sm:grid-cols-[40%_1fr]">
        <div className="aspect-[16/10] overflow-hidden sm:aspect-auto sm:h-full sm:min-h-[200px]">
          <ImagePlaceholder
            src={spotlight.imageUrl}
            alt={spotlight.businessName}
            label={spotlight.businessName}
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="sage">{spotlight.category}</Badge>
            {spotlight.featured && <Badge tone="gold">Featured</Badge>}
          </div>

          <h3 className="mt-3 text-xl font-semibold">{spotlight.businessName}</h3>
          <p className="text-sm text-bark-soft">{spotlight.ownerOrTeam}</p>

          <p className="mt-3 text-sm leading-relaxed text-bark-soft">
            {spotlight.whyKnowThem}
          </p>

          {!compact && (
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="font-semibold text-bark">What they offer</dt>
                <dd className="text-bark-soft">{spotlight.whatTheyOffer}</dd>
              </div>
              <div>
                <dt className="font-semibold text-bark">Dog-friendly details</dt>
                <dd className="text-bark-soft">{spotlight.dogFriendlyDetails}</dd>
              </div>
            </dl>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-bark-soft">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {spotlight.bestTimeToVisit}
            </span>
            {spotlight.link && (
              <a
                href={spotlight.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-sage-700 hover:text-sage-800"
              >
                Visit <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {spotlight.specialOffer && (
            <p className="mt-4 inline-flex items-start gap-1.5 rounded-xl bg-gold-100 px-3 py-2 text-xs font-medium text-gold-600">
              <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {spotlight.specialOffer}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
