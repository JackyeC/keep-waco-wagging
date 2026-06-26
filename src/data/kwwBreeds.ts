/**
 * KWW breed editions — shared across hoodies, totes, tees, and pet accessories.
 * Slugs match existing Shopify hoodie handles (`keep-waco-wagging-{slug}-hoodie`).
 */

export type KwwBreed = {
  id: string;
  /** Title case breed name for product titles. */
  label: string;
  /** Shopify tag value, e.g. "Breed: Golden Retriever". */
  breedTag: string;
};

export const kwwBreeds: readonly KwwBreed[] = [
  { id: "golden-retriever", label: "Golden Retriever", breedTag: "Breed: Golden Retriever" },
  { id: "frenchie", label: "Frenchie", breedTag: "Breed: Frenchie" },
  { id: "rescue-mutt", label: "Rescue Mutt", breedTag: "Breed: Rescue Mutt" },
  { id: "labrador", label: "Labrador", breedTag: "Breed: Labrador" },
  { id: "corgi", label: "Corgi", breedTag: "Breed: Corgi" },
  { id: "doodle", label: "Doodle", breedTag: "Breed: Doodle" },
  { id: "pittie", label: "Pittie", breedTag: "Breed: Pittie" },
  { id: "schnauzer", label: "Schnauzer", breedTag: "Breed: Schnauzer" },
  { id: "siberian-husky", label: "Siberian Husky", breedTag: "Breed: Siberian Husky" },
  { id: "yorkie", label: "Yorkie", breedTag: "Breed: Yorkie" },
  { id: "chihuahua", label: "Chihuahua", breedTag: "Breed: Chihuahua" },
  { id: "dachshund", label: "Dachshund", breedTag: "Breed: Dachshund" },
  { id: "german-shepherd", label: "German Shepherd", breedTag: "Breed: German Shepherd" },
  {
    id: "australian-shepherd",
    label: "Australian Shepherd",
    breedTag: "Breed: Australian Shepherd",
  },
  { id: "catahoula", label: "Catahoula", breedTag: "Breed: Catahoula" },
  { id: "maltipoo", label: "Maltipoo", breedTag: "Breed: Maltipoo" },
];

export const kwwBreedLabels = kwwBreeds.map((b) => b.label).join(", ");
