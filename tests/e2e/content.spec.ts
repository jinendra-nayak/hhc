import { test, expect } from "@playwright/test";
import { pdfs } from "../routes";

test("every PDF is served as application/pdf with real content", async ({ request }) => {
  for (const p of pdfs) {
    const r = await request.get(p);
    expect(r.status(), p).toBe(200);
    expect(r.headers()["content-type"], p).toContain("pdf");
    const body = await r.body();
    expect(body.subarray(0, 4).toString(), p).toBe("%PDF");
  }
});

test("E-book and education download links trigger a download", async ({ page }) => {
  for (const [route, file] of [["/e-books", "first-aid.pdf"], ["/e-books", "dodi-jivanti.pdf"], ["/education-material", "swasth-jivanshailee.pdf"], ["/products", "all-products.pdf"]]) {
    await page.goto(route);
    const [dl] = await Promise.all([page.waitForEvent("download"), page.locator(`a[href="/documents/${file}"]`).first().click()]);
    expect(dl.suggestedFilename()).toBe(file);
  }
});

test("Bright Vision Detector keeps its research and media links", async ({ page }) => {
  await page.goto("/bright-vision-detector");
  for (const t of ["Research paper", "News cuttings", "Online media coverage", /Importance of vitamin/]) {
    const a = page.getByRole("link", { name: t });
    await expect(a).toHaveAttribute("href", /drive\.google\.com\/file\/d\//);
    await expect(a).toHaveAttribute("target", "_blank");
    await expect(a).toHaveAttribute("rel", /noopener/);
  }
  await expect(page.getByText("Prakhar Innovations LLP").first()).toBeVisible();
});

test("Health Assurance Mission keeps its four packages, real prices and payment link", async ({ page }) => {
  await page.goto("/health-assurance-mission");
  for (const t of ["Normal", "Silver", "Gold", "Platinum"]) await expect(page.getByRole("heading", { name: t, exact: true })).toBeVisible();
  const section = page.locator("section[aria-labelledby=pkg-title]");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200); // price count-up finishes
  const text = (await section.innerText()).replace(/\s+/g, " ");
  for (const price of ["₹100", "₹1,000", "₹5,000"]) expect(text, price).toContain(price); // real prices, readable by assistive tech
  expect(text).toContain("Free");
  expect(text).toContain("Most complete");
  expect(text).not.toMatch(/Popular|Monthly|[₹]\s?[\d,]+\s*(\/|per)\s*month/i); // no invented monthly prices or "popular" claims
  const pay = page.getByRole("link", { name: /Book now\s*[-\u2014]\s*Gold/ });
  await expect(pay).toHaveAttribute("href", "https://hhcnutrition.com/pay/hhcpay");
});

test("unverified claims are NOT present anywhere", async ({ page }) => {
  const banned = [/31 years/i, /700\+?\s*experts/i, /\b(is|as|an|registered) (an? )?NGO\b/i, /registered (charity|trust)/i, /Health & Wealth 2023/i, /birth date/i];
  for (const p of ["/", "/about-us", "/centres", "/initiatives", "/nutrition-calculator", "/bright-vision-detector"]) {
    await page.goto(p);
    const text = await page.locator("body").innerText();
    for (const b of banned) expect(text, `${p} contains ${b}`).not.toMatch(b);
  }
});

test("hero image is full-screen and edge-to-edge; no image labels", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const hero = page.locator("section[aria-labelledby=hero-title]");
  const box = (await hero.boundingBox())!;
  expect(box.x).toBe(0);
  expect(Math.round(box.width)).toBe(1440);
  expect(box.height).toBeGreaterThanOrEqual(899); // fills the screen height
  await expect(page.getByText("Illustrative image")).toHaveCount(0);
});

