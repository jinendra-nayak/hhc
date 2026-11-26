/**
 * Single source of truth for facts shown on the site.
 * Every value comes from the live humanhealthcircle.org audit (docs/website-audit.md).
 * Anything uncertain is listed in docs/content-review-needed.md - do not add facts here
 * that HHC has not confirmed.
 */
export const site = {
  name: "Human Health Circle",
  shortName: "HHC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.humanhealthcircle.org",
  tagline: "Health knowledge, carried to where people live.",
  description:
    "Human Health Circle (HHC) brings basic health knowledge to communities through training, health education material, medical camps and holistic care - Ayurveda, Naturopathy, Allopathy, Homeopathy and Yoga.",
  email: "humanhealthforall@gmail.com",
  phone: { display: "+91 99099 68495", tel: "+919909968495" },
  // Legal status intentionally NOT stated: the live site says "Proprietorship firm" - awaiting HHC.
  legalStatus: null as string | null,
  social: {
    youtube: "https://www.youtube.com/c/HumanHealthCircle",
    instagram: "https://www.instagram.com/humanhealthforall",
    facebook: "https://www.facebook.com/humanhealthcircle",
  },
  external: {
    nutritionCalculator: "https://hhcnutrition.com/",
    nutritionRegister: "https://hhcnutrition.com/register-now",
    nutritionLogin: "https://hhcnutrition.com/login",
    nutritionOffline: "http://myhhc.in/nutrition/",
    missionPayment: "https://hhcnutrition.com/pay/hhcpay",
    lifestyleScoreForm: "https://forms.gle/Qq8s3vQmdwX43x4m8",
    courseForm: "https://forms.gle/YTHuYbor1qcoadfJ8",
  },
} as const;

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href?: string; items?: NavItem[] };

