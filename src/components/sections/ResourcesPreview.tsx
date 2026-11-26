import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { T } from "@/components/i18n/T";
import { VideoGallery } from "@/components/cards/VideoGallery";
import { Section, SectionHeading } from "@/components/layout/Section";
import { images } from "@/content/images";
import { documents, posts } from "@/content/site";

export function ResourcesPreview() {
  return (
    <>
      <Section tone="cream" labelledBy="learn-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="learn-title" eyebrow={<T>Health education</T>} title={<T>Watch and learn.</T>} />
          <Link href="/health-awareness-videos" className="link-sweep inline-flex items-center gap-1.5 font-semibold text-deep hover:text-forest">
            <T>All videos</T> <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10">
          <VideoGallery compact />
        </div>
      </Section>

      <Section tone="white" labelledBy="ebooks-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading id="ebooks-title" eyebrow={<T>E-books & guides</T>} title={<T>Free guides to keep and share.</T>}>
              <p><T>HHC’s health guides and e-books are free to download as PDF files. They are written in Gujarati.</T></p>
            </SectionHeading>
            <Image src={images.nutritionCd.src} alt={images.nutritionCd.alt} width={images.nutritionCd.width} height={images.nutritionCd.height} sizes="(min-width:1024px) 420px, 100vw" className="mt-10 h-auto w-full max-w-md rounded-3xl border border-line shadow-soft" />
          </div>
          <ul className="divide-y divide-line self-start overflow-hidden rounded-3xl border border-line">
            {[...documents.ebooks, ...documents.education].map((d) => (
              <li key={d.file}>
                <a href={d.file} download className="group flex items-center justify-between gap-4 p-5 transition-colors duration-150 hover:bg-sage-light/50">
                  <span>
                    <span className="block font-heading text-xl text-forest"><T>{d.title}</T></span>
                    <span className="text-sm text-muted"><T>{d.language}</T> · {d.pages} <T>pages</T> · {d.mb} MB PDF</span>
                  </span>
                  <Download className="size-5 shrink-0 text-deep" aria-label="Download" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="sage" labelledBy="articles-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="articles-title" eyebrow={<T>Latest from the blog</T>} title={<T>Updates and archive.</T>} />
          <Link href="/blog" className="link-sweep inline-flex items-center gap-1.5 font-semibold text-deep hover:text-forest"><T>All posts</T> <ArrowRight className="size-4" aria-hidden /></Link>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug} className="rounded-3xl bg-cream p-7">
              <p className="text-sm text-muted"><time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></p>
              <h3 className="mt-3 text-xl"><Link href={p.href} className="hover:text-sage"><T>{p.title}</T></Link></h3>
              <p className="mt-3 text-muted"><T>{p.summary}</T></p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
