import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const textareaVariants: (props?: ({
    variant?: "success" | "default" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TextareaVariant = "default" | "error" | "success";
type TextareaSize = "sm" | "md" | "lg";
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">, VariantProps<typeof textareaVariants> {
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
declare const Textarea: react.ForwardRefExoticComponent<TextareaProps & react.RefAttributes<HTMLTextAreaElement>>;

export { Textarea, type TextareaProps, type TextareaSize, type TextareaVariant, textareaVariants };
