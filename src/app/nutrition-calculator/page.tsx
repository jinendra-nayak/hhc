import { ExternalLink } from "lucide-react";
import { T } from "@/components/i18n/T";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nutrition Calculator - Nutrition Advance",
  description: "Nutrition Advance is HHC’s nutrition software: look up the nutrient content of foods and analyse your diet. Online and offline versions.",
  path: "/nutrition-calculator",
});

export default function NutritionPage() {
  const steps = [
    { n: 1, t: "Register", d: <><T>Register on</T> <a className="font-semibold underline" href={site.external.nutritionRegister} target="_blank" rel="noopener noreferrer">hhcnutrition.com</a>.</> },
    { n: 2, t: "Activate your account", d: <><T>WhatsApp your name and email to</T> <a className="font-semibold underline" href="https://wa.me/919909968495">99099 68495</a> <T>to activate it.</T></> },
    { n: 3, t: "Log in", d: <><T>Log in at</T> <a className="font-semibold underline" href={site.external.nutritionLogin} target="_blank" rel="noopener noreferrer">hhcnutrition.com/login</a> <T>and start calculating.</T></> },
  ];
  return (
    <>
      <PageHero eyebrow={<T>Innovations</T>} title={<T>Nutrition Calculator.</T>} lead={<T>Nutrition Advance is HHC’s nutrition software, now available online.</T>} crumbs={[{ label: <T>Innovations</T>, href: "/innovations" }, { label: <T>Nutrition Calculator</T> }]} />
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="space-y-6 text-lg text-muted">
            <h2 className="text-3xl text-forest"><T>What it helps you do</T></h2>
            <ul className="space-y-3">
              {["Find which foods are the richest sources of a nutrient, such as vitamin C, fibre, B12, vitamin D, protein, calcium or iron.", "See how many vitamins and minerals a given food provides - for example almonds compared with groundnuts, or vitamin A in 100 g of carrot.", "Calculate your nutrient requirements and compare them with what your diet provides."].map((t) => (
                <li key={t} className="flex gap-3"><span aria-hidden className="mt-3 size-1.5 shrink-0 bg-sage" /><span><T>{t}</T></span></li>
              ))}
            </ul>
            <p className="text-sm"><T>The software is a calculation aid for general nutrition information. It does not replace advice from a doctor or dietitian.</T></p>
          </div>
          <div>
            <h2 className="text-2xl"><T>Get started</T></h2>
            <ol className="mt-5 divide-y divide-line border-y border-line bg-white">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4 p-5"><span aria-hidden className="font-heading text-3xl text-brand-brown">{s.n}</span><div><p className="font-semibold text-forest"><T>{s.t}</T></p><p className="text-muted">{s.d}</p></div></li>
              ))}
            </ol>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild><a href={site.external.nutritionCalculator} target="_blank" rel="noopener noreferrer"><T>Open the online calculator</T> <ExternalLink aria-hidden /></a></Button>
              <Button asChild variant="outline"><a href={site.external.nutritionOffline} target="_blank" rel="noopener noreferrer"><T>Download the offline desktop version</T> <ExternalLink aria-hidden /></a></Button>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="white" labelledBy="n-form">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div><h2 id="n-form" className="text-3xl"><T>Questions about Nutrition Advance?</T></h2><p className="mt-4 text-muted"><T>Leave your number and the team will call you back.</T></p></div>
          <EnquiryForm topic="Nutrition Advance - call back" submitLabel="Request call back" />
        </div>
      </Section>
    </>
  );
}
