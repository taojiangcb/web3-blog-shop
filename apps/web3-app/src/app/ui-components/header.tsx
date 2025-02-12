"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { InteractiveLogo } from "./logo";

export default function Header() {
  return (
    <header className="sticky top-0 flex justify-between p-5 w-full bg-opacity-70 backdrop-blur-xl transition-opacity duration-200">
      <InteractiveLogo />
      <ConnectButton></ConnectButton>
    </header>
  );
}
