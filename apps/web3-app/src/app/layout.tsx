import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WagmiProviderTheme from "./wagmi-provider";
import { Toaster } from "@/components/ui/toaster";
import AnimatedBackground from "./ui-components/three-canvas";
import { State } from "wagmi";
import Header from "./ui-components/header";
import { ConfigProvider, type ThemeConfig } from "antd";

const isDev = process.env.NODE_ENV === "development";

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
  const initialState = {} as State;

  const darkTheme: ThemeConfig = {
    token: {
      colorPrimary: "#1677ff",
      colorBgBase: "#141414",
      colorTextBase: "#fff",
      colorBorder: "#303030",
    },
    components: {
      Modal: {
        contentBg: "#1f1f1f",
        headerBg: "#1f1f1f",
        titleColor: "#fff",
      },
      Input: {
        colorBgContainer: "#141414",
        colorBorder: "#303030",
        colorText: "#fff",
      },
      Button: {
        colorPrimary: "#1677ff",
        colorPrimaryHover: "#4096ff",
      },
      Radio: {
        colorPrimary: "#1677ff",
      },
    },
  };

  return (
    <html lang="en">
      <head></head>
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}
      >
        {/* <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.5} /> */}
        <AnimatedBackground />
        <WagmiProviderTheme initialState={initialState}>
          <ConfigProvider theme={darkTheme}>
            <Header />
            {children}
          </ConfigProvider>
        </WagmiProviderTheme>
        <Toaster />
      </body>
    </html>
  );
}
