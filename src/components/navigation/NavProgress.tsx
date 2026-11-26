"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin progress line at the very top while a page change is in flight. It gives instant feedback after a tap/click
 * (and covers the first-visit compile delay in `next dev`), so navigation never feels dead.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const lastPath = useRef(pathname);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.origin !== location.origin) return;
      if (a.pathname === location.pathname) return; // same page / hash jump
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setPhase("loading"), 90); // only show if it is not instant
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (timer.current) clearTimeout(timer.current);
    const a = setTimeout(() => setPhase((p) => (p === "loading" ? "done" : "idle")), 0);
    const b = setTimeout(() => setPhase("idle"), 450);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [pathname]);

  if (phase === "idle") return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]">
      <div className={`h-full rounded-r-full bg-sage shadow-[0_0_8px_rgb(71_122_97/0.8)] ${phase === "loading" ? "nav-progress-run" : "nav-progress-done"}`} />
    </div>
  );
}
