# QA report

**Date:** 2026-11-25 · **Build:** Next.js 16.4.6 production build (`npm run build` + `next start`) · **Browser:** Playwright Chromium 159 (headless), Lighthouse on the same Chromium.
Everything below was actually run. Items under "Not tested" were not.

## 1. Automated end-to-end suite - `npx playwright test`

**131 tests, 131 passed** (final run, after the tab-bar redesign round; `npx eslint .` also clean; the suite was run repeatedly during development and three earlier runs surfaced real failures that were fixed - see §5). Raw output: `tests/results.json` (git-ignored; regenerate by running the suite).

| Area | Tests | What is asserted |
|---|---|---|
| Routes (`tests/e2e/routes.spec.ts`) | 23 | All 19 routes: HTTP 200, exactly one `<h1>`, title, one canonical, one meta description, **no console errors, no broken images** (after scrolling to trigger lazy images). Titles unique. 404 page. `sitemap.xml` lists every route; `robots.txt` has Sitemap. |
| Responsive (`routes.spec.ts`) | 14 | **No horizontal overflow on any of the 20 routes at 320, 360, 375, 390, 412, 430, 600, 768, 820, 1024, 1280, 1440, 1920 and 2560 px** (small Android, iPhone SE/standard/Pro Max, Samsung, iPad, iPad Air, laptop, desktop, 2K/4K-class monitors). |
| Navigation (`navigation.spec.ts`) | 8 | Desktop dropdown opens/closes (click, Escape, Enter+Tab), links navigate, logo uses original asset and links home, skip link is first tab stop, hero CTAs; mobile menu opens/navigates/closes, Escape closes and restores scroll; **every internal link on every page returns < 400** (26 distinct internal link targets checked). |
| Forms (`forms.spec.ts`) | 8 | Empty submit shows errors and sends nothing; invalid phone/email; **valid submit is received by the configured destination** (mock receiver) and only then shows success; loading state; honeypot rejected (422); network failure shows an honest error with phone fallback; BVD callback form tags its topic; **with no backend configured the API returns 503 and the form shows an error - never success.** |
| Content (`content.spec.ts`) | 10 | All 8 PDFs return `application/pdf` with `%PDF` header; download buttons trigger real downloads; BVD research/media links present with `noopener`; HAM 4 packages + payment URL; **banned unverified claims absent** (31 years, 700+ experts, "is an NGO", 2023 package, birth-date minerals); illustrative images labelled; `lang` attributes for Gujarati/Hindi; tel:/mailto:; JSON-LD valid; centres page. |
| Redirects (`redirects.spec.ts`) | 10 | 8 old WordPress URLs → single 301 to new route and chain ends with 200; lower-case-hex Gujarati slug; kept URLs work with trailing slash. |
| Accessibility (`tests/accessibility/axe.spec.ts`) | 22 | **axe-core (WCAG 2.0/2.1/2.2 A + AA tags) - zero violations on all 19 routes**; reduced-motion: nothing stays hidden; **JavaScript disabled: content still readable**; keyboard focus ring present. |

## 2. Lighthouse (mobile preset, simulated slow-4G / 4× CPU, localhost, production build; final code)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` (home, full-screen hero) | **96–99** | 100 | 100 | 100 | 0.9–1.1 s | 0 | 130–230 ms |
| `/contact` | 95–97 | 100 | 100 | 100 | 0.8 s | 0 | 200–270 ms |
| `/innovations` | 94–98 | 100 | 100 | 100 | 0.8 s | 0 | 170–290 ms |
| `/about-us` | 91–94 | 100 | 100 | 100 | 0.9–1.0 s | 0 | 280–370 ms |
| `/health-awareness-videos` | **87–94** (5 runs: 94, 86, 87, 87, 94) | 100 | 100 | 100 | 2.6–3.5 s | 0 | 190–290 ms |

**Result:** ≥ 90 on every page except the video page, which sits at about 90 on average and dips to 86–87 in some runs. Its LCP is the video poster (14 KB JPEG, preloaded; ~450 ms measured without throttling), so the variation is Lighthouse's simulation, not payload. LCP ≤ 2.5 s is met on all pages except the video page. CLS is 0 everywhere.

