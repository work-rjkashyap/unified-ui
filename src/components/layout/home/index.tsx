import { Languages, X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../../lib/cn";
import { buttonVariants } from "../../ui/button";
import { LanguageToggle } from "../language-toggle";
import { LinkItem } from "../link-item";
import { LayoutContextProvider } from "../notebook/client";
import {
  SidebarDrawer,
  SidebarLinkItem,
  SidebarTrigger,
  SidebarViewport,
} from "../notebook/sidebar";
import { type BaseLayoutProps, type NavOptions, useLinkItems } from "../shared";
import { SidebarProvider } from "../sidebar/base";
import { ThemeToggle } from "../theme-toggle";
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

  const { menuItems } = useLinkItems(props);
  const iconLinks = menuItems.filter((item) => item.type === "icon");

  return (
    <SidebarProvider>
      <LayoutContextProvider
        navMode={(nav as any).mode ?? "auto"}
        tabMode="navbar"
        navTransparentMode={nav.transparentMode}
      >
        <SidebarDrawer>
          <div className="flex flex-col gap-3 p-4 pb-2">
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  size: "icon-sm",
                  color: "ghost",
                  className: "ms-auto text-fd-muted-foreground",
                }),
              )}
            >
              <X className="size-4" />
            </SidebarTrigger>
          </div>
          <SidebarViewport>
            <div className="flex flex-col gap-1 py-4">
              {links
                .filter((item) => item.type !== "icon")
                .map((item, i) => (
                  <SidebarLinkItem key={i} item={item} />
                ))}
            </div>
          </SidebarViewport>
          <div
            className={cn(
              "hidden flex-row items-center justify-end p-4 pt-2 mt-auto border-t border-fd-border/40",
              (i18n || themeSwitch.enabled !== false) && "flex",
              iconLinks.length > 0 && "max-lg:flex",
            )}
          >
            {iconLinks.map((item, i) => (
              <LinkItem
                key={i}
                item={item}
                className={cn(
                  buttonVariants({
                    size: "icon-sm",
                    color: "ghost",
                  }),
                  "text-fd-muted-foreground lg:hidden",
                  i === iconLinks.length - 1 && "me-auto",
                )}
                aria-label={item.label}
              >
                {item.icon}
              </LinkItem>
            ))}
            {i18n && (
              <LanguageToggle>
                <Languages className="size-4.5 text-fd-muted-foreground" />
              </LanguageToggle>
            )}
            {themeSwitch.enabled !== false &&
              (themeSwitch.component ?? (
                <ThemeToggle mode={themeSwitch.mode ?? "light-dark-system"} />
              ))}
          </div>
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
