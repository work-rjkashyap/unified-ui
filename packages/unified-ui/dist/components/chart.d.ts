import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';

interface ChartContainerProps {
    /** Chart title. */
    title?: string;
    /** Chart description/subtitle. */
    description?: string;
    /** Chart height in pixels. @default 350 */
    height?: number;
    /** The Recharts chart component(s) to render. */
    children: ReactNode;
    /** Footer content (e.g., legend, notes). */
    footer?: ReactNode;
    /** Whether data is loading. @default false */
    loading?: boolean;
    /** Custom loading indicator. */
    loadingIndicator?: ReactNode;
    /** Content to show when chart has no data. */
    emptyContent?: ReactNode;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Design system chart colors. Use these as `fill` or `stroke` values
 * in Recharts components for consistent theming.
 *
 * @example
 * ```tsx
 * <Bar dataKey="revenue" fill={chartColors[0]} />
 * <Bar dataKey="expenses" fill={chartColors[1]} />
 * ```
 */
declare const chartColors: readonly ["var(--primary)", "var(--info)", "var(--success)", "var(--warning)", "var(--danger)", "var(--secondary)", "var(--muted-foreground)", "oklch(0.65 0.15 250)", "oklch(0.65 0.15 160)", "oklch(0.65 0.15 30)"];
/**
 * `ChartContainer` — a card wrapper for Recharts charts with DS styling.
 *
 * Place your Recharts `<BarChart>`, `<LineChart>`, `<PieChart>`, etc.
 * as children. The container provides a responsive wrapper, title, and
 * optional footer.
 *
 * **Important**: This component does NOT bundle Recharts. You must install
 * `recharts` separately as a peer dependency.
 *
 * @example
 * ```tsx
 * import { ChartContainer, chartColors } from "@work-rjkashyap/unified-ui/components";
 * import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
 *
 * <ChartContainer title="Monthly Revenue" description="Last 6 months">
 *   <ResponsiveContainer width="100%" height="100%">
 *     <BarChart data={data}>
 *       <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
 *       <YAxis stroke="var(--muted-foreground)" fontSize={12} />
 *       <Tooltip
 *         contentStyle={{
 *           background: "var(--background)",
 *           border: "1px solid var(--border)",
 *           borderRadius: "var(--radius-md)",
 *           fontSize: 13,
 *         }}
 *       />
 *       <Bar dataKey="revenue" fill={chartColors[0]} radius={[4, 4, 0, 0]} />
 *     </BarChart>
 *   </ResponsiveContainer>
 * </ChartContainer>
 * ```
 */
declare const ChartContainer: react.ForwardRefExoticComponent<ChartContainerProps & react.RefAttributes<HTMLDivElement>>;
interface ChartTooltipContentProps {
    /** Label for the tooltip header. */
    label?: string;
    /** Payload from Recharts tooltip. */
    payload?: Array<{
        name: string;
        value: number | string;
        color?: string;
        fill?: string;
    }>;
    /** Whether the tooltip is active. */
    active?: boolean;
    /** Custom formatter for values. */
    formatter?: (value: number | string, name: string) => string;
    /** Additional class names. */
    className?: string;
}
/**
 * `ChartTooltipContent` — a pre-styled tooltip content component for Recharts.
 *
 * Use as the `content` prop of Recharts' `<Tooltip>`:
 *
 * @example
 * ```tsx
 * <Tooltip content={<ChartTooltipContent />} />
 * ```
 */
declare function ChartTooltipContent({ label, payload, active, formatter, className, }: ChartTooltipContentProps): react_jsx_runtime.JSX.Element | null;
declare namespace ChartTooltipContent {
    var displayName: string;
}

export { ChartContainer, type ChartContainerProps, ChartTooltipContent, type ChartTooltipContentProps, chartColors };
