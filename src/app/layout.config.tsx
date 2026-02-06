import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        title: (
            <div className="flex items-center gap-2.5">
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
                <div className="flex flex-col">
                    <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                        Unified UI
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 dark:text-neutral-400 leading-none">
                        Pro
                    </span>
                </div>
            </div>
        ),
    },
    links: [
        {
            text: "Documentation",
            url: "/docs",
            active: "nested-url",
        },
        {
            text: "Components",
            url: "/docs/components",
            active: "nested-url",
        },
        {
            text: "Showcase",
            url: "/showcase",
        },
    ],
};
