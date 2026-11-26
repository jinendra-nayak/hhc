"use client";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Lang = "en" | "gu";
const KEY = "hhc-lang";

// The language lives on <html data-lang>. The inline script in <head> applies the saved choice before first paint;
// this store lets React read it (and re-render when it changes) without effects.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => mo.disconnect();
}
const getSnapshot = (): Lang => (document.documentElement.dataset.lang === "gu" ? "gu" : "en");
const getServerSnapshot = (): Lang => "en";

function setLanguage(l: Lang) {
  document.documentElement.dataset.lang = l;
  document.documentElement.lang = l;
  try { localStorage.setItem(KEY, l); } catch { /* private mode: the choice just lasts for this visit */ }
}

/** English | ગુજરાતી. The choice is remembered on this device. */
export function LanguageSwitch({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const btn = (l: Lang, short: string, full: string) => (
    <button
      type="button"
      aria-pressed={lang === l}
      onClick={() => setLanguage(l)}
      className={cn(
        "min-h-11 min-w-11 rounded-full px-3 text-sm font-semibold transition-colors duration-150",
        tone === "dark"
          ? lang === l ? "bg-white text-forest" : "text-white/80 hover:text-white"
          : lang === l ? "bg-forest text-white" : "text-forest/80 hover:text-forest",
      )}
    >
      <span aria-hidden lang={l}>{short}</span>
      <span className="sr-only">{full}</span>
    </button>
  );

  return (
    <div role="group" aria-label="Language" className={cn("inline-flex items-center rounded-full p-0.5", tone === "dark" ? "bg-white/10" : "bg-forest/10", className)}>
      {btn("en", "EN", "English")}
      {btn("gu", "ગુ", "Gujarati")}
    </div>
  );
}
