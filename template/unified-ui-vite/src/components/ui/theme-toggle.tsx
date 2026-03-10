"use client";

// ============================================================================
// Unified UI — ThemeToggle Component
// ============================================================================
// A light/dark/system mode switcher built on the Unified UI token layer.
// Uses CVA for variant composition and tailwind-merge (via cn) for safe
// class merging.
//
// Features:
//   - 2 modes: "light-dark" (2-state) and "light-dark-system" (3-state)
//   - 2 visual variants: icon (single button) and segmented (pill group)
//   - 3 sizes: sm, md, lg
//   - Smooth icon transition animations (rotate + scale)
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria-label, keyboard nav
//   - Headless: works with any theme provider via value + onChange
//   - Built-in SVG icons (Sun, Moon, Monitor)
//
// Usage:
//   import { ThemeToggle } from "@work-rjkashyap/unified-ui/components";
//   <ThemeToggle value="light" onChange={setTheme} />
//   <ThemeToggle value={theme} onChange={setTheme} mode="light-dark-system" />
//   <ThemeToggle value={theme} onChange={setTheme} variant="segmented" />
// ============================================================================

import { cva } from "class-variance-authority";
import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";

// ---------------------------------------------------------------------------
// Internal Icons
// ---------------------------------------------------------------------------

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CVA Variants
// ---------------------------------------------------------------------------

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-md",
    "border border-border",
    "bg-secondary text-secondary-foreground",
    "transition-[color,background-color,border-color,box-shadow,opacity,transform]",
    "duration-fast ease-standard",
    "hover:bg-secondary-hover hover:text-foreground",
    "active:scale-[0.97]",
    focusRingClasses,
    "cursor-pointer",
    "select-none",
  ],
  {
    variants: {
      size: {
        sm: "size-7 [&>svg]:size-3.5",
        md: "size-9 [&>svg]:size-4",
        lg: "size-10 [&>svg]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const segmentedContainerVariants = cva(
  [
    "inline-flex items-center",
    "rounded-md",
    "border border-border",
    "bg-muted",
    "p-0.5",
    "gap-0.5",
  ],
  {
    variants: {
      size: {
        sm: "[&>button]:size-6 [&>button>svg]:size-3",
        md: "[&>button]:size-7 [&>button>svg]:size-3.5",
        lg: "[&>button]:size-8 [&>button>svg]:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ThemeToggleMode = "light-dark" | "light-dark-system";
export type ThemeToggleVariant = "icon" | "segmented";
export type ThemeToggleSize = "sm" | "md" | "lg";
export type ThemeValue = "light" | "dark" | "system";

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Current theme value. */
  value: ThemeValue;
  /** Callback when the theme changes. */
  onChange: (value: ThemeValue) => void;
  /**
   * Toggle mode.
   * - "light-dark": cycles between light and dark only
   * - "light-dark-system": cycles through light, dark, and system
   * @default "light-dark"
   */
  mode?: ThemeToggleMode;
  /**
   * Visual variant.
   * - "icon": single button that cycles on click
   * - "segmented": inline pill group with one button per option
   * @default "icon"
   */
  variant?: ThemeToggleVariant;
  /**
   * Size of the toggle.
   * @default "md"
   */
  size?: ThemeToggleSize;
  /** Additional CSS classes. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ICON_MAP: Record<ThemeValue, typeof SunIcon> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

const LABEL_MAP: Record<ThemeValue, string> = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme",
};

function getNextTheme(current: ThemeValue, mode: ThemeToggleMode): ThemeValue {
  if (mode === "light-dark") {
    return current === "light" ? "dark" : "light";
  }
  const order: ThemeValue[] = ["light", "dark", "system"];
  const idx = order.indexOf(current);
  return order[(idx + 1) % order.length];
}

// ---------------------------------------------------------------------------
// Icon Variant
// ---------------------------------------------------------------------------

const ThemeToggleIcon = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggleIcon(
    { value, onChange, mode = "light-dark", size = "md", className, ...rest },
    ref,
  ) {
    const handleClick = useCallback(() => {
      onChange(getNextTheme(value, mode));
    }, [value, mode, onChange]);

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(iconButtonVariants({ size }), className)}
        aria-label={`Switch to ${LABEL_MAP[getNextTheme(value, mode)] ?? "next theme"}`}
        data-ds=""
        data-ds-component="theme-toggle"
        data-ds-variant="icon"
        data-ds-size={size}
        data-ds-theme-value={value}
        {...rest}
      >
        {/* Light icon */}
        <SunIcon
          className={cn(
            "absolute transition-all duration-300",
            value !== "light" && "scale-0 rotate-90 opacity-0",
          )}
        />
        {/* Dark icon */}
        <MoonIcon
          className={cn(
            "absolute transition-all duration-300",
            value !== "dark" && "scale-0 -rotate-90 opacity-0",
          )}
        />
        {/* System icon (only relevant for 3-state mode) */}
        {mode === "light-dark-system" && (
          <MonitorIcon
            className={cn(
              "absolute transition-all duration-300",
              value !== "system" && "scale-0 rotate-90 opacity-0",
            )}
          />
        )}
      </button>
    );
  },
);
ThemeToggleIcon.displayName = "ThemeToggleIcon";

// ---------------------------------------------------------------------------
// Segmented Variant
// ---------------------------------------------------------------------------

const ThemeToggleSegmented = forwardRef<HTMLDivElement, ThemeToggleProps>(
  function ThemeToggleSegmented(
    { value, onChange, mode = "light-dark", size = "md", className },
    ref,
  ) {
    const options: ThemeValue[] =
      mode === "light-dark-system"
        ? ["light", "dark", "system"]
        : ["light", "dark"];

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="radiogroup"
        aria-label="Theme selection"
        className={cn(segmentedContainerVariants({ size }), className)}
        data-ds=""
        data-ds-component="theme-toggle"
        data-ds-variant="segmented"
        data-ds-size={size}
        data-ds-theme-value={value}
      >
        {options.map((option) => {
          const Icon = ICON_MAP[option];
          const isActive = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={LABEL_MAP[option]}
              onClick={() => onChange(option)}
              className={cn(
                "inline-flex items-center justify-center rounded-sm transition-all duration-fast ease-standard",
                focusRingClasses,
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon />
            </button>
          );
        })}
      </div>
    );
  },
);
ThemeToggleSegmented.displayName = "ThemeToggleSegmented";

// ---------------------------------------------------------------------------
// ThemeToggle — Main Export
// ---------------------------------------------------------------------------

/**
 * ThemeToggle — a light/dark/system mode switcher.
 *
 * This is a headless, controlled component: you provide `value` and
 * `onChange`. It works with any theme provider (next-themes, custom
 * context, etc.).
 *
 * @example
 * ```tsx
 * // With next-themes
 * const { theme, setTheme } = useTheme();
 * <ThemeToggle value={theme as ThemeValue} onChange={setTheme} />
 *
 * // Segmented variant with system option
 * <ThemeToggle
 *   value={theme as ThemeValue}
 *   onChange={setTheme}
 *   variant="segmented"
 *   mode="light-dark-system"
 * />
 * ```
 */
export const ThemeToggle = forwardRef<HTMLElement, ThemeToggleProps>(
  function ThemeToggle({ variant = "icon", ...rest }, ref) {
    if (variant === "segmented") {
      return (
        <ThemeToggleSegmented
          ref={ref as React.Ref<HTMLDivElement>}
          variant={variant}
          {...rest}
        />
      );
    }
    return (
      <ThemeToggleIcon
        ref={ref as React.Ref<HTMLButtonElement>}
        variant={variant}
        {...rest}
      />
    );
  },
);
ThemeToggle.displayName = "ThemeToggle";
