#!/usr/bin/env node
/**
 * Capture visual QA screenshots for approved routes at 390px, 768px, and 1440px.
 * Usage: node scripts/visual-qa.mjs (starts dev server if needed)
 */
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "docs/visual-qa");
const baseUrl = process.env.VISUAL_QA_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/platinum-scoops",
  "/pet-care",
  "/training",
  "/pet-care/weddings-events",
  "/summer-daycare",
  "/about",
  "/shop",
  "/brand",
];

const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server not ready at ${url}`);
}

function startDevServer() {
  return spawn("npm", ["run", "dev"], {
    cwd: root,
    stdio: "ignore",
    detached: true,
  });
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  let devProc;
  try {
    await fetch(baseUrl);
  } catch {
    devProc = startDevServer();
    await waitForServer(baseUrl);
  }

  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const route of routes) {
      const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
      const file = path.join(outDir, `${slug}-${vp.name}.png`);
      await page.goto(`${baseUrl}${route}`, { waitUntil: "load", timeout: 90000 });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`✓ ${file}`);
    }
  }

  await browser.close();
  if (devProc) process.kill(-devProc.pid);

  const manifest = {
    capturedAt: new Date().toISOString(),
    baseUrl,
    outDir: "docs/visual-qa/",
    routes,
    viewports: viewports.map((v) => v.name),
  };
  await fs.writeFile(
    path.join(outDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log("Done. See docs/visual-qa/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
