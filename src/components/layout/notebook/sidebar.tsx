"use client";
import { cva } from "class-variance-authority";
import { type ComponentProps, use, useRef } from "react";
import { cn } from "../../../lib/cn";
import { mergeRefs } from "../../../lib/merge-refs";
import * as Base from "../sidebar/base";
import { createLinkItemRenderer } from "../sidebar/link-item";
import { createPageTreeRenderer } from "../sidebar/page-tree";
import { LayoutContext } from "./client";
const itemVariants = cva(
    "relative flex flex-row items-center gap-2 rounded-md px-2 py-1.5 text-start text-fd-muted-foreground transition-all duration-300 hover:bg-fd-accent/40 hover:text-fd-foreground data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:font-semibold data-[active=true]:ring-1 data-[active=true]:ring-fd-primary/20 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform hover:[&_svg]:scale-110",
    {
        variants: {
            variant: {
                link: "hover:translate-x-0.5 transition-transform duration-200",
                button: "",
            },
            highlight: {
                true: "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-0.5 data-[active=true]:before:inset-y-1.5 data-[active=true]:before:-start-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:shadow-[0_0_8px_rgba(var(--fd-primary),0.5)]",
            },
        },
        defaultVariants: {
            variant: "link",
            highlight: false,
        },
    },
);
function getItemOffset(depth: number) {
    return `calc(${2 + 3 * depth} * var(--spacing))`;
}
export function Sidebar(props: ComponentProps<typeof Base.SidebarProvider>) {
    return <Base.SidebarProvider {...props} />;
}
export function SidebarFolder(
    props: ComponentProps<typeof Base.SidebarFolder>,
) {
    return <Base.SidebarFolder {...props} />;
}
export function SidebarCollapseTrigger(
    props: ComponentProps<typeof Base.SidebarCollapseTrigger>,
) {
    return <Base.SidebarCollapseTrigger {...props} />;
}
export function SidebarViewport(
    props: ComponentProps<typeof Base.SidebarViewport>,
) {
    return <Base.SidebarViewport {...props} />;
}
export function SidebarTrigger(
    props: ComponentProps<typeof Base.SidebarTrigger>,
) {
    return <Base.SidebarTrigger {...props} />;
}
export function SidebarContent({
    ref: refProp,
    className,
    children,
    ...props
}: ComponentProps<"aside">) {
    const { navMode } = use(LayoutContext)!;
    const ref = useRef<HTMLElement>(null);
    return (
        <Base.SidebarContent>
            {({ collapsed, hovered, ref: asideRef, ...rest }) => (
                <div
                    data-sidebar-placeholder=""
                    className={cn(
                        "sticky z-20 [grid-area:sidebar] pointer-events-none *:pointer-events-auto md:layout:[--fd-sidebar-width:268px] max-md:hidden",
                        navMode === "auto"
                            ? "top-(--fd-docs-row-1) h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))]"
                            : "top-(--fd-docs-row-2) h-[calc(var(--fd-docs-height)-var(--fd-docs-row-2))]",
                    )}
                >
                    {collapsed && (
                        <div className="absolute start-0 inset-y-0 w-4" {...rest} />
                    )}
                    <aside
                        id="nd-sidebar"
                        ref={mergeRefs(ref, refProp, asideRef)}
                        data-collapsed={collapsed}
                        data-hovered={collapsed && hovered}
                        className={cn(
                            "absolute flex flex-col w-full start-0 inset-y-0 items-end text-sm duration-250 *:w-(--fd-sidebar-width) overflow-hidden",
                            navMode === "auto" &&
                            " backdrop-blur-sm border-e border-fd-border/50",
                            collapsed && [
                                "inset-y-2 rounded-2xl  backdrop-blur-sm transition-all border border-fd-border/50 w-(--fd-sidebar-width) shadow-2xl shadow-fd-primary/10",
                                hovered
                                    ? "shadow-lg translate-x-2 rtl:-translate-x-2 scale-[1.02]"
                                    : "-translate-x-(--fd-sidebar-width) rtl:translate-x-full",
                            ],
                            ref.current &&
                            (ref.current.getAttribute("data-collapsed") === "true") !==
                            collapsed &&
                            "transition-[width,inset-block,translate,background-color]",
                            className,
                        )}
                        {...props}
                        {...rest}
                    >
                        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                        <div className="relative z-10 w-full flex flex-col h-full">
                            {children}
                        </div>
                    </aside>
                </div>
            )}
        </Base.SidebarContent>
    );
}
export function SidebarDrawer({
    children,
    className,
    ...props
}: ComponentProps<typeof Base.SidebarDrawerContent>) {
    return (
        <>
            <Base.SidebarDrawerOverlay className="fixed z-40 inset-0 backdrop-blur-sm bg-fd-background/50 data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out" />
            <Base.SidebarDrawerContent
                className={cn(
                    "fixed text-sm flex flex-col shadow-2xl border-s border-fd-border/40 end-0 inset-y-0 w-[85%] max-w-[320px] z-40 bg-fd-background/60 backdrop-blur-xl data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out overflow-hidden",
                    className,
                )}
                {...props}
            >
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">{children}</div>
            </Base.SidebarDrawerContent>
        </>
    );
}
export function SidebarSeparator({
    className,
    style,
    children,
    ...props
}: ComponentProps<"p">) {
    const depth = Base.useFolderDepth();
    return (
        <Base.SidebarSeparator
            className={cn(
                "mt-8 mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-fd-muted-foreground/60 flex items-center gap-2 before:content-[''] before:h-px before:flex-1 before:bg-fd-border/30 after:content-[''] after:h-px after:flex-1 after:bg-fd-border/30",
                className
            )}
            style={{
                paddingInlineStart: getItemOffset(depth),
                ...style,
            }}
            {...props}
        >
            {children}
        </Base.SidebarSeparator>
    );
}
export function SidebarItem({
    className,
    style,
    children,
    ...props
}: ComponentProps<typeof Base.SidebarItem>) {
    const depth = Base.useFolderDepth();
    return (
        <Base.SidebarItem
            className={cn(
                itemVariants({ variant: "link", highlight: depth >= 1 }),
                className,
            )}
            style={{
                paddingInlineStart: getItemOffset(depth),
                ...style,
            }}
            {...props}
        >
            {children}
        </Base.SidebarItem>
    );
}
export function SidebarFolderTrigger({
    className,
    style,
    ...props
}: ComponentProps<typeof Base.SidebarFolderTrigger>) {
    const { depth, collapsible } = Base.useFolder()!;
    return (
        <Base.SidebarFolderTrigger
            className={cn(
                itemVariants({ variant: collapsible ? "button" : null }),
                "w-full",
                className,
            )}
            style={{
                paddingInlineStart: getItemOffset(depth - 1),
                ...style,
            }}
            {...props}
        >
            {props.children}
        </Base.SidebarFolderTrigger>
    );
}
export function SidebarFolderLink({
    className,
    style,
    ...props
}: ComponentProps<typeof Base.SidebarFolderLink>) {
    const depth = Base.useFolderDepth();
    return (
        <Base.SidebarFolderLink
            className={cn(
                itemVariants({ variant: "link", highlight: depth > 1 }),
                "w-full",
                className,
            )}
            style={{
                paddingInlineStart: getItemOffset(depth - 1),
                ...style,
            }}
            {...props}
        >
            {props.children}
        </Base.SidebarFolderLink>
    );
}
export function SidebarFolderContent({
    className,
    children,
    ...props
}: ComponentProps<typeof Base.SidebarFolderContent>) {
    const depth = Base.useFolderDepth();
    return (
        <Base.SidebarFolderContent
            className={cn(
                "relative",
                depth === 1 &&
                "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-fd-border before:start-2.5",
                className,
            )}
            {...props}
        >
            {children}
        </Base.SidebarFolderContent>
    );
}
export const SidebarPageTree = createPageTreeRenderer({
    SidebarFolder,
    SidebarFolderContent,
    SidebarFolderLink,
    SidebarFolderTrigger,
    SidebarItem,
    SidebarSeparator,
});
export const SidebarLinkItem = createLinkItemRenderer({
    SidebarFolder,
    SidebarFolderContent,
    SidebarFolderLink,
    SidebarFolderTrigger,
    SidebarItem,
});
