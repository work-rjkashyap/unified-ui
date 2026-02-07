import { Twitter } from "lucide-react";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { Nav } from "@/components/layout/nav";
import { DocsLayout } from "@/components/layout/notebook";
import { DocsSidebar } from "@/components/layout/notebook/sidebar-content";
import { SIDEBAR_TABS } from "@/lib/sidebar";
import { componentSource } from "@/lib/source";

const COMPONENT_LAYOUT_PROPS = {
  ...baseOptions,
  tree: componentSource.getPageTree(),
  sidebar: {
    tabs: SIDEBAR_TABS,
  },
  links: [
    ...(baseOptions.links || []),
    {
      icon: <Twitter className="size-4" />,
      url: "https://x.com/i_am_rj05",
      text: "X",
      type: "icon" as const,
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...COMPONENT_LAYOUT_PROPS}
      sidebar={{
        ...COMPONENT_LAYOUT_PROPS.sidebar,
        component: <DocsSidebar {...COMPONENT_LAYOUT_PROPS} />,
      }}
      nav={{
        ...COMPONENT_LAYOUT_PROPS.nav,
        component: <Nav />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
