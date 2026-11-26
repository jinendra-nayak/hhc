import { StaggerContainer, StaggerItem } from "@/components/animations";
import { T } from "@/components/i18n/T";
import { Section, SectionHeading } from "@/components/layout/Section";

/**
 * Only people named in HHC's own materials, with the exact source of each statement.
 * A full team page is pending HHC approval (docs/content-review-needed.md #23).
 */
const people = [
  {
    name: "Dr. Rajesh Mehta",
    role: "MBBS, MD - former Dean, GMERS Medical College, Sola, Ahmedabad",
    source: "As signed on the Bright Vision Detector introduction; also the contact for the Health Assurance Mission.",
  },
  {
    name: "Hema Mehta",
    role: "MPH, DNHE, CIN - concept of the “Nutrition A” educational CD",
    source: "As printed on the CD cover (developed by Human Health Circle & Finavia, Ahmedabad).",
  },
  {
    name: "Vaidya Dr. Shivaniben Patel",
    role: "Ayurveda practitioner (MD Ayu.) - presents the Ayurvedic daily-routine video",
    source: "Named in HHC’s December 2022 camp poster and its YouTube video.",
  },
];

export function People() {
  return (
    <Section tone="white" labelledBy="people-title">
      <SectionHeading id="people-title" eyebrow={<T>People</T>} title={<T>Practitioners named in HHC’s own materials.</T>}>
        <p><T>A full team page will follow once HHC confirms names, roles and permissions. Until then, these are the people HHC’s published materials credit directly.</T></p>
      </SectionHeading>
      <StaggerContainer as="ul" className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {people.map((p) => (
          <StaggerItem as="li" key={p.name} className="bg-white p-8">
            <h3 className="text-2xl"><T>{p.name}</T></h3>
            <p className="mt-3 font-medium text-deep"><T>{p.role}</T></p>
            <p className="mt-4 border-t border-line pt-4 text-sm text-muted"><T>Source:</T> <T>{p.source}</T></p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
