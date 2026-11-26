import type { Redirect } from "next/dist/lib/load-custom-routes";

const gujaratiCampSlug = encodeURI("/આયુર્વેદ-નિશુલ્ક-નિદાન-ક");

/** Old WordPress URLs → new routes. See docs/route-migration-map.md */
export const redirects: Redirect[] = [
  { source: "/home-2", destination: "/", statusCode: 301 },
  { source: "/vit-a-def-detection-instrument", destination: "/bright-vision-detector#vitamin-a-document", statusCode: 301 },
  { source: "/nutrition-advance-online", destination: "/nutrition-calculator", statusCode: 301 },
  { source: "/nutrition-advance-software", destination: "/nutrition-calculator", statusCode: 301 },
  { source: "/nutritionadvance", destination: "/nutrition-calculator", statusCode: 301 },
  { source: "/blog-post-title", destination: "/hhc-course", statusCode: 301 },
  { source: "/hhc-health-package-2023", destination: "/blog", statusCode: 301 },
  // WordPress slug (Gujarati). Request paths arrive percent-encoded; old links used lower-case hex, browsers send upper-case.
  { source: gujaratiCampSlug, destination: "/blog/ayurveda-free-camp-dec-2022", statusCode: 301 },
  { source: gujaratiCampSlug.replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase()), destination: "/blog/ayurveda-free-camp-dec-2022", statusCode: 301 },
  { source: "/feed", destination: "/blog", statusCode: 301 },
  { source: "/wp-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
];
