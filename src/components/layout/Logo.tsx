import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The original HHC logo (transparent PNG derived from the original JPG; not redrawn).
 * Aspect ratio 2000:1976 is preserved via width/height; only `size` (px height) changes.
 */
export function Logo({ size = 64, className, eager = false }: { size?: number; className?: string; eager?: boolean }) {
  return (
    <Link href="/" aria-label="Human Health Circle - home" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src="/images/brand/hhc-logo.png"
        alt="Human Health Circle logo"
        width={Math.round((size * 2000) / 1976)}
        height={size}
        loading={eager ? "eager" : "lazy"}
        sizes={`${size + 8}px`}
        style={{ height: size, width: "auto" }}
      />
    </Link>
  );
}
