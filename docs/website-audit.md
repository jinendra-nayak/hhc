# HHC Website Audit

**Audited:** 2026-11-25 · **Site:** https://www.humanhealthcircle.org/
**Method:** HTTP fetches of every page, WordPress REST API (`/wp-json/wp/v2/pages|posts|media`), raw HTML analysis of the homepage, Contact, Bright Vision Detector, Health Assurance Mission, Products and Media pages, and one full-page browser screenshot of the homepage (desktop). Mobile layout of the *live* site was **not** visually inspected.

## 0. What was and was not inspected

| Item | Status |
|---|---|
| Repository | Contained only the brief (`Human Health Circle HHC.md`) and 3 images in `doc-image/`. No existing code. A fresh Next.js project was created in `hhc-site/`. |
| Design reference (chatgpt.com/s/i_6b06…) | **Not inspected.** The share URL returns only an HTML shell (title "ChatGPT – Shared Content", metadata saying it is an image). The image file itself sits behind a backend API URL that I did not fetch. Design follows the brief's written direction. |
| `doc-image/image-1..3.jpeg` | Viewed. Yoga group in a garden, a village health camp, and Ayurvedic herbs. **Image 2 and 3 appear to be AI-generated**; image 1 looks like stock photography. None are verified HHC photos. See `content-review-needed.md`. |
| Homepage + 20 other pages | Content retrieved via REST API; HTML structure inspected. |
| Interactive behaviour (form submits, checkout flow, dropdown hover) | **Not exercised** on the live site. Forms were identified in HTML only; no test submissions were made to avoid sending real enquiries. |
| Live site on mobile | Not inspected. |
| Admin / WooCommerce back end | No access. Products, orders and payment gateway settings are unknown. |
| `hhcnutrition.com` internals | Only HTTP status checked (root 307 redirect, `/pay/hhcpay` 200). |
| Google Drive files linked from Bright Vision Detector | Links extracted; contents not opened. |

## 1. Technical stack of the live site
- WordPress, theme **Education Hub (WEN Themes)**, plugins: Elementor, WPForms Lite, Advanced Page Visit Counter, pdf-embedder, WP Download Manager (`wpdm_package`), WooCommerce (shortcodes `[woocommerce_cart|checkout|my_account]`).
- LiteSpeed server. `robots.txt` only blocks `/wp-admin/`. Sitemap at `/wp-sitemap.xml`.
- Homepage has an **empty `<title>`** and no meta description. No Open Graph tags found.
- Footer: "Copyright. All rights reserved. Proudly powered by WordPress | Education Hub by WEN Themes".