**An important regression caught and fixed.** After adding the two WebGL "liquid" components (navbar + accordion) the first measurement was **perf 70–83 with TBT up to 3,690 ms** (headless Chrome renders WebGL in software). Fixes, all verified by re-measuring:
1. `glMode="interaction"` - both components render their built-in CSS drop/pool on load and start WebGL only on first hover / touch / focus.
2. `refraction={false}` - the SVG displacement backdrop filter (costliest part of the glass) is off.
3. `ambient={false}` - no endless render loop; water animates only while something changes.
4. Both components are loaded as separate lazily-fetched chunks (`next/dynamic`).
5. Hero is one plain `next/image` (parallax and word-reveal removed); Gujarati/Devanagari webfonts removed earlier.
Not measured: Lighthouse after the first hover (when WebGL starts). In a real browser with a GPU this is cheap; on a very old phone the first interaction may stutter briefly.

## 3. External links - `node scripts/check-external-links.mjs`

20 external links collected from the built site: **18 return 200, 0 broken, 2 unverifiable** (Facebook 400 and Instagram 429 - both serve bots a login wall; they could not be confirmed either way). `maps.app.goo.gl` and `forms.gle` redirects resolve. Links to `www.humanhealthcircle.org/<new-route>` (canonical/OG URLs) return 404 on the *current* WordPress site - expected until deployment.

## 4. Manual / visual checks performed
Viewed screenshots of: home desktop 1440 (full page) and mobile 375 (top + open menu); Health Assurance Mission 1440 and 360; Bright Vision Detector 390; Contact 390; hero and header. The mobile hero overlay was strengthened after a contrast concern. Other pages were verified structurally (tests above) but **not eyeballed at every breakpoint**; centres page 1440 screenshot was generated but not viewed.

## 5. Defects found by testing and fixed
1. Image reveal collapsed images to zero area so neither Motion's in-view observer nor native lazy-loading ever fired → images stayed blank. Fixed (inset-frame reveal).
2. Buttons used `whitespace-nowrap` → 20 px horizontal overflow on `/nutrition-calculator` at 360 px. Fixed.
3. Orange numerals on light backgrounds failed AA contrast (axe, `/centres`, `/initiatives`). Fixed (brand brown).
4. Contact/BVD LCP 4.8 s due to hydration-gated text. Fixed (CSS entrance).
5. Redirect for the Gujarati slug did not match (non-ASCII source; WordPress slug was also truncated at `-ક`). Fixed; both hex cases covered.
6. **Data error of my own:** the "Nisarg Health by HHC" Maps link was attached to Dehgam; it actually resolves to HHC's Paldi, Ahmedabad address. Corrected after reading the redirect target.
7. Old Niramay `business.site` link is dead (404) → removed.
8. Test infrastructure: shared mock server port clash in parallel workers; hydration race in mobile-menu test. Fixed.

