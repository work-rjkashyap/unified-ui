import { Beaker, Book, LayoutGrid } from "lucide-react";
import type { SidebarTabWithProps } from "@/components/layout/sidebar/tabs/dropdown";

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

export const SIDEBAR_TABS: SidebarTabWithProps[] = [
  {
    title: "Documentation",
    description: "Core guides and API references",
    url: "/docs",
    icon: <Book className="size-4" />,
  },
  {
    title: "Components",
    description: "UI primitives and building blocks",
    url: "/components",
    icon: <LayoutGrid className="size-4" />,
  },
  {
    title: "Laravel",
    description: "Blade components for Laravel",
    url: "/laravel",
    icon: <LaravelIcon className="size-4" />,
  },
  {
    title: "Labs",
    description: "Experimental experiments",
    url: "/labs",
    icon: <Beaker className="size-4" />,
  },
];
