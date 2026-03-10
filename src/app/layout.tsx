import { ThemeCustomizerProvider } from "@work-rjkashyap/unified-ui";
import { RootProvider } from "fumadocs-ui/provider/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeCustomizerTrigger } from "@/components/layout/theme-customizer-trigger";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import {
  Barlow,
  Cabin,
  DM_Sans,
  Figtree,
  Geist,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Josefin_Sans,
  Karla,
  Lato,
  Lexend,
  Lora,
  Manrope,
  Montserrat,
  Mulish,
  Noto_Sans,
  Nunito,
  Open_Sans,
  Outfit,
  Plus_Jakarta_Sans,
  Poppins,
  Quicksand,
  Raleway,
  Rubik,
  Sora,
  Source_Sans_3,
  Space_Grotesk,
  Ubuntu,
  Work_Sans,
} from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Built-in fonts (used by default)
// ---------------------------------------------------------------------------

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

// ---------------------------------------------------------------------------
// Additional popular fonts (available via theme customizer)
// ---------------------------------------------------------------------------

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// ---------------------------------------------------------------------------
// Batch 2 fonts
// ---------------------------------------------------------------------------

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.unified-ui.space",
  ),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Unified UI",
    title: "Unified UI — Production-Ready React Components for Next.js",
    description:
      "Ship beautiful interfaces faster with 50+ accessible, customizable React components. Built with TypeScript, Tailwind CSS, and designed for modern Next.js apps.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rjkashyap",
    title: "Unified UI — Production-Ready React Components for Next.js",
    description:
      "Ship beautiful interfaces faster with 50+ accessible, customizable React components. Built with TypeScript, Tailwind CSS, and designed for modern Next.js apps.",
  },
  other: {
    "color-scheme": "light dark",
  },
};

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        // Built-in fonts
        outfit.variable,
        inter.variable,
        lora.variable,
        jetbrainsMono.variable,
        // Additional fonts — batch 1
        geistSans.variable,
        dmSans.variable,
        plusJakartaSans.variable,
        openSans.variable,
        poppins.variable,
        montserrat.variable,
        lato.variable,
        nunito.variable,
        raleway.variable,
        rubik.variable,
        sourceSans3.variable,
        workSans.variable,
        manrope.variable,
        spaceGrotesk.variable,
        // Additional fonts — batch 2
        figtree.variable,
        ibmPlexSans.variable,
        quicksand.variable,
        cabin.variable,
        barlow.variable,
        josefinSans.variable,
        karla.variable,
        mulish.variable,
        notoSans.variable,
        ubuntu.variable,
        sora.variable,
        lexend.variable,
        // Default body font
        outfit.className,
      )}
      suppressHydrationWarning
    >
      <body className={cn("flex flex-col min-h-screen")}>
        <RootProvider
          theme={{
            defaultTheme: "system",
            enableSystem: true,
            attribute: "class",
            disableTransitionOnChange: true,
          }}
        >
          <ThemeCustomizerProvider>
            <NuqsAdapter>
              {children}
              <ThemeCustomizerTrigger />
            </NuqsAdapter>
          </ThemeCustomizerProvider>
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
