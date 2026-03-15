import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { Separator as Separator$1 } from 'radix-ui';

declare const separatorVariants: (props?: ({
    variant?: "default" | "dashed" | "muted" | "gradient" | null | undefined;
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SeparatorVariant = NonNullable<VariantProps<typeof separatorVariants>["variant"]>;
type SeparatorOrientation = "horizontal" | "vertical";
type SeparatorSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
interface SeparatorProps extends ComponentPropsWithoutRef<typeof Separator$1.Root> {
    /**
     * Visual variant of the separator.
     * @default "default"
     */
    variant?: SeparatorVariant;
    /**
     * Orientation of the separator.
     * @default "horizontal"
     */
    orientation?: SeparatorOrientation;
    /**
     * Whether the separator is purely decorative. When `true`, it is hidden
     * from the accessibility tree. When `false`, it renders as a semantic
     * separator with `role="separator"`.
     * @default true
     */
    decorative?: boolean;
    /**
     * Vertical margin (horizontal orientation) or horizontal margin
     * (vertical orientation), using Tailwind spacing scale.
     * @default 4
     */
    spacing?: SeparatorSpacing;
    /**
     * Optional label to render centered on the separator.
     * Creates a "divider with text" pattern (e.g., "OR", "Continue", etc.).
     * Only supported for horizontal orientation.
     */
    label?: ReactNode;
    /**
     * Additional CSS classes applied to the separator line (or wrapper
     * when a label is present).
     */
    className?: string;
}
/**
 * Separator — a visual divider between content sections.
 *
 * Built on Radix UI's Separator primitive with design system tokens for
 * consistent styling. Supports horizontal and vertical orientations,
 * optional labels, and multiple visual variants.
 *
 * Accessibility:
 *   - `decorative={true}` (default) → `role="none"`, hidden from AT
 *   - `decorative={false}` → `role="separator"` + `aria-orientation`
 *   - Label text is visible but does not affect semantics when decorative
 *
 * @example
 * ```tsx
 * // Basic horizontal separator
 * <Separator />
 *
 * // With custom spacing
 * <Separator spacing={6} />
 *
 * // Vertical separator (e.g., in a toolbar)
 * <Separator orientation="vertical" />
 *
 * // With a label
 * <Separator label="OR" />
 * <Separator label={<span className="text-muted-foreground">Section</span>} />
 *
 * // Muted variant
 * <Separator variant="muted" />
 *
 * // Dashed variant
 * <Separator variant="dashed" />
 *
 * // Gradient variant
 * <Separator variant="gradient" />
 *
 * // Semantic (non-decorative) separator
 * <Separator decorative={false} />
 * ```
 */
declare const Separator: react.ForwardRefExoticComponent<SeparatorProps & react.RefAttributes<HTMLDivElement>>;

export { Separator, type SeparatorOrientation, type SeparatorProps, type SeparatorSpacing, type SeparatorVariant, separatorVariants };
