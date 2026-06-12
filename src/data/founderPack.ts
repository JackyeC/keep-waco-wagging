import type { Pet } from "@/lib/types";
import { cityConfig } from "@/lib/site";

/** The Clayton family's resident dogs — shown on /about. */
export const founderPack: Pet[] = [
  {
    id: "fp-scoop",
    name: "Scoop",
    breed: "Mixed breed",
    ageOrStage: "Adult",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "The original Platinum Scoops mascot and Keep Waco Wagging inspiration. Scoop loves patio mornings, Cameron Park trails, and supervising yard cleanup.",
    funFact: "Has visited more dog-friendly Waco patios than most humans in town.",
    tags: ["founder pup", "patio pro", "trail dog"],
    photoUrl: "/pets/scoop.webp",
  },
  {
    id: "fp-stella",
    name: "Stella",
    breed: "Mixed breed",
    ageOrStage: "Adult",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "High-energy and always ready for a group walk. Stella keeps the pack moving and loves puzzle toys on hot afternoons.",
    funFact: "Will work a snuffle mat until every treat is found — twice.",
    tags: ["trail dog", "enrichment lover", "walk leader"],
    photoUrl: "/pets/stella.webp",
  },
  {
    id: "fp-diesel",
    name: "Diesel",
    breed: "Brindle mix",
    ageOrStage: "Adult",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "Calm at home, happy in the yard. Diesel is the mellow anchor of the pack and a favorite with boarding guests.",
    funFact: "Claims the best window spot in the house before anyone else wakes up.",
    tags: ["chill", "yard dog", "boarding buddy"],
    photoUrl: "/pets/diesel.webp",
  },
  {
    id: "fp-shiloh",
    name: "Shiloh",
    breed: "Mixed breed",
    ageOrStage: "Adult",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: "Sweet, social, and always up for a cuddle on the wood floor after a long walk.",
    funFact: "Best friends with Diesel — they nap side by side every afternoon.",
    tags: ["cuddler", "social", "pack dog"],
    photoUrl: "/pets/shiloh.webp",
  },
];