## 6. Not tested (be aware)
- **Real enquiry delivery** (Resend/webhook to HHC's inbox) - only a local mock receiver. Must be configured and smoke-tested after deployment.
- **WooCommerce cart/checkout/my-account** and any payment - remain on WordPress and were not touched or tested; `hhcnutrition.com` payment and calculator not exercised.
- **YouTube player playback** inside the facade (thumbnails/links only).
- Firefox, Safari, real iOS/Android devices; touch interaction beyond viewport emulation; screen readers (NVDA/VoiceOver); high-contrast mode; Lighthouse desktop; Lighthouse on pages not listed above; load testing.
- Page transitions (not implemented - see implementation summary).
- The design reference image (not accessible - see audit).

## 7. Added: link audit (`outdated-link.txt`)
288 distinct URLs from the old site (content, nav, media library) and the new site were requested: 280 returned 200; 5 are 404 (retired Niramay business.site ×2, Wikipedia red-links ×2 copied into old faculty bios, and a `fonts.gstatic.com` preconnect that is not a page); 2 are `xmlrpc.php` 403 (intentional); Instagram 429 / Facebook 400 are bot walls. The register also lists live-but-outdated items (2023 course/fee, expired package, etc.). **The links themselves were not edited.**

## 8. Added: code-quality fixes from ESLint
Header menus now reset on navigation via render-time state adjustment (was `setState` in an effect); parallax offset applied through a callback instead of mutating a ref prop; unused import and an unreachable assertion in a test removed; default Next template SVGs deleted.

## 9. Added in the navigation / video / English-only redesign
New or rewritten tests: liquid-navbar (desktop links, active section on sub-pages, keyboard Enter, Contact button, logo), **docked mobile/tablet navbar at iPhone SE 375, Samsung 412, iPhone Pro Max 430 and iPad 768 (fully inside the viewport, at the bottom, all five links usable)**, full-screen menu, **video hub** (player, 6-item playlist, topic filter, nothing loads from YouTube until play, autoplay URL, Next video, compact player on home), **hero is edge-to-edge and fills the screen height**, **no "Illustrative image" labels**, **English-only (no Gujarati/Devanagari characters, no `lang` overrides, no language switcher)**, stats band removed.
Defects found and fixed in this round: docked nav labels wrapped on tablets (a `left-1/2` fixed box shrink-wrapped to half the screen); docked nav covered the hero buttons on phones; heading-order violation on the video page; reduced-motion test counted intentionally collapsed accordion answers (test narrowed); typography too small on 2560 px monitors (root font-size now scales at 1920/2400/3200 px).
Still not tested: real devices (the iPhone/Samsung checks are viewport emulation), Safari/Firefox (the WebGL water has a CSS fallback but was only verified in Chromium), screen readers.

## 10. Bilingual (English + Gujarati), header and navigation polish
**Tests added (`tests/e2e/language.spec.ts`, 8):** defaults to English with no Gujarati visible; switching translates the page, menu and footer; the choice persists across reload and pages and switches back; HHC's own Gujarati video/guide titles are used; Gujarati form validation messages; **every string on every route (and the 404) has a Gujarati entry** (`data-l-missing` count = 0); **no horizontal overflow in Gujarati mode at 320/360/390 px on all routes**; the nav is flat at rest and the glass appears on hover; the logo badge is a perfect circle with the logo inside it. Also `node scripts/harvest-missing-translations.mjs` (reports 0 untranslated strings).
**Defects found and fixed:** language buttons failed WCAG *label-in-name* (axe, all pages) → visible "EN"/"ગુ" with screen-reader text; the nav drew a glass pill + blob at rest (client report) → flat at rest on desktop and phones, effect only on interaction; logo sat in an oval plate that crowded the artwork → round white badge; loud orange Contact pill → white pill; `setState`-in-effect and DOM-write lint errors in the language switch → external-store subscription + module-level setter.
**Lighthouse after this round (mobile, simulated):** home 94–98 · About 96–99 · Contact 94–95 · videos **88–89** (LCP 3.1–3.7 s) · A11y/Best-practices/SEO 100 on all. Bilingual markup doubles the text in the HTML but did not move the scores materially.
**Hydration warning reported by the client:** the listed differences are all `bis_skin_checked` / `bis_register` / `__processed_…` attributes injected by a browser extension (Bitdefender-style). Re-tested in dev mode in a clean browser: **zero hydration warnings and zero console errors**, English and Gujarati, 6 pages each. Fix on the client side: disable the extension for localhost or use a private window.
**Not tested:** native-speaker review of the Gujarati; Gujarati rendering on every OS (system fonts are used: Noto / Nirmala UI / Shruti / Sangam MN).

## 11. Modern menu, smoothness, text size (latest round)
**Root causes of the "stuck / buggy" feel, both confirmed by measurement and fixed:**
1. `html { scroll-behavior: smooth }` — Next.js 16 no longer overrides it during route changes (documented in its v16 upgrade guide), so *every* menu click glided slowly to the top of the next page. Removed; a test asserts `scroll-behavior` is `auto` and the next page starts at the top within 700 ms.
2. The liquid-water navbar compiled its WebGL shader on the first touch: **~190 ms of main-thread blocking on a 4×-throttled phone CPU** (136 + 51 ms). The new tab bar is plain links + CSS: **0 ms** on first tap. Opening the drawer: ~97 ms single task on the throttled CPU (was 64 ms for the old overlay, which was much less capable).
**New menu (shadcn/ui patterns on Radix, MIT):** desktop = Navigation Menu with animated shared dropdown panels (icons, descriptions, call strip), hover-intent and keyboard support; phone/tablet = Sheet drawer with accordion groups (focus trap, Escape, scroll-lock with no layout shift, focus restored) + bottom tab bar where only the active tab shows its label on phones and all labels show from 768 px.
**Tests (121):** desktop panels open on hover and navigate; keyboard (Enter/Tab/Escape); current section marked on sub-pages; tab bar fully on-screen and working at 375 / 412 / 430 / 768 px; drawer opens, expands, navigates, closes; Escape closes, scroll locks, focus returns to the button; Contact, language switch, phone and email are in the drawer; *every string inside the dropdown panels and the drawer is translated* (panels are not in the HTML until opened, so this opens each one).
**Defects found and fixed this round:** dropdown panel clipped its right edge (flex item shrank below Radix's computed width → `shrink-0`); truncated tab labels on phones → expanding active tab; crowded labels on tablets → all labels only from 768 px.
**Text size audit (all 19 routes at 390 and 1440 px):** everything was ≥ 14 px except small uppercase labels and badges (12–12.5 px); these were raised to 13 px (counts 14 px). **Motion:** durations unified onto one scale (150 / 200 / 300 / 500 ms, defined as CSS tokens).
**Lighthouse (mobile, simulated, final):** home 97–98 · About 99–100 · Contact 99–100 · videos 90–95 (LCP 2.9–3.6 s); A11y / Best-practices / SEO 100. Removing the WebGL navbar raised every score.
**Not verified:** the provided liquid navbar file is kept in `components/ui` but no longer used by the menu; only the liquid *accordion* (home "ways we work") still uses WebGL. I did not browse 21st.dev / Untitled UI / HeroUI etc. live — shadcn/ui patterns were used; nothing was copied from other libraries, so no extra licence review was needed.

## 12. Footer, white buttons, orange removed (latest round)
- **Footer** rebuilt compact: brand + contact on one side, link groups on the other (2 columns on phones), slim bottom bar with the socials. Height **754 → 551 px (desktop), 1,578 → 1,106 px (390 px phone)**. The "Health information on this site is educational…" line was removed at the client's request (a similar sentence on the E-books page, "These guides are for general education…", was left in place — say if it should go too).
- **Buttons:** the orange "accent" button variant was replaced by a white one (`variant="white"`) on the hero, Bright Vision Detector feature and the dark enquiry form. **Orange removed from the interface** (eyebrows, bullets, play buttons, notices, nav underline, footer icons); the focus ring is now brand sage (white on dark bars). The logo's own colours are untouched. `--color-accent` remains only as an unused token.
- **Systems of care** list (Ayurveda … Yoga) is now compact chips; the stray right-aligned orange dashes are gone.
- Also fixed: 17 byte-identical duplicate entries in `src/content/gu.ts` that failed type-checking.
Visually verified at 1440 and 390 px (footer, hero, systems section). Lighthouse was not re-run for this round (changes are markup/colour only).

## 13. Footer gap, Centres map, pricing section (latest round)
- **Footer gap (client report) — real bug, fixed:** on phones the page had 96 px of bottom padding *outside* the footer (reserved for the tab bar), leaving an empty cream strip under the green footer. The padding now lives inside the footer. A test asserts there is ≤ 1 px between the footer's bottom and the end of the page at 390 and 1440 px. The footer was also redesigned (one rounded panel: brand, phone/email buttons, link groups; hover arrows; slim bottom bar with socials).
- **Centres map:** a place picker (Ahmedabad · Paldi, Ahmedabad · Sola, Dehgam, Organic farm · Jindva) with an embedded Google map (no API key, lazy-loaded), "Get directions" and "Open in Google Maps" (new tab, `noopener`). The pin is Google's own search of HHC's published address (verified live: the Paldi listing resolves to the real "Human Health Circle" entry), so the page says the position is approximate. Vadodara and Anand have no address, so no map. Tests cover every place's embed URL, the links, and Gujarati for each place.
- **Pricing (Health Assurance Mission):** rebuilt from the 21st.dev *pricing-section-3* template using HHC's real packages (Free / ₹100 / ₹1,000 / ₹5,000 per year), with shadcn `Card`, a vertical-cut-reveal heading and staggered reveal (own `timeline-animation`, since the template's file was not supplied) and a NumberFlow count-up. **Deliberately removed from the template:** the Monthly/Yearly switch and "Popular" badge (HHC only states yearly prices; nothing was invented). "Most complete" marks Platinum because it includes every feature of the lower tiers. A test fails if "Popular" or any monthly price appears.
- **Accessibility finding:** NumberFlow draws digits inside a shadow root and exposes no accessible name, so a screen reader would have skipped the price. The real price is now always present as screen-reader text and the animated digits are `aria-hidden`.
- **Test infrastructure:** em-dashes typed into some regexes were being flattened to hyphens; they now use `\u2014`. 
- **Lighthouse (mobile, simulated):** Centres **100** (map is below the fold and lazy) · Packages 98–99 (one outlier run 82) · Home 97–99 (one outlier run 89). The outliers coincided with a busy machine and a stuck ~4 s LCP on text whose real paint time is < 100 ms — treat as simulation noise; repeat runs on an idle machine are consistently 97–99.
- Licences: `@number-flow/react` MIT; framer-motion was **not** added (the template's imports were pointed at the existing `motion/react`).

## 14. Liquid Glass tab bar, Explore menu, Packages in the menu, heading bug (latest round)
- **Heading bug (client screenshot) — root cause confirmed and fixed.** The "Choose your package" heading was clipped to its descenders in the client's dev browser. Cause: `vertical-cut-reveal` guarded its start timer with an "already started" ref; React **Strict Mode** (dev only) mounts → unmounts → remounts effects, which cancelled the timer and then skipped the restart, so the letters stayed hidden. Production never showed it, which is why earlier tests passed. Fixed (no guard) and verified **against the dev server**: all letters finish with no transform, English and Gujarati, 0 console errors. The heading is also readable without JavaScript (noscript rule). Section spacing was tightened (112 → 88 px desktop, 72 → 56 px mobile) because large padding stacked into oversized gaps.
- **Packages in the menu (client request):** desktop menu now has a **Packages** link to the right of Resources (jumps to `#packages`, highlighted while on that page) and "Packages & pricing — Free to ₹5,000 a year" inside the Our Work panel. Tests: position right of Resources, anchor scroll, current-state, back/forward.
- **Liquid Glass tab bar (phones/tablets):** Home · Our Work · **Packages** (prominent white pill) · Resources · **Explore**. Glass = backdrop blur + saturation, specular top/bottom/left/right edge highlights, a **magnifying lens** under the active tab with **velocity-reactive squash-and-stretch spring**, icon magnification, press/active states, arrow/Home/End keyboard navigation, reduced-motion support. **Honest note:** this is a *recreation from the public description* of 21st.dev's "Liquid Glass Tab Bar" (by Pedro, MIT). The source needs a 21st.dev API key and could not be retrieved, so **no original code was used** and refraction is *not* the original's. SVG/WebGL refraction was deliberately not used (jank on scroll, and the client asked for no stutter). If the client runs `npx shadcn@latest add "https://21st.dev/r/pedro21062014/liquid-glass-tab-bar?api_key=…"` or pastes the code, the original can replace `LiquidTabBar.tsx`.
- **Bug found by a test and fixed:** the lens stayed at width 0 on first paint (values set before Motion's lazily loaded features arrive never reach a motion component). The lens now writes its transform directly from the spring values.
- **Explore panel:** bottom sheet (Radix Dialog): Home, then About HHC / Our Work / Innovations / Resources as grouped tiles with icons (descriptions from 640 px), current page highlighted, Contact, language switch, phone and email. Closes on selection and Escape, locks scroll, returns focus. It replaces the hamburger (no duplicate menus). Tests open it and check every link is present, the highlight, Gujarati coverage, focus return.
- **NOT built — Donate:** HHC has no donation page, payment facility or stated legal status, and placeholder links were ruled out. The prominent action is Packages instead. Gallery, Events, Success Stories, News, Our Impact and Become-a-Member pages do not exist on HHC's site and were not invented (Volunteer/membership = Health Assurance Mission).
- Lighthouse (mobile, simulated, 3 runs each): **home 99–100 · Packages 100 · About 100**, A11y/Best-practices/SEO 100.

## 15. "Buggy" mobile bar: root cause, redesign (latest round)
**Analysis of the client's three screenshots (reproduced):**
1. **Taps swallowed — real cause:** in `next dev`, Next's dev overlay badge (`<nextjs-portal>`, bottom-left "N / 1 Issue") sat on top of the Home tab; a Playwright tap on Home timed out with *"nextjs-portal … intercepts pointer events"*. Only tabs the badge did not cover (e.g. Menu, far right) responded. Fixed with `devIndicators: false` (errors still surface). Dev-only; production never had it. Verified on the dev server afterwards: all tabs navigate and highlight.
2. **"Buggy" motion — design flaw of mine:** the active tab *expanded* while the lens chased a moving target, and inactive tabs had no labels. Now five **equal-width** tabs, icon + label on every tab (icon-only below 360 px), a fixed-width lens, raised centre Packages button.
3. **Feedback:** a tapped tab highlights immediately (optimistic), and a thin progress line shows when a page change is not instant (covers first-visit compile delay in dev).
**Menu panel redesigned:** "Menu" title, featured Packages card, grouped single-column lists (Discover, Our Work, Innovations, Resources) with icon, label, two-line description, current page marked with a check; Contact, language, phone and email pinned at the bottom.
**Tests (131):** every tab labelled and un-clipped at 375 / 412 / 430 / 768 px, equal widths, instant highlight under a delayed network, progress line appears and disappears, full menu contents, lens position, keyboard, Gujarati menu. **Defects found and fixed:** "Resources" truncated at 375 px; Home row used an external-link icon; descriptions cut to one line.
**Not tested:** real phones (viewport/touch emulation only), iOS Safari rendering of the backdrop blur.
