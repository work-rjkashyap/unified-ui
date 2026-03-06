"use client";

// ============================================================================
// Unified UI — NumberInput Component
// ============================================================================
// A production-ready numeric stepper input with increment/decrement buttons,
// min/max clamping, step snapping, and keyboard support.
//
// Features:
//   - Increment / decrement stepper buttons (+ / −)
//   - min, max, step clamping with validation
//   - Keyboard: ArrowUp/Down to step, Shift+Arrow to step × 10, Home/End for min/max
//   - Size variants: sm, md, lg
//   - Visual variants: default, primary
//   - Framer Motion: AnimatePresence + directional slide (up on increment, down on decrement)
//   - Respects prefers-reduced-motion
//   - Full ref forwarding
//   - WCAG AA: role="spinbutton", aria-valuenow/min/max, aria-label
//
// Usage:
//   <NumberInput defaultValue={0} min={0} max={100} />
//   <NumberInput value={qty} onChange={setQty} step={5} />
//   <NumberInput size="sm" variant="primary" />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// CVA — Container Variants
// ---------------------------------------------------------------------------

export const numberInputVariants = cva(
  [
    "inline-flex items-stretch overflow-hidden",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        primary:
          "border-primary/40 focus-within:border-primary focus-within:ring-primary/20",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Stepper Button (Internal)
// ---------------------------------------------------------------------------

const stepperButtonBase = [
  "inline-flex items-center justify-center shrink-0",
  "bg-transparent",
  "text-muted-foreground hover:text-foreground hover:bg-accent",
  "transition-colors duration-fast",
  "disabled:pointer-events-none disabled:opacity-40",
  "select-none",
  "active:bg-accent/80",
  focusRingClasses,
];

// ---------------------------------------------------------------------------
// Icons (Internal)
// ---------------------------------------------------------------------------

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NumberInputVariant = "default" | "primary";
export type NumberInputSize = "sm" | "md" | "lg";

export interface NumberInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The current value (controlled).
   */
  value?: number;

  /**
   * The initial value (uncontrolled).
   * @default 0
   */
  defaultValue?: number;

  /**
   * Callback when the value changes.
   */
  onChange?: (value: number) => void;

  /**
   * Minimum allowed value.
   */
  min?: number;

  /**
   * Maximum allowed value.
   */
  max?: number;

  /**
   * Step increment/decrement amount.
   * @default 1
   */
  step?: number;

  /**
   * Number of decimal places to display/allow.
   * @default 0
   */
  precision?: number;

  /**
   * Visual variant.
   * @default "default"
   */
  variant?: NumberInputVariant;

  /**
   * Size variant.
   * @default "md"
   */
  size?: NumberInputSize;

  /**
   * Whether the input is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Accessible label for the input (required for icon-only usage).
   */
  "aria-label"?: string;

  /**
   * Custom format function for the displayed value.
   */
  formatValue?: (value: number) => string;

  /**
   * Custom parse function for converting input string to number.
   */
  parseValue?: (raw: string) => number;

  /**
   * Accessible label for the increment button.
   * @default "Increment"
   */
  incrementLabel?: string;

  /**
   * Accessible label for the decrement button.
   * @default "Decrement"
   */
  decrementLabel?: string;

  /** Additional CSS classes on the container. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Clamp + round helper
// ---------------------------------------------------------------------------

function clamp(value: number, min?: number, max?: number): number {
  let v = value;
  if (min !== undefined) v = Math.max(min, v);
  if (max !== undefined) v = Math.min(max, v);
  return v;
}

function roundToPrecision(value: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

// ---------------------------------------------------------------------------
// Animated display (Internal)
// ---------------------------------------------------------------------------

type SlideDirection = "up" | "down" | "none";

interface AnimatedValueProps {
  value: number;
  formatValue: (v: number) => string;
  shouldReduce: boolean;
  direction: SlideDirection;
}

const ROLL_DISTANCE = 12;
const ROLL_TRANSITION = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

function AnimatedValue({
  value,
  formatValue,
  shouldReduce,
  direction,
}: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setDisplayValue(value);
    setKey((k) => k + 1);
  }, [value]);

  if (shouldReduce) {
    return <span className="tabular-nums">{formatValue(displayValue)}</span>;
  }

  // Slide-up on increment: enter from below (y: +d → 0), exit upward (y: 0 → -d)
  // Slide-down on decrement: enter from above (y: -d → 0), exit downward (y: 0 → +d)
  const enterY = direction === "down" ? -ROLL_DISTANCE : ROLL_DISTANCE;
  const exitY = direction === "down" ? ROLL_DISTANCE : -ROLL_DISTANCE;

  const variants = {
    initial: { opacity: 0, y: enterY },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: exitY },
  };

  return (
    <span
      className="relative inline-block overflow-hidden leading-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={key}
          className="inline-block tabular-nums"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={ROLL_TRANSITION}
          data-ds-animated=""
        >
          {formatValue(displayValue)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const buttonWidthMap: Record<NumberInputSize, string> = {
  sm: "w-7",
  md: "w-8",
  lg: "w-9",
};

const iconSizeMap: Record<NumberInputSize, string> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
};

const inputPaddingMap: Record<NumberInputSize, string> = {
  sm: "px-2 min-w-[3.5rem]",
  md: "px-3 min-w-[4rem]",
  lg: "px-3 min-w-[4.5rem]",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * NumberInput — a stepper input for numeric values.
 *
 * @example
 * // Basic
 * <NumberInput defaultValue={0} min={0} max={100} />
 *
 * // Controlled
 * <NumberInput value={qty} onChange={setQty} step={5} min={0} max={50} />
 *
 * // Currency
 * <NumberInput
 *   defaultValue={9.99}
 *   precision={2}
 *   step={0.01}
 *   formatValue={(v) => `$${v.toFixed(2)}`}
 * />
 *
 * // Small / read-only
 * <NumberInput size="sm" readOnly value={42} />
 */
export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  function NumberInput(
    {
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
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();

    // ----- State -----
    const [internalValue, setInternalValue] = useState<number>(() =>
      roundToPrecision(clamp(defaultValue, min, max), precision),
    );
    const [inputRaw, setInputRaw] = useState<string | null>(null); // null = not editing
    const [direction, setDirection] = useState<SlideDirection>("none");
    const inputRef = useRef<HTMLInputElement>(null);
    const prevValueRef = useRef<number>(
      controlledValue ?? roundToPrecision(clamp(defaultValue, min, max), precision),
    );

    const currentValue =
      controlledValue !== undefined ? controlledValue : internalValue;

    // Sync direction when controlled value changes externally
    useEffect(() => {
      if (controlledValue !== undefined && controlledValue !== prevValueRef.current) {
        setDirection(controlledValue > prevValueRef.current ? "up" : "down");
        prevValueRef.current = controlledValue;
      }
    }, [controlledValue]);

    const resolvedFormat = formatValue ?? ((v: number) => v.toFixed(precision));
    const resolvedParse =
      parseValue ??
      ((raw: string) => Number.parseFloat(raw.replace(/[^0-9.-]/g, "")));

    // ----- Commit value -----
    const commit = useCallback(
      (next: number) => {
        const clamped = roundToPrecision(clamp(next, min, max), precision);
        if (clamped !== currentValue) {
          setDirection(clamped > currentValue ? "up" : "down");
          prevValueRef.current = clamped;
        }
        if (controlledValue === undefined) {
          setInternalValue(clamped);
        }
        if (clamped !== currentValue) {
          onChange?.(clamped);
        }
        return clamped;
      },
      [controlledValue, min, max, precision, currentValue, onChange],
    );

    // ----- Steppers -----
    const increment = useCallback(
      (multiplier = 1) => commit(currentValue + step * multiplier),
      [commit, currentValue, step],
    );

    const decrement = useCallback(
      (multiplier = 1) => commit(currentValue - step * multiplier),
      [commit, currentValue, step],
    );

    const isAtMin = min !== undefined && currentValue <= min;
    const isAtMax = max !== undefined && currentValue >= max;

    // ----- Keyboard on the container -----
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
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
            if (min !== undefined) {
              e.preventDefault();
              commit(min);
            }
            break;
          case "End":
            if (max !== undefined) {
              e.preventDefault();
              commit(max);
            }
            break;
          default:
            break;
        }
      },
      [disabled, readOnly, increment, decrement, commit, min, max],
    );

    // ----- Input text editing -----
    const handleInputFocus = useCallback(() => {
      setInputRaw(String(currentValue));
    }, [currentValue]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRaw(e.target.value);
      },
      [],
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
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          inputRef.current?.blur();
        }
        if (e.key === "Escape") {
          setInputRaw(null);
          inputRef.current?.blur();
        }
      },
      [],
    );

    return (
      <div
        ref={ref}
        role="spinbutton"
        aria-valuenow={currentValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(numberInputVariants({ variant, size }), className)}
        data-ds=""
        data-ds-component="number-input"
        data-ds-variant={variant}
        data-ds-size={size}
        {...rest}
      >
        {/* Decrement button */}
        <button
          type="button"
          tabIndex={0}
          onClick={() => decrement()}
          disabled={disabled || readOnly || isAtMin}
          aria-label={decrementLabel}
          className={cn(
            stepperButtonBase,
            buttonWidthMap[size],
            "border-r border-input/60",
          )}
        >
          <MinusIcon className={iconSizeMap[size]} />
        </button>

        {/* Value display / input */}
        <div className="relative flex-1 flex items-center justify-center">
          {inputRaw !== null ? (
            // Editing mode: show raw <input>
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={inputRaw}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              readOnly={readOnly}
              className={cn(
                "w-full h-full bg-transparent text-center outline-none",
                "tabular-nums text-foreground",
                inputPaddingMap[size],
              )}
            />
          ) : (
            // Display mode: animated value
            <button
              type="button"
              tabIndex={0}
              disabled={disabled || readOnly}
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              className={cn(
                "w-full h-full flex items-center justify-center",
                "bg-transparent outline-none",
                "text-foreground",
                "cursor-text",
                inputPaddingMap[size],
                focusRingClasses,
              )}
              aria-label={`Current value: ${resolvedFormat(currentValue)}, press to edit`}
            >
              <AnimatedValue
                value={currentValue}
                formatValue={resolvedFormat}
                shouldReduce={shouldReduce ?? false}
                direction={direction}
              />
            </button>
          )}
        </div>

        {/* Increment button */}
        <button
          type="button"
          tabIndex={0}
          onClick={() => increment()}
          disabled={disabled || readOnly || isAtMax}
          aria-label={incrementLabel}
          className={cn(
            stepperButtonBase,
            buttonWidthMap[size],
            "border-l border-input/60",
          )}
        >
          <PlusIcon className={iconSizeMap[size]} />
        </button>
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
