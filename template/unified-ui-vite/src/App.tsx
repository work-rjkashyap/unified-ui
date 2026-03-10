import type { ColumnDef } from "@tanstack/react-table";
import type { ThemeMode } from "@work-rjkashyap/unified-ui/theme";
import { DSThemeProvider, useDSTheme } from "@work-rjkashyap/unified-ui/theme";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  Bell,
  Bold,
  Copy,
  Edit,
  ExternalLink,
  File,
  Folder,
  Github,
  Info,
  Italic,
  Package,
  Search,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Underline,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Command, CommandTrigger } from "@/components/ui/command";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DataTable } from "@/components/ui/data-table";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageGallery } from "@/components/ui/image-gallery";
import { InfiniteScroll } from "@/components/ui/infinite-scroll";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Markdown } from "@/components/ui/markdown";
import { Pagination } from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonRect,
  SkeletonText,
} from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Stat } from "@/components/ui/stat";
import { Step, Steps } from "@/components/ui/steps";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { TreeView } from "@/components/ui/tree-view";
import { VideoPlayer } from "@/components/ui/video-player";
import { VirtualList } from "@/components/ui/virtual-list";

// ---------------------------------------------------------------------------
// Toast Demo — inner component that can call useToast
// ---------------------------------------------------------------------------
function ToastDemo() {
  const toast = useToast();
  return (
    <Card>
      <CardHeader bordered>
        <p className="text-sm font-semibold">Toast Notifications</p>
      </CardHeader>
      <CardBody className="space-y-4 p-4">
        <p className="text-sm text-muted-foreground">
          Animated, accessible toast notifications with four variants,
          configurable positions, and action buttons.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              toast.toast({
                description: "This is a default notification.",
              })
            }
          >
            Default
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              toast.success({
                title: "Saved!",
                description: "Your profile has been updated.",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              toast.warning({
                title: "Storage almost full",
                description: "You're at 92% of your limit.",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              toast.danger({
                title: "Failed to save",
                description: "Network error. Please try again.",
              })
            }
          >
            Danger
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              toast.info({
                title: "New version available",
                description: "Unified UI v0.4.0 is out.",
                action: {
                  label: "Update",
                  onClick: () => {},
                },
              })
            }
          >
            Info + Action
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Infinite Scroll Demo data helpers
// ---------------------------------------------------------------------------
function generateItems(start: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `Item #${start + i + 1}`,
    description: `Description for item ${start + i + 1}`,
  }));
}

// ---------------------------------------------------------------------------
// DataTable column defs
// ---------------------------------------------------------------------------
interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

const peopleData: Person[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Engineer",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Designer",
    status: "active",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    role: "Manager",
    status: "inactive",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    role: "Engineer",
    status: "pending",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    role: "Designer",
    status: "active",
  },
  {
    id: 6,
    name: "Frank Brown",
    email: "frank@example.com",
    role: "Engineer",
    status: "inactive",
  },
];

const peopleColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: { label: "Name" },
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: { label: "Email" },
  },
  {
    accessorKey: "role",
    header: "Role",
    meta: { label: "Role" },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { label: "Status" },
    cell: ({ row }) => {
      const s = row.original.status;
      const map = {
        active: "success",
        inactive: "default",
        pending: "warning",
      } as const;
      return (
        <Badge variant={map[s]} size="sm" dot>
          {s}
        </Badge>
      );
    },
  },
];

// ---------------------------------------------------------------------------
// TreeView nodes
// ---------------------------------------------------------------------------
const treeNodes = [
  {
    id: "src",
    label: "src",
    icon: <Folder className="size-4" />,
    children: [
      {
        id: "components",
        label: "components",
        icon: <Folder className="size-4" />,
        children: [
          {
            id: "button",
            label: "button.tsx",
            icon: <File className="size-4" />,
          },
          {
            id: "card",
            label: "card.tsx",
            icon: <File className="size-4" />,
          },
          {
            id: "input",
            label: "input.tsx",
            icon: <File className="size-4" />,
          },
        ],
      },
      {
        id: "lib",
        label: "lib",
        icon: <Folder className="size-4" />,
        children: [
          {
            id: "cn",
            label: "cn.ts",
            icon: <File className="size-4" />,
          },
          {
            id: "utils",
            label: "utils.ts",
            icon: <File className="size-4" />,
          },
        ],
      },
      {
        id: "app",
        label: "App.tsx",
        icon: <File className="size-4" />,
      },
      {
        id: "main",
        label: "main.tsx",
        icon: <File className="size-4" />,
      },
    ],
  },
  {
    id: "public",
    label: "public",
    icon: <Folder className="size-4" />,
    children: [
      {
        id: "favicon",
        label: "favicon.ico",
        icon: <File className="size-4" />,
      },
    ],
  },
  {
    id: "package",
    label: "package.json",
    icon: <File className="size-4" />,
  },
];

// ---------------------------------------------------------------------------
// Markdown sample content
// ---------------------------------------------------------------------------
const markdownSample = `# Unified UI

A **token-driven** component library for React. Every visual value — colors, radii, spacing, motion — comes from CSS custom properties.

## Features

- Full **dark mode** support via \`DSThemeProvider\`
- Built on *Radix UI* primitives
- Animated with ~~jQuery~~ **Framer Motion**
- WCAG AA accessible out of the box

## Installation

\`\`\`bash
npm install @work-rjkashyap/unified-ui
\`\`\`

## Quick Start

\`\`\`tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button variant="primary">Hello Unified UI</Button>;
}
\`\`\`

> Components are copy-paste friendly — no extra config required.

---

### Links

[Documentation](https://unified-ui.space/docs) · [GitHub](https://github.com/imrj05/unified-ui)
`;

