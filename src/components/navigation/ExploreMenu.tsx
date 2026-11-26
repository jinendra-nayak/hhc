"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Check, ChevronRight, Mail, Phone, Sparkles } from "lucide-react";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { T } from "@/components/i18n/T";
import { Logo } from "@/components/layout/Logo";
import { SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { iconFor } from "./nav-shared";

type Item = { label: string; href: string; description?: string };

// "Discover" = Home + the About group; the Packages shortcut is the featured card, so it is not repeated in a list
const groups: { label: string; items: Item[] }[] = [
  { label: "Discover", items: [{ label: "Home", href: "/", description: "Start here" }, ...(nav.find((g) => g.label === "About HHC")?.items ?? [])] },
  ...nav
    .filter((g) => g.items && g.label !== "About HHC")
    .map((g) => ({ label: g.label, items: g.items!.filter((i) => !i.href.includes("#")) })),
];

/** The Menu panel: every section of the site as clean grouped lists, current page marked, actions pinned at the bottom. */
export function ExploreMenu() {
  const pathname = usePathname();
  const here = (href: string) => pathname === href;

  return (
    <SheetContent side="bottom" id="mobile-menu" aria-describedby={undefined}>
      <SheetTitle className="sr-only">Menu</SheetTitle>
      <SheetDescription className="sr-only">All sections of the site</SheetDescription>

      <div className="shrink-0">
        <div aria-hidden className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-forest/20" />
        <div className="flex items-center gap-3 px-5 pb-3 pt-3 pr-20">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.06)]"><Logo size={34} eager /></span>
          <p className="font-heading text-2xl leading-none text-forest"><T>Menu</T></p>
        </div>
      </div>

      <nav aria-label="Menu" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
        {/* the prominent action */}
        <SheetClose asChild>
          <Link href="/health-assurance-mission#packages" className="mb-6 flex items-center gap-4 rounded-3xl bg-forest p-4 text-white shadow-soft transition-colors duration-150 hover:bg-deep">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-forest"><Sparkles className="size-6" aria-hidden /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold leading-tight"><T>Packages</T></span>
              <span className="block text-sm text-white/80"><T>Free to ₹5,000 a year</T></span>
            </span>
            <ArrowUpRight className="size-5 shrink-0" aria-hidden />
          </Link>
        </SheetClose>

        {groups.map((g) => (
          <section key={g.label} aria-label={g.label} className="mb-6">
            <h2 className="eyebrow mb-2 px-2"><T>{g.label}</T></h2>
            <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
              {g.items.map((it) => {
                const Icon = iconFor(it.href);
                const on = here(it.href);
                return (
                  <li key={it.href}>
                    <SheetClose asChild>
                      <Link
                        href={it.href}
                        aria-current={on ? "page" : undefined}
                        className={cn("flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-sage-light/50", on && "bg-sage-light/70")}
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage-light text-forest"><Icon className="size-5" aria-hidden /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold leading-snug text-forest"><T>{it.label}</T></span>
                          {it.description ? <span className="line-clamp-2 block text-sm leading-snug text-muted"><T>{it.description}</T></span> : null}
                        </span>
                        {on ? <Check className="size-5 shrink-0 text-deep" aria-hidden /> : <ChevronRight className="size-5 shrink-0 text-muted/70" aria-hidden />}
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>

      <div className="shrink-0 space-y-3 border-t border-line bg-white/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <SheetClose asChild>
          <Link href="/contact" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-6 font-semibold text-white transition-colors duration-150 hover:bg-deep">
            <T>Contact us</T> <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </SheetClose>
        <div className="flex items-center justify-between gap-3">
          <LanguageSwitch tone="light" />
          <div className="flex gap-2">
            <a href={`tel:${site.phone.tel}`} aria-label={`Call ${site.phone.display}`} className="inline-flex size-11 items-center justify-center rounded-full bg-sage-light text-forest transition-colors hover:bg-forest hover:text-white"><Phone className="size-5" aria-hidden /></a>
            <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} className="inline-flex size-11 items-center justify-center rounded-full bg-sage-light text-forest transition-colors hover:bg-forest hover:text-white"><Mail className="size-5" aria-hidden /></a>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
