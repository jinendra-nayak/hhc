# Content requiring HHC review / approval

Items below are **not published as fact** on the new site unless noted. Priority: 🔴 blocks launch · 🟠 should resolve · 🟡 nice to confirm.

## Identity & legal
| # | Item | Source | Issue | How the new site handles it |
|---|---|---|---|---|
| 1 | 🔴 Legal status | Home: "HHC … is Proprietorship firm." Home-2: "voluntory organizations" | A proprietorship is not an NGO/trust. The brief assumes an NGO. | Site calls HHC a "community health initiative" / "health circle"; the words *NGO, trust, registered, charity* are **not used**. No 80G/12A/FCRA claims. Footer carries `legalStatus` placeholder in `src/content/site.ts`. |
| 2 | 🔴 "31 years" | Home | `home-2` says 10 years (and team experience 30 years). Cannot both be true. | Not shown as an HHC claim. Impact section shows only items countable from this audit (see #4). |
| 3 | 🔴 "700+ experts" | Home | Unsourced; no list exists. | Not shown. |
| 4 | 🟠 Impact statistics | - | No verifiable figures exist on the live site. "No. of families joined: 0+" is literally zero. | Impact band shows **verified inventory counts** (6 videos, 5 working methods, 4 centres named, 2 e-books) - things provable from the site, not outcomes. |
| 5 | 🟠 Bright Vision Detector entity | BVD page | Product sold/operated by **Prakhar Innovations LLP**, not HHC. | Page states this plainly. |
| 6 | 🔴 BVD claims | BVD page | "world-first … revolutionize health diagnostics" unsupported; no regulatory status, intended use or evidence summary. | Original wording is kept, quoted and attributed to Dr. Rajesh Mehta; no extra benefits added. Research links preserved. |

## Contacts
| 7 | 🟠 Phone numbers | Pages show +91 99099 68495; 89800 35463 (home-2); 94285 03295 (Dr. Mehta); 75748 13972 (HAM); 92651 66567 (courses); 81416 04347 (2022 camp poster) | Different numbers per page; unclear which is current. | Primary: `+91 99099 68495` + `humanhealthforall@gmail.com` (only ones on every page header). Others kept on the pages where they originally appeared. |
| 8 | 🟡 Email | Gmail address | Fine, but a domain email would be more credible. | Used as-is; contact form recipient configured by env. |
| 9 | 🔴 Postal addresses | Old homepage Maps links; Dec 2022 posters | **Vadodara and Anand: no address anywhere.** Ahmedabad has two sources: Paldi (23 Shardanagar Society… 380007, from the Google Maps listing behind "Nisarg Health by HHC") and Niramay Tirth, Sola (poster). Dehgam: only the Dec 2022 Panchakarma poster ("Pandya Hospital, near Hotel Vrajbhumi, Lakhajina Muvada, Dehgam–Bayad Road"). Organic farm: Maps shows "Jindva". | All shown with their source; Dehgam flagged "please confirm"; Vadodara/Anand say "address awaiting HHC". |
| 9b | 🟠 Dead link | Old homepage "Niramay Holistic Health" button → `niramayarogyasevamandir.business.site` | Returns **404** (Google Business Sites were retired). | Link removed. Please supply a working page. |

## Centres
| 10 | 🟠 Centre names | Home buttons: "Niramay Holistic Health", "Nisarg Health By HHC", "Nisarg Organic Farm By HHC"; text: Ahmedabad, Dehgam, Vadodara, Anand | I initially mapped "Nisarg Health" to Dehgam - **wrong**; its Maps link is the Paldi, Ahmedabad address (corrected). Whether "Nisarg" / "Niramay" are centre names, brands or the same place as "HHC Ahmedabad" is unclear. | Named as on Google Maps; no services claimed per place. Please confirm names. |
| 11 | 🟠 Services per centre | "Ayurveda, Naturopathy, Allopathy, Homeopathy, Yoga Center" | Brief lists these but live site states only "a special package for … Center". Which centre offers what is unknown. | Shown as "systems of care HHC works with", not per-centre services. |

## Dated / promotional content
| 12 | 🟠 "HHC Health & Wealth 2023" package | Home | Expired year; no package details exist anywhere. | Dropped from homepage. |
| 13 | 🟠 Life Style Management course (Jan–Mar 2023, ₹12,500/₹9,500) | /hhc-course/ | Fully past. AM/PM inconsistency between languages. | Shown as "Past course – archive" with original details; **no active "apply" button**. Google Form link preserved as archive reference. |
| 14 | 🟠 Rushi Krushi (May–Oct 2023) | /rushi-krushi/ | Past; agriculture-focused. | Archived page, Hindi text preserved. |
| 15 | 🟠 Free Ayurveda camp 17–18 Dec 2022 | post | Past event. | Shown only as a dated past-camp example on the Initiatives page with poster; named doctors **not** repeated outside the poster image. |
| 16 | 🔴 Health Assurance Mission tiers & prices (₹100/1000/5000, "10–20% medicine", "Vit A free") | /health-assurance-mission/ | Commercial entitlements need confirmation; payment goes to another domain. | Kept as-is (including the exact link `hhcnutrition.com/pay/hhcpay`), prefaced "Confirm current terms with HHC". |
| 17 | 🟠 Counter "families joined = 0+" | HAM | Shows zero. | Removed. |

## Medical claims (not republished)
| 18 | 🔴 Nutrition software claims | /nutrition-advance-software/ | "biochemic minerals … as per your birth date… unique mineral for prevention as well as early recovery"; "Naturopathy Protocols: Diet and procedures as per the illness". Unsupported clinical claims. | Page describes the tool neutrally (nutrient look-up and diet analysis). Birth-date minerals and illness protocols omitted pending clinical sign-off. |
| 19 | 🟠 Camp poster condition list | Free-camp poster | Lists conditions the camp "treats". | Not reproduced as text. |
| 20 | 🟠 Education PDFs & ebooks | Gujarati PDFs | Content not reviewed by me (language/clinical accuracy). | Linked, not rewritten. |

## Third-party people
| 21 | 🔴 Rushi Krushi faculty bios (~22 people) | faculty page | Copied-looking text with citation marks; awards ("Padmashri", PM awards, Limca record) and public-office claims unverified; personal consent unknown. | Page lists names and one-line roles only, and is marked for approval. |
| 22 | 🟠 Dr. Rajesh Mehta credential | BVD + faculty pages | "MBBS, MD, Former Dean GMERS Medical College Sola" vs "Dean of Sola Civil Hospital" - **inconsistent titles**. | Only the BVD wording is used, attributed. |
| 23 | 🔴 "Our Team" section | - | No verified team page exists. | No team page was created. The homepage shows only 3 people credited in HHC's own materials, each with its source (Dr. Rajesh Mehta, Hema Mehta, Vaidya Dr. Shivaniben Patel). **Please approve or remove.** |

## Imagery
| 24 | 🔴 Photography | `doc-image/*` and old site | Provided images 2 (village camp) and 3 (herbs) appear AI-generated; image 1 appears stock. Old-site `home-image-1`, `about-image-*`, `gallery-*`, `contact-image-*` are **Education Hub theme demo photos**, not HHC. | Provided images are used only as **clearly-labelled placeholders** (listed in `src/content/images.ts` with `placeholder: true`) and must be replaced with HHC's real photographs before launch. No images are presented as HHC events. Actual HHC creatives (camp poster, product images, course posters) are used with their real meaning. |
| 25 | 🟠 Image licensing | - | Licence/ownership of provided images unknown. | Replace/confirm. |

## Other
| 26 | 🟠 Language | Gujarati, Hindi, English | Site is multilingual in content, but no locale routing. | Gujarati/Hindi content preserved in place with `lang` attributes. Full i18n routing not built. |
| 27 | 🟠 Social handles | YouTube /c/HumanHealthCircle, Instagram @humanhealthforall, Facebook humanhealthcircle | Not tested logged-in. | Used as-is. |
| 28 | 🟡 Nutrition Advance Play Store app "MY HHC" | text only | No link found. | Mentioned without link. |

## Added during implementation
| # | Item | Issue |
|---|---|---|
| 29 | 🟠 "Illustrative image" labels | Three placeholder images carry a visible label. Replace with HHC's own photographs and remove the label. |
| 30 | 🟠 Education PDF "ઘરગથ્થુ ઉપચારો" (home remedies) | Listed on the old Education Material page but has **no PDF** - omitted. Supply the file if it exists. |
| 31 | 🟠 Nutrition Advance Download Manager package #529 | The old `/nutrition-advance-online/` page was only a WP Download Manager widget; its file could not be retrieved without admin access. |
| 32 | 🟠 Course timing inconsistency | LSM Gujarati page says 8–9 **PM**, English page 8–9 **AM**. Shown with a note. |
| 33 | 🟠 Dr. Rajesh Mehta titles | "Former Dean, GMERS Medical College, Sola" (BVD page) vs. "Dean of Sola Civil Hospital Ahd" (faculty page). BVD wording used. |
| 34 | 🟡 Post "HHC Health Package 2023" | Expired offer (register before 25 Dec 2022); listed as archive only. |

## Added in the latest round
| # | Item | Issue |
|---|---|---|
| 35 | 🔴 Image label removed | The "Illustrative image" labels were removed at the client's request. The hero, the village-camp photo and the herbs photo are **still not verified HHC photographs** (two appear AI-generated). Without a label, visitors may read the village-camp picture as an HHC event. Replace them with HHC's own photographs. |
| 36 | 🟠 English-only | Gujarati/Hindi text was removed from the site. The Hindi Rushi-Krushi course text is now an English *summary* written from the original - please check its wording. The camp page's Gujarati text was replaced with English facts taken from the poster (date, time, place, organisers). |
| 37 | 🟠 Video topics | The three video topics are my grouping of the six videos; titles are English renderings of the Gujarati titles. Please confirm. |
| 38 | 🟠 Stats band removed | "5 ways / 6 videos / 6 guides / 4 cities" band deleted from the homepage. |

## Bilingual site (English + Gujarati)
| # | Item | Issue |
|---|---|---|
| 39 | 🔴 Gujarati translations | A language switch (EN | ગુ) was added and **all pages are translated** (`src/content/gu.ts`, 420 entries). HHC's *own* Gujarati was reused verbatim for the six video titles, four guide titles, two e-books, the camp name and the camp address text (from the previous website and posters). **Everything else is a new translation by the assistant and must be reviewed by a native Gujarati speaker before launch** (tone, medical terms, official names). |
| 40 | 🟠 Reverses #36 | The earlier English-only change was reversed at the client's request. The Rushi-Krushi page is still an English *summary* of the Hindi original (with a Gujarati rendering of that summary) - the original Hindi is not shown. |
| 41 | 🟠 One URL, two languages | Both languages live on the same URL, chosen by a switch and remembered on the device. Search engines therefore see both languages on one page. If Gujarati search ranking matters, separate `/gu/...` URLs can be added later. |
| 42 | 🟡 Names | Person and place names are transliterated (e.g. ડૉ. રાજેશ મહેતા). Please confirm preferred spellings. |
| 43 | 🟠 "Innovations" in Gujarati | Written as **સર્જનાત્મક** (nav) and "સર્જનાત્મક નવીનતા(ઓ)" in headings, at the client's request. "નવીન શોધ" is an alternative that means "new inventions" more literally — a native speaker should choose. |
| 44 | 🟠 Map pins | Pins come from Google searching the published addresses, not from coordinates HHC supplied. The Dehgam pin (from a 2022 poster address) and the Jindva farm pin should be checked by HHC. |
| 45 | 🟠 Pricing | Packages are shown exactly as on the old site (yearly only). "Most complete" on Platinum is a factual description (it includes all features); please confirm current terms and prices. |
| 46 | 🔴 Donate | The brief asks for a Donate action. HHC's site has no donation page, payment facility or registered legal/charity status, so none was added. If HHC wants donations it must supply the destination (and its legal status, e.g. 80G/12A if applicable). |
| 47 | 🟠 Missing sections | Gallery, Events, News, Success Stories and Our Impact do not exist on HHC's website; they are not in the menu. They can be added when HHC provides real content. |
