import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { ComponentCard, ComponentGrid } from "@/components/home/component-card";
import { ComponentPage } from "@/components/layout/component-page";
import { PreviewCard } from "@/components/layout/preview-card";
import {
    NumberInputFormatPreview,
    SliderTooltipFormatPreview,
} from "@/components/layout/input-previews";
import {
    CommandBasicPreview,
    CommandDisabledPreview,
    CommandIconsPreview,
    ContextMenuCheckboxPreview,
    ContextMenuRadioPreview,
    MenubarCheckboxRadioPreview,
    StepsClickablePreview,
} from "@/components/layout/nav-previews";
import { SearchInputDebouncedPreview } from "@/components/layout/search-input-previews";
import {
    TagDisabledDismissiblePreview,
    TagDismissiblePreview,
} from "@/components/layout/tag-previews";
import {
    ThemeToggleIconPreview,
    ThemeToggleSegmentedPreview,
    ThemeToggleSegmentedSizesPreview,
    ThemeToggleSizesPreview,
    ThemeToggleSystemIconPreview,
    ThemeToggleSystemSegmentedPreview,
} from "@/components/layout/theme-toggle-previews";
import { ToastPreview } from "@/components/layout/toast-preview";
import {
    ChartBarPreview,
    ChartWeeklySalesPreview,
    ChartMultiSeriesPreview,
    ChartLinePreview,
    ChartAreaPreview,
    ChartPiePreview,
} from "@/components/layout/chart-previews";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        ComponentCard,
        ComponentGrid,
        ComponentPage,
        ComponentPreview,
        PreviewCard,
        PropsTable,
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
        ThemeToggleIconPreview,
        ThemeToggleSegmentedPreview,
        ThemeToggleSystemIconPreview,
        ThemeToggleSystemSegmentedPreview,
        ThemeToggleSizesPreview,
        ThemeToggleSegmentedSizesPreview,
        ChartBarPreview,
        ChartWeeklySalesPreview,
        ChartMultiSeriesPreview,
        ChartLinePreview,
        ChartAreaPreview,
        ChartPiePreview,
        ...components,
    };
}
