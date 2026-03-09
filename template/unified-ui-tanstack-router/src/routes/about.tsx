import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Separator,
} from "@work-rjkashyap/unified-ui";
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Layers,
  Package,
  Sparkles,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Back link */}
        <div>
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              iconLeft={<ArrowLeft className="size-3.5" />}
            >
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero */}
        <section className="space-y-4">
          <Badge
            variant="primary"
            size="sm"
            icon={<Sparkles className="size-3" />}
          >
            About This Starter
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter">
            A minimal starter with room to grow.
          </h1>
          <p className="text-base text-muted-foreground leading-7 max-w-2xl">
            This template pairs{" "}
            <a
              href="https://tanstack.com/router"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2 decoration-border hover:text-primary hover:decoration-primary/50 transition-colors"
            >
              TanStack Router
            </a>{" "}
            — type-safe, file-based routing for React — with{" "}
            <a
              href="https://unified-ui.space"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2 decoration-border hover:text-primary hover:decoration-primary/50 transition-colors"
            >
              Unified UI
            </a>
            , a token-driven design system built on Radix UI and Tailwind CSS
            v4. Use it as a clean foundation, then layer in your own routes,
            data fetching, and customizations.
          </p>
        </section>

        <Separator />

        {/* What's included */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">What's included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: Package,
                title: "@work-rjkashyap/unified-ui",
                description:
                  "75+ production-ready components, design tokens, a theme provider, motion presets, and utilities — all in one versioned npm package.",
                badge: "design system" as const,
                badgeVariant: "primary" as const,
              },
              {
                icon: Layers,
                title: "TanStack Router",
                description:
                  "100% type-safe routing with file-based route generation, nested layouts, search params, and loaders built in.",
                badge: "routing" as const,
                badgeVariant: "info" as const,
              },
              {
                icon: Zap,
                title: "Vite + @tailwindcss/vite",
                description:
                  "Lightning-fast dev server and build tooling with Tailwind CSS v4 wired in via the official Vite plugin — no PostCSS config needed.",
                badge: "build" as const,
                badgeVariant: "success" as const,
              },
              {
                icon: Blocks,
                title: "DSThemeProvider",
                description:
                  "The unified-ui theme provider is mounted in __root.tsx, giving every route access to the full CSS custom property token system and dark mode.",
                badge: "theming" as const,
                badgeVariant: "warning" as const,
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="bg-card/40 hover:border-muted-foreground/20 transition-all duration-200"
              >
                <CardHeader bordered className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-background border border-border shrink-0">
                        <item.icon className="size-3.5 text-foreground" />
                      </div>
                      <h3 className="text-sm font-bold tracking-tight font-mono">
                        {item.title}
                      </h3>
                    </div>
                    <Badge variant={item.badgeVariant} size="sm">
                      {item.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <p className="text-sm text-muted-foreground leading-6">
                    {item.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* File structure */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">
            Project Structure
          </h2>
          <Card className="bg-background/80 overflow-hidden">
            <CardHeader bordered className="px-4 py-2.5 bg-muted/20">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                src/
              </span>
            </CardHeader>
            <CardBody className="p-0">
              {[
                {
                  path: "routes/__root.tsx",
                  note: "Root layout — DSThemeProvider + devtools",
                },
                {
                  path: "routes/index.tsx",
                  note: "Home page — component showcase",
                },
                {
                  path: "routes/about.tsx",
                  note: "This page",
                },
                {
                  path: "components/Header.tsx",
                  note: "Sticky nav using unified-ui Button + ThemeToggle",
                },
                {
                  path: "components/Footer.tsx",
                  note: "Footer using unified-ui Badge",
                },
                {
                  path: "components/ThemeToggle.tsx",
                  note: "Re-export of ThemeToggle from unified-ui",
                },
                {
                  path: "styles.css",
                  note: "Imports unified-ui/styles.css + tailwindcss",
                },
              ].map((item, i, arr) => (
                <div
                  key={item.path}
                  className={`flex items-start gap-3 px-4 py-2.5 ${
                    i < arr.length - 1 ? "border-b border-border/50" : ""
                  } ${i % 2 === 1 ? "bg-muted/10" : ""}`}
                >
                  <code className="text-sm font-mono text-primary shrink-0">
                    {item.path}
                  </code>
                  <span className="text-sm text-muted-foreground leading-5 pt-px">
                    — {item.note}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        {/* CTA */}
        <section className="flex flex-wrap items-center gap-3 pt-2">
          <a href="https://unified-ui.space/docs">
            <Button
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="size-3.5" />}
            >
              Unified UI Docs
            </Button>
          </a>
          <a
            href="https://tanstack.com/router/latest/docs/framework/react/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="md">
              TanStack Router Docs
            </Button>
          </a>
          <Link to="/">
            <Button
              variant="ghost"
              size="md"
              iconLeft={<ArrowLeft className="size-3.5" />}
            >
              Back to Home
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
