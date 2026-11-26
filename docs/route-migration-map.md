# Route migration map

Strategy: the new Next.js site becomes the public front end. **WordPress/WooCommerce is retained for cart, checkout, and my-account** (see below). Existing URLs are kept where they still make sense; others get a 301 in `next.config.ts`.

Legend: **Keep** = same path rebuilt · **301** = permanent redirect (implemented with `statusCode: 301`; WordPress URLs end in `/`, so a request first gets Next.js's trailing-slash 308, then the 301 - the final landing is correct and tested) · **WP** = stays on WordPress (proxied/subdomain) · **New** = new route

| Current URL | New URL | Action | Notes |
|---|---|---|---|
| `/` | `/` | Keep | |
| `/home-2/` | `/` | 301 | duplicate old homepage |
| `/about-us/` | `/about-us/` | Keep | "Our Approach" is anchored here; sub-pages are new |
| - | *(no separate mission/team pages)* | - | Not created: no verified content. Sections live on `/about-us` and the homepage |
| `/products/` | `/products/` | Keep | PDFs preserved |
| `/bright-vision-detector/` | `/bright-vision-detector/` | Keep | form rebuilt (see below) |
| `/vit-a-def-detection-instrument/` | `/bright-vision-detector/#vitamin-a-document` | 301 | PDF kept at `/documents/` |
| `/nutrition-advance-online/`, `/nutrition-advance-software/`, `/nutritionadvance/` | `/nutrition-calculator/` | 301 | one page; external tool links preserved |
| `/education-material/` | `/education-material/` | Keep | |
| `/health-awareness-videos/` | `/health-awareness-videos/` | Keep | |
| `/e-books/` | `/e-books/` | Keep | |
| `/hhc-course/` | `/hhc-course/` | Keep | archive framing |
| `/rushi-krushi/` , `/rushi-krushi-list-of-faculties/` | same | Keep | archive framing |
| `/health-assurance-mission/` | same | Keep | |
| `/contact/` | `/contact/` | Keep | real form added |
| `/media/` | `/media/` | Keep | |
| `/blog/` | `/blog/` | Keep | lists the 4 existing posts |
| `/blog-post-title/` | `/blog/life-style-management-course/` | 301 | better slug |
| `/hhc-health-package-2023/` | `/blog/hhc-health-package-2023/` | 301 | |
| `/rushi-krushi/` (post) | `/rushi-krushi/` | Keep | |
| `/આયુર્વેદ-નિશુલ્ક-નિદાન-ક/` (camp post) | `/blog/ayurveda-free-camp-dec-2022/` | 301 | percent-encoded Gujarati slug redirected |
| `/my-cart/`, `/checkout/`, `/my-account/` | unchanged | **WP** | deployment guide covers path-routing these to WordPress. Not rebuilt. |
| `/wp-content/uploads/2022/12/*.pdf` | `/documents/*.pdf` | Keep copies | old upload URLs should also stay reachable from WP while it runs |
| `/feed/`, `/wp-sitemap.xml` | `/sitemap.xml` | 301 | |
| - | `/centres`, `/initiatives`, `/resources`, `/nutrition-calculator` | New | hub / merged pages. No `/innovations` hub: Bright Vision Detector and Nutrition Calculator are linked from the nav group instead |

Not migrated: `wp-admin`, `wp-json`, WP search (`/?s=`) - replaced by none (site search not built).

## Proposed IA from the brief vs. what was built
The brief's suggested tree (Ayurveda / Naturopathy / Allopathy / Homeopathy / Yoga pages, Ahmedabad / Dehgam / Vadodara / Anand pages, Community Healthcare / Health Education / Medical Camps / Awareness Programmes pages, Research, Media Coverage, Our Team, Our Impact) was **not** built as separate pages, because the live site has no content for them and the brief forbids publishing unsupported services. Instead: systems of care are a homepage/about section; centres are one page with anchors (`/centres#dehgam`); initiatives are one page; research & media coverage are the four Drive links on the Bright Vision Detector page.

## Tested
All redirects above are covered by `tests/e2e/redirects.spec.ts` (10 tests, passing).
