"use client";

import { Code2, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface ComponentPageProps {
  title: string;
  description?: string;
  preview?: React.ReactNode;
  code?: string;
  children?: React.ReactNode;
}

export function ComponentPage({
  title,
  description,
  preview,
  code,
  children,
}: ComponentPageProps) {
  const [activeTab, setActiveTab] = useState("preview");

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-lg text-fd-muted-foreground">{description}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b border-fd-border pb-px">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "preview"
                ? "border-purple-500 text-fd-foreground"
                : "border-transparent text-fd-muted-foreground hover:text-fd-foreground",
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "code"
                ? "border-purple-500 text-fd-foreground"
                : "border-transparent text-fd-muted-foreground hover:text-fd-foreground",
            )}
          >
            <Code2 className="w-4 h-4" />
            Code
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "preview" ? (
            <div className="relative rounded-lg border border-fd-border bg-fd-card p-10 flex items-center justify-center min-h-[350px]">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
              <div className="relative z-10 w-full max-w-md flex justify-center">
                {preview}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-fd-border bg-black overflow-hidden">
              {/* This would ideally be a syntax highlighter or the MDX code block */}
              <pre className="p-4 text-sm text-zinc-300 overflow-x-auto">
                <code>{code || "// No code provided"}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
