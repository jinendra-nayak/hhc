import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { T } from "@/components/i18n/T";
import { footerLinks, site } from "@/content/site";

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1Z"/></svg>
);

const social = [
  { href: site.social.youtube, label: "HHC on YouTube", icon: <YouTubeIcon /> },
  { href: site.social.instagram, label: "HHC on Instagram", icon: <InstagramIcon /> },
  { href: site.social.facebook, label: "HHC on Facebook", icon: <FacebookIcon /> },
];

/**
 * Footer: one rounded panel (brand, contact, link groups) on the brand green, then a slim bar.
 * The bottom padding on phones keeps the last line clear of the fixed tab bar — it lives INSIDE the footer
 * so the green runs to the very bottom of the page (no empty strip under it).
 */
export function Footer() {
  return (
    <footer className="mt-4 rounded-t-[2rem] bg-forest text-white/80">
      <div className="container-hhc pb-28 pt-8 lg:pb-8 lg:pt-10">
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-14 lg:p-10">
          <div>
            <div className="flex items-center gap-4">
              {/* original logo on a round white badge so the multicolour artwork is shown unaltered */}
              <span className="grid size-[4.5rem] shrink-0 place-items-center rounded-full bg-white"><Logo size={56} /></span>
              <p className="font-heading text-2xl leading-tight text-white">Human Health Circle</p>
            </div>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed"><T>{site.description}</T></p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`tel:${site.phone.tel}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-[0.95rem] font-semibold text-forest transition-colors duration-150 hover:bg-sage-light">
                <Phone className="size-4" aria-hidden /> {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-[0.95rem] font-medium text-white transition-colors duration-150 hover:bg-white/10">
                <Mail className="size-4" aria-hidden /> <span className="break-all">{site.email}</span>
              </a>
            </div>
            <p className="mt-4 flex items-start gap-2 text-[0.95rem]">
              <MapPin className="mt-1 size-4 shrink-0 text-white/60" aria-hidden />
              <span><T>Ahmedabad · Dehgam · Vadodara · Anand, Gujarat</T> — <Link className="underline underline-offset-2 hover:text-white" href="/centres"><T>see centres</T></Link></span>
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h2 className="mb-3 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.14em] !text-white/70"><T>{heading}</T></h2>
                <ul className="space-y-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-center gap-1 py-1 text-[0.95rem] transition-colors duration-150 hover:text-white">
                        <T>{l.label}</T>
                        <ArrowUpRight aria-hidden className="size-3.5 -translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/65">© {new Date().getFullYear()} Human Health Circle. <T>All rights reserved.</T></p>
          <ul className="flex gap-2">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-150 hover:bg-white hover:text-forest">
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
