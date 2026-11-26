import { Mail, MapPin, Phone } from "lucide-react";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Contact Human Health Circle by phone, email or the enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={<T>Contact</T>} title={<T>Get in touch.</T>} lead={<T>Call, write or send a message. We will get back to you.</T>} crumbs={[{ label: <T>Contact</T> }]} />
      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="text-2xl"><T>Reach HHC</T></h2>
            <ul className="mt-6 space-y-5 text-lg">
              <li className="flex gap-4"><Phone className="mt-1.5 size-5 shrink-0 text-brand-brown" aria-hidden /><div><p className="text-sm text-muted"><T>Phone / WhatsApp</T></p><a className="font-semibold text-forest" href={`tel:${site.phone.tel}`}>{site.phone.display}</a></div></li>
              <li className="flex gap-4"><Mail className="mt-1.5 size-5 shrink-0 text-brand-brown" aria-hidden /><div><p className="text-sm text-muted"><T>Email</T></p><a className="break-all font-semibold text-forest" href={`mailto:${site.email}`}>{site.email}</a></div></li>
              <li className="flex gap-4"><MapPin className="mt-1.5 size-5 shrink-0 text-brand-brown" aria-hidden /><div><p className="text-sm text-muted"><T>Centres</T></p><p className="text-forest"><T>Ahmedabad, Dehgam</T> - <a className="underline" href="/centres"><T>addresses</T></a></p></div></li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10">
            <h2 className="mb-6 text-2xl"><T>Send a message</T></h2>
            <EnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
