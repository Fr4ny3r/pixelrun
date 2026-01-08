"use client";
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AddBonus, Play } from '@/app/components/Wallet'
import { useWallet } from '@/app/components/WalletContext'



export default function App() {
  const [dataProfile, setDataProfile] = useState(null);
  const [balance, setBalance] = useState<object>({});
  const [transaction, setTransaction] = useState<Array[]>([]);
  const { updateBalance, refresh } = useWallet();


  const getProfile = async () => {
    try {
      const profile = await fetch('/api/profile');
      const userProfile = await profile.json();
      setBalance(userProfile.wallet);
      setDataProfile(userProfile.user);
      setTransaction(userProfile.transactions)
      await updateBalance(balance.balance)
      await refresh()
    }
    catch {

    }
  }  

 


  useEffect(()=>{
    getProfile()
  }, [])
  


    return (
      <main className="h-[100dvh] w-[100%] text-lg md:text-2xl flex md:grid md:grid-cols-[1fr_280px]"> 
        <div className="relative h-[95dvh] w-full md:w overflow-hidden mx-4 my-5 flex flex-col">
        {dataProfile ?
          (
          <>
{/*          <span className="text-2xl font-bold flex justify-between items-center m-4 p-7 py-12 bg-[var(--primary)]">
            <div>
              <p className=" w-full text-3xl py-1 text-center font-bold scale-101 flex justify-center items-center gap-2">
                <svg xmlns="htt1p://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>
                Balance:
                <span className="bg-white/20 p-3 px-4 text-4xl rounded-xl"> {balance.balance}</span>
              </p>           
            </div>

          </span>
          <div className=" mx-4 h-[70dvh] flex flex-col justify-between">
            <span className="p-4 flex justify-between mb-10">
              <p className="font-bold relative w-fit uppercase after:absolute after:w-13/12 after:h-2 after:bg-[var(--primary)]/70 after:left-0 after:top-12/12">hola, {dataProfile.name}</p>
              <p className="text-[var(--foreground)]/80 text-xl">{dataProfile.email}</p>
            </span>
            <div className="flex bg-red- flex-col justify-between text-lg font-bold h-11/12">
            <div className="relative flex flex-col w-full h-[100%] border-3 border-[var(--primary)]/60">
              <span className="flex items-center font-extrabold bg-[var(--primary)]/60 w-full py-4 px-4 text-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" /></svg>
                 Transacciones
              </span>
              <ul className="scrollTransaction pt-5 overflow-y-auto overflow-x-hidden">
              {transaction.length != 0 ?
              (
                transaction.map((t)=>(
                  <li className="relative flex p-3 px-12 justify-between nowrap after:absolute after:w-11/12 after:h-1 after:bg-[var(--primary)]/40 after:left-1/2 after:-translate-x-1/2 after:top-11/12 after:rounded-xl">
                    <span className="flex px-3 gap-1 border-r-1 border-white/20 min-w-18">{t.amount >= 0 ?
                    (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0cb800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                      ) :
                    (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                      )}
                    <span className="">{t.amount}</span>
                  </span>
                    <p className="truncate border-r-1 border-white/20 pl-3 w-full">{t.type}</p>
                    <span className="w-full border-r-1 border-white/20 pl-3">Logs^</span>
                    <p className="truncate min-w-30 pl-3">{t.createdAt.split("T")[0]}</p>
                  </li>

                ))
              ) :
              (
                <></>
              )
              }
              </ul>
              {transaction.length != 0 ? (<></>) : (
                <div className="flex flex-col items-center justify-center relative left-1/2 top-0 -translate-x-1/2 bg-black/20 w-23/24 h-[43dvh]">
                  <span className="w-100 ">
                    <p className="bg-[var(--primary)] p-3">No hay transacciones</p>
                    <div className="relative flex flex-col pb-20 pt-15 px-4 border-b-2 border-white/30 ">
                      Puedes jugar [Juego#1]
                      <span className="bg-sky-500 w-fit p-4 mx-2 mt-4">boton</span>
                      <span className="flex items-center justify-center absolute w-45 h-30 right-0">
                        <Image 
                          src="./file.svg"
                          alt="foto"
                          width={100}
                          height={100}
                        />
                      </span>
                    </div>
                  </span>
                </div>
              )}
            </div>
            </div>
          </div>*/}
              {/*DecoVentana*/}
              <div className="absolute w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick lg:px-7 absolute left-0 top-0 w-full h-30 mt-1 px-2">
                  <div className="lg:-mx-5 flex justify-between items-center px-6 h-full bg-[var(--foreground)]">
                    <p className="text-[var(--background)] w-full h-30 text-3xl py-1 justify-start font-bold scale-101 flex items-center gap-2 ">
                      <svg xmlns="htt1p://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>
                      Balance:
                      <div className="relative py-5 px-4 text-4xl">
                        <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--background)]"></div>
                        </div>
                        <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--background)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                          <div className="w-full h-full rounded-r-full bg-[var(--background)]"></div>
                          <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--background)]"></div>
                          <div className="absolute w-1 left-1 h-full bg-[var(--background)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                          <div className="-translate-y-4 w-full h-5 bg-[var(--background)]"></div>
                          <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--background)]"></div>
                          <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--background)]"></div>
                          <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--background)]"></div>
                          <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--background)]"></div>
                        </div>
                        <span className="block -translate-y-2">{balance.balance}</span>
                      </div>
                    </p> 
                      <button className="relative left-1000 sm:left-0 p-3 text-[var(--primary-red)] px-4 hover:brightness-130 rounded-lg h-14 w-32 flex justify-center items-center gap-2 cursor-pointer font-bold transition" onClick={()=>{signOut({callbackUrl:"/"})}}>
                      <div className="relative py-5 px-4 text-2xl">
                        <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--primary-red)]"></div>
                        </div>
                        <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--primary-red)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                          <div className="w-full h-full rounded-r-full bg-[var(--primary-red)]"></div>
                          <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--primary-red)]"></div>
                          <div className="absolute w-1 left-1 h-full bg-[var(--primary-red)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                          <div className="-translate-y-4 w-full h-5 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--primary-red)]"></div>
                        </div>
                        <span className="block flex gap-2 justify-center items-center -translate-y-2">
                          Salir <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cc9090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon  icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                        </span>
                      </div>
                      </button>
                  </div>
                  {/*Contenido*/}
                    <span className="p-4 text-3xl flex flex-col md:flex-row md:justify-between my-10">
                      <p className="font-bold relative w-fit uppercase">
                        <div className="absolute w-13/12 h-2 bg-[var(--foreground)]/70 left-0 top-12/12"></div>
                        hola, {dataProfile?.name}
                      </p>
                      <p className="text-[var(--foreground)]/80 text-xl md:mt-0 mt-3">{dataProfile?.email}</p>
                    </span>
                    <div className="relative -z-300 flex flex-col w-full h-[500px] ">
                      <span className="flex items-center font-extrabold w-full h-40 px-4 text-2xl ">
                        <div className="absolute w-full h-full top-0 left-0 z-100">
                          <div className="verticalStick absolute left-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="verticalStick absolute right-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="horizontalStick absolute left-0 top-0 w-full h-17 mt-1 px-2 z-500">
                            <div className="w-full h-full bg-[var(--foreground)] flex items-center pl-5">
                            <p className="absolute z-400 items-center text-3xl flex text-[var(--background)]">
                              {/*<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" /></svg>*/}
                              Transacciones
                            </p>
                            </div>
                          </div>
                        </div>
                      </span>
                      <ul className="scrollTransaction z-400 mt-7 mx-1 overflow-y-auto overflow-x-hidden">
                      {transaction.length != 0 ?
                      (
                        transaction.map((t)=>(
                          <li className="relative flex p-3 sm:px-12 justify-between nowrap after:absolute after:w-11/12 after:h-1 after:bg-[var(--foreground)] after:left-1/2 after:-translate-x-1/2 after:top-11/12 after:rounded-xl">
                            <span className="flex justify-start px-3 sm:border-r-2 sm:border-[var(--foreground)]/40 min-w-10 sm:min-w-18">{t.amount >= 0 ?
                            (
                              <><span className="text-[color-mix(in_srgb,var(--primary-green),black_50%)]">+{t.amount}</span></>
                              // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0cb800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                              ) :
                            (
                              <span className="text-[color-mix(in_srgb,var(--primary-red),black_50%)] ">{t.amount}</span>
                              // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                              )}
                          </span>
                            <p className="truncate sm:border-r-2 sm:border-[var(--foreground)]/40 pl-3 w-full">{t.type}</p>
                            <span className="sm:w-full min-w-10 sm:border-r-2 sm:border-[var(--foreground)]/40 pl-3">Logs^</span>
                            <p className="truncate min-w-25 sm:min-w-40 pl-3">{t.createdAt.split("T")[0]}</p>
                          </li>

                        ))
                      ) :
                      (
                        <></>
                      )
                      }
                      </ul>
                      {transaction.length != 0 ? (<></>) : (
                        <div className="relative flex flex-col items-center justify-center relative left-1/2 top-0 -translate-x-1/2 w-23/24 h-[43dvh]">
                      <span className="flex items-center font-extrabold w-full h-40 px-4 text-2xl z-500">
                        <div className="absolute w-full h-full top-0 left-0 z-100">
                          <div className="verticalStick absolute left-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="verticalStick absolute right-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="horizontalStick absolute left-0 top-0 w-full h-17 mt-1 px-2 z-500">
                            <div className="w-full h-full bg-[var(--foreground)] flex items-center pl-5">
                            <p className="absolute z-400 items-center text-3xl flex text-[var(--background)]">
                              {/*<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" /></svg>*/}
                              No hay transacciones
                            </p>
                            </div>
                          </div>
                        </div>
                      </span>
                            <div className="relative flex flex-col justify-center gap-9 items-center w-full h-full text-3xl px-20 sm:px-0">
                              Puedes jugar para ganar puntos :D
                      <button className="relative  p-3 text-[var(--foreground)] px-4 hover:brightness-130 z-600 rounded-lg h-14 w-32 flex justify-center items-center gap-2 cursor-pointer font-bold transition">
                      <Link href={"/games"}>
                      <div className="relative py-5 px-4 text-4xl">
                        <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--foreground)]"></div>
                        </div>
                        <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--foreground)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                          <div className="w-full h-full rounded-r-full bg-[var(--foreground)]"></div>
                          <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--foreground)]"></div>
                          <div className="absolute w-1 left-1 h-full bg-[var(--foreground)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                          <div className="-translate-y-4 w-full h-5 bg-[var(--foreground)]"></div>
                          <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--foreground)]"></div>
                          <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--foreground)]"></div>
                          <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--foreground)]"></div>
                          <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--foreground)]"></div>
                        </div>
                        <span className="block flex gap-2 px-12 justify-center items-center -translate-y-2">
                          Jugar
                        </span>
                      </div>
                    </Link>
                      </button>
{/*                              <span className="flex items-center justify-center absolute w-45 h-30 -bottom-30">
                                <Image 
                                  src="./file.svg"
                                  alt="foto"
                                  width={100}
                                  height={100}
                                />
                              </span>*/}
                            </div>
                        </div>
                      )}
                    </div>
                </div>
              </div>
          </>

          ) :
          (
            <div className="relative w-full h-full flex flex-col gap-2 p-4">
              {/*DecoVentana*/}
              <div className="absolute w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick lg:px-7 absolute left-0 top-0 w-full h-30 mt-1 px-2">
                  <div className="lg:-mx-5 flex justify-between items-center px-6 h-full bg-[var(--foreground)]">
                    <p className="text-[var(--background)] w-full h-30 text-3xl py-1 justify-start font-bold scale-101 flex items-center gap-2 ">
                      <svg xmlns="htt1p://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>
                      Balance:
                      <div className="relative py-5 px-4 text-4xl">
                        <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--background)]"></div>
                        </div>
                        <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--background)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                          <div className="w-full h-full rounded-r-full bg-[var(--background)]"></div>
                          <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--background)]"></div>
                          <div className="absolute w-1 left-1 h-full bg-[var(--background)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                          <div className="-translate-y-4 w-full h-5 bg-[var(--background)]"></div>
                          <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--background)]"></div>
                          <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--background)]"></div>
                          <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--background)]"></div>
                          <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--background)]"></div>
                        </div>
                        <span className="block -translate-y-2">000</span>
                      </div>
                    </p> 
                      <button className="relative left-1000 sm:left-0 p-3 text-[var(--primary-red)] px-4 hover:brightness-130 rounded-lg h-14 w-32 flex justify-center items-center gap-2 cursor-pointer font-bold transition" onClick={()=>{signOut({callbackUrl:"/"})}}>
                      <div className="relative py-5 px-4 text-2xl">
                        <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--primary-red)]"></div>
                        </div>
                        <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--primary-red)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                          <div className="w-full h-full rounded-r-full bg-[var(--primary-red)]"></div>
                          <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--primary-red)]"></div>
                          <div className="absolute w-1 left-1 h-full bg-[var(--primary-red)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                          <div className="-translate-y-4 w-full h-5 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--primary-red)]"></div>
                          <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--primary-red)]"></div>
                        </div>
                        <span className="block flex gap-2 justify-center items-center -translate-y-2">
                          Salir <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cc9090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon  icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                        </span>
                      </div>
                      </button>
                  </div>
                    <span className="p-4 text-3xl flex flex-col md:flex-row md:justify-between my-10">
                      <p className="font-bold relative w-fit uppercase">
                        <div className="absolute w-13/12 h-2 bg-[var(--foreground)]/70 left-0 top-12/12"></div>
                        hola, Cargando Nombre :D
                      </p>
                      <p className="text-[var(--foreground)]/80 text-xl md:mt-0 mt-3">CargandoEmail123@email.com</p>
                    </span>
                        <div className="relative flex flex-col items-center justify-center relative left-1/2 top-0 -translate-x-1/2 w-23/24 h-[43dvh]">
                      <span className="flex items-center font-extrabold w-full h-40 px-4 text-2xl z-500">
                        <div className="absolute w-full h-full top-0 left-0 z-100">
                          <div className="verticalStick absolute left-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="verticalStick absolute right-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="horizontalStick absolute left-0 top-0 w-full h-17 mt-1 px-2 z-500">
                            <div className="w-full h-full bg-[var(--foreground)] flex items-center pl-5">
                            <p className="absolute z-400 items-center text-3xl flex text-[var(--background)]">
                              {/*<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" /></svg>*/}
                              No hay transacciones
                            </p>
                            </div>
                          </div>
                        </div>
                      </span>
                            <div className="relative flex flex-col justify-center gap-9 items-center w-full h-full text-3xl px-20 sm:px-0">
                              Puedes jugar para ganar puntos :D
                      <button className="relative  p-3 text-[var(--foreground)] px-4 hover:brightness-130 z-600 rounded-lg h-14 w-32 flex justify-center items-center gap-2 cursor-pointer font-bold transition">
                      <Link href={"/games"}>
                      <div className="relative py-5 px-4 text-4xl">
                        <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--foreground)]"></div>
                        </div>
                        <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--foreground)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                          <div className="w-full h-full rounded-r-full bg-[var(--foreground)]"></div>
                          <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--foreground)]"></div>
                          <div className="absolute w-1 left-1 h-full bg-[var(--foreground)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                          <div className="-translate-y-4 w-full h-5 bg-[var(--foreground)]"></div>
                          <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--foreground)]"></div>
                          <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--foreground)]"></div>
                          <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--foreground)]"></div>
                          <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--foreground)]"></div>
                        </div>
                        <span className="block flex gap-2 px-12 justify-center items-center -translate-y-2">
                          Jugar
                        </span>
                      </div>
                    </Link>
                      </button>
{/*                              <span className="flex items-center justify-center absolute w-45 h-30 -bottom-30">
                                <Image 
                                  src="./file.svg"
                                  alt="foto"
                                  width={100}
                                  height={100}
                                />
                              </span>*/}
                            </div>
                        </div>
                </div>
              </div>
              {/*<div className="bg-black/30 w-full h-full  animate-pulse "></div>*/}
            </div>
          )
        }
        </div>
        <div className="absolute md:relative"></div>
      </main>
    )
}