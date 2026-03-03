"use client";

// ============================================================================
// Unified UI — Textarea Component
// ============================================================================
// A production-ready textarea component built on the Unified UI token layer.
// Extends the Input component's visual patterns for consistency across forms.
//
// Features:
//   - 3 visual variants: default, error, success
//   - 3 sizes: sm, md, lg
//   - States: disabled, readonly, focused
//   - Auto-resize option (grows with content up to maxHeight)
//   - Character count display with optional maxLength enforcement
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria-invalid, aria-describedby
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Textarea } from "@/design-system/components/textarea";
//
//   <Textarea placeholder="Write something..." />
//   <Textarea variant="error" aria-describedby="desc-error" />
//   <Textarea autoResize maxHeight={300} />
//   <Textarea showCount maxLength={500} />
// ============================================================================

import { cn, composeRefs } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------

export const textareaVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "flex w-full min-h-[60px]",
    // Typography
    "text-sm leading-5",
    // Shape
    "rounded-md",
    // Border
    "border",
    // Colors
    "bg-background text-input-foreground",
    "placeholder:text-input-placeholder",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    // Read-only
    "read-only:bg-muted read-only:cursor-default",
    // Resize handle
    "resize-vertical",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — standard textarea with muted border.
         */
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus-visible:border-border-strong",
        ],

        /**
         * Error — validation failed. Uses danger color.
         */
        error: [
          "border-danger",
          "text-foreground",
          "focus-visible:border-danger",
          "placeholder:text-input-placeholder",
        ],

        /**
         * Success — validation passed. Uses success color.
         */
        success: [
          "border-success",
          "text-foreground",
          "focus-visible:border-success",
          "placeholder:text-input-placeholder",
        ],
      },

      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs.
         * Padding and font match Input sm.
         */
        sm: "px-2.5 py-1.5 text-xs",

        /**
         * Medium — default size for most textareas.
         * Padding and font match Input md.
         */
        md: "px-3 py-2 text-sm",

        /**
         * Large — prominent textareas for long-form content.
         * Padding and font match Input lg.
         */
        lg: "px-3.5 py-2.5 text-sm",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TextareaVariant = "default" | "error" | "success";
