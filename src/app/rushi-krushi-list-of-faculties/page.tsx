import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ArchiveNotice } from "@/components/layout/ArchiveNotice";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rushi-Krushi - List of Faculties",
  description: "Faculty of the 2023 Rushi-Krushi online natural-farming course.",
  path: "/rushi-krushi-list-of-faculties",
});

// Names and the topic/role stated on the old page. Long third-party biographies are NOT reproduced pending consent.
const faculty = [
  ["Shri Gopalbhai Sutariya", "Founder, Bansi Gir Gaushala and Gotirth Vidyapeeth, Ahmedabad"],
  ["Padmashri Dr. Khader Vali", "Independent scientist, food & health"],
  ["Dr. Minoo Hiraji Parabia", "Medicinal plants & herbs"],
  ["Shri Patanjali Jha", "Natural farming"],
  ["Dr. Suneesh Buxy", "Natural resource management, medicinal plants, agroforestry"],
  ["Shri Rohit Mehra", "Urban forests and vertical gardens"],
  ["Sh. Shivali Miglani", "Soil and animal-based agriculture"],
  ["Shri Tarachand Belji", "Organic farming research & education"],
  ["Shri Aakash Chorasiya", "Multi-layer farming"],
  ["Vaidya Rajesh Kapoor", "Ayurvedic lifestyle"],
  ["Dr. Rajesh Mehta", "Community medicine & Rushi-Krushi"],
  ["Dr. Hema Mehta", ""],
  ["Dr. Rakesh Pandit", "Ayurvedacharya"],
  ["Dr. Sathyanarayana Bhat", "Ayurveda"],
  ["Shri Bhopabhai Jasmatbhai Khasiya", "Panch-Mahabhut farming technique; grafting"],
  ["Sh. Chintan Vyas", "Indigenous seeds, Krushi Sanskruti, Nakshatra-Vanam"],
  ["Uma Maheshwari Chakilum", "Water & land remediation, sustainable agriculture"],
  ["Sh. Shrekanth RG", "“No Oil No Boil” raw food"],
  ["Sh. Priti Rao", "Soil and Soul Foundation"],
  ["Sh. Samarth Yogi Arwind", "Ayurvedic tree plantation"],
  ["Sh. Kishore Bhatt", ""],
  ["Sh. Mayank Gandhi", "Fruit-tree plantation and rural development"],
  ["Sh. Nagesh Vyas", "Earth science and water"],
  ["Dr. Geetika Saluja", "Education and life skills"],
] as const;

export default function FacultyPage() {
  return (
    <>
      <PageHero eyebrow={<T>Archive</T>} title={<T>Rushi-Krushi - faculty.</T>} lead={<T>Faculty of the 2023 online course.</T>} crumbs={[{ label: <T>Courses</T>, href: "/hhc-course" }, { label: "Rushi-Krushi", href: "/rushi-krushi" }, { label: <T>Faculty</T> }]} />
      <Section tone="cream">
        <ArchiveNotice><p className="text-sm"><T>Names and topics are taken from the previous HHC website. Full biographies are not reproduced here until HHC confirms them with each faculty member.</T></p></ArchiveNotice>
        <ul className="mt-10 grid gap-x-12 divide-y divide-line border-y border-line md:grid-cols-2 md:[&>li:nth-child(2)]:border-t-0">
          {faculty.map(([n, r]) => (
            <li key={n} className="py-4"><p className="font-heading text-xl text-forest">{n}</p>{r ? <p className="text-sm text-muted"><T>{r}</T></p> : null}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
