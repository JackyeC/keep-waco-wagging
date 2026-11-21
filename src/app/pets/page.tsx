import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PetCard } from "@/components/PetCard";
import { PetSubmitForm } from "@/components/PetSubmitForm";
import { AdSlot } from "@/components/AdSlot";
import { getPetOfTheWeek, getWallPets } from "@/data/pets";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/pets",
  "Waco Pets | The Wagging Wall",
  "The Wagging Wall shows Waco dogs whose people asked to be featured. Submissions are reviewed before they go live.",
);

export default function PetsPage() {
  const star = getPetOfTheWeek();
  const wall = getWallPets();

  return (
    <>
      <PageHeader
        eyebrow="The Wagging Wall"
        title="Meet the dogs of Waco"
        description="A community wall for local dogs whose people asked to be here. Submissions are reviewed before they go live."
        tone="sky"
      />

      {star ? (
        <Section tone="paper">
          <SectionHeading eyebrow="Pet of the Week" title={`Say hi to ${star.name}`} />
          <div className="mt-8">
            <PetCard pet={star} />
          </div>
        </Section>
      ) : null}

      {wall.length > 0 ? (
      <Section tone="sand">
        <SectionHeading
          eyebrow="The Wagging Wall"
          title="Dogs with permission to be here"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-6 sm:grid-cols-2">
            {wall.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <AdSlot placement="pets" />
          </div>
        </div>
      </Section>
      ) : null}

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
