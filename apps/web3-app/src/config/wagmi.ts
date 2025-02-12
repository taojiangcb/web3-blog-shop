import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { environment } from "./environment";

// 配置 Hardhat 本地链
const hardhatChain = {
  id: 1337,
  name: "hardhat",
  network: "hardhat",
  iconUrl: "https://hardhat.org/_next/static/media/hardhat-logo.5c5f687b.svg",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
    public: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: "Web3 app",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  chains: environment.isDev()
    ? [mainnet, sepolia, polygon, optimism, hardhatChain]
    : [mainnet, sepolia, polygon, optimism],
  // chains: [hardhatChain],
  transports: {
    // 替换之前 不可用的 https://rpc.sepolia.org/
    [sepolia.id]: http(
      "https://sepolia.infura.io/v3/a16a2a72cbc24f73a889bbac478383c9"
    ),
  },
  ssr: true,
});
