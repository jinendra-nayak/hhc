import { ArrowUpRight, Sparkles, BookOpen, Calculator, Eye, FileText, GraduationCap, HeartHandshake, House, Lightbulb, Newspaper, Package, PlayCircle, ShieldCheck, Sprout, Users, MapPin, type LucideIcon } from "lucide-react";
import { primaryNav } from "@/content/site";

export const itemIcons: Record<string, LucideIcon> = {
  "/": House,
  "/about-us": Users, "/centres": MapPin, "/media": Newspaper,
  "/initiatives": Sprout, "/health-assurance-mission": ShieldCheck, "/hhc-course": GraduationCap,
  "/innovations": Lightbulb, "/bright-vision-detector": Eye, "/nutrition-calculator": Calculator,
  "/resources": BookOpen, "/education-material": FileText, "/e-books": BookOpen,
  "/health-assurance-mission#packages": Sparkles,
  "/health-awareness-videos": PlayCircle, "/products": Package, "/blog": Newspaper,
};
export const iconFor = (href: string): LucideIcon => itemIcons[href] ?? ArrowUpRight;

/** Section tab icons, in the same order as `primaryNav`. */
export const tabIcons: LucideIcon[] = [House, Users, HeartHandshake, Lightbulb, BookOpen, Sparkles];

/** Index into `primaryNav` for the current path (0 = Home). Sub-pages keep their section highlighted. */
export function activeIndex(pathname: string): number {
  return Math.max(
    0,
    primaryNav.findIndex((n) => (n.match as readonly string[]).some((m) => (m === "/" ? pathname === "/" : pathname === m || pathname.startsWith(m + "/")))),
  );
}

export type TabKey = "home" | "work" | "packages" | "resources" | "explore";

/** Which bottom tab is current. Pages that live under the Explore menu (About, Innovations, Contact …) highlight Explore. */
export function activeTab(pathname: string): TabKey {
  if (pathname === "/") return "home";
  const under = (paths: string[]) => paths.some((m) => pathname === m || pathname.startsWith(m + "/"));
  if (under(["/health-assurance-mission"])) return "packages";
  if (under(["/initiatives", "/hhc-course", "/rushi-krushi", "/rushi-krushi-list-of-faculties"])) return "work";
  if (under(["/resources", "/education-material", "/e-books", "/health-awareness-videos", "/products", "/blog"])) return "resources";
  return "explore";
}
