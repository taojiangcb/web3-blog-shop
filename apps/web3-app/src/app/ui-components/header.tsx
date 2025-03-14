"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { Suspense } from "react";
import { InteractiveLogo } from "./logo";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function HeaderS() {
  return (
    <Suspense fallback={<span></span>}>
      <Header />
    </Suspense>
  );
}

function Header() {
  const searchParams = useSearchParams();
  return (
    <header className="z-50 flex justify-between p-5 w-full bg-opacity-70 backdrop-blur-xl">
      <div className="flex gap-4 items-center ">
        <InteractiveLogo />
        <nav className="flex gap-8">
          <Link href={`/?${searchParams.toString()}`}>
            <span className="text-primary-dark text-1xl mr-1 hover:(bg-primary-dark text-white)">
              BlogShop
            </span>
          </Link>
          {/* <Link href="/uniswap">
            <span className="text-primary-dark text-1xl mr-1">Dex</span>
          </Link> */}
          <Link href={`/ai-chat?${searchParams.toString()}`}>
            <span className="text-primary-dark text-1xl mr-1">
              Learn English
            </span>
          </Link>
        </nav>
      </div>
      <ConnectButton
        accountStatus="full"
        chainStatus="icon"
        showBalance
        label="Connect Wallet"
      ></ConnectButton>
    </header>
  );
}
