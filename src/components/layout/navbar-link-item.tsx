"use client";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { LinkItem, type LinkItemType } from "./link-item";

export function NavbarLinkItem({
  item,
  className,
  ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === "custom") return item.children;

  // For now, we only support main type items with icons
  if (item.type !== "main") return null;

  return (
    <LinkItem
      item={item}
      className={cn(
        "inline-flex items-center gap-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary",
        className,
      )}
      {...props}
    >
      {item.icon && <span className="[&_svg]:size-4">{item.icon}</span>}
      {item.text}
    </LinkItem>
  );
}
