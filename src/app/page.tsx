import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Approach } from "@/components/sections/Approach";
import { SystemsOfCare } from "@/components/sections/SystemsOfCare";
import { Camps } from "@/components/sections/Camps";
import { People } from "@/components/sections/People";
import { CentresPreview } from "@/components/sections/CentresPreview";
import { BvdFeature } from "@/components/sections/BvdFeature";
import { ResourcesPreview } from "@/components/sections/ResourcesPreview";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

const homeTitle = `${site.name} - community health education, camps and holistic care`;
const base = buildMetadata({ title: homeTitle, description: site.description, path: "/" });
export const metadata: Metadata = {
  ...base,
  title: { absolute: homeTitle },
  openGraph: { ...base.openGraph, title: homeTitle },
  twitter: { ...base.twitter, title: homeTitle },
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="home-sections">
        <Intro />
        <Approach />
        <SystemsOfCare />
        <Camps />
        <People />
        <CentresPreview />
        <BvdFeature />
        <ResourcesPreview />
        <ContactCta />
      </div>
    </>
  );
}
