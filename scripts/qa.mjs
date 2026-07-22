import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

const baseUrl = process.env.QA_URL || "http://127.0.0.1:5173/workbuddy-skin-gallery/";

async function capture(viewport, output, route = "") {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: output, fullPage: true });
  return page;
}

const desktop = await capture({ width: 1440, height: 1000 }, "qa-desktop-full.png");
const cardSizes = await desktop.locator(".theme-card").evaluateAll((cards) => cards.map((card) => {
  const rect = card.getBoundingClientRect();
  return { width: Math.round(rect.width), height: Math.round(rect.height) };
}));
const uniformCards = new Set(cardSizes.map(({ width, height }) => `${width}x${height}`)).size === 1;
const vivianCard = desktop.locator(".theme-card", { hasText: "绝区零·维琳娜·闲影" });
const vivianDownload = await vivianCard.getByRole("link", { name: /下载 \.wbskin/ }).getAttribute("href");
const vivianImageSize = await vivianCard.locator("img").evaluate((image) => ({ width: image.naturalWidth, height: image.naturalHeight }));
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
console.log(JSON.stringify({ cardSizes, uniformCards, vivianDownload, vivianImageSize, animeCount, modalVisible, emptyVisible, lightActive: Boolean(lightActive) }));
await desktop.close();

const mobile = await capture({ width: 390, height: 844 }, "qa-mobile-full.png");
console.log(JSON.stringify({ mobileScrollWidth: await mobile.evaluate(() => document.documentElement.scrollWidth), mobileViewport: 390 }));
await mobile.close();

const learnDesktop = await capture({ width: 1440, height: 1000 }, "qa-learn-desktop.png", "#/learn");
await learnDesktop.getByRole("tab", { name: "OpenClaw" }).click();
const openClawCommand = await learnDesktop.locator(".install-console code").textContent();
console.log(JSON.stringify({ learnDesktopScrollWidth: await learnDesktop.evaluate(() => document.documentElement.scrollWidth), openClawCommand }));
await learnDesktop.close();

const learnMobile = await capture({ width: 390, height: 844 }, "qa-learn-mobile.png", "#/learn");
console.log(JSON.stringify({ learnMobileScrollWidth: await learnMobile.evaluate(() => document.documentElement.scrollWidth), learnMobileViewport: 390 }));
await learnMobile.close();
await Promise.race([
  browser.close(),
  new Promise((resolve) => setTimeout(resolve, 3000)),
]);
process.exit(0);
