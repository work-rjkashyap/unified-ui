import type { Metadata } from "next";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { FooterSection } from "@/components/home/footer-section";
import { HomeLayout } from "@/components/layout/home";
import { Nav } from "@/components/layout/nav";

export const metadata: Metadata = {
  title: "Colors — Unified UI",
  description:
    "Explore the Unified UI color system. Browse palettes, pick a shade, and instantly copy oklch color values for your next project.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
        transparentMode: "top",
        component: <Nav />,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <FooterSection />
      </div>
    </HomeLayout>
  );
}
