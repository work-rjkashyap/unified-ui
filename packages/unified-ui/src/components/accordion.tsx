"use client";

// ============================================================================
// Unified UI — Accordion Component
// ============================================================================
// A collapsible accordion component built on Radix UI's Accordion primitive
// and the Unified UI token layer. Uses CVA for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-accordion for full accessibility
//   - Single and multiple expand modes
//   - 2 visual variants: bordered (default), borderless
//   - 2 sizes: sm, md
//   - Chevron rotation animation via CSS transition
//   - Content expand/collapse animation via CSS grid + keyframes
//   - Disabled state (item-level)
//   - Full keyboard navigation (Radix handles this)
//   - WCAG AA accessible: focus ring, aria-expanded, arrow key nav
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/design-system/components/accordion";
//
//   <Accordion type="single" collapsible>
//     <AccordionItem value="item-1">
//       <AccordionTrigger>Section 1</AccordionTrigger>
//       <AccordionContent>Content for section 1</AccordionContent>
//     </AccordionItem>
//     <AccordionItem value="item-2">
//       <AccordionTrigger>Section 2</AccordionTrigger>
//       <AccordionContent>Content for section 2</AccordionContent>
//     </AccordionItem>
//   </Accordion>
// ============================================================================

import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import {
	type ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	type ReactNode,
	useContext,
} from "react";

// ---------------------------------------------------------------------------
// Context — shares group-level config with items
// ---------------------------------------------------------------------------

interface AccordionContextValue {
	variant: AccordionVariant;
	size: AccordionSize;
}

const AccordionContext = createContext<AccordionContextValue>({
	variant: "bordered",
	size: "md",
});

function useAccordionContext(): AccordionContextValue {
	return useContext(AccordionContext);
}

// ---------------------------------------------------------------------------
// CVA Variant Definitions
// ---------------------------------------------------------------------------

export const accordionRootVariants = cva(["flex flex-col"], {
	variants: {
		variant: {
			/**
			 * Bordered — each item has a visible border separator.
			 * Default variant for most use cases.
			 */
			bordered: "divide-y divide-border",

			/**
			 * Borderless — no visible borders between items.
			 * Use for tighter layouts or when embedded inside cards.
			 */
			borderless: "",
		},
	},
	defaultVariants: {
		variant: "bordered",
	},
});

