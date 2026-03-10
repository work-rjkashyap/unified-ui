"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardBody,
  Checkbox,
  Input,
  Kbd,
  Label,
  Pagination,
  Progress,
  RadioCard,
  RadioGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  SkeletonCircle,
  Slider,
  Spinner,
  Stat,
  Step,
  Steps,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Timeline,
  Tooltip,
  TooltipProvider,
} from "@work-rjkashyap/unified-ui";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Edit,
  Folder,
  Home,
  Keyboard,
  Layers,
  MapPin,
  Paintbrush,
  Settings,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { BentoCard } from "./preview-area";
import { SidebarPreview } from "./sidebar-preview";

// ---------------------------------------------------------------------------
// DashboardPreview — dense bento grid, no empty space
// ---------------------------------------------------------------------------

export function DashboardPreview() {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-6 gap-3">
        {/* ── Row 1 — Stat cards (2 per row = col-span-3 each) ── */}
        {(
          [
            {
              label: "Revenue",
              value: "$45,231",
              change: "+20.1%",
              changeLabel: "from last month",
              trend: "up",
              icon: DollarSign,
            },
            {
              label: "Subscriptions",
              value: "+2,350",
              change: "+180.1%",
              changeLabel: "from last month",
              trend: "up",
              icon: Users,
            },
            {
              label: "Sales",
              value: "+12,234",
              change: "+19%",
              changeLabel: "from last month",
              trend: "up",
              icon: CreditCard,
            },
            {
              label: "Active Now",
              value: "+573",
              change: "-2.4%",
              changeLabel: "from last hour",
              trend: "down",
              icon: Activity,
            },
          ] as const
        ).map((stat) => (
          <Card key={stat.label} className="col-span-3 h-full">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <div className="size-8 rounded-md bg-muted flex items-center justify-center">
                  <stat.icon className="size-4 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="size-3.5 text-success" />
                  ) : (
                    <ArrowDownRight className="size-3.5 text-danger" />
                  )}
                  <span
                    className={`text-xs font-medium ${stat.trend === "up" ? "text-success" : "text-danger"}`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.changeLabel}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        {/* ── Row 2 — Chart (4/6) + Recent Sales (2/6) ── */}
        <div className="col-span-6 lg:col-span-4">
          <BentoCard
            title="Revenue Overview"
            description="Monthly revenue for the current year"
            icon={TrendingUp}
          >
            <div className="flex items-end gap-1.5 h-32 mt-1">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50].map((h, i) => (
                <Tooltip
                  key={i}
                  content={`$${(h * 450 + 1200).toLocaleString()}`}
                >
                  <div
                    className="flex-1 rounded-t-sm bg-primary/80 hover:bg-primary transition-colors duration-fast cursor-default"
                    style={{ height: `${h}%` }}
                  />
                </Tooltip>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <TrendingUp className="size-3.5 text-success" />
              <span>
                Trending up by{" "}
                <span className="font-medium text-foreground">5.2%</span> this
                month
              </span>
            </div>
          </BentoCard>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <BentoCard
            title="Recent Sales"
            description="265 sales this month"
            icon={CreditCard}
          >
            <div className="divide-y divide-border">
              {[
                {
                  name: "Olivia Martin",
                  email: "olivia@example.com",
                  amount: "+$1,999",
                  status: "success" as const,
                },
                {
                  name: "Jackson Lee",
                  email: "jackson@example.com",
                  amount: "+$39",
                  status: "success" as const,
                },
                {
                  name: "Isabella Nguyen",
                  email: "isabella@example.com",
                  amount: "+$299",
                  status: "warning" as const,
                },
                {
                  name: "William Kim",
                  email: "will@example.com",
                  amount: "+$99",
                  status: "danger" as const,
                },
                {
                  name: "Sofia Davis",
                  email: "sofia@example.com",
                  amount: "+$450",
                  status: "info" as const,
                },
              ].map((sale) => (
                <div key={sale.email} className="flex items-center gap-2 py-2">
                  <Avatar name={sale.name} size="xs" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-none truncate">
                      {sale.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                      {sale.email}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold tabular-nums">
                      {sale.amount}
                    </p>
                    <Badge variant={sale.status} size="sm" className="mt-0.5">
                      {sale.status === "success"
                        ? "Paid"
                        : sale.status === "warning"
                          ? "Pending"
                          : sale.status === "danger"
                            ? "Failed"
                            : "Processing"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* ── Row 3 — Settings (3/6) + Sliders (3/6) ── */}
        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Settings"
            description="Preferences & toggles"
            icon={Settings}
          >
            <div className="space-y-3">
              <Switch
                label="Auto updates"
                description="Install updates automatically."
                defaultChecked
              />
              <Switch
                label="Dark mode"
                description="Use a darker theme across the app."
              />
              <Switch
                label="Two-factor auth"
                description="Require extra verification on sign-in."
                defaultChecked
              />
              <Switch
                label="Usage analytics"
                description="Share anonymous usage data."
              />
            </div>
          </BentoCard>
        </div>

        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Adjustments"
            description="Range & value selectors"
            icon={Paintbrush}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">
                    X
                  </label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    50
                  </span>
                </div>
                <Slider defaultValue={[50]} max={100} />
                <p className="text-[11px] text-muted-foreground">
                  Horizontal position
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">
                    Y
                  </label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    50
                  </span>
                </div>
                <Slider defaultValue={[50]} max={100} />
                <p className="text-[11px] text-muted-foreground">
                  Vertical position
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">
                    Zoom
                  </label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    50
                  </span>
                </div>
                <Slider defaultValue={[50]} max={100} />
                <p className="text-[11px] text-muted-foreground">Scale</p>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* ── Row 4 — Radio Cards (3/6) + Notifications (3/6) ── */}
        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Billing Period"
            description="Single-option selection"
            icon={CreditCard}
          >
            <RadioGroup defaultValue="monthly" orientation="vertical">
              <RadioCard
                value="monthly"
                label="Bill monthly"
                description="Pay every month and cancel anytime."
              />
              <RadioCard
                value="quarterly"
                label="Bill quarterly"
                description="Pay every 3 months with fewer invoices."
              />
              <RadioCard
                value="yearly"
                label="Bill yearly"
                description="Save 20% with an annual plan."
              />
            </RadioGroup>
          </BentoCard>
        </div>

        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Notification Preferences"
            description="Choose what to receive"
            icon={Settings}
          >
            <div className="space-y-3">
              <Checkbox
                label="Security alerts"
                description="Password changes, new sign-ins, suspicious activity."
                checked
              />
              <Checkbox
                label="Product updates"
                description="Release notes and improvements, sent weekly."
                checked
              />
              <Checkbox
                label="Weekly summary"
                description="Workspace activity digest every Monday."
              />
              <Checkbox
                label="Marketing emails"
                description="Tips, tutorials, and promotions."
              />
            </div>
          </BentoCard>
        </div>

        {/* ── Row 5 — Tabs+Stat (4/6) + Accordion (2/6) ── */}
        <div className="col-span-6 lg:col-span-4">
          <BentoCard title="Tabs" description="Tabbed navigation" icon={Folder}>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-3">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Welcome to the overview tab. This shows a summary of your
                    workspace activity.
                  </p>
                  <div className="flex items-center gap-6">
                    <Stat
                      label="Views"
                      value="12.4k"
                      trend="up"
                      trendLabel="+12%"
                    />
                    <Stat
                      label="Clicks"
                      value="3.2k"
                      trend="up"
                      trendLabel="+8%"
                    />
                    <Stat
                      label="Bounces"
                      value="1.1k"
                      trend="down"
                      trendLabel="-3%"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Analytics data is updated hourly. Last updated 15 minutes ago.
                </p>
              </TabsContent>
              <TabsContent value="reports" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Generate custom reports by selecting date ranges and metrics.
                </p>
              </TabsContent>
            </Tabs>
          </BentoCard>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <BentoCard
            title="FAQ"
            description="Expandable sections"
            icon={Layers}
          >
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Unified UI?</AccordionTrigger>
                <AccordionContent>
                  A token-driven design system for React built with Tailwind CSS
                  v4, Radix UI, and Framer Motion.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. All components follow WAI-ARIA patterns and are keyboard
                  navigable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize themes?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Use the theme customizer to change colors, fonts,
                  radius, and more.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </BentoCard>
        </div>

        {/* ── Row 6 — Steps+Timeline (4/6) + Avatars+Kbd (2/6) ── */}
        <div className="col-span-6 lg:col-span-4">
          <BentoCard
            title="Steps & Timeline"
            description="Process flow & activity"
            icon={MapPin}
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Onboarding steps
                </p>
                <Steps currentStep={1}>
                  <Step title="Create account" />
                  <Step title="Setup workspace" />
                  <Step title="Invite team" />
                  <Step title="Launch" />
                </Steps>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Activity timeline
                </p>
                <Timeline
                  items={[
                    {
                      title: "Deployed v2.1.0",
                      description:
                        "Production deployment completed successfully.",
                      status: "success",
                    },
                    {
                      title: "Code review approved",
                      description: "PR #142 approved by 2 reviewers.",
                      status: "success",
                    },
                    {
                      title: "Tests running",
                      description: "CI pipeline in progress.",
                      status: "active",
                    },
                    {
                      title: "Release notes",
                      description: "Pending documentation update.",
                      status: "pending",
                    },
                  ]}
                />
              </div>
            </div>
          </BentoCard>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="grid grid-rows-2 gap-3 h-full">
            <BentoCard
              title="Avatars"
              description="User representations"
              icon={User}
            >
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <Avatar name="Alice Johnson" size="xs" />
                  <Avatar name="Bob Smith" size="sm" />
                  <Avatar name="Charlie Brown" size="md" />
                  <Avatar name="Diana Prince" size="lg" />
                </div>
                <AvatarGroup max={4} size="sm">
                  <Avatar name="Olivia Martin" />
                  <Avatar name="Jackson Lee" />
                  <Avatar name="Isabella Nguyen" />
                  <Avatar name="William Kim" />
                  <Avatar name="Sofia Davis" />
                </AvatarGroup>
              </div>
            </BentoCard>

            <BentoCard
              title="Keyboard Shortcuts"
              description="Kbd component"
              icon={Keyboard}
            >
              <div className="space-y-2">
                {[
                  {
                    keys: ["⌘", "K"],
                    label: "Command palette",
                  },
                  {
                    keys: ["⌘", "S"],
                    label: "Save changes",
                  },
                  {
                    keys: ["⌘", "⇧", "P"],
                    label: "Open settings",
                  },
                  { keys: ["Esc"], label: "Close dialog" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-muted-foreground">
                      {s.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((key) => (
                        <Kbd key={key} size="sm">
                          {key}
                        </Kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>

        {/* ── Row 7 — Form (3/6) + Skeleton+Progress+Spinner (3/6) ── */}
        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Form Controls"
            description="Inputs, selects, and toggles"
            icon={Edit}
          >
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="dash-name" className="text-xs">
                  Full name
                </Label>
                <Input id="dash-name" placeholder="John Doe" size="sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dash-email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="dash-email"
                  type="email"
                  placeholder="john@example.com"
                  size="sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dash-bio" className="text-xs">
                  Bio
                </Label>
                <Textarea
                  id="dash-bio"
                  placeholder="Tell us about yourself..."
                  rows={2}
                />
              </div>
            </div>
          </BentoCard>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="grid grid-rows-[1fr_auto] gap-3 h-full">
            <BentoCard
              title="Skeletons"
              description="Loading placeholders"
              icon={Layers}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SkeletonCircle size="md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-12 rounded-md" />
                  <Skeleton className="h-12 rounded-md" />
                  <Skeleton className="h-12 rounded-md" />
                </div>
              </div>
            </BentoCard>

            <div className="grid grid-cols-2 gap-3">
              <BentoCard title="Progress" icon={Activity}>
                <div className="space-y-2">
                  <Progress value={75} variant="primary" />
                  <Progress value={100} variant="success" />
                  <Progress value={25} variant="danger" />
                  <Progress indeterminate />
                </div>
              </BentoCard>

              <BentoCard title="Spinners" icon={Activity}>
                <div className="flex items-center justify-center gap-4 py-2">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </div>
              </BentoCard>
            </div>
          </div>
        </div>

        {/* ── Row 8 — Sidebar Preview (full width) ── */}
        <div className="col-span-6">
          <BentoCard
            title="Sidebar"
            description="Menu Color & Menu Accent preview"
            icon={Home}
          >
            <SidebarPreview />
          </BentoCard>
        </div>

        {/* ── Row 9 — Pagination (full width) ── */}
        <div className="col-span-6">
          <BentoCard
            title="Pagination"
            description="Page navigation"
            icon={ArrowRight}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                Showing 21–30 of 100 results
              </span>
              <Pagination totalPages={10} page={3} />
            </div>
          </BentoCard>
        </div>
      </div>
    </TooltipProvider>
  );
}
