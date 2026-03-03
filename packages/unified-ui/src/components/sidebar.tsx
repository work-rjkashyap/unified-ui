"use client";

import { overlayBackdrop } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
// ============================================================================
// Unified UI — Sidebar Component
// ============================================================================
// Collapsible application sidebar with sections, icons, nested items.
// Uses Framer Motion for collapse/expand width animation.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  isMobile: false,
  mobileOpen: false,
  setMobileOpen: () => {},
});

export function useSidebarContext() {
  return useContext(SidebarContext);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SidebarProviderProps {
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (v: boolean) => void;
  children?: ReactNode;
}

export interface SidebarProps {
  side?: "left" | "right";
  collapsedWidth?: string;
  expandedWidth?: string;
  className?: string;
  children?: ReactNode;
}

export interface SidebarSectionProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

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

export interface SidebarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function SidebarProvider({
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  children,
}: SidebarProviderProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const collapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const setCollapsed = useCallback(
    (v: boolean) => {
      if (controlledCollapsed === undefined) setInternalCollapsed(v);
      onCollapsedChange?.(v);
    },
    [controlledCollapsed, onCollapsedChange],
  );

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        isMobile: false,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
SidebarProvider.displayName = "SidebarProvider";

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
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

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    side = "left",
    collapsedWidth = "64px",
    expandedWidth = "240px",
    className,
    children,
  },
  ref,
) {
  const { collapsed } = useSidebarContext();
  const shouldReduce = useReducedMotion();

  return (
    <motion.aside
      ref={ref}
      className={cn(
        "flex flex-col h-full border-r border-border bg-background overflow-hidden",
        side === "right" && "border-r-0 border-l",
        className,
      )}
      animate={{
        width: collapsed ? collapsedWidth : expandedWidth,
      }}
      transition={
        shouldReduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 300, damping: 30, mass: 0.8 }
      }
      data-ds=""
      data-ds-component="sidebar"
      data-ds-collapsed={collapsed ? "" : undefined}
      data-ds-animated=""
    >
      {children}
    </motion.aside>
  );
});
Sidebar.displayName = "Sidebar";

// ---------------------------------------------------------------------------
// SidebarToggle
// ---------------------------------------------------------------------------

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  function SidebarToggle({ className, children, ...rest }, ref) {
    const { collapsed, setCollapsed } = useSidebarContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        className={cn(
          "inline-flex items-center justify-center size-8 rounded-md",
          "text-muted-foreground hover:text-foreground hover:bg-accent",
          "transition-colors duration-fast",
          focusRingClasses,
          className,
        )}
        data-ds-component="sidebar-toggle"
        {...rest}
      >
        {children ??
          (collapsed ? (
            <ChevronRightIcon className="size-4" />
          ) : (
            <ChevronLeftIcon className="size-4" />
          ))}
      </button>
    );
  },
);
SidebarToggle.displayName = "SidebarToggle";

// ---------------------------------------------------------------------------
// SidebarHeader / SidebarContent / SidebarFooter
// ---------------------------------------------------------------------------

export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  function SidebarHeader({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-4 border-b border-border shrink-0",
          className,
        )}
        data-ds-component="sidebar-header"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";

export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  function SidebarContent({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto py-2", className)}
        data-ds-component="sidebar-content"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SidebarContent.displayName = "SidebarContent";

export interface SidebarFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  function SidebarFooter({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("shrink-0 border-t border-border p-4", className)}
        data-ds-component="sidebar-footer"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SidebarFooter.displayName = "SidebarFooter";

// ---------------------------------------------------------------------------
// SidebarSection
// ---------------------------------------------------------------------------

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  function SidebarSection({ title, className, children, ...rest }, ref) {
    const { collapsed } = useSidebarContext();
    return (
      <div
        ref={ref}
        className={cn("px-3 py-2", className)}
        data-ds-component="sidebar-section"
        {...rest}
      >
        <AnimatePresence>
          {title && !collapsed && (
            <motion.p
              className="px-2 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              data-ds-animated=""
            >
              {title}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex flex-col gap-0.5">{children}</div>
      </div>
    );
  },
);
SidebarSection.displayName = "SidebarSection";

// ---------------------------------------------------------------------------
// SidebarItem
// ---------------------------------------------------------------------------

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
    _ref,
  ) {
    const { collapsed } = useSidebarContext();
    const Tag = href ? "a" : "button";

    return (
      <Tag
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
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
          collapsed && "justify-center",
          className,
        )}
        title={collapsed && typeof label === "string" ? label : undefined}
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
          {!collapsed && (label || children) && (
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

        {badge && !collapsed && <span className="shrink-0">{badge}</span>}
      </Tag>
    );
  },
);
SidebarItem.displayName = "SidebarItem";

// ---------------------------------------------------------------------------
// SidebarMobileOverlay
// ---------------------------------------------------------------------------

export interface SidebarMobileOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SidebarMobileOverlay({ className }: SidebarMobileOverlayProps) {
  const { mobileOpen, setMobileOpen } = useSidebarContext();
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm md:hidden",
            className,
          )}
          variants={shouldReduce ? undefined : overlayBackdrop.variants}
          initial={shouldReduce ? { opacity: 0 } : "initial"}
          animate={shouldReduce ? { opacity: 1 } : "animate"}
          exit={shouldReduce ? { opacity: 0 } : "exit"}
          transition={
            shouldReduce ? { duration: 0.15 } : overlayBackdrop.transition
          }
          onClick={() => setMobileOpen(false)}
          data-ds-animated=""
        />
      )}
    </AnimatePresence>
  );
}
SidebarMobileOverlay.displayName = "SidebarMobileOverlay";
