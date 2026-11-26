"use client";
import { m, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <m.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-sage" style={{ scaleX }} />;
}
