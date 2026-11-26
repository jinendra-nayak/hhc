import { test, expect, type Page } from "@playwright/test";

const desktopLabels = ["About HHC", "Our Work", "Innovations", "Resources"];

async function openExplore(page: Page) {
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const panel = page.locator("#mobile-menu");
  await expect(panel).toBeVisible();
  return panel;
}

test.describe("desktop menu (shadcn Navigation Menu)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("Home and Packages are links; the other sections open dropdown panels", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
    for (const s of desktopLabels) await expect(nav.getByRole("button", { name: s, exact: true })).toBeVisible();
    // Packages sits to the right of Resources
    const res = (await nav.getByRole("button", { name: "Resources", exact: true }).boundingBox())!;
    const pkg = (await nav.getByRole("link", { name: "Packages", exact: true }).boundingBox())!;
    expect(pkg.x).toBeGreaterThan(res.x + res.width - 1);
    await nav.getByRole("link", { name: "Packages", exact: true }).click();
    await expect(page).toHaveURL(/\/health-assurance-mission#packages$/);
    await expect(page.locator("#packages")).toBeInViewport();
    await expect(nav.getByRole("link", { name: "Packages", exact: true })).toHaveAttribute("aria-current", "page");
  });

  test("hovering a section opens its panel with icons and descriptions; clicking an item navigates", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Resources", exact: true }).hover();
    const link = page.getByRole("banner").getByRole("link", { name: /E-books/ });
    await expect(link).toBeVisible();
    await expect(page.getByText("Gujarati health guides (PDF)")).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/e-books$/);
  });

  test("Our Work panel includes Packages & pricing and goes to the pricing section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Our Work", exact: true }).hover();
    await expect(page.getByText("Free to ₹5,000 a year")).toBeVisible();
    await page.getByRole("banner").getByRole("link", { name: /Packages & pricing/ }).click();
    await expect(page).toHaveURL(/health-assurance-mission#packages$/);
    await expect(page.locator("#packages")).toBeInViewport();
  });

  test("keyboard: Enter opens a panel, Tab reaches its links, Escape closes", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "About HHC", exact: true });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /About Us/ }).first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("the current section is marked on sub-pages", async ({ page }) => {
    for (const [path, label] of [["/e-books", "Resources"], ["/centres", "About HHC"], ["/initiatives", "Our Work"], ["/bright-vision-detector", "Innovations"]]) {
      await page.goto(path);
      await expect(page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: label, exact: true })).toHaveAttribute("data-current", "true");
    }
  });

  test("Contact button, logo and skip link", async ({ page }) => {
    await page.goto("/about-us");
    const logo = page.getByRole("banner").getByRole("link", { name: /Human Health Circle\s*[-\u2014]\s*home/ });
    await expect(logo.locator("img")).toHaveAttribute("src", /hhc-logo\.png/);
    await page.getByRole("banner").getByRole("link", { name: /Contact us/ }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await page.getByRole("banner").getByRole("link", { name: /Human Health Circle\s*[-\u2014]\s*home/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("skip link is the first focusable element on a fresh page", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  });

  test("hero CTAs go to the right pages", async ({ page }) => {
    for (const [name, url] of [["Learn about us", /\/about-us$/], ["Our initiatives", /\/initiatives$/]] as const) {
      await page.goto("/");
      await page.getByRole("main").getByRole("link", { name }).first().click();
      await expect(page).toHaveURL(url);
    }
  });

  test("navigating does not glide-scroll: the next page starts at the top immediately", async ({ page }) => {
    await page.goto("/about-us");
    await page.evaluate(() => window.scrollTo(0, 1500));
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 700 }).toBeLessThan(5);
  });

  test("browser back and forward keep the menu in sync", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Resources", exact: true }).hover();
    await page.getByRole("banner").getByRole("link", { name: /E-books/ }).click();
    await expect(page).toHaveURL(/\/e-books$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
    await page.goForward();
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Resources", exact: true })).toHaveAttribute("data-current", "true");
  });
});

