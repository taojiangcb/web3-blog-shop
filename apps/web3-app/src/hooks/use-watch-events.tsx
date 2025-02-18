import { useCallback } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { type Hash } from "viem";
import Contracts, { getContractAddress } from "@/config/contracts";
import { getEventDefined } from "@/utils/abiUtils";

export function useWatchEvents() {
  const account = useAccount();
  const publicClient = usePublicClient();
  const tokenAddress = getContractAddress(
    Contracts.JTCoin.contractName
  ) as `0x${string}`;

  const shopAddress = getContractAddress(
    Contracts.BlogShop.contractName
  ) as `0x${string}`;

  /** 获取 购买事件*/
  const getLogsPurchaseEventByTx = useCallback(
    async (hash: Hash) => {
      if (!account.address) return;
      if (!publicClient) return;
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });

      const logs = await publicClient.getLogs({
        address: shopAddress,
        event: getEventDefined(Contracts.BlogShop.abi, "ArticlePurchased"),
        fromBlock: receipt.blockNumber,
        toBlock: receipt.blockNumber,
      });
      return logs;
    },
    [account, publicClient]
  );

  return {
    getLogsPurchaseEventByTx,
  };
}
