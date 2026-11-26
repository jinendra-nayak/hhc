import { ExternalLink } from "lucide-react";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArchiveNotice } from "@/components/layout/ArchiveNotice";
import { Button } from "@/components/ui/button";
import PricingSection, { poolLead } from "@/components/ui/pricing-section-3";
import { packages, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Health Assurance Mission - volunteer and choose a package",
  description: "Join the HHC Health Assurance Mission as a volunteer, check your lifestyle score and choose a Normal, Silver, Gold or Platinum package.",
  path: "/health-assurance-mission",
});

export default function HamPage() {
  return (
    <>
      <PageHero eyebrow={<T>Our work</T>} title={<T>Health Assurance Mission.</T>} lead={<T>All citizens are welcome to join the Health Assurance Mission as a volunteer.</T>} crumbs={[{ label: <T>Our Work</T>, href: "/initiatives" }, { label: <T>Health Assurance Mission</T> }]} />
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-lg text-muted">
            <p><T>Start by finding out your lifestyle score with a short online form. HHC also offers a range of packages for its services; choose the one that suits you.</T></p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><a href={site.external.lifestyleScoreForm} target="_blank" rel="noopener noreferrer"><T>Check my lifestyle score</T> <ExternalLink aria-hidden /></a></Button>
            </div>
          </div>
          <ArchiveNotice>
            <p className="font-semibold"><T>Please confirm current terms with HHC.</T></p>
            <p className="mt-1 text-sm text-muted"><T>Packages and prices below are copied from HHC’s existing website and have not been re-verified. Payment is handled on HHC’s separate payment site, hhcnutrition.com.</T></p>
          </ArchiveNotice>
        </div>
      </Section>
      <Section tone="white" id="packages" labelledBy="pkg-title">
        <PricingSection
          title={{ en: "Choose your package", gu: "તમારું પેકેજ પસંદ કરો" }}
          lead={poolLead}
          plans={packages.map((p) => ({ name: p.name, amount: p.amount, items: p.items, href: site.external.missionPayment, highlight: p.name === "Platinum" }))}
        />
        <p className="mt-8 text-muted"><T>For details, contact Dr Rajesh Mehta:</T> <a className="font-semibold text-forest" href="tel:+917574813972">75748 13972</a>.</p>
      </Section>
    </>
  );
}