export const accordionTriggerVariants = cva(
	[
		// Layout
		"flex flex-1 items-center justify-between w-full",
		// Typography
		"font-medium text-foreground",
		// Transition
		"transition-[color,background-color,opacity]",
		"duration-fast ease-standard",
		// Focus ring
		focusRingClasses,
		// Hover
		"hover:text-foreground hover:underline",
		// Disabled
		"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
		// Cursor
		"cursor-pointer",
		// Chevron rotation on open
		"[&>svg]:transition-transform [&>svg]:duration-normal [&>svg]:ease-standard",
		"[&[data-state=open]>svg]:rotate-180",
	],
	{
		variants: {
			size: {
				/**
				 * Small — compact for dense UIs, sidebars.
				 */
				sm: "py-3 text-sm leading-5",

				/**
				 * Medium — default size for most accordions.
				 */
				md: "py-4 text-sm leading-5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

export const accordionContentVariants = cva(
	[
		// Animate expand/collapse using CSS grid trick
		"overflow-hidden",
		"data-[state=closed]:animate-accordion-up",
		"data-[state=open]:animate-accordion-down",
	],
	{
		variants: {
			size: {
				sm: "text-sm leading-5",
				md: "text-sm leading-5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const accordionContentInnerVariants = cva(["text-muted-foreground"], {
	variants: {
		size: {
			sm: "pb-3",
			md: "pb-4",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AccordionVariant = "bordered" | "borderless";
export type AccordionSize = "sm" | "md";

/**
 * Props for a single-mode accordion (only one item open at a time).
 */
export interface AccordionSingleProps
	extends
		Omit<
			ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
			"type" | "asChild"
		>,
		VariantProps<typeof accordionRootVariants> {
	type: "single";
	/** Visual variant of the accordion. @default "bordered" */
	variant?: AccordionVariant;
	/** Size of the accordion items. @default "md" */
	size?: AccordionSize;
	/** Additional CSS classes. */
	className?: string;
	children: ReactNode;
}

/**
 * Props for a multiple-mode accordion (multiple items can be open).
 */
export interface AccordionMultipleProps
	extends
		Omit<
			ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
			"type" | "asChild"
		>,
		VariantProps<typeof accordionRootVariants> {
	type: "multiple";
	/** Visual variant of the accordion. @default "bordered" */
	variant?: AccordionVariant;
	/** Size of the accordion items. @default "md" */
	size?: AccordionSize;
	/** Additional CSS classes. */
	className?: string;
	children: ReactNode;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps extends ComponentPropsWithoutRef<
	typeof AccordionPrimitive.Item
> {
	/** Additional CSS classes. */
	className?: string;
	children: ReactNode;
}

export interface AccordionTriggerProps extends ComponentPropsWithoutRef<
	typeof AccordionPrimitive.Trigger
> {
	/** Additional CSS classes. */
	className?: string;
	/** Whether to hide the chevron icon. @default false */
	hideChevron?: boolean;
	children: ReactNode;
}

export interface AccordionContentProps extends ComponentPropsWithoutRef<
	typeof AccordionPrimitive.Content
> {
	/** Additional CSS classes. */
	className?: string;
	children: ReactNode;
}

// ---------------------------------------------------------------------------
// Chevron Icon (Internal)
// ---------------------------------------------------------------------------

function ChevronDownIcon({ className }: { className?: string }) {
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
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

// ---------------------------------------------------------------------------
// Accordion Root
// ---------------------------------------------------------------------------

/**
 * Accordion — a vertically stacked set of interactive headings that each
 * reveal a section of content.
 *
 * Built on Radix UI's Accordion primitive for full keyboard navigation
 * and ARIA compliance. All colors, radii, and transitions come from CSS
 * custom properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix handles `aria-expanded`, `aria-controls`, arrow key navigation
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled items are skipped in keyboard navigation
 *   - Supports both single and multiple expand modes
 *
 * @example
 * ```tsx
 * // Single mode (only one open at a time)
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="faq-1">
 *     <AccordionTrigger>What is Unified UI?</AccordionTrigger>
 *     <AccordionContent>
 *       A token-driven design system for React applications.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * // Multiple mode
 * <Accordion type="multiple" variant="borderless" size="sm">
 *   <AccordionItem value="a">
 *     <AccordionTrigger>Section A</AccordionTrigger>
 *     <AccordionContent>Content A</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="b">
 *     <AccordionTrigger>Section B</AccordionTrigger>
 *     <AccordionContent>Content B</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Root>,
	AccordionProps
>(function Accordion(
	{ variant = "bordered", size = "md", className, children, ...rest },
	ref,
) {
	return (
		<AccordionContext.Provider value={{ variant, size }}>
			{/* The rest spread carries `type` plus Radix-specific props.
			    We cast to any because TS cannot narrow a discriminated union
			    through object spread — the types are validated at the
			    component boundary via AccordionProps. */}
			<AccordionPrimitive.Root
				ref={ref}
				className={cn("not-prose", accordionRootVariants({ variant }), className)}
				data-ds=""
				data-ds-component="accordion"
				data-ds-variant={variant}
				data-ds-size={size}
				{...(rest as any)}
			>
				{children}
			</AccordionPrimitive.Root>
		</AccordionContext.Provider>
	);
});

Accordion.displayName = "Accordion";

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

/**
 * AccordionItem — a single collapsible section within the Accordion.
 *
 * Must be used as a direct child of `Accordion`.
 *
 * @example
 * ```tsx
 * <AccordionItem value="unique-value">
 *   <AccordionTrigger>Click to expand</AccordionTrigger>
 *   <AccordionContent>Expanded content here</AccordionContent>
 * </AccordionItem>
 * ```
 */
export const AccordionItem = forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Item>,
	AccordionItemProps
>(function AccordionItem({ className, children, ...rest }, ref) {
	return (
		<AccordionPrimitive.Item
			ref={ref}
			className={cn("", className)}
			data-ds=""
			data-ds-component="accordion-item"
			{...rest}
		>
			{children}
		</AccordionPrimitive.Item>
	);
});

AccordionItem.displayName = "AccordionItem";

// ---------------------------------------------------------------------------
// AccordionTrigger
// ---------------------------------------------------------------------------

/**
 * AccordionTrigger — the clickable heading that toggles an AccordionItem.
 *
 * Must be used inside an `AccordionItem`. Renders as a button within a
 * heading element for proper accessibility semantics.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Frequently asked question?</AccordionTrigger>
 * <AccordionTrigger hideChevron>No arrow here</AccordionTrigger>
 * ```
 */
export const AccordionTrigger = forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Trigger>,
	AccordionTriggerProps
>(function AccordionTrigger(
	{ className, hideChevron = false, children, ...rest },
	ref,
) {
	const { size } = useAccordionContext();

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(accordionTriggerVariants({ size }), className)}
				data-ds=""
				data-ds-component="accordion-trigger"
				{...rest}
			>
				{children}
				{!hideChevron && (
					<ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
				)}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
});

AccordionTrigger.displayName = "AccordionTrigger";

// ---------------------------------------------------------------------------
// AccordionContent
// ---------------------------------------------------------------------------

/**
 * AccordionContent — the collapsible content area of an AccordionItem.
 *
 * Uses CSS `animate-accordion-down` / `animate-accordion-up` keyframes
 * for smooth expand/collapse animation. This relies on the Radix
 * `--radix-accordion-content-height` CSS variable.
 *
 * Note: You must define the following keyframes and animation utilities
 * in your Tailwind / CSS configuration for the animations to work:
 *
 *   @keyframes accordion-down {
 *     from { height: 0; }
 *     to { height: var(--radix-accordion-content-height); }
 *   }
 *   @keyframes accordion-up {
 *     from { height: var(--radix-accordion-content-height); }
 *     to { height: 0; }
 *   }
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   <p>This content expands and collapses smoothly.</p>
 * </AccordionContent>
 * ```
 */
export const AccordionContent = forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Content>,
	AccordionContentProps
>(function AccordionContent({ className, children, ...rest }, ref) {
	const { size } = useAccordionContext();

	return (
		<AccordionPrimitive.Content
			ref={ref}
			className={cn(accordionContentVariants({ size }), className)}
			data-ds=""
			data-ds-component="accordion-content"
			{...rest}
		>
			<div className={cn(accordionContentInnerVariants({ size }))}>
				{children}
			</div>
		</AccordionPrimitive.Content>
	);
});

AccordionContent.displayName = "AccordionContent";