## 2. Logo & brand assets
- Original logo: `/wp-content/uploads/2022/12/Human-Health-Circle-Logo-Aw-scaled.jpg` - **2560×2419 JPG, white background (no transparency)**. Circular lettering "HUMAN HEALTH CIRCLE" in brown (#9A5226-ish), centre mark of blue arcs, orange human figure, green leaf, green smile/stethoscope arc.
- Cropped variants (512², 70²) exist, as does a 1920×180 PNG banner of product thumbnails (not a logo).
- **Palette implication:** the logo is multicolour (blue, orange, green, brown). The brief's forest-green palette complements the leaf/arc greens; the logo's orange is used as a secondary accent instead of invented gold.
- The logo is used unaltered, on white. Transparency was produced by white-to-alpha keying only (no redraw). See `docs/implementation-summary.md`.

## 3. Navigation (live)
Top bar: phone `+91 99099 68495`, email `humanhealthforall@gmail.com`, "News: Life Style Management" ticker, YouTube / Instagram / Facebook icons, "Quick Links" dropdown. Search box. Main menu:

- About Us
- Products ▾ → Bright Vision Detector, Nutrition Advance Online
- Education Material ▾ → Health Awareness Video's, E Books
- Training & Courses ▾ → ऋषि-कृषि, Rushi Krushi – List of Faculties
- Health Assurance Mission
- Contact

Not in menu but live: `/products/`, `/nutritionadvance/`, `/nutrition-advance-software/`, `/vit-a-def-detection-instrument/`, `/media/`, `/blog/`, `/home-2/`, cart/checkout/my-account, and 3 posts.

## 4. Page-by-page audit

### 4.1 Home - `/`
- **Purpose:** Landing page.
- **Sections:** banner strip of 7 circular thumbnails; headline "HHC (Human Health Circle) is Proprietorship firm."; 3 paragraphs; 4 side buttons (Nutrition Calculator → hhcnutrition.com; Niramay Holistic Health → Google Business site; Nisarg Health By HHC → Google Maps; Nisarg Organic Farm By HHC → Google Maps); 4 YouTube embeds (rendered black in the audit screenshot - lazy-load/consent issue).
- **Functionality:** external links only. Search.
- **Preserve:** coordination with many organisations; community-health, hospitals, agriculture, medicinal plants, food production expertise; centres in Ahmedabad, Dehgam, Vadodara, Anand; contacts; the 4 resource buttons.
- **Outdated / risky:** "Proprietorship firm" (contradicts NGO framing - **needs HHC decision**); "31 years" and "700+ experts" unsourced; "HHC Health & Wealth 2023" package; two phone numbers, one (`9428503295`) belongs to Dr. Rajesh Mehta on other pages.
- **Missing:** title/meta, mission statement, centre addresses and hours, registration status, any impact figures, photos of real work.
- **Redesign:** full editorial homepage (see implementation summary).

### 4.2 About Us - `/about-us/`
- **Content:** five working methods - Health Training; Production of IEC material; Medical Camps; First Aid/Medical Kits; Education of young population. Well written, genuinely useful, rooted in community health.
- **Missing:** history, founders, legal status, mission/vision, team, geography.
- **Redesign:** preserve the five methods as the "Our Approach" section; add placeholders flagged for HHC input rather than inventing history.

### 4.3 HHC Home (duplicate) - `/home-2/`
- Older homepage copy: "voluntory organizations", "**last 10 years**", "technical team… **more than last 30 years**", "Health & Wealth **2022**". Contradicts `/` ("31 years"). Not in menu. **Redirect to `/`.** Conflicts logged.

### 4.4 Products - `/products/`
- Tabs: *Food Products & Ayurveda Medicines* (embedded PDF `All-Products.pdf`, 3.3 MB), *Medicinal Leaves and Powders* ("Leaves" placeholder text only), *Vitamin A Detector* (embedded `Vitamin-A-Deficiency-Detector.pdf`).
- **Preserve:** both PDFs (downloadable). **Outdated:** price lists inside the PDFs not reviewed. **Missing:** actual product listing, ordering route. No WooCommerce product catalogue is exposed (`/shop/` is 404; Store API returns 404).

### 4.5 Bright Vision Detector - `/bright-vision-detector/`
- **Content:** "Welcome to Prakhar Innovations LLP!" - described as "a world-first technology designed to revolutionize health diagnostics"; signed Dr. Rajesh Mehta, MBBS, MD, Former Dean, GMERS Medical College, Sola, Ahmedabad; contact 9428503295.
- **Functionality:** WPForms form id 438 ("get call back from our team": First/Last name, Contact No. (WhatsApp) required, Email, Message) submitting by AJAX to WordPress. 4 Google Drive links: Research Paper, News Cuttings, Online Media Coverage, "Importance of vitamin 'A' and Bright Vision Detector".
- **Preserve:** all text, 4 links, the form.
- **Concerns:** "world-first" / "revolutionize" are unsupported superlatives; the product belongs to a **separate legal entity (Prakhar Innovations LLP)**, which must be disclosed clearly. No product description, no intended use, no regulatory status.
- **Related:** `/vit-a-def-detection-instrument/` (PDF only).

### 4.6 Nutrition Advance - `/nutrition-advance-online/`, `/nutrition-advance-software/`, `/nutritionadvance/`
- `/nutrition-advance-software/`: promo copy + 3 registration steps pointing to `hhcnutrition.com/register-now`, WhatsApp 99099 68495, `hhcnutrition.com/login`, offline download `myhhc.in/nutrition/`, "MY HHC" Play Store app, social links.
- `/nutrition-advance-online/`: only `[wpdm_package id='529']` (WP Download Manager file).
- `/nutritionadvance/`: only a callback form (name, WhatsApp, email, message).
- **Status checks:** `hhcnutrition.com` → 307 redirect; `myhhc.in/nutrition/` → 200. Further behaviour unverified.
- **Concerns:** claims like "biochemic minerals required as per your birth date" and "Naturopathy protocols… as per the illness" are unsupported medical claims and are **not** republished verbatim - flagged.
- **Redesign:** one "Nutrition Calculator" resource page linking to the existing external tool; no re-implementation.

### 4.6b Education Material - `/education-material/`
- 5 accordion titles (Gujarati): સૌને ગમે સ્વચ્છતા, સ્વસ્થ જીવન શૈલી, વ્યસનમુક્ત જીવન, તંદુરસ્તીના સોનેરી નિયમો, ઘરગથ્થુ ઉપચારો. 4 have embedded PDFs (the 5th, *ઘરગથ્થુ ઉપચારો*, has **no PDF** - empty).
- PDFs: `saune-game-swachhata-revised-5Oct2021.pdf`, `Swasth-JivanShailee-2.pdf`, `Vyasanmukt-Jivan-1.pdf`, `૩૫-પોઈન્ટ્સ.pdf`.

### 4.7 Health Awareness Videos - `/health-awareness-videos/`
- 6 Gujarati YouTube videos (IDs verified via YouTube oEmbed): `kH7qBEwuHAM` શિશુ મંગલ ભાગ-૧; `OJgy4mgbMbw` ગર્ભવતી મહિલા અને પાંડુરોગ; `I69hG3XsR_Q` એનિમિયા; `cZ3KIrlwljs` શિયાળાનું અમૃત – ચ્યવનપ્રાશ; `OqiNp2Wmxhc` પોષક તત્વો; `LBcZeTLAumQ` આયુર્વેદ દિનચર્યા (Vaidya Dr. Shivaniben Patel). **Preserve all.** Note the homepage embeds a 4-video subset.

### 4.8 E-books - `/e-books/`
- First Aid (`Firstaid.pdf`, 9.9 MB, Gujarati: પ્રાથમિક સારવાર) and ડોડી–જીવંતી (`ડોડી-Health-Benefits-of-Dodi-Jivanti.pdf`). Preserve both downloads.

### 4.9 Training & Courses - `/hhc-course/`
- Life Style Management Certificate Course (Gujarati and English tabs), with International Hindu University (Florida, USA). **All dates are Jan–Mar 2023; fee ₹12,500 / ₹9,500 early offer ended 26 Dec 2022.** Contains Google Form link, 2 phone numbers, IHU contact incl. US phone.
- **Outdated:** entire offer. Present as an archived/past course; ask HHC whether it recurs. Note a contradiction: Gujarati tab says 8–9 **PM**, English tab says 8–9 **AM**.

### 4.10 Rushi Krushi - `/rushi-krushi/` (post) and `/rushi-krushi-list-of-faculties/`
- Hindi/Gujarati/English tabs of an online natural-farming course (1 May–31 Oct 2023, with International Hindu University). Faculty page lists ~22 external people with long bios (e.g. Padmashri Dr. Khader Vali, Shri Patanjali Jha, Dr. Rajesh Kapoor, Yogi Arwind…). Bios appear copied from public sources (Wikipedia-style citation marks like `[2]`, `[10]`) with typos.
- **Concerns:** third-party credentials and awards unverified; copied text; course dates expired; the page is agriculture, not health.
- **Redesign:** a concise archived course page; faculty list as names + roles only, pending HHC confirmation and consent. Not republished wholesale.

### 4.11 Health Assurance Mission - `/health-assurance-mission/`
- Volunteer invitation, lifestyle-score Google Form, counter ("No. of families joined" showing **0+**), four tiers: Normal (free), Silver ₹100/yr, Gold ₹1000/yr, Platinum ₹5000/yr with "Book Now" buttons (to `hhcnutrition.com/pay/hhcpay`, status 200); contact Dr Rajesh Mehta 7574813972.
- **Concerns:** counter literally shows 0; package entitlements ("10–20 % medicine", "Vit A free") are commercial claims needing confirmation; payment is on a **different domain**.
- **Redesign:** preserve tiers and payment link as-is, in a clear table, flagged for confirmation.

### 4.12 Contact - `/contact/`
- Text "Feel free to get in touch & I'll get back to you." (first-person copy from a template), **no form, no address, no map**; only the global header phone/email.
- **Missing:** everything. **Redesign:** real Contact page with working form (see Forms below).

### 4.13 Media - `/media/`
- "Media & Photos from my latest engagements" + the course creative "LSM Eng" twice. Template placeholder copy.

### 4.14 Blog - `/blog/` + posts
- `/blog/` renders empty. Posts: ऋષિ-કૃષિ (`/rushi-krushi/`), "HHC Health Package 2023", "આયુર્વેદ નિશુલ્ક નિદાન કેમ્પ" (free Ayurveda camp, 17–18 Dec 2022, Sola, Ahmedabad), "Life Style Management Course". All are dated 2022–23 event posts. Full content of these posts was retrieved; the camp poster (`Free-Camp-All.png`) confirms a real HHC + Shri Bhagwat Vidyapith camp at **Niramay Tirth Arogya Seva Kendra, SG Highway, near Sola Civil Hospital, Ahmedabad**, listing named doctors.

### 4.15 Cart / Checkout / My Account - `/my-cart/`, `/checkout/`, `/my-account/`
- Plain WooCommerce shortcodes. Pages return 200. `cod` text appears in the checkout HTML (suggests Cash on Delivery may be enabled); no Razorpay/PayU/Stripe/PayPal strings found. **No products are exposed** (no `/shop/`, Store API 404, only WooCommerce placeholder image in media). The checkout is therefore effectively dormant; real payment for Health Assurance Mission happens on `hhcnutrition.com`.
- **Decision:** Next.js cannot replace WooCommerce. Keep WordPress for these three URLs (see migration map).

## 5. Interactive elements inventory (summary)
Full list in `functionality-inventory.md`. Highlights: 1 WPForms callback form (BVD, id 438) + identical form on `/nutritionadvance/`; search; Quick Links dropdown; 3 Google Forms; 4 Drive docs; 9 PDFs/documents; 6 YouTube videos; external apps (hhcnutrition.com, myhhc.in, Play Store).

## 6. SEO of live site
Homepage empty `<title>`; no meta descriptions; non-descriptive slugs (`home-2`, `blog-post-title`); Gujarati slug percent-encoded; no OG tags; no structured data. Single WordPress sitemap exists.

## 7. Overall recommendations
1. Resolve organisational identity (proprietorship vs NGO/trust) before any NGO language is published.
2. Replace unverified numbers with nothing - or HHC-confirmed ones.
3. Obtain real photographs.
4. Keep WordPress/WooCommerce and `hhcnutrition.com` running for commerce and nutrition software; the new site links to them.
5. Archive expired 2023 offers.

## 8. Addenda found while implementing
- Google Maps short links on the old homepage resolve to: **"Human Health Circle, 23 Shardanagar Society, Behind Mangaltirth, Near Shreyash Crossing, Paldi, Ahmedabad 380007"** (Nisarg Health by HHC) and **"Nisarg Organic Farm by HHC, Jindva, Gujarat"**.
- The "Niramay Holistic Health" button target (`niramayarogyasevamandir.business.site`) is **404** (checked 2025-11-25).
- `hhcnutrition.com/` 307-redirects to `/register-now`; `myhhc.in/nutrition/` also lands on `hhcnutrition.com/register-now`. All 200.
- Real HHC creatives recovered from the media library and used: free Ayurveda camp poster (Dec 2022), Dehgam Panchakarma camp poster (Dec 2022; contains 2022 prices, not shown as text), Nutrition A CD cover (credits HHC & Finavia, concept Hema Mehta MPH, DNHE, CIN), two LSM course posters. A Suvarnaprashan camp poster (12 Dec 2022, ₹100) was seen but **not used** (contains a stock baby photo and health claims).
- Theme demo images (`home-image-1`, `about-image-*`, `gallery-image-*`, `contact-image-*`) belong to the Education Hub theme, not HHC.
- Not re-inspected on the live site: mobile layout, dropdown hover behaviour, form submissions.
