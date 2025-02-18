"use client";

import { MutateOptions } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { ContractFunctionParameters } from "viem";
import {
  usePublicClient,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useToast } from "./use-toast";
import Contracts, { getContractAddress } from "@/config/contracts";
import { ethers } from "ethers";

export default function useByTokens(accountAddress: `0x${string}`) {
  const [loading, setLoading] = useState(false);
  const [actionOptions, setOpt] = useState<{
    onError?: (error: Error) => void;
    onSuccess?: (data: unknown) => void;
  }>();

  const tokenAddress = getContractAddress(
    Contracts.JTCoin.contractName
  ) as `0x${string}`;
  const publicClient = usePublicClient();

  const {
    writeContract: buyToken,
    data: tx,
    status: writeStatus,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    status: txStatus,
    error: txError,
    data: txData,
  } = useWaitForTransactionReceipt({
    hash: tx,
  });
  async function buy(
    params: ContractFunctionParameters & { value: bigint },
    options?: {
      onError?: (error: Error) => void;
      onSuccess?: (data: unknown) => void;
    }
  ) {
    const simulateTransaction = async (amount: bigint) => {
      if (!accountAddress) {
        setLoading(false);
        return false;
      }
      try {
        await publicClient?.simulateContract({
          address: tokenAddress as `0x${string}`,
          abi: Contracts.JTCoin.abi,
          functionName: "buyTokens",
          args: [],
          value: amount,
          account: accountAddress,
        });
        return true; // 模拟成功
      } catch (error) {
        console.error("Transaction simulation failed:", error);
        actionOptions?.onError?.(error as Error);
        return false; // 模拟失败
      }
    };

    setLoading(true);
    setOpt(options);
    const amount = params?.value;
    const simulate = await simulateTransaction(amount);
    if (simulate) {
      await buyToken(params);
    }
  }

  useEffect(() => {
    if (writeStatus !== "pending" && txStatus !== "pending") {
      setLoading(false);
      actionOptions?.onSuccess?.(txData);
    }
  }, [writeStatus, txStatus, txData]);

  useEffect(() => {
    if (writeError || txError) {
      setLoading(false);
      actionOptions?.onError?.((writeError || txError) as Error);
    }
  }, [writeError, txError, txData]);

  return { buy, loading };
}
