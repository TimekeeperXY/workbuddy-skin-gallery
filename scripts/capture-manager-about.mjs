import { chromium } from "playwright-core";

const url = process.argv[2] || "http://localhost:5174/";
const output = process.argv[3] || "qa-manager-about.png";
const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 1 });
await page.addInitScript(() => {
  window.skinManager = {
    listThemes: async () => [],
    getStatus: async () => ({ activeThemeId: null, workBuddyInstalled: true }),
    onChanged: () => {},
  };
});
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.getByRole("button", { name: "关于" }).click();
await page.screenshot({ path: output, fullPage: true });
console.log(JSON.stringify({
  output,
  dialogVisible: await page.getByRole("dialog", { name: "关于 WorkBuddy Skin Manager" }).isVisible(),
  scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
}));
await page.close();
await Promise.race([browser.close(), new Promise((resolve) => setTimeout(resolve, 3000))]);
process.exit(0);
