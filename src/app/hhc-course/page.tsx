import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArchiveNotice } from "@/components/layout/ArchiveNotice";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Training & Courses - Life Style Management certificate course",
  description: "Archive of HHC’s Life Style Management certificate course with International Hindu University, USA (2023 batch).",
  path: "/hhc-course",
});

const rows = [
  ["Certificate", "International Hindu University, USA & Human Health Circle, India"],
  ["Goal", "Human health"],
  ["Aim", "Life style management for health"],
  ["Duration", "1 Jan – 4 Mar 2023 · 9 weeks · 3 credits · 60 hours"],
  ["Mode", "Online"],
  ["Time", "Wednesday & Saturday, 8–9 (the English page says AM, the Gujarati page says PM - please confirm with HHC)"],
  ["Fee (2023)", "₹12,500 (₹9,500 for early confirmation before 26 Dec 2022)"],
] as const;

export default function CoursePage() {
  return (
    <>
      <PageHero eyebrow={<T>Our work</T>} title={<T>Training & courses.</T>} lead={<T>Life Style Management for Holistic Human Health - a certificate course with International Hindu University, USA.</T>} crumbs={[{ label: <T>Our Work</T>, href: "/initiatives" }, { label: <T>Courses</T> }]} />
      <Section tone="cream">
        <ArchiveNotice>
          <p className="font-semibold"><T>The 2023 batch (1 January – 4 March 2023) has ended.</T></p>
          <p className="mt-1 text-sm text-muted"><T>Details below are kept for reference. Fees and dates are those of the 2023 batch. Call HHC to ask whether a new batch is planned.</T> <Link className="underline" href="/rushi-krushi"><T>The Rushi-Krushi natural-farming course is on its own page.</T></Link></p>
        </ArchiveNotice>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl"><T>Course details</T></h2>
            <dl className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white text-[0.98rem]">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[9rem_1fr]"><dt className="font-semibold text-forest"><T>{k}</T></dt><dd className="text-muted"><T>{v}</T></dd></div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted"><T>Contact (2023): 99099 68495, 92651 66567 · IHU: contact@ihuusa.org, +1-754-444-9970 ·</T> <a className="underline" href={site.external.courseForm} target="_blank" rel="noopener noreferrer"><T>2023 application form</T> <ExternalLink className="inline size-3" aria-hidden /></a> <T>(may no longer accept applications)</T></p>
          </div>
          <div>
            <h2 className="text-3xl"><T>About the course</T></h2>
            <p className="mt-6 text-muted"><T>A certificate course, Life Style Management for Holistic Human Health, offered jointly by International Hindu University (Florida, USA) and Human Health Circle, Ahmedabad. The goal was holistic human health, and the aim was healthy lifestyle management.</T></p>
            <ul className="mt-5 space-y-2 text-muted">
              <li><T>Eligibility: age 15 and above, working knowledge of the course language, and comfort with online learning.</T></li>
              <li><T>Length: 9 weeks · 3 credits · 60 hours, fully online, held on Wednesdays and Saturdays.</T></li>
              <li><T>Batches ran in Gujarati and in English.</T></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 grid max-w-sm gap-6">
          {[images.lsmEn].map((i) => (<Image key={i.src} src={i.src} alt={i.alt} width={i.width} height={i.height} sizes="(min-width:640px) 320px, 50vw" className="h-auto w-full rounded-2xl border border-line shadow-soft" />))}
        </div>
      </Section>
    </>
  );
}
