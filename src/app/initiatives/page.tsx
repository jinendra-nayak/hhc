import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Approach } from "@/components/sections/Approach";
import { Camps } from "@/components/sections/Camps";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Community Initiatives - training, education material, camps and kits",
  description: "How HHC works with communities: health training, IEC material, medical camps, first-aid kits and education of young people.",
  path: "/initiatives",
});

const more = [
  { href: "/health-assurance-mission", title: "Health Assurance Mission", body: "Volunteer with HHC, find your lifestyle score and choose a health package." },
  { href: "/health-awareness-videos", title: "Health awareness videos", body: "Videos on child health, anaemia, nutrition and daily routine." },
  { href: "/hhc-course", title: "Courses", body: "Past certificate courses: Life Style Management and the Rushi-Krushi natural-farming course." },
  { href: "/education-material", title: "Education material", body: "Guides on cleanliness, lifestyle, addiction-free life and golden rules of health." },
];

export default function InitiativesPage() {
  return (
    <>
      <PageHero eyebrow={<T>Our work</T>} title={<T>Community initiatives.</T>} lead={<T>Training, health education material, camps, kits and work with young people - each shaped to the area it serves.</T>} crumbs={[{ label: <T>Community Initiatives</T> }]} />
      <Approach linkAll={false} />
      <Camps />
      <Section tone="white">
        <h2 className="text-3xl sm:text-4xl"><T>Take part</T></h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {more.map((m) => (
            <li key={m.href} className="bg-white p-8">
              <h3 className="text-2xl"><Link href={m.href} className="hover:text-sage"><T>{m.title}</T></Link></h3>
              <p className="mt-3 text-muted"><T>{m.body}</T></p>
              <Link href={m.href} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-deep"><T>Open</T> <ArrowRight className="size-4" aria-hidden /></Link>
            </li>
          ))}
        </ul>
      </Section>
      <ContactCta />
    </>
  );
}
