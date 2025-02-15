"use client";

import Header from "./ui-components/header";
import AnimatedBackground from "./ui-components/three-canvas";
import BuySection from "./ui-components/buy-section";

export default () => {
  return (
    <main>
      <Header />
      <main className="relative max-w-4xl mx-auto mt-20 z-1">
        <BuySection />
      </main>
    </main>
  );
};
