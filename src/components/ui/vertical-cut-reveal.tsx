"use client";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { m, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * 21st.dev "vertical-cut-reveal" (danielpetho), adapted: uses `m` (LazyMotion) from `motion/react` instead of
 * a second `framer-motion` copy, and keeps the full text for screen readers.
 */
interface TextProps {
  children: React.ReactNode;
  reverse?: boolean;
  transition?: Transition;
  splitBy?: "words" | "characters" | "lines" | string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  onClick?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

export interface VerticalCutRevealRef {
  startAnimation: () => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

const splitGraphemes = (text: string): string[] =>
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), ({ segment }) => segment)
    : Array.from(text);

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
  (
    {
      children,
      reverse = false,
      transition = { type: "spring", stiffness: 190, damping: 22 },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      onClick,
      onStart,
      onComplete,
      autoStart = true,
    },
    ref,
  ) => {
    const text = typeof children === "string" ? children : String(children ?? "");
    const [isAnimating, setIsAnimating] = useState(false);

    const words: WordObject[] = useMemo(() => {
      const parts = splitBy === "lines" ? text.split("\n") : splitBy === "words" ? text.split(" ") : splitBy === "characters" ? text.split(" ") : text.split(splitBy);
      return parts.map((part, i) => ({
        characters: splitBy === "characters" ? splitGraphemes(part) : [part],
        needsSpace: i !== parts.length - 1,
      }));
    }, [text, splitBy]);

    const total = useMemo(() => words.reduce((n, w) => n + w.characters.length, 0), [words]);

    const delayFor = useCallback(
      (index: number) => {
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
        if (staggerFrom === "random") return Math.abs(Math.floor(Math.random() * total) - index) * staggerDuration;
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [total, staggerFrom, staggerDuration],
    );

    const start = useCallback(() => {
      setIsAnimating(true);
      onStart?.();
    }, [onStart]);

    useImperativeHandle(ref, () => ({ startAnimation: start, reset: () => setIsAnimating(false) }));

    useEffect(() => {
      if (!autoStart) return;
      // next tick, so the "hidden" frame is painted first and the cut-reveal is visible.
      // No "already started" guard: React Strict Mode (dev) mounts, unmounts and re-mounts effects, and a guard
      // would cancel the timer on the simulated unmount and never restart it, leaving the heading hidden.
      const t = setTimeout(start, 0);
      return () => clearTimeout(t);
    }, [autoStart, start]);

    const variants = {
      hidden: { y: reverse ? "-100%" : "100%" },
      visible: (i: number) => ({ y: 0, transition: { ...transition, delay: ((transition as { delay?: number })?.delay ?? 0) + delayFor(i) } }),
    };

    return (
      <span className={cn(containerClassName, "flex flex-wrap whitespace-pre-wrap", splitBy === "lines" && "flex-col")} onClick={onClick}>
        <span className="sr-only">{text}</span>
        {words.map((word, wordIndex, array) => {
          const before = array.slice(0, wordIndex).reduce((sum, w) => sum + w.characters.length, 0);
          return (
            <span key={wordIndex} aria-hidden="true" className={cn("inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]", wordLevelClassName)}>
              {word.characters.map((char, charIndex) => (
                <span className={cn(elementLevelClassName, "relative whitespace-pre-wrap")} key={charIndex}>
                  <m.span
                    custom={before + charIndex}
                    initial="hidden"
                    animate={isAnimating ? "visible" : "hidden"}
                    variants={variants}
                    onAnimationComplete={wordIndex === array.length - 1 && charIndex === word.characters.length - 1 ? onComplete : undefined}
                    className="inline-block"
                  >
                    {char}
                  </m.span>
                </span>
              ))}
              {word.needsSpace && <span> </span>}
            </span>
          );
        })}
      </span>
    );
  },
);
VerticalCutReveal.displayName = "VerticalCutReveal";

export { VerticalCutReveal };
