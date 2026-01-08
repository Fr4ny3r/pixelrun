// app/components/AuthButtons.tsx
'use client'
import { useEffect, useState } from "react"
import { WalletProvider } from '../components/WalletContext'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import { useWallet } from './WalletContext'
import {Wallet, Play, AddBonus} from './Wallet'
import { gsap } from "gsap"

export function AuthButtons({ session }: { session: any }) {
  // const [balance, setBalance] = useState(0);

  // const fetchBalance = async () => {
  //     try {
  //       await fetch("/api/wallet")
  //       .then(res => res.json())
  //       .then(data => setBalance(data.balance));
  //     }
  //     catch {
  //     }
  // };  

  useEffect(() => {
    // fetchBalance();
    gsap.to(".box",
      { 
        y: 0,
        duration: 0.3
      });
  }, []);

  return (
    <div className="relative z-4000 box -translate-y-60 flex shadow-xl shadow-white/10 flex-col backdrop-blur-[7px] items-center bg-white/10 w-full sm:max-w-50 sm:w-50">
      {session ?
      (
      <>
      <WalletProvider>     
        <Link href={"/"} className="w-full sm:max-w-52 sm:w-52">
        <div className="bg-green-600 cursor-pointer hover:brightness-110 flex justify-center gap-2 items-center w-full sm:max-w-52 sm:w-52 text-center py-2 px-2 text-sm font-bold truncate transition">
          <strong className="font-extrabold">{"<"}</strong> volver al inicio
        </div>
        </Link>
        <Link href={"/profile"} className="cursor-pointer w-full">
        <div className="btnPerfil flex w-full justify-around p-3 py-5">
          <span className="uppercase truncate text-left  font-bold flex translate-y-1 flex-col w-fit cursor-pointer">
            {session.user?.name?.split(" ")[0]}
            <button className="left-0 w-fit text-sm -translate-y-1 text-right cursor-pointer w-full text-[var(--foreground)]/40 scale-90 transition">Ir al Perfil</button>
          </span>
        {session.user?.image && (
          <Image src={session.user.image} alt="User" width={40} height={40} className="rounded-full outline-[1.5px] outline-green-500 " />
        )}          
        </div>
        </Link>
        <p className="text-lg bg-white/20 w-full py-1 text-center font-bold scale-101 flex justify-center items-center gap-2">
          <Wallet/>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>
        </p>
        <Link href={"/games"} className="w-full overflow-hidden  ">
          <button className="hover:brightness-110 cursor-pointer flex bg-[var(--primary)] font-bold rounded-b-lg outline-[var(--primary)] text-lg outline-[1.5px] p-2 w-full transition">
            <span className=" shadow shadow-green-400/30 w-full mx-1  h-full rounded-lg">Juegos / Jugar</span>
          </button>
        </Link>
      </WalletProvider>
      </>
        ):
      (
      <>
        <div className="flex w-full justify-around p-3 py-8 items-center">
          <span className="uppercase font-bold">Username</span>
          <span className="w-[40px] h-[40px] rounded-full outline-[1.5px] outline-green-500"></span>
        </div>
        <p className="text-lg bg-white/20 w-full py-1 text-center font-bold scale-101">Balance: 0</p>
        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="bg-sky-400 h-full absolute font-extrabold p-2 w-full">
          Sign in
        </button>
      </> 
        )} 
    </div>
  )
}