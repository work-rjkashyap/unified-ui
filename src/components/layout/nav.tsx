"use client";
import { CommandIcon, Menu, Twitter } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { LayoutHeader } from "./notebook/client";
import { ThemeToggle } from "./theme-toggle";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "./sidebar/base";
import { baseOptions } from "@/app/layout.config";
import { renderTitleNav } from "./shared";
export const Nav = () => {
    const { setOpenSearch } = useSearchContext();
    const { open, setOpen } = useSidebar();
    const links = baseOptions.links || [];
    return (
        <LayoutHeader className="sticky top-0 z-50 h-16 w-full   backdrop-blur-xl bg-transparent -mb-5">
            <div className="mx-auto flex h-full max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8 ">
                {renderTitleNav(baseOptions.nav || {}, {
                    className: "flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
                })}
                <div className="flex flex-1 items-center justify-center px-8 max-md:hidden">
                    <nav className="flex items-center gap-8">
                        {links.map((item) => (
                            <Link
                                key={item.url}
                                href={item.url}
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
                        className="group flex h-9 w-40 items-center justify-between rounded-lg border border-fd-border/50 bg-fd-muted/50 px-3 text-sm text-fd-muted-foreground transition-all duration-200 hover:border-fd-border hover:bg-fd-muted lg:w-64"
                        onClick={() => setOpenSearch(true)}
                    >
                        <span className="truncate font-normal group-hover:text-fd-foreground transition-colors">
                            Search docs...
                        </span>
                        <div className="flex items-center gap-1">
                            <kbd className="flex size-5 items-center justify-center rounded-[4px] border bg-fd-background text-[10px] font-medium shadow-xs">
                                <CommandIcon className="size-2.5" />
                            </kbd>
                            <kbd className="flex size-5 items-center justify-center rounded-[4px] border bg-fd-background text-[10px] font-medium shadow-xs">
                                <span className="pt-px leading-none">K</span>
                            </kbd>
                        </div>
                    </button>
                    <div className="flex items-center gap-1 max-sm:hidden">
                        <ThemeToggle />
                        <a
                            href="https://github.com/unified-ui/unified-ui"
                            rel="noreferrer noopener"
                            target="_blank"
                            className="inline-flex size-8 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
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
                        <Menu className={cn("size-5 transition-transform", open && "rotate-90")} />
                    </button>
                </div>
            </div>
        </LayoutHeader>
    );
};
