import Link from "next/link";
import { ArrowUpRight, Calculator, Eye } from "lucide-react";
import { L, T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { bvd } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Innovations - Bright Vision Detector and Nutrition Calculator",
  description: "Tools developed with or listed by HHC: the Bright Vision Detector and the Nutrition Advance nutrition calculator.",
  path: "/innovations",
});

export default function InnovationsPage() {
  return (
    <>
      <PageHero eyebrow={<T>Innovations</T>} title={<T>Tools for better health.</T>} lead={<T>Products and software connected with Human Health Circle.</T>} crumbs={[{ label: <T>Innovations</T> }]} />
      <Section tone="cream">
        <ul className="grid gap-6 md:grid-cols-2">
          <li>
            <Link href="/bright-vision-detector" className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-soft transition-colors duration-150 hover:border-forest/40">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-forest text-white"><Eye className="size-7" aria-hidden /></span>
              <h2 className="mt-6 text-3xl"><T>Bright Vision Detector</T></h2>
              <p className="mt-3 flex-1 text-muted"><L en={`A detection device introduced by ${bvd.entity}. Read the original introduction, the research paper and the media coverage, or request a call back.`} gu={`${bvd.entity} દ્વારા રજૂ કરાયેલું એક શોધ ઉપકરણ. મૂળ પરિચય, સંશોધન પત્ર અને મીડિયા કવરેજ વાંચો, અથવા પાછો ફોન કરવાની વિનંતી કરો.`} /></p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-deep"><T>Open</T> <ArrowUpRight className="size-4" aria-hidden /></span>
            </Link>
          </li>
          <li>
            <Link href="/nutrition-calculator" className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-soft transition-colors duration-150 hover:border-forest/40">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-forest text-white"><Calculator className="size-7" aria-hidden /></span>
              <h2 className="mt-6 text-3xl"><T>Nutrition Calculator</T></h2>
              <p className="mt-3 flex-1 text-muted"><T>Nutrition Advance is HHC&apos;s nutrition software. Look up the nutrient content of foods and analyse a diet, online or offline.</T></p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-deep"><T>Open</T> <ArrowUpRight className="size-4" aria-hidden /></span>
            </Link>
          </li>
        </ul>
        <p className="mt-10 max-w-2xl text-sm text-muted"><L en={`The Bright Vision Detector is developed by ${bvd.entity}, a separate entity from HHC. HHC makes no clinical claims about either tool.`} gu={`Bright Vision Detector ને ${bvd.entity} દ્વારા વિકસાવવામાં આવ્યું છે, જે HHC થી અલગ સંસ્થા છે. HHC આ બંનેમાંથી કોઈ સાધન વિશે કોઈ તબીબી દાવો કરતું નથી.`} /></p>
      </Section>
    </>
  );
}
