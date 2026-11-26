"use client";
import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { Check } from "lucide-react";
import { useInView, useReducedMotion, type Variants } from "motion/react";
import { L, T } from "@/components/i18n/T";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";

/**
 * Pricing section — adapted from the 21st.dev "pricing-section-3" template to HHC's brand and data:
 *  - plans come from props (HHC's real Health Assurance Mission packages), nothing is invented;
 *  - HHC sells yearly packages only, so the template's Monthly/Yearly switch and "Popular" badge were removed;
 *  - the price counts up (NumberFlow) once it scrolls into view; the static price is in the HTML first.
 */
export type Plan = {
  name: string;
  amount: number; // ₹ per year, 0 = free
  items: readonly string[];
  href: string;
  highlight?: boolean;
};

const reveal: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

function Price({ amount, dark }: { amount: number; dark?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState<number | null>(null); // null → plain text (matches the server HTML)

  useEffect(() => {
    if (!inView || reduce || amount === 0) return;
    const a = setTimeout(() => setValue(0), 0); // swap to the animated number…
    const b = setTimeout(() => setValue(amount), 60); // …and count up to the price
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [inView, reduce, amount]);

  const formatted = `₹${amount.toLocaleString("en-IN")}`;
  return (
    <span ref={ref} className="font-heading text-5xl leading-none">
      {amount === 0 ? (
        <T>Free</T>
      ) : (
        <>
          {/* the real price, always in the accessibility tree (NumberFlow's digits live in a shadow root) */}
          <span className="sr-only">{formatted}</span>
          <span aria-hidden>
            {value === null ? (
              formatted
            ) : (
              <NumberFlow value={value} locales="en-IN" format={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }} transformTiming={{ duration: 900, easing: "ease-out" }} />
            )}
          </span>
          <span className={cn("mt-1 block font-body text-base", dark ? "text-white/70" : "text-muted")}><T>per year</T></span>
        </>
      )}
      {amount === 0 ? <span aria-hidden className="mt-1 block font-body text-base">&nbsp;</span> : null}
    </span>
  );
}

export default function PricingSection({
  plans,
  title,
  lead,
}: {
  plans: readonly Plan[];
  title: { en: string; gu: string };
  lead: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cut = { type: "spring", stiffness: 250, damping: 40 } as const;
  return (
    <div ref={ref}>
      <article className="mb-8 max-w-2xl">
        <h2 id="pkg-title" className="mb-4 text-3xl text-forest sm:text-4xl lg:text-[2.7rem]">
          <span data-l="en"><VerticalCutReveal splitBy="words" staggerDuration={0.12} reverse transition={cut} containerClassName="justify-start">{title.en}</VerticalCutReveal></span>
          <span data-l="gu" lang="gu"><VerticalCutReveal splitBy="words" staggerDuration={0.12} reverse transition={cut} containerClassName="justify-start">{title.gu}</VerticalCutReveal></span>
        </h2>
        <TimelineContent as="p" animationNum={0} timelineRef={ref} customVariants={reveal} className="text-lg text-muted">
          {lead}
        </TimelineContent>
      </article>

      <TimelineContent as="div" animationNum={1} timelineRef={ref} customVariants={reveal} className="grid gap-3 rounded-3xl bg-sage-light/70 p-3 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, i) => (
          <TimelineContent as="div" key={plan.name} animationNum={i + 2} timelineRef={ref} customVariants={reveal} className="h-full">
            <Card className={cn("flex h-full flex-col justify-between rounded-2xl border-0 shadow-none", plan.highlight ? "bg-forest text-white" : "bg-white text-ink")}>
              <CardContent className="p-6">
                <div className="flex min-h-8 items-center justify-between gap-2">
                  <h3 className={cn("text-2xl", plan.highlight ? "!text-white" : "text-forest")}><T>{plan.name}</T></h3>
                  {plan.highlight ? <span className="rounded-full bg-white/15 px-3 py-1 text-[0.8125rem] font-medium text-white"><T>Most complete</T></span> : null}
                </div>
                <div className="mt-5 pb-5"><Price amount={plan.amount} dark={plan.highlight} /></div>
                <ul className={cn("space-y-3 border-t pt-5", plan.highlight ? "border-white/20" : "border-line")}>
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full", plan.highlight ? "bg-white/15 text-white" : "bg-sage-light text-forest")}>
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      <span className={cn("text-[0.95rem] leading-snug", plan.highlight ? "text-white/90" : "text-muted")}><T>{item}</T></span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button asChild variant={plan.highlight ? "white" : "primary"} size="lg" className="w-full">
                  <a href={plan.href} target="_blank" rel="noopener noreferrer">
                    <T>Book now</T>
                    <span className="sr-only"> — <T>{plan.name}</T></span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TimelineContent>
        ))}
      </TimelineContent>
    </div>
  );
}

/** Bilingual lead used by the Health Assurance Mission page. */
export const poolLead = <L en="Four packages, from free to ₹5,000 a year." gu="ચાર પેકેજ, મફતથી લઈને વર્ષે ₹5,000 સુધી." />;
