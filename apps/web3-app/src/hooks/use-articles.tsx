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
    return default_articles?.map((item) => {
      return {
        article: item,
        count: 0,
        isBought: false,
      };
    });
  });

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: [
      {
        address: account.address ? shopAddress : undefined,
        abi: Contracts.BlogShop.abi,
        functionName: "getArticleItemsForBuy",
        args: [],
      },
      {
        address: account.address ? shopAddress : undefined,
        abi: Contracts.BlogShop.abi,
        functionName: "getPUrchaseByBuyer",
        args: account.address ? [account.address as `0x${string}`] : [],
      },
    ],
  });

  useEffect(() => {
    if (Array.isArray(data) && data?.length > 0) {
      const articles = data?.[0]?.result as ArticleItem[];
      const purchases = data?.[1]?.result as {
        articleId: number;
        buyer: string;
      }[];
      for (const art of articles || []) {
        for (const pur of purchases || []) {
          if (
            art.article.id === pur.articleId &&
            pur.buyer === account.address
          ) {
            art.isBought = true;
          }
        }
      }
      setAllParticles(data[0]?.result as ArticleItem[]);
    }
  }, [data, account]);

  return { allParticles, isLoading, error, articlesRefresh: refetch };
}
