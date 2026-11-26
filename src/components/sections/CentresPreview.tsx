import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { T } from "@/components/i18n/T";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { centres } from "@/content/site";

export function CentresPreview() {
  return (
    <Section tone="sage" labelledBy="centres-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading id="centres-title" eyebrow={<T>Our centres</T>} title={<T>Find HHC in Gujarat.</T>}>
            <p><T>HHC centres with verified addresses in Ahmedabad and Dehgam.</T></p>
          </SectionHeading>
          <Button asChild className="mt-8"><Link href="/centres"><T>All centre details</T> <ArrowRight aria-hidden /></Link></Button>
        </div>
        <StaggerContainer as="ul" className="divide-y divide-forest/15 border-y border-forest/15">
          {centres
            .filter((c) => c.locations.some((l) => Boolean(l.address)))
            .map((c) => (
              <StaggerItem as="li" key={c.id} className="py-6">
                <Link href={`/centres#${c.id}`} className="group grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <span className="font-heading text-3xl text-forest group-hover:text-sage"><T>{c.city}</T></span>
                  <span className="flex items-start gap-2 text-muted">
                    <MapPin className="mt-1.5 size-4 shrink-0 text-brand-brown" aria-hidden />
                    <span>
                      {c.locations
                        .filter((l) => Boolean(l.address))
                        .map((l) => (
                          <span key={l.name} className="block"><T>{l.address!}</T></span>
                        ))}
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}
