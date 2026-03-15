"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { fadeInFast } from "../motion/index";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
const searchInputVariants = cva(
  [
    "flex w-full items-center gap-2",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50"
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-sm"
      },
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted"
      }
    },
    defaultVariants: { size: "md", variant: "default" }
  }
);
function SearchIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function XIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function LoaderIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("animate-spin", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
    }
  );
}
const iconSizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
function useIsMac() {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)
    );
  }, []);
  return isMac;
}
const SearchInput = forwardRef(
  function SearchInput2({
    value: controlledValue,
    defaultValue = "",
    onChange,
    onDebouncedChange,
    debounce: debounceMs = 300,
    size = "md",
    variant = "default",
    shortcut,
    showClear = true,
    loading = false,
    placeholder = "Search...",
    className,
    disabled,
    ...rest
  }, ref) {
    const shouldReduce = useReducedMotion();
    const isMac = useIsMac();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const debounceTimer = useRef(null);
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => inputRef.current);
    const currentValue = controlledValue !== void 0 ? controlledValue : internalValue;
    const hasValue = currentValue.length > 0;
    const handleChange = useCallback(
      (e) => {
        const next = e.target.value;
        if (controlledValue === void 0) setInternalValue(next);
        onChange?.(next);
        if (onDebouncedChange) {
          if (debounceTimer.current) clearTimeout(debounceTimer.current);
          debounceTimer.current = setTimeout(
            () => onDebouncedChange(next),
            debounceMs
          );
        }
      },
      [controlledValue, onChange, onDebouncedChange, debounceMs]
    );
    const handleClear = useCallback(() => {
      if (controlledValue === void 0) setInternalValue("");
      onChange?.("");
      onDebouncedChange?.("");
      inputRef.current?.focus();
    }, [controlledValue, onChange, onDebouncedChange]);
    useEffect(() => {
      if (!shortcut) return;
      const handler = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === shortcut.toLowerCase()) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [shortcut]);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(searchInputVariants({ size, variant }), className),
        "data-ds": "",
        "data-ds-component": "search-input",
        "data-ds-size": size,
        children: [
          /* @__PURE__ */ jsx("span", { className: "shrink-0 text-muted-foreground pointer-events-none", children: loading ? /* @__PURE__ */ jsx(LoaderIcon, { className: iconSizeMap[size] }) : /* @__PURE__ */ jsx(SearchIcon, { className: iconSizeMap[size] }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              type: "search",
              value: currentValue,
              onChange: handleChange,
              placeholder,
              disabled,
              className: cn(
                "flex-1 h-full bg-transparent outline-none",
                "text-foreground placeholder:text-muted-foreground",
                "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              ),
              ...rest
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: showClear && hasValue && /* @__PURE__ */ jsx(
              motion.button,
              {
                type: "button",
                onClick: handleClear,
                disabled,
                "aria-label": "Clear search",
                className: cn(
                  "inline-flex items-center justify-center rounded-sm",
                  "text-muted-foreground hover:text-foreground transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                ),
                variants: shouldReduce ? void 0 : fadeInFast.variants,
                initial: shouldReduce ? { opacity: 0 } : "initial",
                animate: shouldReduce ? { opacity: 1 } : "animate",
                exit: shouldReduce ? { opacity: 0 } : "exit",
                transition: shouldReduce ? { duration: 0.1 } : fadeInFast.transition,
                "data-ds-animated": "",
                children: /* @__PURE__ */ jsx(XIcon, { className: iconSizeMap[size] })
              },
              "clear"
            ) }),
            shortcut && !hasValue && /* @__PURE__ */ jsxs(
              "kbd",
              {
                className: cn(
                  "hidden sm:inline-flex items-center gap-0.5",
                  "rounded-md border border-border",
                  "bg-muted/80 text-muted-foreground",
                  "font-sans font-medium tracking-wide",
                  "shadow-[0_1px_0_1px_rgba(0,0,0,0.15)] dark:shadow-[0_1px_0_1px_rgba(255,255,255,0.06)]",
                  "pointer-events-none select-none",
                  size === "sm" ? "h-5 min-w-5 px-1 text-[10px]" : "h-6 min-w-6 px-1.5 text-[11px]"
                ),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "opacity-70", children: isMac ? "\u2318" : "Ctrl" }),
                  /* @__PURE__ */ jsx("span", { children: shortcut.toUpperCase() })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
);
SearchInput.displayName = "SearchInput";
export {
  SearchInput,
  searchInputVariants
};
