import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-2xl border border-[#c9d1c8] bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors duration-150 focus-visible:border-sage focus-visible:outline-offset-0 aria-[invalid=true]:border-red-700";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(field, "h-12", className)} {...props} />,
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(field, "min-h-32 py-3", className)} {...props} />,
);
Textarea.displayName = "Textarea";
