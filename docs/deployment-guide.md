# Deployment guide

## 1. Requirements
Node.js ≥ 20 (developed on 22), npm. The site is fully static except `/api/enquiry`, so it runs on Vercel, Netlify (with Next runtime), a Node VPS, or Docker.

```bash
npm ci
cp .env.example .env.local      # fill in values - see §4
npm run build
npm start                       # or deploy to Vercel
```

## 2. Pre-launch checklist
- [ ] Set `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph, JSON-LD).
- [ ] Configure enquiry delivery (§4) and **send a real test enquiry from the production URL**; confirm it arrives. (Only a mock receiver was tested.)
- [ ] Resolve `docs/content-review-needed.md` 🔴 items (legal status, photography, addresses, BVD wording, HAM terms).
- [ ] Replace the three illustrative images (`src/content/images.ts`).
- [ ] Decide checkout strategy (§3).
- [ ] Submit `/sitemap.xml` to Google Search Console; confirm redirects (§5).
- [ ] Re-run `npm run build && npx playwright test` and `node scripts/check-external-links.mjs BASE=https://…` against staging.

## 3. WooCommerce / checkout / payments - DO NOT break
**Findings (see audit §4.15):** `/my-cart/`, `/checkout/`, `/my-account/` are plain WooCommerce shortcode pages. No products are publicly exposed (`/shop/` 404, Store API 404). The payment gateway in use could not be identified (no Razorpay/PayU/Stripe/PayPal strings; the word "cod" suggests Cash on Delivery may be enabled). Real payments for Health Assurance Mission happen on **a different domain** (`hhcnutrition.com/pay/hhcpay`). WordPress admin was not accessible, so orders, gateways and plugin settings are **unknown**.

**What the Next.js site does:** nothing with checkout - no fake form, no secrets. The three URLs are *not implemented* in Next.js.

**Recommended strategy (verify with HHC first):**
1. If WooCommerce has **no live products/orders**: retire the three pages (301 to `/contact`) and keep WordPress only as an archive/admin.
2. If it **is** in use: keep WordPress on a sub-domain (e.g. `shop.humanhealthcircle.org`, or the existing host) and route only `/my-cart`, `/checkout`, `/my-account`, `/wp-content/uploads/*`, `/wp-json/*` to it at the proxy/CDN level (Cloudflare, nginx, or Vercel `rewrites` to the WP origin); the Next.js site serves everything else. Add a header link "Shop / My account" once products exist. Payment secrets stay in WordPress/the gateway - never in this repo.
3. Before cut-over, someone with WP admin must: list products and gateways, place a test order on staging, and export orders.

## 4. Environment variables
| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical base URL |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | one option required | Email enquiries via Resend. `FROM` must be a domain verified in Resend (default `onboarding@resend.dev` only sends to the account owner) |
| `ENQUIRY_WEBHOOK_URL` | alternative | JSON POST of `{name, phone, email, message, topic, text, receivedAt}` |

If none is set, `/api/enquiry` returns `503 {"error":"not_configured"}` and the form shows an error with the phone/email fallback. Secrets are server-side only (no `NEXT_PUBLIC_` prefix).

**Spam:** honeypot field + 5 requests / 10 min / IP (in-memory). On multi-instance hosting add a shared limiter (Upstash/Redis) or Cloudflare Turnstile.

## 5. Redirects & SEO migration
Redirects live in `src/lib/redirects.ts` (301). See `route-migration-map.md`. After launch: watch Search Console for 404s on old `wp-content/uploads/...` URLs and add rewrites if needed. Note the old homepage had an empty `<title>` and no descriptions, so little ranking equity is at risk.

## 6. Hosting notes
- Vercel: import repo, set env vars, done. 
- Self-hosted: `npm run build && PORT=3000 npm start` behind nginx/Caddy with TLS; set `X-Forwarded-For` so the rate limiter sees real IPs.
- Large static assets: `public/documents/*.pdf` ≈ 23 MB total (First Aid 10 MB). Serve via CDN with long cache headers.
- Add security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`) at the host; YouTube embeds need `frame-src https://www.youtube-nocookie.com`, thumbnails need `img-src https://i.ytimg.com`.

## 7. Running the tests
```bash
npm run build
npx playwright test                       # starts mock webhook + two servers automatically (ports 3101/3102/4010)
BASE=http://localhost:3101 node scripts/check-external-links.mjs
```
