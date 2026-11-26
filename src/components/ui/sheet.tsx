"use client";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* shadcn/ui Sheet (Radix Dialog): focus trap, Escape to close, scroll lock without layout shift, restores focus. */

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay ref={ref} className={cn("sheet-overlay fixed inset-0 z-[70] bg-forest/60", className)} {...props} />
));
SheetOverlay.displayName = "SheetOverlay";

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & { showClose?: boolean; side?: "right" | "bottom" }
>(({ className, children, showClose = true, side = "right", ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      data-side={side}
      className={cn(
        "sheet-content fixed z-[80] flex flex-col outline-none",
        side === "right"
          ? "inset-y-0 right-0 h-dvh w-[min(24rem,calc(100vw-0.75rem))] bg-cream shadow-[-20px_0_60px_-20px_rgb(0_0_0/0.45)] sm:rounded-l-[2rem]"
          : "inset-x-0 bottom-0 mx-auto h-[92dvh] max-h-[52rem] w-full max-w-2xl rounded-t-[2rem] border border-b-0 border-white/70 bg-cream/90 shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.45)] backdrop-blur-2xl",
        className,
      )}
      {...props}
    >
      {children}
      {showClose ? (
        <SheetPrimitive.Close className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-forest text-white transition-colors duration-150 hover:bg-deep focus-visible:outline-offset-2">
          <X aria-hidden className="size-5" />
          <span className="sr-only">Close menu</span>
        </SheetPrimitive.Close>
      ) : null}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
