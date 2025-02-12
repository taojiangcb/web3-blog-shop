"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "../config/wagmi";
import Header from "./ui-components/header";
import { duckTheme } from "@/config/rainbowkit";
import AnimatedBackground from "./ui-components/three-canvas";
import BuySection from "./ui-components/buy-section";

const client = new QueryClient();

export default () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={duckTheme}>
          <AnimatedBackground />
          <main>
            <Header />
            <main className="relative max-w-4xl mx-auto mt-20 z-1">
              <BuySection />
            </main>
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
