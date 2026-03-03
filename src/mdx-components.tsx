import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentCard, ComponentGrid } from "@/components/home/component-card";
import { ComponentPage } from "@/components/layout/component-page";
import { ToastPreview } from "@/components/layout/toast-preview";
import {
	ContextMenuCheckboxPreview,
	ContextMenuRadioPreview,
	MenubarCheckboxRadioPreview,
	StepsClickablePreview,
	CommandBasicPreview,
	CommandIconsPreview,
	CommandDisabledPreview,
} from "@/components/layout/nav-previews";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		ComponentCard,
		ComponentGrid,
		ComponentPage,
		ToastPreview,
		ContextMenuCheckboxPreview,
		ContextMenuRadioPreview,
		MenubarCheckboxRadioPreview,
		StepsClickablePreview,
		CommandBasicPreview,
		CommandIconsPreview,
		CommandDisabledPreview,
		...components,
	};
}
