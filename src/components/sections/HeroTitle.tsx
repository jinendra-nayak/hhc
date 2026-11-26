"use client";
import { Fragment } from "react";
import { useLang } from "@/components/i18n/T";
import { gu } from "@/content/gu";

/** Headline that rises word by word. Words stay real text (readable by screen readers, search engines and without JS). */
export function HeroTitle({ id, text, className }: { id: string; text: string; className?: string }) {
  const lang = useLang();
  const shown = lang === "gu" ? (gu[text] ?? text) : text;
  return (
    <h1 id={id} lang={lang === "gu" ? "gu" : undefined} className={className}>
      {shown.split(" ").map((word, i) => (
        <Fragment key={`${lang}-${i}`}>
          {i > 0 ? " " : null}
          <span className="hero-word">
            <span style={{ animationDelay: `${150 + i * 70}ms` }}>{word}</span>
          </span>
        </Fragment>
      ))}
    </h1>
  );
}
