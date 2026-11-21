import type { Metadata } from "next";
import { Star, MapPin, Heart } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PetCard } from "@/components/PetCard";
import { PetSubmitForm } from "@/components/PetSubmitForm";
import { AdSlot } from "@/components/AdSlot";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { SitePhoto } from "@/components/SitePhoto";
import { getPetOfTheWeek, getShilohPhotos, getUploadedPets, getWallPets } from "@/data/pets";
import { sitePhotos } from "@/data/sitePhotos";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/pets",
  "Waco Pets — The Wagging Wall",
  "Meet Shiloh, Keep Waco Wagging's Pet of the Week, plus Stella, Diesel, and Freddie. Submit your own dog for the Wagging Wall — we only feature community dogs with owner permission.",
);

export default function PetsPage() {
  const star = getPetOfTheWeek();
  const wall = getWallPets();
  const uploaded = getUploadedPets();
  const shilohPhotos = getShilohPhotos();

  return (
    <>
      <PageHeader
        eyebrow="The Wagging Wall"
        title="Meet the dogs of Waco"
        description="Meet Shiloh, Jackye and Todd's dog and this week's Pet of the Week, along with Stella, Diesel, and Freddie. Want your dog on the wall? Submit a photo — we only feature community dogs whose owners have given permission."
        tone="sky"
        image={sitePhotos.hero}
      />

      {/* Pet of the Week */}
      <Section tone="paper">
        <SectionHeading eyebrow="Pet of the Week" title={`Say hi to ${star.name}`} />
        <div className="mt-8 grid gap-8 overflow-hidden rounded-card bg-gradient-to-br from-sage-50 to-sky-50 p-6 ring-1 ring-inset ring-sage-200 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-card ring-1 ring-inset ring-clay/70">
            {star.photoUrl ? (
              <SitePhoto
                src={star.photoUrl}
                alt={star.name}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            ) : (
              <ImagePlaceholder
                src={star.photoUrl}
                alt={star.name}
                showCaption
              />
            )}
          </div>
          <div>
            <Badge tone="gold">
              <Star className="mr-1 h-3 w-3" /> Pet of the Week
            </Badge>
            <h3 className="mt-3 text-3xl">{star.name}</h3>
            <p className="mt-1 text-bark-soft">
              {star.breed}
              {star.ageOrStage ? ` · ${star.ageOrStage}` : ""}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-bark-soft">
              <MapPin className="h-4 w-4" />
              {star.neighborhood}
            </p>
            <p className="mt-4 leading-relaxed text-bark-soft">{star.bio}</p>
            {star.funFact && (
              <p className="mt-4 inline-flex items-start gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm text-sage-800 ring-1 ring-inset ring-sage-100">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
                {star.funFact}
              </p>
            )}
            <p className="mt-4 text-sm text-bark-faint">Loved by {star.ownerName}</p>
          </div>
        </div>
      </Section>

      {shilohPhotos.length > 1 && (
        <Section tone="paper">
          <SectionHeading
            eyebrow="At home"
            title="More photos of Shiloh"
            description="Jackye and Todd's dog, including the couch photo from home."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {shilohPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[3/4] overflow-hidden rounded-card ring-1 ring-inset ring-clay/70"
              >
                <SitePhoto src={photo.src} alt={photo.alt} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {uploaded.length > 0 && (
        <Section tone="sky">
          <SectionHeading
            eyebrow="From our camera roll"
            title="Dogs in the pack"
            description="Photos from your upload folders — drop more into source-photos/ and they sync automatically."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uploaded.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </Section>
      )}


      {/* The Wagging Wall + sponsor rail */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="The Wagging Wall"
          title="More good dogs of Waco"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-6 sm:grid-cols-2">
            {wall.length > 0 ? (
              wall.map((pet) => <PetCard key={pet.id} pet={pet} />)
            ) : (
              <p className="sm:col-span-2 rounded-card bg-cream/60 p-6 text-[15px] leading-relaxed text-bark-soft ring-1 ring-inset ring-clay/70">
                No community dogs are on the wall yet. We only feature a client
                or neighbor dog after the owner has given permission. Submit
                yours below and we will review it first.
              </p>
            )}
          </div>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <AdSlot placement="pets" />
          </div>
        </div>
      </Section>

      {/* Submit your pup */}
      <Section tone="paper" id="submit">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Join the wall"
            title="Submit your pup"
            description="Want your dog featured on the Wagging Wall? Tell us about them below. Submissions are reviewed before they go live."
          />
          <div className="mt-8">
            <PetSubmitForm />
          </div>
        </div>
      </Section>
    </>
  );
}
