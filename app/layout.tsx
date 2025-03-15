import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Providers = dynamic(
  () => import("@/components/Providers").then((mod) => mod.Providers),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Castura",
  description: "Freemium stream recording app created by itsviv0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Toaster />
              <Sonner />
              {children}
            </div>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
