import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unified UI — Next.js",
  description: "A Next.js starter wired with @work-rjkashyap/unified-ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <DSThemeProvider>{children}</DSThemeProvider>
      </body>
    </html>
  );
}
