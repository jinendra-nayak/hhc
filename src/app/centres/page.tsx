import { ExternalLink } from "lucide-react";
import { T } from "@/components/i18n/T";
import { CentreMap } from "@/components/cards/CentreMap";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { extraPlaces, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Centres - Ahmedabad, Dehgam, Vadodara and Anand",
  description: "HHC centres in Ahmedabad, Dehgam, Vadodara and Anand, Gujarat. Addresses and map links.",
  path: "/centres",
});

export default function CentresPage() {
  return (
    <>
      <PageHero eyebrow={<T>Our centres</T>} title={<T>Where to find HHC.</T>} lead={<T>HHC centres are located in Ahmedabad, Dehgam, Vadodara and Anand. Please call before visiting.</T>} crumbs={[{ label: <T>Our Centres</T> }]} />
      <Section tone="white" labelledBy="map-title">
        <h2 id="map-title" className="mb-8 text-3xl sm:text-4xl"><T>Find us on the map</T></h2>
        <CentreMap />
      </Section>
      <Section tone="cream">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl"><T>Also on the map</T></h2>
            <ul className="mt-4 space-y-1">
              {extraPlaces.map((p) => (
                <li key={p.href}><a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-deep underline underline-offset-4"><T>{p.label}</T> <ExternalLink className="size-3.5" aria-hidden /></a></li>
              ))}
            </ul>
          </div>
          <p className="text-muted"><T>Opening hours, services at each centre and phone numbers per centre are being confirmed. Meanwhile, reach the HHC team on</T> <a className="font-semibold text-forest" href={`tel:${site.phone.tel}`}>{site.phone.display}</a>.</p>
        </div>
      </Section>
      <ContactCta />
    </>
  );
}
