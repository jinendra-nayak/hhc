# Implementation summary

## What was built
A complete Next.js redesign in `hhc-site/`: 19 routes, shared header/footer, 11-section homepage, enquiry API, SEO, tests and docs. Because the repository was empty (only the brief and 3 images), a new project was created.

**Stack:** Next.js 16.4.6 (App Router, Server Components by default), React 19, TypeScript, Tailwind CSS v4 (PostCSS plugin), Motion for React, Lucide, React Hook Form + Zod, Radix primitives (shadcn/ui patterns), Playwright + axe-core. Fonts: Lora (headings) and Inter (body) via `next/font`; Gujarati/Devanagari use system fonts (Noto / Nirmala UI …) to keep ~110 KB off the critical path.

**Client components only where needed:** header/menu, animations, video facade, enquiry form, accordion primitive. Everything else is server-rendered static HTML (all 19 pages prerendered).

## Homepage vs. the 16 suggested sections
| # | Suggested | Delivered |
|---|---|---|
| 1 | Navigation with logo | ✔ original logo, 4 dropdown groups, mobile menu |
| 2–3 | Hero + CTAs | ✔ (Learn about us / Our initiatives / Contact us) |
| 4 | Introduction & mission | ✔ uses HHC's own stated primary goal. No invented mission/vision text |
| 5 | Credibility & impact statistics | ✔ **reframed**: counts of things that verifiably exist on the site (5 methods, 6 videos, 6 guides, 4 cities). No outcome or years-of-experience claims |
| 6 | Healthcare approaches | ✔ five systems of care, with a note that per-centre services are unconfirmed |
| 7–9 | Initiatives, education, camps | ✔ five-method list; camps block with archive posters; education + videos + downloads |
| 10 | Experts & team | ✔ **limited**: 3 people credited in HHC's own materials, each with its source. Full team page withheld |
| 11 | Centres | ✔ with sourced addresses; unknown addresses say so |
| 12 | Bright Vision Detector | ✔ original quote, entity disclosure, CTA to call-back form |
| 13–14 | Articles; e-books | ✔ |
| 15–16 | CTA; footer | ✔ |

Layouts deliberately vary: full-bleed hero, split intro, dark stat band, numbered list with sticky heading, image + list, poster archive, ruled table, dark feature, editorial lists. No repeated identical card grids.

## Logo
Original `Human-Health-Circle-Logo-Aw-scaled.jpg` (2560×2419, white background) taken from the live site. A transparent PNG was derived by keying white to alpha - **no redrawing, recolouring or cropping of the artwork** (only surrounding whitespace trimmed). It is shown at native proportions in the header and footer; the footer places it on a cream plate so the multicolour logo is never altered for a dark background. Favicon/Apple icon use a circular crop of the centre symbol from the same file. Originals kept in `_assets-original/` and `public/images/brand/hhc-logo-original.jpg`.

## Design system
Palette from the brief (`globals.css`): Forest #173F35, Deep #244E40, Sage #477A61, Light sage #DDE9D9, Cream #F7F5EF, Ink #202B25, Line #E6E9E3. **Deviations:** secondary text darkened to #5A665E (AA on cream); the brief's "muted gold" replaced by the **orange from the HHC logo** (#F08A24) for accents/fills, and a darkened logo-brown (#8F4A22) for small text. Radii ≤ 6 px, subtle borders, one soft shadow. No glassmorphism, gradients limited to the hero overlay.

## Animation
`src/components/animations/`: `FadeIn`, `SlideUp`, `StaggerContainer`/`StaggerItem`, `ImageReveal`, `ParallaxImage`, `AnimatedCounter`, `ScrollProgress`, plus `MotionProvider` (`reducedMotion="user"`, `LazyMotion` with async-loaded features; components use `m.*`; ScrollProgress and the parallax motion are code-split and load after hydration). Durations follow the brief (buttons 180 ms, hover 250 ms, text 500 ms, image 700 ms, section 550 ms). Above-the-fold text uses CSS keyframes so it never waits for JS. A `<noscript>` rule and tests confirm content stays visible without JS. **Not implemented: page transitions** - they require hiding content on route change, which hurts LCP and accessibility for little gain.

## Components & third-party libraries
- shadcn/ui **patterns** (Button, Input, Textarea, Label, Accordion) were written by hand with Radix + `class-variance-authority` and a `components.json` for future `npx shadcn add`. The shadcn CLI was not run.
- **No components were taken from 21st.dev, Open Source UI, Untitled UI, daisyUI, HeroUI, Park UI, Mantine or Chakra.** Nothing needed them, so no licence/compatibility review was necessary and no competing design system was introduced. Add one deliberately later if wanted.
- Dependencies: all MIT/Apache-licensed open source; `npm audit` reported 0 vulnerabilities at install time.

## What needs configuration or a decision
1. **Enquiry destination** - set `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` (+ `ENQUIRY_FROM_EMAIL`) or `ENQUIRY_WEBHOOK_URL` (`.env.example`). Until then, forms honestly report they are not switched on. The old WPForms recipient could not be seen without WordPress admin access.
2. **Legal identity** (proprietorship vs. trust/NGO) → determines footer text and whether NGO language, 80G/12A etc. may be used. See `content-review-needed.md`.
3. **Real photographs** - three illustrative images (yoga garden, village camp, herbs) are clearly labelled placeholders; two look AI-generated. Replace in `src/content/images.ts`.
4. **Centre details** - Vadodara and Anand addresses; Dehgam address (from a Dec 2022 poster) to confirm; services per centre.
5. **Checkout** - see `deployment-guide.md` §3.
6. **Team page**, history, mission/vision, impact numbers - need HHC input.
7. **Nutrition Advance Download Manager package #529** - unknown without WP admin.

