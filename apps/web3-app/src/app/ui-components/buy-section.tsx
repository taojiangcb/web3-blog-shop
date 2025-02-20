"use client";

import React, { useRef } from "react";
import BuyCoinToken from "./buy-coin";
import CountUp from "./count-up";
import GradientText from "./gradient-text";
import VariableProximity from "./variable-proximity";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BuySectionProps {}
function BuySection(props: BuySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null); // 修复：传递 null 作为初始值

  return (
    <section className="flex p-5 flex-col-reverse gap-8 items-center backdrop-blur-md rounded-lg md:flex-row ">
      <div className="flex-1">
        <BuyCoinToken />
      </div>

      <div className="flex-1 space-y-2">
        <h1 className="font-bold  text-3xl text-primary-light">
          <GradientText
            colors={["#9EE37D", "#c5ff1a", "#40ffaa", "#c5ff1a", "#40ffaa"]}
          >
            Welcome to my Web3 BlogSop College!
          </GradientText>
        </h1>
        <p className="text-gray-300">
          Master Web3 development with technologies like React, Next.js, and
          more.
        </p>

        <div className="flex gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-light">
              <CountUp from={0} to={50} duration={1} />+
            </div>
            <div className="text-sm text-gray-400">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-light">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-light">
              <CountUp from={0} to={1000} duration={1} />+
            </div>
            <div className="text-sm text-gray-400">Reader</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuySection;
