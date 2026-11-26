"use client";
import { useSyncExternalStore } from "react";
import { gu } from "@/content/gu";

type Lang = "en" | "gu";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => mo.disconnect();
}
const getSnapshot = (): Lang => (document.documentElement.dataset.lang === "gu" ? "gu" : "en");
const getServerSnapshot = (): Lang => "en";

/**
 * Bilingual text. Renders only the active language (`html[data-lang]`) so DOM text
 * extractors, screen readers, and browsers never see English and Gujarati concatenated.
 * Missing translations fall back to English with `data-l-missing`.
 */
export function T({ children }: { children: string }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const g = gu[children];
  if (!g) return <span data-l-missing="">{children}</span>;
  if (lang === "gu") return <span lang="gu">{g}</span>;
  return <>{children}</>;
}

/** Explicit pair, for text that contains variables (not in the dictionary). */
export function L({ en, gu: g }: { en: string; gu: string }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (lang === "gu") return <span lang="gu">{g}</span>;
  return <>{en}</>;
}
