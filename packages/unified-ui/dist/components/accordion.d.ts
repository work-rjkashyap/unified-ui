import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { Accordion as Accordion$1 } from 'radix-ui';

declare const accordionRootVariants: (props?: ({
    variant?: "bordered" | "borderless" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionTriggerVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionContentVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AccordionVariant = "bordered" | "borderless";
type AccordionSize = "sm" | "md";
/**
 * Props for a single-mode accordion (only one item open at a time).
 */
interface AccordionSingleProps extends Omit<ComponentPropsWithoutRef<typeof Accordion$1.Root>, "type" | "asChild">, VariantProps<typeof accordionRootVariants> {
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
interface AccordionMultipleProps extends Omit<ComponentPropsWithoutRef<typeof Accordion$1.Root>, "type" | "asChild">, VariantProps<typeof accordionRootVariants> {
    type: "multiple";
    /** Visual variant of the accordion. @default "bordered" */
    variant?: AccordionVariant;
    /** Size of the accordion items. @default "md" */
    size?: AccordionSize;
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
interface AccordionItemProps extends ComponentPropsWithoutRef<typeof Accordion$1.Item> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface AccordionTriggerProps extends ComponentPropsWithoutRef<typeof Accordion$1.Trigger> {
    /** Additional CSS classes. */
    className?: string;
    /** Whether to hide the chevron icon. @default false */
    hideChevron?: boolean;
    children: ReactNode;
}
interface AccordionContentProps extends ComponentPropsWithoutRef<typeof Accordion$1.Content> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
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
declare const Accordion: react.ForwardRefExoticComponent<AccordionProps & react.RefAttributes<HTMLDivElement>>;
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
declare const AccordionItem: react.ForwardRefExoticComponent<AccordionItemProps & react.RefAttributes<HTMLDivElement>>;
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
declare const AccordionTrigger: react.ForwardRefExoticComponent<AccordionTriggerProps & react.RefAttributes<HTMLButtonElement>>;
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
declare const AccordionContent: react.ForwardRefExoticComponent<AccordionContentProps & react.RefAttributes<HTMLDivElement>>;

export { Accordion, AccordionContent, type AccordionContentProps, AccordionItem, type AccordionItemProps, type AccordionMultipleProps, type AccordionProps, type AccordionSingleProps, type AccordionSize, AccordionTrigger, type AccordionTriggerProps, type AccordionVariant, accordionContentVariants, accordionRootVariants, accordionTriggerVariants };
