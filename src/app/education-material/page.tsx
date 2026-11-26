import { DownloadList } from "@/components/cards/DownloadList";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { documents } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Education Material (PDF guides)",
  description: "Free health education guides from HHC: cleanliness, healthy lifestyle, addiction-free life and golden rules of good health.",
  path: "/education-material",
});

export default function EducationPage() {
  return (
    <>
      <PageHero eyebrow={<T>Resources</T>} title={<T>Education material.</T>} lead={<T>Health education guides from HHC, free to download, print and share. The guides are written in Gujarati.</T>} crumbs={[{ label: <T>Resources</T>, href: "/resources" }, { label: <T>Education Material</T> }]} />
      <Section tone="cream"><DownloadList docs={documents.education} /></Section>
    </>
  );
}
