import { MapPin, Heart } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Pet } from "@/lib/types";

export function PetCard({ pet }: { pet: Pet }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-sage-200">
      <div className="aspect-square overflow-hidden">
        <ImagePlaceholder src={pet.photoUrl} alt={pet.name} label={pet.name} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold">{pet.name}</h3>
          {pet.ageOrStage && (
            <span className="text-xs font-medium text-bark-faint">
              {pet.ageOrStage}
            </span>
          )}
        </div>
        <p className="text-sm text-bark-soft">{pet.breed}</p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-bark-soft">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {pet.neighborhood}
        </p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-soft">
          {pet.bio}
        </p>

        {pet.funFact && (
          <p className="mt-3 inline-flex items-start gap-1.5 rounded-xl bg-sage-50 px-3 py-2 text-xs text-sage-800">
            <Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-500" />
            {pet.funFact}
          </p>
        )}

        {pet.tags && pet.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pet.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-medium text-bark-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 text-xs text-bark-faint">
          Loved by {pet.ownerName}
        </p>
      </div>
    </article>
  );
}
