import * as react from 'react';
import { ReactNode } from 'react';

type SidebarVariant = "default" | "floating" | "inset";
type SidebarCollapsible = "offcanvas" | "icon" | "none";
type SidebarSide = "left" | "right";
interface SidebarContextValue {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
    variant: SidebarVariant;
    collapsible: SidebarCollapsible;
    side: SidebarSide;
}
/**
 * Hook to access the sidebar context.
 *
 * Must be used within a `<SidebarProvider>`.
 *
 * @returns The sidebar context value containing state, open/close handlers,
 *          mobile state, toggle function, variant, collapsible mode, and side.
 *
 * @example
 * ```tsx
 * const { open, toggleSidebar, isMobile, state } = useSidebar();
 *
 * // state is "expanded" or "collapsed"
 * // open is the boolean open state
 * ```
 */
declare function useSidebar(): SidebarContextValue;
declare const useSidebarContext: typeof useSidebar;
interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Whether the sidebar is open (controlled).
     * When provided, the component is controlled.
     */
    open?: boolean;
    /**
     * Callback fired when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Default open state for uncontrolled mode.
     * @default true
     */
    defaultOpen?: boolean;
    /**
     * Visual variant of the sidebar.
     * - `"default"` — Standard bordered sidebar
     * - `"floating"` — Rounded sidebar with gap and shadow
     * - `"inset"` — Sidebar inset within a parent container
     * @default "default"
     */
    variant?: SidebarVariant;
    /**
     * How the sidebar collapses.
     * - `"offcanvas"` — Slides off-screen
     * - `"icon"` — Collapses to icon-only width
     * - `"none"` — Not collapsible
     * @default "offcanvas"
     */
    collapsible?: SidebarCollapsible;
    /**
     * Which side to place the sidebar.
     * @default "left"
     */
    side?: SidebarSide;
    /** Children to render inside the provider. */
    children?: ReactNode;
    /** Additional CSS classes on the wrapper div. */
    className?: string;
}
/**
 * SidebarProvider — manages sidebar state and provides context.
 *
 * Wraps the sidebar and its sibling content. Handles controlled/uncontrolled
 * state, mobile detection, keyboard shortcut, and CSS custom properties.
 *
 * @example
 * ```tsx
 * <SidebarProvider defaultOpen>
 *   <Sidebar>
 *     <SidebarHeader />
 *     <SidebarContent>
 *       <SidebarGroup>...</SidebarGroup>
 *     </SidebarContent>
 *     <SidebarFooter />
 *   </Sidebar>
 *   <SidebarInset>
 *     <main>Page content</main>
 *   </SidebarInset>
 * </SidebarProvider>
 * ```
 */
declare const SidebarProvider: react.ForwardRefExoticComponent<SidebarProviderProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Which side to place the sidebar. Overrides the provider's side.
     * @default "left"
     */
    side?: SidebarSide;
    /**
     * Visual variant. Overrides the provider's variant.
     * @default "default"
     */
    variant?: SidebarVariant;
    /**
     * How the sidebar collapses. Overrides the provider's collapsible.
     * @default "offcanvas"
     */
    collapsible?: SidebarCollapsible;
    /** Additional CSS classes. */
    className?: string;
    /** Sidebar content. */
    children?: ReactNode;
}
/**
 * Sidebar — the main sidebar container.
 *
 * Renders as a `<div>` wrapping an inner `<div>` that holds the sidebar
 * content. Handles desktop width animation and mobile sheet overlay.
 *
 * @example
 * ```tsx
 * <Sidebar side="left" variant="default" collapsible="icon">
 *   <SidebarHeader>
 *     <TeamSwitcher />
 *   </SidebarHeader>
 *   <SidebarContent>
 *     <SidebarGroup>
 *       <SidebarGroupLabel>Platform</SidebarGroupLabel>
 *       <SidebarGroupContent>
 *         <SidebarMenu>
 *           <SidebarMenuItem>
 *             <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *           </SidebarMenuItem>
 *         </SidebarMenu>
 *       </SidebarGroupContent>
 *     </SidebarGroup>
 *   </SidebarContent>
 *   <SidebarFooter>
 *     <UserNav />
 *   </SidebarFooter>
 * </Sidebar>
 * ```
 */
