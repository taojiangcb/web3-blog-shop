import JTCoin from "../abi/hardhat/JTCoin.json";
import BlogShop from "../abi/hardhat/BlogShop.json";
import { environment, Network } from "./environment";

const Contracts = {
  JTCoin,
  BlogShop,
};

export function contractAddressByNetWork(abi: any) {
  const network = process.env.NEXT_PUBLIC_NETWORK;
  if (!network) {
    throw new Error("NEXT_PUBLIC_NETWORK is not defined");
  }
  return abi.networks[network]?.address;
}

export default Contracts;
