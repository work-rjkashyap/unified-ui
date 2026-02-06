import type { ComponentProps } from "react";
import { cn } from "../../../lib/cn";
import { LayoutContextProvider } from "../notebook/client";
import {
    SidebarDrawer,
    SidebarLinkItem,
    SidebarViewport,
} from "../notebook/sidebar";
import type { BaseLayoutProps, NavOptions } from "../shared";
import { SidebarProvider } from "../sidebar/base";
import { Header } from "./client";

export interface HomeLayoutProps extends BaseLayoutProps {
    nav?: Partial<
        NavOptions & {
            /**
             * Open mobile menu when hovering the trigger
             */
            enableHoverToOpen?: boolean;
        }
    >;
}

export function HomeLayout(props: HomeLayoutProps & ComponentProps<"main">) {
    const {
        nav = {},
        links = [],
        githubUrl,
        i18n,
        themeSwitch = {},
        searchToggle,
        ...rest
    } = props;

    return (
        <SidebarProvider>
            <LayoutContextProvider
                navMode={(nav as any).mode ?? "auto"}
                tabMode="navbar"
                navTransparentMode={nav.transparentMode}
            >
                <SidebarDrawer>
                    <SidebarViewport>
                        <div className="flex flex-col gap-1 py-4">
                            {links
                                .filter((item) => item.type !== "icon")
                                .map((item, i) => (
                                    <SidebarLinkItem key={i} item={item} />
                                ))}
                        </div>
                    </SidebarViewport>
                </SidebarDrawer>
                <main
                    id="nd-home-layout"
                    {...rest}
                    className={cn(
                        "flex flex-1 flex-col [--fd-layout-width:1400px]",
                        rest.className,
                    )}
                >
                    {nav.enabled !== false &&
                        (nav.component ?? (
                            <Header
                                links={links}
                                nav={nav}
                                themeSwitch={themeSwitch}
                                searchToggle={searchToggle}
                                i18n={i18n}
                                githubUrl={githubUrl}
                            />
                        ))}
                    {props.children}
                </main>
            </LayoutContextProvider>
        </SidebarProvider>
    );
}
