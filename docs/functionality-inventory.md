# Functionality inventory

Status key - **Rebuilt & tested**: implemented in the new site and covered by an automated test that was run (see `qa-report.md`). **Rebuilt, not fully testable here**: implemented, but depends on something outside this repo. **Kept on WordPress**: deliberately not rebuilt. **Dropped**: not carried over, with reason.

| # | Existing feature (live site) | New site | Status |
|---|---|---|---|
| 1 | Main navigation with dropdowns (Products, Education Material, Training & Courses) | **Liquid-glass navbar: Home · About HHC · Our Work · Innovations · Resources** (+ Contact button). Docked at the bottom on phones/tablets; full-screen menu lists every page | Rebuilt & tested (desktop, iPhone SE/Pro Max, Samsung, iPad; keyboard; active section) |
| 2 | Top bar: phone, email, social icons, "Quick Links" | Top bar (phone/email) + footer social icons. "Quick Links" folded into footer + dropdowns | Rebuilt & tested (tel:/mailto: links) |
| 3 | Site search box | **Dropped.** WordPress search has no equivalent; site is small. Add Pagefind/Algolia if wanted | Dropped |
| 4 | "News" ticker → Life Style Management | Dropped (2023 course, ended). Course kept as archive at `/hhc-course` | Dropped / archived |
| 5 | Homepage banner strip of 7 thumbnails | Replaced by photographic hero; the thumbnails are low-resolution crops of 2022 creatives | Replaced |
| 6 | Home side buttons: Nutrition Calculator, Niramay Holistic Health, Nisarg Health, Nisarg Organic Farm | Nutrition → `/nutrition-calculator`; Nisarg Health and Organic Farm → `/centres` (Maps links kept). **Niramay Business Site link removed - it now returns 404** | Rebuilt & tested (external links checked) |
| 7 | 4 YouTube embeds on homepage | Compact video player + 4-item playlist on the homepage; full **video hub** on `/health-awareness-videos` (player, playlist, topic filters, Next) | Rebuilt & tested (player load, autoplay URL, filter, next); **actual video playback not tested** |
| 8 | Health Awareness Videos (6) | All 6 preserved | Rebuilt & tested (loads, YouTube IDs verified via oEmbed during audit) |
| 9 | Education Material: 4 PDFs in embedded viewer + 5th item "ઘરગથ્થુ ઉપચારો" with no PDF | 4 PDFs as downloads. 5th item omitted (empty on old site) | Rebuilt & tested (download event) |
| 10 | E-books: First Aid, Dodi–Jivanti | Both preserved as downloads | Rebuilt & tested |
| 11 | Products: catalogue PDF + Vitamin A PDF; "Medicinal Leaves and Powders" tab with only the word "Leaves" | Both PDFs preserved; empty tab dropped | Rebuilt & tested |
| 12 | Bright Vision Detector page text | Preserved verbatim, attributed, with disclosure of Prakhar Innovations LLP | Rebuilt & tested |
| 13 | BVD: 4 Google Drive links | All 4 preserved, open in new tab with `rel=noopener` | Rebuilt & tested (hrefs; **HTTP 200 verified for all 4**) |
| 14 | BVD: WPForms "call back" form (WPForms id 438, posts to WordPress) | React Hook Form + Zod form → `/api/enquiry` → configured email/webhook | Rebuilt & tested **against a mock receiver**; **real delivery requires HHC to set env vars** |
| 15 | `/nutritionadvance/` callback form | Same enquiry form on `/nutrition-calculator` | As #14 |
| 16 | Nutrition Advance: register / activate on WhatsApp / log in / offline download / Play-store app text | 3-step guide + links (hhcnutrition.com, wa.me, myhhc.in). Play Store mention dropped (no link existed) | Links HTTP-checked (all 200). **The external software itself was not tested** |
| 17 | `/nutrition-advance-online/` WP Download Manager package #529 | **Unknown file** - package content not retrievable without WP admin. Not migrated | Open item |
| 18 | Health Assurance Mission: lifestyle-score Google Form, 4 tiers, "Book Now" → `hhcnutrition.com/pay/hhcpay` | All preserved; links unchanged | Rebuilt & tested (link target asserted); **payment flow itself not tested - external site** |
| 19 | HAM "families joined" counter showing 0+ | Dropped (shows zero) | Dropped |
| 20 | Training & Courses (LSM) with Google Form | Archive page. Form link kept with "may no longer accept applications" | Rebuilt |
| 21 | Rushi-Krushi + faculty (22 bios) | Course text (Hindi) preserved; faculty = names + topics only | Rebuilt; bios intentionally not copied |
| 22 | Contact page: text only, no form | New form + phone/email + centres link | New; tested |
| 23 | Media page ("my latest engagements" template text + 2 images) | Gallery of the 5 real HHC creatives | Rebuilt |
| 24 | Blog: empty list + 4 event posts | Blog index with 4 archive entries; 1 detail page (camp poster) | Rebuilt |
| 25 | **Cart / Checkout / My Account (WooCommerce)** | **Kept on WordPress** - see `deployment-guide.md` §3 | Kept on WordPress; **not tested** (live WP untouched) |
| 26 | Page visit counter plugin | Dropped. Add privacy-respecting analytics if wanted | Dropped |
| 27 | Facebook / Instagram / YouTube links | Preserved in footer (+ top-level YouTube) | YouTube 200; **Facebook & Instagram block bots - unverified** |
| 28 | `/home-2/` duplicate homepage | 301 → `/` | Tested |
| 29 | Old URLs (8 redirects incl. Gujarati slug) | `next.config.ts` redirects, status 301 | Tested (incl. lower-case-hex slug) |
| 30 | `wp-sitemap.xml` | `/sitemap.xml` + `/robots.txt` | Tested |

## New functionality
Skip link; breadcrumb; scroll progress bar; animated counters; honeypot + rate-limit on enquiry API (5 per 10 min per IP, in-memory - use an edge/Redis limiter when scaled); JSON-LD `Organization`; per-page canonical + Open Graph.

## Added: `/innovations` hub (Bright Vision Detector + Nutrition Calculator), liquid accordion for the five working methods, video hub filters. Removed: homepage stats band, marquee, language-pair labels.

## Added: language switch English | Gujarati (all pages, form messages and menus), persisted per device; flat-at-rest liquid navbar.
