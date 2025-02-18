"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Contracts, { getContractAddress } from "@/config/contracts";
import useAllowanceJTToken from "@/hooks/use-allowance-jt-token";
import useBalanceOfJTToken from "@/hooks/use-balanceof-jt-token";
import { ethers, parseEther } from "ethers";
import { Loader2, X } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormMessage } from "@/components/ui/form";
import { DialogProps } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { approveLoading } from "@/atom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArticleVO } from "@/defined-object/article-vo";

interface ApproveDialogProps extends DialogProps {
  item?: ArticleVO;
}

const formSchema = z.object({
  amount: z
    .number()
    .positive({
      message: "a positive number",
    })
    .min(1, {
      message: "Minimum 1 JT",
    })
    .optional(),
});

const ApproveDialog: FC<ApproveDialogProps> = (props) => {
  const { item, onOpenChange, open } = props;

  const priceJT = Number(ethers.formatEther(item?.price || 0));
  const { toast } = useToast();

  const account = useAccount();
  const [approving, setApproving] = useAtom(approveLoading);

  const tokenAddress = getContractAddress(
    Contracts.JTCoin.contractName
  ) as `0x${string}`;
  const shopAddress = getContractAddress(
    Contracts.BlogShop.contractName
  ) as `0x${string}`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { JTToken, ui_balance_label } = useBalanceOfJTToken();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { allowance, ui_allowance_label } = useAllowanceJTToken();

  const onChangeHandler = useCallback(
    (open: boolean) => {
      form.reset();
      onOpenChange && onOpenChange(open);
    },
    [form, onOpenChange]
  );

  const onSubmit = useCallback(async () => {
    const amount = parseEther((form.getValues("amount") || 0).toString());

    if (BigInt(amount) > BigInt(JTToken?.data?.value || 0)) {
      toast({
        title: "Transaction failed",
        description: "Insufficient balance",
      });
      return "";
    }

    if (amount === 0n) {
      toast({
        title: "Transaction failed",
        description: "Amount must be greater than 0",
      });
      return "";
    }

    try {
      setApproving(true);
      await writeContract({
        address: tokenAddress,
        abi: Contracts.JTCoin.abi,
        functionName: "approve",
        args: [shopAddress, amount],
      });
    } catch (err: any) {
      toast({
        title: "Transaction failed",
        description: err?.message || "Something went wrong",
      });
      setApproving(false);
    }
  }, [form, writeContract, JTToken?.data?.value]);

  useEffect(() => {
    if (approving && isSuccess && allowance && open) {
      toast({
        title: "Transaction successful",
        description: "You have approved the shop to spend your tokens",
      });

      async function refresh() {
        await allowance?.refetch();
        await JTToken?.refetch();
        setApproving(false);
        onChangeHandler(false);
      }
      refresh();
    }
  }, [
    approving,
    isSuccess,
    allowance.refetch,
    JTToken.refetch,
    onChangeHandler,
    open,
  ]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Transaction failed",
        description: error?.message || "Something went wrong",
      });
      setApproving(false);
    }
  }, [error]);

  const onMaxClick = () => {
    form.setValue("amount", Number(priceJT));
  };

  const ui_btn_approval = useMemo(() => {
    return (
      <Button
        type="submit"
        disabled={isPending || isLoading}
        className="bg-dark-light font-bold rounded-lg hover:text-black w-40"
      >
        {isPending || isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Approve"
        )}
      </Button>
    );
  }, [isPending, isLoading]);

  // 如果没链接，不显示
  if (!account.isConnected && props.open) return null;

  return (
    <Dialog {...props} onOpenChange={onChangeHandler}>
      <DialogContent className="bg-[#1d232a] w-full">
        {!approving && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
        <DialogHeader>
          <DialogTitle className="text-white">Approve JT Tokens</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-1 mt-5">
              <Label className="text-[12px]">Rate: 1 JT = 0.001 ETH</Label>
              <div className="relative">
                <Input
                  // ref={inputRef}
                  type="number"
                  placeholder="0"
                  {...form.register("amount", { valueAsNumber: true })}
                  className="border-[#95ff0000] focus:border-primary bg-slate-600 border-[3px] pr-60"
                />
                <Button
                  type="button"
                  onClick={onMaxClick}
                  className="absolute right-0 top-0 w-20 rounded-r-md rounded-tl-none rounded-bl-none"
                >
                  Max
                </Button>
              </div>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
              <div className="text-[12px] flex justify-between">
                <div>Price:{priceJT}</div>
                <div>Wallet Balance: {ui_balance_label}</div>
                <div>Current Approval:{ui_allowance_label}</div>
              </div>
            </div>
            <DialogFooter className="sm:justify-center mt-5">
              {ui_btn_approval}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;
