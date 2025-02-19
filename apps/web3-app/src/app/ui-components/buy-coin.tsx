"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

import { useAccount, useBalance, useConnect, useReadContract } from "wagmi";
import { ethers } from "ethers";
import { Abi } from "viem";
import Contracts, { getContractAddress } from "@/config/contracts";
import { formatTokenBalance } from "@/utils/stringFormat";
import { ChevronsRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useByTokens from "@/hooks/use-by-tokens";
import useBalanceOfJTToken from "@/hooks/use-balanceof-jt-token";
import StarBorder from "./star-border";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BuyCoinTokenProps {}
const fieldSchema = function () {
  return z
    .number({
      message: "Must be a number",
    })
    .positive({
      message: "a positive number",
    })
    .min(0.001, {
      message: "Minimum 0.001 ETH",
    });
};

const formSchema = z.object({
  ETH: fieldSchema().optional(),
  JT: fieldSchema().optional(),
});

function BuyCoinToken(props: BuyCoinTokenProps) {
  const { toast } = useToast();

  const account = useAccount();
  const accountAddress = account.address as `0x${string}`;
  const tokenAddress = getContractAddress(
    Contracts.JTCoin.contractName
  ) as `0x${string}`;

  const { JTToken, ui_balance_label } = useBalanceOfJTToken();

  // 获取当前的 比率
  const rate = useReadContract({
    abi: Contracts.JTCoin.abi as Abi,
    functionName: "TOKEN_RATE",
  });

  const RATE = rate?.data || 1000;
  const { buyTokenHandler, loading: watingForBuy } =
    useByTokens(accountAddress);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ETH: undefined,
      JT: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const eth = ethers.parseEther((form.getValues("ETH") || 0).toString());
    buyTokenHandler(
      {
        address: tokenAddress,
        abi: Contracts.JTCoin.abi as Abi,
        functionName: "buyTokens",
        value: eth,
      },
      (data) => {
        toast({
          title: "Transaction success",
          description: "You have successfully bought tokens",
        });
        JTToken?.refetch();
      },
      (error) => {
        toast({
          title: "Transaction failed",
          description: error?.message || "Something went wrong",
        });
        JTToken?.refetch();
      }
    );
  }

  const ui_eth_item = useMemo(() => {
    const valueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const jtValue = Number(e.target.value) * Number(RATE);
      form.setValue("JT", jtValue);
      form.setValue("ETH", Number(e.target.value));
    };
    const ethOpt = form.register("ETH", { valueAsNumber: true });
    return (
      <FormField
        control={form.control}
        name="ETH"
        render={({ field }) => (
          <FormItem className="space-y-1 relative">
            <FormLabel className="text-sm font-medium text-white">
              You pay
            </FormLabel>
            <FormControl>
              <Input
                placeholder="0.0"
                {...field}
                {...ethOpt}
                onChange={valueOnChange}
                type="number"
                min="0"
                step={0.001}
                className=" text-gray-50 border-[#95ff0000] focus:border-lime-500 bg-slate-600 border-[3px] pr-8"
              />
            </FormControl>
            <span className="text-[12px] text-white absolute right-[5px] bottom-[33px]">
              ETH
            </span>
            <div className="h-[20px] ">
              <FormMessage>{form.formState.errors.ETH?.message}</FormMessage>
            </div>
          </FormItem>
        )}
      />
    );
  }, [form, RATE]);

  const ui_jt_item = useMemo(() => {
    const valueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const ethValue = Number(e.target.value) / Number(RATE);
      form.setValue("JT", Number(e.target.value));
      form.setValue("ETH", ethValue);
    };
    const jtOpt = form.register("JT", { valueAsNumber: true });

    return (
      <FormField
        control={form.control}
        name="JT"
        render={({ field }) => (
          <FormItem className="space-y-1 relative">
            <FormLabel className="text-sm text-white">You get</FormLabel>
            <FormControl>
              <Input
                placeholder="0.0"
                {...field}
                {...jtOpt}
                type="number"
                min="0"
                step={1}
                onChange={valueOnChange}
                className="text-gray-50 border-[#95ff0000] focus:border-lime-500 bg-slate-600 border-[3px] pr-8"
              ></Input>
            </FormControl>
            <span className="text-[12px] text-white absolute right-[5px] bottom-[33px]">
              JT
            </span>
            <div className="h-[20px] ">
              <FormMessage>{form.formState.errors.JT?.message}</FormMessage>
            </div>
          </FormItem>
        )}
      />
    );
  }, [form, RATE]);

  const ui_buy_btn = useMemo(() => {
    let btn_element = (
      <Button
        variant={"default"}
        type="submit"
        disabled={!account.isConnected}
        className=" bg-lime-600 hover:bg-lime-700/90"
      >
        Buy
      </Button>
    );

    if (account.isConnected && (rate.isLoading || watingForBuy)) {
      btn_element = (
        <Button
          variant={"default"}
          type="submit"
          className=" bg-lime-600 hover:bg-lime-700/90"
          disabled
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      );
    }
    return (
      <FormItem className="flex gap-4 space-y-1 self-start mt-[24px]">
        <div className="-mx-2 self-center h-[36px] flex justify-center items-center">
          <ChevronsRight className="h-4 w-4 text-primary-light animate-move-right" />
        </div>
        {btn_element}
      </FormItem>
    );
  }, [form, rate, watingForBuy, account]);

  const handleTransfer = async () => {
    await JTToken?.refetch();
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg ml-6 mt-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-primary-light">Buy Tokens</h2>
        <div className="flex items-center justify-between shadow-md">
          <div
            className="flex items-baseline mx-2 cursor-pointer"
            title="Click to refresh balance"
            onClick={handleTransfer}
          >
            <span className="text-gray-400 text-sm mr-1">Your Balance:</span>
            <span className="text-accent-purple text-1xl font-bold mr-1">
              {ui_balance_label}
            </span>
            <span className="text-gray-200 text-xs">JT</span>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-gray-800 rounded-lg bg-opacity-50  p-4 pb-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start gap-4"
          >
            {ui_eth_item}
            {ui_jt_item}
            {ui_buy_btn}
          </form>
        </Form>
        <div className="text-sm text-gray-400 mb-1">
          Rate: 1 ETH = {String(RATE || 1000)} JT
        </div>
        <p className="text-sm text-gray-600 border-t border-gray-700 shadow-inner pt-2">
          JT tokens can be used to purchase articles and other services
        </p>
        <div></div>
      </div>
    </div>
  );
}

export default BuyCoinToken;
