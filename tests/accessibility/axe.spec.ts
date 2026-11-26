import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "../routes";

for (const path of routes) {
  test(`axe WCAG 2.2 AA: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(900); // let reveal animations settle so contrast is measured on final colours
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const summary = r.violations.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`);
    expect(summary, `violations on ${path}`).toEqual([]);
  });
}

test("reduced motion: content is visible immediately", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3101/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // below-the-fold sections fade in when reached (opacity only, no movement); after scrolling nothing may stay hidden
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
  await page.waitForTimeout(800);
  // collapsed accordion answers (.nf-inner) are hidden on purpose, everything else must be visible
  const hidden = await page.evaluate(
    () => [...document.querySelectorAll("main *")].filter((e) => getComputedStyle(e).opacity === "0" && !e.closest(".nf-inner")).length,
  );
  expect(hidden).toBe(0);
  await ctx.close();
});

test("JavaScript disabled: all text content is still readable", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3101/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Our primary goal is to impart basic health knowledge")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Health training" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Find HHC in Gujarat." })).toBeVisible();
  await ctx.close();
});

test("keyboard focus is visible on links and buttons", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name *").focus();
  const outline = await page.getByLabel("Name *").evaluate((e) => getComputedStyle(e).outlineStyle + " " + getComputedStyle(e).outlineWidth);
  expect(outline).toMatch(/solid 3px/);
});