for (const [name, w, h] of [["iPhone SE", 375, 667], ["Samsung Galaxy S", 412, 915], ["iPhone Pro Max", 430, 932], ["iPad", 768, 1024]] as const) {
  test.describe(`phone / tablet — ${name} (${w}px)`, () => {
    test.use({ viewport: { width: w, height: h } });

    test("liquid tab bar is docked, fully on screen, every tab has a visible label, and it navigates", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      const tabs = page.getByRole("navigation", { name: "Main" });
      await expect(tabs).toBeVisible();
      const box = (await tabs.boundingBox())!;
      expect(box.y + box.height).toBeLessThanOrEqual(h);
      expect(box.y).toBeGreaterThan(h / 2);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(w);
      for (const s of ["Home", "Our Work", "Packages", "Resources"]) await expect(tabs.getByRole("link", { name: s, exact: true })).toBeVisible();
      await expect(tabs.getByRole("button", { name: "Menu", exact: true })).toBeVisible();
      // every tab shows its label (icon + text) from 360px up, so all five are recognisable
      const labelled = await tabs.locator("a, button").evaluateAll((els) => els.map((e) => { const sp = [...e.querySelectorAll("span")].find((x) => !x.closest(".sr-only") && getComputedStyle(x).display !== "none" && x.textContent?.trim()); const r = sp?.getBoundingClientRect(); return !!r && r.width > 20 && r.right <= e.getBoundingClientRect().right + 0.5 && r.left >= e.getBoundingClientRect().left - 0.5; }));
      expect(labelled, "visible, un-clipped labels").toEqual([true, true, true, true, true]);
      // equal-width tabs: nothing resizes
      const widths = await tabs.locator("li").evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().width)));
      expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
      await expect(tabs.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
      await tabs.getByRole("link", { name: "Resources", exact: true }).click();
      await expect(page).toHaveURL(/\/resources$/);
      await expect(tabs.getByRole("link", { name: "Resources", exact: true })).toHaveAttribute("aria-current", "page");
      await tabs.getByRole("link", { name: "Packages", exact: true }).click();
      await expect(page).toHaveURL(/health-assurance-mission#packages$/);
      await expect(page.locator("#packages")).toBeInViewport();
    });

    test("Explore opens the full menu: every section, grouped; selecting one navigates and closes it", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      const panel = await openExplore(page);
      for (const g of ["Discover", "Our Work", "Innovations", "Resources"]) await expect(panel.getByRole("heading", { name: g, exact: true })).toBeVisible();
      await expect(panel.getByRole("link", { name: /Packages/ }).first()).toBeVisible(); // the featured action
      for (const l of ["Home", "About Us", "Our Centres", "Media", "Community Initiatives", "Health Assurance Mission", "Courses", "Innovations overview", "Bright Vision Detector", "Nutrition Calculator", "Resources overview", "Education Material", "E-books", "Health Awareness Videos", "Products", "Blog"]) {
        await expect(panel.getByRole("link", { name: new RegExp(l) }).first(), l).toBeAttached();
      }
      await panel.getByRole("link", { name: /Bright Vision Detector/ }).click();
      await expect(page).toHaveURL(/\/bright-vision-detector$/);
      await expect(page.locator("#mobile-menu")).toHaveCount(0);
      await expect(page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-haspopup", "dialog");
    });
  });
}

test.describe("Explore panel details", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("Escape closes it, scrolling is locked while open and focus returns to the Menu tab", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const btn = page.getByRole("button", { name: "Menu", exact: true });
    await btn.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(btn).toBeFocused();
  });

  test("the current page is highlighted, and contact, language, phone and email are inside", async ({ page }) => {
    await page.goto("/centres");
    await page.waitForLoadState("networkidle");
    const panel = await openExplore(page);
    await expect(panel.getByRole("link", { name: /Our Centres/ })).toHaveAttribute("aria-current", "page");
    await expect(panel.getByRole("link", { name: /Contact us/ })).toBeVisible();
    await expect(panel.getByRole("group", { name: "Language" })).toBeVisible();
    await expect(panel.locator('a[href^="tel:"]')).toBeVisible();
    await expect(panel.locator('a[href^="mailto:"]')).toBeVisible();
  });

  test("Menu is the current tab on pages that live in the menu (e.g. About)", async ({ page }) => {
    await page.goto("/about-us");
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Menu", exact: true })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Home", exact: true })).not.toHaveAttribute("aria-current", "page");
  });

  test("keyboard: arrow keys move between tabs", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const tabs = page.getByRole("navigation", { name: "Main" });
    await tabs.getByRole("link", { name: "Home", exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("link", { name: "Our Work", exact: true })).toBeFocused();
    await page.keyboard.press("End");
    await expect(tabs.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
  });

  test("tapping a tab highlights it instantly, even when the page is slow", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.route(/resources/, async (route) => { await new Promise((r) => setTimeout(r, 1500)); await route.continue(); });
    const tabs = page.getByRole("navigation", { name: "Main" });
    await tabs.getByRole("link", { name: "Resources", exact: true }).click();
    await expect(tabs.getByRole("link", { name: "Resources", exact: true })).toHaveAttribute("aria-current", "page", { timeout: 400 });
    await expect(page).toHaveURL(/\/resources$/, { timeout: 8000 });
  });

  test("a progress line shows while a slow page loads, then disappears", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.route(/products/, async (route) => { await new Promise((r) => setTimeout(r, 1500)); await route.continue(); });
    await page.getByRole("button", { name: "Menu", exact: true }).click(); // links inside the menu are not prefetched
    await page.locator('#mobile-menu a[href="/products"]').click();
    await expect(page.locator(".nav-progress-run")).toBeVisible({ timeout: 1000 });
    await expect(page).toHaveURL(/\/products$/, { timeout: 8000 });
    await expect(page.locator(".nav-progress-run")).toHaveCount(0);
  });

  test("the lens sits under the active tab", async ({ page }) => {
    await page.goto("/resources");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(900); // spring settles
    const tab = (await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Resources", exact: true }).boundingBox())!;
    const lens = (await page.getByRole("navigation", { name: "Main" }).locator("ul > span").boundingBox())!;
    expect(Math.abs(lens.x + lens.width / 2 - (tab.x + tab.width / 2))).toBeLessThan(6);
  });
});

test("every internal link on every page resolves (no 404)", async ({ page, request }) => {
  const { routes } = await import("../routes");
  const seen = new Set<string>();
  const bad: string[] = [];
  for (const r of routes) {
    await page.goto(r);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    for (const h of hrefs) {
      if (!h.startsWith("/") || h.startsWith("//")) continue;
      const clean = h.split("#")[0];
      if (!clean || seen.has(clean)) continue;
      seen.add(clean);
      const res = await request.get(clean);
      if (res.status() >= 400) bad.push(`${clean} → ${res.status()} (on ${r})`);
    }
  }
  console.log(`checked ${seen.size} distinct internal links`);
  expect(bad).toEqual([]);
});
