"use client";

// ============================================================================
// Unified UI — Sidebar Component
// ============================================================================
// A composable, multi-variant application sidebar system inspired by the
// shadcn/ui sidebar pattern. Supports app sidebars, docs sidebars, floating
// and inset layouts with collapsible icon-only, offcanvas, and static modes.
//
// Architecture (strict hierarchy):
//   <SidebarProvider>         — State management (collapse, mobile, variant)
//     <Sidebar>               — The sidebar container (aside element)
//       <SidebarHeader>       — Sticky top area (logo, team switcher)
//       <SidebarContent>      — Scrollable middle area
//         <SidebarGroup>      — Logical section (collapsible or static)
//           <SidebarGroupLabel>    — Section heading
//           <SidebarGroupAction>   — Action button in group header
//           <SidebarGroupContent>  — Wrapper for items
//             <SidebarMenu>        — Nav list (<ul>)
//               <SidebarMenuItem>  — Nav item (<li>)
//                 <SidebarMenuButton>  — Clickable nav button/link
//                 <SidebarMenuAction>  — Trailing action (chevron, more)
//                 <SidebarMenuBadge>   — Badge/count indicator
//                 <SidebarMenuSub>     — Nested sub-menu
//                   <SidebarMenuSubItem>    — Sub nav item
//                     <SidebarMenuSubButton> — Sub nav button/link
//       <SidebarFooter>       — Sticky bottom area (user, actions)
//       <SidebarRail>         — Thin toggle rail at edge
//     <SidebarInset>          — Main content area (sibling to Sidebar)
//
// Variants:
//   - "default"  — Standard app sidebar with border
//   - "floating" — Rounded sidebar with gap and shadow
//   - "inset"    — Sidebar inset within a parent container
//
// Collapsible modes:
//   - "offcanvas" — Sidebar slides off-screen when collapsed
//   - "icon"      — Collapses to icon-only width
//   - "none"      — Not collapsible
//
// Features:
//   - Controlled & uncontrolled collapse state
//   - Mobile responsive with sheet overlay
//   - Keyboard shortcut toggle (Ctrl+B / Cmd+B)
//   - Tooltip labels when collapsed to icon-only
//   - Smooth Framer Motion animations
//   - Respects prefers-reduced-motion
//   - Full ref forwarding on all sub-components
//   - WCAG AA accessible: landmarks, aria attributes, focus management
//   - Sidebar-specific CSS custom properties (--sidebar, --sidebar-*)
//   - data-ds-* attributes for styling hooks
//
// All visual values come from design system CSS custom properties.
// NEVER hardcode design values here.
// ============================================================================

import { overlayBackdrop } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

// ============================================================================
// Constants
// ============================================================================

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SIDEBAR_WIDTH = "16rem"; // 256px
const SIDEBAR_WIDTH_MOBILE = "18rem"; // 288px
const SIDEBAR_WIDTH_ICON = "3rem"; // 48px
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// ============================================================================
// Internal SVG Icons
// ============================================================================

function PanelLeftIcon({ className }: { className?: string }) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ============================================================================
// Types
// ============================================================================

export type SidebarVariant = "default" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";
export type SidebarSide = "left" | "right";

// ============================================================================
// Context
// ============================================================================

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

const SidebarContext = createContext<SidebarContextValue>({
  state: "expanded",
  open: true,
  setOpen: () => {},
  openMobile: false,
  setOpenMobile: () => {},
  isMobile: false,
  toggleSidebar: () => {},
  variant: "default",
  collapsible: "offcanvas",
  side: "left",
});

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
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>");
  }
  return context;
}

// Backward-compatible alias
export const useSidebarContext = useSidebar;

// ============================================================================
// useIsMobile hook (internal)
// ============================================================================

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

// ============================================================================
// SidebarProvider
// ============================================================================

