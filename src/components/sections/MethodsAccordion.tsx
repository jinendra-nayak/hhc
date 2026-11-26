"use client";
import dynamic from "next/dynamic";
import { T } from "@/components/i18n/T";
import { methods } from "@/content/site";

// Loaded as a separate chunk: the water shader is not needed for first paint.
const LiquidAccordion = dynamic(() => import("@/components/ui/liquid-glass-accordion").then((m) => m.LiquidAccordion));

export function MethodsAccordion() {
  return (
    <LiquidAccordion
      tone="light"
      ambient={false}
      glMode="interaction"
      defaultOpen={0}
      headingLevel={3}
      style={{ maxWidth: "none" }}
      items={methods.map((m) => ({ id: m.id, question: <T>{m.title}</T>, answer: <T>{m.body}</T> }))}
    />
  );
}