declare const Sidebar: react.ForwardRefExoticComponent<SidebarProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Custom trigger content. Defaults to a PanelLeft icon. */
    children?: ReactNode;
}
/**
 * SidebarTrigger — a button that toggles the sidebar open/closed.
 *
 * @example
 * ```tsx
 * <SidebarTrigger className="ml-2" />
 * ```
 */
declare const SidebarTrigger: react.ForwardRefExoticComponent<SidebarTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SidebarToggle: react.ForwardRefExoticComponent<SidebarTriggerProps & react.RefAttributes<HTMLButtonElement>>;
type SidebarToggleProps = SidebarTriggerProps;
interface SidebarRailProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * SidebarRail — a thin vertical bar at the sidebar edge that toggles
 * the sidebar on click. Provides an affordance for quick collapse/expand.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   {/* ... sidebar content ... *\/}
 *   <SidebarRail />
 * </Sidebar>
 * ```
 */
declare const SidebarRail: react.ForwardRefExoticComponent<SidebarRailProps & react.RefAttributes<HTMLButtonElement>>;
interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Content. */
    children?: ReactNode;
}
/**
 * SidebarInset — the main content area that sits beside the sidebar.
 *
 * Use as a sibling of `<Sidebar>` inside `<SidebarProvider>`.
 *
 * @example
 * ```tsx
 * <SidebarProvider>
 *   <Sidebar>...</Sidebar>
 *   <SidebarInset>
 *     <header>...</header>
 *     <main>Page content</main>
 *   </SidebarInset>
 * </SidebarProvider>
 * ```
 */
declare const SidebarInset: react.ForwardRefExoticComponent<SidebarInsetProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Header content (logo, team switcher, etc.). */
    children?: ReactNode;
}
/**
 * SidebarHeader — sticky top area of the sidebar.
 *
 * Typically contains a logo, team/workspace switcher, or branding.
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <SidebarMenu>
 *     <SidebarMenuItem>
 *       <DropdownMenu>
 *         <DropdownMenuTrigger asChild>
 *           <SidebarMenuButton>
 *             <Logo />
 *             <span>Acme Inc</span>
 *           </SidebarMenuButton>
 *         </DropdownMenuTrigger>
 *         <DropdownMenuContent>...</DropdownMenuContent>
 *       </DropdownMenu>
 *     </SidebarMenuItem>
 *   </SidebarMenu>
 * </SidebarHeader>
 * ```
 */
declare const SidebarHeader: react.ForwardRefExoticComponent<SidebarHeaderProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Content (SidebarGroups). */
    children?: ReactNode;
}
/**
 * SidebarContent — the scrollable middle area of the sidebar.
 *
 * Contains one or more `<SidebarGroup>` components. Automatically
 * scrollable when content overflows.
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarGroup>...</SidebarGroup>
 *   <SidebarGroup>...</SidebarGroup>
 * </SidebarContent>
 * ```
 */
declare const SidebarContent: react.ForwardRefExoticComponent<SidebarContentProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Footer content (user nav, actions, etc.). */
    children?: ReactNode;
}
/**
 * SidebarFooter — sticky bottom area of the sidebar.
 *
 * Typically contains user navigation, account switcher, or actions.
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <SidebarMenu>
 *     <SidebarMenuItem>
 *       <DropdownMenu>
 *         <DropdownMenuTrigger asChild>
 *           <SidebarMenuButton>
 *             <Avatar src="/avatar.jpg" />
 *             <span>shadcn</span>
 *           </SidebarMenuButton>
 *         </DropdownMenuTrigger>
 *         <DropdownMenuContent>...</DropdownMenuContent>
 *       </DropdownMenu>
 *     </SidebarMenuItem>
 *   </SidebarMenu>
 * </SidebarFooter>
 * ```
 */
declare const SidebarFooter: react.ForwardRefExoticComponent<SidebarFooterProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * SidebarSeparator — a horizontal divider within the sidebar.
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarGroup>...</SidebarGroup>
 *   <SidebarSeparator />
 *   <SidebarGroup>...</SidebarGroup>
 * </SidebarContent>
 * ```
 */
declare const SidebarSeparator: react.ForwardRefExoticComponent<SidebarSeparatorProps & react.RefAttributes<HTMLHRElement>>;
interface SidebarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * SidebarInput — a search/filter input styled for the sidebar.
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <SidebarInput placeholder="Search the docs..." />
 * </SidebarHeader>
 * ```
 */
