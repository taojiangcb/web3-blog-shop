"use client";

import { useEffect, useMemo, useState } from "react";
import ApproveDialog from "./approve-dialog";
import ParticlesCard from "./particles-card";
import { useArticles } from "@/hooks/use-articles";
import GradientText from "./gradient-text";
import { toast } from "@/hooks/use-toast";
import { ArticleVO } from "@/defined-object/article-vo";

export default function ParticlesGrid() {
  const [item, setItem] = useState<ArticleVO>();
  const [openApprove, setOpenApprove] = useState(false);
  const onApproveHandler = (item: ArticleVO) => {
    setItem(item);
    setOpenApprove(true);
  };
  const onApproveClose = (open: boolean) => {
    setOpenApprove(open);
  };

  const { allParticles, isLoading, error: articlesError } = useArticles();

  const ui_articles = useMemo(() => {
    if (isLoading) {
      return (
        <div className="w-full flex justify-center items-center">
          <GradientText
            colors={["#9EE37D", "#c5ff1a", "#40ffaa", "#c5ff1a", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class text-center text-lg pb-10"
          >
            Loading...
          </GradientText>
        </div>
      );
    }
    const items = allParticles?.map((item) => {
      return (
        <ParticlesCard
          key={item.article.id}
          itemData={item.article}
          purchaseCount={item.count}
          isBought={item.isBought}
          onApprove={onApproveHandler}
        />
      );
    });

    return (
      <ul
        className={`mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 `}
      >
        {items}
      </ul>
    );
  }, [allParticles, onApproveHandler]);

  useEffect(() => {
    if (articlesError) {
      toast({
        title: "Error",
        description: articlesError?.message || "Something went wrong",
      });
    }
  }, [articlesError]);

  return (
    <section>
      <ApproveDialog
        onOpenChange={onApproveClose}
        defaultOpen={false}
        item={item}
        open={openApprove}
      />
      {ui_articles}
    </section>
  );
}
