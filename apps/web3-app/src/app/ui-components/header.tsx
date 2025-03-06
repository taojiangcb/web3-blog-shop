"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { InteractiveLogo } from "./logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between p-5 w-full bg-opacity-70 backdrop-blur-xl">
      <div className="flex gap-4 items-center ">
        <InteractiveLogo />
        <nav className="flex gap-8">
          <Link href="/">
            <span className="text-primary-dark text-1xl mr-1 hover:(bg-primary-dark text-white)">BlogShop</span>
          </Link>
          <Link href="/uniswap">
            <span className="text-primary-dark text-1xl mr-1">Dex</span>
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
