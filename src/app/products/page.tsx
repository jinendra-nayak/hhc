import { DownloadList } from "@/components/cards/DownloadList";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { documents } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products - food products and Ayurveda medicines",
  description: "HHC product catalogue: food products and Ayurveda medicines, and the Vitamin A Deficiency Detector information sheet.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow={<T>Resources</T>} title={<T>Products.</T>} lead={<T>HHC’s product catalogue and the Vitamin A Deficiency Detector information sheet.</T>} crumbs={[{ label: <T>Products</T> }]} />
      <Section tone="cream">
        <DownloadList docs={[documents.products, documents.vitaminA]} />
        <p className="mt-8 max-w-2xl text-muted"><T>Prices and availability in the catalogue may have changed. To order or check availability, call HHC on</T> <a className="font-semibold text-forest" href="tel:+919909968495">+91 99099 68495</a>. <T>Online ordering is not available on this site.</T></p>
      </Section>
    </>
  );
}