## Known limitations
- Lighthouse performance ≥ 91 on all measured pages, but simulated-throttling LCP is 2.6–3.5 s on home, videos and BVD (target 2.5 s) - see QA report.
- Gujarati/Hindi glyph shapes depend on the visitor's installed system fonts.
- No site search, no CMS: content is in `src/content/*.ts` and page files. For non-developer editing consider Sanity/Decap CMS or keep WordPress headless.
- In-memory rate limiter resets on restart / is per-instance.
- No i18n routing; Gujarati/Hindi content sits inline with `lang` attributes.
- The redirect map covers all *known* WP URLs; old `wp-content/uploads/...` PDF URLs are not redirected (keep WordPress running at the old host, or add rewrites).

## Update: navigation, hero, videos, English-only (latest round)
- **Navigation:** Nimbus "liquid glass" navbar (`components/ui/liquid-glass-navbar.tsx`, provided by the client) with Home · About HHC · Our Work · Innovations · Resources. Desktop: centred in a floating forest-green header bar with a Contact button. Below 1024 px (phones, tablets): the *same* navbar docks at the bottom of the screen (thumb reach); the hamburger opens a full-screen menu listing every page. Sub-pages are reached from section hubs (new `/innovations`, About → Centres/Media, Our Work → Courses) and the menu/footer. The active item follows the section you are in.
- **Liquid accordion** (`liquid-glass-accordion.tsx`, provided) presents the five "ways we work" (real content) on Home, About and Initiatives.
- **Adaptations to the provided components** (documented in file headers): `ambient`, `glMode="interaction"`, `refraction`, `linkAs` (next/link). Everything else is unchanged. Both files carry `/* eslint-disable */` because they are third-party code.
- **Hero:** one full-screen, edge-to-edge photograph (no inset card), with a lighter right side so the photo stays visible.
- **Image label removed** at the client's request. The three placeholder photographs are still not verified HHC photos (see content-review #24) - please replace them with real HHC photographs.
- **Videos:** new video hub - one large player, numbered playlist with thumbnails, topic filters (Mother & child · Nutrition & anaemia · Ayurveda & lifestyle), Next video, YouTube link. Nothing is requested from YouTube until a video is played. Topics are our own grouping of the six existing videos.
- **English only:** no language toggle existed; all bilingual labels were removed. Video/guide titles are English with a "Gujarati" badge where the media is Gujarati; the course, blog and Rushi-Krushi pages are English (the Rushi-Krushi page is an English summary of the original Hindi text).
- **Removed:** the "What you can open on this site today" stats band, marquee, word-by-word headline reveal, sticky card stack, scroll-progress bar, parallax on the hero (less decoration, better performance, consistent palette).
- **Large monitors:** root font size scales at 1920/2400/3200 px.

## Update: bilingual site, calmer header (latest round)
- **Language switch (EN | ગુ)** in the header and the mobile bar. Implementation: every text is a `<T>English string</T>` that renders both languages; CSS (`html[data-lang]`) shows the chosen one, an inline `<head>` script applies the saved choice before first paint (no flash), pages stay fully static and work without JavaScript. Dictionary: `src/content/gu.ts`. Anything without a translation is flagged by a test, so none can be forgotten. Metadata (page titles/descriptions) is English.
- **Header:** perfectly round white logo badge (logo unaltered, clear space), white "Contact us" pill (was orange), language switch, and the liquid navbar. The nav is **flat at rest** - an orange underline marks the current section - and the liquid-glass effect appears only on hover/touch/focus (the water WebGL also starts only then). This is calmer, faster and avoids lag on weak phones.
- Mobile menu is the full-screen list (bilingual) with a Contact button, phone and email; the navbar is docked at the bottom on phones and tablets.
- Scripts: `scripts/harvest-missing-translations.mjs`, `scripts/check-external-links.mjs`.

## Update: modern menu (latest round)
Header rebuilt with **shadcn/ui Navigation Menu + Sheet** (Radix primitives `react-navigation-menu`, `react-dialog`, `react-accordion`, all MIT) in `components/ui/navigation-menu.tsx` and `sheet.tsx`; composed by `navigation/DesktopNav.tsx`, `MobileMenu.tsx`, `TabBar.tsx`. Motion is defined once (CSS tokens + `.nm-*`, `.sheet-*`, `.acc-*`). The WebGL navbar was removed from the menu (cost + stutter); the liquid accordion remains and is recoloured to the brand green with a CSS hue shift. Global smooth scrolling was removed (see QA §11). Dropdown content is lazy in the DOM, so translation coverage of the menu is verified by a test that opens every panel.

## Update: footer, map, pricing
Footer rebuilt (padding for the tab bar moved inside it); `components/cards/CentreMap.tsx` + `mapPlaces` data; `components/ui/pricing-section-3.tsx` (21st.dev template adapted), `card.tsx`, `vertical-cut-reveal.tsx`, `timeline-animation.tsx`; new dependency `@number-flow/react` (MIT). Orange removed from the interface (buttons are white).
