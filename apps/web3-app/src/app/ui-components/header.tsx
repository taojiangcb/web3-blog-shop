"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { InteractiveLogo } from "./logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between p-5 w-full bg-opacity-70 backdrop-blur-xl">
      <InteractiveLogo />
      <ConnectButton
        accountStatus="full"
        chainStatus="icon"
        showBalance
        label="Connect Wallet"
      >
        
      </ConnectButton>
    </header>
  );
}
