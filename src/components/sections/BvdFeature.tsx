import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SlideUp } from "@/components/animations";
import { L, T } from "@/components/i18n/T";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { bvd } from "@/content/site";

export function BvdFeature() {
  return (
    <Section tone="forest" labelledBy="bvd-title">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <SlideUp>
          <p className="eyebrow mb-4 !text-white/80"><T>Innovation</T></p>
          <h2 id="bvd-title" className="text-4xl sm:text-5xl"><T>Bright Vision Detector</T></h2>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            <L
              en={`The first product of ${bvd.entity}, introduced on HHC’s website as a new technology for health diagnostics. Read the original introduction, the research paper and the media coverage, or ask the team to call you back.`}
              gu={`${bvd.entity} નું પ્રથમ ઉત્પાદન, જે HHC ની વેબસાઇટ પર આરોગ્ય નિદાન માટેની નવી ટેકનોલોજી તરીકે રજૂ કરાયું છે. મૂળ પરિચય, સંશોધન પત્ર અને મીડિયા કવરેજ વાંચો, અથવા ટીમને તમને પાછો ફોન કરવા કહો.`}
            />
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="white" size="lg"><Link href="/bright-vision-detector"><T>Explore the detector</T> <ArrowRight aria-hidden /></Link></Button>
            <Button asChild variant="outline-light" size="lg"><Link href="/bright-vision-detector#callback"><T>Request a call back</T></Link></Button>
          </div>
        </SlideUp>
        <SlideUp delay={0.1} className="self-end border-l-2 border-white/40 pl-6">
          <p className="font-heading text-2xl leading-snug text-white">
            “<T>We are excited to introduce a series of groundbreaking innovations in healthcare.</T>”
          </p>
          <p className="mt-4 text-sm text-white/70">
            {bvd.signedBy}, {bvd.signedRole} - <T>from the Bright Vision Detector page.</T>{" "}
            <L en={`Bright Vision Detector is developed by ${bvd.entity}, a separate entity from HHC.`} gu={`Bright Vision Detector ને ${bvd.entity} દ્વારા વિકસાવવામાં આવ્યું છે, જે HHC થી અલગ સંસ્થા છે.`} />
          </p>
        </SlideUp>
      </div>
    </Section>
  );
}
