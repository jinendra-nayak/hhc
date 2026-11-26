"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion, useSpring, useTransform, useVelocity } from "motion/react";
import { BookOpen, LayoutGrid, HeartHandshake, House, Sparkles, type LucideIcon } from "lucide-react";
import { T } from "@/components/i18n/T";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ExploreMenu } from "./ExploreMenu";
import { activeTab, type TabKey } from "./nav-shared";

/**
 * Liquid Glass tab bar for phones and tablets.
 *
 * Calm, standard layout: five equal tabs, an icon AND a label on each (so every tab is recognisable), the Packages
 * action raised in the centre, and a fixed-size glass lens that slides under the current tab on a spring and
 * squashes/stretches with its speed. Tabs never change width, so nothing jitters.
 *
 * NOTE — recreated from the public description of 21st.dev's "Liquid Glass Tab Bar" (Pedro, MIT). Its source needs
 * a 21st.dev API key and could not be retrieved, so no code was copied and SVG/WebGL refraction is not used.
 * Tapping a tab updates the highlight instantly (optimistic), so a slow page load never feels like a dead button.
 */
type Tab = { key: TabKey; href: string | null; label: string; Icon: LucideIcon; prominent?: boolean };
const tabs: Tab[] = [
  { key: "home", href: "/", label: "Home", Icon: House },
  { key: "work", href: "/initiatives", label: "Our Work", Icon: HeartHandshake },
  { key: "packages", href: "/health-assurance-mission#packages", label: "Packages", Icon: Sparkles, prominent: true },
  { key: "resources", href: "/resources", label: "Resources", Icon: BookOpen },
  { key: "explore", href: null, label: "Menu", Icon: LayoutGrid },
];

const spring = { stiffness: 380, damping: 30, mass: 0.9 };

export function LiquidTabBar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // optimistic highlight: the tapped tab becomes current immediately, and is released when the route actually changes
  const [pending, setPending] = useState<TabKey | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setPending(null);
  }
  const resolved = activeTab(pathname);
  const current: TabKey = open ? "explore" : pending ?? resolved;
  const index = tabs.findIndex((t) => t.key === current);

  const listRef = useRef<HTMLUListElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);

  // lens position is the tab INDEX on a spring (0..4); its speed squashes/stretches it
  const pos = useSpring(index, spring);
  const velocity = useVelocity(pos);
  const scaleX = useTransform(velocity, [-14, 0, 14], [1.22, 1, 1.22]);
  const scaleY = useTransform(velocity, [-14, 0, 14], [0.88, 1, 0.88]);

  const apply = useCallback(() => {
    const el = lensRef.current;
    if (!el) return;
    el.style.transform = `translateX(${pos.get() * 100}%) scale(${scaleX.get()}, ${scaleY.get()})`;
  }, [pos, scaleX, scaleY]);

  // write the lens style straight from the spring (independent of Motion's lazily loaded features)
  useEffect(() => {
    apply();
    const off = [pos, scaleX, scaleY].map((v) => v.on("change", apply));
    return () => off.forEach((u) => u());
  }, [pos, scaleX, scaleY, apply]);

  useEffect(() => {
    if (reduce) pos.jump(index);
    else pos.set(index);
    if (lensRef.current) lensRef.current.style.opacity = tabs[index]?.prominent ? "0" : "1"; // the raised Packages button marks itself
  }, [index, reduce, pos]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    const at = items.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : (at + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  };

  const itemClass = (on: boolean, prominent?: boolean) =>
    cn(
      "relative flex h-14 w-full flex-col items-center justify-end gap-0.5 rounded-[1.4rem] pb-1.5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white",
      on ? "text-white" : "text-white/90 active:text-white",
      prominent && "text-white",
    );

  const inner = (t: Tab, on: boolean, isPending: boolean) => (
    <>
      {t.prominent ? (
        <span className={cn("-translate-y-3 grid size-12 place-items-center rounded-full bg-white text-forest shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] ring-4 ring-forest/80 transition-transform duration-300 ease-[cubic-bezier(0.3,1.6,0.5,1)]", on && "scale-110")}>
          <t.Icon aria-hidden className={cn("size-6", isPending && "animate-pulse")} />
        </span>
      ) : (
        <t.Icon aria-hidden className={cn("size-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.3,1.6,0.5,1)]", on && "-translate-y-px scale-110", isPending && "animate-pulse")} />
      )}
      <span className={cn("block max-w-full whitespace-nowrap text-xs leading-none tracking-tight max-[359px]:sr-only", on ? "font-semibold" : "font-medium", t.prominent && "-mt-3.5")}><T>{t.label}</T></span>
    </>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="relative mx-auto max-w-lg md:max-w-2xl">
          {/* glass surface: blur + saturation, specular edges (symmetric) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] bg-forest/[0.94] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/25 backdrop-blur-xl backdrop-saturate-150">
            <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <span className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <span className="absolute inset-y-3 left-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            <span className="absolute inset-y-3 right-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
          </div>

          <ul ref={listRef} onKeyDown={onKeyDown} className="relative grid grid-cols-5 p-1.5">
            {/* magnifying lens: fixed width = one tab, so it never resizes */}
            <span
              ref={lensRef}
              aria-hidden
              className="pointer-events-none absolute bottom-1.5 left-1.5 top-1.5 z-0 w-[calc((100%-0.75rem)/5)] rounded-[1.4rem] bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),inset_0_-1px_1px_rgba(255,255,255,0.3),0_6px_16px_-6px_rgba(0,0,0,0.55)] ring-1 ring-white/45 backdrop-blur-[3px] backdrop-brightness-125 will-change-transform [transform-origin:center]"
            />
            {tabs.map((t) => {
              const on = t.key === current;
              const isPending = pending === t.key;
              return (
                <li key={t.key} className="relative z-10 min-w-0">
                  {t.href ? (
                    <Link
                      href={t.href}
                      aria-current={on ? "page" : undefined}
                      onClick={() => { if (t.key !== resolved) setPending(t.key); }}
                      className={itemClass(on, t.prominent)}
                    >
                      {inner(t, on, isPending)}
                    </Link>
                  ) : (
                    <SheetTrigger asChild>
                      <button type="button" aria-haspopup="dialog" className={itemClass(on)}>{inner(t, on, false)}</button>
                    </SheetTrigger>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <ExploreMenu />
    </Sheet>
  );
}
