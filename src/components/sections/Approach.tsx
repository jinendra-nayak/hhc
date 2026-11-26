import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { T } from "@/components/i18n/T";
import { Section, SectionHeading } from "@/components/layout/Section";
import { MethodsAccordion } from "./MethodsAccordion";

export function Approach({ linkAll = true }: { linkAll?: boolean }) {
  return (
    <Section id="approach" tone="sage" labelledBy="approach-title">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <SectionHeading id="approach-title" eyebrow={<T>Our approach</T>} title={<T>Five approaches to bringing healthcare closer to communities.</T>}>
            <p><T>Every method starts from the same idea: people look after health best when they understand it. Explore each approach to learn more.</T></p>
          </SectionHeading>
          {linkAll ? (
            <Link href="/initiatives" className="link-sweep mt-8 inline-flex items-center gap-1.5 font-semibold text-deep hover:text-forest">
              <T>See community initiatives</T> <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
        <MethodsAccordion />
      </div>
    </Section>
  );
}
