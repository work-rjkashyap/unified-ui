"use client";
import { jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
const kbdVariants = cva(
  [
    "inline-flex items-center gap-0.5",
    "font-mono font-medium leading-none",
    "rounded border border-border",
    "bg-muted text-muted-foreground",
    "shadow-[0_1px_0_1px_hsl(var(--border))]",
    "select-none whitespace-nowrap"
  ],
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-1 text-xs",
        lg: "px-2.5 py-1 text-sm"
      }
    },
    defaultVariants: { size: "md" }
  }
);
const Kbd = forwardRef(function Kbd2({ size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "kbd",
    {
      ref,
      className: cn(kbdVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "kbd",
      "data-ds-size": size,
      ...rest,
      children
    }
  );
});
Kbd.displayName = "Kbd";
export {
  Kbd,
  kbdVariants
};
