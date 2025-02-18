"use client";

// Inspired by react-hot-toast library
import * as React from "react";

import Contracts, { getContractAddress } from "@/config/contracts";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { useMemo } from "react";
import { ChevronsRight, Loader2 } from "lucide-react";
import { formatTokenBalance } from "@/utils/stringFormat";
import { ethers } from "ethers";
import { useAtom } from "jotai";

export default function useAllowanceJTToken() {
  const account = useAccount();
  const accountAddress = account.address as `0x${string}`;

  const tokenAddress = getContractAddress(
    Contracts.JTCoin.contractName
  ) as `0x${string}`;
  const shopAddress = getContractAddress(
    Contracts.BlogShop.contractName
  ) as `0x${string}`;

  const allowance = useReadContract({
    address: tokenAddress,
    abi: Contracts.JTCoin.abi,
    functionName: "allowance",
    args: [accountAddress, shopAddress],
  });

  const ui_allowance_label = useMemo(() => {
    if (allowance.isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    return formatTokenBalance(
      Number(ethers.formatEther(allowance?.data as ethers.BigNumberish || 0))
    );
  }, [allowance?.data]);

  return {
    allowance,
    ui_allowance_label,
  };
}
