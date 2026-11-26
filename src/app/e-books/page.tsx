import { DownloadList } from "@/components/cards/DownloadList";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { documents } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "E-books - First Aid and Dodi (Jivanti)",
  description: "Free e-books from HHC: a First Aid guide and a guide to the health benefits of Dodi (Jivanti).",
  path: "/e-books",
});

export default function EbooksPage() {
  return (
    <>
      <PageHero eyebrow={<T>Resources</T>} title={<T>E-books.</T>} lead={<T>E-books from HHC, free to download as PDF. They are written in Gujarati.</T>} crumbs={[{ label: <T>Resources</T>, href: "/resources" }, { label: <T>E-books</T> }]} />
      <Section tone="cream">
        <DownloadList docs={documents.ebooks} />
        <p className="mt-8 max-w-2xl text-sm text-muted"><T>These guides are for general education and do not replace advice from a qualified health practitioner.</T></p>
      </Section>
    </>
  );
}
