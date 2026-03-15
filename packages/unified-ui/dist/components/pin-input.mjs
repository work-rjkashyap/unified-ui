"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { pop, shakeX } from "../motion/index";
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
const pinCellVariants = cva(
  [
    // Layout
    "inline-flex items-center justify-center shrink-0",
    "rounded-md border bg-background",
    // Typography
    "text-center font-semibold tabular-nums leading-none",
    // Transition
    "transition-[border-color,box-shadow,background-color] duration-fast",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Cursor
    "cursor-text",
    // Remove native input styling
    "outline-none appearance-none",
    // Selection
    "select-none",
    // Hide caret — we use a custom one
    "caret-transparent"
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "focus:border-ring focus:ring-2 focus:ring-ring/20"
        ],
        primary: [
          "border-primary/40",
          "focus:border-primary focus:ring-2 focus:ring-primary/20"
        ]
      },
      size: {
        sm: "w-8 h-10 text-base",
        md: "w-10 h-12 text-lg",
        lg: "w-12 h-14 text-xl"
      },
      state: {
        empty: "",
        filled: "bg-accent/30",
        active: "",
        error: "border-danger focus:border-danger focus:ring-danger/20",
        success: "border-success focus:border-success focus:ring-success/20"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "empty"
    }
  }
);
const allowedPatterns = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alphabetic: /^[a-zA-Z]$/
};
const MASK_CHAR = "\u2022";
const PinInput = forwardRef(
  function PinInput2({
    length = 6,
    value: controlledValue,
    defaultValue,
    onChange,
    onComplete,
    onClear,
    type = "numeric",
    variant = "default",
    size = "md",
    mask = false,
    error = false,
    success = false,
    disabled = false,
    "aria-label": ariaLabel = "PIN Input",
    autoFocus = false,
    gap = "gap-2",
    className
  }, ref) {
    const shouldReduce = useReducedMotion();
    const [internalValue, setInternalValue] = useState(() => {
      const initial = defaultValue ?? controlledValue ?? [];
      return Array.from({ length }, (_, i) => initial[i] ?? "");
    });
    const cells = controlledValue !== void 0 ? Array.from({ length }, (_, i) => controlledValue[i] ?? "") : internalValue;
    const [animatedIndex, setAnimatedIndex] = useState(null);
    const [shakeKey, setShakeKey] = useState(0);
    const inputRefs = useRef([]);
    const containerRef = useRef(null);
    useImperativeHandle(ref, () => containerRef.current);
    useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus]);
    const prevErrorRef = useRef(error);
    useEffect(() => {
      if (error && !prevErrorRef.current) {
        setShakeKey((k) => k + 1);
      }
      prevErrorRef.current = error;
    }, [error]);
    const commit = useCallback(
      (newCells) => {
        if (controlledValue === void 0) {
          setInternalValue(newCells);
        }
        onChange?.(newCells);
        const allFilled = newCells.every((c) => c.length === 1);
        if (allFilled) {
          onComplete?.(newCells.join(""));
        }
      },
      [controlledValue, onChange, onComplete]
    );
    const handleKeyDown = useCallback(
      (e, index) => {
        const pattern = allowedPatterns[type];
        if (e.key === "Backspace") {
          e.preventDefault();
          const newCells = [...cells];
          if (newCells[index]) {
            newCells[index] = "";
            commit(newCells);
          } else if (index > 0) {
            newCells[index - 1] = "";
            commit(newCells);
            inputRefs.current[index - 1]?.focus();
          } else {
            const cleared = Array.from({ length }, () => "");
            commit(cleared);
            onClear?.();
          }
          return;
        }
        if (e.key === "Delete") {
          e.preventDefault();
          const newCells = [...cells];
          newCells[index] = "";
          commit(newCells);
          return;
        }
        if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault();
          inputRefs.current[index - 1]?.focus();
          return;
        }
        if (e.key === "ArrowRight" && index < length - 1) {
          e.preventDefault();
          inputRefs.current[index + 1]?.focus();
          return;
        }
        if (e.key === "Home") {
          e.preventDefault();
          inputRefs.current[0]?.focus();
          return;
        }
        if (e.key === "End") {
          e.preventDefault();
          inputRefs.current[length - 1]?.focus();
          return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          const char = e.key.toUpperCase();
          if (!pattern.test(type === "numeric" ? e.key : char)) return;
          const newCells = [...cells];
          newCells[index] = type === "numeric" ? e.key : char;
          commit(newCells);
          setAnimatedIndex(index);
          setTimeout(() => setAnimatedIndex(null), 400);
          if (index < length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
        }
      },
      [cells, commit, length, type, onClear]
    );
    const handlePaste = useCallback(
      (e, startIndex) => {
        e.preventDefault();
        const raw = e.clipboardData.getData("text");
        const pattern = allowedPatterns[type];
        const chars = raw.split("").filter((c) => pattern.test(type === "numeric" ? c : c.toUpperCase())).map((c) => type === "numeric" ? c : c.toUpperCase());
        if (chars.length === 0) return;
        const newCells = [...cells];
        let lastFilled = startIndex;
        for (let i = 0; i < chars.length && startIndex + i < length; i++) {
          newCells[startIndex + i] = chars[i];
          lastFilled = startIndex + i;
        }
        commit(newCells);
        const focusTarget = Math.min(lastFilled + 1, length - 1);
        inputRefs.current[focusTarget]?.focus();
      },
      [cells, commit, length, type]
    );
    const handleClick = useCallback(
      (index) => {
        const firstEmpty = cells.findIndex((c) => !c);
        if (firstEmpty !== -1 && firstEmpty < index) {
          inputRefs.current[firstEmpty]?.focus();
        } else {
          inputRefs.current[index]?.focus();
        }
      },
      [cells]
    );
    const containerState = error ? "error" : success ? "success" : void 0;
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: containerRef,
        className: cn("inline-flex", gap, className),
        variants: shakeX.variants,
        initial: shakeKey === 0 ? false : "initial",
        animate: shakeKey > 0 ? "animate" : "initial",
        transition: shakeX.transition,
        "aria-label": ariaLabel,
        "data-ds": "",
        "data-ds-component": "pin-input",
        "data-ds-variant": variant,
        "data-ds-size": size,
        "data-ds-animated": "",
        children: Array.from({ length }, (_, index) => {
          const cellValue = cells[index] ?? "";
          const isFilled = cellValue.length === 1;
          const cellState = containerState ?? (isFilled ? "filled" : "empty");
          return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(AnimatePresence, { children: animatedIndex === index && isFilled && !shouldReduce && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-md bg-primary/15 pointer-events-none",
                variants: pop.variants,
                initial: "initial",
                animate: "animate",
                exit: "exit",
                transition: pop.transition,
                "data-ds-animated": ""
              }
            ) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: (el) => {
                  inputRefs.current[index] = el;
                },
                type: mask ? "password" : "text",
                inputMode: type === "numeric" ? "numeric" : "text",
                pattern: type === "numeric" ? "[0-9]*" : type === "alphabetic" ? "[a-zA-Z]*" : "[a-zA-Z0-9]*",
                maxLength: 1,
                value: mask && isFilled ? MASK_CHAR : cellValue,
                readOnly: true,
                autoComplete: index === 0 ? "one-time-code" : "off",
                autoCorrect: "off",
                autoCapitalize: "none",
                spellCheck: false,
                disabled,
                onClick: () => handleClick(index),
                onKeyDown: (e) => handleKeyDown(e, index),
                onPaste: (e) => handlePaste(e, index),
                onChange: () => {
                },
                className: cn(
                  pinCellVariants({
                    variant,
                    size,
                    state: cellState
                  }),
                  // Override focus ring with our variant-specific ring
                  "focus:outline-none"
                ),
                "aria-label": `Digit ${index + 1} of ${length}`,
                "aria-invalid": error ? "true" : void 0,
                "data-ds-cell-index": index,
                "data-ds-filled": isFilled ? "" : void 0
              }
            )
          ] }, index);
        })
      },
      shakeKey
    );
  }
);
PinInput.displayName = "PinInput";
export {
  PinInput,
  pinCellVariants
};
