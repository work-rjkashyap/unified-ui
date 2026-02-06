"use client";
import { CommandIcon, Menu, Twitter } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { LayoutHeader } from "./notebook/client";
import { ThemeToggle } from "./theme-toggle";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "./sidebar/base";
export const NAV_ITEMS = [
    {
        title: "Docs",
        url: "/docs",
    },
    {
        title: "Components",
        url: "/docs/components",
    },
    {
        title: "Labs",
        url: "/labs",
    },
];
const NavItem = ({ title, url }: { title: string; url: string }) => {
    return (
        <Link
            href={url}
            className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: cn(
                    "!text-sm !font-normal text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white !h-8 !px-3 transition-colors duration-200 ease-in-out",
                ),
            })}
        >
            {title}
        </Link>
    );
};
export const Nav = () => {
    const { setOpenSearch } = useSearchContext();
    const { open, setOpen } = useSidebar();
    return (
        <LayoutHeader className="md:h-17 h-14 border-b-0 bg-background md:px-5 px-3 flex items-center gap-3 max-w-[1670px] w-full left-1/2 -translate-x-1/2">
            <Link
                href="/"
                className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className:
                        "[&_svg]:!size-5 md:[&_svg]:!size-4.5 !p-0 !size-8 transition-colors duration-200 ease-in-out",
                })}
            >
                <div className="size-8 rounded-lg bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-1.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                    <svg
                        className="w-full h-full text-white drop-shadow-sm"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        role="img"
                        aria-label="Unified UI Logo"
                    >
                        <title>Unified UI Logo</title>
                        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                        <path d="m12 12 8-4.5" />
                        <path d="M12 12v9" />
                        <path d="m12 12-8-4.5" />
                    </svg>
                </div>
            </Link>
            <div className="flex items-center md:justify-between justify-end gap-2 flex-1">
                <div className="md:flex hidden items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <NavItem key={item.title} title={item.title} url={item.url} />
                    ))}
                </div>
                <div className="flex items-center md:gap-3 gap-2">
                    <button
                        type="button"
                        className="pl-3 pr-1.5 h-8 w-48 lg:w-56 xl:w-64 bg-fd-accent hover:bg-fd-accent/70 transition-colors duration-200 ease-in-out text-sm text-fd-muted-foreground rounded-md flex items-center justify-between border border-fd-border/50"
                        onClick={() => setOpenSearch(true)}
                    >
                        <span className="font-normal">Search...</span>
                        <div className="flex items-center gap-1">
                            <kbd className="size-5 leading-none flex items-center justify-center border rounded-[4px] bg-background">
                                <CommandIcon className="size-2.5" />
                            </kbd>
                            <kbd className="size-5 flex items-center justify-center border rounded-[4px] bg-background">
                                <span className="leading-none text-[0.625rem] pt-px">K</span>
                            </kbd>
                        </div>
                    </button>
                    <div className="flex items-center gap-1 max-md:hidden">
                        <a
                            href="https://github.com/unified-ui/unified-ui"
                            rel="noreferrer noopener"
                            target="_blank"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground size-8 [&_svg]:size-5 text-fd-muted-foreground"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-5"
                                aria-label="GitHub"
                            >
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                        <a
                            href="https://x.com/unified_ui"
                            rel="noreferrer noopener"
                            target="_blank"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground size-8 [&_svg]:size-5 text-fd-muted-foreground"
                        >
                            <Twitter className="size-5" />
                        </a>
                    </div>
                    <ThemeToggle className="max-md:hidden" />
                    <button
                        type="button"
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                size: "icon",
                                className:
                                    "!size-8 [&_svg]:!size-5 text-fd-muted-foreground md:hidden",
                            }),
                        )}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <Menu className={cn("transition-transform", open && "rotate-90")} />
                    </button>
                </div>
            </div>
        </LayoutHeader>
    );
};
