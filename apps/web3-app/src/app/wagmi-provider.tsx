"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "../config/wagmi";
import { duckTheme } from "@/config/rainbowkit";

import { ThemeProvider as ThemeProviderBase } from "next-themes";
import { useState } from "react";

const WagmiProviderTheme = (props: {
  children: React.ReactNode;
  initialState?: State;
}) => {
  const [client] = useState(() => new QueryClient());

  return (
    <ThemeProviderBase
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config} initialState={props.initialState}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider theme={duckTheme}>
            {props.children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProviderBase>
  );
};

WagmiProviderTheme.displayName = "WagmiProviderTheme";

export default WagmiProviderTheme;