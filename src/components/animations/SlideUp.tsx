"use client";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number; // text reveal ≈ 0.5
  distance?: number;
  className?: string;
  /** animate on mount (hero) instead of on scroll */
  immediate?: boolean;
  as?: "div" | "h1" | "h2" | "p" | "span";
};

export function SlideUp({ children, delay = 0, duration = 0.5, distance = 24, className, immediate, as = "div" }: Props) {
  // Above-the-fold entrance is pure CSS (no hydration needed), so it can never delay LCP.
  if (immediate) {
    const Tag = as;
    return (
      <Tag className={cn("hhc-rise", className)} style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s`, ["--rise" as string]: `${distance}px` }}>
        {children}
      </Tag>
    );
  }
  const M = m[as];
  const common = {
    initial: { opacity: 0, y: distance },
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
  return (
    <M className={cn(className)} {...common} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {children}
    </M>
  );
}
