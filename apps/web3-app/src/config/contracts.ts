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
      JTCoin: "0xf4B146FbA71F41E0592668ffbF264F1D186b2Ca8",
      BlogShop: "0x2b5A4e5493d4a54E717057B127cf0C000C876f9B",
    },
    sepolia: {
      JTCoin: "0xA8fb6772080cfF4cE02C9C7d850Fc2C66b6a2091",
    },
  };
  return addressMap[network]?.[contractName] as `0x${string}`;
  // return Contracts[contractName][network] as `0x${string}`;
}

export default Contracts;
