/**
 * Syncs images from source-photos/ to the site.
 *
 * 1. curated.json — hand-picked best photo per slot (if present)
 * 2. Labeled slot folders — fallback when no curated pick
 * 3. Every image → library (featured picks sorted first for blog/gallery)
 * 4. Named pet folders (Freddie/, etc.) → pet cards
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "source-photos");
const CURATED_PATH = path.join(SOURCE, "curated.json");
const PICTURES = path.join(ROOT, "public", "pictures");
const LIBRARY = path.join(PICTURES, "library");
const PETS = path.join(ROOT, "public", "pets");
const MANIFEST = path.join(ROOT, "src", "data", "photoLibrary.generated.ts");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
  ".avif",
]);

const slots = [
  {
    key: "hero",
    folder: "hero",
    outputs: [
      { dir: PICTURES, file: "hero-group-walk.webp", width: 1400, height: 900 },
      { dir: PICTURES, file: "og-share.webp", width: 1200, height: 630 },
      { dir: PICTURES, file: "blog-dog-friendly.webp", width: 800, height: 450 },
    ],
  },
  {
    key: "scooping",
    folder: "scooping",
    outputs: [
      { dir: PICTURES, file: "scooping-yard.webp", width: 800, height: 600 },
      { dir: PICTURES, file: "blog-yard-home.webp", width: 800, height: 450 },
    ],
  },
  {
    key: "boarding-backyard",
    folder: "boarding-backyard",
    outputs: [
      { dir: PICTURES, file: "boarding-backyard.webp", width: 1400, height: 900 },
      { dir: PICTURES, file: "blog-events.webp", width: 800, height: 450 },
    ],
  },
  {
    key: "community",
    folder: "boarding-backyard",
    outputs: [
      { dir: PICTURES, file: "community-walk.webp", width: 800, height: 500 },
    ],
  },
  {
    key: "boarding-home",
    folder: "boarding-home",
    outputs: [
      { dir: PICTURES, file: "boarding-home-dogs.webp", width: 800, height: 600 },
    ],
  },
  {
    key: "boarding-indoor",
    folder: "boarding-indoor",
    outputs: [
      { dir: PICTURES, file: "boarding-living-room.webp", width: 800, height: 600 },
    ],
  },
  {
    key: "training",
    folder: "training",
    outputs: [
      { dir: PICTURES, file: "training-enrichment.webp", width: 800, height: 600 },
      { dir: PICTURES, file: "blog-training.webp", width: 800, height: 450 },
    ],
  },
  {
    key: "founders",
    folder: "founders",
    outputs: [
      { dir: PICTURES, file: "founders-jackye-todd.webp", width: 900, height: 700 },
    ],
  },
  {
    key: "pets-scoop",
    folder: "pets-scoop",
    outputs: [{ dir: PETS, file: "scoop.webp", width: 800, height: 800 }],
  },
  {
    key: "pets-stella",
    folder: "pets-stella",
    outputs: [{ dir: PETS, file: "stella.webp", width: 800, height: 800 }],
  },
  {
    key: "pets-diesel",
    folder: "pets-diesel",
    outputs: [{ dir: PETS, file: "diesel.webp", width: 800, height: 800 }],
  },
  {
    key: "pets-shiloh",
    folder: "pets-shiloh",
    outputs: [{ dir: PETS, file: "shiloh.webp", width: 800, height: 800 }],
  },
];

const SLOT_FOLDERS = new Set(slots.map((s) => s.folder));

let curated = { slots: {}, petFolders: {}, featured: [] };
if (fs.existsSync(CURATED_PATH)) {
  curated = JSON.parse(fs.readFileSync(CURATED_PATH, "utf8"));
}

fs.mkdirSync(PICTURES, { recursive: true });
fs.mkdirSync(LIBRARY, { recursive: true });
fs.mkdirSync(PETS, { recursive: true });

function isImageFile(name) {
  return IMAGE_EXT.has(path.extname(name).toLowerCase());
}

function listImagesInFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((e) => e.isFile() && isImageFile(e.name))
    .map((e) => ({
      name: e.name,
      path: path.join(folderPath, e.name),
      mtime: fs.statSync(path.join(folderPath, e.name)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);
}

function resolveCurated(relPath) {
  const full = path.join(SOURCE, relPath);
  return fs.existsSync(full) ? full : null;
}

function resolveSlotInput(slot) {
  const pick = curated.slots?.[slot.key];
  if (pick) {
    const resolved = resolveCurated(pick);
    if (resolved) return { path: resolved, label: pick, curated: true };
    console.warn(`⚠ curated miss for ${slot.key}: ${pick}`);
  }

  const folderPath = path.join(SOURCE, slot.folder);
  const images = listImagesInFolder(folderPath);
  if (images[0]) {
    return {
      path: images[0].path,
      label: `${slot.folder}/${images[0].name}`,
      curated: false,
    };
  }

  return null;
}

function walkAllImages(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "curated.json") continue;

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAllImages(full, results);
    } else if (entry.isFile() && isImageFile(entry.name)) {
      const rel = path.relative(SOURCE, full);
      const parts = rel.split(path.sep);
      const folder = parts.length > 1 ? parts[0] : "";
      results.push({
        path: full,
        rel,
        folder,
        name: entry.name,
        mtime: fs.statSync(full).mtimeMs,
      });
    }
  }

  return results;
}

function toSlug(relPath) {
  const base = relPath
    .replace(/\.[^.]+$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return base.slice(0, 96) || "photo";
}

async function writeWebp(input, output, width, height) {
  await sharp(input)
    .rotate()
    .resize(width, height, { fit: "cover", position: "attention" })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 0.8 })
    .webp({ quality: 82 })
    .toFile(output);
}

function titleCase(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// --- Phase 1: primary slots (curated picks first) ---
let slotOutputs = 0;

console.log("── Primary site slots (curated picks) ──\n");

for (const slot of slots) {
  fs.mkdirSync(path.join(SOURCE, slot.folder), { recursive: true });

  const input = resolveSlotInput(slot);
  if (!input) {
    console.warn(`○ ${slot.key} — no image`);
    continue;
  }

  const tag = input.curated ? "★" : " ";
  for (const output of slot.outputs) {
    await writeWebp(input.path, path.join(output.dir, output.file), output.width, output.height);
    console.log(`${tag} ✓ ${path.relative(ROOT, path.join(output.dir, output.file))} ← ${input.label}`);
    slotOutputs++;
  }
}

// --- Phase 2: named pet folders ---
const petFolders = [];
let petOutputs = 0;

console.log("\n── Pet folders ──\n");

for (const entry of fs.readdirSync(SOURCE, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
  if (SLOT_FOLDERS.has(entry.name)) continue;
  if (entry.name.startsWith("pets-")) continue;

  const folderPath = path.join(SOURCE, entry.name);
  const images = listImagesInFolder(folderPath);
  if (images.length === 0) continue;

  const curatedPick = curated.petFolders?.[entry.name];
  const curatedPath = curatedPick ? resolveCurated(curatedPick) : null;
  const sourcePath = curatedPath ?? images[0].path;
  const sourceLabel = curatedPath ? `${curatedPick} ★` : `${entry.name}/${images[0].name}`;

  const slug = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  await writeWebp(sourcePath, path.join(PETS, `${slug}.webp`), 800, 800);
  petFolders.push({
    folder: entry.name,
    slug,
    photoUrl: `/pets/${slug}.webp`,
    count: images.length,
  });
  console.log(`✓ pets/${slug}.webp ← ${sourceLabel} (${images.length} in folder)`);
  petOutputs++;
}

// --- Phase 3: full library ---
console.log("\n── Photo library ──\n");

const allImages = walkAllImages(SOURCE);
const relToEntry = new Map();
const slugCounts = new Map();
let libraryOutputs = 0;

for (const image of allImages) {
  let slug = toSlug(image.rel);
  const count = slugCounts.get(slug) ?? 0;
  slugCounts.set(slug, count + 1);
  if (count > 0) slug = `${slug}-${count + 1}`;

  const outFile = `${slug}.webp`;
  await writeWebp(image.path, path.join(LIBRARY, outFile), 1200, 800);

  const folderLabel = image.folder ? titleCase(image.folder) : "Uploads";
  const entry = {
    src: `/pictures/library/${outFile}`,
    alt: image.folder
      ? `${folderLabel} — Waco dog life`
      : `Keep Waco Wagging — ${image.name.replace(/\.[^.]+$/, "")}`,
    folder: image.folder || "uploads",
    rel: image.rel,
    featured: false,
  };
  relToEntry.set(image.rel, entry);
  libraryOutputs++;
}

// Sort: featured picks first, then the rest
const featuredSet = new Set(curated.featured ?? []);
const featuredEntries = [];
const restEntries = [];

for (const rel of curated.featured ?? []) {
  const entry = relToEntry.get(rel);
  if (entry) {
    featuredEntries.push({ ...entry, featured: true });
    featuredSet.delete(rel);
  }
}

for (const image of allImages) {
  const entry = relToEntry.get(image.rel);
  if (!entry) continue;
  if (featuredEntries.some((f) => f.rel === entry.rel)) continue;
  restEntries.push(entry);
}

const libraryEntries = [...featuredEntries, ...restEntries].map(
  ({ rel: _rel, featured: _f, ...e }) => e,
);

if (fs.existsSync(LIBRARY)) {
  const keep = new Set(libraryEntries.map((e) => path.basename(e.src)));
  for (const file of fs.readdirSync(LIBRARY)) {
    if (file.endsWith(".webp") && !keep.has(file)) {
      fs.unlinkSync(path.join(LIBRARY, file));
    }
  }
}

const manifest = `/** AUTO-GENERATED by scripts/optimize-photos.mjs — do not edit */
export const photoLibraryStats = {
  total: ${libraryEntries.length},
  featured: ${featuredEntries.length},
  slotOutputs: ${slotOutputs},
  petFolders: ${petFolders.length},
  generatedAt: ${JSON.stringify(new Date().toISOString())},
} as const;

export type PhotoLibraryEntry = {
  src: string;
  alt: string;
  folder: string;
};

export const photoLibrary: PhotoLibraryEntry[] = ${JSON.stringify(libraryEntries, null, 2)};

export const petFolderPhotos = ${JSON.stringify(petFolders, null, 2)} as const;

export function getPhotoByIndex(index: number): PhotoLibraryEntry {
  return photoLibrary[index % photoLibrary.length]!;
}
`;

fs.writeFileSync(MANIFEST, manifest);

console.log(`✓ ${libraryOutputs} library images (${featuredEntries.length} featured first)`);
console.log(`✓ manifest → src/data/photoLibrary.generated.ts`);
console.log(
  `\nSummary: ${allImages.length} source images → ${slotOutputs} site outputs + ${petOutputs} pets + ${libraryOutputs} library`,
);
