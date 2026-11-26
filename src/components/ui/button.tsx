import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* shadcn/ui Button, restyled for HHC (180 ms transitions, 6px radius). */
export const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 text-center rounded-full text-[0.95rem] font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-150 hover:shadow-[0_8px_20px_-8px_rgb(23_63_53/0.45)] [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-200 hover:[&_svg:last-child]:translate-x-0.5 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "bg-forest text-white hover:bg-deep",
        white: "bg-white text-forest hover:bg-sage-light",
        outline: "border border-forest/30 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-white",
        "outline-light": "border border-white/60 text-white hover:bg-white hover:text-forest",
        ghost: "text-forest hover:bg-sage-light",
        link: "text-deep underline underline-offset-4 hover:text-forest px-0 h-auto",
      },
      size: { default: "min-h-12 px-6 py-2.5", sm: "min-h-10 px-4 py-2 text-sm", lg: "min-h-14 px-7 py-3 text-base" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";
