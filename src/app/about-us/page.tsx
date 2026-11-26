import Link from "next/link";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Approach } from "@/components/sections/Approach";
import { SystemsOfCare } from "@/components/sections/SystemsOfCare";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: "Human Health Circle works to impart basic health knowledge at the grass-roots level through training, education material, medical camps and first-aid kits.",
  path: "/about-us",
});

const more = [
  { href: "/centres", t: "Our centres", d: "Addresses in Ahmedabad, Dehgam, Vadodara and Anand." },
  { href: "/media", t: "Media", d: "Posters and announcements published by HHC." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={<T>About HHC</T>} title={<T>Basic health knowledge, at the grass-roots.</T>} lead={<T>Human Health Circle works in coordination with many organisations on health and development issues.</T>} crumbs={[{ label: <T>About Us</T> }]} />
      <Section tone="cream">
        <div className="prose-hhc grid gap-10 text-lg text-muted lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className="text-3xl sm:text-4xl"><T>Who we are</T></h2>
          <div>
            <p className="!mt-0"><T>Human Health Circle (HHC) works with many organisations on health and development issues. Our technical team has experience across community health, hospitals and medical care, agriculture, medicinal plants and food production.</T></p>
            <p><T>Our primary goal is to impart basic health knowledge at the grass-roots level. The five methods below are how we do it.</T></p>
            <p className="rounded-2xl border border-line bg-white p-5 text-sm">
              <strong className="text-forest"><T>Note for visitors:</T></strong> <T>HHC’s history, founders, legal status and team are being compiled and will be added here once confirmed by HHC.</T>
            </p>
          </div>
        </div>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl sm:text-4xl"><T>More about HHC</T></h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {more.map((l) => (
            <li key={l.href}><Link href={l.href} className="block rounded-3xl border border-line p-6 transition-colors hover:border-forest/40"><span className="font-heading text-2xl text-forest"><T>{l.t}</T></span><span className="mt-1 block text-muted"><T>{l.d}</T></span></Link></li>
          ))}
        </ul>
      </Section>
      <Approach linkAll={false} />
      <SystemsOfCare />
      <ContactCta />
    </>
  );
}
