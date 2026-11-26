"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { T } from "@/components/i18n/T";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navItemClass,
} from "@/components/ui/navigation-menu";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { activeIndex, iconFor } from "./nav-shared";

/** Desktop menu: shadcn/ui Navigation Menu (Radix) - hover-intent, keyboard arrows, shared animated panel. */
export function DesktopNav() {
  const pathname = usePathname();
  const active = activeIndex(pathname);
  const groups = nav.filter((g) => g.items);
  return (
    <NavigationMenu aria-label="Main" delayDuration={80} skipDelayDuration={300} className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={active === 0}>
            <Link href="/" className={navItemClass} data-current={active === 0}><T>Home</T></Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {groups.map((g, i) => {
          const items = g.items!;
          const wide = items.length > 3;
          return (
            <NavigationMenuItem key={g.label}>
              <NavigationMenuTrigger data-current={active === i + 1}><T>{g.label}</T></NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className={cn("grid gap-1 p-3", wide ? "w-[40rem] grid-cols-2" : "w-[24rem] grid-cols-1")}>
                  {items.map((it) => {
                    const Icon = iconFor(it.href);
                    return (
                      <li key={it.href}>
                        <NavigationMenuLink asChild active={pathname === it.href}>
                          <Link href={it.href} className="group flex items-start gap-4 rounded-2xl p-3.5 outline-none transition-colors duration-150 hover:bg-sage-light/60 focus-visible:bg-sage-light/60 aria-[current=page]:bg-sage-light/60">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sage-light text-forest transition-colors duration-150 group-hover:bg-forest group-hover:text-white">
                              <Icon className="size-5" aria-hidden />
                            </span>
                            <span>
                              <span className="flex items-center gap-1 text-base font-semibold text-forest">
                                <T>{it.label}</T>
                                <ArrowUpRight aria-hidden className="size-3.5 -translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                              </span>
                              {it.description ? <span className="mt-0.5 block text-sm leading-snug text-muted"><T>{it.description}</T></span> : null}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                  <li className={cn(wide && "col-span-2")}>
                    <div className="mt-1 flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm text-muted">
                      <span><T>Questions? Call HHC</T></span>
                      <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2 font-semibold text-forest"><Phone className="size-4" aria-hidden />{site.phone.display}</a>
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}

        <NavigationMenuItem>
          <NavigationMenuLink asChild active={active === 5}>
            <Link href="/health-assurance-mission#packages" className={navItemClass} data-current={active === 5}><T>Packages</T></Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
