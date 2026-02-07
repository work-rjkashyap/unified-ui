import { RootProvider } from "fumadocs-ui/provider/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./global.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Unified UI - Build Faster with Next-Generation UI Components",
    template: "%s - Unified UI",
  },
  description:
    "The platform for high-performance, scalable, and beautiful user interfaces. Ship products faster with our comprehensive component library and documentation.",
  keywords: [
    "Unified UI",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Fumadocs",
    "Components",
    "UI Library",
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <body className={cn("flex flex-col min-h-screen")}>
        <RootProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </RootProvider>
      </body>
    </html>
  );
}
