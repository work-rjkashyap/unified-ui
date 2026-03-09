import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unified UI App",
  description: "Built with Unified UI and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DSThemeProvider>{children}</DSThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
