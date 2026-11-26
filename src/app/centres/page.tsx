import { ExternalLink, MapPin } from "lucide-react";
import { T } from "@/components/i18n/T";
import { CentreMap } from "@/components/cards/CentreMap";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { centres, extraPlaces, site } from "@/content/site";
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
        <ol className="divide-y divide-line border-y border-line">
          {centres.map((c, i) => (
            <li key={c.id} id={c.id} className="grid scroll-mt-32 gap-4 py-10 lg:grid-cols-[6rem_14rem_1fr] lg:gap-10">
              <span aria-hidden className="font-heading text-4xl text-brand-brown">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-3xl"><T>{c.city}</T></h2>
              <div className="space-y-8">
                {c.locations.map((l) => (
                  <div key={l.name}>
                    <p className="font-semibold text-forest"><T>{l.name}</T></p>
                    <p className="mt-2 flex gap-2 text-muted"><MapPin className="mt-1.5 size-4 shrink-0 text-brand-brown" aria-hidden /><span>{l.address ? <T>{l.address}</T> : <T>Address to be confirmed by HHC. Please call or write to us.</T>}</span></p>
                    <p className="mt-2 text-sm text-muted"><T>{l.source}</T></p>
                    {l.links.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {l.links.map((k) => (
                          <li key={k.href}><a href={k.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-deep underline underline-offset-4"><T>{k.label}</T> <ExternalLink className="size-3.5" aria-hidden /></a></li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
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
