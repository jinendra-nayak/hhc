"use client";
import { type RefObject } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Loaded after hydration (see ParallaxImage). Reports a vertical offset while `outer` scrolls through the viewport. */
export default function ParallaxEffect({
  outer,
  strength,
  onOffset,
}: {
  outer: RefObject<HTMLElement | null>;
  strength: number;
  onOffset: (px: number) => void;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  useMotionValueEvent(y, "change", (v) => {
    if (!reduce) onOffset(v);
  });
  return null;
}