export const nav: NavGroup[] = [
  {
    label: "About HHC",
    items: [
      { label: "About Us", href: "/about-us", description: "Who we are and how we work" },
      { label: "Our Centres", href: "/centres", description: "Where to find HHC" },
      { label: "Media", href: "/media", description: "Posters, courses and updates" },
    ],
  },
  {
    label: "Our Work",
    items: [
      { label: "Community Initiatives", href: "/initiatives", description: "Training, camps, IEC material" },
      { label: "Health Assurance Mission", href: "/health-assurance-mission", description: "Volunteer & membership packages" },
      { label: "Packages & pricing", href: "/health-assurance-mission#packages", description: "Free to ₹5,000 a year" },
      { label: "Courses", href: "/hhc-course", description: "Lifestyle Management & Rushi-Krushi" },
    ],
  },
  {
    label: "Innovations",
    items: [
      { label: "Innovations overview", href: "/innovations", description: "Products and tools developed with HHC" },
      { label: "Bright Vision Detector", href: "/bright-vision-detector", description: "Vitamin A detection device" },
      { label: "Nutrition Calculator", href: "/nutrition-calculator", description: "Nutrition Advance software" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Resources overview", href: "/resources", description: "Everything free to read, watch and download" },
      { label: "Education Material", href: "/education-material", description: "Gujarati health guides (PDF)" },
      { label: "E-books", href: "/e-books", description: "First aid & herbal guides" },
      { label: "Health Awareness Videos", href: "/health-awareness-videos", description: "Gujarati videos on YouTube" },
      { label: "Products", href: "/products", description: "Product catalogue (PDF)" },
      { label: "Blog", href: "/blog", description: "News, updates and archive" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/**
 * Primary navigation (liquid navbar). Each entry lists the paths that belong to its section so the
 * active item stays highlighted on sub-pages. Sub-pages are reached from each section's hub page,
 * the full-screen menu on small screens, and the footer.
 */
export const primaryNav = [
  { label: "Home", href: "/", match: ["/"] },
  { label: "About HHC", href: "/about-us", match: ["/about-us", "/centres", "/media"] },
  { label: "Our Work", href: "/initiatives", match: ["/initiatives", "/hhc-course", "/rushi-krushi", "/rushi-krushi-list-of-faculties"] },
  { label: "Innovations", href: "/innovations", match: ["/innovations", "/bright-vision-detector", "/nutrition-calculator"] },
  { label: "Resources", href: "/resources", match: ["/resources", "/education-material", "/e-books", "/health-awareness-videos", "/products", "/blog"] },
  { label: "Packages", href: "/health-assurance-mission#packages", match: ["/health-assurance-mission"] },
] as const;

export const footerLinks = {
  Organisation: [
    { label: "About Us", href: "/about-us" },
    { label: "Our Centres", href: "/centres" },
    { label: "Community Initiatives", href: "/initiatives" },
    { label: "Health Assurance Mission", href: "/health-assurance-mission" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Education Material", href: "/education-material" },
    { label: "E-books", href: "/e-books" },
    { label: "Health Awareness Videos", href: "/health-awareness-videos" },
    { label: "Nutrition Calculator", href: "/nutrition-calculator" },
    { label: "Blog", href: "/blog" },
  ],
  More: [
    { label: "Innovations", href: "/innovations" },
    { label: "Bright Vision Detector", href: "/bright-vision-detector" },
    { label: "Courses", href: "/hhc-course" },
    { label: "Rushi-Krushi", href: "/rushi-krushi" },
    { label: "Products", href: "/products" },
  ],
};

/** Five working methods - from the live About Us page, edited for clarity. */
export const methods = [
  {
    id: "training",
    title: "Health training",
    body: "We train community members and NGO health workers, in an easy, demonstrative style shaped around the needs of each area. It is our first and most widely used way of raising awareness.",
  },
  {
    id: "iec",
    title: "Health education material (IEC)",
    body: "Manuals and posters are prepared for different subjects, keeping the cultural diversity of each area in mind, and displayed in the community where people can see and use them.",
  },
  {
    id: "camps",
    title: "Medical camps",
    body: "With trained professionals, camps are held at the doorstep of communities where awareness of health is low or infrastructure is limited.",
  },
  {
    id: "kits",
    title: "First-aid and medical kits",
    body: "Where primary health care is unavailable or far from home, we prepare kits and hand them to a village health worker who has been trained to use them properly.",
  },
  {
    id: "young",
    title: "Educating young people",
    body: "School and college students, children playing in the street or working in a field - we reach them through games, slogans and stories, so healthy habits are understood at the right age.",
  },
] as const;

export const systemsOfCare = ["Ayurveda", "Naturopathy", "Allopathy", "Homeopathy", "Yoga"] as const;

export const videoTopics = ["Mother & child", "Nutrition & anaemia", "Ayurveda & lifestyle"] as const;
export type VideoTopic = (typeof videoTopics)[number];

/** All six videos are in Gujarati (YouTube IDs verified via oEmbed during the audit). */
export const videos: readonly { id: string; title: string; topic: VideoTopic; presenter?: string }[] = [
  { id: "kH7qBEwuHAM", title: "Shishu Mangal - part 1", topic: "Mother & child" },
  { id: "OJgy4mgbMbw", title: "Pregnant women and anaemia", topic: "Mother & child" },
  { id: "I69hG3XsR_Q", title: "Anaemia caused by iron deficiency", topic: "Nutrition & anaemia" },
  { id: "OqiNp2Wmxhc", title: "Useful nutrients: iron, folic acid and vitamin B12", topic: "Nutrition & anaemia" },
  { id: "cZ3KIrlwljs", title: "Chyawanprash, the winter tonic", topic: "Ayurveda & lifestyle" },
  { id: "LBcZeTLAumQ", title: "Ayurvedic daily routine", topic: "Ayurveda & lifestyle", presenter: "Vaidya Dr. Shivaniben Patel" },
];

export const documents = {
  education: [
    { title: "Cleanliness everyone loves", file: "/documents/saune-game-swachhata.pdf", pages: 84, mb: 0.6, language: "Gujarati" },
    { title: "Healthy lifestyle", file: "/documents/swasth-jivanshailee.pdf", pages: 35, mb: 3.5, language: "Gujarati" },
    { title: "Addiction-free life", file: "/documents/vyasanmukt-jivan.pdf", pages: 36, mb: 2.2, language: "Gujarati" },
    { title: "Golden rules of good health (35 points)", file: "/documents/35-points-tandurasti.pdf", pages: 2, mb: 0.1, language: "Gujarati" },
  ],
  ebooks: [
    { title: "First Aid", file: "/documents/first-aid.pdf", pages: 102, mb: 10, language: "Gujarati" },
    { title: "Dodi (Jivanti): health benefits", file: "/documents/dodi-jivanti.pdf", pages: 5, mb: 1.5, language: "Gujarati" },
  ],
  products: { title: "Food products and Ayurveda medicines catalogue", file: "/documents/all-products.pdf", pages: 2, mb: 3.3, language: "" },
  vitaminA: { title: "Vitamin A Deficiency Detector information sheet", file: "/documents/vitamin-a-deficiency-detector.pdf", pages: 5, mb: 2.5, language: "" },
} as const;

export const bvd = {
  entity: "Prakhar Innovations LLP",
  signedBy: "Dr. Rajesh Mehta, MBBS, MD",
  signedRole: "Former Dean, GMERS Medical College, Sola, Ahmedabad",
  phone: { display: "94285 03295", tel: "+919428503295" },
  links: [
    { label: "Research paper", href: "https://drive.google.com/file/d/1_NJEExFq33KkVwN8_NQUA69uK6yVBod4/view" },
    { label: "News cuttings", href: "https://drive.google.com/file/d/1KFBgJBkXIt3HaA06x6vWevnBW6RlJ_qw/view" },
    { label: "Online media coverage", href: "https://drive.google.com/file/d/1qeGDUY221MubGDzhRW0IbAoXKauA_30g/view" },
    { label: "Importance of vitamin “A” and the Bright Vision Detector", href: "https://drive.google.com/file/d/1pNI4qMEOw3h6AfHgq9y_qdTKO1cJbue7/view" },
  ],
} as const;

export type CentreLocation = {
  name: string;
  address: string | null;
  source: string;
  links: readonly { label: string; href: string }[];
};

/**
 * Locations come from (a) Google Maps listings linked on the old homepage and (b) addresses printed on
 * HHC's own December 2022 posters. Nothing here is invented. See docs/content-review-needed.md #9–11.
 */
export const centres: readonly { id: string; city: string; locations: readonly CentreLocation[] }[] = [
  {
    id: "ahmedabad",
    city: "Ahmedabad",
    locations: [
      {
        name: "Human Health Circle / Nisarg Health by HHC",
        address: "23 Shardanagar Society, behind Mangaltirth, near Shreyash Crossing, Paldi, Ahmedabad 380007",
        source: "Address from HHC’s Google Maps listing (linked from the previous website).",
        links: [{ label: "Open in Google Maps", href: "https://maps.app.goo.gl/2q1qUTDLw2L87FeP6" }],
      },
      {
        name: "Niramay Tirth Arogya Seva Kendra",
        address: "Shri Bhagwat Vidyapith Campus, S.G. Highway, near Sola Civil Hospital, Ahmedabad",
        source: "Address printed on HHC’s December 2022 camp posters.",
        links: [],
      },
    ],
  },
  {
    id: "dehgam",
    city: "Dehgam",
    locations: [
      {
        name: "HHC, Dehgam",
        address: "Pandya Hospital, near Hotel Vrajbhumi, Lakhajina Muvada, Dehgam–Bayad Road, Ta. Dehgam, Dist. Gandhinagar",
        source: "Address printed on HHC’s December 2022 Panchakarma camp poster. Please confirm it is current.",
        links: [],
      },
    ],
  },
];

/**
 * Places that can be shown on a map. `query` is what Google Maps searches for (so the pin comes from Google's own
 * geocoding of the addresses already published by HHC); nothing here is a new fact. Vadodara and Anand have no
 * address yet, so they have no map.
 */
export const mapPlaces = [
  {
    id: "paldi",
    short: "Ahmedabad · Paldi",
    name: "Human Health Circle / Nisarg Health by HHC",
    address: "23 Shardanagar Society, behind Mangaltirth, near Shreyash Crossing, Paldi, Ahmedabad 380007",
    query: "Human Health Circle, 23 Shardanagar Society, Paldi, Ahmedabad 380007",
    openUrl: "https://maps.app.goo.gl/2q1qUTDLw2L87FeP6",
  },
  {
    id: "sola",
    short: "Ahmedabad · Sola",
    name: "Niramay Tirth Arogya Seva Kendra",
    address: "Shri Bhagwat Vidyapith Campus, S.G. Highway, near Sola Civil Hospital, Ahmedabad",
    query: "Niramay Tirth Arogya Seva Kendra, Shri Bhagwat Vidyapith, S.G. Highway, Sola, Ahmedabad",
    openUrl: null,
  },
  {
    id: "dehgam",
    short: "Dehgam",
    name: "HHC, Dehgam",
    address: "Pandya Hospital, near Hotel Vrajbhumi, Lakhajina Muvada, Dehgam–Bayad Road, Ta. Dehgam, Dist. Gandhinagar",
    query: "Pandya Hospital, Lakhajina Muvada, Dehgam Bayad Road, Dehgam, Gandhinagar",
    openUrl: null,
  },
  {
    id: "farm",
    short: "Organic farm · Jindva",
    name: "Nisarg Organic Farm by HHC, Jindva",
    address: "Jindva, Gujarat",
    query: "Nisarg Organic Farm by HHC, Jindva, Gujarat",
    openUrl: "https://maps.app.goo.gl/vPB5kATJSbWbmHq98",
  },
] as const;

export const extraPlaces = [
  { label: "Nisarg Organic Farm by HHC, Jindva (Google Maps)", href: "https://maps.app.goo.gl/vPB5kATJSbWbmHq98" },
];

export const packages = [
  { name: "Normal", price: "Free", amount: 0, items: ["12 video sessions", "Website and app", "Online meetings for a healthy life", "Regular health information", "Information about camps", "Government schemes"] },
  { name: "Silver", price: "₹100 / year", amount: 100, items: ["1 consultation per year (teleconsultation or offline)", "24 videos", "Website", "1 online meeting per month", "Everything in Normal"] },
  { name: "Gold", price: "₹1,000 / year", amount: 1000, items: ["4 consultations per year (teleconsultation or offline)", "100 videos", "Website", "1 online meeting per month", "Nutrition software", "10% on medicine", "Anaemia poster", "Vitamin A check, once a year"] },
  { name: "Platinum", price: "₹5,000 / year", amount: 5000, items: ["12 consultations per year (teleconsultation or offline)", "All videos", "Website", "1 online meeting per month + 1 extra", "2 free courses", "Nutrition software", "20% on medicine", "Anaemia poster", "Vitamin A check, twice a year"] },
] as const;

export const posts = [
  {
    slug: "ayurveda-free-camp-dec-2022",
    title: "Free Ayurveda diagnosis camp, 17–18 December 2022",
    date: "2022-12-13",
    summary: "A free Ayurveda diagnosis camp held with Shri Bhagwat Vidyapith at the Niramay Tirth Arogya Seva Kendra, Sola, Ahmedabad.",
    href: "/blog/ayurveda-free-camp-dec-2022",
    image: "/images/resources/ayurveda-free-camp-dec-2022.png",
  },
  {
    slug: "life-style-management-course",
    title: "Life Style Management certificate course (2023 batch)",
    date: "2022-12-13",
    summary: "A 9-week online certificate course with International Hindu University, USA. This batch has ended.",
    href: "/hhc-course",
    image: "/images/resources/lsm-course-english.png",
  },
  {
    slug: "rushi-krushi",
    title: "ऋषि-कृषि online course (2023)",
    date: "2023-03-10",
    summary: "A six-month online course on traditional natural farming. This batch has ended.",
    href: "/rushi-krushi",
    image: "/images/resources/lsm-course-gujarati.png",
  },
  {
    slug: "hhc-health-package-2023",
    title: "HHC Health Package 2023",
    date: "2022-12-13",
    summary: "A one-year health package offer that expired on 25 December 2022. Current packages are listed under the Health Assurance Mission.",
    href: "/health-assurance-mission",
    image: null,
  },
] as const;
