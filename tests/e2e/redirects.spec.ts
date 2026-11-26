import { test, expect } from "@playwright/test";

const map: [string, string][] = [
  ["/home-2/", "/"],
  ["/vit-a-def-detection-instrument/", "/bright-vision-detector#vitamin-a-document"],
  ["/nutrition-advance-online/", "/nutrition-calculator"],
  ["/nutrition-advance-software/", "/nutrition-calculator"],
  ["/nutritionadvance/", "/nutrition-calculator"],
  ["/blog-post-title/", "/hhc-course"],
  ["/hhc-health-package-2023/", "/blog"],
  ["/" + encodeURIComponent("આયુર્વેદ-નિશુલ્ક-નિદાન-ક") + "/", "/blog/ayurveda-free-camp-dec-2022"],
];

for (const [from, to] of map) {
  const bare = from.replace(/\/$/, "");
  test(`301: ${decodeURIComponent(from)} → ${to}`, async ({ request }) => {
    // Direct hit (no trailing slash): a single permanent 301 to the new route.
    const r = await request.get(bare, { maxRedirects: 0 });
    expect(r.status()).toBe(301);
    expect(decodeURIComponent(r.headers()["location"])).toBe(to);
    // Old WordPress URLs have a trailing slash: the chain must still end on the new route.
    const followed = await request.get(from);
    expect(followed.status()).toBe(200);
    expect(decodeURIComponent(followed.url())).toContain(to.split("#")[0]);
  });
}

test("lower-case-hex Gujarati slug (as WordPress emitted it) also redirects", async ({ request }) => {
  const slug = "/%e0%aa%86%e0%aa%af%e0%ab%81%e0%aa%b0%e0%ab%8d%e0%aa%b5%e0%ab%87%e0%aa%a6-%e0%aa%a8%e0%aa%bf%e0%aa%b6%e0%ab%81%e0%aa%b2%e0%ab%8d%e0%aa%95-%e0%aa%a8%e0%aa%bf%e0%aa%a6%e0%aa%be%e0%aa%a8-%e0%aa%95";
  const r = await request.get(slug, { maxRedirects: 0 });
  expect(r.status()).toBe(301);
  expect(r.headers()["location"]).toBe("/blog/ayurveda-free-camp-dec-2022");
});

test("old URLs that are kept still work with trailing slash", async ({ request }) => {
  for (const p of ["/about-us/", "/contact/", "/e-books/", "/bright-vision-detector/", "/products/"]) {
    const r = await request.get(p);
    expect(r.status(), p).toBe(200);
  }
});
