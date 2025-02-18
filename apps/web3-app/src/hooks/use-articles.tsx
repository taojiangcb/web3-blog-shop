import Contracts, { getContractAddress } from "@/config/contracts";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import default_articles from "../json/articles";
import { ArticleItem } from "@/defined-object/article-item";

export function useArticles() {
  const account = useAccount();

  const shopAddress = getContractAddress(
    Contracts.BlogShop.contractName
  ) as `0x${string}`;

  const [allParticles, setAllParticles] = useState<ArticleItem[]>(() => {
    return default_articles.map((item) => {
      return {
        article: item,
        count: 0,
        isBought: false,
      };
    });
  });

  const { data, isLoading, error, refetch } = useReadContract({
    address: account.address ? shopAddress : undefined,
    abi: Contracts.BlogShop.abi,
    functionName: "getArticleItemsForBuy",
    args: [],
  });

  useEffect(() => {
    if (data) {
      setAllParticles(data as ArticleItem[]);
    }
  }, [data]);

  return { allParticles, isLoading, error, articlesRefresh: refetch };
}
