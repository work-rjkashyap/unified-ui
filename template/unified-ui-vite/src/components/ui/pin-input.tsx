"use client";

// ============================================================================
// Unified UI — PinInput Component
// ============================================================================
// A production-ready OTP / PIN / verification code input with auto-advance
// between digits, paste support, backspace navigation, shake-on-error
// animation, and pop animation on each digit entry.
//
// Features:
//   - Configurable length (default 6)
//   - Auto-advance on digit entry
//   - Backspace clears current cell, then moves back
//   - Paste support — distributes pasted digits across cells
//   - Numeric, alphanumeric, and custom pattern modes
//   - Error state with shakeX animation
//   - Per-digit pop animation on entry
//   - Size variants: sm, md, lg
//   - Visual variants: default, primary
//   - Masked / password mode
//   - Full ref forwarding (ref points to the container div)
//   - WCAG AA: aria-label, autocomplete="one-time-code", inputMode
//
// Usage:
//   <PinInput length={6} onComplete={(pin) => verify(pin)} />
//   <PinInput length={4} error mask />
//   <PinInput length={6} variant="primary" size="lg" />
// ============================================================================

import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  type ClipboardEvent,
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { pop, shakeX } from "@/lib/motion";

// ---------------------------------------------------------------------------
// CVA — Cell Variants
// ---------------------------------------------------------------------------

