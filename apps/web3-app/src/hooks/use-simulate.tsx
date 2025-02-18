import Contracts, { getContractAddress } from "@/config/contracts";
import { useCallback } from "react";
import { useAccount, usePublicClient } from "wagmi";

export function useSimulate() {
  const account = useAccount();
  const publicClient = usePublicClient();

  const tokenAddress = getContractAddress(
    Contracts.JTCoin.contractName
  ) as `0x${string}`;

  const shopAddress = getContractAddress(
    Contracts.BlogShop.contractName
  ) as `0x${string}`;

  const accountAddress = account.address as `0x${string}`;

  /** 模拟购买文章 */
  const simulatePurchase = useCallback(
    async (articleId: number) => {
      if (!accountAddress) return false;
      if (!publicClient) return false;

      return await publicClient.simulateContract({
        address: shopAddress,
        abi: Contracts.BlogShop.abi,
        functionName: "purchaseArticle",
        args: [articleId],
        account: accountAddress,
      });
    },
    [accountAddress, publicClient, shopAddress]
  );

  return {
    simulatePurchase,
  };
}
