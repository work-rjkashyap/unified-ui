import { Badge } from "@work-rjkashyap/unified-ui";
import { Github, Sparkles } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-10 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-primary" />
          <p className="m-0">
            &copy; {year}{" "}
            <a
              href="https://unified-ui.space"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Unified UI
            </a>
            . MIT License.
          </p>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-3">
          <a
            href="https://unified-ui.space/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Docs
          </a>
          <a
            href="https://unified-ui.space/components"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Components
          </a>
          <a
            href="https://github.com/imrj05/unified-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <Github className="size-3.5" />
            GitHub
          </a>
        </nav>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" size="sm" className="font-mono">
            v0.3.1
          </Badge>
          <Badge variant="success" size="sm" dot>
            MIT
          </Badge>
          <Badge variant="primary" size="sm">
            TanStack Router
          </Badge>
        </div>
      </div>
    </footer>
  );
}
