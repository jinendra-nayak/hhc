import { ImageReveal, FadeIn } from "@/components/animations";
import { T } from "@/components/i18n/T";
import { Section, SectionHeading } from "@/components/layout/Section";
import { images } from "@/content/images";
import { systemsOfCare } from "@/content/site";

export function SystemsOfCare() {
  const img = images.herbs;
  return (
    <Section tone="white" labelledBy="care-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <ImageReveal src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5] max-h-[640px] w-full" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading id="care-title" eyebrow={<T>Holistic care</T>} title={<T>Many systems of care, one circle.</T>}>
            <p><T>HHC works across five systems of care, and its health packages are offered through its Ayurveda, Naturopathy, Allopathy, Homeopathy and Yoga centres.</T></p>
          </SectionHeading>
          <FadeIn>
            <ul className="mt-8 flex flex-wrap gap-3">
              {systemsOfCare.map((s) => (
                <li key={s} className="rounded-full border border-forest/15 bg-cream px-5 py-2.5 font-heading text-xl text-forest">
                  <T>{s}</T>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted"><T>Which centre offers which service is being confirmed with HHC - please call before travelling.</T></p>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
