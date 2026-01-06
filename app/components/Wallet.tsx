"use client";
import { useEffect, useState } from "react";
import { useWallet } from './WalletContext'

export function Wallet() {
  const { balance } = useWallet();
  return <span>{balance}</span>;
}

export function AddBonus({ getProfile } : { getProfile: ()=>{} }) {
  const { updateBalance, refresh } = useWallet();
  const handle = async () => {
    const res = await fetch("/api/reward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: 'DAILY_BONUS' }),
    });
    const data = await res.json();
    updateBalance(data.balance); // Esto actualiza el Wallet automáticamente
    await getProfile()
    await refresh()
  };
  return <button onClick={handle}>Add Bonus</button>;
}
 
export function Play({ getProfile } : { getProfile: ()=>{} }) {
	const { updateBalance, refresh } = useWallet();
  const handle = async () => {
    const res = await fetch("/api/reward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "PLAY_CHARGE" }),
    });
    const data = await res.json();
    updateBalance(data.balance); // Esto actualiza el Wallet automáticamente
    await getProfile()
    await refresh()
  };

  return (
      <button onClick={handle}>Jugar (-1)</button>
	)
}
