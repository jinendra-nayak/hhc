import { test, expect } from "@playwright/test";
import { routes, widths } from "../routes";

for (const path of routes) {
  test(`route ${path}: loads, one h1, title, no console errors, no broken images`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect((await page.title()).length).toBeGreaterThan(10);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    // trigger lazy images
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    });
    await page.waitForLoadState("networkidle");
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
    expect(broken, "broken images").toEqual([]);
    expect(errors, "console errors").toEqual([]);
  });
}

test("page titles are unique", async ({ page }) => {
  const titles = new Set<string>();
  for (const p of routes) { await page.goto(p); titles.add(await page.title()); }
  expect(titles.size).toBe(routes.length);
});

test("404 page for unknown route", async ({ page }) => {
  const res = await page.goto("/this-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /could not be found/i })).toBeVisible();
});

test("sitemap.xml and robots.txt", async ({ request }) => {
  const s = await request.get("/sitemap.xml");
  expect(s.status()).toBe(200);
  const body = await s.text();
  for (const p of routes) expect(body).toContain(p === "/" ? "<loc>https://www.humanhealthcircle.org</loc>" : `${p}</loc>`);
  const r = await request.get("/robots.txt");
  expect(await r.text()).toContain("Sitemap:");
});

for (const w of widths) {
  test(`no horizontal overflow at ${w}px (all routes)`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    for (const p of routes) {
      await page.goto(p);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, `${p} @${w}`).toBeLessThanOrEqual(0);
    }
  });
}
