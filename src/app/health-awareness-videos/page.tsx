import { VideoGallery } from "@/components/cards/VideoGallery";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Health Awareness Videos",
  description: "Watch HHC's health awareness videos on child health, anaemia, nutrients, chyawanprash and the Ayurvedic daily routine. Spoken in Gujarati.",
  path: "/health-awareness-videos",
});

export default function VideosPage() {
  return (
    <>
      <PageHero eyebrow={<T>Resources</T>} title={<T>Health awareness videos.</T>} lead={<T>Short talks from HHC on mother and child health, nutrition and everyday Ayurveda. Pick a topic, press play.</T>} crumbs={[{ label: <T>Resources</T>, href: "/resources" }, { label: <T>Health Awareness Videos</T> }]} />
      <Section tone="cream">
        <VideoGallery headingLevel={2} />
      </Section>
    </>
  );
}