export interface SidebarProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarProvider = forwardRef<HTMLDivElement, SidebarProviderProps>(
  function SidebarProvider(
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      variant = "default",
      collapsible = "offcanvas",
      side = "left",
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState(false);

    // Controlled vs uncontrolled
    const isControlled = openProp !== undefined;
    const [_open, _setOpen] = useState(defaultOpen);
    const open = isControlled ? openProp : _open;

    const setOpen = useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const openState =
          typeof value === "function" ? value(open) : value;

        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // Persist to cookie
        try {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        } catch {
          // SSR or cookie blocked — ignore
        }
      },
      [setOpenProp, open],
    );

    const toggleSidebar = useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen((prev) => !prev);
      }
    }, [isMobile, setOpen]);

    // Keyboard shortcut: Ctrl+B / Cmd+B
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (e.metaKey || e.ctrlKey)
        ) {
          e.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";

    const contextValue = useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
        variant,
        collapsible,
        side,
      }),
      [
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
        variant,
        collapsible,
        side,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipPrimitive.Provider delayDuration={0}>
          <div
            ref={ref}
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full",
              "has-data-[variant=inset]:bg-sidebar",
              className,
            )}
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            data-ds=""
            data-ds-component="sidebar-provider"
            {...rest}
          >
            {children}
          </div>
        </TooltipPrimitive.Provider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

