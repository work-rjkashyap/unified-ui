import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/layout/logo";
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
        },
        {
            text: "Components",
            url: "/components",
            active: "nested-url",
        },
        {
            text: "Showcase",
            url: "/showcase",
        },
    ],
    githubUrl: "https://github.com/unified-ui/unified-ui",
};
