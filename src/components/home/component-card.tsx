"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ComponentCardProps {
  title: string;
  description: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
  tag?: string;
}

export function ComponentCard({
  title,
  description,
  href,
  children,
  className,
  tag,
}: ComponentCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col rounded-xl border border-fd-border bg-fd-card overflow-hidden",
        "hover:border-purple-500/50 hover:shadow-lg transition-all duration-300",
        className,
      )}
    >
      {/* Preview Area */}
      <div className="relative aspect-video flex items-center justify-center bg-fd-muted overflow-hidden border-b border-fd-border">
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Placeholder for the component preview */}
        <div className="relative transform group-hover:scale-110 transition-transform duration-500 ease-out">
          {children || (
            <div className="w-12 h-12 rounded-lg bg-fd-muted-foreground/10 border border-fd-border animate-pulse" />
          )}
        </div>

        {/* Tag */}
        {tag && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold text-purple-600 dark:text-purple-400">
            {tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          <ArrowUpRight className="w-3.5 h-3.5 text-fd-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="text-xs text-fd-muted-foreground leading-normal line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function ComponentGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
