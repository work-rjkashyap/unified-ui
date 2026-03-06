import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { Nav } from "@/components/layout/nav";
import { DocsLayout } from "@/components/layout/notebook";
import { DocsSidebar } from "@/components/layout/notebook/sidebar-content";
import { SIDEBAR_TABS } from "@/lib/sidebar";
import { source } from "@/lib/source";

const DOCS_LAYOUT_PROPS = {
	...baseOptions,
	tree: source.getPageTree(),
	sidebar: {
		// ...baseOptions.sidebar,
		tabs: SIDEBAR_TABS,
	},
};
export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			{...DOCS_LAYOUT_PROPS}
			sidebar={{
				// ...DOCS_LAYOUT_PROPS.sidebar,
				component: <DocsSidebar {...DOCS_LAYOUT_PROPS} />,
			}}
			nav={{
				...DOCS_LAYOUT_PROPS.nav,
				transparentMode: "top",
				component: <Nav />,
			}}
		>
			{children}
		</DocsLayout>
	);
}
