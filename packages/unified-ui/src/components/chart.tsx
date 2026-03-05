"use client";

// ============================================================================
// Unified UI — Chart Component
// ============================================================================
// Chart wrapper for Recharts with consistent theme tokens and responsive size.
// Provides a card container with title, description, and legend, and
// automatically applies design system colors to chart elements.
//
// Features:
//   - Responsive container that fills parent width
//   - Pre-configured color palette from design system tokens
//   - Card wrapper with title, description, footer slots
//   - Supports all Recharts chart types (pass as children)
//   - Dark/light mode aware colors
//   - Configurable height
//   - Loading and empty states
//   - Full ref forwarding
//
// Usage:
//   import { ChartContainer, ChartTooltip, ChartLegend } from "@work-rjkashyap/unified-ui/components";
//   import { BarChart, Bar, XAxis, YAxis } from "recharts";
//
//   <ChartContainer title="Revenue" height={300}>
//     <BarChart data={data}>
//       <XAxis dataKey="name" />
//       <YAxis />
//       <ChartTooltip />
//       <Bar dataKey="value" fill="var(--primary)" />
//     </BarChart>
//   </ChartContainer>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChartContainerProps {
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

// ---------------------------------------------------------------------------
// Pre-defined chart color palette
// ---------------------------------------------------------------------------

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
export const chartColors = [
  "var(--primary)",
  "var(--info)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
  "var(--secondary)",
  "var(--muted-foreground)",
  "oklch(0.65 0.15 250)", // sky
  "oklch(0.65 0.15 160)", // emerald
  "oklch(0.65 0.15 30)", // amber
] as const;

// ---------------------------------------------------------------------------
// ChartContainer
// ---------------------------------------------------------------------------

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
export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  function ChartContainer(
    {
      title,
      description,
      height = 350,
      children,
      footer,
      loading = false,
      loadingIndicator,
      emptyContent,
      className,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-background p-4",
          className,
        )}
        data-ds=""
        data-ds-component="chart"
      >
        {/* Header */}
        {(title || description) && (
          <div className="mb-4 space-y-1">
            {title && (
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Chart area */}
        <div className="relative" style={{ height }}>
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {loadingIndicator ?? (
                <div className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" />
              )}
            </div>
          ) : emptyContent ? (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              {emptyContent}
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
ChartContainer.displayName = "ChartContainer";

// ---------------------------------------------------------------------------
// ChartTooltipContent (helper for consistent tooltip styling)
// ---------------------------------------------------------------------------

export interface ChartTooltipContentProps {
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
export function ChartTooltipContent({
  label,
  payload,
  active,
  formatter,
  className,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background px-3 py-2 shadow-lg",
        "text-sm",
        className,
      )}
    >
      {label && <p className="font-medium text-foreground mb-1">{label}</p>}
      <div className="space-y-0.5">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color ?? entry.fill }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground ml-auto tabular-nums">
              {formatter ? formatter(entry.value, entry.name) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
ChartTooltipContent.displayName = "ChartTooltipContent";
