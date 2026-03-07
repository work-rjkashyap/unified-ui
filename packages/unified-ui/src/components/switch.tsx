"use client";

// ============================================================================
// Unified UI — Switch Component
// ============================================================================
// A toggle switch component built on Radix UI's Switch primitive and the
// Unified UI token layer. Uses class-variance-authority (CVA) for variant
// composition and tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - 2 sizes: sm, md
//   - Label support with configurable position (left, right)
//   - Description text support
//   - Spring animation on the thumb via Framer Motion
//   - Disabled state
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria-checked, keyboard toggle
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Switch } from "@/design-system/components/switch";
//
//   <Switch label="Dark mode" />
//   <Switch size="sm" label="Notifications" labelPosition="left" />
//   <Switch checked={enabled} onCheckedChange={setEnabled} />
//   <Switch label="Auto-save" description="Save changes automatically" />
//   <Switch disabled label="Feature locked" />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from "framer-motion";
import { Switch as SwitchPrimitive } from "radix-ui";
import {
    forwardRef,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useState,
} from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition — Track (Root)
// ---------------------------------------------------------------------------

export const switchTrackVariants = cva(
    [
        // Layout
        "relative inline-flex shrink-0 cursor-pointer items-center",
        // Shape
        "rounded-full",
        // Border
        "border-2 border-transparent",
        // Transition
        "transition-[background-color,box-shadow] duration-fast ease-standard",
        // Focus ring
        focusRingClasses,
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        // Unchecked state
        "data-[state=unchecked]:bg-input",
        // Checked state
        "data-[state=checked]:bg-primary",
    ],
    {
        variants: {
            size: {
                /**
                 * Small — compact for dense UIs, settings panels.
                 * Track: 36px × 20px
                 */
                sm: "h-5 w-9",

                /**
                 * Medium — default size for most switches.
                 * Track: 44px × 24px
                 */
                md: "h-6 w-11",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
);

// ---------------------------------------------------------------------------
// CVA Variant Definition — Thumb
// ---------------------------------------------------------------------------

export const switchThumbVariants = cva(
    [
        // Shape
        "pointer-events-none block rounded-full",
        // Color
        "bg-white",
        // Shadow
        "shadow-sm",
    ],
    {
        variants: {
            size: {
                sm: "size-4",
                md: "size-5",
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

export type SwitchSize = "sm" | "md";
export type SwitchLabelPosition = "left" | "right";

export interface SwitchProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
        "asChild"
    >,
    VariantProps<typeof switchTrackVariants> {
    /**
     * Size of the switch.
     * @default "md"
     */
    size?: SwitchSize;

    /**
     * Text label for the switch.
     */
    label?: ReactNode;

    /**
     * Description text displayed below the label.
     */
    description?: ReactNode;

    /**
     * Position of the label relative to the switch.
     * @default "right"
     */
    labelPosition?: SwitchLabelPosition;

    /**
     * Additional CSS classes for the outer wrapper element.
     */
    wrapperClassName?: string;

    /**
     * Additional CSS classes for the label element.
     */
    labelClassName?: string;

    /**
     * Additional CSS classes for the description element.
     */
    descriptionClassName?: string;

    /** Additional CSS classes to merge on the switch track element. */
    className?: string;
}

// ---------------------------------------------------------------------------
// Spring Config
// ---------------------------------------------------------------------------
// Uses the design system's "snappy" spring token feel:
// A responsive, slightly bouncy transition for the thumb movement.
// ---------------------------------------------------------------------------

const thumbSpringConfig = {
    stiffness: 500,
    damping: 30,
    mass: 0.5,
};

// Thumb travel distances by size (in pixels)
const thumbTravel: Record<SwitchSize, { off: number; on: number }> = {
    sm: { off: 0, on: 16 },
    md: { off: 0, on: 20 },
};

// ---------------------------------------------------------------------------
// Animated Thumb (Internal)
// ---------------------------------------------------------------------------

const MotionThumb = motion.create("span");

// Instant spring config for users who prefer reduced motion.
// Uses very high stiffness/damping to move the thumb immediately
// without any visible animation.
const instantSpringConfig = {
    stiffness: 10000,
    damping: 10000,
    mass: 0.01,
};

function AnimatedThumb({
    size = "md",
    checked,
}: {
    size: SwitchSize;
    checked: boolean;
}) {
    const prefersReduced = useReducedMotion();
    const travel = thumbTravel[size];
    const x = useMotionValue(checked ? travel.on : travel.off);
    const springConfig = prefersReduced ? instantSpringConfig : thumbSpringConfig;
    const springX = useSpring(x, springConfig);

    useEffect(() => {
        x.set(checked ? travel.on : travel.off);
    }, [checked, travel, x]);

    return (
        <SwitchPrimitive.Thumb asChild>
            <MotionThumb
                className={cn(switchThumbVariants({ size }))}
                style={{ x: springX }}
                aria-hidden="true"
            />
        </SwitchPrimitive.Thumb>
    );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Switch — a toggle control for binary on/off states.
 *
 * Built on Radix UI's Switch primitive for accessibility and the design
 * system's token layer for styling. The thumb uses a Framer Motion spring
 * animation for a tactile, snappy feel.
 *
 * Accessibility:
 *   - Radix handles `role="switch"`, `aria-checked`, keyboard toggle (Space)
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Label is associated via `htmlFor` / `id` linkage
 *   - Description linked via `aria-describedby`
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Switch label="Dark mode" />
 *
 * // Controlled
 * <Switch
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 *   label="Notifications"
 * />
 *
 * // Small with left label
 * <Switch size="sm" label="Auto-save" labelPosition="left" />
 *
 * // With description
 * <Switch
 *   label="Marketing emails"
 *   description="Receive emails about new features and updates"
 * />
 *
 * // Disabled
 * <Switch disabled label="Feature locked" />
 * ```
 */
export const Switch = forwardRef<
    React.ComponentRef<typeof SwitchPrimitive.Root>,
    SwitchProps
>(function Switch(
    {
        size = "md",
        label,
        description,
        labelPosition = "right",
        wrapperClassName,
        labelClassName,
        descriptionClassName,
        className,
        id: idProp,
        checked,
        defaultChecked,
        disabled,
        onCheckedChange,
        ...rest
    },
    ref,
) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const descriptionId = description ? `${id}-description` : undefined;

    // Track internal checked state so the spring animation works in both
    // controlled and uncontrolled modes. In controlled mode (`checked` is
    // provided), we mirror the prop. In uncontrolled mode, we manage state
    // ourselves and update it via the intercepted `onCheckedChange` callback.
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(
        checked ?? defaultChecked ?? false,
    );

    // Vercel best practice: rerender-derived-state-no-effect
    // Sync internal state during render when controlled `checked` prop changes,
    // instead of via useEffect (avoids an extra re-render cycle).
    const [prevChecked, setPrevChecked] = useState(checked);
    if (isControlled && checked !== prevChecked) {
        setPrevChecked(checked);
        setInternalChecked(checked);
    }

    // Intercept onCheckedChange to update internal state for animation,
    // then forward to the consumer's callback.
    const handleCheckedChange = useCallback(
        (value: boolean) => {
            if (!isControlled) {
                setInternalChecked(value);
            }
            onCheckedChange?.(value);
        },
        [isControlled, onCheckedChange],
    );

    const isChecked = isControlled ? checked : internalChecked;

    // Build the switch track element
    const switchElement = (
        <SwitchPrimitive.Root
            ref={ref}
            id={id}
            checked={isControlled ? checked : undefined}
            defaultChecked={isControlled ? undefined : defaultChecked}
            disabled={disabled}
            onCheckedChange={handleCheckedChange}
            aria-describedby={descriptionId}
            className={cn(switchTrackVariants({ size }), className)}
            data-ds=""
            data-ds-component="switch"
            data-ds-size={size}
            {...rest}
        >
            <AnimatedThumb size={size} checked={isChecked} />
        </SwitchPrimitive.Root>
    );

    // If no label, just render the switch
    if (!label) {
        return switchElement;
    }

    // Build the label + description block
    const labelBlock = (
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <label
                htmlFor={id}
                className={cn(
                    "text-sm font-medium leading-5 text-foreground",
                    "select-none",
                    disabled && "opacity-50 cursor-not-allowed",
                    !disabled && "cursor-pointer",
                    labelClassName,
                )}
            >
                {label}
            </label>
            {description && (
                <span
                    id={descriptionId}
                    className={cn(
                        "text-xs leading-4 text-muted-foreground",
                        disabled && "opacity-50",
                        descriptionClassName,
                    )}
                >
                    {description}
                </span>
            )}
        </div>
    );

    return (
        <div
            className={cn(
                "flex items-center gap-3",
                // Reverse order when label is on the left
                labelPosition === "left" ? "flex-row" : "flex-row-reverse",
                // Align to start when description is present
                description && "items-start",
                wrapperClassName,
            )}
            data-ds=""
            data-ds-component="switch-group"
        >
            {switchElement}
            {labelBlock}
        </div>
    );
});

Switch.displayName = "Switch";
