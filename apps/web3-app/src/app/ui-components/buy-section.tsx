'use client'

import React from "react";
import BuyCoinToken from "./buy-coin";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type 
interface BuySectionProps {}
function BuySection(props: BuySectionProps) {
  return (
    <section className="flex gap-8 items-center backdrop-blur-md rounded-lg">
      <div className="flex-1">
        <BuyCoinToken />
      </div>
      <div className="flex-1">flex-1</div>
    </section>
  );
}

export default BuySection;
