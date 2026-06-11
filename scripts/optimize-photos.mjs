/**
 * Copy + polish site photos into public/pictures/.
 * Run: node scripts/optimize-photos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "pictures");
const DOWNLOADS = path.join(process.env.HOME ?? "", "Downloads");

const jobs = [
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
    src: "stella diesel walkies.webp",
    out: "community-walk.webp",
    width: 800,
    height: 500,
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const job of jobs) {
  const input = path.join(DOWNLOADS, job.src);
  const output = path.join(OUT, job.out);

  if (!fs.existsSync(input)) {
    console.warn(`skip (missing): ${job.src}`);
    continue;
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
  console.log(`✓ ${job.out} (${Math.round(stat.size / 1024)} KB)`);
}
