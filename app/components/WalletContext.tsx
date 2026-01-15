// components/WalletContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from 'next/navigation';

const WalletContext = createContext({
  balance: 0,
  updateBalance: (newBalance: number) => {},
  refresh: () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
      try {
        await fetch("/api/wallet")
        .then(res => res.json())
        .then(data => setBalance(data.balance));
      }
      catch {
      }
  };  

  useEffect(() => { fetchBalance(); }, []);

  return (
    <WalletContext.Provider value={{ balance, updateBalance: setBalance, refresh: fetchBalance }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);