import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviderClient } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/mode-toggle";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "HR Management System",
  description: "Comprehensive Human Resource Management Platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProviderClient>
          <div className="relative min-h-screen">
            <div className="absolute top-4 right-20 z-50">
              <ModeToggle />
            </div>
            {children}
          </div>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
