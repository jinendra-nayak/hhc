// Usage: BASE=http://localhost:3101 node scripts/check-external-links.mjs
// Crawls the built site, collects every external link and reports its HTTP status.
// Facebook / Instagram answer bots with login walls, so those are reported as "unverifiable", not "broken".
const BASE = process.env.BASE ?? "http://localhost:3101";
const paths = ["/", "/about-us", "/centres", "/initiatives", "/health-assurance-mission", "/health-awareness-videos", "/education-material", "/e-books", "/resources", "/products", "/bright-vision-detector", "/nutrition-calculator", "/hhc-course", "/rushi-krushi", "/rushi-krushi-list-of-faculties", "/media", "/blog", "/blog/ayurveda-free-camp-dec-2022", "/contact"];
const ext = new Map();
for (const p of paths) {
  const html = await (await fetch(BASE + p)).text();
  for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const u = m[1].replaceAll("&amp;", "&");
    if (u.startsWith(BASE) || u.startsWith("https://www.humanhealthcircle.org")) continue;
    ext.set(u, [...(ext.get(u) ?? []), p]);
  }
}
const loginWall = /facebook\.com|instagram\.com/;
let bad = 0;
for (const [u, on] of [...ext].sort()) {
  try {
    const r = await fetch(u, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/120 Safari/537.36" } });
    const tag = r.ok ? "OK        " : loginWall.test(u) ? "UNVERIFIED" : "BROKEN    ";
    if (!r.ok && !loginWall.test(u)) bad++;
    console.log(tag, r.status, u, `(on ${on.length} page${on.length > 1 ? "s" : ""})`);
  } catch (e) {
    bad++;
    console.log("BROKEN    ", "ERR", u, String(e.cause?.code ?? e.message));
  }
}
console.log(`\n${ext.size} external links checked, ${bad} broken`);
process.exit(bad ? 1 : 0);
