"use client";

// Inspired by react-hot-toast library
import * as React from "react";

import Contracts, { getContractAddress } from "@/config/contracts";
import { useAccount, useBalance } from "wagmi";
import { useMemo } from "react";
import { ChevronsRight, Loader2 } from "lucide-react";
import { formatTokenBalance } from "@/utils/stringFormat";
import { ethers } from "ethers";

export default function useBalanceOfJTToken() {
  const account = useAccount();
  const accountAddress = account.address as `0x${string}`;
  const JTToken = useBalance({
    address: accountAddress,
    token: getContractAddress(Contracts.JTCoin.contractName) as `0x${string}`,
  });

  /** current balance of JT token */
  const ui_balance_label = useMemo(() => {
    if (JTToken.isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    return formatTokenBalance(
      Number(ethers.formatEther(JTToken?.data?.value || 0))
    );
  }, [JTToken?.data?.value]);

  return {
    JTToken,
    ui_balance_label,
  };
}
