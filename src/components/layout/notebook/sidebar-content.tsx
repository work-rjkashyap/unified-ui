"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { Languages, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { LanguageToggle } from "../language-toggle";
import { LinkItem } from "../link-item";
import { type BaseLayoutProps, renderTitleNav, useLinkItems } from "../shared";
import {
  SidebarTabsDropdown,
  type SidebarTabWithProps,
} from "../sidebar/tabs/dropdown";
import { ThemeToggle } from "../theme-toggle";
import {
  SidebarContent,
  SidebarDrawer,
  SidebarLinkItem,
  SidebarPageTree,
  SidebarTrigger,
  SidebarViewport,
} from "./sidebar";

export interface DocsSidebarProps extends BaseLayoutProps {
  tree: PageTree.Root;
  tabs?: SidebarTabWithProps[];
  tabMode?: "sidebar" | "navbar";
}

export function DocsSidebar({
  tree,
  tabs = [],
  tabMode = "sidebar",
  nav = {},
  i18n = false,
  themeSwitch = {},
  ...props
}: DocsSidebarProps) {
  const { menuItems } = useLinkItems(props);
  const iconLinks = menuItems.filter((item) => item.type === "icon");

  const viewport = (
    <SidebarViewport>
      {menuItems
        .filter((item) => item.type !== "icon")
        .map((item, i, arr) => (
          <SidebarLinkItem
            key={i}
            item={item}
            className={cn("lg:hidden", i === arr.length - 1 && "mb-4")}
          />
        ))}
      <SidebarPageTree />
    </SidebarViewport>
  );

  return (
    <>
      <SidebarContent>
        <div className="flex flex-col gap-3 p-4 pb-2 empty:hidden">
          <div className="flex justify-between md:hidden">
            {renderTitleNav(nav, {
              className:
                "inline-flex items-center gap-2.5 font-bold tracking-tighter",
            })}
          </div>
          {tabs.length > 0 && (
            <SidebarTabsDropdown
              options={tabs}
              className={cn(tabMode === "navbar" && "lg:hidden")}
            />
          )}
        </div>
        {viewport}
        <div
          className={cn(
            "hidden flex-row text-fd-muted-foreground items-center border-t border-fd-border/40 p-4 pt-2 mt-auto",
            iconLinks.length > 0 && "max-lg:flex",
          )}
        >
          {iconLinks.map((item, i) => (
            <LinkItem
              key={i}
              item={item}
              className={cn(
                buttonVariants({
                  size: "icon-sm",
                  color: "ghost",
                  className: "lg:hidden",
                }),
              )}
              aria-label={item.label}
            >
              {item.icon}
            </LinkItem>
          ))}
        </div>
      </SidebarContent>

      <SidebarDrawer>
        <div className="flex flex-col gap-3 p-4 pb-2">
          <SidebarTrigger
            className={cn(
              buttonVariants({
                size: "icon-sm",
                color: "ghost",
                className: "ms-auto text-fd-muted-foreground",
              }),
            )}
          >
            <X className="size-4" />
          </SidebarTrigger>
          {tabs.length > 0 && <SidebarTabsDropdown options={tabs} />}
        </div>
        {viewport}
        <div
          className={cn(
            "hidden flex-row items-center justify-end p-4 pt-2 mt-auto border-t border-fd-border/40",
            (i18n || themeSwitch.enabled !== false) && "flex",
            iconLinks.length > 0 && "max-lg:flex",
          )}
        >
          {iconLinks.map((item, i) => (
            <LinkItem
              key={i}
              item={item}
              className={cn(
                buttonVariants({
                  size: "icon-sm",
                  color: "ghost",
                }),
                "text-fd-muted-foreground lg:hidden",
                i === iconLinks.length - 1 && "me-auto",
              )}
              aria-label={item.label}
            >
              {item.icon}
            </LinkItem>
          ))}
          {i18n && (
            <LanguageToggle>
              <Languages className="size-4.5 text-fd-muted-foreground" />
            </LanguageToggle>
          )}
          {themeSwitch.enabled !== false &&
            (themeSwitch.component ?? (
              <ThemeToggle mode={themeSwitch.mode ?? "light-dark-system"} />
            ))}
        </div>
      </SidebarDrawer>
    </>
  );
}