// ---------------------------------------------------------------------------
// Virtual list data
// ---------------------------------------------------------------------------
const virtualItems = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: `User #${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Engineer", "Designer", "Manager", "Analyst"][i % 4],
}));

// ---------------------------------------------------------------------------
// Main AppContent
// ---------------------------------------------------------------------------
function AppContent() {
  const { theme, setTheme } = useDSTheme();

  // local state for interactive demos
  const [radioVal, setRadioVal] = useState("option-b");
  const [selectVal, setSelectVal] = useState("");
  const [sliderVal, setSliderVal] = useState([40]);
  const [rangeVal, setRangeVal] = useState([20, 75]);
  const [currentStep, setCurrentStep] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Combobox
  const [comboVal, setComboVal] = useState("");
  const [comboMulti, setComboMulti] = useState<string[]>([]);

  // DatePicker
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [rangeDate, setRangeDate] = useState<{
    from: Date;
    to?: Date;
  } | null>(null);

  // Calendar
  const [calDate, setCalDate] = useState<Date | undefined>(undefined);

  // Command palette
  const [cmdOpen, setCmdOpen] = useState(false);

  // ConfirmDialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmResult, setConfirmResult] = useState<
    "confirmed" | "cancelled" | null
  >(null);

  // Infinite scroll
  const [infiniteItems, setInfiniteItems] = useState(() =>
    generateItems(0, 10),
  );
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [infiniteHasMore, setInfiniteHasMore] = useState(true);
  const infiniteLoadMore = () => {
    if (infiniteLoading || !infiniteHasMore) return;
    setInfiniteLoading(true);
    setTimeout(() => {
      setInfiniteItems((prev) => {
        const next = generateItems(prev.length, 8);
        const all = [...prev, ...next];
        if (all.length >= 50) setInfiniteHasMore(false);
        return all;
      });
      setInfiniteLoading(false);
    }, 800);
  };

  const handleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setConfirmOpen(false);
      setConfirmResult("confirmed");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ------------------------------------------------------------------ */}
      {/* Nav                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-bold tracking-tight">
              unified-ui / vite
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm" dot>
              Ready
            </Badge>
            <ThemeToggle
              value={theme}
              onChange={(v) => setTheme(v as ThemeMode)}
              size="sm"
            />
            <a
              href="https://github.com/imrj05/unified-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                iconLeft={<Github className="size-3.5" />}
              >
                GitHub
              </Button>
            </a>
            <a href="https://unified-ui.space/docs">
              <Button
                variant="primary"
                size="sm"
                iconRight={<ArrowRight className="size-3.5" />}
              >
                Docs
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* ------------------------------------------------------------------ */}
        {/* Banner                                                               */}
        {/* ------------------------------------------------------------------ */}
        <Banner
          variant="primary"
          className="justify-between"
          dismissible
          icon={<Sparkles className="size-4" />}
          action={
            <a href="https://unified-ui.space/docs">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/20 border-white/30 border"
              >
                View docs
              </Button>
            </a>
          }
        >
          Unified UI v0.3.1 is out — new components, better tokens, full dark
          mode.
        </Banner>

        {/* ---------------------------------------------------------------- */}
        {/* Breadcrumb + Hero                                                 */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Showcase</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-4">
            <Badge
              variant="primary"
              size="sm"
              icon={<Package className="size-3" />}
            >
              @work-rjkashyap/unified-ui
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter">
              Vite + React + Unified UI
            </h1>
            <p className="text-base text-muted-foreground leading-7 max-w-xl">
              A complete component showcase. Every component below is imported
              from{" "}
              <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
                @/components/ui
              </code>{" "}
              — copy, paste, and build.
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <a href="https://unified-ui.space/docs">
                <Button
                  variant="primary"
                  size="md"
                  iconRight={<ArrowRight className="size-3.5" />}
                >
                  Read the Docs
                </Button>
              </a>
              <a href="https://unified-ui.space/components">
                <Button variant="secondary" size="md">
                  Browse Components
                </Button>
              </a>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Kbd size="sm">⌘</Kbd>
                <span>+</span>
                <Kbd size="sm">K</Kbd>
                <span className="ml-1">to search</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Stats row                                                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat
            label="Components"
            value={91}
            trend="up"
            trendLabel="+17 this release"
          />
          <Stat
            label="Bundle size"
            value="148"
            suffix=" kB"
            trend="down"
            trendLabel="−4% gzipped"
          />
          <Stat
            label="GitHub Stars"
            value={1240}
            trend="up"
            trendLabel="+80 this week"
          />
          <Stat
            label="Open issues"
            value={7}
            trend="neutral"
            trendLabel="No change"
          />
        </section>

        <Separator />

        {/* ---------------------------------------------------------------- */}
        {/* Component Showcase — tabbed                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-1">
              Component Showcase
            </h2>
            <p className="text-sm text-muted-foreground">
              Interactive previews of every Unified UI component, grouped by
              category.
            </p>
          </div>

          <Tabs defaultValue="form" variant="underline" size="sm">
            <TabsList className="flex-wrap">
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="pickers">Pickers</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="overlay">Overlay</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="loading">Loading</TabsTrigger>
            </TabsList>

            {/* ====================================================== */}
            {/* FORM TAB                                                  */}
            {/* ====================================================== */}
            <TabsContent value="form">
              <div className="mt-4 space-y-4">
                {/* Inputs */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Inputs & Textarea</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="search">Search</Label>
                      <Input
                        id="search"
                        placeholder="Search components…"
                        iconLeft={<Search className="size-3.5" />}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="input-error">Error state</Label>
                        <Input
                          id="input-error"
                          variant="error"
                          placeholder="Invalid value"
                          defaultValue="bad@"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="input-success">Success state</Label>
                        <Input
                          id="input-success"
                          variant="success"
                          placeholder="Looks good"
                          defaultValue="hello@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself…"
                        minRows={3}
                        showCount
                        maxLength={200}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="notes">Auto-resize notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Start typing — this grows automatically…"
                        autoResize
                        maxHeight={200}
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Select */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Select</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="framework-select">Framework</Label>
                        <Select value={selectVal} onValueChange={setSelectVal}>
                          <SelectTrigger id="framework-select">
                            <SelectValue placeholder="Pick a framework…" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="react">React</SelectItem>
                            <SelectItem value="vue">Vue</SelectItem>
                            <SelectItem value="svelte">Svelte</SelectItem>
                            <SelectItem value="solid">SolidJS</SelectItem>
                            <SelectItem value="angular">Angular</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="size-select">Size</Label>
                        <Select defaultValue="md">
                          <SelectTrigger id="size-select" size="md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sm">Small</SelectItem>
                            <SelectItem value="md">Medium</SelectItem>
                            <SelectItem value="lg">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {selectVal && (
                      <p className="text-xs text-muted-foreground">
                        Selected:{" "}
                        <span className="font-semibold text-foreground">
                          {selectVal}
                        </span>
                      </p>
                    )}
                  </CardBody>
                </Card>

                {/* Radio */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Radio Group</p>
                  </CardHeader>
                  <CardBody className="space-y-5 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Vertical
                        </p>
                        <RadioGroup
                          value={radioVal}
                          onValueChange={setRadioVal}
                        >
                          <RadioGroupItem
                            value="option-a"
                            label="Option A"
                            description="Best for small teams"
                          />
                          <RadioGroupItem
                            value="option-b"
                            label="Option B"
                            description="Most popular choice"
                          />
                          <RadioGroupItem
                            value="option-c"
                            label="Option C"
                            description="Enterprise-grade"
                          />
                          <RadioGroupItem
                            value="option-d"
                            label="Option D (disabled)"
                            disabled
                          />
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Horizontal
                        </p>
                        <RadioGroup
                          defaultValue="xs"
                          orientation="horizontal"
                          size="sm"
                        >
                          <RadioGroupItem value="xs" label="XS" />
                          <RadioGroupItem value="sm" label="SM" />
                          <RadioGroupItem value="md" label="MD" />
                          <RadioGroupItem value="lg" label="LG" />
                        </RadioGroup>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Selected:{" "}
                      <span className="font-semibold text-foreground">
                        {radioVal}
                      </span>
                    </p>
                  </CardBody>
                </Card>

                {/* Switch & Checkbox */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Switch & Checkbox</p>
                  </CardHeader>
                  <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Switches
                      </p>
                      <Switch label="Enable notifications" defaultChecked />
                      <Switch
                        label="Marketing emails"
                        description="Receive weekly product updates"
                      />
                      <Switch label="Auto-save" size="sm" defaultChecked />
                      <Switch label="Locked (disabled)" disabled />
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Checkboxes
                      </p>
                      <Checkbox
                        label="I agree to the terms of service"
                        checked
                      />
                      <Checkbox
                        label="Subscribe to newsletter"
                        description="Max one email per week"
                      />
                      <Checkbox label="Small size" size="sm" />
                      <Checkbox label="Disabled option" disabled />
                    </div>
                  </CardBody>
                </Card>

                {/* Slider */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Slider</p>
                  </CardHeader>
                  <CardBody className="space-y-6 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <Label>Volume</Label>
                        <span className="font-mono text-muted-foreground text-xs">
                          {sliderVal[0]}%
                        </span>
                      </div>
                      <Slider
                        value={sliderVal}
                        onValueChange={setSliderVal}
                        min={0}
                        max={100}
                        step={1}
                        showTooltip
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <Label>Price range</Label>
                        <span className="font-mono text-muted-foreground text-xs">
                          ${rangeVal[0]} – ${rangeVal[1]}
                        </span>
                      </div>
                      <Slider
                        value={rangeVal}
                        onValueChange={setRangeVal}
                        min={0}
                        max={200}
                        step={5}
                        variant="success"
                        showTooltip
                        formatTooltip={(v) => `$${v}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Steps (snap)</Label>
                      <Slider
                        defaultValue={[50]}
                        min={0}
                        max={100}
                        step={25}
                        showMarks
                        variant="primary"
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Toggle */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Toggle</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Text formatting
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Toggle
                          aria-label="Bold"
                          iconLeft={<Bold className="size-4" />}
                        />
                        <Toggle
                          aria-label="Italic"
                          iconLeft={<Italic className="size-4" />}
                          defaultPressed
                        />
                        <Toggle
                          aria-label="Underline"
                          iconLeft={<Underline className="size-4" />}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Alignment (outline variant)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Toggle
                          variant="outline"
                          aria-label="Align left"
                          iconLeft={<AlignLeft className="size-4" />}
                          defaultPressed
                        />
                        <Toggle
                          variant="outline"
                          aria-label="Align center"
                          iconLeft={<AlignCenter className="size-4" />}
                        />
                        <Toggle
                          variant="outline"
                          aria-label="Align right"
                          iconLeft={<AlignRight className="size-4" />}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        With label (ghost)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Toggle
                          variant="ghost"
                          iconLeft={<Star className="size-4" />}
                        >
                          Favourite
                        </Toggle>
                        <Toggle
                          variant="ghost"
                          iconLeft={<Bell className="size-3.5" />}
                        >
                          Notify me
                        </Toggle>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Buttons row */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Buttons</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        size="md"
                        iconLeft={<Zap className="size-3.5" />}
                      >
                        Primary
                      </Button>
                      <Button variant="secondary" size="md">
                        Secondary
                      </Button>
                      <Button variant="ghost" size="md">
                        Ghost
                      </Button>
                      <Button variant="danger" size="md">
                        Danger
                      </Button>
                      <Button variant="primary" size="md" disabled>
                        Disabled
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        loading
                        loadingText="Saving…"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="sm">
                        Small
                      </Button>
                      <Button variant="secondary" size="md">
                        Medium
                      </Button>
                      <Button variant="ghost" size="lg">
                        Large
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* PICKERS TAB — Combobox, Command, DatePicker, Calendar   */}
            {/* ====================================================== */}
            <TabsContent value="pickers">
              <div className="mt-4 space-y-4">
                {/* Combobox */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Combobox</p>
                  </CardHeader>
                  <CardBody className="space-y-5 p-4">
                    <p className="text-sm text-muted-foreground">
                      Searchable select with single and multi-select modes,
                      groups, and custom option rendering.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <Label>Single select (framework)</Label>
                        <Combobox
                          placeholder="Pick a framework…"
                          searchPlaceholder="Search frameworks…"
                          value={comboVal}
                          onSelect={(v) => setComboVal(v ?? "")}
                          options={[
                            {
                              value: "react",
                              label: "React",
                              description: "Meta / community",
                            },
                            {
                              value: "vue",
                              label: "Vue",
                              description: "Evan You",
                            },
                            {
                              value: "svelte",
                              label: "Svelte",
                              description: "Rich Harris",
                            },
                            {
                              value: "solid",
                              label: "SolidJS",
                              description: "Ryan Carniato",
                            },
                            {
                              value: "angular",
                              label: "Angular",
                              description: "Google",
                            },
                            {
                              value: "qwik",
                              label: "Qwik",
                              description: "Builder.io",
                              disabled: true,
                            },
                          ]}
                        />
                        {comboVal && (
                          <p className="text-xs text-muted-foreground">
                            Picked:{" "}
                            <span className="font-semibold text-foreground">
                              {comboVal}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label>Multi-select (technologies)</Label>
                        <Combobox
                          multi
                          placeholder="Select technologies…"
                          searchPlaceholder="Search…"
                          values={comboMulti}
                          onMultiSelect={(v) => setComboMulti(v)}
                          options={[
                            {
                              value: "ts",
                              label: "TypeScript",
                            },
                            {
                              value: "tailwind",
                              label: "Tailwind CSS",
                            },
                            {
                              value: "vite",
                              label: "Vite",
                            },
                            {
                              value: "radix",
                              label: "Radix UI",
                            },
                            {
                              value: "framer",
                              label: "Framer Motion",
                            },
                            {
                              value: "tanstack",
                              label: "TanStack",
                            },
                          ]}
                        />
                        {comboMulti.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Selected:{" "}
                            <span className="font-semibold text-foreground">
                              {comboMulti.join(", ")}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label>Small</Label>
                        <Combobox
                          size="sm"
                          placeholder="Small combobox"
                          options={[
                            {
                              value: "a",
                              label: "Option A",
                            },
                            {
                              value: "b",
                              label: "Option B",
                            },
                          ]}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Medium</Label>
                        <Combobox
                          size="md"
                          placeholder="Medium combobox"
                          options={[
                            {
                              value: "a",
                              label: "Option A",
                            },
                            {
                              value: "b",
                              label: "Option B",
                            },
                          ]}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Large</Label>
                        <Combobox
                          size="lg"
                          placeholder="Large combobox"
                          options={[
                            {
                              value: "a",
                              label: "Option A",
                            },
                            {
                              value: "b",
                              label: "Option B",
                            },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label>With groups</Label>
                      <Combobox
                        placeholder="Select a component…"
                        searchPlaceholder="Search components…"
                        options={[
                          {
                            value: "input",
                            label: "Input",
                            group: "form",
                          },
                          {
                            value: "select",
                            label: "Select",
                            group: "form",
                          },
                          {
                            value: "checkbox",
                            label: "Checkbox",
                            group: "form",
                          },
                          {
                            value: "card",
                            label: "Card",
                            group: "display",
                          },
                          {
                            value: "badge",
                            label: "Badge",
                            group: "display",
                          },
                          {
                            value: "avatar",
                            label: "Avatar",
                            group: "display",
                          },
                        ]}
                        groups={[
                          {
                            value: "form",
                            label: "Form",
                          },
                          {
                            value: "display",
                            label: "Display",
                          },
                        ]}
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Command */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Command Palette</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <p className="text-sm text-muted-foreground">
                      Keyboard-navigable command palette with search, groups,
                      shortcuts and animated transitions.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <CommandTrigger
                        onClick={() => setCmdOpen(true)}
                        label="Open Command Palette"
                      />
                    </div>
                    <Command
                      open={cmdOpen}
                      onOpenChange={setCmdOpen}
                      placeholder="Type a command or search…"
                      groups={[
                        {
                          heading: "Navigation",
                          items: [
                            {
                              id: "home",
                              label: "Go to Home",
                              icon: <Sparkles className="size-4" />,
                              shortcut: "GH",
                              onSelect: () => setCmdOpen(false),
                            },
                            {
                              id: "components",
                              label: "Browse Components",
                              icon: <Package className="size-4" />,
                              shortcut: "GC",
                              onSelect: () => setCmdOpen(false),
                            },
                            {
                              id: "docs",
                              label: "Open Documentation",
                              icon: <ExternalLink className="size-4" />,
                              onSelect: () => {
                                window.open(
                                  "https://unified-ui.space/docs",
                                  "_blank",
                                );
                                setCmdOpen(false);
                              },
                            },
                          ],
                        },
                        {
                          heading: "Actions",
                          items: [
                            {
                              id: "copy",
                              label: "Copy Install Command",
                              icon: <Copy className="size-4" />,
                              shortcut: "⌘C",
                              onSelect: () => {
                                navigator.clipboard.writeText(
                                  "npm i @work-rjkashyap/unified-ui",
                                );
                                setCmdOpen(false);
                              },
                            },
                            {
                              id: "github",
                              label: "Open GitHub",
                              icon: <Github className="size-4" />,
                              onSelect: () => {
                                window.open(
                                  "https://github.com/imrj05/unified-ui",
                                  "_blank",
                                );
                                setCmdOpen(false);
                              },
                            },
                          ],
                        },
                        {
                          heading: "Settings",
                          items: [
                            {
                              id: "theme",
                              label: "Toggle Theme",
                              icon: <Settings className="size-4" />,
                              shortcut: "⌘T",
                              onSelect: () => {
                                setTheme(theme === "dark" ? "light" : "dark");
                                setCmdOpen(false);
                              },
                            },
                          ],
                        },
                      ]}
                    />

                    {/* Additional trigger examples */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Trigger variants
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <CommandTrigger
                          onClick={() => setCmdOpen(true)}
                          label="Search commands…"
                        />
                        <CommandTrigger
                          onClick={() => setCmdOpen(true)}
                          label="⌘K to open"
                          className="w-40"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        The palette also opens with <Kbd size="sm">⌘</Kbd>
                        <span className="mx-0.5">+</span>
                        <Kbd size="sm">K</Kbd> anywhere on the page.
                      </p>
                    </div>
                  </CardBody>
                </Card>

                {/* DatePicker */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Date Picker</p>
                  </CardHeader>
                  <CardBody className="space-y-5 p-4">
                    <p className="text-sm text-muted-foreground">
                      Composable date and date-range picker built on Popover +
                      Calendar. Supports locale formatting, clear button, and
                      disabled dates.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <Label>Single date</Label>
                        <DatePicker
                          value={singleDate}
                          onSelect={setSingleDate}
                          placeholder="Pick a date"
                        />
                        {singleDate && (
                          <p className="text-xs text-muted-foreground">
                            Selected:{" "}
                            <span className="font-semibold text-foreground">
                              {singleDate.toLocaleDateString()}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label>Date range</Label>
                        <DatePicker
                          mode="range"
                          valueRange={rangeDate}
                          onSelectRange={setRangeDate}
                          placeholder="Pick a range"
                        />
                        {rangeDate && (
                          <p className="text-xs text-muted-foreground">
                            From:{" "}
                            <span className="font-semibold text-foreground">
                              {rangeDate.from.toLocaleDateString()}
                            </span>
                            {rangeDate.to && (
                              <>
                                {" "}
                                →{" "}
                                <span className="font-semibold text-foreground">
                                  {rangeDate.to.toLocaleDateString()}
                                </span>
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label>Small</Label>
                        <DatePicker size="sm" placeholder="Pick date" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Medium</Label>
                        <DatePicker size="md" placeholder="Pick date" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Large</Label>
                        <DatePicker size="lg" placeholder="Pick date" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Disabled past dates</Label>
                      <DatePicker
                        disabledDate={(d) => d < new Date()}
                        placeholder="Future dates only"
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Calendar */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Calendar</p>
                  </CardHeader>
                  <CardBody className="space-y-5 p-4">
                    <p className="text-sm text-muted-foreground">
                      Standalone calendar with single and range selection,
                      animated month transitions and keyboard navigation.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Single selection
                        </p>
                        <div className="rounded-lg border border-border overflow-hidden inline-block">
                          <Calendar
                            mode="single"
                            selected={calDate}
                            onSelect={setCalDate}
                          />
                        </div>
                        {calDate && (
                          <p className="text-xs text-muted-foreground">
                            Selected:{" "}
                            <span className="font-semibold text-foreground">
                              {calDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Range selection
                        </p>
                        <div className="rounded-lg border border-border overflow-hidden inline-block">
                          <Calendar
                            mode="range"
                            selectedRange={rangeDate ?? undefined}
                            onSelectRange={setRangeDate}
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* FEEDBACK TAB                                              */}
            {/* ====================================================== */}
            <TabsContent value="feedback">
              <div className="mt-4 space-y-4">
                {/* Alerts */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Alerts</p>
                  </CardHeader>
                  <CardBody className="space-y-3 p-4">
                    <Alert variant="info" title="Info">
                      This is an informational alert. Use it to give users
                      helpful context.
                    </Alert>
                    <Alert variant="success" title="Success">
                      Your changes have been saved successfully.
                    </Alert>
                    <Alert variant="warning" title="Warning">
                      This action is irreversible. Please double-check before
                      proceeding.
                    </Alert>
                    <Alert variant="danger" title="Error">
                      Something went wrong. Please try again later.
                    </Alert>
                  </CardBody>
                </Card>

                {/* Toast */}
                <ToastDemo />

                {/* ConfirmDialog */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Confirm Dialog</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <p className="text-sm text-muted-foreground">
                      Pre-composed confirm/cancel dialog built on AlertDialog
                      primitives. Supports danger variant and loading state.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <ConfirmDialog
                        trigger={
                          <Button variant="secondary" size="sm">
                            Default confirm
                          </Button>
                        }
                        title="Confirm action"
                        description="Are you sure you want to proceed? This will apply your changes."
                        confirmLabel="Yes, proceed"
                        onConfirm={() => setConfirmResult("confirmed")}
                        onCancel={() => setConfirmResult("cancelled")}
                      />

                      <ConfirmDialog
                        open={confirmOpen}
                        onOpenChange={setConfirmOpen}
                        trigger={
                          <Button
                            variant="danger"
                            size="sm"
                            iconLeft={<Trash2 className="size-3.5" />}
                          >
                            Delete record
                          </Button>
                        }
                        variant="danger"
                        title="Delete this record?"
                        description="This action is permanent and cannot be undone. All associated data will be removed."
                        confirmLabel="Yes, delete"
                        loading={confirmLoading}
                        onConfirm={handleConfirm}
                        onCancel={() => {
                          setConfirmOpen(false);
                          setConfirmResult("cancelled");
                        }}
                      />
                    </div>
                    {confirmResult && (
                      <Alert
                        variant={
                          confirmResult === "confirmed" ? "success" : "info"
                        }
                        title={
                          confirmResult === "confirmed"
                            ? "Confirmed!"
                            : "Cancelled"
                        }
                      >
                        {confirmResult === "confirmed"
                          ? "You confirmed the action."
                          : "You cancelled the dialog."}
                      </Alert>
                    )}
                  </CardBody>
                </Card>

                {/* Progress */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Progress</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    {[
                      {
                        label: "Upload",
                        value: 68,
                        variant: "primary" as const,
                        size: "md" as const,
                      },
                      {
                        label: "Storage",
                        value: 92,
                        variant: "danger" as const,
                        size: "md" as const,
                      },
                      {
                        label: "Battery",
                        value: 45,
                        variant: "success" as const,
                        size: "lg" as const,
                      },
                    ].map(({ label, value, variant, size }) => (
                      <div key={label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span>{label}</span>
                          <span className="font-mono text-muted-foreground text-xs">
                            {value}%
                          </span>
                        </div>
                        <Progress value={value} variant={variant} size={size} />
                      </div>
                    ))}
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium">Indeterminate</p>
                      <Progress indeterminate size="sm" variant="primary" />
                    </div>
                  </CardBody>
                </Card>

                {/* Spinners */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Spinners</p>
                  </CardHeader>
                  <CardBody className="p-4">
                    <div className="flex flex-wrap items-center gap-6">
                      <Spinner size="xs" />
                      <Spinner size="sm" />
                      <Spinner size="md" />
                      <Spinner size="lg" />
                      <Spinner size="md" variant="primary" label="Loading…" />
                      <Spinner
                        size="md"
                        variant="muted"
                        label="Please wait"
                        labelPosition="bottom"
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Badges extended */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Badges</p>
                  </CardHeader>
                  <CardBody className="space-y-3 p-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">Default</Badge>
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="success" dot>
                        Active
                      </Badge>
                      <Badge variant="warning">Beta</Badge>
                      <Badge variant="danger">Breaking</Badge>
                      <Badge variant="info">New</Badge>
                      <Badge variant="outline">MIT</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary" size="sm">
                        Small primary
                      </Badge>
                      <Badge variant="success" size="md">
                        Medium success
                      </Badge>
                      <Badge variant="danger" size="lg">
                        Large danger
                      </Badge>
                    </div>
                  </CardBody>
                </Card>

                {/* Kbd showcase */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Keyboard Shortcuts</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Kbd>⌘</Kbd>
                        <span>+</span>
                        <Kbd>K</Kbd>
                        <span className="ml-1.5">Command palette</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Kbd>⌘</Kbd>
                        <span>+</span>
                        <Kbd>S</Kbd>
                        <span className="ml-1.5">Save</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Kbd>Ctrl</Kbd>
                        <span>+</span>
                        <Kbd>Z</Kbd>
                        <span className="ml-1.5">Undo</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Kbd size="sm">Esc</Kbd>
                        <span className="ml-1.5">Close</span>
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* DISPLAY TAB                                               */}
            {/* ====================================================== */}
            <TabsContent value="display">
              <div className="mt-4 space-y-4">
                {/* Avatars */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Avatars</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Sizes
                      </p>
                      <div className="flex items-end gap-3">
                        <TooltipProvider>
                          {[
                            {
                              size: "xs" as const,
                              src: "https://github.com/imrj05.png",
                              alt: "imrj05",
                              tip: "imrj05 (xs)",
                            },
                            {
                              size: "sm" as const,
                              name: "Alice B.",
                              tip: "Alice B. (sm)",
                            },
                            {
                              size: "md" as const,
                              name: "Charlie J.",
                              tip: "Charlie J. (md)",
                            },
                            {
                              size: "lg" as const,
                              name: "Diana K.",
                              tip: "Diana K. (lg)",
                            },
                            {
                              size: "xl" as const,
                              name: "Evan M.",
                              tip: "Evan M. (xl)",
                            },
                          ].map(({ size, src, alt, name, tip }) => (
                            <Tooltip key={size} content={tip}>
                              <Avatar
                                size={size}
                                src={src}
                                alt={alt}
                                name={name}
                              />
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        With status
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar name="Online" size="md" status="online" />
                        <Avatar name="Busy" size="md" status="busy" />
                        <Avatar name="Away" size="md" status="away" />
                        <Avatar name="Offline" size="md" status="offline" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Square shape
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar name="Square SM" size="sm" shape="square" />
                        <Avatar name="Square MD" size="md" shape="square" />
                        <Avatar name="Square LG" size="lg" shape="square" />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Accordion */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Accordion</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Single (collapsible)
                      </p>
                      <Accordion type="single" {...{ collapsible: true }}>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            What is Unified UI?
                          </AccordionTrigger>
                          <AccordionContent>
                            Unified UI is a token-driven component library for
                            React. Every visual value — colors, radii, spacing,
                            motion — comes from CSS custom properties.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            Does it support dark mode?
                          </AccordionTrigger>
                          <AccordionContent>
                            Yes. The{" "}
                            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                              DSThemeProvider
                            </code>{" "}
                            manages a{" "}
                            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                              .dark
                            </code>{" "}
                            class on{" "}
                            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                              {"<html>"}
                            </code>
                            . All tokens flip automatically.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Is it accessible?</AccordionTrigger>
                          <AccordionContent>
                            All interactive components are built on Radix UI
                            primitives with full keyboard navigation, focus
                            management, and ARIA semantics.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardBody>
                </Card>

                {/* Markdown */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Markdown</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Renders markdown strings with design-system prose styles.
                      Supports headings, lists, code blocks, blockquotes, bold,
                      italic, links, and more — no external library needed.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Base size (fluid)
                        </p>
                        <div className="rounded-lg border border-border bg-muted/30 p-4 overflow-auto max-h-80">
                          <Markdown content={markdownSample} fluid />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Small size
                        </p>
                        <div className="rounded-lg border border-border bg-muted/30 p-4 overflow-auto max-h-80">
                          <Markdown
                            content={`## Small Markdown\n\nThis uses the **sm** size variant.\n\n- Compact text\n- Still styled\n- \`inline code\` too\n\n> A small blockquote`}
                            size="sm"
                            fluid
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* TreeView */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Tree View</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-5">
                    <p className="text-sm text-muted-foreground">
                      Collapsible, animated tree with keyboard navigation,
                      checkboxes, custom icons, and multi-select.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          File system (expandable)
                        </p>
                        <TreeView
                          items={treeNodes}
                          defaultExpanded={["src", "components"]}
                          showLines
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          With checkboxes
                        </p>
                        <TreeView
                          items={treeNodes}
                          defaultExpanded={["src"]}
                          checkable
                          showLines
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Image Gallery */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Image Gallery</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Responsive grid with lightbox viewer, zoom, thumbnail
                      strip, and keyboard navigation (← → Esc).
                    </p>
                    <ImageGallery
                      columns={3}
                      images={[
                        {
                          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                          alt: "Mountain landscape",
                          caption: "Swiss Alps at sunset",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
                          alt: "Forest path",
                          caption: "A walk through the woods",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400",
                          alt: "Ocean waves",
                          caption: "Pacific coast, California",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
                          alt: "Starry night mountains",
                          caption: "Milky Way above the peaks",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
                          alt: "Aerial landscape",
                          caption: "Bird's eye view",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400",
                          alt: "Waterfall",
                          caption: "Hidden waterfall, Iceland",
                        },
                      ]}
                    />
                  </CardBody>
                </Card>

                {/* Cards */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Card Variants</p>
                  </CardHeader>
                  <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    <Card variant="default">
                      <CardBody className="p-4">
                        <p className="text-sm font-medium">Default card</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Subtle background with border.
                        </p>
                      </CardBody>
                      <CardFooter bordered align="end">
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                        <Button variant="primary" size="sm">
                          Confirm
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card variant="elevated">
                      <CardBody className="p-4">
                        <p className="text-sm font-medium">Elevated card</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Raised with shadow.
                        </p>
                      </CardBody>
                      <CardFooter bordered align="between">
                        <span className="text-xs text-muted-foreground">
                          Step 2 of 4
                        </span>
                        <Button variant="primary" size="sm">
                          Next
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card variant="outlined">
                      <CardBody className="p-4">
                        <p className="text-sm font-medium">Outlined card</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Transparent background, strong border.
                        </p>
                      </CardBody>
                    </Card>
                    <Card variant="interactive" as="button">
                      <CardBody className="p-4">
                        <p className="text-sm font-medium">Interactive card</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Hover to see lift animation.
                        </p>
                      </CardBody>
                    </Card>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* DATA TAB — Table, DataTable, VirtualList, InfiniteScroll */}
            {/* ====================================================== */}
            <TabsContent value="data">
              <div className="mt-4 space-y-4">
                {/* Basic Table */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Table</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-5">
                    <p className="text-sm text-muted-foreground">
                      Design-system styled HTML table with density variants,
                      striped rows, hover states, and sticky headers.
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Default (hoverable + striped)
                        </p>
                        <Table striped hoverable density="comfortable">
                          <TableCaption>Team members roster</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead align="right">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {peopleData.slice(0, 4).map((p) => (
                              <TableRow key={p.id}>
                                <TableCell className="font-medium">
                                  {p.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {p.email}
                                </TableCell>
                                <TableCell>{p.role}</TableCell>
                                <TableCell align="right">
                                  <Badge
                                    variant={
                                      p.status === "active"
                                        ? "success"
                                        : p.status === "pending"
                                          ? "warning"
                                          : "default"
                                    }
                                    size="sm"
                                    dot
                                  >
                                    {p.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Compact density + bordered
                        </p>
                        <Table density="compact" bordered>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Key</TableHead>
                              <TableHead>Value</TableHead>
                              <TableHead>Type</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[
                              {
                                key: "name",
                                value: "unified-ui-vite",
                                type: "string",
                              },
                              {
                                key: "version",
                                value: "0.3.1",
                                type: "string",
                              },
                              {
                                key: "private",
                                value: "true",
                                type: "boolean",
                              },
                              {
                                key: "components",
                                value: "91",
                                type: "number",
                              },
                            ].map((row) => (
                              <TableRow key={row.key}>
                                <TableCell className="font-mono text-xs">
                                  {row.key}
                                </TableCell>
                                <TableCell className="font-mono text-xs text-primary">
                                  {row.value}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" size="sm">
                                    {row.type}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* DataTable */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Data Table</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Full-featured data table powered by TanStack Table —
                      sorting, filtering, pagination, row selection, column
                      visibility and more.
                    </p>
                    <DataTable
                      columns={peopleColumns}
                      data={peopleData}
                      filtering
                      showGlobalFilter
                      pagination
                      pageSize={5}
                      rowSelection="multi"
                      sorting
                      density="comfortable"
                      striped
                      hoverable
                    />
                  </CardBody>
                </Card>

                {/* Virtual List */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Virtual List</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Renders 500 rows while keeping only visible items in the
                      DOM. Dramatically reduces memory and layout cost for large
                      datasets.
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          500 rows — only visible items rendered
                        </p>
                        <Badge variant="primary" size="sm">
                          500 items
                        </Badge>
                      </div>
                      <VirtualList
                        items={virtualItems}
                        itemHeight={52}
                        height={300}
                        overscan={5}
                        getItemKey={(item) => item.id}
                        renderItem={(item) => (
                          <div className="flex items-center gap-3 px-4 w-full">
                            <Avatar name={item.name} size="sm" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground leading-tight truncate">
                                {item.email}
                              </p>
                            </div>
                            <Badge variant="outline" size="sm">
                              {item.role}
                            </Badge>
                          </div>
                        )}
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Infinite Scroll */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Infinite Scroll</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Scroll-triggered loading via IntersectionObserver. Appends
                      items as you reach the bottom of the list. Stops at 50
                      items.
                    </p>
                    <div className="rounded-lg border border-border overflow-auto max-h-64 p-1">
                      <InfiniteScroll
                        loading={infiniteLoading}
                        hasMore={infiniteHasMore}
                        onLoadMore={infiniteLoadMore}
                        threshold="50px"
                        endMessage={
                          <p className="text-center text-sm text-muted-foreground py-4 font-medium">
                            All 50 items loaded 🎉
                          </p>
                        }
                      >
                        <div className="space-y-1 p-1">
                          {infiniteItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted/60 transition-colors"
                            >
                              <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                                {item.id}
                              </div>
                              <div>
                                <p className="text-sm font-medium leading-tight">
                                  {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </InfiniteScroll>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Spinner size="xs" />
                      <span>
                        Loaded{" "}
                        <span className="font-semibold text-foreground">
                          {infiniteItems.length}
                        </span>{" "}
                        / 50 items
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* OVERLAY TAB                                               */}
            {/* ====================================================== */}
            <TabsContent value="overlay">
              <div className="mt-4 space-y-4">
                {/* Dialog */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Dialog / Modal</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Focus-trapped, animated, accessible modals in four sizes.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as const).map((size) => (
                        <Dialog key={size}>
                          <DialogTrigger asChild>
                            <Button variant="secondary" size="sm">
                              Open {size.toUpperCase()}
                            </Button>
                          </DialogTrigger>
                          <DialogContent size={size}>
                            <DialogHeader>
                              <DialogTitle>
                                {size.toUpperCase()} Dialog
                              </DialogTitle>
                              <DialogDescription>
                                This is a {size} dialog. It's focus-trapped,
                                animated with Framer Motion, and fully
                                accessible.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogBody>
                              <div className="space-y-3">
                                <div className="space-y-1.5">
                                  <Label htmlFor={`dlg-name-${size}`}>
                                    Full name
                                  </Label>
                                  <Input
                                    id={`dlg-name-${size}`}
                                    placeholder="Jane Doe"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor={`dlg-email-${size}`}>
                                    Email
                                  </Label>
                                  <Input
                                    id={`dlg-email-${size}`}
                                    type="email"
                                    placeholder="jane@example.com"
                                  />
                                </div>
                              </div>
                            </DialogBody>
                            <DialogFooter>
                              <Button variant="ghost" size="sm">
                                Cancel
                              </Button>
                              <Button variant="primary" size="sm">
                                Save
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ))}

                      {/* Controlled dialog */}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setDialogOpen(true)}
                      >
                        Controlled dialog
                      </Button>
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent size="sm">
                          <DialogHeader>
                            <DialogTitle>Controlled Dialog</DialogTitle>
                            <DialogDescription>
                              Opened via external state.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogBody>
                            <Alert variant="info" title="Note">
                              This dialog was opened by setting{" "}
                              <code className="font-mono text-xs">
                                dialogOpen = true
                              </code>
                              .
                            </Alert>
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setDialogOpen(false)}
                            >
                              Got it
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardBody>
                </Card>

                {/* Context Menu */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Context Menu</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Right-click (or long-press) context menu with labels,
                      items, shortcuts, separators, and nested sub-menus.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ContextMenu>
                        <ContextMenuTrigger>
                          <div className="h-28 rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-context-menu select-none hover:bg-muted/50 transition-colors">
                            <p className="text-sm text-muted-foreground font-medium">
                              Right-click here
                            </p>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuLabel>File actions</ContextMenuLabel>
                          <ContextMenuSeparator />
                          <ContextMenuItem icon={<Edit className="size-4" />}>
                            Edit
                            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                          </ContextMenuItem>
                          <ContextMenuItem icon={<Copy className="size-4" />}>
                            Duplicate
                            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuSub>
                            <ContextMenuSubTrigger
                              icon={<ExternalLink className="size-4" />}
                            >
                              Share
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent>
                              <ContextMenuItem>Copy link</ContextMenuItem>
                              <ContextMenuItem>Send via email</ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuItem>Export as PDF</ContextMenuItem>
                            </ContextMenuSubContent>
                          </ContextMenuSub>
                          <ContextMenuSeparator />
                          <ContextMenuItem
                            variant="danger"
                            icon={<Trash2 className="size-4" />}
                          >
                            Delete
                            <ContextMenuShortcut>⌫</ContextMenuShortcut>
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>

                      <ContextMenu>
                        <ContextMenuTrigger>
                          <div className="h-28 rounded-lg border border-border bg-card flex items-center justify-center gap-3 cursor-context-menu select-none hover:bg-muted/30 transition-colors">
                            <Avatar name="Jane Doe" size="md" status="online" />
                            <div>
                              <p className="text-sm font-semibold">Jane Doe</p>
                              <p className="text-xs text-muted-foreground">
                                Right-click for options
                              </p>
                            </div>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuLabel>jane@example.com</ContextMenuLabel>
                          <ContextMenuSeparator />
                          <ContextMenuItem icon={<Edit className="size-4" />}>
                            Edit profile
                          </ContextMenuItem>
                          <ContextMenuItem
                            icon={<Settings className="size-4" />}
                          >
                            Manage permissions
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem
                            variant="danger"
                            icon={<Trash2 className="size-4" />}
                          >
                            Remove user
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </div>
                  </CardBody>
                </Card>

                {/* Popover */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Popover</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Lightweight floating panels anchored to a trigger.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="secondary" size="sm">
                            Default popover
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <p className="text-sm font-semibold mb-1">
                            Quick info
                          </p>
                          <p className="text-xs text-muted-foreground">
                            This popover dismisses on outside click or Escape.
                          </p>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="secondary" size="sm">
                            With close + arrow
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent showClose arrow side="top">
                          <p className="text-sm font-semibold mb-1">
                            Settings panel
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Use the ✕ button or click outside to dismiss.
                          </p>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconLeft={<Settings className="size-3.5" />}
                          >
                            Settings
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" align="start" showClose>
                          <div className="space-y-3">
                            <p className="text-sm font-semibold">Preferences</p>
                            <Switch label="Compact mode" size="sm" />
                            <Switch
                              label="Auto-save"
                              size="sm"
                              defaultChecked
                            />
                            <Switch label="Analytics" size="sm" />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardBody>
                </Card>

                {/* Tooltip extended */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Tooltips</p>
                  </CardHeader>
                  <CardBody className="p-4">
                    <TooltipProvider>
                      <div className="flex flex-wrap gap-3">
                        {(["top", "right", "bottom", "left"] as const).map(
                          (side) => (
                            <Tooltip
                              key={side}
                              content={`Tooltip on ${side}`}
                              side={side}
                            >
                              <Button variant="secondary" size="sm">
                                {side}
                              </Button>
                            </Tooltip>
                          ),
                        )}
                        <Tooltip
                          content={
                            <span className="flex items-center gap-1.5">
                              <Info className="size-3.5" />
                              Rich content tooltip
                            </span>
                          }
                        >
                          <Button
                            variant="secondary"
                            size="sm"
                            iconLeft={<Info className="size-3.5" />}
                          >
                            Rich tooltip
                          </Button>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* NAVIGATION TAB                                            */}
            {/* ====================================================== */}
            <TabsContent value="navigation">
              <div className="mt-4 space-y-4">
                {/* Steps */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Steps / Wizard</p>
                  </CardHeader>
                  <CardBody className="space-y-6 p-4">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Horizontal (clickable)
                      </p>
                      <Steps
                        currentStep={currentStep}
                        onStepClick={setCurrentStep}
                      >
                        <Step
                          title="Account"
                          description="Create credentials"
                        />
                        <Step title="Profile" description="Personal details" />
                        <Step title="Billing" description="Payment method" />
                        <Step title="Confirm" description="Review & submit" />
                      </Steps>
                      <div className="flex gap-2 pt-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={currentStep === 0}
                          onClick={() =>
                            setCurrentStep((s) => Math.max(0, s - 1))
                          }
                        >
                          Back
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={currentStep === 3}
                          onClick={() =>
                            setCurrentStep((s) => Math.min(3, s + 1))
                          }
                        >
                          Next
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Vertical
                        </p>
                        <Steps currentStep={1} orientation="vertical">
                          <Step
                            title="Download"
                            description="Get the package"
                          />
                          <Step title="Install" description="Run npm install" />
                          <Step
                            title="Configure"
                            description="Set up your theme"
                          />
                        </Steps>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Dots variant
                        </p>
                        <Steps currentStep={2} variant="dots">
                          <Step title="Step 1" />
                          <Step title="Step 2" />
                          <Step title="Step 3" />
                          <Step title="Step 4" />
                        </Steps>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Pagination */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Pagination</p>
                  </CardHeader>
                  <CardBody className="space-y-5 p-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Default (full)
                      </p>
                      <Pagination totalPages={20} defaultPage={5} size="md" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Compact
                      </p>
                      <Pagination
                        totalPages={50}
                        defaultPage={12}
                        variant="compact"
                        size="sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Small size, extra siblings
                      </p>
                      <Pagination
                        totalPages={10}
                        defaultPage={3}
                        size="sm"
                        siblings={2}
                        boundary={2}
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Breadcrumb */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Breadcrumb</p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Composable API
                      </p>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/products">
                              Products
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/products/ui">
                              UI Libraries
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage>Unified UI</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Custom separator
                      </p>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/">Docs</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>/</BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/components">
                              Components
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>/</BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                  </CardBody>
                </Card>

                {/* Tabs variants */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Tab Variants</p>
                  </CardHeader>
                  <CardBody className="space-y-5 p-4">
                    {(["underline", "pills", "enclosed"] as const).map(
                      (variant) => (
                        <div key={variant} className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                            {variant}
                          </p>
                          <Tabs defaultValue="a" variant={variant} size="sm">
                            <TabsList>
                              <TabsTrigger value="a">Overview</TabsTrigger>
                              <TabsTrigger value="b">Analytics</TabsTrigger>
                              <TabsTrigger value="c">Settings</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                      ),
                    )}
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* MEDIA TAB — VideoPlayer, ImageGallery (extra)            */}
            {/* ====================================================== */}
            <TabsContent value="media">
              <div className="mt-4 space-y-4">
                {/* Video Player */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Video Player</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-5">
                    <p className="text-sm text-muted-foreground">
                      Custom-styled video player with play/pause, seek, mute,
                      volume, and fullscreen controls. Keyboard shortcuts:{" "}
                      <Kbd size="sm">Space</Kbd> play/pause,{" "}
                      <Kbd size="sm">M</Kbd> mute, <Kbd size="sm">F</Kbd>{" "}
                      fullscreen, <Kbd size="sm">← →</Kbd> seek ±5s.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          16:9 (default)
                        </p>
                        <VideoPlayer
                          src="https://www.w3schools.com/html/mov_bbb.mp4"
                          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Loop + muted autoplay
                        </p>
                        <VideoPlayer
                          src="https://www.w3schools.com/html/mov_bbb.mp4"
                          aspectRatio="4/3"
                          loop
                          muted
                          autoPlay
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Image Gallery (detailed) */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">
                      Image Gallery — 4 Columns
                    </p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Click any image to open the lightbox. Use{" "}
                      <Kbd size="sm">← →</Kbd> to navigate,{" "}
                      <Kbd size="sm">Esc</Kbd> to close, and the zoom button to
                      scale the image.
                    </p>
                    <ImageGallery
                      columns={4}
                      aspectRatio="video"
                      images={[
                        {
                          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
                          alt: "Sunlit forest",
                          caption: "Morning light through the trees",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400",
                          alt: "Snowy mountain",
                          caption: "Winter peaks",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400",
                          alt: "Desert dunes",
                          caption: "Sahara, Morocco",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
                          alt: "Tropical beach",
                          caption: "Maldives",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
                          alt: "Rocky cliffs",
                          caption: "Yosemite valley",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400",
                          alt: "Lavender fields",
                          caption: "Provence, France",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400",
                          alt: "Northern lights",
                          caption: "Aurora borealis, Norway",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800",
                          thumbnail:
                            "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400",
                          alt: "Autumn forest",
                          caption: "Fall colors, New England",
                        },
                      ]}
                    />
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* LAYOUT TAB — Separator, Resizable                        */}
            {/* ====================================================== */}
            <TabsContent value="layout">
              <div className="mt-4 space-y-4">
                {/* Separator */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Separator</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Visual dividers with variants, labels, orientations, and
                      spacing controls.
                    </p>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                        Variants
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Default</p>
                        <Separator variant="default" spacing={2} />
                        <p className="text-xs text-muted-foreground">Muted</p>
                        <Separator variant="muted" spacing={2} />
                        <p className="text-xs text-muted-foreground">Dashed</p>
                        <Separator variant="dashed" spacing={2} />
                        <p className="text-xs text-muted-foreground">
                          Gradient
                        </p>
                        <Separator variant="gradient" spacing={2} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        With label
                      </p>
                      <Separator label="OR" spacing={2} />
                      <Separator label="Continue with" spacing={2} />
                      <Separator
                        label={
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Sparkles className="size-3" />
                            New section
                          </span>
                        }
                        spacing={2}
                      />
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Vertical (in flex row)
                      </p>
                      <div className="flex items-center gap-4 h-8">
                        <span className="text-sm text-muted-foreground">
                          Item one
                        </span>
                        <Separator orientation="vertical" spacing={0} />
                        <span className="text-sm text-muted-foreground">
                          Item two
                        </span>
                        <Separator orientation="vertical" spacing={0} />
                        <span className="text-sm text-muted-foreground">
                          Item three
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Resizable */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Resizable Panels</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-5">
                    <p className="text-sm text-muted-foreground">
                      Drag the handle to resize panels. Built on{" "}
                      <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                        react-resizable-panels
                      </code>{" "}
                      with design-system styling and grip handle.
                    </p>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Horizontal split
                      </p>
                      <div className="h-36 rounded-lg border border-border overflow-hidden">
                        <ResizablePanelGroup direction="horizontal">
                          <ResizablePanel defaultSize={35} minSize={20}>
                            <div className="h-full flex items-center justify-center bg-muted/30 p-4">
                              <div className="text-center">
                                <Folder className="size-6 text-muted-foreground mx-auto mb-1" />
                                <p className="text-xs text-muted-foreground font-medium">
                                  Sidebar
                                </p>
                              </div>
                            </div>
                          </ResizablePanel>
                          <ResizableHandle withHandle />
                          <ResizablePanel defaultSize={65}>
                            <div className="h-full flex items-center justify-center bg-background p-4">
                              <div className="text-center">
                                <File className="size-6 text-muted-foreground mx-auto mb-1" />
                                <p className="text-xs text-muted-foreground font-medium">
                                  Main content
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Drag the handle to resize
                                </p>
                              </div>
                            </div>
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Three-pane layout
                      </p>
                      <div className="h-40 rounded-lg border border-border overflow-hidden">
                        <ResizablePanelGroup direction="horizontal">
                          <ResizablePanel defaultSize={20} minSize={15}>
                            <div className="h-full flex items-center justify-center bg-muted/40 p-3">
                              <p className="text-xs text-muted-foreground font-medium text-center">
                                Nav
                              </p>
                            </div>
                          </ResizablePanel>
                          <ResizableHandle withHandle />
                          <ResizablePanel defaultSize={55}>
                            <ResizablePanelGroup direction="vertical">
                              <ResizablePanel defaultSize={60}>
                                <div className="h-full flex items-center justify-center bg-background p-3">
                                  <p className="text-xs text-muted-foreground font-medium">
                                    Editor
                                  </p>
                                </div>
                              </ResizablePanel>
                              <ResizableHandle withHandle />
                              <ResizablePanel defaultSize={40}>
                                <div className="h-full flex items-center justify-center bg-muted/20 p-3">
                                  <p className="text-xs text-muted-foreground font-medium">
                                    Terminal
                                  </p>
                                </div>
                              </ResizablePanel>
                            </ResizablePanelGroup>
                          </ResizablePanel>
                          <ResizableHandle withHandle />
                          <ResizablePanel defaultSize={25} minSize={15}>
                            <div className="h-full flex items-center justify-center bg-muted/40 p-3">
                              <p className="text-xs text-muted-foreground font-medium text-center">
                                Inspector
                              </p>
                            </div>
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>

            {/* ====================================================== */}
            {/* LOADING TAB                                               */}
            {/* ====================================================== */}
            <TabsContent value="loading">
              <div className="mt-4 space-y-4">
                {/* Skeletons */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">
                      Skeleton Loading States
                    </p>
                  </CardHeader>
                  <CardBody className="space-y-4 p-4">
                    {/* Profile card skeleton */}
                    <Card className="bg-muted/30">
                      <CardBody className="space-y-3 p-4">
                        <div className="flex items-center gap-3">
                          <SkeletonCircle size="md" />
                          <div className="flex-1 space-y-1.5">
                            <Skeleton shape="text" className="w-1/3" />
                            <Skeleton shape="text" className="w-1/2" />
                          </div>
                          <Skeleton shape="rect" width={60} height={24} />
                        </div>
                        <SkeletonRect width="100%" height={80} />
                        <SkeletonText lines={3} />
                        <div className="flex gap-2 pt-1">
                          <Skeleton shape="rect" width={80} height={32} />
                          <Skeleton shape="rect" width={80} height={32} />
                        </div>
                      </CardBody>
                    </Card>

                    {/* Notification list skeleton */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Notification list
                      </p>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                        >
                          <SkeletonCircle size="sm" />
                          <div className="flex-1 space-y-1.5">
                            <Skeleton shape="text" className="w-2/5" />
                            <Skeleton shape="text" className="w-3/5" />
                          </div>
                          <Skeleton shape="rect" width={40} height={20} />
                        </div>
                      ))}
                    </div>

                    {/* Stats skeleton */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        Stats grid
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="rounded-lg border border-border bg-card p-3 space-y-2"
                          >
                            <Skeleton shape="text" className="w-3/4" />
                            <Skeleton shape="rect" height={28} />
                            <Skeleton shape="text" className="w-1/2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Spinner variants */}
                <Card>
                  <CardHeader bordered>
                    <p className="text-sm font-semibold">Spinner Variants</p>
                  </CardHeader>
                  <CardBody className="p-4 space-y-4">
                    <div className="flex flex-wrap items-center gap-6">
                      <Spinner size="md" variant="default" label="Loading" />
                      <Spinner size="md" variant="primary" label="Uploading" />
                      <Spinner
                        size="md"
                        variant="secondary"
                        label="Processing"
                      />
                      <Spinner size="md" variant="muted" label="Please wait" />
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <Spinner
                        size="lg"
                        variant="primary"
                        label="Loading data…"
                        labelPosition="bottom"
                      />
                      <Spinner
                        size="lg"
                        variant="muted"
                        label="Syncing…"
                        labelPosition="bottom"
                      />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Separator + quick-start callout                                      */}
        {/* ------------------------------------------------------------------ */}
        <Separator />

        <section>
          <Card className="border-primary/20 bg-primary/5">
            <CardBody className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                <Bell className="size-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold mb-0.5">
                  You&apos;re all set!
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  The theme provider, styles, and all components are ready.
                  Start building by importing from{" "}
                  <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                    @/components/ui
                  </code>
                  .
                </p>
              </div>
              <a href="https://unified-ui.space/docs" className="shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  iconRight={<ArrowRight className="size-3.5" />}
                >
                  Get Started
                </Button>
              </a>
            </CardBody>
          </Card>
        </section>
      </main>

      {/* -------------------------------------------------------------------- */}
      {/* Footer                                                                 */}
      {/* -------------------------------------------------------------------- */}
      <footer className="border-t border-border mt-10 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            Built with{" "}
            <a
              href="https://unified-ui.space"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Unified UI
            </a>{" "}
            &amp; Vite
          </p>
          <div className="flex items-center gap-3">
            <Badge variant="outline" size="sm" className="font-mono">
              v0.3.1
            </Badge>
            <Badge variant="success" size="sm" dot>
              MIT
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <DSThemeProvider manageHtmlClass>
      <ToastProvider position="top-right" maxVisible={5}>
        <AppContent />
      </ToastProvider>
    </DSThemeProvider>
  );
}
