"use client";
import { LazyMotion, MotionConfig } from "motion/react";

/**
 * - `reducedMotion="user"` makes every animation honour the OS "reduce motion" setting.
 * - Features load asynchronously so Motion's code stays off the critical path (main-thread work delays LCP on slow phones).
 *   Components use the lightweight `m.*` elements; until features arrive they simply render their initial/SSR state.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={() => import("./motion-features").then((r) => r.default)} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
