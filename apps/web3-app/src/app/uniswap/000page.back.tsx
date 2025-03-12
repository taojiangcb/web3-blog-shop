"use client";
import React from "react";
import "./swap/styles.css";
const DexSwap = React.lazy(() => import("./swap/Swap"));

const UniSwapPage = () => {
  return (
    <div className="w-full mt-40 flex justify-center items-center">
      <React.Suspense fallback="Loading Dex...">
        <DexSwap />
      </React.Suspense>
    </div>
  );
};

export default UniSwapPage;
