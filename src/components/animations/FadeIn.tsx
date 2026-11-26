"use client";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number; // seconds; section entrance ≈ 0.55
  className?: string;
  as?: "div" | "section" | "li" | "p";
  /** For content in the first viewport: CSS-only entrance so it never waits for hydration (keeps LCP fast). */
  eager?: boolean;
};

export function FadeIn({ children, delay = 0, duration = 0.5, className, as = "div", eager }: Props) {
  if (eager) {
    const Tag = as;
    return (
      <Tag className={cn("hhc-rise", className)} style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s`, ["--rise" as string]: "0px" }}>
        {children}
      </Tag>
    );
  }
  const M = m[as];
  return (
    <M
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
