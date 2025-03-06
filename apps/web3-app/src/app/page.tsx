"use client";

import Header from "./ui-components/header";
import BuySection from "./ui-components/buy-section";
import ParticlesGrid from "./ui-components/particles-grid";
import Footer from "./ui-components/footer";

export default () => {
  return (
    <main>
      
      <main className="relative max-w-4xl mx-auto mt-20">
        <BuySection />
        <div className="p-5">
          <h2 className="text-center text-3xl font-bold mb-4 mt-10 text-primary-light border-b-2 border-primary-light pb-2">
            POPULAR COURSES
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            Find the best courses tailored for you
          </p>
          <ParticlesGrid />
        </div>
        <Footer/>
      </main>
    </main>
  );
};
