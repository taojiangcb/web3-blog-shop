"use client";
import React, { useState, useEffect, useRef } from "react";
import Info from "../../abi/hardhat/InfoContract.json";

import {
  useWriteContract,
  useAccount,
  useReadContract,
  useTransactionReceipt,
} from "wagmi";
import { ethers } from "ethers";
interface BuyCoinTokenProps {}

function BuyCoinToken(props: BuyCoinTokenProps) {
  const account = useAccount();
  // 读取信息
  const {
    data: info,
    refetch,
  } = useReadContract({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: Info.abi,
    functionName: "getInfo",
  });
  console.log('读取信息',info);

  const { writeContract, data: hash } = useWriteContract();
  // 监听交易状态
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useTransactionReceipt({ hash });

  const handleTransfer = async () => {
    try {
      const abc = await writeContract({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: Info.abi,
        functionName: "setInfo",
        args: ["tao", ethers.toBigInt("18")],
      });
    } catch (error) {
      console.error("Error setting info:", error);
    }
  };

  // 交易确认后刷新数据
  if (isConfirmed) {
    refetch();
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg ml-6 mt-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-primary-dark">Buy JT Tokens</h2>
        <div className="flex items-center justify-between shadow-md">
          <div
            className="flex items-baseline mx-2 cursor-pointer"
            title="Click to refresh balance"
            onClick={handleTransfer}
          >
            <span className="text-gray-400 text-sm mr-1">Your Balance:</span>
            <span className="text-accent-purple text-1xl font-bold mr-1">
              {/* {JTToken?.value || 0} */}
            </span>
            <span className="text-gray-200 text-xs">JT</span>
          </div>
        </div>
      </div>
      {account.address}
      {info}
    </div>
  );
}

export default BuyCoinToken;
