import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

async function capture(viewport, output) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.screenshot({ path: output, fullPage: true });
  return page;
}

const desktop = await capture({ width: 1440, height: 1000 }, "qa-desktop-full.png");
await desktop.getByRole("button", { name: "动漫", exact: true }).click();
await desktop.waitForTimeout(500);
const animeCount = await desktop.locator(".theme-card").count();
await desktop.getByRole("button", { name: "全部", exact: true }).click();
await desktop.getByRole("button", { name: /预览 林俊杰/ }).click();
const modalVisible = await desktop.locator(".preview-modal").isVisible();
await desktop.getByRole("button", { name: "关闭预览" }).click();
await desktop.getByLabel("搜索皮肤").fill("不存在的皮肤");
const emptyVisible = await desktop.locator(".empty-state").isVisible();
await desktop.getByLabel("切换浅色模式").click();
const lightActive = await desktop.locator(".site.light").count();
console.log(JSON.stringify({ animeCount, modalVisible, emptyVisible, lightActive: Boolean(lightActive) }));
await desktop.close();

const mobile = await capture({ width: 390, height: 844 }, "qa-mobile-full.png");
console.log(JSON.stringify({ mobileScrollWidth: await mobile.evaluate(() => document.documentElement.scrollWidth), mobileViewport: 390 }));
await mobile.close();
await browser.close();