export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  /**
   * Visual variant of the textarea.
   * @default "default"
   */
  variant?: TextareaVariant;

  /**
   * Size of the textarea.
   * @default "md"
   */
  size?: TextareaSize;

  /**
   * Whether the textarea should automatically resize to fit its content.
   * When enabled, the native resize handle is hidden and the textarea
   * grows vertically as the user types.
   * @default false
   */
  autoResize?: boolean;

  /**
   * Maximum height (in pixels) for the textarea when `autoResize` is enabled.
   * After reaching this height, the textarea will scroll instead of growing.
   * Only applies when `autoResize` is true.
   * @default undefined (no max height constraint)
   */
  maxHeight?: number;

  /**
   * Minimum number of rows to display.
   * This sets the initial height of the textarea.
   * @default 3
   */
  minRows?: number;

  /**
   * Whether to show the character count below the textarea.
   * When `maxLength` is also set, displays "current / max".
   * Otherwise, displays just the current count.
   * @default false
   */
  showCount?: boolean;

  /**
   * Additional CSS classes for the outer wrapper element.
   * Use this when you need to control the width/margin of the textarea group.
   */
  wrapperClassName?: string;

  /**
   * Additional CSS classes for the character count text.
   */
  countClassName?: string;

  /** Additional CSS classes to merge on the textarea element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Auto-resize Hook (Internal)
// ---------------------------------------------------------------------------

function useAutoResize(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  autoResize: boolean,
  maxHeight?: number,
) {
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    const newHeight = textarea.scrollHeight;

    if (maxHeight && newHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  }, [textareaRef, autoResize, maxHeight]);

  // Adjust on mount and when autoResize/maxHeight changes
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  return adjustHeight;
}

// ---------------------------------------------------------------------------
// Character Count (Internal)
// ---------------------------------------------------------------------------

function CharacterCount({
  current,
  max,
  variant,
  className,
}: {
  current: number;
  max?: number;
  variant: TextareaVariant;
  className?: string;
}) {
  const isOverLimit = max !== undefined && current > max;
  const isNearLimit = max !== undefined && current >= max * 0.9;

  return (
    <span
      className={cn(
        "text-xs leading-4 tabular-nums select-none",
        // Default muted text
        "text-muted-foreground",
        // Near limit warning
        isNearLimit && !isOverLimit && "text-warning",
        // Over limit or error variant
        (isOverLimit || variant === "error") && "text-danger",
        className,
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {max !== undefined ? `${current} / ${max}` : current}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Textarea — a multi-line text input for capturing longer user content.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * Shares the same visual language as the Input component for consistency.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Error variant sets `aria-invalid="true"` automatically
 *   - Supports `aria-describedby` for linking to error/helper messages
 *   - Character count uses `aria-live="polite"` for screen reader updates
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Textarea placeholder="Write something..." />
 *
 * // With variant
 * <Textarea variant="error" aria-describedby="desc-error" />
 * <Textarea variant="success" />
 *
 * // Auto-resize
 * <Textarea autoResize placeholder="This will grow as you type..." />
 * <Textarea autoResize maxHeight={200} placeholder="Grows up to 200px" />
 *
 * // Character count
 * <Textarea showCount placeholder="With counter" />
 * <Textarea showCount maxLength={500} placeholder="Max 500 chars" />
 *
 * // Sizes
 * <Textarea size="sm" placeholder="Small" />
 * <Textarea size="md" placeholder="Medium" />
 * <Textarea size="lg" placeholder="Large" />
 *
 * // Controlled with min rows
 * <Textarea
 *   minRows={5}
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 * />
 *
 * // Disabled / Read-only
 * <Textarea disabled placeholder="Disabled" />
 * <Textarea readOnly value="Read-only value" />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      variant = "default",
      size = "md",
      autoResize = false,
      maxHeight,
      minRows = 3,
      showCount = false,
      wrapperClassName,
      countClassName,
      className,
      disabled,
      readOnly,
      value,
      defaultValue,
      maxLength,
      onChange,
      "aria-invalid": ariaInvalid,
      ...rest
    },
    ref,
  ) {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const [charCount, setCharCount] = useState<number>(() => {
      if (value !== undefined) return String(value).length;
      if (defaultValue !== undefined) return String(defaultValue).length;
      return 0;
    });

    // Auto-resize logic
    const adjustHeight = useAutoResize(internalRef, autoResize, maxHeight);

    // Sync character count for controlled components
    useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    // Handle change — track character count and trigger auto-resize
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        adjustHeight();
        onChange?.(e);
      },
      [onChange, adjustHeight],
    );

    // Determine aria-invalid — auto-set for error variant if not explicitly provided
    const resolvedAriaInvalid =
      ariaInvalid !== undefined
        ? ariaInvalid
        : variant === "error"
          ? true
          : undefined;

    // Build textarea className
    const textareaClasses = cn(
      textareaVariants({ variant, size }),
      autoResize && "resize-none overflow-hidden",
      className,
    );

    const textareaElement = (
      <textarea
        ref={composeRefs(internalRef, ref)}
        rows={minRows}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={handleChange}
        aria-invalid={resolvedAriaInvalid}
        aria-disabled={disabled || undefined}
        className={textareaClasses}
        data-ds=""
        data-ds-component="textarea"
        data-ds-variant={variant}
        data-ds-size={size}
        {...(autoResize ? { "data-ds-auto-resize": "" } : {})}
        {...rest}
      />
    );

    // If no character count needed, return the textarea directly
    if (!showCount) {
      return textareaElement;
    }

    // Wrap with character count display
    return (
      <div
        className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}
        data-ds=""
        data-ds-component="textarea-wrapper"
      >
        {textareaElement}
        <div className="flex justify-end px-0.5">
          <CharacterCount
            current={charCount}
            max={maxLength}
            variant={variant}
            className={countClassName}
          />
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
