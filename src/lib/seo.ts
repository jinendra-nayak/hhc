import type { Metadata } from "next";
import { site } from "@/content/site";

export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const og = image ?? "/images/brand/icon-512.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url,
      locale: "en_IN",
      images: [{ url: og }],
    },
    twitter: { card: "summary", title: `${title} | ${site.name}`, description, images: [og] },
  };
}
