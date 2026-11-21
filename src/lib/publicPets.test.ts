import assert from "node:assert/strict";
import test from "node:test";
import { founderPack } from "@/data/founderPack";
import { SHILOH_PHOTO_TODO, getUploadedPets, pets } from "@/data/pets";
import { petFolderPhotos } from "@/data/photoLibrary";

const removedNames = [
  "Scoop",
  "Stella",
  "Diesel",
  "Freddie",
  "Pepper",
  "Tater",
  "Maple",
  "Duke",
  "Olive",
];

test("public dog profiles keep only Shiloh", () => {
  const listed = [...pets, ...founderPack, ...getUploadedPets()];
  assert.deepEqual(
    listed.map((pet) => pet.name),
    ["Shiloh", "Shiloh"],
  );
  const blob = listed
    .map((pet) => [pet.name, pet.bio, pet.funFact, pet.photoUrl].join(" "))
    .join(" ");
  for (const name of removedNames) {
    assert.equal(blob.includes(name), false, name);
  }
  assert.equal(pets[0]?.photoUrl, undefined);
  assert.equal(SHILOH_PHOTO_TODO, "public/photos/real/shiloh.webp");
  assert.equal(petFolderPhotos.length, 0);
});