// ============================================================================
// Sidebar
// ============================================================================

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
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
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  function Sidebar(
    {
      side: sideProp,
      variant: variantProp,
      collapsible: collapsibleProp,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const ctx = useSidebar();
    const side = sideProp ?? ctx.side;
    const variant = variantProp ?? ctx.variant;
    const collapsible = collapsibleProp ?? ctx.collapsible;
    const shouldReduce = useReducedMotion();

    // Non-collapsible sidebar
    if (collapsible === "none") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          data-ds=""
          data-ds-component="sidebar"
          {...rest}
        >
          {children}
        </div>
      );
    }

    return (
      <>
        {/* ── Mobile Overlay ── */}
        {ctx.isMobile && (
          <AnimatePresence>
            {ctx.openMobile && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                  variants={
                    shouldReduce ? undefined : overlayBackdrop.variants
                  }
                  initial={shouldReduce ? { opacity: 0 } : "initial"}
                  animate={shouldReduce ? { opacity: 1 } : "animate"}
                  exit={shouldReduce ? { opacity: 0 } : "exit"}
                  transition={
                    shouldReduce
                      ? { duration: 0.15 }
                      : overlayBackdrop.transition
                  }
                  onClick={() => ctx.setOpenMobile(false)}
                  data-ds-animated=""
                />
                {/* Sheet */}
                <motion.div
                  className={cn(
                    "fixed inset-y-0 z-50 flex w-[--sidebar-width-mobile] flex-col bg-sidebar text-sidebar-foreground",
                    "p-0 shadow-lg",
                    side === "left"
                      ? "left-0 border-r border-sidebar-border"
                      : "right-0 border-l border-sidebar-border",
                    className,
                  )}
                  style={
                    {
                      "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
                    } as React.CSSProperties
                  }
                  initial={{
                    x: side === "left" ? "-100%" : "100%",
                    opacity: shouldReduce ? 0 : 1,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: side === "left" ? "-100%" : "100%",
                    opacity: shouldReduce ? 0 : 1,
                  }}
                  transition={
                    shouldReduce
                      ? { duration: 0.15 }
                      : {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          mass: 0.8,
                        }
                  }
                  data-ds=""
                  data-ds-component="sidebar"
                  data-variant={variant}
                  data-side={side}
                  data-mobile=""
                  data-ds-animated=""
                >
                  {children}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}

        {/* ── Desktop ── */}
        {!ctx.isMobile && (
          <div
            ref={ref}
            className="group peer hidden md:block text-sidebar-foreground"
            data-state={ctx.state}
            data-collapsible={ctx.state === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
          >
            {/* Gap element — reserves space in the layout flow */}
            <motion.div
              className={cn(
                "relative h-svh bg-transparent",
                "duration-200 ease-linear",
                variant === "floating" || variant === "inset"
                  ? "w-[calc(var(--sidebar-width)+(--spacing(4)))]"
                  : "w-[--sidebar-width]",
              )}
              animate={{
                width:
                  ctx.state === "collapsed"
                    ? collapsible === "offcanvas"
                      ? "0px"
                      : variant === "floating" || variant === "inset"
                        ? "calc(var(--sidebar-width-icon) + theme(spacing.4) + 2px)"
                        : "var(--sidebar-width-icon)"
                    : variant === "floating" || variant === "inset"
                      ? "calc(var(--sidebar-width) + theme(spacing.4))"
                      : "var(--sidebar-width)",
              }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }
              }
            />

            {/* Actual sidebar panel */}
            <motion.div
              className={cn(
                "fixed inset-y-0 z-10 hidden h-svh md:flex flex-col",
                side === "left"
                  ? "left-0"
                  : "right-0",
                // Variant styles
                variant === "floating" &&
                  "m-2 rounded-lg border border-sidebar-border shadow-lg overflow-hidden",
                variant === "inset" &&
                  "m-2 rounded-lg overflow-hidden",
                variant === "default" &&
                  cn(
                    "border-sidebar-border",
                    side === "left" ? "border-r" : "border-l",
                  ),
                "bg-sidebar text-sidebar-foreground",
                className,
              )}
              animate={{
                width:
                  ctx.state === "collapsed"
                    ? collapsible === "offcanvas"
                      ? "0px"
                      : "var(--sidebar-width-icon)"
                    : "var(--sidebar-width)",
              }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }
              }
              data-ds=""
              data-ds-component="sidebar"
              data-variant={variant}
              data-side={side}
              data-state={ctx.state}
              data-collapsible={
                ctx.state === "collapsed" ? collapsible : ""
              }
            >
              <div
                className={cn(
                  "flex h-full w-full flex-col",
                  "group-data-[collapsible=offcanvas]:opacity-0 group-data-[collapsible=offcanvas]:pointer-events-none",
                )}
                data-sidebar="content-wrapper"
              >
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </>
    );
  },
);
Sidebar.displayName = "Sidebar";

// ============================================================================
// SidebarTrigger
// ============================================================================

export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export const SidebarTrigger = forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(function SidebarTrigger({ className, onClick, children, ...rest }, ref) {
  const { toggleSidebar, state, isMobile } = useSidebar();

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      aria-label={state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
      aria-expanded={state === "expanded"}
      className={cn(
        "inline-flex items-center justify-center size-8 shrink-0 rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        "transition-colors duration-fast",
        focusRingClasses,
        className,
      )}
      data-ds=""
      data-ds-component="sidebar-trigger"
      {...rest}
    >
      {children ?? <PanelLeftIcon className="size-4" />}
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

// Backward-compatible alias
export const SidebarToggle = SidebarTrigger;
export type SidebarToggleProps = SidebarTriggerProps;

// ============================================================================
// SidebarRail
// ============================================================================

export interface SidebarRailProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export const SidebarRail = forwardRef<HTMLButtonElement, SidebarRailProps>(
  function SidebarRail({ className, ...rest }, ref) {
    const { toggleSidebar, side } = useSidebar();

    return (
      <button
        ref={ref}
        type="button"
        tabIndex={-1}
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 md:flex items-center justify-center",
          "after:absolute after:inset-y-0 after:left-1/2 after:w-0.5",
          "hover:after:bg-sidebar-border",
          "transition-all duration-fast ease-linear",
          "group-data-[side=left]:right-0 group-data-[side=right]:left-0",
          side === "left"
            ? "cursor-w-resize group-data-[state=collapsed]:cursor-e-resize"
            : "cursor-e-resize group-data-[state=collapsed]:cursor-w-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize",
          "[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-rail"
        {...rest}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

// ============================================================================
// SidebarInset — Main content area next to the sidebar
// ============================================================================

export interface SidebarInsetProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarInset = forwardRef<HTMLDivElement, SidebarInsetProps>(
  function SidebarInset({ className, children, ...rest }, ref) {
    return (
      <main
        ref={ref}
        className={cn(
          "relative flex min-h-svh flex-1 flex-col bg-background",
          "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))]",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0",
          "md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-inset"
        {...rest}
      >
        {children}
      </main>
    );
  },
);
SidebarInset.displayName = "SidebarInset";

// ============================================================================
// SidebarHeader
// ============================================================================

export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  function SidebarHeader({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 p-2",
          "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-header"
        data-sidebar="header"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";

// ============================================================================
// SidebarContent
// ============================================================================

export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  function SidebarContent({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden",
          "group-data-[collapsible=icon]:items-center",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-content"
        data-sidebar="content"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SidebarContent.displayName = "SidebarContent";

// ============================================================================
// SidebarFooter
// ============================================================================

export interface SidebarFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  function SidebarFooter({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 p-2",
          "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-footer"
        data-sidebar="footer"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SidebarFooter.displayName = "SidebarFooter";

// ============================================================================
// SidebarSeparator
// ============================================================================

export interface SidebarSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {
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
export const SidebarSeparator = forwardRef<
  HTMLHRElement,
  SidebarSeparatorProps
>(function SidebarSeparator({ className, ...rest }, ref) {
  return (
    <hr
      ref={ref}
      className={cn("mx-2 w-auto border-sidebar-border", className)}
      data-ds=""
      data-ds-component="sidebar-separator"
      data-sidebar="separator"
      {...rest}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

// ============================================================================
// SidebarInput
// ============================================================================

export interface SidebarInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
export const SidebarInput = forwardRef<HTMLInputElement, SidebarInputProps>(
  function SidebarInput({ className, ...rest }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-8 w-full rounded-md border border-sidebar-border bg-background px-3",
          "text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50",
          "transition-[border-color,box-shadow] duration-fast",
          "focus:border-sidebar-ring focus:outline-none focus:ring-2 focus:ring-sidebar-ring/20",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-input"
        data-sidebar="input"
        {...rest}
      />
    );
  },
);
SidebarInput.displayName = "SidebarInput";

// ============================================================================
// SidebarGroup
// ============================================================================

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  function SidebarGroup({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full min-w-0 flex-col p-2",
          "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-group"
        data-sidebar="group"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

// ============================================================================
// SidebarGroupLabel
// ============================================================================

export interface SidebarGroupLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarGroupLabel = forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(function SidebarGroupLabel(
  { className, asChild = false, children, ...rest },
  ref,
) {
  const { state } = useSidebar();

  const classes = cn(
    "flex h-8 shrink-0 items-center rounded-md px-2",
    "text-xs font-medium text-sidebar-foreground/70",
    "outline-none ring-sidebar-ring",
    "transition-[margin,opacity,padding] duration-200 ease-linear",
    // When collapsed to icon mode, hide label
    state === "collapsed" && "opacity-0 overflow-hidden h-0 p-0 m-0",
    className,
  );

  if (asChild) {
    // When asChild, expect a single child element and merge classes
    // Using a simple wrapper to forward ref and classes
    return (
      <div
        ref={ref}
        className={classes}
        data-ds=""
        data-ds-component="sidebar-group-label"
        data-sidebar="group-label"
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={classes}
      data-ds=""
      data-ds-component="sidebar-group-label"
      data-sidebar="group-label"
      {...rest}
    >
      {children}
    </div>
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// ============================================================================
// SidebarGroupAction
// ============================================================================

export interface SidebarGroupActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export const SidebarGroupAction = forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(function SidebarGroupAction({ className, children, ...rest }, ref) {
  const { state } = useSidebar();

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute right-3 top-3.5 flex items-center justify-center",
        "size-5 rounded-md p-0",
        "text-sidebar-foreground/70 ring-sidebar-ring",
        "outline-none",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-transform duration-200",
        focusRingClasses,
        "[&>svg]:size-4 [&>svg]:shrink-0",
        // When icon-collapsed, hide
        state === "collapsed" && "hidden",
        className,
      )}
      data-ds=""
      data-ds-component="sidebar-group-action"
      data-sidebar="group-action"
      {...rest}
    >
      {children}
    </button>
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

// ============================================================================
// SidebarGroupContent
// ============================================================================

export interface SidebarGroupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  SidebarGroupContentProps
>(function SidebarGroupContent({ className, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("w-full text-sm", className)}
      data-ds=""
      data-ds-component="sidebar-group-content"
      data-sidebar="group-content"
      {...rest}
    >
      {children}
    </div>
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

// ============================================================================
// SidebarMenu
// ============================================================================

export interface SidebarMenuProps
  extends React.HTMLAttributes<HTMLUListElement> {
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
export const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  function SidebarMenu({ className, children, ...rest }, ref) {
    return (
      <ul
        ref={ref}
        className={cn(
          "flex w-full min-w-0 flex-col gap-1 list-none m-0 p-0",
          "group-data-[collapsible=icon]:items-center",
          className,
        )}
        data-ds=""
        data-ds-component="sidebar-menu"
        data-sidebar="menu"
        {...rest}
      >
        {children}
      </ul>
    );
  },
);
SidebarMenu.displayName = "SidebarMenu";

// ============================================================================
// SidebarMenuItem
// ============================================================================

export interface SidebarMenuItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
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
export const SidebarMenuItem = forwardRef<
  HTMLLIElement,
  SidebarMenuItemProps
>(function SidebarMenuItem({ className, children, ...rest }, ref) {
  return (
    <li
      ref={ref}
      className={cn("group/menu-item relative list-none m-0 p-0", className)}
      data-ds=""
      data-ds-component="sidebar-menu-item"
      data-sidebar="menu-item"
      {...rest}
    >
      {children}
    </li>
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";

// ============================================================================
// SidebarMenuButton
// ============================================================================

export type SidebarMenuButtonSize = "sm" | "default" | "lg";
export type SidebarMenuButtonVariant = "default" | "outline";

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(function SidebarMenuButton(
  {
    isActive = false,
    size = "default",
    variant = "default",
    tooltip,
    asChild = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const { state, isMobile, collapsible } = useSidebar();
  const isCollapsed = state === "collapsed" && collapsible === "icon";

  // lg expanded child layout — only applied when NOT collapsed so that
  // nth-child(2) grid/flex-1 rules don't conflict with the collapsed
  // [&>*:not(:first-child)]:hidden rule (display: grid vs display: none).
  const lgExpandedLayout = !isCollapsed
    ? [
        "[&>*:nth-child(2)]:flex-1 [&>*:nth-child(2)]:min-w-0",
        "[&>*:nth-child(2)]:grid [&>*:nth-child(2)]:text-left [&>*:nth-child(2)]:text-sm [&>*:nth-child(2)]:leading-tight",
        "[&>*:nth-child(2)_span]:truncate",
        "[&>svg:last-child]:ml-auto [&>svg:last-child]:shrink-0",
      ].join(" ")
    : "";

  const sizeClasses: Record<SidebarMenuButtonSize, string> = {
    sm: "h-7 text-xs",
    default: "h-8 text-sm",
    lg: [
      "h-12 text-sm",
      lgExpandedLayout,
      // lg collapsed: shrink height to match default buttons and scale
      // the first-child wrapper (logo div, Avatar) to 24px so it fits
      // neatly inside the 32px collapsed button.
      "group-data-[collapsible=icon]:!h-8",
      "group-data-[collapsible=icon]:[&>:first-child]:!size-6",
      "group-data-[collapsible=icon]:[&>:first-child]:shrink-0",
      "group-data-[collapsible=icon]:[&>:first-child]:overflow-hidden",
      "group-data-[collapsible=icon]:[&>:first-child]:rounded-md",
    ].join(" "),
  };

  const buttonClasses = cn(
    // Base
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2",
    "outline-none ring-sidebar-ring",
    "transition-[width,height,padding] duration-200 ease-linear",
    focusRingClasses,
    // Active & hover states
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    // Size
    sizeClasses[size],
    // Variant
    variant === "outline" &&
      "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
    // Active
    isActive &&
      "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
    // Icon collapse — fixed 32px button, no padding, center the icon,
    // hide everything except the first child (icon/avatar).
    // Plain <svg> icons stay at size-4 (16px); lg wrapper divs are
    // handled separately by the lg sizeClass above.
    isCollapsed &&
      "!size-8 !p-0 !gap-0 justify-center [&>*:not(:first-child)]:hidden [&>svg]:size-4",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Icon sizing
    "[&>svg]:size-4 [&>svg]:shrink-0",
    className,
  );

  const button = asChild ? (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={buttonClasses}
      data-ds=""
      data-ds-component="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive ? "" : undefined}
    >
      {children}
    </span>
  ) : (
    <button
      ref={ref}
      type="button"
      className={buttonClasses}
      aria-current={isActive ? "page" : undefined}
      data-ds=""
      data-ds-component="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive ? "" : undefined}
      {...rest}
    >
      {children}
    </button>
  );

  // Wrap in tooltip when collapsed and tooltip content is provided
  if (!tooltip || isMobile) {
    return button;
  }

  if (!isCollapsed) {
    return button;
  }

  const tooltipContent =
    typeof tooltip === "string" ? tooltip : tooltip;

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{button}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="right"
          align="center"
          sideOffset={4}
          className={cn(
            "z-(--z-tooltip,9999)",
            "overflow-hidden rounded-md px-3 py-1.5",
            "bg-sidebar-primary text-sidebar-primary-foreground",
            "text-xs font-medium",
            "animate-in fade-in-0 zoom-in-95",
            "data-[side=right]:slide-in-from-left-2",
          )}
        >
          {tooltipContent}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

// ============================================================================
// SidebarMenuAction
// ============================================================================

export interface SidebarMenuActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export const SidebarMenuAction = forwardRef<
  HTMLButtonElement,
  SidebarMenuActionProps
>(function SidebarMenuAction(
  { showOnHover = false, className, children, ...rest },
  ref,
) {
  const { state } = useSidebar();

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute right-1 top-1.5 flex items-center justify-center",
        "size-5 rounded-md p-0",
        "text-sidebar-foreground/70 outline-none ring-sidebar-ring",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-opacity duration-fast",
        focusRingClasses,
        "[&>svg]:size-4 [&>svg]:shrink-0",
        // Show on hover only
        showOnHover &&
          "opacity-0 group-hover/menu-item:opacity-100 group-focus-within/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground",
        // Hide when collapsed to icon mode
        state === "collapsed" && "hidden",
        className,
      )}
      data-ds=""
      data-ds-component="sidebar-menu-action"
      data-sidebar="menu-action"
      {...rest}
    >
      {children}
    </button>
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

// ============================================================================
// SidebarMenuBadge
// ============================================================================

export interface SidebarMenuBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarMenuBadge = forwardRef<
  HTMLDivElement,
  SidebarMenuBadgeProps
>(function SidebarMenuBadge({ className, children, ...rest }, ref) {
  const { state } = useSidebar();

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1",
        "text-xs font-medium tabular-nums text-sidebar-foreground",
        "select-none pointer-events-none",
        // Hide when collapsed
        state === "collapsed" && "hidden",
        className,
      )}
      data-ds=""
      data-ds-component="sidebar-menu-badge"
      data-sidebar="menu-badge"
      {...rest}
    >
      {children}
    </div>
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

// ============================================================================
// SidebarMenuSkeleton
// ============================================================================

export interface SidebarMenuSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
export const SidebarMenuSkeleton = forwardRef<
  HTMLDivElement,
  SidebarMenuSkeletonProps
>(function SidebarMenuSkeleton(
  { className, showIcon = false, ...rest },
  ref,
) {
  // Randomized width for natural look
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-2",
        className,
      )}
      data-ds=""
      data-ds-component="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      {...rest}
    >
      {showIcon && (
        <div className="size-4 rounded-md bg-sidebar-accent animate-pulse" />
      )}
      <div
        className="h-4 max-w-[--skeleton-width] flex-1 rounded-md bg-sidebar-accent animate-pulse"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

// ============================================================================
// SidebarMenuSub
// ============================================================================

export interface SidebarMenuSubProps
  extends React.HTMLAttributes<HTMLUListElement> {
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
export const SidebarMenuSub = forwardRef<
  HTMLUListElement,
  SidebarMenuSubProps
>(function SidebarMenuSub({ className, children, ...rest }, ref) {
  const { state } = useSidebar();

  return (
    <ul
      ref={ref}
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 list-none m-0 p-0",
        "border-l border-sidebar-border pl-2.5 py-0.5",
        // Hide when collapsed to icon
        state === "collapsed" && "hidden",
        className,
      )}
      data-ds=""
      data-ds-component="sidebar-menu-sub"
      data-sidebar="menu-sub"
      {...rest}
    >
      {children}
    </ul>
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";

// ============================================================================
// SidebarMenuSubItem
// ============================================================================

export interface SidebarMenuSubItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
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
export const SidebarMenuSubItem = forwardRef<
  HTMLLIElement,
  SidebarMenuSubItemProps
>(function SidebarMenuSubItem({ className, children, ...rest }, ref) {
  return (
    <li
      ref={ref}
      className={cn("list-none m-0 p-0", className)}
      data-ds=""
      data-ds-component="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...rest}
    >
      {children}
    </li>
  );
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

// ============================================================================
// SidebarMenuSubButton
// ============================================================================

export interface SidebarMenuSubButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
export const SidebarMenuSubButton = forwardRef<
  HTMLAnchorElement,
  SidebarMenuSubButtonProps
>(function SidebarMenuSubButton(
  { isActive = false, size = "md", className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn(
        "flex min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 no-underline",
        "text-sidebar-foreground/70 outline-none ring-sidebar-ring",
        "transition-colors duration-fast",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline",
        focusRingClasses,
        size === "sm" ? "h-6 text-xs" : "h-7 text-xs",
        isActive &&
          "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
      data-ds=""
      data-ds-component="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-active={isActive ? "" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// ============================================================================
// Backward-Compatible Aliases
// ============================================================================
// The original sidebar had SidebarSection and SidebarItem. We provide
// aliases that map to the new API for backward compatibility.
// ============================================================================

/**
 * @deprecated Use `SidebarGroup` instead.
 */
export const SidebarSection = SidebarGroup;
export type SidebarSectionProps = SidebarGroupProps;

/**
 * @deprecated Use `SidebarMenuButton` instead.
 */
export interface SidebarItemProps {
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
export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  function SidebarItem(
    {
      icon,
      label,
      active = false,
      disabled = false,
      badge,
      href,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const Tag = href ? "a" : "button";

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
        href={href}
        type={href ? undefined : "button"}
        disabled={disabled}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 px-2 py-2 rounded-md w-full",
          "text-sm font-medium leading-none",
          "transition-colors duration-fast",
          "disabled:pointer-events-none disabled:opacity-50",
          focusRingClasses,
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60",
          isCollapsed && "justify-center",
          className,
        )}
        title={
          isCollapsed && typeof label === "string" ? label : undefined
        }
        data-ds=""
        data-ds-component="sidebar-item"
        data-ds-active={active ? "" : undefined}
        {...rest}
      >
        {icon && (
          <span className="shrink-0 size-5 flex items-center justify-center">
            {icon}
          </span>
        )}

        <AnimatePresence>
          {!isCollapsed && (label || children) && (
            <motion.span
              className="flex-1 truncate"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              data-ds-animated=""
            >
              {label ?? children}
            </motion.span>
          )}
        </AnimatePresence>

        {badge && !isCollapsed && (
          <span className="shrink-0">{badge}</span>
        )}
      </Tag>
    );
  },
);
SidebarItem.displayName = "SidebarItem";

// ============================================================================
// SidebarMobileOverlay
// ============================================================================
// Legacy component — the new Sidebar handles mobile overlay internally.
// Kept for backward compatibility.
// ============================================================================

export interface SidebarMobileOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * @deprecated The new `<Sidebar>` handles mobile overlay internally.
 * This component is kept for backward compatibility but is now a no-op.
 */
export function SidebarMobileOverlay(_props: SidebarMobileOverlayProps) {
  return null;
}
SidebarMobileOverlay.displayName = "SidebarMobileOverlay";
