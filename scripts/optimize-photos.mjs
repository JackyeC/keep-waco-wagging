/**
 * Copy + polish site photos into public/pictures/ and public/pets/.
 *
 * Drop originals in source-photos/ (preferred) or ~/Downloads.
 * Run: npm run optimize:photos
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PICTURES = path.join(ROOT, "public", "pictures");
const PETS = path.join(ROOT, "public", "pets");
const SOURCE = path.join(ROOT, "source-photos");
const DOWNLOADS = path.join(process.env.HOME ?? "", "Downloads");

const pictureJobs = [
  {
    src: "stella diesel walkies.webp",
    out: "hero-group-walk.webp",
    width: 1400,
    height: 900,
  },
  {
    src: "Diesel.webp",
    out: "scooping-yard.webp",
    width: 800,
    height: 600,
  },
  {
    src: "IMG_5285.JPG",
    out: "boarding-backyard.webp",
    width: 1400,
    height: 900,
  },
  {
    src: "shi and diesel.webp",
    out: "boarding-home-dogs.webp",
    width: 800,
    height: 600,
  },
  {
    src: "Diesel1.webp",
    out: "boarding-living-room.webp",
    width: 800,
    height: 600,
  },
  {
    src: "stella puzzlw.webp",
    out: "training-enrichment.webp",
    width: 800,
    height: 600,
  },
  {
    src: "IMG_5285.JPG",
    out: "community-walk.webp",
    width: 800,
    height: 500,
  },
  {
    src: "jackye and todd.jpg",
    out: "founders-jackye-todd.webp",
    width: 900,
    height: 700,
  },
  {
    src: "stella diesel walkies.webp",
    out: "og-share.webp",
    width: 1200,
    height: 630,
  },
  {
    src: "Diesel.webp",
    out: "blog-yard-home.webp",
    width: 800,
    height: 450,
  },
  {
    src: "stella diesel walkies.webp",
    out: "blog-dog-friendly.webp",
    width: 800,
    height: 450,
  },
  {
    src: "stella puzzlw.webp",
    out: "blog-training.webp",
    width: 800,
    height: 450,
  },
  {
    src: "IMG_5285.JPG",
    out: "blog-events.webp",
    width: 800,
    height: 450,
  },
];

const petJobs = [
  { src: "Diesel.webp", out: "scoop.webp", width: 800, height: 800 },
  { src: "stella puzzlw.webp", out: "stella.webp", width: 800, height: 800 },
  { src: "shi and diesel.webp", out: "shiloh.webp", width: 800, height: 800 },
  { src: "Diesel1.webp", out: "diesel.webp", width: 800, height: 800 },
];

fs.mkdirSync(PICTURES, { recursive: true });
fs.mkdirSync(PETS, { recursive: true });
fs.mkdirSync(SOURCE, { recursive: true });

function resolveInput(filename) {
  const inProject = path.join(SOURCE, filename);
  if (fs.existsSync(inProject)) return inProject;
  const inDownloads = path.join(DOWNLOADS, filename);
  if (fs.existsSync(inDownloads)) return inDownloads;
  return null;
}

async function processJob(job, outDir) {
  const input = resolveInput(job.src);
  const output = path.join(outDir, job.out);

  if (!input) {
    console.warn(`skip (missing): ${job.src} — add to source-photos/`);
    return false;
  }

  await sharp(input)
    .rotate()
    .resize(job.width, job.height, {
      fit: "cover",
      position: "attention",
    })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 0.8 })
    .webp({ quality: 82 })
    .toFile(output);

  const stat = fs.statSync(output);
  const from = path.relative(ROOT, input);
  console.log(`✓ ${path.relative(ROOT, output)} (${Math.round(stat.size / 1024)} KB) ← ${from}`);
  return true;
}

console.log(`Reading originals from ${path.relative(ROOT, SOURCE)}/ (fallback: Downloads)\n`);

for (const job of pictureJobs) {
  await processJob(job, PICTURES);
}

for (const job of petJobs) {
  await processJob(job, PETS);
}