for (const [w, h] of [[320, 568], [360, 740], [390, 844], [430, 932]] as const) {
  test(`phone hero ${w}x${h}: sharp photo above the text, buttons clear of the tab bar, entrance finishes`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto("/");
    await page.waitForTimeout(2600);
    const m = await page.evaluate(() => {
      const s = document.querySelector("section[aria-labelledby=hero-title]")!;
      const img = s.querySelector("img")!;
      const fetched = Math.min(1366, Number(img.currentSrc.match(/[?&]w=(\d+)/)?.[1] ?? 0));
      const drawn = Math.max(img.offsetWidth, (img.offsetHeight * 1366) / 877);
      const buttons = [...s.querySelectorAll("a")].filter((a) => a.getClientRects().length).map((a) => a.getBoundingClientRect());
      return {
        sharpness: fetched / (drawn * devicePixelRatio),
        photoBottom: img.parentElement!.getBoundingClientRect().bottom,
        titleTop: s.querySelector("h1")!.getBoundingClientRect().top,
        buttonsBottom: Math.max(...buttons.map((b) => b.bottom)),
        sameRow: Math.abs(buttons[0].top - buttons[1].top) < 2,
        barTop: document.querySelector("nav.fixed")!.getBoundingClientRect().top,
        settled: [...s.querySelectorAll(".hero-word > span, .hero-photo")].every((e) => ["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(getComputedStyle(e).transform)),
      };
    });
    expect(m.sharpness, "image pixels per screen pixel").toBeGreaterThan(0.75);
    expect(m.titleTop, "headline starts below the clear part of the photo").toBeGreaterThan(m.photoBottom - 45);
    expect(m.buttonsBottom).toBeLessThanOrEqual(m.barTop);
    expect(m.sameRow, "two buttons side by side").toBe(true);
    expect(m.settled, "animation ends in the final position").toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Health knowledge, carried to where people live.");
    await ctx.close();
  });
}

test("hero headline is visible at once when reduced motion is requested", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const names = await page.locator(".hero-word > span, .hero-photo, .hhc-rise").evaluateAll((els) => els.map((e) => getComputedStyle(e).animationName));
  expect(new Set(names)).toEqual(new Set(["none"]));
  await ctx.close();
});

test("home no longer shows the stats band", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("What you can open on this site today")).toHaveCount(0);
});

test("contact details use tel: and mailto:", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator('a[href="tel:+919909968495"]').first()).toBeVisible();
  await expect(page.locator('a[href="mailto:humanhealthforall@gmail.com"]').first()).toBeVisible();
});

test("structured data on every page is valid JSON and is an Organization", async ({ page }) => {
  await page.goto("/");
  const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().innerText());
  expect(ld["@type"]).toBe("Organization");
  expect(ld.url).toBe("https://www.humanhealthcircle.org");
});

test("centres page shows verified Ahmedabad locations and no dead links", async ({ page }) => {
  await page.goto("/centres");
  await expect(page.getByText("23 Shardanagar Society").first()).toBeVisible();
  await expect(page.getByText("Shri Bhagwat Vidyapith Campus").first()).toBeVisible();
  await expect(page.getByText("Pandya Hospital").first()).toBeVisible();
  await expect(page.locator('a[href*="business.site"]')).toHaveCount(0); // retired Google Business Site (404)
});

test("footer: no disclaimer, and the green runs to the very bottom (no empty strip under it)", async ({ page }) => {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/contact");
    await expect(page.getByText("Health information on this site is educational")).toHaveCount(0);
    const gap = await page.evaluate(() => Math.round(document.documentElement.scrollHeight - (document.querySelector("footer")!.getBoundingClientRect().bottom + scrollY)));
    expect(gap, `${w}px`).toBeLessThanOrEqual(1);
  }
});

test("centres: embedded map with a place picker, directions and open-in-maps links", async ({ page }) => {
  await page.goto("/centres");
  const map = page.locator("section[aria-labelledby=map-title]");
  await expect(map.locator("iframe")).toHaveAttribute("src", /google\.com\/maps\?q=.*Shardanagar.*output=embed/);
  for (const [name, q] of [["Ahmedabad · Sola", /Niramay/], ["Dehgam", /Pandya/], ["Organic farm · Jindva", /Jindva/]] as const) {
    await map.getByRole("button", { name: new RegExp(name.replace("·", "·")) }).click();
    await expect(map.locator("iframe")).toHaveAttribute("src", q);
  }
  await expect(map.getByRole("link", { name: /Get directions/ })).toHaveAttribute("href", /maps\/dir\/\?api=1&destination=/);
  const open = map.getByRole("link", { name: /Open in Google Maps/ });
  await expect(open).toHaveAttribute("target", "_blank");
  await expect(open).toHaveAttribute("rel", /noopener/);
});
