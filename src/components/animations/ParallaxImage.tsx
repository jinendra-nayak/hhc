"use client";
import { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// Motion's scroll engine is fetched after hydration so it never competes with the first paint (LCP).
const ParallaxEffect = dynamic(() => import("./ParallaxEffect"), { ssr: false });

/** Image with a gentle parallax drift. The image itself is server-rendered; the motion is a progressive enhancement. */
export function ParallaxImage({
  className,
  strength = 40,
  alt,
  width: _width, // `fill` images size themselves; width/height must not be passed through (Next throws in dev)
  height: _height,
  ...img
}: Omit<ImageProps, "className" | "fill"> & { className?: string; strength?: number }) {
  void _width;
  void _height;
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const onOffset = useCallback((px: number) => {
    if (inner.current) inner.current.style.transform = `translate3d(0, ${px}px, 0)`;
  }, []);
  return (
    <div ref={outer} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute -inset-x-0 -inset-y-12 will-change-transform">
        <Image alt={alt} {...img} fill className="object-cover" />
      </div>
      <ParallaxEffect outer={outer} strength={strength} onOffset={onOffset} />
    </div>
  );
}
