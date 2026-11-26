import Link from "next/link";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArchiveNotice } from "@/components/layout/ArchiveNotice";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ऋषि-कृषि (Rushi-Krushi) - online natural-farming course",
  description: "Archive of the Rushi-Krushi online course on traditional natural farming, organised by International Hindu University (Florida, USA) and Human Health Circle, 2023.",
  path: "/rushi-krushi",
});

export default function RushiKrushiPage() {
  return (
    <>
      <PageHero eyebrow={<T>Our work</T>} title="ऋषि-कृषि · Rushi-Krushi" lead={<T>An online course on traditional natural farming, organised with International Hindu University (Florida, USA).</T>} crumbs={[{ label: <T>Our Work</T>, href: "/initiatives" }, { label: <T>Courses</T>, href: "/hhc-course" }, { label: "Rushi-Krushi" }]} />
      <Section tone="cream">
        <ArchiveNotice>
          <p className="font-semibold"><T>This course ran from 1 May to 31 October 2023 and has ended.</T></p>
          <p className="mt-1 text-sm text-muted"><T>The course is about natural farming rather than health care. A summary of the original course page is below.</T></p>
        </ArchiveNotice>
        <article className="prose-hhc mt-10 max-w-3xl text-lg text-muted">
          <h2 className="text-3xl"><T>About the course</T></h2>
          <p><T>Rushi-Krushi is the traditional way of farming described in the Vedic texts, in which the soil is treated as a mother and farming as a form of worship. The course text notes that this approach protected soil health and the quality of produce, and promoted bio-diversity, crop management and the sustainable use of raw materials.</T></p>
          <p><T>The course text states that farmers have moved away from this tradition over time. International Hindu University (Florida, USA) and Human Health Circle, India, organised the online course to help revive it, with guidance from experienced agriculture experts and practitioners (see the faculty list).</T></p>
          <p><strong><T>Schedule:</T></strong> <T>1 May to 31 October 2023 (six months), with one or two online sessions each week. Each participant was to receive a certificate from International Hindu University at the end of the course.</T></p>
          <p className="text-sm"><T>This is an English summary of the original Hindi course page. The original text is available from HHC on request.</T></p>
        </article>
        <p className="mt-8"><Link className="inline-flex min-h-11 items-center gap-1 font-semibold text-deep underline underline-offset-4" href="/rushi-krushi-list-of-faculties"><T>View the list of faculty</T> →</Link></p>
      </Section>
    </>
  );
}
