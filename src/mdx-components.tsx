import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentCard, ComponentGrid } from "@/components/home/component-card";
import {
	NumberInputFormatPreview,
	SliderTooltipFormatPreview,
} from "@/components/layout/input-previews";
import { SearchInputDebouncedPreview } from "@/components/layout/search-input-previews";
import {
	TagDismissiblePreview,
	TagDisabledDismissiblePreview,
} from "@/components/layout/tag-previews";
import { ComponentPage } from "@/components/layout/component-page";
import {
	CommandBasicPreview,
	CommandDisabledPreview,
	CommandIconsPreview,
	ContextMenuCheckboxPreview,
	ContextMenuRadioPreview,
	MenubarCheckboxRadioPreview,
	StepsClickablePreview,
} from "@/components/layout/nav-previews";
import { ToastPreview } from "@/components/layout/toast-preview";

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
		NumberInputFormatPreview,
		SliderTooltipFormatPreview,
		SearchInputDebouncedPreview,
		TagDismissiblePreview,
		TagDisabledDismissiblePreview,
		...components,
	};
}
