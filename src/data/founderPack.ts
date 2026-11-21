import type { Pet } from "@/lib/types";
import { cityConfig } from "@/lib/site";

/**
 * Family dogs for internal / about use. Scoop was fictional and was removed.
 * Stella and Diesel appear in source-photo folders but are not shown on
 * public pages until Jackye confirms they should be named there.
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
];
