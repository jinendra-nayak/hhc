import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";

/**
 * Forwards an enquiry to a real destination. Configure ONE of:
 *   1. RESEND_API_KEY + ENQUIRY_TO_EMAIL (+ ENQUIRY_FROM_EMAIL)  → email via Resend
 *   2. ENQUIRY_WEBHOOK_URL                                        → JSON POST (Zapier, Make, n8n, Google Apps Script …)
 * If neither is set the route answers 503 and the form shows an honest error - it never fakes success.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // honeypot hits also land here; respond generically
    return NextResponse.json({ error: "validation", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const d = parsed.data;
  const text = [
    `Topic: ${d.topic}`,
    `Name: ${d.name}`,
    `Phone/WhatsApp: ${d.phone}`,
    `Email: ${d.email || "-"}`,
    "",
    d.message || "(no message)",
    "",
    `Sent from humanhealthcircle website · ${new Date().toISOString()}`,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  try {
    if (resendKey && to) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL ?? "HHC Website <onboarding@resend.dev>",
          to: to.split(",").map((s) => s.trim()),
          reply_to: d.email || undefined,
          subject: `[HHC website] ${d.topic} - ${d.name}`,
          text,
        }),
      });
      if (!r.ok) return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
      return NextResponse.json({ ok: true });
    }
    if (webhook) {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, text, receivedAt: new Date().toISOString() }),
      });
      if (!r.ok) return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
      return NextResponse.json({ ok: true });
    }
  } catch {
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  }
  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
