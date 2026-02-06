import type * as PageTree from "fumadocs-core/page-tree";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import { Sidebar as SidebarIcon } from "lucide-react";
import {
    type ComponentProps,
    type HTMLAttributes,
    type ReactNode,
    useMemo,
} from "react";
import { cn } from "../../../lib/cn";
import { buttonVariants } from "../../ui/button";
import type { LinkItemType } from "../link-item";
import { Header } from "../navbar";
import { type BaseLayoutProps, useLinkItems } from "../shared";
import { type GetSidebarTabsOptions, getSidebarTabs } from "../sidebar/tabs";
import type { SidebarTabWithProps } from "../sidebar/tabs/dropdown";
import { LayoutBody, LayoutContextProvider, LayoutHeaderTabs } from "./client";
import { Sidebar, SidebarCollapseTrigger, SidebarTrigger } from "./sidebar";
import { DocsSidebar } from "./sidebar-content";
export interface DocsLayoutProps extends BaseLayoutProps {
    tree: PageTree.Root;
    tabMode?: "sidebar" | "navbar";
    nav?: BaseLayoutProps["nav"] & {
        mode?: "top" | "auto";
        component?: ReactNode;
    };
    sidebar?: SidebarOptions;
    containerProps?: HTMLAttributes<HTMLDivElement>;
}
interface SidebarOptions
    extends ComponentProps<"aside">,
    Pick<ComponentProps<typeof Sidebar>, "defaultOpenLevel" | "prefetch"> {
    enabled?: boolean;
    component?: ReactNode;
    /**
     * Support collapsing the sidebar on desktop mode
     *
     * @defaultValue true
     */
    collapsible?: boolean;
    tabs?: SidebarTabWithProps[] | GetSidebarTabsOptions;
}
export function DocsLayout(props: DocsLayoutProps) {
    const {
        tabMode = "sidebar",
        nav = {},
        sidebar: {
            tabs: tabOptions,
            defaultOpenLevel,
            prefetch,
            ...sidebarProps
        } = {},
        tree,
    } = props;
    const _navMode = nav.mode ?? "auto";
    const { navItems } = useLinkItems(props);
    const tabs = useMemo(() => {
        if (Array.isArray(tabOptions)) {
            return tabOptions;
        }
        if (typeof tabOptions === "object") {
            return getSidebarTabs(tree, tabOptions);
        }
        if (tabOptions !== false) {
            return getSidebarTabs(tree);
        }
        return [];
    }, [tabOptions, tree]);
    return (
        <TreeContextProvider tree={tree}>
            <LayoutContextProvider
                navMode={nav.mode ?? "auto"}
                tabMode={tabMode}
                navTransparentMode={nav.transparentMode}
            >
                <Sidebar defaultOpenLevel={defaultOpenLevel} prefetch={prefetch}>
                    {nav.component ?? (
                        <DocsNavbar {...props} links={navItems} tabs={tabs} />
                    )}
                    <LayoutBody {...props.containerProps}>
                        {sidebarProps.component ?? <DocsSidebar {...props} tabs={tabs} />}
                        {props.children}
                    </LayoutBody>
                </Sidebar>
            </LayoutContextProvider>
        </TreeContextProvider>
    );
}
function DocsNavbar(
    props: DocsLayoutProps & {
        links: LinkItemType[];
        tabs: SidebarTabWithProps[];
    },
) {
    const {
        sidebar: { collapsible: sidebarCollapsible = true } = {},
        nav = {},
        tabMode = "navbar",
        tabs,
    } = props;
    const navMode = nav.mode ?? "auto";
    const showLayoutTabs = tabMode === "navbar" && tabs.length > 0;
    const sidebarTrigger = (
        <SidebarTrigger
            className={cn(
                buttonVariants({
                    color: "ghost",
                    size: "icon-sm",
                    className: "p-2 -ms-1.5 md:hidden",
                }),
            )}
        >
            <SidebarIcon className="size-4" />
        </SidebarTrigger>
    );
    const sidebarCollapseTrigger = sidebarCollapsible && (
        <SidebarCollapseTrigger
            className={cn(
                buttonVariants({
                    color: "ghost",
                    size: "icon-sm",
                }),
                "text-fd-muted-foreground data-[collapsed=false]:hidden max-md:hidden",
                navMode === "top" && "hidden",
            )}
        >
            <SidebarIcon className="size-4" />
        </SidebarCollapseTrigger>
    );
    const navCollapseTrigger = sidebarCollapsible && navMode === "top" && (
        <SidebarCollapseTrigger
            className={cn(
                buttonVariants({
                    color: "secondary",
                    size: "icon-sm",
                }),
                "text-fd-muted-foreground rounded-full -me-1.5 max-md:hidden",
            )}
        >
            <SidebarIcon className="size-4" />
        </SidebarCollapseTrigger>
    );
    return (
        <div
            className="[grid-area:header] flex flex-col sticky top-(--fd-docs-row-1) z-10"
            style={
                {
                    "--fd-header-height": showLayoutTabs
                        ? "calc(var(--spacing)*14 + 40px)"
                        : "var(--spacing)*14",
                } as React.CSSProperties
            }
        >
            <Header
                {...props}
                sticky={false}
                className="static"
                containerClassName="max-w-none px-4 md:px-6"
                sidebarTrigger={sidebarTrigger}
                sidebarCollapseTrigger={sidebarCollapseTrigger || navCollapseTrigger}
            />
            {showLayoutTabs && (
                <LayoutHeaderTabs
                    data-header-tabs=""
                    className="overflow-x-auto border-b px-6 h-10 max-lg:hidden bg-fd-background/80 backdrop-blur-xl"
                    options={tabs}
                />
            )}
        </div>
    );
}
