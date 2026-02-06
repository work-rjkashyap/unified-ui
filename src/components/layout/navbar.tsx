"use client";

import { cva } from "class-variance-authority";
import Link from "fumadocs-core/link";
import { useIsScrollTop } from "fumadocs-ui/utils/use-is-scroll-top";
import { ChevronDown, Languages } from "lucide-react";
import { type ComponentProps, Fragment, useState } from "react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu";
import { LanguageToggle } from "./language-toggle";
import { LinkItem } from "./link-item";
import { LargeSearchToggle, SearchToggle } from "./search-toggle";
import type { BaseLayoutProps } from "./shared";
import {
  type LinkItemType,
  type NavOptions,
  renderTitleNav,
  useLinkItems,
} from "./shared";
import { ThemeToggle } from "./theme-toggle";

export interface HeaderProps extends BaseLayoutProps {
  nav?: Partial<NavOptions & { enableHoverToOpen?: boolean }>;
  sidebarTrigger?: React.ReactNode;
  sidebarCollapseTrigger?: React.ReactNode;
  sticky?: boolean;
  containerClassName?: string;
}

export const navItemVariants = cva(
  "inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors hover:text-fd-foreground/80 data-[active=true]:text-fd-foreground [&_svg]:size-4",
  {
    variants: {
      variant: {
        main: "text-fd-muted-foreground",
        button: buttonVariants({
          color: "secondary",
          className: "gap-1.5",
        }),
        icon: buttonVariants({
          color: "ghost",
          size: "icon",
        }),
      },
    },
    defaultVariants: {
      variant: "main",
    },
  },
);

