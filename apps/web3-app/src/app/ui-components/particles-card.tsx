import { Button } from "@/components/ui/button";
import ApproveDialog from "./approve-dialog";
import { useSimulate } from "@/hooks/use-simulate";
import { useWatchEvents } from "@/hooks/use-watch-events";
import { formatEther, parseEther } from "ethers";
import { useAccount, useWriteContract } from "wagmi";
import Contracts, { getContractAddress } from "@/config/contracts";
import { toast } from "@/hooks/use-toast";
import { bigint } from "zod";
import { Loader2, UserPlus } from "lucide-react";
import { formatDate } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "@/utils/stringFormat";
import { useMemo } from "react";
import { useAtom } from "jotai";
import { approveLoading, buyArticleLoading } from "@/atom";
import useAllowanceJTToken from "@/hooks/use-allowance-jt-token";
import useBalanceOfJTToken from "@/hooks/use-balanceof-jt-token";
import { useArticles } from "@/hooks/use-articles";
import { ArticleVO } from "@/defined-object/article-vo";

interface ParticlesCardProps {
  itemData: ArticleVO;
  purchaseCount: number;
  isBought: boolean;
  /** 授权购买 */
  onApprove: (data: ArticleVO) => void;
}

export default function ParticlesCard(props: ParticlesCardProps) {
  const { itemData, onApprove, purchaseCount, isBought } = props;

  const { simulatePurchase } = useSimulate();
  const { getLogsPurchaseEventByTx } = useWatchEvents();
  const { writeContractAsync } = useWriteContract();

  const [approving] = useAtom(approveLoading);
  const [buying, setBuying] = useAtom(buyArticleLoading);

  const blogShopAddress = getContractAddress(Contracts.BlogShop.contractName);
  const { allowance } = useAllowanceJTToken();
  const { JTToken } = useBalanceOfJTToken();
  const { articlesRefresh } = useArticles();
  const account = useAccount();
  const onBuyHandler = async () => {
    try {
      setBuying(true);
      const res = await simulatePurchase(itemData.id);
      const hash = await writeContractAsync({
        address: blogShopAddress,
        abi: Contracts.BlogShop.abi,
        functionName: "purchaseArticle",
        args: [itemData.id],
      });
      const logs = await getLogsPurchaseEventByTx(hash);
      if ((logs?.length ?? 0) > 0) {
        // 购买成功
        toast({
          title: "Transaction success",
          description: "You have successfully purchased the article.",
        });
        allowance?.refetch();
        JTToken?.refetch();
        articlesRefresh?.();
      }
    } catch (err) {
      toast({
        title: "Transaction failed",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        description: (err as any)?.message || "Something went wrong",
      });
    } finally {
      setBuying(false);
    }
  };
  const handleApprove = () => {
    onApprove(itemData);
  };

  const ui_btn_approval = useMemo(() => {
    return (
      <Button
        disabled={approving || buying || !account.address}
        className="w-full rounded-full bg-black"
        onClick={handleApprove}
      >
        {approving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve"}
      </Button>
    );
  }, [approving, buying, account]);

  const ui_buy_btn = useMemo(() => {
    const allowanceData: bigint =
      allowance?.data && typeof allowance.data === "string"
        ? BigInt(allowance.data)
        : 0n;
    return (
      <Button
        disabled={buying || isBought || allowanceData < itemData.price}
        className="w-full rounded-full bg-black"
        onClick={onBuyHandler}
      >
        {buying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy"}
      </Button>
    );
  }, [isBought, buying, allowance?.data, itemData.price]);

  const totalEthCost = itemData ? itemData.price / 1000n : 0; // 将 YD 转换为 ETH

  return (
    <li className="course-card group relative overflow-hidden">
      <div className="flex-between mb-4">
        <p className="course-card_date text-dark-lighter">
          {formatDate(new Date(itemData.createTime).toISOString())}
        </p>
        <div className="flex items-center gap-1.5">
          <UserPlus className="size-5 text-primary" />
          <span className="text-16-medium group-hover:text-primary/60 transition-colors">
            {purchaseCount || 0}
          </span>
        </div>
      </div>
      <a
        href={isBought ? itemData.link : ""}
        target="_blank"
        className="block hover:text-primary transition-colors mb-4"
      >
        <h3 className="text-26-semibold line-clamp-1 text-dark-DEFAULT">
          {itemData.title}
        </h3>
      </a>

      <a
        target="_blank"
        href={isBought ? itemData.link : ""}
        className="block group mb-4"
      >
        <p className="course-card_desc mb-3">
          {itemData?.description || "Learn Python fundamentals in 2 hours"}
        </p>
        <div className="relative">
          <img
            src={itemData.image}
            alt={""}
            width={400}
            height={200}
            className="course-card_img group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-[10px]"></div>
        </div>
      </a>

      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="text-primary-dark">
          <span className="text-lg font-bold">
            {Number(formatEther(itemData.price))} JT
          </span>
          <span className="text-sm ml-2 text-gray-500">
            ≈ {formatNumber(Number(formatEther(totalEthCost)))} ETH
          </span>
        </div>
      </div>
      <div className="flex-between gap-4 ">
        {ui_btn_approval}
        {ui_buy_btn}
      </div>
    </li>
  );
}
