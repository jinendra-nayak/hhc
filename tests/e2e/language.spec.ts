import { test, expect } from "@playwright/test";
import { routes } from "../routes";

const GUJARATI = /[઀-૿]/;

test.describe("English / Gujarati", () => {
  test("defaults to English: no Gujarati script is visible", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(GUJARATI);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
  });

  test("switching to Gujarati translates the page, the menu and the footer", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Gujarati" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "gu");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("આરોગ્યનું જ્ઞાન, લોકો જ્યાં રહે છે ત્યાં સુધી.", { useInnerText: true });
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "હોમ", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "પેકેજ", exact: true })).toBeVisible();
    for (const l of ["HHC વિશે", "અમારું કાર્ય", "સર્જનાત્મક", "સંસાધનો"]) await expect(nav.getByRole("button", { name: l, exact: true })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toContainText("સર્વાધિકાર સુરક્ષિત", { useInnerText: true });
    const visible = await page.locator("main").innerText();
    expect(visible).toMatch(GUJARATI);
  });

  test("the choice is remembered after reload and on other pages, and can be switched back", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Gujarati" }).click();
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "gu");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("સંપર્કમાં રહો.", { useInnerText: true });
    await page.goto("/health-awareness-videos");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("આરોગ્ય જાગૃતિ વીડિયો.", { useInnerText: true });
    await page.getByRole("button", { name: "English" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Health awareness videos.", { useInnerText: true });
  });

  test("HHC's own Gujarati video and guide titles are used", async ({ page }) => {
    await page.goto("/health-awareness-videos");
    await page.getByRole("button", { name: "Gujarati" }).click();
    await expect(page.getByRole("complementary", { name: "Playlist" })).toContainText("ગર્ભવતી મહિલા અને પાંડુરોગ", { useInnerText: true });
    await page.goto("/education-material");
    await expect(page.getByRole("main")).toContainText("સૌને ગમે સ્વચ્છતા", { useInnerText: true });
  });

  test("the form shows Gujarati validation errors", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Gujarati" }).click();
    await page.getByRole("button", { name: "સંદેશ મોકલો" }).click();
    await expect(page.getByText("કૃપા કરીને તમારું નામ દાખલ કરો.")).toBeVisible();
  });

  test("no page has an untranslated string (every <T> has a Gujarati entry)", async ({ page }) => {
    const missing: string[] = [];
    for (const r of [...routes, "/not-a-real-page"]) {
      await page.goto(r);
      const m = await page.$$eval("[data-l-missing]", (els) => els.map((e) => e.textContent ?? ""));
      m.forEach((t) => missing.push(`${r}: ${t.slice(0, 80)}`));
    }
    expect(missing).toEqual([]);
  });

  test("Gujarati mode does not cause horizontal overflow on phones", async ({ page }) => {
    for (const w of [320, 360, 390]) {
      await page.setViewportSize({ width: w, height: 800 });
      for (const r of routes) {
        await page.goto(r);
        await page.evaluate(() => { document.documentElement.dataset.lang = "gu"; document.documentElement.lang = "gu"; });
        const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(over, `${r} @${w} gu`).toBeLessThanOrEqual(0);
      }
    }
  });
});

test.describe("menu language + panels", () => {
  test("Innovations reads સર્જનાત્મક in the desktop panel and in the Explore menu", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: "Gujarati" }).click();
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("button", { name: "સર્જનાત્મક", exact: true }).hover();
    await expect(page.getByRole("link", { name: /સર્જનાત્મક નવીનતાઓની ઝલક/ })).toBeVisible();
    await expect(page.getByText("HHC સાથે વિકસાવેલા ઉત્પાદનો અને સાધનો")).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "મેનુ", exact: true }).click();
    await expect(page.locator("#mobile-menu").getByRole("heading", { name: "સર્જનાત્મક", exact: true })).toBeVisible();
  });

  test("every string in the desktop panels and the Explore menu is translated", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const missing: string[] = [];
    for (const g of ["About HHC", "Our Work", "Innovations", "Resources"]) {
      await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: g, exact: true }).hover();
      await page.waitForTimeout(400);
      missing.push(...(await page.$$eval("[data-l-missing]", (els) => els.map((e) => e.textContent ?? ""))));
    }
    await page.setViewportSize({ width: 768, height: 900 });
    await page.getByRole("button", { name: /^(Menu|મેનુ)$/ }).click();
    await page.waitForTimeout(500);
    missing.push(...(await page.$$eval("[data-l-missing]", (els) => els.map((e) => e.textContent ?? ""))));
    expect([...new Set(missing)]).toEqual([]);
  });

  test("the map picker and the packages are translated", async ({ page }) => {
    await page.goto("/centres");
    await page.getByRole("button", { name: "Gujarati" }).click();
    const map = page.locator("section[aria-labelledby=map-title]");
    await expect(map.getByRole("heading", { level: 2 })).toHaveText("નકશા પર અમને શોધો", { useInnerText: true });
    const missing: string[] = [];
    for (const b of await map.getByRole("group", { name: "Choose a place" }).getByRole("button").all()) {
      await b.click();
      missing.push(...(await page.$$eval("[data-l-missing]", (els) => els.map((e) => e.textContent ?? ""))));
    }
    expect([...new Set(missing)]).toEqual([]);
    await page.goto("/health-assurance-mission");
    await expect(page.getByRole("heading", { level: 2, name: "તમારું પેકેજ પસંદ કરો" })).toBeVisible();
  });

  test("header: Contact button, language switch and a perfectly round logo badge", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/about-us");
    const banner = page.getByRole("banner");
    await expect(banner.getByRole("link", { name: /Contact us/ })).toBeVisible();
    await expect(banner.getByRole("group", { name: "Language" })).toBeVisible();
    const badge = banner.locator("span.rounded-full").first();
    const box = (await badge.boundingBox())!;
    expect(Math.abs(box.width - box.height)).toBeLessThan(1);
    const img = (await banner.locator("img").first().boundingBox())!;
    expect(img.width).toBeLessThanOrEqual(box.width - 8);
  });
});
