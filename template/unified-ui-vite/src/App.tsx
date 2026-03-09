import {
  Alert,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Progress,
  Separator,
  Skeleton,
  SkeletonCircle,
  SkeletonRect,
  SkeletonText,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@work-rjkashyap/unified-ui";
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import {
  ArrowRight,
  Bell,
  Github,
  Package,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Hero */}
        <section className="space-y-4">
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
            This starter is pre-wired with{" "}
            <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
              @work-rjkashyap/unified-ui
            </code>
            . The{" "}
            <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
              DSThemeProvider
            </code>{" "}
            wraps your app, styles are imported in{" "}
            <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
              index.css
            </code>
            , and every component is ready to use. Edit{" "}
            <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
              src/App.tsx
            </code>{" "}
            to get started.
          </p>
          <div className="flex flex-wrap gap-2">
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
          </div>
        </section>

        <Separator />

        {/* Component Showcase */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-1">
              Component Showcase
            </h2>
            <p className="text-sm text-muted-foreground">
              A live preview of unified-ui components — all rendered from a
              single import.
            </p>
          </div>

          <Tabs defaultValue="form" variant="underline" size="sm">
            <TabsList>
              <TabsTrigger value="form">Form Controls</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="loading">Loading</TabsTrigger>
            </TabsList>

            {/* Form Controls */}
            <TabsContent value="form">
              <Card className="mt-4">
                <CardHeader bordered>
                  <p className="text-sm font-semibold">Form Controls</p>
                </CardHeader>
                <CardBody className="space-y-4 p-4">
                  <Input
                    label="Search"
                    placeholder="Search components…"
                    iconLeft={<Search className="size-3.5" />}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Switch label="Enable notifications" defaultChecked />
                    <Switch label="Marketing emails" />
                  </div>
                  <div className="space-y-2">
                    <Checkbox
                      label="I agree to the terms of service"
                      defaultChecked
                    />
                    <Checkbox label="Subscribe to the newsletter" />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button variant="primary" size="md">
                      Save Changes
                    </Button>
                    <Button variant="secondary" size="md">
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      loading
                      loadingText="Saving…"
                    />
                  </div>
                </CardBody>
              </Card>
            </TabsContent>

            {/* Feedback */}
            <TabsContent value="feedback">
              <Card className="mt-4">
                <CardHeader bordered>
                  <p className="text-sm font-semibold">Feedback Components</p>
                </CardHeader>
                <CardBody className="space-y-4 p-4">
                  <Alert variant="info" title="Info">
                    This is an informational alert. Use it to give users helpful
                    context.
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>Upload progress</span>
                      <span className="font-mono text-muted-foreground">
                        68%
                      </span>
                    </div>
                    <Progress value={68} variant="primary" size="md" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>Storage used</span>
                      <span className="font-mono text-muted-foreground">
                        92%
                      </span>
                    </div>
                    <Progress value={92} variant="danger" size="md" />
                  </div>
                  <Progress indeterminate size="sm" variant="primary" />
                </CardBody>
              </Card>
            </TabsContent>

            {/* Display */}
            <TabsContent value="display">
              <Card className="mt-4">
                <CardHeader bordered>
                  <p className="text-sm font-semibold">Display Components</p>
                </CardHeader>
                <CardBody className="space-y-5 p-4">
                  {/* Badges */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Badges
                    </p>
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
                  </div>

                  {/* Avatars */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Avatars
                    </p>
                    <div className="flex items-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar size="sm">
                              <AvatarImage
                                src="https://github.com/imrj05.png"
                                alt="imrj05"
                              />
                              <AvatarFallback>RK</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>imrj05</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar size="md">
                              <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>Alice B.</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar size="lg">
                              <AvatarFallback>CJ</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>Charlie J.</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Button variants */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Button Variants
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        iconLeft={<Zap className="size-3.5" />}
                      >
                        Primary
                      </Button>
                      <Button variant="secondary" size="sm">
                        Secondary
                      </Button>
                      <Button variant="ghost" size="sm">
                        Ghost
                      </Button>
                      <Button variant="danger" size="sm">
                        Danger
                      </Button>
                      <Button variant="primary" size="sm" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </TabsContent>

            {/* Loading */}
            <TabsContent value="loading">
              <Card className="mt-4">
                <CardHeader bordered>
                  <p className="text-sm font-semibold">
                    Skeleton Loading States
                  </p>
                </CardHeader>
                <CardBody className="space-y-4 p-4">
                  <p className="text-sm text-muted-foreground">
                    Built-in skeleton primitives that match your component
                    layouts out of the box.
                  </p>
                  {/* Profile skeleton */}
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
                      <SkeletonText lines={2} />
                      <div className="flex gap-2 pt-1">
                        <Skeleton shape="rect" width={80} height={32} />
                        <Skeleton shape="rect" width={80} height={32} />
                      </div>
                    </CardBody>
                  </Card>
                  {/* Notification skeleton */}
                  <div className="space-y-2">
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
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Quick start callout */}
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
                    @work-rjkashyap/unified-ui
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

      {/* Footer */}
      <footer className="border-t border-border mt-10 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
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
    <DSThemeProvider>
      <AppContent />
    </DSThemeProvider>
  );
}
