import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SlideUp } from "@/components/animations";
import { T } from "@/components/i18n/T";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function ContactCta() {
  return (
    <Section tone="white" labelledBy="cta-title">
      <div className="grid items-center gap-10 border-y border-line py-14 lg:grid-cols-[1.4fr_1fr]">
        <SlideUp>
          <p className="eyebrow mb-4"><T>Join the circle</T></p>
          <h2 id="cta-title" className="text-4xl sm:text-5xl"><T>Want to learn, volunteer or bring a camp to your area?</T></h2>
          <p className="mt-5 max-w-xl text-lg text-muted"><T>Call or write to the HHC team. You can also join the Health Assurance Mission as a volunteer.</T></p>
        </SlideUp>
        <SlideUp delay={0.1} className="space-y-3">
          <Button asChild size="lg" className="w-full"><Link href="/contact"><T>Send us a message</T></Link></Button>
          <Button asChild size="lg" variant="outline" className="w-full"><Link href="/health-assurance-mission"><T>Health Assurance Mission</T></Link></Button>
          <p className="flex flex-wrap gap-x-6 gap-y-1 pt-3 text-[0.95rem]">
            <a className="inline-flex items-center gap-2 font-semibold text-forest" href={`tel:${site.phone.tel}`}><Phone className="size-4" aria-hidden /> {site.phone.display}</a>
            <a className="inline-flex items-center gap-2 text-deep" href={`mailto:${site.email}`}><Mail className="size-4" aria-hidden /> {site.email}</a>
          </p>
        </SlideUp>
      </div>
    </Section>
  );
}
