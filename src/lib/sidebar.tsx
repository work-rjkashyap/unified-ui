import { Beaker, Book, LayoutGrid } from "lucide-react";
import type { SidebarTabWithProps } from "@/components/layout/sidebar/tabs/dropdown";

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
    url: "/docs/components",
    icon: <LayoutGrid className="size-4" />,
  },
  {
    title: "Labs",
    description: "Experimental experiments",
    url: "/labs",
    icon: <Beaker className="size-4" />,
  },
];
