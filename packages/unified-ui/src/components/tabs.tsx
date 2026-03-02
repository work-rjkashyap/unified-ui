"use client";

// ============================================================================
// Unified UI — Tabs Component
// ============================================================================
// A production-ready tabs component built on Radix UI's Tabs primitive and
// the Unified UI token layer. Uses CVA for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-tabs for full accessibility
//   - 3 visual variants: underline (default), pills, enclosed
//   - 2 sizes: sm, md
//   - Animated active indicator using Framer Motion layoutId
//   - Orientation: horizontal, vertical
//   - Full-width option for horizontal tabs
//   - Disabled individual tabs
//   - Full keyboard navigation (Radix handles arrow keys, Home, End)
//   - WCAG AA accessible: focus ring, aria-selected, role="tablist"
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/design-system/components/tabs";
//
//   <Tabs defaultValue="tab1">
//     <TabsList>
//       <TabsTrigger value="tab1">Tab 1</TabsTrigger>
//       <TabsTrigger value="tab2">Tab 2</TabsTrigger>
//     </TabsList>
//     <TabsContent value="tab1">Content 1</TabsContent>
//     <TabsContent value="tab2">Content 2</TabsContent>
//   </Tabs>
// ============================================================================

import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import {
	type ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	type ReactNode,
	useContext,
	useId,
} from "react";

// ---------------------------------------------------------------------------
// Context — shares variant/size/orientation across subcomponents
// ---------------------------------------------------------------------------

interface TabsContextValue {
	variant: TabsVariant;
	size: TabsSize;
	orientation: TabsOrientation;
	layoutId: string;
}

const TabsContext = createContext<TabsContextValue>({
	variant: "underline",
	size: "md",
	orientation: "horizontal",
	layoutId: "",
});

function useTabsContext(): TabsContextValue {
	return useContext(TabsContext);
}

// ---------------------------------------------------------------------------
// CVA Variant Definitions
// ---------------------------------------------------------------------------

export const tabsListVariants = cva(["inline-flex items-center", "shrink-0"], {
	variants: {
		variant: {
			underline: ["border-b border-border", "gap-0"],
			pills: ["gap-1", "rounded-md", "bg-muted", "p-1"],
			enclosed: ["border-b border-border", "gap-0"],
		},
		orientation: {
			horizontal: "flex-row w-full",
			vertical: "flex-col w-auto border-b-0",
		},
		fullWidth: {
			true: "",
			false: "",
		},
	},
	compoundVariants: [
		// Vertical orientation adjustments
		{
			variant: "underline",
			orientation: "vertical",
			className: "border-b-0 border-r border-border",
		},
		{
			variant: "enclosed",
			orientation: "vertical",
			className: "border-b-0 border-r border-border",
		},
	],
	defaultVariants: {
		variant: "underline",
		orientation: "horizontal",
		fullWidth: false,
	},
});

export const tabsTriggerVariants = cva(
	[
		// Layout
		"relative inline-flex items-center justify-center gap-1.5",
		// Typography
		"font-medium leading-5 whitespace-nowrap",
		// Transition
		"transition-[color,background-color,border-color,box-shadow,opacity]",
		"duration-fast ease-standard",
		// Focus ring
		focusRingClasses,
		// Disabled
		"disabled:pointer-events-none disabled:opacity-50",
		// Cursor
		"cursor-pointer select-none",
	],
	{
		variants: {
			variant: {
				underline: [
					"bg-transparent",
					"text-muted-foreground",
					"hover:text-foreground",
					"data-[state=active]:text-foreground",
					// Bottom border space for the active indicator
					"border-b-2 border-transparent -mb-px",
				],
				pills: [
					"rounded-sm",
					"text-muted-foreground",
					"hover:text-foreground hover:bg-background/60",
					"data-[state=active]:text-foreground",
				],
				enclosed: [
					"bg-transparent",
					"text-muted-foreground",
					"border border-transparent",
					"hover:text-foreground",
					"data-[state=active]:text-foreground",
					"data-[state=active]:bg-background",
					"data-[state=active]:border-border",
					"data-[state=active]:border-b-transparent",
					"-mb-px",
				],
			},
			size: {
				sm: "text-xs px-3 py-1.5",
				md: "text-sm px-4 py-2",
			},
		},
		defaultVariants: {
			variant: "underline",
			size: "md",
		},
	},
);