export function Header({
  nav = {},
  i18n = false,
  links,
  githubUrl,
  themeSwitch = {},
  searchToggle = {},
  sidebarTrigger,
  sidebarCollapseTrigger,
  sticky,
  containerClassName,
}: HeaderProps) {
  const { navItems, menuItems } = useLinkItems({ links, githubUrl });
  const navMode = (nav as any).mode ?? "auto";

  return (
    <HeaderNavigationMenu
      transparentMode={nav.transparentMode}
      sticky={sticky}
      containerClassName={containerClassName}
    >
      <div className="flex items-center gap-3 md:gap-4 lg:gap-6 shrink-0">
        <div className="flex items-center gap-2">
          {sidebarTrigger}
          {sidebarCollapseTrigger}
          {renderTitleNav(nav, {
            className:
              "inline-flex items-center gap-2.5 font-bold tracking-tighter hover:opacity-80 transition-opacity shrink-0",
          })}
        </div>
        {nav.children}
        <NavigationMenuList className="flex flex-row items-center gap-1 max-sm:hidden">
          {navItems
            .filter((item) => !isSecondary(item))
            .map((item, i) => (
              <NavigationMenuLinkItem key={i} item={item} />
            ))}
        </NavigationMenuList>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 md:gap-3 flex-1">
        <div className="max-lg:hidden flex-1 flex justify-end">
          {searchToggle.enabled !== false &&
            (searchToggle.components?.lg ?? (
              <LargeSearchToggle
                hideIfDisabled
                className={cn(
                  "w-full my-auto",
                  navMode === "top" ? "max-w-sm" : "max-w-[240px]",
                )}
              />
            ))}
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          {themeSwitch.enabled !== false &&
            (themeSwitch.component ?? <ThemeToggle mode={themeSwitch?.mode} />)}
          {i18n && (
            <LanguageToggle>
              <Languages className="size-4" />
            </LanguageToggle>
          )}
          <NavigationMenuList className="flex flex-row items-center gap-1 max-lg:hidden">
            {navItems.filter(isSecondary).map((item, i) => (
              <NavigationMenuLinkItem
                key={i}
                className={cn(item.type === "icon" && "first:ms-0 last:me-0")}
                item={item}
              />
            ))}
          </NavigationMenuList>
        </div>

        <NavigationMenuList className="lg:hidden flex items-center">
          {searchToggle.enabled !== false &&
            (searchToggle.components?.sm ?? (
              <SearchToggle size="icon" className="p-2" hideIfDisabled />
            ))}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              aria-label="Toggle Menu"
              className={cn(
                buttonVariants({
                  size: "icon",
                  color: "ghost",
                  className: "group [&_svg]:size-5.5",
                }),
              )}
              onPointerMove={
                nav.enableHoverToOpen ? undefined : (e) => e.preventDefault()
              }
            >
              <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-3 bg-fd-background/95 backdrop-blur-xl border border-fd-border/40 shadow-xl rounded-2xl md:w-[600px] overflow-hidden relative">
              <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-2">
                {menuItems
                  .filter((item) => !isSecondary(item))
                  .map((item, i) => (
                    <MobileNavigationMenuLinkItem
                      key={i}
                      item={item}
                      className="sm:hidden"
                    />
                  ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </HeaderNavigationMenu>
  );
}

function isSecondary(item: LinkItemType): boolean {
  if ("secondary" in item && item.secondary != null) return item.secondary;
  return item.type === "icon";
}

function HeaderNavigationMenu({
  children,
  transparentMode = "none",
  sticky = false,
  containerClassName,
  ...props
}: ComponentProps<"div"> & {
  transparentMode?: NavOptions["transparentMode"];
  sticky?: boolean;
  containerClassName?: string;
}) {
  const [value, setValue] = useState("");
  const isTop = useIsScrollTop({ enabled: transparentMode === "top" }) ?? true;
  const isTransparent =
    (transparentMode === "top" && isTop) || transparentMode === "always";

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id="nd-nav"
        {...props}
        className={cn(
          sticky ? "sticky [grid-area:header]" : "fixed",
          "inset-x-0 z-50 transition-all duration-300 h-16",
          !isTop && "h-14",
          !props.className?.includes("static") && "top-(--fd-docs-row-1)",
          props.className,
        )}
        style={
          {
            ...props.style,
            "--fd-header-height": isTop ? "64px" : "56px",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "flex h-full items-center border-b transition-all duration-300 relative",
            isTransparent && value.length === 0
              ? "bg-transparent border-transparent shadow-none"
              : "bg-fd-background/80 backdrop-blur-xl border-fd-border/40 shadow-sm",
            value.length > 0 && "max-lg:shadow-lg max-lg:rounded-b-2xl",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-noise pointer-events-none transition-opacity duration-300 overflow-hidden",
              isTransparent && value.length === 0
                ? "opacity-0"
                : "opacity-[0.03]",
            )}
          />
          <div
            className={cn(
              "w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full relative z-10",
              containerClassName ?? "max-w-7xl",
            )}
          >
            {children}
          </div>
        </div>
        <NavigationMenuViewport />
      </header>
    </NavigationMenu>
  );
}

function NavigationMenuLinkItem({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === "custom") return <div {...props}>{item.children}</div>;
  if (item.type === "menu") {
    const children = item.items.map((child, j) => {
      if (child.type === "custom") {
        return <Fragment key={j}>{child.children}</Fragment>;
      }
      const {
        banner = child.icon ? (
          <div className="w-fit rounded-md border border-fd-border/40 bg-fd-muted/30 p-1.5 [&_svg]:size-4 mb-2 group-hover:bg-fd-primary/10 group-hover:text-fd-primary group-hover:border-fd-primary/20 transition-colors">
            {child.icon}
          </div>
        ) : null,
        ...rest
      } = child.menu ?? {};
      return (
        <NavigationMenuLink key={`${j}-${child.url}`} asChild>
          <Link
            href={child.url}
            external={child.external}
            {...rest}
            className={cn(
              "flex flex-col gap-1 rounded-xl border border-transparent p-3 transition-all duration-300 hover:bg-fd-muted hover:border-fd-border/40 group relative overflow-hidden",
              rest.className,
            )}
          >
            <div className="relative z-10 flex flex-col items-start text-left">
              {rest.children ?? (
                <>
                  {banner}
                  <p className="text-sm font-semibold tracking-tight text-fd-foreground">
                    {child.text}
                  </p>
                  <p className="text-xs text-fd-muted-foreground leading-relaxed font-light mt-1 line-clamp-2">
                    {child.description}
                  </p>
                </>
              )}
            </div>
          </Link>
        </NavigationMenuLink>
      );
    });
    return (
      <NavigationMenuItem {...props}>
        <NavigationMenuTrigger
          className={cn(navItemVariants(), "rounded-md bg-transparent")}
        >
          {item.url ? (
            <Link href={item.url} external={item.external}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-3 bg-fd-background/95 backdrop-blur-xl border border-fd-border/40 shadow-xl rounded-2xl md:w-[600px] overflow-hidden relative">
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-2">
            {children}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem {...props}>
      <NavigationMenuLink asChild>
        <LinkItem
          item={item}
          aria-label={item.type === "icon" ? item.label : undefined}
          className={cn(navItemVariants({ variant: item.type }))}
        >
          {item.type === "icon" ? item.icon : item.text}
        </LinkItem>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function MobileNavigationMenuLinkItem({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === "custom")
    return <div className={cn("grid", props.className)}>{item.children}</div>;
  if (item.type === "menu") {
    const header = (
      <>
        {item.icon}
        {item.text}
      </>
    );
    return (
      <div className={cn("mb-4 flex flex-col", props.className)}>
        <p className="mb-1 text-sm text-fd-muted-foreground font-semibold">
          {item.url ? (
            <NavigationMenuLink asChild>
              <Link href={item.url} external={item.external}>
                {header}
              </Link>
            </NavigationMenuLink>
          ) : (
            header
          )}
        </p>
        {item.items.map((child, i) => (
          <MobileNavigationMenuLinkItem key={i} item={child} />
        ))}
      </div>
    );
  }
  return (
    <NavigationMenuLink asChild>
      <LinkItem
        item={item}
        className={cn(
          {
            main: "inline-flex items-center gap-2 py-1.5 transition-colors hover:text-fd-popover-foreground/50 data-[active=true]:font-medium data-[active=true]:text-fd-primary [&_svg]:size-4",
            icon: buttonVariants({
              size: "icon",
              color: "ghost",
            }),
            button: buttonVariants({
              color: "secondary",
              className: "gap-1.5 [&_svg]:size-4",
            }),
          }[item.type ?? "main"],
          props.className,
        )}
        aria-label={item.type === "icon" ? item.label : undefined}
      >
        {item.icon}
        {item.type === "icon" ? undefined : item.text}
      </LinkItem>
    </NavigationMenuLink>
  );
}
