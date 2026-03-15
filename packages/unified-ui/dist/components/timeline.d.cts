import * as react from 'react';
import { ReactNode } from 'react';

type TimelineVariant = "default" | "outlined" | "filled";
type TimelineSize = "sm" | "md" | "lg";
type TimelineAlign = "left" | "right" | "alternate";
type TimelineItemStatus = "default" | "active" | "success" | "warning" | "danger" | "pending";
interface TimelineItemData {
    id?: string;
    title?: ReactNode;
    description?: ReactNode;
    timestamp?: ReactNode;
    icon?: ReactNode;
    status?: TimelineItemStatus;
    content?: ReactNode;
}
interface TimelineProps {
    items: TimelineItemData[];
    align?: TimelineAlign;
    size?: TimelineSize;
    animated?: boolean;
    className?: string;
}
interface TimelineItemProps {
    title?: ReactNode;
    description?: ReactNode;
    timestamp?: ReactNode;
    icon?: ReactNode;
    status?: TimelineItemStatus;
    isLast?: boolean;
    align?: "left" | "right";
    size?: TimelineSize;
    animated?: boolean;
    side?: "left" | "right";
    className?: string;
    children?: ReactNode;
}
declare const TimelineItem: react.ForwardRefExoticComponent<TimelineItemProps & react.RefAttributes<HTMLDivElement>>;
declare const Timeline: react.ForwardRefExoticComponent<TimelineProps & react.RefAttributes<HTMLDivElement>>;

export { Timeline, type TimelineAlign, TimelineItem, type TimelineItemData, type TimelineItemProps, type TimelineItemStatus, type TimelineProps, type TimelineSize, type TimelineVariant };
