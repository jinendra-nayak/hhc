import Link from "next/link";
import { T } from "@/components/i18n/T";
import { SlideUp } from "@/components/animations";

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: { label: React.ReactNode; href?: string }[];
}) {
  return (
    <header className="px-3 pt-2 sm:px-5">
      <div className="mx-auto max-w-[78rem] overflow-hidden rounded-[1.75rem] bg-sage-light/70 px-6 py-12 sm:rounded-[2.5rem] sm:px-10 lg:px-14 lg:py-20">
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-forest"><T>Home</T></Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.href ?? String(c.label)} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {c.href ? <Link href={c.href} className="hover:text-forest">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <SlideUp immediate as="h1" className="max-w-3xl text-4xl sm:text-5xl lg:text-[3.4rem]">
          {title}
        </SlideUp>
        {lead ? (
          <SlideUp immediate delay={0.1} as="p" className="mt-6 max-w-2xl text-lg text-muted lg:text-xl">
            {lead}
          </SlideUp>
        ) : null}
      </div>
    </header>
  );
}
