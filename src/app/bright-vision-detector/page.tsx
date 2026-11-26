import { ExternalLink, FileText } from "lucide-react";
import { L, T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArchiveNotice } from "@/components/layout/ArchiveNotice";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FadeIn } from "@/components/animations";
import { bvd, documents } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bright Vision Detector - Prakhar Innovations LLP",
  description: "Introduction to the Bright Vision Detector from Prakhar Innovations LLP, with research paper, news cuttings, media coverage and a call-back request form.",
  path: "/bright-vision-detector",
});

export default function BvdPage() {
  return (
    <>
      <PageHero eyebrow={<T>Innovations</T>} title={<T>Bright Vision Detector.</T>} lead={<L en={`The first product from ${bvd.entity}, introduced on HHC’s website.`} gu={`${bvd.entity} નું પ્રથમ ઉત્પાદન, જે HHC ની વેબસાઇટ પર રજૂ કરાયું છે.`} />} crumbs={[{ label: <T>Innovations</T>, href: "/innovations" }, { label: <T>Bright Vision Detector</T> }]} />
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <FadeIn eager className="space-y-6 text-lg text-muted">
            <h2 className="text-3xl text-forest"><L en={`Welcome to ${bvd.entity}`} gu={`${bvd.entity} માં આપનું સ્વાગત છે`} /></h2>
            <p><T>We are excited to introduce a series of groundbreaking innovations in healthcare. Our first product, the Bright Vision Detector, is a world-first technology designed to revolutionize health diagnostics.</T></p>
            <p><T>Explore the details of the Bright Vision Detector and see how it can make a difference. We look forward to your support.</T></p>
            <p className="border-l-2 border-sage pl-5 text-forest">
              <strong>{bvd.signedBy}</strong><br /><T>{bvd.signedRole}</T><br />
              <T>Contact:</T> <a className="font-semibold underline" href={`tel:${bvd.phone.tel}`}>{bvd.phone.display}</a>
            </p>
            <ArchiveNotice>
              <p className="text-sm"><L en={`The text above is the original introduction, reproduced as published. Claims such as “world-first” are the product owner’s own, and HHC has not added any benefit or clinical claims. Bright Vision Detector is developed by ${bvd.entity}, a separate entity from HHC. Ask the team for intended use and regulatory status.`} gu={`ઉપરનું લખાણ મૂળ પરિચય છે, જે પ્રકાશિત થયા મુજબ જ રજૂ કર્યું છે. “world-first” જેવા દાવા ઉત્પાદનના માલિકના પોતાના છે, અને HHC એ કોઈ લાભ કે તબીબી દાવો ઉમેર્યો નથી. Bright Vision Detector ને ${bvd.entity} દ્વારા વિકસાવવામાં આવ્યું છે, જે HHC થી અલગ સંસ્થા છે. ઉપયોગના હેતુ અને નિયમનકારી સ્થિતિ વિશે ટીમને પૂછો.`} /></p>
            </ArchiveNotice>
          </FadeIn>

          <div>
            <h2 className="text-2xl"><T>Research & media</T></h2>
            <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
              {bvd.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 px-4 py-4">
                    <span className="flex items-center gap-3 font-medium text-forest group-hover:text-sage"><FileText className="size-5 shrink-0 text-brand-brown" aria-hidden /><T>{l.label}</T></span>
                    <ExternalLink className="size-4 shrink-0 text-deep" aria-label="opens Google Drive in a new tab" />
                  </a>
                </li>
              ))}
              <li id="vitamin-a-document" className="scroll-mt-28">
                <a href={documents.vitaminA.file} download className="group flex items-center justify-between gap-4 px-4 py-4">
                  <span className="flex items-center gap-3 font-medium text-forest group-hover:text-sage"><FileText className="size-5 shrink-0 text-brand-brown" aria-hidden /><T>Vitamin A Deficiency Detector (PDF, 2.5 MB)</T></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="forest" id="callback" labelledBy="cb-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="cb-title" className="text-4xl"><T>Request a call back</T></h2>
            <p className="mt-4 max-w-md text-lg text-white/80"><T>Fill this form and a member of the team will call you back.</T></p>
          </div>
          <EnquiryForm topic="Bright Vision Detector - call back" messageLabel="Comment or message" submitLabel="Request call back" dark />
        </div>
      </Section>
    </>
  );
}
