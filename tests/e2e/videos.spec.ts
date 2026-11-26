import { test, expect } from "@playwright/test";

test.describe("video hub", () => {
  test("shows a player, six playlist items and topic filters", async ({ page }) => {
    await page.goto("/health-awareness-videos");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("button", { name: /^Play video:/ })).toBeVisible();
    await expect(page.getByRole("complementary", { name: "Playlist" }).getByRole("button")).toHaveCount(6);
    for (const t of ["All", "Mother & child", "Nutrition & anaemia", "Ayurveda & lifestyle"]) {
      await expect(page.getByRole("button", { name: new RegExp(`^${t.replace("&", "\\&")}`) })).toBeVisible();
    }
  });

  test("topic filter narrows the playlist", async ({ page }) => {
    await page.goto("/health-awareness-videos");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /^Ayurveda & lifestyle/ }).click();
    const list = page.getByRole("complementary", { name: "Playlist" }).getByRole("button");
    await expect(list).toHaveCount(2);
    await expect(page.getByRole("heading", { level: 2 }).first()).toContainText("Chyawanprash");
    await page.getByRole("button", { name: /^All/ }).click();
    await expect(list).toHaveCount(6);
  });

  test("choosing a playlist item loads the privacy-friendly YouTube player and autoplays", async ({ page }) => {
    await page.goto("/health-awareness-videos");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("iframe")).toHaveCount(0); // nothing from YouTube until the visitor asks
    await page.getByRole("complementary", { name: "Playlist" }).getByRole("button", { name: /Anaemia caused by iron deficiency/ }).click();
    const frame = page.locator("iframe");
    await expect(frame).toHaveCount(1);
    await expect(frame).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/I69hG3XsR_Q\?autoplay=1/);
    await expect(page.getByRole("heading", { level: 2 }).first()).toContainText("Anaemia caused by iron deficiency");
    await page.getByRole("button", { name: /Next video/ }).click();
    await expect(page.locator("iframe")).toHaveAttribute("src", /embed\/OqiNp2Wmxhc/);
  });

  test("home page has a compact video player too", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Watch and learn." })).toBeVisible();
    await expect(page.getByRole("complementary", { name: "Playlist" }).getByRole("button")).toHaveCount(4);
  });
});
