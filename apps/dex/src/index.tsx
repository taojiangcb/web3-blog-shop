import "./styles/index.css";
import "./styles/rainbokit.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
  Theme
} from '@rainbow-me/rainbowkit';

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { WagmiProvider,http } from "wagmi";
import { infura_connection, sepolia_infura_connection } from "./resource";

const config = getDefaultConfig({
  appName: 'Dex',
  projectId:"b76a8f3a730adabfd1a63c634aa97f7c",
  chains: [mainnet, polygon, optimism, arbitrum,sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports:{
    [mainnet.id]: http(infura_connection),
    [sepolia.id]: http(sepolia_infura_connection),
  }
});

const queryClient = new QueryClient();

const container = document.getElementById("app");
if (!container) {
  throw new Error("Failed to find the app container");
}

// 自定义主题
export const duckTheme: Theme = {
  ...darkTheme(),
}
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={duckTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
