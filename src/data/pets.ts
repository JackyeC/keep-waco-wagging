import type { Pet } from "@/lib/types";
import { cityConfig } from "@/lib/site";

/**
 * Community pet showcase — "The Wagging Wall".
 *
 * Only verified dogs belong here. Fictional placeholders were removed on
 * Nov 21, 2026. Client dogs stay off the public wall until a written owner
 * permission record is on file. Shiloh is Jackye and Todd's dog.
 */
export const pets: Pet[] = [
  {
    id: "p-shiloh",
    name: "Shiloh",
    breed: "Mixed breed",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "Jackye and Todd's dog.",
    petOfTheWeek: true,
    tags: ["family dog"],
    photoUrl: "/pets/shiloh-jackye.webp",
  },
];

export function getPetOfTheWeek(): Pet {
  return pets.find((p) => p.petOfTheWeek) ?? pets[0];
}

/** Extra photos of the featured family dog, not invented community pets. */
export function getShilohPhotos(): { src: string; alt: string }[] {
  return [
    {
      src: "/pets/shiloh-jackye.webp",
      alt: "Jackye with Shiloh, her and Todd's dog",
    },
    {
      src: "/pets/shiloh-couch.webp",
      alt: "Jackye at home on the couch with Shiloh",
    },
  ];
}

export function getWallPets(): Pet[] {
  return [];
}

/**
 * Client-folder uploads stay off the public wall until Jackye confirms
 * written owner permission. Freddie and other named folders are not listed here.
 */
export function getUploadedPets(): Pet[] {
  return [];
}
