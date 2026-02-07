"use client";
import { CommandIcon, Menu, Search } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { LayoutHeader } from "./notebook/client";
import { ThemeToggle } from "./theme-toggle";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "./sidebar/base";
import { baseOptions } from "@/app/layout.config";
import { renderTitleNav, useLinkItems } from "./shared";
import { LinkItem } from "./link-item";

export const Nav = () => {
  const { setOpenSearch } = useSearchContext();
  const { open, setOpen } = useSidebar();
  const { navItems, menuItems } = useLinkItems(baseOptions);

  return (
    <LayoutHeader className="sticky top-0 z-50 h-16 w-full backdrop-blur-xl bg-transparent lg:-mb-5">
      <div className="mx-auto flex h-full max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {renderTitleNav(baseOptions.nav || {}, {
          className:
            "flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0",
        })}
        <div className="flex flex-1 items-center justify-center px-8 max-md:hidden">
          <nav className="flex items-center gap-8">
            {navItems
              .filter((item) => item.type !== "icon" && item.type !== "custom")
              .map((item, i) => (
                <Link
                  key={i}
                  href={item.url!}
                  className="text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  {item.text}
                </Link>
              ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="group flex h-9 items-center justify-center rounded-lg border border-fd-border/50 bg-fd-muted/50 transition-all duration-200 hover:border-fd-border hover:bg-fd-muted w-9 md:w-40 md:justify-between md:px-3 lg:w-64"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="size-4 shrink-0" />
            <span className="truncate font-normal group-hover:text-fd-foreground transition-colors max-md:hidden">
              Search docs...
            </span>
            <div className="flex items-center gap-1 max-md:hidden">
              <kbd className="flex size-5 items-center justify-center rounded-sm border bg-fd-background text-[10px] font-medium shadow-xs">
                <CommandIcon className="size-2.5" />
              </kbd>
              <kbd className="flex size-5 items-center justify-center rounded-sm border bg-fd-background text-[10px] font-medium shadow-xs">
                <span className="pt-px leading-none">K</span>
              </kbd>
            </div>
          </button>
          <div className="flex items-center gap-1 max-sm:hidden">
            <ThemeToggle />
            {menuItems
              .filter((item) => item.type === "icon")
              .map((item, i) => (
                <LinkItem
                  key={i}
                  item={item}
                  className={cn(
                    buttonVariants({
                      size: "icon",
                      color: "ghost",
                    }),
                    "text-fd-muted-foreground",
                  )}
                  aria-label={item.label}
                >
                  {item.icon}
                </LinkItem>
              ))}
          </div>
          <button
            type="button"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "md:hidden size-9 text-fd-muted-foreground",
              }),
            )}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu
              className={cn("size-5 transition-transform", open && "rotate-90")}
            />
          </button>
        </div>
      </div>
    </LayoutHeader>
  );
};
