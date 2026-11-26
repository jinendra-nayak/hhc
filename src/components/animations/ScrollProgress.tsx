"use client";
import dynamic from "next/dynamic";

// Decorative; loaded after hydration so Motion's spring/scroll code stays off the critical path.
export const ScrollProgress = dynamic(() => import("./ScrollProgressBar"), { ssr: false });
