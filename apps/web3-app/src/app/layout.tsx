import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WagmiProviderTheme from "./wagmi-provider";
import { Toaster } from "@/components/ui/toaster";
import AnimatedBackground from "./ui-components/three-canvas";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/config/wagmi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web3 blog shop",
  description: "Web 博客商店",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = {} as any;

  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}
      >
        <AnimatedBackground />
        <WagmiProviderTheme initialState={initialState}>{children}</WagmiProviderTheme>
        <Toaster />
      </body>
    </html>
  );
}
