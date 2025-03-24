"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { Suspense } from "react";
import { InteractiveLogo } from "./logo";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LinkMenus() {
  const searchParams = useSearchParams();
  return (
    <React.Fragment>
      <Link href={`/?${searchParams.toString()}`}>
        <span className="text-primary-dark text-1xl mr-1 hover:(bg-primary-dark text-white)">
          BlogShop
        </span>
      </Link>
      <Link href={`/ai-chat?${searchParams.toString()}`}>
        <span className="text-primary-dark text-1xl mr-1">Learn English</span>
      </Link>
    </React.Fragment>
  );
}

export default function Header() {
  return (
    <header className="z-50 flex justify-between p-5 w-full bg-opacity-70 backdrop-blur-xl">
      <div className="flex gap-4 items-center ">
        <InteractiveLogo />
        <nav className="flex gap-8">
        <Suspense fallback={<span></span>}>
          <LinkMenus />
        </Suspense>
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
