import { chromium } from "playwright-core";

const url = process.argv[2];
const output = process.argv[3];
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 1000);
if (!url || !output) throw new Error("Usage: node scripts/capture-route.mjs <url> <output> [width] [height]");

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: output, fullPage: true });
console.log(JSON.stringify({
  output,
  viewportWidth: width,
  scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
  title: await page.title(),
}));
await page.close();
await Promise.race([browser.close(), new Promise((resolve) => setTimeout(resolve, 3000))]);
process.exit(0);
