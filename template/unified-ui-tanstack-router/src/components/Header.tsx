import { Link } from "@tanstack/react-router";
import { Badge, Button, ThemeToggle } from "@work-rjkashyap/unified-ui";
import { Github, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <Link
            to="/"
            className="text-sm font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            unified-ui / tanstack
          </Link>
        </div>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link to="/">
            {({ isActive }) => (
              <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                Home
              </Button>
            )}
          </Link>
          <Link to="/about">
            {({ isActive }) => (
              <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                About
              </Button>
            )}
          </Link>
          <a
            href="https://unified-ui.space/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm">
              Docs
            </Button>
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Badge
            variant="success"
            size="sm"
            dot
            className="hidden sm:inline-flex"
          >
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
              className="hidden sm:inline-flex"
            >
              GitHub
            </Button>
          </a>
          <ThemeToggle size="sm" />
        </div>
      </div>
    </header>
  );
}
