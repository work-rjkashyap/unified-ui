import * as react from 'react';

type ThemeToggleMode = "light-dark" | "light-dark-system";
type ThemeToggleVariant = "icon" | "segmented";
type ThemeToggleSize = "sm" | "md" | "lg";
type ThemeValue = "light" | "dark" | "system";
interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
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
declare const ThemeToggle: react.ForwardRefExoticComponent<ThemeToggleProps & react.RefAttributes<HTMLElement>>;

export { ThemeToggle, type ThemeToggleMode, type ThemeToggleProps, type ThemeToggleSize, type ThemeToggleVariant, type ThemeValue };