declare const SidebarInput: react.ForwardRefExoticComponent<SidebarInputProps & react.RefAttributes<HTMLInputElement>>;
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Group content. */
    children?: ReactNode;
}
/**
 * SidebarGroup — a logical section within the sidebar content.
 *
 * Groups contain a label, optional action, and content (menu items).
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Platform</SidebarGroupLabel>
 *   <SidebarGroupContent>
 *     <SidebarMenu>
 *       <SidebarMenuItem>
 *         <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *       </SidebarMenuItem>
 *     </SidebarMenu>
 *   </SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
declare const SidebarGroup: react.ForwardRefExoticComponent<SidebarGroupProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Render as a different element via `asChild` pattern.
     * When true, merges props onto the single child element.
     * @default false
     */
    asChild?: boolean;
    /** Additional CSS classes. */
    className?: string;
    /** Label content. */
    children?: ReactNode;
}
/**
 * SidebarGroupLabel — the heading for a sidebar group.
 *
 * Automatically hides when the sidebar is in icon-only collapsed state.
 *
 * @example
 * ```tsx
 * <SidebarGroupLabel>Platform</SidebarGroupLabel>
 *
 * // With collapsible group (renders as a button):
 * <Collapsible>
 *   <SidebarGroupLabel asChild>
 *     <CollapsibleTrigger>
 *       Build Your Application
 *       <ChevronDown />
 *     </CollapsibleTrigger>
 *   </SidebarGroupLabel>
 *   <CollapsibleContent>
 *     <SidebarGroupContent>...</SidebarGroupContent>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
declare const SidebarGroupLabel: react.ForwardRefExoticComponent<SidebarGroupLabelProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarGroupActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Action content (typically an icon). */
    children?: ReactNode;
}
/**
 * SidebarGroupAction — an action button in the group header row.
 *
 * Positioned absolutely to the right of the group label. Useful for
 * "add" buttons, expand/collapse toggles, etc.
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Projects</SidebarGroupLabel>
 *   <SidebarGroupAction title="Add Project">
 *     <PlusIcon className="size-4" />
 *   </SidebarGroupAction>
 *   <SidebarGroupContent>...</SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
declare const SidebarGroupAction: react.ForwardRefExoticComponent<SidebarGroupActionProps & react.RefAttributes<HTMLButtonElement>>;
interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Content. */
    children?: ReactNode;
}
/**
 * SidebarGroupContent — wrapper for the items inside a group.
 *
 * @example
 * ```tsx
 * <SidebarGroupContent>
 *   <SidebarMenu>...</SidebarMenu>
 * </SidebarGroupContent>
 * ```
 */
declare const SidebarGroupContent: react.ForwardRefExoticComponent<SidebarGroupContentProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Menu items. */
    children?: ReactNode;
}
/**
 * SidebarMenu — a navigation list container (`<ul>`).
 *
 * @example
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuItem>...</SidebarMenuItem>
 *   <SidebarMenuItem>...</SidebarMenuItem>
 * </SidebarMenu>
 * ```
 */
declare const SidebarMenu: react.ForwardRefExoticComponent<SidebarMenuProps & react.RefAttributes<HTMLUListElement>>;
interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Item content. */
    children?: ReactNode;
}
/**
 * SidebarMenuItem — a single item wrapper (`<li>`) inside a SidebarMenu.
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <HomeIcon />
 *     <span>Dashboard</span>
 *   </SidebarMenuButton>
 * </SidebarMenuItem>
 * ```
 */
