import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "cream",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "white" | "sage" | "forest";
  id?: string;
  labelledBy?: string;
}) {
  const tones = {
    cream: "bg-cream",
    white: "bg-white",
    sage: "bg-sage-light/60",
    forest: "bg-forest text-white [&_h2]:text-white [&_h3]:text-white",
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("section-y scroll-mt-24", tones[tone], className)}>
      <div className="container-hhc">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  children,
  className,
  light,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  id?: string;
  children?: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("hhc-reveal max-w-2xl", className)}>
      {eyebrow ? <p className={cn("eyebrow mb-3 sm:mb-4", light && "!text-white/80")}>{eyebrow}</p> : null}
      <h2 id={id} className="text-[1.75rem] sm:text-4xl lg:text-[2.7rem]">
        {title}
      </h2>
      {children ? <div className={cn("mt-4 text-[1.0625rem] sm:mt-5 sm:text-lg", light ? "text-white/80" : "text-muted")}>{children}</div> : null}
    </div>
  );
}
