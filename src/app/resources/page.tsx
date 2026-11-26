import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources - videos, guides, e-books and tools",
  description: "Free HHC resources: health videos, education material, e-books, nutrition calculator and product catalogue.",
  path: "/resources",
});

const items = [
  { href: "/health-awareness-videos", t: "Health awareness videos", d: "Six videos on YouTube." },
  { href: "/education-material", t: "Education material", d: "Four guides to download." },
  { href: "/e-books", t: "E-books", d: "First Aid and Dodi (Jivanti)." },
  { href: "/nutrition-calculator", t: "Nutrition calculator", d: "Nutrition Advance: look up nutrients and analyse a diet." },
  { href: "/products", t: "Products", d: "Food products and Ayurveda medicines catalogue." },
  { href: "/blog", t: "Blog", d: "Updates and archive." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow={<T>Resources</T>} title={<T>Learn, download, share.</T>} lead={<T>Free health resources from Human Health Circle.</T>} crumbs={[{ label: <T>Resources</T> }]} />
      <Section tone="cream">
        <ul className="divide-y divide-line border-y border-line">
          {items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="group flex items-center justify-between gap-6 py-7">
                <span><span className="block font-heading text-3xl text-forest group-hover:text-sage"><T>{i.t}</T></span><span className="text-muted"><T>{i.d}</T></span></span>
                <ArrowUpRight className="size-6 shrink-0 text-deep transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
