import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentCard, ComponentGrid } from "@/components/home/component-card";
import { ComponentPage } from "@/components/layout/component-page";
import { ToastPreview } from "@/components/layout/toast-preview";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		ComponentCard,
		ComponentGrid,
		ComponentPage,
		ToastPreview,
		...components,
	};
}
