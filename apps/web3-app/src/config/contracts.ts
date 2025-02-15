import JTCoin from "../abi/JTCoin.json";
import BlogShop from "../abi/BlogShop.json";
import { environment, Network } from "./environment";

const Contracts = {
  JTCoin,
  BlogShop,
};

export function getContractAddress(contractName:string) {
  const addressMap:Record<Network, Record<string, string>> = {
    hardhat: {
      JTCoin: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
      BlogShop: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    sepolia: {
      JTCoin: "0xA8fb6772080cfF4cE02C9C7d850Fc2C66b6a2091",
    }
  }
  const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || Network.HARDHAT;
  return addressMap[network]?.[contractName];
}

export default Contracts;
