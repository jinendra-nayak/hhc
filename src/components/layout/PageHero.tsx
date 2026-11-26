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
      <div className="mx-auto max-w-[78rem] overflow-hidden rounded-[1.75rem] bg-sage-light/70 px-5 pb-8 pt-4 sm:rounded-[2.5rem] sm:px-10 sm:py-12 lg:px-14 lg:py-20">
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted sm:mb-6">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center hover:text-forest sm:min-h-0"><T>Home</T></Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.href ?? String(c.label)} className={c.href ? "flex items-center gap-2" : "flex items-center gap-2 max-sm:sr-only"}>
                  <span aria-hidden>/</span>
                  {c.href ? <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-forest sm:min-h-0">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow mb-3 sm:mb-4">{eyebrow}</p> : null}
        <SlideUp immediate as="h1" className="max-w-3xl text-[2rem] sm:text-5xl lg:text-[3.4rem]">
          {title}
        </SlideUp>
        {lead ? (
          <SlideUp immediate delay={0.1} as="p" className="mt-3 max-w-2xl text-[1.0625rem] text-muted sm:mt-6 sm:text-lg lg:text-xl">
            {lead}
          </SlideUp>
        ) : null}
      </div>
    </header>
  );
}
