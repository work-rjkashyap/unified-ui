"use client";

import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Progress,
  Skeleton,
  SkeletonCircle,
  SkeletonRect,
  SkeletonText,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@work-rjkashyap/unified-ui";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  Grip,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Sparkles,
  Table,
  Type,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Shared ButtonLink                                                  */
/* ------------------------------------------------------------------ */

function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  ...rest
}: ComponentProps<typeof Link> & {
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  iconLeft?: ComponentProps<typeof Button>["iconLeft"];
  iconRight?: ComponentProps<typeof Button>["iconRight"];
}) {
  return (
    <Link href={href} className="contents" {...rest}>
      <Button
        as="span"
        variant={variant}
        size={size}
        iconLeft={iconLeft}
        iconRight={iconRight}
        className={className}
      >
        {children}
      </Button>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Component category data                                            */
/* ------------------------------------------------------------------ */

const componentCategories = [
  {
    title: "Form Controls",
    description:
      "Input, Select, Checkbox, Switch, Slider, Radio, DatePicker, NumberInput, PinInput.",
    icon: SlidersHorizontal,
    count: 12,
    href: "/components",
    color: "purple",
  },
  {
    title: "Overlays & Dialogs",
    description:
      "Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip, ContextMenu.",
    icon: LayoutGrid,
    count: 9,
    href: "/components",
    color: "blue",
  },
  {
    title: "Data Display",
    description:
      "DataTable, Table, Card, Badge, Avatar, Stat, Timeline, DataList, Calendar.",
    icon: Table,
    count: 10,
    href: "/components",
    color: "cyan",
  },
  {
    title: "Navigation",
    description:
      "Sidebar, Tabs, Breadcrumb, NavigationMenu, Menubar, Pagination, Steps, Command.",
    icon: Grip,
    count: 8,
    href: "/components",
    color: "green",
  },
  {
    title: "Feedback",
    description:
      "Alert, Banner, Toast (Sonner), Progress, Spinner, Skeleton, EmptyState.",
    icon: Bell,
    count: 7,
    href: "/components",
    color: "amber",
  },
  {
    title: "Layout & Typography",
    description:
      "Stack, Container, Divider, Heading, Typography, AspectRatio, ScrollArea.",
    icon: Type,
    count: 8,
    href: "/components",
    color: "rose",
  },
];

const badgeVariantMap: Record<
  string,
  "primary" | "info" | "success" | "warning" | "danger" | "default"
> = {
  purple: "primary",
  blue: "info",
  cyan: "info",
  green: "success",
  amber: "warning",
  rose: "danger",
};

const dotColorMap: Record<string, string> = {
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

/* ------------------------------------------------------------------ */
/*  Category card                                                      */
/* ------------------------------------------------------------------ */

function CategoryCard({
  category,
}: {
  category: (typeof componentCategories)[number];
}) {
  const Icon = category.icon;
  const badgeVariant = badgeVariantMap[category.color] ?? "default";
  const dotColor = dotColorMap[category.color] ?? "bg-fd-muted-foreground";

  return (
    <Link href={category.href} className="group contents">
      <div
        className={cn(
          "relative flex items-center gap-3 rounded-lg border border-fd-border bg-fd-card/40 px-3 py-2.5",
          "hover:border-fd-muted-foreground/25 hover:bg-fd-card/70 transition-all duration-200",
        )}
      >
        {/* Icon with colored dot */}
        <div className="relative p-2 rounded-lg bg-fd-background border border-fd-border shrink-0 transition-colors group-hover:border-fd-muted-foreground/20">
          <Icon className="w-3.5 h-3.5 text-fd-foreground" />
          <div
            className={cn(
              "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-fd-card/60",
              dotColor,
            )}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h3 className="text-base font-bold tracking-tight truncate">
              {category.title}
            </h3>
            <Badge variant={badgeVariant} size="sm" className="shrink-0">
              {category.count}
            </Badge>
          </div>
          <p className="text-sm text-fd-muted-foreground leading-5 line-clamp-1">
            {category.description}
          </p>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-3.5 h-3.5 text-fd-muted-foreground/40 shrink-0 group-hover:text-fd-foreground group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive live demo panel                                        */
/* ------------------------------------------------------------------ */

function LiveDemoPanel() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailChecked, setEmailChecked] = useState(true);
  const [smsChecked, setSmsChecked] = useState(false);
  const [pushChecked, setPushChecked] = useState(true);

  return (
    <Card className="bg-fd-card border-fd-border overflow-hidden w-full h-full">
      <Tabs defaultValue="preview" variant="underline" size="sm">
        <CardHeader bordered className="pb-0 pt-0">
          <TabsList>
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="code">Import Example</TabsTrigger>
            <TabsTrigger value="loading">Loading States</TabsTrigger>
          </TabsList>
        </CardHeader>

        {/* Tab 1 — Interactive component preview */}
        <TabsContent value="preview">
          <CardBody className="space-y-4 p-4">
            <Alert variant="info" title="Getting started">
              Install the package, wrap your app in the theme provider, and
              start importing components.
            </Alert>

            <div className="space-y-2.5">
              <Input
                placeholder="Search components…"
                size="sm"
                iconLeft={<Search className="size-3.5" />}
              />

              <div className="flex items-center justify-between">
                <Switch
                  label="Enable notifications"
                  size="sm"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              {notificationsEnabled && (
                <div className="pl-1 space-y-2 border-l-2 border-fd-border ml-1">
                  <Checkbox
                    label="Email notifications"
                    size="sm"
                    checked={emailChecked}
                    onCheckedChange={(v) => setEmailChecked(v === true)}
                  />
                  <Checkbox
                    label="SMS notifications"
                    size="sm"
                    checked={smsChecked}
                    onCheckedChange={(v) => setSmsChecked(v === true)}
                  />
                  <Checkbox
                    label="Push notifications"
                    size="sm"
                    checked={pushChecked}
                    onCheckedChange={(v) => setPushChecked(v === true)}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-row flex-wrap gap-1.5">
              <Badge variant="default" size="sm">
                Default
              </Badge>
              <Badge variant="primary" size="sm">
                Primary
              </Badge>
              <Badge variant="success" size="sm" dot>
                Active
              </Badge>
              <Badge variant="warning" size="sm">
                Beta
              </Badge>
              <Badge variant="danger" size="sm">
                Breaking
              </Badge>
              <Badge variant="outline" size="sm">
                MIT
              </Badge>
            </div>

            <div className="flex flex-row flex-wrap gap-1.5">
              <Button size="sm" variant="primary">
                Primary
              </Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
              <Button size="sm" variant="danger">
                Danger
              </Button>
              <Button
                size="sm"
                variant="primary"
                loading
                loadingText="Saving…"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-fd-muted-foreground font-medium">
                <span>Build progress</span>
                <span className="font-mono">72%</span>
              </div>
              <Progress value={72} size="sm" variant="primary" />
            </div>
          </CardBody>
        </TabsContent>

        {/* Tab 2 — Code examples */}
        <TabsContent value="code">
          <CardBody className="space-y-3 p-4">
            <CodeBlock
              title="Barrel import"
              code={`import { Button, Dialog, Badge, Tabs } from "@work-rjkashyap/unified-ui";`}
            />
            <CodeBlock
              title="Layer-specific import (better tree-shaking)"
              code={`import { Button } from "@work-rjkashyap/unified-ui/components";
import { fadeIn } from "@work-rjkashyap/unified-ui/motion";
import { cn } from "@work-rjkashyap/unified-ui/utils";`}
            />
            <CodeBlock
              title="Theme provider setup"
              code={`import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import "@work-rjkashyap/unified-ui/styles.css";

export default function Layout({ children }) {
  return <DSThemeProvider>{children}</DSThemeProvider>;
}`}
            />
          </CardBody>
        </TabsContent>

        {/* Tab 3 — Skeleton / loading states */}
        <TabsContent value="loading">
          <CardBody className="space-y-4 p-4">
            <p className="text-sm text-fd-muted-foreground leading-6">
              Built-in loading primitives — Skeleton, SkeletonText,
              SkeletonCircle, SkeletonRect — that match your component layouts.
            </p>

            <Card className="bg-fd-background border-fd-border">
              <CardBody className="space-y-3 p-4">
                <div className="flex items-center gap-3">
                  <SkeletonCircle size="md" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton shape="text" className="w-1/3" />
                    <Skeleton shape="text" className="w-1/2" />
                  </div>
                </div>
                <SkeletonRect width="100%" height={64} />
                <SkeletonText lines={2} />
                <div className="flex gap-2 pt-1">
                  <Skeleton shape="rect" width={72} height={28} />
                  <Skeleton shape="rect" width={72} height={28} />
                </div>
              </CardBody>
            </Card>

            <Progress indeterminate size="sm" />
          </CardBody>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Code block helper                                                  */
/* ------------------------------------------------------------------ */

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-lg border border-fd-border bg-fd-background/80 overflow-hidden">
      <div className="px-3 py-2 border-b border-fd-border/50 bg-fd-muted/30 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-fd-muted-foreground/15" />
          <div className="w-2 h-2 rounded-full bg-fd-muted-foreground/15" />
          <div className="w-2 h-2 rounded-full bg-fd-muted-foreground/15" />
        </div>
        <span className="text-xs font-bold text-fd-muted-foreground uppercase tracking-widest ml-1">
          {title}
        </span>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-fd-foreground/80 whitespace-pre-wrap wrap-break-word">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function ShowcaseSection() {
  return (
    <section className="relative py-14 border-y border-fd-border/50 bg-fd-background/50 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-linear-to-br from-purple-500/3 to-cyan-500/3 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" size="sm" className="mb-3">
              Component Library
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
              75+ components.{" "}
              <span className="text-fd-muted-foreground">
                One{" "}
                <code className="text-purple-500 font-mono text-[0.85em]">
                  npm install
                </code>{" "}
                away.
              </span>
            </h2>
            <p className="text-base text-fd-muted-foreground leading-7 max-w-lg">
              Every component from shadcn/ui you love — plus DataTable, Sidebar,
              Calendar, TreeView, VirtualList, and more — packaged and ready.
            </p>
          </div>
          <ButtonLink
            href="/components"
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="size-3.5" />}
            className="shrink-0 rounded-full px-5"
          >
            View All Components
          </ButtonLink>
        </div>

        {/* ── Two-column layout: categories + live demo ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left — Component categories */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {componentCategories.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}

            {/* Total count strip */}
            <div className="flex items-center justify-between rounded-lg border border-dashed border-fd-border/60 bg-fd-muted/20 px-3 py-2 mt-0.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span className="text-sm font-medium text-fd-muted-foreground">
                  Total components
                </span>
              </div>
              <Badge variant="primary" size="sm" className="font-mono">
                75+
              </Badge>
            </div>
          </div>

          {/* Right — Live interactive demo */}
          <div className="lg:col-span-7">
            <LiveDemoPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
