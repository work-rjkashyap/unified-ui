"use client";

import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — Stat Component
// ============================================================================
// KPI card with value, label, trend indicator, and sparkline slot.
// Features count-up animation on mount via Framer Motion.
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { forwardRef, type ReactNode, useEffect } from "react";
import { cn } from "@/lib/cn";
import { countUp, slideUpSm } from "@/lib/motion";

export const statVariants = cva([
  "rounded-lg border border-border bg-card p-4 flex flex-col gap-2",
]);

export type StatTrend = "up" | "down" | "neutral";

export interface StatProps {
  label: ReactNode;
  value: string | number;
  previousValue?: number;
  trend?: StatTrend;
  trendLabel?: ReactNode;
  sparkline?: ReactNode;
  prefix?: string;
  suffix?: string;
  animated?: boolean;
  className?: string;
}

function TrendUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

function TrendDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 17-8.5-8.5-5 5L2 7" />
      <path d="M16 17h6v-6" />
    </svg>
  );
}

// Animated count-up span
function AnimatedNumber({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const shouldReduce = useReducedMotion();
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (shouldReduce) {
      motionVal.set(value);
      return;
    }
    const controls = animate(motionVal, value, {
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
    });
    return controls.stop;
  }, [value, motionVal, shouldReduce]);

  const rounded = useTransform(
    motionVal,
    (v) => `${prefix ?? ""}${Math.round(v).toLocaleString()}${suffix ?? ""}`,
  );

  return <motion.span data-ds-animated="">{rounded}</motion.span>;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  {
    label,
    value,
    previousValue,
    trend,
    trendLabel,
    sparkline,
    prefix,
    suffix,
    animated = true,
    className,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();

  const isNumeric = typeof value === "number";

  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
        ? "text-danger"
        : "text-muted-foreground";

  return (
    <div
      ref={ref}
      className={cn(statVariants(), className)}
      data-ds=""
      data-ds-component="stat"
      data-ds-trend={trend}
      {...rest}
    >
      {/* Label row */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground leading-none">
          {label}
        </span>
        {sparkline && <div className="h-8 flex items-center">{sparkline}</div>}
      </div>

      {/* Value */}
      <motion.div
        className="text-2xl font-bold text-foreground leading-none tabular-nums"
        variants={animated && !shouldReduce ? countUp.variants : undefined}
        initial={animated && !shouldReduce ? "initial" : undefined}
        animate={animated && !shouldReduce ? "animate" : undefined}
        transition={animated && !shouldReduce ? countUp.transition : undefined}
        data-ds-animated={animated ? "" : undefined}
      >
        {isNumeric && animated ? (
          <AnimatedNumber
            value={value as number}
            prefix={prefix}
            suffix={suffix}
          />
        ) : (
          <span>
            {prefix}
            {String(value)}
            {suffix}
          </span>
        )}
      </motion.div>

      {/* Trend indicator */}
      {(trend || trendLabel) && (
        <motion.div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trendColor,
          )}
          variants={animated && !shouldReduce ? slideUpSm.variants : undefined}
          initial={animated && !shouldReduce ? "initial" : undefined}
          animate={animated && !shouldReduce ? "animate" : undefined}
          transition={
            animated && !shouldReduce
              ? { ...slideUpSm.transition, delay: 0.3 }
              : undefined
          }
          data-ds-animated={animated ? "" : undefined}
        >
          {trend === "up" && <TrendUpIcon className="size-3.5" />}
          {trend === "down" && <TrendDownIcon className="size-3.5" />}
          {trendLabel && <span>{trendLabel}</span>}
        </motion.div>
      )}
    </div>
  );
});

Stat.displayName = "Stat";
