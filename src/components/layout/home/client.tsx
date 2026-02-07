"use client";

import { type ComponentProps, Fragment, useState } from "react";
import Link from "fumadocs-core/link";
import { useIsScrollTop } from "fumadocs-ui/utils/use-is-scroll-top";
import type { NavOptions } from "../shared";
import { cn } from "@/lib/cn";
import { buttonVariants } from "../../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../../ui/navigation-menu";
import type { LinkItemType } from "../link-item";
import { LinkItem } from "../link-item";
import { navItemVariants } from "../navbar";

export { Header } from "../navbar";

function _isSecondary(item: LinkItemType): boolean {
  if ("secondary" in item && item.secondary != null) return item.secondary;
  return item.type === "icon";
}
function _HeaderNavigationMenu({
  children,
  transparentMode = "none",
  ...props
}: ComponentProps<"div"> & {
  transparentMode?: NavOptions["transparentMode"];
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
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 h-16",
          !isTop && "h-14",
          props.className,
        )}
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
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full relative z-10">
            {children}
          </div>
        </div>
        <NavigationMenuViewport />
      </header>
    </NavigationMenu>
  );
}
function _NavigationMenuLinkItem({
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
function _MobileNavigationMenuLinkItem({
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
        <p className="mb-1 text-sm text-fd-muted-foreground">
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
          <_MobileNavigationMenuLinkItem key={i} item={child} />
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
