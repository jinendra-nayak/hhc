import { test, expect } from "@playwright/test";

// The mock receiver runs as its own process (see playwright.config.ts) so parallel workers can share it.
const MOCK = "http://127.0.0.1:4010";
const received = {
  async reset() { await fetch(`${MOCK}/_reset`, { method: "POST" }); },
  async all(): Promise<Record<string, unknown>[]> { return (await fetch(`${MOCK}/_received`)).json(); },
};

test.describe("Contact form (backend configured)", () => {
  test.describe.configure({ mode: "serial" });
  test("shows validation errors and sends nothing when empty", async ({ page }) => {
    await received.reset();
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter a phone / WhatsApp number.")).toBeVisible();
    expect(await received.all()).toHaveLength(0);
  });

  test("rejects invalid phone and email", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name *").fill("Test User");
    await page.getByLabel("Phone / WhatsApp *").fill("abc");
    await page.getByLabel("Email (optional)").fill("not-an-email");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText(/valid phone number/)).toBeVisible();
    await expect(page.getByText(/valid email/)).toBeVisible();
  });

  test("delivers a valid enquiry to the configured destination, then shows success", async ({ page }) => {
    await received.reset();
    await page.goto("/contact");
    await page.getByLabel("Name *").fill("Playwright Tester");
    await page.getByLabel("Phone / WhatsApp *").fill("+91 90000 00000");
    await page.getByLabel("Message").fill("Automated test enquiry");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Thank you - your message has been sent.")).toBeVisible();
    const got = await received.all();
    expect(got).toHaveLength(1);
    expect(got[0]).toMatchObject({ name: "Playwright Tester", phone: "+91 90000 00000", topic: "General enquiry" });
  });

  test("shows a loading state while sending", async ({ page }) => {
    await page.route("**/api/enquiry", async (route) => { await new Promise((r) => setTimeout(r, 700)); await route.continue(); });
    await page.goto("/contact");
    await page.getByLabel("Name *").fill("Slow Tester");
    await page.getByLabel("Phone / WhatsApp *").fill("9000000000");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
    await expect(page.getByText("Thank you - your message has been sent.")).toBeVisible();
  });

  test("honeypot-filled submissions are rejected by the API", async ({ request }) => {
    const r = await request.post("/api/enquiry", { data: { name: "Bot", phone: "9000000000", website: "http://spam" } });
    expect(r.status()).toBe(422);
  });

  test("network failure shows an honest error with phone fallback", async ({ page }) => {
    await page.route("**/api/enquiry", (route) => route.abort());
    await page.goto("/contact");
    await page.getByLabel("Name *").fill("Offline Tester");
    await page.getByLabel("Phone / WhatsApp *").fill("9000000000");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "could not reach the server" })).toBeVisible();
    await expect(page.getByText("Thank you")).toHaveCount(0);
  });

  test("Bright Vision Detector call-back form tags the topic", async ({ page }) => {
    await received.reset();
    await page.goto("/bright-vision-detector");
    const form = page.locator("#callback");
    await form.getByLabel("Name *").fill("BVD Tester");
    await form.getByLabel("Phone / WhatsApp *").fill("9000000001");
    await form.getByRole("button", { name: "Request call back" }).click();
    await expect(form.getByText("Thank you - your message has been sent.")).toBeVisible();
    expect((await received.all())[0]).toMatchObject({ topic: expect.stringMatching(/^Bright Vision Detector [-\u2014] call back$/) });
  });
});

test.describe("Contact form (NO backend configured, server :3102)", () => {
  test("never fakes success: API answers 503 and the form shows an error", async ({ page, request }) => {
    const api = await request.post("http://localhost:3102/api/enquiry", { data: { name: "No Backend", phone: "9000000002" } });
    expect(api.status()).toBe(503);
    expect(await api.json()).toEqual({ error: "not_configured" });

    await page.goto("http://localhost:3102/contact");
    await page.getByLabel("Name *").fill("No Backend");
    await page.getByLabel("Phone / WhatsApp *").fill("9000000002");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "not switched on yet" })).toBeVisible();
    await expect(page.getByText("Thank you")).toHaveCount(0);
  });
});
