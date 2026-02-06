import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/layout/logo";
import { BookIcon, CodeIcon, LayoutIcon } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        title: <Logo />,
    },
    links: [
        {
            text: "Documentation",
            url: "/docs",
            active: "nested-url",
            icon: <BookIcon className="size-4" />,
        },
        {
            text: "Components",
            url: "/components",
            active: "nested-url",
            icon: <CodeIcon className="size-4" />,
        },
        {
            text: "Showcase",
            url: "/showcase",
            icon: <LayoutIcon className="size-4" />,
        },
    ],
    githubUrl: "https://github.com/unified-ui/unified-ui",
};
