"use client";

import {
  Avatar,
  Badge,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@work-rjkashyap/unified-ui";
import {
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// SidebarPreview — A miniature sidebar that uses the design system's Sidebar
// component tree so that --sidebar-* CSS custom properties are reflected in
// real time when the user changes Menu Color or Menu Accent in the customizer.
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    isActive: true,
    badge: null,
  },
  {
    label: "Inbox",
    icon: Inbox,
    isActive: false,
    badge: "12",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    isActive: false,
    badge: "3",
  },
  {
    label: "Products",
    icon: Package,
    isActive: false,
    badge: null,
    children: [
      { label: "All Products", isActive: false },
      { label: "Inventory", isActive: false },
      { label: "Categories", isActive: false },
    ],
  },
  {
    label: "Customers",
    icon: Users,
    isActive: false,
    badge: null,
  },
  {
    label: "Analytics",
    icon: BarChart3,
    isActive: false,
    badge: null,
  },
] as const;

const SECONDARY_ITEMS = [
  { label: "Billing", icon: CreditCard },
  { label: "Documentation", icon: FileText },
  { label: "Settings", icon: Settings },
] as const;

export function SidebarPreview() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <div className="relative h-120 overflow-hidden rounded-lg border border-border">
      {/* SidebarProvider sets CSS variables and context for the Sidebar tree */}
      <SidebarProvider
        defaultOpen
        variant="default"
        collapsible="none"
        style={
          {
            "--sidebar-width": "100%",
          } as React.CSSProperties
        }
      >
        <Sidebar className="relative! h-full! w-full! border-none!">
          {/* ── Header ── */}
          <SidebarHeader className="p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Star className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-tight">
                  Acme Inc
                </p>
                <p className="truncate text-[11px] leading-tight text-sidebar-foreground/60">
                  Enterprise Plan
                </p>
              </div>
              <button
                type="button"
                className="rounded-md p-1 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Bell className="size-4" />
              </button>
            </div>
          </SidebarHeader>

          <SidebarSeparator />

          {/* ── Main Navigation ── */}
          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      {"children" in item && item.children ? (
                        <>
                          <SidebarMenuButton
                            isActive={item.isActive}
                            onClick={() =>
                              setExpandedGroup(
                                expandedGroup === item.label
                                  ? null
                                  : item.label,
                              )
                            }
                          >
                            <item.icon className="size-4" />
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`ml-auto size-3.5 transition-transform duration-200 ${
                                expandedGroup === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </SidebarMenuButton>
                          {expandedGroup === item.label && (
                            <SidebarMenuSub>
                              {item.children.map((child) => (
                                <SidebarMenuSubItem key={child.label}>
                                  <SidebarMenuSubButton
                                    isActive={child.isActive}
                                  >
                                    <span>{child.label}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          )}
                        </>
                      ) : (
                        <SidebarMenuButton isActive={item.isActive}>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                          {item.badge && (
                            <SidebarMenuBadge>
                              <Badge
                                variant="secondary"
                                size="sm"
                                className="h-5 min-w-5 justify-center bg-sidebar-accent text-sidebar-accent-foreground text-[10px] px-1.5"
                              >
                                {item.badge}
                              </Badge>
                            </SidebarMenuBadge>
                          )}
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* ── Secondary Nav ── */}
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {SECONDARY_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* ── Footer ── */}
          <SidebarSeparator />
          <SidebarFooter className="p-3">
            <div className="flex items-center gap-2.5">
              <Avatar name="Alex Johnson" size="sm" className="shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-tight">
                  Alex Johnson
                </p>
                <p className="truncate text-[11px] leading-tight text-sidebar-foreground/60">
                  alex@acme.com
                </p>
              </div>
              <button
                type="button"
                className="rounded-md p-1 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                title="Sign out"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
