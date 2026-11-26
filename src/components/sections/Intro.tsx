import { FadeIn } from "@/components/animations";
import { T } from "@/components/i18n/T";
import { Section } from "@/components/layout/Section";

export function Intro() {
  return (
    <Section tone="cream" labelledBy="intro-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-4"><T>Who we are</T></p>
          <h2 id="intro-title" className="text-3xl sm:text-4xl lg:text-[2.7rem]"><T>A circle of people working for everyone’s health.</T></h2>
        </div>
        <FadeIn className="space-y-5 text-lg text-muted">
          <p className="font-heading text-2xl leading-snug text-forest">
            <T>Our primary goal is to impart basic health knowledge at the grass-roots level.</T>
          </p>
          <p>
            <T>Human Health Circle works in coordination with many organisations on health and development issues. Our team brings experience across community health, hospitals and medical care, agriculture, medicinal plants and food production.</T>
          </p>
          <p className="hidden md:block">
            <T>Most of what we do is simple and practical: training people to look after their own and their neighbours’ health, in a language and style they already understand.</T>
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
