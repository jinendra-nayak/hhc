import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const paths = ["/", "/about-us", "/centres", "/initiatives", "/health-assurance-mission", "/health-awareness-videos", "/education-material", "/e-books", "/resources", "/products", "/innovations", "/bright-vision-detector", "/nutrition-calculator", "/hhc-course", "/rushi-krushi", "/rushi-krushi-list-of-faculties", "/media", "/blog", "/blog/ayurveda-free-camp-dec-2022", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
