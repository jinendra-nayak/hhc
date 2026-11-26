import { gu } from "@/content/gu";

/**
 * Bilingual text. Renders the English string and its Gujarati translation side by side;
 * CSS (`html[data-lang]`) shows only the language the visitor picked, so pages stay fully
 * static, fast and readable without JavaScript. Missing translations fall back to English.
 * Keep the children a single plain string - it is the dictionary key (src/content/gu.ts).
 */
export function T({ children }: { children: string }) {
  const g = gu[children];
  if (!g) return <span data-l-missing="">{children}</span>;
  return (
    <>
      <span data-l="en">{children}</span>
      <span data-l="gu" lang="gu">{g}</span>
    </>
  );
}

/** Explicit pair, for text that contains variables (not in the dictionary). */
export function L({ en, gu: g }: { en: string; gu: string }) {
  return (
    <>
      <span data-l="en">{en}</span>
      <span data-l="gu" lang="gu">{g}</span>
    </>
  );
}
