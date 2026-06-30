#!/usr/bin/env node
/** Capture remaining viewport screenshots (tablet + desktop). */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "visual-qa");
const baseUrl = process.env.VISUAL_QA_URL ?? "http://localhost:3000";

const routes = [
  ["/", "home"],
  ["/platinum-scoops", "platinum-scoops"],
  ["/pet-care", "pet-care"],
  ["/training", "training"],
  ["/pet-care/weddings-events", "pet-care-weddings-events"],
  ["/summer-daycare", "summer-daycare"],
  ["/about", "about"],
  ["/shop", "shop"],
  ["/brand", "brand"],
];

const viewports = [
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  for (const [route, slug] of routes) {
    const file = path.join(outDir, `${slug}-${vp.name}.png`);
    await page.goto(`${baseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${file}`);
  }
}

await browser.close();
console.log("Done.");
