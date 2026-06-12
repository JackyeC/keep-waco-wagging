import type { Pet } from "@/lib/types";
import { cityConfig } from "@/lib/site";
import { getPhotoByIndex, petFolderPhotos } from "@/data/photoLibrary";

/**
 * Community pet showcase — "The Wagging Wall".
 *
 * TODO: Add real photos via `photoUrl` and replace placeholder community pets
 * with verified submissions from the /pets form.
 */
export const pets: Pet[] = [
  {
    id: "p-founder",
    name: "Scoop",
    breed: "Mixed breed",
    ageOrStage: "Adult",
    neighborhood: "Waco",
    ownerName: `${cityConfig.founders.names} (founders)`,
    bio: "The original Platinum Scoops mascot and Keep Waco Wagging inspiration. Scoop loves patio mornings, Cameron Park trails, and supervising yard cleanup.",
    funFact: "Has visited more dog-friendly Waco patios than most humans in town.",
    petOfTheWeek: true,
    tags: ["founder pup", "patio pro", "trail dog"],
    photoUrl: "/pets/scoop.webp",
  },
  {
    id: "p-002",
    name: "Pepper",
    breed: "Border Collie mix",
    ageOrStage: "5 yrs",
    neighborhood: "China Spring",
    ownerName: "Dana R.",
    bio: "Trail-loving herding pro who keeps the whole family in line on morning walks.",
    funFact: "Has hiked every shaded loop in Cameron Park.",
    tags: ["trail dog", "smart", "active"],
  },
  {
    id: "p-003",
    name: "Tater",
    breed: "Dachshund",
    ageOrStage: "Senior",
    neighborhood: "Hewitt",
    ownerName: "The Nguyen family",
    bio: "Short legs, big opinions. Tater supervises all backyard activities from his sunny spot.",
    funFact: "Refuses to walk on wet grass. A diva, but a lovable one.",
    tags: ["senior", "sunbather", "supervisor"],
  },
  {
    id: "p-004",
    name: "Maple",
    breed: "Labrador puppy",
    ageOrStage: "Puppy",
    neighborhood: "Robinson",
    ownerName: "Sam & Jo",
    bio: "Brand-new to the world and very excited about all of it — especially shoes.",
    funFact: "Currently acing her Puppy Field Trip Plan.",
    tags: ["puppy", "socializing", "chewer"],
  },
  {
    id: "p-005",
    name: "Duke",
    breed: "Boxer",
    ageOrStage: "4 yrs",
    neighborhood: "Bellmead",
    ownerName: "The Carters",
    bio: "All wiggles, no chill. Duke is the unofficial greeter at the Bellmead bark park.",
    funFact: "His full-body tail wag has knocked over at least two water bowls.",
    tags: ["bark park regular", "goofball", "social"],
  },
  {
    id: "p-006",
    name: "Olive",
    breed: "Rescue mix",
    ageOrStage: "2 yrs",
    neighborhood: "Downtown Waco",
    ownerName: "Riley P.",
    bio: "A shy sweetheart building confidence one calm coffee-shop visit at a time.",
    funFact: "Graduated from hiding under the table to sitting beside it. Big wins!",
    tags: ["rescue", "shy-but-growing", "coffee buddy"],
  },
];

export function getPetOfTheWeek(): Pet {
  return pets.find((p) => p.petOfTheWeek) ?? pets[0];
}

export function getWallPets(): Pet[] {
  const wall = pets.filter((p) => !p.petOfTheWeek);
  return wall.map((pet, index) => ({
    ...pet,
    photoUrl: pet.photoUrl ?? getPhotoByIndex(index + 2).src,
  }));
}

/** Dogs from named upload folders (e.g. source-photos/Freddie/). */
export function getUploadedPets(): Pet[] {
  return petFolderPhotos.map((folder) => ({
    id: `upload-${folder.slug}`,
    name: folder.folder,
    breed: "Waco dog",
    neighborhood: "Waco",
    ownerName: cityConfig.founders.names,
    bio: `${folder.count} photos from our pack — part of the Keep Waco Wagging story.`,
    photoUrl: folder.photoUrl,
    tags: ["pack", "local"],
  }));
}