declare const SidebarMenuItem: react.ForwardRefExoticComponent<SidebarMenuItemProps & react.RefAttributes<HTMLLIElement>>;
type SidebarMenuButtonSize = "sm" | "default" | "lg";
type SidebarMenuButtonVariant = "default" | "outline";
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether this item is the currently active page.
     * @default false
     */
    isActive?: boolean;
    /**
     * Size of the menu button.
     * @default "default"
     */
    size?: SidebarMenuButtonSize;
    /**
     * Visual variant.
     * @default "default"
     */
    variant?: SidebarMenuButtonVariant;
    /**
     * Tooltip content shown when sidebar is collapsed to icon-only mode.
     * Can be a string or ReactNode. If not provided, no tooltip is shown.
     */
    tooltip?: string | ReactNode;
    /**
     * Render as a child element (e.g., <a> or framework Link).
     * When true, the component does NOT render its own <button>.
     * Instead it renders a <span> wrapper. Use this with DropdownMenuTrigger
     * or similar Radix "asChild" patterns.
     * @default false
     */
    asChild?: boolean;
    /** Additional CSS classes. */
    className?: string;
    /** Button content. */
    children?: ReactNode;
}
/**
 * SidebarMenuButton — the clickable navigation element inside a menu item.
 *
 * Supports icons, labels, active state, tooltip on icon-collapse, and
 * multiple sizes and variants.
 *
 * @example
 * ```tsx
 * // Basic
 * <SidebarMenuButton tooltip="Dashboard">
 *   <HomeIcon />
 *   <span>Dashboard</span>
 * </SidebarMenuButton>
 *
 * // Active
 * <SidebarMenuButton isActive tooltip="Settings">
 *   <SettingsIcon />
 *   <span>Settings</span>
 * </SidebarMenuButton>
 *
 * // As link
 * <SidebarMenuButton asChild tooltip="Docs">
 *   <a href="/docs">
 *     <BookIcon />
 *     <span>Documentation</span>
 *   </a>
 * </SidebarMenuButton>
 *
 * // Large size (for header/footer team/user switcher)
 * <SidebarMenuButton size="lg" tooltip="Acme Inc">
 *   <Logo />
 *   <div className="flex flex-col">
 *     <span className="font-semibold">Acme Inc</span>
 *     <span className="text-xs">Enterprise</span>
 *   </div>
 *   <ChevronsUpDown className="ml-auto" />
 * </SidebarMenuButton>
 * ```
 */
declare const SidebarMenuButton: react.ForwardRefExoticComponent<SidebarMenuButtonProps & react.RefAttributes<HTMLButtonElement>>;
interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether to always show the action, or only on hover.
     * @default false
     */
    showOnHover?: boolean;
    /** Additional CSS classes. */
    className?: string;
    /** Action content (typically an icon). */
    children?: ReactNode;
}
/**
 * SidebarMenuAction — a trailing action button within a menu item.
 *
 * Useful for "more options" menus, expand chevrons, or quick actions.
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <FolderIcon />
 *     <span>Projects</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuAction showOnHover>
 *     <MoreHorizontalIcon className="size-4" />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
 */
declare const SidebarMenuAction: react.ForwardRefExoticComponent<SidebarMenuActionProps & react.RefAttributes<HTMLButtonElement>>;
interface SidebarMenuBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Badge content (text, count, icon). */
    children?: ReactNode;
}
/**
 * SidebarMenuBadge — a badge/count indicator within a menu item.
 *
 * Positioned to the right of the menu button label. Automatically
 * hidden when the sidebar is collapsed to icon-only mode.
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <InboxIcon />
 *     <span>Inbox</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuBadge>24</SidebarMenuBadge>
 * </SidebarMenuItem>
 * ```
 */
declare const SidebarMenuBadge: react.ForwardRefExoticComponent<SidebarMenuBadgeProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarMenuSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Whether to show the icon placeholder.
     * @default false
     */
    showIcon?: boolean;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * SidebarMenuSkeleton — a loading placeholder for a menu item.
 *
 * @example
 * ```tsx
 * <SidebarMenu>
 *   {Array.from({ length: 5 }).map((_, i) => (
 *     <SidebarMenuItem key={i}>
 *       <SidebarMenuSkeleton showIcon />
 *     </SidebarMenuItem>
 *   ))}
 * </SidebarMenu>
 * ```
 */
declare const SidebarMenuSkeleton: react.ForwardRefExoticComponent<SidebarMenuSkeletonProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Sub-menu items. */
    children?: ReactNode;
}
/**
 * SidebarMenuSub — a nested sub-menu list within a menu item.
 *
 * Renders as an indented `<ul>` with a left border to show hierarchy.
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <PlaygroundIcon />
 *     <span>Playground</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuSub>
 *     <SidebarMenuSubItem>
 *       <SidebarMenuSubButton>History</SidebarMenuSubButton>
 *     </SidebarMenuSubItem>
 *     <SidebarMenuSubItem>
 *       <SidebarMenuSubButton>Starred</SidebarMenuSubButton>
 *     </SidebarMenuSubItem>
 *   </SidebarMenuSub>
 * </SidebarMenuItem>
 * ```
 */
