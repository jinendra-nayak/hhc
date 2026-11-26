"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { T } from "@/components/i18n/T";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { LiquidTabBar } from "./LiquidTabBar";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    // zero-height sticky wrapper: the bar floats over the page (and over the home hero) without taking space
    <header className="sticky top-0 z-50 h-0">
      <div className="absolute inset-x-0 top-0 px-3 pt-3 sm:px-5">
        <div
          className={cn(
            "mx-auto flex max-w-[80rem] items-center justify-between gap-3 rounded-full border border-white/10 bg-forest p-1.5 transition-shadow duration-200 lg:pr-2.5",
            scrolled ? "shadow-[0_14px_34px_-14px_rgb(0_0_0/0.55)]" : "shadow-[0_6px_20px_-10px_rgb(0_0_0/0.4)]",
          )}
        >
          {/* original logo, unaltered, on a perfectly round white badge so none of the artwork is cut */}
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.06)] lg:size-16">
            <Logo size={46} eager />
          </span>

          <DesktopNav />

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <Link href="/contact" className="hidden h-11 items-center gap-1.5 rounded-full bg-white px-5 text-[0.95rem] font-semibold text-forest transition-colors duration-150 hover:bg-sage-light lg:inline-flex">
              <T>Contact us</T> <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
      <LiquidTabBar />
    </header>
  );
}
