import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import {
  BookIcon,
  BoxesIcon,
  CodeIcon,
  LayoutIcon,
  PaletteIcon,
  SwatchBookIcon,
  Twitter,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";

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

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Discord"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

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
      text: "Docs",
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
      text: "Laravel",
      url: "/laravel",
      active: "nested-url",
      icon: <LaravelIcon className="size-4" />,
    },
    {
      text: "Blocks",
      url: "/blocks",
      icon: <BoxesIcon className="size-4" />,
    },
    {
      text: "Colors",
      url: "/colors",
      icon: <PaletteIcon className="size-4" />,
    },
    {
      text: "Themes",
      url: "/themes",
      icon: <SwatchBookIcon className="size-4" />,
    },
    {
      text: "Showcase",
      url: "/showcase",
      icon: <LayoutIcon className="size-4" />,
    },
    {
      type: "icon",
      text: "Discord",
      label: "Discord",
      url: "https://discord.gg/unified-ui",
      icon: <DiscordIcon className="size-4" />,
      external: true,
    },
    {
      type: "icon",
      text: "Twitter",
      label: "Twitter",
      url: "https://x.com/i_am_rj05",
      icon: <Twitter className="size-4" />,
      external: true,
    },
  ],
  githubUrl: "https://github.com/imrj05/unified-ui",
};
