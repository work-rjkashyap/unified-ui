"use client";
import { jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { AspectRatio as AspectRatioPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
const AspectRatio = forwardRef(function AspectRatio2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    AspectRatioPrimitive.Root,
    {
      ref,
      className: cn("relative overflow-hidden", className),
      "data-ds": "",
      "data-ds-component": "aspect-ratio",
      ...rest
    }
  );
});
AspectRatio.displayName = "AspectRatio";
export {
  AspectRatio
};
