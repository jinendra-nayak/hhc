// Lists every English string that has no Gujarati translation yet (rendered by <T> with data-l-missing).
// Usage: BASE=http://localhost:3101 node scripts/harvest-missing-translations.mjs [--json]
const BASE = process.env.BASE ?? "http://localhost:3101";
const paths = ["/", "/about-us", "/centres", "/initiatives", "/health-assurance-mission", "/health-awareness-videos", "/education-material", "/e-books", "/resources", "/products", "/innovations", "/bright-vision-detector", "/nutrition-calculator", "/hhc-course", "/rushi-krushi", "/rushi-krushi-list-of-faculties", "/media", "/blog", "/blog/ayurveda-free-camp-dec-2022", "/contact", "/does-not-exist"];
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const keys = new Map();
for (const p of paths) {
  const html = await (await fetch(BASE + p)).text();
  for (const m of html.matchAll(/<span data-l-missing="">([\s\S]*?)<\/span>/g)) {
    const k = decode(m[1].replace(/<!-- -->/g, ""));
    keys.set(k, (keys.get(k) ?? 0) + 1);
  }
}
const list = [...keys.keys()];
if (process.argv.includes("--json")) console.log(JSON.stringify(list, null, 1));
else { console.log(`${list.length} untranslated strings`); list.forEach((k) => console.log(" -", k)); }
process.exit(list.length ? 1 : 0);
