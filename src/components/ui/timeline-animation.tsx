"use client";
import type { RefObject } from "react";
import { m, useInView, type Variants } from "motion/react";

/**
 * Staggered reveal ("timeline") used by the 21st.dev pricing template. Every element that shares a `timelineRef`
 * animates in order of `animationNum` once that container scrolls into view. (Written for HHC: the template's own
 * file was not included with the component.)
 */
type Tag = "div" | "p" | "article" | "section" | "ul" | "li" | "span" | "h2" | "h3";

export function TimelineContent({
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
}: {
  as?: Tag;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants: Variants;
  className?: string;
  children: React.ReactNode;
}) {
  const inView = useInView(timelineRef, { once: true, margin: "0px 0px -12% 0px" });
  const Component = m[as];
  return (
    <Component custom={animationNum} initial="hidden" animate={inView ? "visible" : "hidden"} variants={customVariants} className={className}>
      {children}
    </Component>
  );
}
