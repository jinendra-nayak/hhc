"use client";
import { m } from "motion/react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "className"> & {
  className?: string; // wrapper classes (sizing / aspect ratio)
  imageClassName?: string;
  caption?: string;
};

/** Image opens out of an inset frame (≈700 ms) when it scrolls into view. Fully visible without JS. */
export function ImageReveal({ className, imageClassName, caption, alt, ...img }: Props) {
  return (
    <figure className={cn("relative overflow-hidden rounded-3xl", className)}>
      <m.div
        className="absolute inset-0"
        // Never collapse to zero area: observers (and native lazy-loading) would never see the image.
        initial={{ opacity: 0, clipPath: "inset(7% 7% 7% 7%)", scale: 1.05 }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image alt={alt} {...img} className={cn("object-cover", imageClassName)} />
      </m.div>
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 bg-forest/85 px-3 py-1 text-[0.8125rem] tracking-wide text-white">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