export const pinCellVariants = cva(
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
    "caret-transparent",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "focus:border-ring focus:ring-2 focus:ring-ring/20",
        ],
        primary: [
          "border-primary/40",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
        ],
      },
      size: {
        sm: "w-8 h-10 text-base",
        md: "w-10 h-12 text-lg",
        lg: "w-12 h-14 text-xl",
      },
      state: {
        empty: "",
        filled: "bg-accent/30",
        active: "",
        error: "border-danger focus:border-danger focus:ring-danger/20",
        success: "border-success focus:border-success focus:ring-success/20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "empty",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PinInputVariant = "default" | "primary";
export type PinInputSize = "sm" | "md" | "lg";
export type PinInputType = "numeric" | "alphanumeric" | "alphabetic";

export interface PinInputProps {
  /**
   * Number of input cells.
   * @default 6
   */
  length?: number;

  /**
   * The current value (controlled). Array of single characters.
   */
  value?: string[];

  /**
   * The initial value (uncontrolled).
   */
  defaultValue?: string[];

  /**
   * Called when any cell changes. Receives the full array of cell values.
   */
  onChange?: (value: string[]) => void;

  /**
   * Called when all cells are filled. Receives the joined PIN string.
   */
  onComplete?: (pin: string) => void;

  /**
   * Called when the user clears all cells (backspace on first cell).
   */
  onClear?: () => void;

  /**
   * Input type / allowed characters.
   * - "numeric"       — digits only (0–9)
   * - "alphanumeric"  — letters and digits
   * - "alphabetic"    — letters only
   * @default "numeric"
   */
  type?: PinInputType;

  /**
   * Visual variant.
   * @default "default"
   */
  variant?: PinInputVariant;

  /**
   * Size variant.
   * @default "md"
   */
  size?: PinInputSize;

  /**
   * Whether to mask input (show • instead of character).
   * @default false
   */
  mask?: boolean;

  /**
   * Whether the input is in an error state (triggers shakeX animation).
   * @default false
   */
  error?: boolean;

  /**
   * Whether the input is in a success state.
   * @default false
   */
  success?: boolean;

  /**
   * Whether the input is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Accessible label for the PIN input group.
   * @default "PIN Input"
   */
  "aria-label"?: string;

  /**
   * Whether to automatically focus the first cell on mount.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Gap between cells.
   * @default "gap-2"
   */
  gap?: string;

  /** Additional CSS classes on the container. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Allowed character patterns
// ---------------------------------------------------------------------------

const allowedPatterns: Record<PinInputType, RegExp> = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alphabetic: /^[a-zA-Z]$/,
};

// ---------------------------------------------------------------------------
// Mask character
// ---------------------------------------------------------------------------

const MASK_CHAR = "•";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * PinInput — OTP / verification code input with auto-advance.
 *
 * @example
 * // Basic 6-digit OTP
 * <PinInput length={6} onComplete={(pin) => verifyOTP(pin)} />
 *
 * // 4-digit masked PIN
 * <PinInput length={4} mask onComplete={handlePin} />
 *
 * // With error state (triggers shake animation)
 * <PinInput length={6} error value={cells} onChange={setCells} />
 *
 * // Alphanumeric (e.g. invite code)
 * <PinInput length={8} type="alphanumeric" variant="primary" size="lg" />
 */
export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  function PinInput(
    {
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
      className,
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();

    // ----- Value state -----
    const [internalValue, setInternalValue] = useState<string[]>(() => {
      const initial = defaultValue ?? controlledValue ?? [];
      // Pad to length
      return Array.from({ length }, (_, i) => initial[i] ?? "");
    });

    const cells =
      controlledValue !== undefined
        ? Array.from({ length }, (_, i) => controlledValue[i] ?? "")
        : internalValue;

    // ----- Animated cells (pop on fill) -----
    const [animatedIndex, setAnimatedIndex] = useState<number | null>(null);

    // ----- Shake trigger -----
    const [shakeKey, setShakeKey] = useState(0);

    // ----- Refs -----
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Expose container ref
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // ----- Auto-focus -----
    useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus]);

    // ----- Trigger shake when error prop changes to true -----
    const prevErrorRef = useRef(error);
    useEffect(() => {
      if (error && !prevErrorRef.current) {
        setShakeKey((k) => k + 1);
      }
      prevErrorRef.current = error;
    }, [error]);

    // ----- Commit value -----
    const commit = useCallback(
      (newCells: string[]) => {
        if (controlledValue === undefined) {
          setInternalValue(newCells);
        }
        onChange?.(newCells);
        // Check completion
        const allFilled = newCells.every((c) => c.length === 1);
        if (allFilled) {
          onComplete?.(newCells.join(""));
        }
      },
      [controlledValue, onChange, onComplete],
    );

    // ----- Key down handler -----
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        const pattern = allowedPatterns[type];

        if (e.key === "Backspace") {
          e.preventDefault();
          const newCells = [...cells];

          if (newCells[index]) {
            // Clear current cell
            newCells[index] = "";
            commit(newCells);
          } else if (index > 0) {
            // Move to previous cell and clear it
            newCells[index - 1] = "";
            commit(newCells);
            inputRefs.current[index - 1]?.focus();
          } else {
            // Backspace on first empty cell → clear all
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

        // Character input
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          const char = e.key.toUpperCase();
          if (!pattern.test(type === "numeric" ? e.key : char)) return;

          const newCells = [...cells];
          newCells[index] = type === "numeric" ? e.key : char;
          commit(newCells);

          // Trigger pop animation
          setAnimatedIndex(index);
          setTimeout(() => setAnimatedIndex(null), 400);

          // Auto-advance
          if (index < length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
        }
      },
      [cells, commit, length, type, onClear],
    );

    // ----- Paste handler -----
    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLInputElement>, startIndex: number) => {
        e.preventDefault();
        const raw = e.clipboardData.getData("text");
        const pattern = allowedPatterns[type];
        const chars = raw
          .split("")
          .filter((c) => pattern.test(type === "numeric" ? c : c.toUpperCase()))
          .map((c) => (type === "numeric" ? c : c.toUpperCase()));

        if (chars.length === 0) return;

        const newCells = [...cells];
        let lastFilled = startIndex;

        for (let i = 0; i < chars.length && startIndex + i < length; i++) {
          newCells[startIndex + i] = chars[i];
          lastFilled = startIndex + i;
        }

        commit(newCells);

        // Focus the cell after the last pasted character
        const focusTarget = Math.min(lastFilled + 1, length - 1);
        inputRefs.current[focusTarget]?.focus();
      },
      [cells, commit, length, type],
    );

    // ----- Focus cell on click (move to first empty or last) -----
    const handleClick = useCallback(
      (index: number) => {
        // If this cell or a previous one is empty, focus the first empty
        const firstEmpty = cells.findIndex((c) => !c);
        if (firstEmpty !== -1 && firstEmpty < index) {
          inputRefs.current[firstEmpty]?.focus();
        } else {
          inputRefs.current[index]?.focus();
        }
      },
      [cells],
    );

    // ----- Render -----
    const containerState = error ? "error" : success ? "success" : undefined;

    return (
      <motion.div
        ref={containerRef}
        className={cn("inline-flex", gap, className)}
        // Shake animation — key changes each time error is re-triggered
        key={shakeKey}
        variants={shakeX.variants}
        initial={shakeKey === 0 ? false : "initial"}
        animate={shakeKey > 0 ? "animate" : "initial"}
        transition={shakeX.transition}
        aria-label={ariaLabel}
        data-ds=""
        data-ds-component="pin-input"
        data-ds-variant={variant}
        data-ds-size={size}
        data-ds-animated=""
      >
        {Array.from({ length }, (_, index) => {
          const cellValue = cells[index] ?? "";
          const isFilled = cellValue.length === 1;
          const cellState = containerState ?? (isFilled ? "filled" : "empty");

          return (
            <div key={index} className="relative">
              {/* Pop animation overlay when a character is entered */}
              <AnimatePresence>
                {animatedIndex === index && isFilled && !shouldReduce && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-primary/15 pointer-events-none"
                    variants={pop.variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pop.transition}
                    data-ds-animated=""
                  />
                )}
              </AnimatePresence>

              <input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type={mask ? "password" : "text"}
                inputMode={type === "numeric" ? "numeric" : "text"}
                pattern={
                  type === "numeric"
                    ? "[0-9]*"
                    : type === "alphabetic"
                      ? "[a-zA-Z]*"
                      : "[a-zA-Z0-9]*"
                }
                maxLength={1}
                value={mask && isFilled ? MASK_CHAR : cellValue}
                readOnly // We handle all input via onKeyDown
                autoComplete={index === 0 ? "one-time-code" : "off"}
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                disabled={disabled}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                // Prevent onChange from fighting with our controlled value
                onChange={() => {}}
                className={cn(
                  pinCellVariants({
                    variant,
                    size,
                    state: cellState,
                  }),
                  // Override focus ring with our variant-specific ring
                  "focus:outline-none",
                )}
                aria-label={`Digit ${index + 1} of ${length}`}
                aria-invalid={error ? "true" : undefined}
                data-ds-cell-index={index}
                data-ds-filled={isFilled ? "" : undefined}
              />
            </div>
          );
        })}
      </motion.div>
    );
  },
);

PinInput.displayName = "PinInput";
