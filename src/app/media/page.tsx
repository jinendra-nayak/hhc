import Image from "next/image";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Media - posters and announcements",
  description: "Posters and announcements published by HHC for camps, courses and educational material.",
  path: "/media",
});

const items = [
  { ...images.campPoster, cap: "Free Ayurveda diagnosis camp · Sola, Ahmedabad · 17–18 Dec 2022" },
  { ...images.panchakarmaPoster, cap: "Seven-day residential Panchakarma camp · Dehgam · Dec 2022" },
  { ...images.nutritionCd, cap: "Nutrition A - educational CD" },
  { ...images.lsmEn, cap: "Life Style Management certificate course (English)" },
  { ...images.lsmGu, cap: "Life Style Management certificate course (Gujarati)" },
];

export default function MediaPage() {
  return (
    <>
      <PageHero eyebrow={<T>About HHC</T>} title={<T>Media.</T>} lead={<T>Posters and announcements HHC has published. Dates shown are from the time of publication.</T>} crumbs={[{ label: <T>Media</T> }]} />
      <Section tone="cream">
        <ul className="columns-1 gap-8 sm:columns-2 lg:columns-3 [&>li]:mb-8 [&>li]:break-inside-avoid">
          {items.map((i) => (
            <li key={i.src}>
              <figure>
                <Image src={i.src} alt={i.alt} width={i.width} height={i.height} sizes="(min-width:1024px) 360px, (min-width:640px) 45vw, 100vw" className="h-auto w-full rounded-2xl border border-line bg-white shadow-soft" />
                <figcaption className="mt-3 text-sm text-muted"><T>{i.cap}</T></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
