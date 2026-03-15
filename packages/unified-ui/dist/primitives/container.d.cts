import * as react from 'react';
import { ElementType, ReactNode } from 'react';

declare const sizeClassMap: {
    /** 640px — narrow forms, single-column content */
    readonly xs: "max-w-screen-sm";
    /** 768px — articles, focused reading content */
    readonly sm: "max-w-screen-md";
    /** 1024px — dashboards, multi-column layouts */
    readonly md: "max-w-screen-lg";
    /** 1280px — default, full-width page content */
    readonly lg: "max-w-7xl";
    /** No max-width constraint — full bleed */
    readonly full: "max-w-full";
};
declare const paddingClassMap: {
    /** No horizontal padding */
    readonly none: "";
    /** Tighter padding: px-3 → px-4 → px-6 */
    readonly tight: "px-3 sm:px-4 lg:px-6";
    /** Standard padding: px-4 → px-6 → px-8 (project default) */
    readonly default: "px-4 sm:px-6 lg:px-8";
    /** Wider padding: px-6 → px-8 → px-10 */
    readonly wide: "px-6 sm:px-8 lg:px-10";
};
type ContainerSize = keyof typeof sizeClassMap;
type ContainerPadding = keyof typeof paddingClassMap;
interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Max-width constraint for the container.
     * @default "lg" (1280px / max-w-7xl)
     */
    size?: ContainerSize;
    /**
     * Horizontal padding preset. Responsive by default.
     * @default "default" (px-4 → px-6 → px-8)
     */
    padding?: ContainerPadding;
    /**
     * Center the container horizontally. Almost always true.
     * @default true
     */
    centered?: boolean;
    /**
     * The HTML element to render as.
     * @default "div"
     */
    as?: ElementType;
    /** Content to render inside the container. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Container — constrains content width and applies responsive horizontal padding.
 *
 * This is the primary layout wrapper for page-level content. It enforces the
 * design system's max-width and padding guidelines so you never need to
 * remember the responsive padding breakpoints.
 *
 * @example
 * ```tsx
 * // Standard page container (1280px max, responsive padding)
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Content here is properly constrained and padded.</p>
 * </Container>
 *
 * // Narrow container for a form
 * <Container size="xs" padding="tight">
 *   <form>...</form>
 * </Container>
 *
 * // Full-bleed section with no padding
 * <Container size="full" padding="none" as="section">
 *   <div className="bg-surface py-10">...</div>
 * </Container>
 * ```
 */
declare const Container: react.ForwardRefExoticComponent<ContainerProps & react.RefAttributes<HTMLElement>>;

export { Container, type ContainerPadding, type ContainerProps, type ContainerSize };
