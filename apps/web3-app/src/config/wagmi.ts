import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { http, cookieStorage, createConfig, createStorage } from "wagmi";

// 配置 Hardhat 本地链
const hardhatChain = {
  id: 1337,
  name: "Hardhat",
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
  chains:
    process.env.NEXT_PUBLIC_NETWORK === "hardhat"
      ? [mainnet, sepolia, polygon, optimism, hardhatChain]
      : [sepolia, hardhatChain],
  // chains: [hardhatChain],
  transports: {
    // [mainnet.id]: http(),
    // 替换之前 不可用的 https://rpc.sepolia.org/
    [hardhatChain.id]: http("http://127.0.0.1:8545"),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});
