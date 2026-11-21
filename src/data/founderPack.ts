import type { Pet } from "@/lib/types";
import { cityConfig } from "@/lib/site";

/**
 * Family dogs. Scoop was fictional and was removed.
 * Stella, Diesel, and Shiloh are Jackye and Todd's dogs.
 */
export const founderPack: Pet[] = [
  {
    id: "fp-shiloh",
    name: "Shiloh",
    breed: "Mixed breed",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "Jackye and Todd's dog.",
    tags: ["family dog"],
    photoUrl: "/pets/shiloh-jackye.webp",
  },
  {
    id: "fp-stella",
    name: "Stella",
    breed: "Goldendoodle",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "Jackye and Todd's dog.",
    tags: ["family dog"],
    photoUrl: "/pets/stella.webp",
  },
  {
    id: "fp-diesel",
    name: "Diesel",
    breed: "Mixed breed",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "Jackye and Todd's dog.",
    tags: ["family dog"],
    photoUrl: "/pets/diesel.webp",
  },
];
