/**
 * Reads images from labeled folders in source-photos/ and writes
 * optimized WebP files to public/pictures/ and public/pets/.
 *
 * Drop ANY image into the matching folder — no renaming required.
 * Runs automatically before dev and build (see package.json).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "source-photos");
const PICTURES = path.join(ROOT, "public", "pictures");
const PETS = path.join(ROOT, "public", "pets");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
  ".avif",
]);

/** Folder name → one or more optimized outputs. */
const slots = [
  {
    folder: "hero",
    label: "Homepage hero + social share",
    outputs: [
      { dir: PICTURES, file: "hero-group-walk.webp", width: 1400, height: 900 },
      { dir: PICTURES, file: "og-share.webp", width: 1200, height: 630 },
      { dir: PICTURES, file: "blog-dog-friendly.webp", width: 800, height: 450 },
    ],
  },
  {
    folder: "scooping",
    label: "Platinum Scoops / yard cleanup",
    outputs: [
      { dir: PICTURES, file: "scooping-yard.webp", width: 800, height: 600 },
      { dir: PICTURES, file: "blog-yard-home.webp", width: 800, height: 450 },
    ],
  },
  {
    folder: "boarding-backyard",
    label: "Daycare / backyard / community",
    outputs: [
      { dir: PICTURES, file: "boarding-backyard.webp", width: 1400, height: 900 },
      { dir: PICTURES, file: "community-walk.webp", width: 800, height: 500 },
      { dir: PICTURES, file: "blog-events.webp", width: 800, height: 450 },
    ],
  },
  {
    folder: "boarding-home",
    label: "Dogs at home together",
    outputs: [
      { dir: PICTURES, file: "boarding-home-dogs.webp", width: 800, height: 600 },
    ],
  },
  {
    folder: "boarding-indoor",
    label: "Calm indoor / living room",
    outputs: [
      { dir: PICTURES, file: "boarding-living-room.webp", width: 800, height: 600 },
    ],
  },
  {
    folder: "training",
    label: "Training / enrichment",
    outputs: [
      { dir: PICTURES, file: "training-enrichment.webp", width: 800, height: 600 },
      { dir: PICTURES, file: "blog-training.webp", width: 800, height: 450 },
    ],
  },
  {
    folder: "founders",
    label: "Jackye & Todd — About page",
    outputs: [
      { dir: PICTURES, file: "founders-jackye-todd.webp", width: 900, height: 700 },
    ],
  },
  {
    folder: "pets-scoop",
    label: "Scoop — Pet of the Week",
    outputs: [{ dir: PETS, file: "scoop.webp", width: 800, height: 800 }],
  },
  {
    folder: "pets-stella",
    label: "Stella — pack photo",
    outputs: [{ dir: PETS, file: "stella.webp", width: 800, height: 800 }],
  },
  {
    folder: "pets-diesel",
    label: "Diesel — pack photo",
    outputs: [{ dir: PETS, file: "diesel.webp", width: 800, height: 800 }],
  },
  {
    folder: "pets-shiloh",
    label: "Shiloh — pack photo",
    outputs: [{ dir: PETS, file: "shiloh.webp", width: 800, height: 800 }],
  },
];

fs.mkdirSync(PICTURES, { recursive: true });
fs.mkdirSync(PETS, { recursive: true });

function findImageInFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return null;

  const entries = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => ({
      name: e.name,
      path: path.join(folderPath, e.name),
      mtime: fs.statSync(path.join(folderPath, e.name)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  return entries[0]?.path ?? null;
}

async function writeOutput(input, output) {
  await sharp(input)
    .rotate()
    .resize(output.width, output.height, {
      fit: "cover",
      position: "attention",
    })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 0.8 })
    .webp({ quality: 82 })
    .toFile(path.join(output.dir, output.file));
}

let processed = 0;
let skipped = 0;

console.log(`Syncing source-photos/ → public/\n`);

for (const slot of slots) {
  const folderPath = path.join(SOURCE, slot.folder);
  fs.mkdirSync(folderPath, { recursive: true });

  const input = findImageInFolder(folderPath);
  if (!input) {
    console.warn(`○ ${slot.folder}/ — empty (${slot.label})`);
    skipped += slot.outputs.length;
    continue;
  }

  const sourceName = path.basename(input);
  for (const output of slot.outputs) {
    await writeOutput(input, output);
    const rel = path.relative(ROOT, path.join(output.dir, output.file));
    console.log(`✓ ${rel} ← ${slot.folder}/${sourceName}`);
    processed++;
  }
}

console.log(`\nDone: ${processed} optimized file(s). ${skipped ? `${skipped} slot(s) still empty.` : ""}`);
