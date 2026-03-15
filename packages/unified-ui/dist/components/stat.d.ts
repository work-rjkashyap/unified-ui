import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const statVariants: (props?: class_variance_authority_types.ClassProp | undefined) => string;
type StatTrend = "up" | "down" | "neutral";
interface StatProps {
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
declare const Stat: react.ForwardRefExoticComponent<StatProps & react.RefAttributes<HTMLDivElement>>;

export { Stat, type StatProps, type StatTrend, statVariants };
