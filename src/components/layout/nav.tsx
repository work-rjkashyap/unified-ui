"use client";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import {
  BookOpen,
  BoxesIcon,
  Heart,
  LayoutGrid,
  Menu,
  Palette,
  Search,
  SwatchBook,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { LayoutHeader } from "./notebook/client";
import { renderTitleNav, useLinkItems } from "./shared";
import { useSidebar } from "./sidebar/base";
import { ThemeToggle } from "./theme-toggle";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="X"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LaravelIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Laravel"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149a.339.339 0 01-.174.295l-4.32 2.49v4.934a.339.339 0 01-.174.295L9.87 23.755a.381.381 0 01-.084.038l-.033.01a.34.34 0 01-.178 0l-.033-.01a.35.35 0 01-.084-.039L.341 18.693a.339.339 0 01-.174-.295V3.139a.364.364 0 01.014-.1.327.327 0 01.039-.09l.01-.018a.346.346 0 01.065-.072l.022-.017a.343.343 0 01.079-.05L5.001.263a.339.339 0 01.348 0l4.604 2.529a.343.343 0 01.08.05l.021.017a.346.346 0 01.066.072l.01.018a.327.327 0 01.038.09.364.364 0 01.014.1v9.652l3.76-2.164V5.529a.364.364 0 01.013-.1.327.327 0 01.04-.09l.01-.018a.346.346 0 01.065-.072l.022-.017a.343.343 0 01.079-.05l4.604-2.53a.339.339 0 01.348 0l4.605 2.53a.343.343 0 01.079.05l.022.017a.346.346 0 01.065.072l.01.018a.327.327 0 01.039.09zM22.976 10.5V6.01l-1.58.909-2.18 1.255v4.49zm-4.435 7.622V13.63l-2.144 1.226-6.617 3.783v4.518zm-17.88-14.1v14.577l8.397 4.613v-4.52L5.27 16.2l-.009-.005-.009-.006a.343.343 0 01-.078-.05l-.022-.018a.346.346 0 01-.064-.072l-.01-.02a.327.327 0 01-.037-.086l-.006-.02a.364.364 0 01-.012-.1V5.676L2.84 4.42zm4.262-2.909L1.306 3.138l3.617 1.989 3.617-1.989zM7.59 14.658l2.18-1.255V3.139L8.19 4.048 6.01 5.303v10.264zm6.865-4.715l-3.617-1.988v3.977l2.18 1.255 1.58.91v-3.977zm-.435-5.773l-3.617 1.989 3.617 1.988 3.617-1.988zm4.952 7.442l-2.18-1.255-1.58-.91v3.978l2.18 1.255 1.58.91zm4.17-3.583l-3.617 1.988 3.617 1.989 3.617-1.989zM19.108 14.1l-1.579-.909-2.18-1.255v3.977l2.18 1.255 1.58.91z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="GitHub"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

import { DS_VERSION } from "@/lib/ds-version";

const NAV_LINKS: {
  text: string;
  url: string;
  activeMatch: "url" | "nested-url";
  icon: ReactNode;
}[] = [
  {
    text: "Docs",
    url: "/docs",
    activeMatch: "nested-url",
    icon: <BookOpen className="size-3.5" />,
  },
  {
    text: "Components",
    url: "/components",
    activeMatch: "nested-url",
    icon: <LayoutGrid className="size-3.5" />,
  },
  {
    text: "Laravel",
    url: "/laravel",
    activeMatch: "nested-url",
    icon: <LaravelIcon className="size-3.5" />,
  },
  {
    text: "Blocks",
    url: "/blocks",
    activeMatch: "url",
    icon: <BoxesIcon className="size-3.5" />,
  },
  {
    text: "Colors",
    url: "/colors",
    activeMatch: "url",
    icon: <Palette className="size-3.5" />,
  },
  {
    text: "Themes",
    url: "/themes",
    activeMatch: "url",
    icon: <SwatchBook className="size-3.5" />,
  },
];

export const Nav = () => {
  const { setOpenSearch } = useSearchContext();
  const { open, setOpen } = useSidebar();
  const { menuItems: _menuItems } = useLinkItems(baseOptions);
  const pathname = usePathname();

  function isActive(url: string, match: "url" | "nested-url") {
    if (match === "nested-url") {
      return pathname === url || pathname.startsWith(`${url}/`);
    }
    return pathname === url;
  }

  return (
    <LayoutHeader
      className={cn(
        "sticky top-0 z-50 h-14 w-full transition-all duration-300",
        // Default (scrolled) state: solid background + border
        "border-b border-fd-border bg-fd-background/95 backdrop-blur-sm supports-backdrop-filter:bg-fd-background/60",
        // Transparent (at top) state via data-transparent attribute set by LayoutHeader
        "data-[transparent=true]:border-transparent data-[transparent=true]:bg-transparent data-[transparent=true]:backdrop-blur-none",
      )}
    >
      <div className="mx-auto flex h-full max-w-8xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        {renderTitleNav(baseOptions.nav || {}, {
          className:
            "flex items-center gap-2 shrink-0 transition-opacity hover:opacity-80",
        })}

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={cn(
                "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors rounded-md",
                isActive(link.url, link.activeMatch)
                  ? "font-semibold text-fd-foreground"
                  : "text-fd-muted-foreground hover:text-fd-foreground",
              )}
            >
              {link.icon}
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Side Actions */}
        <div className="flex items-center gap-1">
          {/* Search Button (icon only) */}
          <button
            type="button"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon-sm",
              }),
              "text-fd-muted-foreground hover:text-fd-foreground",
            )}
            onClick={() => setOpenSearch(true)}
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>

          {/* Icon Links: X, GitHub */}
          <div className="hidden sm:flex items-center gap-0.5">
            <Link
              href="https://x.com/i_am_rj05"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon-sm",
                }),
                "text-fd-muted-foreground hover:text-fd-foreground",
              )}
              aria-label="X (Twitter)"
            >
              <XIcon className="size-4" />
            </Link>
            <Link
              href="https://github.com/imrj05/unified-ui"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon-sm",
                }),
                "text-fd-muted-foreground hover:text-fd-foreground",
              )}
              aria-label="GitHub"
            >
              <GitHubIcon className="size-4" />
            </Link>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle className="hidden sm:inline-flex" />

          {/* Version Badge */}
          <div className="hidden lg:flex items-center">
            <span className="inline-flex items-center gap-1 rounded-md border border-fd-border px-2 py-1 text-xs font-medium text-fd-muted-foreground select-none">
              {DS_VERSION}
            </span>
          </div>

          {/* Sponsor Button */}
          <Link
            href="https://github.com/sponsors/imrj05"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground ml-1"
          >
            <Heart className="size-3.5 text-pink-500" />
            Sponsor
          </Link>

          {/* Mobile Menu Toggle */}
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
            aria-label="Toggle menu"
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
