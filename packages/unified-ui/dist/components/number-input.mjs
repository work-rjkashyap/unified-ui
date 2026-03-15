"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
const numberInputVariants = cva(
  [
    "inline-flex items-stretch overflow-hidden",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50"
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        primary: "border-primary/40 focus-within:border-primary focus-within:ring-primary/20"
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
const stepperButtonBase = [
  "inline-flex items-center justify-center shrink-0",
  "bg-transparent",
  "text-muted-foreground hover:text-foreground hover:bg-accent",
  "transition-colors duration-fast",
  "disabled:pointer-events-none disabled:opacity-40",
  "select-none",
  "active:bg-accent/80",
  focusRingClasses
];
function PlusIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" })
    }
  );
}
function MinusIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M5 12h14" })
    }
  );
}
function clamp(value, min, max) {
  let v = value;
  if (min !== void 0) v = Math.max(min, v);
  if (max !== void 0) v = Math.min(max, v);
  return v;
}
function roundToPrecision(value, precision) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
const ROLL_DISTANCE = 12;
const ROLL_TRANSITION = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1]
};
function AnimatedValue({
  value,
  formatValue,
  shouldReduce,
  direction
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [key, setKey] = useState(0);
  useEffect(() => {
    setDisplayValue(value);
    setKey((k) => k + 1);
  }, [value]);
  if (shouldReduce) {
    return /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: formatValue(displayValue) });
  }
  const enterY = direction === "down" ? -ROLL_DISTANCE : ROLL_DISTANCE;
  const exitY = direction === "down" ? ROLL_DISTANCE : -ROLL_DISTANCE;
  const variants = {
    initial: { opacity: 0, y: enterY },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: exitY }
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "relative inline-block overflow-hidden leading-none",
      "aria-live": "polite",
      "aria-atomic": "true",
      children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsx(
        motion.span,
        {
          className: "inline-block tabular-nums",
          variants,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          transition: ROLL_TRANSITION,
          "data-ds-animated": "",
          children: formatValue(displayValue)
        },
        key
      ) })
    }
  );
}
const buttonWidthMap = {
  sm: "w-7",
  md: "w-8",
  lg: "w-9"
};
const iconSizeMap = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4"
};
const inputPaddingMap = {
  sm: "px-2 min-w-[3.5rem]",
  md: "px-3 min-w-[4rem]",
  lg: "px-3 min-w-[4.5rem]"
};
const NumberInput = forwardRef(
  function NumberInput2({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min,
    max,
    step = 1,
    precision = 0,
    variant = "default",
    size = "md",
    disabled = false,
    readOnly = false,
    "aria-label": ariaLabel,
    formatValue,
    parseValue,
    incrementLabel = "Increment",
    decrementLabel = "Decrement",
    className,
    ...rest
  }, ref) {
    const shouldReduce = useReducedMotion();
    const [internalValue, setInternalValue] = useState(
      () => roundToPrecision(clamp(defaultValue, min, max), precision)
    );
    const [inputRaw, setInputRaw] = useState(null);
    const [direction, setDirection] = useState("none");
    const inputRef = useRef(null);
    const prevValueRef = useRef(
      controlledValue ?? roundToPrecision(clamp(defaultValue, min, max), precision)
    );
    const currentValue = controlledValue !== void 0 ? controlledValue : internalValue;
    useEffect(() => {
      if (controlledValue !== void 0 && controlledValue !== prevValueRef.current) {
        setDirection(controlledValue > prevValueRef.current ? "up" : "down");
        prevValueRef.current = controlledValue;
      }
    }, [controlledValue]);
    const resolvedFormat = formatValue ?? ((v) => v.toFixed(precision));
    const resolvedParse = parseValue ?? ((raw) => Number.parseFloat(raw.replace(/[^0-9.-]/g, "")));
    const commit = useCallback(
      (next) => {
        const clamped = roundToPrecision(clamp(next, min, max), precision);
        if (clamped !== currentValue) {
          setDirection(clamped > currentValue ? "up" : "down");
          prevValueRef.current = clamped;
        }
        if (controlledValue === void 0) {
          setInternalValue(clamped);
        }
        if (clamped !== currentValue) {
          onChange?.(clamped);
        }
        return clamped;
      },
      [controlledValue, min, max, precision, currentValue, onChange]
    );
    const increment = useCallback(
      (multiplier = 1) => commit(currentValue + step * multiplier),
      [commit, currentValue, step]
    );
    const decrement = useCallback(
      (multiplier = 1) => commit(currentValue - step * multiplier),
      [commit, currentValue, step]
    );
    const isAtMin = min !== void 0 && currentValue <= min;
    const isAtMax = max !== void 0 && currentValue >= max;
    const handleKeyDown = useCallback(
      (e) => {
        if (disabled || readOnly) return;
        const multiplier = e.shiftKey ? 10 : 1;
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            increment(multiplier);
            break;
          case "ArrowDown":
            e.preventDefault();
            decrement(multiplier);
            break;
          case "Home":
            if (min !== void 0) {
              e.preventDefault();
              commit(min);
            }
            break;
          case "End":
            if (max !== void 0) {
              e.preventDefault();
              commit(max);
            }
            break;
          default:
            break;
        }
      },
      [disabled, readOnly, increment, decrement, commit, min, max]
    );
    const handleInputFocus = useCallback(() => {
      setInputRaw(String(currentValue));
    }, [currentValue]);
    const handleInputChange = useCallback(
      (e) => {
        setInputRaw(e.target.value);
      },
      []
    );
    const handleInputBlur = useCallback(() => {
      if (inputRaw !== null) {
        const parsed = resolvedParse(inputRaw);
        if (!Number.isNaN(parsed)) {
          commit(parsed);
        }
        setInputRaw(null);
      }
    }, [inputRaw, resolvedParse, commit]);
    const handleInputKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter") {
          inputRef.current?.blur();
        }
        if (e.key === "Escape") {
          setInputRaw(null);
          inputRef.current?.blur();
        }
      },
      []
    );
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        role: "spinbutton",
        "aria-valuenow": currentValue,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-label": ariaLabel,
        "aria-disabled": disabled,
        "aria-readonly": readOnly,
        tabIndex: -1,
        onKeyDown: handleKeyDown,
        className: cn(numberInputVariants({ variant, size }), className),
        "data-ds": "",
        "data-ds-component": "number-input",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...rest,
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: 0,
              onClick: () => decrement(),
              disabled: disabled || readOnly || isAtMin,
              "aria-label": decrementLabel,
              className: cn(
                stepperButtonBase,
                buttonWidthMap[size],
                "border-r border-input/60"
              ),
              children: /* @__PURE__ */ jsx(MinusIcon, { className: iconSizeMap[size] })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "relative flex-1 flex items-center justify-center", children: inputRaw !== null ? (
            // Editing mode: show raw <input>
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                inputMode: "decimal",
                value: inputRaw,
                onChange: handleInputChange,
                onBlur: handleInputBlur,
                onKeyDown: handleInputKeyDown,
                disabled,
                readOnly,
                className: cn(
                  "w-full h-full bg-transparent text-center outline-none",
                  "tabular-nums text-foreground",
                  inputPaddingMap[size]
                )
              }
            )
          ) : (
            // Display mode: animated value
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                tabIndex: 0,
                disabled: disabled || readOnly,
                onFocus: handleInputFocus,
                onClick: handleInputFocus,
                className: cn(
                  "w-full h-full flex items-center justify-center",
                  "bg-transparent outline-none",
                  "text-foreground",
                  "cursor-text",
                  inputPaddingMap[size],
                  focusRingClasses
                ),
                "aria-label": `Current value: ${resolvedFormat(currentValue)}, press to edit`,
                children: /* @__PURE__ */ jsx(
                  AnimatedValue,
                  {
                    value: currentValue,
                    formatValue: resolvedFormat,
                    shouldReduce: shouldReduce ?? false,
                    direction
                  }
                )
              }
            )
          ) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: 0,
              onClick: () => increment(),
              disabled: disabled || readOnly || isAtMax,
              "aria-label": incrementLabel,
              className: cn(
                stepperButtonBase,
                buttonWidthMap[size],
                "border-l border-input/60"
              ),
              children: /* @__PURE__ */ jsx(PlusIcon, { className: iconSizeMap[size] })
            }
          )
        ]
      }
    );
  }
);
NumberInput.displayName = "NumberInput";
export {
  NumberInput,
  numberInputVariants
};
