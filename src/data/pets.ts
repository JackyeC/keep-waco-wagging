import type { Pet } from "@/lib/types";
import { cityConfig } from "@/lib/site";

/**
 * Public dogs on the Wagging Wall.
 * Only dogs whose owners gave permission may be listed.
 * Shiloh is the owner's approved dog.
 *
 * TODO: solo photo of Shiloh at public/photos/real/shiloh.webp
 * Do not restore /pets/shiloh.webp. That file showed two dogs.
 */
export const SHILOH_PHOTO_TODO = "public/photos/real/shiloh.webp";

export const pets: Pet[] = [
  {
    id: "shiloh",
    name: "Shiloh",
    breed: "Mixed breed",
    ageOrStage: "Adult",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "Sweet, social, and always up for a cuddle on the wood floor after a long walk.",
    tags: ["cuddler", "social"],
  },
];

export function getPetOfTheWeek(): Pet | undefined {
  return pets.find((pet) => pet.petOfTheWeek);
}

export function getWallPets(): Pet[] {
  return pets.filter((pet) => !pet.petOfTheWeek);
}

/**
 * Upload folders are not published as named dogs.
 * A future approved dog needs an explicit entry in `pets` above.
 */
export function getUploadedPets(): Pet[] {
  return [];
}
