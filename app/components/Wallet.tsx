"use client";
import { useEffect, useState } from "react";
import { useWallet } from './WalletContext'

export function Wallet() {
  const { balance, refresh } = useWallet();
  refresh;
  return <span>{balance}</span>;
}
