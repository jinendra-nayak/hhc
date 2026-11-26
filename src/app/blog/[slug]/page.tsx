import Image from "next/image";
import { notFound } from "next/navigation";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArchiveNotice } from "@/components/layout/ArchiveNotice";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

const entries = {
  "ayurveda-free-camp-dec-2022": {
    title: "Free Ayurveda diagnosis camp, 17–18 December 2022",
    description: "A free Ayurveda diagnosis camp held by HHC and Shri Bhagwat Vidyapith at Niramay Tirth Arogya Seva Kendra, Sola, Ahmedabad.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(entries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = entries[slug as keyof typeof entries];
  if (!e) return {};
  return buildMetadata({ title: e.title, description: e.description, path: `/blog/${slug}` });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = entries[slug as keyof typeof entries];
  if (!e) notFound();
  const p = images.campPoster;
  return (
    <>
      <PageHero eyebrow={<><T>Blog</T> · 13 December 2022</>} title={<T>{e.title}</T>} lead={<T>{e.description}</T>} crumbs={[{ label: <T>Blog</T>, href: "/blog" }, { label: <T>Free Ayurveda camp</T> }]} />
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Image src={p.src} alt={p.alt} width={p.width} height={p.height} priority sizes="(min-width:1024px) 520px, 100vw" className="h-auto w-full border border-line shadow-soft" />
          <div className="space-y-4 text-lg text-muted">
            <h2 className="text-3xl"><T>Free Ayurveda diagnosis camp</T></h2>
            <p><strong className="text-forest"><T>When:</T></strong> <T>Saturday 17 and Sunday 18 December 2022, 10 am to 5 pm.</T></p>
            <p><strong className="text-forest"><T>Where:</T></strong> <T>Niramay Tirth Arogya Seva Kendra, Shri Bhagwat Vidyapith Campus, S.G. Highway, near Sola Civil Hospital, Ahmedabad.</T></p>
            <p><strong className="text-forest"><T>Organised by:</T></strong> <T>Shri Bhagwat Vidyapith and Human Health Circle.</T></p>
            <ArchiveNotice><p className="text-sm"><T>This camp took place in December 2022. The poster lists the doctors, the conditions covered and the contact numbers, as published at the time.</T></p></ArchiveNotice>
          </div>
        </div>
      </Section>
    </>
  );
}
