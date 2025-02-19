import JTCoin from "../abi/JTCoin.json";
import BlogShop from "../abi/BlogShop.json";
import { environment, Network } from "./environment";

const Contracts = {
  JTCoin,
  BlogShop,
};

export function getContractAddress(contractName: string) {
  const network =
    (process.env.NEXT_PUBLIC_NETWORK as Network) || Network.HARDHAT;
  const addressMap: Record<Network, Record<string, string>> = {
    hardhat: {
      JTCoin: "0x8464135c8F25Da09e49BC8782676a84730C318bC",
      BlogShop: "0xcA03Dc4665A8C3603cb4Fd5Ce71Af9649dC00d44",
    },
    sepolia: {
      JTCoin: "0xE2282D5Dd12f006d7AC5BD323E112946E7ED83e9",
      BlogShop: "0x40E978bA34BB257DbF06E5CD7759B322567a2871",

    },
  };
  return addressMap[network]?.[contractName] as `0x${string}`;
  // return Contracts[contractName][network] as `0x${string}`;
}

export default Contracts;
