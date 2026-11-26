import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, ImageReveal, SlideUp } from "@/components/animations";
import { T } from "@/components/i18n/T";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { images } from "@/content/images";

export function Camps() {
  const hero = images.camp;
  return (
    <Section tone="cream" labelledBy="camps-title">
      <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="relative">
          <ImageReveal src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} sizes="(min-width:1024px) 55vw, 100vw" className="aspect-[16/10] w-full" />
        </div>
        <SlideUp>
          <SectionHeading id="camps-title" eyebrow={<T>Camps & outreach</T>} title={<T>Medical camps at the doorstep.</T>}>
            <p><T>Where awareness of health is low or infrastructure is limited, trained professionals set up camps close to people’s homes - so care does not depend on a long journey.</T></p>
          </SectionHeading>
          <Button asChild variant="outline" className="mt-8"><Link href="/initiatives"><T>How camps fit into our work</T> <ArrowRight aria-hidden /></Link></Button>
        </SlideUp>
      </div>

      <FadeIn className="mt-16 border-t border-line pt-10">
        <h3 className="text-2xl"><T>From the archive: camps HHC has announced</T></h3>
        <p className="mt-2 max-w-2xl text-muted"><T>Posters from December 2022. These camps have taken place; new dates are announced on HHC’s social channels.</T></p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
          {[images.campPoster, images.panchakarmaPoster].map((p) => (
            <Link key={p.src} href={p === images.campPoster ? "/blog/ayurveda-free-camp-dec-2022" : "/centres#dehgam"} className="group block">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width:640px) 340px, 100vw" className="h-auto w-full transition-transform duration-200 group-hover:scale-[1.02]" />
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
