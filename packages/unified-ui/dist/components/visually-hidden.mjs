"use client";
import { jsx } from "react/jsx-runtime";
import { VisuallyHidden as VisuallyHiddenPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
const VisuallyHidden = forwardRef(function VisuallyHidden2(props, ref) {
  return /* @__PURE__ */ jsx(
    VisuallyHiddenPrimitive.Root,
    {
      ref,
      "data-ds": "",
      "data-ds-component": "visually-hidden",
      ...props
    }
  );
});
VisuallyHidden.displayName = "VisuallyHidden";
export {
  VisuallyHidden
};