declare const SidebarMenuSub: react.ForwardRefExoticComponent<SidebarMenuSubProps & react.RefAttributes<HTMLUListElement>>;
interface SidebarMenuSubItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Additional CSS classes. */
    className?: string;
    /** Sub-item content. */
    children?: ReactNode;
}
/**
 * SidebarMenuSubItem — wrapper for a single sub-menu item (`<li>`).
 *
 * @example
 * ```tsx
 * <SidebarMenuSubItem>
 *   <SidebarMenuSubButton href="/history">History</SidebarMenuSubButton>
 * </SidebarMenuSubItem>
 * ```
 */
declare const SidebarMenuSubItem: react.ForwardRefExoticComponent<SidebarMenuSubItemProps & react.RefAttributes<HTMLLIElement>>;
interface SidebarMenuSubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Whether this sub-item is the currently active page.
     * @default false
     */
    isActive?: boolean;
    /**
     * Size of the sub-button.
     * @default "md"
     */
    size?: "sm" | "md";
    /** Additional CSS classes. */
    className?: string;
    /** Content. */
    children?: ReactNode;
}
/**
 * SidebarMenuSubButton — a clickable sub-navigation item.
 *
 * Renders as an `<a>` element. For framework links (Next.js Link, etc.),
 * wrap or compose via `asChild`-like patterns.
 *
 * @example
 * ```tsx
 * <SidebarMenuSubButton href="/history" isActive>
 *   History
 * </SidebarMenuSubButton>
 * ```
 */
declare const SidebarMenuSubButton: react.ForwardRefExoticComponent<SidebarMenuSubButtonProps & react.RefAttributes<HTMLAnchorElement>>;
/**
 * @deprecated Use `SidebarGroup` instead.
 */
declare const SidebarSection: react.ForwardRefExoticComponent<SidebarGroupProps & react.RefAttributes<HTMLDivElement>>;
type SidebarSectionProps = SidebarGroupProps;
/**
 * @deprecated Use `SidebarMenuButton` instead.
 */
interface SidebarItemProps {
    icon?: ReactNode;
    label?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    badge?: ReactNode;
    href?: string;
    className?: string;
    children?: ReactNode;
}
/**
 * @deprecated Use `<SidebarMenuItem>` + `<SidebarMenuButton>` instead.
 *
 * Legacy SidebarItem that wraps the new API for backward compatibility.
 */
declare const SidebarItem: react.ForwardRefExoticComponent<SidebarItemProps & react.RefAttributes<HTMLButtonElement>>;
interface SidebarMobileOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
/**
 * @deprecated The new `<Sidebar>` handles mobile overlay internally.
 * This component is kept for backward compatibility but is now a no-op.
 */
declare function SidebarMobileOverlay(_props: SidebarMobileOverlayProps): null;
declare namespace SidebarMobileOverlay {
    var displayName: string;
}

export { Sidebar, type SidebarCollapsible, SidebarContent, type SidebarContentProps, SidebarFooter, type SidebarFooterProps, SidebarGroup, SidebarGroupAction, type SidebarGroupActionProps, SidebarGroupContent, type SidebarGroupContentProps, SidebarGroupLabel, type SidebarGroupLabelProps, type SidebarGroupProps, SidebarHeader, type SidebarHeaderProps, SidebarInput, type SidebarInputProps, SidebarInset, type SidebarInsetProps, SidebarItem, type SidebarItemProps, SidebarMenu, SidebarMenuAction, type SidebarMenuActionProps, SidebarMenuBadge, type SidebarMenuBadgeProps, SidebarMenuButton, type SidebarMenuButtonProps, type SidebarMenuButtonSize, type SidebarMenuButtonVariant, SidebarMenuItem, type SidebarMenuItemProps, type SidebarMenuProps, SidebarMenuSkeleton, type SidebarMenuSkeletonProps, SidebarMenuSub, SidebarMenuSubButton, type SidebarMenuSubButtonProps, SidebarMenuSubItem, type SidebarMenuSubItemProps, type SidebarMenuSubProps, SidebarMobileOverlay, type SidebarMobileOverlayProps, type SidebarProps, SidebarProvider, type SidebarProviderProps, SidebarRail, type SidebarRailProps, SidebarSection, type SidebarSectionProps, SidebarSeparator, type SidebarSeparatorProps, type SidebarSide, SidebarToggle, type SidebarToggleProps, SidebarTrigger, type SidebarTriggerProps, type SidebarVariant, useSidebar, useSidebarContext };