const tabsContentVariants = cva(["mt-2", focusRingClasses, "rounded-sm"], {
	variants: {
		orientation: {
			horizontal: "mt-2",
			vertical: "mt-0 ml-4",
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TabsVariant = "underline" | "pills" | "enclosed";
export type TabsSize = "sm" | "md";
export type TabsOrientation = "horizontal" | "vertical";

export interface TabsProps extends Omit<
	ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
	"orientation"
> {
	/** Visual variant of the tab list. @default "underline" */
	variant?: TabsVariant;

	/** Size of the tab triggers. @default "md" */
	size?: TabsSize;

	/** Layout orientation. @default "horizontal" */
	orientation?: TabsOrientation;

	/** Additional CSS classes. */
	className?: string;

	/** Tab content. */
	children?: ReactNode;
}

export interface TabsListProps extends ComponentPropsWithoutRef<
	typeof TabsPrimitive.List
> {
	/** Whether tabs stretch to fill the available width. @default false */
	fullWidth?: boolean;

	/** Additional CSS classes. */
	className?: string;

	/** Tab triggers. */
	children?: ReactNode;
}

export interface TabsTriggerProps extends ComponentPropsWithoutRef<
	typeof TabsPrimitive.Trigger
> {
	/** Additional CSS classes. */
	className?: string;

	/** Optional icon to display before the label. */
	icon?: ReactNode;

	/** The trigger label. */
	children?: ReactNode;
}

export interface TabsContentProps extends ComponentPropsWithoutRef<
	typeof TabsPrimitive.Content
> {
	/** Additional CSS classes. */
	className?: string;

	/** The panel content. */
	children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Motion Indicator — shared layoutId animation
// ---------------------------------------------------------------------------

const MotionSpan = motion.create("span");

// Spring config for the active indicator animation.
const indicatorSpringConfig = {
	type: "spring" as const,
	stiffness: 500,
	damping: 35,
	mass: 0.5,
};

// Instant transition for users who prefer reduced motion.
// Uses a very short duration so the indicator snaps into place
// without any visible animation.
const indicatorInstantConfig = {
	type: "tween" as const,
	duration: 0,
};

function ActiveIndicator({
	variant,
	layoutId,
}: {
	variant: TabsVariant;
	layoutId: string;
}) {
	const prefersReduced = useReducedMotion();
	const transition = prefersReduced
		? indicatorInstantConfig
		: indicatorSpringConfig;

	if (variant === "enclosed") {
		// Enclosed variant uses data-state styling, no motion indicator
		return null;
	}

	if (variant === "underline") {
		return (
			<MotionSpan
				layoutId={layoutId}
				className={cn(
					"absolute bottom-0 left-0 right-0 h-0.5",
					"bg-primary",
					"rounded-full",
				)}
				transition={transition}
			/>
		);
	}

	// Pills variant
	return (
		<MotionSpan
			layoutId={layoutId}
			className={cn(
				"absolute inset-0",
				"bg-background",
				"rounded-sm",
				"shadow-sm",
			)}
			transition={transition}
		/>
	);
}

// ---------------------------------------------------------------------------
// Tabs — Root Container
// ---------------------------------------------------------------------------

/**
 * Tabs — a tabbed interface for organizing content into panels.
 *
 * Built on Radix UI's Tabs primitive for full keyboard navigation
 * and ARIA compliance. Supports three visual variants with an animated
 * active indicator powered by Framer Motion layoutId.
 *
 * Accessibility:
 *   - Radix provides `role="tablist"`, `role="tab"`, `role="tabpanel"`
 *   - Arrow key navigation between triggers
 *   - Automatic `aria-selected`, `aria-controls`, `aria-labelledby`
 *   - Focus management follows WAI-ARIA Tabs pattern
 *
 * @example
 * ```tsx
 * // Basic underline tabs
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="analytics">Analytics</TabsTrigger>
 *     <TabsTrigger value="settings">Settings</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">Overview content</TabsContent>
 *   <TabsContent value="analytics">Analytics content</TabsContent>
 *   <TabsContent value="settings">Settings content</TabsContent>
 * </Tabs>
 *
 * // Pills variant, small size
 * <Tabs variant="pills" size="sm" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 *
 * // Full-width tabs
 * <Tabs defaultValue="tab1">
 *   <TabsList fullWidth>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 *
 * // Vertical orientation
 * <Tabs orientation="vertical" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 * </Tabs>
 * ```
 */
export const Tabs = forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Root>,
	TabsProps
>(function Tabs(
	{
		variant = "underline",
		size = "md",
		orientation = "horizontal",
		className,
		children,
		...rest
	},
	ref,
) {
	const autoId = useId();
	const layoutId = `tabs-indicator-${autoId}`;

	return (
		<TabsContext.Provider value={{ variant, size, orientation, layoutId }}>
			<TabsPrimitive.Root
				ref={ref}
				orientation={orientation}
				className={cn(
					"not-prose",
					orientation === "vertical" && "flex flex-row",
					className,
				)}
				data-ds=""
				data-ds-component="tabs"
				data-ds-variant={variant}
				data-ds-size={size}
				data-ds-orientation={orientation}
				{...rest}
			>
				{children}
			</TabsPrimitive.Root>
		</TabsContext.Provider>
	);
});

Tabs.displayName = "Tabs";

// ---------------------------------------------------------------------------
// TabsList — Tab Trigger Container
// ---------------------------------------------------------------------------

/**
 * TabsList — the container for tab triggers (the tab bar).
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 *
 * // Full-width stretch
 * <TabsList fullWidth>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 */
export const TabsList = forwardRef<
	React.ComponentRef<typeof TabsPrimitive.List>,
	TabsListProps
>(function TabsList({ fullWidth = false, className, children, ...rest }, ref) {
	const { variant, orientation } = useTabsContext();

	return (
		<TabsPrimitive.List
			ref={ref}
			className={cn(
				tabsListVariants({ variant, orientation, fullWidth }),
				fullWidth && orientation === "horizontal" && "[&>*]:flex-1",
				className,
			)}
			data-ds=""
			data-ds-component="tabs-list"
			{...rest}
		>
			{children}
		</TabsPrimitive.List>
	);
});

TabsList.displayName = "TabsList";

// ---------------------------------------------------------------------------
// TabsTrigger — Individual Tab Button
// ---------------------------------------------------------------------------

/**
 * TabsTrigger — an individual tab button within the TabsList.
 *
 * Renders a Framer Motion active indicator when the tab is selected,
 * creating a smooth sliding animation between active tabs.
 *
 * @example
 * ```tsx
 * <TabsTrigger value="overview">Overview</TabsTrigger>
 * <TabsTrigger value="analytics" icon={<BarChartIcon />}>Analytics</TabsTrigger>
 * <TabsTrigger value="locked" disabled>Locked</TabsTrigger>
 * ```
 */
export const TabsTrigger = forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(function TabsTrigger({ className, icon, children, disabled, ...rest }, ref) {
	const { variant, size, layoutId } = useTabsContext();

	const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";

	return (
		<TabsPrimitive.Trigger
			ref={ref}
			disabled={disabled}
			className={cn(
				tabsTriggerVariants({ variant, size }),
				iconSizeClass,
				// For underline variant, make border transparent — the motion indicator handles the active line
				variant === "underline" &&
					"data-[state=active]:border-transparent",
				className,
			)}
			data-ds=""
			data-ds-component="tabs-trigger"
			{...rest}
		>
			{/* Active indicator (motion animated) */}
			{variant !== "enclosed" && (
				<TabsPrimitive.Trigger asChild {...rest} disabled={disabled}>
					<span className="absolute inset-0 pointer-events-none">
						{/* This wrapper receives data-state from Radix, we check it manually */}
					</span>
				</TabsPrimitive.Trigger>
			)}

			{/* We render the indicator via a data-state check */}
			<ActiveIndicatorWrapper variant={variant} layoutId={layoutId} />

			{/* Content (positioned above the indicator for pills) */}
			<span
				className={cn(
					"relative z-[1] inline-flex items-center gap-1.5",
				)}
			>
				{icon && (
					<span className="shrink-0" aria-hidden="true">
						{icon}
					</span>
				)}
				{children}
			</span>
		</TabsPrimitive.Trigger>
	);
});

TabsTrigger.displayName = "TabsTrigger";

// ---------------------------------------------------------------------------
// ActiveIndicatorWrapper — renders indicator only when active
// ---------------------------------------------------------------------------
// Radix sets `data-state="active"` on the trigger. We use a CSS-driven
// approach: the indicator is always rendered but only visible when active
// via the parent's data-state attribute.
// ---------------------------------------------------------------------------

function ActiveIndicatorWrapper({
	variant,
	layoutId,
}: {
	variant: TabsVariant;
	layoutId: string;
}) {
	if (variant === "enclosed") {
		return null;
	}

	return (
		<span
			className={cn(
				"absolute inset-0 pointer-events-none",
				// Only show when parent trigger has data-state=active
				"hidden [[data-state=active]>&]:block",
			)}
		>
			<ActiveIndicator variant={variant} layoutId={layoutId} />
		</span>
	);
}

// ---------------------------------------------------------------------------
// TabsContent — Tab Panel
// ---------------------------------------------------------------------------

/**
 * TabsContent — the content panel associated with a tab trigger.
 *
 * @example
 * ```tsx
 * <TabsContent value="overview">
 *   <p>Overview content goes here.</p>
 * </TabsContent>
 * ```
 */
export const TabsContent = forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(function TabsContent({ className, children, ...rest }, ref) {
	const { orientation } = useTabsContext();

	return (
		<TabsPrimitive.Content
			ref={ref}
			className={cn(tabsContentVariants({ orientation }), className)}
			data-ds=""
			data-ds-component="tabs-content"
			{...rest}
		>
			{children}
		</TabsPrimitive.Content>
	);
});

TabsContent.displayName = "TabsContent";
