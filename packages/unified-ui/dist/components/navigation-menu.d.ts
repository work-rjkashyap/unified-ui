import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { NavigationMenu as NavigationMenu$1 } from 'radix-ui';

interface NavigationMenuProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Root> {
    className?: string;
}
interface NavigationMenuListProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.List> {
    className?: string;
}
interface NavigationMenuItemProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Item> {
    className?: string;
}
interface NavigationMenuTriggerProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Trigger> {
    className?: string;
}
interface NavigationMenuContentProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Content> {
    className?: string;
}
interface NavigationMenuLinkProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Link> {
    /** Whether this link represents the current page. */
    active?: boolean;
    className?: string;
}
interface NavigationMenuViewportProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Viewport> {
    className?: string;
}
interface NavigationMenuIndicatorProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Indicator> {
    className?: string;
}
/** Props for a nav link item with icon, title, and optional description. */
interface NavigationMenuCardLinkProps {
    /** Icon rendered at the left of the card. */
    icon?: ReactNode;
    /** Title of the card link. */
    title: string;
    /** Optional short description beneath the title. */
    description?: string;
    /** The href for the link. */
    href: string;
    /** Whether this link is the current page. */
    active?: boolean;
    className?: string;
}
/**
 * NavigationMenu — the root container for the navigation menu.
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul className="grid grid-cols-2 gap-2 p-4 w-[400px]">
 *           <NavigationMenuCardLink
 *             href="/docs"
 *             title="Documentation"
 *             description="Explore the full API reference."
 *           />
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
declare const NavigationMenu: react.ForwardRefExoticComponent<NavigationMenuProps & react.RefAttributes<HTMLElement>>;
/**
 * NavigationMenuList — the ordered list of top-level nav items.
 */
declare const NavigationMenuList: react.ForwardRefExoticComponent<NavigationMenuListProps & react.RefAttributes<HTMLUListElement>>;
/**
 * NavigationMenuItem — a single item in the navigation menu list.
 */
declare const NavigationMenuItem: react.ForwardRefExoticComponent<NavigationMenuItemProps & react.RefAttributes<HTMLLIElement>>;
/**
 * NavigationMenuTrigger — the button that opens the dropdown content.
 * Renders with an animated chevron indicator.
 */
declare const NavigationMenuTrigger: react.ForwardRefExoticComponent<NavigationMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * NavigationMenuContent — the dropdown panel that appears below the trigger.
 */
declare const NavigationMenuContent: react.ForwardRefExoticComponent<NavigationMenuContentProps & react.RefAttributes<HTMLDivElement>>;
/**
 * NavigationMenuLink — a plain navigation link without a dropdown.
 * Use as a direct child of NavigationMenuItem for top-level links.
 */
declare const NavigationMenuLink: react.ForwardRefExoticComponent<NavigationMenuLinkProps & react.RefAttributes<HTMLAnchorElement>>;
/**
 * NavigationMenuViewport — the animated container that houses content panels.
 * Automatically added by NavigationMenu root; do not add manually.
 */
declare const NavigationMenuViewport: react.ForwardRefExoticComponent<NavigationMenuViewportProps & react.RefAttributes<HTMLDivElement>>;
/**
 * NavigationMenuIndicator — an optional arrow indicator under the active trigger.
 */
declare const NavigationMenuIndicator: react.ForwardRefExoticComponent<NavigationMenuIndicatorProps & react.RefAttributes<HTMLDivElement>>;
/**
 * NavigationMenuCardLink — a card-style link item for use inside NavigationMenuContent.
 * Renders an icon, title, and optional description in a compact layout.
 *
 * @example
 * ```tsx
 * <NavigationMenuCardLink
 *   href="/docs"
 *   icon={<BookOpen className="size-5" />}
 *   title="Documentation"
 *   description="Browse the full component API reference."
 * />
 * ```
 */
declare function NavigationMenuCardLink({ icon, title, description, href, active, className, }: NavigationMenuCardLinkProps): react_jsx_runtime.JSX.Element;
declare namespace NavigationMenuCardLink {
    var displayName: string;
}

export { NavigationMenu, NavigationMenuCardLink, type NavigationMenuCardLinkProps, NavigationMenuContent, type NavigationMenuContentProps, NavigationMenuIndicator, type NavigationMenuIndicatorProps, NavigationMenuItem, type NavigationMenuItemProps, NavigationMenuLink, type NavigationMenuLinkProps, NavigationMenuList, type NavigationMenuListProps, type NavigationMenuProps, NavigationMenuTrigger, type NavigationMenuTriggerProps, NavigationMenuViewport, type NavigationMenuViewportProps };
