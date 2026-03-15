import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { Tabs as Tabs$1 } from 'radix-ui';

declare const tabsListVariants: (props?: ({
    variant?: "underline" | "pills" | "enclosed" | null | undefined;
    orientation?: "horizontal" | "vertical" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tabsTriggerVariants: (props?: ({
    variant?: "underline" | "pills" | "enclosed" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TabsVariant = "underline" | "pills" | "enclosed";
type TabsSize = "sm" | "md";
type TabsOrientation = "horizontal" | "vertical";
interface TabsProps extends Omit<ComponentPropsWithoutRef<typeof Tabs$1.Root>, "orientation"> {
    /** Visual variant of the tab list. @default "underline" */
    variant?: TabsVariant;
    /** Size of the tab triggers. @default "md" */
    size?: TabsSize;
    /** Layout orientation. @default "horizontal" */
    orientation?: TabsOrientation;
    /** Additional CSS classes. */
    className?: string;
    /** Tab content. */
    children?: ReactNode;
}
interface TabsListProps extends ComponentPropsWithoutRef<typeof Tabs$1.List> {
    /** Whether tabs stretch to fill the available width. @default false */
    fullWidth?: boolean;
    /** Additional CSS classes. */
    className?: string;
    /** Tab triggers. */
    children?: ReactNode;
}
interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof Tabs$1.Trigger> {
    /** Additional CSS classes. */
    className?: string;
    /** Optional icon to display before the label. */
    icon?: ReactNode;
    /** The trigger label. */
    children?: ReactNode;
}
interface TabsContentProps extends ComponentPropsWithoutRef<typeof Tabs$1.Content> {
    /** Additional CSS classes. */
    className?: string;
    /** The panel content. */
    children?: ReactNode;
}
/**
 * Tabs — a tabbed interface for organizing content into panels.
 *
 * Built on Radix UI's Tabs primitive for full keyboard navigation
 * and ARIA compliance. Supports three visual variants with an animated
 * active indicator powered by Framer Motion layoutId.
 *
 * Accessibility:
 *   - Radix provides `role="tablist"`, `role="tab"`, `role="tabpanel"`
 *   - Arrow key navigation between triggers
 *   - Automatic `aria-selected`, `aria-controls`, `aria-labelledby`
 *   - Focus management follows WAI-ARIA Tabs pattern
 *
 * @example
 * ```tsx
 * // Basic underline tabs
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="analytics">Analytics</TabsTrigger>
 *     <TabsTrigger value="settings">Settings</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">Overview content</TabsContent>
 *   <TabsContent value="analytics">Analytics content</TabsContent>
 *   <TabsContent value="settings">Settings content</TabsContent>
 * </Tabs>
 *
 * // Pills variant, small size
 * <Tabs variant="pills" size="sm" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 *
 * // Full-width tabs
 * <Tabs defaultValue="tab1">
 *   <TabsList fullWidth>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 *
 * // Vertical orientation
 * <Tabs orientation="vertical" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 * </Tabs>
 * ```
 */
declare const Tabs: react.ForwardRefExoticComponent<TabsProps & react.RefAttributes<HTMLDivElement>>;
/**
 * TabsList — the container for tab triggers (the tab bar).
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 *
 * // Full-width stretch
 * <TabsList fullWidth>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 */
declare const TabsList: react.ForwardRefExoticComponent<TabsListProps & react.RefAttributes<HTMLDivElement>>;
/**
 * TabsTrigger — an individual tab button within the TabsList.
 *
 * Renders a Framer Motion active indicator when the tab is selected,
 * creating a smooth sliding animation between active tabs. The indicator
 * is only mounted on the currently active trigger so that Framer Motion's
 * layoutId animation works correctly (only one element per layoutId).
 *
 * @example
 * ```tsx
 * <TabsTrigger value="overview">Overview</TabsTrigger>
 * <TabsTrigger value="analytics" icon={<BarChartIcon />}>Analytics</TabsTrigger>
 * <TabsTrigger value="locked" disabled>Locked</TabsTrigger>
 * ```
 */
declare const TabsTrigger: react.ForwardRefExoticComponent<TabsTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * TabsContent — the content panel associated with a tab trigger.
 *
 * @example
 * ```tsx
 * <TabsContent value="overview">
 *   <p>Overview content goes here.</p>
 * </TabsContent>
 * ```
 */
declare const TabsContent: react.ForwardRefExoticComponent<TabsContentProps & react.RefAttributes<HTMLDivElement>>;

export { Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsOrientation, type TabsProps, type TabsSize, TabsTrigger, type TabsTriggerProps, type TabsVariant, tabsListVariants, tabsTriggerVariants };
