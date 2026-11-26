import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, MapPin, PlayCircle } from "lucide-react";
import { T } from "@/components/i18n/T";
import { Button } from "@/components/ui/button";
import { images } from "@/content/images";
import { HeroTitle } from "./HeroTitle";

const quick = [
  { href: "/centres", label: "Find a centre", sub: "Ahmedabad · Dehgam", Icon: MapPin },
  { href: "/health-awareness-videos", label: "Watch health videos", sub: "Six talks on YouTube", Icon: PlayCircle },
  { href: "/e-books", label: "Download free guides", sub: "First aid, lifestyle and more (PDF)", Icon: Download },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/**
 * Full-screen, edge-to-edge hero that slides under the floating header.
 *
 * Phones and portrait tablets: the photograph has its own clear area on top (no text over the people) and fades into
 * a solid green panel that holds the text. A wide photo stretched over a tall screen had to be enlarged ~2.5×, which
 * made it blurry. Desktop and landscape: the photograph fills the screen with text on the shaded left side.
 */
export function Hero() {
  const img = images.hero;
  return (
    <section aria-labelledby="hero-title" className="relative isolate -mt-[5.5rem] flex min-h-[100svh] w-full flex-col overflow-hidden bg-forest text-white lg:justify-end">
      <div className="relative min-h-[min(19rem,44svh)] flex-1 overflow-hidden lg:absolute lg:inset-0 lg:-z-10 max-lg:landscape:absolute max-lg:landscape:inset-0 max-lg:landscape:-z-10">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          preload
          loading="eager"
          fetchPriority="high"
          quality={50}
          sizes="(max-width: 1023px) 150vw, 100vw"
          className="hero-photo object-cover object-[80%_35%] sm:object-[64%_45%] lg:object-[60%_center]"
        />
        {/* phones: only the edges are shaded, so the photograph stays clean */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-forest/45 to-transparent lg:hidden" />
        <div aria-hidden className="absolute inset-x-0 -bottom-px h-2/5 bg-gradient-to-t from-forest via-forest/70 to-transparent lg:hidden max-lg:landscape:hidden" />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-forest/90 via-forest/60 to-forest/10 max-lg:landscape:block lg:hidden" />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-forest/85 via-forest/40 via-50% to-transparent lg:block" />
      </div>

      <div className="container-hhc relative -mt-10 grid shrink-0 items-end gap-10 pb-[calc(6.75rem+env(safe-area-inset-bottom))] lg:mt-0 lg:grid-cols-[1.4fr_1fr] lg:pb-16 lg:pt-28 max-lg:landscape:mt-0 max-lg:landscape:pt-[5.75rem] max-lg:landscape:pb-[calc(6.25rem+env(safe-area-inset-bottom))]">
        <div className="max-lg:portrait:mx-auto max-lg:portrait:w-full max-lg:portrait:max-w-xl">
          <p className="eyebrow hhc-rise mb-3 flex items-center gap-2.5 !text-white/90 sm:mb-4">
            <span aria-hidden className="h-0.5 w-7 shrink-0 rounded-full bg-sage-light lg:hidden" />
            <span className="lg:hidden"><T>Human Health Circle</T></span>
            <span className="hidden lg:inline"><T>Human Health Circle · Gujarat, India</T></span>
          </p>
          <HeroTitle
            id="hero-title"
            text="Health knowledge, carried to where people live."
            className="max-w-3xl text-[clamp(1.85rem,9.2vw,3.4rem)] !leading-[1.12] !text-white lg:text-[clamp(2.15rem,8vw,4.9rem)] lg:!leading-[1.03] max-lg:landscape:text-4xl"
          />
          <p className="hhc-rise mt-3 text-base leading-relaxed text-white/85 [@media(max-height:620px)]:hidden lg:hidden" style={delay(650)}>
            <T>Community training, health-education material and doorstep medical camps.</T>
          </p>
          <p className="hhc-rise mt-5 hidden max-w-xl text-lg leading-relaxed text-white/90 lg:block" style={delay(650)}>
            <T>HHC trains communities, prepares health-education material and holds medical camps at the doorstep - drawing on Ayurveda, Naturopathy, Allopathy, Homeopathy and Yoga.</T>
          </p>
          <div className="hhc-rise mt-5 max-lg:landscape:mt-3 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center lg:mt-7" style={delay(800)}>
            <Button asChild size="lg" variant="white" className="max-sm:gap-1.5 max-sm:px-3 max-sm:text-sm max-[379px]:[&_svg]:hidden"><Link href="/about-us"><T>Learn about us</T> <ArrowRight aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline-light" className="max-sm:px-3 max-sm:text-sm"><Link href="/initiatives"><T>Our initiatives</T></Link></Button>
          </div>
        </div>

        <div className="hhc-rise hidden lg:block" style={delay(950)}>
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
