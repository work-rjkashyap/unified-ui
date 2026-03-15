import * as react from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    /**
     * Vertical margin above and below (horizontal) or horizontal margin
     * left and right (vertical) of the divider, using Tailwind spacing scale.
     * @default 4
     */
    spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
    /**
     * Orientation of the divider.
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Divider — a visual separator line that uses design system border tokens.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider spacing={6} />
 * <Divider orientation="vertical" />
 * ```
 */
declare const Divider: react.ForwardRefExoticComponent<DividerProps & react.RefAttributes<HTMLHRElement>>;

export { Divider, type DividerProps };
