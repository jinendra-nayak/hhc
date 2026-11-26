import type { NextConfig } from "next";
import { redirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  // Dev only: the "N / Issue" badge sat on top of the first tab of the phone tab bar and swallowed taps. Errors still surface.
  devIndicators: false,
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 70, 75], // Next 16 snaps any other `quality` to the allow-list
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
