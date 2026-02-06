"use client";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/cn";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Components", href: "/docs" },
      { label: "Templates", href: "/docs" },
      { label: "Themes", href: "/docs" },
      { label: "Integrations", href: "/docs" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/docs" },
      { label: "Guides", href: "/docs" },
      { label: "Changelog", href: "/docs" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/docs" },
      { label: "Careers", href: "/docs" },
      { label: "Contact", href: "/docs" },
      { label: "Partners", href: "/docs" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/docs" },
      { label: "Terms of Service", href: "/docs" },
      { label: "Cookie Policy", href: "/docs" },
      { label: "License", href: "/docs" },
    ],
  },
};
const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];
export function FooterSection() {
  return (
    <footer className="relative border-t border-fd-border/40 bg-fd-background overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-6">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-fd-muted-foreground leading-relaxed max-w-xs font-medium tracking-tight">
              Crafting the next generation of digital interfaces. Precision,
              performance, and beauty in every pixel.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center w-9 h-9 rounded-full",
                      "bg-fd-background/50 border border-fd-border/40 text-fd-muted-foreground group",
                      "hover:bg-fd-primary/10 hover:text-fd-primary hover:border-fd-primary/20",
                      "transition-all duration-300 shadow-sm",
                    )}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-fd-foreground/70">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors duration-200 font-medium tracking-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-fd-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] text-fd-muted-foreground font-medium uppercase tracking-widest">
              <p>© {new Date().getFullYear()} Unified UI</p>
              <span className="hidden md:inline opacity-30">•</span>
              <Link
                href="/docs"
                className="inline-flex items-center gap-1.5 text-fd-primary hover:text-fd-primary/80 transition-colors"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Operational
              </Link>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-fd-muted-foreground font-bold uppercase tracking-widest">
              <span>Built with Next.js & Fumadocs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
