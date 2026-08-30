import { expandAkc, type CompactDog } from "./encode";
import type { BreedProfile } from "./types";

const POODLE_MATCH_NOTE =
  "AKC ranks Poodle as one breed. Dog Match separates the varieties because size and day-to-day fit differ.";

/**
 * Shared Poodle-type tendencies. Varieties differ by size and exercise
 * reality, not by invented temperament splits.
 */
const shared: Pick<
  CompactDog,
  | "energy"
  | "mental"
  | "bark"
  | "shed"
  | "groom"
  | "pro"
  | "train"
  | "patience"
  | "independence"
  | "prey"
  | "dogs"
  | "cats"
  | "small"
  | "wall"
  | "novice"
  | "alone"
  | "kids"
  | "group"
  | "rank"
  | "listedAs"
  | "varietyOf"
  | "matchNote"
> = {
  rank: 6,
  group: "Non-Sporting",
  listedAs: "Poodle",
  varietyOf: "poodle",
  matchNote: POODLE_MATCH_NOTE,
  energy: 4,
  mental: 5,
  bark: 3,
  shed: 1,
  groom: 5,
  pro: 2,
  train: 5,
  patience: 3,
  independence: 2,
  prey: 3,
  dogs: 4,
  cats: 3,
  small: 3,
  wall: 3,
  novice: 3,
  alone: 3,
  kids: 4,
};

const rows: CompactDog[] = [
  {
    ...shared,
    slug: "toy-poodle",
    name: "Toy Poodle",
    size: [4, 6],
    ex: [20, 40],
    apt: 5,
    aliases: ["toy poodle"],
    notes: `${POODLE_MATCH_NOTE} Toy is typically a small companion body with the same coat-care bill as the larger varieties.`,
  },
  {
    ...shared,
    slug: "miniature-poodle",
    name: "Miniature Poodle",
    size: [10, 15],
    ex: [30, 60],
    apt: 4,
    aliases: ["mini poodle", "miniature poodle"],
    notes: `${POODLE_MATCH_NOTE} Miniature sits between Toy and Standard in size — still a grooming-and-brain dog, not a wash-and-wear one.`,
  },
  {
    ...shared,
    slug: "standard-poodle",
    name: "Standard Poodle",
    size: [40, 70],
    ex: [45, 90],
    apt: 3,
    aliases: ["standard poodle"],
    notes: `${POODLE_MATCH_NOTE} Standard is the larger-bodied variety, so everyday exercise and space needs scale up even when the coat and brains stay the same type.`,
  },
];

export const POODLE_VARIETY_SLUGS = [
  "toy-poodle",
  "miniature-poodle",
  "standard-poodle",
] as const;

export const POODLE_MATCH_NOTE_TEXT = POODLE_MATCH_NOTE;

export const poodleVarieties: BreedProfile[] = rows.map(expandAkc);
