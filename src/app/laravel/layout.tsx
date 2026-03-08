import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { Nav } from "@/components/layout/nav";
import { DocsLayout } from "@/components/layout/notebook";
import { DocsSidebar } from "@/components/layout/notebook/sidebar-content";
import { SIDEBAR_TABS } from "@/lib/sidebar";
import { laravelSource } from "@/lib/source";

const LARAVEL_LAYOUT_PROPS = {
	...baseOptions,
	tree: laravelSource.getPageTree(),
	sidebar: {
		tabs: SIDEBAR_TABS,
	},
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			{...LARAVEL_LAYOUT_PROPS}
			sidebar={{
				...LARAVEL_LAYOUT_PROPS.sidebar,
				component: <DocsSidebar {...LARAVEL_LAYOUT_PROPS} />,
			}}
			nav={{
				...LARAVEL_LAYOUT_PROPS.nav,
				transparentMode: "top",
				component: <Nav />,
			}}
		>
			{children}
		</DocsLayout>
	);
}
