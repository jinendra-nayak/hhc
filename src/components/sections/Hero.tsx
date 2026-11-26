import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, MapPin, PlayCircle } from "lucide-react";
import { T } from "@/components/i18n/T";
import { Button } from "@/components/ui/button";
import { images } from "@/content/images";

const quick = [
  { href: "/centres", label: "Find a centre", sub: "Ahmedabad · Dehgam · Vadodara · Anand", Icon: MapPin },
  { href: "/health-awareness-videos", label: "Watch health videos", sub: "Six talks on YouTube", Icon: PlayCircle },
  { href: "/e-books", label: "Download free guides", sub: "First aid, lifestyle and more (PDF)", Icon: Download },
];

/** Full-screen, edge-to-edge hero. It slides under the floating header (main has matching top padding). */
export function Hero() {
  const img = images.hero;
  return (
    <section aria-labelledby="hero-title" className="relative isolate -mt-[5.5rem] flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-forest text-white">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        preload
        loading="eager"
        fetchPriority="high"
        quality={60}
        sizes="(max-width: 640px) 420px, 100vw"
        className="-z-10 object-cover object-[54%_35%] sm:object-[58%_38%] lg:object-[60%_center]"
      />
      {/* lighter on the right so the photograph stays visible; stronger botanical green gradient on mobile for white-text readability */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/95 via-forest/75 via-55% to-forest/35 lg:bg-gradient-to-r lg:from-forest/85 lg:via-forest/40 lg:via-50% lg:to-transparent" />

      <div className="container-hhc grid items-end gap-10 pb-32 pt-28 sm:pt-32 lg:grid-cols-[1.4fr_1fr] lg:pb-16">
        <div>
          <p className="eyebrow mb-3 !text-white/90 sm:mb-4 lg:!text-white/85"><T>Human Health Circle · Gujarat, India</T></p>
          <h1 id="hero-title" className="max-w-3xl text-[clamp(2.15rem,8vw,4.9rem)] !leading-[1.12] !text-white lg:!leading-[1.03]">
            <T>Health knowledge, carried to where people live.</T>
          </h1>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/95 sm:mt-5 sm:text-lg lg:text-white/90">
            <T>HHC trains communities, prepares health-education material and holds medical camps at the doorstep - drawing on Ayurveda, Naturopathy, Allopathy, Homeopathy and Yoga.</T>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <Button asChild size="lg" variant="white"><Link href="/about-us"><T>Learn about us</T> <ArrowRight aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline-light"><Link href="/initiatives"><T>Our initiatives</T></Link></Button>
            <Link href="/contact" className="link-sweep px-2 py-3 font-semibold text-white"><T>Contact us</T></Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <ul className="divide-y divide-white/20 overflow-hidden rounded-3xl border border-white/25 bg-forest/70">
            {quick.map(({ href, label, sub, Icon }) => (
              <li key={href}>
                <Link href={href} className="group flex items-center gap-4 p-4 transition-colors duration-150 hover:bg-white/10">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-forest"><Icon className="size-5" aria-hidden /></span>
                  <span className="flex-1">
                    <span className="block font-semibold"><T>{label}</T></span>
                    <span className="block text-sm text-white/75"><T>{sub}</T></span>
                  </span>
                  <ArrowUpRight className="size-5 opacity-70" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
